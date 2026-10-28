Player.prototype.getDirection = function() { return this.Direction; }
Player.prototype.isFacingLeft = function() { return this.Direction > 0; }
Player.prototype.getDistanceFromSq = function(x,y)
{
    var dx = x-this.getMidX();
    var dy = y-this.getMidY();

    var distSq = dx*dx + dy*dy;

    return distSq;
}
Player.prototype.getDistanceFrom = function(x,y)
{
    var dx = x-this.getMidX();
    var dy = y-this.getMidY();

    var distSq = dx*dx + dy*dy;

    return {Dsq:distSq,Dx:Math.abs(dx),Dy:Math.abs(dy)};
}
Player.prototype.getDistanceFromPlayer = function(otherPlayer)
{
    var dx = otherPlayer.getMidX()-this.getMidX();
    var dy = otherPlayer.getMidY()-this.getMidY();

    var distSq = dx*dx + dy*dy;

    return {Dsq:distSq,Dx:Math.abs(dx),Dy:Math.abs(dy)};
}
Player.prototype.isWithinDistanceX = function(x, distance)
{
    return (
        this.Direction == 1 
            ? Math.abs(this.getRect().Left - x)
            : Math.abs(this.getRect().Right - x)
    ) < distance;
}
Player.prototype.isImgWithinDistanceX = function(x, distance, direction)
{
    return (Math.abs(x - (direction < 1 ? this.LeftOffset : this.RightOffset)) < distance) || (x > this.LeftOffset && x < this.RightOffset);
}
Player.prototype.getMidX = function()
{
    var left = this.getLeftX();
    var right = this.getRightX();

    return right - ((right-left)/2);
}
Player.prototype.getMidY = function()
{
    var bottom = this.getOffsetBoxBottom();
    var top = this.getBoxTop();

    return top - ((top-bottom)/2);
}

//0 would mean stationary on the X
Player.prototype.getXDir = function() { return (this.X - this.LastX) / Math.abs(this.X - this.LastX) || 0; }
//0 would mean stationary on the Y
Player.prototype.getYDir = function() { return (this.Y - this.LastY) / Math.abs(this.Y - this.LastY) || 0; }

Player.prototype.getLeftX = function(useImageWidth) { if(this.Direction > 0){return STAGE.MAX_STAGEX - (this.getX() + (!!useImageWidth ? this.getBoxWidth() : this.getConstWidth()));}else{return this.getX();}}
Player.prototype.getRightX = function(useImageWidth)  { if(this.Direction > 0){return STAGE.MAX_STAGEX - this.getX();}else{return this.getX() + (!!useImageWidth ? this.getBoxWidth() : this.getConstWidth());}}
Player.prototype.getImgFrontX = function(useImageWidth) { if(this.Direction > 0){ return this.getLeftX(useImageWidth); } else { return this.getRightX(useImageWidth); } }
Player.prototype.getAbsBackX = function(useImageWidth)  { if(this.Direction > 0){ return this.getRightX(useImageWidth); } else { return this.getLeftX(useImageWidth); } }

