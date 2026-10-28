
var createRyu = function(user)
{
    var player = new Player("ryu",101,247,user);
    var folder = "images/misc/" + player.Folder;
    player.DefaultJumpSpeed = 1.2;
    
    player.DefaultShadowImageSrc = "136"
    player.DizzyOffset = {X:-20,Y:190};
    player.Circle.OffsetY = 50;
    player.StandingClip.Top = 50;
    player.StandingClip.Back = 20;


    var stance = player.addAnimation(MISC_FLAGS.NONE,"stance",0,["stance"],0,false);
    stance.Flags = ({Player:PLAYER_FLAGS.ALLOW_CHANGE_DIRECTION | PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.STANDING});
    stance.addFrame(player,0,"",folder + "/x-stance-1.png",4,{Player:PLAYER_FLAGS.MOBILE});
    stance.addFrame(player,0,"",folder + "/x-stance-0.png",4);
    stance.addFrame(player,0,"",folder + "/x-stance-1.png",4);
    stance.addFrame(player,0,"",folder + "/x-stance-2.png",4);
    stance.addFrame(player,0,"",folder + "/x-stance-3.png",4);
    stance.addFrame(player,0,"",folder + "/x-stance-2.png",4);

    var crouch = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD,"crouch",0,[BUTTONS.CROUCH],99,false);
    crouch.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.JUMP,State:BUTTON_STATE.NONE}]);
    crouch.ButtonCount = 1;
    crouch.Flags = ({Player:PLAYER_FLAGS.ALLOW_CHANGE_DIRECTION | PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.CROUCHING});
    crouch.addFrame(player,0,"",folder + "/x-crouch-0.png",2,{Player:PLAYER_FLAGS.MOBILE});
    crouch.addFrame(player,0,"",folder + "/x-crouch-1.png",2,{Player:PLAYER_FLAGS.MUST_HOLD_KEY});
    /*MOBILE is set on the following frame because other moves chain to it*/
    crouch.addFrame(player,0,"",folder + "/x-crouch-2.png",2,{Player:PLAYER_FLAGS.HOLD_FRAME|PLAYER_FLAGS.MOBILE});
    crouch.addFrame(player,0,"",folder + "/x-crouch-1.png",2);
    crouch.addFrame(player,0,"",folder + "/x-crouch-0.png",2);
    
    var jump_land = player.addAnimation(MISC_FLAGS.NONE,"jump land",0,["jump-land"],0,false);
    jump_land.addFrameWithSound(player,1,"audio/misc/jump-land.zzz",0,"",folder + "/x-crouch-0.png",2,{Player:PLAYER_FLAGS.MOBILE});


    var turn = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"turn",0,["turn"],0,false);
    turn.ButtonSequence.push([{Button:BUTTONS.TURN_AROUND,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    turn.ButtonCount = 1;
    turn.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.STANDING});
    turn.addFrame(player,0,"",folder + "/x-turn-0.png",2,{Player:PLAYER_FLAGS.MOBILE});
    turn.addFrame(player,0,"",folder + "/x-turn-1.png",2);
    turn.addFrame(player,0,"",folder + "/x-turn-2.png",2);

    var cturn = player.addAnimation(POSE_FLAGS.CROUCHING,"crouch turn",0,["turn"],0,false);
    cturn.ButtonSequence.push([{Button:BUTTONS.TURN_AROUND,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    cturn.ButtonCount = 1;
    cturn.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.CROUCHING});
    cturn.addFrame(player,0,"",folder + "/x-crouch-turn-0.png",2,{Player:PLAYER_FLAGS.MOBILE});
    cturn.addFrame(player,0,"",folder + "/x-crouch-turn-1.png",2);
    cturn.addFrame(player,0,"",folder + "/x-crouch-turn-2.png",2);
    cturn.chain(crouch,2);

    var win1 = player.addAnimation(MISC_FLAGS.NONE,"win 1",0,["win1"],0,false);
    win1.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    win1.addFrame(player,0,"",folder + "/x-win-1-0.png",4);
    win1.addFrame(player,0,"",folder + "/x-win-1-1.png",12);
    win1.addFrame(player,0,"",folder + "/x-win-1-2.png",12);
    win1.addFrame(player,0,"",folder + "/x-win-1-3.png",12);
    win1.addFrame(player,0,"",folder + "/x-win-1-4.png",12);
    win1.addFrame(player,0,"",folder + "/x-win-1-5.png",12);
    win1.addFrame(player,0,"",folder + "/x-win-1-6.png",12);
    win1.chain(win1,3);

    var win2 = player.addAnimation(MISC_FLAGS.NONE,"win 2",0,["win2"],0,false);
    win2.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    win2.addFrame(player,0,"",folder + "/x-win-2-0.png",4);
    win2.addFrame(player,0,"",folder + "/x-win-2-1.png",8);
    win2.addFrame(player,0,"",folder + "/x-win-2-2.png",8);
    win2.chain(win2,2);

    /*if this is not added,then only the first win animation will ever be used*/
    player.WinAnimationNames = ["win 1","win 2"];

    var dead = player.addAnimation(MISC_FLAGS.NONE,"dead",0,["dead"],0,false);
    dead.addFrame(player,0,"200",folder + "/x-down.png",CONSTANTS.DEFEATED_FRAME,{Player:PLAYER_FLAGS.INVULNERABLE});

    var hitReact_cLH = player.addAnimation(POSE_FLAGS.CROUCHING,"hr crouch light",0,["hr_cLH"],0,false);
    hitReact_cLH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_cLH.addFrame(player,0,"",folder + "/x-hit-cln-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    hitReact_cLH.chain(crouch,2);

    var hitReact_cMH = player.addAnimation(POSE_FLAGS.CROUCHING,"hr crouch medium",0,["hr_cMH"],0,false);
    hitReact_cMH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_cMH.addFrame(player,0,"",folder + "/x-hit-cln-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    hitReact_cMH.addFrame(player,0,"",folder + "/x-hit-chn-0.png",8);
    hitReact_cMH.addFrame(player,0,"",folder + "/x-hit-cln-0.png",8);
    hitReact_cMH.chain(crouch,2);

    var hitReact_cHH = player.addAnimation(POSE_FLAGS.CROUCHING,"hr crouch hard",0,["hr_cHH"],0,false);
    hitReact_cHH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_cHH.addFrame(player,0,"",folder + "/x-hit-chn-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    hitReact_cHH.addFrame(player,0,"",folder + "/x-hit-chn-1.png",8);
    hitReact_cHH.addFrame(player,0,"",folder + "/x-hit-cln-0.png",8);
    hitReact_cHH.chain(crouch,2);


    var hitReact_sLL = player.addAnimation(POSE_FLAGS.STANDING,"hr_sLL",0,["hr_sLL"],0,false);
    hitReact_sLL.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sLL.addFrame(player,0,"",folder + "/x-hit-sln-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    hitReact_sLL.addFrameWithSound(player,1,"audio/ryu/clocked.zzz",0,"",folder + "/x-hit-smn-0.png",8);
    hitReact_sLL.addFrame(player,0,"",folder + "/x-hit-sln-0.png",8);

    var hitReact_sLH = player.addAnimation(POSE_FLAGS.STANDING,"hr_sLH",0,["hr_sLH"],0,false);
    hitReact_sLH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sLH.addFrame(player,0,"",folder + "/x-hit-slf-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    hitReact_sLH.addFrame(player,0,"",folder + "/x-hit-smf-0.png",8);
    hitReact_sLH.addFrame(player,0,"",folder + "/x-hit-slf-0.png",8);

    var hitReact_sML = player.addAnimation(POSE_FLAGS.STANDING,"hr_sML",0,["hr_sML"],0,false);
    hitReact_sML.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sML.addFrame(player,0,"",folder + "/x-hit-smn-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}).clipMove({Front:20});
    hitReact_sML.addFrame(player,0,"",folder + "/x-hit-smn-1.png",8).clipMove({Front:20});
    hitReact_sML.addFrame(player,0,"",folder + "/x-hit-sln-0.png",8).clipMove({Front:20});

    var hitReact_sMH = player.addAnimation(POSE_FLAGS.STANDING,"hr_sMH",0,["hr_sMH"],0,false);
    hitReact_sMH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sMH.addFrame(player,0,"",folder + "/x-hit-smf-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    hitReact_sMH.addFrame(player,0,"",folder + "/x-hit-smn-1.png",8);
    hitReact_sMH.addFrame(player,0,"",folder + "/x-hit-sln-0.png",8);

    var hitReact_sHL = player.addAnimation(POSE_FLAGS.STANDING,"hr_sHL",0,["hr_sHL"],0,false);
    hitReact_sHL.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sHL.addFrame(player,0,"",folder + "/x-hit-smn-1.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE}).clipMove({Front:20});
    hitReact_sHL.addFrameWithSound(player,1,"audio/ryu/clocked.zzz",0,"",folder + "/x-hit-shn-1.png",8).clipMove({Front:20});
    hitReact_sHL.addFrame(player,0,"",folder + "/x-hit-sln-0.png",8).clipMove({Front:20});

    var hitReact_sHH = player.addAnimation(POSE_FLAGS.STANDING,"hr_sHH",0,["hr_sHH"],0,false);
    hitReact_sHH.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_sHH.addFrameWithSound(player,1,"audio/ryu/clocked.zzz",0,"",folder + "/x-hit-shf-0.png",8,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    hitReact_sHH.addFrame(player,0,"",folder + "/x-hit-shf-1.png",8);
    hitReact_sHH.addFrame(player,0,"",folder + "/x-hit-slf-0.png",8);

    var getup = player.addAnimation(MISC_FLAGS.NONE,"getup",0,["hr_getup"],0,false);
    getup.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    getup.addFrameWithSound(player,1,"audio/misc/floored-1.zzz",0,"200",folder + "/x-hit-air-2a.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS,Spawn:SPAWN_FLAGS.SPAWN_SMALLDIRT},{Player:PLAYER_FLAGS.MOBILE});
    getup.addFrame(player,0,"200",folder + "/x-down.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player,0,"",folder + "/x-getup-0.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player,0,"",folder + "/x-getup-1.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player,0,"",folder + "/x-getup-2.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player,0,"",folder + "/x-getup-3.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});
    getup.addFrame(player,0,"",folder + "/x-crouch-0.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS});

    var dizzy = player.addAnimation(MISC_FLAGS.NONE,"so dizzy",0,["hr_sodizzy"],0,false);
    dizzy.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX, Alert: ALERT_FLAGS.DIZZY });
    dizzy.AdjustShadowPosition = false;
    dizzy.addFrame(player,0,"",folder + "/x-dizzy-0.png",32,{ Player: PLAYER_FLAGS.DIZZY },{Player: PLAYER_FLAGS.MOBILE});
    dizzy.addFrame(player,0,"",folder + "/x-dizzy-1.png",32,{ Player: PLAYER_FLAGS.DIZZY });
    dizzy.addFrame(player,0,"",folder + "/x-dizzy-2.png",32,{ Player: PLAYER_FLAGS.DIZZY },0,0,0,0,0,0,-20);
    dizzy.addFrame(player,0,"",folder + "/x-dizzy-1.png",32,{ Player: PLAYER_FLAGS.DIZZY },0,0,0,0,0,0,0);
    dizzy.chain(dizzy);

    var getup_dizzy = player.addAnimation(MISC_FLAGS.NONE,"getup dizzy",0,["hr_getupdizzy"],0,false);
    getup_dizzy.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX });
    getup_dizzy.addFrameWithSound(player,1,"audio/misc/floored-1.zzz",0,"200",folder + "/x-hit-air-2a.png",4,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS,Spawn: SPAWN_FLAGS.SPAWN_SMALLDIRT },{ Player: PLAYER_FLAGS.MOBILE });
    getup_dizzy.addFrame(player,0,"200",folder + "/x-down.png",4,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS });
    getup_dizzy.addFrame(player,0,"",folder + "/x-getup-0.png",4,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS });
    getup_dizzy.addFrame(player,0,"",folder + "/x-getup-1.png",4,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS });
    getup_dizzy.addFrame(player,0,"",folder + "/x-getup-2.png",4,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS });
    getup_dizzy.addFrame(player,0,"",folder + "/x-getup-3.png",4,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS });
    getup_dizzy.addFrame(player,0,"",folder + "/x-crouch-0.png",4,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS });
    getup_dizzy.chain(dizzy);


    var hitReact_dizzyBounce = player.addAnimation(MISC_FLAGS.NONE,"dizzy bounce",0,["hr_dizzybounce"],0,false);
    hitReact_dizzyBounce.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX | PLAYER_FLAGS.USE_CURRENT_VX });
    hitReact_dizzyBounce.chainVxFn = (function(v){ return v * 0.75; });
    hitReact_dizzyBounce.Vy = (80);
    hitReact_dizzyBounce.addFrameWithSound(player,1,"audio/misc/floored-2.zzz",0,"200",folder + "/x-hit-air-2.png",4,{ Player: PLAYER_FLAGS.INVULNERABLE | PLAYER_FLAGS.IGNORE_COLLISIONS,Spawn: SPAWN_FLAGS.SPAWN_BIGDIRT },{ Player: PLAYER_FLAGS.MOBILE },0,1);
    hitReact_dizzyBounce.addFrame(player,0,"200",folder + "/x-hit-air-3.png",CONSTANTS.FRAME_MAX,{ Pose: POSE_FLAGS.AIRBORNE,Player: PLAYER_FLAGS.USE_ATTACK_DIRECTION | PLAYER_FLAGS.IGNORE_ATTACKS });
    hitReact_dizzyBounce.chain(getup_dizzy);

    var hitReact_dizzy = player.addAnimation(POSE_FLAGS.STANDING,"dizzy",0,["hr_dizzy"],0,false);
    hitReact_dizzy.Flags = ({ Player: PLAYER_FLAGS.MOVE_TO_FRONT });
    hitReact_dizzy.Vx = (35);
    hitReact_dizzy.Vy = (200);
    hitReact_dizzy.addFrame(player,0,"200",folder + "/x-hit-air-0.png",32,{ Player: PLAYER_FLAGS.IGNORE_ATTACKS },{Player: PLAYER_FLAGS.MOBILE},1);
    hitReact_dizzy.addFrame(player,0,"200",folder + "/x-hit-air-1.png",CONSTANTS.FRAME_MAX,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE | PLAYER_FLAGS.IGNORE_ATTACKS });
    hitReact_dizzy.chain(hitReact_dizzyBounce);

    /*
    var rise = player.addAnimation(MISC_FLAGS.NONE,"rise",0,["getup"],0,false);
    rise.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    rise.addFrame(player,0,"",folder + "/x-getup-0.png",4,{Player:PLAYER_FLAGS.INVULNERABLE});
    rise.addFrame(player,0,"",folder + "/x-getup-1.png",4,{Player:PLAYER_FLAGS.INVULNERABLE});
    rise.addFrame(player,0,"",folder + "/x-getup-2.png",4,{Player:PLAYER_FLAGS.INVULNERABLE});
    rise.addFrame(player,0,"",folder + "/x-getup-3.png",4,{Player:PLAYER_FLAGS.INVULNERABLE});
    rise.addFrame(player,0,"",folder + "/x-crouch-0.png",4,{Player:PLAYER_FLAGS.INVULNERABLE});
    */

    var hitReact_bounce = player.addAnimation(MISC_FLAGS.NONE,"bounce",0,["hr_bounce"],0,false);
    hitReact_bounce.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX | PLAYER_FLAGS.USE_CURRENT_VX});
    hitReact_bounce.chainVxFn = (function(v){ return v * 0.75; });
    hitReact_bounce.chainVyFn = (function(v){ return v * 0.5; });
    hitReact_bounce.Vy = (80);
    hitReact_bounce.addFrameWithSound(player,1,"audio/misc/floored-2.zzz",0,"200",folder + "/x-hit-air-2.png",4,{Player:PLAYER_FLAGS.IGNORE_ATTACKS,Spawn:SPAWN_FLAGS.SPAWN_BIGDIRT},{Player:PLAYER_FLAGS.MOBILE},0,1);
    hitReact_bounce.addFrame(player,0,"200",folder + "/x-hit-air-3.png",CONSTANTS.FRAME_MAX,{Pose:POSE_FLAGS.AIRBORNE,Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS},{Player: PLAYER_FLAGS.MOBILE});
    hitReact_bounce.chain(getup);

    var hitReact_trip = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING,"tripped",0,["hr_trip"],0,false);
    hitReact_trip.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX,Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_trip.Vx = (25);
    hitReact_trip.Vy = (150);
    hitReact_trip.addFrame(player,0,"",folder + "/x-hit-air-4.png",8,{Player:PLAYER_FLAGS.INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,0,50);
    hitReact_trip.addFrame(player,0,"",folder + "/x-hit-air-5.png",4,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_trip.addFrame(player,0,"",folder + "/x-hit-air-6.png",CONSTANTS.FRAME_MAX,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_trip.chain(hitReact_bounce);

    var hitReact_air = player.addAnimation(POSE_FLAGS.AIRBORNE,"hit in air",0,["hr_air"],0,false);
    hitReact_air.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX,Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_air.Vx = (-50);
    hitReact_air.Vy = (150);
    hitReact_air.addFrame(player,0,"",folder + "/x-hit-air-0.png",8,{Player:PLAYER_FLAGS.INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE});
    hitReact_air.addFrame(player,0,"",folder + "/x-f-jump-5.png",4,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_air.addFrame(player,0,"",folder + "/x-f-jump-4.png",4,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_air.addFrame(player,0,"",folder + "/x-f-jump-3.png",4,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_air.addFrame(player,0,"",folder + "/x-f-jump-2.png",4,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_air.addFrame(player,0,"",folder + "/x-jump-1.png",CONSTANTS.FRAME_MAX,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE});
    hitReact_air.chain(jump_land);

    var hitReact_red_fire = player.addAnimation(POSE_FLAGS.STANDING,"red fire",0,["hr_red_fire"],0,false);
    hitReact_red_fire.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX, Combat:COMBAT_FLAGS.IGNORE_CLEAR_FIRE, Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_red_fire.Vx = (25);
    hitReact_red_fire.Vy = (200);
    hitReact_red_fire.IsLooping = true;
    hitReact_red_fire.addFrame(player,0,"200",folder + "/hr-rfire-01.png",2,{ Player: PLAYER_FLAGS.INVULNERABLE },{Player:PLAYER_FLAGS.MOBILE},1);
    hitReact_red_fire.addFrame(player,0,"200",folder + "/hr-rfire-02.png",2,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE });
    hitReact_red_fire.chain(hitReact_bounce);

    var hitReact_blue_fire = player.addAnimation(POSE_FLAGS.STANDING,"blue fire",0,["hr_blue_fire"],0,false);
    hitReact_blue_fire.Flags = ({Player: PLAYER_FLAGS.HOLD_ZINDEX, Combat:COMBAT_FLAGS.IGNORE_CLEAR_FIRE, Juggle:JUGGLE_FLAGS.ALLOW});
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
    hitReact_knockDown.addFrame(player,0,"",folder + "/x-hit-shn-1.png",8,{Player:PLAYER_FLAGS.INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE},0,1);
    hitReact_knockDown.addFrame(player,0,"",folder + "/x-hit-shf-0.png",4,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_knockDown.addFrame(player,0,"",folder + "/x-hit-air-0.png",12,{Player:PLAYER_FLAGS.INVULNERABLE});
    hitReact_knockDown.addFrame(player,0,"",folder + "/x-hit-air-1.png",CONSTANTS.FRAME_MAX,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE});
    hitReact_knockDown.chain(hitReact_bounce);


    var down = player.addAnimation(MISC_FLAGS.NONE,"down",0,["hr_down"],0,false);
    down.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    down.addFrameWithSound(player,1,"audio/misc/floored-1.zzz",0,"200",folder + "/x-down.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE,Spawn:SPAWN_FLAGS.SPAWN_SMALLDIRT},{Player:PLAYER_FLAGS.MOBILE});

    var hitReact_deadBounce = player.addAnimation(MISC_FLAGS.NONE,"dead bounce",0,["hr_deadbounce"],0,false);
    hitReact_deadBounce.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX | PLAYER_FLAGS.USE_CURRENT_VX });
    hitReact_deadBounce.chainVxFn = (function(v){ return v * 0.75; });
    hitReact_deadBounce.Vy = (80);
    hitReact_deadBounce.addFrameWithSound(player,1,"audio/misc/floored-2.zzz",0,"200",folder + "/x-hit-air-2.png",4,{Player:PLAYER_FLAGS.INVULNERABLE|PLAYER_FLAGS.IGNORE_COLLISIONS,Spawn:SPAWN_FLAGS.SPAWN_BIGDIRT},{Player:PLAYER_FLAGS.MOBILE},0,1);
    hitReact_deadBounce.addFrame(player,0,"200",folder + "/x-hit-air-3.png",CONSTANTS.FRAME_MAX,{Pose:POSE_FLAGS.AIRBORNE,Player:PLAYER_FLAGS.USE_ATTACK_DIRECTION|PLAYER_FLAGS.IGNORE_ATTACKS|PLAYER_FLAGS.IGNORE_COLLISIONS},{Player:PLAYER_FLAGS.MOBILE});
    hitReact_deadBounce.chain(down);

    var hitReact_dead = player.addAnimation(POSE_FLAGS.STANDING,"hr dead",0,["hr_dead"],0,false);
    hitReact_dead.Flags = ({Player:PLAYER_FLAGS.MOVE_TO_FRONT, Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_dead.Vx = (35);
    hitReact_dead.Vy = (200);
    hitReact_dead.addFrame(player,0,"200",folder + "/x-hit-air-0.png",32,{ Player:PLAYER_FLAGS.INVULNERABLE | PLAYER_FLAGS.IGNORE_COLLISIONS },0,1);
    hitReact_dead.addFrame(player,0,"200",folder + "/x-hit-air-1.png",CONSTANTS.FRAME_MAX,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE|PLAYER_FLAGS.IGNORE_COLLISIONS});
    hitReact_dead.chain(hitReact_deadBounce);

    var hitReact_eject = player.addAnimation(POSE_FLAGS.STANDING,"eject",0,["eject"],0,false);
    hitReact_eject.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX, Juggle:JUGGLE_FLAGS.ALLOW});
    hitReact_eject.Vx = (35);
    hitReact_eject.Vy = (200);
    hitReact_eject.addFrame(player,0,"",folder + "/x-hit-air-0.png",32,{Player:PLAYER_FLAGS.INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE},0,1);
    hitReact_eject.addFrame(player,0,"",folder + "/x-hit-air-1.png",CONSTANTS.FRAME_MAX,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE,Juggle:JUGGLE_FLAGS.IGNORE});
    hitReact_eject.chain(hitReact_bounce);

    var hitReact_shoulder_throw = player.addAnimation(POSE_FLAGS.ANY,"shoulder throw",0,["shoulder_throw"],0,false);
    hitReact_shoulder_throw.IsImplicit = true;
    hitReact_shoulder_throw.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX });
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/x-hit-slf-0.png",8,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },{ Player: PLAYER_FLAGS.MOBILE });
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/x-hit-sln-0.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,0,0,0,0,0,-20,20);
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/#-hit-shf-1a.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABL },MISC_FLAGS.NONE,0,0,0,0,0,-60,180);
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/#-hit-smn-0a.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,0,0,0,0,0,80,150);
    hitReact_shoulder_throw.addFrame(player,0,"",folder + "/#-hit-shn-1a.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,-100,100,0,0,0,0,0);


    var hitReact_fk_throw = player.addAnimation(POSE_FLAGS.ANY,"fk throw",0,["fk_throw"],0,false);
    hitReact_fk_throw.IsImplicit = true;
    hitReact_fk_throw.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX });
    hitReact_fk_throw.addFrame(player,0,"",folder + "/x-hit-slf-0.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },{ Player: PLAYER_FLAGS.MOBILE });
    hitReact_fk_throw.addFrame(player,0,"",folder + "/x-hit-sln-0.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,0,-40,0);
    hitReact_fk_throw.addFrame(player,0,"",folder + "/#-hit-shf-1a.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,0,0,0,0,0,0,105);
    hitReact_fk_throw.addFrame(player,0,"",folder + "/#-hit-shn-1a.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,-160,100,0,0,0,0,0);


    var hitReact_bison_shoulder_throw = player.addAnimation(POSE_FLAGS.ANY,"bison shoulder throw",0,["bison_shoulder_throw"],0,false);
    hitReact_bison_shoulder_throw.IsImplicit = true;
    hitReact_bison_shoulder_throw.Flags = ({ Player: PLAYER_FLAGS.HOLD_ZINDEX });
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/x-hit-slf-0.png",8,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },{ Player: PLAYER_FLAGS.MOBILE });
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/x-hit-sln-0.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,0,0,0,0,0,0,47);
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/#-hit-shf-1a.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABL },MISC_FLAGS.NONE,0,0,0,0,0,28,174);
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/#-hit-smn-0a.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,0,0,0,0,0,102,169);
    hitReact_bison_shoulder_throw.addFrame(player,0,"",folder + "/#-hit-shn-1a.png",4,{ Player: PLAYER_FLAGS.SUPER_INVULNERABLE },MISC_FLAGS.NONE,-102,170,0,0,0,0,0);

    var hitReact_roll_throw = player.addAnimation(POSE_FLAGS.ANY,"roll throw",0,["roll_throw"],0,false);
    hitReact_roll_throw.IsImplicit = true;
    hitReact_roll_throw.Flags = ({Player:PLAYER_FLAGS.HOLD_ZINDEX});
    hitReact_roll_throw.addFrame(player,0,"",folder + "/x-hit-slf-0.png",8,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},{Player:PLAYER_FLAGS.MOBILE});
    hitReact_roll_throw.addFrame(player,0,"",folder + "/x-hit-sln-0.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE});
    for(var i = 0; i < 2; ++i)
    {
        hitReact_roll_throw.addFrame(player,0,"",folder + "/#-hit-air-1a.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-20,55);
        hitReact_roll_throw.addFrame(player,0,"",folder + "/#-hit-sln-0a.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,60,0);
        hitReact_roll_throw.addFrame(player,0,"",folder + "/x-hit-air-1.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,-25,0);
        hitReact_roll_throw.addFrame(player,0,"",folder + "/x-hit-sln-0.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,0,0);
    }
    hitReact_roll_throw.addFrame(player,0,"",folder + "/#-hit-shf-1a.png",4,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,0,0,0,0,0,0,110);
    hitReact_roll_throw.addFrame(player,0,"",folder + "/#-hit-shn-1a.png",6,{Player:PLAYER_FLAGS.SUPER_INVULNERABLE},MISC_FLAGS.NONE,-160,50,0,0,0,0,0);


    var blockRelease = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_BLOCK,"block release",0,["block_relase"],-2,false);
    blockRelease.Flags = ({Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.MOVE_TO_BACK});
    blockRelease.addFrame(player,0,"",folder + "/x-block-1.png",2,{Player:PLAYER_FLAGS.BLOCKING});
    blockRelease.addFrame(player,0,"",folder + "/x-block-0.png",1,{Player:PLAYER_FLAGS.BLOCKING});
    /*The POSE_FLAGS.ALLOW_BLOCK is checked seperately,it absolutely must be there,or else the move will not be found!
    Only one of the other flags need to match*/
    var block = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_BLOCK,"block",0,[BUTTONS.BACK],-2,false);
    block.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    block.ButtonCount = 1;
    block.Flags = ({Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.MOVE_TO_BACK});
    block.addFrame(player,0,"",folder + "/x-block-0.png",1,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.IGNORE_HOLD_FRAME});
    block.addFrame(player,0,"",folder + "/x-block-1.png",4,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.MUST_HOLD_KEY});
    block.addFrame(player,0,"",folder + "/x-block-1.png",4,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.HOLD_FRAME});
    block.chain(blockRelease);
    blockRelease.allowInterupt(block,1,{Pose: POSE_FLAGS.ALLOW_BLOCK});

    var cblockRelease = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.ALLOW_BLOCK,"crouch block release",0,["cblock_release"],-1,false);
    cblockRelease.Flags = ({Player:PLAYER_FLAGS.BLOCKING,Pose:POSE_FLAGS.CROUCHING});
    cblockRelease.addFrame(player,0,"",folder + "/x-crouch-block-1.png",4,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.HOLD_FRAME});
    cblockRelease.addFrame(player,0,"",folder + "/x-crouch-block-0.png",1,{Player:PLAYER_FLAGS.BLOCKING});
    cblockRelease.chain(crouch,2);
    
    var cblock = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.ALLOW_BLOCK,"crouch block",0,[BUTTONS.CROUCH|BUTTONS.BACK],-1,false);
    cblock.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    cblock.ButtonCount = 1;
    cblock.Flags = ({Player:PLAYER_FLAGS.BLOCKING,Pose:POSE_FLAGS.CROUCHING});
    cblock.addFrame(player,0,"",folder + "/x-crouch-block-0.png",1,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.IGNORE_HOLD_FRAME});
    cblock.addFrame(player,0,"",folder + "/x-crouch-block-1.png",4,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.MUST_HOLD_KEY});
    cblock.addFrame(player,0,"",folder + "/x-crouch-block-1.png",4,{Player:PLAYER_FLAGS.BLOCKING|PLAYER_FLAGS.HOLD_FRAME});
    cblock.chain(cblockRelease);

    var ablock = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB|POSE_FLAGS.ALLOW_AIR_BLOCK,"air block",0,[BUTTONS.BACK],-1,false);
    ablock.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    ablock.ButtonCount = 1;
    ablock.Flags = ({Player:PLAYER_FLAGS.BLOCKING});
    ablock.addFrame(player,0,"",folder + "/x-air-block-0.png",1,{Player:PLAYER_FLAGS.BLOCKING});
    ablock.addFrame(player,0,"",folder + "/x-air-block-0.png",CONSTANTS.MAX_FRAME,{Player:PLAYER_FLAGS.BLOCKING});
    ablock.chain(jump_land);

    var crouch_p1 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch p1",5,[BUTTONS.CROUCH|BUTTONS.LIGHT_PUNCH],110);
    crouch_p1.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.LIGHT_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_p1.ButtonCount = 2;
    crouch_p1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_p1.Flags = {Pose:POSE_FLAGS.CROUCHING};
    crouch_p1.addFrame(player,0,"",folder + "/x-crouch-p1-1.png",2,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    crouch_p1.addFrame(player,0,"",folder + "/x-crouch-p1-2.png",3,{ SwingSound:SWINGSOUND.LP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.LP },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.LIGHT | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 110,y: 120 },{ state: HIT_FLAGS.LOW,x: 194,y: 120}],ATTACK_FLAGS.LIGHT,1,1,10);
    crouch_p1.endBlock();
    crouch_p1.addFrame(player,0,"",folder + "/x-crouch-p1-1.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    crouch_p1.chain(crouch,2);

    var crouch_p2 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch p2",5,[BUTTONS.CROUCH|BUTTONS.MEDIUM_PUNCH],110);
    crouch_p2.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.MEDIUM_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_p2.ButtonCount = 2;
    crouch_p2.setMediumAttack();
    crouch_p2.Flags = {Pose:POSE_FLAGS.CROUCHING};
    crouch_p2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_p2.addFrame(player,0,"",folder + "/x-crouch-p2-1.png",2,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    crouch_p2.addFrame(player,0,"",folder + "/x-crouch-p2-2.png",1);
    crouch_p2.addFrame(player,0,"",folder + "/x-crouch-p2-3.png",3,{ SwingSound:SWINGSOUND.MP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.MP },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.MEDIUM | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 110,y: 120 },{ state: HIT_FLAGS.LOW,x: 194,y: 120}],ATTACK_FLAGS.MEDIUM,1,1,15);
    crouch_p2.endBlock();
    crouch_p2.addFrame(player,0,"",folder + "/x-crouch-p2-2.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    crouch_p2.chain(crouch,2);

    var crouch_p3 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch p3",5,[BUTTONS.CROUCH|BUTTONS.HARD_PUNCH],110);
    crouch_p3.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.HARD_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_p3.ButtonCount = 2;
    crouch_p3.setHardAttack();
    crouch_p3.Flags = {Pose:POSE_FLAGS.CROUCHING};
    crouch_p3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING | OVERRIDE_FLAGS.AIRBORNE);
    crouch_p3.addFrame(player,0,"",folder + "/x-crouch-p3-1.png",3,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    crouch_p3.addFrame(player,0,"",folder + "/x-crouch-p3-2.png",3,{ SwingSound:SWINGSOUND.HP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HP },MISC_FLAGS.NONE,0,0,0,25,null,0,0,ATTACK_FLAGS.HARD | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 110,y: 120 },{ state: HIT_FLAGS.LOW,x: 150,y: 165 },{ state: HIT_FLAGS.LOW,x: 150,y: 220}],ATTACK_FLAGS.HARD,1,1,20);
    crouch_p3.addFrame(player,0,"",folder + "/x-crouch-p3-3.png",6,{ Combat: COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HARD | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 110,y: 120 },{ state: HIT_FLAGS.LOW,x: 110,y: 315 },{ state: HIT_FLAGS.LOW,x: 90,y: 315}],ATTACK_FLAGS.HARD,1,1,20);
    crouch_p3.endBlock();
    crouch_p3.addFrame(player,0,"",folder + "/x-crouch-p3-2.png",8,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    crouch_p3.chain(crouch,2);

    var crouch_k1 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch k1",5,[BUTTONS.CROUCH|BUTTONS.LIGHT_KICK],110);
    crouch_k1.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.LIGHT_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_k1.ButtonCount = 2;
    crouch_k1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_k1.Flags = {Pose:POSE_FLAGS.CROUCHING};
    crouch_k1.addFrame(player,0,"",folder + "/x-crouch-k1-1.png",3,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    crouch_k1.addFrame(player,0,"",folder + "/x-crouch-k1-2.png",5,{ SwingSound:SWINGSOUND.LP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.LK },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.LIGHT | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 110,y: 40 },{ state: HIT_FLAGS.LOW,x: 210,y: 1}],ATTACK_FLAGS.LIGHT,1,1,10);
    crouch_k1.endBlock();
    crouch_k1.addFrame(player,0,"",folder + "/x-crouch-k1-1.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    crouch_k1.chain(crouch,2);

    var crouch_k2 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch k2",5,[BUTTONS.CROUCH|BUTTONS.MEDIUM_KICK],110);
    crouch_k2.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.MEDIUM_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_k2.ButtonCount = 2;
    crouch_k2.setMediumAttack();
    crouch_k2.Flags = {Pose:POSE_FLAGS.CROUCHING};
    crouch_k2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_k2.addFrame(player,0,"168",folder + "/x-crouch-k1-1.png",2,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    crouch_k2.addFrame(player,0,"168",folder + "/x-crouch-k2-2.png",1);
    crouch_k2.addFrame(player,0,"264",folder + "/x-crouch-k2-3.png",5,{ SwingSound:SWINGSOUND.MP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1|POSE_FLAGS.ALLOW_INTERUPT_2,HitSound:HITSOUND.MK },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.MEDIUM | ATTACK_FLAGS.HITS_LOW,[{ state: HIT_FLAGS.LOW,x: 140,y: 35 },{ state: HIT_FLAGS.LOW,x: 185,y: 30 },{ state: HIT_FLAGS.LOW,x: 260,y: 1}],ATTACK_FLAGS.MEDIUM,1,1,15);
    crouch_k2.endBlock();
    crouch_k2.addFrame(player,0,"168",folder + "/x-crouch-k2-2.png",3);
    crouch_k2.addFrame(player,0,"168",folder + "/x-crouch-k1-1.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    crouch_k2.chain(crouch,2);

    var crouch_k3 = player.addAnimation(POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1,"crouch k3",5,[BUTTONS.CROUCH|BUTTONS.HARD_KICK],110);
    crouch_k3.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.HARD_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    crouch_k3.ButtonCount = 2;
    crouch_k3.setHardAttack();
    crouch_k3.Flags = ({Pose:POSE_FLAGS.CROUCHING});
    crouch_k3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.CROUCHING,OVERRIDE_FLAGS.STANDING);
    crouch_k3.addFrame(player,0,"",folder + "/x-crouch-k3-1.png",3,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    crouch_k3.addFrame(player,0,"232",folder + "/x-crouch-k3-2.png",5,{ SwingSound:SWINGSOUND.HP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HK },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HARD | ATTACK_FLAGS.HITS_LOW | ATTACK_FLAGS.TRIP,[{ state: HIT_FLAGS.LOW,x: 160,y: 35 },{ state: HIT_FLAGS.HIGH,x: 250,y: 35}],ATTACK_FLAGS.HARD,1,1,20,0,CONSTANTS.TRIP_SLIDEFACTOR);
    crouch_k3.endBlock();
    crouch_k3.addFrame(player,0,"",folder + "/x-crouch-k3-3.png",4);
    crouch_k3.addFrame(player,0,"",folder + "/x-crouch-k3-4.png",6);
    crouch_k3.addFrame(player,0,"",folder + "/x-crouch-k3-5.png",8,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    crouch_k3.chain(crouch,2);

    ////////////////////
    ////////////////////
    ////////////////////

    var p1 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"light punch",6,[BUTTONS.LIGHT_PUNCH]);
    p1.ButtonSequence.push([{Button:BUTTONS.LIGHT_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    p1.ButtonCount = 1;
    p1.Flags = {Pose:POSE_FLAGS.STANDING};
    p1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.HPROJECTILE);
    p1.addFrame(player,0,"",folder + "/x-p1-0.png",2,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    p1.addFrame(player,0,"",folder + "/x-p1-1.png",3,{ SwingSound:SWINGSOUND.LP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.LP },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.LIGHT,[{ state: HIT_FLAGS.LOW,x: 110,y: 193 },{ state: HIT_FLAGS.HIGH,x: 194,y: 193}],ATTACK_FLAGS.LIGHT,1,1,10);
    p1.endBlock();
    p1.addFrame(player,0,"",folder + "/x-p1-0.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE);

    var p2 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"medium punch",5,[BUTTONS.MEDIUM_PUNCH]);
    p2.ButtonSequence.push([{Button:BUTTONS.MEDIUM_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    p2.ButtonCount = 1;
    p2.Flags = {Pose:POSE_FLAGS.STANDING};
    p2.setMediumAttack();
    p2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.AIRBORNE);
    p2.addFrame(player,0,"",folder + "/x-p2-0.png",2,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE });
    p2.addFrame(player,0,"",folder + "/x-p2-1.png",2,{ SwingSound:SWINGSOUND.MP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.MP },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.MEDIUM,[{ state: HIT_FLAGS.LOW,x: 130,y: 145 },{ state: HIT_FLAGS.HIGH,x: 170,y: 185}],ATTACK_FLAGS.MEDIUM,1,1,15);
    p2.addFrame(player,0,"",folder + "/x-p2-2.png",5,{ Combat: COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP },MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.MEDIUM,[{ state: HIT_FLAGS.LOW,x: 150,y: 220 },{ state: HIT_FLAGS.HIGH,x: 135,y: 270}],ATTACK_FLAGS.MEDIUM,1,1,15);
    p2.endBlock();
    p2.addFrame(player,0,"",folder + "/x-p2-1.png",4);
    p2.addFrame(player,0,"",folder + "/x-p2-3.png",5);

    var f_p2 = player.addAnimation(POSE_FLAGS.WALKING_FORWARD,"forward medium punch",5,[BUTTONS.MEDIUM_PUNCH]);
    f_p2.ButtonSequence.push([{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.MEDIUM_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    f_p2.ButtonCount = 2;
    f_p2.Flags = {Pose:POSE_FLAGS.STANDING};
    f_p2.setMediumAttack();
    f_p2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING);
    f_p2.addFrame(player,0,"",folder + "/x-f-p2-0.png",3,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    f_p2.addFrame(player,0,"",folder + "/x-f-p2-1.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    f_p2.addFrame(player,0,"",folder + "/x-f-p2-2.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    f_p2.addRepeatingFrame(player,0,"",folder + "/x-f-p2-3.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,3);
    f_p2.addRepeatingFrameWithSound(player,1,"audio/ryu/thrust-0.zzz",0,"",folder + "/x-f-p2-4.png",3,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP},MISC_FLAGS.NONE,2,0,0,10,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:190,y:165}],ATTACK_FLAGS.MEDIUM,CONSTANTS.FIRST_HIT,1,10);
    f_p2.addFrame(player,0,"",folder + "/x-f-p2-5.png",3,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP,Pose: POSE_FLAGS.ALLOW_INTERUPT_1},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:190,y:75},{state:HIT_FLAGS.HIGH,x:160,y:145}],ATTACK_FLAGS.MEDIUM,CONSTANTS.SECOND_HIT,1,10);
    f_p2.addFrame(player,0,"",folder + "/x-f-p2-6.png",3,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP,Pose: POSE_FLAGS.ALLOW_INTERUPT_1},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:190,y:75},{state:HIT_FLAGS.HIGH,x:160,y:145}],ATTACK_FLAGS.MEDIUM,CONSTANTS.SECOND_HIT,1,10);
    f_p2.addFrame(player,0,"",folder + "/x-f-p2-7.png",3,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP,Pose: POSE_FLAGS.ALLOW_INTERUPT_1},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:190,y:75},{state:HIT_FLAGS.HIGH,x:160,y:145}],ATTACK_FLAGS.MEDIUM,CONSTANTS.SECOND_HIT,1,10);
    f_p2.addFrame(player,0,"",folder + "/x-f-p2-8.png",3,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP,Pose: POSE_FLAGS.ALLOW_INTERUPT_1},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:190,y:75},{state:HIT_FLAGS.HIGH,x:160,y:145}],ATTACK_FLAGS.MEDIUM,CONSTANTS.SECOND_HIT,1,10);
    f_p2.addFrame(player,0,"",folder + "/x-f-p2-9.png",6,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP,Pose: POSE_FLAGS.ALLOW_INTERUPT_1},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:190,y:75},{state:HIT_FLAGS.HIGH,x:160,y:145}],ATTACK_FLAGS.MEDIUM,CONSTANTS.SECOND_HIT,1,10);
    f_p2.endBlock();

    var p3 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"hard punch",5,[BUTTONS.HARD_PUNCH]);
    p3.ButtonSequence.push([{Button:BUTTONS.HARD_PUNCH,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    p3.ButtonCount = 1;
    p3.Flags = {Pose:POSE_FLAGS.STANDING};
    p3.setHardAttack();
    p3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.HPROJECTILE);
    p3.addFrame(player,0,"",folder + "/x-p2-1.png",3,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    p3.addFrame(player,0,"",folder + "/x-p3-1.png",2);
    p3.addFrame(player,0,"",folder + "/x-p3-2.png",4,{SwingSound:SWINGSOUND.HP,Combat:COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:130,y:181},{state:HIT_FLAGS.HIGH,x:215,y:181}],ATTACK_FLAGS.HARD,1,1,20);
    p3.endBlock();
    p3.addFrame(player,0,"",folder + "/x-p3-1.png",6);
    p3.addFrame(player,0,"",folder + "/x-p2-3.png",8);


    var throw1X = -4;
    var throw1 = player.addThrow(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"throw 1",0,[BUTTONS.FORWARD|BUTTONS.CHARGE,BUTTONS.FORWARD|BUTTONS.MEDIUM_PUNCH],CONSTANTS.MAX_PRIORITY,false,false,0,"ShoulderThrow");
    throw1.ButtonSequence.push([{Button:[BUTTONS.FORWARD,BUTTONS.BACK],State:BUTTON_STATE.PRESSED},{Button:[BUTTONS.MEDIUM_PUNCH,BUTTONS.HARD_PUNCH],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    throw1.ButtonCount = 3;
    throw1.NbChargeFrames = 5;
    throw1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.NONE,OVERRIDE_FLAGS.ALL);
    throw1.addAlternateKeySequence([BUTTONS.FORWARD|BUTTONS.CHARGE,BUTTONS.FORWARD|BUTTONS.HARD_PUNCH]);
    throw1.addAlternateKeySequence([BUTTONS.BACK|BUTTONS.CHARGE,BUTTONS.BACK|BUTTONS.HARD_PUNCH]);
    throw1.addAlternateKeySequence([BUTTONS.BACK|BUTTONS.CHARGE,BUTTONS.BACK|BUTTONS.MEDIUM_PUNCH]);
    throw1.setGrappleDistance(CONSTANTS.GRAPPLE_DISTANCE);
    throw1.setOtherPlayerAirborneFlags(AIRBORNE_FLAGS.NO);
    throw1.addFrame(player,0,"",folder + "/x-throw-0-0.png",10,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,0,0,ATTACK_FLAGS.THROW_START,[{state:HIT_FLAGS.LOW,x:130,y:145},{state:HIT_FLAGS.HIGH,x:170,y:185}],ATTACK_FLAGS.NONE,1);
    throw1.addFrame(player,0,"",folder + "/x-throw-0-1.png",8,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    throw1.addFrame(player,0,"",folder + "/x-throw-0-2.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    throw1.addFrameWithSound(player,1,"audio/ryu/throw-0.zzz",0,"",folder + "/x-throw-0-3.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    throw1.addFrame(player,0,"",folder + "/x-throw-0-4.png",26,{Combat:COMBAT_FLAGS.ATTACK},MISC_FLAGS.NONE,-10,0,0,100,null,0,0,ATTACK_FLAGS.THROW_EJECT,[{x:-1,y:-1,Fx:1.5,Fy:0.75}],ATTACK_FLAGS.NONE,2,1,15);


    var throw2X = -4;
    var throw2 = player.addThrow(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"throw 2",0,[BUTTONS.FORWARD|BUTTONS.CHARGE,BUTTONS.FORWARD|BUTTONS.MEDIUM_KICK],CONSTANTS.MAX_PRIORITY,false,false,0,"FkThrow");
    throw2.ButtonSequence.push([{Button:[BUTTONS.FORWARD,BUTTONS.BACK],State:BUTTON_STATE.PRESSED},{Button:[BUTTONS.MEDIUM_KICK,BUTTONS.HARD_KICK],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    throw2.ButtonCount = 3;
    throw2.NbChargeFrames = 5;
    throw2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.NONE,OVERRIDE_FLAGS.ALL);
    throw2.addAlternateKeySequence([BUTTONS.FORWARD|BUTTONS.CHARGE,BUTTONS.FORWARD|BUTTONS.HARD_KICK]);
    throw2.addAlternateKeySequence([BUTTONS.BACK|BUTTONS.CHARGE,BUTTONS.BACK|BUTTONS.HARD_KICK]);
    throw2.addAlternateKeySequence([BUTTONS.BACK|BUTTONS.CHARGE,BUTTONS.BACK|BUTTONS.MEDIUM_KICK]);
    throw2.setGrappleDistance(CONSTANTS.GRAPPLE_DISTANCE);
    throw2.setOtherPlayerAirborneFlags(AIRBORNE_FLAGS.NO);
    throw2.addFrame(player,0,"",folder + "/x-throw-0-0.png",7,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,null,0,0,ATTACK_FLAGS.THROW_START,[{state:HIT_FLAGS.LOW,x:130,y:145},{state:HIT_FLAGS.HIGH,x:170,y:185}],ATTACK_FLAGS.NONE,1);
    throw2.addFrame(player,0,"",folder + "/x-throw-1-0.png",8,MISC_FLAGS.NONE,MISC_FLAGS.NONE);
    throw2.addFrame(player,0,"",folder + "/x-throw-1-1.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,-20);
    throw2.addFrameWithSound(player,1,"audio/ryu/throw-1.zzz",0,"",folder + "/x-throw-1-2.png",5,{Combat:COMBAT_FLAGS.ATTACK},MISC_FLAGS.NONE,-20,0,0,100,null,0,0,ATTACK_FLAGS.THROW_EJECT,[{x:-1,y:-1,Fx:1.5,Fy:0.75}],ATTACK_FLAGS.NONE,2,1,15);
    throw2.addFrame(player,0,"",folder + "/x-throw-1-3.png",22,MISC_FLAGS.NONE,MISC_FLAGS.NONE,20);
    throw2.addFrame(player,0,"",folder + "/x-throw-1-4.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE);



    var k1 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"light kick",5,[BUTTONS.LIGHT_KICK]);
    k1.ButtonSequence.push([{Button:BUTTONS.LIGHT_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    k1.ButtonCount = 1;
    k1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING);
    k1.Flags = {Pose:POSE_FLAGS.STANDING};
    k1.addFrame(player,0,"",folder + "/x-k1-0.png",3,MISC_FLAGS.NONE,{ Player: PLAYER_FLAGS.MOBILE },0,0,0,0,0,10);
    k1.addFrame(player,0,"",folder + "/x-k1-1.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,60);
    k1.addFrame(player,0,"",folder + "/x-k1-2.png",7,{ SwingSound:SWINGSOUND.LP,Combat: COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.LK },MISC_FLAGS.NONE,0,0,0,10,null,80,0,ATTACK_FLAGS.LIGHT,[{ state: HIT_FLAGS.LOW,x: 200,y: 135 },{ state: HIT_FLAGS.LOW,x: 250,y: 85}],ATTACK_FLAGS.LIGHT,1,1,10);
    k1.endBlock();
    k1.addFrame(player,0,"",folder + "/x-k1-1.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,60);
    k1.addFrame(player,0,"",folder + "/x-k1-4.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,0);

    var k2 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"medium kick",5,[BUTTONS.MEDIUM_KICK]);
    k2.ButtonSequence.push([{Button:BUTTONS.MEDIUM_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    k2.ButtonCount = 1;
    k2.Flags = {Pose:POSE_FLAGS.STANDING};
    k2.setMediumAttack();
    k2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.AIRBORNE);
    k2.addFrame(player,0,"",folder + "/x-k1-1.png",4,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,0,10);
    k2.addFrame(player,0,"",folder + "/x-k2-2.png",7,{SwingSound:SWINGSOUND.MP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1},MISC_FLAGS.NONE,0,0,0,10,null,80,0,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.HIGH,x:160,y:135},{state:HIT_FLAGS.HIGH,x:200,y:135},{state:HIT_FLAGS.HIGH,x:200,y:285}],ATTACK_FLAGS.MEDIUM,CONSTANTS.FIRST_HIT,1,8);
    k2.addFrame(player,0,"",folder + "/x-k2-3.png",5,{SwingSound:SWINGSOUND.MP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1},MISC_FLAGS.NONE,0,0,0,10,null,80,0,ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:160,y:135},{state:HIT_FLAGS.LOW,x:200,y:135},{state:HIT_FLAGS.LOW,x:270,y:205}],ATTACK_FLAGS.MEDIUM,CONSTANTS.SECOND_HIT,1,8);
    k2.endBlock();
    k2.addFrame(player,0,"",folder + "/x-k1-1.png",3,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,40);
    k2.addFrame(player,0,"",folder + "/x-k1-0.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,0);

    var fwd_k2 = player.addAnimation(POSE_FLAGS.WALKING_FORWARD,"forward medium kick",5,[BUTTONS.MEDIUM_KICK]);
    fwd_k2.ButtonSequence.push([{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.MEDIUM_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    fwd_k2.ButtonCount = 2;
    fwd_k2.Flags = {Pose:POSE_FLAGS.STANDING};
    fwd_k2.setMediumAttack();
    fwd_k2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING);
    fwd_k2.Vy = (100);
    fwd_k2.Vx = (25);
    fwd_k2.addFrame(player,0,"",folder + "/x-hk-0.png",2,{Pose:POSE_FLAGS.AIRBORNE},{Player:PLAYER_FLAGS.MOBILE});
    fwd_k2.addFrame(player,0,"",folder + "/x-hk-1.png",3,MISC_FLAGS.NONE,0,0,100);
    fwd_k2.addFrame(player,0,"",folder + "/x-hk-2.png",4,MISC_FLAGS.NONE,0,0,-50);
    fwd_k2.addFrame(player,0,"",folder + "/x-jump-k3-2.png",2,MISC_FLAGS.NONE,0,0,0);
    fwd_k2.addFrame(player,0,"",folder + "/x-jump-k3-3.png",2,MISC_FLAGS.NONE,0,0,0);
    fwd_k2.addFrameWithSound(player,1,"audio/ryu/thrust-0.zzz",0,"",folder + "/x-jump-k3-4.png",4,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MK},MISC_FLAGS.NONE,0,-40,0,10,null,0,0,ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:180,y:135},{state:HIT_FLAGS.LOW,x:80,y:135}],ATTACK_FLAGS.MEDIUM,1,1,10);
    fwd_k2.endBlock();
    fwd_k2.addFrame(player,0,"",folder + "/x-jump-k3-5.png",2,MISC_FLAGS.NONE,0,0,0);
    fwd_k2.addFrame(player,0,"",folder + "/x-jump-k3-6.png",4);
    fwd_k2.addFrame(player,0,"",folder + "/x-jump-2.png",4);
    fwd_k2.addFrame(player,0,"",folder + "/x-jump-1.png",CONSTANTS.FRAME_MAX);


    var k3 = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"hard kick",5,[BUTTONS.HARD_KICK]);
    k3.ButtonSequence.push([{Button:BUTTONS.HARD_KICK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    k3.ButtonCount = 1;
    k3.Flags = {Pose:POSE_FLAGS.STANDING};
    k3.setHardAttack();
    k3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.AIRBORNE);
    k3.addFrame(player,0,"",folder + "/x-k3-1.png",3,{Player:PLAYER_FLAGS.MOVE_TO_BACK},{Player:PLAYER_FLAGS.MOBILE},0,0,0,0,0,40);
    k3.addFrame(player,0,"",folder + "/x-k3-2.png",4,{SwingSound:SWINGSOUND.LP,Combat:COMBAT_FLAGS.ATTACK,Pose: POSE_FLAGS.ALLOW_INTERUPT_1,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,10,null,10,0,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.HIGH,x:180,y:235}],ATTACK_FLAGS.HARD,1,1,20);
    k3.addFrame(player,0,"",folder + "/x-k3-3.png",6,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,10,null,-10,0,ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.HIGH,x:180,y:235},{state:HIT_FLAGS.HIGH,x:130,y:185}],ATTACK_FLAGS.HARD,1,1,20);
    k3.endBlock();
    k3.addFrame(player,0,"",folder + "/x-k3-4.png",3,{Player:PLAYER_FLAGS.MOVE_TO_FRONT},MISC_FLAGS.NONE,0,0,0,0,0,0);
    k3.addFrame(player,0,"",folder + "/x-k3-5.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,0,0);

    var walkSpeed = 4;
    var f_walk = player.addAnimation(POSE_FLAGS.STANDING,"f-walk",0,[BUTTONS.FORWARD],90,false);
    f_walk.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED}]);
    f_walk.ButtonCount = 1;
    f_walk.AdjustShadowPosition = (false);
    f_walk.Flags = ({Player:PLAYER_FLAGS.LOOP_IF_KEYDOWN | PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.WALKING_FORWARD});
    f_walk.addRepeatingFrame(player,0,"",folder + "/x-crouch-0.png",3,{Player:PLAYER_FLAGS.MOBILE},MISC_FLAGS.NONE,walkSpeed,0,0,0,18);
    f_walk.addRepeatingFrame(player,0,"",folder + "/x-f-walk-1.png",4,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,walkSpeed,0,0,0,0);
    f_walk.addRepeatingFrame(player,0,"",folder + "/x-k2-1.png",4,{Plyer:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,walkSpeed,0,0,0,3);
    f_walk.addRepeatingFrame(player,0,"",folder + "/x-f-walk-3.png",4,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,walkSpeed,0,0,0,23);
    f_walk.addRepeatingFrame(player,0,"",folder + "/x-f-walk-4.png",4,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,walkSpeed,0,0,0,32);
    f_walk.addRepeatingFrame(player,0,"",folder + "/x-f-walk-5.png",4,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,walkSpeed,0,0,0,28);

    var backpeddleSpeed = 3;
    var b_walk = player.addAnimation(POSE_FLAGS.STANDING,"b-walk",0,[BUTTONS.BACK],80,false);
    b_walk.ButtonSequence.push([{Button:BUTTONS.FORWARD,State:BUTTON_STATE.NONE},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    b_walk.ButtonCount = 1;
    b_walk.AdjustShadowPosition = (false);
    b_walk.Flags = ({Player:PLAYER_FLAGS.LOOP_IF_KEYDOWN | PLAYER_FLAGS.HOLD_ZINDEX,Pose:POSE_FLAGS.WALKING_BACKWARD});
    b_walk.addRepeatingFrame(player,0,"",folder + "/x-b-walk-1.png",4,{Player:PLAYER_FLAGS.MOBILE},MISC_FLAGS.NONE,-backpeddleSpeed,0,0,0,0);
    b_walk.addRepeatingFrame(player,0,"",folder + "/x-b-walk-2.png",7,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,-backpeddleSpeed);
    b_walk.addRepeatingFrame(player,0,"",folder + "/x-b-walk-3.png",7,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,-backpeddleSpeed);
    b_walk.addRepeatingFrame(player,0,"",folder + "/x-b-walk-4.png",7,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,-backpeddleSpeed);
    b_walk.addRepeatingFrame(player,0,"",folder + "/x-b-walk-5.png",7,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,-backpeddleSpeed,0,0,0,-13);
    b_walk.addRepeatingFrame(player,0,"",folder + "/x-b-walk-6.png",7,{Player:PLAYER_FLAGS.MUST_HOLD_KEY},MISC_FLAGS.NONE,-backpeddleSpeed,0,0,0,-16);

    var uppercutVelocityY = 120;
    var uppercutVelocityYRate = 50;

    var uppercut_land = player.addAnimation(MISC_FLAGS.NONE,"uppercut landing",200,["uppercut-landing"],0,false,false);
    uppercut_land.addFrameWithSound(player,1,"audio/misc/jump-land.zzz",0,"",folder + "/x-uppercut-p1-6.png",4,{Player:PLAYER_FLAGS.MOBILE},MISC_FLAGS.NONE);
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

        uppercut.EnergyToAdd = 5;
        uppercut.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.SHORYUKEN,OVERRIDE_FLAGS.ALL | OVERRIDE_FLAGS.THROW);

        /*the following function will be executed each frame to compute the X coordinate of this move*/
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
            /*the following object will be passed in to the function that will be used to compute the X coordinate*/
            uppercut.VxFnArgs = {xMax:30,xMin:3,xInc:1.8,valueMax:10};
        }
        else if(x == 1)
        {
            uppercut.Vy = (190);
            /*the following object will be passed in to the function that will be used to compute the X coordinate*/
            uppercut.VxFnArgs = {xMax:40,xMin:3,xInc:1.8,valueMax:10};
        }
        else if(x == 2)
        {
            uppercut.Vy = (220);
            /*the following object will be passed in to the function that will be used to compute the X coordinate*/
            uppercut.VxFnArgs = {xMax:70,xMin:3,xInc:1.8,valueMax:10};
        }

        uppercut.addFrame(player,0,"",folder + "/x-uppercut-p1-1.png",3,{Combat:COMBAT_FLAGS.CAN_BE_BLOCKED | COMBAT_FLAGS.STOP_SLIDE_BACK,Player:PLAYER_FLAGS.IGNORE_PROJECTILES,HitSound:HITSOUND.HP3},{Player:PLAYER_FLAGS.MOBILE});
        uppercut.addFrameWithSound(player,1,"audio/ryu/shoryuken.zzz",0,"",folder + "/x-uppercut-p1-2.png",3,{Combat:COMBAT_FLAGS.ATTACK,Player:PLAYER_FLAGS.IGNORE_PROJECTILES,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,75,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.LOW,x:170,y:177}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,25);
        uppercut.addFrame(player,0,"",folder + "/x-uppercut-p1-3.png",1,{Combat:COMBAT_FLAGS.ATTACK,Player:PLAYER_FLAGS.IGNORE_PROJECTILES,Pose:POSE_FLAGS.AIRBORNE,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,75,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.HIGH,x:130,y:127},{state:HIT_FLAGS.HIGH,x:110,y:227},{state:HIT_FLAGS.HIGH,x:100,y:322}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,25);
        if(x == 0)
            uppercut.addFrame(player,0,"",folder + "/x-uppercut-p1-3.png",10,{Combat:COMBAT_FLAGS.ATTACK,Player:PLAYER_FLAGS.IGNORE_PROJECTILES,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,75,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.HIGH,x:130,y:127},{state:HIT_FLAGS.HIGH,x:110,y:227},{state:HIT_FLAGS.HIGH,x:100,y:322}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,25);
        else if(x == 1)
            uppercut.addFrame(player,0,"",folder + "/x-uppercut-p1-3.png",14,{Combat:COMBAT_FLAGS.ATTACK,Player:PLAYER_FLAGS.IGNORE_PROJECTILES,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,75,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.HIGH,x:130,y:127},{state:HIT_FLAGS.HIGH,x:110,y:227},{state:HIT_FLAGS.HIGH,x:100,y:322}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,25);
        else if(x == 2)
            uppercut.addFrame(player,0,"",folder + "/x-uppercut-p1-3.png",18,{Combat:COMBAT_FLAGS.ATTACK,Player:PLAYER_FLAGS.IGNORE_PROJECTILES,HitSound:HITSOUND.HP3},MISC_FLAGS.NONE,0,0,0,75,null,0,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.KNOCKDOWN,[{state:HIT_FLAGS.HIGH,x:130,y:127},{state:HIT_FLAGS.HIGH,x:110,y:227},{state:HIT_FLAGS.HIGH,x:100,y:322}],ATTACK_FLAGS.MEDIUM|ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,25);
        uppercut.endBlock();
        uppercut.addFrame(player,0,"",folder + "/x-uppercut-p1-4.png",5,{Player: PLAYER_FLAGS.IGNORE_MOVE_OVERRIDE},{Combat:COMBAT_FLAGS.CAN_BE_AIR_BLOCKED});
        uppercut.addFrame(player,0,"",folder + "/x-uppercut-p1-5.png",CONSTANTS.FRAME_MAX,{Player: PLAYER_FLAGS.IGNORE_MOVE_OVERRIDE},MISC_FLAGS.NONE);
        uppercut.chain(uppercut_land);
    }


    var jumpX = 32;
    var jumpY = 200;

    var jump = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"jump",0,[BUTTONS.JUMP],95,false);
    jump.ButtonSequence.push([{Button:BUTTONS.JUMP,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.NONE}]);
    jump.ButtonCount = 1;
    jump.UseJumpSpeed = true;
    jump.Vy = (jumpY);

    jump.addRepeatingFrame(player,0,"",folder + "/x-crouch-0.png",4);
    jump.addRepeatingFrame(player,0,"",folder + "/x-jump-1.png",6,{ Pose: POSE_FLAGS.AIRBORNE }).clip({Bottom:80});;
    jump.addRepeatingFrame(player,0,"",folder + "/x-jump-2.png",6).clip({Bottom:80});
    jump.addRepeatingFrame(player,0,"",folder + "/x-jump-3.png",6);
    jump.addRepeatingFrame(player,0,"",folder + "/x-jump-4.png",6);
    jump.addRepeatingFrame(player,0,"",folder + "/x-jump-3.png",6);
    jump.addRepeatingFrame(player,0,"",folder + "/x-jump-2.png",6);
    jump.addRepeatingFrame(player,0,"",folder + "/x-jump-1.png",CONSTANTS.FRAME_MAX);
    jump.chain(jump_land);

    var airKnockBackX = 1;

    
    var jump_p1 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump p1",5,[BUTTONS.LIGHT_PUNCH],0,true,true);
    jump_p1.ButtonSequence.push([{Button:[BUTTONS.LIGHT_PUNCH],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_p1.ButtonCount = 1;
    jump_p1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_p1.addFrame(player,0,"",folder + "/x-jump-p1-1.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    jump_p1.addFrame(player,0,"",folder + "/x-jump-p1-2.png",24,{Pose:POSE_FLAGS.ALLOW_INTERUPT_1,SwingSound:SWINGSOUND.LP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.LP},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.LIGHT,[{state:HIT_FLAGS.LOW,x:160,y:75,Fx : airKnockBackX,Fy : 0}],ATTACK_FLAGS.LIGHT,1,1,10);
    jump_p1.endBlock();
    jump_p1.addFrame(player,0,"",folder + "/x-jump-p1-1.png",CONSTANTS.FRAME_MAX);
    jump_p1.chain(jump_land);
      
    var f_jump_p2 = player.addAnimation(POSE_FLAGS.AIRBORNE_FB,"forward jump p2",20,[BUTTONS.FORWARD|BUTTONS.MEDIUM_PUNCH],0,true,true);
    f_jump_p2.ButtonSequence.push([{Button:[BUTTONS.FORWARD],State:BUTTON_STATE.PRESSED},{Button:[BUTTONS.MEDIUM_PUNCH],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    f_jump_p2.ButtonCount = 2;
    f_jump_p2.setMediumAttack();
    f_jump_p2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    f_jump_p2.addFrame(player,0,"",folder + "/x-f-jump-p2-1.png",3,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    f_jump_p2.addFrame(player,0,"",folder + "/x-f-jump-p2-2.png",1);
    f_jump_p2.addFrame(player,0,"",folder + "/x-f-jump-p2-3.png",3);
    f_jump_p2.addFrame(player,0,"",folder + "/x-f-jump-p2-4.png",2,{Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:180,y:105,Fx : airKnockBackX,Fy : 0}],ATTACK_FLAGS.MEDIUM,CONSTANTS.FIRST_HIT,1,8);
    f_jump_p2.addFrame(player,0,"",folder + "/x-f-jump-p2-5.png",12,{Pose:POSE_FLAGS.ALLOW_INTERUPT_1,SwingSound:SWINGSOUND.MP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:160,y:225,Fx : airKnockBackX,Fy : 0},{state:HIT_FLAGS.LOW,x:160,y:155,Fx : airKnockBackX,Fy : 0}],ATTACK_FLAGS.MEDIUM,CONSTANTS.SECOND_HIT,1,8);
    f_jump_p2.endBlock();
    f_jump_p2.addFrame(player,0,"",folder + "/x-f-jump-p2-4.png",2);
    f_jump_p2.addFrame(player,0,"",folder + "/x-f-jump-p2-3.png",2);
    f_jump_p2.addFrame(player,0,"",folder + "/x-f-jump-p2-2.png",3);
    f_jump_p2.addFrame(player,0,"",folder + "/x-f-jump-p2-1.png",CONSTANTS.FRAME_MAX);
    f_jump_p2.chain(jump_land);
    
    var jump_p2 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump p2",5,[BUTTONS.MEDIUM_PUNCH],0,true,true);
    jump_p2.ButtonSequence.push([{Button:[BUTTONS.MEDIUM_PUNCH],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_p2.ButtonCount = 1;
    jump_p2.setMediumAttack();
    jump_p2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_p2.addFrame(player,0,"",folder + "/x-jump-p1-1.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    jump_p2.addFrame(player,0,"",folder + "/x-jump-p2-1.png",2);
    jump_p2.addFrame(player,0,"",folder + "/x-jump-p2-2.png",15,{Pose:POSE_FLAGS.ALLOW_INTERUPT_1,SwingSound:SWINGSOUND.MP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MP},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:180,y:55,Fx : airKnockBackX,Fy : 0}],ATTACK_FLAGS.MEDIUM,1,1,15);
    jump_p2.endBlock();
    jump_p2.addFrame(player,0,"",folder + "/x-jump-p1-1.png",CONSTANTS.FRAME_MAX);
    jump_p2.chain(jump_land);
  
    var jump_p3 = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB,"jump p3",5,[BUTTONS.HARD_PUNCH],0,true,true);
    jump_p3.ButtonSequence.push([{Button:[BUTTONS.HARD_PUNCH],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_p3.ButtonCount = 1;
    jump_p3.setHardAttack();
    jump_p3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_p3.addFrame(player,0,"",folder + "/x-jump-p1-1.png",3,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    jump_p3.addFrame(player,0,"",folder + "/x-jump-p2-1.png",3);
    jump_p3.addFrame(player,0,"",folder + "/x-jump-p2-2.png",6,{Pose:POSE_FLAGS.ALLOW_INTERUPT_1,SwingSound:SWINGSOUND.HP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HP},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:180,y:55,Fx : airKnockBackX,Fy : 0}],ATTACK_FLAGS.HARD,1,1,20);
    jump_p3.endBlock();
    jump_p3.addFrame(player,0,"",folder + "/x-jump-p1-1.png",CONSTANTS.FRAME_MAX);
    jump_p3.chain(jump_land);
    
    var jump_k1 = player.addAnimation(POSE_FLAGS.AIRBORNE,"jump k1",5,[BUTTONS.LIGHT_KICK],0,true,true);
    jump_k1.ButtonSequence.push([{Button:[BUTTONS.LIGHT_KICK],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_k1.ButtonCount = 1;
    jump_k1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_k1.addFrame(player,0,"",folder + "/x-jump-k1-1.png",3,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    jump_k1.addFrame(player,0,"",folder + "/x-jump-k1-2.png",24,{Pose:POSE_FLAGS.ALLOW_INTERUPT_1,SwingSound:SWINGSOUND.LP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.LK},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.LIGHT,[{state:HIT_FLAGS.LOW,x:140,y:235,Fx : airKnockBackX,Fy : 0},{state:HIT_FLAGS.LOW,x:90,y:155,Fx : airKnockBackX,Fy : 0}],ATTACK_FLAGS.LIGHT,1,1,10);
    jump_k1.endBlock();
    jump_k1.addFrame(player,0,"",folder + "/x-jump-k1-3.png",3);
    jump_k1.addFrame(player,0,"",folder + "/x-jump-k1-1.png",CONSTANTS.FRAME_MAX);
    jump_k1.chain(jump_land);
    
    var jump_k2 = player.addAnimation(POSE_FLAGS.AIRBORNE,"jump k2",5,[BUTTONS.MEDIUM_KICK],0,true,true);
    jump_k2.ButtonSequence.push([{Button:[BUTTONS.MEDIUM_KICK],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_k2.ButtonCount = 1;
    jump_k2.setMediumAttack();
    jump_k2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_k2.addFrame(player,0,"",folder + "/x-jump-k1-1.png",3,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    jump_k2.addFrame(player,0,"",folder + "/x-jump-k1-2.png",4,{Pose:POSE_FLAGS.ALLOW_INTERUPT_1,SwingSound:SWINGSOUND.MP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MK},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:140,y:235,Fx : airKnockBackX,Fy : 0},{state:HIT_FLAGS.LOW,x:90,y:155,Fx : airKnockBackX,Fy : 0}],ATTACK_FLAGS.MEDIUM,1,1,15);
    jump_k2.endBlock();
    jump_k2.addFrame(player,0,"",folder + "/x-jump-k1-3.png",5);
    jump_k2.addFrame(player,0,"",folder + "/x-jump-k1-1.png",1);
    jump_k2.addFrame(player,0,"",folder + "/x-jump-2.png",2);
    jump_k2.addFrame(player,0,"",folder + "/x-jump-1.png",CONSTANTS.FRAME_MAX);
    jump_k2.chain(jump_land);
    
    var jump_k3 = player.addAnimation(POSE_FLAGS.AIRBORNE,"jump k3",5,[BUTTONS.HARD_KICK],0,true,true);
    jump_k3.ButtonSequence.push([{Button:[BUTTONS.HARD_KICK],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    jump_k3.ButtonCount = 1;
    jump_k3.setHardAttack();
    jump_k3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    jump_k3.addFrame(player,0,"",folder + "/x-jump-k3-1.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    jump_k3.addFrame(player,0,"",folder + "/x-jump-k3-2.png",3);
    jump_k3.addFrame(player,0,"",folder + "/x-jump-k3-3.png",4);
    jump_k3.addFrame(player,0,"",folder + "/x-jump-k3-4.png",6,{Pose:POSE_FLAGS.ALLOW_INTERUPT_1,SwingSound:SWINGSOUND.HP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:180,y:135,Fx : airKnockBackX,Fy : 0},{state:HIT_FLAGS.LOW,x:80,y:135,Fx : airKnockBackX,Fy : 0}],ATTACK_FLAGS.HARD,1,1,20);
    jump_k3.endBlock();
    jump_k3.addFrame(player,0,"",folder + "/x-jump-k3-5.png",4);
    jump_k3.addFrame(player,0,"",folder + "/x-jump-k3-6.png",3);
    jump_k3.addFrame(player,0,"",folder + "/x-jump-1.png",CONSTANTS.FRAME_MAX);
    jump_k3.chain(jump_land);
    
    var f_jump_k1 = player.addAnimation(POSE_FLAGS.AIRBORNE_FB,"f jump k1",5,[BUTTONS.LIGHT_KICK],0,true,true);
    f_jump_k1.ButtonSequence.push([{Button:[BUTTONS.LIGHT_KICK],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    f_jump_k1.ButtonCount = 1;
    f_jump_k1.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    f_jump_k1.addFrame(player,0,"",folder + "/x-f-jump-k1-1.png",4,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    f_jump_k1.addFrame(player,0,"",folder + "/x-f-jump-k1-2.png",4);
    f_jump_k1.addFrame(player,0,"",folder + "/x-f-jump-k1-3.png",CONSTANTS.FRAME_MAX,{Pose:POSE_FLAGS.ALLOW_INTERUPT_1,SwingSound:SWINGSOUND.LP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.LK},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.LIGHT,[{state:HIT_FLAGS.LOW,x:140,y:15,Fx : airKnockBackX,Fy : 0},{state:HIT_FLAGS.LOW,x:100,y:0,Fx : airKnockBackX,Fy : 0}],ATTACK_FLAGS.LIGHT,1,1,10);
    f_jump_k1.endBlock();
    f_jump_k1.chain(jump_land);
    
    var f_jump_k2 = player.addAnimation(POSE_FLAGS.AIRBORNE_FB,"f jump k2",5,[BUTTONS.MEDIUM_KICK],0,true,true);
    f_jump_k2.ButtonSequence.push([{Button:[BUTTONS.MEDIUM_KICK],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    f_jump_k2.ButtonCount = 1;
    f_jump_k2.setMediumAttack();
    f_jump_k2.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    f_jump_k2.addFrame(player,0,"",folder + "/x-f-jump-k1-1.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    f_jump_k2.addFrame(player,0,"",folder + "/x-f-jump-k3-1.png",3);
    f_jump_k2.addFrame(player,0,"",folder + "/x-f-jump-k3-2.png",12,{Pose:POSE_FLAGS.ALLOW_INTERUPT_1,SwingSound:SWINGSOUND.MP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.MK},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.MEDIUM,[{state:HIT_FLAGS.LOW,x:230,y:0,Fx : airKnockBackX,Fy : 0},{state:HIT_FLAGS.LOW,x:130,y:20,Fx : airKnockBackX,Fy : 0}, {state:HIT_FLAGS.LOW,x:0,y:40,Fx : airKnockBackX,Fy : 0}],ATTACK_FLAGS.MEDIUM,1,1,15);
    f_jump_k2.endBlock();
    f_jump_k2.addFrame(player,0,"",folder + "/x-f-jump-k3-1.png",5);
    f_jump_k2.addFrame(player,0,"",folder + "/x-f-jump-k1-1.png",CONSTANTS.FRAME_MAX);
    f_jump_k2.chain(jump_land);
    
    var f_jump_k3 = player.addAnimation(POSE_FLAGS.AIRBORNE_FB,"f jump k3",5,[BUTTONS.HARD_KICK],0,true,true);
    f_jump_k3.ButtonSequence.push([{Button:[BUTTONS.HARD_KICK],State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);
    f_jump_k3.ButtonCount = 1;
    f_jump_k3.setHardAttack();
    f_jump_k3.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
    f_jump_k3.addFrame(player,0,"",folder + "/x-f-jump-k1-1.png",2,MISC_FLAGS.NONE,{Player:PLAYER_FLAGS.MOBILE});
    f_jump_k3.addFrame(player,0,"",folder + "/x-f-jump-k3-1.png",2);
    f_jump_k3.addFrame(player,0,"",folder + "/x-f-jump-k3-2.png",6,{Pose:POSE_FLAGS.ALLOW_INTERUPT_1,SwingSound:SWINGSOUND.HP,Combat:COMBAT_FLAGS.ATTACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,10,null,0,0,ATTACK_FLAGS.HITS_HIGH|ATTACK_FLAGS.HARD,[{state:HIT_FLAGS.LOW,x:230,y:0,Fx : airKnockBackX,Fy : 0},{state:HIT_FLAGS.LOW,x:130,y:20,Fx : airKnockBackX,Fy : 0}],ATTACK_FLAGS.HARD,1,1,15);
    f_jump_k3.endBlock();
    f_jump_k3.addFrame(player,0,"",folder + "/x-f-jump-k3-1.png",6);
    f_jump_k3.addFrame(player,0,"",folder + "/x-f-jump-k1-1.png",CONSTANTS.FRAME_MAX);
    f_jump_k3.chain(jump_land);


    var f_jump = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"forward jump",0,[BUTTONS.FORWARD|BUTTONS.JUMP],95,false);
    f_jump.ButtonSequence.push([{Button:BUTTONS.BACK,State:BUTTON_STATE.NONE},{Button:BUTTONS.JUMP,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED}]);
    f_jump.ButtonCount = 2;
    f_jump.AdjustShadowPosition = (false);
    f_jump.UseJumpSpeed = true;
    f_jump.Vx = (jumpX);
    f_jump.Vy = (jumpY);

    f_jump.addRepeatingFrame(player,0,"",folder + "/x-crouch-0.png",4);
    f_jump.addRepeatingFrame(player,0,"",folder + "/x-jump-1.png",3,{Pose: POSE_FLAGS.AIRBORNE_FB},MISC_FLAGS.NONE,0,-1);
    f_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-2.png",12,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,-1).clip({Bottom:125});
    f_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-3.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,80);
    f_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-3.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0);
    f_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-4.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,-14);
    f_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-4.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0);
    f_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-5.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,-12,0,0,-50);
    f_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-5.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-50);
    f_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-6.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,-12,0,0,0);
    f_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-6.png",5,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0);
    f_jump.addRepeatingFrame(player,0,"",folder + "/x-jump-1.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,-12);
    f_jump.addRepeatingFrame(player,0,"",folder + "/x-jump-1.png",CONSTANTS.FRAME_MAX,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0);
    f_jump.chain(jump_land);


    var b_jump = player.addAnimation(POSE_FLAGS.STANDING | POSE_FLAGS.WALKING_FORWARD | POSE_FLAGS.WALKING_BACKWARD,"back jump",0,[BUTTONS.BACK | BUTTONS.JUMP],95,false);
    b_jump.ButtonSequence.push([{Button:BUTTONS.FORWARD,State:BUTTON_STATE.NONE},{Button:BUTTONS.JUMP,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED}]);
    b_jump.ButtonCount = 2;
    b_jump.AdjustShadowPosition = (false);
    b_jump.UseJumpSpeed = true;
    b_jump.Vx = (-jumpX);
    b_jump.Vy = (jumpY);

    b_jump.addRepeatingFrame(player,0,"",folder + "/x-crouch-0.png",4);
    b_jump.addRepeatingFrame(player,0,"",folder + "/x-jump-1.png",1,{Pose: POSE_FLAGS.AIRBORNE_FB},MISC_FLAGS.NONE,0,-1);
    b_jump.addRepeatingFrame(player,0,"",folder + "/x-jump-1.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,-1);
    b_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-6.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0);
    b_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-6.png",8,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0).clip({Bottom:125});
    b_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-5.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,74);
    b_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-5.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0);
    b_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-4.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,-12);
    b_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-4.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0);
    b_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-3.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,-12,0,0,-50);
    b_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-3.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0,0,0,-50);
    b_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-2.png",1,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,-80,0,0,0);
    b_jump.addRepeatingFrame(player,0,"",folder + "/x-f-jump-2.png",2,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0);
    b_jump.addRepeatingFrame(player,0,"",folder + "/x-jump-1.png",CONSTANTS.FRAME_MAX,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0).clip({Bottom:125});
    b_jump.chain(jump_land);

    var xSpeed = 0;
    for(var x = 0; x < 3; ++x)
    {
        xSpeed = x + 10;
        var projectile = player.addProjectile("projectile p"+ (x+1),160,140,xSpeed);
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

        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectile-1.png",1,0,0,30).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectile-2.png",2,0,0,0).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectile-3.png",1,0,0,50).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectile-4.png",2,0,0,0).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectile-5.png",1,0,0,30).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectile-6.png",2,0,0,0).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectile-7.png",1,0,0,40).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectile-8.png",2,0,0,0).clip({Front:70,Back:70});

        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/x-fb-projectile-hit-0.png",3,0,0,-32);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/x-fb-projectile-hit-1.png",3,0,0,-44);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/x-fb-projectile-hit-2.png",3,0,0,-20);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/x-fb-projectile-hit-3.png",3,0,0,-6);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/x-fb-projectile-hit-4.png",3,0,0,-2);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/x-fb-projectile-hit-5.png",3,0,0,0);

        
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
        fireball.Flags = ({Combat:COMBAT_FLAGS.PROJECTILE_ACTIVE});
        fireball.addFrame(player,0,"",folder + "/x-fb-0.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},{Player:PLAYER_FLAGS.MOBILE});
        fireball.addFrame(player,0,"168",folder + "/x-fb-1.png",6,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrame(player,0,"200",folder + "/x-fb-2.png",2,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        fireball.addFrameWithSound(player,1,"audio/ryu/haduken.zzz",0,"200",folder + "/x-fb-3.png",1,{Combat:COMBAT_FLAGS.PENDING_ATTACK|COMBAT_FLAGS.SPAWN_PROJECTILE|COMBAT_FLAGS.PROJECTILE_ACTIVE|COMBAT_FLAGS.STOP_SLIDE_BACK},0,0,0,0,0,player.Projectiles.length-1);
        fireball.addFrameWithSound(player,1,"audio/misc/projectile-0.zzz",0,"200",folder + "/x-fb-3.png",29,MISC_FLAGS.NONE,{Combat:COMBAT_FLAGS.CAN_BE_BLOCKED});
        fireball.addFrame(player,0,"",folder + "/x-k1-4.png",5);
    }

    var k1_spinkickX = 2.0;
    for(var x = 0; x < 3; ++x)
    {
        var button = BUTTONS.LIGHT_KICK;
        if(x == 1) button = BUTTONS.MEDIUM_KICK;
        else if(x == 2) button = BUTTONS.HARD_KICK;

        var spinkick = player.addAnimation(POSE_FLAGS.AIRBORNE|POSE_FLAGS.AIRBORNE_FB|POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"spinkick k" + (x+1),25,[BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.BACK,BUTTONS.BACK,BUTTONS.BACK|button],0,true,true);
        spinkick.ButtonCount = 5;
        spinkick.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED}]);
        spinkick.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        spinkick.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.NONE},{Button:BUTTONS.BACK,State:BUTTON_STATE.PRESSED},{Button:button,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);

        spinkick.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.STANDING,OVERRIDE_FLAGS.NULL);
        spinkick.EnergyToAdd = 5;
        spinkick.IsSpecialMove = true;
        spinkick.MaintainYPosition = true;
        spinkick.AdjustShadowPosition = (false);
        spinkick.UserData = { Type: USER_DATA_TYPES.OFFSET,clipTop: 0,clipBottom: 120 };
        spinkick.Vy = (100);
        spinkick.Vx = (20);

        /*the following object will be passed in to the function that will be used to compute the X coordinate*/
        spinkick.VxFnArgs = {};
        /*the following function will be executed each frame to compute the X coordinate of this move*/
        spinkick.vxFn = (function(args) { return function(dx,t) { return dx * 2; } });

        spinkick.vxAirFn = (function(args) { return function(dx,t) { return (!dx ? 1 : dx) * 1.5; } });
        spinkick.vyAirFn = (function(args) { return function(dy,t) { return dy; } });
        
        var hit = 0;
        var nbFrames = 2;
        var baseDamage = 20;
        var rearFlags = ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2|ATTACK_FLAGS.HARD;
        spinkick.addFrameWithSound(player,1,"audio/ryu/spinkick.zzz",0,"",folder + "/x-hk-0.png",1,{Combat:COMBAT_FLAGS.PENDING_ATTACK,Pose:POSE_FLAGS.AIRBORNE,HitSound:HITSOUND.HK},{Player:PLAYER_FLAGS.MOBILE}).clip({Bottom:120});
        spinkick.addFrame(player,0,"",folder + "/x-hk-0.png",1,{Combat:COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE).clip({Bottom:120});
        spinkick.addFrame(player,0,"",folder + "/x-hk-1.png",3,{Combat:COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,70).clip({Bottom:120});
        spinkick.addFrame(player,0,"",folder + "/x-hk-2.png",2,{Combat:COMBAT_FLAGS.PENDING_ATTACK},MISC_FLAGS.NONE,0,-20).clip({Bottom:120});
        spinkick.addFrameWithSound(player,1,"audio/misc/spinkick-0.zzz",0,"",folder + "/x-hk-3.png",2,{Pose:POSE_FLAGS.HOLD_AIRBORNE,Combat:COMBAT_FLAGS.ATTACK|COMBAT_FLAGS.PENDING_ATTACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,baseDamage,null,40,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.TRIP,[{state:HIT_FLAGS.LOW,x:230,y:97},{state:HIT_FLAGS.LOW,x:140,y:97},{state:HIT_FLAGS.LOW,x:230,y:127},{state:HIT_FLAGS.LOW,x:140,y:127}],rearFlags,CONSTANTS.FIRST_HIT,CONSTANTS.SINGLE,1,2).clip({Bottom:120});
        spinkick.addFrame(player,0,"",folder + "/x-hk-4.png",2,{Combat:COMBAT_FLAGS.PENDING_ATTACK,Pose:POSE_FLAGS.HOLD_AIRBORNE}).clip({Bottom:120});
        spinkick.addFrame(player,0,"",folder + "/x-hk-5.png",2,{Pose:POSE_FLAGS.HOLD_AIRBORNE,Combat:COMBAT_FLAGS.ATTACK|COMBAT_FLAGS.PENDING_ATTACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,baseDamage,null,-60,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.TRIP,[{state:HIT_FLAGS.LOW,x:-60,y:97 },{ state:HIT_FLAGS.LOW,x:-30,y:97},{state:HIT_FLAGS.LOW,x:-60,y:127},{state:HIT_FLAGS.LOW,x:30,y:127}],rearFlags,++hit,CONSTANTS.SINGLE,1,2).clip({Bottom:120});
        spinkick.addFrame(player,0,"",folder + "/x-hk-6.png",2,{Combat:COMBAT_FLAGS.PENDING_ATTACK,Pose:POSE_FLAGS.HOLD_AIRBORNE},0,0,0,0,0,null,+40).clip({Bottom:120});

        for(var i = 0; i < (1 + x); ++i)
        {
            spinkick.addFrameWithSound(player,1,"audio/misc/spinkick-0.zzz",0,"",folder + "/x-hk-3.png",2,{Pose:POSE_FLAGS.HOLD_AIRBORNE,Combat:COMBAT_FLAGS.ATTACK|COMBAT_FLAGS.PENDING_ATTACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,baseDamage,null,40,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.TRIP,[{state:HIT_FLAGS.LOW,x:230,y:97 },{ state:HIT_FLAGS.LOW,x:140,y:97},{state:HIT_FLAGS.LOW,x:230,y:127},{state:HIT_FLAGS.LOW,x:140,y:127}],rearFlags,++hit,CONSTANTS.SINGLE,1,2).clip({Bottom:120});
            spinkick.addFrame(player,0,"",folder + "/x-hk-4.png",2,{Combat:COMBAT_FLAGS.PENDING_ATTACK,Pose:POSE_FLAGS.HOLD_AIRBORNE}).clip({Bottom:120});
            spinkick.addFrame(player,0,"",folder + "/x-hk-5.png",2,{Pose:POSE_FLAGS.HOLD_AIRBORNE,Combat:COMBAT_FLAGS.ATTACK|COMBAT_FLAGS.PENDING_ATTACK,HitSound:HITSOUND.HK},MISC_FLAGS.NONE,0,0,0,baseDamage,null,-60,0,ATTACK_FLAGS.SPECIAL|ATTACK_FLAGS.HARD|ATTACK_FLAGS.TRIP,[{state:HIT_FLAGS.LOW,x:-30,y:97 },{ state:HIT_FLAGS.LOW,x:30,y:97},{state:HIT_FLAGS.LOW,x:-30,y:127},{state:HIT_FLAGS.LOW,x:30,y:127}],rearFlags,++hit,CONSTANTS.SINGLE,1,2).clip({Bottom:120});
            spinkick.addFrame(player,0,"",folder + "/x-hk-6.png",2,{Combat:COMBAT_FLAGS.PENDING_ATTACK,Pose:POSE_FLAGS.HOLD_AIRBORNE},MISC_FLAGS.NONE,0,0,0,0,null,+40).clip({Bottom:120});
        }

        spinkick.endBlock();
        spinkick.addFrameWithSound(player,1,"audio/misc/spinkick-0.zzz",0,"",folder + "/x-hk-7.png",4,MISC_FLAGS.NONE,{Combat:COMBAT_FLAGS.CAN_BE_AIR_BLOCKED},0,0);
        spinkick.addFrame(player,0,"",folder + "/x-hk-8.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0);
        spinkick.addFrame(player,0,"",folder + "/x-hk-9.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0);
        spinkick.addFrame(player,0,"",folder + "/x-hk-10.png",4,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0);
        spinkick.addFrame(player,0,"",folder + "/x-jump-1.png",CONSTANTS.MAX_FRAME,MISC_FLAGS.NONE,MISC_FLAGS.NONE,0,0);
        spinkick.chain(jump_land);
    }

    createRyuSuperMoves(player);
    player.sortAnimations();
    return player;
}


var createRyuSuperMoves = function(player)
{
    var folder = "images/misc/" + player.Folder;

    var speed = 13;
    for(var x = 0; x < 3; ++x)
    {
        var projectile = player.addProjectile("super projectile p" + (x+1),160,140,speed);
        projectile.HitSound = HITSOUND.HP;

        projectile.IsSuperMove = true;
        projectile.CanJuggle = true;
        projectile.MaxHits = x + 3;
        projectile.LocalHitStopData = {};
        projectile.DefaultLocalHitStop = 3;
        projectile.DefaultHitStop = 1;
        projectile.AttackState = ATTACK_FLAGS.HARD|ATTACK_FLAGS.FLOOR_AIRBORNE_HARD;
        projectile.HitState = HIT_FLAGS.LOW;
        projectile.FlagsToSend = ATTACK_FLAGS.HARD;
        projectile.EnergyToAdd = (10);
        projectile.Params = {EnemyHitStop:3};
        projectile.Params.Combo = COMBO_FLAGS.KNOCKDOWN_ON_MAX_HIT;

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

        var fOffset = -70;
        var f1 = fOffset + 70;
        var f2 = fOffset + 46;
        var f3 = fOffset + 76;
        var f4 = fOffset + 40;
        var f5 = fOffset + 96;
        var f6 = fOffset + 0;
        var f7 = fOffset + 78;
        var f8 = fOffset + 36;

        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectiles-super-1.png",1,0,0,f1).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectiles-super-2.png",2,0,0,f2).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectiles-super-3.png",1,0,0,f3).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectiles-super-4.png",2,0,0,f4).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectiles-super-5.png",1,0,0,f5).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectiles-super-6.png",2,0,0,f6).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectiles-super-7.png",1,0,0,f7).clip({Front:70,Back:70});
        projectile.Animation.addFrame(player,0,"",folder + "/x-fb-projectiles-super-8.png",2,0,0,f8).clip({Front:70,Back:70});

        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/x-fb-projectile-hit-0.png",3,0,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/x-fb-projectile-hit-1.png",3,0,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/x-fb-projectile-hit-2.png",3,0,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/x-fb-projectile-hit-3.png",3,0,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/x-fb-projectile-hit-4.png",3,0,0,0,0);
        projectile.DisintegrationAnimation.addFrame(player,0,"",folder + "/x-fb-projectile-hit-5.png",3,0,0,0,0);

        
        var button = BUTTONS.LIGHT_PUNCH;
        if(x == 1) {button = BUTTONS.MEDIUM_PUNCH;}
        else if(x == 2) {button = BUTTONS.HARD_PUNCH;}

        var s_fireball = player.addAnimation(POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.ALLOW_INTERUPT_1,"super fireball p" + (x+1),50,[BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.FORWARD,BUTTONS.FORWARD,0,BUTTONS.CROUCH,BUTTONS.CROUCH|BUTTONS.FORWARD,BUTTONS.FORWARD,BUTTONS.FORWARD|button],CONSTANTS.MAX_PRIORITY,true);
        s_fireball.IsProjectile = true;
        s_fireball.ButtonCount = 10;
        s_fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED}]);
        s_fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        s_fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        s_fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED}]);
        s_fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.PRESSED},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.NBINTERIM_FRAMES}]);
        s_fireball.ButtonSequence.push([{Button:BUTTONS.CROUCH,State:BUTTON_STATE.NONE},{Button:BUTTONS.FORWARD,State:BUTTON_STATE.PRESSED},{Button:button,State:BUTTON_STATE.PRESSED,MaxNbFrames:CONSTANTS.ATTACKBUTTON_FRAMES}]);

        s_fireball.IsSuperMove = true;
        s_fireball.OverrideFlags = new MoveOverrideFlags(OVERRIDE_FLAGS.NONE,OVERRIDE_FLAGS.NONE);


        s_fireball.EnergyToSubtract = CONSTANTS.ONE_LEVEL * (x + 1);
        s_fireball.EnergyToAdd = 5;
        s_fireball.Flags = ({Combat:COMBAT_FLAGS.PROJECTILE_ACTIVE});
        s_fireball.addFrameWithSound(player,1,"audio/ryu/sinku.zzz",0,"",folder + "/x-fb-0.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},{Player:PLAYER_FLAGS.MOBILE},0,0,0,25,0,0,0,null,0,0,0,-CONSTANTS.ONE_LEVEL*(x+1));
        s_fireball.addFrame(player,0,"",folder + "/x-fb-1.png",36,{Combat: COMBAT_FLAGS.PENDING_ATTACK});
        s_fireball.addFrame(player,0,"",folder + "/x-fb-2.png",1,{Combat: COMBAT_FLAGS.PENDING_ATTACK},{Combat:COMBAT_FLAGS.SUPER_MOVE_PAUSE});
        s_fireball.addFrameWithSound(player,1,"audio/ryu/haduken.zzz",0,"",folder + "/x-fb-3.png",1,{Combat:COMBAT_FLAGS.PENDING_ATTACK|COMBAT_FLAGS.SPAWN_PROJECTILE|COMBAT_FLAGS.PROJECTILE_ACTIVE},0,0,0,0,0,player.Projectiles.length-1);
        s_fireball.addFrameWithSound(player,1,"audio/misc/super-projectile-0.zzz",0,"",folder + "/x-fb-3.png",31,MISC_FLAGS.NONE,{Combat:COMBAT_FLAGS.CAN_BE_BLOCKED});
        s_fireball.addFrame(player,0,"",folder + "/x-k1-4.png",6);

        /*add an animation for the fireball charge up*/
        var fb_residue = new BasicAnimation("fireball charge",[],false,0,folder + "/misc-sprites.png");
        fb_residue.addEmptyFrame(player,0,1);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-0.png",3,0,142);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-1.png",1,-42,98);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-0.png",2,0,142);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-1.png",1,-42,98);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-0.png",1,0,142);

        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-2.png",2,-53,100);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-1.png",2,-42,98);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-1.png",2,-42,98);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-1.png",2,-42,98);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-3.png",2,-49,103);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-2.png",1,-53,100);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-3.png",1,-49,103);

        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-4.png",1,24,86);

        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-5.png",4,122,83);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-6.png",5,141,86);
        fb_residue.addFrame(player,folder + "/x-super-fireball-spark-7.png",4,141,86);

        s_fireball.addAnimation(fb_residue);

        /*add the trail for the super move*/
        
        var trail = CreateAnimationTrail([]);
        for(var trailIndex = 1; trailIndex < 3; ++trailIndex)
        {
            /*trail*/
            var s_fireball_trail = new GenericAnimation("super fireball trail");
            s_fireball_trail.addTrailFrame(player,folder + "/x-fb-0-shadow-" + trailIndex + ".png",4);
            s_fireball_trail.addTrailFrame(player,folder + "/x-fb-1-shadow-" + trailIndex + ".png",36);
            s_fireball_trail.addTrailFrame(player,folder + "/x-fb-2-shadow-" + trailIndex + ".png",4);
            s_fireball_trail.addTrailFrame(player,folder + "/x-fb-3-shadow-" + trailIndex + ".png",1);
            s_fireball_trail.addTrailFrame(player,folder + "/x-fb-3-shadow-" + trailIndex + ".png",CONSTANTS.FRAME_MAX);

            trail.add(s_fireball_trail,player.Element,player.Folder,player);
        }
        
        s_fireball.Trail = trail;

    }

}
