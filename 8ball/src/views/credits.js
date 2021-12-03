function Credits() {
	var world = null;
	var table = null;
	var balls = null;
	//TODO: var buttons = null;
	var message = null;
	var message2 = null;
	var menuButton = null;

	var callback = null;
	
	var round = 0;
	var roundPotted = 0,
		totalPotted = 0;
	
	var timerDefault = FRAME_RATE*2;
	var startTimer = 0;
	var endTimer = 0;
	
	/* --- invokable by game --- */
	
	this.init = function(c) {
		callback = c;
		createObj();
		renderObj();
		startRound();
	};
	this.paint = function() {
		updateObj();
		paintObj();
	};
	
	/* --- invoked on objects --- */
	
	function createObj() {
		message = new MessageControl("bottom");
		message2 = new MessageControl("top");
		message2.setText("Programmed by Marco Barsotti");
		world = new b2World(new b2Vec2(0,0),true);
		(table = new Table()).create(world);
		(balls = new Balls()).create(world, table, ballExited);
		(menuButton = new MenuButton(BUTTON_D, BUTTON1_CX, BUTTON1_CY)).handle(end);

	};
	function renderObj() {
		message.render();
		message2.render();
		table.render();
		menuButton.render();
	};
	function updateObj() {
		if(startTimer > 0) startTimer --;		
		else {
			world.Step(1/FRAME_RATE,10,10);
			balls.ApplyTableFriction();
			balls.verifyExit();
		}
		
		if (balls.verifySleep()) {
			if( --endTimer == 0) {
				endRound();
				startRound();
			}
		}
		message.setText("Round " + round + " potted: " + roundPotted + "/15 - " +
						"Total: "+ totalPotted + "/" + round*15 + " - " +
						"Avg: " + Math.round(totalPotted/round) + "/15");
		
	}
	function paintObj() {
		table.paintBorder();
		table.paintHoles();
		balls.paintOnHoles();
		table.paintGreen();
		balls.paintOnTable();
		message.paint();
		message2.paint();
		menuButton.paint();
	};
	
	/* --- view auxiliary functions --- */
	function startRound() {
		setRandomBalls();
		round++;
		roundPotted = 0;
		startTimer = timerDefault;
		endTimer = timerDefault;
	};
	function endRound() {
		delete world;
		world = new b2World(new b2Vec2(0,0),true);
		table.create(world);
		balls.create(world, table, ballExited);
	}
	function end() {
		callback(0); // go to main menu
	};
	function ballExited(i) {
		roundPotted++;
		totalPotted++;
	}
	function setRandomBalls() {
		var minX = TABLE_CX - TABLE_W/3,
			maxX = TABLE_CX + TABLE_W/3;
		var minY = TABLE_CY - TABLE_H/3,
			maxY = TABLE_CY + TABLE_H/3;
		
		for (var i = 1; i <= 15; i++) {
			do {
				x = random(minX, maxX);
				y = random(minY, maxY);
			} while (!balls.allowedPos(i,new Point(x, y)));
			
			balls.setOnTable(i, x, y);
			balls.setBallSpeed(i, random(-100,100), random(-100,100));
		}	
	}
	
	/* --- event handling --- */
	
	
};