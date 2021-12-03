function MessageControl(type) {
	var messageC = null;
	var messageCtx = null;
	this.type = type;
	var text = "";
	var cy = null;
	if(this.type == "top") {
		cy = TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2;
	} else if (this.type == "bottom") {
		cy = TABLE_CY + TABLE_H/2 + TABLE_BORDER + CTRL_MARGIN + CTRL_D/2;
	}
	
	var bgcolor = "rgba(0,0,0,0.4)";
	var font = "Verdana";
	var fontH = (CTRL_D - CTRL_PADDING*2)/2;
	
	this.render = function() {
		messageC = document.createElement("canvas");
		messageC.width = WIDTH;
		messageC.height = HEIGHT;
		messageCtx = messageC.getContext("2d");
		messageCtx.beginPath();
		messageCtx.arc(	TABLE_CX - TABLE_W/3 + CTRL_D/2,
						cy,
						CTRL_D/2,
						Math.PI/2, Math.PI*3/2);
		messageCtx.arc(	TABLE_CX + TABLE_W/3 - CTRL_D/2,
						cy,
						CTRL_D/2,
						Math.PI*3/2, Math.PI/2);
		messageCtx.closePath();
		
		messageCtx.strokeStyle = "black";
		messageCtx.fillStyle = bgcolor;
		messageCtx.fill();
		messageCtx.lineWidth = 1;
		messageCtx.stroke();
	};
	this.paint = function() {
		CTX_BUF.drawImage(messageC, 0, 0);
		drawText(CTX_BUF);
	};
	this.setText = function(t) {
		text = t;
	};
	function drawText(ctx) {
		var size = calculateFontSize(ctx, font, TABLE_W*2/3 - CTRL_PADDING*3, fontH, text);
		ctx.font = String(size) + "px " + font;
		ctx.textAlign = "center";
		ctx.fillStyle = "white";
		ctx.fillText(text, TABLE_CX, cy + fontH/2);
	};
};