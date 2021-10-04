Game.Engine.Network = function(firebase, master) {
	this._firebase = firebase;
	this._master = master;
	this._firebase.on("value", this._change.bind(this));

	if (this._master) { this._firebase.set(null); }
	Game.Engine.call(this);
}
Game.Engine.Network.prototype = Object.create(Game.Engine.prototype);

Game.Engine.Network.prototype.setNextType = function(nextType) {
	Game.Engine.prototype.setNextType.call(this, nextType);	

	if (!this._master) {
		if (this._nextType) { /* waiting, propagate upwards */
			this._send("next", "avail");
		} else { /* next piece got transformed into piece */
			this._send("next", "piece", "avail");
		}
	}
}

Game.Engine.Network.prototype.drop = function() {
	Game.Engine.prototype.drop.call(this);
	if (this._master) { this._send("piece"); }
	return this;
}

Game.Engine.Network.prototype.rotate = function() {
	Game.Engine.prototype.rotate.call(this);	
	if (this._master) { this._send("piece"); }
	return this;
}

Game.Engine.Network.prototype.shift = function(direction) {
	Game.Engine.prototype.shift.call(this, direction);	
	if (this._master) { this._send("piece"); }
	return this;
}

Game.Engine.Network.prototype._drop = function() {
	Game.Engine.prototype._drop.call(this);
	if (this._master) { this._send("pit", "piece", "next", "avail", "status"); }
}

Game.Engine.Network.prototype._tick = function() {
	Game.Engine.prototype._tick.call(this);
	if (this._master) { this._send("piece"); }
}

Game.Engine.Network.prototype._change = function(snap) {
	var data = snap.val();
	if (!data) { return; }

	if (data.pit) { this._syncPit(data.pit); }
	this._syncPiece(data.piece || null);
	this._syncNextType(data.next || "");
	if (data.avail) { this._syncAvailablePieces(data.avail); }
	if (data.status) { this._syncStatus(data.status); }
}

Game.Engine.Network.prototype._send = function() {
	var data = {};
	for (var i=0;i<arguments.length;i++) {
		switch (arguments[i]) {
			case "pit":
				data.pit = this.pit.toJSON();
			break;

			case "piece":
				data.piece = (this._piece ? this._piece.toJSON() : null);
			break;

			case "next":
				data.next = this._nextType;
			break;

			case "avail":
				data.avail = this._availableTypes;
			break;

			case "status":
				data.status = this._status;
			break;
		}
	}
	this._firebase.update(data);
}

Game.Engine.Network.prototype._syncPit = function(remotePit) {
	this.pit.fromJSON(remotePit);
}

Game.Engine.Network.prototype._syncAvailablePieces = function(remoteAvail) {
	this._availableTypes = remoteAvail;
	this.gallery.sync();
}

Game.Engine.Network.prototype._syncPiece = function(remotePiece) {
	if (remotePiece) {
		if (!this._piece) {
			this._piece = new Game.Piece(remotePiece.type);
			this._piece.build(this.pit.node);
			this._start();
		} else if (this._piece.id != remotePiece.id) {
			this._piece.destroy();
			this._piece = new Game.Piece(remotePiece.type);
			this._piece.build(this.pit.node);
		}
		this._piece.fromJSON(remotePiece);
	} else if (this._piece) {
		this._stop();
		this._piece.destroy();
		this._piece = null;
	}
}

Game.Engine.Network.prototype._syncNextType = function(remoteNextType) {
	this._nextType = remoteNextType;
}

Game.Engine.Network.prototype._syncStatus = function(remoteStatus) {
	this._setScore(remoteStatus.score);
	this._setPlaying(remoteStatus.playing)
}

Game.Engine.Network.prototype._start = function() {
	if (!this._master) { return; }
	Game.Engine.prototype._start.call(this);
}
