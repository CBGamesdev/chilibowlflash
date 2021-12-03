function Balls () {	
	var world = null;
	var table = null;
	var exitCallback = null;

	var shadowC = document.createElement("canvas");
		shadowC.setAttribute("width", BALL_D*2);
		shadowC.setAttribute("height", BALL_D*2);
	var shadowCtx = shadowC.getContext("2d");
	var reflexC = document.createElement("canvas");
		reflexC.setAttribute("width", BALL_D*2);
		reflexC.setAttribute("height", BALL_D*2);
	var reflexCtx = reflexC.getContext("2d");



	function renderShadow() {
		shadowCtx.shadowColor = "black";
		shadowCtx.shadowBlur = 7;
		shadowCtx.fillStyle = "black";
		
		shadowCtx.beginPath();
		shadowCtx.arc(BALL_D,BALL_D,BALL_D/2,0,2*Math.PI);
		shadowCtx.closePath();
		
		shadowCtx.fill();
	};

	function renderReflex() {
		var rX = BALL_D - BALL_D/4;
		var rY = BALL_D - BALL_D/4;
		grd = reflexCtx.createRadialGradient(BALL_D, BALL_D, BALL_D/2, rX, rY, 0);
		
		grd.addColorStop(1, 'rgba(255, 255,255, 1)');
		grd.addColorStop(0.5, 'rgba(255, 255,255, 0)');
		grd.addColorStop(0, 'rgba(255, 255,255, 0)');
		reflexCtx.fillStyle = grd;
		reflexCtx.beginPath();
		reflexCtx.arc(BALL_D,BALL_D,BALL_D/2,0,2*Math.PI);
		reflexCtx.closePath();
		reflexCtx.fill();
	};

	renderShadow();
	renderReflex();

	function renderBall(ctx, type, number, color) {
		var centerR = BALL_D/3.5;
		var stripeOff = BALL_D/3;
		
	
		// contorno
		if (type == 0) { // piene
			ctx.fillStyle = color;
		} else { // rigate
			ctx.fillStyle = "white";
		}
		ctx.beginPath();
		ctx.arc(BALL_D,BALL_D,BALL_D/2,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		// riga delle rigate
		if (type == 1) {
			ctx.beginPath();	
			ctx.arc(BALL_D,BALL_D,BALL_D/2,0,2*Math.PI);
			ctx.closePath();
			ctx.save();
			ctx.clip();
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.moveTo(BALL_D-BALL_D/2,BALL_D-stripeOff);
			ctx.lineTo(BALL_D+BALL_D/2,BALL_D-stripeOff);
			ctx.lineTo(BALL_D+BALL_D/2,BALL_D+stripeOff);
			ctx.lineTo(BALL_D+BALL_D/2,BALL_D+stripeOff);
			ctx.lineTo(BALL_D-BALL_D/2,BALL_D+stripeOff);
			ctx.lineTo(BALL_D-BALL_D/2,BALL_D-stripeOff);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		}

		// centro 
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.arc(BALL_D,BALL_D,centerR,0,2*Math.PI);
		ctx.closePath();
		ctx.fill();
	};

	function paintBall(ball, x, y, angle) {
		CTX_BUF.save();
		CTX_BUF.translate(x, y);
		CTX_BUF.rotate(angle);
		CTX_BUF.translate(-BALL_D,-BALL_D);
		CTX_BUF.drawImage(ball.ballC, 0, 0);
		CTX_BUF.translate(BALL_D,BALL_D);
		CTX_BUF.rotate(-angle);
		CTX_BUF.translate(-BALL_D,-BALL_D);
		CTX_BUF.drawImage(reflexC, 0, 0);
		CTX_BUF.translate(BALL_D,BALL_D);
		CTX_BUF.rotate(angle);
		CTX_BUF.translate(-BALL_D,-BALL_D);

		var dotD = BALL_D/10;
		var centerR = BALL_D/3.5;
		var fontSize = centerR*1.5;
		var fontOffset = fontSize/3;
		
		var stripeOff = BALL_D/3;
		// numero
		if (ball.number == 0) {// bianca
			CTX_BUF.fillStyle = "red";
			CTX_BUF.beginPath();
			CTX_BUF.arc(BALL_D-BALL_D/4,BALL_D,dotD/2,0,2*Math.PI);
			CTX_BUF.closePath();
			CTX_BUF.fill();
		} else {// altre
			CTX_BUF.textAlign="center"; 
			CTX_BUF.font="bold "+String(fontSize)+"px sans-serif";
			CTX_BUF.fillStyle = "black";
			CTX_BUF.fillText(String(ball.number),BALL_D,BALL_D+fontOffset);
		}
		CTX_BUF.strokeStyle = "black";
		CTX_BUF.lineWidth = 0.5;
		CTX_BUF.beginPath();
		CTX_BUF.arc(BALL_D,BALL_D,BALL_D/2,0,2*Math.PI);
		CTX_BUF.closePath();
		CTX_BUF.stroke();
		CTX_BUF.restore();
	};
	
	function Ball (number, type, color) {
		
		this.ballC = document.createElement("canvas");
		this.ballC.setAttribute("width", BALL_D*2);
		this.ballC.setAttribute("height", BALL_D*2);
		var ballCtx = this.ballC.getContext("2d");

		this.number = number;
		this.color = color;
		this.type = type;
		
		this.body = null;
		this.fixture = null;
		this.onTable = false;
		this.onHole = false;
		this.onTunnel = false;
		this.onCtrl = false;
		this.onEditing = false;
		
		/* physical definition */
		var ballB = new b2BodyDef;
		this.ballF = new b2FixtureDef; 
		ballB.type = b2Body.b2_dynamicBody;
		ballB.bullet = true; 
		this.ballF.shape = new b2CircleShape(BALL_D / 2 / SCALE);
		this.ballF.density = 1.0;
		this.ballF.friction = 0.1;
		this.ballF.restitution = 0.75;
		
		
		this.ballF2 = new b2FixtureDef; 
		ballB.type = b2Body.b2_dynamicBody;
		ballB.bullet = true; 
		this.ballF2.shape = new b2CircleShape(BALL_D / 2 / SCALE);
		this.ballF2.density = 1.0;
		this.ballF2.friction = 0.1;
		this.ballF2.restitution = 0;
		
		
		/* create ball in b2dworld */
		this.create = function (x, y) {
			ballB.position.x = x/SCALE;
			ballB.position.y = y/SCALE;
			this.body = world.CreateBody(ballB);	
			this.fixture = this.body.CreateFixture(this.ballF);
			this.onTable = false;
			this.onHole = false;
			this.onTunnel = false;
			this.onCtrl = false;
			this.onEditing = false;
			renderBall(ballCtx, this.type, this.number, this.color);
		};

		/* create ball in b2dworld */
		this.unable = function () {
			this.fixture = this.body.CreateFixture(this.ballF2);
		};
		
		/* paint the ball shadow */
		this.paintShadow = function () {
			if(this.body != null) {
				var x = this.body.GetPosition().x * SCALE;
				var y = this.body.GetPosition().y * SCALE;
				
				CTX_BUF.save();
				CTX_BUF.translate(x - BALL_D, y-BALL_D);
				CTX_BUF.drawImage(shadowC, 0, 0);
				
				CTX_BUF.restore();
			}
		};
		/* paints the ball body */
		this.paint = function () {
			var x = this.body.GetPosition().x * SCALE;
				var y = this.body.GetPosition().y * SCALE;
				var angle = this.body.GetAngle();
			if(this.body != null) {
				paintBall(this, x, y, angle)
			}
		};
	};
	
	var colors = [
	    "white",
		"gold",
		"blue",
		"red",
		"purple",
		"darkorange",
		"darkgreen",
		"brown",
		"black"
	];
	
	var balls = null;
	
	this.create = function(w,t,c) {
		world = w;
		table = t;
		exitCallback = c;
		
		if (balls != null) delete balls;
		balls = new Array();
		
		// bianca
		balls[0] = new Ball(0,0,colors[0]);
		// piene
		balls[1] = new Ball(1,0,colors[1]);
		balls[2] = new Ball(2,0,colors[2]);
		balls[3] = new Ball(3,0,colors[3]);
		balls[4] = new Ball(4,0,colors[4]);
		balls[5] = new Ball(5,0,colors[5]);
		balls[6] = new Ball(6,0,colors[6]);
		balls[7] = new Ball(7,0,colors[7]);
		// nera
		balls[8] = new Ball(8,0,colors[8]);
		// rigate
		balls[9] = new Ball(9,1,colors[1]);
		balls[10] = new Ball(10,1,colors[2]);
		balls[11] = new Ball(11,1,colors[3]);
		balls[12] = new Ball(12,1,colors[4]);
		balls[13] = new Ball(13,1,colors[5]);
		balls[14] = new Ball(14,1,colors[6]);
		balls[15] = new Ball(15,1,colors[7]);


	};

	this.paintBallAt = function(type, idx, cx, cy) {
		if(type == "inactive" && balls[idx].onInactive) {
			paintBall(balls[idx], cx, cy, 0);
		}
		
		if(type == "table" && balls[idx].onTable) {
			paintBall(balls[idx], cx, cy, 0);
		}
		
		if(type == "editing" && balls[idx].onEditing) {
			paintBall(balls[idx], cx, cy, 0);
		}
		
		if(type == "ctrl" && balls[idx].onCtrl) {
			paintBall(balls[idx], cx, cy, 0);
		}
		
		if(type == "tunnel" && balls[idx].onTunnel) {
			paintBall(balls[idx], cx, cy, 0);
		}
	};
	
	this.setOnCtrl = function(idx, x, y) {
		if (balls[idx].body != null) 
			world.DestroyBody(balls[idx].body);
		
		balls[idx].create(x, y);
		balls[idx].onCtrl = true;
	};
	this.setOnEditing = function(idx, x, y) {
		if (balls[idx].body != null) 
			world.DestroyBody(balls[idx].body);
		
		balls[idx].create(x, y);
		balls[idx].onEditing = true;
	};
	/* creates a ball on a table position */
	this.setOnTable = function(idx, x, y) {
		if (balls[idx].body != null) 
			world.DestroyBody(balls[idx].body);
		
		balls[idx].create(x, y);
		balls[idx].onTable = true;
	};
	this.insideAny = function(pos) {
		for (var i=0; i <=15; i++) {
			if (balls[i].body != null) {
				var ball = b2p(balls[i].body.GetPosition());
				if (distanceBetween(pos, ball) < BALL_D/2)
					return i;
			}
		}
		return -1;
	};
	/* creates a ball on the tunnel start position */
	this.setOnTunnel = function(idx) {
		if (balls[idx].body == null) {
			
			balls[idx].ballF.restitution = 0;
			balls[idx].create(TUNNEL_STARTX, TUNNEL_STARTY);
			balls[idx].onTunnel = true;
			balls[idx].body.SetUserData("tunnel ball");
		}
	};
	/* creates balls from 1 to 15 on standard position */
	this.setTriangle = function() {
		var ballOrder = [1,3,10,14,8,5,2,11,7,15,13,6,12,9,4]; //TODO: random

		var current = 0;
		var startTriangleX = (TABLE_CX) + (TABLE_W/4);
		var startTriangleY = TABLE_CY;
		for ( var nX = 1; nX <= 5; nX++ ) {
			var offset = (nX*BALL_D)/2 - BALL_D/2;
			for ( var nY = 1; nY <= nX; nY++ ) {
				var posX = (startTriangleX + (nX-1)*BALL_D);
				var posY = ((startTriangleY - offset) + (nY-1)*BALL_D);
				this.setOnTable(ballOrder[current++],posX,posY);
			}
		}
	};
	this.getPosition = function(idx) {
		if (balls[idx].body != null)
			return b2p(balls[idx].body.GetPosition());
		else
			return null;
	};
	/* set a ball speed */
	this.setBallSpeed = function(idx, x, y) {
		balls[idx].body.SetLinearVelocity(new b2Vec2(x,y));
		balls[idx].body.SetAwake(true);
	};	
	/* returns the cue ball position */
	this.getCuePos = function() {
		if (balls[0].body != null) {
			return new Point(	balls[0].body.GetPosition().x*SCALE,
								balls[0].body.GetPosition().y*SCALE);
		} else {
			return new Point(0,0);
		}
	};

	/* adjust tunnel balls velocity simulating gravity */
	this.ApplyTunnelFlow = function () {
		for(var i = 0; i < 16; i++) {
			if(balls[i].body!= null && !balls[i].onTable && balls[i].body.GetUserData() == "tunnel ball") {
				balls[i].body.SetLinearVelocity(new b2Vec2(4,4));
			}
		}
	};
	/* adjust table balls velocity simulating friction */
	this.ApplyTableFriction = function() {
		var limit = 0.25;
		for(var i = 0; i < 16; i++) {
			if(balls[i].body!= null && balls[i].onTable) {
				var currentVelocity = balls[i].body.GetLinearVelocity();
				var vDecrX = currentVelocity.x/100;
				var vDecrY = currentVelocity.y/100;
	
				var currentAngularVelocity = balls[i].body.GetAngularVelocity();
				var aDecr = currentAngularVelocity/100;
	
				if(		Math.abs(currentVelocity.x)>limit || 
						Math.abs(currentVelocity.y)>limit || 
						Math.abs(currentAngularVelocity)>limit
				) {
					balls[i].body.SetLinearVelocity(new b2Vec2(currentVelocity.x - vDecrX, currentVelocity.y - vDecrY));
					balls[i].body.SetAngularVelocity(currentAngularVelocity - aDecr);
				} else {
					balls[i].body.SetLinearVelocity(new b2Vec2(0,0));
					balls[i].body.SetAngularVelocity(0);
				}
			}
		}
	};
	
	function allOutsideGreen(pos) {
		if (pos.x > TABLE_CX - TABLE_W/4 && pos.x < TABLE_CX + TABLE_W/4)
			return(pos.x < TABLE_CX - TABLE_W/2|| 
				pos.y < TABLE_CY - TABLE_H/2 - BALL_D/2||
				pos.x > TABLE_CX + TABLE_W/2  || 
				pos.y > TABLE_CY + TABLE_H/2+ BALL_D/2);

		else
			return (pos.x < TABLE_CX - TABLE_W/2|| 
				pos.y < TABLE_CY - TABLE_H/2||
				pos.x > TABLE_CX + TABLE_W/2 || 
				pos.y > TABLE_CY + TABLE_H/2);
	};
	function outsideGreen(pos) {
		return (pos.x - BALL_D/2 < TABLE_CX - TABLE_W/2 || 
				pos.y - BALL_D/2 < TABLE_CY - TABLE_H/2 ||
				pos.x + BALL_D/2 > TABLE_CX + TABLE_W/2 || 
				pos.y + BALL_D/2 > TABLE_CY + TABLE_H/2);
	};
	function insideHole(pos) {
		for (var i = 0; i < 6; i++) {
			var holeR = distanceBetween(table.holes[i].cE, table.holes[i].ltE);
			if (distanceBetween(pos, table.holes[i].cE) < holeR) {
				return i+1;
			}
		}
		return 0;
	};
	
	
	function overlappingAny(ball_idx, pos) {
		for (var i = 0; i <= 15; i++ ) {
			if (balls[i].onTable && i != ball_idx) {
				var pos2 = new b2p(balls[i].body.GetPosition());
				if (distanceBetween(pos, pos2) < BALL_D)
					return true;
			}
		}
		return false;
	};
	
	//TODO: glitch prova a andare sodo
	this.allowedPos = function(idx, pos) {
		if (outsideGreen(pos) || insideHole(pos) || overlappingAny(idx, pos))
			return false;
		else
			return true;
	};
	this.insideGreen = function(pos) {
		return (pos.x - BALL_D/2 > TABLE_CX - TABLE_W/2 && 
				pos.y - BALL_D/2 > TABLE_CY - TABLE_H/2 &&
				pos.x + BALL_D/2 < TABLE_CX + TABLE_W/2 && 
				pos.y + BALL_D/2 < TABLE_CY + TABLE_H/2);
	};
	/* calls the view if a ball is exited from table */
	this.verifyExit = function() {
		for (var i = 0; i < 16; i++) {
			if (balls[i].body != null && (balls[i].onTable || balls[i].onHole)) {
				var pos = b2p(balls[i].body.GetPosition());
				 
				// on the edge of hole
				var begExit = insideHole(pos);
				var endExit = allOutsideGreen(pos);
				
				// TODO:error if balls middle
				
				var invisible = (pos.x > table.holes[0].rtE.x && pos.y > table.holes[0].ltE.y) &&
								(pos.y > table.holes[1].ltI.y) &&
								(pos.x < table.holes[2].ltE.x && pos.y > table.holes[2].rtE.y) &&
								(pos.x < table.holes[3].ltE.x && pos.y < table.holes[3].rtE.y) &&
								(pos.y < table.holes[4].ltI.y) &&
								(pos.x > table.holes[5].ltE.x && pos.y < table.holes[5].rtE.y);
				if (begExit) balls[i].onHole = true;
				if(this.insideGreen(pos) && !begExit && balls[i].onHole)
					{
					balls[i].onHole = false;
					}
				if (balls[i].onTable && balls[i].onHole && !endExit) {
					balls[i].onHole = true;
					var sX = (TABLE_CX - pos.x)/20/SCALE;
					var sY = (TABLE_CY - pos.y)/20/SCALE;
					var vel  = balls[i].body.GetLinearVelocity();
					balls[i].body.SetLinearVelocity(new b2Vec2(vel.x-sX,vel.y-sY));
				}
				if (balls[i].onHole && endExit) balls[i].onTable = false;
				if (!balls[i].onTable && invisible) {
					balls[i].onHole = false;
					world.DestroyBody(balls[i].body);
					balls[i].body = null;
					exitCallback(i);
					return i;
				} else if (endExit || !balls[i].onTable) {
					balls[i].onTable = false;
					balls[i].onHole = true;
					var sX = (TABLE_CX - pos.x)/4;
					var sY = (TABLE_CY - pos.y)/4;
					var vel  = balls[i].body.GetLinearVelocity();
					balls[i].body.SetLinearVelocity(new b2Vec2(sX/SCALE,sY/SCALE));
					balls[i].body.DestroyFixture(balls[i].fixture);
				}		
			}
		}
	};
	/* verify if all balls are sleeping */
	this.verifySleep = function() {
		for ( var i = 0; i < 16; i++ )
			if ( balls[i].body != null && balls[i].body.IsAwake() )
				return false;
		return true;
	};
	
	this.tableToString = function() {
		var s = "";
		for ( var i = 0; i < 16; i++ )
			if ( balls[i].body != null && balls[i].onTable )
				s+= i +"," + this.getPosition(i).x + "," + this.getPosition(i).y + ";";
		return s;
	};

	this.paintOnTable = function () {
		for ( var i = 0; i < 16; i++ )
			if (balls[i].onTable) {
				balls[i].paintShadow();
			}
		for ( var i = 0; i < 16; i++ )
			if (balls[i].onTable) {
				balls[i].paint();
			}
	};
	this.paintOnEditing = function () {
		for ( var i = 0; i < 16; i++ )
			if (balls[i].onEditing) {
				balls[i].paint();
			}
	};
	this.paintOnCtrl = function () {
		for ( var i = 0; i < 16; i++ )
			if (balls[i].onCtrl) {
				balls[i].paint();
			}
	};
	this.paintOnHoles = function () {
		CTX_BUF.save();
		table.clipGreen();
		for ( var i = 0; i < 16; i++ )
			if (!balls[i].onTable && balls[i].onHole) {
				balls[i].paint();
			}
		CTX_BUF.restore();
	};
	this.paintOnTunnel = function () {
		for ( var i = 0; i < 16; i++ )
			if (balls[i].onTunnel) 
				balls[i].paint();
	};
	this.onTable = function(idx) {
		return balls[idx].onTable;
	};
};