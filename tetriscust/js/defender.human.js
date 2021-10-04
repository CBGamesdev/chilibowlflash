Game.Defender.Human = function(engine) {
	Game.Player.call(this, engine);
	window.addEventListener("keydown", this);
}
Game.Defender.Human.prototype = Object.create(Game.Player.prototype);

Game.Defender.Human.prototype.destroy = function() {
	window.removeEventListener("keydown", this);
	Game.Player.prototype.destroy.call(this);
}

Game.Defender.Human.prototype.handleEvent = function(e) {
	switch (e.keyCode) {
		case 37: /* left */
			e.preventDefault();
			this._engine.shift(-1);
		break;

		case 39: /* right */
			e.preventDefault();
			this._engine.shift(+1);
		break;

		case 38: /* top */
			e.preventDefault();
			this._engine.rotate();
		break;

		case 40: /* bottom */
			e.preventDefault();
			this._engine.drop();
		break;
	}
}