Player.prototype.getBoxTop = function() { return this.Y + (this.getBoxHeight()); }
Player.prototype.getConstOffsetTop = function() { return this.Height + game_.getMatch().getStage().getGroundY(); }
Player.prototype.getOffsetBoxTop = function() { return this.Y + (this.getBoxHeight()) - this.ClipMoveTop; }
Player.prototype.getBoxBottom = function() { return this.Y; }
Player.prototype.getOffsetBoxBottom = function() { return this.Y + this.ClipMoveBottom; }
/*Player.prototype.getConstWidth = function() { return (!!this.CurrentAnimation && !!this.CurrentAnimation.Animation && !!this.CurrentAnimation.Animation.isAttack()) ? this.getBoxWidth() : this.Width; }*/
Player.prototype.getConstHeight = function() { return this.Height; }
Player.prototype.getConstWidth = function() { return this.Width; }
Player.prototype.getConstFrontX = function() { return this.getX() + this.getConstWidth(); }
Player.prototype.getFrontX = function() { if(this.Direction > 0){ return this.LeftOffset; } else { return this.RightOffset; } }
Player.prototype.getBackX = function() { if(this.Direction > 1){ return this.LeftOffset; } else { return this.RightOffset; } }
Player.prototype.getBoxWidth = function() { return this.SpriteWidth; }
Player.prototype.getBoxHeight = function() { return this.SpriteHeight; }
Player.prototype.getRect = function(useImageWidth)
{
    return {
        Left:this.getLeftX(useImageWidth) + (this.Direction > 0 ? this.ClipMoveFront : this.ClipMoveBack)
        ,Right:this.getRightX(useImageWidth) - (this.Direction > 0 ? this.ClipMoveBack : this.ClipMoveFront)
        ,Top:this.getOffsetBoxTop()
        ,Bottom:this.getOffsetBoxBottom()
    };
}
Player.prototype.getImgRect = function(useImageWidth)
{
    return this.ImgBBox;
}
//records the image coordinates so that they can be used intead of going to the DOM every time.
Player.prototype.setImgRect = function()
{
    var imageOffsetY = (!!this.CurrentFrame ? this.CurrentFrame.ImageOffsetY : 0);
    var imageOffsetX = (!!this.CurrentFrame ? this.CurrentFrame.ImageOffsetX : 0);

    var bottom = (parseInt(this.Element.style.bottom) || 0) + imageOffsetY;

    this.SpriteHeight = parseInt(this.SpriteElement.style.height) || 0;
    this.SpriteWidth = parseInt(this.Element.style.width) || 0;

    this.TopOffset = bottom + this.SpriteHeight - this.ClipHitTop;
    this.BottomOffset = bottom + this.ClipHitBottom;
    this.BottomNoOffset = bottom;

    if(this.Direction > 0)
    {
        var right = STAGE.MAX_STAGEX - (parseInt(this.Element.style.right) || 0);

        this.LeftOffset = right - this.SpriteWidth + this.ClipHitFront;
        this.RightOffset = right - this.ClipHitBack - imageOffsetX;

        this.LeftNoOffset = this.LeftOffset;
        this.RightNoOffset = this.RightOffset + imageOffsetX;
    }
    else
    {
        var left = (parseInt(this.Element.style.left) || 0);

        this.LeftOffset = left + this.ClipHitBack + imageOffsetX;
        this.RightOffset = left + this.SpriteWidth - this.ClipHitFront;

        this.LeftNoOffset = this.LeftOffset - imageOffsetX;
        this.RightNoOffset = this.RightOffset;
    }

    this.ImgBBox.Left = this.LeftOffset;
    this.ImgBBox.Right = this.RightOffset;
    this.ImgBBox.Top = this.TopOffset;
    this.ImgBBox.Bottom = this.BottomOffset;
    this.ImgBBox.BottomNoOffset = this.BottomNoOffset;
    this.ImgBBox.LeftNoOffset = this.LeftNoOffset;
    this.ImgBBox.RightNoOffset = this.RightNoOffset;
}
Player.prototype.isFacingProjectile = function(projectile)
{
    if(this.Direction == -1  && projectile.Direction ==  1 && this.LeftOffset < projectile.getRightX()) return true;
    if(this.Direction ==  1  && projectile.Direction == -1 && this.RightOffset  > projectile.getLeftX()) return true;

    return false;
}
Player.prototype.isFacingPlayer = function(otherPlayer, ignoreOtherDirection)
{
    if(!!ignoreOtherDirection)
    {
        if(this.Direction ==  1  && otherPlayer.Direction == -1 && this.RightOffset  > otherPlayer.LeftOffset) return true;
        if(this.Direction ==  1  && otherPlayer.Direction == 1 && this.RightOffset > otherPlayer.RightOffset) return true;

        if(this.Direction == -1  && otherPlayer.Direction ==  1 && this.LeftOffset < otherPlayer.RightOffset) return true;
        if(this.Direction == -1  && otherPlayer.Direction == -1 && this.LeftOffset  < otherPlayer.LeftOffset) return true;
    }
    else
    {
        if(this.Direction == -1  && otherPlayer.Direction ==  1 && this.LeftOffset < otherPlayer.RightOffset) return true;
        if(this.Direction ==  1  && otherPlayer.Direction == -1 && this.RightOffset  > otherPlayer.LeftOffset) return true;
    }

    return false;
}

Player.prototype.isBehindPlayer = function(otherPlayer)
{
    if(this.Direction ==  1  && otherPlayer.Direction == 1 && this.RightOffset > otherPlayer.RightOffset) return true;
    if(this.Direction == -1  && otherPlayer.Direction == -1 && this.LeftOffset  < otherPlayer.LeftOffset) return true;

    return false;
}

Player.prototype.getRight = function() { return this.X; }
Player.prototype.getLeft = function() { return this.X; }
Player.prototype.getY = function() { return this.Y || 0; }
Player.prototype.getX = function() { return this.X || 0; }

Player.prototype.setRight = function(value)
{
    if(value != this.LastRight)
    {
        this.Element.style.right = (value) + "px";
        this.LastRight = value;
    }
}
Player.prototype.setLeft = function(value)
{
    if(value != this.LastLeft)
    {
        this.Element.style.left = (value) + "px";
        this.LastLeft = value;
    }
}

