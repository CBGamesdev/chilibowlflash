function Intro() {
	var table = null;
	var logo = null;
	var callback = null;
	
	var defaultAlpha = 1000;
	var alpha = defaultAlpha;
	var fading = 1;
	this.init = function(c) {
		callback = c;
		create();
		render();
		handle();
	};
	this.paint = function() {
		table.paint();
		logo.paint();
		paintText();
	};
	function paintText() {
		if (alpha <= 0) {
			alpha = 0;
			fading = 0;
		} else if (alpha >= 1000) {
			alpha = 1000;
			fading = 1;
		}
		if (fading) alpha -= 25;
		else	
			alpha += 25;
		
		CTX_BUF.font = "italic 14px sans-serif";
		CTX_BUF.textAlign = "center";
		CTX_BUF.fillStyle ="rgba(0,0,0," + String(alpha/1000) + ")";
		CTX_BUF.fillText("press any key", TABLE_CX, TABLE_CY + TABLE_H/3);
	};
	function end() {
		unHandle();
		callback(0); // go to main menu
	};

	function create() {
		table = new Table();
		logo = new Logo();
	};
	function render() {
		table.render();
		logo.render();
	};
	function handle() {
		CANVAS.addEventListener('mousedown', end, false);
		window.addEventListener('keydown', end, false);
	};
	
	function unHandle() {
		CANVAS.removeEventListener('mousedown', end, false);
		window.removeEventListener('keydown', end, false);
	};
};