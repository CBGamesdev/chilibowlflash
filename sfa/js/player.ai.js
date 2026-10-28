/*
Player.prototype.enableAI = function(player,createAiFn)
{
    managed_ = managed_ || (!!createAiFn ? createAiFn(this) : null);
}

Player.prototype.reset = function() { managed_.reset(); }
Player.prototype.getManaged = function() { return managed_; }
Player.prototype.isRunning = function() { return !!managed_; }
Player.prototype.onEnemyStartAttack = function(frame, who) { managed_.onEnemyStartAttack(frame,who); }
Player.prototype.onEnemyContinueAttack = function(frame, who) { managed_.onEnemyContinueAttack(frame,who); }
Player.prototype.onEnemyEndAttack = function(frame, who) { managed_.onEnemyEndAttack(frame,who); }
Player.prototype.onEnemyVulnerable = function(frame, who, x, y) { managed_.onEnemyVulnerable(frame,who,x,y); }
Player.prototype.onEnemyFloating = function(frame, who, x, y) { if(!!managed_.onEnemyFloating) { managed_.onEnemyFloating(frame,who,x,y); } }
Player.prototype.onEnemyDizzy = function(frame, who) { managed_.onEnemyDizzy(frame,who); }
Player.prototype.onEnemyAttackPending = function(frame,x,y,player,isSuperMove) { managed_.onEnemyAttackPending(frame,x,y,player,isSuperMove); }
Player.prototype.onEnemyProjectilePending = function(frame,x,y,player,isSuperMove) { managed_.onEnemyProjectilePending(frame,x,y,player,isSuperMove); }
Player.prototype.onEnemyProjectileMoved = function(frame,id,x,y,projectile,isSuperMove) { managed_.onEnemyProjectileMoved(frame,id,x,y,projectile,isSuperMove); }
Player.prototype.onEnemyProjectileGone = function(frame,id) { managed_.onEnemyProjectileGone(id); }
Player.prototype.onTakeHit = function(frame,id) { managed_.onTakeHit(id); }
Player.prototype.onAttackStateChanged = function(who,result) { managed_.onAttackStateChanged(who,result); }
Player.prototype.onBlocked = function() { managed_.onBlocked(); }
Player.prototype.onStartAttack = function(frame,id) { managed_.onStartAttack(id); }
Player.prototype.frameMove = function(frame) { managed_.frameMove(frame); }
Player.prototype.onNewRound = function() { managed_.onNewRound(); }
Player.prototype.onStartAnimation = function(name) { managed_.onStartAnimation(name); }
Player.prototype.onEndAnimation = function(name) { managed_.onEndAnimation(name); }
Player.prototype.execute = function(sequence) { managed_.execute(sequence); }
*/

Player.prototype.onEnemyAttackPending = function(frame,x,y,player,isSuperMove) { if(this.Ai.isRunning()) { this.Ai.onEnemyAttackPending(frame,x,y,player,isSuperMove); } }
Player.prototype.onEnemyProjectilePending = function(frame,x,y,player,isSuperMove) { if(this.Ai.isRunning()) { this.Ai.onEnemyProjectilePending(frame,x,y,player,isSuperMove); } }
Player.prototype.onEnemyProjectileMoved = function(frame,id,x,y,projectile,isSuperMove) { if(this.Ai.isRunning()) { this.Ai.onEnemyProjectileMoved(frame,id,x,y,projectile,isSuperMove); } }
Player.prototype.onEnemyProjectileGone = function(frame,id) { if(this.Ai.isRunning()) { this.Ai.onEnemyProjectileGone(frame,id); } }
Player.prototype.onEnemyStartAttack = function(frame, who) { if(this.Ai.isRunning()) { this.Ai.onEnemyStartAttack(frame, who); } }
Player.prototype.onEnemyContinueAttack = function(frame, who,hitPoints) { if(this.Ai.isRunning()) { this.Ai.onEnemyContinueAttack(frame, who, hitPoints); } }
Player.prototype.onEnemyEndAttack = function(frame, who) { if(this.Ai.isRunning()) { this.Ai.onEnemyEndAttack(frame, who); } }
Player.prototype.onEnemyVulerable = function(frame, who, x, y) { if(this.Ai.isRunning()) { this.Ai.onEnemyVulnerable(frame, who, x, y); } }
Player.prototype.onEnemyFloating = function(frame, who, x, y) { if(this.Ai.isRunning()) { this.Ai.onEnemyFloating(frame, who, x, y); } }
Player.prototype.onEnemyDizzy = function(frame, who) { if(this.Ai.isRunning()) { this.Ai.onEnemyDizzy(frame, who); } }
Player.prototype.onStartAttack = function() { if(this.Ai.isRunning()) { this.Ai.onStartAttack(); } }
Player.prototype.onTakeHit = function(frame, who) { if(this.Ai.isRunning()) { this.Ai.onTakeHit(frame, who); } }
Player.prototype.onBlocked = function(frame, who) { if(this.Ai.isRunning()) { this.Ai.onBlocked(frame, who); } }
Player.prototype.onStartAnimation = function(name) { if(this.Ai.isRunning()) { this.Ai.onStartAnimation(name); } }
Player.prototype.onEndAnimation = function(name) { if(this.Ai.isRunning()) { this.Ai.onEndAnimation(name); } }
Player.prototype.onAttackStateChanged = function(who,result)
{
	if(this.Ai.isRunning())
	{
		this.Ai.onAttackStateChanged(who,result);
		if(result == ATTACK_STATE.HIT)
			this.SentHitAttackStateChange = true;
	}
}