Player.prototype.setY = function(value)
{
    value = Math.max(value,game_.getMatch().getStage().getGroundY());
    this.MustForceRenderShadow = this.MustForceRenderShadow || (this.Y != value);
    this.Y = value;
    this.moveCircle();
}
Player.prototype.setX = function(value)
{
    value = value || 0;
    var r = this.getRect(true);
    var maxX = STAGE.MAX_STAGEX - (r.Right - r.Left);
    value = Math.max(Math.min(value, maxX),0);
    this.MustForceRenderShadow = this.MustForceRenderShadow || (this.X != value);
    this.X = value;
    this.moveCircle();
}
Player.prototype.show = function() { this.setDisplay(true); if(!!this.IsAI) {this.enableAI();} }
Player.prototype.hide = function() { this.setDisplay(false); }
Player.prototype.setDisplay = function(isVisible)
{
    if(!!isVisible)
    {
        this.Element.style.display = "";
        this.ShadowContainer.style.display = "";
    }
    else
    {
        this.Element.style.display = "none";
        this.ShadowContainer.style.display = "none";
    }
}
Player.prototype.alignX = function(deltaX) { this.X += (deltaX * -this.Direction); }
Player.prototype.checkGroundY = function()
{
    this.setGroundY(this.getStage().getGroundY());
}
Player.prototype.setImageX = function(value) {if(this.Direction > 0){this.SpriteElement.style.right = value+"px"; } else {this.SpriteElement.style.left = value+"px";}}
Player.prototype.setImageY = function(value) { this.SpriteElement.style.bottom = value+"px"; }
Player.prototype.isCrouching = function() { return this.Flags.Pose.has(POSE_FLAGS.CROUCHING); }
Player.prototype.isOnGround = function() { return this.Y == game_.getMatch().getStage().getGroundY(); }
Player.prototype.isMobile = function() { return this.Flags.Player.has(PLAYER_FLAGS.MOBILE); }
Player.prototype.hasAirborneFlag = function() { return this.Flags.Pose.has(POSE_FLAGS.AIRBORNE) || this.Flags.Pose.has(POSE_FLAGS.AIRBORNE_FB) }
Player.prototype.hasAirborneComboFlag = function() { return this.Flags.Pose.has(POSE_FLAGS.AIR_COMBO_1) || this.Flags.Pose.has(POSE_FLAGS.AIR_COMBO_2); }
Player.prototype.isAirborne = function() { return this.hasAirborneComboFlag() || this.hasAirborneFlag() || this.Y > game_.getMatch().getStage().getGroundY(); }
Player.prototype.setGroundY = function(groundY)
{
    if(!!this.isBeingGrappled())
        return;
    
    if(!this.hasAirborneFlag() && !this.hasAirborneComboFlag())
    {
        this.setY(groundY);
    }

    var offsetY = this.getStage().DeltaOffsetY;
    var isAirborne = this.hasAirborneFlag() || this.hasAirborneComboFlag();
    if(!!this.MaintainYPosition)
    {
        this.setY(this.Y + offsetY);
    }
}
Player.prototype.setAirborneY = function(groundY)
{
    //else if(this.Flags.Player.has(PLAYER_FLAGS.HUMAN_PROJECTILE))
}
Player.prototype.isDescending = function() { return this.LastFrameY > this.ConstY; }
Player.prototype.isVisible = function() { return !this.Flags.Player.has(PLAYER_FLAGS.INVISIBLE); }
Player.prototype.isTeleporting = function() { return !!this.isTeleportingStarting() || !!this.isTeleportingEnding() || this.Flags.Combat.has(COMBAT_FLAGS.TELEPORT); }
Player.prototype.isTeleportingStarting = function() { return !!this.CurrentAnimation && !!this.CurrentAnimation.Animation && hasFlag(this.CurrentAnimation.Animation.Flags.Combat,COMBAT_FLAGS.TELEPORT_START); }
Player.prototype.isTeleportingEnding = function()   { return !!this.CurrentAnimation && !!this.CurrentAnimation.Animation && hasFlag(this.CurrentAnimation.Animation.Flags.Combat,COMBAT_FLAGS.TELEPORT_END); }
Player.prototype.jumpedOverAPlayer = function() { return this.isAirborne() && this.isDescending() && !!this.MustChangeDirection; }

Player.prototype.setDirection = function(value)
{
    if(value != this.Direction)
        this.changeDirection();
}
Player.prototype.turnAround = function()
{
    this.MustChangeDirection = 1;

    if(!!this.IsBeingThrown)
        this.MustChangeDirectionQuick = true;
}


