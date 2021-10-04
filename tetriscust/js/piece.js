Game.Piece = function(type) {
	var def = this.constructor.DEF[type];
	if (!def) { throw new Error("Piece '" + type + "' does not exist"); }

	this.type = type;
	this.xy = new XY();
	this.node = null;
	this.cells = {};
	this.id = Math.random();

	def.cells.forEach(function(xy) {
		var cell = new Game.Cell(xy, type);
		this.cells[xy] = cell;
	}, this);
}

Game.Piece.DEF = {
	"o": {
		color: "#333",
		avail: 3,
		cells: [new XY(0, 0), new XY(-1, 0), new XY(0, -1), new XY(-1, -1)]
	},
	"i": {
		color: "#6cf",
		avail: 3,
		cells: [new XY(0, 0), new XY(-1, 0), new XY(1, 0), new XY(-2, 0)]
	},
	"s": {
		color: "#6c0",
		avail: 2,
		cells: [new XY(0, 0), new XY(1, 0), new XY(0, -1), new XY(-1, -1)]
	},
	"z": {
		color: "#ff3",
		avail: 2,
		cells: [new XY(0, 0), new XY(-1, 0), new XY(0, -1), new XY(1, -1)]
	},
	"l": {
		color: "#f93",
		avail: 2,
		cells: [new XY(0, 0), new XY(-1, 0), new XY(1, 0), new XY(-1, -1)]
	},
	"j": {
		color: "#939",
		avail: 2,
		cells: [new XY(0, 0), new XY(-1, 0), new XY(1, 0), new XY(1, -1)]
	},
	"t": {
		color: "#c33",
		avail: 3,
		cells: [new XY(0, 0), new XY(-1, 0), new XY(1, 0), new XY(0, -1)]
	},
/***/
	"-": {
		color: "#fff",
		avail: 3,
		cells: [new XY(0, 0), new XY(-1, 0)]
	},
	"+": {
		color: "#f9c",
		avail: 2,
		cells: [new XY(0, 0), new XY(-1, 0), new XY(1, 0), new XY(0, -1), new XY(0, 1)]
	},
	"u": {
		color: "#963",
		avail: 1,
		cells: [new XY(0, 0), new XY(-1, 0), new XY(-1, 1), new XY(1, 0), new XY(1, -1)]
	}
}

Object.defineProperty(Game.Piece.prototype, "xy", {
	get: function() {
		return this._xy;
	},

	set: function(xy) {
		this._xy = xy;
		if (this.node) { this._position(); }
	}
});


Game.Piece.prototype.toString = function() {
	return Object.keys(this.cells).join(";");
}

Game.Piece.prototype.toJSON = function() {
	var data = {
		type: this.type,
		xy: this.xy.toString(),
		id: this.id,
		cells: {}
	};
	for (var p in this.cells) { data.cells[p] = 1; }
	return data;
}

Game.Piece.prototype.fromJSON = function(data) {
	for (var p in data.cells) {
		if (p in this.cells) { continue; }
		var cell = new Game.Cell(XY.fromString(p), this.type);
		this.cells[p] = cell;
		if (this.node) { cell.build(this.node); }
	}
	for (var p in this.cells) {
		if (p in data.cells) { continue; }
		if (this.node) { this.node.removeChild(this.cells[p].node); }
		delete this.cells[p];
	}
	this.xy = XY.fromString(data.xy);
}

Game.Piece.prototype.destroy = function() {
	if (this.node) { this.node.parentNode.removeChild(this.node); }
}

Game.Piece.prototype.build = function(parent) {
	this.node = document.createElement("div");
	this.node.classList.add("piece");
	for (var p in this.cells) { this.cells[p].build(this.node); }
	this._position();
	parent.appendChild(this.node);
	return this;
}

Game.Piece.prototype.fits = function(pit) {
	for (var p in this.cells) {
		var xy = this.cells[p].xy.plus(this.xy);

		if (xy.x < 0 || xy.x >= Game.WIDTH) { return false; }
		if (xy.y < 0) { return false; }
		if (pit.cells[xy]) { return false; }
	}

	return true;
}

Game.Piece.prototype.rotate = function(direction) {
	var sign = (direction > 0 ? new XY(-1, 1) : new XY(1, -1));
	var newCells = {};

	for (var p in this.cells) {
		var cell = this.cells[p];
		var xy = cell.xy;
		var nxy = new XY(xy.y*sign.x, xy.x*sign.y);
		cell.xy = nxy;
		newCells[nxy] = cell;
	}
	this.cells = newCells;

	return this;
}

Game.Piece.prototype.center = function() {
	this.xy = new XY(Game.WIDTH/2, Game.DEPTH-1);
	return this;
}

Game.Piece.prototype.clone = function() {
	var clone = new Game.Piece(this.type);

	clone.xy = this.xy;
	clone.cells = {};
	for (var p in this.cells) {
		clone.cells[p] = this.cells[p].clone();
	}

	return clone;
}

Game.Piece.prototype._position = function() {
	this.node.style.left = (this.xy.x * Game.CELL) + "px";
	this.node.style.bottom = (this.xy.y * Game.CELL) + "px";
	return this;
}
