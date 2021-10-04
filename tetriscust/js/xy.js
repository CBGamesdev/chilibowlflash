var XY = function(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

XY.fromString = function(str) {
	var parts = str.split(",");
	return new this(parseInt(parts[0]), parseInt(parts[1]));
}

XY.prototype.toString = function() {
	return this.x+","+this.y;
}

XY.prototype.plus = function(xy) {
	return new XY(this.x+xy.x, this.y+xy.y);
}

XY.prototype.minus = function(xy) {
	return new XY(this.x-xy.x, this.y-xy.y);
}

XY.prototype.clone = function() {
	return new XY(this.x, this.y);
}
