

Player.prototype.queueDizzy = function() { this.queueSound("audio/misc/dizzy.zzz"); }
Player.prototype.stopDizzyAudio = function() { soundManager_.pause("audio/misc/dizzy.zzz"); }

Player.prototype.removeQueuedDizzyAudio = function() { soundManager_.stopAny("audio/misc/dizzy.zzz"); }


Player.prototype.queueSwingSound = function(value)
{
    if(hasFlag(value,SWINGSOUND.HP)) this.queueSound("audio/misc/hp.zzz");
    else if(hasFlag(value,SWINGSOUND.MP)) this.queueSound("audio/misc/mp.zzz");
    else if(hasFlag(value,SWINGSOUND.LP)) this.queueSound("audio/misc/lp.zzz");
    else if(hasFlag(value,SWINGSOUND.HK)) this.queueSound("audio/misc/hk.zzz");
    else if(hasFlag(value,SWINGSOUND.MK)) this.queueSound("audio/misc/mk.zzz");
    else if(hasFlag(value,SWINGSOUND.LK)) this.queueSound("audio/misc/lk.zzz");
    else if(hasFlag(value,SWINGSOUND.SLIDE0)) this.queueSound("audio/misc/slide-0.zzz");
}



Player.prototype.queueHitSound = function(value)
{
    if(!!value.length)
    {
        for(var i = 0; i < value.length; ++i)
            this.queueHitSoundHelper(value[i]);
    }
    else
    {
        this.queueHitSoundHelper(value);
    }
}

Player.prototype.queueHitSoundHelper = function(value)
{
    if(hasFlag(value,HITSOUND.HP)) this.queueSound("audio/misc/hit-hp.zzz");
    else if(hasFlag(value,HITSOUND.MP)) this.queueSound("audio/misc/hit-mp.zzz");
    else if(hasFlag(value,HITSOUND.LP)) this.queueSound("audio/misc/hit-lp.zzz");
    else if(hasFlag(value,HITSOUND.HP3)) this.queueSound("audio/misc/hit-hp-3.zzz");
    else if(hasFlag(value,HITSOUND.HK)) this.queueSound("audio/misc/hit-hk.zzz");
    else if(hasFlag(value,HITSOUND.MK)) this.queueSound("audio/misc/hit-mk.zzz");
    else if(hasFlag(value,HITSOUND.LK)) this.queueSound("audio/misc/hit-lk.zzz");
    else if(hasFlag(value,HITSOUND.FIRE0)) this.queueSound("audio/misc/fire-0.zzz");
    else if(hasFlag(value,HITSOUND.FIRE1)) this.queueSound("audio/misc/fire-1.zzz");
}



Player.prototype.queueBlockSound = function() { this.queueSound("audio/misc/block.zzz"); }
Player.prototype.queueBlockProjectileSound = function() { this.queueSound("audio/misc/block-projectile.zzz"); }
Player.prototype.queueGrappleSound = function() { this.queueSound("audio/misc/grapple.zzz"); }
Player.prototype.queueSuperMoveChargeSound = function() { this.queueSound("audio/misc/super-charge.zzz"); }
Player.prototype.queueLightFireSound = function() { this.queueSound("audio/misc/fire-0.zzz"); }
Player.prototype.queueHardFireSound = function() { this.queueSound("audio/misc/fire-1.zzz"); }


Player.prototype.queueSound = function(value,volume)
{
    soundManager_.queueSound(value,volume);
}
