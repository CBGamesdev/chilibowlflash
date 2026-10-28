var hasFlag = function(flags,flag)
{
    return !!(flags & flag);
}

var Flags = function(owner, defaultValue)
{
    this.IsPlayer = false;
    this.Owner = owner || null;
    this.DefaultValue = defaultValue || 0;
    this.Value = 0;
}

Flags.prototype.remove = function(value, defaultIfZero) { return this.Value = (this.Value | value) ^ value; }
Flags.prototype.release = function() { this.Owner = null; }
Flags.prototype.clear = function() { this.set(0); }
Flags.prototype.set = function(value) { this.Value = value; return this.Value; }
Flags.prototype.get = function()      { return this.Value; }
Flags.prototype.has = function(value) { return hasFlag(this.Value,value); }
Flags.prototype.add = function(value)
{
    if(this.IsPlayer && !!this.Owner)
    {
        //If player is going from immobile to mobile, then stop the combo count on the player.
        if(hasFlag(value,PLAYER_FLAGS.MOBILE) && !this.has(PLAYER_FLAGS.MOBILE))
            this.Owner.resetCombo();
    }
    return this.Value |= (value || MISC_FLAGS.NONE);
}

var PlayerFlags = function(owner)
{
    this.Owner = owner;
    this.Player = new Flags(owner);
    this.Player.IsPlayer = true;
    this.Pose = new Flags();
    this.Combat = new Flags();
    this.Combo = new Flags();
    this.Spawn = new Flags();
    this.Juggle = new Flags();
    this.SwingSound = new Flags();
    this.HitSound = new Flags();
    this.BlockSound = new Flags();
    this.MotionSound = new Flags();
    this.HitReact = new Flags();
}

PlayerFlags.prototype.clear = function()
{
    for(var i in this)
        if(!!this[i] && !!this[i].clear)
            this[i].clear();
}
PlayerFlags.prototype.release = function()
{
    this.Owner = null;
    for(var i in this)
        if(!!this[i] && !!this[i].release)
            this[i].release();
}

var FrameFlags = function()
{
    this.Player = 0;
    this.Pose = 0;
    this.Combat = 0;
    this.RCombat = 0;
    this.Spawn = 0;
    this.Combo = 0;
    this.Juggle = 0;
}

