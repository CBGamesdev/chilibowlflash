var PI = 3.14159265;
var TWOPI = 2*PI;

var Circle = function(x,y,r,element)
{
    this.OffsetY = 0;
    this.OffsetX = 0;
    this.LocalX = x;
    this.LocalY = y;
    this.RenderX = x;
    this.RenderY = y;
    this.R = r;
    this.RSq = r * r;
    this.DebugElement = element || null;
}

Circle.prototype.render = function(x,y,r,n)
{
    var html = "";
    var inc = PI / (n || 50);
    this.LocalX = (x || this.LocalX);
    this.LocalY = (y || this.LocalY);
    this.R = (r || this.R);
    for(var t = 0.0; t <= TWOPI; t+=inc)
    {
        var x = this.LocalX + (this.R * Math.cos(t));
        var y = this.LocalY + (this.R * Math.sin(t));
        html += "<b class=\"bDebug\" style=\"left:" + x + "px;bottom:" + y + "px;\"></b>";
    }
    var i = 0;
    while(i < this.DebugElement.children.length)
    {
        if(this.DebugElement.children[i].className == "bDebug")
            this.DebugElement.removeChild(this.DebugElement.children[i]);
    }
    this.DebugElement.innerHTML = html;
}
/*Returns the distance from the passed in circle*/
Circle.prototype.getDistanceSq = function(otherCircle)
{
    var x = otherCircle.RenderX - this.RenderX;
    var y = otherCircle.RenderY - this.RenderY;
    return x*x + y*y;
}
/*Returns true if the passed in circle intersects this circle instance*/
Circle.prototype.intersects = function(otherCircle)
{
    var dSq = this.getDistanceSq(otherCircle);
    return dSq < (this.R+otherCircle.R)*(this.R+otherCircle.R);
}
/*Moves this circle just outside the intersection with the passed in circle, if there is an intersection*/
Circle.prototype.rejectX = function(otherCircle)
{
    var dist = Math.sqrt(this.getDistanceSq(otherCircle));
    var radiiDist = this.R+otherCircle.R;
    var delta = 0;
    if(dist < (radiiDist) || dist == 0)
    {
        var dir = (this.RenderX - otherCircle.RenderX) / Math.abs(this.RenderX - otherCircle.RenderX);
        if(!dir)
            dir = -1;
        var val = true;
        do
        {
            this.LocalX += dir;
            this.RenderX += dir;
        }while(this.intersects(otherCircle) && ++delta < 10000);
        /*otherCircle.render()*/
        /*this.render();*/
    }
    return delta;
}
