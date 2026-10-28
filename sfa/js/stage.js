var centerScreen = function()
{
    var screenWidth = GetWidth(window.document.body);
    var screenHeight = GetHeight(window.document.body);
    var element = window.document.getElementById("pnlStage");
    var w = parseInt(GetWidth(element));
    var diff = (screenWidth - w) / 2;
    element.style.left = diff + "px";
}

var CreateStage = function(bg0XOffset)
{

    var moveXHelper = function(thisRef, amount, p2x0, p1x1, p2NewX, canCheck, isMovingBackwards, canIncreaseDeltaX)
    {
        var tmp = amount;
        var diffX = p2x0 - p1x1
        
        if(p1x1 < (p2x0 - tmp) && canCheck)
        {
            if(!!isMovingBackwards)
            {
                tmp = Math.min(diffX,amount * 2);
            }
        }

        if(!!canIncreaseDeltaX)
            tmp *= 4;

        thisRef._MoveX(-tmp,false,p2NewX);
    }

    var Stage = function()
    {
        this.BgImg0 =  {xOffset:0,element:window.document.getElementById("bg0")};
        this.BgImg1 = {element:window.document.getElementById("bg1")};
        this.Bg = {element:window.document.getElementById("pnlStage")};
        this.LastX = 0;
        this.X = 0;
        this.X0 = 0;
        this.X1 = 0;
        this.DeltaX = 0;
        this.OffsetY = 0;
        this.DeltaOffsetY = 0;
        this.DeltaY = 0;

        this.Bg0XOffset = bg0XOffset;
        this.BgRate = 0;
        this.MaxLeftScroll = 0;
        this.MaxRightScroll = 0;
        this.Music = null;
        this.Params = null;
        this.CanMoveY = true;

        this.YIncMultiplier = 40;
        this.YDecMultiplier = 20;
        this.YCount = 0;
        this.YMax = Math.PI;
        this.YInc = this.YMax / 40;
        this.TempY = 0;
        this.IsIncrementingY = undefined;
        this.HoldFrame = false;
    }
    Stage.prototype.getGame = function() { return game_; }
    Stage.prototype.getMatch = function() { return game_.getMatch(); }
    Stage.prototype.getCDHelper = function() { return this.getMatch().getCDHelper(); }
    Stage.prototype.onAudioLoaded = function()
    {
        this.playMusic();
    }
    Stage.prototype.loadAssets = function()
    {
        this.Music = "audio/" + this.Params.Name.toLowerCase() + "/theme.zzz";
        stuffLoader_.queue(this.Params.Name.toLowerCase() + "-theme.js",RESOURCE_TYPES.BASE64AUDIO);
        stuffLoader_.queue(this.Params.Bg0Img,RESOURCE_TYPES.IMAGE);
        stuffLoader_.queue(this.Params.Bg1Img,RESOURCE_TYPES.IMAGE);
    }
    Stage.prototype.setup = function(params)
    {
        this.Params = params;
        this.loadAssets();
    }
    Stage.prototype.start = function()
    {
        var val = STAGE.MAX_STAGEX-1152;

        this.BgImg0.xOffset = val/2;//this.Params.Bg0XOffset;
        this.BgImg0.yOffset = this.Params.Bg0YOffset;
        this.BgImg1.yOffset = this.Params.Bg1YOffset;

        this.BgYScrollRate = this.Params.Bg0YOffset / this.Params.Bg1YOffset;
        this.MaxScrollY = this.Params.Bg1YOffset / STAGE.SCROLLY_FACTOR;

        this.BgImg0.element.src = this.Params.Bg0Img;
        this.BgImg1.element.src = this.Params.Bg1Img;
        this.BgImg0.element.className = "bg0 " + this.Params.Name + "-bg0";
        this.BgImg1.element.className = "bg1 " + this.Params.Name + "-bg1";
        this.MaxLeftScroll  = val;//this.Params.MaxLeftScroll; 
        this.MaxRightScroll = 0;//this.Params.MaxRightScroll;

        this.CanMoveY = true;
    }

    Stage.prototype.restartMusic = function()
    {
        soundManager_.restart(this.Music);
    }

    Stage.prototype.playMusic = function()
    {
        soundManager_.play(this.Music,true);
    }

    Stage.prototype.pauseMusic = function()
    {
        soundManager_.pause(this.Music);
    }

    Stage.prototype.stopMusic = function()
    {
        soundManager_.stop(this.Music);
    }

    /**/
    Stage.prototype.pause = function()
    {
        this.pauseMusic();
    }

    /**/
    Stage.prototype.resume = function()
    {
        soundManager_.resume(this.Music);
    }

    /**/
    Stage.prototype.release = function()
    {
        this.stopMusic();
        this.BgImg0.element.src = "";
        this.BgImg1.element.src = "";
        this.BgImg0.element.className = "";
        this.BgImg1.element.className = "";
    }

    Stage.prototype.getDeltaY = function() { return this.getGroundY() - this.LastGroundY; }
    Stage.prototype.getDeltaX = function() { return this.X - this.LastX;}

    Stage.prototype.getOffsetY = function(flip)
    {
        return this.OffsetY;
    }

    Stage.prototype.getGroundY = function()
    {
        return STAGE.FLOORY + this.OffsetY;
    }

    Stage.prototype.preFrameMove = function(frame)
    {
    }

    Stage.prototype.frameMove = function(frame)
    {
        this.LastX = this.X;
        this.LastGroundY = this.getGroundY();
        this.DeltaX = 0;
        this.DeltaY = 0;
        this.DeltaOffsetY = 0;
        this.HoldFrame = false;
    }

    Stage.prototype.preRender = function(frame)
    {
    }

    Stage.prototype.render = function(frame)
    {
        this.handleYIncrement();

        this.BgImg0.element.style.left = this.X0 + "px";
        this.BgImg1.element.style.left = this.X1 + "px";

        var offset = this.BgImg1.yOffset - this.getOffsetY()

        this.BgImg0.element.style.top = this.BgImg0.yOffset - (this.BgYScrollRate * this.getOffsetY()) + "px";
        this.BgImg1.element.style.top = this.BgImg1.yOffset - this.getOffsetY() + "px";

        this.CanMoveY = true;
    }

    /* Returns true if the stage has been cornered */
    Stage.prototype.isCornered = function()
    {
        return this.isRightCornered() || this.isLeftCornered();
    }
    /* Returns true if the stage has been cornered */
    Stage.prototype.isRightCornered = function()
    {
        return this.X <= STAGE.MIN_STAGEX;
    }
    /* Returns true if the stage has been cornered */
    Stage.prototype.isLeftCornered = function()
    {
        return this.X >= STAGE.MAX_STAGEX;
    } 


    /*Clamps the X value to be between the min and max*/
    Stage.prototype.clampX = function(x,delta)
    {
        if(this.isLeftCornered() && ((x + delta) < STAGE.MIN_STAGEX))
        {
            delta = STAGE.MIN_STAGEX - x;
        }
        else if(this.isRightCornered() && ((x + delta) > STAGE.MAX_STAGEX))
        {
            delta = STAGE.MAX_STAGEX - x;
        }


        return delta;
    }

    /*Clamps the Y value to be between the min and max*/
    Stage.prototype.clampY = function(y,delta)
    {
        if((y + delta) < this.getGroundY())
        {
            delta = this.getGroundY() - y;
        }
        /*
        TODO: add support for a max Y value!
        else if((y + delta) > STAGE.CEILY)
        {
            delta = STAGE.CIELY - y;
        }
        */

        return delta;
    }

    /**/
    Stage.prototype.fixX = function(amount)
    {
        var stageMovedX = game_.getMatch().DeltaX;
        if(!!stageMovedX)
        {
            /*ensure the directions are the opposite*/
            amount = 0.5 * (Math.abs(amount) * (Math.abs(stageMovedX) / stageMovedX));
            this.moveX(amount);
        }

    }

    /*Aligns the players with the stage.*/
    Stage.prototype.alignPlayersX = function()
    {
        var match = this.getMatch();

        for(var i = 0, length = match.getTeamA().getPlayers().length; i < length; ++i)
            match.getTeamA().getPlayer(i).alignX(this.DeltaX);
        for(var i = 0, length = match.getTeamB().getPlayers().length; i < length; ++i)
            match.getTeamB().getPlayer(i).alignX(this.DeltaX);
    }

    /*Aligns the players with the stage.*/
    Stage.prototype.fixPlayersGroundY = function()
    {
        var match = this.getMatch();
        var groundY = this.getGroundY();

        for(var i = 0, length = match.getTeamA().getPlayers().length; i < length; ++i)
            match.getTeamA().getPlayer(i).setGroundY(groundY);
        for(var i = 0, length = match.getTeamB().getPlayers().length; i < length; ++i)
            match.getTeamB().getPlayer(i).setGroundY(groundY);
    }


    /*Scrolls the stage along the X axis*/
    Stage.prototype.moveX = function(amount)
    {
        var retVal = amount;
        var match = this.getMatch();
        var left = this.getCDHelper().getLeftMostPlayer();
        var right = this.getCDHelper().getRightMostPlayer();

        var isPlayerLeftCornered = left.isLeftCornered();
        var isPlayerRightCornered = right.isRightCornered();
        var isStageRightCornered = this.isRightCornered();
        var isStageLeftCornered = this.isLeftCornered();

        var farLeftX = left.getLeftX();
        var farRightX = right.getRightX();

        var isLeft = amount < 0;
        var canMove = true;

        if(!(isPlayerLeftCornered && isPlayerRightCornered))
        {
            if(isLeft)
            {
                if(isPlayerRightCornered || isStageLeftCornered)
                {
                    canMove = false;
                }
                else
                {
                    var dest = (farRightX + amount);
                    if(dest > STAGE.MAX_STAGEX)
                    {
                        retVal = dest - STAGE.MAX_STAGEX;
                    }
                }
            }
            else
            {
                if(isPlayerLeftCornered || isStageRightCornered)
                {
                    canMove = false;
                }
                else
                {
                    var dest = (farLeftX + amount);
                    if(dest < STAGE.MIN_STAGEX)
                    {
                        amount = -farLeftX;
                    }
                }
            }

            if(canMove)
            {
                //retVal = match.scrollX(-amount);
                retVal = this._MoveX(-amount);
            }
        }


        return retVal * 2;
    }

    /**/
    Stage.prototype.resetYOffset = function()
    {
        this.YCount = 0;
        //this.OffsetY = 0;
        this.DeltaOffsetY = 0;
        this.TempY = 0;
    }

    /**/
    Stage.prototype.requestScrollY = function(isUp,y,forceDown)
    {
        if(this.IsIncrementingY === undefined || !this.IsIncrementingY || !!forceDown)
        {
            y = y || 0;
            if(!!isUp && (y > STAGE.VERT_SCROLL_Y))
                this.IsIncrementingY = true;
            else if(!isUp)
                this.IsIncrementingY = false;
        }
    }

    /**/
    Stage.prototype.handleYIncrement = function()
    {
        if(this.IsIncrementingY !== undefined)
        {
            if(!!this.HoldFrame)
            {
                return;
            }

            if(!!this.IsIncrementingY)
            {
                this.incYOffset();
                var offsetY = Math.sin(this.YCount) * -this.YIncMultiplier;

                this.DeltaOffsetY = offsetY - this.OffsetY;
                this.OffsetY = offsetY;
            }
            else if(!!this.OffsetY)
            {
                this.decYOffset();

                var offsetY = Math.sin(this.YCount) * -this.YIncMultiplier;

                this.DeltaOffsetY = offsetY - this.OffsetY;
                this.OffsetY = offsetY;

                if(!this.YCount)
                    this.IsIncrementingY = undefined;
            }

            this.fixPlayersGroundY();
        }
    }

    /*increments the Y offset so that the screen can move in reaction to a player jumping, 
    or any action that would require the screen to move vertically.*/
    Stage.prototype.incYOffset = function()
    {
        this.YCount = Math.min(this.YCount + this.YInc, this.YMax / 2);

        //if the Y hits the ceiling value, then we wait for a request to decrement
        if(this.YCount == (this.YMax / 2))
        {
            this.IsIncrementingY = undefined;
        }
    }

    /*decrements the Y offset so that the screen can move in reaction to a player jumping, 
    or any action that would require the screen to move vertically.*/
    Stage.prototype.decYOffset = function()
    {
        //incrementing always overrides decrementing
        if(!this.IsIncrementingY)
        {
            this.YCount = Math.max(this.YCount - this.YInc, 0);
        }
    }
    /**/
    Stage.prototype.holdFrame = function(frame)
    {
        this.HoldFrame = true;
    }

    /*Checks for physics with the stage*/
    Stage.prototype.scrollX = function(amount,p1,p2,match,dontOverrideSign)
    {
        /*p1 must be the leftmost or right most player*/
        var retVal = amount;

        if(this.getCDHelper().isLeftMostPlayer(p1.Id))
        {
            p2 = this.getCDHelper().getRightMostPlayer();
        }
        else if(this.getCDHelper().isRightMostPlayer(p1.Id))
        {
            p2 = this.getCDHelper().getLeftMostPlayer();
        }
        else
            return retVal * 2;

        var direction = 1;
        /*decouple the direction of the amount from the players direction since we are using absolute positions in this function*/
        if(!dontOverrideSign)
        {
            if(p1.Direction > 0)
            {
                if(amount > 0) {direction = -1;amount = -Math.abs(amount);} else {direction = 1;amount = Math.abs(amount);}
            } 
            else
            {
                if(amount > 0) {direction = 1;amount = Math.abs(amount);} else {direction = -1; amount = -Math.abs(amount);}
            }
        }

        if(!p2)
        {
            this._MoveX(-amount,true);
            return retVal;
        }

        /*physics with stage*/
        var p1x0 = p1.getX();
        var p1x1 = p1x0 + retVal;
        var p2x0 = p2.getX();


        var p1LeftX = p1.getLeftX();
        var p1RightX = p1.getRightX();
        var p1NewLeftX = p1LeftX + amount;
        var p1NewRightX = p1RightX + amount;
        var p1MidX = p1LeftX + (p1RightX - p1LeftX)/2;
        var p1NewMidX = p1MidX + amount;

        var p2LeftX = p2.getLeftX();
        var p2RightX = p2.getRightX();
        var p2NewLeftX = p2LeftX + amount;
        var p2NewRightX = p2RightX + amount;
        var p2MidX = p2LeftX + (p2RightX - p2LeftX)/2;
        var p2NewMidX = p2MidX + amount;


        /*
        var fn = function(p2NewX, canCheck, isMovingBackwards, canIncreaseDeltaX)
        {
            var tmp = amount;
            var diffX = p2x0 - p1x1
            
            if(p1x1 < (p2x0 - tmp) && canCheck)
            {
                if(!!isMovingBackwards)
                {
                    tmp = Math.min(diffX,amount * 2);
                }
            }

            if(!!canIncreaseDeltaX)
                tmp *= 4;

            this._MoveX(-tmp,false,p2NewX);
            return retVal;
        }
        */

        var isP1InLeftThreshold = p1NewMidX >= CONSTANTS.MOVEMENT_THRESHOLD_LEFT;
        var isP2InLeftThreshold = p2NewMidX >= CONSTANTS.MOVEMENT_THRESHOLD_LEFT;
        var isP1InRightThreshold = p1NewMidX <= CONSTANTS.MOVEMENT_THRESHOLD_RIGHT;
        var isP2InRightThreshold = p2NewMidX <= CONSTANTS.MOVEMENT_THRESHOLD_RIGHT;
        var areBothPlayersInRightThreshold = isP1InRightThreshold && isP2InRightThreshold;
        var areBothPlayersInLeftThreshold = isP1InLeftThreshold && isP2InLeftThreshold;

        var isP1InThreshold = p1NewMidX >= CONSTANTS.MOVEMENT_THRESHOLD_LEFT && p1NewMidX <= CONSTANTS.MOVEMENT_THRESHOLD_RIGHT;
        var isP2InThreshold = p2NewMidX >= CONSTANTS.MOVEMENT_THRESHOLD_LEFT && p2NewMidX <= CONSTANTS.MOVEMENT_THRESHOLD_RIGHT;
        var areBothPlayersInThreshold = isP1InThreshold && isP2InThreshold;
        var isStageLeftCornered = this.X >= STAGE.MAX_STAGEX;
        var isStageRightCornered = this.X <= STAGE.MIN_STAGEX;
        var isStageCornered = isStageLeftCornered || isStageRightCornered;

        var isLeftPlayer = p1LeftX < p2LeftX;
        var leftCornerGap = isLeftPlayer ? p1LeftX : p2LeftX;
        var rightCornerGap = !isLeftPlayer ? STAGE.MAX_STAGEX - p1RightX : STAGE.MAX_STAGEX - p2RightX;
        var p2NewX = p2.getX() + (p2.Direction) * amount;

        var hasLargerLeftGap = leftCornerGap > rightCornerGap;
        var hasLargerRightGap = !hasLargerLeftGap;
        var isP1InAnyThreshold = isP1InThreshold ||  (isStageLeftCornered && isP1InLeftThreshold) || (isStageRightCornered && isP1InRightThreshold);
        var isMovingBackwards = !((p1.Direction == -1 && amount > 0) || (p1.Direction == 1 && amount < 0));
        var canIncreaseDeltaX = p1.jumpedOverAPlayer() && this.getCDHelper().isWithinDistanceX(p1,p2,CONSTANTS.SO_CLOSE);
        /*if both players are in the threshold, then the stage should not move*/
        if(areBothPlayersInThreshold)
        {
            //retVal *= 2;
        }
        /*if the stage is NOT cornered, and one of the players is outside of the threshold, then the stage can move*/
        else if(!isStageCornered && !areBothPlayersInThreshold)
        {
            moveXHelper(this, amount, p2x0, p1x1, p2NewX, !isP1InAnyThreshold, isMovingBackwards, canIncreaseDeltaX);
        }
        /*if the stage is left cornered, and the cornered player has moved far enough, and one of the players is beyond one of the right threshold, then the stage can move*/
        else if (isStageLeftCornered && hasLargerLeftGap && !areBothPlayersInRightThreshold)
        {
            moveXHelper(this, amount, p2x0, p1x1, p2NewX, !isP1InAnyThreshold, isMovingBackwards, canIncreaseDeltaX);
        }
        /*if the stage is right cornered, and the cornered player has moved far enough, and one of the players is beyond one of the left threshold, then the stage can move*/
        else if (isStageRightCornered && hasLargerRightGap && !areBothPlayersInLeftThreshold)
        {
            moveXHelper(this, amount, p2x0, p1x1, p2NewX, !isP1InAnyThreshold, isMovingBackwards, canIncreaseDeltaX);
        }


        return retVal * 2;
    }

    /*inits the background images*/
    Stage.prototype.init = function()
    {
        var screenWidth = GetWidth(window.document.body);
        var screenHeight = GetHeight(window.document.body);

        pnlStage_.style.width = STAGE.MAX_STAGEX + "px";

        var w = parseInt(GetWidth(this.Bg.element));
        if(!w) w = 0;
        var diff = (screenWidth - w) / 2;
        this.Bg.element.style.left = diff + "px";

        
        var diff0 = (screenWidth - parseFloat(this.BgImg0.element.width)) / 2;
        var diff1 = (screenWidth - parseFloat(this.BgImg1.element.width)) / 2;
        var img1Left = diff1 - diff;

        this.BgImg0.element.style.left = this.BgImg0.xOffset + "px";
        this.BgImg1.element.style.left = img1Left + "px";
        this.X = Math.abs(diff1 - diff);
        var elementWidth = parseFloat(this.Bg.element.style.width);
        this.MaxRight = img1Left - (this.BgImg1.element.width - STAGE.MAX_STAGEX) - img1Left;

        /*If the browser doesn't allow decimal places in pixel values, then we have to set the bgRate_ to 0.
        The far background will not scroll with the screen. You won't notice unless you know it's happening.*/
        /*
        var leftTest = parseFloat(this.BgImg0.element.style.left);
        leftTest += 0.01;
        this.BgImg0.element.style.left = leftTest + "px";

        if(leftTest != parseFloat(this.BgImg0.element.style.left))
            this.BgRate = 0;
        else
            this.BgRate = (this.BgImg0.element.width - elementWidth) / (this.BgImg1.element.width - elementWidth);
        */

        this.X0 = parseFloat(this.BgImg0.element.style.left);
        this.X1 = parseFloat(this.BgImg1.element.style.left);

        var bgImg0RightGap = parseInt(this.BgImg0.element.width) + parseInt(this.BgImg0.element.style.left) - w;
        var bgImg1RightGap = parseInt(this.BgImg1.element.width) + parseInt(this.BgImg1.element.style.left) - w;

        this.BgRate =  bgImg0RightGap / bgImg1RightGap;

        this._MoveX(0,true);
    }
    /* If any two players are at the edges of the screen, then the screen can not be moved */
    Stage.prototype.canScrollX = function ()
    {
        var flag = true;
        var match = this.getMatch();
        for(var i = 0; i < match.getTeamA().getPlayers().length; ++i)
        {
            if(match.getTeamA().getPlayer(i).getX() == STAGE.MIN_X)
            {
                if(!flag) return false;
                flag = false;
            }
        }
        for(var i = 0; i < match.getTeamB().getPlayers().length; ++i)
        {
            if(match.getTeamB().getPlayer(i).getX() == STAGE.MIN_X)
            {
                if(!flag) return false;
                flag = false;
            }
        }

        return true;
    }


    /* Scrolls the backgrounds horizontally */
    Stage.prototype._MoveHoriz = function(amount,px)
    {
        if(!this.canScrollX())
        {
            this.DeltaX = 0;
            return;
        }

        if(px <= 0 || px >= STAGE.MAX_X)
        {
            amount = 0;
        }
        this.X0 += amount * this.BgRate;
        this.X1 += amount;

        this.X += amount;

        this.DeltaX = amount;
        if(this.X1 > 0)
        {
            //floating point error will cause them to be off a little, this will fix
            this.DeltaX = 0;
            this.X0 = 0;
            this.X1 = 0;
            this.X = STAGE.MAX_STAGEX;
        }
        if(this.X1 < this.MaxRight)
        {
            //floating point error will cause them to be off a little, this will fix
            this.DeltaX = 0;
            this.X0 = this.MaxRightScroll;
            this.X1 = this.MaxRight;
            this.X = 0;
        }
        this.alignPlayersX();
    }

    /* Scrolls the backgrounds horizontally */
    Stage.prototype._MoveX = function(amount,dontAlignPlayers,px)
    {
        if(!this.canScrollX())
        {
            this.DeltaX = 0;
            return 0;
        }

        if(!!px && (px <= 0 || px >= STAGE.MAX_X))
        {
            amount = 0;
        }

        this.X0 += amount * this.BgRate;
        this.X1 += amount;

        this.X += amount;

        this.DeltaX = amount;
        if(this.X1 > 0)
        {
            //floating point error will cause them to be off a little, this will fix
            this.X0 = this.MaxRightScroll;
            this.X1 = 0;
            !dontAlignPlayers
                ? this.DeltaX = 0
                : this.DeltaX = this.X - STAGE.MAX_STAGEX;
            this.X = STAGE.MAX_STAGEX;
        }
        if(this.X1 < this.MaxRight)
        {
            //floating point error will cause them to be off a little, this will fix
            this.X0 = this.MaxLeftScroll;
            this.X1 = this.MaxRight;
            !dontAlignPlayers
                ? this.DeltaX = 0
                : this.DeltaX = 0 - this.X;
            this.X = 0;
        }
        if(!dontAlignPlayers)
            this.alignPlayersX();
        return this.DeltaX;
    }

    return new Stage();
}