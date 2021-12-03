function Logo() {
	var canvas = null, ctx = null;
	
	
	function renderBall(ctx, posX, posY, d) {
		var centerR = d/3.5;
		var stripeOff = d/3;
		var fontSize = centerR*1.5;
		var fontOffset = fontSize/3;
		var dotD = d/10;
		

		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.arc(posX,posY,d/2,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		
		ctx.save();
		
		// riga delle rigate
		ctx.beginPath();	
		ctx.arc(posX,posY,d/2,0,2*Math.PI);
		ctx.closePath();
		ctx.clip();
		ctx.fillStyle = "black";
		ctx.beginPath();
		ctx.moveTo(posX-d/2,posY-stripeOff);
		ctx.lineTo(posX+d/2,posY-stripeOff);
		ctx.lineTo(posX+d/2,posY+stripeOff);
		ctx.lineTo(posX+d/2,posY+stripeOff);
		ctx.lineTo(posX-d/2,posY+stripeOff);
		ctx.lineTo(posX-d/2,posY-stripeOff);
		ctx.closePath();
		ctx.fill();

		ctx.restore();
		
		// centro 
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(posX,posY,centerR,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		
		// riflesso 
		var rX = posX - d/4;
		var rY = posY - d/4;
		grd = ctx.createRadialGradient(posX, posY, d/2, rX, rY, 0);
		
		grd.addColorStop(1, 'rgba(255, 255,255, 0.6)');
		grd.addColorStop(0, 'rgba(255, 255,255, 0)');
		ctx.fillStyle = grd;
		ctx.beginPath();
		ctx.arc(posX,posY,d/2,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		
		ctx.save();
		
		// numero
		ctx.textAlign="center"; 
		ctx.font="bold "+String(fontSize)+"px sans-serif";
		ctx.fillStyle = "black";
		ctx.fillText(String(8),posX,posY+fontOffset);

		ctx.restore();
		ctx.strokeStyle = "black";
		ctx.lineWidth = 0.5;
		ctx.beginPath();
		ctx.arc(posX,posY,d/2,0,2*Math.PI);
		ctx.closePath();
		ctx.stroke();
	};
	
	this.render = function() {
		canvas = document.createElement("canvas");
		canvas.setAttribute("width", WIDTH);
		canvas.setAttribute("height", HEIGHT);
		ctx = canvas.getContext("2d");
		
	
		var fontSize = calculateFontSize(ctx, "italic bold sans-serif", TABLE_W, TABLE_H/7, "BALL");
		ctx.font = "italic bold " + fontSize+ "px sans-serif";
		var fontH = fontSize2Height(fontSize);
		var fontW = ctx.measureText("BALL").width;
		var ballD = fontH;
		var l = fontW + CTRL_MARGIN/2 + ballD;
		
		
		renderBall(ctx, TABLE_CX - l/2 + ballD/2, TABLE_CY - fontH/2, ballD);
		
		ctx.fillStyle ="black";
		ctx.save();
		ctx.shadowBlur = 0;
		ctx.shadowColor = "gray";
		ctx.shadowOffsetX = 3;
		ctx.shadowOffsetY = 3;
		
		ctx.fillText("BALL", TABLE_CX - l/2 + ballD + CTRL_MARGIN/2, TABLE_CY);
		ctx.restore();
		
		var t = "a pool-billiard game made in JS";
		fontSize = calculateFontSize(ctx, "arial", l, TABLE_H, t);
		var tH = fontSize2Height(fontSize);
		var tW = ctx.measureText(t).width;
		ctx.fillText(t, TABLE_CX - tW/2, TABLE_CY + CTRL_MARGIN + tH);
		var t2 = "with HTML5 Canvas and Box2D engine";
		fontSize = calculateFontSize(ctx, "arial", l, TABLE_H, t2);
		var tH2 = fontSize2Height(fontSize);
		var tW2 = ctx.measureText(t2).width;
		ctx.fillText(t2, TABLE_CX - tW2/2, TABLE_CY + CTRL_MARGIN + tH + CTRL_MARGIN/2 + tH2);

	};
	
	this.paint = function() {
		CTX_BUF.drawImage(canvas, 0, 0);
	};
	
};