Game.App = function() {
	this._connected = null;
	this._firebase = null;
	this._engine = null;
	this._attacker = null;
	this._defender = null;

	this._dom = {
		left: document.querySelector("#left"),
		right: document.querySelector("#right"),
		attacker: document.querySelector("#attacker"),
		defender: document.querySelector("#defender"),
		play: document.querySelector("#play"),
		setup: document.querySelector("#setup"),
		description: document.querySelector("#description"),
		connect: document.querySelector("#connect"),
		server: document.querySelector("#server"),
		slug: document.querySelector("#slug")
	}
	this._select = {
		attacker: this._dom.attacker.querySelector("select"),
		defender: this._dom.defender.querySelector("select")
	}

	this._dom.connect.disabled = false;
	this._dom.server.value = localStorage.getItem("tetris.server") || "ondras";
	var slug = "";
	for (var i=0;i<4;i++) {
		var min = "a".charCodeAt(0);
		var max = "z".charCodeAt(0);
		var r = min + Math.floor(Math.random() * (max-min+1));
		slug += String.fromCharCode(r);
	}
	this._dom.slug.value = localStorage.getItem("tetris.slug") || slug;
	this._select.attacker.value = localStorage.getItem("tetris.attacker") || "Random";
	this._select.defender.value = localStorage.getItem("tetris.defender") || "AI";

	this._updateMode();
	this._updateDescription();

	this._select.attacker.addEventListener("change", this);
	this._select.defender.addEventListener("change", this);

	this._createBackground();
	
	this._dom.connect.addEventListener("click", this);
	this._dom.play.addEventListener("click", this);
	this._dom.play.focus();
}

Game.App.prototype.handleEvent = function(e) {
	switch (e.type) {
		case "change":
			this._changePlayer(e);
		break;
		
		case "click":
			switch (e.target) {
				case this._dom.connect:
					if (this._connected) { return; }
					this._connect();
				break;

				case this._dom.play:
					this._dom.setup.classList.add("playing");
					setTimeout(this._start.bind(this), 500);
				break;
			}
		break;
	}
}

Game.App.prototype._connect = function() {
	this._dom.connect.disabled = true;
	var server = this._dom.server.value;
	var slug = this._dom.slug.value;
	localStorage.setItem("tetris.server", server);
	localStorage.setItem("tetris.slug", slug);
	var url = "https://" + server + ".firebaseio.com/tetris/" + slug;
	this._firebase = new Firebase(url);

	var timeout = setTimeout(function() {
		var str = "";
		str += "Looks like we are having some troubles connecting to the server. Sorry for this!";
		str += "\n\n";
		str += "Some possible reasons and ways to fix this:";
		str += "\n\n";
		str += "\t1. You are truly offline. Improve your connection and try again.";
		str += "\n";
		str += "\t2. My free Firebase account's limit has been reached (50 simultaneous connections). Either try later or use your own Firebase account name in the connection string.";
		str += "\n";
		str += "\t3. You browser is not compatible with Firebase's JS client. No luck then.";
		alert(str);
	}, 4000);

	this._firebase.once("value", function(snap) {
		clearTimeout(timeout);
		this._connected = true;
		this._dom.connect.classList.add("connected");
		this._updateMode();
	}.bind(this));
}

Game.App.prototype._changePlayer = function(e) {
	localStorage.setItem("tetris.attacker", this._select.attacker.value);
	localStorage.setItem("tetris.defender", this._select.defender.value);

	if (this._engine) {
		if (e.target == this._select.attacker) { this._createAttacker(e.target.value); }
		if (e.target == this._select.defender) { this._createDefender(e.target.value); }
	} else {
		this._updateMode();
		this._updateDescription();
	}
}

Game.App.prototype._updateMode = function() {
	var mode = this._getMode();
	document.body.className = mode;
	this._dom.play.disabled = (mode == "network" && !this._connected);
}

Game.App.prototype._getMode = function() {
	return (this._select.attacker.value == "Network" || this._select.defender.value == "Network" ? "network" : "local");
}

Game.App.prototype._updateDescription = function() {
	var str = "";
	var key = this._select.attacker.value + "-" + this._select.defender.value;
	switch (key) {
		case "Random-Human": str = "The Classic Tetris"; break;
		case "Random-AI": str = "Sit and watch"; break;
		case "Random-Network": str = "Sleeping on the job"; break;
		case "AI-Human": str = "Bastet (Bastard Tetris)"; break;
		case "AI-AI": str = "Clash of the Titans"; break;
		case "AI-Network": str = "Playing Judas"; break;
		case "Human-Human": str = "Local multiplayer"; break;
		case "Human-AI": str = "Revenge!"; break;
		case "Human-Network": str = "Multiplayer (attacker)"; break;
		case "Network-Human": str = "Multiplayer (defender)"; break;
		case "Network-AI": str = "The Mechanical Turk"; break;
		case "Network-Network": str = "Observer mode"; break;
	}

	this._dom.description.innerHTML = str;
}

Game.App.prototype._start = function() {
	this._dom.connect.removeEventListener("click", this);
	this._dom.play.removeEventListener("click", this);

	this._dom.left.appendChild(this._dom.defender);
	this._dom.right.appendChild(this._dom.attacker);
	
	if (this._getMode() == "local") {
		this._engine = new Game.Engine();
	} else {
		var master = (this._select.defender.value != "Network");
		this._engine = new Game.Engine.Network(this._firebase, master);
	}
	this._createDefender(this._select.defender.value);
	this._createAttacker(this._select.attacker.value);

	/* disable options that are not supported at runtime */
	var selects = [this._select.attacker, this._select.defender];
	for (var i=0;i<selects.length;i++) {
		var select = selects[i];
		var options = select.querySelectorAll("option");
		var value = select.value;
		for (var j=0;j<options.length;j++) {
			var option = options[j];
			option.disabled = (
				(value == "Network" && option.value != "Network") ||
				(value != "Network" && option.value == "Network")
			);
		}
	}
}

Game.App.prototype._createDefender = function(defender) {
	if (this._defender) { this._defender.destroy(); }
	this._defender = this._createPlayer(defender, Game.Defender);
}

Game.App.prototype._createAttacker = function(attacker) {
	if (this._attacker) { this._attacker.destroy(); }
	this._attacker = this._createPlayer(attacker, Game.Attacker);
}

Game.App.prototype._createPlayer = function(type, namespace) {
	return new namespace[type](this._engine);
}

Game.App.prototype._createBackground = function() {
	var piece = new Game.Piece("t");
	piece.rotate(1);
	piece.rotate(1);
	piece.xy = new XY(1, 0);
	piece.build(this._dom.setup);

	var piece = new Game.Piece("z");
	piece.rotate(-1);
	piece.xy = new XY(1, 2);
	piece.build(this._dom.setup);

	var piece = new Game.Piece("j");
	piece.rotate(1);
	piece.rotate(1);
	piece.xy = new XY(4, 0);
	piece.build(this._dom.setup);

	var piece = new Game.Piece("i");
	piece.rotate(1);
	piece.xy = new XY(2, 3);
	piece.build(this._dom.setup);

	var piece = new Game.Piece("s");
	piece.rotate(1);
	piece.xy = new XY(5, 1);
	piece.build(this._dom.setup);

	var piece = new Game.Piece("l");
	piece.rotate(1);
	piece.rotate(1);
	piece.xy = new XY(8, 0);
	piece.build(this._dom.setup);

	var piece = new Game.Piece("-");
	piece.rotate(1);
	piece.xy = new XY(1, 5);
	piece.build(this._dom.setup);
}

