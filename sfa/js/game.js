var spnSpeed_ = window.document.getElementById("spnSpeed");
var spnTargetFPS_ = window.document.getElementById("spnTargetFPS");
var spnLag_ = window.document.getElementById("spnLag");
var spnTargetFrames_ = window.document.getElementById("spnTargetFrames");
var spnFrameTime_ = window.document.getElementById("spnFrameTime");
var pnlStage_ = window.document.getElementById("pnlStage");

var GetWidth = function (element) {
	return element.clientWidth;
};

var GetHeight = function (element) {
	return element.clientHeight;
};

var centerElement = function (element) {
	var screenWidth = GetWidth(pnlStage_);

	var w = parseInt(GetWidth(element));
	if (!w) w = 0;
	var diff = (screenWidth - w) / 2;
	element.style.left = diff + "px";
};

var CreateGame = function() {
	var user1_ = null;
	var user2_ = null;
	var users_ = [];
	var frame_ = 0;
	var keyboardState_ = {};
	var buttonState_ = {};
	var lastTime_ = 0;
	var speed_ = CONSTANTS.FAST_SPEED;
	var defaultSpeed_ = speed_;
	var targetFPS_ = CONSTANTS.TARGET_FPS;
	var text_ = null;
	var state_ = 0;
	var isInitialized_ = false;
	var managed_ = null;
	var nextTimeout_ = 0;
	var charSelect_ = null;
	var insertCoinScreen_ = null;
	var pnlLoadingProgress_ = window.document.getElementById("pnlLoadingProgress");
	var pnlLoading_ = window.document.getElementById("pnlLoading");
	var gameLoopState_ = GAME_STATES.INSERT_COIN;
	var start_ = 0;
	var end_ = 0;
	var delta_ = 0;
	var delay_ = 0;
	var match_ = null;
	var maxWinsPerMatch_ = 2;
	var resetSpeedAtFrame_ = 0;
	var enableTeamMode_ = true;
	var difficulty_ = 90; //out of 100
	var standardScreenWidth_ = 768;
	var defaultTeamModeScreenWidth_ = 1068;
	var teamModeScreenWidth_ = defaultTeamModeScreenWidth_;

	var Game = function() {
		lastTime_ = this.getCurrentTime();
		this.initGame();
		match_ = null;
		this.UsingGamepads = !!window.Gamepad && !!Gamepad.supported;
	};

	Game.prototype.getDifficulty = function() {
		return difficulty_;
	};

	Game.prototype.isTeamMode = function() {
		return enableTeamMode_;
	};

	Game.prototype.setTeamMode = function (value) {
		enableTeamMode_ = value;
	};

	Game.prototype.setTeamModeScreenWidth = function (value) {
		if (!!+value && value > 0) {
			teamModeScreenWidth_ = +value || defaultTeamModeScreenWidth_;
		}
	};

	Game.prototype.gameLoopState = function () {
		return gameLoopState_;
	};

	Game.prototype.getMaxWinsPerMatch = function () {
		return maxWinsPerMatch_;
	};

	Game.prototype.getMatch = function () {
		return match_;
	};

	Game.prototype.getCharSelect = function () {
		return charSelect_;
	};

	Game.prototype.getGlobalDamageMultiplier = function () {
		if (!!enableTeamMode_)
			return CONSTANTS.TEAMMODE_DAMAGE_MULTIPLIER;
		return 1;
	};

	Game.prototype.startRandomMatch = function () {
	};

	Game.prototype.startRandomMatch = function () {
		var chars = [CHARACTERS.RYU, CHARACTERS.KEN, CHARACTERS.MBISON, CHARACTERS.SAGAT, CHARACTERS.AKUMA];
		var stages = ["ken", "ryu", "sodom", "dramatic_battle", "akuma", "sagat", "chunli", "guy"];

		var t1 = [2];
		var t2 = [3];

		var p1 = chars.splice(getRand(chars.length), 1)[0];
		var p2 = chars.splice(getRand(chars.length), 1)[0];
		user3_.setChar(p1, false, true);
		user4_.setChar(p2, p1 === p2, true);

		if (!!enableTeamMode_) {
			var p3 = chars.splice(getRand(chars.length), 1)[0];
			var p4 = chars.splice(getRand(chars.length), 1)[0];

			user5_.setChar(p3, (p3 === p1) || (p3 === p2), true);
			user6_.setChar(p4, (p4 === p1) || (p4 === p2) || (p4 === p3), true);

			t1 = [2, 3];
			t2 = [4, 5];

			if (getRand(100) > 80) {
				var p5 = chars[getRand(chars.length)];
				user7_.setChar(p5, (p5 === p1) || (p5 === p2) || (p5 === p3) || (p5 === p4), true);
				t1 = [2, 3, 6];
			}

			if (getRand(100) > 80) {
				var p6 = chars[getRand(chars.length)];
				user8_.setChar(p6, (p6 === p1) || (p6 === p2) || (p6 === p3) || (p6 === p4) || (p6 === p5), true);
				t2 = [4, 5, 7];
			}
		}


		var stage = stages_[stages[getRand(stages.length)]];

		this.startMatch(false, t1, t2, stage)
	};

	Game.prototype.onAudioLoading = function () {
		this.addState(GAME_STATES.AUDIO_LOADING);
		if (!this.isPaused()) {
			this.pause();
		}
	};

	Game.prototype.onAudioDoneLoading = function () {
		this.removeState(GAME_STATES.AUDIO_LOADING);
		if (this.isPaused()) {
			this.resume();
		}
	};

	Game.prototype.isGameOver = function () {
		return frame_ >= CONSTANTS.MAX_FRAME;
	};

	Game.prototype.addManagedText = function (elementId, x, y, fontPath, isLeft) {
		return fontSystem_.addText(elementId, "", x, y, 0, fontPath, isLeft);
	}

	Game.prototype.setSpeed = function (value) {
		speed_ = value;
		resetSpeedAtFrame_ = CONSTANTS.UBER_FRAME_MAX;
		this.showSpeed();
	};

	Game.prototype.setDefaultSpeed = function (value) {
		defaultSpeed_ = value;
		resetSpeedAtFrame_ = CONSTANTS.UBER_FRAME_MAX;
		this.showSpeed();
	};

	Game.prototype.resetDefaultSpeed = function () {
		defaultSpeed_ = CONSTANTS.FAST_SPEED;

		this.resetSpeed();
	};

	Game.prototype.resetSpeed = function () {
		speed_ = defaultSpeed_;
		resetSpeedAtFrame_ = CONSTANTS.UBER_FRAME_MAX;
		this.showSpeed();
	};

	Game.prototype.goSlow = function (nbFrames, value) {
		if (speed_ !== value) {
			value = value || CONSTANTS.SLOW_SPEED;

			speed_ = value;
			if (!!nbFrames) {
				resetSpeedAtFrame_ = frame_ + nbFrames;
			}
		}
		this.showSpeed();
	};

	Game.prototype.getSpeed = function () {
		return speed_;
	};

	Game.prototype.getCurrentFrame = function () {
		return frame_;
	};

	Game.prototype.resetFrame = function () {
		frame_ = 0;
	};

	Game.prototype.getCurrentTime = function () {
		if (!!Date.now)
			return Date.now();
		else
			return (new Date() - new Date(0));
	};

	Game.prototype.hasState = function (flag) {
		return (flag & state_) > 0
	};

	Game.prototype.addState = function (flag) {
		state_ |= flag;
	};

	Game.prototype.toggleState = function (flag) {
		state_ ^= flag;
	};

	Game.prototype.removeState = function (flag) {
		state_ = (state_ | (flag)) ^ (flag);
	};

	Game.prototype.onStageImagesLoaded = function () {
		if (!!match_)
			match_.getStage().init();
	};

	Game.prototype.releaseText = function () {
		fontSystem_.reset();
		text_ = fontSystem_.addText("pnlText", "");
	};

	Game.prototype.resetKeys = function () {
		keyboardState_ = {};
		if (!!managed_)
			managed_.resetKeys();
	};

	Game.prototype.initGame = function () {
		centerScreen();
	};

	Game.prototype.init = function () {
		if (!isInitialized_) {
			var getKeyPressHandler = function (thisValue, isDown) {
				return function (e) {
					thisValue.handleKeyPress(e, isDown);
				}
			}

			var resetKeys = function (thisValue) {
				return function (e) {
					thisValue.resetKeys();
				}
			}

			if (!!window.document.attachEvent) {
				window.document.attachEvent("onkeydown", getKeyPressHandler(this, true), true);
				window.document.attachEvent("onkeyup", getKeyPressHandler(this, false), true);
				window.attachEvent("onblur", resetKeys(this), true);
				window.onblur = resetKeys(this);
			} else {
				window.document.addEventListener("keydown", getKeyPressHandler(this, true), true);
				window.document.addEventListener("keyup", getKeyPressHandler(this, false), true);
				window.addEventListener("onblur", resetKeys(this), true);
				window.onblur = resetKeys(this);
			}
		}
		isInitialized_ = true;

	};

	Game.prototype.preloadTextImages = function () {
		if (!!isInitialized_)
			return;
		fontSystem_.preload();
	};

	Game.prototype.showElements = function () {
		window.document.getElementById("pnlTeam1").style.display = "";
		window.document.getElementById("pnlTeam2").style.display = "";
		window.document.getElementById("bg0").style.display = "";
		window.document.getElementById("bg1").style.display = "";
	};

	Game.prototype.hideElements = function () {
		window.document.getElementById("pnlTeam1").style.display = "none";
		window.document.getElementById("pnlTeam2").style.display = "none";
		window.document.getElementById("bg0").style.display = "none";
		window.document.getElementById("bg1").style.display = "none";
	};

	Game.prototype.startMatch = function (matchState, teamAIndexes, teamBIndexes, stage, callback) {

		if (teamAIndexes.length + teamBIndexes.length > 3) {
			STAGE.MAX_STAGEX = teamModeScreenWidth_;
		} else {
			STAGE.MAX_STAGEX = standardScreenWidth_;
		}

		this.resetGameData();
		gameLoopState_ = GAME_STATES.MATCH;

		var teamA = teamAIndexes.map(function (i) {
			return users_[i];
		});
		var teamB = teamBIndexes.map(function (i) {
			return users_[i];
		});

		var fn = function (thisValue) {
			return function () {
				thisValue.createMatch(teamA, teamB, stage, callback);
				thisValue.getMatch().setState(matchState);
			}
		}

		charSelect_ = charSelect_ || CreateCharSelect();
		charSelect_.loadUserAssets(teamA);
		charSelect_.loadUserAssets(teamB);

		this.startLoading(null, fn(this));
		this.resume();
	};

	Game.prototype.createMatch = function (teamA, teamB, stage, callback) {
		gameLoopState_ = GAME_STATES.MATCH;
		var a = null;
		var b = null;

		if (!!charSelect_) {
			a = charSelect_.getPlayers(teamA);
			b = charSelect_.getPlayers(teamB);
			stage = stage || charSelect_.getStage();

			charSelect_.release();
		}

		match_ = CreateMatch(a, b, stage);
		managed_ = match_;
		announcer_.setMatch(match_);
		this.showElements();


		this.go(this.runGameLoop, callback);
	};

	Game.prototype.getFirstUserForCharSelect = function () {
		if (users_.length > 0 && users_[0].isRequestingCharSelect())
			return users_[0];
		return null;
	};

	Game.prototype.getSecondUserForCharSelect = function () {
		for (var i = 1; i < users_.length; ++i)
			if (users_[i].isRequestingCharSelect())
				return users_[i];
		return users_[1];
	};

	Game.prototype.startCharSelect = function () {
		pnlStage_.style.width = STAGE.STANDARD_WIDTH + "px";

		this.resetGameData();
		gameLoopState_ = GAME_STATES.CHAR_SELECT;
		charSelect_ = CreateCharSelect(users_);
		managed_ = charSelect_;

		this.go(this.runCharSelectLoop);
	};

	Game.prototype.startInsertCoinScreen = function () {
		pnlStage_.style.width = STAGE.STANDARD_WIDTH + "px";

		this.resetGameData();
		gameLoopState_ = GAME_STATES.INSERT_COIN;
		insertCoinScreen_ = CreateInsertCoinScreen(user1_, user2_);
		managed_ = insertCoinScreen_;
		this.go(this.runInsertCoinScreenLoop);
	};

	Game.prototype.go = function (loopFn, callback) {
		this.init();
		this.preloadTextImages();
		centerScreen();
		isInitialized_ = true;
		this.resetFrame();
		this.startLoading(loopFn, callback);
	};

	Game.prototype.showLoading = function (show) {
		if (!!show) {
			pnlLoadingProgress_.style.display = "";
			pnlLoading_.className = "loading";
		} else {
			pnlLoadingProgress_.style.display = "none";
			pnlLoading_.innerHTML = "done";
			pnlLoading_.className = "done-loading";
		}
	};

	Game.prototype.startLoading = function (loopFn, callback) {
		this.showLoading(true);
		var createClosure = function (thisRef, fn1, fn2) {
			return function () {
				thisRef.onDoneLoading(fn1, fn2);
			}
		};

		stuffLoader_.start(this.onProgress, createClosure(this, loopFn, callback), this);
	};

	Game.prototype.onDoneLoading = function (runLoopFn, callback) {
		if (!!runLoopFn) {
			managed_.start();
			runLoopFn.call(this);
		}
		if (!!callback)
			callback();
	};

	Game.prototype.onProgress = function (nbRemaining) {
		if (!nbRemaining)
			pnlLoading_.innerHTML = "done";
		else
			pnlLoading_.innerHTML = nbRemaining;
	};

	Game.prototype.resetPlayers = function () {
		for (var i = 0; i < users_.length; ++i) {
			users_[i].disableStoryMode();
			users_[i].reset();
		}
	};

	Game.prototype.resetGameData = function () {
		gameLoopState_ = GAME_STATES.NONE;
		soundManager_.reset();
		this.hideElements();
		this.stop();
		this.releaseText();
		announcer_.release();
		this.resetSpeed();
		if (!!charSelect_)
			charSelect_.release();
		if (!!match_)
			match_.release();
		if (!!insertCoinScreen_)
			insertCoinScreen_.release();
	};

	Game.prototype.speedUp = function () {
		if (speed_ > CONSTANTS.MIN_DELAY)
			speed_ = Math.max(speed_ - CONSTANTS.SPEED_INCREMENT, 0);

		if (defaultSpeed_ > CONSTANTS.MIN_DELAY)
			defaultSpeed_ = Math.max(defaultSpeed_ - CONSTANTS.SPEED_INCREMENT, 0);

		this.showSpeed();

	};

	Game.prototype.slowDown = function () {
		if (speed_ < CONSTANTS.MAX_DELAY)
			speed_ = Math.min(speed_ + CONSTANTS.SPEED_INCREMENT, 100);

		if (defaultSpeed_ < CONSTANTS.MAX_DELAY)
			defaultSpeed_ = Math.min(defaultSpeed_ + CONSTANTS.SPEED_INCREMENT, 100);

		this.showSpeed();

	};

	Game.prototype.isPaused = function () {
		return this.hasState(GAME_STATES.PAUSED);
	};

	Game.prototype.quickPause = function () {
		this.addState(GAME_STATES.PAUSED);
		this.addState(GAME_STATES.STEP_FRAME);
		if (!!this.hasState(GAME_STATES.AUDIO_LOADING)) {
			window.document.getElementById("spnState").innerHTML = "State: <span class=\"audio-loading\">Loading...</span>";
			pnlStage_.style.opacity = 0;
		} else {
			window.document.getElementById("spnState").innerHTML = "State: <span>Frame by frame</span>";
		}

		window.document.getElementById("spnState").className = "state paused";
		window.document.getElementById("spnStepFrame").className = "state running";
		window.document.getElementById("spnResume").className = "state running";
	};

	Game.prototype.pause = function () {
		this.quickPause();
		if (!!managed_)
			managed_.pause();
		soundManager_.pauseAll();
	};

	Game.prototype.resume = function () {
		this.removeState(GAME_STATES.PAUSED);
		pnlStage_.style.opacity = 1;
		window.document.getElementById("spnState").innerHTML = "State: <span>Running</span>";
		window.document.getElementById("spnState").className = "state running";
		window.document.getElementById("spnStepFrame").className = "";
		window.document.getElementById("spnResume").className = "";
		if (!!managed_)
			managed_.resume();
		soundManager_.resumeAll();
	};

	Game.prototype.wasKeyPressed = function (key, keyCode, isDown) {
		return (keyCode === key && !!keyboardState_["_" + key] && !isDown)
	};

	Game.prototype.handleGamePadHelper = function (pad, key) {
		var button = pad[key];
		if (!!button && (button.pressed !== !!keyboardState_["_" + key])) {
			if (!!managed_) {
				this.handleKeyPress({which: key}, button.pressed);
			}
		}
	};

	Game.prototype.handleGamePadButtonPresses = function () {
		if (!!this.UsingGamepads) {
			for (var i = 0, length = users_.length; i < length; ++i) {
				if (users_[i].GamepadIndex !== undefined) {
					var pad = Gamepad.getState([users_[i].GamepadIndex]);
					if (!!pad) {
						this.handleGamePadHelper(pad, GAMEPAD.DOWN);
						this.handleGamePadHelper(pad, GAMEPAD.LEFT);
						this.handleGamePadHelper(pad, GAMEPAD.RIGHT);
						this.handleGamePadHelper(pad, GAMEPAD.UP);
						this.handleGamePadHelper(pad, GAMEPAD.B0);
						this.handleGamePadHelper(pad, GAMEPAD.B1);
						this.handleGamePadHelper(pad, GAMEPAD.B2);
						this.handleGamePadHelper(pad, GAMEPAD.B3);
						this.handleGamePadHelper(pad, GAMEPAD.LS0);
						this.handleGamePadHelper(pad, GAMEPAD.LS1);
						this.handleGamePadHelper(pad, GAMEPAD.RS0);
						this.handleGamePadHelper(pad, GAMEPAD.RS1);
						this.handleGamePadHelper(pad, GAMEPAD.START);
						this.handleGamePadHelper(pad, GAMEPAD.SELECT);
					}
				}
			}
		}
	};

	Game.prototype.handleKeyPress = function (e, isDown) {
		var keyCode = e.which || e.keyCode;
		//Alert(keyCode);


		if (!this.hasState(GAME_STATES.AUDIO_LOADING)) {
			if (this.wasKeyPressed(KEYS.O, keyCode, isDown)) {
				this.pause();
			}
			if (this.wasKeyPressed(KEYS.P, keyCode, isDown)) {
				this.resume();
			}
		}

		if (this.wasKeyPressed(KEYS.ESCAPE, keyCode, isDown)) {
			frame_ = CONSTANTS.MAX_FRAME + 1;
			this.end();
		}

		if (this.wasKeyPressed(KEYS.EIGHT, keyCode, isDown))
			this.speedUp();
		if (this.wasKeyPressed(KEYS.NINE, keyCode, isDown))
			this.slowDown();
		if (this.wasKeyPressed(KEYS.ZERO, keyCode, isDown))
			this.resetDefaultSpeed();

		keyboardState_["_" + keyCode] = isDown;

		if (isDown) {
			if (!buttonState_["_" + keyCode])
				buttonState_["_" + keyCode] = BUTTON_STATE.JUST_PRESSED;
			else
				buttonState_["_" + keyCode] = BUTTON_STATE.STILL_PRESSED;
		} else {
			buttonState_["_" + keyCode] = BUTTON_STATE.JUST_RELEASED;
		}

		if (!!this.hasState(GAME_STATES.AUDIO_LOADING))
			return;

		if (!!managed_ && !!managed_.onKeyStateChanged) {
			managed_.onKeyStateChanged(isDown, keyCode, frame_);
			for (var i = 0; i < users_.length; ++i)
				users_[i].onKeyStateChanged(isDown, keyCode, frame_);
		}
	};

	Game.prototype.handleInput = function() {
		for (var i in buttonState_)
			if (buttonState_[i] === BUTTON_STATE.JUST_RELEASED)
				buttonState_[i] = BUTTON_STATE.NONE;

		this.handleGamePadButtonPresses();
	};

	Game.prototype.end = function () {
		this.releaseText();
		this.resetKeys();
		if (!!managed_) {
			managed_.kill()
		}
		managed_ = null;
		announcer_.release();
		this.stop();
	};

	Game.prototype.setUser1 = function (user) {
		user1_ = user;
	};

	Game.prototype.setUser2 = function (user) {
		user2_ = user;
	};

	Game.prototype.addUser1 = function (right, up, left, down, p1, p2, p3, k1, k2, k3, turn, coin, start, gamepad) {
		user1_ = this.addUser(right, up, left, down, p1, p2, p3, k1, k2, k3, turn, coin, start, gamepad);
		return user1_;
	};

	Game.prototype.addUser2 = function (right, up, left, down, p1, p2, p3, k1, k2, k3, turn, coin, start, gamepad) {
		user2_ = this.addUser(right, up, left, down, p1, p2, p3, k1, k2, k3, turn, coin, start, gamepad);
		return user2_;
	};

	Game.prototype.addUser = function (right, up, left, down, p1, p2, p3, k1, k2, k3, turn, coin, start, gamepad) {
		var user = null;
		if (gamepad !== undefined)
			user = this.addGamepadUser(right, up, left, down, p1, p2, p3, k1, k2, k3, turn, coin, start, gamepad);
		else
			user = new User(right, up, left, down, p1, p2, p3, k1, k2, k3, turn, coin, start);

		users_.push(user);
		return user;
	};

	Game.prototype.addGamepadUser = function (right, up, left, down, p1, p2, p3, k1, k2, k3, turn, coin, start, gamepad) {
		return new User(right, up, left, down, p1, p2, p3, k1, k2, k3, turn, coin, start, gamepad);
	};

	Game.prototype.clearUsers = function () {
		var length = users_.length;
		for (var i = 0; i < length; ++i)
			delete users_[i];
		users_ = [];
	};

	Game.prototype.showSpeed = function () {
		spnSpeed_.innerHTML = (100 - speed_) >> 0;
	};

	Game.prototype.showFPS = function () {
		//if(frame_ % targetFPS_ == 0)
		//{
		//    var now = this.getCurrentTime();
		//    var elapsed = now - lastTime_;
		//    spnFPS_.innerHTML = now - lastTime_;
		//    lastTime_ = now;

		//var fps = Math.floor(CONSTANTS.FPS_VALUE / elapsed);
		//spnFPS_.innerHTML = fps;
		//}
	};

	Game.prototype.stop = function () {
		window.clearTimeout(nextTimeout_);
		nextTimeout_ = null;
	};

	Game.prototype.clearAIUsers = function () {

	};

	Game.prototype.runGameLoop = function (start) {
		this.handleInput();
		if (!this.hasState(GAME_STATES.PAUSED) || this.hasState(GAME_STATES.STEP_FRAME)) {
			this.removeState(GAME_STATES.STEP_FRAME);
			++frame_;
			if (resetSpeedAtFrame_ < frame_) {
				resetSpeedAtFrame_ = CONSTANTS.UBER_FRAME_MAX;
				speed_ = defaultSpeed_;
				this.showSpeed();
			}

			//pre fame move
			match_.preFrameMove(frame_);

			match_.frameMove(frame_);
			if (!match_.mustQuit()) {
				announcer_.frameMove(frame_);
				soundManager_.frameMove(frame_);
				if (!match_.isSuperMoveActive())
					fontSystem_.frameMove(frame_);

				//pre render
				match_.preRender(frame_);

				//render
				match_.render(frame_);
				if (!match_.isSuperMoveActive())
					fontSystem_.render(frame_);
				announcer_.render(frame_);
				soundManager_.render(frame_);

				//done
				match_.renderComplete(frame_);
				this.showFPS();
			}
		}

		if (match_.mustQuit()) {
			switch (match_.getQuitReason()) {
				case QUIT_MATCH.GOTO_STORYMODE: {
					this.startCharSelect();
					break;
				}
				default: {
					this.startInsertCoinScreen();
					break;
				}
			}
		} else if (!match_.isMatchOver(frame_)) {
			if (gameLoopState_ != GAME_STATES.MATCH)
				return;

			end_ = this.getCurrentTime();
			delta_ = end_ - start;
			delay_ = delta_ > speed_ ? 0 : speed_ - delta_;

			//nextTimeout_ = window.requestAnimFrame(runGameLoop_,speed_);
			nextTimeout_ = window.setTimeout(runGameLoop_, delay_);
		} else {
			window.clearTimeout(nextTimeout_);
			match_.handleMatchOver(frame_);
		}
	};

	Game.prototype.runInsertCoinScreenLoop = function () {
		this.handleInput();
		if (!this.hasState(GAME_STATES.PAUSED) || this.hasState(GAME_STATES.STEP_FRAME)) {
			this.removeState(GAME_STATES.STEP_FRAME);
			++frame_;
			insertCoinScreen_.frameMove(frame_);
			soundManager_.frameMove(frame_);
			fontSystem_.frameMove(frame_);


			insertCoinScreen_.render(frame_);
			soundManager_.render(frame_);
			fontSystem_.render(frame_);
			this.showFPS();
		}

		if (!insertCoinScreen_.isDone(frame_)) {
			if (gameLoopState_ != GAME_STATES.INSERT_COIN)
				return;
			//nextTimeout_ = window.requestAnimFrame(runInsertCoinScreenLoop_,speed_);
			nextTimeout_ = window.setTimeout(runInsertCoinScreenLoop_, speed_);
		} else {
			match_.handleMatchOver(frame_);
		}
	};

	Game.prototype.runCharSelectLoop = function () {
		if (!!charSelect_) {
			this.handleInput();
			if (!this.hasState(GAME_STATES.PAUSED) || this.hasState(GAME_STATES.STEP_FRAME)) {
				this.removeState(GAME_STATES.STEP_FRAME);
				++frame_;
				charSelect_.frameMove(frame_);
				soundManager_.frameMove(frame_);

				if (!!charSelect_.IsDone && (frame_ >= charSelect_.getDelayAfterSelect())) {
					managed_ = null;
					this.startMatch(false, charSelect_.getTeamA(), charSelect_.getTeamB(), charSelect_.getStage());
				}
				charSelect_.render(frame_);
				soundManager_.render(frame_);
				this.showFPS();
			}

			if (!this.isGameOver()) {
				if (gameLoopState_ != GAME_STATES.CHAR_SELECT)
					return;
				//nextTimeout_ = window.requestAnimFrame(runCharSelectLoop_,speed_);

				nextTimeout_ = window.setTimeout(runCharSelectLoop_, speed_);
			} else {
				Alert("user aborted.");
			}
		}
	};

	return new Game();
};

window.requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 30);
		};
})();