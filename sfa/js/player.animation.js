//Helper function - adds a projectile for the player
Player.prototype.addProjectile = function(name,offsetX, offsetY,vx,vy)
{
    var projectile = new Projectile(this,new Animation(0,name),new Animation(0,name + "-disintegrate"),offsetX,offsetY,vx,vy);
    this.Projectiles[this.Projectiles.length] = projectile;
    //projectile.Id = this.Id + "_" + this.Projectiles.length;

    return projectile;
}

// Helper function - adds a move for the player
// TODO: remove [duration] and [keySequence], they are no longer used
Player.prototype.addThrow = function(requiredState,name,duration,keySequence,priority,isAttack,allowAirBlock,behaviorFlags,invokedAnimationName)
{
    var key = this.Throws.length;
    this.Throws[key] = {};
    this.Throws[key] = new Animation(requiredState,name,duration,null,keySequence,null,priority,0,isAttack,allowAirBlock,behaviorFlags,invokedAnimationName);
    this.Throws[key].BaseAnimation.IsThrow = true;

    return this.Throws[key];
}

// Helper function - adds a move for the player
// TODO: remove [duration] and [keySequence], they are no longer used
Player.prototype.addAnimation = function(requiredState,name,duration,keySequence,priority,isAttack,allowAirBlock,behaviorFlags,invokedAnimationName)
{
    var key = this.Moves.length;
    this.Moves[key] = {};
    this.Moves[key] = new Animation(requiredState,name,duration,null,keySequence,null,priority,0,isAttack,allowAirBlock,behaviorFlags,invokedAnimationName);
    return this.Moves[key];
}
// Helper function - adds a move for the player
Player.prototype.addGenericAnimation = function(state,team,name,moveFlags)
{
    var key = _c4("_",state,"_",team);
    this.OtherAnimations[key] = new GenericAnimation(name,[],moveFlags || MOVE_FLAGS.NONE);

    return this.OtherAnimations[key];
}
// helper function - adds the dizzy stars animation
Player.prototype.addDizzyAnimation = function(centeredOffset,topOffset)
{
    this.OtherAnimations.Dizzy[this.OtherAnimations.Dizzy.length] =
    {
        Direction:this.Direction
        ,StartFrame:0
        ,Element:this.DizzyElement
        ,Animation:new GenericAnimation("dizzy",[],MOVE_FLAGS.MOVE_TO_PLAYER,0,0,centeredOffset,topOffset,true)
    };
    return this.OtherAnimations.Dizzy[this.OtherAnimations.Dizzy.length-1].Animation;
}
// helper function - adds the blue fire animation
Player.prototype.addBlueFireAnimation = function(centeredOffset,topOffset)
{
    this.OtherAnimations.BlueFire =
    {
        Direction:this.Direction
        ,StartFrame:0
        ,Element:this.FireElement
        ,Animation:new GenericAnimation("blue-fire",[],MOVE_FLAGS.MOVE_TO_PLAYER,0,0,centeredOffset,topOffset,true)
    };
    return this.OtherAnimations.BlueFire.Animation;
}
// helper function - adds the red fire animation
Player.prototype.addRedFireAnimation = function(centeredOffset,topOffset)
{
    this.OtherAnimations.RedFire =
    {
        Direction:this.Direction
        ,StartFrame:0
        ,Element:this.FireElement
        ,Animation:new GenericAnimation("red-fire",[],MOVE_FLAGS.MOVE_TO_PLAYER,0,0,centeredOffset,topOffset,true)
    };
    return this.OtherAnimations.RedFire.Animation;
}
// Helper function - adds a dirt animation for the player
Player.prototype.addDirtAnimation = function()
{
    var img = window.document.createElement("div");
    img.className = "dirt";
    img.style.display = "none";
    window.document.getElementById("pnlStage").appendChild(img);


    this.OtherAnimations.Dirt[this.OtherAnimations.Dirt.length] =
    {
        Direction:this.Direction
        ,StartFrame:0
        ,Element:img
        ,Animation:new GenericAnimation("dirt",[],MOVE_FLAGS.NONE)
    };

    return this.OtherAnimations.Dirt[this.OtherAnimations.Dirt.length-1].Animation;
}
// Helper function - adds a big dirt for the player
Player.prototype.addBigDirtAnimation = function()
{
    var img = window.document.createElement("div");
    img.className = "big-dirt";
    img.style.display = "none";
    window.document.getElementById("pnlStage").appendChild(img);


    this.OtherAnimations.BigDirt[this.OtherAnimations.BigDirt.length] =
    {
        Direction:this.Direction
        ,StartFrame:0
        ,Element:img
        ,Animation:new GenericAnimation("big dirt",[],MOVE_FLAGS.NONE)
    };

    return this.OtherAnimations.BigDirt[this.OtherAnimations.BigDirt.length-1].Animation;
}
//sets the current animation by looking up the name of the animation - this function can be called by AI
Player.prototype.executeAnimation = function(name, forced, ignoreImmobile)
{
    var animation = null;
    if(!!forced || (this.isMobile() || this.allowInterupt()))
    {
        if(!!this.ForceImmobile && !ignoreImmobile)
            return false;

        var currentEnergy = this.getEnergyFn();

        for(var i = 0; i < this.Moves.length; ++i)
        {
            if(!!animation)
                break;

            if(this.Moves[i].BaseAnimation.Name == name)
                animation = this.Moves[i];
            else
                continue;

            var move = this.Moves[i];

            if(!!move.EnergyToSubtract && currentEnergy < move.EnergyToSubtract)
                return false;

            var pstate = (move.RequiredFlags
                            | POSE_FLAGS.ALLOW_BLOCK
                            | POSE_FLAGS.ALLOW_AIR_BLOCK
                            ) ^ (POSE_FLAGS.ALLOW_BLOCK
                                | POSE_FLAGS.ALLOW_AIR_BLOCK
                                );
            var pstateNoInterupts = (pstate
                                | POSE_FLAGS.ALLOW_INTERUPT_1
                                | POSE_FLAGS.ALLOW_INTERUPT_2
                                | POSE_FLAGS.ALLOW_INTERUPT_3
                                | POSE_FLAGS.ALLOW_INTERUPT_4
                                | POSE_FLAGS.ALLOW_INTERUPT_5
                                | POSE_FLAGS.ALLOW_INTERUPT_6
                                ) ^ (POSE_FLAGS.ALLOW_INTERUPT_1
                                    | POSE_FLAGS.ALLOW_INTERUPT_2
                                    | POSE_FLAGS.ALLOW_INTERUPT_3
                                    | POSE_FLAGS.ALLOW_INTERUPT_4
                                    | POSE_FLAGS.ALLOW_INTERUPT_5
                                    | POSE_FLAGS.ALLOW_INTERUPT_6
                                    );
            var pstateInterupts = (move.RequiredFlags & POSE_FLAGS.ALLOW_INTERUPT_1)
                                | (move.RequiredFlags & POSE_FLAGS.ALLOW_INTERUPT_2)
                                | (move.RequiredFlags & POSE_FLAGS.ALLOW_INTERUPT_3)
                                | (move.RequiredFlags & POSE_FLAGS.ALLOW_INTERUPT_4)
                                | (move.RequiredFlags & POSE_FLAGS.ALLOW_INTERUPT_5)
                                | (move.RequiredFlags & POSE_FLAGS.ALLOW_INTERUPT_6)
                                ;

            var mustAllowBlock = hasFlag(move.RequiredFlags,POSE_FLAGS.ALLOW_BLOCK);
            var mustAllowAirBlock = hasFlag(move.RequiredFlags,POSE_FLAGS.ALLOW_AIR_BLOCK);

            if(!pstate || !!(this.Flags.Pose.has(pstate)))
            {
                if(!!mustAllowBlock && !(this.Flags.Pose.has(POSE_FLAGS.ALLOW_BLOCK)))
                    return false;
                if(!!mustAllowAirBlock && !(this.Flags.Pose.has(POSE_FLAGS.ALLOW_AIR_BLOCK)))
                    return false;
                if(!!pstateNoInterupts && !(this.Flags.Pose.has(pstateNoInterupts)))
                    return false;
                //interupts must match
                if(!!this.allowInterupt() && !this.Flags.Pose.has(pstateInterupts))
                    return false;
                if(!!this.allowInterupt() && !pstateInterupts)
                    return false;

                if(!!this.isProjectileInUse(move))
                    return false;

            }
        }

        if(!!animation)
        {
            if(!this.setInteruptAnimation(animation))
            {
                this.setCurrentAnimation({Animation:animation,StartFrame:this.getMatch().getCurrentFrame(),Direction:this.Direction});
            }

            return true;
        }
    }
    return false;
}


