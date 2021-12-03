function Cue () {
	this.bodyColor = "brown";
	this.manicoColor = "black";
	this.puntaColor = "blue";
	
	var l = BALL_D*20;
	var minThk = BALL_D/3;
	var maxThk = BALL_D/2;
	var puntaL = l/25;
	var bodyL = l/25*18;
	var manicoL = l/25*6;

	var cueCanvas = null,
		cueCtx = null;
	
	var ballX = 0, 
		ballY = 0;
	this.angle = 0;
	this.distance = BALL_D*2;
	
	var animationCallback = null;
	var animating = false;
	
	//TODO: ombra??
	this.setPosition = function(p) {
		ballX = p.x;
		ballY = p.y;
	};
	
	this.render = function() {
		cueCanvas = document.createElement("canvas");
		cueCanvas.setAttribute("width", WIDTH);
		cueCanvas.setAttribute("height", HEIGHT);
		cueCtx = cueCanvas.getContext("2d");

		cueCtx.lineWidth = 1;
		cueCtx.strokeStyle= "black";
		
		cueCtx.save();
		cueCtx.translate(minThk,maxThk);
		
		// punta
		cueCtx.beginPath();
		cueCtx.arc(minThk/2,0,minThk/2,Math.PI/2,Math.PI*3/2); 
		cueCtx.closePath();
		cueCtx.fillStyle = this.puntaColor;
		cueCtx.fill();
		cueCtx.stroke();
		
		/* clipping */
		cueCtx.beginPath();
		cueCtx.moveTo(0,minThk/2);
		cueCtx.lineTo(l,maxThk/2);
		cueCtx.lineTo(l,-maxThk/2);
		cueCtx.lineTo(0,-minThk/2);
		cueCtx.lineTo(0,minThk/2);
		cueCtx.closePath();
		cueCtx.clip();
		
		// body
		cueCtx.fillStyle = "white";
		cueCtx.beginPath();
		cueCtx.rect(minThk/2,-maxThk/2,puntaL-minThk/2,maxThk);
		cueCtx.closePath();
		cueCtx.fill();
		cueCtx.stroke();
		
		cueCtx.fillStyle = this.bodyColor;
		cueCtx.beginPath();
		cueCtx.rect(puntaL,-maxThk/2,bodyL,maxThk);
		cueCtx.closePath();
		cueCtx.fill();
		cueCtx.stroke();
		
		// manico
		cueCtx.fillStyle = "gray";
		cueCtx.beginPath();
		cueCtx.rect(puntaL + bodyL,
					-maxThk/2,
					minThk,
					maxThk);
		cueCtx.closePath();
		cueCtx.fill();
		cueCtx.stroke();
		
		cueCtx.fillStyle = this.manicoColor;
		cueCtx.beginPath();
		cueCtx.rect(puntaL + bodyL + minThk,
					-maxThk/2,
					manicoL-minThk*2-minThk/2,
					maxThk);
		cueCtx.closePath();
		cueCtx.fill();
		cueCtx.stroke();
		
		cueCtx.fillStyle = "gray";
		cueCtx.beginPath();
		cueCtx.rect(puntaL + bodyL + manicoL - minThk - minThk/2,-maxThk/2,minThk,maxThk);
		cueCtx.closePath();
		cueCtx.fill();
		cueCtx.stroke();
		
		cueCtx.fillStyle = "black";
		cueCtx.beginPath();
		cueCtx.rect(puntaL + bodyL + manicoL - minThk/2,-maxThk/2,minThk/2,maxThk);
		cueCtx.closePath();
		cueCtx.fill();
		cueCtx.stroke();
		
		cueCtx.restore();
		
		// contorno
		cueCtx.save();
		cueCtx.translate(minThk,maxThk);
		cueCtx.beginPath();
		cueCtx.moveTo(minThk/2,minThk/2);
		cueCtx.lineTo(l,maxThk/2);
		cueCtx.lineTo(l,-maxThk/2);
		cueCtx.lineTo(minThk/2,-minThk/2);
		cueCtx.lineTo(minThk/2,minThk/2);
		cueCtx.closePath();
		cueCtx.stroke();
		
	};
	this.paint = function() {
		CTX_BUF.save();
		CTX_BUF.translate(ballX,ballY);
		CTX_BUF.rotate(this.angle+Math.PI);
		CTX_BUF.drawImage(cueCanvas, this.distance - minThk, -maxThk);
		CTX_BUF.restore();
		if (animating) {
			this.distance -= 25;
			if (this.distance <= BALL_D/2) {
				this.distance = BALL_D/2;
				animating = false;
				animationCallback();
			}
		}
	};
	this.getCanvas = function() {
		return cueCanvas;
	};
	this.animate = function(c) {
		animationCallback = c;
		animating = true;
		
	};

};