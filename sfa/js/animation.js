    var BaseAnimation = function(frames,name,isAttack,allowAirBlock)
    {
        this.Frames = frames || [];
        this.FrameSpeed = 4;
        this.Name = name;
        this.IsAttack = isAttack == undefined ? true : isAttack;
        this.AllowAirBlock = allowAirBlock;
        this.lastFrameOffset = 0;
        this.NbFrames = 0;
        this.SetFramesToVulnerable = false;
        this.IsThrow = false;
    }

    BaseAnimation.prototype.release = function()
    {
        utils_.releaseArray(this.Frames);
    }

    BaseAnimation.prototype.setIsThrow = function(value)
    {
        this.IsThrow = value;
    }

    /*Adds a frame to the move*/
    BaseAnimation.prototype.addFrameWithSound = function(player,volume,soundFilename,shadowOffset,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,chainProjectile,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitStop,energyToAdd,slideForce,slideFactor)
    {
        this.addFrame(player,shadowOffset,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,chainProjectile,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitStop,energyToAdd,slideForce,slideFactor);
        var currentFrame = this.Frames[this.Frames.length-1];
        currentFrame.SoundFilename = soundFilename;
        currentFrame.SoundVolume = volume;
        //soundManager_.load(currentFrame.SoundFilename,3,volume);
    }

    /*Adds a frame to the move*/
    BaseAnimation.prototype.addOffsetFrame = function(player,image,nbFrames,x,y)
    {
        this.addFrame(player,0,null,image,nbFrame,0,0,x,y);
    }

    /*Adds a frame to the move*/
    BaseAnimation.prototype.addFrame = function(player,shadowOffset,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,chainProjectile,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitStop,energyToAdd,slideForce,slideFactor)
    {
        if(!!this.Frames.length > 0)
            this.lastFrameOffset += this.Frames[this.Frames.length - 1].Frames;
        var frameOffset = this.lastFrameOffset;
        //for(var i = 0; i < this.Frames.length; ++i)
        //    frameOffset += this.Frames[i].Frames;


        if(shadowImage == "" && !!player)
            shadowImage = player.DefaultShadowImageSrc;
        ++player.NbFrames;
        this.Frames[this.Frames.length] = new Frame(this.Frames.length,player.getNextFrameID(),shadowOffset,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,frameOffset,chainProjectile,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitStop,energyToAdd,slideForce,slideFactor);
        this.NbFrames += this.Frames[this.Frames.length - 1].Frames;

        var currentFrame = this.Frames[this.Frames.length-1];
        currentFrame.Vulernable = this.SetFramesToVulnerable;

        if(!!this.IsThrow)
        {
            currentFrame.FlagsToSet.Player = (currentFrame.FlagsToSet.Player || MISC_FLAGS.NONE) | PLAYER_FLAGS.INVULNERABLE;
        }
        //ensure that isAttack_ is set properly
        if(hasFlag(currentFrame.FlagsToSet.Combat,COMBAT_FLAGS.ATTACK))
        {
            this.IsAttack = true;
        }

        if(hasFlag(currentFrame.FlagsToSet.Combat,COMBAT_FLAGS.PENDING_ATTACK))
        {
            currentFrame.IsPendingAttack = true;
        }

        if(!!this.IsAttack)
        {
            if(hasFlag(currentFrame.FlagsToSend, ATTACK_FLAGS.LIGHT))
                currentFrame.HitStop = 8;
            else if(hasFlag(currentFrame.FlagsToSend, ATTACK_FLAGS.MEDIUM))
                currentFrame.HitStop = 9;
            else if(hasFlag(currentFrame.FlagsToSend, ATTACK_FLAGS.HARD))
                currentFrame.HitStop = 10;

            //Moves that can be air blocked (jump attacks), can ALSO be blocked on the ground, but not in the crouch
            var flags = MISC_FLAGS.NONE;
            if(!!this.AllowAirBlock)
                flags = COMBAT_FLAGS.CAN_BE_AIR_BLOCKED;
            else
                flags = COMBAT_FLAGS.CAN_BE_BLOCKED;


            if(!this.SkipFrameBlockCheck)
            {
                currentFrame.FlagsToSet.Combat = (currentFrame.FlagsToSet.Combat || MISC_FLAGS.NONE) | flags;
                //Before StopBlock frame, add pending attack to any non attack frames
                if(!hasFlag(currentFrame.FlagsToSet.Combat,COMBAT_FLAGS.ATTACK))
                {
                    currentFrame.IsPendingAttack = true;
                }

            }
            else if(!!this.CanAddStopBlock)
            {
                this.CanAddStopBlock = null;
                currentFrame.FlagsToClear.Combat = (currentFrame.FlagsToClear.Combat || MISC_FLAGS.NONE) | flags;
            }
        }
    }

    /*Adds a frame multiple times, and adds the sound effect on the first frame only.*/
    BaseAnimation.prototype.addRepeatingFrameWithSound = function(player,volume,soundFilename,shadowOffset,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitStop,energyToAdd,slideForce,slideFactor)
    {
        var imageID = 0;
        for(var i = 0; i < nbFrames; ++i)
        {
            if(i == 0)
            {
                this.addFrame(player,shadowOffset,shadowImage,image,1,flagsToSet,flagsToClear,x,y,priority,baseDamage,null,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitStop,energyToAdd,slideForce,slideFactor);
                var currentFrame = this.Frames[this.Frames.length-1];
                currentFrame.SoundFilename = soundFilename;
                currentFrame.SoundVolume = volume;
                imageID = currentFrame.ImageID;
                //soundManager_.load(currentFrame.SoundFilename,3,volume);
            }
            else
            {
                this.addFrame(player,shadowOffset,shadowImage,image,1,flagsToSet,flagsToClear,x,y,priority,baseDamage,null,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitStop,0,0);
                this.Frames[this.Frames.length-1].ImageID = imageID;
            }
        }

    }


    /*Adds a frame multiple times*/
    BaseAnimation.prototype.addRepeatingFrame = function(player,shadowOffset,shadowImage,image,nbFrames,flagsToSet,flagsToClear,x,y,priority,baseDamage,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitStop,energyToAdd,slideForce,slideFactor)
    {
        for(var i = 0; i < nbFrames; ++i)
        {
            if(i == 0)
                this.addFrame(player,shadowOffset,shadowImage,image,1,flagsToSet,flagsToClear,x,y,priority,baseDamage,null,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitStop,energyToAdd,slideForce,slideFactor);
            else
                this.addFrame(player,shadowOffset,shadowImage,image,1,flagsToSet,flagsToClear,x,y,priority,baseDamage,null,imageOffsetX,imageOffsetY,hitState,hitPoints,flagsToSend,hitID,hitStop,0,0);
        }
    }
    /*Returns the frame that should be run at a given time*/
    BaseAnimation.prototype.getFrame = function(frameDelta)
    {
        var count = 0;
        for(var i = 0; i < this.Frames.length; ++i)
            if((count += this.Frames[i].Frames) >= frameDelta)
                return this.Frames[i];
        return null;
    }
    /*Returns the frame index of a frame*/
    BaseAnimation.prototype.getFrameIndex = function(id)
    {
        var count = 0;
        for(var i = 0; i < this.Frames.length; ++i)
        {
            if(this.Frames[i].ID == id)
            {
                return i;
            }
        }
        return -1;
    }
    /*Returns the first frame with an ID greater than the passed in ID*/
    BaseAnimation.prototype.getNextFrameOffset = function(id)
    {
        var count = 0;
        for(var i = 0; i < this.Frames.length; ++i)
        {
            count += this.Frames[i].Frames;
            if(this.Frames[i].ID == id)
                return count;
        }
        return 0;
    }

