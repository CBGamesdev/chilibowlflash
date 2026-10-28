
/************************************************************************/
/************************************************************************/
var Key = function(name,keyCode,bit)
{
    this.IsPressed = false;
    this.KeyCode = keyCode || null;
    this.Name = name;
    this.Bit = bit;
}
/*
    Determines whether this instance has the passed in key code
*/
Key.prototype.handleKey = function(keyCode)
{
    this.IsPressed = (this.KeyCode === keyCode);

    return !!this.IsPressed ? this.Bit : 0;
}
/************************************************************************/
/************************************************************************/

    var Animation = function(requiredFlags,name,duration,frames,keySequence,flags,priority,energyToAdd,isAttack,allowAirBlock,behaviorFlags,invokedAnimationName)
    {
        this.ProjectileId = null;
        this.IsProjectilePending = false;
        this.BaseAnimation = new BaseAnimation(frames,name,isAttack,allowAirBlock);
        this.KeySequence = keySequence;
        this.AlternateKeySequences = [];
        this.ButtonSequence = [];
        this.ButtonCount = 0;
        this.AlternateButtonSequences = [];
        this.AdjustShadowPosition = true;
        this.Duration = duration || 0;
        this.ChainAnimation = null;
        this.ChainOnHitAnimation = null;
        this.ChainAnimationFrame = 0;
        this.ChainOnHitAnimationFrame = 0;
        this.GrappleDistance = 0;
        this.IsImplicit = false;
        this.Priority = priority || 100;
        this.Vx = 0;
        this.Vy = 0;
        this.chainVxFn = function(x) { return x; };
        this.chainVyFn = function(y) { return y; };
        this.vyFn = function(a) {return function(b) {return b}};
        this.vxFn = function(a) {return function(b) {return b}};
        this.vyAirFn = function(a) {return function(b) {return b}};
        this.vxAirFn = function(a) {return function(b) {return b}};
        this.EnergyToAdd = energyToAdd || 0;
        this.EnergyToSubtract = 0;
        this.InvokedAnimationName = invokedAnimationName || "";
        this.ControllerAnimation = null;
        this.Trail = null;
        this.Animations = [];
        this.AllowJuggle = false;
        this.IgnoresCollisions = false;
        this.OtherPlayerAirborneFlags;
        this.IsThrow = false;
        this.IsSuperMove = false;
        this.IsSpecialMove = false;
        this.IsLooping = false;
        this.MaxNbHits = CONSTANTS.MAX_NBHITS;

        this.Flags = {};
        this.RequiredFlags = requiredFlags;
        this.BehaviorFlags = behaviorFlags || 0;
        this.OverrideFlags = new MoveOverrideFlags();
        this.KeepCurrentAirborneFunctions = false;
        this.UseNewAirborneFunctions = false;
        this.UseJumpSpeed = false;
        this.UseCurrentJump = false;

        this.VyAirFnArgs = {};
        this.VxAirFnArgs = {};
        this.VxFnArgs = {};
        this.VyFnArgs = {};

        this.UserData = null;
        this.InteruptAnimation = null;
        this.InteruptAnimationFlags = null;
        /*by setting the following value, the jump will start at a different point. It is almost like skipping frames to a certain point in a jump.*/
        this.NbFramesAirborneAdvance = 0;
        /*by setting the following value the initial jump Y position will be set*/
        this.AirborneStartDeltaY = 0;
        this.MaintainYPosition = false;
        this.NbChargeFrames = CONSTANTS.NBCHARGE_FRAMES;

        this.DefaultLocalHitStop = undefined;
        this.DefaultEnemyHitStop = undefined;
    }
    Animation.prototype.setDefaultHitStop = function(local,foe) { this.DefaultLocalHitStop = local; this.DefaultEnemyHitStop = foe; }
    Animation.prototype.getXModifier = function() { return this.xModifier(this.VxFnArgs); }
    Animation.prototype.getYModifier = function() { return this.yModifier(this.VyFnArgs); }
    Animation.prototype.getAirYModifier = function() { return this.airYModifier(this.VyAirFnArgs); }
    Animation.prototype.getAirXModifier = function() { return this.airXModifier(this.VxAirFnArgs); }
    Animation.prototype.xModifier = function(args) { return this.vxFn(args); }
    Animation.prototype.yModifier = function(args) { return this.vyFn(args); }
    Animation.prototype.airYModifier = function(args) { return this.vyAirFn(args); }
    Animation.prototype.airXModifier = function(args) { return this.vxAirFn(args); }
    Animation.prototype.setOtherPlayerAirborneFlags = function(flags) { this.OtherPlayerAirborneFlags = flags; }
    Animation.prototype.getOtherPlayerAirborneFlags = function() { return this.OtherPlayerAirborneFlags; }
    Animation.prototype.isAttack = function() { return this.BaseAnimation.IsAttack; }
    Animation.prototype.makeHitsUnique = function()
    {
        var hitId = 0;
        for(var i = 0; i < this.BaseAnimation.Frames.length; ++i)
        {
            this.BaseAnimation.Frames[i].HitID = ++hitId;
        }
    }

    Animation.prototype.endBlock = function()
    {
        for(var i = 0; i < this.BaseAnimation.Frames.length; ++i)
        {
            if(!!hasFlag(this.BaseAnimation.Frames[i].FlagsToSet.Combat,COMBAT_FLAGS.ATTACK))
                break;
            this.BaseAnimation.Frames[i].FlagsToSet.AI |= AI_FLAGS.ATTACK_PENDING;
        }

        this.BaseAnimation.SkipFrameBlockCheck = true;
        this.BaseAnimation.CanAddStopBlock = true;
        this.BaseAnimation.SetFramesToVulnerable = true;
    }

    Animation.prototype.addAlternateKeySequence = function(sequence)
    {
        this.AlternateKeySequences[this.AlternateKeySequences.length] = sequence;
    }

    Animation.prototype.chain = function(move,frameOffset)
    {
        this.ChainAnimation = (move);
        this.ChainAnimationFrame = (frameOffset || 0);
    }

    Animation.prototype.chainOnHit = function(move,frameOffset)
    {
        this.ChainOnHitAnimation = (move);
        this.ChainOnHitAnimationFrame = (frameOffset || 0);
    }

    Animation.prototype.chainOnButtonPress = function(move,frameOffset,key,offset)
    {
        this.ChainOnKeyAnimation = (move);
        this.ChainOnKeyKey = key;
        this.ChainOnKeyAnimationFrame = (frameOffset || 0);
        this.ChainOnKeyMinOffset = offset;
    }

    Animation.prototype.allowInterupt = function(move,frameOffset,flags)
    {
        this.InteruptAnimation = move;
        this.ChainAnimationFrame = (frameOffset || 0);
        this.InteruptAnimationFlags = flags;
    }

    Animation.prototype.addAnimation = function(animation)
    {
        this.Animations.push(animation);
    }

    Animation.prototype.setDefaultsForLastFrames = function(nbFrames)
    {
        var i = nbFrames || 1;
        while(!!i)
        {
            if(!!this.DefaultLocalHitStop)
                this.BaseAnimation.Frames[this.BaseAnimation.Frames.length - i].HitStop = this.DefaultLocalHitStop;
            if(!!this.DefaultEnemyHitStop)
                this.BaseAnimation.Frames[this.BaseAnimation.Frames.length - i].EnemyHitStop = this.DefaultEnemyHitStop;
            --i;
        }
    }

    Animation.prototype.addFrameWithSound = function(player,volume,soundFilename,shadowOffset,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,chainProjectile,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitStop,energytoAdd,slideForce,slideFactor)
    {
        this.IgnoresCollisions = !!flagsToSet && hasFlag(flagsToSet.Player,PLAYER_FLAGS.IGNORE_COLLISIONS);
        this.BaseAnimation.addFrameWithSound.apply(this.BaseAnimation,arguments);
        this.setDefaultsForLastFrames();
        return this.BaseAnimation.Frames[this.BaseAnimation.Frames.length-1];
    }

    Animation.prototype.addFrame = function(player,shadowOffset,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,chainProjectile,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitStop,energytoAdd,slideForce,slideFactor)
    {
        this.IgnoresCollisions = !!flagsToSet && hasFlag(flagsToSet.Player,PLAYER_FLAGS.IGNORE_COLLISIONS);
        this.BaseAnimation.addFrame.apply(this.BaseAnimation,arguments);
        this.setDefaultsForLastFrames();
        return this.BaseAnimation.Frames[this.BaseAnimation.Frames.length-1];
    }
    Animation.prototype.addOffsetFrame = function(player,shadowOffset,shadowImage,image,nbFrames,x,y)
    {
        this.BaseAnimation.addOffsetFrame.apply(this.BaseAnimation,arguments);
        this.setDefaultsForLastFrames();
        return this.BaseAnimation.Frames[this.BaseAnimation.Frames.length-1];
    }
    Animation.prototype.addRepeatingFrameWithSound = function(player,volume,soundFilename,shadowOffset,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitStop,energytoAdd,slideForce,slideFactor)
    {
        this.IgnoresCollisions = !!flagsToSet && hasFlag(flagsToSet.Player,PLAYER_FLAGS.IGNORE_COLLISIONS);
        this.BaseAnimation.addRepeatingFrameWithSound.apply(this.BaseAnimation,arguments);
        this.setDefaultsForLastFrames(nbFrames);
        return CreateFrameAdapter(this.BaseAnimation.Frames,nbFrames);
    }
    Animation.prototype.addRepeatingFrame = function(player,shadowOffset,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitStop,energytoAdd,slideForce,slideFactor)
    {
        this.IgnoresCollisions = !!flagsToSet && hasFlag(flagsToSet.Player,PLAYER_FLAGS.IGNORE_COLLISIONS);
        this.BaseAnimation.addRepeatingFrame.apply(this.BaseAnimation,arguments);
        this.setDefaultsForLastFrames(nbFrames);
        return CreateFrameAdapter(this.BaseAnimation.Frames,nbFrames);
    }
    Animation.prototype.getNextFrameOffset = function(id) { return this.BaseAnimation.getNextFrameOffset.apply(this.BaseAnimation,arguments); }
    Animation.prototype.getFrame = function(frameDelta)
    {
        if(!!this.ControllerAnimation && !!this.ControllerAnimation.Animation)
        {
            var index = this.ControllerAnimation.FrameIndex;
            if(index > -1)
                return this.BaseAnimation.Frames[index];
        }
        else
        {
            if(!!this.IsLooping && (frameDelta > this.BaseAnimation.NbFrames))
                frameDelta = frameDelta % this.BaseAnimation.NbFrames;

            return this.BaseAnimation.getFrame.apply(this.BaseAnimation,arguments);
        }

        return null;
    }
    Animation.prototype.getFrameIndex  = function(id) { return this.BaseAnimation.getFrameIndex(id); }
    Animation.prototype.setGrappleDistance = function(x)
    {
        this.GrappleDistance = x;
        this.BehaviorFlags = BEHAVIOR_FLAGS.THROW;
        this.IsThrow = true;
    }
    Animation.prototype.addUserDataToFrame = function(index,data)
    {
        var frame = this.BaseAnimation.Frames[index];
        frame.UserData[frame.UserData.length] = data;
    }
    Animation.prototype.clearAllFrameUserData = function()
    {
        for(var i = 0,length = this.BaseAnimation.Frames.length; i < length; ++i)
            this.BaseAnimation.Frames[i].UserData = [];
    }

    Animation.prototype.setMediumAttack = function()
    {
        this.EnergyToAdd = 2;
    }

    Animation.prototype.setHardAttack = function()
    {
        this.EnergyToAdd = 3;
    }

    Animation.prototype.renderChildren = function(frame,startFrame,direction,zIndex,x,y)
    {
        for(var i = 0,length = this.Animations.length; i < length; ++i)
            this.Animations[i].tryRender(frame,{StartFrame:startFrame,ZIndex:zIndex,X:x,Y:y},direction);
    }

    Animation.prototype.hideChildren = function()
    {
        for(var i = 0,length = this.Animations.length; i < length; ++i)
            this.Animations[i].hide();
    }

    Animation.prototype.release = function()
    {
        utils_.releaseArray(this.Animations);
        if(!!this.Trail)
            this.Trail.release();
        this.BaseAnimation.release();
    }

    Animation.prototype.allFramesFn = function(fn)
    {
        for(var i = 0; i < this.BaseAnimation.Frames.length; ++i)
            fn(this.BaseAnimation.Frames[i]);
    }

    Animation.prototype.allFramesSet = function(object)
    {
        for(var i = 0; i < this.BaseAnimation.Frames.length; ++i)
            for(var x in object)
                this.BaseAnimation.Frames[i][x] = object[x];
    }