////////////////////////////////////

// Looks up a move
Player.prototype.findThrow = function(input,frame)
{
    var retVal = null;
    var currentEnergy = this.getEnergyFn();

    for(var i = 0; i < this.Throws.length; ++i)
    {
        retVal = this.testAnimation(frame,currentEnergy,input,this.Throws[i])
        if(!!retVal)
            break;
    }
    return retVal;
}

// Looks up a move
Player.prototype.findAnimation = function(input,frame)
{
    //TODO: Check for block chaining high and low


    //check for block chaining
    if(!!this.isBlockingHigh() 
        && this.canBlock()
        && input.length == 1 
        && (input[0].State[BUTTONS.CROUCH].Value == BUTTON_STATE.PRESSED 
            && input[0].State[BUTTONS.BACK].Value == BUTTON_STATE.PRESSED))
    {
        this.chainToAnimation(frame, this.Moves[this.MoveNdx.LowBlock],2);

        return -1;
    }

    //check for block chaining
    else if(!!this.isBlockingLow() 
        && this.canBlock()
        && input.length == 1 
        && (input[0].State[BUTTONS.CROUCH].Value == BUTTON_STATE.NONE 
            && input[0].State[BUTTONS.BACK].Value == BUTTON_STATE.PRESSED))
    {
        this.chainToAnimation(frame, this.Moves[this.MoveNdx.HighBlock],2);

        return -1;
    }


    var retVal = null;
    var currentEnergy = this.getEnergyFn();

    for(var i = 0; i < this.Moves.length; ++i)
    {
        retVal = this.testAnimation(frame,currentEnergy,input,this.Moves[i])
        if(!!retVal)
            break;
    }
    return retVal;
}

//
Player.prototype.testAnimation = function(frame,currentEnergy,input,move)
{
    var isAirborne = this.isAirborne();
    if(!!move.IsImplicit)
        return null;

    if(!!move.EnergyToSubtract && currentEnergy < move.EnergyToSubtract)
        return null;

    var pstate = (move.RequiredFlags
                    | POSE_FLAGS.ALLOW_BLOCK
                    | POSE_FLAGS.ALLOW_AIR_BLOCK
                    ) ^ (POSE_FLAGS.ALLOW_BLOCK
                        | POSE_FLAGS.ALLOW_AIR_BLOCK
                        );
    var pstateNoInterupts = (pstate
                        | POSE_FLAGS.ALLOW_INTERUPT_1
                        | POSE_FLAGS.ALLOW_INTERUPT_2
                        | POSE_FLAGS.ALLOW_INTERUPT_3
                        | POSE_FLAGS.ALLOW_INTERUPT_4
                        | POSE_FLAGS.ALLOW_INTERUPT_5
                        | POSE_FLAGS.ALLOW_INTERUPT_6
                        ) ^ (POSE_FLAGS.ALLOW_INTERUPT_1
                            | POSE_FLAGS.ALLOW_INTERUPT_2
                            | POSE_FLAGS.ALLOW_INTERUPT_3
                            | POSE_FLAGS.ALLOW_INTERUPT_4
                            | POSE_FLAGS.ALLOW_INTERUPT_5
                            | POSE_FLAGS.ALLOW_INTERUPT_6
                            );
    var pstateInterupts = (move.RequiredFlags & POSE_FLAGS.ALLOW_INTERUPT_1)
                        | (move.RequiredFlags & POSE_FLAGS.ALLOW_INTERUPT_2)
                        | (move.RequiredFlags & POSE_FLAGS.ALLOW_INTERUPT_3)
                        | (move.RequiredFlags & POSE_FLAGS.ALLOW_INTERUPT_4)
                        | (move.RequiredFlags & POSE_FLAGS.ALLOW_INTERUPT_5)
                        | (move.RequiredFlags & POSE_FLAGS.ALLOW_INTERUPT_6)
                        ;

    var mustAllowBlock = hasFlag(move.RequiredFlags,POSE_FLAGS.ALLOW_BLOCK);
    var mustAllowAirBlock = hasFlag(move.RequiredFlags,POSE_FLAGS.ALLOW_AIR_BLOCK);

    if(!pstate || !!(this.Flags.Pose.has(pstate)))
    {
        if(!!mustAllowBlock && !(this.Flags.Pose.has(POSE_FLAGS.ALLOW_BLOCK)))
            return null;
        if(!!mustAllowAirBlock && !(this.Flags.Pose.has(POSE_FLAGS.ALLOW_AIR_BLOCK)))
            return null;
        if(!!pstateNoInterupts && !(this.Flags.Pose.has(pstateNoInterupts)))
            return null;
        //interupts must match
        if(!!this.allowInterupt() && !this.Flags.Pose.has(pstateInterupts))
            return null;
        if(!!this.allowInterupt() && !pstateInterupts)
            return null;

        if(!!this.isProjectileInUse(move))
            return null;

        var isMatch = this.compareButtonSequence(frame,move,input);
        //if(!isMatch)
        //    isMatch = this.compareAlternateButtonSequences(move,tmpKeys);


        if(!!isMatch)
        {
            if(!!move.GrappleDistance)
            {
                if(!!this.RegisteredHit.HitID)
                    return null;
                if(!this.tryStartGrapple(move,frame))
                    return null;
            }
            //you can only chain to a different block if you are currently blocking
            if(this.isBlocking())
                return null;
            return move;
        }
        else
        {
            if(!!move.GrappleDistance)
                return null;
        }
    }

    return null;
}

