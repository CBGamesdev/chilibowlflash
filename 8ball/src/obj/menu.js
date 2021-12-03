function Menu() {
	/* colors */
	var ALPHA = 0.4;
	var TEXT_COLOR = "white";
	var TEXT_FONT = "verdana";
	
	var defaultAlpha = ALPHA*1000;
		alpha = defaultAlpha;
	var fadingOut = false,
		fadingIn = false;
	
	var callback;
	var OPT_W = WIDTH / 10;
	var OPT_H = OPT_W / 3;
	var OPT_MARGIN = OPT_H / 2;
	var OPT_PADDING = OPT_H / 3;
	var OPT_FONT = "verdana";
	
	this.options = new Array();
	var options = this.options;
	var selected = null;
	var hovered = null;
	
	function getBox(idx) {
		var distance = 	(options.length-1)*(OPT_H+OPT_MARGIN);
		var startY = HEIGHT/2 - distance/2;
		return {
			x1: WIDTH/2 - OPT_W/2,
			y1: startY + idx*(OPT_H+OPT_MARGIN) - OPT_H/2,
			x2: WIDTH/2 + OPT_W/2,
			y2: startY + idx*(OPT_H+OPT_MARGIN) + OPT_H/2
		};
	};
	
	this.open = function(c) {
		callback = c;
		alpha = 0;
		fadingIn = true;
	};
	this.paint = function() {
		CTX_BUF.fillStyle = "rgba(0,0,0," + String(alpha/1000) + ")";
		CTX_BUF.fillRect(0,0,WIDTH,HEIGHT);
		if (fadingOut) {
			fadeOut();
		} else if (fadingIn) {
			fadeIn();
		} else {	
			var distance = 	(this.options.length-1)*(OPT_H+OPT_MARGIN);
			var startY = HEIGHT/2 - distance/2;
			
			for (var i = 0; i < this.options.length; i++) {
				var y = startY + i*(OPT_H+OPT_MARGIN);
				var text = this.options[i];
				CTX_BUF.strokeStyle = "black";
				CTX_BUF.lineWidth = 1;
				if (hovered == i)
					CTX_BUF.fillStyle = "rgba(0,0,0,1)";
				else
					CTX_BUF.fillStyle = "rgba(0,0,0," + String(alpha/1000) + ")";
				CTX_BUF.beginPath();
				CTX_BUF.rect(WIDTH/2 - OPT_W/2, y - OPT_H/2, OPT_W, OPT_H);
				CTX_BUF.closePath();
				CTX_BUF.fill();
				CTX_BUF.stroke();
				
				CTX_BUF.fillStyle = TEXT_COLOR;
				var fontSize = calculateFontSize(CTX_BUF, OPT_FONT, OPT_W - OPT_PADDING*2, OPT_H - OPT_PADDING*2, text);
				CTX_BUF.font = String(fontSize) + "px " + OPT_FONT;
				CTX_BUF.textAlign = "center";
				var textHeight = fontSize2Height(fontSize);
				CTX_BUF.fillText(text, WIDTH/2, y + textHeight/2);
			}
		}
	};
	function select(e) {
		var mouse = getMousePos(e);
		for ( var i = 0; i < options.length; i++) {
			var b = getBox(i);
			if (mouse.x >= b.x1 && mouse.x <= b.x2 && mouse.y >= b.y1 && mouse.y <= b.y2 )
				selected = i+1;
		}
		if (selected != null)
			close();
	};
	function hover(e) {
		var mouse = getMousePos(e);
		var h = null;
		for ( var i = 0; i < options.length; i++) {
			var b = getBox(i);
			if (mouse.x >= b.x1 && mouse.x <= b.x2 && mouse.y >= b.y1 && mouse.y <= b.y2 )
				h = i;
		}
		if (h == null)
			hovered = null;
		else
			hovered = h;
	};
	function close() {
		fadingOut = true;
		unHandle();
	};
	function fadeIn() {
		alpha += 15;
		if (alpha >= defaultAlpha) { // fade in ended
			alpha = defaultAlpha;
			fadingIn = false;
			handle();
		}
	};
	function fadeOut() {
		alpha -= 15;
		if (alpha <= 0) { // fade out ended
			alpha = 0;
			fadingOut = false;
			unHandle();
			callback(selected);
		}
	};
	function handle() {
		CANVAS.addEventListener('click', select, false);
		CANVAS.addEventListener('mousemove', hover, false);
	};
	
	function unHandle() {
		CANVAS.removeEventListener('click', select, false);
		CANVAS.removeEventListener('mousemove', hover, false);
	};
};