/************************************************************************/
/************************************************************************/
    var GenericAnimation = function(name,frames,moveFlags,requiredState,state,centeredOffset,topOffset,isLooping)
    {
        this.BaseAnimation = new BaseAnimation(frames,name,false);
        this.State = state || 0;
        this.MoveFlags = moveFlags || 0;
        this.RequiredFlags = requiredState || 0;
        this.InitialX = 0;
        this.InitialStageX = 0;
        this.InitialPlayerX = 0;
        this.InitialY = 0;
        this.InitialStageY = 0;
        this.InitialPlayerY = 0;
        this.IsActive = false;
        this.Direction = 0;
        this.CenteredOffset = centeredOffset;
        this.TopOffset = topOffset;
        this.IsLooping = isLooping || false;
        this.InternalFrame = 0;
        this.OffsetX = 0;
        this.OffsetY = 0;
    }
    GenericAnimation.prototype.reset = function()
    {
        this.InternalFrame = 0;
    }
    GenericAnimation.prototype.hasUserData = function(index)
    {
        var frame = this.BaseAnimation.Frames[index];
        return !!frame && !!frame.UserData && (frame.UserData.length > 0);
    }
    GenericAnimation.prototype.addUserDataToFrame = function(index,data)
    {
        var frame = this.BaseAnimation.Frames[index];
        if(!!frame)
            frame.UserData[frame.UserData.length] = data;
    }
    GenericAnimation.prototype.clearAllFrameUserData = function()
    {
        for(var i = 0,length = this.BaseAnimation.Frames.length; i < length; ++i)
            this.BaseAnimation.Frames[i].UserData = [];
    }

    GenericAnimation.prototype.addFrame = function(player,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,chainProjectile,imageOffsetX,imageOffsetY,hitState,hitPoints) { return this.BaseAnimation.addFrame.apply(this.BaseAnimation,arguments); }
    GenericAnimation.prototype.addRepeatingFrame = function(player,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,imageOffsetX,imageOffsetY,hitState,hitPoints) { return this.BaseAnimation.addRepeatingFrame.apply(this.BaseAnimation,arguments); }
    GenericAnimation.prototype.addTrailFrame = function(player,image,nbFrames)
    {
        return this.BaseAnimation.addFrame(player,0,null,image,nbFrames);
    }
    GenericAnimation.prototype.addRepeatingTrailFrame = function(player,image,nbFrames)
    {
        return this.BaseAnimation.addRepeatingFrame(player,0,null,image,nbFrames);
    }
    GenericAnimation.prototype.getFrame = function(frameDelta) { return this.BaseAnimation.getFrame.apply(this.BaseAnimation,arguments); }
    GenericAnimation.prototype.getNextFrameOffset = function(id) { return this.BaseAnimation.getNextFrameOffset.apply(this.BaseAnimation,arguments); }
    //must change such that this object knows what element to show/hide
    GenericAnimation.prototype.stop = function(element)
    {
        element.style.display="none";
        element.isInUse = false;
        this.IsActive = false;
        this.reset();
    }
    GenericAnimation.prototype.renderWithPlayer = function(frame,startFrame,element,direction,playerX,playerY)
    {
        var x = 0;
        var y = 0;
        var delta = 0;
        if(!!this.IsLooping)
        {
            if(this.InternalFrame > this.BaseAnimation.NbFrames)
                this.InternalFrame = 0;
            delta = this.InternalFrame++;
        }
        else
            delta = frame - startFrame;

        var newFrame = this.getFrame(delta);
        if(!newFrame)
        {
            /*free the element so it can be reused in other animations*/
            this.stop(element);
            return false;
        }
        else
        {
            var data = spriteLookup_.get(newFrame.RightSrc)
            if(!!data && (element.style.backgroundPositionX != data.Left))
            {
                element.style.backgroundPosition = data.Left + " " + data.Bottom;
                element.style.width = data.Width;
                element.style.height = data.Height;
            }
            AutoApplyFlip(element,direction == -1);

            x = this.OffsetX + playerX;
            y = this.OffsetY + playerY;
        }
        /*Must add the change in stageX to the position to keep the animation in one place on the screen,
         unless the animation must move with the player - in which case we disregard the stageX*/
        if(direction > 0)
        {
            element.style.left = "";
            element.style.right = x + "px";
        }
        else
        {
            element.style.right = "";
            element.style.left = x + "px";
        }
        element.style.bottom = y + "px";
        if(element.style.display != "")
            element.style.display = "";
        return true;
    }


    GenericAnimation.prototype.tryRender = function(frame,startFrame,element,stageX,stageY,playerX,playerY,playerWidth)
    {
        var offsetX = 0;
        var offsetY = 0;
        var delta = 0;
        if(!!this.IsLooping)
        {
            if(this.InternalFrame > this.BaseAnimation.NbFrames)
                this.InternalFrame = 0;
            delta = this.InternalFrame++;
        }
        else
            delta = frame - startFrame;

        var newFrame = this.getFrame(delta);
        if(!newFrame)
        {
            /*free the element so it can be reused in other animations*/
            this.stop(element);
            return false;
        }
        else
        {
            if(!element)
                return false;

            offsetX = newFrame.X;
            offsetY = newFrame.Y;

            if(!!this.CenteredOffset)
                offsetX = playerWidth * this.CenteredOffset;
            if(!!this.TopOffset)
                offsetY = this.TopOffset;

            var data = spriteLookup_.get(newFrame.RightSrc)
            if(!!data && (element.style.backgroundPositionX != data.Left))
            {
                element.style.backgroundPosition = data.Left + " " + data.Bottom;
                element.style.width = data.Width;
                element.style.height = data.Height;
            }
            AutoApplyFlip(element,this.Direction == -1);
            if(this.Direction > 0)
            {
                /*move the image to the middle of the point*/
                offsetX -= (parseInt(element.style.width)/2);
                offsetY -= (parseInt(element.style.height)/2);
            }
            else
            {
                /*move the image to the middle of the point*/
                offsetX -= (parseInt(element.style.width)/2);
                offsetY -= (parseInt(element.style.height)/2);
            }

            if(hasFlag(this.MoveFlags,MOVE_FLAGS.MOVE_TO_PLAYER))
            {
                offsetX += playerX;
                offsetY += playerY;
            }
            else if(hasFlag(this.MoveFlags,MOVE_FLAGS.MOVE_WITH_PLAYER))
            {
                offsetX += playerX - this.InitialPlayerX;
                offsetY += playerY - this.InitialPlayerY;
            }
        }
        /*Must add the change in stageX to the position to keep the animation in one place on the screen,
         unless the animation must move with the player - in which case we disregard the stageX*/
        if(this.Direction > 0)
        {
            element.style.left = "";
            if(hasFlag(this.MoveFlags,MOVE_FLAGS.MOVE_TO_PLAYER))
                element.style.right = offsetX + "px";
            else if(hasFlag(this.MoveFlags,MOVE_FLAGS.MOVE_WITH_PLAYER))
                element.style.right = (offsetX + this.InitialX) + "px";
            else
                element.style.right = (offsetX + this.InitialX + (this.InitialStageX - stageX)) + "px";
        }
        else
        {
            element.style.right = "";
            if(hasFlag(this.MoveFlags,MOVE_FLAGS.MOVE_TO_PLAYER))
                element.style.left = offsetX + "px";
            else if(hasFlag(this.MoveFlags,MOVE_FLAGS.MOVE_WITH_PLAYER))
                element.style.left = (offsetX + this.InitialX) + "px";
            else
                element.style.left = (offsetX + this.InitialX  - (this.InitialStageX - stageX)) + "px";
        }
        element.style.bottom = (offsetY + this.InitialY + (stageY - this.InitialStageY)) + "px";
        if(element.style.display != "")
            element.style.display = "";
        return true;
    }

