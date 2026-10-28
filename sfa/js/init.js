Array.prototype.indexOf = Array.prototype.indexOf || function (value) {
	for (var i = 0, length = this.length; i < length; ++i)
		if (this[i] === value)
			return i;
	return -1;
};

var getRand = function (max) {
	if (max === 0)
		return 0;
	return Math.floor((Math.random() * (max || 100)));
};

var rand = function (min, max) {
	return min + Math.floor((Math.random() * (max - min)));
};

var StageParams = function (key, bg0YOffset, bg1YOffset) {
	this.Key = key;
	this.Name = key;
	this.Bg0YOffset = bg0YOffset || -21;
	this.Bg1YOffset = bg1YOffset || -41;
	this.Bg0Img = "images/misc/stage/" + this.Key + ".back.png";
	this.Bg1Img = "images/misc/stage/" + this.Key + ".front.png";
};

var stages_ = {};
var val = STAGE.MAX_STAGEX - 1152;
stages_["ryu"] = new StageParams("ryu");
stages_["ken"] = new StageParams("ken");
stages_["guy"] = new StageParams("guy");
stages_["chunli"] = new StageParams("chunli");
stages_["dramatic_battle"] = new StageParams("mbison");
stages_["mbison"] = new StageParams("mbison");
stages_["akuma"] = new StageParams("akuma");
stages_["sodom"] = new StageParams("sodom");
stages_["sagat"] = new StageParams("sagat");

function ApplyFlip(element, applied) {
	if (applied === undefined) {
		//reverse
		if ((element.className.indexOf(" flipped") === -1)) {
			element.className += " flipped";
		} else {
			element.className = element.className.replace(" flipped", "");
		}
	} else if (!!applied) {
		element.className += " flipped";
	} else {
		element.className = element.className.replace(" flipped", "");
	}
}

function AutoApplyFlip(element, applied) {
	if (!!applied && (element.className.indexOf(" flipped") === -1)) {
		element.className += " flipped";
	} else if (!applied && (element.className.indexOf(" flipped") !== -1)) {
		element.className = element.className.replace(" flipped", "");
	}
}

function IsFlipped(element) {
	return !!element && element.className.indexOf(" flipped") !== -1;
}

function Alert(text) {
	//if(!!console && !!console.log)
	//console.log(text);

}

function AlertError(text) {
	//if(!!console && !!console.error)
	//    console.error(text);
}

var announcer_ = CreateAnnouncer();
var game_ = CreateGame();
game_.setTeamMode(false);
var fontSystem_ = CreateFontSystem();

var runGameLoop_ = (function (thisValue) {
	return function () {
		thisValue.runGameLoop(thisValue.getCurrentTime());
	}
})(game_);

var runCharSelectLoop_ = (function (thisValue) {
	return function () {
		thisValue.runCharSelectLoop();
	}
})(game_);

var runInsertCoinScreenLoop_ = (function (thisValue) {
	return function () {
		thisValue.runInsertCoinScreenLoop();
	}
})(game_);

var btn = function (button, state, min, max) {
	return {Button: button, State: state, MinNbFrames: min || undefined, MaxNbFrames: max || undefined};
};

//overriden OnStageImagesLoaded function, just incase the images load too slow
function OnStageImagesLoaded() {
	game_.onStageImagesLoaded();
}

//Human users
function InitUsers() {
	delete window.user1_;
	delete window.user2_;
	delete window.user3_;
	delete window.user4_;
	delete window.user5_;
	delete window.user6_;
	delete window.user7_;
	delete window.user8_;

	var val = 10000000;

	window.user1_ = game_.addUser1(KEYS.ARROW_RIGHT, KEYS.ARROW_UP, KEYS.ARROW_LEFT, KEYS.ARROW_DOWN, KEYS.A, KEYS.S, KEYS.D, KEYS.Z, KEYS.X, KEYS.C, KEYS.F, KEYS.CNTRL, KEYS.ENTER);
	// window.user1_ = game_.addUser1(GAMEPAD.RIGHT,GAMEPAD.UP,GAMEPAD.LEFT,GAMEPAD.DOWN,GAMEPAD.LS0,GAMEPAD.B3,GAMEPAD.B2,GAMEPAD.RS0,GAMEPAD.B1,GAMEPAD.B0,GAMEPAD.RS1,GAMEPAD.SELECT,GAMEPAD.START,0);
	window.user2_ = game_.addUser2(KEYS.NUMPAD_6, KEYS.NUMPAD_8, KEYS.NUMPAD_4, KEYS.NUMPAD_5, KEYS.H, KEYS.J, KEYS.K, KEYS.N, KEYS.M, KEYS.COMMA, KEYS.L, KEYS.NUMPAD_7, KEYS.NUMPAD_9);

	val += 100;
	window.user3_ = game_.addUser(val + 11, val + 12, val + 13, val + 14, val + 15, val + 16, val + 17, val + 18, val + 19, val + 20, val + 21);
	val += 100;
	window.user4_ = game_.addUser(val + 11, val + 12, val + 13, val + 14, val + 15, val + 16, val + 17, val + 18, val + 19, val + 20, val + 21);
	val += 100;
	window.user5_ = game_.addUser(val + 11, val + 12, val + 13, val + 14, val + 15, val + 16, val + 17, val + 18, val + 19, val + 20, val + 21);
	val += 100;
	window.user6_ = game_.addUser(val + 11, val + 12, val + 13, val + 14, val + 15, val + 16, val + 17, val + 18, val + 19, val + 20, val + 21);
	val += 100;
	window.user7_ = game_.addUser(val + 11, val + 12, val + 13, val + 14, val + 15, val + 16, val + 17, val + 18, val + 19, val + 20, val + 21);
	val += 100;
	window.user8_ = game_.addUser(val + 11, val + 12, val + 13, val + 14, val + 15, val + 16, val + 17, val + 18, val + 19, val + 20, val + 21);
}

