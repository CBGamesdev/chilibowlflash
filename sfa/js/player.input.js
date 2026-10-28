//returns true if the passed in keys are pressed
Player.prototype.isKeyDown = function(key)
{
    return (this.ButtonStates.length > 0)
           && (this.ButtonStates[this.ButtonStates.length-1].State[key].Value == BUTTON_STATE.PRESSED);
}

//returns true if the passed in key state match the current key state
Player.prototype.testButtonState = function(button,state)
{
    return (this.ButtonStates.length > 0)
           && (this.ButtonStates[this.ButtonStates.length-1].State[key].Value == state);
}

//returns true if the passed in button state matches the current state
Player.prototype.hasButtonState = function(data)
{
    if(!data)
        return false;

    var retVal = false;
    for(var i = 0; i < data.length; ++i)
    {
        var moveItem = data[i];
        if(moveItem.State != this.ButtonState[moveItem.Button].Value)
        {
            return false;
        }
    }
    return true;
}


Player.prototype.handleInput = function(frame)
{
    if(!this.ForceImmobile)
    {
        this.checkForAnimation(frame);
    }
}

Player.prototype.clearInput = function(record)
{
    for(var i in this.ButtonState)
    {
        this.ButtonState[i].Value = 0;
        this.ButtonState[i].Frame = 0;
    }
    this.ButtonStates = [];
}

//Ensures that the buttonStateChange array doesn't get too big
Player.prototype.cleanUpButtonStateChanges = function(frame)
{
    if(this.ButtonStates.length > CONSTANTS.MAX_KEYSTATES)
        this.ButtonStates = this.ButtonStates.slice(this.ButtonStates.length - CONSTANTS.MAX_KEYSTATES);

    var i = 0;
    while(i < this.ButtonStates.length)
    {
        if(((frame - this.ButtonStates[i].Frame) > CONSTANTS.NBINTERIM_FRAMES)
            && this.ButtonStates[i].State[1].Value != BUTTON_STATE.PRESSED
            && this.ButtonStates[i].State[2].Value != BUTTON_STATE.PRESSED
            && this.ButtonStates[i].State[4].Value != BUTTON_STATE.PRESSED
            && this.ButtonStates[i].State[8].Value != BUTTON_STATE.PRESSED
            && this.ButtonStates[i].State[16].Value != BUTTON_STATE.PRESSED
            && this.ButtonStates[i].State[32].Value != BUTTON_STATE.PRESSED
            && this.ButtonStates[i].State[64].Value != BUTTON_STATE.PRESSED
            && this.ButtonStates[i].State[128].Value != BUTTON_STATE.PRESSED
            && this.ButtonStates[i].State[256].Value != BUTTON_STATE.PRESSED
            && this.ButtonStates[i].State[512].Value != BUTTON_STATE.PRESSED
            && this.ButtonStates[i].State[1024].Value != BUTTON_STATE.PRESSED)
            {
                //this.ButtonStates = this.ButtonStates.slice(i+1);
                this.ButtonStates.splice(0,i+1);
            }
        ++i;
    }
}



//Simuates pressing keys
Player.prototype.injectInput = function(isDown,bit,frame,funcName)
{
    if(bit === null && !!funcName)
    {
        this[funcName]();
    }
    else
    {
        key = null;
        for(var a in this.Buttons)
        {
            if(this.Buttons[a].Bit == bit)
            {
                key = a;
                break;
            }
        }

        if(!!key)
            this.onKeyStateChanged(isDown,key,frame);
    }
}

//Simuates pressing keys
Player.prototype.sendInput = function(input)
{
    if(!input || !this.getMatch().getAllowInput())
        return;

    var frame = this.getMatch().getCurrentFrame();
    var key;
    for(var i = 0; i < input.length; ++i)
    {
        key = null;
        for(var a in this.Buttons)
        {
            if(this.Buttons[a].Bit == input[i].Button)
            {
                key = a;
                break;
            }
        }

        if(!!key) this.onKeyStateChanged(input[i].IsDown,key,frame);
    }
}

//records the current ButtonState
Player.prototype.addCurrentButtonState = function(frame)
{
    var state = {};
    for(var i in this.ButtonState)
        state[i] = makeButtonState(this.ButtonState[i].Value,this.ButtonState[i].Frame);

    this.ButtonStates.push({State:state,Frame:frame});
}

//returns the frame to use for input (used for recording matches)
Player.prototype.getInputFrame = function(frame)
{
    return (this.CheckedForAnimationFrame == frame) ? frame + 1 : frame;
}

