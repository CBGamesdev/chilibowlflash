function Tunnel () {
	var tunnelCanvas = null,
		tunnelCtx = null;
	
	var thk = BALL_D/5;
	var x = TUNNEL_STARTX,
		y = TUNNEL_STARTY,
		l = TUNNEL_H;
	function renderBorder() {
		tunnelCtx.save();
		
		tunnelCtx.strokeStyle = "black";
		tunnelCtx.lineWidth = "0.5";
		tunnelCtx.fillStyle = "gray";
		
		tunnelCtx.shadowBlur = 2;
		tunnelCtx.shadowColor = "black";
		
		/* external */
		tunnelCtx.beginPath();
		tunnelCtx.moveTo(x, y - BALL_D/2 - thk);
		tunnelCtx.arc(	x + BALL_D, 
						y + BALL_D,
						BALL_D/2 + BALL_D + thk,
						Math.PI*3/2, 2*Math.PI);
		tunnelCtx.arc(	x + BALL_D + BALL_D, 
						y + BALL_D/2 + l,
						BALL_D/2 + thk,
						0, Math.PI);
		tunnelCtx.arc(	x + BALL_D, 
						y + BALL_D,
						BALL_D/2 - thk,
						2*Math.PI,
						Math.PI*3/2,
						true);
		tunnelCtx.lineTo(x, y + BALL_D/2 + thk);
		
		/* internal */
		tunnelCtx.lineTo(x, y + BALL_D/2);
		tunnelCtx.arc(	x + BALL_D,
						y + BALL_D,
						BALL_D/2,
						Math.PI*3/2,
						2*Math.PI);
		tunnelCtx.arc(	x + BALL_D + BALL_D, 
				y + BALL_D/2 + l,
				BALL_D/2 ,
				Math.PI, 0,
				true);
		tunnelCtx.arc(	x + BALL_D, 
						y + BALL_D,
						BALL_D/2 + BALL_D,
						2*Math.PI,
						Math.PI*3/2,
						true);
		tunnelCtx.lineTo(x, y - BALL_D/2);
		tunnelCtx.closePath();
		
		tunnelCtx.fill();
		tunnelCtx.stroke();	
		
		tunnelCtx.restore();
	};
	
	function renderBottom() {
		tunnelCtx.strokeStyle = "black";
		tunnelCtx.lineWidth = 1;
		tunnelCtx.fillStyle = "gray";
		
		/* clipping */
		tunnelCtx.beginPath();
		tunnelCtx.lineTo(x, y + BALL_D/2);
		tunnelCtx.arc(	x + BALL_D,
						y + BALL_D,
						BALL_D/2,
						Math.PI*3/2,
						2*Math.PI);
		tunnelCtx.arc(	x + BALL_D + BALL_D, 
				y + BALL_D/2 + l,
				BALL_D/2 ,
				Math.PI, 0,
				true);
		tunnelCtx.arc(	x + BALL_D, 
						y + BALL_D,
						BALL_D/2 + BALL_D,
						2*Math.PI,
						Math.PI*3/2,
						true);
		tunnelCtx.lineTo(x, y - BALL_D/2);
		tunnelCtx.closePath();
		tunnelCtx.save();
		tunnelCtx.clip();
	
		/* curve */
		var a = (thk / 2) / Math.sqrt(2);
		tunnelCtx.beginPath();
		tunnelCtx.moveTo(x + BALL_D - a, y + BALL_D - a);
		tunnelCtx.lineTo(x + 3*BALL_D - a, y - BALL_D - a);
		tunnelCtx.lineTo(x + 3*BALL_D + a, y - BALL_D + a);
		tunnelCtx.lineTo(x + BALL_D + a, y + BALL_D + a);
		tunnelCtx.closePath();
		tunnelCtx.fill();
		tunnelCtx.stroke();	
		
		for ( var offY = y + BALL_D + BALL_D/2; offY < y + BALL_D + l - BALL_D/2; offY += BALL_D*2 ) {
			tunnelCtx.beginPath();
			tunnelCtx.moveTo(x + BALL_D, offY - thk/2);
			tunnelCtx.lineTo(x + 2.5*BALL_D, offY - thk/2);
			tunnelCtx.lineTo(x + 2.5*BALL_D + thk/2, offY + thk/2);
			tunnelCtx.lineTo(x + BALL_D - thk/2, offY + thk/2);
			tunnelCtx.lineTo(x + BALL_D - thk/2, offY - thk/2);
			tunnelCtx.closePath();
			tunnelCtx.fill();
			tunnelCtx.stroke();
		}
		
		tunnelCtx.beginPath();
		tunnelCtx.moveTo(x + 0.75*BALL_D - thk/2, y + BALL_D/2);
		tunnelCtx.lineTo(x + 0.75*BALL_D + thk/2, y + BALL_D/2);
		tunnelCtx.lineTo(x + 0.75*BALL_D + thk/2, y - BALL_D/2);
		tunnelCtx.lineTo(x + 0.75*BALL_D - thk/2, y - BALL_D/2);
		tunnelCtx.lineTo(x + 0.75*BALL_D - thk/2, y + BALL_D/2);
		tunnelCtx.closePath();
		tunnelCtx.fill();
		tunnelCtx.stroke();	
		
		tunnelCtx.restore();
		
		/* center */
		tunnelCtx.beginPath();
		tunnelCtx.moveTo(x, y - thk/2);
		tunnelCtx.arc(	x + BALL_D,
						y + BALL_D,
						BALL_D + thk/2,
						Math.PI*3/2,
						2*Math.PI);
		tunnelCtx.lineTo(x + BALL_D*2 + thk/2, y + BALL_D + l );
		tunnelCtx.lineTo(x + BALL_D*2 - thk/2, y + BALL_D + l );
		tunnelCtx.arc(	x + BALL_D,
						y + BALL_D,
						BALL_D - thk/2,
						0,
						Math.PI*3/2,
						true);
		tunnelCtx.lineTo(x, y + thk/2);
		tunnelCtx.closePath();
		tunnelCtx.fill();
		tunnelCtx.stroke();	
	};
	
	this.create = function(world) {
		/* physical definitions */
		var tunnelB = new b2BodyDef;
		tunnelB.type = b2Body.b2_staticBody;
		var tunnelF = new b2FixtureDef;
		tunnelF.friction = 0.1;
		tunnelF.restitution = 0;
		
		/* stops the ball */
		var b2Listener = Box2D.Dynamics.b2ContactListener;
		var listener = new b2Listener;
		listener.BeginContact = function(contact) {
			var a = contact.GetFixtureA().GetBody();
			var b = contact.GetFixtureB().GetBody();
			if ( a.GetUserData()=="tunnel ball" && 
				(b.GetUserData()=="ground" || b.GetUserData()=="stopped ball")) {
				a.SetAngularVelocity(0);
				a.SetLinearVelocity(new b2Vec2(0,0));
				a.SetUserData("stopped ball");
			} else if 	( b.GetUserData()=="tunnel ball" && 
						(a.GetUserData()=="ground" || a.GetUserData()=="stopped ball")) {
				b.SetAngularVelocity(0);
				b.SetLinearVelocity(new b2Vec2(0,0));
				b.SetUserData("stopped ball");
			}
		};
		world.SetContactListener(listener);
		
		/* ground */
		tunnelF.shape = new b2PolygonShape;
		tunnelF.shape.SetAsEdge(
				p2b(new Point(	x + BALL_D + BALL_D/2, 
								y + BALL_D/2 + l + BALL_D/2)),
				p2b(new Point(	x + BALL_D + BALL_D/2 + BALL_D, 
								y + BALL_D/2 + l +  BALL_D/2))
				);
		var b = world.CreateBody(tunnelB);
		b.SetUserData("ground");
		b.CreateFixture(tunnelF);
		
		/* before corner */
		tunnelF.shape = new b2PolygonShape;
		tunnelF.shape.SetAsEdge(
				p2b(new Point(	x, 
								y + BALL_D/2)),
				p2b(new Point(	x + BALL_D, 
								y + BALL_D/2))
				);
		world.CreateBody(tunnelB).CreateFixture(tunnelF);	
		
		/* left border */
		tunnelF.shape = new b2PolygonShape;
		tunnelF.shape.SetAsEdge(
				p2b(new Point(	x + BALL_D + BALL_D/2, 
								y + BALL_D)),
				p2b(new Point(	x + BALL_D + BALL_D/2, 
								y + BALL_D + l))
				);
		world.CreateBody(tunnelB).CreateFixture(tunnelF);	
		
		/* right border */
		tunnelF.shape = new b2PolygonShape;
		tunnelF.shape.SetAsEdge(
				p2b(new Point(	x + 2*BALL_D + BALL_D/2, 
								y - BALL_D/2)),
				p2b(new Point(	x + 2*BALL_D + BALL_D/2, 
								y + BALL_D + l))
				);
		world.CreateBody(tunnelB).CreateFixture(tunnelF);	
		
		/* corner */
		tunnelF.shape = new b2CircleShape(BALL_D/2 / SCALE);
		tunnelB.position.x = (x + BALL_D ) / SCALE;
		tunnelB.position.y = (y + BALL_D) / SCALE;
		world.CreateBody(tunnelB).CreateFixture(tunnelF);
	};	
	this.render = function() {
		tunnelCanvas = document.createElement("canvas");
		tunnelCanvas.width = WIDTH;
		tunnelCanvas.height = HEIGHT;
		tunnelCtx = tunnelCanvas.getContext("2d");
		renderBottom();
		renderBorder();
	};
	this.paint = function() {
		CTX_BUF.drawImage(tunnelCanvas, 0, 0);
	};
};