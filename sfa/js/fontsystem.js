var ManagedText = function(elementID,text,x,y,fontSpacing,fontsPath,charWidth,isLeft)
{
    this.Text = text || "";
    this.CharWidth = charWidth || 16;
    this.Element = window.document.getElementById(elementID);
    this.FontsPath = fontsPath || "font1";
    this.FontSpacing = fontSpacing || 0;
    this.X = x || 0;
    this.Y = y || 0;

    this.dX = 0;
    this.dY = 0;
    this.TargetX = 0;
    this.TargetY = 0;

    this.AnimateCurrent = null;
    this.AnimateFunction = null;
    this.AnimateEndValue = null;
    this.HideFrame = -1;

    this.Width = 0;
    this.IsLeft = (isLeft != undefined) ? !!isLeft : true;
    this.UpdateRate = 1;
    this.init();
    this.Indent = 0;
    this.IsVisible = true;
    this.change(this.Text);
}

/*this text element will move toward the passed in X and Y coords*/
ManagedText.prototype.setTarget = function(x,y)
{
    x = Math.ceil(+x);
    y = Math.ceil(+y);

    this.TargetX = x;
    this.TargetY = y;

    var dx = this.TargetX - this.X;
    var dy = this.TargetY - this.Y;

    var dirX = CONSTANTS.TEXT_FADE_SPEED * ((dx)/Math.abs(dx)) || 0;
    var dirY = CONSTANTS.TEXT_FADE_SPEED * ((dy)/Math.abs(dy)) || 0;

    this.dX = dirX;
    this.dY = dirY;
}

/*applies the step function to the startValue until end function is true*/
ManagedText.prototype.animate = function(startValue,endFn,stepFn)
{
    this.AnimateCurrent = startValue;
    this.AnimateFunction = stepFn;
    this.AnimateEndValue = endFn;

    this.change(this.AnimateCurrent);
}

ManagedText.prototype.animateIncNumber = function(startValue,endValue){this.animate(startValue,function(value){return value < endValue;},function(value){return ++value;});}
ManagedText.prototype.animateDecNumber = function(startValue,endValue){this.animate(startValue,function(value){return value > endValue;},function(value){return --value;});}

/*initialize the Text*/
ManagedText.prototype.init = function()
{
    this.HideFrame = -1;
}

/*helper to get the source*/
ManagedText.prototype.getSrc = function(letter)
{
    var value = letter.charCodeAt(0);
    switch(this.FontsPath)
    {
        case "font1": return font1_[value];
        case "font2": return font2_[value];
        case "font3": return font3_[value];
    }
}

/*Changes the managed text*/
ManagedText.prototype.change = function(newText,x,hideFrame,showFrame,fadeIn,indent)
{
    x = (x == undefined) ? this.X : x;
    this.clearTarget();
    this.hideNow();
    this.Text = "" + newText;
    this.MustUpdate = true;
    this.Indent = indent || 0;
    this.ShowFrame = showFrame || 0;

    while(this.Element.children.length > this.Text.length)
        this.Element.removeChild(this.Element.children[0]);
    while(this.Element.children.length < this.Text.length)
        this.Element.appendChild(window.document.createElement("img"));

    this.Width = 0;
    for(var i = 0,length = this.Text.length; i < length;++i)
    {
        this.Width += (!!+this.Text.charAt(i) ? 2*this.CharWidth : this.CharWidth) + this.FontSpacing;
        this.Element.children[i].style.marginRight = this.FontSpacing + "px";
        this.Element.children[i].src = this.getSrc(this.Text.charAt(i));
    }

    if(!!hideFrame)
    {
        if(!fadeIn)
        {
            this.showNow(x,hideFrame);
        }
        else
        {
            this.hideFadeNow();
            this.show(hideFrame);
        }
    }
    else
    {
        this.showNow(x,hideFrame);
    }
}

/*increments the X*/
ManagedText.prototype.moveX = function(dx)
{
    this.X += dx;
    this.MustUpdate = true;
}