Player.prototype.checkMustChangeDirection = function()
{
    if(!!this.MustChangeDirection && !this.isDead())
    {
        this.changeDirection();
    }
}

Player.prototype.unreverseSprite = function()
{
    //are we already reversed?
    if(!!this.IsSpriteReversed)
    {
        ApplyFlip(this.SpriteElement);
        this.IsSpriteReversed = false;
    }
}

Player.prototype.reverseSprite = function()
{
    //are we already reversed?
    if(!this.IsSpriteReversed)
    {
        ApplyFlip(this.SpriteElement);
        this.IsSpriteReversed = true;   
    }
}

Player.prototype.changeDirection = function(quick,ignoreSetAnimation)
{
    this.unreverseSprite();
    this.MustChangeDirection = 0;
    var pnlStageWidth = STAGE.MAX_STAGEX;
    var imgWidth = this.getBoxWidth(); //parseInt(this.SpriteElement.style.width) || 0;


    //facing left
    if(this.isFacingLeft())
    {
        var x = this.getRight() + imgWidth;
        var left = pnlStageWidth - x;
        this.setX(left);

        this.SpriteElement.style.right = "";
        this.SpriteElement.style.left = "0px";

        this.Element.style.right = "";
        this.Element.style.left = left + "px";

        this.ShadowContainer.style.right = "";
        this.ShadowContainer.style.left = left + "px";

        this.Shadow.style.left = this.SpriteElement.style.left;
        this.Shadow.style.right = "";

        this.LastRight = null;

        this.Direction = -1;
        //swap the left and right buttons
        this.Buttons[this.LeftKey].Bit = 2;
        this.Buttons[this.RightKey].Bit = 1;
        this.flip(true);
    }
    else
    {
        var x = this.getLeft() + imgWidth;
        var right = pnlStageWidth - x;
        this.setX(right);

        this.SpriteElement.style.left = "";
        this.SpriteElement.style.right = "0px";
        
        this.Element.style.left = "";
        this.Element.style.right = right + "px";

        this.ShadowContainer.style.left = "";
        this.ShadowContainer.style.right = right + "px";

        this.Shadow.style.left = "";
        this.Shadow.style.right = this.SpriteElement.style.right;

        this.LastLeft = null;

        this.Direction = 1;
        //swap the left and right buttons
        this.Buttons[this.LeftKey].Bit = 1;
        this.Buttons[this.RightKey].Bit = 2;
        this.flip(false);
    }
    if(!quick && !ignoreSetAnimation)
    {
        if(!this.MustChangeDirectionQuick)
        {
            if(this.Flags.Pose.has(POSE_FLAGS.CROUCHING))
            {
                //var move = this.Moves[_c3("_",POSE_FLAGS.CROUCHING,"_turn")];
                var move = this.Moves[this.MoveNdx.CrouchTurn];
                this.setCurrentAnimation({Animation:move,StartFrame:game_.getCurrentFrame(),Direction:this.Direction});
            }
            else
            {
                //var move = this.Moves[_c3("_",POSE_FLAGS.ANY),"_quick_turn"] || this.Moves[_c3("_",POSE_FLAGS.STANDING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD,"_turn")];
                var move = this.Moves[this.MoveNdx.Turn];
                this.setCurrentAnimation({Animation:move,StartFrame:game_.getCurrentFrame(),Direction:this.Direction});
            }
        }
    }
    this.MustChangeDirectionQuick = false;


    var tmp = 0;
    for(var i = 0; i < this.ButtonStates.length; ++i)
    {
        if(this.ButtonStates[i].State[BUTTONS.BACK].Value == BUTTON_STATE.PRESSED)
        {
            
            this.ButtonStates[i].State[BUTTONS.BACK].Value = BUTTON_STATE.NONE;
            this.ButtonStates[i].State[BUTTONS.FORWARD].Value = BUTTON_STATE.PRESSED;

            tmp = this.ButtonStates[i].State[BUTTONS.FORWARD].Frame;
            this.ButtonStates[i].State[BUTTONS.FORWARD].Frame = this.ButtonStates[i].State[BUTTONS.BACK].Frame;
            this.ButtonStates[i].State[BUTTONS.BACK].Frame = tmp;
        }
        else if(this.ButtonStates[i].State[BUTTONS.FORWARD].Value == BUTTON_STATE.PRESSED)
        {
            this.ButtonStates[i].State[BUTTONS.FORWARD].Value = BUTTON_STATE.NONE;
            this.ButtonStates[i].State[BUTTONS.BACK].Value = BUTTON_STATE.PRESSED;

            tmp = this.ButtonStates[i].State[BUTTONS.BACK].Frame;
            this.ButtonStates[i].State[BUTTONS.BACK].Frame = this.ButtonStates[i].State[BUTTONS.FORWARD].Frame;
            this.ButtonStates[i].State[BUTTONS.FORWARD].Frame = tmp;
        }
    }

    if(this.ButtonState[BUTTONS.BACK].Value == BUTTON_STATE.PRESSED)
    {
        this.ButtonState[BUTTONS.BACK].Value = BUTTON_STATE.NONE;
        this.ButtonState[BUTTONS.FORWARD].Value = BUTTON_STATE.PRESSED;

        tmp = this.ButtonState[BUTTONS.FORWARD].Frame;
        this.ButtonState[BUTTONS.FORWARD].Frame = this.ButtonState[BUTTONS.BACK].Frame;
        this.ButtonState[BUTTONS.BACK].Frame = tmp;
    }
    else if(this.ButtonState[BUTTONS.FORWARD].Value == BUTTON_STATE.PRESSED)
    {
        this.ButtonState[BUTTONS.FORWARD].Value = BUTTON_STATE.NONE;
        this.ButtonState[BUTTONS.BACK].Value = BUTTON_STATE.PRESSED;

        tmp = this.ButtonState[BUTTONS.BACK].Frame;
        this.ButtonState[BUTTONS.BACK].Frame = this.ButtonState[BUTTONS.FORWARD].Frame;
        this.ButtonState[BUTTONS.FORWARD].Frame = tmp;
    }
}
Player.prototype.moveCircleToBottom = function()
{
    this.moveCircle();
    this.Circle.RenderY = this.Y + this.ClipMoveBottom + this.Circle.OffsetY;
}
Player.prototype.moveCircleToTop = function()
{
    this.moveCircle();
    this.Circle.RenderY = this.getBoxTop() - this.ClipMoveTop - this.Circle.R*2 - this.Circle.OffsetY;
}
Player.prototype.moveCircle = function()
{
    var x = 0;
    if(this.Direction < 0)
        x = this.getX();
    else
        x = STAGE.MAX_STAGEX - this.getX();
    if(!!this.CurrentFrame)
    {
        var r = this.getRect();
        this.Circle.R = (r.Right - r.Left) / 2;
        this.Circle.RSq = this.Circle.R * this.Circle.R;
    }
    if(this.Direction == -1)
        this.Circle.RenderX = x + this.Circle.R;
    else
        this.Circle.RenderX = x - this.Circle.R;


    this.Circle.LocalY = this.Circle.R;
    this.Circle.LocalX = this.Circle.R;

}
Player.prototype.moveY = function(amount,forced)
{
    var deltaY = this.moveYFn(amount,forced);
    var y = this.getY() + deltaY;
    this.setY(y);
    return deltaY;
}
Player.prototype.offsetImageX = function(amount)
{
    amount = amount || 0;
    if(amount != this.LastImageOffsetX)
    {
        this.setImageX(amount);
        this.LastImageOffsetX = amount;
        this.MustForceRenderShadow = true;
    }
}
Player.prototype.offsetImageY = function(amount)
{
    if(amount != this.LastImageOffsetY)
    {
        this.setImageY(amount);
        this.LastImageOffsetY = amount;
        this.MustForceRenderShadow = true;
    }
}
//sets the target to which the player will teleport
Player.prototype.setTeleportTarget = function(flag,nbFrames)
{
    var foe = this.getTarget();
    if(foe)
    {
        this.TeleportFramesLeft = nbFrames;
        this.Teleport0GapX = "";
        this.TeleportX = 0;
        switch(flag)
        {
            case COMBAT_FLAGS.TELEPORT_BEHIND:  { this.TeleportX = (STAGE.MAX_STAGEX - foe.X) / nbFrames; this.Teleport0GapX = "b"; break; }
            case COMBAT_FLAGS.TELEPORT_INFRONT: { this.TeleportX = (STAGE.MAX_STAGEX - foe.X - foe.OffsetWidth - this.OffsetWidth) / nbFrames; this.Teleport0GapX = "f"; break; }
            case COMBAT_FLAGS.TELEPORT_MIDDLE:  { this.TeleportX = ((STAGE.MAX_STAGEX - foe.X - foe.OffsetWidth - this.OffsetWidth) / nbFrames)/2; this.Teleport0GapX = "m"; break; }
            case COMBAT_FLAGS.TELEPORT_BACK:    { this.TeleportX = (0 - this.X) / nbFrames; this.Teleport0GapX = "bw"; break; }

            case COMBAT_FLAGS.TELEPORT:   { this.TeleportX = this.CurrentFrame.TeleportSpeed; this.Teleport0GapX = "t"; break; }
        }
        this.TeleportX /= 2;
    }
}

