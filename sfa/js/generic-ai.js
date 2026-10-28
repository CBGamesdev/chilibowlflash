
var CreateGenericAI = function(player)
{
    var CreateAutoCombo = function()
    {
        var isEnabled = false;
        var didHit = false;
        var isIgnored = false;

        var AutoCombo = function()
        {
            this.reset();
        }

        AutoCombo.prototype.reset = function()
        {
            isEnabled = false;
            didHit = false;
            isIgnored = false;
        }

        AutoCombo.prototype.enable = function()
        {
            this.reset();
            isEnabled = true;
        }

        AutoCombo.prototype.hit = function()
        {
            this.reset();
            didHit = true;
        }

        AutoCombo.prototype.ignore = function()
        {
            this.reset();
            isIgnored = true;
        }

        AutoCombo.prototype.isEnabled = function()
        {
            return isEnabled;
        }

        AutoCombo.prototype.isWaiting = function()
        {
            return isEnabled && !didHit && !isIgnored;
        }

        return new AutoCombo();
    };

    var FLAGS =  {
        DONE: 1 << 1
        ,MOVE_TO_ENEMY: 1 << 2
        ,MOBILE_ME: 1 << 3
        ,GROUNDED_ENEMY: 1 << 4
        ,CLEAR_INPUT: 1 << 5
        ,CLEAR_OTHER_INPUT: 1 << 6
        ,RESET: 1 << 7
        ,JUMP_IN: 1 << 8
        ,CANCEL_IF_ANIMATION_CHANGED: 1 << 9
        ,ROLL_TO_ENEMY: 1 << 10
        ,EXECUTE_MOVE: 1 << 11
    };


    var GenericAI = function()
    {
        this.Player = player;
        this.Actions = [];
        this.HitState = null;
        this.REAL_CLOSE = -50;
        this.CLOSE = 0;
        this.TOO_CLOSE = 90;
        this.JUMP_IN_DIST = 280;

        this.GET_CLOSE = {A:0,B:"get_close", C:-50,D:-999};
        this.CLEARED_INPUT = [{IsDown:false,Button:BUTTONS.BACK},{IsDown:false,Button:BUTTONS.JUMP},{IsDown:false,Button:BUTTONS.CROUCH},{IsDown:false,Button:BUTTONS.FORWARD},{IsDown:false,Button:BUTTONS.LIGHT_PUNCH},{IsDown:false,Button:BUTTONS.MEDIUM_PUNCH},{IsDown:false,Button:BUTTONS.HARD_PUNCH},{IsDown:false,Button:BUTTONS.LIGHT_KICK},{IsDown:false,Button:BUTTONS.MEDIUM_KICK},{IsDown:false,Button:BUTTONS.HARD_KICK}];

        this.BusyFrame = 0;
        this.ForceBusyFrame = 0; //overrides all other busy frames
        this.AirborneReactBusyFrame = 0;
        this.ProjectileReactBusyFrame = 0;
        this.WanderBusyFrame = 0;
        this.ProactBusyFrame = 0;
        this.AttackReactBusyFrame = 0;
        this.TurnBusyFrame = 0;
        this.JustAttacked = false;
        this.nbMobileDelay = 0;
        this.DidHit = false;
        this.SetForceBusy = false;
        this.SingleMoves = {};
        this.VeryCloseCombos = [];
        this.CloseCombos = [];
        this.JumpInCombo = [];
        this.RollInCombos = [];
        this.CounterCloseJumpInCombos = [];

        this.AutoCombo = CreateAutoCombo();
    }

    GenericAI.prototype.release = function(frame,flags,input,name,dist,mustHit)
    {
        this.Player = null;
    }

    GenericAI.prototype.createAction = function(frame,flags,input,name,dist,mustHit,move,autoCombo,requiredState)
    {
        return {Flags:flags||0, MoveName:name||0, Frame:frame||(autoCombo ? 1 : 0), Input:input||[], Distance:dist, IsActive:false, MustHit:mustHit, Move:move, AutoCombo:autoCombo, RequiredState:requiredState};
    }

    GenericAI.prototype.createActionWithParams = function(params)
    {
        return {Flags:params.flags||0, MoveName:params.name||0, Frame:params.frame||(params.autoCombo ? 1 : 0), Input:params.input||[], Distance:params.dist, IsActive:false, SetForceBusy:params.forceBusy, MustHit:params.forceBusy || params.mustHit, Move:params.move, AutoCombo:params.autoCombo, RequiredState:params.requiredState};
    }


    GenericAI.prototype.getForwardKey = function() {this.Player.MustChangeDirection ? BUTTONS.BACK : BUTTONS.FORWARD;}
    GenericAI.prototype.getOtherInputCleared = function(button) { return this.CLEARED_INPUT.filter(function(a) { return a.Button != button; }); }
    GenericAI.prototype.setAttackReactBusy = function() { this.AttackReactBusyFrame = game_.getCurrentFrame(); }
    GenericAI.prototype.isAttackReactBusy = function(nbFrames) {  return this.isForceBusy() || (game_.getCurrentFrame() - this.AttackReactBusyFrame) < (nbFrames || 20); }
    GenericAI.prototype.setAirborneReactBusy = function() { this.AirborneReactBusyFrame = game_.getCurrentFrame(); }
    GenericAI.prototype.isAirborneReactBusy = function(nbFrames) {  return this.isForceBusy() || (game_.getCurrentFrame() - this.AirborneReactBusyFrame) < (nbFrames || 50); }
    GenericAI.prototype.setWanderBusy = function() { this.WanderBusyFrame = game_.getCurrentFrame(); }
    GenericAI.prototype.isWanderBusy = function(nbFrames) { return this.isForceBusy() || (game_.getCurrentFrame() - this.WanderBusyFrame) < (nbFrames || 50); }
    GenericAI.prototype.setProactBusy = function() { this.ProactBusyFrame = game_.getCurrentFrame(); }
    GenericAI.prototype.isProactBusy = function(nbFrames) { return this.isForceBusy() || (game_.getCurrentFrame() - this.ProactBusyFrame) < (nbFrames || 50); }
    GenericAI.prototype.setProjectileReactBusy = function() { this.IgnoreProjectileGone = true; this.ProjectileReactBusyFrame = game_.getCurrentFrame(); }
    GenericAI.prototype.isProjectileReactBusy = function(nbFrames) { return this.isForceBusy() || (game_.getCurrentFrame() - this.ProjectileReactBusyFrame) < (nbFrames || 50); }
    GenericAI.prototype.setBusy = function() { this.BusyFrame = game_.getCurrentFrame(); }
    GenericAI.prototype.isBusy = function(nbFrames) { return this.isForceBusy() || (game_.getCurrentFrame() - this.ForceBusyFrame) < (nbFrames || 50); }
    GenericAI.prototype.setForceBusy = function() { this.ForceBusyFrame = game_.getCurrentFrame(); }
    GenericAI.prototype.isForceBusy = function(nbFrames) { return (game_.getCurrentFrame() - this.ForceBusyFrame) < (nbFrames || 50); }
    GenericAI.prototype.clearTurnBusy = function() { this.TurnBusyFrame = 0; }
    GenericAI.prototype.setTurnBusy = function() { this.TurnBusyFrame = game_.getCurrentFrame(); }
    GenericAI.prototype.isTurnBusy = function(nbFrames) { return (game_.getCurrentFrame() - this.TurnBusyFrame) < (nbFrames || 50); }

    GenericAI.prototype.getRequiredState = function(value)
    {
        switch(value)
        {
        case "lp1": case "lp2": case "lp3": case "lk1": case "lk2": case "lk3": { return POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1; }
        case "p1": case "p3": case "k1": case "k3": { return POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
        case "u1": case "u2": case "u3": { return POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
        case "hk1": case "hk2": case "hk3": { return POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
        case "jr1": case "jr2": case "jr3": { return POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1|POSE_FLAGS.PENDING_JUMP; }
        case "fb1": case "fb2": case "fb3": { return POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1|POSE_FLAGS.ALLOW_INTERUPT_3; }
        case "rfb1": case "rfb2": case "rfb3": { return POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
        case "sfb1": case "sfb2": case "sfb3": { return POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
        case "su1": case "su2": case "su3": { return POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1|POSE_FLAGS.ALLOW_INTERUPT_3; }
        case "p2": case "k2": { return POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
        }        
    }

    GenericAI.prototype.reset = function()
    {
        if(!!this.Actions && !!this.Actions.length)
            this.Actions = [];
        if(!!this.InputToSend && !!this.InputToSend.length)
            this.InputToSend = [];
        this.AutoCombo.reset();
        this.Player.clearInput(true);
        this.AllowOverrideBlock = true;
        this.SetForceBusy = false;
        this.MustHit = false;
        this.HitState = null;
        this.BusyFrame = 0;
        this.ForceBusyFrame = 0;
        this.AirborneReactBusyFrame = 0;
        this.ProjectileReactBusyFrame = 0;
        this.AttackReactBusyFrame = 0;
        this.TurnBusyFrame = 0;
        this.IgnoreProjectileGone = false;
    }

    GenericAI.prototype.test = function()
    {
    }

    GenericAI.prototype.clearInput = function()
    {
        this.Player.clearInput(true);
    }


    GenericAI.prototype.getOtherTeam = function()
    {
        if(this.Player.Team == BUTTONS.FORWARD)
            return player.getMatch().getTeamB().getPlayers();
        else
            return player.getMatch().getTeamA().getPlayers();
    }

    GenericAI.prototype.getClosestEnemy = function(isAirborne,isVulernable,isMobile)
    {
        var otherPlayers = this.getOtherTeam();
        var retVal = {Player:null,X:999999};
        for(var i = 0; i < otherPlayers.length; ++i)
        {
            var temp = this.Player.getCDHelper().getImgDistanceX(this.Player,otherPlayers[i]);
            if(temp < retVal.X)
            {
                if((isAirborne === undefined || isAirborne == otherPlayers[i].isAirborne()) 
                    && (isVulernable === undefined || isVulernable == !otherPlayers[i].hasInvulnerableFlag())
                    && (isMobile === undefined || isMobile == otherPlayers[i].isMobile())
                    )
                {
                    retVal.Player = otherPlayers[i];
                    retVal.X = temp;
                }
            }
        }

        return retVal;
    }

    GenericAI.prototype.getClosestAirborneEnemy = function()
    {
        var otherPlayers = this.getOtherTeam();
        var retVal = {Player:null,X:999999};
        for(var i = 0; i < otherPlayers.length; ++i)
        {
            if(!!otherPlayers[i].isAirborne()) 
            {
                var temp = this.Player.getCDHelper().getImgDistanceX(this.Player,otherPlayers[i]);
                if(temp < retVal.X)
                {
                    retVal.Player = otherPlayers[i];
                    retVal.X = temp;
                }
            }
        }

        return retVal;
    }

    //AI player will move to the enemy it is facing
    GenericAI.prototype.moveToEnemy = function(flags,dist)
    {
        this.Actions.push(this.createAction(null,FLAGS.MOVE_TO_ENEMY|flags,[{IsDown:true,Button:BUTTONS.FORWARD}],"",dist));
    }
    //AI player will jump in
    GenericAI.prototype.jumpInToEnemy = function(flags,dist,frame)
    {
        frame = frame || 0
        this.Actions.push(this.createAction(frame,FLAGS.JUMP_IN|flags,[{IsDown:true,Button:BUTTONS.FORWARD},{IsDown:false,Button:BUTTONS.BACK}]));
        this.Actions.push(this.createAction(2,FLAGS.NONE,[{IsDown:true,Button:BUTTONS.FORWARD},{IsDown:true,Button:BUTTONS.JUMP}],"",dist));
    }
    //AI player will jump in
    GenericAI.prototype.jumpTowardEnemy = function(flags,dist,frame)
    {
        frame = frame || 0;
        this.Actions.push(this.createAction(frame,FLAGS.CLEAR_INPUT,[{IsDown:true,Button:BUTTONS.FORWARD},{IsDown:false,Button:BUTTONS.BACK}]));
        this.Actions.push(this.createAction(2,FLAGS.NONE,[{IsDown:true,Button:BUTTONS.FORWARD},{IsDown:true,Button:BUTTONS.JUMP}],"",dist));
        this.Actions.push(this.createAction(2,FLAGS.CLEAR_INPUT));
    }
    //AI player will jump in
    GenericAI.prototype.jumpAwayFromEnemy = function(flags,dist,frame)
    {
        frame = frame || 0;
        this.Actions.push(this.createAction(frame,FLAGS.CLEAR_INPUT,[{IsDown:true,Button:BUTTONS.BACK},{IsDown:false,Button:BUTTONS.FORWARD}]));
        this.Actions.push(this.createAction(2,FLAGS.NONE,[{IsDown:true,Button:BUTTONS.BACK},{IsDown:true,Button:BUTTONS.JUMP}],"",dist));
        this.Actions.push(this.createAction(2,FLAGS.CLEAR_INPUT));
    }
    //AI player jump up
    GenericAI.prototype.jumpUp = function(flags,dist,frame)
    {
        frame = frame || 0;
        this.Actions.push(this.createAction(frame,FLAGS.CLEAR_INPUT,[{IsDown:false,Button:BUTTONS.FORWARD},{IsDown:false,Button:BUTTONS.BACK},{IsDown:true,Button:BUTTONS.JUMP}],"",dist));
        this.Actions.push(this.createAction(2,FLAGS.CLEAR_INPUT));
    }

    ///////////
    // INPUT //
    ///////////

    GenericAI.prototype.parseAndSendInput = function()
    {
        this.Actions[0].IsActive = true;
        var retVal = 1;

        var canClear = true;
        var canSendInput = true;

        if(!!this.Actions[0].AutoCombo)
        {
            if(!!this.AutoCombo.isWaiting() 
                || (!this.Player.isMobile() && !this.Player.allowInterupt())
                || (!!this.Actions[0].RequiredState && !this.Player.Flags.Pose.has(this.Actions[0].RequiredState)))
            {
                return null;
            }
            else if(!this.AutoCombo.isEnabled() || this.AutoCombo.isIgnored())
            {
                this.AutoCombo.enable();
            }
            else
            {
                this.AutoCombo.reset();
            }
        }

        if(hasFlag(this.Actions[0].Flags, FLAGS.CLEAR_INPUT))
        {
            this.clearInput();
        }
        else if(hasFlag(this.Actions[0].Flags, FLAGS.RESET))
        {
            this.reset();
            return null;
        }
        else if(hasFlag(this.Actions[0].Flags, FLAGS.CLEAR_OTHER_INPUT))
        {
            this.Player.sendInput(this.getOtherInputCleared(this.Actions[0].Button));
        }
        if(!!this.Actions[0].MustHit)
        {
            this.MustHit = true;
        }
        if(!!this.Actions[0].SetForceBusy)
        {
            this.setForceBusy();
        }
        if(hasFlag(this.Actions[0].Flags, FLAGS.MOVE_TO_ENEMY))
        {
            if(this.getClosestEnemy().X < (this.Actions[0].Distance || this.REAL_CLOSE))
            {
                this.clearInput();
            }
            else
            {
                canClear = false;
                retVal = null;
            }
        }
        else if(hasFlag(this.Actions[0].Flags, FLAGS.ROLL_TO_ENEMY))
        {
            if(this.Actions[0].Distance === undefined)
            {
            }
            else
            {   
                if(this.getClosestEnemy().X < (this.Actions[0].Distance || this.REAL_CLOSE))
                {
                    this.clearInput();
                    this.Actions.splice(0,1);
                    return null;
                }
                else
                {
                    canClear = false;
                    retVal = null;
                }
            }
        }
        else if(hasFlag(this.Actions[0].Flags, FLAGS.JUMP_IN))
        {
            if(this.getClosestEnemy().X < (this.Actions[0].Distance || this.JUMP_IN_DIST))
            {
                this.clearInput();
            }
            else
            {
                canClear = false;
                retVal = null;
            }
        }
        else if(hasFlag(this.Actions[0].Flags, FLAGS.EXECUTE_MOVE) && !!this.Actions[0].MoveName)
        {
            this.Player.executeAnimation(this.Actions[0].MoveName);
            canClear = true;
            canSendInput = false;
        }

        if(!!canSendInput)
            this.Player.sendInput(this.Actions[0].Input);
        if(!!canClear)
            this.Actions.splice(0,1);
        if(this.Actions.length == 0)
            this.IgnoreProjectileGone = false;

        return retVal;
    }


    GenericAI.prototype.sendInput = function(flags, frame, input, mustHit,move,autoCombo,requiredState)
    {
        this.Actions.push(this.createAction(frame,flags,input,undefined,undefined,mustHit,move,autoCombo,requiredState));
    }

    GenericAI.prototype.sendInputWithParams = function(params)
    {
        this.Actions.push(this.createActionWithParams(params));
    }

    GenericAI.prototype.pressBlock = function()
    {
        var blockKey = this.Player.MustChangeDirection ? BUTTONS.FORWARD : BUTTONS.BACK;
        this.pressButton(FLAGS.CLEAR_OTHER_INPUT,blockKey);
    }

    GenericAI.prototype.pressButton = function(flags, button, pressFrame, releaseFrame)
    {
        this.Actions.push(this.createAction(pressFrame,flags,[{IsDown:true,Button:button}]));
        this.releaseButton(button,releaseFrame);
    }

    GenericAI.prototype.releaseButton = function(button, releaseFrame)
    {
        if(!!releaseFrame)
        {
            this.Actions.push(this.createAction(releaseFrame,null,[{IsDown:false,Button:button}]));
        }
    }


    ///////////////////////////
    ////       EVENTS      ////
    ///////////////////////////

    //fired when an enemy has been hit
    GenericAI.prototype.onAttackStateChanged = function(who,state)
    {
        this.HitState = state;
        switch(state)
        {
            case ATTACK_STATE.BLOCKED:
            {
                if(!!this.MustHit || !!this.AutoCombo.isEnabled() || !!this.SetForceBusy)
                    this.reset();
                break;
            }
            case ATTACK_STATE.HIT:
            {
                this.MustHit = false;
                this.ForceBusyFrame = 0;
                this.SetForceBusy = false;
                this.AutoCombo.hit(true);
                break;
            }
            case ATTACK_STATE.DONE:
            {
                if(!!this.MustHit || !!this.AutoCombo.isEnabled() || !!this.SetForceBusy)
                    this.reset();
                break;
            }
            case ATTACK_STATE.NOT_AN_ATTACK:
            {
                this.MustHit = false;
                this.AutoCombo.ignore();
                break;
            }
        }
    }

    GenericAI.prototype.onNewRound = function()
    {
        this.reset();
    }

    GenericAI.prototype.onEnemyDizzy = function(frame,attacker)
    {
        this.reset();
    }

    //fired at the start of any enemy attack
    GenericAI.prototype.onEnemyStartAttack = function(frame, attacker)
    {
    }

    //fired at the start of any enemy attack
    GenericAI.prototype.onStartAttack = function()
    {
    }

    //fired at the end of any attack
    GenericAI.prototype.onEndAnimation = function(name)
    {
    }

    GenericAI.prototype.onStartNonAttack = function(frame, attacker)
    {
    }

    //fired at the start of any attack
    GenericAI.prototype.onStartAnimation = function(name)
    {
        this.HitState = null;
        if(this.Actions.length > 0 
            && hasFlag(this.Actions[0].Flags, FLAGS.CANCEL_IF_ANIMATION_CHANGED)
            && !!this.Actions[0].IsActive
            && this.Actions[0].MoveName != name)
        {
            this.reset();
        }
    }


    //fired when the player gets hit
    GenericAI.prototype.onBlocked = function(frame, attacker)
    {
        //this.reset();
        //this.react(frame, attacker)
        this.AllowOverrideBlock = true;
        this.JustAttacked = true;
        this.Player.targetLastAttacker(true);
    }

    //fired when the player gets hit
    GenericAI.prototype.onTakeHit = function(frame, attacker)
    {
        this.reset();
        this.JustAttacked = true;
        this.Player.targetLastAttacker(true);
    }


    //fired every frame an enemy projectile is pending
    GenericAI.prototype.onProjectilePending = function(frame,x,y,player,isSuperMove)
    {
    }

    //fired when a projectile is off screen
    GenericAI.prototype.onEnemyProjectileGone = function(frame, id)
    {
        if(!this.IgnoreProjectileGone)
            this.reset();
    }

    //fired every frame an enemy projectile is active
    GenericAI.prototype.onEnemyProjectileMoved = function(frame,id,x,y,projectile,isSuperMove)
    {
        if(!!this.isProjectileReactBusy())
            return;

        var blockKey = this.Player.MustChangeDirection ?  BUTTONS.FORWARD : BUTTONS.BACK;
        //if(this.Player.canBlock())
        if(!this.Player.isKeyDown(blockKey))
        {
            if(this.Player.isCrouching())
            {
                this.reset();
                this.pressButton(FLAGS.NONE,BUTTONS.CROUCH);
            }
            else
            {
                this.reset();
            }
            this.AllowOverrideBlock = false;
            this.pressButton(FLAGS.NONE,blockKey);
        }
    }

    //fired every attack frame
    GenericAI.prototype.onEnemyContinueAttack = function(frame, attacker, hitPoints)
    {
        if(!!this.isAttackReactBusy())
            return;
        if(!!this.isAirborneReactBusy())
            return;
        var blockKey = this.Player.MustChangeDirection ?  BUTTONS.FORWARD : BUTTONS.BACK;
        if(this.Player.canBlock())
        {
            if(attacker.isCrouching() && (!this.Player.isKeyDown(BUTTONS.CROUCH) || !this.Player.isKeyDown(blockKey)))
            {
                this.reset();
                this.AllowOverrideBlock = false;
                this.pressButton(FLAGS.NONE,BUTTONS.CROUCH);
                this.pressButton(FLAGS.NONE,blockKey);
            }
            else if(!attacker.isCrouching() && !this.Player.isKeyDown(blockKey))
            {
                this.reset();
                this.AllowOverrideBlock = false;
                this.pressButton(FLAGS.NONE,blockKey);
            }
        }
    }

    GenericAI.prototype.process = function(frame)
    {
        if(!this.AllowOverrideBlock && !this.Player.canBlock())
            this.AllowOverrideBlock = true;

        if(!!this.AllowOverrideBlock)
        {
            if(!player.isMobile())
            {
                if(!!this.JustAttacked)
                    this.nbMobileDelay = 3;
                return;
            }

            this.JustAttacked = false;
            this.nbMobileDelay = (this.nbMobileDelay > 0) ? this.nbMobileDelay - 1 : 0;
        }
    }


    GenericAI.prototype.frameMove = function(frame)
    {
        this.handleCombo(frame);
        this.process(frame);
    }


    GenericAI.prototype.handleCombo = function(frame)
    {
        if(this.Actions.length > 0)
        {
            if((this.Actions[0].Frame == 0))
            {
                var retVal = this.parseAndSendInput();
                switch(retVal)
                {
                    case 1: { this.handleCombo(frame); break; }
                    default: break;
                }
            }
            else
            {
                this.Actions[0].Frame = Math.max(this.Actions[0].Frame - 1,0);
            }
        }
    }

    
    return new GenericAI();
}