/*increments the Y*/
ManagedText.prototype.moveY = function(dy)
{
    this.Y += dy;
    this.MustUpdate = true;
}
ManagedText.prototype.setVisible = function(value)
{
    value = (value === undefined) ? false : !!value;
    if(this.IsVisible != value)
    {
        this.IsVisible = value;
        this.Element.style.display = !!value ? "" : "none";
    }
}
ManagedText.prototype.hideNow = function() { this.setVisible(false);}
ManagedText.prototype.hide = function() { this.setTarget(-this.Width,this.Y); }
ManagedText.prototype.hideFadeNow = function()
{
    this.X = -this.Width;
}

ManagedText.prototype.clearTarget = function() { this.dX = 0;this.dY = 0;this.HideFrame = -1; }
ManagedText.prototype.showNow = function(x,hideFrame) { this.X = (x != 0 ? x : null) || 0; this.MustUpdate = true; if(!!hideFrame) {this.HideFrame = hideFrame;}}
ManagedText.prototype.show = function(hideFrame) { this.setTarget(this.Indent,this.Y); if(!!hideFrame) {this.HideFrame = hideFrame;}}

/*toggles between using the left and right css properties for horizontal positioning*/
ManagedText.prototype.changeDirection = function()
{
    this.IsLeft = !this.IsLeft;
    this.MustUpdate = true;
}

ManagedText.prototype.frameMove = function(frame)
{
    if(!!this.IsVisible && this.HideFrame != -1 && (frame >= this.HideFrame))
        this.hideNow();
    /*
    if(frame % this.UpdateRate == 0)
    {
        if(!!this.AnimateFunction)
        {
            if(!this.animateEndValue(this.AnimateCurrent))
            {
                this.AnimateFunction = null;
            }
            else
            {
                this.AnimateCurrent = this.animateFunction(this.AnimateCurrent);
                this.change(this.AnimateCurrent);
            }
        }
    }
    */
    if(frame > this.ShowFrame)
    {
        if(!!this.dX)
        {
            this.moveX(this.dX);
            if(this.X >= this.TargetX)
                this.dX = 0;
        }
        if(!!this.dY)
        {
            this.moveY(this.dY);
            if(this.Y >= this.TargetY)
                this.dY = 0;
        }
    }
}


ManagedText.prototype.render = function(frame)
{
    if(!!this.MustUpdate && frame > this.ShowFrame)
    {
        this.MustUpdate = false;
        if(this.IsLeft)
        {
            this.Element.style.right = "";
            this.Element.style.left = this.X + "px";
            this.Element.style.top = this.Y + "px";
        }
        else
        {
            this.Element.style.left = "";
            this.Element.style.right = this.X + "px";
            this.Element.style.top = this.Y + "px";
        }
        this.setVisible(true);
    }
}

ManagedText.prototype.release = function()
{
    this.init();
    this.change("");
    this.hide();
}

var CreateFontSystem = function()
{
    var FontSystem = function()
    {
        this.Text = [];
    }

    FontSystem.prototype.preload = function()
    {
    }

    FontSystem.prototype.reset = function(frame)
    {
        this.release(frame);
    }

    FontSystem.prototype.release = function(frame)
    {
        //for(var i = 0, length = this.Text.length; i < length; ++i)
        //    this.Text[i].release();
        utils_.releaseArray(this.Text);
    }


    /*adds some managed text to the system*/
    FontSystem.prototype.addText = function(elementID,text,x,y,fontSpacing,fontsPath,isLeft)
    {
        var ref = new ManagedText(elementID,text,x,y,fontSpacing,fontsPath,0,isLeft);
        ref.init();
        this.Text[this.Text.length] = ref;
        return ref;
    }


    FontSystem.prototype.frameMove = function(frame)
    {
        for(var i = 0, length = this.Text.length; i < length; ++i)
        {
            this.Text[i].frameMove(frame);
        }
    }

    FontSystem.prototype.render = function(frame)
    {
        for(var i = 0, length = this.Text.length; i < length; ++i)
        {
            this.Text[i].render(frame);
        }
    }

    return new FontSystem();
}
