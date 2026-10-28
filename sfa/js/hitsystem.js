

var RegisteredHit = function(behavior,hitState,flags,startFrame,frame,damage,energyToAdd,isProjectile,isGrapple,hitX,hitY,attackDirection,who,hitID,attackID,priorityFlags,playerPoseState,playerState,fx,fy,otherPlayer,behaviorFlags,invokedAnimationName)
{
    this.BehaviorFlags = behaviorFlags;
    this.HitState = hitState;
    this.Flags = flags;
    this.Frame = frame;
    this.StartFrame = 0;
    this.Damage = damage;
    this.EnergyToAdd = energyToAdd;
    this.IsProjectile = isProjectile;
    this.IsGrapple = isGrapple;
    this.HitX = hitX;
    this.HitY = hitY;
    this.Who = who;
    this.AttackDirection = attackDirection;
    this.HitID = hitID;
    this.AttackID = attackID;
    this.PriorityFlags = priorityFlags;
    this.PlayerPoseState = priorityFlags;
    this.PlayerState = playerState;
    this.AttackForceX = fx;
    this.AttackForceY = fy;
    this.OtherPlayer = otherPlayer;
    this.InvokedAnimationName = invokedAnimationName;
    this.NoFrameDelay = false;
}




//*controls if a move can override another. To allow a double hit, set both the allowOverridgeFlags and overideFlags to OVERRIDE_FLAGS.NONE
var MoveOverrideFlags = function(allowOverrideFlags,overrideFlags)
{
    this.AllowOverrideFlags = allowOverrideFlags || OVERRIDE_FLAGS.ALL;
    this.OverrideFlags = overrideFlags || OVERRIDE_FLAGS.NULL;
}

MoveOverrideFlags.prototype.hasAllowOverrideFlag = function(flag) { return !!flag && hasFlag(this.AllowOverrideFlags,flag); }
MoveOverrideFlags.prototype.hasOverrideFlag = function(flag) { return !!flag && hasFlag(this.OverrideFlags,flag); }


var ActionDetails = function(registeredHit,overrideFlags,player,otherID,isProjectile,isGrapple,startFrame,frame,otherPlayer)
{
    this.MoveOverrideFlags = overrideFlags;
    this.Frame = frame || 0;
    this.OtherAttackStartFrame = startFrame;
    this.RegisteredHit = registeredHit;
    this.Key = this.getKey(player.Id,otherID);
    this.IsProjectile = isProjectile;
    this.IsGrapple = isGrapple;
    this.Player = player;
    this.OtherPlayer = otherPlayer;
    this.PlayerID = player.Id;
}


ActionDetails.prototype.getKey = function(playerID,otherID)
{
    var retVal = "";
    //ensure that the team 1 is always first
    if(playerID.charAt(1) == "1")
        retVal = playerID + otherID;
    else
        retVal = otherID + playerID;

    return retVal;
}


var HitSystem = function(actionFrameDelay)
{
    this.Actions = {};
    this.HoldFrame = false;
    this.ActionFrameDelay = actionFrameDelay || CONSTANTS.DEFAULT_ACTION_FRAME_DELAY;
}

HitSystem.prototype.pause = function()
{
    this.HoldFrame = true;
}

HitSystem.prototype.resume = function()
{
    this.HoldFrame = false;
}

HitSystem.prototype.checkPendingHits = function(id,overrideFlags)
{
}