/************************************************************************/
/************************************************************************/

    var BasicAnimation = function(name,frames,isLooping,direction,bgImg)
    {
        this.BaseAnimation = new BasicBaseAnimation(frames,name);
        this.IsLooping = isLooping || false;
        this.InternalFrame = 0;
        this.Direction  = direction || 0;
        this.InitialStageY = 0;
        if(!!bgImg)
            this.createElement(bgImg);
    }

    BasicAnimation.prototype.count = 0;

    BasicAnimation.prototype.createElement = function(bgImg)
    {
        this.Element = window.document.createElement("div");
        this.Element.className = "basic-animation";
        this.Element.style.display = "none";
        this.Element.style.backgroundImage = "url(" + bgImg + ")";
        window.document.getElementById("pnlStage").appendChild(this.Element);
    }

    BasicAnimation.prototype.release = function()
    {
        if(!!this.Element)
            utils_.removeFromDOM(this.Element);
    }

    BasicAnimation.prototype.getFrame = function(frameDelta)
    {
        return this.BaseAnimation.getFrame.apply(this.BaseAnimation,arguments);
    }

    BasicAnimation.prototype.addEmptyFrame = function(owner,nbFrames)
    {
        this.BaseAnimation.addEmptyFrame.apply(this.BaseAnimation,arguments);
        return this.BaseAnimation.Frames[this.BaseAnimation.Frames.length-1];
    }

    BasicAnimation.prototype.addFrame = function(owner,image,nbFrames)
    {
        this.BaseAnimation.addFrame.apply(this.BaseAnimation,arguments);
        return this.BaseAnimation.Frames[this.BaseAnimation.Frames.length-1];
    }

    BasicAnimation.prototype.hide = function()
    {
        if(!!this.Element)
            this.Element.style.display = "none";
    }

    BasicAnimation.prototype.tryRender = function(frame,object,direction)
    {
        direction = direction || this.Direction;
        var element = this.Element || object.Element;
        var startFrame = object.StartFrame;
        AutoApplyFlip(element,direction == -1);

        var offsetX = object.X || 0;
        var offsetY = object.Y || 0;
        if(!!object.ZIndex)
            element.style.zIndex = object.ZIndex;
        var delta = 0;
        if(!!this.IsLooping)
        {
            if(this.InternalFrame > this.BaseAnimation.NbFrames)
                this.InternalFrame = 0;
            delta = this.InternalFrame++;
        }
        else
            delta = frame - startFrame;
        if(delta < 0)
            return true;
        var newFrame = this.getFrame(delta);
        if(!newFrame)
        {
            /*free the element so it can be reused in other animations*/
            element.style.display="none";
            return false;
        }
        else
        {
            offsetX += newFrame.X;
            offsetY += newFrame.Y;
            var data = spriteLookup_.get(newFrame.RightSrc)
            if(!!data && (element.style.backgroundPositionX != data.Left))
            {
                element.style.backgroundPosition = data.Left + " " + data.Bottom;
                /*element.style.backgroundImage = "url(" + data.Sprite + ")";*/
                element.style.width = data.Width;
                element.style.height = data.Height;
            }
            else if (!data)
            {
                element.style.display = "none";
                return false;
            }
            if(direction > 0)
            {
                if(offsetX != undefined)
                {
                    element.style.left = "";
                    element.style.right = offsetX + "px";
                }
            }
            else
            {
                if(offsetX != undefined)
                {
                    element.style.right = "";
                    element.style.left = offsetX + "px";
                }
            }
        }

        if(offsetY != undefined)
            element.style.bottom = offsetY + "px";
        if(element.style.display != "")
            element.style.display = "";
        return true;
    }

