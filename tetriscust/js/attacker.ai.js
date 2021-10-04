Game.Attacker.AI = function(engine) {
	Game.Player.call(this, engine);
	this._lastType = "";
	this._interval = setInterval(this._poll.bind(this), Game.INTERVAL_ATTACKER);
}

Game.Attacker.AI.prototype = Object.create(Game.Player.prototype);

Game.Attacker.AI.prototype.destroy = function() {
	clearInterval(this._interval); 
	this._interval = null;
	Game.Player.prototype.destroy.call(this);
}

Game.Attacker.AI.prototype._poll = function() {
	var next = this._engine.getNextType();
	if (next) { return; }

	var avail = Object.keys(this._engine.getAvailableTypes());

	/* remove last used type, if possible */
	var index = avail.indexOf(this._lastType);
	if (index > -1 && avail.length > 1) { avail.splice(index, 1); }

	var pit = this._engine.pit;
	var current = this._engine.getPiece();

	if (current) { /* drop current piece based on its expected position/rotation */
		pit = pit.clone();
		current = current.clone();

		var best = Game.AI.findBestPositionRotation(pit, current);
		for (var i=0;i<best.rotation;i++) { current.rotate(+1); }
		current.xy = new XY(best.x, Game.DEPTH);
		pit.drop(current);
	}

	var scores = Game.AI.scoreTypes(pit, avail);
	var worstScore = -Infinity;
	var worstTypes = [];

	for (var type in scores) {
		var score = scores[type];
		if (score > worstScore) {
			worstScore = score;
			worstTypes = [];
		}
		if (score == worstScore) { worstTypes.push(type); }
	}

	var type = worstTypes.random();
	this._lastType = type;
	this._engine.setNextType(type);
}
