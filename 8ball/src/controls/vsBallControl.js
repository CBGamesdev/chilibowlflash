function Timer(startX, startY, d) {
	var total = 0;
	var remaining = 0;
	var animating = false;
	this.visible = false;
	var timerPadding = 5;
	var callback = null;
	var timerC = document.createElement("canvas");
	timerC.setAttribute("width", 1024);
	timerC.setAttribute("height", 768);
	var timerCtx = timerC.getContext("2d");
	
	this.start = function(limit, c) {
		this.visible = true;
		callback = c;
		total = limit*60;
		remaining = limit*60;
		animating = true;
	};
	this.stop = function() {
		c = null;
		animating = false;
	};
	
	/* calculate rgba timer color based on remaining/total */
	function timerColor() {
		var f = {r: 0, g: 255, b: 0, a: 0};
		var m = {r: 255, g: 255, b: 0, a: 0};
		var e = {r: 255, g: 0, b: 0, a: 0};
		
		var fraction = remaining/total;

		if (fraction == 1) {
			f.a = 1;
		} else if (fraction == 0.5) {
			m.a = 1;
		} else if (fraction == 0) {
			e.a = 1;
		} else if (fraction > 0 && fraction < 0.5) {
			e.a = 1 - fraction*2;
			m.a = fraction*2;
		} else if (fraction > 0.5 && fraction < 1) {
			m.a = 1 - (fraction-0.5)*2;
			f.a = (fraction-0.5)*2;
		}
		
		var r = f.r*f.a + m.r*m.a + e.r*e.a,
			g = f.g*f.a + m.g*m.a + e.g*e.a,
			b = f.b*f.a + m.b*m.a + e.b*e.a;
		
		return "rgba("+Math.round(r)+","+Math.round(g)+","+Math.round(b)+",1)";
	};
	
	this.render = function() {
		timerCtx.translate(startX, startY);
		
		timerCtx.beginPath();
		timerCtx.arc(d/2, d/2, d/2, 0, Math.PI*2);
		timerCtx.closePath();
		timerCtx.fillStyle="rgba(0,0,0,0.2)";
		timerCtx.strokeStyle = "black";
		timerCtx.lineWidth = 2;
		timerCtx.fill();
		timerCtx.stroke();
		
		timerCtx.beginPath();
		timerCtx.arc(d/2, d/2, d/2 - timerPadding, 0, Math.PI*2);
		timerCtx.closePath();
		timerCtx.fillStyle="rgba(0,0,0,0.4)";
		timerCtx.strokeStyle = "black";
		timerCtx.lineWidth = 2;
		timerCtx.fill();
	};
	
	this.paint = function() {
		CTX_BUF.drawImage(timerC,0,0);
		if (this.visible == true) {
			
			CTX_BUF.beginPath();
			var circle = Math.PI*2 / total * (total - remaining);
			CTX_BUF.arc(startX + d/2, startY + d/2, d/2 - timerPadding, Math.PI*3/2, Math.PI*3/2 + circle);
			CTX_BUF.lineTo(startX + d/2, startY + d/2);
			CTX_BUF.closePath();
			CTX_BUF.fillStyle = timerColor();
			CTX_BUF.lineWidth = 1;
			CTX_BUF.fill();
			CTX_BUF.stroke();
			
			if(animating) {	
				remaining--;
				if(remaining == 0)
					callback();
			}
		}
	
	};
};

