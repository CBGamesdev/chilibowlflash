Game.Gallery = function(engine) {
	this._engine = engine;

	this.pieces = {};
	this.amounts = {};
	this.node = null;

	this._build();
}

Game.Gallery.prototype.sync = function() {
	var nextType = this._engine.getNextType();
	
	var avail = this._engine.getAvailableTypes();

	for (var type in this.pieces) {
		var piece = this.pieces[type];
		if (type == nextType) {
			piece.classList.add("next");
		} else {
			piece.classList.remove("next");
		}
		
		if (avail[type]) {
			piece.classList.remove("disabled");
		} else {
			piece.classList.add("disabled");
		}
		
		this.amounts[type].innerHTML = avail[type] || 0;
	}
}

Game.Gallery.prototype._build = function() {
	this.node = document.createElement("div");
	this.node.id = "gallery";

	var types = Object.keys(Game.Piece.DEF);
	types.forEach(this._buildPiece, this);
}

Game.Gallery.prototype._buildPiece = function(type, index) {
	var node = document.createElement("div");
	node.style.width = (5*Game.CELL) + "px";
	node.style.height = (5*Game.CELL) + "px";
	node.classList.add("gallery");
	node.setAttribute("data-type", type);

	var piece = new Game.Piece(type);
	var xy = new XY(2, 2);
	if (type == "o") { 
		xy.x += 0.5; 
		xy.y += 0.5; 
	}
	if (type == "i" || type == "-") { xy.x += 0.5; }
	piece.xy = xy;
	piece.build(node);

	this.pieces[type] = node;
	
	var num = index+1;
	if (num == 10) { num = 0; }
	var text = "(" + (num) + ") Available: ";
	node.appendChild(document.createTextNode(text));
	
	var amount = document.createElement("span");
	this.amounts[type] = amount;
	node.appendChild(amount);
	
	this.node.appendChild(node);
}
