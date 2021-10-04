Game.Player = function(engine) {
	this._engine = engine;
}

Game.Player.prototype.destroy = function() {
}

Game.Attacker.Network = Game.Defender.Network = Game.Player;