//
Player.prototype.goToStance = function(frame)
{
    if(this.isDead())
    {
        if(this.CanEndRound)
        {
            return;
        }

        this.IsLosing = false;
        this.IsWinning = false;
        this.ForceImmobile = true;
        this.Flags.Player.remove(PLAYER_FLAGS.MOBILE);
        var move = this.Moves[this.MoveNdx.Down];
        this.setCurrentAnimation({Animation:move,StartFrame:frame,Direction:this.Direction},true);
        this.CanEndRound = true;
        this.getMatch().onCanEndRound(this.Team);
    }
    else
    {
        if(this.OtherTeamDead && !this.CanEndRound)
        {
            this.CanEndRound = true;
            this.getMatch().onCanEndRound();
        }

        if((this.WinAnimationFrame != CONSTANTS.NO_FRAME) && (frame > this.WinAnimationFrame))
        {
            this.forceWinAnimation(frame);
            return;
        }



        var move = this.Moves[this.MoveNdx.Stance];

        this.setCurrentAnimation({Animation:move,StartFrame:frame,Direction:this.Direction},true);

        this.Flags.Player.add(PLAYER_FLAGS.MOBILE);

        this.showFirstAnimationFrame();
    }
}
// returns the first free front hit report image
Player.prototype.getNextFrontHitReportImage = function()
{
    for(var i = 0; i < this.FrontHitReportImages.length; ++i)
    {
        if(!this.FrontHitReportImages[i].isInUse)
        {
            this.FrontHitReportImages[i].isInUse = true;
            return this.FrontHitReportImages[i];
        }
    }

    return null;
}
// returns the first free rear hit report image
Player.prototype.getNextRearHitReportImage = function()
{
    for(var i = 0; i < this.RearHitReportImages.length; ++i)
    {
        if(!this.RearHitReportImages[i].isInUse)
        {
            this.RearHitReportImages[i].isInUse = true;
            return this.RearHitReportImages[i];
        }
    }

    return null;
}
// returns the first free dirt image
Player.prototype.getFreeDirtIndex = function()
{
    for(var i = 0; i < this.OtherAnimations.Dirt.length; ++i)
    {
        if(!this.OtherAnimations.Dirt[i].Animation.IsActive)
        {
            this.OtherAnimations.Dirt[i].Animation.IsActive = true;
            return i;
        }
    }

    return -1;
}
// returns the first free dirt image
Player.prototype.getFreeBigDirtIndex = function()
{
    for(var i = 0; i < this.OtherAnimations.BigDirt.length; ++i)
    {
        if(!this.OtherAnimations.BigDirt[i].Animation.IsActive)
        {
            this.OtherAnimations.BigDirt[i].Animation.IsActive = true;
            return i;
        }
    }

    return -1;
}

Player.prototype.spawnDizzy = function(frame)
{   
    this.DizzyIndex = +!this.DizzyIndex;
    var instance = this.OtherAnimations.Dizzy[this.DizzyIndex];
    instance.StartFrame = frame;
    instance.Animation.Direction = this.Direction;
    instance.Animation.OffsetX = this.DizzyOffset.X;
    instance.Animation.OffsetY = this.DizzyOffset.Y;
}

Player.prototype.spawnRedFire = function(frame)
{   
    var instance = this.OtherAnimations.RedFire;
    instance.StartFrame = frame;
    instance.Animation.Direction = this.Direction;
    instance.Animation.InitialX = this.getX() - this.HeadOffsetX;
    instance.Animation.InitialY = this.getConstOffsetTop() - this.HeadOffsetY - game_.getMatch().getStage().getGroundY();
    instance.Animation.InitialStageY = game_.getMatch().getStage().getGroundY();
}

Player.prototype.spawnBlueFire = function(frame)
{   
    var instance = this.OtherAnimations.RedFire;
    instance.StartFrame = frame;
    instance.Animation.Direction = this.Direction;
    instance.Animation.InitialX = this.getX() - this.HeadOffsetX;
    instance.Animation.InitialY = this.getConstOffsetTop() - this.HeadOffsetY - game_.getMatch().getStage().getGroundY();
    instance.Animation.InitialStageY = game_.getMatch().getStage().getGroundY();
}

Player.prototype.spawnSmallDirt = function(frame,offsetX)
{
    if(!this.isOnGround())
        return;
    // spawn dirt
    var index = this.getFreeDirtIndex();
    if(index > -1)
    {
        var instance = this.OtherAnimations.Dirt[index];
        instance.StartFrame = frame;
        instance.Animation.Direction = this.Direction;
        if(!!offsetX)
            this.setLastHit(instance.Animation,CONSTANTS.USE_PLAYER_XY,offsetX,CONSTANTS.SMALLDIRT_OFFSETY);
        else
            this.setLastHit(instance.Animation,CONSTANTS.USE_PLAYER_BOTTOM);
        this.DirtIndices[this.DirtIndices.length] = index;
    }
}

Player.prototype.spawnBigDirt = function(frame,offsetX)
{
    if(!this.isOnGround())
        return;

    // spawn dirt
    var index = this.getFreeBigDirtIndex();
    if(index > -1)
    {
        var instance = this.OtherAnimations.BigDirt[index];
        instance.StartFrame = frame;
        instance.Animation.Direction = this.Direction;
        this.setLastHit(instance.Animation,CONSTANTS.USE_PLAYER_XY,offsetX,CONSTANTS.BIGDIRT_OFFSETY);
        this.BigDirtIndices[this.BigDirtIndices.length] = index;
    }
}


// Handles frames that spawn other animations
Player.prototype.spawnHitReportAnimations = function(frame, flags, hitState, attackDirection)
{
    var frontKey = "";
         if(!!(this.Flags.Player.has(PLAYER_FLAGS.BLOCKING))) {frontKey = _c3("_",ATTACK_FLAGS.FRONT|ATTACK_FLAGS.BLOCK,"_0");}
    else if(hasFlag(flags,ATTACK_FLAGS.LIGHT))    {frontKey = _c4("_",ATTACK_FLAGS.FRONT|ATTACK_FLAGS.LIGHT,"_",this.Team);}
    else if(hasFlag(flags,ATTACK_FLAGS.MEDIUM))   {frontKey = _c4("_",ATTACK_FLAGS.FRONT|ATTACK_FLAGS.MEDIUM,"_",this.Team);}
    else if(hasFlag(flags,ATTACK_FLAGS.HARD))     {frontKey = _c4("_",ATTACK_FLAGS.FRONT|ATTACK_FLAGS.HARD,"_",this.Team);}

    var animation = this.OtherAnimations[frontKey];
    if(!!animation)
    {
        this.setLastHit(animation);
        animation.Direction = attackDirection;
        this.FrontHitReport[this.FrontHitReport.length] = {Animation:animation,StartFrame:frame,Direction:attackDirection,Element:this.getNextFrontHitReportImage()};
    }

    if(!this.Flags.Player.has(PLAYER_FLAGS.BLOCKING) && hasFlag(flags,ATTACK_FLAGS.REAR))
    {
        var rearKey = "";
        if(hasFlag(hitState,HIT_FLAGS.HIGH) && hasFlag(flags,ATTACK_FLAGS.SPIT1)) {rearKey = _c3("_",ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPIT1,"_0");}
        else if(hasFlag(hitState,HIT_FLAGS.HIGH) && hasFlag(flags,ATTACK_FLAGS.SPIT2)) {rearKey = _c3("_",ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPIT2,"_0");}

        else if(hasFlag(flags,ATTACK_FLAGS.SPECIAL))
        {
                 if(hasFlag(flags,ATTACK_FLAGS.LIGHT)) {rearKey = _c3("_",ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL1,"_0");}
            else if(hasFlag(flags,ATTACK_FLAGS.MEDIUM)) {rearKey = _c3("_",ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,"_0");}
            else if(hasFlag(flags,ATTACK_FLAGS.HARD)) {rearKey = _c3("_",ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,"_0");}
        }

        else if(hasFlag(flags,ATTACK_FLAGS.SPECIAL1)) {rearKey = _c3("_",ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL1,"_0");}
        else if(hasFlag(flags,ATTACK_FLAGS.SPECIAL2)) {rearKey = _c3("_",ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL2,"_0");}
        else if(hasFlag(flags,ATTACK_FLAGS.SPECIAL3)) {rearKey = _c3("_",ATTACK_FLAGS.REAR|ATTACK_FLAGS.SPECIAL3,"_0");}

        else if(hasFlag(flags,ATTACK_FLAGS.LIGHT)) {rearKey = _c4("_",ATTACK_FLAGS.REAR|ATTACK_FLAGS.LIGHT,"_",this.Team);}
        else if(hasFlag(flags,ATTACK_FLAGS.MEDIUM)) {rearKey = _c4("_",ATTACK_FLAGS.REAR|ATTACK_FLAGS.MEDIUM,"_",this.Team);}
        else if(hasFlag(flags,ATTACK_FLAGS.HARD)) {rearKey = _c4("_",ATTACK_FLAGS.REAR|ATTACK_FLAGS.HARD,"_",this.Team);}


        var rearAnimation = this.OtherAnimations[rearKey];
        if(!!rearAnimation)
        {
            this.setLastHit(rearAnimation,CONSTANTS.USE_PLAYER_TOP);
            this.RearHitReport[this.RearHitReport.length] = {Animation:rearAnimation,StartFrame:frame,Direction:attackDirection,Element:this.getNextRearHitReportImage()};
        }
    }
}