/************************************************************************/
/************************************************************************/
var CreateFrameImageLookup = function()
{
    var images_ = {};
    var nbImages_ = 0;
    var nbImagesLoading_ = 0;
    var element_ = window.document.getElementById("spnImagesLoading");

    var FrameImageLookup = function()
    {
        this.Data = {}
    }

    FrameImageLookup.prototype.getNbImages = function() { return nbImages_; }
    FrameImageLookup.prototype.getNbImagesLoading = function() { return nbImagesLoading_; }
    FrameImageLookup.prototype.getElement = function() { return element_; }
    FrameImageLookup.prototype.loadBase64Audio = function(key,value)
    {
        if(!this.Data[key])
        {
            this.Data[key] = value;
        }
        else
        {
            return null;
        }
    }

    /*Image only loaded once*/
    FrameImageLookup.prototype.load = function(src)
    {
        if(!images_.hasOwnProperty(src))
        {
            ++nbImagesLoading_;
            ++nbImages_;

            element_.innerHTML = "0";
            images_[src] = new Image();
            //images_[src] = window.document.createElement("img");
            images_[src].onload = (function(thisValue)
            {
                return function()
                {
                    if(!!--thisValue.NbImagesLoading)
                    {
                        thisValue.getElement().innerHTML = (100*(thisValue.getNbImages()-thisValue.getNbImagesLoading())/thisValue.getNbImages()).toFixed(1);
                    }
                    else
                    {
                        thisValue.getElement().innerHTML = "100";
                    }
                }
            })(this);
            images_[src].src = src;
        }
        return images_[src];
    }
    FrameImageLookup.prototype.get = function(src)
    {
        return images_[src];
    }
    FrameImageLookup.prototype.getBgB64 = function(element,src)
    {
        element.style.backgroundImage = this.getB64(src,true);
    }
    FrameImageLookup.prototype.getB64 = function(src,isBg)
    {
        if(!!isBg)
            return "url('" + this.Data[src] + "')";
        else
            return this.Data[src];
    }
    return new FrameImageLookup();
}
var imageLookup_ = CreateFrameImageLookup();
/************************************************************************/
/************************************************************************/
var CreateSpriteLookup = function()
{
    var nbImages_ = 0;
    var nbImagesLoading_ = 0;
    var element_ = window.document.getElementById("spnImagesLoading");


    var SpriteLookup = function()
    {
        this.Data = {};
    }

    /*Image only loaded once*/
    SpriteLookup.prototype.load = function(key,src,left,bottom,width,height)
    {
        src = src.replace("|","");

        if(!this.get(key))
        {
            this.Data[key] = {Key:key,Sprite:src,Left:left,Bottom:bottom,Width:width,Height:height,WidthInt:parseInt(width),HeightInt:parseInt(height)};
        }
        return this.Data[key];
    }
    SpriteLookup.prototype.get = function(key)
    {
        return this.Data[key];
    }
    SpriteLookup.prototype.getLeft = function(key)
    {
        return (this.Data[key] || {}).Left || "";
    }
    SpriteLookup.prototype.set = function(element,key,setBackgroundImage,displayNone,isBase64)
    {
        var data = this.get(key);
        if(!!data)
        {
            if(!!setBackgroundImage)
            {
                if(!isBase64)
                {
                    if(!element.style.backgroundImage)
                        element.style.backgroundImage = "url(" + data.Sprite + ")";
                }
                else
                {
                    if(!element.style.backgroundImage)
                        element.style.backgroundImage = "url(" + imageLookup_.Data[data.Sprite] + ")";
                }
            }
            if(element.style.backgroundPosition != data.Left + " " + data.Bottom)
            {
                element.style.backgroundPosition = data.Left + " " + data.Bottom;
                element.style.width = data.Width;
                element.style.height = data.Height;
                if(!displayNone && (element.style.display != ""))
                    element.style.display = "";
            }
        }
    }
    return new SpriteLookup();
}
var spriteLookup_ = CreateSpriteLookup();
/************************************************************************/
/************************************************************************/

    var Frame = function(index,id,shadowOffset,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,frameOffset,chainProjectile,imageOffsetX,imageOffsetY,attackFlags,hitPoints,flagsToSend,hitID,hitStop,energyToAdd,slideForce,slideFactor)
    {
        this.SlideForce = slideForce || 0;
        this.HideSlideDirt = true;
        this.SlideFactor = slideFactor || 1;
        this.EnergyToAdd = energyToAdd || 0;
        this.Index = index;
        this.ID = +id; /* the "+" is a fast conversion to numeric*/
        this.ImageID = this.ID;
        this.HitID = hitID || 0;
        //attacking player waits
        this.HitStop = hitStop || 0;
        //attacked player waits
        this.EnemyHitStop = undefined;
        this.ShadowImageSrc = !!shadowImage ? "images/misc/misc/shadow-" + shadowImage + ".png" : null;
        this.ShadowOffset = !shadowOffset ? {X:0,Y:0} : !!+shadowOffset ? {X:shadowOffset,Y:0} : shadowOffset;
        this.IsFlipped = image.indexOf("#") > -1;
        this.RightSrc = !!image ? image.replace("#-","r-").replace("x-","r-") : "";
        this.LeftSrc =  !!image ? image.replace("#-","l-").replace("x-","l-") : "";
        this.AttackFlags = attackFlags || 0;
        this.HitPoints = hitPoints || [];
        //if there are no hit points and this is an attack frame, then this.AllowBlock will be set to [true]
        this.AllowBlock = false;

        this.RightSrc = this.RightSrc.replace("|","");
        this.LeftSrc  = this.LeftSrc.replace("|","");

        this.Frames = nbFrames || 0;
        this.FrameOffset = frameOffset || 0;

        this.FlagsToSet = new FrameFlags();
        this.FlagsToSet.Clip = !!flagsToSet ? (flagsToSet.Clip || null) : null;
        this.FlagsToSet.Juggle = !!flagsToSet ? (flagsToSet.Juggle || 0) : 0;
        this.FlagsToSet.Player = !!flagsToSet ? (flagsToSet.Player || 0) : 0;
        this.FlagsToSet.Pose = !!flagsToSet ? (flagsToSet.Pose || 0) : 0;
        this.FlagsToSet.Combat = !!flagsToSet ? (flagsToSet.Combat || 0) : 0;
        this.FlagsToSet.RCombat = !!flagsToSet ? (flagsToSet.RCombat || 0) : 0;
        this.FlagsToSet.Combo = !!flagsToSet ? (flagsToSet.Combo || 0) : 0;
        this.FlagsToSet.Spawn = !!flagsToSet ? (flagsToSet.Spawn || 0) : 0;
        this.FlagsToSet.AI = !!flagsToSet ? (flagsToSet.AI || 0) : 0;
        this.FlagsToSet.MotionSound = !!flagsToSet ? (flagsToSet.MotionSound || 0) : 0;
        this.FlagsToSet.SwingSound = !!flagsToSet ? (flagsToSet.SwingSound || 0) : 0;
        this.FlagsToSet.HitSound = !!flagsToSet ? (flagsToSet.HitSound || 0) : 0;
        this.FlagsToSet.BlockSound = !!flagsToSet ? (flagsToSet.BlockSound || 0) : 0;
        this.FlagsToSet.HitReact = !!flagsToSet ? (flagsToSet.HitReact || 0) : 0;

        this.FlagsToClear = new FrameFlags();
        this.FlagsToClear.Juggle = !!flagsToClear ? (flagsToClear.Juggle || 0) : 0;
        this.FlagsToClear.Player = !!flagsToClear ? (flagsToClear.Player || 0) : 0;
        this.FlagsToClear.Pose = !!flagsToClear ? (flagsToClear.Pose || 0) : 0;
        this.FlagsToClear.Combat = !!flagsToClear ? (flagsToClear.Combat || 0) : 0;
        this.FlagsToClear.RCombat = !!flagsToClear ? (flagsToClear.RCombat || 0) : 0;
        this.FlagsToClear.Combo = !!flagsToClear ? (flagsToClear.Combo || 0) : 0;
        this.FlagsToClear.Spawn = !!flagsToClear ? (flagsToClear.Spawn || 0) : 0;
        this.FlagsToClear.AI = !!flagsToClear ? (flagsToClear.AI || 0) : 0;
        this.FlagsToClear.SwingSound = !!flagsToClear ? (flagsToClear.SwingSound || 0) : 0;
        this.FlagsToClear.HitSound = !!flagsToClear ? (flagsToClear.HitSound || 0) : 0;
        this.FlagsToClear.BlockSound = !!flagsToClear ? (flagsToClear.BlockSound || 0) : 0;
        this.FlagsToClear.HitReact = !!flagsToClear ? (flagsToClear.HitReact || 0) : 0;

        this.FlagsToSend = flagsToSend || MISC_FLAGS.NONE;

        this.Priority = priority || 0;
        this.BaseDamage = baseDamage || 0;
        this.X = x || 0;
        this.Y = y || 0;
        this.ImageOffsetX = imageOffsetX === 0 ? 0 : (imageOffsetX || null);
        this.ImageOffsetY = imageOffsetY === 0 ? 0 : (imageOffsetY || null);

        this.ClipMoveFront = 0;
        this.ClipMoveBack = 0;
        this.ClipMoveTop = 0;
        this.ClipMoveBottom = 0;

        this.ClipHitFront = 0;
        this.ClipHitBack = 0;
        this.ClipHitTop = 0;
        this.ClipHitBottom = 0;

        this.Vulnerable = false;
        this.ChainProjectile = chainProjectile;
        this.SoundFilename = "";
        this.SoundVolume = 1;
        this.ForceHitFx = false;
        //If this is set, then the player will force jump, even if the player is already airborne
        //eg. this.Jump = {Fx:10, Fy:200};
        this.Jump = null;
        this.TeleportSpeed = 0;
        this.DizzyFactor = 1;
    }
    Frame.prototype.hitStop = function(me,you)
    {
        this.HitStop = me;
        this.EnemyHitStop = you;

        return this;
    }
    Frame.prototype.set = function(params)
    {
        for(var i in params)
        {
            if(this.hasOwnProperty(i))
            {
                this[i] = params[i];
            }
        }

        return this;
    }
    Frame.prototype.offset = function(x,y)
    {
        this.ImageOffsetX = x;
        this.ImageOffsetY = y;
        return this;
    }
    Frame.prototype.flip = function()
    {
        this.IsFlipped = true;
        return this;
    }
    Frame.prototype.clip = function(params)
    {
        this.clipMove(params);
        this.clipHit(params);
        return this;
    }
    Frame.prototype.clipMove = function(params)
    {
        this.ClipMoveBottom = params.Bottom || this.ClipMoveBottom;
        this.ClipMoveTop = params.Top || this.ClipMoveTop;
        this.ClipMoveFront = params.Front || this.ClipMoveFront;
        this.ClipMoveBack = params.Back || this.ClipMoveBack;
        return this;
    }
    Frame.prototype.clipHit = function(params)
    {
        this.ClipHitBottom = params.Bottom || this.ClipHitBottom;
        this.ClipHitTop = params.Top || this.ClipHitTop;
        this.ClipHitFront = params.Front || this.ClipHitFront;
        this.ClipHitBack = params.Back || this.ClipHitBack;
        return this;
    }

    Frame.prototype.getEndFrameOffset = function() { return this.Frames + this.FrameOffset; }
    Frame.prototype.getImageSrc = function(direction){ return this.RightSrc; }
    Frame.prototype.isSettingAirborneFlag = function()  { return !!this.Jump || hasFlag(this.FlagsToSet.Pose,POSE_FLAGS.AIR_COMBO_1) || hasFlag(this.FlagsToSet.Pose,POSE_FLAGS.AIR_COMBO_2) || hasFlag(this.FlagsToSet.Pose,POSE_FLAGS.AIRBORNE) || hasFlag(this.FlagsToSet.Pose,POSE_FLAGS.AIRBORNE_FB) }
    Frame.prototype.isClearingAirborneFlag = function() { return hasFlag(this.FlagsToClear.Pose,POSE_FLAGS.AIR_COMBO_1) || hasFlag(this.FlagsToClear.Pose,POSE_FLAGS.AIR_COMBO_2) || hasFlag(this.FlagsToClear.Pose,POSE_FLAGS.AIRBORNE) || hasFlag(this.FlagsToClear.Pose,POSE_FLAGS.AIRBORNE_FB) }
    Frame.prototype.isClearingAirborne = function() { return hasFlag(this.FlagsToClear.Pose,POSE_FLAGS.AIRBORNE) || hasFlag(this.FlagsToClear.Pose,POSE_FLAGS.AIRBORNE_FB) }

