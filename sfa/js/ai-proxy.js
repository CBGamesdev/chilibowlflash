var CreateAIProxy = function () {
	var player_ = null;
	var managed_ = null;


	var AIProxy = function () {
	};

	AIProxy.prototype.enableAI = function (player, createAiFn) {
		player_ = player_ || player;
		managed_ = managed_ || (!!createAiFn ? createAiFn(player_) : null);
	};
	AIProxy.prototype.release = function () {
		player_ = null;
		managed_ = null;
	};
	AIProxy.prototype.reset = function () {
		managed_.reset();
	};
	AIProxy.prototype.getManaged = function () {
		return managed_;
	};
	AIProxy.prototype.isRunning = function () {
		return !!managed_;
	};
	AIProxy.prototype.onEnemyStartAttack = function (frame, who) {
		managed_.onEnemyStartAttack(frame, who);
	};
	AIProxy.prototype.onEnemyContinueAttack = function (frame, who) {
		managed_.onEnemyContinueAttack(frame, who);
	};
	AIProxy.prototype.onEnemyEndAttack = function (frame, who) {
		managed_.onEnemyEndAttack(frame, who);
	};
	AIProxy.prototype.onEnemyVulnerable = function (frame, who, x, y) {
		managed_.onEnemyVulnerable(frame, who, x, y);
	};
	AIProxy.prototype.onEnemyFloating = function (frame, who, x, y) {
		if (!!managed_.onEnemyFloating) {
			managed_.onEnemyFloating(frame, who, x, y);
		}
	};
	AIProxy.prototype.onEnemyDizzy = function (frame, who) {
		managed_.onEnemyDizzy(frame, who);
	};
	AIProxy.prototype.onEnemyAttackPending = function (frame, x, y, player, isSuperMove) {
		managed_.onEnemyAttackPending(frame, x, y, player, isSuperMove);
	};
	AIProxy.prototype.onEnemyProjectilePending = function (frame, x, y, player, isSuperMove) {
		managed_.onEnemyProjectilePending(frame, x, y, player, isSuperMove);
	};
	AIProxy.prototype.onEnemyProjectileMoved = function (frame, id, x, y, projectile, isSuperMove) {
		managed_.onEnemyProjectileMoved(frame, id, x, y, projectile, isSuperMove);
	};
	AIProxy.prototype.onEnemyProjectileGone = function (frame, id) {
		managed_.onEnemyProjectileGone(id);
	};
	AIProxy.prototype.onTakeHit = function (frame, id) {
		managed_.onTakeHit(id);
	};
	AIProxy.prototype.onAttackStateChanged = function (who, result) {
		managed_.onAttackStateChanged(who, result);
	};
	AIProxy.prototype.onBlocked = function () {
		managed_.onBlocked();
	};
	AIProxy.prototype.onStartAttack = function (frame, id) {
		managed_.onStartAttack(id);
	};
	AIProxy.prototype.frameMove = function (frame) {
		managed_.frameMove(frame);
	};
	AIProxy.prototype.onNewRound = function () {
		managed_.onNewRound();
	};
	AIProxy.prototype.onStartAnimation = function (name) {
		managed_.onStartAnimation(name);
	};
	AIProxy.prototype.onEndAnimation = function (name) {
		managed_.onEndAnimation(name);
	};
	AIProxy.prototype.execute = function (sequence) {
		managed_.execute(sequence);
	};

	return new AIProxy();
};