// Gets the hit ID of the current frame
Player.prototype.getHitFrameID = function(hitID)
{
    return this.Id + "-" + this.CurrentAnimation.Animation.BaseAnimation.Name + "-" + (hitID || this.CurrentFrame.HitID) + "-" + this.MoveCount;
}

// Gets the hit ID of the current frame
Player.prototype.getFrameImageID = function(hitID)
{
    return this.CurrentFrame.ImageID;
}


// If there is a chaining move after a hit, then it will be set to the current move
Player.prototype.tryChainOnHit = function(frame)
{
    if(!!this.CurrentAnimation && !!this.CurrentAnimation.Animation && !!this.CurrentAnimation.Animation.ChainOnHitAnimation)
    {
        var chained = this.CurrentAnimation.Animation.ChainOnHitAnimation;
        this.chainToAnimation(frame, chained);
    }
}

// If there is a chaining move, then it will be set to the current move
Player.prototype.tryChainAnimation = function(frame,stageX,stageY)
{
    if(!!this.CurrentAnimation && !!this.CurrentAnimation.Animation && hasFlag(this.CurrentAnimation.Animation.Flags.Player,PLAYER_FLAGS.LOOP_IF_KEYDOWN))
    {
        this.KeyStateChanged = true;
        
        //the last key in the keySequence must be the required key
        //var key = this.CurrentAnimation.Animation.getKey(this.CurrentAnimation.Animation.getKeySequenceLength() - 1);
        var state = this.CurrentAnimation.Animation.ButtonSequence[this.CurrentAnimation.Animation.ButtonSequence.length-1];
        //... and was the key pressed?
        if(this.hasButtonState(state))
        {
            this.CurrentAnimation.StartFrame = frame;
            //var firstFrame = this.CurrentAnimation.Animation.BaseAnimation.Frames[0];
            //this.setCurrentFrame(firstFrame,frame,stageX,stageY);
            this.checkMustChangeDirection();
            return;
        }
    }
    if(!!this.CurrentAnimation && !!this.MustChangeDirection && !this.isDead() && (!this.CurrentAnimation.Animation || (!!this.CurrentAnimation.Animation && !this.CurrentAnimation.Animation.ChainAnimation)))
    {
        if(this.getMustChangeDirection(true))
        {
            if(!!this.CurrentAnimation.Animation && !!this.CurrentAnimation.Animation.Flags.Pose && hasFlag(this.CurrentAnimation.Animation.Flags.Pose,POSE_FLAGS.QUICK_CHANGE_DIRECTION))
                this.changeDirection(true);
            else
                this.changeDirection();
        }
        else
        {
            this.goToStance(frame);
        }
    }
    else if(!!this.CurrentAnimation && !!this.CurrentAnimation.Animation && !!this.CurrentAnimation.Animation.ChainAnimation)
    {
        var chained = this.CurrentAnimation.Animation.ChainAnimation;
        //dont allow chaining to getup if the player is dead
        if(chained.BaseAnimation.Name == "bounce" && this.isDead())
            chained = this.Moves[this.MoveNdx.DeadBounce];
            //chained = this.Moves._0_hr_deadbounce;
        var move = chained;
        this.chainToAnimation(frame, move);
    }
    else
    {
        this.goToStance(frame);
    }
}

Player.prototype.changeTarget = function()
{
    if(this.Team == 1)
    {
        if(!this.getMatch().getTeamB().getPlayer(++this.Target))
            this.Target = 0;
    }
    else
    {
        if(!this.getMatch().getTeamA().getPlayer(++this.Target))
            this.Target = 0;
    }

    this.faceTarget();
}

Player.prototype.chainToAnimation = function(frame,move,frameOffset,stageX,stageY)
{
    var newFrame = move.BaseAnimation.Frames[frameOffset || this.CurrentAnimation.Animation.ChainAnimationFrame];
    var attackDirection = this.CurrentAnimation.AttackDirection;

    var tmp = {ID:this.Id + move.BaseAnimation.Name + frame.toString() ,Animation:move,StartFrame:frame - newFrame.FrameOffset,Direction:this.Direction,AttackDirection:attackDirection};
    this.setCurrentAnimation(tmp,true);
    this.setCurrentFrame(newFrame,frame,stageX,stageY);
}

// clear interupt flags from the pose state
Player.prototype.clearInterupt = function()
{
    this.Flags.Pose.Value = (this.Flags.Pose.Value
                    | POSE_FLAGS.ALLOW_INTERUPT_1
                    | POSE_FLAGS.ALLOW_INTERUPT_2
                    | POSE_FLAGS.ALLOW_INTERUPT_3
                    | POSE_FLAGS.ALLOW_INTERUPT_4
                    | POSE_FLAGS.ALLOW_INTERUPT_5
                    | POSE_FLAGS.ALLOW_INTERUPT_6)
                    ^ POSE_FLAGS.ALLOW_INTERUPT_1
                    ^ POSE_FLAGS.ALLOW_INTERUPT_2
                    ^ POSE_FLAGS.ALLOW_INTERUPT_3
                    ^ POSE_FLAGS.ALLOW_INTERUPT_4
                    ^ POSE_FLAGS.ALLOW_INTERUPT_5
                    ^ POSE_FLAGS.ALLOW_INTERUPT_6
                    ;
}

Player.prototype.clearUnclearedFlags = function()
{
    this.Flags.Player.remove(PLAYER_FLAGS.BULLDOZE);
}

Player.prototype.checkFlags = function(animation)
{
    if(hasFlag(animation.Flags.Pose,POSE_FLAGS.FORCE_CHANGE_TARGET))
    {
        this.changeTarget()
    }
}

Player.prototype.setGotUpOnFrame = function(animation)
{
    //about to get up and become mobile
    if(!!this.CurrentAnimation
        && !!this.CurrentAnimation.Animation
        && this.CurrentAnimation.Animation.BaseAnimation.Name == "getup"
        && !this.isMobile()
        )
    {
        //GotUpOnFrame is used to prevent the AI from grappling you immediately after you gets up
        this.GotUpOnFrame = this.getFrame();
        this.RegisteredHit.HitID = null;
    }
}

