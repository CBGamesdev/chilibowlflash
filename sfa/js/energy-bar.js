/*logic for the energy bar*/

var CreateEnergyBar = function(pnlID,team)
{
    var amount_ = 0;
    var team_ = team;
    var parentElement_ = window.document.getElementById(pnlID);
    var barElement_ = null;
    var level0Element_ = null;
    var level1Element_ = null;
    var level2Element_ = null;

    var key_ = ENERGYBAR.LEVEL0_KEY;
    var startFrame_ = 0;
    var animations_ = {};
    var frameCount_ = 0;
    var currentSrc_ = "";
    var lastSrc_ = "";
    var isInitialized_ = false;

    var EnergyBar = function(pnlID,team)
    {
    }

    EnergyBar.prototype.getAmount = function() { return amount_; }
    EnergyBar.prototype.setAmount = function(value) { amount_ = value; }
    EnergyBar.prototype.getTeam = function() { return team_; }
    EnergyBar.prototype.setTeam = function(value) { team_ = value; }
    EnergyBar.prototype.getParentElement = function() { return parentElement_; }
    EnergyBar.prototype.setParentElement = function(value) { parentElement_ = value; }
    EnergyBar.prototype.getBarElement = function() { return barElement_; }
    EnergyBar.prototype.setBarElement = function(value) { barElement_ = value; }
    EnergyBar.prototype.getLevel0Element = function() { return level0Element_; }
    EnergyBar.prototype.setLevel0Element = function(value) { level0Element_ = value; }
    EnergyBar.prototype.getLevel1Element = function() { return level1Element_; }
    EnergyBar.prototype.setLevel1Element = function(value) { level1Element_ = value; }
    EnergyBar.prototype.getLevel2Element = function() { return level2Element_; }
    EnergyBar.prototype.setLevel2Element = function(value) { level2Element_ = value; }
    EnergyBar.prototype.getKey = function() { return key_; }
    EnergyBar.prototype.setKey = function(value) { key_ = value; }
    EnergyBar.prototype.getStartFrame = function() { return startFrame_; }
    EnergyBar.prototype.setStartFrame = function(value) { startFrame_ = value; }
    EnergyBar.prototype.getAnimation = function(value) { return animations_[value]; }
    EnergyBar.prototype.setAnimation = function(index, value) { animations_[index] = value; }
    EnergyBar.prototype.getAnimations = function() { return animations_; }
    EnergyBar.prototype.setAnimations = function(value) { animations_ = value; }
    EnergyBar.prototype.getFrameCount = function() { return frameCount_; }
    EnergyBar.prototype.setFrameCount = function(value) { frameCount_ = value; }
    EnergyBar.prototype.getCurrentSrc = function() { return currentSrc_; }
    EnergyBar.prototype.setCurrentSrc = function(value) { currentSrc_ = value; }
    EnergyBar.prototype.getLastSrc = function() { return lastSrc_; }
    EnergyBar.prototype.setLastSrc = function(value) { lastSrc_ = value; }
    EnergyBar.prototype.isInitialized = function() { return isInitialized_; }
    EnergyBar.prototype.setInitialized = function(value) { isInitialized_ = value; }

    EnergyBar.prototype.getNextFrameID = function()
    {
        this.setFrameCount(this.getFrameCount() + 1);
        return this.getFrameCount();
    }
    EnergyBar.prototype.addAnimation = function(key)
    {
        /*use default values for the Animation*/
        this.setAnimation(key, new Animation());
        return this.getAnimation(key);
    }

    /**/
    EnergyBar.prototype.release = function()
    {
        utils_.removeChildrenFromDOM(parentElement_, true);
    }

    /*initialized the energy bar*/
    EnergyBar.prototype.init = function()
    {
        /***************************/
        /*initialize the animations*/
        /***************************/
        if(!this.isInitialized())
        {
            var nbFrames = 8;

            var level0 = this.addAnimation(ENERGYBAR.LEVEL0_KEY);
            level0.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl0-team-" + team_ + ".png",nbFrames)

            var level0Maxed = this.addAnimation(ENERGYBAR.LEVEL0MAXED_KEY);
            level0Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl0-full-team-" + team_ + "-1.png",nbFrames)
            level0Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl0-full-team-" + team_ + "-2.png",nbFrames)
            level0Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl0-full-team-" + team_ + "-3.png",nbFrames)
            level0Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl0-full-team-" + team_ + "-4.png",nbFrames)
            level0Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl0-full-team-" + team_ + "-3.png",nbFrames)
            level0Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl0-full-team-" + team_ + "-2.png",nbFrames)

            var level1Maxed = this.addAnimation(ENERGYBAR.LEVEL1MAXED_KEY);
            level1Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl1-full-team-" + team_ + "-1.png",nbFrames)
            level1Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl1-full-team-" + team_ + "-2.png",nbFrames)
            level1Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl1-full-team-" + team_ + "-3.png",nbFrames)
            level1Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl1-full-team-" + team_ + "-4.png",nbFrames)
            level1Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl1-full-team-" + team_ + "-3.png",nbFrames)
            level1Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl1-full-team-" + team_ + "-2.png",nbFrames)

            var level2Maxed = this.addAnimation(ENERGYBAR.LEVEL2MAXED_KEY);
            level2Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl2-full-team-" + team_ + "-1.png",nbFrames)
            level2Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl2-full-team-" + team_ + "-2.png",nbFrames)
            level2Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl2-full-team-" + team_ + "-3.png",nbFrames)
            level2Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl2-full-team-" + team_ + "-4.png",nbFrames)
            level2Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl2-full-team-" + team_ + "-3.png",nbFrames)
            level2Maxed.addFrame(this,0,null,"|images/misc/misc/energy-bar-lvl2-full-team-" + team_ + "-2.png",nbFrames)
            this.setInitialized(true);
        }
        /******************************/
        /*initialize the html elements*/
        /******************************/
        barElement_ = window.document.createElement("div");
        barElement_.className = "inner-energy-bar";

        level0Element_ = window.document.createElement("div");
        level0Element_.className = "level-0-energy";
        level0Element_.style.width = "0px";

        level1Element_ = window.document.createElement("div");
        level1Element_.style.width = "0px";
        level1Element_.className = "level-1-energy";

        level2Element_ = window.document.createElement("div");
        level2Element_.style.width = "0px";
        level2Element_.className = "level-2-energy";

        parentElement_.appendChild(barElement_);
        parentElement_.appendChild(level0Element_);
        parentElement_.appendChild(level1Element_);
        parentElement_.appendChild(level2Element_);
        /*set the initial values*/

        /*
        imageLookup_.getBgB64(barElement_,"images/misc/bars-sprites.png");
        imageLookup_.getBgB64(level0Element_,"images/misc/energy-bar-lvl0.png");
        imageLookup_.getBgB64(level1Element_,"images/misc/energy-bar-lvl1.png");
        imageLookup_.getBgB64(level2Element_,"images/misc/energy-bar-lvl2.png");
        */
        this.change(0);
    }
    /*Resets the energy*/
    EnergyBar.prototype.reset = function()
    {
        this.setAmount(-amount_);
        this.change(0);
    }
    /**/
    EnergyBar.prototype.setCurrentAnimation = function(key,frame)
    {   
        this.setKey(key)
        this.setStartFrame(frame);
    }
    /*adds to the energy bar*/
    EnergyBar.prototype.change = function(amount,frame)
    {
        amount = amount || 0;
        if((amount_ < ENERGYBAR.MAX_LEVEL2) && (amount_ + amount >= ENERGYBAR.MAX_LEVEL2))
            soundManager_.queueSound("audio/misc/lvl3.zzz");

        this.setAmount(Math.min(Math.max(amount_ + amount, 0),ENERGYBAR.MAX_LEVEL2));
        this.handleAmountChanged(frame || 0);
    }
    /*css helper*/
    EnergyBar.prototype.showLevelHelper = function(element,cssDisplay)
    {
        if(element.style.display != cssDisplay)
            element.style.display = cssDisplay;
    }
    /**/
    EnergyBar.prototype.showEnergyLevelBar = function(level)
    {
        switch(level)
        {
            case ENERGYBAR.LEVEL0: { this.showLevelHelper(level0Element_,"");     this.showLevelHelper(level1Element_,"none"); this.showLevelHelper(level2Element_,"none"); break;}
            case ENERGYBAR.LEVEL1: { this.showLevelHelper(level0Element_,"none"); this.showLevelHelper(level1Element_,"");     this.showLevelHelper(level2Element_,"none"); break;}
            case ENERGYBAR.LEVEL2: { this.showLevelHelper(level0Element_,"none"); this.showLevelHelper(level1Element_,"none"); this.showLevelHelper(level2Element_,"");     break;}
            default:               { this.showLevelHelper(level0Element_,"none"); this.showLevelHelper(level1Element_,"none"); this.showLevelHelper(level2Element_,"none"); break;}
        }
    }

    /**/
    EnergyBar.prototype.handleAmountChanged = function(frame)
    {
        this.showEnergyLevelBar();
        if(amount_ < ENERGYBAR.MAX_LEVEL0)
        {
            this.showEnergyLevelBar(ENERGYBAR.LEVEL0);
            level0Element_.style.width = amount_ + "px";
            this.setCurrentAnimation(ENERGYBAR.LEVEL0_KEY,frame);
        }
        else if(amount_ < ENERGYBAR.MAX_LEVEL1)
        {
            this.showEnergyLevelBar(ENERGYBAR.LEVEL1);
            level1Element_.style.width = (amount_ - ENERGYBAR.MAX_LEVEL0) + "px";
            this.setCurrentAnimation(ENERGYBAR.LEVEL0MAXED_KEY,frame);
        }
        else if(amount_ < ENERGYBAR.MAX_LEVEL2)
        {
            this.showEnergyLevelBar(ENERGYBAR.LEVEL2);
            level2Element_.style.width = (amount_ - ENERGYBAR.MAX_LEVEL1) + "px";
            this.setCurrentAnimation(ENERGYBAR.LEVEL1MAXED_KEY,frame);
        }
        else if(amount_ == ENERGYBAR.MAX_LEVEL2)
        {
            this.showEnergyLevelBar(ENERGYBAR.LEVELMAXED);
            level2Element_.style.width = "0px";
            this.setCurrentAnimation(ENERGYBAR.LEVEL2MAXED_KEY,frame);
        }
    }
    /**/
    EnergyBar.prototype.frameMove = function(frame)
    {
        var delta = frame - this.getStartFrame();
        var animation = this.getAnimation(this.getKey());
        if(!animation)
            return;

        var currentFrame = this.getAnimation(this.getKey()).getFrame(delta);
        /*these animations are continuous, so if we go past the end, reset*/
        if(!currentFrame)
        {
            this.setStartFrame(frame);
            delta = frame - this.getStartFrame();
            currentFrame = this.getAnimation(this.getKey()).getFrame(delta);
        }
        if(!!currentFrame)
        {
            if(!!currentFrame.LeftSrc)
            {
                this.setCurrentSrc(currentFrame.LeftSrc);
            }
        }
    }
    /**/
    EnergyBar.prototype.render = function(frame)
    {
        if(this.getLastSrc() != this.getCurrentSrc())
        {
            var data = spriteLookup_.get(this.getCurrentSrc());
            if(!!data)
            {
                barElement_.style.backgroundPosition = data.Left + " " + data.Bottom;
                barElement_.style.height = data.Height;
                barElement_.style.width = data.Width;
            }
        }
    }
    return new EnergyBar(pnlID,team);
}