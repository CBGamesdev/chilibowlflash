function Buttons() {
	/* icons drawers */
	this.settingsIcon = function(ctx, d, m, iconColor, buttonColor) {
		ctx.strokeStyle = "black";
		ctx.lineWidth = 1.5;
		
		ctx.beginPath();
		ctx.arc(d/2, d/2, d/2 - m, 0, Math.PI*2);
		ctx.closePath();
		ctx.fillStyle = iconColor;
		ctx.fill();
		ctx.stroke();
		
		ctx.globalCompositeOperation = "source-atop";
		ctx.fillStyle = buttonColor;	
		ctx.beginPath();
		ctx.arc(d/2, d/2, (d/2 - m)/3, 0, Math.PI*2);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		ctx.globalCompositeOperation = "source-atop";

		var tN = 7;
		var tR = 2*Math.PI*(d/2) / tN / 2 / 2;
		
		for(var i = 0; i < tN; i++) {
			ctx.save();
			ctx.translate(d/2, d/2);
			ctx.rotate(Math.PI);
			ctx.rotate(Math.PI*2 / tN * i);
			
			ctx.translate(0, -d/2 + d/10);
			ctx.beginPath();
			ctx.arc(0,0,tR,0,Math.PI*2);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
			
			ctx.restore();
		}
	};
	
	this.Button = function(d, cx, cy, iconDrawer) {
		var startX = cx - d/2,
		startY = cy - d/2;
		
		var arcR = d/5,
			m = d/10;
		
		/* properties */
		this.mouseOver = false;
		this.mouseDown = false;

		var iconColor = "white";
		var buttonColor = "gray";

		/* background */
		var backgroundC = document.createElement("canvas");
		backgroundC.setAttribute("width", 1024);
		backgroundC.setAttribute("height", 768);
		var backgroundCtx = backgroundC.getContext("2d");
		function preRenderBackground() {
			backgroundCtx.translate(startX, startY);
			backgroundCtx.beginPath();
			backgroundCtx.arc(arcR, arcR, arcR, Math.PI, Math.PI*3/2);
			backgroundCtx.arc(d - arcR, arcR, arcR, Math.PI*3/2, Math.PI*2);
			backgroundCtx.arc(d - arcR, d - arcR, arcR, 0, Math.PI/2);
			backgroundCtx.arc(arcR, d - arcR, arcR, Math.PI/2, Math.PI);
			backgroundCtx.closePath();
			backgroundCtx.fillStyle = buttonColor;
			backgroundCtx.strokeStyle = "black";
			backgroundCtx.lineWidth = 2;
			backgroundCtx.fill();
			backgroundCtx.stroke();
		};
		
		/* pressed */
		var pressedC = document.createElement("canvas");
		pressedC.setAttribute("width", 1024);
		pressedC.setAttribute("height", 768);
		var pressedCtx = pressedC.getContext("2d");
		function preRenderMouseDown() {
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
		var notPressedC = document.createElement("canvas");
		notPressedC.setAttribute("width", 1024);
		notPressedC.setAttribute("height", 768);
		var notPressedCtx = notPressedC.getContext("2d");
		function preRenderMouseUp() {
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
		var mouseOverC = document.createElement("canvas");
		mouseOverC.setAttribute("width", 1024);
		mouseOverC.setAttribute("height", 768);
		var mouseOverCtx = mouseOverC.getContext("2d");
		function preRenderMouseOver() {
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
		var iconC = document.createElement("canvas");
		iconC.setAttribute("width", 1024);
		iconC.setAttribute("height", 768);
		var iconCtx = iconC.getContext("2d");
		function preRenderIcon() {
			iconCtx.translate(startX, startY);
			iconDrawer(iconCtx, d, m, iconColor, buttonColor);
		};
		
		this.preRender = function() {
			preRenderBackground();
			preRenderIcon();
			preRenderMouseDown();
			preRenderMouseUp();
			preRenderMouseOver();
		};
		
		this.paint = function(ctx) {
			ctx.drawImage(backgroundC, 0, 0);
			ctx.drawImage(iconC, 0, 0);
			if (this.mouseOver)
				ctx.drawImage(mouseOverC, 0, 0);
			if (this.mouseDown)
				ctx.drawImage(pressedC, 0, 0);
			else
				ctx.drawImage(notPressedC, 0, 0);
		};
	};
	
	this.buttonsArr = new Array();
	
	this.preRender = function() {
		for(var i = 0; i < this.buttonsArr.length; i++) {
			this.buttonsArr[i].preRender();
		};
	};
	
	this.paint = function(ctx) {
		for(var i = 0; i < this.buttonsArr.length; i++) {
			this.buttonsArr[i].paint(ctx);
		};
	};
};