//Sets the current move
Player.prototype.setCurrentAnimation = function(newAnimation,isChaining)
{
    ++this.MoveCount;
    this.NbHits = 0;
    this.MaintainYPosition = false;
    this.clearUnclearedFlags();
    if(!!this.CurrentAnimation && this.CurrentAnimation.Animation)
    {
        if(!!this.IsSpriteReversed)
        {
            this.unreverseSprite();
            this.changeDirection(true);
        }

        //this.LastAnimation = this.CurrentAnimation.Animation;
        //this.onEndAttackEnemiesFn(0);
        this.CurrentAnimation.Animation.hideChildren();
        //maintain the same velocity if required
        if(!!newAnimation && !!this.CurrentAnimation.Animation.ChainAnimation)
        {
            if(hasFlag(this.CurrentAnimation.Animation.ChainAnimation.Flags.Player,PLAYER_FLAGS.USE_CURRENT_VX))
                newAnimation.Vx = (this.CurrentAnimation.Animation.ChainAnimation.chainVxFn(this.CurrentAnimation.Vx));
            if(hasFlag(this.CurrentAnimation.Animation.ChainAnimation.Flags.Player,PLAYER_FLAGS.USE_CURRENT_VY))
                newAnimation.Vy = (this.CurrentAnimation.Animation.ChainAnimation.chainVyFn(this.CurrentAnimation.Vy));
        }

        if(!!this.CurrentAnimation.Animation.Trail)
            this.CurrentAnimation.Animation.Trail.disable();

        //it is possible that the player was attacked before clearing the block state
        if(!!this.MustClearAllowBlock)
        {
            this.MustClearAllowBlock = false;
            //notify AI
            this.onEndAttackFn(this.CurrentAnimation.ID);
        }
        if(!!this.MustClearAllowAirBlock)
        {
            this.MustClearAllowAirBlock = false;
            //notify AI
            this.onEndAirAttackFn(this.CurrentAnimation.ID);
        }

        this.CurrentAnimation.Animation.ControllerAnimation = null;
        if(!!(this.CurrentAnimation.Animation.IgnoresCollisions))
        {
            if(!newAnimation.Animation || !(newAnimation.Animation.IgnoresCollisions))
                this.Flags.Player.remove(PLAYER_FLAGS.IGNORE_COLLISIONS);
            this.fixXFn();
        }
        this.Flags.Pose.remove(this.CurrentAnimation.Animation.Flags.Pose);

        if(!!this.CurrentAnimation.Animation.BaseAnimation.IsAttack)
        {
            if(!this.SentHitAttackStateChange)
                this.onAttackStateChanged(null,ATTACK_STATE.DONE);
            this.SentHitAttackStateChange = false;
        }
    }


    this.setGotUpOnFrame(!!newAnimation ? newAnimation.Animation : null);

    if(!!this.CurrentAnimation && !!this.CurrentAnimation.Animation)
        this.onEndAnimation(this.CurrentAnimation.Animation.BaseAnimation.Name);

    this.CurrentAnimation = newAnimation;
    var ignoreClearFire = false;
    if(!!newAnimation && !!newAnimation.Animation)
    {
        this.IsFirstFrame = true;

        //HitReact flags are set in [player.combat] after this function is called so it it safe to clear these flags
        this.Flags.HitReact.clear();

        this.Flags.Juggle.clear();
        this.CurrentAnimation.ID = _c3(this.Id, this.CurrentAnimation.Animation.BaseAnimation.Name, game_.getCurrentFrame());

        this.Flags.Juggle.add(this.CurrentAnimation.Animation.Flags.Juggle);

        if(!!this.CurrentAnimation.Animation.IsProjectile)
            this.CurrentAnimation.Animation.IsProjectilePending = true;

        this.onStartAnimation(this.CurrentAnimation.Animation.BaseAnimation.Name);
        //this.doAnimationAlerts();
        this.MaintainYPosition = newAnimation.Animation.MaintainYPosition;
        if(!!this.CurrentAnimation.Animation.Flags.Player)
        {
            //used for moves like MBison's head stomp - where you need to jump to the enemy's position
            if(hasFlag(this.CurrentAnimation.Animation.Flags.Player,PLAYER_FLAGS.MOVE_TO_ENEMY))
                this.CurrentAnimation.Animation.Vx = this.getCDHelper().getInitialCloseGapVelocityX(this,this.getTarget(),this.CurrentAnimation.Animation.Vy);
            //turn around if required
            if(hasFlag(this.CurrentAnimation.Animation.Flags.Player,PLAYER_FLAGS.FACE_ENEMY))
            {
                if(!!this.MustChangeDirection)
                    this.changeDirection(true);
            }
            //clear fire if required
            ignoreClearFire = !hasFlag(this.CurrentAnimation.Animation.Flags.Combat,COMBAT_FLAGS.IGNORE_CLEAR_FIRE);
        }

        if(!!ignoreClearFire)
            this.clearFire();

        this.IsInAttackFrame = false;
        this.IgnoreOverrides = false;
        this.clearInterupt();
        this.checkPendingHit();
        this.setPendingGrapple(false);
        if(!newAnimation.Animation.IsThrow)
            this.abortThrow();
        if(this.getIsExecutingSuperMove())
        {
            this.getMatch().onSuperMoveCompleted(this);
            this.setExecutingSuperMove(false);
        }
        if(!!newAnimation.Animation.IsSuperMove)
        {
            this.setZOrder(20);
            this.getMatch().onSuperMoveStarted(this);
            this.queueSuperMoveChargeSound();
            this.setExecutingSuperMove(true);
        }


        //must start a move on the ground to hold airborne (unless FORCE_START_AIRBORNE is set on a frame in the move)
        if(this.isAirborne())
            this.CanHoldAirborne = false;
        else
            this.CanHoldAirborne = true;

        if(!this.CurrentAnimation.Animation.KeepCurrentAirborneFunctions || !!this.CurrentAnimation.Animation.UseNewAirborneFunctions)
        {
            if(this.CurrentAnimation.Vx === undefined) 
                this.CurrentAnimation.Vx = this.CurrentAnimation.Animation.Vx;
            if(this.CurrentAnimation.Vy === undefined)
                this.CurrentAnimation.Vy = this.CurrentAnimation.Animation.Vy;

            this.clearVxFn();
            this.clearVyFn();
        }
        if(!!this.CurrentAnimation.Animation.UseNewAirborneFunctions)
        {
            this.setVxFn(this.CurrentAnimation.Animation.getAirXModifier());
            this.setVyFn(this.CurrentAnimation.Animation.getAirYModifier());
        }

        this.CanInterrupt = false;
        this.CurrentAnimation.FrameIndex = 0;
        this.IgnoreHoldFrame = false;
        this.IgnoreCollisionsWith = "";
        this.Flags.Pose.add(newAnimation.Animation.Flags.Pose);
        this.setAdjustShadowPosition(newAnimation.Animation.AdjustShadowPosition);
        if(!hasFlag(newAnimation.Animation.Flags.Player,PLAYER_FLAGS.HOLD_ZINDEX))
            this.moveToFront();

        this.offsetImageX(0);
        this.offsetImageY(0);


        if(!__debugMode)
        {
            if(!!newAnimation.Animation.EnergyToSubtract)
                this.changeEnergy(-newAnimation.Animation.EnergyToSubtract);
            else if(!!newAnimation.Animation.EnergyToAdd)
                this.changeEnergy(newAnimation.Animation.EnergyToAdd);
        }

        if(!!newAnimation.Animation.Trail)
            this.CurrentAnimation.Animation.Trail.enable(newAnimation.StartFrame,this.Element,this.Direction);

        if(!isChaining)
            this.showFirstAnimationFrame();

        //if this move is an attack, then raise the event
        if(!!this.CurrentAnimation.Animation.BaseAnimation.IsAttack && !this.CurrentAnimation.Animation.ProjectileId)
        {
            this.IsInAttackFrame = true;
            this.onStartAttackEnemiesFn(0);
            this.onStartAttack();
        }
    }
}