//Handles key state changes
Player.prototype.onKeyStateChanged = function(isDown,keyCode,frame)
{
    if(!!this.Buttons[keyCode])
    {
        var key = this.Buttons[keyCode].Bit;

        if(!!isDown && (this.ButtonState[key].Value == BUTTON_STATE.NONE))
        {
            //the button was just pressed
            this.ButtonState[key].Value = BUTTON_STATE.PRESSED
            this.ButtonState[key].Frame = frame;
        }
        else if(!isDown && (this.ButtonState[key].Value == BUTTON_STATE.PRESSED))
        {
            //the button was released
            this.ButtonState[key].Value = BUTTON_STATE.NONE;
            this.ButtonState[key].Frame = frame;
        }
        else
            return;

        this.addCurrentButtonState(frame);

    }
    //this.User.onKeyStateChanged(isDown,keyCode,frame);
}

Player.prototype.compareButtonSequence = function(frame,move,input)
{
    var mIndex = move.ButtonSequence.length-1;
    var iIndex = input.length-1;
    var inputItem;
    var moveItem;


    requiredKeys : while((iIndex > -1) && (mIndex > -1))
    {
        moveButtons : for(var b = 0; b < move.ButtonSequence[mIndex].length; ++b)
        {
            var isMatch = false;

            moveItem = move.ButtonSequence[mIndex][b];
            var btn = [];
            if(!!moveItem.Button.length)
                btn = moveItem.Button;
            else
                btn.push(moveItem.Button);

            for(var i = 0; i < btn.length; ++i) 
            {
                //inputItem = input[iIndex].State[move.ButtonSequence[mIndex][b].Button];
                inputItem = input[iIndex].State[btn[i]];

                //is the required button in the proper state?
                if(moveItem.State == inputItem.Value)
                {
                    isMatch = true;
                    //is there a max number of frames
                    if(!!moveItem.MaxNbFrames && ((frame - inputItem.Frame) > moveItem.MaxNbFrames))
                    {
                        //not ok
                        return false;
                    }
                    //is there a min number of frames
                    if(!!moveItem.MinNbFrames && ((frame - inputItem.Frame) < moveItem.MinNbFrames))
                    {
                        //not ok
                        return false;
                    }

                    //if a button matches, then move on to the next button
                    continue moveButtons;
                }
            }
            //the first time must be a match
            if(!isMatch)
            {
                if(iIndex == input.length-1)
                {
                    return false;
                }
                //the key is not in the required state, so move to the next element in the user input
                --iIndex;
                continue requiredKeys;
            }

        }

        //all keys at the current location matched, advance in the user input array
        --iIndex;
        //all keys at the current location matched, advance in the required input array
        --mIndex;

        //if we get to the end of the required input, then everything has been ok, so that means we have found a match.
        if(mIndex < 0)
        {
            return true;
        }
    }

    return false;
}



/*returns true if the player is in a state where the current animation can be interupted with another animation*/
Player.prototype.allowInterupt = function()
{
    return this.Flags.Pose.has(POSE_FLAGS.ALLOW_INTERUPT_1)
            || this.Flags.Pose.has(POSE_FLAGS.ALLOW_INTERUPT_2)
            || this.Flags.Pose.has(POSE_FLAGS.ALLOW_INTERUPT_3)
            || this.Flags.Pose.has(POSE_FLAGS.ALLOW_INTERUPT_4)
            || this.Flags.Pose.has(POSE_FLAGS.ALLOW_INTERUPT_5)
            || this.Flags.Pose.has(POSE_FLAGS.ALLOW_INTERUPT_6)
        ;
}
/*Check the current key sequence for a move to execute*/
Player.prototype.checkForAnimation = function(frame)
{
    if(!this.getMatch().getAllowInput())
        return;
    if(!!this.CheckedForAnimationFrame == frame)
        return;
    this.CheckedForAnimationFrame = frame;

    if(this.Flags.Player.has(PLAYER_FLAGS.MOBILE) || (this.allowInterupt() && !this.InteruptAnimation))
    {
        for(var i = 0; i < 2; ++i)
        {
            //copy the original array
            var tmpButtons = this.ButtonStates.slice();
            while(tmpButtons.length > 0)
            {
                var move = i == 0 ? this.findThrow(tmpButtons,frame) : this.findAnimation(tmpButtons,frame);
                if(!!move)
                {
                    //was the move chained?
                    if(move == -1)
                        return;

                    //if IsMisc is set to true, then no animation will be set, but the flags will be read
                    if(!!move.IsMisc)
                    {
                        this.checkFlags(move);
                    }
                    //is there no current move, or is the user executing a new move
                    else if(!this.CurrentAnimation || (this.CurrentAnimation.Animation.BaseAnimation.Name != move.BaseAnimation.Name))
                    {
                        if(!this.setInteruptAnimation(move))
                        {
                            if(move.BaseAnimation.Name == "turn" || move.BaseAnimation.Name == "crouch turn")
                                this.targetRearEnemy();
                            else
                                this.setCurrentAnimation({Animation:move,StartFrame:frame,Direction:this.Direction});
                        }
                    }
                    return;
                }

                //remove one from the front of the array
                tmpButtons.splice(0,1);
            }
        }
    }
}
