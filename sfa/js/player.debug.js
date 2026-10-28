/*Renders debug info*/
var maxDebugHits = 10;
Player.prototype.renderDebugInfo = function()
{
    /*
    var bottom = (this.getBoxBottom() + (this.getBoxHeight()/2)) + "px";
    this.DebugB.style.left = (this.getRightX()) + "px";
    this.DebugB.style.bottom = bottom;
    this.DebugF.style.left = (this.getLeftX()) + "px";
    this.DebugF.style.bottom = bottom;

    this.moveCircle();
    this.Circle.render();

    var x = 0;
    if(this.Direction < 0)
        x = this.getX();
    else
        x = STAGE.MAX_X - this.getX();

    this.Circle.DebugElement.style.bottom = this.Circle.RenderY + "px";
    this.Circle.DebugElement.style.left = (x + this.Circle.OffsetX) + "px";
    */


    if(!!this.Flags.Combat.has(COMBAT_FLAGS.ATTACK) && this.CurrentFrame.HitPoints.length > 0)
    {
        var points = this.CurrentFrame.HitPoints;
        var x = this.getX();
        var i = 0;
        for(; (i < maxDebugHits) && (i < points.length); ++i)
        {
            this.DebugHit[i].style.bottom = (this.getY() + points[i].y) + "px";

            if(this.Direction < 0)
            {
                this.DebugHit[i].style.right = "";
                this.DebugHit[i].style.left = (x + points[i].x) + "px";
            }
            else
            {
                this.DebugHit[i].style.left = "";
                this.DebugHit[i].style.right = (x + points[i].x) + "px";
            }
            if(this.DebugHit[i].style.display != "")
                this.DebugHit[i].style.display = "";
        }
        for(; i < 3; ++i)
        {
            if(this.DebugHit[i].style.display != "none")
                this.DebugHit[i].style.display = "none";
        }
    }
    else
    {
        for(var i = 0; i < maxDebugHits; ++i)
        {
            if(this.DebugHit[i].style.display != "none")
                this.DebugHit[i].style.display = "none";
        }
    }


    var rect = this.ImgBBox;//this.getRect();
    this.Rect.style.bottom = rect.Bottom + "px";

    if(this.Direction == -1)
    {
        this.Rect.style.left = rect.Left + "px";
        this.Rect.style.right = "";
    }
    else
    {
        this.Rect.style.right = (STAGE.MAX_STAGEX - rect.Right) + "px";
        this.Rect.style.left = "";
    }

    this.Rect.style.width = (rect.Right - rect.Left) + "px";
    this.Rect.style.height = (rect.Top - rect.Bottom) + "px";

}


/**/
Player.prototype.releaseDebugElements = function()
{
    for(var i = 0; i < maxDebugHits; ++i)
    {
        utils_.removeFromDOM(this.DebugHit[i]);
    }
    utils_.removeFromDOM(this.Rect);
    utils_.removeFromDOM(this.DebKeysElement);
    utils_.releaseArray(this.DebugHit);
}


/**/
Player.prototype.createDebugElements = function(parentElement)
{
    /*
    this.DebugB = window.document.createElement("b");
    this.DebugB.className = "right";
    this.DebugB.innerHTML = "r";
    (parentElement || window.document.getElementById("pnlStage")).appendChild(this.DebugB);

    this.DebugF = window.document.createElement("b");
    this.DebugF.className = "left";
    this.DebugF.innerHTML = "l";
    (parentElement || window.document.getElementById("pnlStage")).appendChild(this.DebugF);

    var d = window.document.createElement("div");
    d.className = "circle-debug";
    this.Circle.DebugElement = d;
    this.Circle.render();
    //(parentElement || window.document.getElementById("pnlStage")).appendChild(d);
    this.Element.appendChild(d);
    */
    this.DebugHit = [];
    for(var i = 0; i < maxDebugHits; ++i)
    {
        this.DebugHit[i] = window.document.createElement("b");
        this.DebugHit[i].style.display = "none";
        this.DebugHit[i].className = "hit";
        this.DebugHit[i].innerHTML = i+1;
        (parentElement || window.document.getElementById("pnlStage")).appendChild(this.DebugHit[i]);
    }

    this.Rect = window.document.createElement("div");
    this.Rect.className = "player-rect";
    (parentElement || window.document.getElementById("pnlStage")).appendChild(this.Rect);
}

Player.prototype.createKeysElement =  function()
{
    this.DebKeysElement = window.document.createElement("div");
    this.DebKeysElement.className = "show-keys";
    if(this.Team == 1)
    {
        window.document.getElementById("pnlTeam1Keys").appendChild(this.DebKeysElement);
    }
    else
    {
        window.document.getElementById("pnlTeam2Keys").appendChild(this.DebKeysElement);
    }
    this.DebKeysElement.innerHTML = "&nbsp;"
}


Player.prototype.debugShowKeysHelper = function(bit)
{
    var retVal = "";

    if(hasFlag(bit,16)) retVal += "+<img src='images/misc/buttons/lp.png' />";
    if(hasFlag(bit,32))  retVal += "+<img src='images/misc/buttons/mp.png' />";
    if(hasFlag(bit,64))  retVal += "+<img src='images/misc/buttons/hp.png' />";
    if(hasFlag(bit,128)) retVal += "+<img src='images/misc/buttons/lk.png' />";
    if(hasFlag(bit,256)) retVal += "+<img src='images/misc/buttons/mk.png' />";
    if(hasFlag(bit,512)) retVal += "+<img src='images/misc/buttons/hk.png' />";
    
    return retVal;
}


Player.prototype.debugShowDirsHelper = function(bit)
{
    var retVal = "";
    if(hasFlag(bit,1) && hasFlag(bit,4)) retVal += this.Direction == 1 ? "<img src='images/misc/buttons/nw.png' />" : "<img src='images/misc/buttons/ne.png' />";
    if(hasFlag(bit,1) && hasFlag(bit,8)) retVal += this.Direction == 1 ? "<img src='images/misc/buttons/sw.png' />" : "<img src='images/misc/buttons/se.png' />";
    if(hasFlag(bit,2) && hasFlag(bit,8)) retVal += this.Direction == 1 ? "<img src='images/misc/buttons/se.png' />" : "<img src='images/misc/buttons/sw.png' />";
    if(hasFlag(bit,2) && hasFlag(bit,4)) retVal += this.Direction == 1 ? "<img src='images/misc/buttons/ne.png' />" : "<img src='images/misc/buttons/nw.png' />";

    if(!hasFlag(bit,4) && !hasFlag(bit,8) && hasFlag(bit,1)) retVal += this.Direction == 1 ? "<img src='images/misc/buttons/w.png' />" : "<img src='images/misc/buttons/e.png' />";
    if(!hasFlag(bit,4) && !hasFlag(bit,8) && hasFlag(bit,2)) retVal += this.Direction == 1 ? "<img src='images/misc/buttons/e.png' />" : "<img src='images/misc/buttons/w.png' />";

    if(!hasFlag(bit,1) && !hasFlag(bit,2) && hasFlag(bit,4)) retVal += "<img src='images/misc/buttons/n.png' />";
    if(!hasFlag(bit,1) && !hasFlag(bit,2) && hasFlag(bit,8)) retVal += "<img src='images/misc/buttons/s.png' />";

    return retVal;
}


Player.prototype.debugShowKeys = function()
{
    return;
}