/************************************************************************/
/************************************************************************/
var CreateFrameAdapter = function(frameArray,nbFrames)
{
    var set =  function()
    {
        for(var i = frameArray.length - (nbFrames + 1); i < frameArray.length; ++i)
        {
            frameArray[i].set.apply(frameArray[i], arguments);
        }
    }

    var clip = function()
    {
        for(var i = frameArray.length - nbFrames; i < frameArray.length; ++i)
        {
            frameArray[i].clip.apply(frameArray[i], arguments);
        }
    }

    var clipHit = function()
    {
        for(var i = frameArray.length - nbFrames; i < frameArray.length; ++i)
        {
            frameArray[i].clipHit.apply(frameArray[i], arguments);
        }
    }

    var clipMove = function()
    {
        for(var i = frameArray.length - nbFrames; i < frameArray.length; ++i)
        {
            frameArray[i].clipMove.apply(frameArray[i], arguments);
        }
    }

    var hitStop = function()
    {
        for(var i = frameArray.length - nbFrames; i < frameArray.length; ++i)
        {
            frameArray[i].hitStop.apply(frameArray[i], arguments);
        }
    }

    return {set:set,clip:clip,clipHit:clipHit,clipMove:clipMove,hitStop:hitStop};
}
/************************************************************************/
/************************************************************************/

    var Projectile = function(player,animation,disintegrationAnimation,xOffset,yOffset,xSpeed,ySpeed,xFunc,yFunc,attackFlags,hitState,baseDamage,energyToAdd)
    {
        this.EnergyToAdd = energyToAdd || 0;
        this.Owner = player;
        this.Params = this.Params || {EnemyHitStop:0};
        this.Animation = animation;
        this.DisintegrationAnimation = disintegrationAnimation;
        this.OffsetX = xOffset;
        this.OffsetY = yOffset;
        this.InitialX = xOffset;
        this.InitialY = yOffset;
        this.Rect = {Left:0,Right:0,Top:0,Bottom:0};
        this.X = xOffset;
        this.Y = yOffset;
        this.XSpeed = xSpeed || 1;
        this.SpeedRate = 1;
        this.YSpeed = ySpeed || 0;
        this.XFunc = xFunc || function(y){return this.XSpeed * 3;}
        this.YFunc = yFunc || function(x){return this.YSpeed * 1;}
        this.Direction = player.Direction;
        this.StartFrame = 0;
        this.Element = window.document.createElement("div");
        this.Element.className="projectile";
        this.Element.style.display="none";
        window.document.getElementById("pnlStage").appendChild(this.Element);
        this.IsActive = false;
        this.AttackState = attackFlags || 0;
        this.HitState = hitState || 0;
        this.BaseDamage = baseDamage || 0;
        this.FlagsToSend = MISC_FLAGS.NONE;
        this.IsDisintegrating = false;
        this.T = 0;
        this.vxFn = null;
        this.vyFn = null;
        this.NbHits = 0;
        this.MaxHits = 1;
        this.DefaultHitStop = 13;
        this.DefaultLocalHitStop = 20;
        this.DefaultAirHitStop = 13;
        this.HitStopData = {"1":13};
        this.LocalHitStopData = {"1":20};
        //this.HitStop = 10;
        this.LastHitFrame = 0;
        this.Fx = 1;
        this.Fy = 1;
        this.Id = "" + Projectile.prototype.count;
        this.CanJuggle = false;
        this.ClipFront = 20;
        this.ClipBack = 20;
        this.ClipTop = 70;
        this.ClipBottom = 70;
        this.IsSuperMove = false;
        this.AttackStateData = {};
        this.HitStateData = {};
        ++Projectile.prototype.count;
    }
    Projectile.prototype.getAttackState = function(hitData)
    {
        return (!!hitData && !!hitData.Nb)
                ? (this.AttackStateData[hitData.Nb] || this.AttackState)
                : this.AttackState;
    }
    Projectile.prototype.getHitState = function(hitData)
    {
        return (!!hitData && !!hitData.Nb)
                ? (this.HitStateData[hitData.Nb] || this.HitState)
                : this.HitState;
    }
    Projectile.prototype.getHitId = function(frame) { return this.Id + "_" + frame; }
    Projectile.prototype.setEnergyToAdd = function(value) { this.EnergyToAdd = value; }
    Projectile.prototype.getVxFn = function() { return this.vxFn; }
    Projectile.prototype.setVxFn = function(value) { this.vxFn = value; }
    Projectile.prototype.getVyFn = function() { return this.vyFn; }
    Projectile.prototype.setVyFn = function(value) { this.vyFn = value; }
    Projectile.prototype.isFirstFrame = function() { return this.T <= 1; }
    Projectile.prototype.count = 0;
    /*Stops the projectile*/
    Projectile.prototype.cancel = function(ignoreOnGoneEvent)
    {
        this.Element.style.display="none";
        this.Element.style.left="999999px";
        this.Element.style.right="999999px";
        this.Element.style.bottom="100px";
        this.X = this.OffsetX;
        this.Y = this.OffsetY;
        this.T = 0;
        this.IsActive = false;
        this.IsDisintegrating = false;
        if(!ignoreOnGoneEvent)
            this.Owner.onProjectileGoneFn(0,this.Id);
    }

    Projectile.prototype.release = function()
    {
        utils_.removeFromDOM(this.Element);
        this.Owner = null;
    }

    /*Fires the projectile*/
    Projectile.prototype.execute = function(frame,stageX,stageY)
    {
        if(!!this.IsDisintegrating)
            this.cancel();
        this.SpeedRate = 1;
        this.StartFrame = frame;
        this.T = 0;
        this.Element.style.display="none";
        this.Direction = this.Owner.Direction;
        if(this.Direction == -1)
            this.Element.className="projectile flipped";
        else
            this.Element.className="projectile";

        this.X += this.Owner.getX();
        this.Y += this.Owner.getY();
        this.StageX = stageX;
        this.StageY = stageY;
        this.IsActive = true;
        this.IsDisintegrating = false;
        this.vxFn = (this.Animation.getXModifier());
        this.vyFn = (this.Animation.getYModifier());
        this.NbHits = 0;
        this.LastHitFrame = 0;
        this.Id = this.Owner.Id + "-" + frame;
    }

    Projectile.prototype.getTop = function()
    {
        return parseInt(this.Element.style.bottom) + parseInt(this.Element.style.height) - this.ClipBottom;
    }

    Projectile.prototype.getBottom = function()
    {
        return parseInt(this.Element.style.bottom) + this.ClipTop;
    }

    Projectile.prototype.getBackX = function()
    {
        if(this.Direction < 0)
            return parseInt(this.Element.style.left) + this.ClipFront;
        else
            return STAGE.MAX_STAGEX - (parseInt(this.Element.style.right) + this.ClipBack);
    }

    Projectile.prototype.getFrontX = function()
    {
        if(this.Direction  < 0)
            return (parseInt(this.Element.style.width) + parseInt(this.Element.style.left)) - this.ClipFront;
        else
            return (STAGE.MAX_STAGEX - (parseInt(this.Element.style.right) + parseInt(this.Element.style.width) - this.ClipFront));
    }
    Projectile.prototype.getLeftX = function() { if(this.Direction > 0){return STAGE.MAX_STAGEX - (this.X + parseInt(this.Element.style.width));}else{return this.X;}}
    Projectile.prototype.getRightX = function() { if(this.Direction > 0){return STAGE.MAX_STAGEX - this.X;}else{return this.X + parseInt(this.Element.style.width);}}
    Projectile.prototype.getMidX = function()
    {
        var left = this.getBackX();
        var right = this.getFrontX();

        return right - ((right-left)/2);
    }
    Projectile.prototype.getMidY = function()
    {
        var bottom = this.getBottom();
        var top = this.getTop();

        return top - ((top-bottom)/2);
    }

    /*Is the projectile active?*/
    Projectile.prototype.getIsActive = function()
    {
        if(this.getIsDisintegrating())
            return false;
        return this.IsActive;
    }

    /*Is the projectile active?*/
    Projectile.prototype.getIsDisintegrating = function()
    {
        return this.IsDisintegrating;
    }

    /*Is the projectile still visible?*/
    Projectile.prototype.isVisible = function(stageX,stageY)
    {
        return (this.X < STAGE.MAX_STAGEX && this.X > -100) && (this.Y > 0 && this.Y < 5000);
    }

    /*Did the projectile hit the floor?*/
    Projectile.prototype.didHitFloor = function(stageY)
    {
        return (!this.IsDisintegrating && (this.getBottom() < game_.getMatch().getStage().getGroundY()));
    }


    Projectile.prototype.canHit = function(frame)
    {
        return !this.IsDisintegrating
            && ((!this.LastHitFrame) || (frame > (this.LastHitFrame + this.getLocalHitStop())));
    }

    Projectile.prototype.isInHitStop = function(frame)
    {
        return ((!!this.LastHitFrame)
                && (frame < (this.LastHitFrame + this.getLocalHitStop())));
    }

    Projectile.prototype.getLocalHitStop = function()
    {
        return this.LocalHitStopData[this.NbHits] || this.DefaultLocalHitStop;
    }

    Projectile.prototype.getHitStop = function()
    {
        return this.HitStopData[this.NbHits] || this.DefaultHitStop;
    }

    /*Advances the projectile*/
    Projectile.prototype.advance = function(frame,stageX,stageY)
    {
        /*Is the projectile still on screen?*/
        if(!this.isVisible(0,0))
        {
            this.cancel();
            return null;
        }
        if(this.didHitFloor())
        {
            this.disintegrate(frame);
        }
        //this.Element.style.display = "none";
        ++this.T;
        this.IsActive = true;



        if(!this.isInHitStop(frame))
        {
            this.SpeedRate = Math.min(this.SpeedRate + 0.2, 1);
            if(!this.IsDisintegrating)
            {
                var xSpeed = this.vxFn(this.XSpeed,this.T) * this.SpeedRate;
                var ySpeed = this.vyFn(this.YSpeed,this.T) * this.SpeedRate;

                var dx = (xSpeed) + (this.Direction > 0 ? (this.StageX - stageX) : (stageX - this.StageX));
                var dy = (ySpeed) + (stageY - this.StageY);


                this.X += dx;
                this.Y += dy;
            }
        }
        else if(!this.IsDisintegrating)
        {
                var xSpeed = 0;
                var ySpeed = 0;

                var dx = (xSpeed) + (this.Direction > 0 ? (this.StageX - stageX) : (stageX - this.StageX));
                var dy = (ySpeed) + (stageY - this.StageY);


                this.X += dx;
                this.Y += dy;
        }
        if(!!this.IsDisintegrating)
        {
            this.X += this.Direction > 0 ? (this.StageX - stageX) : (stageX - this.StageX);
            this.Y += stageY - this.StageY;
        }




        var offsetX = 0;
        var offsetY = 0;

        var delta = frame - this.StartFrame;
        var newFrame = null;
        if(!this.IsDisintegrating)
        {
            newFrame = this.Animation.getFrame(delta);
            if(!newFrame)
            {
                newFrame = this.Animation.BaseAnimation.Frames[0];
                this.StartFrame = frame;
            }

            this.ClipFront = newFrame.ClipHitFront;
            this.ClipBack = newFrame.ClipHitBack;
            this.ClipTop = newFrame.ClipHitTop;
            this.ClipBottom = newFrame.ClipHitBottom;
        }
        else
        {
            newFrame = this.DisintegrationAnimation.getFrame(delta);
            if(!newFrame)
            {
                this.cancel();
                return null;
            }
        }

        this.setSprite(newFrame,offsetX,offsetY,stageX,stageY);
        this.StageX = stageX;
        this.StageY = stageY;

        /*Allow players on the other team to deal with projectile coming toward them.*/
        if(!this.isDisintegrating)
        {
            this.Owner.onProjectileMoved(frame,this.Id,this.getMidX(),this.getMidY(),this,!!this.IsSuperMove);
        }

        return this;
    }


    /*sets and moves the image - for browsers that load preloaded images instantly when the src property is set*/
    Projectile.prototype.setSprite = function(newFrame,offsetX,offsetY,stageX,stageY)
    {
        if(!!newFrame)
        {
            offsetX = newFrame.X;
            offsetY = newFrame.Y;

            var data = spriteLookup_.get(newFrame.RightSrc)
            if(!!data && (this.Element.style.backgroundPosition != data.Left + " " + data.Bottom))
            {
                this.Element.style.width = data.Width;
                this.Element.style.height = data.Height;
                this.Element.style.backgroundPosition = data.Left + " " + data.Bottom;
            }
        }

        if(this.IsDisintegrating)
        {
            if(this.Direction > 0)
            {
                this.Element.style.left = (offsetX + FlipCoord(this.X,parseInt(this.Element.style.width))) + "px";
                this.Element.style.right = "";
            }
            else
            {
                this.Element.style.right = (offsetX + FlipCoord(this.X,parseInt(this.Element.style.width))) + "px";
                this.Element.style.left = "";
            }
        }
        else
        {
            if(this.Direction > 0)
            {
                this.Element.style.left = "";
                this.Element.style.right = (offsetX + this.X) + "px";
            }
            else
            {
                this.Element.style.right = "";
                this.Element.style.left = (offsetX + this.X) + "px";
            }
        }
        var imgOffsetY = this.Y - (parseInt(this.Element.style.height)/2);
        this.Element.style.bottom = imgOffsetY + "px";
        if(this.Element.style.display != "")
            this.Element.style.display="";
    }


    Projectile.prototype.disintegrate = function(frame)
    {
        this.IsDisintegrating = true;
        this.StartFrame = frame;
    }
    /*The projectile has hit a player*/
    Projectile.prototype.hitPlayer = function(frame)
    {
        this.SpeedRate = 0;
        this.LastHitFrame = frame;
        if(++this.NbHits >= this.MaxHits)
            this.disintegrate(frame);
    }
    /*The projectile has hit another projectile*/
    Projectile.prototype.hitProjectile = function(frame,otherProjectile)
    {
        var isSuper = hasFlag(this.FlagsToSend,ATTACK_FLAGS.SUPER);
        var isOtherSuper = hasFlag(otherProjectile.FlagsToSend,ATTACK_FLAGS.SUPER);
        var areBothSupers = isSuper && isOtherSuper;

        if(!isSuper || areBothSupers)
            this.disintegrate(frame);
        if(!isOtherSuper || areBothSupers)
            otherProjectile.disintegrate(frame);
    }
    //returns true if the projectile can juggle the player
    Projectile.prototype.canJuggle = function(player)
    {
        if(player.allowJuggle() && !!this.CanJuggle)
        {
            return true;
        }

        return false;
    }

var FlipCoord = function(x,width)
{
    return STAGE.MAX_STAGEX - (x + width);
}