function Editor() {
	
	/* setted by init */
	var callback = null;
	
	/* objects */
	var world = null,
		table = null,
		balls = null;
	
	/* controls */
	var messageCtrl = null,
		ballCtrl = null,
		menuCtrl = null,
		menuButton = null;
	
	var editingBall = -1;
	var dragOffsetX = null, dragOffsetY = null;

	var tableIdx = null,
		insideMenu = null;
	
	/* --- invokable by game --- */
	
	this.init = function(c) {
		callback = c;

		createObj();
		renderObj();
		
		insideMenu = true;
		menuCtrl.open(start);
	};
	
	this.paint = function() {
		paintObj();
		if (insideMenu) {
			menuCtrl.paint();
		}
	};
	
	/* --- invoked on objects --- */

	function createObj() {
		world = new b2World(new b2Vec2(0,0),true);
		(table = new Table()).create(world);
		(balls = new Balls()).create(world, table, null);
		(ballCtrl = new BallControl("ctrl")).create(balls);
		messageCtrl = new MessageControl("bottom");
		menuButton = new MenuButton(BUTTON_D, BUTTON1_CX, BUTTON1_CY);
		menuCtrl = new Menu();
		for (var i = 0; i < 5; i++)
				menuCtrl.options[i] = "SLOT " + (i+1);
		menuCtrl.options[5] = "RESET";
	};

	function renderObj() {
		table.render();
		ballCtrl.render();
		messageCtrl.render();
		menuButton.render();
	};
	
	function paintObj() {
		table.paintBorder();
		table.paintHoles();
		balls.paintOnHoles();
		table.paintGreen();
		balls.paintOnTable();
		messageCtrl.paint();
		if (!insideMenu)
			menuButton.paint();
		ballCtrl.paint();
		balls.paintOnCtrl();
		balls.paintOnEditing();
		
	};
	
	/* --- */
	
	function loadTable(t) {
		var s = localStorage.getItem(String(t));
		var blls = s.split(";");
		for (var i = 0; i < blls.length-1; i++) {
			var ball = blls[i].split(",");
			var idx = parseInt(ball[0]);
			var posx = parseFloat(ball[1]);
			var posy = parseFloat(ball[2]);
			balls.setOnTable(idx, posx, posy);
	}
		return (blls.length)-2;
	};
	
	function start(t) {
		menuButton.handle(end);
		if (t == 6) {
			loadDefault();
			insideMenu = true;
			menuCtrl.open(start);
		} else {
			insideMenu = false;
			
			leftBalls = loadTable(t);
			ballCtrl.setBalls();
			tableIdx = t;
			
			CANVAS.addEventListener('mousemove', editingMove, false);
			CANVAS.addEventListener('mousedown', editingDown, false);
			CANVAS.addEventListener('mouseup', editingUp, false);

			messageCtrl.setText("Drag balls on the table!");
		}
	};
	
	function end() {
		saveTable();
		CANVAS.removeEventListener('mousemove', editingMove, false);
		CANVAS.removeEventListener('mousedown', editingDown, false);
		CANVAS.removeEventListener('mouseup', editingUp, false);
		callback(0); // back to main menu
	};
	
	function saveTable() {
		var s = balls.tableToString();
		localStorage.setItem(tableIdx, s);
	};
	
	function editingMove(e) {
		var mouse = getMousePos(e);

		if(balls.insideAny(mouse) != -1 || editingBall != -1)
			CANVAS.style.cursor="pointer";
		else
			CANVAS.style.cursor="default";
		
		if (editingBall!=-1 && editingBall != 0) {
			var ball = new Point(mouse.x - dragOffsetX, mouse.y - dragOffsetY);
			if (balls.insideGreen(ball) && balls.allowedPos(editingBall, ball)) {
				balls.setOnTable(editingBall, ball.x, ball.y);
			} else if (!balls.insideGreen(ball)){
				balls.setOnEditing(editingBall, ball.x, ball.y);
			}	
		}
		if (editingBall == 0) {
			var ball = new Point(mouse.x - dragOffsetX, mouse.y - dragOffsetY);
			if (balls.insideGreen(ball) && balls.allowedPos(editingBall, ball))
				balls.setOnTable(editingBall, ball.x, ball.y);
		}
	};
	function editingDown(e) {
		var mouse = new Point(getMousePos(e).x, getMousePos(e).y);
		if (!menuButton.isInside(mouse)) {
			editingBall = balls.insideAny(mouse);
			if (  editingBall != -1 ) {
				var ball = balls.getPosition(editingBall);
				dragOffsetX = mouse.x - ball.x;
				dragOffsetY = mouse.y - ball.y;
				balls.setOnEditing(editingBall, ball.x, ball.y);				
			}
		}
	};
	function editingUp(e) {
		if(editingBall != -1) {
			var pos = balls.getPosition(editingBall);
			if (balls.insideGreen(pos) && balls.allowedPos(editingBall, pos)) {
				balls.setOnTable(editingBall,pos.x, pos.y);
			} else {
				ballCtrl.setBall(editingBall);
			}
		}
		editingBall = -1;
	};
	
};