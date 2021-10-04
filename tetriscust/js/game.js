Array.prototype.random = function() {
	return this[Math.floor(Math.random() * this.length)];
}

var Game = {
	DEPTH: 20,
	WIDTH: 10,
	CELL: 25,
	INTERVAL_ENGINE: 1000,
	INTERVAL_ATTACKER: 100,
	INTERVAL_DEFENDER: 200,
	INTERVAL_DROP: 200,
	
	Attacker: {},
	Defender: {}
}