//Advances the players teleportation. If this is the last movement, the player is warper to his final position
Player.prototype.advanceTeleportation = function()
{
    if(!!this.TeleportFramesLeft)
    {
        var foe = this.getTarget();
        --this.TeleportFramesLeft;
        if(this.TeleportFramesLeft <= 0)
        {
            this.TeleportX = 0;
            if(hasFlag(this.CurrentAnimation.Animation.Flags.Combat,COMBAT_FLAGS.TELEPORT_END) && !!this.Teleport0GapX)
            {
                if(foe)
                {
                    var otherRect = foe.getRect();
                    var buffer = 1.5;
                    var midBuffer = 0.35;
                    var x = this.X;
                    switch(this.Teleport0GapX)
                    {
                        case "f":
                        {
                            //must end up infront of the enemy
                            x = this.Direction == -1 ? x = otherRect.Left - this.OffsetWidth * buffer : (STAGE.MAX_STAGEX - otherRect.Right) - this.OffsetWidth * buffer;
                            break;
                        }
                        case "b":
                        {
                            //must end up behind enemy
                            x = this.Direction == -1 ? x = otherRect.Right : x = STAGE.MAX_STAGEX - otherRect.Left;
                            break;
                        }
                        case "bw":
                        {
                            //back wall
                            x = 0;
                            break;
                        }
                        case "m":
                        {
                            //mid screen
                            x = this.Direction == -1 ? otherRect.Left * midBuffer : (STAGE.MAX_STAGEX - otherRect.Right) * midBuffer;
                            break;
                        }
                    }
                    this.setX(x);
                }
            }
        }
        else
        {
            if(!foe || !game_.getMatch().getCDHelper().isWithinDistanceX(this,foe,CONSTANTS.MIN_TELEPORT_DISTANCE_SQ) || (this.Teleport0GapX == "t"))
                this.moveX(this.TeleportX);
        }
    }
}
//returns true if player is facing his target
Player.prototype.isFacingTarget = function(ignorePendingDirectionChange)
{
    var otherPlayer = null;

    if(this.Team == 1)
        otherRect = this.getMatch().getTeamB().getPlayer(this.Target).getRect();
    else
        otherRect = this.getMatch().getTeamA().getPlayer(this.Target).getRect();

    var flipToNeg1 = false;
    var flipToPos1 = false;
    var myRect = this.getRect();

    if((this.Direction == -1) && (!this.MustChangeDirection || !!ignorePendingDirectionChange) && (myRect.Left > otherRect.Left) && (myRect.Right > otherRect.Right))
        flipToPos1 = true;
    else if((this.Direction == 1) && (!this.MustChangeDirection || !!ignorePendingDirectionChange) && (myRect.Right < otherRect.Right) && (myRect.Left < otherRect.Left))
        flipToNeg1 = true;

    //if both cases are false, or both cases are true, then the player should not do anything
    return flipToNeg1 == flipToPos1;
}

