function Practice() {
	
	/* setted by init */
	var callback = null;
	
	/* objects */
	var world = null,
		table = null,
		balls = null,
		cue = null,
		tunnel = null;
	
	/* controls */
	var shotCtrl = null,
		ballCtrl = null,
		messageCtrl = null,
		menuButton = null;

	/* flags */
	var isAiming = null,
		isMoving = null,
		isShooting = null,
		isAnimating = null,
		cuePotted = null,
		movingAllowed = null;
	
	/* mouse tracking */
	var mouse = null,
		shotStartP = null,
		dragOffsetX = null,
		dragOffsetY = null;
	
	/* counters */
	var time = null,
		faults = null,
		leftBalls = null;
	
	/* --- invokable by game --- */
	
	this.init = function(c) {
		callback = c;
		
		createObj();
		renderObj();
	
		startMatch();
	};
	
	this.paint = function() {
		updateObj();
		paintObj();
	};
	
	/* --- invoked on objects --- */
	
	function createObj() {
		world = new b2World(new b2Vec2(0,0),true);
		(table = new Table()).create(world);
		(balls = new Balls()).create(world, table, ballExited);
		(ballCtrl = new BallControl("table")).create(balls);
		cue = new Cue();
		(shotCtrl = new ShotControl()).create(cue);
		(tunnel = new Tunnel()).create(world);
		messageCtrl = new MessageControl("bottom");
		(menuButton = new MenuButton(BUTTON_D, BUTTON1_CX, BUTTON1_CY)).handle(end);
	};
	
	function renderObj() {
		table.render();
		cue.render();
		tunnel.render();
		shotCtrl.render();
		ballCtrl.render();
		messageCtrl.render();
		menuButton.render();
	};
	
	function paintObj() {
		tunnel.paint();
		balls.paintOnTunnel();
		table.paintBorder();
		table.paintHoles();
		balls.paintOnHoles();
		table.paintGreen();
		if (isAiming || isShooting)
			drawAimingLine();
		balls.paintOnTable();
		if (isShooting)
			shotCtrl.paint();
		messageCtrl.paint();
		ballCtrl.paint();
		menuButton.paint();
		if (isAiming || isShooting || isAnimating)
			cue.paint();
	};
	
	function updateObj() {
		if (!isAiming && !isMoving && !isShooting && !isAnimating) {
			world.Step(1/FRAME_RATE, 10, 10); // update b2d world
			balls.ApplyTableFriction();
			balls.ApplyTunnelFlow();
			if (balls.verifySleep()) 
				if (leftBalls > 0)
					startAiming();
				else
					endMatch();
			balls.verifyExit();
		} else {
			time++;
		}
		if (leftBalls > 0)
			messageCtrl.setText("Time: " + Math.floor(time/60) + " - Faults: " + faults);
	};
	
	/* --- */
	function end() {
		window.removeEventListener('mousemove', mouseMove, false);

		callback(0); // go to main menu
	};
	
	function startMatch() {
		balls.setTriangle();
		balls.setOnTable(0, TABLE_CX - TABLE_W/4, TABLE_CY);

		isAiming = false,
		isMoving = false,
		isShooting = false,
		isAnimating = false,
		cuePotted = false;
		movingAllowed = true;

		time = 0;
		faults = 0;
		leftBalls = 15;
		
		mouse = new Point(TABLE_CX,TABLE_CY);

		window.addEventListener('mousemove', mouseMove, false);

		startAiming();
	};
	
	function endMatch() {
		messageCtrl.setText("Game over! (" + Math.floor(time/60) + " s, " + faults + " faults)");
	};
	
	function startAiming() {
		isAiming = true;
		
		if (cuePotted) {
			setCue();
			cuePotted = false;
		}

		cue.setPosition(balls.getCuePos());
		cue.distance = BALL_D;
		/* cue angle based on last mouse position */
		var ball = balls.getCuePos();
		var dx = mouse.x - ball.x,
			dy = mouse.y - ball.y;

		if (distanceBetween(mouse,ball) > BALL_D/2) {
			CANVAS.style.cursor="default";
			if (dx > 0)
				cue.angle = Math.atan(dy / dx);
			else if (dx < 0)
				cue.angle = Math.atan(dy / dx) - Math.PI;
			else 
				cue.angle = Math.PI/2;
		} else if (movingAllowed) {
			CANVAS.style.cursor="pointer";
		}
		CANVAS.addEventListener('mousemove', aimingMove, false);
		CANVAS.addEventListener('mousedown', aimingDown, false);
	};
	
	function endAiming() {
		isAiming = false;
		CANVAS.style.cursor="default";
		CANVAS.removeEventListener('mousemove', aimingMove, false);
		CANVAS.removeEventListener('mousedown', aimingDown, false);
	};

	function startMoving() {
		isMoving = true;
		CANVAS.style.cursor="pointer";
		CANVAS.addEventListener('mousemove', movingMove, false);
		CANVAS.addEventListener('mouseup', movingUp, false);
	};

	function endMoving() {
		isMoving = false;
		CANVAS.style.cursor="default";
		CANVAS.removeEventListener('mousemove', movingMove, false);
		CANVAS.removeEventListener('mouseup', movingUp, false);
	};

	function startShooting() {
		isShooting = true;
		
		CANVAS.addEventListener('mousemove', shootingMove, false);
		CANVAS.addEventListener('mouseup', shootingUp, false);
	};

	function endShooting() {
		isShooting = false;
		
		CANVAS.removeEventListener('mousemove', shootingMove, false);
		CANVAS.removeEventListener('mouseup', shootingUp, false);
	};
	
	/* called by balls object */
	function ballExited(i) {
		if (i == 0) {
			cuePotted = true;
			fault();
		} else {
			leftBalls--;
			balls.setOnTunnel(i);
		}
	};

	function fault() {
		faults++;
		movingAllowed = true;
	};

	/* set cue ball on table without overlapping */
	function setCue() {
		var x = TABLE_CX - TABLE_W/4;
		
		while (!balls.allowedPos(0,new Point(x, TABLE_CY)))
			x += BALL_D*3/2;
		balls.setOnTable(0, x, TABLE_CY);
	};

	function drawAimingLine() {
		function color() {
			var f = {r: 255, g: 0, b: 0, a: 0};
			var e = {r: 255, g: 255, b: 0, a: 0};
			
			var fraction = (cue.distance-CUE_MIND)/CUE_MAXD;
			
			if (fraction == 1) {
				f.a = 1;
			} else if (fraction == 0) {
				e.a = 1;
			} else {
				e.a = 1 - (fraction-0.5)*2;
				f.a = (fraction-0.5)*2;
			}

			var r = f.r*f.a + e.r*e.a,
				g = f.g*f.a + e.g*e.a,
				b = f.b*f.a + e.b*e.a;
			
			return "rgba("+Math.round(r)+","+Math.round(g)+","+Math.round(b)+",1)";
		};
		
		var ball = balls.getCuePos(),
			angle = cue.angle;
		
		var l = 1;
		while (
			balls.allowedPos(0, new Point(ball.x + l*Math.cos(angle), ball.y + l*Math.sin(angle))
				)) l++;

		CTX_BUF.save();
		
		if (isShooting && cue.distance > CUE_MIND) {
			CTX_BUF.lineWidth = 2;
			CTX_BUF.strokeStyle = color();
		} else if (isShooting){
			CTX_BUF.lineWidth = 2;
			CTX_BUF.strokeStyle = "gray";
		} else {
			CTX_BUF.lineWidth = 1;
			CTX_BUF.strokeStyle = "gray";
		}
		
		CTX_BUF.translate(ball.x, ball.y);
		CTX_BUF.rotate(angle);
		if (l > BALL_D) {
			/* linea */
			CTX_BUF.beginPath();
			CTX_BUF.moveTo(BALL_D/2,0);
			CTX_BUF.lineTo(l - BALL_D/2, 0);
			CTX_BUF.closePath();
			CTX_BUF.stroke();
		}
		/* cerchio */
		CTX_BUF.beginPath();
		CTX_BUF.arc(l, 0, BALL_D/2, 0, Math.PI*2);
		CTX_BUF.closePath();
		CTX_BUF.stroke();
		CTX_BUF.restore();
	};
	
	/* --- event handling --- */

	function mouseMove(e) {
		var m = new Point(getMousePos(e).x, getMousePos(e).y);
		var cueBall = balls.getCuePos();
		
		if (distanceBetween(mouse,cueBall) > BALL_D/2)
			mouse = m;
	};


	function aimingMove(e) {
		var mouse = new Point(getMousePos(e).x, getMousePos(e).y);
		var ball = balls.getCuePos();
		var dx = mouse.x - ball.x,
			dy = mouse.y - ball.y;

		if (distanceBetween(mouse,ball) > BALL_D/2) {
			CANVAS.style.cursor="default";
			if (dx > 0)
				cue.angle = Math.atan(dy / dx);
			else if (dx < 0)
				cue.angle = Math.atan(dy / dx) - Math.PI;
			else 
				cue.angle = Math.PI/2;
		} else if (movingAllowed) {
			CANVAS.style.cursor="pointer";
		}
	};

	function aimingDown(e) {
		var mouse = new Point(getMousePos(e).x, getMousePos(e).y);
		var cueBall = balls.getCuePos();
		if (!menuButton.isInside(mouse)) {
			if (distanceBetween(mouse,cueBall) <= BALL_D/2 && movingAllowed) {
				endAiming();
				dragOffsetX = mouse.x - cueBall.x;
				dragOffsetY = mouse.y - cueBall.y;
				startMoving();
			} else {
				endAiming();
				shotStartP = mouse;
				startShooting();
			}
		}
	};

	function movingMove(e) {
		var mouse = getMousePos(e);
		var ball = new Point(mouse.x - dragOffsetX, mouse.y - dragOffsetY);
		if (balls.allowedPos(0, ball))
				balls.setOnTable(0, ball.x, ball.y);
	};

	function movingUp(e) {
		endMoving();
		startAiming();
	};

	function shootingMove(e) {
		var mouse = new Point(getMousePos(e).x, getMousePos(e).y);
		var cueBall = balls.getCuePos();
		
		var dMouse = distanceBetween(mouse, cueBall);
		var dMax = distanceBetween(shotStartP, cueBall);
		var dTrip = distanceBetween(shotStartP, mouse);
		
		if (((dMouse < dMax) || (dMouse >= dMax && dTrip >= dMouse))
				&& dTrip < TABLE_H*0.7)
			cue.distance = BALL_D + dTrip;
		if (dMouse >= dMax && dTrip < dMouse)
			cue.distance = BALL_D;
	};

	function shootingUp(e) {
		var pow = cue.distance - BALL_D;
		if (pow >= 1) {
			balls.setBallSpeed(0, pow*Math.cos(cue.angle)/4, pow*Math.sin(cue.angle)/4);
	
			endShooting();
			movingAllowed = false;
			startAnimatingCue();
		} else {
			endShooting();
			startAiming();
		}
	};

	/* --- animation --- */

	function startAnimatingCue() { 
		isAnimating = true;
		cue.animate(stopAnimatingCue);
	};

	function stopAnimatingCue() {
		isAnimating = false;
	};
};