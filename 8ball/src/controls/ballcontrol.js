function BallControl(type) {
	var ballControlC = null;
	var ballControlCtx = null;

	var bgcolor = "rgba(0,0,0,0.4)";
	var balls = null;
	
	var l = BALL_D*15 + 14*CTRL_PADDING;
	var start = TABLE_CX - l/2;
	
	this.render = function() {
		ballControlC = document.createElement("canvas");
		ballControlC.width = WIDTH;
		ballControlC.height = HEIGHT;
		ballControlCtx = ballControlC.getContext("2d");

		ballControlCtx.beginPath();
		ballControlCtx.arc(	TABLE_CX - TABLE_W/3 + CTRL_D/2,
						TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2,
						CTRL_D/2,
						Math.PI/2, Math.PI*3/2);
		ballControlCtx.arc(	TABLE_CX + TABLE_W/3 - CTRL_D/2,
						TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2,
						CTRL_D/2,
						Math.PI*3/2, Math.PI/2);
		ballControlCtx.closePath();
		
		ballControlCtx.strokeStyle = "black";
		ballControlCtx.fillStyle = bgcolor;
		ballControlCtx.fill();
		ballControlCtx.lineWidth = 1;
		ballControlCtx.stroke();
		
		/* ball circles */
		
		for (var i = 0; i < 15; i++ ) {
			ballControlCtx.beginPath();
			ballControlCtx.arc(start + i*(BALL_D+CTRL_PADDING) + BALL_D/2, TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2, BALL_D/2, 0, Math.PI*2);
			ballControlCtx.closePath();
			ballControlCtx.fillStyle="rgba(0,0,0,0.4)";
			ballControlCtx.fill();
			
		}
	};
	this.allowedPos = function() {
		return true;
	};
	this.setBalls = function() {
		for (var i = 0; i < 15; i++)
			if (!balls.onTable(i+1))
				balls.setOnCtrl(i+1, start + i*(BALL_D+CTRL_PADDING) + BALL_D/2, TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2);
	};
	this.setBall = function(i) {
		balls.setOnCtrl(i, start + (i-1)*(BALL_D+CTRL_PADDING) + BALL_D/2, TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2);
	};
	this.paint = function() {
		CTX_BUF.drawImage(ballControlC, 0, 0);
		var l = BALL_D*15 + 14*CTRL_PADDING;
		var start = TABLE_CX - l/2;
		
		for (var i = 0; i < 15; i++)
			balls.paintBallAt(type, i+1, start + i*(BALL_D+CTRL_PADDING) + BALL_D/2, TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2);
	};
	this.create = function(b) {
		balls = b;
	};

};