Player.prototype.getMustChangeDirection = function(recheck)
{
    return this.isFacingTarget();
}
Player.prototype.checkDirection = function()
{
    this.IsFlipped = IsFlipped(this.SpriteElement);
    if(!this.isFacingTarget())
        this.turnAround();
}
//player faces his target
Player.prototype.faceTarget = function(force)
{
    if(!this.isFacingTarget(force))
    {
        if(!force)
            this.turnAround();
        else
            this.changeDirection(true);
    }
}
Player.prototype.targetLastAttacker = function()
{
    if(!!this.RegisteredHit.OtherPlayer)
    {
        if(this.Target != this.RegisteredHit.OtherPlayer.getIndex())
        {
            this.Target = this.RegisteredHit.OtherPlayer.getIndex();
            this.faceTarget();
        }
    }
}
Player.prototype.targetPlayer = function(player)
{
    if(this.Target != player.getIndex())
    {
        this.Target = player.getIndex();
        this.faceTarget();
    }
}
Player.prototype.targetRearEnemy = function()
{
    var target = this.getCDHelper().getRearEnemy(this.Team, this.Direction, this.getRect(), this.Target);
    if(target != this.Target)
    {
        this.Target = target;
        this.turnAround();
    }
}

//moves the player in the stage
Player.prototype.moveX = function(amount)
{
    if(!amount)
        return 0;
    var x = this.getX();
    var deltaX = this.moveXFn(amount);
    x += deltaX;

    //this.setX(x);
    return deltaX;
}