Player.prototype.applyShake = function(frame, stageX, stageY)
{
    if(frame < this.ShakeUntilFrame)
    {
        if((frame % 2) == 0)
        {
            this.setX(this.X - (this.Direction * 4));
        }
        else
        {
            this.setX(this.X + (this.Direction * 4));
        }
    }
}

Player.prototype.doAnimationAlerts = function()
{
    if(!!this.CurrentAnimation && !!this.CurrentAnimation.Animation && hasFlag(this.CurrentAnimation.Animation.Flags.Alert,ALERT_FLAGS.DIZZY))
    {
        this.onDizzyFn();
    }
}

Player.prototype.showFirstAnimationFrame = function()
{
    if(!!this.CurrentAnimation.Animation)
    {
        var firstFrame = this.CurrentAnimation.Animation.getFrame(0);
        this.setCurrentFrame(firstFrame,game_.getCurrentFrame(),0,0,true);
    }
}

Player.prototype.AirborneFlags = POSE_FLAGS.AIR_COMBO_1 | POSE_FLAGS.AIR_COMBO_2 | POSE_FLAGS.AIRBORNE | POSE_FLAGS.AIRBORNE_FB;

// flags that should be ignore when a frame's pose flags are cleared
Player.prototype.PoseFlagsToIgnore = POSE_FLAGS.AIR_COMBO_1
                    | POSE_FLAGS.AIR_COMBO_2
                    | POSE_FLAGS.AIRBORNE
                    | POSE_FLAGS.AIRBORNE_FB
                    | POSE_FLAGS.ALLOW_INTERUPT_1
                    | POSE_FLAGS.ALLOW_INTERUPT_2
                    | POSE_FLAGS.ALLOW_INTERUPT_3
                    | POSE_FLAGS.ALLOW_INTERUPT_4
                    | POSE_FLAGS.ALLOW_INTERUPT_5
                    | POSE_FLAGS.ALLOW_INTERUPT_6;

// flags that should be ignore when a frame's combat flags are cleared
Player.prototype.CombatFlagsToIgnore = COMBAT_FLAGS.PROJECTILE_ACTIVE
                    | COMBAT_FLAGS.CAN_BE_BLOCKED
                    | COMBAT_FLAGS.CAN_BE_AIR_BLOCKED;

// flags that should be ignore when a frame's player flags are cleared
Player.prototype.PlayerFlagsToIgnore = PLAYER_FLAGS.MOBILE | PLAYER_FLAGS.BULLDOZE;

Player.prototype.ResetClip = function()
{
    this.ClipMoveFront = 0;
    this.ClipMoveBack = 0;
    this.ClipMoveTop = 0;
    this.ClipHitBottom = 0;
    this.ClipHitFront = 0;
    this.ClipHitBack = 0;
    this.ClipHitTop = 0;
    this.ClipHitBottom = 0;
}

