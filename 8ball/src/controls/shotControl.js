function ShotControl () {
	var shadowC = null,
		shadowCtx = null,
		backgroundC = null,
		backgroundCtx = null,
		cueCanvas = null;
	/* dimensions */
	var ballD = CTRL_D - 2*CTRL_PADDING;
	
	var startX = SHOTCTRL_CX - CTRL_D/2;
	var startY = SHOTCTRL_CY - TABLE_H/2;
	
	var cue = null;
	
	
	
	this.render = function() {
		shadowC = document.createElement("canvas");
		shadowC.width = WIDTH;
		shadowC.height = HEIGHT;
		shadowCtx = shadowC.getContext("2d");
		
		backgroundC = document.createElement("canvas");
		backgroundC.width = WIDTH;
		backgroundC.height = HEIGHT;
		backgroundCtx = backgroundC.getContext("2d");
		
		cueCanvas = cue.getCanvas();

		/* background */
		backgroundCtx.translate(startX, startY);
		backgroundCtx.fillStyle = "rgba(0,0,0,0.2)";
		backgroundCtx.beginPath();
		backgroundCtx.arc(CTRL_D/2, CTRL_D/2, CTRL_D/2, Math.PI, 2*Math.PI);
		backgroundCtx.arc(CTRL_D/2, TABLE_H - CTRL_D/2, CTRL_D/2, 0, Math.PI);
		backgroundCtx.closePath();
		backgroundCtx.fill();
		
		/* shadow (goes over the cue) */
		shadowCtx.translate(startX, startY);
		shadowCtx.beginPath();
		shadowCtx.arc(CTRL_D/2, CTRL_D/2, CTRL_D/2, Math.PI, 2*Math.PI);
		shadowCtx.arc(CTRL_D/2, TABLE_H - CTRL_D/2, CTRL_D/2, 0, Math.PI);
		shadowCtx.closePath();
		shadowCtx.clip();
		
		shadowCtx.shadowBlur = 10;
		shadowCtx.shadowOffsetX = 0;
		shadowCtx.shadowOffsetY = 0;
		shadowCtx.shadowColor = "black";
		shadowCtx.rect(0, 0, CTRL_D, TABLE_H);
		shadowCtx.lineWidth = 5;
		shadowCtx.stroke();		
		shadowCtx.shadowBlur = 0;

		/* cue ball */
		backgroundCtx.beginPath();
		backgroundCtx.arc(CTRL_D/2, CTRL_D/2, ballD/2, 0, 2*Math.PI);
		backgroundCtx.closePath();
		backgroundCtx.fillStyle = "white";
		backgroundCtx.strokeStyle = "black";
		backgroundCtx.lineWidth = 2;
		backgroundCtx.fill();
		backgroundCtx.stroke();
		
		// TODO: punto di spin
	};
	this.create = function(c) {
		cue = c;
	};
	this.paint = function() {
		CTX_BUF.drawImage(backgroundC, 0, 0);

		CTX_BUF.save();
		CTX_BUF.translate(startX, startY);
		/* power bar */

		/* cue */
		CTX_BUF.beginPath();
		CTX_BUF.arc(CTRL_D/2, CTRL_D/2, CTRL_D/2, Math.PI, 2*Math.PI);
		CTX_BUF.arc(CTRL_D/2, TABLE_H - CTRL_D/2, CTRL_D/2, 0, Math.PI);
		CTX_BUF.closePath();
		CTX_BUF.clip();
		CTX_BUF.translate(CTRL_D/2 + BALL_D/2, CTRL_PADDING + BALL_D/3);
		CTX_BUF.rotate(Math.PI/2);
		CTX_BUF.drawImage(cueCanvas, cue.distance,0);
		CTX_BUF.restore();
		
		CTX_BUF.drawImage(shadowC, 0, 0);
	};
}