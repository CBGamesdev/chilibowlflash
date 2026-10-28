var CreateAnimationTrail = function(animations,zIndex,delay)
{
    var AnimationTrail = function()
    {
        this.FollowElement = null;
        this.Player = null;
        this.Trail = [];
        this.Delay = delay || 12;
        this.Enabled = false;
        this.StageDeltaX = 0;
        this.StageDeltaY = 0;
    }

    AnimationTrail.prototype.id = 0;
    AnimationTrail.prototype.getNextId = function() { return AnimationTrail.prototype.id++; }

    AnimationTrail.prototype.release = function()
    {
        for(var i = 0, length = this.Trail.length; i < length; ++i)
        {
            utils_.removeFromDOM(this.Trail[i].Element);
        }
        utils_.releaseArray(this.Trail);
        utils_.removeFromDOM(this.FollowElement);
        this.Player = null;
    }

    AnimationTrail.prototype.add = function(animation,followElement,folder,player)
    {
        this.Player = player;
        var img = window.document.createElement("div");
        img.className = "player-sprite";

        var div = window.document.createElement("div");
        div.className = "player";
        /*this.B64Key = "images/misc/" + folder + "/trail-sprites.png";*/
        div.style.backgroundImage = "url(images/misc/" + folder + "/trail-sprites.png)";
        div.appendChild(img);

        this.Trail[this.Trail.length] = {StartFrame:0,Element:div,Animation:animation,FrameIndex:0,LastImageSrc:"",Coords:[],HasB64:false};

        this.FollowElement = this.FollowElement || followElement;
        if(!!this.FollowElement)
        {
            var container = this.FollowElement.parentNode;
            if(container.children.length == 0)
                container.appendChild(div);
            else
                container.insertBefore(div,container.children[0]);
        }
    }


    AnimationTrail.prototype.disable = function()
    {
        if(!!this.Enabled)
        {
            this.StageDeltaX = 0;
            this.StageDeltaY = 0;

            this.Enabled = false;

            for(var i = 0, length = this.Trail.length; i < length; ++i)
            {
                //this.FollowElement.parentNode.removeChild(this.Trail[i].Element);
                this.Trail[i].Element.style.display = "none";
                this.Trail[i].FrameIndex = 0;
            }
        }
    }


    AnimationTrail.prototype.enable = function(frame,followElement,direction)
    {
        if(!this.Enabled)
        {
            this.StageDeltaX = 0;
            this.StageDeltaY = 0;

            this.FollowElement = this.FollowElement || followElement;
            var container = this.FollowElement.parentNode;
            for(var i = 0, length = this.Trail.length; i < length; ++i)
            {
                AutoApplyFlip(this.Trail[i].Element,direction == -1);
                this.Trail[i].Animation.clearAllFrameUserData();
                this.Trail[i].StartFrame = frame + (this.Delay * (i + 1));
                this.Trail[i].FrameIndex = 0;
            }
            this.Enabled = true;
        }
    }

    /*returns the current frame for the trail*/
    AnimationTrail.prototype.getCurrentFrame = function(index)
    {
        return this.Trail[index].Animation.BaseAnimation.Frames[this.Trail[index].FrameIndex];
    }
    /**/
    AnimationTrail.prototype.frameMove = function(frame,index,direction,stageX,stageY)
    {
        if(this.Enabled)
        {
            this.Direction = direction;
            var bottom = parseInt(this.FollowElement.style.bottom);
            var left = this.FollowElement.style.left;
            var right = this.FollowElement.style.right;

            if(!!this.Player)
            {
                var rect = this.Player.getImgRect();
                bottom = rect.BottomNoOffset;
                if(right == "")
                    left = rect.Left;
                else
                    right = STAGE.MAX_STAGEX - rect.Right;
            }

            if(right === "")
                left = left + "px";
            else
                right = right + "px";

            for(var i = 0, length = this.Trail.length; i < length; ++i)
            {
                this.Trail[i].Animation.addUserDataToFrame(index, 
                    {
                        Frame:frame
                        ,Left:left
                        ,Right:right
                        /*Must remove the stage offsetY from the cordinate and apply it on the current frame.*/
                        /*Remember that recording it here will apply the coordinate after a certain number of frames,*/
                        /*and if the screen Y changes then it will mess up the trail - so we must remove the screen offset*/
                        ,Bottom:bottom - game_.getMatch().getStage().OffsetY + "px"
                        ,Top:this.FollowElement.style.top
                        ,DeltaX:0
                        ,DeltaY:0
                        ,Flip:this.Player.IsSpriteReversed
                    });
            }
        }
    }


    /*The trail is applying the exact coords of the player, but the screen may move, which must be applied to all trail coords!*/
    AnimationTrail.prototype.applyStageOffset = function(stageDiffX,stageDiffY)
    {
        if(!!stageDiffX)
        {
            for(var trailIndex = 0, nbTrails = this.Trail.length; trailIndex < nbTrails; trailIndex++)
            {
                for(var frameIndex = 0, nbFrames = this.Trail[trailIndex].Animation.BaseAnimation.Frames.length; frameIndex < nbFrames; ++frameIndex)
                {
                    var frame = this.Trail[trailIndex].Animation.BaseAnimation.Frames[frameIndex];
                    var coords = frame.UserData;
                    for(var coordIndex = 0, nbCoords = coords.length; coordIndex < nbCoords; coordIndex++)
                    {
                        coords[coordIndex].DeltaX += stageDiffX;
                    }
                }
            }
        }

        if(!!stageDiffY)
        {
            for(var trailIndex = 0, nbTrails = this.Trail.length; trailIndex < nbTrails; trailIndex++)
            {
                for(var frameIndex = 0, nbFrames = this.Trail[trailIndex].Animation.BaseAnimation.Frames.length; frameIndex < nbFrames; ++frameIndex)
                {
                    var frame = this.Trail[trailIndex].Animation.BaseAnimation.Frames[frameIndex];
                    var coords = frame.UserData;
                    for(var coordIndex = 0, nbCoords = coords.length; coordIndex < nbCoords; coordIndex++)
                    {
                        //coords[coordIndex].DeltaY += -stageDiffY;
                    }
                }
            }
        }
    }

    /*returns the first coordinate at the requested frame index*/
    AnimationTrail.prototype.getNextCoord = function(index)
    {
        /*get the current frame*/
        var retVal =  null;
        var frameToRender = this.getCurrentFrame(index);
        if(!!frameToRender)
        {
            var tmp = frameToRender.UserData.splice(0,1);
            retVal = tmp[0];
        }
        return retVal;
    }

    AnimationTrail.prototype.render = function(frame,stageDiffX,stageDiffY)
    {
        if(this.Enabled)
        {
            /*The trail is applying the exact coords of the player, but the screen may move, which must be applied to all trail coords!*/
            this.applyStageOffset(stageDiffX,stageDiffY);
            var stageOffsetY = game_.getMatch().getStage().OffsetY;
            
            for(var i = 0, length = this.Trail.length; i < length; i++)
            {
                if(frame > this.Trail[i].StartFrame)
                {
                    var coords = this.getNextCoord(i);
                    if(!!coords)
                    {
                        this.Trail[i].Element.style.left = (!!coords.Left) ? coords.DeltaX + parseInt(coords.Left) + "px" : "";
                        this.Trail[i].Element.style.right = (!!coords.Right) ? coords.DeltaX + parseInt(coords.Right) + "px" : "";
                        this.Trail[i].Element.style.bottom = (!!coords.Bottom) ? coords.DeltaY + stageOffsetY + parseInt(coords.Bottom) + "px" : "";
                        this.Trail[i].Element.style.top = (!!coords.Top) ? coords.DeltaY + parseInt(coords.Top) + "px" : "";
                        if(!!coords.Flip)
                            AutoApplyFlip(this.Trail[i].Element, this.Direction == 1 ? coords.Flip : !coords.Flip);
                    }
                }
                if(frame > this.Trail[i].StartFrame)
                {
                    var currentItem = this.Trail[i];

                    if(!currentItem.Animation.hasUserData(currentItem.FrameIndex))
                        ++currentItem.FrameIndex;

                    var frameToRender = this.getCurrentFrame(i);
                    if(!!frameToRender)
                    {
                        spriteLookup_.set(currentItem.Element,frameToRender.RightSrc);
                    }
                }
            }
        }
    }

    return new AnimationTrail();
}