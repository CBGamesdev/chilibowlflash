function Table () {
	var borderCanvas = null,
		greenCanvas = null,
		holesCanvas = null;
	var borderCtx = null, 
		greenCtx = null, 
		holesCtx = null;	
	
	/* dimensions */
	var TABLE_THK = TABLE_BORDER/4 * 3;
	var CUSH_THK = TABLE_BORDER/4; 
	var HOLE_D = BALL_D * 1.5;
	var HOLE_MTH = HOLE_D * 1.2;
	var HOLE_NCK = HOLE_D;
	var A = HOLE_MTH/2 * Math.sqrt(2);
	var HOLE_BDY_THK = HOLE_D + A/2;
	
	/* useful points for object drawing */
	var N = new Point(TABLE_CX, TABLE_CY - TABLE_H/2),
		S = new Point(TABLE_CX, TABLE_CY + TABLE_H/2),
		NW = new Point(TABLE_CX - TABLE_W/2, TABLE_CY - TABLE_H/2),
		NE = new Point(TABLE_CX + TABLE_W/2, TABLE_CY - TABLE_H/2),
		SW = new Point(TABLE_CX - TABLE_W/2, TABLE_CY + TABLE_H/2),
		SE = new Point(TABLE_CX + TABLE_W/2, TABLE_CY + TABLE_H/2);

	/* colors, textures */
	var cushColor = "rgba(0, 173, 57, 1)";
	
	var textureSrc = "img/radica.jpg";
	var texture;
	function loadTexture(src, callback) {
		texture = new Image();
		texture.src = src;
		texture.onload = callback;
	};

	/* hole class */
	function Hole (c, a, ltI,rtI, ltE,rtE, tLtI,tRtI, tLtE,tRtE, tLtEc,tRtEc) {
		/* center and entering angle */
		this.c = c;
		this.a = a * Math.PI;
		/* hole mouth start (inside of table) */
		this.ltI = ltI;
		this.rtI = rtI;
		this.cI = centerPoint(this.ltI, this.rtI);
		/* hole neck end (outside of table) */
		this.ltE = ltE;
		this.rtE = rtE;
		this.cE = centerPoint(this.ltE, this.rtE);
		/* hole body end (inside of table) */
		this.tLtI = tLtI;
		this.tRtI = tRtI;
		/* hole body end (outside of table) */
		this.tLtE = tLtE;
		this.tRtE = tRtE;
		/* tansposition of hole neck end (outside of table) */
		this.tLtEc = tLtEc;
		this.tRtEc = tRtEc;
	};

	/* hole array */
	var holes = new Array();
	this.holes = holes;
	holes[0] = new Hole(
			new Point(NW.x - CUSH_THK - TABLE_THK/2, NW.y - CUSH_THK - TABLE_THK/2),
			1.75,
			new Point(NW.x, NW.y + A),
			new Point(NW.x + A, NW.y),
			new Point(NW.x - CUSH_THK, NW.y + A - CUSH_THK),
			new Point(NW.x + A - CUSH_THK, NW.y - CUSH_THK),
			new Point(NW.x - CUSH_THK, NW.y + A),
			new Point(NW.x + A, NW.y - CUSH_THK),
			new Point(NW.x - CUSH_THK - TABLE_THK, NW.y + A),
			new Point(NW.x + A, NW.y - CUSH_THK - TABLE_THK),
			new Point(NW.x - CUSH_THK - TABLE_THK, NW.y + A - CUSH_THK),
			new Point(NW.x + A - CUSH_THK, NW.y - TABLE_BORDER)
	);
	holes[1] = new Hole(
			new Point(N.x, N.y - CUSH_THK - TABLE_THK/2),
			0,
			new Point(N.x - HOLE_MTH/2, N.y),
			new Point(N.x + HOLE_MTH/2, N.y),
			new Point(N.x - HOLE_NCK/2, N.y - CUSH_THK),
			new Point(N.x + HOLE_NCK/2, N.y - CUSH_THK),
			new Point(N.x - HOLE_BDY_THK/2, N.y - CUSH_THK),
			new Point(N.x + HOLE_BDY_THK/2, N.y - CUSH_THK),
			new Point(N.x - HOLE_BDY_THK/2, N.y - TABLE_BORDER),
			new Point(N.x + HOLE_BDY_THK/2, N.y - TABLE_BORDER),
			new Point(N.x - HOLE_NCK/2, N.y - TABLE_BORDER),
			new Point(N.x + HOLE_NCK/2, N.y - TABLE_BORDER)
	);
	holes[2] = new Hole(
			new Point(NE.x + CUSH_THK + TABLE_THK/2, NE.y - CUSH_THK - TABLE_THK / 2),
			0.25,
			new Point(NE.x - A, NE.y),
			new Point(NE.x, NE.y + A),
			new Point(NE.x - A + CUSH_THK, NE.y - CUSH_THK),
			new Point(NE.x + CUSH_THK, NE.y + A - CUSH_THK),
			new Point(NE.x - A, NE.y - CUSH_THK),
			new Point(NE.x + CUSH_THK, NE.y + A),
			new Point(NE.x - A, NE.y - CUSH_THK - TABLE_THK),
			new Point(NE.x + TABLE_BORDER, NE.y + A),
			new Point(NE.x - A + CUSH_THK, NE.y - TABLE_BORDER),
			new Point(NE.x + TABLE_BORDER, NE.y + A - CUSH_THK)
	);
	holes[3] = new Hole(
			new Point(SE.x + CUSH_THK + TABLE_THK/2, SE.y + CUSH_THK + TABLE_THK/2),
			0.75,
			new Point(SE.x, SE.y - A),
			new Point(SE.x - A, SE.y),
			new Point(SE.x + CUSH_THK, SE.y - A + CUSH_THK),
			new Point(SE.x - A + CUSH_THK, SE.y + CUSH_THK),
			new Point(SE.x + CUSH_THK, SE.y - A),
			new Point(SE.x - A, SE.y + CUSH_THK),
			new Point(SE.x + TABLE_BORDER, SE.y - A),
			new Point(SE.x - A, SE.y + TABLE_BORDER),
			new Point(SE.x + TABLE_BORDER, SE.y - A + CUSH_THK),
			new Point(SE.x - A + CUSH_THK, SE.y + TABLE_BORDER)
	);
	holes[4] = new Hole(
			new Point(S.x ,S.y + CUSH_THK + TABLE_THK/2),
			1,
			new Point(S.x + HOLE_MTH/2, S.y),
			new Point(S.x - HOLE_MTH/2, S.y),
			new Point(S.x + HOLE_NCK/2, S.y + CUSH_THK),
			new Point(S.x - HOLE_NCK/2, S.y + CUSH_THK),
			new Point(S.x + HOLE_BDY_THK/2, S.y + CUSH_THK),
			new Point(S.x - HOLE_BDY_THK/2, S.y + CUSH_THK),
			new Point(S.x + HOLE_BDY_THK/2, S.y + TABLE_BORDER),
			new Point(S.x - HOLE_BDY_THK/2, S.y + TABLE_BORDER),
			new Point(S.x + HOLE_NCK/2, S.y + TABLE_BORDER),
			new Point(S.x - HOLE_NCK/2, S.y + TABLE_BORDER)
	);
	holes[5] = new Hole(
			new Point(SW.x - CUSH_THK - TABLE_THK/2, SW.y + CUSH_THK + TABLE_THK/2),
			1.25,
			new Point(SW.x + A, SW.y),
			new Point(SW.x, SW.y - A),
			new Point(SW.x + A - CUSH_THK, SW.y + CUSH_THK),
			new Point(SW.x - CUSH_THK, SW.y - A + CUSH_THK),
			new Point(SW.x + A, SW.y + CUSH_THK),
			new Point(SW.x - CUSH_THK, SW.y - A),
			new Point(SW.x + A, SW.y + TABLE_BORDER),
			new Point(SW.x - TABLE_BORDER, SW.y - A),
			new Point(SW.x + A - CUSH_THK, SW.y + TABLE_BORDER),
			new Point(SW.x - TABLE_BORDER, SW.y - A + CUSH_THK)
	);

	function renderCushBetweenHoles () {
		for ( var i = 0; i < 6; i++ ) {
			var ltH = holes[i];
			var rtH = holes[(i + 1) % 6];

			/* points to join */
			var a = ltH.rtI, 
			b = rtH.ltI,
			c = rtH.ltE,
			d = ltH.rtE;

			/* clipping - to avoid undesired shadow  */
			var x1 = NW.x - CUSH_THK, 
			y1 = NW.y - CUSH_THK;
			var x2 = NE.x + CUSH_THK,
			y2 = SW.y + CUSH_THK;

			greenCtx.beginPath();
			greenCtx.rect(x1, y1, x2 - x1, y2 - y1);
			greenCtx.closePath();
			
			greenCtx.save();
			greenCtx.clip();

			/* cush */
			greenCtx.lineWidth = "0.5";
			greenCtx.strokeStyle= "black";
			greenCtx.fillStyle = cushColor;
			greenCtx.shadowBlur = "15";
			greenCtx.shadowColor = "black";
			
			greenCtx.beginPath();
			greenCtx.moveTo(a.x, a.y);
			greenCtx.lineTo(b.x, b.y);
			greenCtx.lineTo(c.x, c.y);
			greenCtx.lineTo(d.x, d.y);
			greenCtx.lineTo(a.x, a.y);
			greenCtx.closePath();
			
			greenCtx.fill();
			greenCtx.stroke();
			
			greenCtx.restore();
		}
	};

	function renderBorderBetweenHoles () {
		borderCtx.strokeStyle= "black";
		var borderTexture = borderCtx.createPattern(texture, "repeat");
		
		for ( var i = 0; i < 6; i++ ) {
			ltH = holes[i];
			rtH = holes[(i + 1) % 6];
			
			/* border */
			borderCtx.fillStyle = borderTexture;
			
			borderCtx.beginPath();
			borderCtx.moveTo(ltH.tRtE.x,ltH.tRtE.y);
			borderCtx.lineTo(rtH.tLtE.x,rtH.tLtE.y);
			borderCtx.lineTo(rtH.tLtI.x,rtH.tLtI.y);
			borderCtx.lineTo(ltH.tRtI.x,ltH.tRtI.y);
			borderCtx.lineTo(ltH.tRtE.x,ltH.tRtE.y);
			borderCtx.closePath();
			
			borderCtx.fill();

			/* diamonds */
			var borderL = distanceBetween(ltH.rtE, rtH.ltE);
			var diamondOffset = borderL/4;
			var diagP = TABLE_THK*0.4;
			var diagS = diagP / 2;
			borderCtx.lineWidth = "1";
			borderCtx.fillStyle = "lightgray";
			/* for 3d effect */
			var lighten = "white";
			var darken = "black";
			
			var horizontal = (ltH.rtE.y == rtH.ltE.y);
			var orient;
			if ( (horizontal && (rtH.ltE.x - ltH.rtE.x) > 0) ||
				(!horizontal && (rtH.ltE.y - ltH.rtE.y) > 0 ) )
				orient = 1;
			else
				orient = -1;
			

			var cx, cy, n, w, e, s;
			
			if (horizontal) { 
				cy = centerPoint(ltH.rtE, ltH.tRtE).y;
				n = new Point(0,-diagP/2);
				w = new Point(-diagS/2,0);
				e = new Point(diagS/2,0);
				s = new Point(0,diagP/2);
			} else {
				cx = centerPoint(ltH.rtE, ltH.tRtE).x;
				n = new Point(0,-diagS/2);
				w = new Point(-diagP/2,0);
				e = new Point(diagP/2,0);
				s = new Point(0,diagS/2);
			}
			
			for ( var j = 0; j < 3; j++ ) {
				if (horizontal)
					cx = ltH.rtE.x + orient*(diamondOffset*(j + 1));
				else 
					cy = ltH.rtE.y + orient*(diamondOffset*(j + 1));
				
				borderCtx.save();
				borderCtx.translate(cx, cy);
				
				/* diamond */
				borderCtx.beginPath();
				borderCtx.moveTo(n.x, n.y);
				borderCtx.lineTo(e.x, e.y);
				borderCtx.lineTo(s.x, s.y);
				borderCtx.lineTo(w.x, w.y);
				borderCtx.closePath();
				
				borderCtx.fill();
				
				borderCtx.strokeStyle = lighten;
				
				borderCtx.beginPath();
				borderCtx.moveTo(n.x, n.y);
				borderCtx.lineTo(w.x, w.y);
				borderCtx.closePath();
				
				borderCtx.stroke();
				
				borderCtx.strokeStyle = darken;
				
				borderCtx.beginPath();
				borderCtx.moveTo(e.x, e.y);
				borderCtx.lineTo(s.x, s.y);
				borderCtx.closePath();
				
				borderCtx.stroke();
				
				borderCtx.restore();
			}
		}
	};

	/* hole border */
	function renderHoleE () {
		borderCtx.fillStyle = "black";
		
		for ( var i = 0; i < 6; i++ ) {
			var hole = holes[i];
			
			var m = centerPoint(hole.ltI, hole.tLtI);
			var r =	distanceBetween(hole.cE, m) * 0.9;

			borderCtx.beginPath();
			borderCtx.arc(hole.cE.x, hole.cE.y,
					r,
					0, 2 * Math.PI);
			borderCtx.closePath();

			borderCtx.fill();
		}
	};

	/* internal hole */
	function renderHoleI () {
		for ( var i = 0; i < 6; i++ ) {
			var h = holes[i];
			
			var c = h.cE;
			var r = distanceBetween(h.cE, h.ltE);
			var mx = h.cI.x, 
			my = h.cI.y;

			/* gradient for the deep effect */
			var grd = borderCtx.createRadialGradient(mx, my, 0, c.x, c.y, r);
			grd.addColorStop(0, 'rgba(0, 0, 0, 1)');
			grd.addColorStop(1, 'rgba(65, 65, 65, 1)');
			holesCtx.fillStyle = grd;

			holesCtx.beginPath();
			holesCtx.arc(c.x, c.y, 
					r, 
					0, 2 * Math.PI);
			holesCtx.closePath();

			holesCtx.fill();
		}
		
	};

	/* external hole */
	function renderHoleBody () {
		borderCtx.strokeStyle= "black";
		var borderTexture = borderCtx.createPattern(texture, "repeat");
		for ( var i = 0; i < 6; i++ ) {
			var h = holes[i];

			borderCtx.beginPath();
			borderCtx.moveTo(h.tLtE.x,h.tLtE.y);
			borderCtx.lineTo(h.tLtEc.x,h.tLtEc.y);
			if (h.a/Math.PI != 0 && h.a/Math.PI != 1) // only angular holes
				borderCtx.arc(h.c.x, h.c.y,
						TABLE_THK/2,
						h.a + Math.PI/4*5, h.a + Math.PI/4*5 + Math.PI/2);
			borderCtx.lineTo(h.tRtEc.x,h.tRtEc.y);
			borderCtx.lineTo(h.tRtE.x,h.tRtE.y);
			borderCtx.lineTo(h.tRtI.x,h.tRtI.y);
			borderCtx.lineTo(h.rtE.x,h.rtE.y);
			borderCtx.lineTo(h.ltE.x,h.ltE.y);
			borderCtx.lineTo(h.tLtI.x,h.tLtI.y);
			borderCtx.lineTo(h.tLtE.x,h.tLtE.y);
			borderCtx.closePath();

			borderCtx.fillStyle = borderTexture;
			borderCtx.fill();

			/* darken */
			borderCtx.fillStyle = "rgba(0,0,0,0.4)";
			borderCtx.fill();
		}
	};

	function renderGreen()  {
		var startX = NW.x - CUSH_THK,
			startY = NW.y - CUSH_THK;
		var width = NE.x + CUSH_THK - startX,
			height = SW.y + CUSH_THK - startY;
		
		var canvasMask = document.createElement("canvas");
			canvasMask.setAttribute("width", WIDTH);
			canvasMask.setAttribute("height", HEIGHT);
		var maskCtx = greenCanvas.getContext("2d");
		
		maskCtx.save();
		
		/* ellipse gradient */
		maskCtx.translate(startX, startY);
		maskCtx.transform(1, 0, 0, height/width, 0, 0);
		grd = maskCtx.createRadialGradient(height, height, 0, height, height, height);
		grd.addColorStop(0, 'rgba(0, 237, 71, 1)');
		grd.addColorStop(1, 'rgba(0, 173, 57, 1)');
		maskCtx.fillStyle = grd;
		
		maskCtx.fillRect(0, 0, width, width);
		
		maskCtx.restore();
		
		for ( var i = 0; i < 6; i++ ) {
			var h = holes[i];
			
			var c = h.cE;
			var r = distanceBetween(h.cE, h.ltE);
			var mx = h.cI.x, 
			my = h.cI.y;

			maskCtx.beginPath();
			maskCtx.arc(c.x, c.y, 
					r, 
					0, 2 * Math.PI);
			maskCtx.closePath();

			maskCtx.fill();
		}
		
		
		/* subtract holes */
		maskCtx.globalCompositeOperation = "xor";
		maskCtx.fillStyle = "white";
		
		for ( var i = 0; i < 6; i++ ) {
			var h = holes[i];
			
			var c = h.cE;
			var r = distanceBetween(h.cE, h.ltE);
			var mx = h.cI.x, 
			my = h.cI.y;


			maskCtx.beginPath();
			maskCtx.arc(c.x, c.y, 
					r, 
					0, 2 * Math.PI);
			maskCtx.closePath();

			maskCtx.fill();
		}
		maskCtx.globalCompositeOperation = "source-over";
		
		maskCtx.lineWidth = 0.5;
		for ( var i = 0; i < 6; i++ ) {
			var h = holes[i];
			
			var c = h.cE;
			var r = distanceBetween(h.cE, h.ltE);
			var mx = h.cI.x, 
			my = h.cI.y;


			maskCtx.beginPath();
			maskCtx.arc(c.x, c.y, 
					r, 
					0, 2 * Math.PI);
			maskCtx.closePath();

			maskCtx.stroke();
		}
		greenCtx.drawImage(canvasMask,0,0);

	};

	this.clipGreen = function() {
		var startX = NW.x - CUSH_THK,
		startY = NW.y - CUSH_THK;
		var width = NE.x + CUSH_THK - startX,
		height = SW.y + CUSH_THK - startY;

		CTX_BUF.beginPath();
		
		CTX_BUF.rect(startX, startY, width, height);

		for ( var i = 0; i < 6; i++ ) {
			var h = holes[i];

			var c = h.cE;
			var r = distanceBetween(h.cE, h.ltE);
			var mx = h.cI.x, 
			my = h.cI.y;
			
			CTX_BUF.arc(c.x, c.y, 
					r, 
					0, 2 * Math.PI);
		}
		
		CTX_BUF.closePath();
		CTX_BUF.clip();

	};
	
	function renderShadow (ctx) {
		ctx.save();

		ctx.beginPath();
		ctx.moveTo(holes[0].tLtE.x, holes[0].tLtE.y);
		for ( var i = 0; i < 6; i++ ) {
			var ltH = holes[i],
				rtH = holes[(i + 1) % 6];
			if (ltH.a/Math.PI != 0 && ltH.a/Math.PI != 1)
				ctx.arc(ltH.c.x, ltH.c.y,
						TABLE_THK/2,
						ltH.a + Math.PI/4*5, 
						ltH.a + Math.PI/4*5 + Math.PI/2);
			ctx.lineTo(rtH.tLtEc.x, rtH.tLtEc.y);
		}
		ctx.closePath();

		ctx.lineWidth = "2";
		ctx.strokeStyle = "black";
		ctx.fillStyle = "black";
		ctx.shadowBlur = 50;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowColor = "black";
		
		ctx.fill();
		ctx.stroke();
		
		ctx.restore();
	};

	/* --- invokable by view --- */
	
	/* create physics in the view world */
	this.create = function (world) {
		var cushB = new b2BodyDef;
			cushB.type = b2Body.b2_staticBody;
		var cushF = new b2FixtureDef;
			cushF.shape = new b2PolygonShape;
			cushF.friction = 0.1;
			cushF.restitution = 0.75;
		for ( var i = 0; i < 6; i++ ) { // draw the six cushes
			var ltH = holes[i], 
				rtH = holes[(i+1)%6];
			cushF.shape.SetAsEdge(p2b(ltH.rtI), p2b(rtH.ltI));
			world.CreateBody(cushB).CreateFixture(cushF);
			cushF.shape.SetAsEdge(p2b(ltH.rtI), p2b(ltH.rtE)); // left angle
			world.CreateBody(cushB).CreateFixture(cushF);
			cushF.shape.SetAsEdge(p2b(rtH.ltI), p2b(rtH.ltE)); // right angle
			world.CreateBody(cushB).CreateFixture(cushF);
		}
	};
	/* render table parts */
	this.render = function() {	
		borderCanvas = document.createElement("canvas");
		borderCanvas.width = WIDTH;
		borderCanvas.height = HEIGHT;
		borderCtx = borderCanvas.getContext("2d");
		
		holesCanvas = document.createElement("canvas");
		holesCanvas.width = WIDTH;
		holesCanvas.height = HEIGHT;
		holesCtx = holesCanvas.getContext("2d");
		
		greenCanvas = document.createElement("canvas");
		greenCanvas.width = WIDTH;
		greenCanvas.height = HEIGHT;
		greenCtx = greenCanvas.getContext("2d");
		
		loadTexture(textureSrc, function() { // starts after texture loading
			renderShadow(borderCtx);
			renderHoleBody();
			renderHoleE();
			renderBorderBetweenHoles();
			renderGreen();
			renderCushBetweenHoles();
			renderHoleI();
		});
	};
	/* paint all table */
	this.paint = function() {
		this.paintBorder();
		this.paintHoles();
		this.paintGreen();
		
	};
	/* individually paint table parts */
	this.paintBorder = function() {
		CTX_BUF.drawImage(borderCanvas, 0, 0);
	};
	this.paintHoles = function() {
		CTX_BUF.drawImage(holesCanvas, 0, 0);
	};
	this.paintGreen = function() {
		CTX_BUF.drawImage(greenCanvas, 0, 0);
	};
}