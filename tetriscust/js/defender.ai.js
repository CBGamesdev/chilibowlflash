Game.Defender.AI = function(engine) {
	Game.Player.call(this, engine);
	this._interval = setInterval(this._poll.bind(this), Game.INTERVAL_DEFENDER);
	this._currentPiece = null;
	this._currentTarget = null;
}
Game.Defender.AI.prototype = Object.create(Game.Player.prototype);

Game.Defender.AI.prototype.destroy = function() {
	clearInterval(this._interval); 
	this._interval = null;
	Game.Player.prototype.destroy.call(this);
}

Game.Defender.AI.prototype._poll = function() {
	var piece = this._engine.getPiece();
	if (!piece) { return; }

	if (piece != this._currentPiece) {
		this._currentPiece = piece;
		
		var pit = this._engine.pit;
		this._currentTarget = Game.AI.findBestPositionRotation(pit, piece);
	}
	
	if (this._currentTarget.rotation) {
		this._currentTarget.rotation--;
		this._engine.rotate();
		return;
	}
	
	var diff = (this._currentTarget.x - this._currentPiece.xy.x);
	if (!diff) {
		this._engine.drop();
		return;
	}
	
	this._engine.shift(diff > 0 ? 1 : -1)	
}