InitUsers();

//Goes to the character selection screen
function StartCharacterSelection() {
	game_.resume();
	game_.startCharSelect();
}

//Goes to the character selection screen
function StartInsertCoin() {
	game_.resume();
	game_.startInsertCoinScreen();
}

function ResetGame() {
	debug_.setPracticeMode(false);
	game_.resetPlayers();
	game_.resume();
	StartInsertCoin();
}

var debug_ = GetDebugInstance(game_);
/*******************************************************************************************************************************/
/*******************************************************************************************************************************/

//preload a bunch of assets

//insert coin
stuffLoader_.queue("insert-coin.js", RESOURCE_TYPES.BASE64AUDIO);
stuffLoader_.queue("char-select.js", RESOURCE_TYPES.BASE64AUDIO);
stuffLoader_.queue("match.js", RESOURCE_TYPES.BASE64AUDIO);

//stuffLoader_.queue("images/misc/misc/insert-coin.png",RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/announcer-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/font1/insert.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/font1/credits.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/font1/cap.png", RESOURCE_TYPES.IMAGE);

//match
stuffLoader_.queue("images/misc/misc/shadow-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/dirt-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/blast-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/bars-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/misc-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/energy-bar-lvl0.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/energy-bar-lvl1.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/energy-bar-lvl2.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/health-bar-life.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/health-bar-damage.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/misc-sprites.png", RESOURCE_TYPES.IMAGE);

//character select
//stuffLoader_.queue("images/misc/misc/player-select.png",RESOURCE_TYPES.IMAGE);
//stuffLoader_.queue("images/misc/font3/name-sprites.png",RESOURCE_TYPES.IMAGE);
//stuffLoader_.queue("images/misc/misc/char-misc-sprites.png",RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/head-sprites.png", RESOURCE_TYPES.IMAGE);
//stuffLoader_.queue("images/misc/misc/player-select-back-bg.png",RESOURCE_TYPES.IMAGE);
//stuffLoader_.queue("images/misc/misc/player-select-bg.png",RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/char-select-sprites.png", RESOURCE_TYPES.IMAGE);
stuffLoader_.queue("images/misc/misc/char-sprites.png", RESOURCE_TYPES.IMAGE);

$$wasAudioInitialized = false;
var $$init = function() {
	if (!$$wasAudioInitialized) {
		var container = document.querySelector(".start-game-container");
		if (container) {
			container.style.display = "none";

			$$wasAudioInitialized = true;
			soundManager_ = CreateSoundManager();

			//preload characters
			Player.prototype.loadAssets("ryu", "ryu", true);
			Player.prototype.loadAssets("ryu", "ryu2", true);
			Player.prototype.loadAssets("ken", "ken", true);
			Player.prototype.loadAssets("ken", "ken2", true);
			Player.prototype.loadAssets("sagat", "sagat", true);
			Player.prototype.loadAssets("sagat", "sagat2", true);
			Player.prototype.loadAssets("mbison", "mbison", true);
			Player.prototype.loadAssets("mbison", "mbison2", true);
			Player.prototype.loadAssets("akuma", "akuma", true);
			Player.prototype.loadAssets("akuma", "akuma2", true);
		}
	}
};

// Needed due to changes in Google Chrome https://goo.gl/7K7WLu
// The user must interact with the page before audio can be played... ugh
var startUpGame = function() {
	$$init();

	game_.startRandomMatch();
}();