// Sets the current frame
Player.prototype.setCurrentFrame = function(newFrame,frame,stageX,stageY,ignoreTranslation)
{
    if(!!this.CurrentFrame)
    {
        if(!!newFrame && (newFrame.ID == this.CurrentFrame.ID))
            return;

        //must remove the clip values each frame
        this.ResetClip();

        if(this.Flags.Player.has(PLAYER_FLAGS.INVISIBLE))
        {
            this.Element.style.display = "";
            this.ShadowContainer.style.display = "";
        }
        //Remove the flags that were set by the current frame, except for the ones that must be cleared at a later time.

        this.Flags.Player.remove((this.CurrentFrame.FlagsToSet.Player | Player.prototype.PlayerFlagsToIgnore) ^ Player.prototype.PlayerFlagsToIgnore);
        this.Flags.Pose.remove((this.CurrentFrame.FlagsToSet.Pose | Player.prototype.PoseFlagsToIgnore ) ^ Player.prototype.PoseFlagsToIgnore);
        this.Flags.Combat.remove((this.CurrentFrame.FlagsToSet.Combat | Player.prototype.CombatFlagsToIgnore) ^ Player.CombatFlagsToIgnore);
        //this.Flags.RCombat.remove(this.CurrentFrame.FlagsToSet.RCombat);
        this.Flags.Combo.remove(this.CurrentFrame.FlagsToSet.Combo);
        this.Flags.Juggle.remove(this.CurrentFrame.FlagsToSet.Juggle);


        this.Flags.SwingSound.remove(this.CurrentFrame.FlagsToSet.SwingSound);
        this.Flags.HitSound.remove(this.CurrentFrame.FlagsToSet.HitSound);
        this.Flags.BlockSound.remove(this.CurrentFrame.FlagsToSet.BlockSound);
        
    }

    this.IsNewFrame = false;
    
    if(!!this.IsFirstFrame)
        this.IsNewFrame = true;
    else if(!!newFrame && !this.CurrentFrame)
        this.IsNewFrame = true;
    else if(!!newFrame 
        && !!this.CurrentFrame 
        && newFrame.ID != this.CurrentFrame.ID
        && !!newFrame.RightSrc 
        && !!this.CurrentFrame.RightSrc 
        && spriteLookup_.getLeft(newFrame.RightSrc) != spriteLookup_.getLeft(this.CurrentFrame.RightSrc))
            this.IsNewFrame = true;

    var isNewSound = !!newFrame
                && ((!!newFrame.SoundFilename && ((!this.CurrentFrame) || (!!this.CurrentFrame && (this.CurrentFrame.SoundFilename != newFrame.SoundFilename))))
                || !!newFrame.FlagsToSet.SwingSound);

    this.CurrentFrame = newFrame;
    if(!!newFrame)
    {
        this.IsFirstFrame = false;
        if(this.CurrentAnimation.Animation.IsSuperMove)
            this.stopSlide(true);

        if(hasFlag(newFrame.FlagsToSet.Pose,POSE_FLAGS.FORCE_FACE_TARGET))
            this.faceTarget(true);


        //During an attack - after the attack frames the player is vulernable and we should ignore the overrides
        this.IgnoreOverrides = this.CurrentFrame.Vulernable;

        //used to force the other player to change frames during a throw
        if(!!this.IsNewFrame)
        {
            if(!!__debugMode && this.Id == "t1p0")
                debug_.readFrameData(this.CurrentFrame);

            ++this.CurrentAnimation.FrameIndex;
            if(!!this.CurrentFrame.SlideForce)
                this.startSlide(frame,this.CurrentFrame.SlideForce,this.Direction,this.CurrentFrame.SlideFactor,this.CurrentFrame.HideSlideDirt,true);
        }

        this.IgnoreHoldFrame = hasFlag(newFrame.FlagsToSet.Player,PLAYER_FLAGS.IGNORE_HOLD_FRAME);

        if(hasFlag(newFrame.FlagsToClear.Combat,COMBAT_FLAGS.SUPER_MOVE_PAUSE))
        {
            this.getMatch().onSuperMoveCompleted(this);
            this.setExecutingSuperMove(false);
        }
        if(hasFlag(newFrame.FlagsToSet.Player,PLAYER_FLAGS.INVISIBLE))
        {
            this.Element.style.display = "none";
            this.ShadowContainer.style.display = "none";
        }

        if(hasFlag(newFrame.FlagsToSet.Pose,POSE_FLAGS.FREEZE))
            this.MaintainYPosition = true;
        if(hasFlag(newFrame.FlagsToClear.Pose,POSE_FLAGS.FREEZE))
            this.MaintainYPosition = false;

        if(hasFlag(newFrame.FlagsToSet.Combat,COMBAT_FLAGS.TELEPORT_BEHIND))
            this.setTeleportTarget(COMBAT_FLAGS.TELEPORT_BEHIND,newFrame.Frames);
        if(hasFlag(newFrame.FlagsToSet.Combat,COMBAT_FLAGS.TELEPORT_INFRONT))
            this.setTeleportTarget(COMBAT_FLAGS.TELEPORT_INFRONT,newFrame.Frames);
        if(hasFlag(newFrame.FlagsToSet.Combat,COMBAT_FLAGS.TELEPORT_MIDDLE))
            this.setTeleportTarget(COMBAT_FLAGS.TELEPORT_MIDDLE,newFrame.Frames);
        if(hasFlag(newFrame.FlagsToSet.Combat,COMBAT_FLAGS.TELEPORT_BACK))
            this.setTeleportTarget(COMBAT_FLAGS.TELEPORT_BACK,newFrame.Frames);
        if(hasFlag(newFrame.FlagsToSet.Combat,COMBAT_FLAGS.TELEPORT))
            this.setTeleportTarget(COMBAT_FLAGS.TELEPORT,newFrame.Frames);

        //if the new frame spawns a projectile, handle that here
        if(!this.Flags.Combat.has(COMBAT_FLAGS.PROJECTILE_ACTIVE) && hasFlag(newFrame.FlagsToSet.Combat,COMBAT_FLAGS.SPAWN_PROJECTILE))
        {
            this.CurrentAnimation.Animation.IsProjectilePending = false;
            this.Projectiles[newFrame.ChainProjectile].execute(frame,stageX,stageY);
        }
        if(!!this.IsSliding && hasFlag(newFrame.FlagsToSet.Combat,COMBAT_FLAGS.STOP_SLIDE_BACK))
            this.stopSlide();
        if(hasFlag(newFrame.FlagsToSet.Player,PLAYER_FLAGS.RESET_Y_FUNC))
            this.resetVyFn();
        if(hasFlag(newFrame.FlagsToSet.Player,PLAYER_FLAGS.RESET_X_FUNC))
            this.resetVxFn();

        if(hasFlag(newFrame.FlagsToSet.Spawn,SPAWN_FLAGS.SPAWN_BIGDIRT))
            this.showBigDirt(frame);
        else if(hasFlag(newFrame.FlagsToSet.Spawn,SPAWN_FLAGS.SPAWN_SMALLDIRT))
            this.showSmallDirt(frame);

        if(hasFlag(newFrame.FlagsToSet.Player,PLAYER_FLAGS.MOVE_TO_BACK) || hasFlag(newFrame.FlagsToSet.Player,PLAYER_FLAGS.BLOCKING))
            this.moveToBack();
        if(hasFlag(newFrame.FlagsToSet.Player,PLAYER_FLAGS.MOVE_TO_FRONT))
            this.moveToFront();

        ignoredFlags = Player.prototype.AirborneFlags; /*flags to be set in the OnFrame function*/
        this.Flags.Pose.add((newFrame.FlagsToSet.Pose | ignoredFlags) ^ ignoredFlags);
        this.Flags.Combat.add(newFrame.FlagsToSet.Combat);

        /*
        //just became mobile
        if(!this.isMobile() && hasFlag(newFrame.FlagsToSet.Player,PLAYER_FLAGS.MOBILE))
        {
            //GotUpOnFrame is used to prevent the AI from grappling you immediately after you gets up
            this.GotUpOnFrame = this.getFrame();
            this.RegisteredHit.HitID = null;
        }
        */

        this.Flags.Player.add(newFrame.FlagsToSet.Player);
        this.Flags.Spawn.add(newFrame.FlagsToSet.Spawn);
        this.Flags.Combo.add(newFrame.FlagsToSet.Combo);
        //this.Flags.RCombat.add(newFrame.FlagsToSet.RCombat);
        this.Flags.Juggle.add(newFrame.FlagsToSet.Juggle);


        if(!!this.CanHoldAirborne && newFrame.isClearingAirborneFlag())
            this.stopJump();

        this.Flags.Pose.remove(newFrame.FlagsToClear.Pose);
        this.Flags.Combat.remove(newFrame.FlagsToClear.Combat);
        this.Flags.Player.remove(newFrame.FlagsToClear.Player);
        this.Flags.Spawn.remove(newFrame.FlagsToClear.Spawn);
        this.Flags.Combo.remove(newFrame.FlagsToClear.Combo);
        //this.Flags.RCombat.remove(newFrame.FlagsToClear.RCombat);
        this.Flags.Juggle.remove(newFrame.FlagsToClear.Juggle);

        this.ClipHitFront = newFrame.ClipHitFront || 0;
        this.ClipHitBack = newFrame.ClipHitBack || 0;
        this.ClipHitBottom = newFrame.ClipHitBottom || 0;
        this.ClipHitTop = newFrame.ClipHitTop  || 0;

        this.ClipMoveFront = newFrame.ClipMoveFront || (this.isStanding() ? this.StandingClip.Front : 0) || 0;
        this.ClipMoveBack = newFrame.ClipMoveBack || (this.isStanding() ? this.StandingClip.Back : 0) || 0;
        this.ClipMoveBottom = newFrame.ClipMoveBottom || (this.isStanding() ? this.StandingClip.Bottom : 0) ||  0;
        //some players will have a default clipTop, to make it easier to be jumped over.
        this.ClipMoveTop = newFrame.ClipMoveTop || (this.isStanding() ? this.StandingClip.Top : 0) || 0;

        if(!ignoreTranslation)
        {
            if(!!newFrame.X)
                this.moveX(newFrame.X);
            if(!!newFrame.Y)
                this.moveY(newFrame.Y);
        }

        if((!!newFrame.SoundFilename || !!newFrame.FlagsToSet.SwingSound) && !!isNewSound)
        {
            this.queueSwingSound(newFrame.FlagsToSet.SwingSound);
            if(!!newFrame.SoundFilename)
                this.queueSound(newFrame.SoundFilename,newFrame.SoundVolume);
        }
    }
}

Player.prototype.isStanding = function()
{
    return !this.isCrouching()
        && !this.isAirborne()
        && !this.isDead()
    ;
}

Player.prototype.initSprite = function()
{
    var src = "images/misc/" + this.Folder.toLowerCase() + "/sprites.png";
    this.SpriteElement.style.backgroundImage = "url('" + src + "')";
    for(var i = 0; i < this.Projectiles.length; ++i)
        this.Projectiles[i].Element.style.backgroundImage = "url(images/misc/" + this.Folder.toLowerCase() + "/projectiles.png)";
}

