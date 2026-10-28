
var createSagat = function(user)
{
    var player = new Player("sagat",131,247,user);
    var folder = "images/misc/" + player.Folder;
    player.ForceNoAdjustShadowPosition = true;
    player.DefaultJumpSpeed = 1.2;
    player.BlockDistanceSq = 120000;
    player.BlockDistanceSq2 = 150000;
    player.StandingClip.Top = 80;
    player.StandingClip.Back = 30;

    player.DefaultShadowImageSrc = "168"
    player.DefaultShadowOffset = -15;
    player.DizzyOffset = {X:30,Y:240};
    player.Circle.OffsetY = 0;

    var stance = player.addAnimation(MISC_FLAGS.NONE,"stance",0,["stance"],0,false);
    stance.Flags = ({Player:PLAYER_FLAGS.ALLOW_CHANGE_DIRECTION | PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.STANDING});
    stance.addFrame(player,0,"",folder + "/stance-1.png",4,{Player:PLAYER_FLAGS.MOBILE});
    stance.addFrame(player,0,"",folder + "/stance-0.png",4);
    stance.addFrame(player,0,"",folder + "/stance-1.png",4);
    stance.addFrame(player,0,"",folder + "/stance-2.png",4);
    stance.addFrame(player,0,"",folder + "/stance-3.png",4);
    stance.addFrame(player,0,"",folder + "/stance-2.png",4);

    var crouch = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD,"crouch",0,[BUTTONS.CROUCH],99,false);
    crouch.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.JUMP,State:BUTTON_STATE.NONE}]);
    crouch.ButtonCount = 1;
    crouch.Flags = ({Player:PLAYER_FLAGS.ALLOW_CHANGE_DIRECTION | PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.CROUCHING});
    crouch.addFrame(player,0,"",folder + "/crouch-0.png",2,{Player:PLAYER_FLAGS.MOBILE});
    crouch.addFrame(player,0,"",folder + "/crouch-1.png",2,{Player:PLAYER_FLAGS.MUST_HOLD_KEY});
    /*MOBILE is set on the following frame because other moves chain to it*/
    crouch.addFrame(player,0,"",folder + "/crouch-2.png",2,{Player:PLAYER_FLAGS.HOLD_FRAME|PLAYER_FLAGS.MOBILE});
    crouch.addFrame(player,0,"",folder + "/crouch-1.png",2);
    crouch.addFrame(player,0,"",folder + "/crouch-0.png",2);
    
    var jump_land = player.addAnimation(MISC_FLAGS.NONE,"jump land",0,["jump-land"],0,false);
    jump_land.addFrameWithSound(player,1,"audio/misc/jump-land.zzz",0,"",folder + "/crouch-0.png",2,{Player:PLAYER_FLAGS.MOBILE});


    var turn = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"turn",0,["turn"],0,false);
    turn.ButtonSequence.push([{Button:BUTTONS.TURN_AROUND,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    turn.ButtonCount = 1;
    turn.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.STANDING});
    turn.addFrame(player,0,"",folder + "/turn-0.png",2,{Player:PLAYER_FLAGS.MOBILE});
    turn.addFrame(player,0,"",folder + "/turn-1.png",2);
    turn.addFrame(player,0,"",folder + "/turn-2.png",2);

    var cturn = player.addAnimation(POSE_FLAGS.CROUCHING,"crouch turn",0,["turn"],0,false);
    cturn.ButtonSequence.push([{Button:BUTTONS.TURN_AROUND,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    cturn.ButtonCount = 1;
    cturn.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.CROUCHING});
    cturn.addFrame(player,0,"",folder + "/cturn-0.png",2,{Player:PLAYER_FLAGS.MOBILE});
    cturn.addFrame(player,0,"",folder + "/cturn-1.png",2);
    cturn.addFrame(player,0,"",folder + "/cturn-2.png",2);
    cturn.chain(crouch,2);

    var win1 = player.addAnimation(MISC_FLAGS.NONE,"win 1",0,["win1"],0,false);
    win1.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    win1.addFrame(player,0,"",folder + "/win-0-0.png",4);
    win1.addFrame(player,0,"",folder + "/win-0-1.png",12);
    win1.addFrame(player,0,"",folder + "/win-0-2.png",12);
    win1.addFrame(player,0,"",folder + "/win-0-3.png",CONSTANTS.MAX_FRAME);

    var win2 = player.addAnimation(MISC_FLAGS.NONE,"win 2",0,["win2"],0,false);
    win2.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    win2.addFrame(player,0,"",folder + "/win-1-0.png",4);
    win2.addFrame(player,0,"",folder + "/win-1-1.png",8);
    win2.addFrame(player,0,"",folder + "/win-1-2.png",8);
    win2.addFrame(player,0,"",folder + "/win-1-3.png",8);
    win2.addFrame(player,0,"",folder + "/win-1-4.png",8);
    win2.addFrame(player,0,"",folder + "/win-1-3.png",8);
    win2.addFrame(player,0,"",folder + "/win-1-4.png",8);
    win2.addFrame(player,0,"",folder + "/win-1-3.png",8);
    win2.addFrameWithSound(player,1,"audio/sagat/laugh-0.zzz",0,"",folder + "/win-1-4.png",8);
    win2.addFrame(player,0,"",folder + "/win-1-5.png",8);
    win2.addFrame(player,0,"",folder + "/win-1-6.png",8);
    win2.addFrame(player,0,"",folder + "/win-1-7.png",8);
    win2.chain(win2,9);

    /*if this is not added,then only the first win animation will ever be used*/
    player.WinAnimationNames = ["win 1","win 2"];


    var hitReact_cLH = player.addAnimation(POSE_FLAGS.CROUCHING,"hr crouch light",0,["hr_cLH"],0,false);
    hitReact_cLH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.CROUCHING});
    hitReact_cLH.addFrame(player,0,"",folder + "/hit-cln-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    hitReact_cLH.chain(crouch,2);

    var hitReact_cMH = player.addAnimation(POSE_FLAGS.CROUCHING,"hr crouch medium",0,["hr_cMH"],0,false);
    hitReact_cMH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.CROUCHING});
    hitReact_cMH.addFrame(player,0,"",folder + "/hit-cln-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    hitReact_cMH.addFrame(player,0,"",folder + "/hit-chn-0.png",8);
    hitReact_cMH.addFrame(player,0,"",folder + "/hit-cln-0.png",8);
    hitReact_cMH.chain(crouch,2);

    var hitReact_cHH = player.addAnimation(POSE_FLAGS.CROUCHING,"hr crouch hard",0,["hr_cHH"],0,false);
    hitReact_cHH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.CROUCHING});
    hitReact_cHH.addFrame(player,0,"",folder + "/hit-cmn-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    hitReact_cHH.addFrame(player,0,"",folder + "/hit-chn-0.png",8);
    hitReact_cHH.addFrame(player,0,"",folder + "/hit-cln-0.png",8);
    hitReact_cHH.chain(crouch,2);

    var hitReact_sLL = player.addAnimation(POSE_FLAGS.STANDING,"hr_sLL",0,["hr_sLL"],0,false);
    hitReact_sLL.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sLL.addFrame(player,0,"",folder + "/hit-sln-0.png",5,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    hitReact_sLL.addFrameWithSound(player,1,"audio/sagat/clocked.zzz",0,"",folder + "/hit-sln-0.png",5);

    var hitReact_sLH = player.addAnimation(POSE_FLAGS.STANDING,"hr_sLH",0,["hr_sLH"],0,false);
    hitReact_sLH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sLH.addFrame(player,0,"",folder + "/hit-sln-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    hitReact_sLH.addFrameWithSound(player,1,"audio/sagat/clocked.zzz",0,"",folder + "/hit-sln-0.png",8);
    hitReact_sLH.addFrame(player,0,"",folder + "hit-sln-0.png",8);

    var hitReact_sML = player.addAnimation(POSE_FLAGS.STANDING,"hr_sML",0,["hr_sML"],0,false);
    hitReact_sML.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sML.addFrame(player,0,"",folder + "/hit-sln-0.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}).clipMove({Front:20});
    hitReact_sML.addFrame(player,0,"",folder + "/hit-smn-0.png",6).clipMove({Front:20});
    hitReact_sML.addFrame(player,0,"",folder + "/hit-sln-0.png",8).clipMove({Front:20});

    var hitReact_sMH = player.addAnimation(POSE_FLAGS.STANDING,"hr_sMH",0,["hr_sMH"],0,false);
    hitReact_sMH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sMH.addFrame(player,0,"",folder + "/hit-shh-2.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}).clipMove({Front:20});
    hitReact_sMH.addFrame(player,0,"",folder + "/hit-shh-0.png",6).clipMove({Front:20});
    hitReact_sMH.addFrame(player,0,"",folder + "/hit-shh-2.png",8).clipMove({Front:20});

    var hitReact_sHL = player.addAnimation(POSE_FLAGS.STANDING,"hr_sHL",0,["hr_sHL"],0,false);
    hitReact_sHL.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sHL.addFrame(player,0,"",folder + "/hit-smn-0.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}).clipMove({Front:20});
    hitReact_sHL.addFrameWithSound(player,1,"audio/sagat/clocked.zzz",0,"",folder + "/hit-shn.png",8).clipMove({Front:20});
    hitReact_sHL.addFrame(player,0,"",folder + "/hit-sln-0.png",8).clipMove({Front:20});

    var hitReact_sHH = player.addAnimation(POSE_FLAGS.STANDING,"hr_sHH",0,["hr_sHH"],0,false);
    hitReact_sHH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sHH.addFrame(player,0,"",folder + "/hit-shh-0.png",4,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}).clipMove({Front:20});
    hitReact_sHH.addFrameWithSound(player,1,"audio/sagat/clocked.zzz",0,"",folder + "/hit-shh-1.png",10).clipMove({Front:20});
    hitReact_sHH.addFrame(player,0,"",folder + "/hit-shh-2.png",4).clipMove({Front:20});

    var getup = player.addAnimation(MISC_FLAGS.NONE,"getup",0,["hr_getup"],0,false);
    getup.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    getup.addFrameWithSound(player,1,"audio/misc/floored-1.zzz",{X:10,Y:0},"200",folder + "/hit-air-3.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS,Spawn:SPAWN_FLAGS.SPAWN_SMALLDIRT},{Player:PLAYER_FLAGS.MOBILE});
    getup.addFrame(player,{X:10,Y:-15},"304",folder + "/down.png",3,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player,0,"",folder + "/getup-0.png",3,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player,0,"",folder + "/getup-1.png",3,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player,0,"",folder + "/getup-2.png",3,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player,0,"",folder + "/getup-3.png",3,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player,0,"",folder + "/getup-4.png",3,{Player:PLAYER_FLAGS.IGNORE_ATTACKS},0,0,0,0,0,0,0,66);
    getup.addFrame(player,0,"",folder + "/crouch-0.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS},0,0,0,0,0,0,0,0);

    var dizzy = player.addAnimation(MISC_FLAGS.NONE,"so dizzy",0,["hr_sodizzy"],0,false);
    dizzy.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX, Alert: ALERT_FLAGS.DIZZY });
    dizzy.AdjustShadowPosition = false;
    dizzy.addFrame(player,0,"",folder + "/dizzy-0.png",32,{ Player: PLAYER_FLAGS.DIZZY },{Player: PLAYER_FLAGS.MOBILE});
    dizzy.addFrame(player,0,"",folder + "/dizzy-1.png",32,{ Player: PLAYER_FLAGS.DIZZY });
    dizzy.addFrame(player,0,"",folder + "/dizzy-2.png",32,{ Player: PLAYER_FLAGS.DIZZY },0,0,0,0,0,0,0);
    dizzy.addFrame(player,0,"",folder + "/dizzy-3.png",32,{ Player: PLAYER_FLAGS.DIZZY },0,0,0,0,0,0,0);
    dizzy.addFrame(player,0,"",folder + "/dizzy-4.png",32,{ Player: PLAYER_FLAGS.DIZZY },0,0,0,0,0,0,0);
    dizzy.addFrame(player,0,"",folder + "/dizzy-3.png",32,{ Player: PLAYER_FLAGS.DIZZY },0,0,0,0,0,0,0);
    dizzy.addFrame(player,0,"",folder + "/dizzy-2.png",32,{ Player: PLAYER_FLAGS.DIZZY },0,0,0,0,0,0,0);
    dizzy.addFrame(player,0,"",folder + "/dizzy-1.png",32,{ Player: PLAYER_FLAGS.DIZZY },0,0,0,0,0,0,0);
    dizzy.chain(dizzy);

    var getup_dizzy = player.addAnimation(MISC_FLAGS.NONE,"getup dizzy",0,["hr_getupdizzy"],0,false);
    getup_dizzy.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    getup_dizzy.addFrameWithSound(player,1,"audio/misc/floored-1.zzz",{X:10,Y:0},"200",folder + "/hit-air-3.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS,Spawn:SPAWN_FLAGS.SPAWN_SMALLDIRT},{Player:PLAYER_FLAGS.MOBILE});
    getup_dizzy.addFrame(player,{X:10,Y:-15},"304",folder + "/down.png",3,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup_dizzy.addFrame(player,0,"",folder + "/getup-0.png",3,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup_dizzy.addFrame(player,0,"",folder + "/getup-1.png",3,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup_dizzy.addFrame(player,0,"",folder + "/getup-2.png",3,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup_dizzy.addFrame(player,0,"",folder + "/getup-3.png",3,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup_dizzy.addFrame(player,0,"",folder + "/getup-4.png",3,{Player:PLAYER_FLAGS.IGNORE_ATTACKS},0,0,0,0,0,0,0,66);
    getup_dizzy.addFrame(player,0,"",folder + "/crouch-0.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS},0,0,0,0,0,0,0,0);
    getup_dizzy.chain(dizzy);

    var hitReact_dizzyBounce = player.addAnimation(MISC_FLAGS.NONE,"dizzy bounce",0,["hr_dizzybounce"],0,false);
    hitReact_dizzyBounce.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX | PLAYER_FLAGS.USE_CURRENT_VX});
    hitReact_dizzyBounce.chainVxFn = (function(v){ return v * 0.75; });
    hitReact_dizzyBounce.chainVyFn = (function(v){ return v * 0.5; });
    hitReact_dizzyBounce.Vy = (80);
    hitReact_dizzyBounce.addFrameWithSound(player,1,"audio/misc/floored-2.zzz",0,"200",folder + "/hit-air-2.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS,Spawn:SPAWN_FLAGS.SPAWN_BIGDIRT},{Player:PLAYER_FLAGS.MOBILE},0,1);
    hitReact_dizzyBounce.addFrame(player,{X:10,Y:0},"200",folder + "/hit-air-3.png",CONSTANTS.FRAME_MAX,{Pose:POSE_FLAGS.AIRBORNE,Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS},{Player: PLAYER_FLAGS.MOBILE});
    hitReact_dizzyBounce.chain(getup_dizzy);

    var hitReact_dizzy = player.addAnimation(POSE_FLAGS.STANDING,"dizzy",0,["hr_dizzy"],0,false);
    hitReact_dizzy.Flags = ({ Player: PLAYER_FLAGS.MOVE_TO_FRONT });
    hitReact_dizzy.Vx = (35);
    hitReact_dizzy.Vy = (200);
    hitReact_dizzy.addFrame(player,0,"200",folder + "/hit-air-4.png",32,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS },{Player: PLAYER_FLAGS.MOBILE},1);
    hitReact_dizzy.addFrame(player,0,"200",folder + "/hit-air-5.png",CONSTANTS.FRAME_MAX,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE | PLAYER_FLAGS.IGNORE_ATTACKS });
    hitReact_dizzy.chain(hitReact_dizzyBounce);

    var hitReact_bounce = player.addAnimation(MISC_FLAGS.NONE,"bounce",0,["hr_bounce"],0,false);
    hitReact_bounce.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX | PLAYER_FLAGS.USE_CURRENT_VX});
    hitReact_bounce.chainVxFn = (function(v){ return v * 0.75; });
    hitReact_bounce.chainVyFn = (function(v){ return v * 0.5; });
    hitReact_bounce.Vy = (80);
    hitReact_bounce.addFrameWithSound(player,1,"audio/misc/floored-2.zzz",0,"200",folder + "/hit-air-2.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS,Spawn:SPAWN_FLAGS.SPAWN_BIGDIRT},{Player:PLAYER_FLAGS.MOBILE},0,1);
    hitReact_bounce.addFrame(player,{X:10,Y:0},"200",folder + "/hit-air-3.png",CONSTANTS.FRAME_MAX,{Pose:POSE_FLAGS.AIRBORNE,Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS},{Player: PLAYER_FLAGS.MOBILE});
    hitReact_bounce.chain(getup);

    var hitReact_trip = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING,"tripped",0,["hr_trip"],0,false);
    hitReact_trip.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX, Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_trip.Vx = (25);
    hitReact_trip.Vy = (150);
    hitReact_trip.addFrame(player,0,"",folder + "/hit-air-0.png",16,{Player:PLAYER_FLAGS.INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,0,50);
    hitReact_trip.addFrame(player,0,"",folder + "/hit-air-1.png",CONSTANTS.FRAME_MAX,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_trip.chain(hitReact_bounce);

    var hitReact_air = player.addAnimation(POSE_FLAGS.AIRBORNE,"hit in air",0,["hr_air"],0,false);
    hitReact_air.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX, Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_air.Vx = (-50);
    hitReact_air.Vy = (150);
    hitReact_air.addFrame(player,0,"",folder + "/hit-air-4.png",8,{Player:PLAYER_FLAGS.INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE});
    hitReact_air.addFrame(player,0,"",folder + "/hit-air-5.png",2,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_air.addFrame(player,0,"",folder + "/hit-air-2.png",2,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_air.addFrame(player,0,"",folder + "/hit-air-6.png",2,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_air.addFrame(player,0,"",folder + "/jump-2.png",2,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_air.addFrame(player,0,"",folder + "/jump-0.png",CONSTANTS.FRAME_MAX,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE});
    hitReact_air.chain(jump_land);

    var hitReact_red_fire = player.addAnimation(POSE_FLAGS.STANDING,"red fire",0,["hr_red_fire"],0,false);
    hitReact_red_fire.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX, Combat : COMBAT_FLAGS.IGNORE_CLEAR_FIRE, Juggle:JUGGLE_FLAGS.ALLOW });
    hitReact_red_fire.Vx = (25);
    hitReact_red_fire.Vy = (200);
    hitReact_red_fire.IsLooping = true;
    hitReact_red_fire.addFrame(player,0,"200",folder + "/hit-rfire-0.png",2,{ Player: PLAYER_FLAGS.INVULNERABLE },{Player:PLAYER_FLAGS.MOBILE},1);
    hitReact_red_fire.addFrame(player,0,"200",folder + "/hit-rfire-1.png",2,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE });
    hitReact_red_fire.chain(hitReact_bounce);

    var hitReact_blue_fire = player.addAnimation(POSE_FLAGS.STANDING,"blue fire",0,["hr_blue_fire"],0,false);
    hitReact_blue_fire.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX, Combat : COMBAT_FLAGS.IGNORE_CLEAR_FIRE, Juggle:JUGGLE_FLAGS.ALLOW });
    hitReact_blue_fire.Vx = (50);
    hitReact_blue_fire.Vy = (150);
    hitReact_blue_fire.IsLooping = true;
    hitReact_blue_fire.addFrame(player,0,"200",folder + "/hit-bfire-0.png",2,{ Player: PLAYER_FLAGS.INVULNERABLE },{Player:PLAYER_FLAGS.MOBILE},1);
    hitReact_blue_fire.addFrame(player,0,"200",folder + "/hit-bfire-1.png",2,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE });
    hitReact_blue_fire.chain(hitReact_bounce);

    var hitReact_knockDown = player.addAnimation(POSE_FLAGS.STANDING,"knock down",0,["hr_knockdown"],0,false);
    hitReact_knockDown.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX, Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_knockDown.Vx = (25);
    hitReact_knockDown.Vy = (150);
    hitReact_knockDown.addFrame(player,0,"",folder + "/hit-air-4.png",32,{Player:PLAYER_FLAGS.INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE},0,1);
    hitReact_knockDown.addFrame(player,0,"",folder + "/hit-air-5.png",CONSTANTS.FRAME_MAX,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE});
    hitReact_knockDown.chain(hitReact_bounce);

    var down = player.addAnimation(MISC_FLAGS.NONE,"down",0,["hr_down"],0,false);
    down.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    down.addFrameWithSound(player,1,"audio/misc/floored-1.zzz",{X:10,Y:-15},"304",folder + "/down.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE,Spawn:SPAWN_FLAGS.SPAWN_SMALLDIRT},{Player:PLAYER_FLAGS.MOBILE});

    var hitReact_deadBounce = player.addAnimation(MISC_FLAGS.NONE,"dead bounce",0,["hr_deadbounce"],0,false);
    hitReact_deadBounce.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX | PLAYER_FLAGS.USE_CURRENT_VX });
    hitReact_deadBounce.chainVxFn = (function(v){ return v * 0.75; });
    hitReact_deadBounce.Vy = (80);
    hitReact_deadBounce.addFrameWithSound(player,1,"audio/misc/floored-2.zzz",0,"200",folder + "/hit-air-2.png",4,{Player:PLAYER_FLAGS.INVULNERABLE|PLAYER_FLAGS.IGNORE_COLLISIONS,Spawn:SPAWN_FLAGS.SPAWN_BIGDIRT},{Player:PLAYER_FLAGS.MOBILE},0,1);
    hitReact_deadBounce.addFrame(player,0,"200",folder + "/hit-air-3.png",CONSTANTS.FRAME_MAX,{Pose:POSE_FLAGS.AIRBORNE,Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS|PLAYER_FLAGS.IGNORE_COLLISIONS},{Player:PLAYER_FLAGS.MOBILE});
    hitReact_deadBounce.chain(down);

    var hitReact_dead = player.addAnimation(POSE_FLAGS.STANDING,"hr dead",0,["hr_dead"],0,false);
    hitReact_dead.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX, Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_dead.Vx = (35);
    hitReact_dead.Vy = (200);
    hitReact_dead.addFrame(player,0,"",folder + "/hit-air-4.png",32,{Player:PLAYER_FLAGS.INVULNERABLE|PLAYER_FLAGS.IGNORE_COLLISIONS},{Player:PLAYER_FLAGS.MOBILE},0,1);
    hitReact_dead.addFrame(player,0,"",folder + "/hit-air-5.png",CONSTANTS.FRAME_MAX,{Player: PLAYER_FLAGS.SUPER_INVULNERABLE|PLAYER_FLAGS.IGNORE_COLLISIONS});
    hitReact_dead.chain(hitReact_deadBounce);

    var hitReact_eject = player.addAnimation(POSE_FLAGS.STANDING,"eject",0,["eject"],0,false);
    hitReact_eject.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX, Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_eject.Vx = (35);
    hitReact_eject.Vy = (200);
    hitReact_eject.addFrame(player,0,"",folder + "/hit-air-4.png",32,{Player:PLAYER_FLAGS.INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE},0,1);
    hitReact_eject.addFrame(player,0,"",folder + "/hit-air-5.png",CONSTANTS.FRAME_MAX,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE,Juggle:JUGGLE_FLAGS.IGNORE});
    hitReact_eject.chain(hitReact_bounce);

    var hitReact_shoulder_throw = player.addAnimation(POSE_FLAGS.ANY,"shoulder throw",0,["shoulder_throw"],0,false);
    hitReact_shoulder_throw.IsImplicit = true;
    hitReact_shoulder_throw.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX });
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/hit-sln-0.png",8,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,0,-50);
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/hit-throw-4.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,0,0,0,0,0,-120,75);
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/hit-throw-5.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABL },MISC_FLAGS.NONE,0,0,0,0,0,-60,180);
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/hit-throw-7.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,0,0,0,0,0,80,150);
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/hit-air-4.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,-100,100,0,0,0,0,0);


    var hitReact_fk_throw = player.addAnimation(POSE_FLAGS.ANY,"fk throw",0,["fk_throw"],0,false);
    hitReact_fk_throw.IsImplicit = true;
    hitReact_fk_throw.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX });
    hitReact_fk_throw.addFrame(player,0,"",folder + "/hit-sln-0.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },{ Player: PLAYER_FLAGS.MOBILE });
    hitReact_fk_throw.addFrame(player,0,"",folder + "/hit-smn-0.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,0,-40,0);
    hitReact_fk_throw.addFrame(player,0,"",folder + "/hit-throw-5.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,0,0,0,0,0,0,105);
    hitReact_fk_throw.addFrame(player,0,"",folder + "/hit-throw-3.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,-160,100,0,0,0,0,0);


    var hitReact_bison_shoulder_throw = player.addAnimation(POSE_FLAGS.ANY,"bison shoulder throw",0,["bison_shoulder_throw"],0,false);
    hitReact_bison_shoulder_throw.IsImplicit = true;
    hitReact_bison_shoulder_throw.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX });
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/hit-shh-0.png",8,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },{ Player: PLAYER_FLAGS.MOBILE });
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/hit-shh-0.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,0,0,0,0,0,0,47);
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/hit-throw-8.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABL },MISC_FLAGS.NONE,0,0,0,0,0,28,174);
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/hit-throw-8.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,0,0,0,0,0,102,169);
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/hit-shh-0.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,-102,170,0,0,0,0,0);



    var hitReact_roll_throw = player.addAnimation(POSE_FLAGS.ANY,"roll throw",0,["roll_throw"],0,false);
    hitReact_roll_throw.IsImplicit = true;
    hitReact_roll_throw.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-sln-0.png",8,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE});
    hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-smn-0.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE});
    for(var i = 0; i < 2; ++i)
    {
        hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-throw-0.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-20,55);
        hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-throw-6.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,60,0);
        hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-air-5.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-25,-90);
        hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-sln-0.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,0,0);
    }
    hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-throw-2.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,0,110);
    hitReact_roll_throw.addFrame(player,0,"",folder + "/hit-throw-3.png",6,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,-160,50,0,0,0,0,0);


    var blockRelease = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_BLOCK,"block release",0,["block_relase"],-2,false);
    blockRelease.Flags = ({Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.MOVE_TO_BACK});
    blockRelease.addFrame(player,0,"",folder + "/block-1.png",2,{Player:PLAYER_FLAGS.BLOCKING});
    blockRelease.addFrame(player,0,"",folder + "/block-0.png",1,{Player:PLAYER_FLAGS.BLOCKING});
    /*The POSE_FLAGS.ALLOW_BLOCK is checked seperately,it absolutely must be there,or else the move will not be found!
    Only one of the other flags need to match*/
    var block = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_BLOCK,"block",0,[BUTTONS.BACK],-2,false);
    block.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    block.ButtonCount = 1;
    block.Flags = ({Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.MOVE_TO_BACK});
    block.addFrame(player,0,"",folder + "/block-0.png",1,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.IGNORE_HOLD_FRAME});
    block.addFrame(player,0,"",folder + "/block-1.png",4,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.MUST_HOLD_KEY});
    block.addFrame(player,0,"",folder + "/block-1.png",4,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.HOLD_FRAME});
    block.chain(blockRelease);
    blockRelease.allowInterupt(block,1,{Pose: POSE_FLAGS.ALLOW_BLOCK});

    var cblockRelease = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.ALLOW_BLOCK,"crouch block release",0,["cblock_release"],-1,false);
    cblockRelease.Flags = ({Player:PLAYER_FLAGS.BLOCKING,Pose:POSE_FLAGS.CROUCHING});
    cblockRelease.addFrame(player,0,"",folder + "/cblock-1.png",4,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.HOLD_FRAME});
    cblockRelease.addFrame(player,0,"",folder + "/cblock-0.png",1,{Player:PLAYER_FLAGS.BLOCKING});
    cblockRelease.chain(crouch,2);
    
    var cblock = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.ALLOW_BLOCK,"crouch block",0,[BUTTONS.CROUCH|BUTTONS.BACK],-1,false);
    cblock.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    cblock.ButtonCount = 1;
    cblock.Flags = ({Player:PLAYER_FLAGS.BLOCKING,Pose:POSE_FLAGS.CROUCHING});
    cblock.addFrame(player,0,"",folder + "/cblock-0.png",1,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.IGNORE_HOLD_FRAME});
    cblock.addFrame(player,0,"",folder + "/cblock-1.png",4,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.MUST_HOLD_KEY});
    cblock.addFrame(player,0,"",folder + "/cblock-1.png",4,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.HOLD_FRAME});
    cblock.chain(cblockRelease);

    var ablock = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB|POSE_FLAGS.ALLOW_AIR_BLOCK,"air block",0,[BUTTONS.BACK],-1,false);
    ablock.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    ablock.ButtonCount = 1;
    ablock.Flags = ({Player:PLAYER_FLAGS.BLOCKING});
    ablock.addFrame(player,0,"",folder + "/ablock-0.png",1,{Player:PLAYER_FLAGS.BLOCKING});
    ablock.addFrame(player,0,"",folder + "/ablock-0.png",CONSTANTS.MAX_FRAME,{Player:PLAYER_FLAGS.BLOCKING});
    ablock.chain(jump_land);

    /////////////////////////////////////////////
    /////////////////////////////////////////////
    /////////////////////////////////////////////

    var p1 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"light punch",5,[BUTTONS.LIGHT_PUNCH]);
    p1.ButtonSequence.push([{Button:BUTTONS.LIGHT_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    p1.ButtonCount = 1;
    p1.Flags = {Pose:POSE_FLAGS.STANDING};
    p1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING);
    p1.addFrame(player,{X:0,Y:-1},"232",folder + "/p1-0.png",3,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    p1.addFrame(player,{X:0,Y:-1},"232",folder + "/p1-1.png",3,{ SwingSound:SWINGSOUND.LP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.LP },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.LIGHT,[{ state: HIT_FLAGS.LOW,x: 210,y: 243 },{ state: HIT_FLAGS.HIGH,x: 254,y: 213},{ state: HIT_FLAGS.HIGH,x: 194,y: 193}],ATTACK_FLAGS.LIGHT,1,0,10);
    p1.endBlock();
    p1.addFrame(player,{X:0,Y:-1},"232",folder + "/p1-2.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    p1.addFrame(player,0,"",folder + "/p2-0.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE);

    var p2 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"medium punch",5,[BUTTONS.MEDIUM_PUNCH]);
    p2.ButtonSequence.push([{Button:BUTTONS.MEDIUM_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    p2.ButtonCount = 1;
    p2.Flags = {Pose:POSE_FLAGS.STANDING};
    p2.setMediumAttack();
    p2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.AIRBORNE);
    p2.addFrame(player,0,"",folder + "/p2-0.png",4,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    p2.addFrame(player,{X:0,Y:-1},"232",folder + "/p2-1.png",2,{ SwingSound:SWINGSOUND.MP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.MP },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.MEDIUM,[{ state: HIT_FLAGS.LOW,x: 240,y: 235 },{ state: HIT_FLAGS.HIGH,x: 170,y: 185}],ATTACK_FLAGS.MEDIUM,1,1,15);
    p2.addFrame(player,{X:0,Y:-1},"232",folder + "/p2-2.png",9,{ Combat: COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.MEDIUM,[{ state: HIT_FLAGS.LOW,x: 210,y: 220 },{ state: HIT_FLAGS.HIGH,x: 215,y: 270},{ state: HIT_FLAGS.HIGH,x: 200,y: 370}],ATTACK_FLAGS.MEDIUM,1,1,15);
    p2.endBlock();
    p2.addFrame(player,{X:0,Y:-1},"232",folder + "/p2-3.png",5);

    var p3 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"hard punch",5,[BUTTONS.HARD_PUNCH]);
    p3.ButtonSequence.push([{Button:BUTTONS.HARD_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    p3.ButtonCount = 1;
    p3.Flags = {Pose:POSE_FLAGS.STANDING};
    p3.setHardAttack();
    p3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.HPROJECTILE);
    p3.addFrame(player,0,"",folder + "/p2-0.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    p3.addFrame(player,{X:0,Y:-1},"232",folder + "/p3-0.png",3);
    p3.addFrame(player,{X:0,Y:-1},"232",folder + "/p3-1.png",1);
    p3.addFrame(player,0,"264",folder + "/p3-2.png",6,{SwingSound:SWINGSOUND.HP,Combat:COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:200,y:241},{state:HIT_FLAGS.HIGH,x:265,y:231},{state:HIT_FLAGS.HIGH,x:315,y:211}],ATTACK_FLAGS.HARD,1,1,20);
    p3.endBlock();
    p3.addFrame(player,{X:0,Y:-1},"232",folder + "/p3-1.png",4);
    p3.addFrame(player,0,"",folder + "/p2-0.png",5);

    var k1 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"light kick",5,[BUTTONS.LIGHT_KICK]);
    k1.ButtonSequence.push([{Button:BUTTONS.LIGHT_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    k1.ButtonCount = 1;
    k1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING);
    k1.Flags = {Pose:POSE_FLAGS.STANDING};
    k1.addFrame(player,0,"",folder + "/k1-0.png",1,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,0,10,12);
    k1.addFrame(player,0,"",folder + "/k1-1.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,10,9);
    k1.addFrame(player,{X:50,Y:0},"",folder + "/k1-2.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,50,9);
    k1.addFrame(player,{X:60,Y:0},"296",folder + "/k1-3.png",7,{ SwingSound:SWINGSOUND.LP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.LK },MISC_FLAGS.NONE,0,0,0,10,null,50,15,ATTACK_FLAGS.LIGHT,[{ state: HIT_FLAGS.LOW,x: 200,y: 175 },{ state: HIT_FLAGS.LOW,x: 250,y: 155},{ state: HIT_FLAGS.LOW,x: 340,y: 95}],ATTACK_FLAGS.LIGHT,1,1,10);
    k1.endBlock();
    k1.addFrame(player,{X:50,Y:0},"",folder + "/k1-2.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,50,9);
    k1.addFrame(player,0,"",folder + "/k1-1.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,10,9);
    k1.addFrame(player,0,"",folder + "/k1-0.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,10,12);

    var k2 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"medium kick",5,[BUTTONS.MEDIUM_KICK]);
    k2.ButtonSequence.push([{Button:BUTTONS.MEDIUM_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    k2.ButtonCount = 1;
    k2.Flags = {Pose:POSE_FLAGS.STANDING};
    k2.setMediumAttack();
    k2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.HPROJECTILE);
    k2.addFrame(player,0,"",folder + "/k1-0.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,0,10,12);
    k2.addFrame(player,0,"",folder + "/k1-1.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,0,10,9);
    k2.addFrame(player,{X:50,Y:0},"",folder + "/k2-0.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,0,50,9);
    k2.addFrame(player,{X:60,Y:0},"296",folder + "/k2-1.png",6,{SwingSound:SWINGSOUND.MP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1},MISC_FLAGS.NONE,0,0,0,10,null,50,9,ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:190,y:175},{state:HIT_FLAGS.LOW,x:270,y:185},{state:HIT_FLAGS.LOW,x:360,y:195}],ATTACK_FLAGS.MEDIUM,CONSTANTS.SECOND_HIT,1,8);
    k2.endBlock();
    k2.addFrame(player,{X:50,Y:0},"",folder + "/k2-0.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,50,9);
    k2.addFrame(player,0,"",folder + "/k1-1.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,10,9);
    k2.addFrame(player,0,"",folder + "/k1-0.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,10,12);


    var k3 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"hard kick",5,[BUTTONS.HARD_KICK]);
    k3.ButtonSequence.push([{Button:BUTTONS.HARD_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    k3.ButtonCount = 1;
    k3.Flags = {Pose:POSE_FLAGS.STANDING};
    k3.setHardAttack();
    k3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.AIRBORNE);
    k3.addFrame(player,0,"",folder + "/k1-0.png",3,{Player:PLAYER_FLAGS.MOVE_TO_BACK},{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,0,10,12);
    k3.addFrame(player,0,"",folder + "/k1-1.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,10,9);
    k3.addFrame(player,{X:70,Y:0},"",folder + "/k3-0.png",2,{SwingSound:SWINGSOUND.LP,Combat:COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,10,null,96,9,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.HIGH,x:180,y:175},{state:HIT_FLAGS.HIGH,x:240,y:235}],ATTACK_FLAGS.HARD,1,1,20);
    k3.addFrame(player,{X:80,Y:0},"296",folder + "/k3-1.png",10,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,10,null,66,9,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.HIGH,x:220,y:205},{state:HIT_FLAGS.HIGH,x:250,y:245},{state:HIT_FLAGS.HIGH,x:350,y:233},{state:HIT_FLAGS.HIGH,x:300,y:305},{state:HIT_FLAGS.HIGH,x:370,y:285}],ATTACK_FLAGS.HARD,1,1,20);
    k3.endBlock();
    k3.addFrame(player,{X:70,Y:0},"",folder + "/k3-0.png",3,{Player:PLAYER_FLAGS.MOVE_TO_FRONT},MISC_FLAGS.NONE,0,0,0,0,0,96,9);
    k3.addFrame(player,0,"",folder + "/k1-1.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,10,9);
    k3.addFrame(player,0,"",folder + "/k1-0.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,10,12);

    var crouch_p1 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch p1",5,[BUTTONS.CROUCH|BUTTONS.LIGHT_PUNCH],110);
    crouch_p1.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.LIGHT_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_p1.ButtonCount = 2;
    crouch_p1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_p1.Flags = {Pose:POSE_FLAGS.CROUCHING};
    crouch_p1.addFrame(player,0,"",folder + "/crouch-p1-0.png",3,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    crouch_p1.addFrame(player,{X:0,Y:-1},"232",folder + "/crouch-p1-1.png",3,{ SwingSound:SWINGSOUND.LP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.LP },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.LIGHT | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 140,y: 160 },{ state: HIT_FLAGS.LOW,x: 194,y: 150},{ state: HIT_FLAGS.LOW,x: 264,y: 120}],ATTACK_FLAGS.LIGHT,1,1,10);
    crouch_p1.endBlock();
    crouch_p1.addFrame(player,0,"",folder + "/crouch-p1-0.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    crouch_p1.chain(crouch,2);

    var crouch_p2 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch p2",5,[BUTTONS.CROUCH|BUTTONS.MEDIUM_PUNCH],110);
    crouch_p2.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.MEDIUM_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_p2.ButtonCount = 2;
    crouch_p2.setMediumAttack();
    crouch_p2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_p2.Flags = {Pose:POSE_FLAGS.CROUCHING};
    crouch_p2.addFrame(player,0,"",folder + "/crouch-p1-0.png",2,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    crouch_p2.addFrame(player,{X:0,Y:-1},"232",folder + "/crouch-p1-1.png",5,{ SwingSound:SWINGSOUND.MP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.MP },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.MEDIUM | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 140,y: 160 },{ state: HIT_FLAGS.LOW,x: 194,y: 150},{ state: HIT_FLAGS.LOW,x: 264,y: 120}],ATTACK_FLAGS.MEDIUM,1,1,15);
    crouch_p2.endBlock();
    crouch_p2.addFrame(player,0,"",folder + "/crouch-p1-0.png",6,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    crouch_p2.chain(crouch,2);

    var crouch_p3 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch p3",5,[BUTTONS.CROUCH|BUTTONS.HARD_PUNCH],110);
    crouch_p3.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.HARD_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_p3.ButtonCount = 2;
    crouch_p3.setHardAttack();
    crouch_p3.Flags = {Pose:POSE_FLAGS.CROUCHING};
    crouch_p3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING | OVERRIDE_FLAGS.AIRBORNE);
    crouch_p3.addFrame(player,0,"",folder + "/crouch-p3-0.png",6,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    crouch_p3.addFrame(player,{X:0,Y:-1},"296",folder + "/crouch-p3-1.png",6,{ SwingSound:SWINGSOUND.LP,Combat: COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP,Pose: POSE_FLAGS.ALLOW_INTERUPT_1 },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HARD | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 170,y: 160 },{ state: HIT_FLAGS.LOW,x: 230,y: 150 },{ state: HIT_FLAGS.LOW,x: 290,y: 130 }],ATTACK_FLAGS.HARD,1,1,20);
    crouch_p3.endBlock();
    crouch_p3.addFrame(player,0,"",folder + "/crouch-p1-0.png",8,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    crouch_p3.chain(crouch,2);

    var crouch_k1 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch k1",5,[BUTTONS.CROUCH|BUTTONS.LIGHT_KICK],110);
    crouch_k1.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.LIGHT_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_k1.ButtonCount = 2;
    crouch_k1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_k1.Flags = {Pose:POSE_FLAGS.CROUCHING};
    crouch_k1.addFrame(player,0,"",folder + "/crouch-p1-0.png",1,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    crouch_k1.addFrame(player,0,"",folder + "/cblock-0.png",3,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    crouch_k1.addFrame(player,{X:0,Y:-1},"296",folder + "/crouch-k1-1.png",3,{ SwingSound:SWINGSOUND.LP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.LK },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.LIGHT | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 150,y: 60 },{ state: HIT_FLAGS.LOW,x: 250,y: 5}],ATTACK_FLAGS.LIGHT,1,1,10);
    crouch_k1.endBlock();
    crouch_k1.addFrame(player,0,"",folder + "/cblock-0.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    crouch_k1.chain(crouch,2);

    var crouch_k2 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch k2",5,[BUTTONS.CROUCH|BUTTONS.MEDIUM_KICK],110);
    crouch_k2.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.MEDIUM_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_k2.ButtonCount = 2;
    crouch_k2.setMediumAttack();
    crouch_k2.Flags = {Pose:POSE_FLAGS.CROUCHING};
    crouch_k2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_k2.addFrame(player,0,"168",folder + "/crouch-k2-0.png",3,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    crouch_k2.addFrame(player,80,"168",folder + "/crouch-k2-1.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,80,0);
    crouch_k2.addFrame(player,80,"168",folder + "/crouch-k2-2.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,80,-35);
    crouch_k2.addFrame(player,80,"264",folder + "/crouch-k2-3.png",3,{ SwingSound:SWINGSOUND.MP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1|POSE_FLAGS.ALLOW_INTERUPT_2,HitSound:HITSOUND.MK },MISC_FLAGS.NONE,0,0,0,10,null,50,-5,ATTACK_FLAGS.MEDIUM | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 180,y: 85 },{ state: HIT_FLAGS.LOW,x: 265,y: 50 },{ state: HIT_FLAGS.LOW,x: 310,y: 1}],ATTACK_FLAGS.MEDIUM,1,1,15);
    crouch_k2.endBlock();
    crouch_k2.addFrame(player,80,"168",folder + "/crouch-k2-2.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,80,-35);
    crouch_k2.addFrame(player,80,"168",folder + "/crouch-k2-1.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,80,0);
    crouch_k2.addFrame(player,0,"168",folder + "/crouch-k2-0.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    crouch_k2.chain(crouch,2);

    var crouch_k3 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch k3",5,[BUTTONS.CROUCH|BUTTONS.HARD_KICK],110);
    crouch_k3.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.HARD_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_k3.ButtonCount = 2;
    crouch_k3.setHardAttack();
    crouch_k3.Flags = {Pose:POSE_FLAGS.CROUCHING};
    crouch_k3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_k3.addFrame(player,0,"168",folder + "/crouch-k2-0.png",2,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    crouch_k3.addFrame(player,80,"168",folder + "/crouch-k2-1.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,80,0);
    crouch_k3.addFrame(player,80,"168",folder + "/crouch-k2-2.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,80,-35);
    crouch_k3.addFrame(player,80,"264",folder + "/crouch-k2-3.png",8,{ SwingSound:SWINGSOUND.HP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HK },MISC_FLAGS.NONE,0,0,0,10,null,50,-5,ATTACK_FLAGS.HARD | ATTACK_FLAGS.HITS_LOW | ATTACK_FLAGS.TRIP,[{ state: HIT_FLAGS.LOW,x: 180,y: 85 },{ state: HIT_FLAGS.LOW,x: 265,y: 50 },{ state: HIT_FLAGS.LOW,x: 340,y: 1}],ATTACK_FLAGS.HARD,1,1,20,0,CONSTANTS.TRIP_SLIDEFACTOR);
    crouch_k3.endBlock();
    crouch_k3.addFrame(player,80,"168",folder + "/crouch-k2-2.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,80,-35);
    crouch_k3.addFrame(player,80,"168",folder + "/crouch-k2-1.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,80,0);
    crouch_k3.addFrame(player,0,"168",folder + "/crouch-k2-0.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    crouch_k3.chain(crouch,2);




    var walkSpeed = 5;
    var f_walk = player.addAnimation(POSE_FLAGS.STANDING,"f-walk",0,[BUTTONS.FORWARD],90,false);
    f_walk.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED}]);
    f_walk.ButtonCount = 1;
    f_walk.AdjustShadowPosition = (false);
    f_walk.Flags = ({Player:PLAYER_FLAGS.LOOP_IF_KEYDOWN | PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.WALKING_FORWARD});
    f_walk.addRepeatingFrame(player,0,"",folder + "/walk-0.png",3,{Player:PLAYER_FLAGS.MOBILE},MISC_FLAGS.NONE,walkSpeed,0,0,0,-6);
    f_walk.addRepeatingFrame(player,0,"",folder + "/walk-0.png",4,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,walkSpeed,0,0,0,0);
    f_walk.addRepeatingFrame(player,0,"",folder + "/walk-1.png",4,{Plyer:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,walkSpeed,0,0,0,0);
    f_walk.addRepeatingFrame(player,0,"",folder + "/walk-2.png",4,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,walkSpeed,0,0,0,10);
    f_walk.addRepeatingFrame(player,0,"",folder + "/walk-3.png",4,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,walkSpeed,0,0,0,9);
    f_walk.addRepeatingFrame(player,0,"",folder + "/walk-2.png",4,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,walkSpeed,0,0,0,9);
    f_walk.addRepeatingFrame(player,0,"",folder + "/walk-1.png",4,{Plyer:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,walkSpeed,0,0,0,0);

    var backpeddleSpeed = -4;
    var b_walk = player.addAnimation(POSE_FLAGS.STANDING,"b-walk",0,[BUTTONS.BACK],80,false);
    b_walk.ButtonSequence.push([{Button:BUTTONS.FORWARD,State:BUTTON_STATE.NONE},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    b_walk.ButtonCount = 1;
    b_walk.AdjustShadowPosition = (false);
    b_walk.Flags = ({Player:PLAYER_FLAGS.LOOP_IF_KEYDOWN | PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.WALKING_BACKWARD});
    b_walk.addRepeatingFrame(player,0,"",folder + "/walk-0.png",3,{Player:PLAYER_FLAGS.MOBILE},MISC_FLAGS.NONE,backpeddleSpeed,0,0,0,-6);
    b_walk.addRepeatingFrame(player,0,"",folder + "/walk-0.png",4,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,backpeddleSpeed,0,0,0,0);
    b_walk.addRepeatingFrame(player,0,"",folder + "/walk-1.png",4,{Plyer:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,backpeddleSpeed,0,0,0,0);
    b_walk.addRepeatingFrame(player,0,"",folder + "/walk-2.png",4,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,backpeddleSpeed,0,0,0,10);
    b_walk.addRepeatingFrame(player,0,"",folder + "/walk-3.png",4,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,backpeddleSpeed,0,0,0,9);
    b_walk.addRepeatingFrame(player,0,"",folder + "/walk-2.png",4,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,backpeddleSpeed,0,0,0,9);
    b_walk.addRepeatingFrame(player,0,"",folder + "/walk-1.png",4,{Plyer:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,backpeddleSpeed,0,0,0,0);



    var jumpX = 28;
    var jumpY = 210;

    var jump = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"jump",0,[BUTTONS.JUMP],95,false);
    jump.ButtonSequence.push([{Button:BUTTONS.JUMP,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.NONE}]);
    jump.ButtonCount = 1;
    jump.UseJumpSpeed = true;
    jump.Vy = (jumpY);

    jump.addRepeatingFrame(player,0,"",folder + "/crouch-0.png",4);
    jump.addRepeatingFrame(player,0,"",folder + "/jump-0.png",5,{ Pose: POSE_FLAGS.AIRBORNE }).clip({Bottom:180});;
    jump.addRepeatingFrame(player,0,"",folder + "/jump-1.png",3).clip({Bottom:100});
    jump.addRepeatingFrame(player,0,"",folder + "/jump-2.png",4).clip({Bottom:80});
    jump.addRepeatingFrame(player,0,"",folder + "/jump-3.png",6);
    jump.addRepeatingFrame(player,0,"",folder + "/jump-2.png",3);
    jump.addRepeatingFrame(player,0,"",folder + "/jump-1.png",6);
    jump.addRepeatingFrame(player,0,"",folder + "/jump-0.png",CONSTANTS.FRAME_MAX);
    jump.chain(jump_land);

    var airKnockBackX = 1;

    var f_jump = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"forward jump",0,[BUTTONS.FORWARD|BUTTONS.JUMP],95,false);
    f_jump.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE},{Button:BUTTONS.JUMP,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED}]);
    f_jump.ButtonCount = 2;
    f_jump.AdjustShadowPosition = (false);
    f_jump.UseJumpSpeed = true;
    f_jump.Vx = (jumpX);
    f_jump.Vy = (jumpY);

    f_jump.addRepeatingFrame(player,0,"",folder + "/crouch-0.png",4);
    f_jump.addRepeatingFrame(player,0,"",folder + "/jump-0.png",5,{ Pose: POSE_FLAGS.AIRBORNE_FB }).clip({Bottom:180});;
    f_jump.addRepeatingFrame(player,0,"",folder + "/jump-1.png",3).clip({Bottom:100});
    f_jump.addRepeatingFrame(player,0,"",folder + "/jump-2.png",4).clip({Bottom:80});
    f_jump.addRepeatingFrame(player,0,"",folder + "/jump-3.png",6);
    f_jump.addRepeatingFrame(player,0,"",folder + "/jump-2.png",3);
    f_jump.addRepeatingFrame(player,0,"",folder + "/jump-1.png",6);
    f_jump.addRepeatingFrame(player,0,"",folder + "/jump-0.png",CONSTANTS.FRAME_MAX);
    f_jump.chain(jump_land);


    var b_jump = player.addAnimation(POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD,"back jump",0,[BUTTONS.BACK | BUTTONS.JUMP],95,false);
    b_jump.ButtonSequence.push([{Button:BUTTONS.FORWARD,State:BUTTON_STATE.NONE},{Button:BUTTONS.JUMP,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    b_jump.ButtonCount = 2;
    b_jump.AdjustShadowPosition = (false);
    b_jump.UseJumpSpeed = true;
    b_jump.Vx = (-jumpX);
    b_jump.Vy = (jumpY);

    b_jump.addRepeatingFrame(player,0,"",folder + "/crouch-0.png",4);
    b_jump.addRepeatingFrame(player,0,"",folder + "/jump-0.png",5,{ Pose: POSE_FLAGS.AIRBORNE_FB }).clip({Bottom:180});;
    b_jump.addRepeatingFrame(player,0,"",folder + "/jump-1.png",3).clip({Bottom:100});
    b_jump.addRepeatingFrame(player,0,"",folder + "/jump-2.png",4).clip({Bottom:80});
    b_jump.addRepeatingFrame(player,0,"",folder + "/jump-3.png",6);
    b_jump.addRepeatingFrame(player,0,"",folder + "/jump-2.png",3);
    b_jump.addRepeatingFrame(player,0,"",folder + "/jump-1.png",6);
    b_jump.addRepeatingFrame(player,0,"",folder + "/jump-0.png",CONSTANTS.FRAME_MAX);
    b_jump.chain(jump_land);

    var airKnockBackX = 1;

    var jump_p1 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump p1",5,[BUTTONS.LIGHT_PUNCH],0,true,true);
    jump_p1.ButtonSequence.push([{Button:[BUTTONS.LIGHT_PUNCH],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_p1.ButtonCount = 1;
    jump_p1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_p1.addFrame(player,0,"",folder + "/jump-p1-0.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    jump_p1.addFrame(player,0,"",folder + "/jump-p1-1.png",12,{SwingSound:SWINGSOUND.LP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.LP},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.LIGHT,[{state:HIT_FLAGS.LOW,x:130,y:175,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:190,y:165,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:250,y:155,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.LIGHT,1,1,10);
    jump_p1.endBlock();
    jump_p1.addFrame(player,0,"",folder + "/jump-p1-0.png",5);
    jump_p1.addFrame(player,0,"",folder + "/jump-1.png",4);
    jump_p1.addFrame(player,0,"",folder + "/jump-0.png",CONSTANTS.MAX_FRAME);
    jump_p1.chain(jump_land);

    var jump_p2 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump p2",5,[BUTTONS.MEDIUM_PUNCH],0,true,true);
    jump_p2.ButtonSequence.push([{Button:[BUTTONS.MEDIUM_PUNCH],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_p2.ButtonCount = 1;
    jump_p2.setMediumAttack();
    jump_p2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_p2.addFrame(player,0,"",folder + "/jump-p1-0.png",3,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    jump_p2.addFrame(player,0,"",folder + "/jump-p2-0.png",12,{SwingSound:SWINGSOUND.MP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP},MISC_FLAGS.NONE,0,0,0,15,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:160,y:205,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:210,y:205,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:200,y:285,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.MEDIUM,1,1,15);
    jump_p2.endBlock();
    jump_p2.addFrame(player,0,"",folder + "/jump-p1-0.png",5);
    jump_p2.addFrame(player,0,"",folder + "/jump-1.png",4);
    jump_p2.addFrame(player,0,"",folder + "/jump-0.png",CONSTANTS.MAX_FRAME);
    jump_p2.chain(jump_land);

    var jump_p3 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump p3",5,[BUTTONS.HARD_PUNCH],0,true,true);
    jump_p3.ButtonSequence.push([{Button:[BUTTONS.HARD_PUNCH],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_p3.ButtonCount = 1;
    jump_p3.setHardAttack();
    jump_p3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_p3.addFrame(player,0,"",folder + "/jump-p1-0.png",3,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    jump_p3.addFrame(player,0,"",folder + "/jump-p3-0.png",3);
    jump_p3.addFrame(player,0,"",folder + "/jump-p3-1.png",12,{SwingSound:SWINGSOUND.HP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:160,y:235,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:220,y:235,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:290,y:235,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.HARD,1,1,20);
    jump_p3.endBlock();
    jump_p3.addFrame(player,0,"",folder + "/jump-1.png",4);
    jump_p3.addFrame(player,0,"",folder + "/jump-0.png",CONSTANTS.MAX_FRAME);
    jump_p3.chain(jump_land);
    
    var jump_k1 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump k1",5,[BUTTONS.LIGHT_KICK],0,true,true);
    jump_k1.ButtonSequence.push([{Button:[BUTTONS.LIGHT_KICK],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_k1.ButtonCount = 1;
    jump_k1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_k1.addFrame(player,0,"",folder + "/crouch-k2-1.png",3,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    jump_k1.addFrame(player,0,"",folder + "/jump-k1-0.png",12,{SwingSound:SWINGSOUND.LP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.LK},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.LIGHT,[{state:HIT_FLAGS.LOW,x:160,y:55,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:90,y:95,Fx : airKnockBackX,Fy : 1},{state:HIT_FLAGS.LOW,x:90,y:15,Fx : airKnockBackX,Fy : 1}],ATTACK_FLAGS.LIGHT,1,1,10);
    jump_k1.endBlock();
    jump_k1.addFrame(player,0,"",folder + "/crouch-k2-1.png",5);
    jump_k1.addFrame(player,0,"",folder + "/jump-1.png",4);
    jump_k1.addFrame(player,0,"",folder + "/jump-0.png",CONSTANTS.MAX_FRAME);
    jump_k1.chain(jump_land);
    
    var jump_k2 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump k2",5,[BUTTONS.MEDIUM_KICK],0,true,true);
    jump_k2.ButtonSequence.push([{Button:[BUTTONS.MEDIUM_KICK],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_k2.ButtonCount = 1;
    jump_k2.setMediumAttack();
    jump_k2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_k2.addFrame(player,0,"",folder + "/jump-k2-0.png",5,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    jump_k2.addFrame(player,0,"",folder + "/jump-k2-1.png",9,{SwingSound:SWINGSOUND.MP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MK},MISC_FLAGS.NONE,0,0,0,10,null,-50,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:140,y:50,Fx:airKnockBackX,Fy:1},{state:HIT_FLAGS.LOW,x:190,y:50,Fx:airKnockBackX,Fy:1},{state:HIT_FLAGS.LOW,x:290,y:50,Fx:airKnockBackX,Fy:1}],ATTACK_FLAGS.MEDIUM,1,1,15);
    jump_k2.endBlock();
    jump_k2.addFrame(player,0,"",folder + "/jump-1.png",4);
    jump_k2.addFrame(player,0,"",folder + "/jump-0.png",CONSTANTS.MAX_FRAME);
    jump_k2.chain(jump_land);
    
    var jump_k3 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump k3",5,[BUTTONS.HARD_KICK],0,true,true);
    jump_k3.ButtonSequence.push([{Button:[BUTTONS.HARD_KICK],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_k3.ButtonCount = 1;
    jump_k3.setHardAttack();
    jump_k3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_k3.addFrame(player,0,"",folder + "/crouch-k2-1.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,0,10,0);
    jump_k3.addFrame(player,0,"",folder + "/crouch-k2-3.png",6,{SwingSound:SWINGSOUND.HP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,10,null,-20,-5,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.HARD,[{ state: HIT_FLAGS.LOW,x:110,y:85,Fx:airKnockBackX,Fy:1},{ state: HIT_FLAGS.LOW,x:195,y:50,Fx:airKnockBackX,Fy:1},{ state: HIT_FLAGS.LOW,x:270,y:1,Fx:airKnockBackX,Fy:1}],ATTACK_FLAGS.HARD,1,1,20);
    jump_k3.endBlock();
    jump_k3.addFrame(player,0,"",folder + "/crouch-k2-2.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,10,-35);
    jump_k3.addFrame(player,0,"",folder + "/crouch-k2-1.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,10,0);
    jump_k3.addFrame(player,0,"",folder + "/jump-1.png",4);
    jump_k3.addFrame(player,0,"",folder + "/jump-0.png",CONSTANTS.MAX_FRAME);
    jump_k3.chain(jump_land);

    var xSpeed = 0;
    for(var x = 0; x < 3; ++x)
    {
        if(x == 0) xSpeed = 8;
        else if(x == 1) xSpeed = 11;
        else if(x == 2) xSpeed = 15;

        var projectile = player.addProjectile("high projectile p" + (x+1),240,230,xSpeed);
        projectile.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.ALL,OVERRIDE_FLAGS.PROJECTILE);

        projectile.HitSound = HITSOUND.HP3;

        projectile.Fx = 1;
        projectile.Fy = 1;


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

        projectile.BaseDamage = 25;

        /*this formula is applied each frame to compute the X coordinate of the projectile*/
        projectile.Animation.vxFn = (function(args) { return function(xSpeed,t) { return xSpeed; } });
        /*this formula is applied each frame to compute the Y coordinate of the projectile*/
        projectile.Animation.vyFn = (function(args) { return function(ySpeed,t) { return ySpeed; } });

        projectile.Animation.addFrame(player,0,"",folder + "/projectile-0.png",1,0,0,0).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",1,0,0,10).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-2.png",1,0,0,-3).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,10).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-3.png",1,0,0,-7).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,10).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-4.png",1,0,0,-9).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,10).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-5.png",1,0,0,-12).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,10).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-6.png",1,0,0,-1).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,10).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-7.png",1,0,0,3).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,10).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-8.png",1,0,0,0).clip({Front:70,Back:70});

        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-0.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-1.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-2.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-3.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-4.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-5.png",3,0,0,0);

        
        var button = BUTTONS.LIGHT_PUNCH;
        if(x == 1) {button = BUTTONS.MEDIUM_PUNCH;}
        else if(x == 2) {button = BUTTONS.HARD_PUNCH;}

        var fireball = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"fireball p" + (x+1),25,[BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.FORWARD,BUTTONS.FORWARD,BUTTONS.FORWARD|button],0,true);
        fireball.IsProjectile = true;
        fireball.ProjectileId = player.Projectiles.length-1;
        fireball.ButtonCount = 5;
        fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED}]);
        fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED},{Button:button,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);

        fireball.OverrideFlags = new MoveOverrideFlags();
        fireball.IsSpecialMove = true;
        fireball.EnergyToAdd = 5;
        fireball.Flags = ({Combat:COMBAT_FLAGS.PROJECTILE_ACTIVE|COMBAT_FLAGS.MULTI_PROJECTILE});
        fireball.addFrame(player,0,"",folder + "/fireball-0.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},{Player:PLAYER_FLAGS.MOBILE});
        fireball.addFrame(player,0,"",folder + "/fireball-1.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrame(player,0,"200",folder + "/fireball-1.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrame(player,0,"200",folder + "/fireball-2.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrame(player,0,"200",folder + "/fireball-3.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrame(player,0,"200",folder + "/fireball-4.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrame(player,0,"200",folder + "/fireball-5.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrame(player,0,"200",folder + "/fireball-6.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrame(player,0,"264",folder + "/fireball-7.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK}).clip({Front:100});
        fireball.addFrame(player,0,"264",folder + "/fireball-8.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK}).clip({Front:100});
        fireball.addFrameWithSound(player,1,"audio/sagat/tiger-high.zzz",0,"264",folder + "/fireball-9.png",1,{Combat:COMBAT_FLAGS.PENDING_ATTACK|COMBAT_FLAGS.SPAWN_PROJECTILE|COMBAT_FLAGS.PROJECTILE_ACTIVE|COMBAT_FLAGS.STOP_SLIDE_BACK},0,0,0,0,0,player.Projectiles.length-1).clip({Front:100});
        fireball.addFrameWithSound(player,1,"audio/misc/projectile-0.zzz",0,"264",folder + "/fireball-8.png",26,MISC_FLAGS.NONE,{Combat:COMBAT_FLAGS.CAN_BE_BLOCKED}).clip({Front:100});
    }


    var xSpeed = 0;
    for(var x = 0; x < 3; ++x)
    {
        if(x == 0) xSpeed = 8;
        else if(x == 1) xSpeed = 11;
        else if(x == 2) xSpeed = 15;

        var projectile = player.addProjectile("low projectile p" + (x+1),260,130,xSpeed);
        projectile.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.ALL,OVERRIDE_FLAGS.PROJECTILE);

        projectile.HitSound = HITSOUND.HP3;

        projectile.Fx = 1;
        projectile.Fy = 1;


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

        projectile.BaseDamage = 25;

        /*this formula is applied each frame to compute the X coordinate of the projectile*/
        projectile.Animation.vxFn = (function(args) { return function(xSpeed,t) { return xSpeed; } });
        /*this formula is applied each frame to compute the Y coordinate of the projectile*/
        projectile.Animation.vyFn = (function(args) { return function(ySpeed,t) { return ySpeed; } });

        projectile.Animation.addFrame(player,0,"",folder + "/projectile-0.png",1,0,0,0).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",1,0,0,10).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-2.png",1,0,0,-3).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,10).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-3.png",1,0,0,-7).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,10).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-4.png",1,0,0,-9).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,10).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-5.png",1,0,0,-12).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,10).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-6.png",1,0,0,-1).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,10).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-7.png",1,0,0,3).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-1.png",2,0,0,10).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-8.png",1,0,0,0).clip({Front:70,Back:70});

        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-0.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-1.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-2.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-3.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-4.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-5.png",3,0,0,0);

        
        var button = BUTTONS.LIGHT_KICK;
        if(x == 1) {button = BUTTONS.MEDIUM_KICK;}
        else if(x == 2) {button = BUTTONS.HARD_KICK;}

        var fireball = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"fireball p" + (x+1),25,[BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.FORWARD,BUTTONS.FORWARD,BUTTONS.FORWARD|button],0,true);
        fireball.IsProjectile = true;
        fireball.ProjectileId = player.Projectiles.length-1;
        fireball.ButtonCount = 5;
        fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED}]);
        fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED},{Button:button,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);

        fireball.OverrideFlags = new MoveOverrideFlags();
        fireball.IsSpecialMove = true;
        fireball.EnergyToAdd = 5;
        fireball.Flags = ({Combat:COMBAT_FLAGS.PROJECTILE_ACTIVE|COMBAT_FLAGS.MULTI_PROJECTILE});
        fireball.addFrame(player,0,"",folder + "/cfireball-0.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},{Player:PLAYER_FLAGS.MOBILE});
        fireball.addFrame(player,0,"",folder + "/cfireball-1.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrame(player,0,"200",folder + "/cfireball-1.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrame(player,0,"200",folder + "/cfireball-2.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrame(player,0,"200",folder + "/cfireball-3.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrame(player,0,"200",folder + "/cfireball-4.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrame(player,0,"200",folder + "/cfireball-5.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrame(player,0,"200",folder + "/cfireball-6.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,0,20).clip({Front:100});
        fireball.addFrame(player,0,"200",folder + "/cfireball-7.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,0,20).clip({Front:100});
        fireball.addFrame(player,0,"200",folder + "/cfireball-7.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,0,0,0,0,20).clip({Front:100});
        fireball.addFrameWithSound(player,1,"audio/sagat/tiger-high.zzz",0,"200",folder + "/cfireball-7.png",1,{Combat:COMBAT_FLAGS.PENDING_ATTACK|COMBAT_FLAGS.SPAWN_PROJECTILE|COMBAT_FLAGS.PROJECTILE_ACTIVE|COMBAT_FLAGS.STOP_SLIDE_BACK},MISC_FLAGS.NONE,0,0,0,0,player.Projectiles.length-1,20).clip({Front:100});
        fireball.addFrameWithSound(player,1,"audio/misc/projectile-0.zzz",0,"200",folder + "/cfireball-7.png",26,MISC_FLAGS.NONE,{Combat:COMBAT_FLAGS.CAN_BE_BLOCKED},MISC_FLAGS.NONE,0,0,0,0,20).clip({Front:100});
    }

    //tiger knee
    for(var x = 0; x < 3; ++x)
    {
        var button = BUTTONS.LIGHT_KICK;
        var hit2Damage = 35;
        if(x == 1) {button = BUTTONS.MEDIUM_KICK; hit2Damage = 50;}
        else if(x == 2) {button = BUTTONS.HARD_KICK; hit2Damage = 75;}

        var tigerCrush = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"tiger crush p" + (x+1),25,[BUTTONS.FORWARD,0,BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.FORWARD,BUTTONS.CROUCH|BUTTONS.FORWARD|button],999,true,true);
        tigerCrush.ButtonCount = 5;
        tigerCrush.ButtonSequence.push([{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED}]);
        tigerCrush.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.NONE}]);
        tigerCrush.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        tigerCrush.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED},{Button:button,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        tigerCrush.IsSpecialMove = true;

        tigerCrush.EnergyToAdd = 5;
        tigerCrush.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.NONE,OVERRIDE_FLAGS.AIRBORNE|OVERRIDE_FLAGS.THROW);

        //the following function will be executed each frame to compute the X coordinate of this move
        tigerCrush.vxFn = (function(args)
        {
            var count = 0;
            return function(dx,t)
            {
                count += 1;
                if(count > args.MaxCount)
                {
                    dx = 0.5;
                }
                else
                {
                }

                return dx;
            }
        });

        //the following function will be executed each frame to compute the X coordinate of this move
        tigerCrush.vyFn = (function(args)
        {
            var count = 0;
            var val = 7;
            return function(dy,t)
            {
                count += 1;
                if(count > args.MaxCount)
                {
                    dy = Math.min(0, dy);
                }
                else
                {
                }

                return dy*args.yFactor;
            }
        });

        if(x == 0)
        {
            tigerCrush.Vy = 100;
            tigerCrush.Vx = 100;
            //the following object will be passed in to the function that will be used to compute the X coordinate
            tigerCrush.VxFnArgs = {MaxCount:7,yFactor:1.2};
            tigerCrush.VyFnArgs = {MaxCount:7,yFactor:1.2};
        }
        else if(x == 1)
        {
            tigerCrush.Vy = 115;
            tigerCrush.Vx = 115;
            //the following object will be passed in to the function that will be used to compute the X coordinate
            tigerCrush.VxFnArgs = {MaxCount:7,yFactor:1.6};
            tigerCrush.VyFnArgs = {MaxCount:7,yFactor:1.6};
        }
        else if(x == 2)
        {
            tigerCrush.Vy = 130;
            tigerCrush.Vx = 160;
            //the following object will be passed in to the function that will be used to compute the X coordinate
            tigerCrush.VxFnArgs = {MaxCount:7,yFactor:2};
            tigerCrush.VyFnArgs = {MaxCount:7,yFactor:2};
        }

        tigerCrush.addFrameWithSound(player,1,"audio/sagat/tiger-crush.zzz",0,"",folder + "/tigercrush-0.png",1,{Combat:COMBAT_FLAGS.CAN_BE_BLOCKED|COMBAT_FLAGS.STOP_SLIDE_BACK,HitSound:HITSOUND.HP3},{Player:PLAYER_FLAGS.MOBILE});
        tigerCrush.addFrameWithSound(player,1,"audio/sagat/tiger-u.zzz",0,"",folder + "/tigercrush-0.png",1,{Combat:COMBAT_FLAGS.CAN_BE_BLOCKED|COMBAT_FLAGS.STOP_SLIDE_BACK,HitSound:HITSOUND.HP3},{Player:PLAYER_FLAGS.MOBILE});
        tigerCrush.addFrame(player,0,"",folder + "/tigercrush-0.png",3,{Combat:COMBAT_FLAGS.ATTACK|COMBAT_FLAGS.STOP_SLIDE_BACK,HitSound:HITSOUND.HK},{Player:PLAYER_FLAGS.MOBILE},0,0,0,35,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.FLOOR_AIRBORNE,[{state:HIT_FLAGS.LOW,x:180,y:97},{state:HIT_FLAGS.LOW,x:130,y:117},{state:HIT_FLAGS.LOW,x:100,y:137}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,25);
        tigerCrush.addFrame(player,0,"",folder + "/tigercrush-1.png",2,{Combat:COMBAT_FLAGS.ATTACK|COMBAT_FLAGS.STOP_SLIDE_BACK,HitSound:HITSOUND.HK,Pose:POSE_FLAGS.AIRBORNE},MISC_FLAGS.NONE,0,0,0,35,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.FLOOR_AIRBORNE,[{state:HIT_FLAGS.LOW,x:210,y:117},{state:HIT_FLAGS.LOW,x:210,y:177},{state:HIT_FLAGS.LOW,x:150,y:197}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,25);
        tigerCrush.addFrame(player,0,"",folder + "/tigercrush-2.png",2,{RCombat:RCOMBAT_FLAGS.IGNORE_CLEAR_DIZZY,Combat:COMBAT_FLAGS.ATTACK|COMBAT_FLAGS.STOP_SLIDE_BACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,hit2Damage,null,0,100,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.LOW,x:190,y:167,Fx:2.0},{state:HIT_FLAGS.LOW,x:210,y:177,Fx:3.0},{state:HIT_FLAGS.LOW,x:210,y:237,Fx:3.0},{state:HIT_FLAGS.LOW,x:150,y:257,Fx:3.0}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,CONSTANTS.SECOND_HIT,CONSTANTS.SINGLE,25).set({DizzyFactor:7});
        tigerCrush.addFrame(player,0,"",folder + "/tigercrush-2.png",3,{RCombat:RCOMBAT_FLAGS.IGNORE_CLEAR_DIZZY,Combat:COMBAT_FLAGS.ATTACK|COMBAT_FLAGS.STOP_SLIDE_BACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,hit2Damage,null,0,100,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.LOW,x:190,y:167,Fx:2.0},{state:HIT_FLAGS.LOW,x:210,y:177,Fx:3.0},{state:HIT_FLAGS.LOW,x:210,y:237,Fx:3.0},{state:HIT_FLAGS.LOW,x:150,y:257,Fx:3.0}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,CONSTANTS.SECOND_HIT,CONSTANTS.SINGLE,25).set({DizzyFactor:7});
                                                                                                                                                                                                                                                                                                                            
        tigerCrush.endBlock();
        tigerCrush.addFrame(player,0,"",folder + "/jump-2.png",4,{Player: PLAYER_FLAGS.IGNORE_MOVE_OVERRIDE},{Combat:COMBAT_FLAGS.CAN_BE_AIR_BLOCKED},0,0,0,0,0,0,50);
        tigerCrush.addFrame(player,0,"",folder + "/jump-1.png",4,{Player: PLAYER_FLAGS.IGNORE_MOVE_OVERRIDE},MISC_FLAGS.NONE,0,0,0,0,0,0,0);
        tigerCrush.addFrame(player,0,"",folder + "/jump-0.png",CONSTANTS.FRAME_MAX,{Player: PLAYER_FLAGS.IGNORE_MOVE_OVERRIDE},MISC_FLAGS.NONE);
        tigerCrush.chain(jump_land);
    }

    //tiger uppercut
    var uppercut_land = player.addAnimation(MISC_FLAGS.NONE,"uppercut landing",200,["uppercut-landing"],0,false,false);
    uppercut_land.addFrameWithSound(player,1,"audio/misc/jump-land.zzz",0,"",folder + "/uppercut-5.png",4,{Player:PLAYER_FLAGS.MOBILE},MISC_FLAGS.NONE);
    uppercut_land.chain(crouch);
    for(var x = 0; x < 3; ++x)
    {
        var button = BUTTONS.LIGHT_PUNCH;
        if(x == 1) {button = BUTTONS.MEDIUM_PUNCH;}
        else if(x == 2) {button = BUTTONS.HARD_PUNCH;}

        var uppercut = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"uppercut p" + (x+1),25,[BUTTONS.FORWARD,0,BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.FORWARD,BUTTONS.CROUCH|BUTTONS.FORWARD|button],999,true,true);
        uppercut.Flags = ({Combat:COMBAT_FLAGS.NO_SLIDE_BACK});
        uppercut.ButtonCount = 5;
        uppercut.ButtonSequence.push([{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED}]);
        uppercut.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.NONE}]);
        uppercut.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        uppercut.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED},{Button:button,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        uppercut.IsSpecialMove = true;
        uppercut.HitJuggleGroup = JUGGLE_GROUP.UPPERCUT;

        uppercut.EnergyToAdd = (5);
        uppercut.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.NONE,OVERRIDE_FLAGS.AIRBORNE|OVERRIDE_FLAGS.THROW);

        //the following function will be executed each frame to compute the X coordinate of this move
        uppercut.vxFn = (function(args)
        {
            var count = 0;
            return function(dx,t)
            {
                dx = Math.min(args.xMax/(count+=(args.xInc)),args.valueMax);
                if(dx <= args.xMin) dx = 0;

                return dx;
            }
        });

        if(x == 0)
        {
            uppercut.Vy = (160);
            //the following object will be passed in to the function that will be used to compute the X coordinate
            uppercut.VxFnArgs = {xMax:30,xMin:3,xInc:1.8,valueMax:10};
        }
        else if(x == 1)
        {
            uppercut.Vy = (190);
            //the following object will be passed in to the function that will be used to compute the X coordinate
            uppercut.VxFnArgs = {xMax:40,xMin:3,xInc:1.8,valueMax:10};
        }
        else if(x == 2)
        {
            uppercut.Vy = (220);
            //the following object will be passed in to the function that will be used to compute the X coordinate
            uppercut.VxFnArgs = {xMax:70,xMin:3,xInc:1.8,valueMax:10};
        }

        uppercut.addFrameWithSound(player,1,"audio/sagat/tiger-uppercut.zzz",0,"",folder + "/uppercut-0.png",1,{Combat:COMBAT_FLAGS.CAN_BE_BLOCKED|COMBAT_FLAGS.STOP_SLIDE_BACK,HitSound:HITSOUND.HP3},{Player:PLAYER_FLAGS.MOBILE});
        if(x == 0)
        {
            uppercut.addFrame(player,0,"",folder + "/uppercut-0.png",2,{Combat:COMBAT_FLAGS.ATTACK|COMBAT_FLAGS.STOP_SLIDE_BACK,HitSound:HITSOUND.HP3},{Player:PLAYER_FLAGS.MOBILE},0,0,0,75,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.LOW,x:180,y:97}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,25);
            uppercut.addFrame(player,0,"",folder + "/uppercut-1.png",3,{Combat:COMBAT_FLAGS.ATTACK|COMBAT_FLAGS.STOP_SLIDE_BACK,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,75,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.LOW,x:210,y:177},{state:HIT_FLAGS.LOW,x:210,y:237},{state:HIT_FLAGS.LOW,x:150,y:257}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,25);
            uppercut.addFrameWithSound(player,1,"audio/sagat/tiger-u.zzz",0,"",folder + "/uppercut-2.png",10,{Juggle:JUGGLE_FLAGS.ALIVE|JUGGLE_FLAGS.DEAD,Pose:POSE_FLAGS.AIRBORNE,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,75,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.HIGH,x:60,y:412,Fy:1.5},{state:HIT_FLAGS.HIGH,x:120,y:322,Fy:1.5},{state:HIT_FLAGS.HIGH,x:140,y:227,Fy:1.5},{state:HIT_FLAGS.HIGH,x:130,y:127,Fy:1.5}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,25).set({HitStop:3});
        }
        else if(x == 1)
        {
            uppercut.addFrame(player,0,"",folder + "/uppercut-0.png",2,{Combat:COMBAT_FLAGS.ATTACK|COMBAT_FLAGS.STOP_SLIDE_BACK,HitSound:HITSOUND.HP3},{Player:PLAYER_FLAGS.MOBILE},0,0,0,50,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:180,y:97}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,25);
            uppercut.addFrame(player,0,"",folder + "/uppercut-1.png",3,{Combat:COMBAT_FLAGS.ATTACK|COMBAT_FLAGS.STOP_SLIDE_BACK,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,50,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.LOW,x:210,y:177},{state:HIT_FLAGS.LOW,x:210,y:237},{state:HIT_FLAGS.LOW,x:150,y:257}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,CONSTANTS.SECOND_HIT,CONSTANTS.SINGLE,25);
            uppercut.addFrameWithSound(player,1,"audio/sagat/tiger-u.zzz",0,"",folder + "/uppercut-2.png",15,{Juggle:JUGGLE_FLAGS.ALIVE|JUGGLE_FLAGS.DEAD,Pose:POSE_FLAGS.AIRBORNE,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,50,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.HIGH,x:60,y:412,Fy:1.5},{state:HIT_FLAGS.HIGH,x:120,y:322,Fy:1.5},{state:HIT_FLAGS.HIGH,x:140,y:227,Fy:1.5},{state:HIT_FLAGS.HIGH,x:130,y:127,Fy:1.5}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,3,CONSTANTS.SINGLE,25).set({HitStop:3});
        }
        else if(x == 2)
        {
            uppercut.addFrame(player,0,"",folder + "/uppercut-0.png",2,{Combat:COMBAT_FLAGS.ATTACK|COMBAT_FLAGS.STOP_SLIDE_BACK,HitSound:HITSOUND.HP3},{Player:PLAYER_FLAGS.MOBILE},0,0,0,20,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:180,y:97}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,25);
            uppercut.addFrame(player,0,"",folder + "/uppercut-1.png",3,{Combat:COMBAT_FLAGS.ATTACK|COMBAT_FLAGS.STOP_SLIDE_BACK,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,20,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.LOW,x:210,y:177},{state:HIT_FLAGS.LOW,x:210,y:237},{state:HIT_FLAGS.LOW,x:150,y:257}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,CONSTANTS.SECOND_HIT,CONSTANTS.SINGLE,25).set({HitStop:15});
            uppercut.addFrameWithSound(player,1,"audio/sagat/tiger-u.zzz",0,"",folder + "/uppercut-2.png",2,{Juggle:JUGGLE_FLAGS.ALIVE|JUGGLE_FLAGS.DEAD,Pose:POSE_FLAGS.AIRBORNE,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,20,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.HIGH,x:130,y:127},{state:HIT_FLAGS.HIGH,x:140,y:227},{state:HIT_FLAGS.HIGH,x:120,y:322},{state:HIT_FLAGS.HIGH,x:60,y:412}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,3,CONSTANTS.SINGLE,25).set({HitStop:2});
            uppercut.addFrame(player,0,"",folder + "/uppercut-2.png",2,{Juggle:JUGGLE_FLAGS.ALIVE|JUGGLE_FLAGS.DEAD,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,20,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.HIGH,x:60,y:412,Fy:1.5},{state:HIT_FLAGS.HIGH,x:120,y:322,Fy:1.5},{state:HIT_FLAGS.HIGH,x:140,y:227,Fy:1.5},{state:HIT_FLAGS.HIGH,x:130,y:127,Fy:1.5}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,4,CONSTANTS.SINGLE,25).set({HitStop:2});
            uppercut.addFrame(player,0,"",folder + "/uppercut-2.png",2,{Juggle:JUGGLE_FLAGS.ALIVE|JUGGLE_FLAGS.DEAD,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,20,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.HIGH,x:60,y:412,Fy:1.5},{state:HIT_FLAGS.HIGH,x:120,y:322,Fy:1.5},{state:HIT_FLAGS.HIGH,x:140,y:227,Fy:1.5},{state:HIT_FLAGS.HIGH,x:130,y:127,Fy:1.5}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,5,CONSTANTS.SINGLE,25).set({HitStop:2});
            uppercut.addFrame(player,0,"",folder + "/uppercut-2.png",2,{Juggle:JUGGLE_FLAGS.ALIVE|JUGGLE_FLAGS.DEAD,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,20,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.HIGH,x:60,y:412,Fy:1.5},{state:HIT_FLAGS.HIGH,x:120,y:322,Fy:1.5},{state:HIT_FLAGS.HIGH,x:140,y:227,Fy:1.5},{state:HIT_FLAGS.HIGH,x:130,y:127,Fy:1.5}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,6,CONSTANTS.SINGLE,25).set({HitStop:2});
            uppercut.addFrame(player,0,"",folder + "/uppercut-2.png",5,{Juggle:JUGGLE_FLAGS.ALIVE|JUGGLE_FLAGS.DEAD,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,20,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.HIGH,x:60,y:412,Fy:1.5},{state:HIT_FLAGS.HIGH,x:120,y:322,Fy:1.5},{state:HIT_FLAGS.HIGH,x:140,y:227,Fy:1.5},{state:HIT_FLAGS.HIGH,x:130,y:127,Fy:1.5}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,7,CONSTANTS.SINGLE,25).set({HitStop:2});
        }
        uppercut.endBlock();
        uppercut.addFrame(player,0,"",folder + "/uppercut-3.png",5,{Player: PLAYER_FLAGS.IGNORE_MOVE_OVERRIDE},{Combat:COMBAT_FLAGS.CAN_BE_AIR_BLOCKED});
        uppercut.addFrame(player,0,"",folder + "/uppercut-4.png",CONSTANTS.FRAME_MAX,{Player: PLAYER_FLAGS.IGNORE_MOVE_OVERRIDE},MISC_FLAGS.NONE);
        uppercut.chain(uppercut_land);
    }

    createSagatSuperMoves(player);
    player.sortAnimations();
    return player;
}


var createSagatSuperMoves = function(player)
{
    var folder = "images/misc/" + player.Folder;

    var speed = 13;
    for(var x = 0; x < 3; ++x)
    {
        var projectile = player.addProjectile("super projectile p" + (x+1),240,230,speed);
        projectile.HitSound = HITSOUND.HP;

        projectile.IsSuperMove = true;
        projectile.CanJuggle = true;
        projectile.MaxHits = x + 4;
        projectile.LocalHitStopData = {};
        projectile.DefaultLocalHitStop = 2;
        projectile.DefaultHitStop = 1;
        projectile.AttackState = ATTACK_FLAGS.HARD|ATTACK_FLAGS.FLOOR_AIRBORNE_HARD;
        projectile.HitState = HIT_FLAGS.LOW;
        projectile.FlagsToSend = ATTACK_FLAGS.HARD;
        projectile.EnergyToAdd = (10);
        projectile.Params = {EnemyHitStop:1,AirborneEnemyHitStop:10};

        if(x == 0)
            projectile.FlagsToSend |= ATTACK_FLAGS.SUPER|ATTACK_FLAGS.PROJECTILE;
        else if(x == 1)
            projectile.FlagsToSend |= ATTACK_FLAGS.SUPER|ATTACK_FLAGS.PROJECTILE;
        else if(x == 2)
        {
            projectile.FlagsToSend |= ATTACK_FLAGS.SUPER|ATTACK_FLAGS.PROJECTILE;
            projectile.Params.Combo = COMBO_FLAGS.RED_FIRE_ON_MAX_HIT;
        }
        projectile.BaseDamage = 25;

        /*this formula is applied each frame to compute the X coordinate of the projectile*/
        projectile.Animation.vxFn = (function(args) { return function(xSpeed,t) { return xSpeed; } });
        /*this formula is applied each frame to compute the Y coordinate of the projectile*/
        projectile.Animation.vyFn = (function(args) { return function(ySpeed,t) { return ySpeed; } });

        projectile.Animation.addFrame(player,0,"",folder + "/projectile-0.png",1,0,0,0).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/sprojectile-0.png",1,0,0,-49).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-2.png",1,0,0,-3).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/sprojectile-1.png",2,0,0,-66).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-3.png",1,0,0,-7).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/sprojectile-2.png",2,0,0,-58).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/projectile-4.png",1,0,0,-9).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/sprojectile-3.png",2,0,0,-66).clip({Front:70,Back:70});

        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-0.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-1.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-2.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-3.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-4.png",3,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/projectile-d-5.png",3,0,0,0);

        
        var button = BUTTONS.LIGHT_PUNCH;
        if(x == 1) {button = BUTTONS.MEDIUM_PUNCH;}
        else if(x == 2) {button = BUTTONS.HARD_PUNCH;}

        var s_fireball = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"super fireball p" + (x+1),50,[BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.FORWARD,BUTTONS.FORWARD,0,BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.FORWARD,BUTTONS.FORWARD,BUTTONS.FORWARD|button],CONSTANTS.MAX_PRIORITY,true);
        s_fireball.ButtonCount = 10;
        s_fireball.IsProjectile = true;
        s_fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED}]);
        s_fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        s_fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        s_fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED}]);
        s_fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        s_fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED},{Button:button,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);

        s_fireball.IsSuperMove = true;
        s_fireball.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.NONE,OVERRIDE_FLAGS.NONE);


        s_fireball.EnergyToSubtract = CONSTANTS.ONE_LEVEL * (x + 1);
        s_fireball.EnergyToAdd = (5);
        s_fireball.Flags = ({Combat:COMBAT_FLAGS.PROJECTILE_ACTIVE});
        /*
        s_fireball.addFrameWithSound(player,1,"audio/ryu/sinku.zzz",0,"",folder + "/x-fb-0.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},{Player:PLAYER_FLAGS.MOBILE},0,0,0,25,0,0,0,null,0,0,0,-CONSTANTS.ONE_LEVEL*(x+1));
        s_fireball.addFrame(player,0,"",folder + "/x-fb-1.png",36,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        s_fireball.addFrame(player,0,"",folder + "/x-fb-2.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},{Combat:COMBAT_FLAGS.SUPER_MOVE_PAUSE});
        s_fireball.addFrameWithSound(player,1,"audio/ryu/haduken.zzz",0,"",folder + "/x-fb-3.png",1,{Combat:COMBAT_FLAGS.PENDING_ATTACK|COMBAT_FLAGS.SPAWN_PROJECTILE|COMBAT_FLAGS.PROJECTILE_ACTIVE},0,0,0,0,0,player.Projectiles.length-1);
        s_fireball.addFrameWithSound(player,1,"audio/misc/super-projectile-0.zzz",0,"",folder + "/x-fb-3.png",31,MISC_FLAGS.NONE,{Combat:COMBAT_FLAGS.CAN_BE_BLOCKED});
        s_fireball.addFrame(player,0,"",folder + "/x-k1-4.png",6);
        */

        s_fireball.addFrame(player,0,"",folder + "/sfireball-0.png",6,{Combat: COMBAT_FLAGS.PENDING_ATTACK},{Player:PLAYER_FLAGS.MOBILE},0,0,0,25,0,0,0,null,0,0,0,-CONSTANTS.ONE_LEVEL*(x+1));
        s_fireball.addFrame(player,0,"200",folder + "/fireball-2.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        s_fireball.addFrame(player,0,"200",folder + "/fireball-3.png",24,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        s_fireball.addFrame(player,0,"200",folder + "/fireball-4.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        s_fireball.addFrame(player,0,"200",folder + "/fireball-5.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        s_fireball.addFrame(player,0,"200",folder + "/fireball-6.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        s_fireball.addFrame(player,0,"264",folder + "/fireball-7.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        s_fireball.addFrame(player,0,"264",folder + "/fireball-8.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},{Combat:COMBAT_FLAGS.SUPER_MOVE_PAUSE});
        s_fireball.addFrameWithSound(player,1,"audio/sagat/tiger-high.zzz",0,"264",folder + "/fireball-8.png",1,{Combat:COMBAT_FLAGS.PENDING_ATTACK|COMBAT_FLAGS.SPAWN_PROJECTILE|COMBAT_FLAGS.PROJECTILE_ACTIVE|COMBAT_FLAGS.STOP_SLIDE_BACK},0,0,0,0,0,player.Projectiles.length-1);
        s_fireball.addFrameWithSound(player,1,"audio/misc/projectile-0.zzz",0,"264",folder + "/fireball-8.png",26,MISC_FLAGS.NONE,{Combat:COMBAT_FLAGS.CAN_BE_BLOCKED});


        /*add an animation for the fireball charge up*/
        /*add the uppercut charge up*/
        var charge_up = new BasicAnimation("uppercut charge up",[],false,0,folder + "/misc-sprites.png");
        charge_up.addFrame(player,folder + "/x-energize-0-0.png",1,-127,64);
        charge_up.addFrame(player,folder + "/x-energize-0-1.png",1,-71,103);
        charge_up.addFrame(player,folder + "/x-energize-0-2.png",1,-118,49);
        charge_up.addFrame(player,folder + "/x-energize-0-3.png",1,-121,43);
        charge_up.addFrame(player,folder + "/x-energize-0-4.png",1,-71,103);
        charge_up.addFrame(player,folder + "/x-energize-0-5.png",1,-80,58);
        charge_up.addFrame(player,folder + "/x-energize-0-6.png",1,-40,43);
        charge_up.addFrame(player,folder + "/x-energize-0-7.png",1,-52,70);
        charge_up.addFrame(player,folder + "/x-energize-0-8.png",1,-70,100);
        charge_up.addFrame(player,folder + "/x-energize-0-9.png",1,-64,103);
        charge_up.addFrame(player,folder + "/x-energize-0-10.png",1,-42,111);
        charge_up.addFrame(player,folder + "/x-energize-0-11.png",1,-30,100);
        charge_up.addFrame(player,folder + "/x-energize-0-12.png",1,-10,100);
        charge_up.addFrame(player,folder + "/x-energize-0-13.png",1,-4,102);
        charge_up.addFrame(player,folder + "/x-energize-0-14.png",1,-14,130);
        charge_up.addFrame(player,folder + "/x-energize-0-15.png",1,-12,135);
        charge_up.addFrame(player,folder + "/x-energize-0-16.png",1,-12,114);
        charge_up.addFrame(player,folder + "/x-energize-0-17.png",1,9,110);
        charge_up.addFrame(player,folder + "/x-energize-0-18.png",1,4,111);
        charge_up.addFrame(player,folder + "/x-energize-0-19.png",1,-12,88);
        charge_up.addFrame(player,folder + "/x-energize-0-20.png",1,-9,80);
        charge_up.addFrame(player,folder + "/x-energize-0-21.png",1,-57,80);
        charge_up.addFrame(player,folder + "/x-energize-0-22.png",1,-16,100);
        charge_up.addFrame(player,folder + "/x-energize-0-23.png",1,-70,98);
        charge_up.addFrame(player,folder + "/x-energize-0-24.png",1,-22,70);
        charge_up.addFrame(player,folder + "/x-energize-0-25.png",1,-54,98);
        charge_up.addFrame(player,folder + "/x-energize-0-26.png",1,-42,100);
        charge_up.addFrame(player,folder + "/x-energize-0-27.png",1,0,79);
        charge_up.addFrame(player,folder + "/x-energize-0-28.png",1,-20,112);
        charge_up.addFrame(player,folder + "/x-energize-0-29.png",1,-12,119);
        charge_up.addFrame(player,folder + "/x-energize-0-30.png",1,-67,109);
        charge_up.addFrame(player,folder + "/x-energize-0-31.png",1,-1,139);
        charge_up.addFrame(player,folder + "/x-energize-0-32.png",1,18,151);
        charge_up.addFrame(player,folder + "/x-energize-0-33.png",1,-57,152);
        charge_up.addFrame(player,folder + "/x-energize-0-34.png",1,24,158);
        charge_up.addFrame(player,folder + "/x-energize-0-35.png",1,20,160);

        s_fireball.addAnimation(charge_up);

        /*add the trail for the super move*/
        
        var trail = CreateAnimationTrail([]);
        for(var trailIndex = 1; trailIndex < 3; ++trailIndex)
        {
            /*trail*/
            var s_fireball_trail = new GenericAnimation("super fireball trail");
            s_fireball_trail.addTrailFrame(player,folder + "/sfireball-trail-" + trailIndex + "-0.png",4);
            s_fireball_trail.addTrailFrame(player,folder + "/sfireball-trail-" + trailIndex + "-0.png",6);
            s_fireball_trail.addTrailFrame(player,folder + "/sfireball-trail-" + trailIndex + "-1.png",6);
            s_fireball_trail.addTrailFrame(player,folder + "/sfireball-trail-" + trailIndex + "-1.png",6);
            s_fireball_trail.addTrailFrame(player,folder + "/sfireball-trail-" + trailIndex + "-1.png",6);
            s_fireball_trail.addTrailFrame(player,folder + "/sfireball-trail-" + trailIndex + "-1.png",6);
            s_fireball_trail.addTrailFrame(player,folder + "/sfireball-trail-" + trailIndex + "-1.png",6);
            s_fireball_trail.addTrailFrame(player,folder + "/sfireball-trail-" + trailIndex + "-2.png",4);
            s_fireball_trail.addTrailFrame(player,folder + "/sfireball-trail-" + trailIndex + "-2.png",4);
            s_fireball_trail.addTrailFrame(player,folder + "/sfireball-trail-" + trailIndex + "-2.png",CONSTANTS.FRAME_MAX);

            trail.add(s_fireball_trail,player.Element,player.Folder,player);
        }
        
        s_fireball.Trail = trail;

    }

}
