
var createMBison = function(user)
{
    var player = new Player("mbison",160,247,user);
    var folder = "images/misc/" + player.Folder;
    player.ForceNoAdjustShadowPosition = true;
    player.DefaultJumpSpeed = 1.5;
    player.BlockDistanceSq = 120000;
    player.BlockDistanceSq2 = 150000;
    player.StandingClip.Top = 80;
    player.StandingClip.Back = 30;


    player.DefaultShadowImageSrc = "200"
    player.DizzyOffset = {X:50,Y:200};
    player.Circle.OffsetY = 0;

    var stance = player.addAnimation(MISC_FLAGS.NONE,"stance",0,["stance"],0,false);
    stance.Flags = ({Player:PLAYER_FLAGS.ALLOW_CHANGE_DIRECTION | PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.STANDING});
    stance.addFrame(player,0,"",folder + "/r-stance-1.png",7,{Player:PLAYER_FLAGS.MOBILE},MISC_FLAGS.NONE,0,0,0,0,null,-26,-15,0,0,0,0,0,0);
    stance.addFrame(player,0,"",folder + "/r-stance-0.png",7,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-24,-15,0,0,0,0,0,0);
    stance.addFrame(player,0,"",folder + "/r-stance-1.png",7,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-26,-15,0,0,0,0,0,0);
    stance.addFrame(player,0,"",folder + "/r-stance-2.png",7,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-26,-13,0,0,0,0,0,0);
    stance.addFrame(player,0,"",folder + "/r-stance-3.png",7,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-26,-13,0,0,0,0,0,0);
    stance.addFrame(player,0,"",folder + "/r-stance-2.png",7,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-26,-13,0,0,0,0,0,0);

    var jump_land = player.addAnimation(MISC_FLAGS.NONE,"jump land",0,["jump-land"],0,false);
    jump_land.addFrameWithSound(player,1,"audio/misc/jump-land.zzz",0,"",folder + "/r-crouch-0.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,-38,-18,0,0,0,0,0,0);
    jump_land.addFrame(player,0,"",folder + "/r-stance-1.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,-26,-15,0,0,0,0,0,0);

    /*if this is not added,then only the first win animation will ever be used*/
    player.WinAnimationNames = ["win 1","win 2","win 3"];

    var win2 = player.addAnimation(MISC_FLAGS.NONE,"win 2",0,["win2"],0,false);
    win2.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX });
    win2.addFrameWithSound(player, 1, "audio/mbison/laugh-0.zzz",0,"",folder + "/x-win-1-0.png",4);
    win2.addFrame(player,0,"",folder + "/x-win-1-1.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-96);
    win2.addFrame(player,0,"",folder + "/x-win-1-2.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-110);
    win2.chain(win2,1);

    var win1 = player.addAnimation(MISC_FLAGS.NONE,"win 1",0,["win1"],0,false);
    win1.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX });
    win1.addFrame(player,0,"",folder + "/x-win-0-0.png",5);
    win1.addFrame(player,0,"",folder + "/x-win-0-1.png",5);
    win1.addFrame(player,0,"",folder + "/x-win-0-2.png",5);
    win1.addFrame(player,0,"",folder + "/x-win-0-3.png",5);
    win1.addFrame(player,0,"",folder + "/x-win-0-4.png",5);
    win1.addFrame(player,0,"",folder + "/x-win-0-5.png",5);
    win1.addFrame(player,0,"",folder + "/x-win-0-6.png",CONSTANTS.MAX_FRAME);
    win1.chain(win1,6);

    var win3 = player.addAnimation(MISC_FLAGS.NONE,"win 3",0,["win3"],0,false);
    win3.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX });
    win3.KeepCurrentAirborneFunctions = true;
    win3.AirborneStartDeltaY = 300;
    win3.Vy = 1;
    win3.Vx = 0;
    win3.NbFramesAirborneAdvance = nb;
    win3.VyFnArgs = {};
    win3.vyFn = (function(args)
    {
        var t = 0;
        var initialY = 50;
        return function(dy)
        {
            t += Math.PI*0.04;
            var retVal = (3*Math.sin(t)) + initialY;

            initialY = 0;
            return retVal;
        }
    });

    win3.addFrame(player, 0, "", folder + "/teleport-0.png", 3, {Player:PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -96, 0, 0, 0, 0, 0, 0, 0);
    win3.addFrame(player, 0, "", folder + "/teleport-1.png", 3, {Player:PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -96, 0, 0, 0, 0, 0, 0, 0);
    win3.addFrame(player, 0, "", folder + "/teleport-2.png", 3, {Player:PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -96, 11, 0, 0, 0, 0, 0, 0);
    win3.addFrame(player, 0, "", folder + "/teleport-3.png", 3, {Player:PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, 2, 21, 0, 0, 0, 0, 0, 0);
    win3.addFrame(player, 0, "", folder + "/teleport-4.png", 3, {Player:PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, 7, 26, 0, 0, 0, 0, 0, 0);
    win3.addFrame(player, 0, "", folder + "/teleport-4.png", 20, {Player:PLAYER_FLAGS.INVISIBLE|PLAYER_FLAGS.IGNORE_COLLISIONS}, MISC_FLAGS.NONE, 0, 0, 0, 0, null, 7, 26, 0, 0, 0, 0, 0, 0);

    win3.addFrameWithSound(player, 1, "audio/mbison/laugh-1.zzz",0,"",folder + "/x-win-2-0.png",1,{Pose: POSE_FLAGS.AIRBORNE,Player:PLAYER_FLAGS.IGNORE_COLLISIONS},MISC_FLAGS.NONE,0,0,0,0,null,-96,0);
    win3.addFrame(player,0,"",folder + "/x-win-2-0.png",1,{Pose: POSE_FLAGS.AIRBORNE,Player:PLAYER_FLAGS.IGNORE_COLLISIONS},MISC_FLAGS.NONE,0,0,0,0,null,-96,0);
    win3.addFrame(player,0,"",folder + "/x-win-2-0.png",4,{Player:PLAYER_FLAGS.IGNORE_COLLISIONS},MISC_FLAGS.NONE,0,0,0,0,null,-96,0);
    win3.addFrame(player,0,"",folder + "/x-win-2-1.png",4,{Player:PLAYER_FLAGS.IGNORE_COLLISIONS},MISC_FLAGS.NONE,0,0,0,0,null,-82,0);
    win3.chain(win3,7);

    var crouch = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD,"crouch",5,[BUTTONS.CROUCH],99,false);
    crouch.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.JUMP,State:BUTTON_STATE.NONE}]);
    crouch.ButtonCount = 1;
    crouch.Flags = ({Player:PLAYER_FLAGS.ALLOW_CHANGE_DIRECTION | PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.CROUCHING});
    crouch.addFrame(player,0,"",folder + "/r-crouch-0.png",3,{Player:PLAYER_FLAGS.MOBILE},MISC_FLAGS.NONE,0,0,0,0,null,-38,-18,0,0,0,0,0,0);
    crouch.addFrame(player,0,"",folder + "/r-crouch-1.png",3,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,0,0,0,0,null,-63,-13,0,0,0,0,0,0);
    crouch.addFrame(player,0,"",folder + "/r-crouch-2.png",3,{Player:PLAYER_FLAGS.HOLD_FRAME|PLAYER_FLAGS.MOBILE},MISC_FLAGS.NONE,0,0,0,0,null,-73,-15,0,0,0,0,0,0);
    crouch.addFrame(player,0,"",folder + "/r-crouch-1.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-63,-13,0,0,0,0,0,0);
    crouch.addFrame(player,0,"",folder + "/r-crouch-0.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-38,-18,0,0,0,0,0,0);

    var hitReact_cLH = player.addAnimation(POSE_FLAGS.CROUCHING,"hr crouch light",0,["hr_cLH"],0,false);
    hitReact_cLH.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX,Pose: POSE_FLAGS.CROUCHING });
    hitReact_cLH.addFrame(player,0,"",folder + "/hit-cln-0.png",8,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,null,-64,-16);
    hitReact_cLH.chain(crouch,2);

    var hitReact_cMH = player.addAnimation(POSE_FLAGS.CROUCHING,"hr crouch medium",0,["hr_cMH"],0,false);
    hitReact_cMH.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX,Pose: POSE_FLAGS.CROUCHING });
    hitReact_cMH.addFrame(player,0,"",folder + "/hit-cln-0.png",8,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,null,-64,-16);
    hitReact_cMH.addFrame(player,0,"",folder + "/hit-chn-0.png",8,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-60,-16);
    hitReact_cMH.addFrame(player,0,"",folder + "/hit-cln-0.png",8,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-64,-16);
    hitReact_cMH.chain(crouch,2);

    var hitReact_cHH = player.addAnimation(POSE_FLAGS.CROUCHING,"hr crouch hard",0,["hr_cHH"],0,false);
    hitReact_cHH.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX,Pose: POSE_FLAGS.CROUCHING });
    hitReact_cHH.addFrame(player,0,"",folder + "/hit-chn-0.png",8,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,null,-60,-16);
    hitReact_cHH.addFrame(player,0,"",folder + "/hit-chn-1.png",8,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-60,-16);
    hitReact_cHH.addFrame(player,0,"",folder + "/hit-cln-0.png",8,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-64,-16);
    hitReact_cHH.chain(crouch,2);


    var hitReact_sLL = player.addAnimation(POSE_FLAGS.STANDING,"hr_sLL",0,["hr_sLL"],0,false);
    hitReact_sLL.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sLL.addFrame(player,0,"",folder + "/hit-sln-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -8, -20, 0, 0, 0, 0, 0, 0);
    hitReact_sLL.addFrameWithSound(player,1,"audio/mbison/clocked.zzz",0,"",folder + "/hit-sln-1.png",8,MISC_FLAGS.NONE, MISC_FLAGS.NONE, 0, 0, 0, 0, null, -37, -20, 0, 0, 0, 0, 0, 0);
    hitReact_sLL.addFrame(player,0,"",folder + "/hit-sln-0.png",8,MISC_FLAGS.NONE,MISC_FLAGS.NONE, 0, 0, 0, 0, null, -8, -20, 0, 0, 0, 0, 0, 0);

    var hitReact_sLH = player.addAnimation(POSE_FLAGS.STANDING,"hr_sLH",0,["hr_sLH"],0,false);
    hitReact_sLH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sLH.addFrame(player,0,"",folder + "/hit-sln-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -8, -20, 0, 0, 0, 0, 0, 0);
    hitReact_sLH.addFrameWithSound(player,1,"audio/mbison/clocked.zzz",0,"",folder + "/hit-sln-1.png",8,MISC_FLAGS.NONE, MISC_FLAGS.NONE, 0, 0, 0, 0, null, -37, -20, 0, 0, 0, 0, 0, 0);
    hitReact_sLH.addFrame(player,0,"",folder + "/hit-sln-0.png",8,MISC_FLAGS.NONE,MISC_FLAGS.NONE, 0, 0, 0, 0, null, -8, -20, 0, 0, 0, 0, 0, 0);

    var hitReact_sML = player.addAnimation(POSE_FLAGS.STANDING,"hr_sML",0,["hr_sML"],0,false);
    hitReact_sML.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sML.addFrame(player,0,"",folder + "/hit-smn-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -9, -13, 0, 0, 0, 0, 0, 0);
    hitReact_sML.addFrame(player,0,"",folder + "/hit-smf-1.png",8,MISC_FLAGS.NONE, MISC_FLAGS.NONE, 0, 0, 0, 0, null, 0, -13, 0, 0, 0, 0, 0, 0);
    hitReact_sML.addFrame(player,0,"",folder + "/hit-smf-2.png",8,MISC_FLAGS.NONE, MISC_FLAGS.NONE, 0, 0, 0, 0, null, -10, -23, 0, 0, 0, 0, 0, 0);

    var hitReact_sMH = player.addAnimation(POSE_FLAGS.STANDING,"hr_sMH",0,["hr_sMH"],0,false);
    hitReact_sMH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sMH.addFrame(player, 0, "", folder + "/hit-smn-1.png", 3, MISC_FLAGS.NONE, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -37, -20, 0, 0, 0, 0, 0, 0);
    hitReact_sMH.addFrame(player, 0, "", folder + "/hit-smn-1.png", 3, MISC_FLAGS.NONE, MISC_FLAGS.NONE, 0, 0, 0, 0, null, -46, -24, 0, 0, 0, 0, 0, 0);
    hitReact_sMH.addFrame(player, 0, "", folder + "/hit-sln-1.png", 3, MISC_FLAGS.NONE, MISC_FLAGS.NONE, 0, 0, 0, 0, null, -35, -20, 0, 0, 0, 0, 0, 0);

    var hitReact_sHL = player.addAnimation(POSE_FLAGS.STANDING,"hr_sHL",0,["hr_sHL"],0,false);
    hitReact_sHL.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sHL.addFrame(player,0,"",folder + "/hit-smf-1.png",4,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -46, -24, 0, 0, 0, 0, 0, 0).clipMove({Front:100});
    hitReact_sHL.addFrameWithSound(player,1,"audio/mbison/clocked.zzz",0,"",folder + "/hit-shn-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -82, -29, 0, 0, 0, 0, 0, 0).clipMove({Front:100});
    hitReact_sHL.addFrame(player,0,"",folder + "/hit-sln-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -37, -20, 0, 0, 0, 0, 0, 0).clipMove({Front:100});

    var hitReact_sHH = player.addAnimation(POSE_FLAGS.STANDING,"hr_sHH",0,["hr_sHH"],0,false);
    hitReact_sHH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sHH.addFrame(player,0,"",folder + "/hit-smn-1.png",4,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -46, -24, 0, 0, 0, 0, 0, 0);
    hitReact_sHH.addFrameWithSound(player,1,"audio/mbison/clocked.zzz",0,"",folder + "/hit-shn-1.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -82, -29, 0, 0, 0, 0, 0, 0);
    hitReact_sHH.addFrame(player,0,"",folder + "/hit-sln-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -37, -20, 0, 0, 0, 0, 0, 0);

    var getup = player.addAnimation(MISC_FLAGS.NONE,"getup",0,["hr_getup"],0,false);
    getup.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    getup.addFrameWithSound(player,1,"audio/misc/floored-1.zzz",0,"200",folder + "/hit-trip-3.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS,Spawn:SPAWN_FLAGS.SPAWN_SMALLDIRT},{Player:PLAYER_FLAGS.MOBILE});
    getup.addFrame(player,0,"",folder + "/down.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS}, 0, 0, 0, 0, 0, null, 0, -15);
    getup.addFrame(player,0,"",folder + "/getup-0.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player,0,"",folder + "/getup-1.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player,0,"",folder + "/getup-2.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player,0,"",folder + "/getup-3.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player,0,"",folder + "/r-crouch-0.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS},MISC_FLAGS.NONE,0,0,0,0,null,-38,-18);

    var hitReact_bounce = player.addAnimation(MISC_FLAGS.NONE,"bounce",0,["hr_bounce"],0,false);
    hitReact_bounce.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX | PLAYER_FLAGS.USE_CURRENT_VX});
    hitReact_bounce.chainVxFn = (function(v){ return v * 0.75; });
    hitReact_bounce.chainVyFn = (function(v){ return v * 0.5; });
    hitReact_bounce.Vy = (80);
    hitReact_bounce.addFrameWithSound(player,1,"audio/misc/floored-2.zzz",0,"200",folder + "/hit-trip-2.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS,Spawn:SPAWN_FLAGS.SPAWN_BIGDIRT},{Player:PLAYER_FLAGS.MOBILE},0,1);
    hitReact_bounce.addFrame(player,0,"200",folder + "/hit-trip-3.png",CONSTANTS.FRAME_MAX,{Pose:POSE_FLAGS.AIRBORNE,Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS},{Player: PLAYER_FLAGS.MOBILE});
    hitReact_bounce.chain(getup);

    var hitReact_trip = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING,"tripped",0,["hr_trip"],0,false);
    hitReact_trip.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX, Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_trip.Vx = (25);
    hitReact_trip.Vy = (150);
    hitReact_trip.addFrame(player,0,"",folder + "/hit-trip-0.png",32,{Player:PLAYER_FLAGS.INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,0,50);
    hitReact_trip.addFrame(player,0,"",folder + "/hit-trip-1.png",8,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_trip.addFrame(player,0,"",folder + "/hit-trip-2.png",CONSTANTS.FRAME_MAX,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_trip.chain(hitReact_bounce);

    var dizzy = player.addAnimation(MISC_FLAGS.NONE,"so dizzy",0,["hr_sodizzy"],0,false);
    dizzy.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX, Alert: ALERT_FLAGS.DIZZY });
    dizzy.AdjustShadowPosition = false;
    dizzy.addFrame(player,0,"",folder + "/dizzy-0.png",32,{ Player: PLAYER_FLAGS.DIZZY },{Player: PLAYER_FLAGS.MOBILE},0,0,0,0,null,-15,-10);
    dizzy.addFrame(player,0,"",folder + "/dizzy-1.png",32,{ Player: PLAYER_FLAGS.DIZZY },MISC_FLAGS.NONE,0,0,0,0,null,-20,-12);
    dizzy.addFrame(player,0,"",folder + "/dizzy-2.png",32,{ Player: PLAYER_FLAGS.DIZZY },MISC_FLAGS.NONE,0,0,0,0,null,-10,-12);
    dizzy.addFrame(player,0,"",folder + "/dizzy-1.png",32,{ Player: PLAYER_FLAGS.DIZZY },MISC_FLAGS.NONE,0,0,0,0,null,-20,-12);
    dizzy.chain(dizzy);

    var getup_dizzy = player.addAnimation(MISC_FLAGS.NONE,"getup dizzy",0,["hr_getupdizzy"],0,false);
    getup_dizzy.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX });
    getup_dizzy.addFrameWithSound(player,1,"audio/misc/floored-1.zzz",0,"200",folder + "/hit-trip-3.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS,Spawn:SPAWN_FLAGS.SPAWN_SMALLDIRT},{Player:PLAYER_FLAGS.MOBILE});
    getup_dizzy.addFrame(player,0,"200",folder + "/down.png",4,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS });
    getup_dizzy.addFrame(player,0,"",folder + "/getup-0.png",4,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS });
    getup_dizzy.addFrame(player,0,"",folder + "/getup-1.png",4,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS });
    getup_dizzy.addFrame(player,0,"",folder + "/getup-2.png",4,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS });
    getup_dizzy.addFrame(player,0,"",folder + "/getup-3.png",4,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS });
    getup_dizzy.addFrame(player,0,"",folder + "/crouch-0.png",4,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS });
    getup_dizzy.chain(dizzy);

    var hitReact_dizzyBounce = player.addAnimation(MISC_FLAGS.NONE,"dizzy bounce",0,["hr_dizzybounce"],0,false);
    hitReact_dizzyBounce.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX | PLAYER_FLAGS.USE_CURRENT_VX });
    hitReact_dizzyBounce.chainVxFn = (function(v){ return v * 0.75; });
    hitReact_dizzyBounce.Vy = (80);
    hitReact_dizzyBounce.addFrameWithSound(player,1,"audio/misc/floored-2.zzz",0,"200",folder + "/hit-trip-2.png",4,{ Player: PLAYER_FLAGS.INVULNERABLE | PLAYER_FLAGS.IGNORE_COLLISIONS,Spawn: SPAWN_FLAGS.SPAWN_BIGDIRT },{ Player: PLAYER_FLAGS.MOBILE },0,1);
    hitReact_dizzyBounce.addFrame(player,0,"",folder + "/hit-trip-3.png",CONSTANTS.FRAME_MAX,{ Pose: POSE_FLAGS.AIRBORNE,Player: PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS });
    hitReact_dizzyBounce.chain(getup_dizzy);

    var hitReact_dizzy = player.addAnimation(POSE_FLAGS.STANDING,"dizzy",0,["hr_dizzy"],0,false);
    hitReact_dizzy.Flags = ({ Player: PLAYER_FLAGS.MOVE_TO_FRONT });
    hitReact_dizzy.Vx = (35);
    hitReact_dizzy.Vy = (200);
    hitReact_dizzy.addFrame(player,0,"200",folder + "/hit-floored-0.png",32,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS },{Player: PLAYER_FLAGS.MOBILE} ,1, 0, 0, 0, null, -26, 0, 0, 0, 0, 0, 0, 0);
    hitReact_dizzy.addFrame(player,0,"200",folder + "/hit-floored-1.png",CONSTANTS.FRAME_MAX,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE | PLAYER_FLAGS.IGNORE_ATTACKS }, MISC_FLAGS.NONE, 0, 0, 0, 0, null, -37, -17, 0, 0, 0, 0, 0, 0);
    hitReact_dizzy.chain(hitReact_dizzyBounce);

    var hitReact_air = player.addAnimation(POSE_FLAGS.AIRBORNE,"hit in air",0,["hr_air"],0,false);
    hitReact_air.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX, Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_air.Vx = (-40);
    hitReact_air.Vy = (110);
    hitReact_air.addFrame(player,0,"200",folder + "/hit-floored-0.png",20,{ Player: PLAYER_FLAGS.INVULNERABLE },{Player:PLAYER_FLAGS.MOBILE},1,0,0,0,null,-26,0,0,0,0,0,0,0);
    hitReact_air.addRepeatingFrame(player,-11,"168",folder + "/jump-5.png",2,{ Player: PLAYER_FLAGS.INVULNERABLE },MISC_FLAGS.NONE);
    hitReact_air.addRepeatingFrame(player,-11,"168",folder + "/jump-4.png",2, { Player: PLAYER_FLAGS.INVULNERABLE },MISC_FLAGS.NONE,0,0,0,0,-94,0);
    hitReact_air.addRepeatingFrame(player,10,"136",folder + "/jump-3.png",2, { Player: PLAYER_FLAGS.INVULNERABLE },MISC_FLAGS.NONE,0,0,0,0,-84,0);
    hitReact_air.addRepeatingFrame(player,-11,"168",folder + "/jump-2.png",2, { Player: PLAYER_FLAGS.INVULNERABLE },MISC_FLAGS.NONE,0,0,0,0,-62,0);
    hitReact_air.addRepeatingFrame(player,-11,"168",folder + "/jump-1.png", CONSTANTS.FRAME_MAX, { Player: PLAYER_FLAGS.INVULNERABLE },MISC_FLAGS.NONE);
    hitReact_air.chain(jump_land);

    var hitReact_red_fire = player.addAnimation(POSE_FLAGS.STANDING,"red fire",0,["hr_red_fire"],0,false);
    hitReact_red_fire.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX, Combat : COMBAT_FLAGS.IGNORE_CLEAR_FIRE, Juggle:JUGGLE_FLAGS.ALLOW  });
    hitReact_red_fire.Vx = (25);
    hitReact_red_fire.Vy = (200);
    hitReact_red_fire.IsLooping = true;
    hitReact_red_fire.addFrame(player,0,"200",folder + "/hr-rfire-01.png",2,{ Player: PLAYER_FLAGS.INVULNERABLE },{Player:PLAYER_FLAGS.MOBILE},1);
    hitReact_red_fire.addFrame(player,0,"200",folder + "/hr-rfire-02.png",2,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE });
    hitReact_red_fire.chain(hitReact_bounce);

    var hitReact_blue_fire = player.addAnimation(POSE_FLAGS.STANDING,"blue fire",0,["hr_blue_fire"],0,false);
    hitReact_blue_fire.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX, Combat : COMBAT_FLAGS.IGNORE_CLEAR_FIRE, Juggle:JUGGLE_FLAGS.ALLOW  });
    hitReact_blue_fire.Vx = (50);
    hitReact_blue_fire.Vy = (150);
    hitReact_blue_fire.IsLooping = true;
    hitReact_blue_fire.addFrame(player,0,"200",folder + "/hr-bfire-01.png",2,{ Player: PLAYER_FLAGS.INVULNERABLE },{Player:PLAYER_FLAGS.MOBILE},1);
    hitReact_blue_fire.addFrame(player,0,"200",folder + "/hr-bfire-02.png",2,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE });
    hitReact_blue_fire.chain(hitReact_bounce);

    var hitReact_knockDown = player.addAnimation(POSE_FLAGS.STANDING,"knock down",0,["hr_knockdown"],0,false);
    hitReact_knockDown.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX, Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_knockDown.Vx = (25);
    hitReact_knockDown.Vy = (150);
    hitReact_knockDown.addFrame(player,0,"200",folder + "/hit-floored-0.png",32,{ Player: PLAYER_FLAGS.INVULNERABLE },{Player:PLAYER_FLAGS.MOBILE} ,1, 0, 0, 0, null, -26, 0, 0, 0, 0, 0, 0, 0);
    hitReact_knockDown.addFrame(player,0,"200",folder + "/hit-floored-1.png",CONSTANTS.FRAME_MAX,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE }, MISC_FLAGS.NONE, 0, 0, 0, 0, null, -37, -17, 0, 0, 0, 0, 0, 0);
    hitReact_knockDown.chain(hitReact_bounce);


    var down = player.addAnimation(MISC_FLAGS.NONE,"down",0,["hr_down"],0,false);
    down.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    down.addFrameWithSound(player,1,"audio/misc/floored-1.zzz",0,"200",folder + "/down.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE,Spawn:SPAWN_FLAGS.SPAWN_SMALLDIRT},{Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, 0, -15);

    var hitReact_deadBounce = player.addAnimation(MISC_FLAGS.NONE,"dead bounce",0,["hr_deadbounce"],0,false);
    hitReact_deadBounce.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX | PLAYER_FLAGS.USE_CURRENT_VX });
    hitReact_deadBounce.chainVxFn = (function(v){ return v * 0.75; });
    hitReact_deadBounce.Vy = (80);
    hitReact_deadBounce.addFrameWithSound(player,1,"audio/misc/floored-2.zzz",0,"200",folder + "/hit-trip-2.png",4,{Player:PLAYER_FLAGS.INVULNERABLE|PLAYER_FLAGS.IGNORE_COLLISIONS,Spawn:SPAWN_FLAGS.SPAWN_BIGDIRT},{Player:PLAYER_FLAGS.MOBILE},0,1);
    hitReact_deadBounce.addFrame(player,0,"200",folder + "/hit-trip-3.png",CONSTANTS.FRAME_MAX,{Pose:POSE_FLAGS.AIRBORNE,Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS|PLAYER_FLAGS.IGNORE_COLLISIONS},{Player:PLAYER_FLAGS.MOBILE});
    hitReact_deadBounce.chain(down);

    var hitReact_dead = player.addAnimation(POSE_FLAGS.STANDING,"hr dead",0,["hr_dead"],0,false);
    hitReact_dead.Flags = ({Player:PLAYER_FLAGS.MOVE_TO_FRONT, Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_dead.Vx = (35);
    hitReact_dead.Vy = (200);
    hitReact_dead.addFrame(player,0,"200",folder + "/hit-floored-0.png",32,{ Player:PLAYER_FLAGS.INVULNERABLE | PLAYER_FLAGS.IGNORE_COLLISIONS },0,1);
    hitReact_dead.addFrame(player,0,"200",folder + "/hit-floored-1.png",CONSTANTS.FRAME_MAX,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE|PLAYER_FLAGS.IGNORE_COLLISIONS});
    hitReact_dead.chain(hitReact_deadBounce);

    var hitReact_eject = player.addAnimation(POSE_FLAGS.STANDING,"eject",0,["eject"],0,false);
    hitReact_eject.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX, Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_eject.Vx = (35);
    hitReact_eject.Vy = (200);
    hitReact_eject.addFrame(player,0,"",folder + "/hit-floored-0.png",32,{Player:PLAYER_FLAGS.INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE},0,1);
    hitReact_eject.addFrame(player,0,"",folder + "/hit-floored-1.png",CONSTANTS.FRAME_MAX,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE,Juggle:JUGGLE_FLAGS.IGNORE});
    hitReact_eject.chain(hitReact_bounce);


    var hitReact_shoulder_throw = player.addAnimation(POSE_FLAGS.ANY,"shoulder throw",0,["shoulder_throw"],0,false);
    hitReact_shoulder_throw.IsImplicit = true;
    hitReact_shoulder_throw.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX });
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/hit-sln-0.png",8,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,0,-104,0);
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/hit-smf-2.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-104,0);
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/hit-smn-1-f.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-140,169).set({IsFlipped:true});
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/hit-sln-0-f.png",6,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,46,133).set({IsFlipped:true});
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/hit-smf-2-f.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,-117,70,0,0,0,0,0);


    var hitReact_bison_shoulder_throw = player.addAnimation(POSE_FLAGS.ANY,"bison shoulder throw",0,["bison_shoulder_throw"],0,false);
    hitReact_bison_shoulder_throw.IsImplicit = true;
    hitReact_bison_shoulder_throw.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX });
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/hit-sln-0.png",8,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,0,-104,0);
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/hit-smf-2.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-104,0);
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/hit-smn-1-f.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-140,169).set({IsFlipped:true});
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/hit-sln-0-f.png",6,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,46,133).set({IsFlipped:true});
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/hit-smf-2-f.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,-117,70,0,0,0,0,0);


    var hitReact_fk_throw = player.addAnimation(POSE_FLAGS.ANY,"fk throw",0,["fk_throw"],0,false);
    hitReact_fk_throw.IsImplicit = true;
    hitReact_fk_throw.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX });
    hitReact_fk_throw.addFrame(player,0,"",folder + "/hit-sln-0.png",8,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,0,-104,0);
    hitReact_fk_throw.addFrame(player,0,"",folder + "/hit-smf-2.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-104,0);
    hitReact_fk_throw.addFrame(player,0,"",folder + "/hit-smn-1-f.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-151,72).set({IsFlipped:true});
    hitReact_fk_throw.addFrame(player,0,"",folder + "/hit-smn-0-f.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,-99,102,0,0,0,0,0);



    var hitReact_roll_throw = player.addAnimation(POSE_FLAGS.ANY,"roll throw",0,["roll_throw"],0,false);
    hitReact_roll_throw.IsImplicit = true;
    hitReact_roll_throw.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-sln-0.png",8,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,0,-104,0);
    hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-smf-2.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-104,0);
    for(var i = 0; i < 2; ++i)
    {
        hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-floored-0-f.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-70,72);
        hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-smf-2-f.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,54,-35);
        hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-floored-0.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-25,-94);
        hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-smf-2.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-97,-35);
    }
    hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-smn-1-f.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-137,72).set({IsFlipped:true});
    hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-smn-0-f.png",6,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,-160,50,0,0,0,0,0);



    var jumpX = 36;
    var jumpY = 230;

    var jump = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"jump",0,[BUTTONS.JUMP],95,false);
    jump.ButtonSequence.push([{Button:BUTTONS.JUMP,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.NONE}]);
    jump.ButtonCount = 1;
    jump.UseJumpSpeed = true;
    jump.Vy = (jumpY);
    jump.UserData = { Type: USER_DATA_TYPES.OFFSET,clipTop: 0,clipBottom: 80 };
    jump.addRepeatingFrame(player,0,"",folder + "/jump-0.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-38,-18,0,0,0,0,0,0);
    jump.addRepeatingFrame(player,-11,"168",folder + "/jump-1.png",6,{ Pose: POSE_FLAGS.AIRBORNE },MISC_FLAGS.NONE,0,0,0,0,0,0,0,0,0,0,0,0);
    jump.addRepeatingFrame(player,-11,"168",folder + "/jump-2.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-62,0,0,0,0,0,0,0);
    jump.addRepeatingFrame(player,10,"136",folder + "/jump-3.png",20,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-84,0,0,0,0,0,0,0);
    jump.addRepeatingFrame(player,-11,"168",folder + "/jump-4.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-94,0,0,0,0,0,0,0);
    jump.addRepeatingFrame(player,-11,"168",folder + "/jump-5.png",CONSTANTS.FRAME_MAX,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,0,0,0,0,0,0,0);
    jump.chain(jump_land);

    var f_jump = player.addAnimation(POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD,"forward jump",0,[BUTTONS.FORWARD | BUTTONS.JUMP],95,false);
    f_jump.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE},{Button:BUTTONS.JUMP,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED}]);
    f_jump.ButtonCount = 2;
    f_jump.UseJumpSpeed = true;
    f_jump.Vy = (jumpY);
    f_jump.Vx = (jumpX);
    f_jump.UserData = { Type: USER_DATA_TYPES.OFFSET,clipTop: 0,clipBottom: 80 };
    f_jump.addRepeatingFrame(player,0,"",folder + "/jump-0.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-38,-18,0,0,0,0,0,0);
    f_jump.addRepeatingFrame(player,-11,"168",folder + "/jump-1.png",6,{ Pose: POSE_FLAGS.AIRBORNE },MISC_FLAGS.NONE,0,0,0,0,0,0,0,0,0,0,0,0).clip({Bottom:200});
    f_jump.addRepeatingFrame(player,-11,"168",folder + "/jump-2.png",6,{Player: PLAYER_FLAGS.SMALLER_AABB},MISC_FLAGS.NONE,0,0,0,0,-62,0,0,0,0,0,0,0).clip({Bottom:80});
    f_jump.addRepeatingFrame(player,10,"136",folder + "/jump-3.png",20,{Player: PLAYER_FLAGS.SMALLER_AABB},MISC_FLAGS.NONE,0,0,0,0,-84,0,0,0,0,0,0,0).clip({Bottom:80});
    f_jump.addRepeatingFrame(player,-11,"168",folder + "/jump-4.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-94,0,0,0,0,0,0,0).clip({Bottom:80});
    f_jump.addRepeatingFrame(player,-11,"168",folder + "/jump-5.png",CONSTANTS.FRAME_MAX,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,0,0,0,0,0,0,0).clip({Bottom:80});
    f_jump.chain(jump_land);

    var b_jump = player.addAnimation(POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD,"forward jump",0,[BUTTONS.BACK | BUTTONS.JUMP],95,false);
    b_jump.ButtonSequence.push([{Button:BUTTONS.FORWARD,State:BUTTON_STATE.NONE},{Button:BUTTONS.JUMP,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    b_jump.ButtonCount = 2;
    b_jump.UseJumpSpeed = true;
    b_jump.Vy = (jumpY);
    b_jump.Vx = (-jumpX);
    b_jump.UserData = { Type: USER_DATA_TYPES.OFFSET,clipTop: 0,clipBottom: 80 };
    b_jump.addRepeatingFrame(player,0,"",folder + "/jump-0.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-38,-18,0,0,0,0,0,0).clip({Bottom:80});
    b_jump.addRepeatingFrame(player,-11,"168",folder + "/jump-1.png",6,{ Pose: POSE_FLAGS.AIRBORNE },MISC_FLAGS.NONE,0,0,0,0,0,0,0,0,0,0,0,0).clip({Bottom:80});
    b_jump.addRepeatingFrame(player,-11,"168",folder + "/jump-2.png",6,{Player: PLAYER_FLAGS.SMALLER_AABB},MISC_FLAGS.NONE,0,0,0,0,-62,0,0,0,0,0,0,0).clip({Bottom:80});
    b_jump.addRepeatingFrame(player,10,"136",folder + "/jump-3.png",20,{Player: PLAYER_FLAGS.SMALLER_AABB},MISC_FLAGS.NONE,0,0,0,0,-84,0,0,0,0,0,0,0).clip({Bottom:80});
    b_jump.addRepeatingFrame(player,-11,"168",folder + "/jump-4.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-94,0,0,0,0,0,0,0).clip({Bottom:80});
    b_jump.addRepeatingFrame(player,-11,"168",folder + "/jump-5.png",CONSTANTS.FRAME_MAX,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,0,0,0,0,0,0,0).clip({Bottom:80});
    b_jump.chain(jump_land);

    var quickTurn = player.addAnimation(POSE_FLAGS.STANDING,"quick turn",0,["quck_turn"],0,false);
    quickTurn.Flags = ({Player:PLAYER_FLAGS.MOBILE,Pose:POSE_FLAGS.STANDING});
    quickTurn.addFrame(player, 0, "200", folder + "/turn-2.png", 1, MISC_FLAGS.NONE, MISC_FLAGS.NONE, 0, 0, 0, 0, null, -30, -16, 0, 0, 0, 0, 0, 0);


    var turn = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"turn",0,["turn"],0,false);
    turn.ButtonSequence.push([{Button:BUTTONS.TURN_AROUND,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    turn.ButtonCount = 1;
    turn.Flags = ({Player:PLAYER_FLAGS.MOBILE,Pose:POSE_FLAGS.STANDING|POSE_FLAGS.QUICK_CHANGE_DIRECTION});
    turn.addFrame(player, 0, "200", folder + "/turn-0.png", 2, MISC_FLAGS.NONE, MISC_FLAGS.NONE, 0, 0, 0, 0, null, -11, -18, 0, 0, 0, 0, 0, 0).clipMove({Top:80,Back:20,Front:20});
    turn.addFrame(player, 0, "200", folder + "/turn-1.png", 2, MISC_FLAGS.NONE, MISC_FLAGS.NONE, 0, 0, 0, 0, null, -74, -5, 0, 0, 0, 0, 0, 0).clipMove({Top:80,Back:20,Front:20});
    turn.addFrame(player, 0, "200", folder + "/turn-2.png", 2, MISC_FLAGS.NONE, MISC_FLAGS.NONE, 0, 0, 0, 0, null, -30, -16, 0, 0, 0, 0, 0, 0).clipMove({Top:80,Back:20,Front:20});

    var cturn = player.addAnimation(POSE_FLAGS.CROUCHING,"crouch turn",0,["turn"],0,false);
    cturn.ButtonSequence.push([{Button:BUTTONS.TURN_AROUND,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    cturn.ButtonCount = 1;
    cturn.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX|PLAYER_FLAGS.MOBILE,Pose:POSE_FLAGS.CROUCHING});
    cturn.addFrame(player,0,"",folder + "/cturn-0.png",2,MISC_FLAGS.NONE, MISC_FLAGS.NONE, 0, 0, 0, 0, null, -30, 0, 0, 0, 0, 0, 0, 0);
    cturn.addFrame(player,0,"",folder + "/cturn-1.png",2, MISC_FLAGS.NONE, MISC_FLAGS.NONE, 0, 0, 0, 0, null, -90, -10, 0, 0, 0, 0, 0, 0);
    cturn.addFrame(player,0,"",folder + "/r-crouch-2.png",2, MISC_FLAGS.NONE,MISC_FLAGS.NONE, 0, 0, 0, 0, null, -90, -28, 0, 0, 0, 0, 0, 0);
    cturn.chain(crouch,2);

    var forceTurn = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"force turn",0,["force turn"],0,false);
    forceTurn.ButtonSequence.push([btn(BUTTONS.TURN_AROUND,BUTTON_STATE.PRESSED,0,1)]);
    forceTurn.ButtonCount = 1;
    forceTurn.IsMisc = true;
    forceTurn.Flags = ({Player:PLAYER_FLAGS.MOBILE,Pose:POSE_FLAGS.STANDING|POSE_FLAGS.FORCE_CHANGE_TARGET});

    var forceCTurn = player.addAnimation(POSE_FLAGS.CROUCHING,"force crouch turn",0,["force cturn"],0,false);
    forceCTurn.ButtonSequence.push([btn(BUTTONS.TURN_AROUND,BUTTON_STATE.PRESSED,0,1)]);
    forceCTurn.ButtonCount = 1;
    forceCTurn.IsMisc = true;
    forceCTurn.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX|PLAYER_FLAGS.MOBILE,Pose:POSE_FLAGS.CROUCHING|POSE_FLAGS.FORCE_CHANGE_TARGET});


    var blockRelease = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_BLOCK,"block release",0,["block_relase"],-2,false);
    blockRelease.Flags = ({Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.MOVE_TO_BACK});
    blockRelease.addFrame(player,0,"",folder+"/block-1.png",2,{Player:PLAYER_FLAGS.BLOCKING},MISC_FLAGS.NONE,0,0,0,0,null,-74,-23,0,0,0,0,0,0).clip({Front:50});
    blockRelease.addFrame(player,0,"",folder+"/block-0.png",2,{Player:PLAYER_FLAGS.BLOCKING},MISC_FLAGS.NONE,0,0,0,0,null,-34,-23,0,0,0,0,0,0).clip({Front:50});
    /*The POSE_FLAGS.ALLOW_BLOCK is checked seperately,it absolutely must be there,or else the move will not be found!
    Only one of the other flags need to match*/
    var block = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_BLOCK,"block",0,[BUTTONS.BACK],-2,false);
    block.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    block.ButtonCount = 1;
    block.Flags = ({Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.MOVE_TO_BACK});
    block.addFrame(player,0,"",folder+"/block-0.png",1,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.IGNORE_HOLD_FRAME},MISC_FLAGS.NONE,0,0,0,0,null,-34,-23).clip({Front:50});
    block.addFrame(player,0,"",folder+"/block-1.png",4,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,0,0,0,0,null,-74,-23).clip({Front:50});
    block.addFrame(player,0,"",folder+"/block-1.png",4,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.HOLD_FRAME},MISC_FLAGS.NONE,0,0,0,0,null,-74,-23).clip({Front:50});
    block.chain(blockRelease);
    blockRelease.allowInterupt(block,1,{Pose: POSE_FLAGS.ALLOW_BLOCK});

    var cblockRelease = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.ALLOW_BLOCK,"crouch block release",0,["cblock_release"],-1,false);
    cblockRelease.Flags = ({Player:PLAYER_FLAGS.BLOCKING,Pose:POSE_FLAGS.CROUCHING});
    cblockRelease.addFrame(player,0,"",folder+"/c-block-1.png",4,{Player:PLAYER_FLAGS.BLOCKING},MISC_FLAGS.NONE,0,0,0,0,null,-82,-19,0,0,0,0,0,0);
    cblockRelease.addFrame(player,0,"",folder+"/c-block-0.png",1,{Player:PLAYER_FLAGS.BLOCKING},MISC_FLAGS.NONE,0,0,0,0,null,-92,-19,0,0,0,0,0,0);
    cblockRelease.chain(crouch,2);

    var cblock = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.ALLOW_BLOCK,"crouch block",0,[BUTTONS.CROUCH|BUTTONS.BACK],-1,false);
    cblock.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    cblock.ButtonCount = 1;
    cblock.Flags = ({Player:PLAYER_FLAGS.BLOCKING,Pose:POSE_FLAGS.CROUCHING});
    cblock.addFrame(player,0,"",folder+"/c-block-0.png",1,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.IGNORE_HOLD_FRAME},MISC_FLAGS.NONE,0,0,0,0,null,-92,-19,0,0,0,0,0,0);
    cblock.addFrame(player,0,"",folder+"/c-block-1.png",4,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,0,0,0,0,null,-82,-19,0,0,0,0,0,0);
    cblock.addFrame(player,0,"",folder+"/c-block-1.png",4,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.HOLD_FRAME},MISC_FLAGS.NONE,0,0,0,0,null,-82,-19,0,0,0,0,0,0);
    cblock.chain(cblockRelease);

    var ablock = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB|POSE_FLAGS.ALLOW_AIR_BLOCK,"air block",0,[BUTTONS.BACK],-1,false);
    ablock.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    ablock.ButtonCount = 1;
    ablock.Flags = ({Player:PLAYER_FLAGS.BLOCKING});
    ablock.addFrame(player,0,"",folder + "/ablock-0.png",1,{Player:PLAYER_FLAGS.BLOCKING});
    ablock.addFrame(player,0,"",folder + "/ablock-0.png",CONSTANTS.MAX_FRAME,{Player:PLAYER_FLAGS.BLOCKING});
    ablock.chain(jump_land);

    var walkSpeed = 6;
    var f_walk = player.addAnimation(POSE_FLAGS.STANDING,"f-walk",0,[BUTTONS.FORWARD],90,false);
    f_walk.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED}]);
    f_walk.ButtonCount = 1;
    f_walk.AdjustShadowPosition = (false);
    f_walk.Flags = ({Player:PLAYER_FLAGS.LOOP_IF_KEYDOWN | PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.WALKING_FORWARD});
    f_walk.addRepeatingFrame(player,50,"168",folder + "/f_walk-0.png",3,{Player:PLAYER_FLAGS.MOBILE},MISC_FLAGS.NONE,walkSpeed,0,0,0,0,0,0,0,0,0,0,0);
    f_walk.addRepeatingFrame(player,50,"168",folder + "/f_walk-1.png",3,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,walkSpeed,0,0,0,-14,0,0,0,0,0,0,0);

    var backpeddleSpeed = 5;
    var b_walk = player.addAnimation(POSE_FLAGS.STANDING,"b-walk",0,[BUTTONS.BACK],80,false);
    b_walk.ButtonSequence.push([{Button:BUTTONS.FORWARD,State:BUTTON_STATE.NONE},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    b_walk.ButtonCount = 1;
    b_walk.AdjustShadowPosition = (false);
    b_walk.Flags = ({Player:PLAYER_FLAGS.LOOP_IF_KEYDOWN | PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.WALKING_BACKWARD});
    b_walk.addRepeatingFrame(player,30,"168",folder + "/b_walk-0.png",3,{Player:PLAYER_FLAGS.MOBILE},MISC_FLAGS.NONE,-backpeddleSpeed,0,0,0,0,0,0,0,0,0,0,0);
    b_walk.addRepeatingFrame(player,30,"168",folder + "/b_walk-1.png",3,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,-backpeddleSpeed,0,0,0,0,0,0,0,0,0,0,0);

    //////////////////////////////
    //////////////////////////////
    //////////////////////////////

    var crouch_p1 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch p1",5,[BUTTONS.CROUCH|BUTTONS.LIGHT_PUNCH],110);
    crouch_p1.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.LIGHT_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_p1.ButtonCount = 2;
    crouch_p1.Flags = ({Pose:POSE_FLAGS.CROUCHING,Player:PLAYER_FLAGS.MOVE_TO_BACK});
    crouch_p1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_p1.addFrame(player,0,"",folder + "/crouch_p1-0.png",2,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,null,-62,-21);
    crouch_p1.addFrame(player,0,"",folder + "/crouch_p1-1.png",3,{ SwingSound:SWINGSOUND.LP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.LP },MISC_FLAGS.NONE,0,0,0,30,null,-41,-16,ATTACK_FLAGS.LIGHT | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 210,y: 120 },{ state: HIT_FLAGS.LOW,x: 290,y: 120}],ATTACK_FLAGS.LIGHT,1,1,10);
    crouch_p1.endBlock();
    crouch_p1.addFrame(player,0,"",folder + "/crouch_p1-0.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-62,-21);
    crouch_p1.chain(crouch,2);

    var crouch_p2 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch p2",5,[BUTTONS.CROUCH|BUTTONS.MEDIUM_PUNCH],110);
    crouch_p2.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.MEDIUM_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_p2.ButtonCount = 2;
    crouch_p2.Flags = ({Pose:POSE_FLAGS.CROUCHING,Player:PLAYER_FLAGS.MOVE_TO_BACK});
    crouch_p2.setMediumAttack();
    crouch_p2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_p2.addFrame(player,0,"",folder + "/crouch_p1-0.png",2,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,null,-62,-21);
    crouch_p2.addFrame(player,0,"",folder + "/crouch_p2-0.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-62,-21);
    crouch_p2.addFrame(player,0,"",folder + "/crouch_p2-1.png",2,{ SwingSound:SWINGSOUND.MP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.MK },MISC_FLAGS.NONE,0,0,0,30,null,-41,-16,ATTACK_FLAGS.MEDIUM | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 210,y: 120 },{ state: HIT_FLAGS.LOW,x: 290,y: 120}],ATTACK_FLAGS.MEDIUM,1,1,15);
    crouch_p2.addFrame(player,0,"",folder + "/crouch_p2-2.png",1,{ Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.MK },MISC_FLAGS.NONE,0,0,0,30,null,-41,-16,ATTACK_FLAGS.MEDIUM | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 210,y: 120 },{ state: HIT_FLAGS.LOW,x: 290,y: 120}],ATTACK_FLAGS.MEDIUM,1,1,15);
    crouch_p2.addFrame(player,0,"",folder + "/crouch_p2-3.png",3,{ Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.MK },MISC_FLAGS.NONE,0,0,0,30,null,-41,-16,ATTACK_FLAGS.MEDIUM | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 210,y: 120 },{ state: HIT_FLAGS.LOW,x: 290,y: 120}],ATTACK_FLAGS.MEDIUM,1,1,15);
    crouch_p2.endBlock();
    crouch_p2.addFrame(player,0,"",folder + "/crouch_p1-0.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-62,-21);
    crouch_p2.chain(crouch,2);

    var crouch_p3 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch p3",5,[BUTTONS.CROUCH|BUTTONS.HARD_PUNCH],110);
    crouch_p3.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.HARD_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_p3.ButtonCount = 2;
    crouch_p3.Flags = ({Pose:POSE_FLAGS.CROUCHING,Player:PLAYER_FLAGS.MOVE_TO_BACK});
    crouch_p3.setHardAttack();
    crouch_p3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING | OVERRIDE_FLAGS.AIRBORNE);
    crouch_p3.addFrame(player,0,"",folder + "/crouch_p3-0.png",3,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,null,-120,-11);
    crouch_p3.addFrame(player,0,"",folder + "/crouch_p3-1.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-120,-11);
    crouch_p3.addFrame(player,0,"",folder + "/p3-0.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-6,-11);
    crouch_p3.addFrame(player,0,"",folder + "/p3-1.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-6,-11);
    crouch_p3.addFrame(player,0,"",folder + "/p3-2.png",2,{SwingSound:SWINGSOUND.HP,Combat:COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,35,null,-25,-11,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:130,y:181},{state:HIT_FLAGS.HIGH,x:215,y:181}],ATTACK_FLAGS.HARD,1,1,20);
    crouch_p3.addFrame(player,0,"",folder + "/p3-3.png",2,{Combat:COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,35,null,-35,-11,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:130,y:181},{state:HIT_FLAGS.HIGH,x:215,y:181}],ATTACK_FLAGS.HARD,1,1,20);
    crouch_p3.addFrame(player,0,"",folder + "/p3-4.png",1,{Combat:COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,35,null,-35,-11,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:130,y:181},{state:HIT_FLAGS.HIGH,x:215,y:181}],ATTACK_FLAGS.HARD,1,1,20);
    crouch_p3.endBlock();
    crouch_p3.addFrame(player,0,"",folder + "/p1-3.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,1,-11);
    crouch_p3.addFrame(player,0,"",folder + "/crouch_p1-0.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-62,-21);
    crouch_p3.chain(crouch,2);

    var crouch_k1 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch k1",5,[BUTTONS.CROUCH|BUTTONS.LIGHT_KICK],110);
    crouch_k1.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.LIGHT_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_k1.ButtonCount = 2;
    crouch_k1.Flags = ({Pose:POSE_FLAGS.CROUCHING,Player:PLAYER_FLAGS.MOVE_TO_BACK});
    crouch_k1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_k1.addFrame(player,0,"",folder + "/crouch_k1-0.png",4,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,null,-41,-16);
    crouch_k1.addFrame(player,0,"",folder + "/crouch_k1-1.png",4,{ SwingSound:SWINGSOUND.LP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.LK },MISC_FLAGS.NONE,0,0,0,30,null,-46,-20,ATTACK_FLAGS.LIGHT | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 210,y: 40 },{ state: HIT_FLAGS.LOW,x: 260,y: 10}],ATTACK_FLAGS.LIGHT,1,1,10);
    crouch_k1.endBlock();
    crouch_k1.addFrame(player,0,"",folder + "/crouch_k1-0.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-41,-16);
    crouch_k1.chain(crouch,2);

    var crouch_k2 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch k2",5,[BUTTONS.CROUCH|BUTTONS.MEDIUM_KICK],110);
    crouch_k2.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.MEDIUM_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_k2.ButtonCount = 2;
    crouch_k2.Flags = ({Pose:POSE_FLAGS.CROUCHING,Player:PLAYER_FLAGS.MOVE_TO_BACK});
    crouch_k2.setMediumAttack();
    crouch_k2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_k2.addFrame(player,0,"",folder + "/crouch_k1-0.png",6,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,null,-41,-16);
    crouch_k2.addFrame(player,0,"",folder + "/crouch_k1-1.png",4,{ SwingSound:SWINGSOUND.MP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1|POSE_FLAGS.ALLOW_INTERUPT_2,HitSound:HITSOUND.MK },MISC_FLAGS.NONE,0,0,0,30,null,-46,-20,ATTACK_FLAGS.MEDIUM | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 210,y: 40 },{ state: HIT_FLAGS.LOW,x: 280,y: 10 },{ state: HIT_FLAGS.LOW,x: 260,y: 1}],ATTACK_FLAGS.MEDIUM,1,1,15);
    crouch_k2.endBlock();
    crouch_k2.addFrame(player,0,"",folder + "/crouch_k1-0.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-41,-16);
    crouch_k2.chain(crouch,2);

    var crouch_k3 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch k3",5,[BUTTONS.CROUCH|BUTTONS.HARD_KICK],110);
    crouch_k3.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.HARD_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_k3.ButtonCount = 2;
    crouch_k3.setHardAttack();
    crouch_k3.Flags = ({Pose:POSE_FLAGS.CROUCHING,Combat:COMBAT_FLAGS.NO_SLIDE_BACK,Player:PLAYER_FLAGS.MOVE_TO_BACK});
    crouch_k3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_k3.addFrame(player,0,"",folder + "/crouch_k3-0.png",8,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,null,-14,-13).clipMove({Front:80});
    crouch_k3.addFrameWithSound(player,1,"audio/mbison/thrust-1.zzz",0,"",folder + "/crouch_k3-1.png",20,{SwingSound:SWINGSOUND.SLIDE0,Combat:COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HK },MISC_FLAGS.NONE,0,0,0,35,null,-116,-16,ATTACK_FLAGS.HARD | ATTACK_FLAGS.HITS_LOW | ATTACK_FLAGS.TRIP,[{ state: HIT_FLAGS.LOW,x: 160,y: 35 },{ state: HIT_FLAGS.HIGH,x: 280,y: 35}],ATTACK_FLAGS.HARD,1,1,20,150).clipMove({Front:80});
    crouch_k3.endBlock();
    crouch_k3.addFrame(player,0,"",folder + "/crouch_k3-2.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-48,-13);
    crouch_k3.addFrame(player,0,"",folder + "/cturn-2.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-74,-16);
    crouch_k3.chain(crouch,2);

    /***************************************/
    /***************************************/
    /***************************************/
    /************************************/
    /************************************/
    /************************************/

    var k1 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"light kick",5,[BUTTONS.LIGHT_KICK]);
    k1.ButtonSequence.push([{Button:BUTTONS.LIGHT_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    k1.ButtonCount = 1;
    k1.Flags = ({Pose:POSE_FLAGS.STANDING,Player:PLAYER_FLAGS.MOVE_TO_BACK});
    k1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING);
    k1.addFrame(player,0,"",folder + "/k1-0.png",2,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,null,1,-10);
    k1.addFrame(player,0,"",folder + "/k1-1.png",7,{ SwingSound:SWINGSOUND.LP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.LK },MISC_FLAGS.NONE,0,0,0,30,null,54,-1,ATTACK_FLAGS.LIGHT,[{ state: HIT_FLAGS.LOW,x: 270,y: 185 },{ state: HIT_FLAGS.LOW,x: 290,y: 95},{ state: HIT_FLAGS.LOW,x: 220,y: 145}],ATTACK_FLAGS.LIGHT,1,1,10);
    k1.endBlock();
    k1.addFrame(player,0,"",folder + "/turn-2.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-10,-11);

    var k2 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"medium kick",5,[BUTTONS.MEDIUM_KICK]);
    k2.ButtonSequence.push([{Button:BUTTONS.MEDIUM_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    k2.ButtonCount = 1;
    k2.Flags = ({Pose:POSE_FLAGS.STANDING,Player:PLAYER_FLAGS.MOVE_TO_BACK});
    k2.setMediumAttack();
    k2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING);
    k2.addFrame(player,0,"",folder + "/k1-0.png",4,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,1,-10);
    k2.addFrame(player,0,"",folder + "/k2-0.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,40,10);
    k2.addFrame(player,0,"",folder + "/k2-1.png",8,{SwingSound:SWINGSOUND.MP,Pose:POSE_FLAGS.ALLOW_INTERUPT_1,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MK},MISC_FLAGS.NONE,0,0,0,30,null,40,0,ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:230,y:165},{state:HIT_FLAGS.LOW,x:300,y:165},{state:HIT_FLAGS.LOW,x:370,y:165}],ATTACK_FLAGS.MEDIUM,CONSTANTS.SECOND_HIT,1,8);
    k2.addFrame(player,0,"",folder + "/k2-0.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,40,10);
    k2.endBlock();
    k2.addFrame(player,0,"",folder + "/turn-2.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-10,-11);

    var k3 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"hard kick",5,[BUTTONS.HARD_KICK]);
    k3.ButtonSequence.push([{Button:BUTTONS.HARD_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    k3.ButtonCount = 1;
    k3.Flags = ({Pose:POSE_FLAGS.STANDING,Player:PLAYER_FLAGS.MOVE_TO_BACK});
    k3.setHardAttack();
    k3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.AIRBORNE);
    k3.addFrame(player,0,"",folder + "/k1-0.png",3,{Player:PLAYER_FLAGS.MOVE_TO_FRONT},{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,1,-10);
    k3.addFrame(player,0,"",folder + "/k2-0.png",4,{SwingSound:SWINGSOUND.HP,Combat:COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,25,null,40,10,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.HIGH,x:200,y:125}],ATTACK_FLAGS.HARD,1,1,20);
    k3.addFrame(player,0,"",folder + "/k3-0.png",8,{Combat:COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,25,null,40,5,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.HIGH,x:230,y:185},{state:HIT_FLAGS.HIGH,x:230,y:265},{state:HIT_FLAGS.HIGH,x:330,y:235}],ATTACK_FLAGS.HARD,2,1,20);
    k3.addFrame(player,0,"",folder + "/k3-1.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,40,-5);
    k3.addFrame(player,0,"",folder + "/k2-0.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,40,10);
    k3.addFrame(player,0,"",folder + "/k1-0.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,1,-10);
    k3.endBlock();
    k3.addFrame(player,0,"",folder + "/turn-2.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-10,-11);

    var p1 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"light punch",5,[BUTTONS.LIGHT_PUNCH]);
    p1.ButtonSequence.push([{Button:BUTTONS.LIGHT_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    p1.ButtonCount = 1;
    p1.Flags = ({Pose:POSE_FLAGS.STANDING,Player:PLAYER_FLAGS.MOVE_TO_BACK});
    p1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING);
    p1.addFrame(player,0,"",folder + "/p1-0.png",2,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,null,-3,-11);
    p1.addFrame(player,0,"",folder + "/p1-1.png",3,{ SwingSound:SWINGSOUND.LP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.LP },MISC_FLAGS.NONE,0,0,0,30,null,-15,-11,ATTACK_FLAGS.LIGHT,[{ state: HIT_FLAGS.LOW,x: 220,y: 193 },{ state: HIT_FLAGS.HIGH,x: 320,y: 193}],ATTACK_FLAGS.LIGHT,1,1,10);
    p1.addFrame(player,0,"",folder + "/p1-2.png",3,{ Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.LP },MISC_FLAGS.NONE,0,0,0,30,null,-25,-11,ATTACK_FLAGS.LIGHT,[{ state: HIT_FLAGS.LOW,x: 220,y: 193 },{ state: HIT_FLAGS.HIGH,x: 320,y: 193}],ATTACK_FLAGS.LIGHT,1,1,10);
    p1.endBlock();
    p1.addFrame(player,0,"",folder + "/p1-3.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,10,-11);
    p1.addFrame(player,0,"",folder + "/turn-2.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-10,-11);

    var p2 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"medium punch",5,[BUTTONS.MEDIUM_PUNCH]);
    p2.ButtonSequence.push([{Button:BUTTONS.MEDIUM_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    p2.ButtonCount = 1;
    p2.Flags = ({Pose:POSE_FLAGS.STANDING,Player:PLAYER_FLAGS.MOVE_TO_BACK});
    p2.setMediumAttack();
    p2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING);
    p2.addFrame(player,0,"",folder + "/p2-0.png",3,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,null,-60,-11);
    p2.addFrame(player,0,"",folder + "/p2-1.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-60,-11);
    p2.addFrame(player,0,"",folder + "/p2-3.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-6,-11);
    p2.addFrame(player,0,"",folder + "/p2-4.png",2,{ SwingSound:SWINGSOUND.MP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.MP },MISC_FLAGS.NONE,0,0,0,30,null,-22,-11,ATTACK_FLAGS.MEDIUM,[{ state: HIT_FLAGS.LOW,x: 220,y: 193 },{ state: HIT_FLAGS.HIGH,x: 320,y: 193}],ATTACK_FLAGS.MEDIUM,1,1,15);
    p2.addFrame(player,0,"",folder + "/p2-5.png",3,{ Combat: COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP },MISC_FLAGS.NONE,0,0,0,30,null,-22,-11,ATTACK_FLAGS.MEDIUM,[{ state: HIT_FLAGS.LOW,x: 220,y: 193 },{ state: HIT_FLAGS.HIGH,x: 320,y: 193}],ATTACK_FLAGS.MEDIUM,1,1,15);
    p2.endBlock();
    p2.addFrame(player,0,"",folder + "/p1-3.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,1,-11);
    p2.addFrame(player,0,"",folder + "/turn-2.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-10,-11);

    var p3 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"hard punch",5,[BUTTONS.HARD_PUNCH]);
    p3.ButtonSequence.push([{Button:BUTTONS.HARD_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    p3.ButtonCount = 1;
    p3.Flags = ({Pose:POSE_FLAGS.STANDING,Player:PLAYER_FLAGS.MOVE_TO_BACK});
    p3.setHardAttack();
    p3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.AIRBORNE);
    p3.addFrame(player,0,"",folder + "/p2-0.png",3,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,-60,-11);
    p3.addFrame(player,0,"",folder + "/p2-1.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-60,-11);
    p3.addFrame(player,0,"",folder + "/p2-2.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-60,-11);
    p3.addFrame(player,0,"",folder + "/p3-0.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-6,-11);
    p3.addFrame(player,0,"",folder + "/p3-1.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-6,-11);
    p3.addFrame(player,0,"",folder + "/p3-2.png",2,{SwingSound:SWINGSOUND.HP,Combat:COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,35,null,-25,-11,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:190,y:81},{state:HIT_FLAGS.HIGH,x:240,y:181},{state:HIT_FLAGS.HIGH,x:240,y:281}],ATTACK_FLAGS.HARD,1,1,20);
    p3.addFrame(player,0,"",folder + "/p3-3.png",2,{Combat:COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,35,null,-35,-11,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:190,y:81},{state:HIT_FLAGS.HIGH,x:240,y:181},{state:HIT_FLAGS.HIGH,x:240,y:281}],ATTACK_FLAGS.HARD,1,1,20);
    p3.addFrame(player,0,"",folder + "/p3-4.png",1,{Combat:COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,35,null,-35,-11,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:190,y:81},{state:HIT_FLAGS.HIGH,x:240,y:181},{state:HIT_FLAGS.HIGH,x:240,y:281}],ATTACK_FLAGS.HARD,1,1,20);
    p3.endBlock();
    p3.addFrame(player,0,"",folder + "/p1-3.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,1,-11);
    p3.addFrame(player,0,"",folder + "/turn-2.png",8,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-10,-11);


    var throw1X = -4;
    var throw1 = player.addThrow(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"throw 1",0,[BUTTONS.FORWARD|BUTTONS.CHARGE,BUTTONS.FORWARD|BUTTONS.MEDIUM_PUNCH],CONSTANTS.MAX_PRIORITY,false,false,0,"BisonShoulderThrow");
    throw1.ButtonSequence.push([{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED},{Button:[BUTTONS.MEDIUM_PUNCH,BUTTONS.HARD_PUNCH],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    throw1.ButtonCount = 3;
    throw1.Flags = ({Pose:POSE_FLAGS.STANDING});
    throw1.NbChargeFrames = 5;
    throw1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.NONE,OVERRIDE_FLAGS.ALL);
    throw1.addAlternateKeySequence([BUTTONS.FORWARD|BUTTONS.CHARGE,BUTTONS.FORWARD|BUTTONS.HARD_PUNCH]);
    throw1.addAlternateKeySequence([BUTTONS.BACK|BUTTONS.CHARGE,BUTTONS.BACK|BUTTONS.HARD_PUNCH]);
    throw1.addAlternateKeySequence([BUTTONS.BACK|BUTTONS.CHARGE,BUTTONS.BACK|BUTTONS.MEDIUM_PUNCH]);
    throw1.setGrappleDistance(CONSTANTS.GRAPPLE_DISTANCE);
    throw1.setOtherPlayerAirborneFlags(AIRBORNE_FLAGS.NO);
    throw1.addFrame(player,0,"",folder + "/r-crouch-0.png",3,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,0,0,ATTACK_FLAGS.THROW_START,[{state:HIT_FLAGS.LOW,x:130,y:145},{state:HIT_FLAGS.HIGH,x:170,y:185}],ATTACK_FLAGS.NONE,1);
    throw1.addFrame(player,0,"",folder + "/throw-0.png",8,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    throw1.addFrame(player,0,"",folder + "/throw-1.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    throw1.addFrame(player,0,"",folder + "/throw-2.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    throw1.addFrameWithSound(player,1,"audio/mbison/thrust-2.zzz",0,"",folder + "/throw-3.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    throw1.addFrame(player,0,"",folder + "/throw-3.png",16,{Combat:COMBAT_FLAGS.ATTACK},MISC_FLAGS.NONE,-10,0,0,100,null,0,0,ATTACK_FLAGS.THROW_EJECT,[{x:-1,y:-1,Fx:1.5,Fy:0.5,Tx:2.0}],ATTACK_FLAGS.NONE,2,1,15);


    var airKnockBackX = 1;

    var jump_p1 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump p1",5,[BUTTONS.LIGHT_PUNCH],0,true,true);
    jump_p1.ButtonSequence.push([{Button:[BUTTONS.LIGHT_PUNCH],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_p1.ButtonCount = 1;
    jump_p1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_p1.addFrame(player,0,"",folder + "/jump_p1-0.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,-43,0);
    jump_p1.addFrame(player,0,"",folder + "/jump_p1-1.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-43,0);
    jump_p1.addFrame(player,0,"",folder + "/jump_p1-2.png",13,{SwingSound:SWINGSOUND.LP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.LP},MISC_FLAGS.NONE,0,0,0,30,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.LIGHT,[{state:HIT_FLAGS.LOW,x:210,y:125,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:260,y:125,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.LIGHT,1,1,10);
    jump_p1.endBlock();
    jump_p1.addFrame(player,0,"",folder + "/jump_p1-1.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-43,0);
    jump_p1.addFrame(player,0,"",folder + "/jump_p1-0.png",4);
    jump_p1.addRepeatingFrame(player,-11,"168",folder + "/jump-4.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-94,0,0,0,0,0,0,0);
    jump_p1.addRepeatingFrame(player,-11,"168",folder + "/jump-5.png",CONSTANTS.FRAME_MAX,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,0,0,0,0,0,0,0);
    jump_p1.chain(jump_land);
    
    var jump_p2 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump p2",5,[BUTTONS.MEDIUM_PUNCH],0,true,true);
    jump_p2.ButtonSequence.push([{Button:[BUTTONS.MEDIUM_PUNCH],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_p2.ButtonCount = 1;
    jump_p2.setMediumAttack();
    jump_p2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_p2.addFrame(player,0,"",folder + "/jump_p1-0.png",3,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,-43,0);
    jump_p2.addFrame(player,0,"",folder + "/jump_p1-1.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-43,0);
    jump_p2.addFrame(player,0,"",folder + "/jump_p2-0.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-43,0);
    jump_p2.addFrame(player,0,"",folder + "/jump_p2-1.png",4,{SwingSound:SWINGSOUND.MP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP},MISC_FLAGS.NONE,0,0,0,30,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:210,y:125,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:260,y:125,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.MEDIUM,1,1,15);
    jump_p2.addFrame(player,0,"",folder + "/jump_p2-2.png",4,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP},MISC_FLAGS.NONE,0,0,0,30,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:210,y:125,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:260,y:125,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.MEDIUM,1,1,15);
    jump_p2.addFrame(player,0,"",folder + "/jump_p2-1.png",4,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP},MISC_FLAGS.NONE,0,0,0,30,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:210,y:125,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:260,y:125,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.MEDIUM,1,1,15);
    jump_p2.endBlock();
    jump_p2.addFrame(player,0,"",folder + "/jump_p1-1.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-43,0);
    jump_p2.addFrame(player,0,"",folder + "/jump_p1-0.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-43,0);
    jump_p2.addRepeatingFrame(player,-11,"168",folder + "/jump-4.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-94,0,0,0,0,0,0,0);
    jump_p2.addRepeatingFrame(player,-11,"168",folder + "/jump-5.png",CONSTANTS.FRAME_MAX,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,0,0,0,0,0,0,0);
    jump_p2.chain(jump_land);
  
    var jump_p3 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump p3",5,[BUTTONS.HARD_PUNCH],0,true,true);
    jump_p3.ButtonSequence.push([{Button:[BUTTONS.HARD_PUNCH],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_p3.ButtonCount = 1;
    jump_p3.setHardAttack();
    jump_p3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_p3.addFrame(player,0,"",folder + "/jump_p3-0.png",4,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,-43,0);
    jump_p3.addFrame(player,0,"",folder + "/jump_p3-1.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-43,0);
    jump_p3.addFrame(player,0,"",folder + "/jump_p3-2.png",3,{SwingSound:SWINGSOUND.HP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,35,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:230,y:85,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:330,y:55,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.HARD,1,1,20);
    jump_p3.addFrame(player,0,"",folder + "/jump_p3-3.png",3,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,35,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:230,y:85,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:330,y:55,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.HARD,1,1,20);
    jump_p3.addFrame(player,0,"",folder + "/jump_p3-2.png",3,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,35,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:230,y:85,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:330,y:55,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.HARD,1,1,20);
    jump_p3.endBlock();
    jump_p3.addFrame(player,0,"",folder + "/jump_p1-0.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-43,0);
    jump_p3.addRepeatingFrame(player,-11,"168",folder + "/jump-4.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-94,0,0,0,0,0,0,0);
    jump_p3.addRepeatingFrame(player,-11,"168",folder + "/jump-5.png",CONSTANTS.FRAME_MAX,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,0,0,0,0,0,0,0);
    jump_p3.chain(jump_land);
    
    var jump_k1 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump k1",5,[BUTTONS.LIGHT_KICK],0,true,true);
    jump_k1.ButtonSequence.push([{Button:[BUTTONS.LIGHT_KICK],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_k1.ButtonCount = 1;
    jump_k1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_k1.addFrame(player,0,"",folder + "/jump_k1-0.png",3,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,-25,0);
    jump_k1.addFrame(player,0,"",folder + "/jump_k1-1.png",3,{SwingSound:SWINGSOUND.LP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.LK},MISC_FLAGS.NONE,0,0,0,30,null,-100,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.LIGHT,[{state:HIT_FLAGS.LOW,x:170,y:135,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:190,y:85,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.LIGHT,1,1,10);
    jump_k1.addFrame(player,0,"",folder + "/jump_k1-2.png",3,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.LK},MISC_FLAGS.NONE,0,0,0,30,null,-96,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.LIGHT,[{state:HIT_FLAGS.LOW,x:170,y:135,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:190,y:85,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.LIGHT,1,1,10);
    jump_k1.addFrame(player,0,"",folder + "/jump_k1-1.png",3,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.LK},MISC_FLAGS.NONE,0,0,0,30,null,-100,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.LIGHT,[{state:HIT_FLAGS.LOW,x:170,y:135,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:190,y:85,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.LIGHT,1,1,10);
    jump_k1.addFrame(player,0,"",folder + "/jump_k1-2.png",3,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.LK},MISC_FLAGS.NONE,0,0,0,30,null,-96,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.LIGHT,[{state:HIT_FLAGS.LOW,x:170,y:135,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:190,y:85,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.LIGHT,1,1,10);
    jump_k1.addFrame(player,0,"",folder + "/jump_k1-1.png",3,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.LK},MISC_FLAGS.NONE,0,0,0,30,null,-100,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.LIGHT,[{state:HIT_FLAGS.LOW,x:170,y:135,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:190,y:85,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.LIGHT,1,1,10);
    jump_k1.addFrame(player,0,"",folder + "/jump_k1-2.png",3,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.LK},MISC_FLAGS.NONE,0,0,0,30,null,-96,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.LIGHT,[{state:HIT_FLAGS.LOW,x:170,y:135,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:190,y:85,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.LIGHT,1,1,10);
    jump_k1.addFrame(player,0,"",folder + "/jump_k1-1.png",3,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.LK},MISC_FLAGS.NONE,0,0,0,30,null,-100,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.LIGHT,[{state:HIT_FLAGS.LOW,x:170,y:135,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:190,y:85,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.LIGHT,1,1,10);
    jump_k1.addFrame(player,0,"",folder + "/jump_k1-2.png",3,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.LK},MISC_FLAGS.NONE,0,0,0,30,null,-96,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.LIGHT,[{state:HIT_FLAGS.LOW,x:170,y:135,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:190,y:85,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.LIGHT,1,1,10);
    jump_k1.endBlock();
    jump_k1.addRepeatingFrame(player,-11,"168",folder + "/jump-4.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-94,0,0,0,0,0,0,0);
    jump_k1.addRepeatingFrame(player,-11,"168",folder + "/jump-5.png",CONSTANTS.FRAME_MAX,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,0,0,0,0,0,0,0);
    jump_k1.chain(jump_land);
    
    var jump_k2 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump k2",5,[BUTTONS.MEDIUM_KICK],0,true,true);
    jump_k2.ButtonSequence.push([{Button:[BUTTONS.MEDIUM_KICK],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_k2.ButtonCount = 1;
    jump_k2.setMediumAttack();
    jump_k2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_k2.addFrame(player,0,"",folder + "/jump_k1-0.png",3,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,-25,0);
    jump_k2.addFrame(player,0,"",folder + "/jump_k2-0.png",6,{SwingSound:SWINGSOUND.MP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MK},MISC_FLAGS.NONE,0,0,0,30,null,-100,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:140,y:115,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:200,y:115,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:320,y:115,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.MEDIUM,1,1,15);
    jump_k2.endBlock();
    jump_k2.addRepeatingFrame(player,-11,"168",folder + "/jump-4.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-94,0,0,0,0,0,0,0);
    jump_k2.addRepeatingFrame(player,-11,"168",folder + "/jump-5.png",CONSTANTS.FRAME_MAX,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,0,0,0,0,0,0,0);
    jump_k2.chain(jump_land);
    
    var jump_k3 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump k3",5,[BUTTONS.HARD_KICK],0,true,true);
    jump_k3.ButtonSequence.push([{Button:[BUTTONS.HARD_KICK],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_k3.ButtonCount = 1;
    jump_k3.setHardAttack();
    jump_k3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_k3.addFrame(player,0,"",folder + "/jump_k1-0.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,-25,0);
    jump_k3.addFrame(player,0,"",folder + "/jump_k3-0.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-100,0);
    jump_k3.addFrame(player,0,"",folder + "/jump_k3-1.png",6,{SwingSound:SWINGSOUND.HP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,35,null,-90,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:120,y:105,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:180,y:65,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:260,y:-15,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.HARD,1,1,20);
    jump_k3.endBlock();
    jump_k3.addRepeatingFrame(player,-11,"168",folder + "/jump-4.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-94,0,0,0,0,0,0,0);
    jump_k3.addRepeatingFrame(player,-11,"168",folder + "/jump-5.png",CONSTANTS.FRAME_MAX,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,0,0,0,0,0,0,0);
    jump_k3.chain(jump_land);


    var jumpX = 36;
    var jumpY = 250;


    var psychoGlove = player.addAnimation(POSE_FLAGS.AIR_COMBO_1,"psycho glove",0,[BUTTONS.HARD_PUNCH],0,true,true);
    psychoGlove.ButtonSequence.push([{Button:[BUTTONS.HARD_PUNCH,BUTTONS.MEDIUM_PUNCH],State:BUTTON_STATE.PRESSED}]);
    psychoGlove.ButtonCount = 1;
    psychoGlove.KeepCurrentAirborneFunctions = true;
    psychoGlove.addAlternateKeySequence([BUTTONS.LIGHT_PUNCH]);
    psychoGlove.addAlternateKeySequence([BUTTONS.MEDIUM_PUNCH]);
    psychoGlove.addFrameWithSound(player,1,"audio/mbison/thrust-0.zzz",0,"",folder + "/head_stomp-8.png",6,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,20,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:220,y:0,Fx : airKnockBackX,Fy : 0},{state:HIT_FLAGS.LOW,x:160,y:0,Fx : airKnockBackX,Fy : 0}],ATTACK_FLAGS.HARD,1,1,20);
    psychoGlove.addFrame(player,0,"",folder + "/head_stomp-9.png",CONSTANTS.MAX_FRAME,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,35,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:220,y:0,Fx : airKnockBackX,Fy : 0},{state:HIT_FLAGS.LOW,x:160,y:0,Fx : airKnockBackX,Fy : 0}],ATTACK_FLAGS.HARD,1,1,20);
    psychoGlove.chain(jump_land);

    var headStompDismount = player.addAnimation(POSE_FLAGS.AIRBORNE_FB, "head stomp dismount", 0, ["head_stomp_dismount"],0,false);
    headStompDismount.UseJumpSpeed = true;
    headStompDismount.IsImplicit = true;
    headStompDismount.Vy = 175;
    headStompDismount.Vx = -100;

    /*the following object will be passed in to the function that will be used to compute the X coordinate*/
    headStompDismount.VxFnArgs = {};
    /*the following function will be executed each frame to compute the X coordinate of this move*/
    headStompDismount.vxFn = (function(args)
    {
        var max = 40;
        var maxT = 80;
        var boost = 1.25;
        return function(dx,t)
        {
            var rate = Math.sin(Math.PI/2 + Math.PI*(Math.min(t,maxT)/max)) * (boost);
            return dx * rate;
        }
    });


    headStompDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-2.png",1,{Pose:POSE_FLAGS.AIR_COMBO_1|POSE_FLAGS.FORCE_START_AIRBORNE},MISC_FLAGS.NONE);
    headStompDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-2.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    headStompDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-4.png",6,{Player:PLAYER_FLAGS.MOBILE},MISC_FLAGS.NONE);
    headStompDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-5.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    headStompDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-6.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    headStompDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-7.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    headStompDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-4.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    headStompDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-5.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    headStompDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-6.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    headStompDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-7.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    headStompDismount.chain(jump_land);


    var headStompPose = player.addAnimation(POSE_FLAGS.AIRBORNE_FB, "head stomp pose",0, ["head_stomp_pose"],0,false);
    headStompPose.IsImplicit = true;
    headStompPose.MaintainYPosition = true;
    headStompPose.addFrame(player,0,"",folder + "/head_stomp-1.png",3,{Pose:POSE_FLAGS.FORCE_HOLD_AIRBORNE_XY},{Player:PLAYER_FLAGS.MOBILE});
    headStompPose.addFrame(player,0,"",folder + "/teleport-0.png",10,{Pose:POSE_FLAGS.FORCE_HOLD_AIRBORNE_XY},MISC_FLAGS.NONE);
    headStompPose.addFrame(player,0,"",folder + "/teleport-0.png",1,{Pose:POSE_FLAGS.CLEAR_AIRBORNE},MISC_FLAGS.NONE);
    headStompPose.chain(headStompDismount);

    var headStompJump = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"head stomp",CONSTANTS.MAX_FRAME,[BUTTONS.CROUCH|BUTTONS.CHARGE,0,BUTTONS.JUMP,BUTTONS.JUMP|BUTTONS.HARD_KICK],0,true,true);
    headStompJump.ButtonSequence.push([btn(BUTTONS.CROUCH,BUTTON_STATE.PRESSED,CONSTANTS.NBCHARGE_FRAMES)]);
    headStompJump.ButtonSequence.push([btn(BUTTONS.CROUCH,BUTTON_STATE.NONE),btn(BUTTONS.JUMP,BUTTON_STATE.PRESSED,0,CONSTANTS.NBINTERIM_FRAMES),btn([BUTTONS.LIGHT_KICK,BUTTONS.MEDIUM_KICK,BUTTONS.HARD_KICK],BUTTON_STATE.PRESSED)]);
    headStompJump.ButtonCount = 3;
    headStompJump.UseJumpSpeed = true;
    headStompJump.Flags = {Combat:COMBAT_FLAGS.CHAIN_ON_HIT,Player:PLAYER_FLAGS.MOVE_TO_ENEMY};
    headStompJump.Vy = (jumpY);
    headStompJump.Vx = (jumpX);
    headStompJump.addRepeatingFrame(player,0,"",folder + "/jump-0.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,-38,-18,0,0,0,0,0,0);
    headStompJump.addRepeatingFrame(player,-11,"168",folder + "/jump-1.png",6,{ Pose: POSE_FLAGS.AIRBORNE },MISC_FLAGS.NONE,0,0,0,0,0,0,0,0,0,0,0,0);
    headStompJump.addRepeatingFrame(player,-11,"168",folder + "/jump-2.png",6,{Player: PLAYER_FLAGS.SMALLER_AABB},MISC_FLAGS.NONE,0,0,0,0,-62,0,0,0,0,0,0,0);
    headStompJump.addRepeatingFrame(player,10,"136",folder + "/jump-3.png",CONSTANTS.FRAME_MAX,{Player:PLAYER_FLAGS.SMALLER_AABB,Pose:POSE_FLAGS.ALLOW_OVERLAP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,50,-84,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.HARD|ATTACK_FLAGS.NO_DELAY,[{state:HIT_FLAGS.HIGH,x:130,y:0},{state:HIT_FLAGS.HIGH,x:165,y:0}],ATTACK_FLAGS.HARD,1,1,20);
    headStompJump.chainOnHit(headStompPose);
    headStompJump.chain(jump_land);


    var psychoGloveDismount = player.addAnimation(POSE_FLAGS.AIR_COMBO_2, "head stomp dismount", 10, [BUTTONS.HARD_PUNCH],0,true, true);
    psychoGloveDismount.ButtonSequence.push([btn([BUTTONS.LIGHT_PUNCH,BUTTONS.MEDIUM_PUNCH,BUTTONS.HARD_PUNCH],BUTTON_STATE.PRESSED)]);
    psychoGloveDismount.ButtonCount = 1;
    psychoGloveDismount.Flags = {Player:PLAYER_FLAGS.FACE_ENEMY};
    psychoGloveDismount.UseJumpSpeed = true;
    psychoGloveDismount.Vy = 175;
    psychoGloveDismount.Vx = -100;

    /*the following object will be passed in to the function that will be used to compute the X coordinate*/
    psychoGloveDismount.VxFnArgs = {};
    /*the following function will be executed each frame to compute the X coordinate of this move*/
    psychoGloveDismount.vxFn = (function(args)
    {
        var max = 40;
        var boost = 0.1;
        return function(dx,t)
        {
            var rate = Math.sin(Math.PI/2 + Math.PI*(Math.min(t,max)/max)) * (boost);
            return dx * rate;
        }
    });


    psychoGloveDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-2.png",1,{Pose:POSE_FLAGS.AIR_COMBO_1|POSE_FLAGS.FORCE_START_AIRBORNE},MISC_FLAGS.NONE);
    psychoGloveDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-2.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    psychoGloveDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-4.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    psychoGloveDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-5.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    psychoGloveDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-6.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    psychoGloveDismount.addRepeatingFrame(player,0,"",folder + "/head_stomp-7.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    psychoGloveDismount.chain(psychoGlove);


    var psychoGloveJump = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"psycho glove jump",CONSTANTS.MAX_FRAME,[BUTTONS.CROUCH|BUTTONS.CHARGE,0,BUTTONS.JUMP,BUTTONS.JUMP|BUTTONS.HARD_PUNCH],0,true,true);
    psychoGloveJump.ButtonSequence.push([btn(BUTTONS.CROUCH,BUTTON_STATE.PRESSED,CONSTANTS.NBCHARGE_FRAMES)]);
    psychoGloveJump.ButtonSequence.push([btn(BUTTONS.CROUCH,BUTTON_STATE.NONE),btn(BUTTONS.JUMP,BUTTON_STATE.PRESSED,0,CONSTANTS.NBINTERIM_FRAMES),btn([BUTTONS.LIGHT_PUNCH,BUTTONS.MEDIUM_PUNCH,BUTTONS.HARD_PUNCH],BUTTON_STATE.PRESSED)]);
    psychoGloveJump.ButtonCount = 3;
    psychoGloveJump.UseJumpSpeed = true;
    psychoGloveJump.Flags = {Player:PLAYER_FLAGS.MOVE_BEYOND_ENEMY};
    psychoGloveJump.Vy = (jumpY);
    psychoGloveJump.Vx = 100;
    psychoGloveJump.addRepeatingFrame(player,0,"",folder + "/jump-0.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,-38,-18,0,0,0,0,0,0);
    psychoGloveJump.addRepeatingFrame(player,-11,"168",folder + "/jump-1.png",6,{Pose:POSE_FLAGS.AIRBORNE},MISC_FLAGS.NONE,0,0,0,0,0,0,0,0,0,0,0,0);
    psychoGloveJump.addRepeatingFrame(player,-11,"168",folder + "/jump-2.png",6,{Player:PLAYER_FLAGS.SMALLER_AABB},MISC_FLAGS.NONE,0,0,0,0,-62,0,0,0,0,0,0,0);
    psychoGloveJump.addRepeatingFrame(player,10,"136",folder + "/jump-3.png",20,{Player:PLAYER_FLAGS.SMALLER_AABB|PLAYER_FLAGS.MOBILE,Pose:POSE_FLAGS.AIR_COMBO_2},MISC_FLAGS.NONE,0,0,0,0,-84,0);
    psychoGloveJump.addRepeatingFrame(player,10,"136",folder + "/jump-3.png",CONSTANTS.FRAME_MAX,{Player:PLAYER_FLAGS.SMALLER_AABB},{Pose:POSE_FLAGS.AIR_COMBO_2},0,0,0,0,-84,0);
    psychoGloveJump.chain(jump_land);


    var xSpeed = 0;
    var flipKickLand = player.addAnimation(POSE_FLAGS.ANY,"flip kick land",0,["flip_kick_land"],0,false);
    flipKickLand.addFrame(player,0,"",folder + "/crouch_k3-2.png",4,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,-48,-13);


    for(var i = 0; i < 4; ++i)
    {
        var button = BUTTONS.LIGHT_KICK, x = 5, vx = 70, vy = 130, deltaY0 = 20, nb = 10;

        if(i == 1)
        {
            button = BUTTONS.MEDIUM_KICK; x = 5;
            vx = 90;
        }
        else if(i == 2)
        {
            button = BUTTONS.HARD_KICK; x = 5;
            vx = 115;
        }

        var flipKick = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"flip kick k"+(i+1), CONSTANTS.MAX_FRAME,[BUTTONS.BACK|BUTTONS.CHARGE,0,BUTTONS.FORWARD,BUTTONS.EXACT|BUTTONS.FORWARD|button],0,false);
        flipKick.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED,MinNbFrames:CONSTANTS.NBCHARGE_FRAMES}]);
        flipKick.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES},{Button:button,State:BUTTON_STATE.PRESSED}]);
        flipKick.ButtonCount = 3;
        flipKick.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.ALL,OVERRIDE_FLAGS.NONE);
        flipKick.IsSpecialMove = true;
        flipKick.EnergyToAdd = (5);
        //flipKick.Flags = {};
        flipKick.AirborneStartDeltaY = deltaY0;
        flipKick.Vy = vy;
        flipKick.Vx = vx;
        flipKick.NbFramesAirborneAdvance = nb;
        flipKick.VxFnArgs = {};
        flipKick.vxAirFn = (function(args) { return function(dx,t) { return dx; } });

        

        flipKick.addRepeatingFrame(player,0,"",folder + "/crouch_k3-2.png",4,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},x,0,0,0,-48,-13);
        flipKick.addFrameWithSound(player,1,"audio/mbison/thrust-0.zzz",0,"",folder + "/skick-0.png",4, {Pose:POSE_FLAGS.AIRBORNE},MISC_FLAGS.NONE,0,0,0,0,null,-28,0);
        flipKick.addFrame(player,0,"",folder + "/skick-1.png",4,{Combat:COMBAT_FLAGS.ATTACK},MISC_FLAGS.NONE,0,0,0,0,null,-43,50);
        flipKick.addFrame(player,0,"",folder + "/skick-2.png",4,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,40,null,-20,50,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:170,y:155},{state:HIT_FLAGS.LOW,x:278,y:185},{state:HIT_FLAGS.LOW,x:280,y:135}],ATTACK_FLAGS.HARD,CONSTANTS.FIRST_HIT,1,20);
        flipKick.addFrame(player,0,"",folder + "/skick-3.png",CONSTANTS.MAX_FRAME,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,40,null,-100,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.LOW,x:150,y:105},{state:HIT_FLAGS.LOW,x:220,y:5}],ATTACK_FLAGS.HARD,CONSTANTS.SECOND_HIT,1,20);
        flipKick.chain(flipKickLand);
    }

    for(var i = 0; i < 4; ++i)
    {
        var flags = COMBAT_FLAGS.TELEPORT_BEHIND;
        var type = "";

        var teleport_start = player.addAnimation(POSE_FLAGS.ALLOW_INTERUPT_1|POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"",50,[],1,false,false,0,null);
        teleport_start.ButtonCount = 5;
        teleport_start.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.SHORYUKEN,OVERRIDE_FLAGS.ALL | OVERRIDE_FLAGS.THROW);
        teleport_start.Flags = {Pose:POSE_FLAGS.STANDING,Combat: COMBAT_FLAGS.TELEPORT_START};
        teleport_start.addFrameWithSound(player, 1, "audio/mbison/teleport.zzz", 0, "", folder + "/teleport-0.png", 1, {Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS|PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -96, 0, 0, 0, 0, 0, 0, 0);
        teleport_start.addFrame(player, 0, "", folder + "/teleport-1.png", 1, {Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS|PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -96, 0, 0, 0, 0, 0, 0, 0);
        teleport_start.addFrame(player, 0, "", folder + "/teleport-2.png", 1, {Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS|PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -96, 11, 0, 0, 0, 0, 0, 0);
        teleport_start.addFrame(player, 0, "", folder + "/teleport-3.png", 1, {Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS|PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, 2, 21, 0, 0, 0, 0, 0, 0);
        teleport_start.addFrame(player, 0, "", folder + "/teleport-4.png", 1, {Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS|PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, 7, 26, 0, 0, 0, 0, 0, 0);

        switch(i)
        {
            case 0: 
            {
                flags = COMBAT_FLAGS.TELEPORT_BEHIND;
                teleport_start.BaseAnimation.Name = "teleport behind";
                //keys = [BUTTONS.FORWARD,0,BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.FORWARD,BUTTONS.CROUCH|BUTTONS.FORWARD|BUTTONS.LIGHT_KICK];
                teleport_start.ButtonSequence.push([{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED}]);
                teleport_start.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.NONE}]);
                teleport_start.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
                teleport_start.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.LIGHT_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
                break;
            }
            case 1: 
            {
                flags = COMBAT_FLAGS.TELEPORT_INFRONT;
                teleport_start.BaseAnimation.Name = "teleport infront";
                //keys = [BUTTONS.FORWARD,0,BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.FORWARD,BUTTONS.CROUCH|BUTTONS.FORWARD|BUTTONS.LIGHT_PUNCH]; 
                teleport_start.ButtonSequence.push([{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED}]);
                teleport_start.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.NONE}]);
                teleport_start.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
                teleport_start.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.LIGHT_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
                break;
            }
            case 2: 
            {
                flags = COMBAT_FLAGS.TELEPORT_MIDDLE;
                teleport_start.BaseAnimation.Name = "teleport middle";
                //keys = [BUTTONS.BACK,0,BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.BACK,BUTTONS.CROUCH|BUTTONS.BACK|BUTTONS.LIGHT_KICK]; 
                teleport_start.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
                teleport_start.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES},{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE}]);
                teleport_start.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
                teleport_start.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.LIGHT_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
                break;
            }
            case 3: 
            {
                flags = COMBAT_FLAGS.TELEPORT_BACK;
                teleport_start.BaseAnimation.Name = "teleport back";
                //keys = [BUTTONS.BACK,0,BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.BACK,BUTTONS.CROUCH|BUTTONS.BACK|BUTTONS.LIGHT_PUNCH]; 
                teleport_start.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
                teleport_start.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES},{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE}]);
                teleport_start.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
                teleport_start.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.LIGHT_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
                break;
            }
        }

        var teleport_end = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"teleport end",0,["teleport_end"],1,false,false,0,null);
        teleport_end.Flags = {Combat: COMBAT_FLAGS.TELEPORT_END,Pose:POSE_FLAGS.STANDING|POSE_FLAGS.QUICK_CHANGE_DIRECTION};
        teleport_end.addFrame(player, 0, "", "", 10, {Combat:flags,Player:PLAYER_FLAGS.INVISIBLE|PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS|PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, 7, 26, 0, 0, 0, 0, 0, 0);
        teleport_end.addFrameWithSound(player, 1, "audio/mbison/teleport.zzz", 0, "", folder + "/teleport-4.png", 2, {Player:PLAYER_FLAGS.INVISIBLE|PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS|PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, 7, 26, 0, 0, 0, 0, 0, 0);
        teleport_end.addFrame(player, 0, "", folder + "/teleport-3.png", 1, {Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS|PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, 2, 21, 0, 0, 0, 0, 0, 0);
        teleport_end.addFrame(player, 0, "", folder + "/teleport-2.png", 2, {Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS|PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -96, 11, 0, 0, 0, 0, 0, 0);
        teleport_end.addFrame(player, 0, "", folder + "/teleport-1.png", 3, {Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS|PLAYER_FLAGS.IGNORE_COLLISIONS}, {Player:PLAYER_FLAGS.MOBILE}, 0, 0, 0, 0, null, -96, 0, 0, 0, 0, 0, 0, 0);
        teleport_end.addFrame(player, 0, "", folder + "/teleport-0.png", 5, {Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS|PLAYER_FLAGS.IGNORE_COLLISIONS|PLAYER_FLAGS.MOBILE, Pose:POSE_FLAGS.FORCE_FACE_TARGET}, MISC_FLAGS.NONE, 0, 0, 0, 0, null, -96, 0, 0, 0, 0, 0, 0, 0);

        teleport_start.chain(teleport_end);
    }


    var psycho_crusher_end = player.addAnimation(0,"psycho crusher end", 0,["psycho_crusher_end"],0,false);
    psycho_crusher_end.IsImplicit = true;
    psycho_crusher_end.addFrame(player,0,"",folder+"/jump-3.png",4,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE,Pose:POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIR_BRAKES});
    psycho_crusher_end.addFrame(player,0,"",folder+"/jump-4.png",CONSTANTS.MAX_FRAME,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    psycho_crusher_end.chain(jump_land);

    for(var x = 0; x < 3; ++x)
    {
        var button = BUTTONS.LIGHT_PUNCH;
        if(x == 1) {button = BUTTONS.MEDIUM_PUNCH;}
        else if(x == 2) {button = BUTTONS.HARD_PUNCH;}

        var psycho_crusher = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"psycho crusher p"+ (x+1), CONSTANTS.MAX_FRAME,[BUTTONS.BACK|BUTTONS.CHARGE,0,BUTTONS.FORWARD,0,BUTTONS.BACK,0,BUTTONS.FORWARD,BUTTONS.FORWARD|button],0,true, true);
        psycho_crusher.ButtonCount = 6;
        psycho_crusher.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED,MinNbFrames:CONSTANTS.NBCHARGE_FRAMES}]);
        psycho_crusher.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        psycho_crusher.ButtonSequence.push([{Button:BUTTONS.FORWARD,State:BUTTON_STATE.NONE},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        psycho_crusher.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES},{Button:button,State:BUTTON_STATE.PRESSED}]);

        if(x == 2) psycho_crusher.MaxNbHits = 6;
        else if(x == 1) psycho_crusher.MaxNbHits = 4;
        else if(x == 0) psycho_crusher.MaxNbHits = 3;
        psycho_crusher.IsSuperMove = true;
        psycho_crusher.MaintainYPosition = true;
        psycho_crusher.EnergyToSubtract = CONSTANTS.ONE_LEVEL * (x + 1);

        psycho_crusher.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.HPROJECTILE,OVERRIDE_FLAGS.NONE);
        psycho_crusher.Vy = 50;
        psycho_crusher.Vx = 50;
        psycho_crusher.AirborneStartDeltaY = 30;

        //psycho_crusher.EnergyToSubtract = CONSTANTS.ONE_LEVEL * (x + 1);
        psycho_crusher.EnergyToAdd = 5;

        /*the following object will be passed in to the function that will be used to compute the X coordinate*/
        psycho_crusher.VxFnArgs = {};
        /*the following function will be executed each frame to compute the X coordinate of this move*/
        psycho_crusher.vxFn = (function(args) { return function(dx,t) { return dx * 2; } });

        psycho_crusher.vxAirFn = (function(args) { return function(dx,t) { return (!dx ? 1 : dx) * 1.5; } });
        psycho_crusher.vyAirFn = (function(args) { return function(dy,t) { return dy; } });

        //var hitPoints = [{state:HIT_FLAGS.LOW,x:-70,y:120,Fx:fx,Fy:fy},{state:HIT_FLAGS.LOW,x:130,y:120,Fx:fx,Fy:fy},{state:HIT_FLAGS.LOW,x:320,y:120,Fx:fx,Fy:fy}];
        var hit = 0;
        var fy = 0.5;
        var fx = 1.5;
        var hitPoints = [{state:HIT_FLAGS.LOW,x:-70,y:120,Fx:fx,Fy:fy},{state:HIT_FLAGS.LOW,x:30,y:160,Fx:fx,Fy:fy},{state:HIT_FLAGS.LOW,x:130,y:160,Fx:fx,Fy:fy},{state:HIT_FLAGS.LOW,x:225,y:160,Fx:fx,Fy:fy},{state:HIT_FLAGS.LOW,x:320,y:120,Fx:fx,Fy:fy},{state:HIT_FLAGS.LOW,x:30,y:80,Fx:fx,Fy:fy},{state:HIT_FLAGS.LOW,x:130,y:80,Fx:fx,Fy:fy},{state:HIT_FLAGS.LOW,x:225,y:80,Fx:fx,Fy:fy}];

        psycho_crusher.addFrame(player,0,"",folder+"/block-0.png",4,{Combat:COMBAT_FLAGS.PENDING_ATTACK,Player:PLAYER_FLAGS.BULLDOZE},{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,-34,-23,0,0,0,0,0,0);
        psycho_crusher.addFrame(player,0,"",folder+"/psycho-crusher-0.png",3,{Combat:COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,null,-68,-23,0,0,0,0,0,0);
        psycho_crusher.addFrame(player,0,"",folder+"/psycho-crusher-1.png",8,{Combat:COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,null,-68,-23,0,0,0,0,0,0);
        psycho_crusher.addFrame(player,0,"",folder+"/psycho-crusher-2.png",3,{Combat:COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,null,-68,-23,0,0,0,0,0,0);
        psycho_crusher.addFrame(player,0,"",folder+"/psycho-crusher-1.png",3,{Combat:COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,null,-68,-23,0,0,0,0,0,0);
        psycho_crusher.addFrame(player,0,"",folder+"/psycho-crusher-2.png",3,{Combat:COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,null,-68,-23,0,0,0,0,0,0);
        psycho_crusher.addFrame(player,0,"",folder+"/psycho-crusher-1.png",3,{Combat:COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,null,-68,-23,0,0,0,0,0,0);
        psycho_crusher.addFrame(player,0,"",folder+"/psycho-crusher-2.png",3,{Combat:COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,null,-68,-23,0,0,0,0,0,0);
        psycho_crusher.addFrame(player,0,"",folder+"/p2-3.png",3,{Combat:COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,null,-6,-11);
        psycho_crusher.addFrameWithSound(player,1,"audio/mbison/psycho-crusher.zzz",0,"",folder+"/psycho-crusher-3.png",2,{Combat:COMBAT_FLAGS.PENDING_ATTACK},{Combat:COMBAT_FLAGS.SUPER_MOVE_PAUSE},0,0,0,0,null,-26,-11,0,0,0,0,0,0);
        psycho_crusher.addFrame(player,0,"",folder+"/psycho-crusher-4.png",1,{Juggle:JUGGLE_FLAGS.ALIVE|JUGGLE_FLAGS.DEAD,Combo:COMBO_FLAGS.BLUE_FIRE_ON_FIRST_HIT,Player:PLAYER_FLAGS.MOVE_TO_BACK,Pose:POSE_FLAGS.AIRBORNE,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,40,null,-180,20,ATTACK_FLAGS.OVERRIDE_INVULNERABLE|ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:-70,y:120},{state:HIT_FLAGS.LOW,x:30,y:160},{state:HIT_FLAGS.LOW,x:130,y:160},{state:HIT_FLAGS.LOW,x:225,y:160},{state:HIT_FLAGS.LOW,x:320,y:120},{state:HIT_FLAGS.LOW,x:30,y:80},{state:HIT_FLAGS.LOW,x:130,y:80},{state:HIT_FLAGS.LOW,x:225,y:80}],ATTACK_FLAGS.HARD,CONSTANTS.FIRST_HIT,1,20);

        for(var i = 0; i < 4; ++i)
        {
            psycho_crusher.addFrame(player,0,"",folder+"/psycho-crusher-4.png",3,{Juggle:JUGGLE_FLAGS.ALIVE|JUGGLE_FLAGS.DEAD,Combo:COMBO_FLAGS.BLUE_FIRE_ON_FIRST_HIT,Pose:POSE_FLAGS.HOLD_AIRBORNE,Player:PLAYER_FLAGS.IGNORE_COLLISIONS,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,20,null,-180,20,ATTACK_FLAGS.OVERRIDE_INVULNERABLE|ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.SUPER|ATTACK_FLAGS.HARD,hitPoints,ATTACK_FLAGS.HARD,++hit,1,20);
            psycho_crusher.addFrame(player,0,"",folder+"/psycho-crusher-5.png",3,{Juggle:JUGGLE_FLAGS.ALIVE|JUGGLE_FLAGS.DEAD,Combo:COMBO_FLAGS.BLUE_FIRE_ON_FIRST_HIT,Pose:POSE_FLAGS.HOLD_AIRBORNE,Player:PLAYER_FLAGS.IGNORE_COLLISIONS,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,20,null,-100,0, ATTACK_FLAGS.OVERRIDE_INVULNERABLE|ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.SUPER|ATTACK_FLAGS.HARD,hitPoints,ATTACK_FLAGS.HARD,++hit,1,20);
            psycho_crusher.addFrame(player,0,"",folder+"/psycho-crusher-6.png",3,{Juggle:JUGGLE_FLAGS.ALIVE|JUGGLE_FLAGS.DEAD,Combo:COMBO_FLAGS.BLUE_FIRE_ON_FIRST_HIT,Pose:POSE_FLAGS.HOLD_AIRBORNE,Player:PLAYER_FLAGS.IGNORE_COLLISIONS,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,20,null,-76, 0, ATTACK_FLAGS.OVERRIDE_INVULNERABLE|ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.SUPER|ATTACK_FLAGS.HARD,hitPoints,ATTACK_FLAGS.HARD,++hit,1,20);
            psycho_crusher.addFrame(player,0,"",folder+"/psycho-crusher-7.png",3,{Juggle:JUGGLE_FLAGS.ALIVE|JUGGLE_FLAGS.DEAD,Combo:COMBO_FLAGS.BLUE_FIRE_ON_FIRST_HIT,Pose:POSE_FLAGS.HOLD_AIRBORNE,Player:PLAYER_FLAGS.IGNORE_COLLISIONS,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,20,null,-105,0, ATTACK_FLAGS.OVERRIDE_INVULNERABLE|ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.SUPER|ATTACK_FLAGS.HARD,hitPoints,ATTACK_FLAGS.HARD,++hit,1,20);
        }

        
        var trail = CreateAnimationTrail([],0,10);
        for(var trailIndex = 0; trailIndex < 3; ++trailIndex)
        {
            /*trail*/
            var psycho_crusher_trail = new GenericAnimation("psycho_crusher trail");

            psycho_crusher_trail.addTrailFrame(player,folder+"/pc-" + trailIndex + "-0.png",4);
            psycho_crusher_trail.addTrailFrame(player,folder+"/pc-" + trailIndex + "-1.png",3);
            psycho_crusher_trail.addTrailFrame(player,folder+"/pc-" + trailIndex + "-1.png",8);
            psycho_crusher_trail.addTrailFrame(player,folder+"/pc-" + trailIndex + "-1.png",3);
            psycho_crusher_trail.addTrailFrame(player,folder+"/pc-" + trailIndex + "-1.png",3);
            psycho_crusher_trail.addTrailFrame(player,folder+"/pc-" + trailIndex + "-1.png",3);
            psycho_crusher_trail.addTrailFrame(player,folder+"/pc-" + trailIndex + "-1.png",3);
            psycho_crusher_trail.addTrailFrame(player,folder+"/pc-" + trailIndex + "-1.png",3);
            psycho_crusher_trail.addTrailFrame(player,folder+"/pc-" + trailIndex + "-2.png",3);
            psycho_crusher_trail.addTrailFrame(player,folder+"/pc-" + trailIndex + "-3.png",2);
            psycho_crusher_trail.addRepeatingTrailFrame(player,folder+"/pc-" + trailIndex + "-4.png",1);

            for(var i = 0; i < 3 + (x*2); ++i)
            {
                psycho_crusher_trail.addRepeatingTrailFrame(player,folder+"/pc-" + trailIndex + "-5.png",3);
                psycho_crusher_trail.addRepeatingTrailFrame(player,folder+"/pc-" + trailIndex + "-6.png",3);
                psycho_crusher_trail.addRepeatingTrailFrame(player,folder+"/pc-" + trailIndex + "-7.png",3);
                psycho_crusher_trail.addRepeatingTrailFrame(player,folder+"/pc-" + trailIndex + "-8.png",3);
            }

            trail.add(psycho_crusher_trail,player.Element,player.Folder,player);
        }

        psycho_crusher.Trail = trail;
        psycho_crusher.chain(psycho_crusher_end);
    }


    for(var x = 0; x < 3; ++x)
    {
        xSpeed = x + 10;
        var projectile = player.addProjectile("projectile p" + (x+1),160,180,xSpeed);
        projectile.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.ALL,OVERRIDE_FLAGS.PROJECTILE);

        projectile.HitSound = HITSOUND.HP3;

        projectile.Fx = 0.5;
        projectile.Fy = 0.5;


        projectile.EnergyToAdd = (10);
        projectile.AttackState = ATTACK_FLAGS.HARD|ATTACK_FLAGS.FLOOR_AIRBORNE_HARD;
        projectile.HitState = HIT_FLAGS.HIGH;
        projectile.FlagsToSend = ATTACK_FLAGS.HARD|ATTACK_FLAGS.REAR;
        if(x == 0)
            projectile.FlagsToSend |= ATTACK_FLAGS.SPECIAL1;
        else if(x == 1)
            projectile.FlagsToSend |= ATTACK_FLAGS.SPECIAL2;
        else if(x == 2)
            projectile.FlagsToSend |= ATTACK_FLAGS.SPECIAL3;

        projectile.BaseDamage = 35;

        /*this formula is applied each frame to compute the X coordinate of the projectile*/
        projectile.Animation.vxFn = (function(args) { return function(xSpeed,t) { return xSpeed; } });
        /*this formula is applied each frame to compute the Y coordinate of the projectile*/
        projectile.Animation.vyFn = (function(args) { return function(ySpeed,t) { return ySpeed; } });

        projectile.Animation.addFrame(player,0,"",folder + "/projectile-0.png",1,0,0,-23).clip({Front:70,Back:70,Bottom:70,Top:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,0).clip({Front:70,Back:70,Bottom:70,Top:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-2.png",1,0,0,-25).clip({Front:70,Back:70,Bottom:70,Top:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,0).clip({Front:70,Back:70,Bottom:70,Top:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-3.png",2,0,0,-23).clip({Front:70,Back:70,Bottom:70,Top:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,0).clip({Front:70,Back:70,Bottom:70,Top:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-4.png",1,0,0,-25).clip({Front:70,Back:70,Bottom:70,Top:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,0).clip({Front:70,Back:70,Bottom:70,Top:70});

        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-disintegrate-0.png",3,0,0,-32);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-disintegrate-1.png",3,0,0,-44);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-disintegrate-2.png",3,0,0,-20);

        
        var button = BUTTONS.LIGHT_PUNCH;
        if(x == 1) {button = BUTTONS.MEDIUM_PUNCH;}
        else if(x == 2) {button = BUTTONS.HARD_PUNCH;}

        var fireball = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"fireball p" + (x+1),CONSTANTS.MAX_FRAME,[BUTTONS.BACK|BUTTONS.CHARGE,0,BUTTONS.FORWARD,BUTTONS.EXACT|BUTTONS.FORWARD|button],0,true);
        fireball.ProjectileId = player.Projectiles.length-1;
        fireball.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED,MinNbFrames:CONSTANTS.NBCHARGE_FRAMES}]);
        fireball.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES},{Button:button,State:BUTTON_STATE.PRESSED}]);
        fireball.ButtonCount = 3;

        fireball.OverrideFlags = new MoveOverrideFlags();
        fireball.IsSpecialMove = true;
        fireball.EnergyToAdd = (5);
        fireball.Flags = ({Pose:POSE_FLAGS.STANDING,Combat:COMBAT_FLAGS.PROJECTILE_ACTIVE});
        fireball.addFrame(player,0,"",folder + "/block-0.png",2,{Combat: COMBAT_FLAGS.PENDING_ATTACK},{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,-35,-11);
        fireball.addFrame(player,0,"",folder + "/fireball-0.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,null,-70,-11);
        fireball.addFrame(player,0,"",folder + "/fireball-1.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,null,-70,-11);
        fireball.addFrame(player,0,"",folder + "/fireball-2.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,null,-70,-11);
        fireball.addFrame(player,0,"",folder + "/fireball-3.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,null,-70,-11);
        fireball.addFrame(player,0,"",folder + "/p2-0.png",2,{Combat: COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,null,-60,-11);
        fireball.addFrameWithSound(player,1,"audio/mbison/thrust-2.zzz",0,"",folder + "/fireball-4.png",1,{Combat:COMBAT_FLAGS.PENDING_ATTACK|COMBAT_FLAGS.SPAWN_PROJECTILE|COMBAT_FLAGS.PROJECTILE_ACTIVE|COMBAT_FLAGS.STOP_SLIDE_BACK},MISC_FLAGS.NONE,0,0,0,0,x,0,-11);
        fireball.addFrameWithSound(player,1,"audio/misc/projectile-0.zzz",0,"",folder + "/fireball-5.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-10,-11);
        fireball.addFrame(player,0,"",folder + "/fireball-6.png",24,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-20,-11);
        fireball.addFrame(player,0,"",folder + "/p1-3.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,10,-11);
        fireball.addFrame(player,0,"",folder + "/turn-2.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,null,-10,-11);
    }

    /*******************************************************/
    /*******************************************************/
    /*******************************************************/

    player.sortAnimations();
    return player;
}