//warps the player to a new location - no collision detection is done
Player.prototype.warpX = function(amount,autoDir)
{
    if(!!autoDir)
    {
        if(amount > 0)
        {
            //moving right
            if(this.Direction == -1)
                amount = Math.abs(amount);
            else
                amount = -Math.abs(amount);
        }
        else
        {
            //moving left
            if(this.Direction == -1)
                amount = -Math.abs(amount);
            else
                amount = Math.abs(amount);
        }
    }
    var oldX = this.getMidX();
    this.setX(this.X + amount);
    return this.getMidX() - oldX;
}

Player.prototype.warpY = function(amount)
{
    var oldY = this.Y;
    this.setY(this.Y + amount);

    return this.Y - oldY;
}

Player.prototype.convertX = function(x)
{
    if(this.Direction < 0)
        return STAGE.MAX_STAGEX - this.getBoxWidth() - x
    else
        return STAGE.MAX_STAGEX - this.getBoxWidth() - x;
}
Player.prototype.pushOtherPlayers = function()
{
    this.getCDHelper().moveOtherPlayers(this);
}
Player.prototype.convertY = function(y)
{
    return y;
}
Player.prototype.isLeftCornered = function(x)
{
    return this.LeftNoOffset <= STAGE.MIN_X;
}
Player.prototype.isLeftCorneredInStage = function(x)
{
    return this.isLeftCornered() && this.getStage().isLeftCornered();
}
Player.prototype.isRightCornered = function(x)
{
    return this.RightNoOffset >= STAGE.MAX_STAGEX;
}
Player.prototype.isRightCorneredInStage = function(x)
{
    return this.isRightCornered() && this.getStage().isRightCornered();
}
//Shows the dirt animation when a player is floored
Player.prototype.showBigDirt = function(frame)
{
    for(var i = 0; i < 4; ++i)
    {
        this.spawnBigDirt(frame,i * 40);
    }
}
//Shows the small dirt animation when a player is floored
Player.prototype.showSmallDirt = function(frame)
{
    for(var i = 0; i < 4; ++i)
    {
        this.spawnSmallDirt(frame,20 + (i * 30));
    }
}
//Puts a player in sliding motion
Player.prototype.startSlide = function(frame,amount,direction,fx,hideSlideDirt,forceSlide)
{
    if(!forceSlide && !!this.CurrentAnimation.Animation.Flags.Combat && hasFlag(this.CurrentAnimation.Animation.Flags.Combat,COMBAT_FLAGS.NO_SLIDE_BACK))
        return this.stopSlide();

    if(this.IsSliding)
    {
        this.T = 0;
        this.Fx = Math.sin(this.T) * amount;
    }

    this.ShowSlideDirt = !hideSlideDirt;

    if((this.Direction > 0 && direction < 0) || (this.Direction < 0 && direction > 0))
        this.SlideFactor = Math.abs(amount) * fx;
    else if((this.Direction > 0 && direction > 0) || (this.Direction < 0 && direction < 0))
        this.SlideFactor = -Math.abs(amount) * fx;

    this.SlideSpeed = fx;
    this.IsSliding = true;
}
//Handles the player sliding
Player.prototype.slide = function(frame)
{
    if(!!this.FrameFreeze)
        return;
    if(this.T >= CONSTANTS.HALF_PI || !this.IsSliding || !!this.isBeingGrappled())
    {
        this.stopSlide();
        return;
    }
    this.T = Math.min(this.T + (CONSTANTS.SLIDE_INC), CONSTANTS.HALF_PI);
    this.LastFx = this.Fx;
    this.Fx =  Math.sin(this.T) * this.SlideFactor;
    ++this.SlideCount;

    if(!!this.ShowSlideDirt)
    {
        if(this.SlideCount % CONSTANTS.DIRT_FREQUENCY == 0)
        {
            this.spawnSmallDirt(frame);
        }
    }

    var deltaX = (this.LastFx - this.Fx);
    
    if(this.isOnGround())
        this.moveX(deltaX);
    else
        this.SlideFactor *= 0.5;
    
}

Player.prototype.stopSlide = function(forced)
{
    if(!!this.IsSliding || !!forced)
    {
        this.T = 0;
        this.Fx = 0;
        this.SlideCount = 0;
        this.IsSliding = false;
        this.ShowSlideDirt = true;
    }
}

//returns true if the player should hold its airborne position
Player.prototype.mustHoldAirborne = function() { return this.Flags.Pose.has(POSE_FLAGS.FORCE_HOLD_AIRBORNE_XY) || this.Flags.Pose.has(POSE_FLAGS.HOLD_AIRBORNE); }