function VsBallControl(name1, name2) {
	var ballControlC = null;
	var ballControlCtx = null;

	var bgcolor = "rgba(0,0,0,0.4)";
	var balls = null;
	
	var lBalls = BALL_D*7 + 6*CTRL_PADDING;

	this.create = function(b) {
		balls = b;
	};
	var startX = TABLE_CX - TABLE_W/2,
	startY = TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D;

	this.paintBalls = function() {
		var start;

		/* left */
		start = TABLE_CX - lBalls - timerD/2 - CTRL_PADDING;
		for (var i = 0; i < 7; i++ ) {
			CTX_BUF.beginPath();
			CTX_BUF.arc(start + i*(BALL_D+CTRL_PADDING) + BALL_D/2, TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2, BALL_D/2, 0, Math.PI*2);
			CTX_BUF.closePath();
			CTX_BUF.fillStyle="rgba(0,0,0,0.4)";
			CTX_BUF.fill();	
		}
		if (this.leftStart != 0 && this.leftStart != 8)
			for (var i = 0; i < 7; i++)
				balls.paintBallAt("table", i+this.leftStart, start + i*(BALL_D+CTRL_PADDING) + BALL_D/2, TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2);
		if (this.leftStart == 8)
			balls.paintBallAt("table", 8, start + 6*(BALL_D+CTRL_PADDING) + BALL_D/2, TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2);

		/* right */
		start = TABLE_CX + timerD/2 + CTRL_PADDING;		
		for (var i = 0; i < 7; i++ ) {
			CTX_BUF.beginPath();
			CTX_BUF.arc(start + i*(BALL_D+CTRL_PADDING) + BALL_D/2, TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2, BALL_D/2, 0, Math.PI*2);
			CTX_BUF.closePath();
			CTX_BUF.fillStyle="rgba(0,0,0,0.4)";
			CTX_BUF.fill();	
		}
		if (this.rightStart != 0 && this.rightStart != 8)
			for (var i = 0; i < 7; i++)
				balls.paintBallAt("table", i+this.rightStart, start + i*(BALL_D+CTRL_PADDING) + BALL_D/2, TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2);
		if (this.rightStart == 8)
			balls.paintBallAt("table", 8, start + 0 + BALL_D/2, TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2);
	};
	/* dimensions */
	var timerD = CTRL_D;
	var colorBoxW = CTRL_D/4;
	var ballBoxW = (BALL_D + CTRL_PADDING)*7 + CTRL_PADDING;
	var playerBoxW = TABLE_W/2 - ballBoxW - CTRL_PADDING*4 - colorBoxW;
	this.timer = new Timer(TABLE_CX - timerD/2,TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D, timerD);
	var maxNameSize = CTRL_D/2;

	this.paintTurn = function() {
		CTX_BUF.fillStyle = "green";
		if (this.turn == 1) {
			CTX_BUF.beginPath();
			CTX_BUF.arc(TABLE_CX - CTRL_D/2 - ballBoxW + BALL_D/2 - CTRL_PADDING, startY + CTRL_D/2, CTRL_D/2, Math.PI/2, Math.PI*3/2);
			CTX_BUF.arc(TABLE_CX - CTRL_D/2 - ballBoxW + BALL_D/2, startY + CTRL_D/2, CTRL_D/2, Math.PI*3/2, Math.PI/2, true);
			CTX_BUF.closePath();
			CTX_BUF.fill();
		} else if (this.turn == 2) {
			CTX_BUF.beginPath();
			CTX_BUF.arc(TABLE_CX + CTRL_D/2 + ballBoxW - BALL_D/2 , startY + CTRL_D/2, CTRL_D/2, Math.PI*3/2, Math.PI/2);
			CTX_BUF.arc(TABLE_CX + CTRL_D/2 + ballBoxW - BALL_D/2 + CTRL_PADDING, startY + CTRL_D/2, CTRL_D/2, Math.PI/2, Math.PI*3/2, true);
			CTX_BUF.closePath();
			CTX_BUF.fill();
		}
	};
	
	/* draw background */
	function drawBackground(ctx, ballN) {
		ctx.beginPath();
		ctx.arc(TABLE_W/2 - CTRL_D/2 - ballBoxW + BALL_D/2, CTRL_D/2, CTRL_D/2, Math.PI/2, Math.PI*3/2);
		ctx.arc(TABLE_W/2, CTRL_D/2, CTRL_D/2, Math.PI*3/2, Math.PI/2, true);
		ctx.closePath();
		ctx.save();
		ctx.clip();
		/* background */
		ctx.fillStyle = "rgba(0,0,0,0.2)";
		ctx.beginPath();
		ctx.arc(TABLE_W/2 - CTRL_D/2 - ballBoxW + BALL_D/2, CTRL_D/2, CTRL_D/2, Math.PI/2, Math.PI*3/2);
		ctx.arc(TABLE_W/2, CTRL_D/2, CTRL_D/2, Math.PI*3/2, Math.PI/2, true);
		ctx.closePath();
		ctx.fill();
		/* shadow */
		ctx.shadowBlur = 10;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowColor = "black";
		ctx.lineWidth = 5;
		ctx.stroke();		
		ctx.shadowBlur = 0;
		ctx.restore();
	};
	this.render = function() {
		ballControlC = document.createElement("canvas");
		ballControlC.width = WIDTH;
		ballControlC.height = HEIGHT;
		ballControlCtx = ballControlC.getContext("2d");
		
		/* left */
		ballControlCtx.translate(startX,startY);
		drawBackground(ballControlCtx);
		
		/* right */
		ballControlCtx.save();
		ballControlCtx.translate(TABLE_W, CTRL_D);
		ballControlCtx.rotate(Math.PI);
		drawBackground(ballControlCtx);
		ballControlCtx.restore();
		
		this.timer.render();
	};
	this.paint = function() {
		CTX_BUF.drawImage(ballControlC, 0, 0);
		this.paintBalls();
		this.timer.paint();
		this.paintTurn();
	};
};