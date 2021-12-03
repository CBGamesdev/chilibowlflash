/* --- global costants --- */
/* dimensions */
var WIDTH = 800, 
	HEIGHT = 600;
var FRAME_RATE = 60;
var SCALE = 30; // for box2d world
var TABLE_W = WIDTH * 0.7, 
	TABLE_H = TABLE_W / 2;
var TABLE_CX = WIDTH / 2, 
	TABLE_CY = HEIGHT / 2;
var BALL_D = TABLE_W * 0.03;


var TABLE_BORDER = BALL_D * 2;
var TUNNEL_H = BALL_D * 16;
var CTRL_MARGIN = TABLE_BORDER / 2;
var CTRL_D = TABLE_BORDER;
var CTRL_PADDING = CTRL_D / 5;
var BUTTON_D = TABLE_BORDER;
/* positions */
var TUNNEL_STARTX = TABLE_CX + TABLE_W/2 + TABLE_BORDER, 
	TUNNEL_STARTY = TABLE_CY - TABLE_H/2 + BALL_D;
var PLAYERCTRL_CX = TABLE_CX,
	PLAYERCTRL_CY = TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2;
var SHOTCTRL_CX = TABLE_CX - TABLE_W/2 - TABLE_BORDER - CTRL_MARGIN - CTRL_D/2,
	SHOTCTRL_CY = TABLE_CY;
var BUTTON1_CX = TABLE_CX - TABLE_W/2 - TABLE_BORDER - CTRL_MARGIN - BUTTON_D/2,
	BUTTON1_CY = TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - BUTTON_D/2;
var BUTTON2_CX = TABLE_CX + TABLE_W/2 + TABLE_BORDER + CTRL_MARGIN + BUTTON_D/2,
	BUTTON2_CY = TABLE_CY - TABLE_H/2 - TABLE_BORDER - CTRL_MARGIN - BUTTON_D/2;

var CUE_MAXD = TABLE_H*0.7,
	CUE_MIND = BALL_D;

var SLOT1 = String("0,260,300;1,139,177;2,401,174;3,657,177;4,658,422;5,399,424;6,142,422;");
var SLOT2 = String("0,655,413;1,138,176;2,402,171;3,662,178;4,401,430;5,134,428;6,614,275;8,629,393;");
var SLOT3 = String("0,260,300;1,131,184;2,145,171;3,391,169;4,409,169;5,656,170;6,670,180;7,671,420;8,394,299;9,657,430;10,410,431;11,391,431;12,147,430;13,131,416;14,410,288;15,411,305;");
var SLOT4 = String("0,403,300;1,157,170;2,667,395;3,424,170;4,670,194;6,367,430;7,133,400;9,132,202;10,635,429;11,375,171;12,640,173;14,431,429;15,161,428;");
var SLOT5 = String("0,403,300;1,402,266;2,441,300;3,405,334;4,366,299;5,142,177;6,401,173;7,661,176;9,440,266;10,442,335;11,367,334;12,364,267;13,659,421;14,399,427;15,138,425;");

/* DOM canvas */
var CANVAS = document.getElementById("game");
	CANVAS.width = WIDTH;
	CANVAS.height = HEIGHT;
	CANVAS.imageSmoothingEnabled = true; // enable antialiasing
var CTX = CANVAS.getContext("2d");
/* buffer canvas */
var CANVAS_BUF = document.createElement("canvas");
	CANVAS_BUF.width = WIDTH;
	CANVAS_BUF.height = HEIGHT;
var CTX_BUF = CANVAS_BUF.getContext("2d");
/* for requestAnimFrame compatibility */
window.requestAnimFrame = (function(callback) {
	return	window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			window.oRequestAnimationFrame || 
			window.msRequestAnimationFrame ||
			window.setTimeout(callback, 1000 / 60);
})();

var background = null;
var view = null;

/* views */
var VIEWS = new Array();
	VIEWS[0] = "MAIN MENU";
	VIEWS[1] = "PRACTICE";
	VIEWS[2] = "VS MODE";
	VIEWS[3] = "CHALLENGE";
	VIEWS[4] = "EDITOR";
	VIEWS[5] = "CREDITS";

/* initialize the game */
function init() {
	if (background != null) delete background;
	if (view != null) delete view;

	(background = new Background()).render();
	(view = new Intro()).init(changeView);

	if (localStorage.getItem("1") == null)
		loadDefault();

	update();
};

function changeView(viewIdx) {
	delete view;
	switch (viewIdx) {
		case 0 : {view = new MainMenu(); break;}
		case 1 : {view = new Practice(); break;}
		case 2 : {view = new VsMode(); break;}
		case 3 : {view = new Challenge(); break;}
		case 4 : {view = new Editor(); break;}
		case 5 : {view = new Credits(); break;}
	}
	view.init(changeView);
}

/* game main loop */
function update() {
	background.paint();
	view.paint();
	CTX.drawImage(CANVAS_BUF,0,0);
	requestAnimFrame(update);
};

/* to execute when the game starts */
init();