//calculates the next position of the players jump
Player.prototype.advanceJump = function(ignoreYCheck)
{
    //this.x1 = this.X0 + ((this.JumpVelocityX * this.JumpT) * 0.1);
    var y = this.Y0 + ((this.JumpVelocityY * this.JumpT) - ((CONSTANTS.HALF_G*this.Mass) * (this.JumpT*this.JumpT))) * CONSTANTS.Y_DAMPING;

    if(this.mustHoldAirborne())
    {
        this.holdJump();
        if(this.Flags.Pose.has(POSE_FLAGS.FORCE_HOLD_AIRBORNE_XY))
            return true;
    }
    if(this.Flags.Pose.has(POSE_FLAGS.FREEZE))
    {
        this.holdJump();
        return true;
    }

    this.JumpT += this.JumpSpeed;

    var dx = this.JumpVelocityX * CONSTANTS.X_DAMPING * this.JumpSpeed;
    var dy = y - this.OldY;

    if(!!this.vxFn)
        dx = this.vxFn(dx,this.JumpT);
    if(!!this.vyFn)
        dy = this.vyFn(dy,this.JumpT);

    this.OldY = y;

    this.moveX(dx);
    this.moveY(dy);

    this.peakY = (this.peakY < this.Y)
        ? this.Y
        : this.peakY;

    //did the player just hit the ground
    if((this.JumpT > this.JumpSpeed) && this.getY() <= game_.getMatch().getStage().getGroundY() && !(this.Flags.Player.has(PLAYER_FLAGS.HUMAN_PROJECTILE)))
    {
        this.IsLosing = false;
        this.clearAirborneFlags();
        this.vxFn = null;
        this.vyFn = null;
        this.JumpT = 0;
        //lets the stage move back down to the ground (just in case it wasnt triggered already)
        this.getStage().requestScrollY(false,this.Y);
        this.getMatch().decAirborne();
        this.LandedOnFrame = this.getFrame();
        //if the play fell from very high, then take damage
        this.checkFallingDamage();
        this.peakY = STAGE.FLOORY;
        return false;
    }

    return true;
}

Player.prototype.clearAirborneFlags = function()
{
    this.Flags.Pose.remove(POSE_FLAGS.AIR_COMBO_2);
    this.Flags.Pose.remove(POSE_FLAGS.AIR_COMBO_1);
    this.Flags.Pose.remove(POSE_FLAGS.AIRBORNE);
    this.Flags.Pose.remove(POSE_FLAGS.AIRBORNE_FB);
}


Player.prototype.performJump = function(vx,vy,vxFn,vyFn,jumpT,deltaY,useJumpSpeed,allowJuggle)
{
    if(!this.isAirborne())
    {
        this.getMatch().incAirborne();
    }
    else if(this.ComboCount > 1 && !!allowJuggle)
    {
        vx *= 0.75;
        vy *= 0.75;
    }
    this.JumpSpeed = !!useJumpSpeed ? this.DefaultJumpSpeed : 1;

    //store the X and Y modifier functions
    this.setVxFn(vxFn);
    this.setVyFn(vyFn);
    //store the initial position
    this.X0 = this.X;
    this.Y0 = this.Y + (deltaY || 0);
    this.OldY = this.Y;
    //store the velocity
    this.JumpVelocityX = vx;
    this.JumpVelocityY = vy;
    //store a timer
    //if(this.getCurrentComboCountFn() < 2 || !!jumpT)
    this.JumpT = jumpT || 0;
    this.JumpT = this.JumpT || 0;
    if(!this.hasAirborneComboFlag())
    {
        if(!!vx)
        {
            this.Flags.Pose.add(POSE_FLAGS.AIRBORNE_FB);
        }
        else
        {
            this.Flags.Pose.add(POSE_FLAGS.AIRBORNE);
        }
    }
    //this.advanceJump(true);
}

Player.prototype.stopJump = function(ignoreX)
{
    this.performJump(0,0,function(){return 0;},this.vyFn,this.JumpT);
}


Player.prototype.holdJump = function()
{
    if(this.Flags.Pose.has(POSE_FLAGS.FORCE_HOLD_AIRBORNE_XY) || (!!this.JumpT && !!this.CanHoldAirborne))
    {
        this.JumpT -= this.JumpSpeed;
    }
}

Player.prototype.setVyFn = function(fn) { this.vyFn = this.vyFn || fn; }
Player.prototype.setVxFn = function(fn) { this.vxFn = this.vxFn || fn; }

Player.prototype.resetVyFn = function(fn) { this.vyFn = function(b) { return b;} }
Player.prototype.resetVxFn = function(fn) { this.vxFn = function(b) { return b;} }

Player.prototype.clearVyFn = function() { this.vyFn = null; }
Player.prototype.clearVxFn = function() { this.vxFn = null; }

Player.prototype.flip = function(isFlipped)
{
    this.IsFlipped = isFlipped;
    AutoApplyFlip(this.SpriteElement,isFlipped);
}