/************************************************************************/
/************************************************************************/
/************************************************************************/


    var BasicBaseAnimation = function(frames,name)
    {
        this.Frames = frames || [];
        this.NbFrames = 0;
        this.Name = name;
        this.LastFrameOffset = 0;
    }

    /*Returns the frame that should be run at a given time*/
    BasicBaseAnimation.prototype.getFrame = function(frameDelta)
    {
        var count = 0;
        for(var i = 0; i < this.Frames.length; ++i)
            if((count += this.Frames[i].Frames) >= frameDelta)
                return this.Frames[i];
        return null;
    }
    /*Adds a frame to the move*/
    BasicBaseAnimation.prototype.addEmptyFrame = function(owner,nbFrames)
    {
        this.addFrame(owner,"",nbFrames,0,0);
    }
    /*Adds a frame to the move*/
    BasicBaseAnimation.prototype.addFrame = function(owner,image,nbFrames,x,y)
    {
        if(!!this.Frames.length > 0)
            this.LastFrameOffset += this.Frames[this.Frames.length - 1].Frames;

        var frameOffset = this.lastFrameOffset;

        ++owner.NbFrames;
        this.Frames[this.Frames.length] = new Frame(this.Frames.length,owner.getNextFrameID(),0,"",image,nbFrames,0,0,x || 0,y || 0,0,0,frameOffset);
        this.NbFrames += this.Frames[this.Frames.length - 1].Frames;
    }