//can the hit on the victimA player be hit
HitSystem.prototype.canHit = function(key,index)
{
    var victimA = index == 0 ? this.Actions[key][0] : this.Actions[key][1];
    var victimB = index == 0 ? this.Actions[key][1] : this.Actions[key][0];

    var retVal = true;
    if(!!victimA.OtherPlayer && !!victimA.Player.CurrentAnimation.Animation && !victimA.IsProjectile)
    {
        if(victimA.Player.isUnhittable())
            return false;
        //grapples can not be overriden
        if(victimA.Player.isGrappling())
            return false;
        if(victimA.IsGrapple || (!!victimB && victimB.IsGrapple))
            return true;
        var flags = victimA.Player.CurrentAnimation.Animation.OverrideFlags;
        var otherFlags = victimA.OtherPlayer.CurrentAnimation.Animation.OverrideFlags;


        var imDoingUppercut = victimA.Player.CurrentAnimation.Animation.OverrideFlags.hasAllowOverrideFlag(OVERRIDE_FLAGS.SHORYUKEN);
        var youreDoingUppercut = victimA.OtherPlayer.CurrentAnimation.Animation.OverrideFlags.hasAllowOverrideFlag(OVERRIDE_FLAGS.SHORYUKEN);

        var canIOverrideYou = (!flags.hasOverrideFlag(OVERRIDE_FLAGS.NONE) 
                && flags.hasOverrideFlag(victimA.OtherPlayer.CurrentAnimation.Animation.OverrideFlags.AllowOverrideFlags) /*overrides yours*/
                && !otherFlags.hasOverrideFlag(victimA.Player.CurrentAnimation.Animation.OverrideFlags.AllowOverrideFlags)) /*overrides mine (if both moves override each other, then both should hit)*/
                || imDoingUppercut /*overrides everything*/
            ;

        var canYouOverrideMe = (!otherFlags.hasOverrideFlag(OVERRIDE_FLAGS.NONE) 
                && otherFlags.hasOverrideFlag(victimA.Player.CurrentAnimation.Animation.OverrideFlags.AllowOverrideFlags)
                && !flags.hasOverrideFlag(victimA.OtherPlayer.CurrentAnimation.Animation.OverrideFlags.AllowOverrideFlags))
                || youreDoingUppercut /*overrides everything*/

        var iDidFirstJumpInAttack = (victimA.Player.CurrentAnimation.Animation.BaseAnimation.IsAttack && victimA.OtherPlayer.CurrentAnimation.Animation.BaseAnimation.IsAttack
                && victimA.Player.isAirborne()
                && !victimA.OtherPlayer.isAirborne()
                && (victimA.Player.CurrentAnimation.StartFrame < victimA.OtherPlayer.CurrentAnimation.StartFrame))
            ;

        var youDidFirstJumpInAttack = (victimA.Player.CurrentAnimation.Animation.BaseAnimation.IsAttack && victimA.OtherPlayer.CurrentAnimation.Animation.BaseAnimation.IsAttack
                && victimA.OtherPlayer.isAirborne()
                && !victimA.Player.isAirborne()
                && (victimA.OtherPlayer.CurrentAnimation.StartFrame < victimA.Player.CurrentAnimation.StartFrame))
            ;

        var canYourHProjectileHit = (otherFlags.hasAllowOverrideFlag(OVERRIDE_FLAGS.HPROJECTILE)) && !victimB;

        //if we aren't facing our victimA, then we can't override
        if(!victimA.Player.isFacingPlayer(victimA.OtherPlayer, true))
            return true;

        //after all attack frames in a move are finished - IgnoreOverrides will be set to true
        if(!!victimA.Player.IgnoreOverrides)
            return true;

        //ken and ryu's uppercut can not be overriden
        if(!!imDoingUppercut && !youreDoingUppercut)
            return false;
        else if(!!youreDoingUppercut)
            return true;

        if(!!canYourHProjectileHit)
            return true;
        
        //special overrides
        if(!!canYouOverrideMe)
            return true;
        else if(!!canIOverrideYou)
            return false;

        //the first attack on a jump in should hit
        if(!!iDidFirstJumpInAttack)
            return false;
        else if(!!youDidFirstJumpInAttack)
            return true;
    }
    return retVal;
}

HitSystem.prototype.clearPendingHit = function(id)
{
    for(var i in this.Actions)
    {
        for(var index in this.Actions[i])
        {
            if(this.Actions[i][index].PlayerID == id)
            {
                this.Actions[i][index] = null;
                delete this.Actions[i][index];
            }
        }
        if(!this.Actions[i][0] && !this.Actions[i][1])
        {
            delete this.Actions[i];
        }
    }
}

HitSystem.prototype.frameMove = function(frame)
{
    for(var i in this.Actions)
    {
        var item = this.Actions[i];

        if(!!this.HoldFrame)
        {
            if(!!item && !!item.ActionFrame)
                ++item.ActionFrame;
            continue;
        }

        if(!!item && !!item.ActionFrame && (item.ActionFrame <= frame))
        {
            var canP1Hit = !!item[0] && this.canHit(item[0].Key,0);
            var canP2Hit = !!item[1] && this.canHit(item[1].Key,1);
            var canDoubleHit = !canP1Hit && !canP2Hit

            if(!!item[0] && canP1Hit)
            {
                //player 1 registers action
                item[0].Player.registerHit(frame,item[0].RegisteredHit);
            }
            else if(!!item[0])
            {
                item[0].Player.didntHit(frame,item[0].OtherPlayer.Id);
            }

            if(!!item[1] && canP2Hit)
            {
                //player 2 registers action
                item[1].Player.registerHit(frame,item[1].RegisteredHit);
            }
            else if(!!item[1])
            {
                item[1].Player.didntHit(frame,item[1].OtherPlayer.Id);
            }
            //clear the action
            this.Actions[i] = null;
            delete this.Actions[i];
        }
    }
}

HitSystem.prototype.register = function(details)
{
    if(details.IsProjectile)
        details.Key += "_" + details.Frame.toString();
    if(!this.Actions[details.Key])
        this.Actions[details.Key] = {ActionFrame:details.Frame + (!!details.NoFrameDelay ? 0 : this.ActionFrameDelay)}
    if(!this.Actions[details.Key][0] || (this.Actions[details.Key][0].PlayerID == details.PlayerID))
        this.Actions[details.Key][0] = details;
    else
        this.Actions[details.Key][1] = details;

    if(!!details.NoFrameDelay)
    {
        this.frameMove(details.Frame);
    }

}