Player.prototype.setBgBase64 = function()
{
    /*
    var src = "images/misc/" + this.Folder.toLowerCase() + "/sprites.png";
    this.SpriteElement.style.backgroundImage = imageLookup_.getB64(src,true);
    this.Shadow.style.backgroundImage = imageLookup_.getB64("images/misc/shadow-sprites.png",true);
    for(var i = 0; i < this.Projectiles.length; ++i)
        this.Projectiles[i].Element.style.backgroundImage = imageLookup_.getB64("images/misc/" + this.Folder.toLowerCase() + "/projectiles.png",true);
    this.setBgBase64Helper(this.FrontHitReportImages,"", "images/misc/blast-sprites.png");
    this.setBgBase64Helper(this.RearHitReportImages,"", "images/misc/blast-sprites.png");
    this.setBgBase64Helper(this.OtherAnimations.Dirt,"Element", "images/misc/dirt-sprites.png");
    this.setBgBase64Helper(this.OtherAnimations.BigDirt,"Element", "images/misc/dirt-sprites.png");
    this.setBgBase64Helper(this.OtherAnimations.Dizzy,"Element", "images/misc/misc-sprites.png");
    */
}

Player.prototype.setBgBase64Helper = function(arr,attrib,key)
{
    for(var i = 0, length = arr.length; i < length; ++i)
        imageLookup_.getBgB64((!!attrib ? arr[i][attrib] : arr[i]),key);
}

Player.prototype.setSprite = function(frame)
{
    if(!!this.IsNewFrame)
    {
        data = spriteLookup_.get(this.CurrentFrame.RightSrc);
        if(!!data)
        {
            this.SpriteElement.style.backgroundPosition = data.Left + " " + data.Bottom;
            this.SpriteElement.style.width = data.Width;
            this.SpriteElement.style.height = data.Height;
            this.Element.style.width = data.Width;
            if(this.CurrentFrame.ImageOffsetX != undefined)
            {
                this.OffsetWidth = data.WidthInt+ this.CurrentFrame.ImageOffsetX;
                this.OffsetHeight = data.HeightInt+ this.CurrentFrame.ImageOffsetY;
                this.Element.style.width = this.OffsetWidth + "px";
            }
            else
            {
                this.OffsetWidth = data.WidthInt;
                this.OffsetHeight = data.HeightInt;
                this.Element.style.width = this.OffsetWidth + "px";
            }
        }
    }
    if(!this.IsSpriteReversed)
    {
        if(!!this.CurrentFrame.IsFlipped)
        {
            if(this.Direction == -1 && !!this.IsFlipped)
                this.flip(false);
            else if(this.Direction == 1 && !this.IsFlipped)
                this.flip(true);
        }
        else
        {
            if(this.Direction == -1 && !this.IsFlipped)
                this.flip(true);
            else if(this.Direction == 1 && !!this.IsFlipped)
                this.flip(false);
        }
    }
    if(this.Direction == -1)// && (this.CurrentFrame.ImageOffsetX != undefined))
        this.offsetImageX(this.CurrentFrame.ImageOffsetX);
    if(this.CurrentFrame.ImageOffsetY != undefined)
        this.offsetImageY(this.CurrentFrame.ImageOffsetY);
    if(!!this.CurrentAnimation && !!this.CurrentAnimation.Animation)
        this.CurrentAnimation.Animation.renderChildren(frame,this.CurrentAnimation.StartFrame,this.CurrentAnimation.Direction,parseInt(this.Element.style.zIndex) + 1,this.X,this.Y);
}

// Sets the x and y on the element
Player.prototype.render = function(frame,stageDiffX,stageDiffY)
{
    this.checkZOrder();
    this.setAirborneY();
    if(!this.IsPaused)
    {
        if(!!this.CurrentFrame)
        {
            this.setSprite(frame);
            if(!!this.CurrentFrame.ShadowImageSrc && (this.Shadow._relSrc != this.CurrentFrame.ShadowImageSrc))
            {
                this.Shadow._relSrc  = this.CurrentFrame.ShadowImageSrc;
                spriteLookup_.set(this.Shadow, this.CurrentFrame.ShadowImageSrc);
            }
        }


        if(this.Direction > 0)
            this.setRight(this.X);
        else
            this.setLeft(this.X);
        this.Element.style.bottom = Math.max(this.Y,game_.getMatch().getStage().getGroundY()) + "px";
        this.setImgRect();

        this.renderShadow();
        this.renderTrail(frame,stageDiffX,stageDiffY);

        if(!!__debugMode)
            this.renderDebugInfo();
    }
    this.IsNewFrame = false;
}

// renders the trail, if there is one
Player.prototype.renderTrail = function(frame,stageDiffX,stageDiffY)
{
    if(!!this.CurrentAnimation && !!this.CurrentAnimation.Animation && !!this.CurrentAnimation.Animation.Trail)
        this.CurrentAnimation.Animation.Trail.render(frame,-this.Direction * stageDiffX,stageDiffY);
}

Player.prototype.renderShadow = function()
{

    if(this.Direction > 0)
    {
        this.ShadowX = this.X + ((!!this.CurrentFrame ? this.CurrentFrame.ShadowOffset.X : 0) || this.DefaultShadowOffset) + "px";
        if((this.ShadowX != this.LastShadowX) || !!this.MustForceRenderShadow)
        {
            this.LastShadowX = this.ShadowX;
            this.ShadowContainer.style.right = this.ShadowX;
            this.Shadow.style.left = "";
            if(!this.Shadow.style.right)
                this.Shadow.style.right = "0px";
            if(!!this.getAdjustShadowPosition() && !this.ForceNoAdjustShadowPosition)
            {
                this.Shadow.style.right = this.SpriteElement.style.right;
            }
        }
    }
    else
    {
        this.ShadowX = this.X + ((!!this.CurrentFrame ? this.CurrentFrame.ShadowOffset.X : 0) || this.DefaultShadowOffset) + "px";
        if((this.ShadowX != this.LastShadowX) || !!this.MustForceRenderShadow)
        {
            this.LastShadowX = this.ShadowX;
            this.ShadowContainer.style.left = this.ShadowX;
            this.Shadow.style.right = "";
            if(!this.Shadow.style.left)
                this.Shadow.style.left = "0px";
            if(!!this.getAdjustShadowPosition() && !this.ForceNoAdjustShadowPosition)
            {
                this.Shadow.style.left = this.SpriteElement.style.left;
            }
        }
    }


    this.ShadowY = game_.getMatch().getStage().getOffsetY(true) + ((!!this.CurrentFrame ? this.CurrentFrame.ShadowOffset.Y : 0)) + "px";
    if((this.ShadowY != this.LastShadowY) || !!this.MustForceRenderShadow)
    {
        this.LastShadowY = this.ShadowY;
        this.Shadow.style.bottom = this.ShadowY;
    }
}

Player.prototype.forceWinAnimation = function(frame)
{
    var name = this.WinAnimationNames[Math.ceil(Math.random() * this.WinAnimationNames.length) - 1];
    if(name == undefined) name = CONSTANTS.DEFAULT_WIN_ANIMATION_NAME;
    this.executeAnimation(name, true, true);
    this.clearInput();
    this.abortThrow();
}
