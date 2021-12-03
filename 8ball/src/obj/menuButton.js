function MenuButton(d, cx, cy) {
	var callback = null;

	/* icons drawers */
	function paintIcon(ctx, d, m, iconColor, buttonColor) {
		var padding = d / 5;
		var iPadding = padding/2;
		ctx.strokeStyle = "black";
		ctx.lineWidth = 1.5;
		/* porta */
		ctx.beginPath();
		ctx.moveTo(padding, padding);
		ctx.lineTo(d*3/4 - iPadding	, padding);
		ctx.lineTo(d*3/4 - iPadding, d/2 - iPadding*1.5);
		ctx.lineTo(d*3/4 - iPadding*2, d/2 - iPadding*1.5);
		ctx.lineTo(d*3/4 - iPadding*2, padding + iPadding);
		ctx.lineTo(padding + iPadding, padding + iPadding);
		ctx.lineTo(padding + iPadding, d - padding - iPadding);
		ctx.lineTo(d*3/4 - iPadding*2, d - padding - iPadding);
		ctx.lineTo(d*3/4 - iPadding*2, d/2 + iPadding*1.5);
		ctx.lineTo(d*3/4 - iPadding, d/2 + iPadding*1.5);
		ctx.lineTo(d*3/4 - iPadding, d - padding);
		ctx.lineTo(padding, d - padding);
		ctx.closePath();
		ctx.fillStyle = iconColor;
		ctx.fill();
		ctx.stroke();

		/* freccia */
		ctx.beginPath();
		ctx.moveTo(padding + iPadding*1.5, d/2);
		ctx.lineTo(d/2, d/2 - iPadding*1.5);
		ctx.lineTo(d/2, d/2 - iPadding/2);
		ctx.lineTo(d - padding, d/2 - iPadding/2);
		ctx.lineTo(d - padding, d/2 + iPadding/2);
		ctx.lineTo(d/2, d/2 + iPadding/2);
		ctx.lineTo(d/2, d/2 + iPadding*1.5);
		ctx.lineTo(padding + iPadding*1.5, d/2);
		ctx.closePath();
		ctx.fillStyle = iconColor;
		ctx.fill();
		ctx.stroke();
	};
	
	var startX = cx - d/2,
		startY = cy - d/2;
	
	var arcR = d/5,
		m = d/10;
	
	/* properties */
	mouseOver = false;
	mouseDown = false;

	var iconColor = "white";
	var buttonColor = "gray";

	/* background */
	var backgroundC = null, backgroundCtx = null;
	function preRenderBackground() {
		backgroundC = document.createElement("canvas");
		backgroundC.setAttribute("width", WIDTH);
		backgroundC.setAttribute("height", HEIGHT);
		backgroundCtx = backgroundC.getContext("2d");
		
		backgroundCtx.translate(startX, startY);
		backgroundCtx.beginPath();
		backgroundCtx.arc(arcR, arcR, arcR, Math.PI, Math.PI*3/2);
		backgroundCtx.arc(d - arcR, arcR, arcR, Math.PI*3/2, Math.PI*2);
		backgroundCtx.arc(d - arcR, d - arcR, arcR, 0, Math.PI/2);
		backgroundCtx.arc(arcR, d - arcR, arcR, Math.PI/2, Math.PI);
		backgroundCtx.closePath();
		backgroundCtx.fillStyle = buttonColor;
		backgroundCtx.strokeStyle = "black";
		backgroundCtx.lineWidth = 1.5;
		backgroundCtx.fill();
		backgroundCtx.stroke();
	};
	
	/* pressed */
	var pressedC = null, pressedCtx = null;
	function preRenderMouseDown() {
		pressedC = document.createElement("canvas");
		pressedC.setAttribute("width", WIDTH);
		pressedC.setAttribute("height", HEIGHT);
		pressedCtx = pressedC.getContext("2d");
		
		pressedCtx.translate(startX, startY);
		pressedCtx.beginPath();
		pressedCtx.arc(arcR, arcR, arcR, Math.PI, Math.PI*3/2);
		pressedCtx.arc(d - arcR, arcR, arcR, Math.PI*3/2, Math.PI*2);
		pressedCtx.arc(d - arcR, d - arcR, arcR, 0, Math.PI/2);
		pressedCtx.arc(arcR, d - arcR, arcR, Math.PI/2, Math.PI);
		pressedCtx.closePath();
		pressedCtx.clip();
		pressedCtx.lineWidth = 2;
		pressedCtx.shadowBlur = 10;
		pressedCtx.shadowOffsetX = 5;
		pressedCtx.shadowOffsetY = 5;
		pressedCtx.shadowColor = "black";
		pressedCtx.stroke();
		pressedCtx.shadowOffsetX = -5;
		pressedCtx.shadowOffsetY = -5;
		pressedCtx.shadowColor = "white";
		pressedCtx.stroke();
	};
	
	/* not pressed */
	function preRenderMouseUp() {
		notPressedC = document.createElement("canvas");
		notPressedC.setAttribute("width", WIDTH);
		notPressedC.setAttribute("height", HEIGHT);
		notPressedCtx = notPressedC.getContext("2d");
		
		notPressedCtx.translate(startX, startY);
		notPressedCtx.beginPath();
		notPressedCtx.arc(arcR, arcR, arcR, Math.PI, Math.PI*3/2);
		notPressedCtx.arc(d - arcR, arcR, arcR, Math.PI*3/2, Math.PI*2);
		notPressedCtx.arc(d - arcR, d - arcR, arcR, 0, Math.PI/2);
		notPressedCtx.arc(arcR, d - arcR, arcR, Math.PI/2, Math.PI);
		notPressedCtx.closePath();
		notPressedCtx.clip();
		notPressedCtx.lineWidth = 2;
		notPressedCtx.shadowBlur = 10;
		notPressedCtx.shadowOffsetX = -5;
		notPressedCtx.shadowOffsetY = -5;
		notPressedCtx.shadowColor = "black";
		notPressedCtx.stroke();
		notPressedCtx.shadowOffsetX = 5;
		notPressedCtx.shadowOffsetY = 5;
		notPressedCtx.shadowColor = "white";
		notPressedCtx.stroke();
	};

	/* mouse over */
	var mouseOverC = null, mouseOverCtx = null;
	function preRenderMouseOver() {
		mouseOverC = document.createElement("canvas");
		mouseOverC.setAttribute("width", WIDTH);
		mouseOverC.setAttribute("height", HEIGHT);
		mouseOverCtx = mouseOverC.getContext("2d");

		mouseOverCtx.translate(startX, startY);
		mouseOverCtx.beginPath();
		mouseOverCtx.arc(arcR, arcR, arcR, Math.PI, Math.PI*3/2);
		mouseOverCtx.arc(d - arcR, arcR, arcR, Math.PI*3/2, Math.PI*2);
		mouseOverCtx.arc(d - arcR, d - arcR, arcR, 0, Math.PI/2);
		mouseOverCtx.arc(arcR, d - arcR, arcR, Math.PI/2, Math.PI);
		mouseOverCtx.closePath();
		mouseOverCtx.lineWidth = 2;
		mouseOverCtx.shadowBlur = 10;
		mouseOverCtx.shadowOffsetX = 0;
		mouseOverCtx.shadowOffsetY = 0;
		mouseOverCtx.shadowColor = "white";
		mouseOverCtx.stroke();
	};
	
	/* icon */
	var iconC = null, iconCtx = null;
	function preRenderIcon() {
		iconC = document.createElement("canvas");
		iconC.setAttribute("width", WIDTH);
		iconC.setAttribute("height", HEIGHT);
		iconCtx = iconC.getContext("2d");
		iconCtx.translate(startX, startY);
		paintIcon(iconCtx, d, m, iconColor, buttonColor);
	};
	
	this.render = function() {
		preRenderBackground();
		preRenderIcon();
		preRenderMouseDown();
		preRenderMouseUp();
		preRenderMouseOver();
	};
	
	this.paint = function() {
		CTX_BUF.drawImage(backgroundC, 0, 0);
		CTX_BUF.drawImage(iconC, 0, 0);
		if (mouseOver)
			CTX_BUF.drawImage(mouseOverC, 0, 0);
		if (mouseDown)
			CTX_BUF.drawImage(pressedC, 0, 0);
		else
			CTX_BUF.drawImage(notPressedC, 0, 0);
	};	


	function inside(mouse) {
		if (mouse.x >= cx - d/2 && mouse.x <= cx + d/2 &&
			mouse.y >= cy - d/2 && mouse.y <= cy + d/2)
			return true;
		else
			return false;
	};
	
	this.isInside = function(mouse) {
		return inside(mouse);
	};

	function hover(e) {
		var mouse = getMousePos(e);

		if (inside(mouse)) {
			mouseOver = true;
		} else {
			mouseOver = false;
			if (mouseDown)
				mouseDown = false;
		}
	};


	function press(e) {
		var mouse = getMousePos(e);

		if (inside(mouse))
			mouseDown = true;
	};

	function release(e) {
		var mouse = getMousePos(e);
		if (mouseDown && inside(mouse)) {
			unHandle();
			callback();
		}
	};

	this.handle = function(c) {
		callback = c;
		CANVAS.addEventListener("mousemove", hover, false);
		CANVAS.addEventListener("mousedown", press, false);
		CANVAS.addEventListener("mouseup", release, false);
	};

	function unHandle() {
		CANVAS.removeEventListener("mousemove", hover, false);
		CANVAS.removeEventListener("mousedown", press, false);
		CANVAS.removeEventListener("mouseup", release, false);
	};
};