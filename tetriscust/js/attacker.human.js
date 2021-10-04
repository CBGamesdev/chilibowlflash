Game.Attacker.Human = function(engine) {
	Game.Player.call(this, engine);
	document.body.classList.add("attacker-human");
	document.body.addEventListener("click", this);
	window.addEventListener("keydown", this);
}
Game.Attacker.Human.prototype = Object.create(Game.Player.prototype);

Game.Attacker.Human.prototype.destroy = function() {
	document.body.classList.remove("attacker-human");
	document.body.removeEventListener("click", this);
	window.removeEventListener("keydown", this);
	Game.Player.prototype.destroy.call(this);
}

Game.Attacker.Human.prototype.handleEvent = function(e) {
	switch (e.type) {
		case "click":
			var node = e.target;
			var type = null;
			while (node != document.body) {
				if (node.hasAttribute("data-type")) { type = node.getAttribute("data-type"); }
				node = node.parentNode;
			}
			if (type) { this._engine.setNextType(type); }
		break;
		
		case "keydown":
			var index = e.keyCode - "1".charCodeAt(0);
			if (index == -1) { index = 9; }
			var def = Object.keys(Game.Piece.DEF);
			var type = def[index];
			var avail = this._engine.getAvailableTypes();
			if (avail[type]) { this._engine.setNextType(type); }
		break;
	}
}
