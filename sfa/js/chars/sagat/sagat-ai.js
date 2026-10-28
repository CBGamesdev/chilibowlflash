var CreateSagatAI = function(player)
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
    };

    //private member
    var lightSuperFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:16} ];
    var mediumSuperFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:32} ];
    var hardSuperFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:64} ];

    //private member
    var lightFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:16} ];
    var mediumFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:32} ];
    var hardFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:64} ];

    //private member
    var lightLowFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:128} ];
    var mediumLowFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:256} ];
    var hardLowFireballInput_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:512} ];

    //private member
    var lightUppercutInput_ = [ {IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:16} ];
    var mediumUppercutInput_ = [ {IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:32} ];
    var hardUppercutInput_ = [ {IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:64} ];

    //private member
    var lightTiggerKneeInput_ = [ {IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:128} ];
    var mediumTiggerKneeInput_ = [ {IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:256} ];
    var hardTiggerKneeInput_ = [ {IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:false,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:BUTTONS.CROUCH} ,{IsDown:true,Button:BUTTONS.FORWARD} ,{IsDown:true,Button:512} ];

    var kicks_ = [ [ {IsDown:true,Button:BUTTONS.LIGHT_KICK} ] ,[ {IsDown:true,Button:BUTTONS.MEDIUM_KICK} ] ,[ {IsDown:true,Button:BUTTONS.HARD_KICK} ] ];
    var punches_ = [ [ {IsDown:true,Button:BUTTONS.LIGHT_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.MEDIUM_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.HARD_PUNCH} ], [ {IsDown:true,Button:BUTTONS.FORWARD}, {IsDown:true,Button:BUTTONS.MEDIUM_PUNCH} ] ];
    var lowKicks_ = [ [ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.LIGHT_KICK} ] ,[ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.MEDIUM_KICK} ] ,[ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.HARD_KICK} ] ];
    var lowPunches_ = [ [ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.LIGHT_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.MEDIUM_PUNCH} ] ,[ {IsDown:true,Button:BUTTONS.CROUCH}, {IsDown:true,Button:BUTTONS.HARD_PUNCH} ] ];
    var jumpInInput = [ {IsDown:true,Button:BUTTONS.FORWARD}, {IsDown:true,Button:BUTTONS.JUMP} ];
    var jumpOutInput = [ {IsDown:true,Button:BUTTONS.BACK}, {IsDown:true,Button:BUTTONS.JUMP} ];
    var crouch_ = [ {IsDown:true,Button:BUTTONS.CROUCH} ];

    var blockInput_ = [{IsDown:true,Button:BUTTONS.BACK}];
    var stopBlockInput_ = [{IsDown:false,Button:BUTTONS.BACK}];

    var fwd_ = [{IsDown:true,Button:BUTTONS.FORWARD}];
    var bk_ = [{IsDown:true,Button:BUTTONS.BACK}];

    var throwInput1_ = [{IsDown:true,Button:BUTTONS.FORWARD}, {IsDown:true,Button:BUTTONS.HARD_PUNCH}];
    var throwInput2_ = [{IsDown:true,Button:BUTTONS.FORWARD}, {IsDown:true,Button:BUTTONS.HARD_KICK}];

    ////////////////////////




    //*****************************************************
    //******************  PUBLIC  STATE    ****************
    //*****************************************************


    //
    var SagatAI = function()
    {
        this.AI = CreateGenericAI(player);
        this.initCombos();
    }

    SagatAI.prototype.initCombos = function()
    {
        this.AI.SingleMoves = {
            "u1" : [{A:0, B:"u1"}]
            ,"u2" : [{A:0, B:"u2"}]
            ,"u3" : [{A:0, B:"u3"}]
            ,"tk1" : [{A:0, B:"tk1"}]
            ,"tk2" : [{A:0, B:"tk2"}]
            ,"tk3" : [{A:0, B:"tk3"}]
            ,"lp3" : [{A:0, B:"lp3"}]
            ,"lk3" : [{A:0, B:"lk3"}]
            ,"p1" : [{A:0, B:"p1"}]
            ,"p2" : [{A:0, B:"p2"}]
            ,"p3" : [{A:0, B:"p3"}]
            ,"k1" : [{A:0, B:"k1"}]
            ,"k2" : [{A:0, B:"k2"}]
            ,"k3" : [{A:0, B:"k3"}]
        };

        this.AI.VeryCloseCombos = [
             //[{A:0,B:"get_close", C:CONSTANTS.GRAPPLE_DISTANCE,D:-999}, {A:0,B:"t1"}]
            [{A:0,B:"get_close", C:70,D:-999}, {A:0,B:"lk3"}]
            ,[{A:0,B:"get_close", C:70,D:-999}, {A:0,B:"p3"}, {A:5,B:"sfb1"}]
            ,[{A:0,B:"get_close", C:70,D:-999}, {A:0,B:"p3"}, {A:5,B:"sfb2"}]
            ,[{A:0,B:"get_close", C:70,D:-999}, {A:0,B:"p3"}, {A:5,B:"sfb3"}]
            ,[{A:0,B:"get_close", C:20,D:-999}, {A:0,B:"lk1"}, {A:10,B:"lk3"}]
            ,[{A:0,B:"get_close", C:20,D:-999}, {A:0,B:"lk1"}, {A:11,B:"lk2"}, {A:10,B:"lk3"}]
            ,[{A:0,B:"get_close", C:20,D:-999}, {A:0,B:"lk1"}, {A:5,B:"lk2"}, {A:11,B:"k2"}, {A:10,B:"sfb1"}]
            ,[{A:0,B:"get_close", C:20,D:-999}, {A:0,B:"lk1"}, {A:11,B:"lk2"}, {A:25,B:"sfb1"}]
            ,[{A:0,B:"get_close", C:60,D:-999}, {A:0,B:"p3", H:true},{A:9,B:"u3"}]
            ,[{A:0,B:"get_close", C:60,D:-999}, {A:0,B:"p3", H:true},{A:9,B:"sfb1"}]
            ,[{A:0,B:"get_close", C:60,D:-999}, {A:0,B:"p3"},{A:9,B:"lk3"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"p1"}, {A:4, B:"p3"}, {A:19, B:"p1"}, {A:15, B:"lk2"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"p3"}, {A:5, B:"p1"}, {A:15, B:"lk3"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"k3"}, {A:4, B:"p3", H:true}, {A:4, B:"u3"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"p1"}, {A:4, B:"p2"}, {A:13, B:"k2"}, {A:17, B:"lk3"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"lk2"}, {A:8, B:"k2"}, {A:13, B:"p1"}, {A:17, B:"lk2"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p2"}, {A:4,B:"p1"},{A:14,B:"p3"}, {A:18,B:"lk2"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"k2"}, {A:25, B:"lk3"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"k2"}, {A:25, B:"lk2"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"k2", H:true}, {A:25, B:"u1"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"k2", H:true}, {A:25, B:"sfb1"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"lp3", H:true}, {A:4, B:"u3"}]
            ,[this.AI.GET_CLOSE, {A:0, B:"lp3", H:true}, {A:4, B:"sfb1"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p3"}, {A:5,B:"lp3"}, {A:19,B:"p3"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p2"}, {A:6,B:"p3"}, {A:16,B:"p1"}, {A:15,B:"k1"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p2"}, {A:6,B:"p3"}, {A:16,B:"p1"}, {A:15,B:"k1", H:true},{A:10,B:"sfb1"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p2"}, {A:6,B:"p3"}, {A:16,B:"p1"}, {A:15,B:"lk2", H:true},{A:16,B:"sfb1"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p2"}, {A:6,B:"p3"}, {A:16,B:"p1"}, {A:15,B:"lk2"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p2"}, {A:6,B:"p3"}, {A:16,B:"p1"}, {A:15,B:"lk3"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"lp3"}, {A:4,B:"p2", H:true},{A:9,B:"u1"}]
            ,[this.AI.GET_CLOSE, {A:0,B:"p2"}, {A:3,B:"p1"}, {A:15,B:"k2"}, {A:29,B:"k3"}]
            ];
        this.AI.CloseCombos = [
             [{A:0,B:"get_close", C:110,D:-999}, {A:0,B:"lk2"}]
            ,[{A:0,B:"get_close", C:100,D:-999}, {A:0,B:"lk2", H:true}, {A:0,B:"u1"}]
            ,[{A:0,B:"get_close", C:95,D:-999}, {A:0,B:"lk3"}]
            ,[{A:0,B:"get_close", C:185,D:-999}, {A:0,B:"k3"}]
            ,[{A:0,B:"get_close", C:110,D:-999}, {A:0,B:"lk2", H:true}, {A:4,B:"sfb1"}]
            ,[{A:0,B:"get_close", C:110,D:-999}, {A:0,B:"lk2", H:true}, {A:4,B:"hk3"}]
            ,[{A:0,B:"get_close", C:110,D:-999}, {A:0,B:"lk2", H:true}, {A:4,B:"sfb1"}]
            ,[{A:0,B:"get_close", C:110,D:-999}, {A:0,B:"lk2", H:true}, {A:4,B:"sfb3"}]
            ,[{A:0,B:"get_close", C:100,D:-999}, {A:0,B:"lk2", H:true}, {A:8,B:"lk3"}]
            ,[{A:0,B:"get_close", C:100,D:-999}, {A:0,B:"lk2", H:true}, {A:8,B:"lk3"}, {A:4,B:"sfb3"}]
            ,[{A:0,B:"get_close", C:110,D:-999}, {A:0,B:"k1", H:true}, {A:5,B:"sfb1"}]
            ,[{A:0,B:"get_close", C:150,D:-999}, {A:0,B:"k2"}, {A:9,B:"k3"}]
            ,[{A:0,B:"get_close", C:130,D:-999}, {A:0,B:"k2"}, {A:5,B:"k3", H:true}, {A:21,B:"sfb3"}]
            ,[{A:0,B:"get_close", C:185,D:-999}, {A:0,B:"k3", H:true}, {A:7,B:"fb1"}]
        ];

        this.AI.JumpInCombos = [
            [{A:5, B:"jump_in", C:100,D:-999}, {A:35, B:"k3"}, {A:20, B:"lk3"}]
            ,[{A:5, B:"jump_in", C:100,D:-999}, {A:35, B:"k3"}, {A:20, B:"lk2"}, {A:14, B:"lk3"}]
        ];

        this.AI.CounterProjectileCombos = [
            [{A:5, B:"fj"}, {A:25, B:"k3"}, {A:23, B:"lk3"}]
            ,[{A:5, B:"fj"}, {A:25, B:"k3"}, {A:23,B:"k2", H:true}, {A:15,B:"sfb3"}]
            ,[{A:5, B:"fj"}, {A:25, B:"k3"}]
        ];

        this.AI.CounterCloseProjectileCombos = [
            [{A:5, B:"fj"}, {A:25, B:"k3"}]
            ,[{A:5, B:"fj"}, {A:25, B:"k3"}, {A:23,B:"k2"}, {A:14,B:"lk3"}]
            ,[{A:5, B:"fj"}, {A:25, B:"k3"}, {A:23,B:"k3"}, {A:14,B:"tk1"}]
            ,[{A:5, B:"fj"}, {A:25, B:"k3"}, {A:23,B:"k3"}, {A:14,B:"tk2"}]
            ,[{A:5, B:"fj"}, {A:25, B:"k3"}, {A:23,B:"k2"}, {A:14,B:"sfb1"}]
            ,[{A:5, B:"fj"}, {A:25, B:"k3"}, {A:23,B:"k2"}, {A:14,B:"sfb2"}]
            ,[{A:5, B:"fj"}, {A:25, B:"k3"}, {A:23,B:"k2"}, {A:14,B:"sfb3"}]
            ,[{A:5, B:"fj"}, {A:25, B:"k3"}]
        ];

        this.AI.CounterVeryCloseProjectileCombos = [
            [{A:0, B:"lk3"}]
            ,[{A:0, B:"k1"}, {A:10, B:"k2"}, {A:17, B:"lk3", H:true}, {A:20, B:"sfb1"}]
            ,[{A:0, B:"k2"}, {A:10, B:"lk3", H:true}, {A:20,B:"sfb1"}]
            ,[{A:0, B:"k2"}, {A:10, B:"lk2", H:true}, {A:20,B:"sfb1"}]
        ];

        this.AI.CounterVeryVeryCloseProjectileCombos = [
            [{A:0, B:"lk1"}, {A:10, B:"tk1"}]
            ,[{A:0, B:"lk1"}, {A:10, B:"lk2"}]
            ,[{A:0, B:"lk1"}, {A:10, B:"lk2"}, {A:15, B:"lk3"}]
            ,[{A:0, B:"lk1"}, {A:10, B:"lk2"}, {A:15, B:"lp3"}]
            ,[{A:0, B:"lk3"}]
        ];

        this.AI.ReactAirborneCombos = [
            [{A:0,B:"tk3"}]
            ,[{A:0,B:"p2"}]
            ,[{A:0,B:"k3"}]
            ,[{A:0,B:"k3"}]
        ];

        this.AI.ReactNotAirborneCombos = [
             [{A:0, B:"tk1"}]
            ,[{A:0, B:"k1", AC:true}, {B:"lk3"}]
            ,[{A:0, B:"p1", AC:true}, {B:"lk2"}, {B:"lk3"}]
            ,[{A:0, B:"k2", AC:true}, {B:"lk3"}]
            ,[{A:0, B:"lk3", AC:true}, {B:"u3"}]
            ,[{A:0, B:"lp1", AC:true}, {B:"tk1"}]
            ,[{A:0, B:"lp1", AC:true}, {B:"lp3"}, {B:"lk3"}, {B:"sfb1"}]
            ,[{A:0, B:"lk1", AC:true}, {B:"k1"}, {B:"lk2"}, {B:"lfb3"}]
        ];

        this.AI.FloatCounters = [
             [{A:0,B:"u3"}]
            ,[{A:0,B:"u3"}]
            ,[{A:0,B:"u3"}]
            ,[{A:0,B:"k3"}]
            ,[{A:0,B:"k3"}]
            ,[{A:0,B:"p2"}]
            ,[{A:0,B:"sfb3"}]
        ];

        this.AI.FarFloatCounters = [
             [{A:0,B:"sfb3"}]
            ,[{A:0,B:"sfb3"}]
        ];
    }



    SagatAI.prototype.throwSuperFireball = function(forced)
    {
        var energyLevel = this.AI.Player.getEnergyLevel();
        if(energyLevel > 0)
        {
            if((getRand() > 50) || !!forced)
            {
                var which = Math.floor(Math.random() * energyLevel) + 1
                switch(which)
                {
                    case ENERGYBAR.LEVELMAXED: this.AI.Player.sendInput(hardSuperFireballInput_); break;
                    case ENERGYBAR.LEVEL2: this.AI.Player.sendInput(mediumSuperFireballInput_); break;
                    case ENERGYBAR.LEVEL1: this.AI.Player.sendInput(lightSuperFireballInput_); break;
                    default: return false;
                }
                this.AI.sendInput(FLAGS.CLEAR_INPUT,10);
                return true;
            }
        }
        return false;
    }

    SagatAI.prototype.getForwardKey = function() {this.AI.Player.MustChangeDirection ? BUTTONS.BACK : BUTTONS.FORWARD;}
    SagatAI.prototype.wanderForward = function(nbFrames) { this.AI.Actions.push(this.AI.createAction(0,null,fwd_)); this.AI.Actions.push(this.AI.createAction(nbFrames,FLAGS.CLEAR_INPUT)); }
    SagatAI.prototype.wanderBackward = function(nbFrames) { this.AI.Actions.push(this.AI.createAction(0,null,bk_)); this.AI.Actions.push(this.AI.createAction(nbFrames,FLAGS.CLEAR_INPUT)); }

    SagatAI.prototype.executeThrow = function(which,igoreMoveToEnemy)
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

    SagatAI.prototype.executeFireball = function(rnd)
    {
        if(!this.AI.Player.isMobile())
            return false;
        if(rnd > 50)
        {
            this.AI.Actions.push(this.AI.createAction(0,FLAGS.CLEAR_INPUT,lightFireballInput_));
            this.AI.Actions.push(this.AI.createAction(1,FLAGS.CLEAR_INPUT));
            return true;
        }
        else
        {
            this.AI.Actions.push(this.AI.createAction(0,FLAGS.CLEAR_INPUT,hardFireballInput_));
            this.AI.Actions.push(this.AI.createAction(1,FLAGS.CLEAR_INPUT));
            return true;
        }
    }

    SagatAI.prototype.executeLowFireball = function(rnd)
    {
        if(!this.AI.Player.isMobile())
            return false;
        if(rnd > 50)
        {
            this.AI.Actions.push(this.AI.createAction(0,FLAGS.CLEAR_INPUT,lightLowFireballInput_));
            this.AI.Actions.push(this.AI.createAction(1,FLAGS.CLEAR_INPUT));
            return true;
        }
        else
        {
            this.AI.Actions.push(this.AI.createAction(0,FLAGS.CLEAR_INPUT,hardLowFireballInput_));
            this.AI.Actions.push(this.AI.createAction(1,FLAGS.CLEAR_INPUT));
            return true;
        }
    }


    SagatAI.prototype.parseAndSendInput = function()
    {
        return this.AI.parseAndSendInput();
    }

    SagatAI.prototype.onNewRound = function()
    {
        this.AI.reset();
    }

    SagatAI.prototype.reset = function()
    {
        this.AI.reset();
    }

    SagatAI.prototype.test = function()
    {
    }

    SagatAI.prototype.clearInput = function()
    {
        this.AI.clearInput();
    }

    SagatAI.prototype.onStartNonAttack = function(frame, attacker)
    {
        this.AI.onStartNonAttack(frame,attacker);
    }
    //fired when the player gets hit
    SagatAI.prototype.onTakeHit = function(frame, attacker)
    {
        this.AI.onTakeHit(frame, attacker);
    }
    //fired when the player gets hit
    SagatAI.prototype.onBlocked = function(frame, attacker)
    {
        this.AI.onBlocked(frame,attacker);
    }
    //fired when any enemy attack ends
    SagatAI.prototype.onEnemyEndAttack = function(frame, attacker)
    {
        this.AI.clearInput();
        //this.react(frame,attacker);
    }
    //fired when any enemy attack ends
    SagatAI.prototype.onEnemyVulnerable = function(frame, attacker, x, y)
    {
        if(this.AI.Player.isMobile())
            this.react(frame, attacker, true, x, y)
    }
    //fired when any enemy attack ends in the air
    SagatAI.prototype.onEnemyFloating = function(frame, attacker, x, y)
    {
        if(this.AI.Player.isMobile())
            this.reactFloat(frame, attacker, x, y)
    }
    //fired every frame an enemy attack is pending
    SagatAI.prototype.onEnemyAttackPending = function(frame,x,y,player,isSuperMove)
    {
    }
    //fired every frame an enemy projectile is pending
    SagatAI.prototype.onEnemyProjectilePending = function(frame,x,y,player,isSuperMove)
    {
        //just before the projectile is actually thrown, the attacker will be used instead of the projectile
        //if the player is facing the projectile, then counter it
        var nbFrames = frame - player.CurrentAnimation.StartFrame;
        if(!this.AI.isProjectileReactBusy() 
            && !this.AI.Player.isAirborne() 
            && !this.AI.Player.isBlocking() 
            && !!this.AI.Player.isMobile()
            && !isSuperMove
            && this.AI.Player.isFacingPlayer(player))
        {
            var dist = this.AI.Player.getDistanceFromSq(x,y);


            this.reset();
            var rnd = getRand();
            if(rnd > 45)
            {
                if(!this.throwSuperFireball(true))
                    this.executeFireball();
                this.AI.setProjectileReactBusy();
                return;
            }


            //jump in
            if(dist < 150000 && dist > 90000)
            {
                this.reset();
                this.doCounterCloseProjectileCombo();
                this.AI.setProjectileReactBusy();
            }
            else if(dist < 250000 && dist > 90000)
            {
                this.reset();
                this.doCounterProjectileCombo();
                this.AI.setProjectileReactBusy();
            }
            else if(dist < 20000)
            {
                //Don't try to counter if we can not get a move off in time.
                if(nbFrames > 1)
                    return;

                this.reset();
                this.doCounterVeryVeryCloseProjectileCombo();
                this.AI.setProjectileReactBusy();
            }
            else if(dist < 75000)
            {
                //Don't try to counter if we can not get a move off in time.
                if(nbFrames > 1)
                    return;

                this.reset();
                this.doCounterVeryCloseProjectileCombo();
                this.AI.setProjectileReactBusy();
            }
        }
        //this.AI.onEnemyProjectileMoved(frame,x,y,projectile,isSuperMove);
    }
    //fired every frame an ememy projectile is active
    SagatAI.prototype.onEnemyProjectileMoved = function(frame,id,x,y,projectile,isSuperMove)
    {
        if(!!this.AI.IgnoreProjectileGone || !this.AI.Player.isMobile())
            return;
        if(!this.AI.Player.isAirborne()
            && this.AI.Actions.length == 0 
            && !this.AI.Player.isBlocking() 
            && !!this.AI.Player.isMobile()
            && !isSuperMove
            && this.AI.Player.isFacingProjectile(projectile))
        {
            var dist = this.AI.Player.getDistanceFromSq(x,y);

            //console.log(dist);

            if(dist > 55000)
            {
                this.reset();
                var rnd = getRand();
                if(rnd > 70)
                {
                    this.executeFireball();
                }
                else
                {
                    if(!this.throwSuperFireball(true))
                        this.executeFireball();
                }
                this.AI.setProjectileReactBusy();
                return;
            }
        }
        this.AI.onEnemyProjectileMoved(frame,x,y,projectile,isSuperMove);
    }
    //fired when a projectile is off screen
    SagatAI.prototype.onEnemyProjectileGone = function(frame, id)
    {
        this.AI.onEnemyProjectileGone();
    }
    //fired when an enemy has been hit
    SagatAI.prototype.onAttackStateChanged = function(who,state)
    {
        this.AI.onAttackStateChanged(who,state);
    }
    //fired every attack frame
    SagatAI.prototype.onEnemyContinueAttack = function(frame, attacker, hitPoints)
    {
        if(this.AI.Player.isMobile())
            this.AI.onEnemyContinueAttack(frame,attacker,hitPoints);
    }

    //fired at the start of any enemy attack
    SagatAI.prototype.onEnemyStartAttack = function(frame, attacker)
    {
        if(this.AI.Player.isMobile())
            this.AI.onEnemyStartAttack(frame,attacker);
    }

    //fired at the start of any enemy attack
    SagatAI.prototype.onStartAttack = function()
    {
        if(this.AI.Player.isMobile())
            this.AI.onStartAttack();
    }

    //fired at the end of any attack
    SagatAI.prototype.onEndAnimation = function(name)
    {
        this.AI.onEndAnimation();
    }

    //fired at the start of any attack
    SagatAI.prototype.onStartAnimation = function(name)
    {
        this.AI.onStartAnimation(name);
    }

    SagatAI.prototype.reactFloat = function(frame,attacker,x,y)
    {
        if(this.AI.Player.isMobile() && this.AI.Player.isFacingPlayer(attacker, true) && !this.AI.isAttackReactBusy())
        {
            retVal = true;

            if(this.AI.Player.isBlocking())
            {
                this.reset();
                return retVal;
            }

            var dist = this.AI.Player.getDistanceFromSq(x,y);

            if(dist < 110000)
            {
                this.reset();
                this.doCounterFloat();
                this.AI.setAttackReactBusy();
                return retVal;
            }
            else
            {
                this.reset();
                this.doCounterFarFloat();
                this.AI.setAttackReactBusy();
                return retVal;
            }
        }
    }

    SagatAI.prototype.reactAirborne = function(frame,attacker,isEnemyVulernerable,x,y)
    {
        var retVal = false;
        if(this.AI.Player.isMobile() && attacker.isAirborne() && this.AI.Player.isFacingPlayer(attacker, true))
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

                if(dist < 120000)
                {
                    this.reset();
                    this.doCounterAirborneCombo();
                    this.AI.setAttackReactBusy();
                    return retVal;
                }
            }
        }
        return retVal;
    }

    SagatAI.prototype.reactNotAirborne = function(frame,attacker,isEnemyVulernerable,x,y)
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

            if(dist < 100000)
            {
                this.reset();
                this.doCounterNotAirborneCombo();
                this.AI.setAttackReactBusy();
                return retVal;
            }
        }

        return retVal;
    }


    SagatAI.prototype.doMove = function(key) { this.execute(this.AI.SingleMoves[key]); }
    SagatAI.prototype.doCloseCombo = function(key) { this.execute(this.AI.CloseCombos[key]); }
    SagatAI.prototype.doVeryCloseCombo = function(key) { this.execute(this.AI.VeryCloseCombos[key]); }
    SagatAI.prototype.doJumpInCombo = function(key) { this.execute(this.AI.JumpInCombos[key]); }
    SagatAI.prototype.doCounterProjectileCombo = function(key) { this.execute(this.AI.CounterProjectileCombos[getRand(this.AI.CounterProjectileCombos.length-1)]); }
    SagatAI.prototype.doCounterCloseProjectileCombo = function(key) { this.execute(this.AI.CounterCloseProjectileCombos[getRand(this.AI.CounterCloseProjectileCombos.length-1)]); }
    SagatAI.prototype.doCounterVeryCloseProjectileCombo = function(key) { this.execute(this.AI.CounterVeryCloseProjectileCombos[getRand(this.AI.CounterVeryCloseProjectileCombos.length-1)]); }
    SagatAI.prototype.doCounterVeryVeryCloseProjectileCombo = function(key) { this.execute(this.AI.CounterVeryVeryCloseProjectileCombos[getRand(this.AI.CounterVeryVeryCloseProjectileCombos.length-1)]); }
    SagatAI.prototype.doCounterAirborneCombo = function(key) { this.execute(this.AI.ReactAirborneCombos[getRand(this.AI.ReactAirborneCombos.length-1)]); }
    SagatAI.prototype.doCounterNotAirborneCombo = function(key) { this.execute(this.AI.ReactNotAirborneCombos[getRand(this.AI.ReactNotAirborneCombos.length-1)]); }
    SagatAI.prototype.doRandomCloseCombo = function(key) { this.execute(this.AI.VeryCloseCombos[getRand(this.AI.VeryCloseCombos.length-1)]); }
    SagatAI.prototype.doRandomVeryCloseCombo = function(key) { this.execute(this.AI.CloseCombos[getRand(this.AI.CloseCombos.length-1)]); }
    SagatAI.prototype.doCounterFloat = function(key) { this.execute(this.AI.FloatCounters[getRand(this.AI.FloatCounters.length-1)]); }
    SagatAI.prototype.doCounterFarFloat = function(key) { this.execute(this.AI.FarFloatCounters[getRand(this.AI.FarFloatCounters.length-1)]); }

    SagatAI.prototype.execute = function(sequence)
    {
        var input = null;
        var mustHit = false;
        var autoContinue = false;
        for(var i = 0; i < sequence.length; ++i)
        {
            var requiredState = 0;
            //mustHit is applied after the array element at which it was found
            if(!!mustHit)
                sequence[i].H = true;
            if(!!autoContinue && sequence[i].AC === undefined)
                sequence[i].AC = true;

            if(!!sequence[i].MH)
                mustHit = true;
            if(!!sequence[i].AC)
                autoContinue = true;

            if(sequence[i].B == "lp1" || sequence[i].B == "lp2" || sequence[i].B == "lp3" || sequence[i].B == "lk1" || sequence[i].B == "lk2" || sequence[i].B == "lk3") { requiredState = POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1; }
            else if(sequence[i].B == "p1" || sequence[i].B == "p3" || sequence[i].B == "k1" || sequence[i].B == "k3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
            else if(sequence[i].B == "u1" || sequence[i].B == "u2" || sequence[i].B == "u3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
            else if(sequence[i].B == "tk1" || sequence[i].B == "tk2" || sequence[i].B == "tk3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
            else if(sequence[i].B == "hk1" || sequence[i].B == "hk2" || sequence[i].B == "hk3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
            else if(sequence[i].B == "fb1" || sequence[i].B == "fb2" || sequence[i].B == "fb3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1|POSE_FLAGS.ALLOW_INTERUPT_3; }
            else if(sequence[i].B == "lfb1" || sequence[i].B == "lfb2" || sequence[i].B == "lfb3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1|POSE_FLAGS.ALLOW_INTERUPT_3; }
            else if(sequence[i].B == "sfb1" || sequence[i].B == "sfb2" || sequence[i].B == "sfb3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
            else if(sequence[i].B == "p2" || sequence[i].B == "k2") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }

            input = null;
            switch(sequence[i].B)
            {
                case "j" : { this.AI.jumpUp(); break; } case "fj" : { this.AI.jumpTowardEnemy(); break; } case "bj" : { this.AI.jumpAwayFromEnemy(); break; }
                case "get_close" : { this.AI.moveToEnemy(0,sequence[i].C); break; } case "jump_in" : { if(this.AI.getClosestEnemy().X < (sequence[i].D || this.AI.TOO_CLOSE)) { return; }; this.AI.jumpInToEnemy(0,sequence[i].C); break; }
                case "lp1" : { input = lowPunches_[0]; break; } case "lp2" : { input = lowPunches_[1]; break; } case "lp3" : { input = lowPunches_[2]; break; }
                case "p1" : { input = punches_[0]; break; } case "p2" : { input = punches_[1]; break; } case "fp2" : { input = punches_[3]; break; } case "p3" : { input = punches_[2]; break; }
                case "k1" : { input = kicks_[0]; break; } case "k2" : { input = kicks_[1]; break; } case "k3" : { input = kicks_[2]; break; }
                case "lk1" : { input = lowKicks_[0]; break; } case "lk2" : { input = lowKicks_[1]; break; } case "lk3" : { input = lowKicks_[2]; break; }
                case "fb1" : { input = lightFireballInput_; break; } case "fb2" : { input = mediumFireballInput_; break; } case "fb3" : { input = hardFireballInput_; break; }
                case "lfb1" : { input = lightLowFireballInput_; break; } case "lfb2" : { input = mediumLowFireballInput_; break; } case "lfb3" : { input = hardLowFireballInput_; break; }
                case "sfb1" : { input = lightSuperFireballInput_; break; } case "sfb2" : { input = mediumSuperFireballInput_; break; } case "sfb3" : { input = hardSuperFireballInput_; break; }
                case "tk1" : { input = lightTiggerKneeInput_; break; } case "tk2" : { input = mediumTiggerKneeInput_; break; } case "tk3" : { input = hardTiggerKneeInput_; break; }
                case "u1" : { input = lightUppercutInput_; break; } case "u2" : { input = mediumUppercutInput_; break; } case "u3" : { input = hardUppercutInput_; break; }
                case "t1" : { this.executeThrow(0,true); break; }
                default: { this.AI.sendInput(FLAGS.CLEAR_INPUT,sequence[i].A || 0); break; }
            };
            this.AI.sendInput(FLAGS.CLEAR_INPUT,sequence[i].A || 0,input,sequence[i].H, undefined, sequence[i].AC, requiredState);
        }
        this.AI.sendInput(FLAGS.CLEAR_INPUT,2);
    }

    SagatAI.prototype.onEnemyDizzy = function(frame,attacker)
    {
        this.AI.reset();
        this.throwSuperFireball();
        this.AI.setBusy();
    }

    SagatAI.prototype.react = function(frame,attacker, isEnemyVulernerable, x, y)
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

    SagatAI.prototype.proact = function(frame)
    {
        if(!this.AI.Player.isMobile())
            return;

        if(!!this.AI.isAttackReactBusy())
            return;

        var item = this.AI.getClosestEnemy();
        if(item.Player.isUnhittable())
            return;

        var isEnemyAirborne = item.Player.isAirborne();

        var rnd = getRand();
        var ignoreSetBusy = false;

        if(this.AI.Actions.length != 0)
            return;

        if(item.X < CONSTANTS.GRAPPLE_DISTANCE)
        {
            this.AI.reset();
            if (!isEnemyAirborne && item.Player.isInThrowableState() && (rnd > 60))
                this.doVeryCloseCombo(0);
            else if(!isEnemyAirborne && rnd > 20)
                this.doCloseCombo(getRand(this.AI.CloseCombos.length-1));
            else if(rnd > 10)
                this.wanderBackward(50);

            /*
            if(item.Player.isInThrowableState() && (this.AI.JustBecameMobile > 0))
            {
                this.doVeryCloseCombo(0);
            }
            else
            {
                if (item.Player.isInThrowableState() && (rnd > 60))
                    this.doVeryCloseCombo(0);
                else if(rnd > 20)
                    this.doCloseCombo(getRand(this.AI.CloseCombos.length-1));
                else if(rnd > 10)
                    this.wanderBackward(50);
                this.AI.setBusy();
            }
            */
        }
        else if(!!this.AI.isBusy())
        {
            return;
        }
        else if(item.X < 100)
        {
            this.AI.reset();
            if(!isEnemyAirborne && rnd > 70)
                this.doRandomCloseCombo();
            else if(rnd > 30)
                this.wanderBackward(50);
            else if(!isEnemyAirborne && rnd > 15)
                this.executeFireball(getRand());
            else if(!isEnemyAirborne)
                this.executeLowFireball(getRand());
            else
                this.wanderBackward(50);

            this.AI.setBusy();
        }
        else if(item.X < 350)
        {
            this.AI.reset();
            if(rnd > 95)
                this.wanderBackward(50);
            else if(!isEnemyAirborne &&rnd > 80)
                this.doRandomVeryCloseCombo();
            else if(!isEnemyAirborne &&rnd > 50)
                this.doRandomCloseCombo();
            else if(!isEnemyAirborne &&rnd > 25)
                this.executeFireball(getRand());
            else if(!isEnemyAirborne)
                this.executeLowFireball(getRand());
            else
                this.wanderBackward(50);
            this.AI.setBusy();
        }
        else
        {
            this.AI.reset();
            if(rnd > 70)
                this.doRandomCloseCombo();
            else if(rnd > 30)
                this.executeFireball(getRand());
            else
                this.executeLowFireball(getRand());
        }
    }

    SagatAI.prototype.process = function(frame)
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


    SagatAI.prototype.frameMove = function(frame)
    {
        this.handleCombo(frame);
        this.process(frame);
    }


    SagatAI.prototype.handleCombo = function(frame)
    {
        if(this.AI.Actions.length > 0)
        {
            if((this.AI.Actions[0].Frame == 0))
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
                this.AI.Actions[0].Frame = Math.max(this.AI.Actions[0].Frame - 1,0);
            }
        }
    }

    return new SagatAI();
}