var CreateMbisonAI = function(player)
{
    //*****************************************************
    //******************  PRIVATE STATE    ****************
    //*****************************************************

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
        ,EXECUTE_MOVE : 1 << 11
    };


    //private member
    var teleportFarInput_ = [ {IsDown:true,Button:BUTTONS.BACK} ,{IsDown:false,Button:BUTTONS.BACK} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.BACK} ,{IsDown:true,Button:BUTTONS.LIGHT_PUNCH} ];
    var teleportMiddleInput_ = [ {IsDown:true,Button:BUTTONS.BACK} ,{IsDown:false,Button:BUTTONS.BACK} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.BACK} ,{IsDown:true,Button:BUTTONS.LIGHT_KICK} ];
    var teleportFrontInput_ = [ {IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.LIGHT_PUNCH} ];
    var teleportBehindInput_ = [ {IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.LIGHT_KICK} ];

    var jkicks_ = [ [ {IsDown:true,Button:BUTTONS.JUMP},{IsDown:true,Button:BUTTONS.LIGHT_KICK} ] ,[ {IsDown:true,Button:BUTTONS.JUMP},{IsDown:true,Button:BUTTONS.MEDIUM_KICK} ] ,[ {IsDown:true,Button:BUTTONS.JUMP},{IsDown:true,Button:BUTTONS.HARD_KICK} ] ];
    var jpunches_ = [ [ {IsDown:true,Button:BUTTONS.JUMP},{IsDown:true,Button:BUTTONS.LIGHT_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.JUMP},{IsDown:true,Button:BUTTONS.MEDIUM_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.JUMP},{IsDown:true,Button:BUTTONS.HARD_PUNCH} ] ];

    var fkicks_ = [ [ {IsDown:true,Button:BUTTONS.FORWARD},{IsDown:true,Button:BUTTONS.LIGHT_KICK} ] ,[ {IsDown:true,Button:BUTTONS.FORWARD},{IsDown:true,Button:BUTTONS.MEDIUM_KICK} ] ,[ {IsDown:true,Button:BUTTONS.FORWARD},{IsDown:true,Button:BUTTONS.HARD_KICK} ] ];
    var fpunches_ = [ [ {IsDown:true,Button:BUTTONS.FORWARD},{IsDown:true,Button:BUTTONS.LIGHT_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.FORWARD},{IsDown:true,Button:BUTTONS.MEDIUM_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.FORWARD},{IsDown:true,Button:BUTTONS.HARD_PUNCH} ] ];

    var kicks_ = [ [ {IsDown:true,Button:BUTTONS.LIGHT_KICK} ] ,[ {IsDown:true,Button:BUTTONS.MEDIUM_KICK} ] ,[ {IsDown:true,Button:BUTTONS.HARD_KICK} ] ];
    var punches_ = [ [ {IsDown:true,Button:BUTTONS.LIGHT_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.MEDIUM_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.HARD_PUNCH} ], [ {IsDown:true,Button:BUTTONS.FORWARD}, {IsDown:true,Button:BUTTONS.MEDIUM_PUNCH} ] ];
    var lowKicks_ = [ [ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.LIGHT_KICK} ] ,[ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.MEDIUM_KICK} ] ,[ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.HARD_KICK} ] ];
    var lowPunches_ = [ [ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.LIGHT_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.MEDIUM_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.HARD_PUNCH} ] ];
    var jump_ = [ {IsDown:false,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.JUMP} ];
    var jumpInInput = [ {IsDown:true,Button:BUTTONS.FORWARD}, {IsDown:true,Button:BUTTONS.JUMP} ];
    var jumpOutInput = [ {IsDown:true,Button:BUTTONS.BACK}, {IsDown:true,Button:BUTTONS.JUMP} ];
    var crouch_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ];
    var crouchBack_ = [  {IsDown:true,Button:BUTTONS.BACK},{IsDown:true,Button:BUTTONS.CROUCH} ];

    var blockInput_ = [{IsDown:true,Button:BUTTONS.BACK}];
    var stopBlockInput_ = [{IsDown:false,Button:BUTTONS.BACK}];

    var fwd_ = [{IsDown:false,Button:BUTTONS.BACK},{IsDown:true,Button:BUTTONS.FORWARD}];
    var bk_ = [{IsDown:true,Button:BUTTONS.BACK},{IsDown:false,Button:BUTTONS.FORWARD}];

    var throwInput1_ = [{IsDown:true,Button:BUTTONS.FORWARD}, {IsDown:true,Button:BUTTONS.HARD_PUNCH}];

    ////////////////////////




    //*****************************************************
    //******************  PUBLIC  STATE    ****************
    //*****************************************************


    //
    var MBisonAI = function()
    {
        this.AI = CreateGenericAI(player);
        this.initCombos();
    }

    MBisonAI.prototype.initCombos = function()
    {
        this.AI.SingleMoves = {
            "tf" : [{A:0, B:"tf"}]
            ,"tm" : [{A:0, B:"tm"}]
            ,"ti" : [{A:0, B:"ti"}]
            ,"tb" : [{A:0, B:"tb"}]
            ,"p1" : [{A:0, B:"p1"}]
            ,"p2" : [{A:0, B:"p2"}]
            ,"p3" : [{A:0, B:"p3"}]
            ,"k1" : [{A:0, B:"k1"}]
            ,"k2" : [{A:0, B:"k2"}]
            ,"k3" : [{A:0, B:"k3"}]
            ,"lp1" : [{A:0, B:"lp1"}]
            ,"lp2" : [{A:0, B:"lp2"}]
            ,"lp3" : [{A:0, B:"lp3"}]
            ,"lk1" : [{A:0, B:"lk1"}]
            ,"lk2" : [{A:0, B:"lk2"}]
            ,"lk3" : [{A:0, B:"lk3"}]
        };

        this.AI.VeryCloseCombos = [
             [{A:0,B:"get_close", C:CONSTANTS.GRAPPLE_DISTANCE+30,D:-999}, {A:0,B:"t1"}]
             ,[{A:0, B:"get_close",C:-100}, {A:0, B:"k1"}, {A:10, B:"k3"}, {A:30, B:"k2"}, {A:25, B:"lk3"}, {A:40, B:"pc3"}]
             ,[{A:0, B:"get_close",C:-100}, {A:0, B:"k1"}, {A:4, B:"p1"}, {A:13, B:"k3"}, {A:30, B:"k2"}, {A:20, B:"lk3"}, {A:45, B:"pc3"}]
             ,[{A:0, B:"get_close",C:-100}, {A:0, B:"k1"}, {A:4, B:"p1"}, {A:13, B:"k3"}, {A:30, B:"fb3"}]
             ,[{A:0, B:"get_close",C:-100}, {A:0, B:"k1"}, {A:4, B:"p1"}, {A:13, B:"k3"}, {A:30, B:"k2"}, {A:20, B:"sk3"}]
             ,[{A:0, B:"get_close",C:-100}, {A:0, B:"lk1"}, {A:10, B:"k3"}, {A:35, B:"lk3"}]
             ,[{A:0, B:"get_close",C:-100}, {A:0, B:"p1"}, {A:30, B:"k2"}]
             ,[{A:0, B:"get_close",C:-100}, {A:0, B:"lp1"}, {A:30, B:"k2"}]
        ];

        this.AI.CloseCombos = [
             [{A:0,B:"get_close", C:CONSTANTS.GRAPPLE_DISTANCE+30,D:-999}, {A:0,B:"t1"}]
             ,[{A:0,B:"get_close",C:130},{A:0,B:"k2"}]
             ,[{A:0,B:"get_close",C:130},{A:0,B:"k2"},{A:12,B:"tb"}]
             ,[{A:0, B:"get_close",C:60}, {A:0, B:"k3"}, {A:12, B:"sk3"}]
             ,[{A:0, B:"get_close",C:120}, {A:0, B:"k2"}, {A:12, B:"sk3"}]
             ,[{A:0, B:"get_close",C:120}, {A:0, B:"k2"}, {A:20, B:"pc3"}]
             ,[{A:0,B:"lk3"},{A:10,B:"tf"}]
             ,[{A:0,B:"lk3"},{A:20,B:"k2"}]
             ,[{A:0,B:"lk3"},{A:20,B:"k2"}]
        ];

        this.AI.JumpInCombos = [
        ];

        this.AI.CounterProjectileCombos = [
            [{A:0,B:"tb"},{A:26,B:"tf"}]
            ,[{A:0,B:"tf"}]
            ,[{A:0,B:"tb"}]
            ,[{A:1,B:"jump_in"},{A:26,B:"k3"},{A:24,B:"k3"},{A:24,B:"k2"}]
            ,[{A:1,B:"jump_in"},{A:26,B:"k3"},{A:24,B:"k3"},{A:24,B:"pc3"}]
            ,[{A:1,B:"jump_in"},{A:26,B:"k3"},{A:24,B:"p2"},{A:24,B:"lk3"}]
            ,[{A:1,B:"jump_in"},{A:26,B:"k3"},{A:24,B:"k2"},{A:24,B:"pc3"}]
        ];

        this.AI.CounterProjectileMovedCombos = [
            [{A:0,B:"tb"}]
            ,[{A:0,B:"tb"}]
        ];

        this.AI.CounterAttackCombos = [
            [{A:0,B:"tb"}]
            ,[{A:0,B:"tf"}]
        ];

        this.AI.ReactAirborneCombos = [
            [{A:0,B:"k3"}]
            ,[{A:0,B:"pc3"}]
            ,[{A:0,B:"pc1"}]
            ,[{A:0,B:"k3"}]
            ,[{A:0,B:"sk3"}]
            ,[{A:0,B:"k3"}]
        ];

        this.AI.ReactNotAirborneCombos = [
            [{A:0,B:"lp1"}]
            ,[{AC:true, B:"lk1"}, {B:"lk3"}]
            ,[{AC:true, B:"lp1"}, {B:"lk3"}]
            ,[{A:0,B:"pc3"}]
            ,[{A:0,B:"lk3"}]
        ];


        this.AI.EvadeAttack = [
            [{A:0,B:"tb"}]
            ,[{A:0,B:"tb"},{A:26,B:"tf"}]
        ];


        this.AI.CounterCloseJumpInCombos = [
        ];
    }



    MBisonAI.prototype.throwSuperFireball = function()
    {
        var energyLevel = this.AI.Player.getEnergyLevel();
        if(energyLevel > 0)
        {
            if(getRand() > 50)
            {
                var which = Math.floor(Math.random() * energyLevel) + 1
                switch(which)
                {
                    case ENERGYBAR.LEVELMAXED: this.AI.Player.sendInput([]); break;
                    case ENERGYBAR.LEVEL2: this.AI.Player.sendInput([]); break;
                    case ENERGYBAR.LEVEL1: this.AI.Player.sendInput([]); break;
                    default: return false;
                }
                this.AI.sendInput(FLAGS.CLEAR_INPUT,10);
                return true;
            }
        }
        return false;
    }

    MBisonAI.prototype.getForwardKey = function() {this.AI.Player.MustChangeDirection ? BUTTONS.BACK : BUTTONS.FORWARD;}
    MBisonAI.prototype.wanderForward = function(nbFrames) { this.AI.Actions.push(this.AI.createAction(0,null,fwd_)); this.AI.Actions.push(this.AI.createAction(nbFrames,FLAGS.CLEAR_INPUT)); }
    MBisonAI.prototype.wanderBackward = function(nbFrames) { this.AI.Actions.push(this.AI.createAction(0,null,bk_)); this.AI.Actions.push(this.AI.createAction(nbFrames,FLAGS.CLEAR_INPUT)); }

    MBisonAI.prototype.executeThrow = function(which,igoreMoveToEnemy)
    {
        if(!igoreMoveToEnemy)
            this.AI.moveToEnemy();
        this.AI.Actions.push(this.AI.createAction(0,null,fwd_));
        if(!which)
            this.AI.Actions.push(this.AI.createAction(0,null,punches_[1]));
        else
            this.AI.Actions.push(this.AI.createAction(0,null,kicks_[1]));
        this.AI.Actions.push(this.AI.createAction(CONSTANTS.ATTACKBUTTON_FRAMES,FLAGS.CLEAR_INPUT));
    }

    /*
    MBisonAI.prototype.executeFireball = function(which)
    {
        if(!this.AI.Player.isMobile() && !this.AI.Player.allowInterupt())
            return false;

        //this.AI.reset();
        which = which || getRand(3);

        switch(which)
        {
            case 1: { this.AI.Player.executeAnimation("fireball p1"); break; }
            case 2: { this.AI.Player.executeAnimation("fireball p2"); break; }
            default:{ this.AI.Player.executeAnimation("fireball p3"); break; }
        }

        return true;
    }

    MBisonAI.prototype.executeScissorKick = function(which)
    {
        if(!this.AI.Player.isMobile() && !this.AI.Player.allowInterupt())
            return false;

        //this.AI.reset();
        which = which || getRand(3);

        switch(which)
        {
            case 1: { this.AI.Player.executeAnimation("flip kick k1"); break; }
            case 2: { this.AI.Player.executeAnimation("flip kick k2"); break; }
            case 3: { this.AI.Player.executeAnimation("flip kick k3"); break; }
        }

        return true;
    }

    MBisonAI.prototype.executePsychoCrusher = function(which)
    {
        if(!this.AI.Player.isMobile() && !this.AI.Player.allowInterupt())
            return false;

        //this.AI.reset();
        which = which || getRand(3);

        switch(which)
        {
            case 1: { this.AI.Player.executeAnimation("psycho crusher p1"); break; }
            case 2: { this.AI.Player.executeAnimation("psycho crusher p2"); break; }
            case 3: { this.AI.Player.executeAnimation("psycho crusher p3"); break; }
        }

        return true;
    }

    MBisonAI.prototype.executeHeadStomp = function(which)
    {
        if(!this.AI.Player.isMobile() && !this.AI.Player.allowInterupt())
            return false;

        //this.AI.reset();

        this.AI.Player.executeAnimation("head stomp");

        return true;
    }
    */


    MBisonAI.prototype.onNewRound = function()
    {
        this.AI.reset();
    }

    MBisonAI.prototype.reset = function()
    {
        this.AI.reset();
    }

    MBisonAI.prototype.test = function()
    {
    }

    MBisonAI.prototype.clearInput = function()
    {
        this.AI.clearInput();
    }

    MBisonAI.prototype.onStartNonAttack = function(frame, attacker)
    {
        this.AI.onStartNonAttack(frame,attacker);
    }
    //fired when the player gets hit
    MBisonAI.prototype.onTakeHit = function(frame, attacker)
    {
        this.AI.onTakeHit(frame, attacker);
    }
    //fired when the player gets hit
    MBisonAI.prototype.onBlocked = function(frame, attacker)
    {
        this.AI.onBlocked(frame,attacker);
    }
    //fired when any enemy attack ends
    MBisonAI.prototype.onEnemyEndAttack = function(frame, attacker)
    {
        this.AI.clearInput();
    }
    //fired when any enemy attack ends
    MBisonAI.prototype.onEnemyVulnerable = function(frame, attacker, x, y)
    {
        this.AI.clearInput();
        this.react(frame, attacker, true, x, y)
    }
    //fired every frame an enemy attack is pending
    MBisonAI.prototype.onEnemyAttackPending = function(frame,x,y,player,isSuperMove)
    {
        //just before the projectile is actually thrown, the attacker will be used instead of the projectile
        //if the player is facing the projectile, then counter it
        var dist = this.AI.Player.getDistanceFromSq(x,y);

        if(!this.AI.isAttackReactBusy() 
            && !this.AI.Player.isAirborne() 
            && !this.AI.Player.isBlocking() 
            && !!this.AI.Player.isMobile()
            && !isSuperMove
            && this.AI.Player.isFacingPlayer(player))
        {

            var rnd = getRand();

            if(dist < 100000)
            {
                this.reset();
                this.doEvadeAttack();
                this.AI.setAttackReactBusy();
            }
        }
        else
        {
            this.react(frame, player, false, x, y);
        }
    }
    //fired every frame an enemy projectile is pending
    MBisonAI.prototype.onEnemyProjectilePending = function(frame,x,y,player,isSuperMove)
    {
        //just before the projectile is actually thrown, the attacker will be used instead of the projectile
        //if the player is facing the projectile, then counter it
        if(!this.AI.isProjectileReactBusy() 
            && !this.AI.Player.isAirborne() 
            && !this.AI.Player.isBlocking() 
            && !!this.AI.Player.isMobile()
            && !isSuperMove
            && this.AI.Player.isFacingPlayer(player))
        {
            var dist = this.AI.Player.getDistanceFromSq(x,y);

            //console.log(dist);

            //jump in
            if(player.isAirborne())
            {
                this.reset();
                this.doMove("tb");
                this.AI.setProjectileReactBusy();
            }
            else if(dist < 170000 && dist > 40000)
            {
                this.reset();
                this.doCounterProjectileCombo();
                this.AI.setProjectileReactBusy();
            }
        }
        else
        {
            var dist = this.AI.Player.getDistanceFromSq(x,y);
            if(dist < 40000)
            {
                this.AI.onEnemyProjectileMoved();
            }
        }
        //this.AI.onEnemyProjectileMoved(frame,x,y,player,isSuperMove);
    }
    //fired every frame an ememy projectile is active
    MBisonAI.prototype.onEnemyProjectileMoved = function(frame,id,x,y,projectile,isSuperMove)
    {
        if(!!this.AI.IgnoreProjectileGone)
            return;
        if(!this.AI.Player.isAirborne()
            && this.AI.Actions.length == 0 
            && !!this.AI.Player.isMobile()
            && !isSuperMove
            && !this.AI.Player.isBlocking()
            && this.AI.Player.isFacingProjectile(projectile))
        {
            var dist = this.AI.Player.getDistanceFromSq(x,y);


            var rnd = getRand();
            if(dist > 72000)
            {
                this.reset();
                this.doCounterProjectileMovedCombo();
                this.AI.IgnoreProjectileGone = true;
                return;
            }
            else
            {
                this.reset();
            }
        }
        this.AI.onEnemyProjectileMoved(frame,x,y,projectile,isSuperMove);
    }
    //fired when a projectile is off screen
    MBisonAI.prototype.onEnemyProjectileGone = function(frame, id)
    {
        this.AI.onEnemyProjectileGone();
    }
    //fired when an enemy has been hit
    MBisonAI.prototype.onAttackStateChanged = function(who,state)
    {
        this.AI.onAttackStateChanged(who,state);
    }
    //fired every attack frame
    MBisonAI.prototype.onEnemyContinueAttack = function(frame, attacker, hitPoints)
    {
        this.AI.onEnemyContinueAttack(frame,attacker,hitPoints);
    }

    //fired at the start of any enemy attack
    MBisonAI.prototype.onEnemyStartAttack = function(frame, attacker)
    {
        this.AI.onEnemyStartAttack(frame,attacker);
    }

    //fired at the start of any enemy attack
    MBisonAI.prototype.onStartAttack = function()
    {
        this.AI.onStartAttack();
    }

    //fired at the end of any attack
    MBisonAI.prototype.onEndAnimation = function(name)
    {
        this.AI.onEndAnimation();
    }

    //fired at the start of any animation
    MBisonAI.prototype.onStartAnimation = function(name)
    {
        this.AI.onStartAnimation(name);
    }

    //fired at the end of any animation
    MBisonAI.prototype.onEndAnimation = function(name)
    {
        //if(name == "turn" || name == "crouch turn")
        //if the TurnBusyFrame is set, then we must clear it here
        if(this.AI.isTurnBusy())
            this.AI.clearTurnBusy();
    }

    MBisonAI.prototype.reactAirborne = function(frame,attacker,isEnemyVulernerable,x,y)
    {
        var retVal = false;

        if(!attacker.isAirborne())
            return false;

        if(!this.AI.AllowOverrideBlock)
            return true;

        if(!this.AI.Player.isBlocking())
        {
            if(!!this.AI.isAirborneReactBusy())
                return true;
        }
        else if(!!this.AI.Player.isBlocking())
        {
            return true;
        }
        
        //react to a vulnerable enemy
        if(this.AI.Player.isFacingPlayer(attacker, true))
        {
            if(!!isEnemyVulernerable)
            {
                retVal = true;

                if(this.AI.Player.isBlocking())
                {
                    this.reset();
                    return retVal;
                }

                var dist = this.AI.Player.getDistanceFromSq(x,y);

                if(dist < 80000)
                {
                    this.reset();
                    this.doCounterAirborneCombo();
                    this.AI.setAttackReactBusy();
                }
                return retVal;
            }
        }


        var nbFrames = this.AI.Player.isBlocking() ? 4 : 0;
        var item = this.AI.getClosestAirborneEnemy();

        var rnd = getRand();
        if(item.X < 200)
        {
            if(!!attacker)
            {
                if(rnd > 50)
                {
                    this.AI.reset();
                    this.doMove("tb");
                    retVal = true;
                    this.AI.setAirborneReactBusy();
                }
                else
                {
                    //TBD
                    //default behavior will be to block
                }
            }
            else
            {
                //TBD
                //default behavior will be to block
            }
        }
        return retVal;
    }

    MBisonAI.prototype.reactNotAirborne = function(frame,attacker,isEnemyVulernerable,x,y)
    {
        var retVal = false;
        if(!this.AI.Player.isMobile())
            return retVal;

        if(!!isEnemyVulernerable && this.AI.Player.isFacingPlayer(attacker, true))
        {
            retVal = true;

            if(this.AI.Player.isBlocking())
            {
                this.reset();
                return retVal;
            }

            var dist = this.AI.Player.getDistanceFromSq(x,y);

            if(dist < 10000)
            {
                this.reset();
                this.doVeryCloseCombo();
                this.AI.setAttackReactBusy();
                return retVal;
            }
            else if(dist < 100000)
            {
                this.reset();
                this.doCounterNotAirborneCombo();
                this.AI.setAttackReactBusy();
                return retVal;
            }
        }
        else
        {
            this.reset();
            this.doEvadeAttack();
            this.AI.setAttackReactBusy();
            return retVal;
        }

        return retVal;
    }


    MBisonAI.prototype.doMove = function(key) { this.execute(this.AI.SingleMoves[key]); }
    MBisonAI.prototype.doCloseCombo = function(key) { this.execute(this.AI.CloseCombos[key !== undefined ? key : (getRand(this.AI.CloseCombos.length-1))]); }
    MBisonAI.prototype.doVeryCloseCombo = function(key) { this.execute(this.AI.VeryCloseCombos[key !== undefined ? key : (getRand(this.AI.VeryCloseCombos.length-1))]); }
    MBisonAI.prototype.doJumpInCombo = function(key) { this.execute(this.AI.JumpInCombos[key]); }
    MBisonAI.prototype.doCloseJumpInCounterCombo = function(key) { this.execute(this.AI.CounterCloseJumpInCombos[key]); }
    MBisonAI.prototype.doCounterProjectileCombo = function(key) { this.execute(this.AI.CounterProjectileCombos[getRand(this.AI.CounterProjectileCombos.length-1)]); }
    MBisonAI.prototype.doCounterProjectileMovedCombo = function(key) { this.execute(this.AI.CounterProjectileMovedCombos[getRand(this.AI.CounterProjectileMovedCombos.length-1)]); }
    MBisonAI.prototype.doCounterCloseAttackCombo = function(key) { this.execute(this.AI.CounterAttackCombos[getRand(this.AI.CounterAttackCombos.length-1)]); }
    MBisonAI.prototype.doCounterAirborneCombo = function(key) { this.execute(this.AI.ReactAirborneCombos[getRand(this.AI.ReactAirborneCombos.length-1)]); }
    MBisonAI.prototype.doCounterNotAirborneCombo = function(key) { this.execute(this.AI.ReactNotAirborneCombos[getRand(this.AI.ReactNotAirborneCombos.length-1)]); }
    MBisonAI.prototype.doEvadeAttack = function(key) { this.execute(this.AI.EvadeAttack[getRand(this.AI.EvadeAttack.length-1)]); }

    MBisonAI.prototype.execute = function(sequence)
    {
        var input = null;
        var move = null;
        var mustHit = true;
        var autoCombo = false;
        var flags = 0;
        for(var i = 0; i < sequence.length; ++i)
        {
            flags = 0;

            autoCombo = sequence[i].AC === undefined
                ? autoCombo
                : sequence[i].AC;

            mustHit = sequence[i].H === undefined
                ? mustHit
                : sequence[i].H;

            input = null;

            requiredState = this.AI.getRequiredState(sequence[i].B);

            switch(sequence[i].B)
            {
                case "fb1" : { move = "fireball p1"; flags = FLAGS.EXECUTE_MOVE; break; } case "fb2" : { move = "fireball p1"; flags = FLAGS.EXECUTE_MOVE; break; } case "fb3" : { move = "fireball p3"; flags = FLAGS.EXECUTE_MOVE; break; }
                case "sk1" : { move = "flip kick k1"; flags = FLAGS.EXECUTE_MOVE; break; } case "sk2" : { move = "flip kick k2"; flags = FLAGS.EXECUTE_MOVE; break; } case "sk3" : { move = "flip kick k3"; flags = FLAGS.EXECUTE_MOVE; break; }
                case "pc1" : { move = "psycho crusher p1"; flags = FLAGS.EXECUTE_MOVE; break; } case "pc2" : { move = "psycho crusher p2"; flags = FLAGS.EXECUTE_MOVE; break; } case "pc3" : { move = "psycho crusher p3"; flags = FLAGS.EXECUTE_MOVE; break; }
                case "hs" :{ move = "head stomp"; flags = FLAGS.EXECUTE_MOVE; break; }

                case "b" : { input = bk_; break; } case "f" : { input = fwd_; break; } case "c" : { input = crouch_; break; } case "cb" : { input = crouchBack_; break; }
                case "j" : { this.AI.jumpUp(); break; } case "fj" : { this.AI.jumpTowardEnemy(); break; } case "bj" : { this.AI.jumpAwayFromEnemy(); break; }
                case "get_close" : { this.AI.moveToEnemy(0,sequence[i].C); break; } case "jump_in" : { if(this.AI.getClosestEnemy().X < (sequence[i].D || this.AI.TOO_CLOSE)) { return; }; this.AI.jumpInToEnemy(0,sequence[i].C); break; }
                case "lp1" : { input = lowPunches_[0]; break; } case "lp2" : { input = lowPunches_[1]; break; } case "lp3" : { input = lowPunches_[2]; break; }
                case "lk1" : { input = lowKicks_[0]; break; } case "lk2" : { input = lowKicks_[1]; break; } case "lk3" : { input = lowKicks_[2]; break; }
                case "p1" : { input = punches_[0]; break; } case "p2" : { input = punches_[1]; break; } case "p3" : { input = punches_[2]; break; }
                case "k1" : { input = kicks_[0]; break; } case "k2" : { input = kicks_[1]; break; } case "k3" : { input = kicks_[2]; break; }
                case "fp1" : { input = fpunches_[0]; break; } case "fp2" : { input = fpunches_[1]; break; } case "fp3" : { input = fpunches_[2]; break; }
                case "fk1" : { input = fkicks_[0]; break; } case "fk2" : { input = fkicks_[1]; break; } case "fk3" : { input = fkicks_[2]; break; }
                case "tf" : { input = teleportFarInput_; break; } case "tm" : { input = teleportMiddleInput_; break; } case "ti" : { input = teleportFrontInput_; break; } case "tb" : { input = teleportBehindInput_; break; }
                case "t1" : { this.executeThrow(0,true); break; }
            };

            //this.AI.sendInput(FLAGS.CLEAR_INPUT,sequence[i].A || 0,input,mustHit,move);

            this.AI.sendInputWithParams({
                flags:FLAGS.CLEAR_INPUT | flags
                ,frame:sequence[i].A || 0
                ,input:input
                ,mustHit:mustHit
                ,autoCombo:autoCombo
                ,requiredState:requiredState
                ,name:move
            });

        }
        this.AI.sendInput(FLAGS.CLEAR_INPUT,2);
    }

    MBisonAI.prototype.onEnemyDizzy = function(frame,attacker)
    {
        this.AI.reset();
        this.doVeryCloseCombo();
        this.AI.setBusy();
    }

    MBisonAI.prototype.react = function(frame,attacker, isEnemyVulernerable, x, y)
    {
        if(!this.AI.isAttackReactBusy())
        {
            if(!this.AI.Player.isMobile())
                return;
            if(!!this.reactAirborne(frame, attacker, isEnemyVulernerable, x, y))
            {
            }
            else if(!!this.reactNotAirborne(frame,attacker, isEnemyVulernerable, x, y))
            {
            }
        }
    }

    MBisonAI.prototype.proact = function(frame)
    {
        if(!this.AI.Player.isMobile() || this.AI.Player.isBlocking())
            return;

        if(!!this.AI.isAttackReactBusy())
            return;

        var item = this.AI.getClosestEnemy();

        var isUnHittable = item.Player.isUnhittable();
        var isAirborne = item.Player.isAirborne();

        var rnd = getRand();
        var ignoreSetBusy = false;

        if(this.AI.Actions.length != 0)
            return;

        if(!this.AI.Player.isFacingPlayer(item.Player, true) && !this.AI.isTurnBusy())
        {
            this.AI.setTurnBusy();
            this.AI.Player.targetPlayer(item.Player);
            return;   
        }

        //Quit until his turn animation ends
        if(this.AI.isTurnBusy())
            return;

        //If necessary, make MBison turn around to face the closest opponent.
        if(item.X < (CONSTANTS.GRAPPLE_DISTANCE) && !isAirborne && !isUnHittable)
        {
            if(item.Player.isInThrowableState())
            {
                this.AI.reset();
                this.executeThrow(0,true);
                return;
            }
            else
            {
                this.AI.reset();
                this.doVeryCloseCombo(rnd > 80 ? undefined : 0);
            }

        }
        if(!!this.AI.isBusy() || (this.AI.Actions.length > 0))
        {
            return;
        }
        else if(item.X < 300)
        {
            this.AI.reset();
            if(rnd > 50)
                this.wanderBackward(25);
            else
            {
                this.AI.reset();
                this.doCloseCombo();
                this.AI.setBusy();
            }
           this.AI.setBusy();
        }
        else
        {
            if(rnd > 60)
            {
                this.AI.reset();
                this.doCloseCombo();
                this.AI.setBusy();
            }
            else if(rnd > 30)
            {
                this.AI.reset();
                this.wanderBackward(25);
                this.AI.setBusy();
            }
            else
            {
                this.AI.reset();
                this.wanderForward(25);
                this.AI.setBusy();
            }
        }

    }

    MBisonAI.prototype.process = function(frame)
    {
        if(!this.AI.AllowOverrideBlock && !this.AI.Player.canBlock())
            this.AI.AllowOverrideBlock = true;

        if(!!this.AI.AllowOverrideBlock)
        {
            if(!this.AI.Player.isMobile())
            {
                if(!!this.AI.JustAttacked)
                    this.AI.JustBecameMobile = 3;
                return;
            }

            var rnd = getRand();
            this.proact(frame);

            this.AI.JustAttacked = false;
            this.AI.JustBecameMobile = (this.AI.JustBecameMobile > 0) ? this.AI.JustBecameMobile - 1 : 0;
        }
    }


    MBisonAI.prototype.frameMove = function(frame)
    {
        this.handleCombo(frame);
        this.process(frame);
    }


    MBisonAI.prototype.handleCombo = function(frame)
    {
        if(this.AI.Actions.length > 0)
        {
            if((this.AI.Actions[0].Frame == 0))
            {
                var retVal = this.AI.parseAndSendInput();
                switch(retVal)
                {
                    case 1: { this.handleCombo(frame); break; }
                    default: break;
                }
            }
            else
            {
                this.AI.Actions[0].Frame = Math.max(this.AI.Actions[0].Frame - 1,0);
            }
        }
    }

    return new MBisonAI();
}