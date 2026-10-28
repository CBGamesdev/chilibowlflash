var CreateStoryMode = function() {
	var levelsPassed_ = [false, false, false, false, false, false, false, false];
	var level_ = 0;

	var StoryModeHandler = function() {};

	StoryModeHandler.prototype.incLevel = function() {
		levelsPassed_[level_] = true;
		level_ = this.getLevel();
	};

	StoryModeHandler.prototype.getLevel = function() {
		for (var i = 0; i < levelsPassed_.length; ++i)
			if (!levelsPassed_[i])
				return i;

		return CONSTANTS.MAX_STORY_MODE_LEVEL;
	};

	StoryModeHandler.prototype.getDefeatedOpponentsImgSrc = function (level) {
		if (!!levelsPassed_[level]) {
			switch (level) {
				case 0: {
					return ["images/misc/misc/char-ken-r.png"];
				}
				case 1: {
					return ["images/misc/misc/char-ryu-r.png"];
				}
				case 2: {
					return ["images/misc/misc/char-sagat-r.png"];
				}
				case 3: {
					return ["images/misc/misc/char-mbison-r.png"];
				}
				case 4: {
					return ["images/misc/misc/char-akuma-r.png"];
				}
				case 5: {
					return ["images/misc/misc/char-ken-r.png"];
				}
				case 6: {
					return ["images/misc/misc/char-ryu-r.png"];
				}
				case 7: {
					return ["images/misc/misc/char-mbison-r.png"];
				}
				default: {
					return ["images/misc/misc/question-0.png"];
				}
			}
		}
		return ["images/misc/misc/question-0.png"];
	};

	StoryModeHandler.prototype.getOpponents = function (level) {
		switch (level || level_) {
			case 0: {
				return [CHARACTERS.KEN];
			}
			case 1: {
				return [CHARACTERS.RYU];
			}
			case 2: {
				return [CHARACTERS.SAGAT];
			}
			case 3: {
				return [CHARACTERS.MBISON];
			}
			case 4: {
				return [CHARACTERS.AKUMA];
			}
			case 5: {
				return [CHARACTERS.KEN, CHARACTERS.RYU, CHARACTERS.SAGAT];
			}
			case 6: {
				return [CHARACTERS.RYU, CHARACTERS.SAGAT, CHARACTERS.MBISON];
			}
			case 7: {
				return [CHARACTERS.MBISON, CHARACTERS.SAGAT, CHARACTERS.AKUMA];
			}
			default : {
				return [CHARACTERS.RYU];
			}
		}
	};

	return new StoryModeHandler();
};

var User = function (right, up, left, down, p1, p2, p3, k1, k2, k3, turn, coin, start, gamepadIndex) {
	this.Folder = "";
	this.GamepadIndex = gamepadIndex;
	this.Right = right;
	this.Up = up;
	this.Left = left;
	this.Down = down;
	this.P1 = p1;
	this.P2 = p2;
	this.P3 = p3;
	this.K1 = k1;
	this.K2 = k2;
	this.K3 = k3;
	this.Turn = turn;
	this.Coin = coin;
	this.Start = start;

	this.initialKeys = {
		right: this.Right,
		up: this.Up,
		left: this.Left,
		down: this.Down,
		p1: this.P1,
		p2: this.P2,
		p3: this.P3,
		k1: this.K1,
		k2: this.K2,
		k3: this.K3,
		turn: this.Turn,
		coin: this.Coin,
		start: this.Start
	};

	this.PlayerNdx = 0;
	this.Team = null;
	this.Player = null;
	this.Selected = null;
	this.SelectScreenData = {};
	this.changeCharacterFn = null;
	this.Animations = {};
	this.NbFrames = 0;
	this.SelectIcon = {X: 0, Y: 0, Element: null, StartFrame: 0};
	this.IsCharSelected = false;
	this.Direction = 1;
	this.SelectedCharStance = {X: undefined, Y: undefined, Element: null, StartFrame: 0};

	this.Element = {X: 0, Y: 0, Element: null};
	this.PortriatElement = {X: 0, Y: 0, Element: null};
	this.StanceElement = {X: 0, Y: 0, Element: null};
	this.ShadowElement = {X: 0, Y: 0, Element: null};
	this.NameElement = {X: 0, Y: 0, Element: null};
	this.RandomCharFace = {X: 0, Y: 0, Element: null};
	this.IsInitialized = false;
	this.chooseCharacterFn = null;
	this.getOtherCharacterFn = null;
	this.getOtherIsAlternateFn = null;
	this.RandomSelect = 0;
	this.IsAlternate = false;
	this.IsAI = false;
	this.NbCredits = 9999999;
	this.IsRequestingCharSelect = false;
	this.IsInCharSelect = false;
	this.Wins = 0;
	this.Loses = 0;
	this.Draws = 0;
	this.Score = 0;
	this.IsInStoryMode = false;
	this.ShowSelectIcon = false;
	this.StoryMode = CreateStoryMode();
	this.StoryModeLevel = 0;
	this.ForceAkumaTeamMate = false;
	this.TeamMates = [CHARACTERS.RYU];
};

User.prototype.setTeam = function (value) {
	this.Team = value;
};

User.prototype.getStoryModeLevel = function () {
	return this.StoryModeLevel;
};

User.prototype.enableStoryMode = function () {
	if (!this.IsAI)
		this.IsInStoryMode = true;
	this.StoryModeLevel = this.StoryMode.getLevel();
};

User.prototype.advanceStoryMode = function () {
	if (!this.IsAI) {
		if (!!this.IsInStoryMode)
			this.StoryMode.incLevel();
		else
			this.IsInStoryMode = true;
	}

	this.StoryModeLevel = this.StoryMode.getLevel();
};

User.prototype.disableStoryMode = function () {
	this.IsInStoryMode = false;
	this.StoryModeLevel = this.StoryMode.getLevel();
};

User.prototype.isInStoryMode = function () {
	return this.IsInStoryMode;
};

User.prototype.isAI = function () {
	return this.IsAI;
};

User.prototype.isInCharSelect = function () {
	return this.IsInCharSelect;
};

User.prototype.isCharSelected = function () {
	return this.IsCharSelected;
};

User.prototype.isAlternateChar = function () {
	return this.IsAlternate;
};

User.prototype.hasSelectedPlayer = function () {
	return this.IsCharSelected;
};

User.prototype.onDrawRound = function () {
	++this.Draws;
};

User.prototype.onWonRound = function () {
	++this.Wins;
};

User.prototype.onLostRound = function () {
	++this.Loses;
};

User.prototype.getFolder = function () {
	return this.Folder;
};

User.prototype.getName = function () {
	return this.CurrentStance.replace("_selected", "");
};

User.prototype.getNbCredits = function () {
	return this.NbCredits;
};

User.prototype.reset = function (clearChar) {
	this.IsAlternate = false;
	this.IsAI = false;
	//IsRequestingCharSelect should be set to false in useCredit
	//this.IsRequestingCharSelect = false;
	this.IsInCharSelect = false;
	this.IsCharSelected = false;
	this.Player = null;
	this.Team = null;
	this.IsInStoryMode = false;
	this.ForceAkumaTeamMate = false;
	this.TeamMates = [CHARACTERS.RYU];

	if (!!clearChar) {
		this.Selected = null;
	}
};

User.prototype.hasCredits = function () {
	return !!this.NbCredits;
};

User.prototype.addCredit = function () {
	this.NbCredits = Math.min(this.NbCredits + 1, CONSTANTS.MAX_CREDITS);
};

User.prototype.useCredit = function () {
	if (!this.NbCredits)
		return false;

	this.NbCredits = Math.max(this.NbCredits - 1, 0);
	this.IsRequestingCharSelect = false;
	this.IsInCharSelect = true;
	return true;
};

User.prototype.isRequestingCharSelect = function () {
	return this.IsRequestingCharSelect;
};

User.prototype.getChar = function (ch, isAlternate, isAI) {
	switch (ch) {
		case CHARACTERS.RANDOM1:
		case CHARACTERS.RANDOM2: {
			switch (this.CurrentStance) {
				case "ryu": {
					return CHARACTERS.RYU;
				}
				case "ken": {
					return CHARACTERS.KEN;
				}
				case "sagat": {
					return CHARACTERS.SAGAT;
				}
				case "mbison": {
					return CHARACTERS.MBISON;
				}
				case "akuma": {
					return CHARACTERS.AKUMA;
				}
			}
		}
		default:
			return ch;
	}
};

User.prototype.forceSetChar = function (ch, isAlternate, isAI) {
	this.Selected = ch;
	this.setChar(ch, isAlternate, isAI);
};

User.prototype.resetChar = function (ch, isAlternate, isAI) {
	this.reset();
	this.setChar(ch, isAlternate, isAI);
};

User.prototype.setChar = function (ch, isAlternate, isAI) {
	var name = "";
	if (this.isInStoryMode()) {
		ch = this.getChar(this.Selected);
		isAlternate = this.IsAlternate;
		isAI = this.IsAI;
	}

	switch (ch) {
		case CHARACTERS.KEN: {
			name = "ken";
			break;
		}
		case CHARACTERS.RYU: {
			name = "ryu";
			break;
		}
		case CHARACTERS.SAGAT: {
			name = "sagat";
			break;
		}
		case CHARACTERS.MBISON: {
			name = "mbison";
			break;
		}
		case CHARACTERS.AKUMA: {
			name = "akuma";
			break;
		}

		case CHARACTERS.RANDOM1:
		case CHARACTERS.RANDOM2: {
			switch (this.CurrentStance) {
				case "ryu": {
					return this.setChar(CHARACTERS.RYU, isAlternate, isAI);
				}
				case "ken": {
					return this.setChar(CHARACTERS.KEN, isAlternate, isAI);
				}
				case "sagat": {
					return this.setChar(CHARACTERS.SAGAT, isAlternate, isAI);
				}
				case "mbison": {
					return this.setChar(CHARACTERS.MBISON, isAlternate, isAI);
				}
				case "akuma": {
					return this.setChar(CHARACTERS.AKUMA, isAlternate, isAI);
				}
			}
			;
		}
	}
	this.IsAlternate = isAlternate;
	this.Selected = ch;
	this.CurrentStance = name + "_selected";
	this.Folder = name + (!!isAlternate ? "2" : "");
	this.IsAI = (isAI === undefined) ? this.IsAI : isAI;
	this.IsCharSelected = true;

	//select the current character if we are in one-player mode
	if (this.isInStoryMode()) {
		this.IsCharSelected = true;
		this.onSelectChar();
	}
};

User.prototype.charSelectElementsVisible = function (isVisible) {
	if (!!this.SelectIcon.Element) {
		var state = isVisible ? "" : "none";
		this.SelectIcon.Element.style.display = state;
		this.ShowSelectIcon = isVisible;
		if (state == "none")
			this.RandomCharFace.Element.style.display = "none";
	}
};

User.prototype.release = function () {
	var parentElement = window.document.getElementById("pnlStage");
	utils_.removeFromDOM(this.SelectIcon.Element);
	utils_.removeFromDOM(this.PortriatElement.Element);
	utils_.removeFromDOM(this.Element.Element);
	utils_.removeFromDOM(this.ShadowElement.Element);
	utils_.removeFromDOM(this.NameElement.Element);
	utils_.removeFromDOM(this.SelectedCharStance.Element);
	utils_.removeFromDOM(this.RandomCharFace.Element);
};

User.prototype.init = function (isUser1) {
	this.addStanceAnimations();
	this.SelectIcon.Element = window.document.createElement("div");
	this.SelectIcon.Element.className = "select-icon";
	this.PortriatElement.Element = window.document.createElement("div");
	this.ShadowElement.Element = window.document.createElement("div");
	this.ShadowElement.Element.className = "stance-shadow";
	this.NameElement.Element = window.document.createElement("div");
	this.NameElement.Element.className = "stance-name";
	this.SelectedCharStance.Element = window.document.createElement("div");
	this.Element.Element = window.document.createElement("div");

	var parentElement = window.document.getElementById("pnlStage");
	parentElement.appendChild(this.SelectIcon.Element);
	parentElement.appendChild(this.PortriatElement.Element);
	this.Element.Element.appendChild(this.ShadowElement.Element);
	this.Element.Element.appendChild(this.NameElement.Element);
	this.Element.Element.appendChild(this.SelectedCharStance.Element);

	parentElement.appendChild(this.Element.Element);

	this.RandomCharFace.Element = window.document.createElement("div");
	parentElement.appendChild(this.RandomCharFace.Element);

	//this.IsCharSelected = false;
	//this.IsInCharSelect = false;
	//this.IsRequestingCharSelect = false;


	if (!!isUser1) {
		if (this.Selected === null)
			this.Selected = CHARACTERS.RYU;

		this.Animations["select_icon"] = new BasicAnimation("select_icon", [], true);
		this.Animations["select_icon"].addFrame(this, "|images/misc/misc/p1-select-0.png", 1);
		this.Animations["select_icon"].addFrame(this, "|images/misc/misc/p1-select-1.png", 1);

		this.Element.Element.className = "stance-container-p1";
		this.PortriatElement.Element.className = "select-portriat-p1";
		this.SelectedCharStance.Element.className = "select-stance-p1";
		this.RandomCharFace.Element.className = "select-random-p1";

		//ApplyFlip(this.SelectedCharStance.Element,true);
		ApplyFlip(this.RandomCharFace.Element, true);
		ApplyFlip(this.PortriatElement.Element, true);
	} else {
		if (this.Selected === null)
			this.Selected = CHARACTERS.KEN;

		this.Animations["select_icon"] = new BasicAnimation("select_icon", [], true);
		this.Animations["select_icon"].addFrame(this, "|images/misc/misc/p2-select-0.png", 1);
		this.Animations["select_icon"].addFrame(this, "|images/misc/misc/p2-select-1.png", 1);

		this.Element.Element.className = "stance-container-p2";
		this.PortriatElement.Element.className = "select-portriat-p2";
		this.SelectedCharStance.Element.className = "select-stance-p2";
		this.RandomCharFace.Element.className = "select-random-p2";
	}
};

/*input handler*/
User.prototype.onKeyStateChanged = function (isDown, keyCode, frame) {
	if (!!isDown) {
		if (keyCode == this.Coin) {
			this.addCredit();
			soundManager_.queueSound("audio/misc/credit.zzz");
		} else if (keyCode == this.Start) {
			if (!!this.Player && !this.Player.Ai.isRunning())
				return;

			if (!!this.Player && this.Player.Ai.isRunning()) {
				user1_.reset(true);
				user2_.reset(true);
			}

			if (!!this.hasCredits()) {
				this.IsRequestingCharSelect = true;
				if (game_.gameLoopState() == GAME_STATES.MATCH) {

					if (!this.Player) {
						game_.getMatch().forceQuit(QUIT_MATCH.GOTO_STORYMODE);
						return;
					} else {
						this.IsRequestingCharSelect = false;
					}
				}
			}
		}
	}

	if (game_.gameLoopState() != GAME_STATES.CHAR_SELECT) {
		return;
	} else if (!this.IsInCharSelect) {
		return;
	}

	if (!!isDown) {
		if (!this.IsCharSelected) {
			var direction = null;
			if (keyCode == this.Down) direction = CONSTANTS.DOWN;
			else if (keyCode == this.Up) direction = CONSTANTS.UP;
			else if (keyCode == this.Left) direction = CONSTANTS.LEFT;
			else if (keyCode == this.Right) direction = CONSTANTS.RIGHT;
			else if (keyCode == this.Turn || keyCode == this.P1 || keyCode == this.P2 || keyCode == this.P3 || keyCode == this.K1 || keyCode == this.K2 || keyCode == this.K3) {
				switch (keyCode) {
					case this.Turn:
						this.TeamMates = [CHARACTERS.KEN, CHARACTERS.RYU];
						break;
					case this.P3:
						this.TeamMates = [CHARACTERS.MBISON];
						break;
					case this.K3:
						this.TeamMates = [CHARACTERS.SAGAT];
						break;
					case this.K1:
					case this.K2:
						this.TeamMates = [CHARACTERS.KEN];
						break;
					default :
						this.TeamMates = [CHARACTERS.RYU];
						break;
				}
				if (this.CurrentStance == "ken"
					|| this.CurrentStance == "ryu"
					|| this.CurrentStance == "sagat"
					|| this.CurrentStance == "akuma"
					|| this.CurrentStance == "mbison") {
					this.IsCharSelected = true;
					this.chooseCharacterFn(this);
					this.IsAlternate = (keyCode == this.K1 || keyCode == this.K2 || keyCode == this.K3);

					this.determineIsAternate();

					this.setChar(this.Selected, this.IsAlternate);
				}
			}
			if (!!direction) {
				var sel = this.changeCharacterFn(direction);

				if (!(sel.Row == CONSTANTS.ROW3 && (sel.Col == CONSTANTS.COL1 || sel.Col == CONSTANTS.COL4))) {
					this.RandomSelect = 0;
					this.RandomCharFace.Element.style.display = "none";
				}
				this.showCharacter();
				this.SelectScreenData = sel;
			} else {
				this.onSelectChar();
			}
		}
	}
};

User.prototype.determineIsAternate = function () {
	var isCharOnOtherTeam = this.isCharOnOtherTeamFn();
	var isAltCharOnOtherTeam = this.isAltCharOnOtherTeamFn();

	if (isCharOnOtherTeam && !isAltCharOnOtherTeam) {
		this.IsAlternate = true;
	} else {
		if (!isCharOnOtherTeam)
			this.IsAlternate = this.IsAlternate || false;
		else
			this.IsAlternate = false;
	}
};

User.prototype.onSelectChar = function (direction) {
	if (!!this.IsCharSelected) {
		switch (this.CurrentStance) {
			case "ken_selected":
				this.Selected = CHARACTERS.KEN;
				break;
			case "ryu_selected":
				this.Selected = CHARACTERS.RYU;
				break;
			case "sagat_selected":
				this.Selected = CHARACTERS.SAGAT;
				break;
			case "akuma_selected":
				this.Selected = CHARACTERS.AKUMA;
				break;
			case "mbison_selected":
				this.Selected = CHARACTERS.MBISON;
				break;
		}
		;

		this.Animations[this.CurrentStance].InternalFrame = 0;
	}

};

User.prototype.setPositions = function () {
	switch (this.CurrentStance) {
		case "ryu": {
			this.setPositionValues("7px", "17px", "27px", "0px", 10, 32);
			break;
		}
		case "chunli": {
			this.setPositionValues("7px", "17px", "27px", "0px", 12, 28);
			break;
		}
		case "charlie": {
			this.setPositionValues("7px", "17px", "10px", "0px", 10, 41);
			break;
		}
		case "ken": {
			this.setPositionValues("7px", "17px", "27px", "0px", 10, 32);
			break;
		}
		case "guy": {
			this.setPositionValues("7px", "17px", "27px", "0px", 0, 32);
			break;
		}
		case "birdie": {
			this.setPositionValues("7px", "17px", "27px", "0px", 16, 28);
			break;
		}
		case "sodom": {
			this.setPositionValues("7px", "17px", "10px", "0px", 10, 24);
			break;
		}
		case "adon": {
			this.setPositionValues("7px", "17px", "27px", "0px", 10, 32);
			break;
		}
		case "rose": {
			this.setPositionValues("-3px", "17px", "2px", "0px", -32, 32);
			break;
		}
		case "sagat": {
			this.setPositionValues("7px", "17px", "10px", "0px", 16, 28);
			break;
		}
		case "mbison": {
			this.setPositionValues("7px", "17px", "10px", "0px", -36, 17);
			break;
		}
		case "akuma": {
			this.setPositionValues("7px", "17px", "27px", "0px", 10, 32);
			break;
		}
		case "dan": {
			break;
		}
	}
	;
};

User.prototype.showCharacter = function () {
	switch (this.Selected) {
		case CHARACTERS.RYU: {
			this.CurrentStance = "ryu";
			break;
		}
		case CHARACTERS.CHUNLI: {
			this.CurrentStance = "chunli";
			break;
		}
		case CHARACTERS.CHARLIE: {
			this.CurrentStance = "charlie";
			break;
		}
		case CHARACTERS.KEN: {
			this.CurrentStance = "ken";
			break;
		}
		case CHARACTERS.GUY: {
			this.CurrentStance = "guy";
			break;
		}
		case CHARACTERS.BIRDIE: {
			this.CurrentStance = "birdie";
			break;
		}
		case CHARACTERS.SODOM: {
			this.CurrentStance = "sodom";
			break;
		}
		case CHARACTERS.ADON: {
			this.CurrentStance = "adon";
			break;
		}
		case CHARACTERS.RANDOM1: {
			this.RandomSelect = this.RandomSelect || 1;
			break;
		}
		case CHARACTERS.ROSE: {
			this.CurrentStance = "rose";
			break;
		}
		case CHARACTERS.SAGAT: {
			this.CurrentStance = "sagat";
			break;
		}
		case CHARACTERS.RANDOM2: {
			this.RandomSelect = this.RandomSelect || 1;
			break;
		}
		case CHARACTERS.MBISON: {
			this.CurrentStance = "mbison";
			this.RandomSelect = this.RandomSelect || 1;
			break;
		}
		case CHARACTERS.AKUMA: {
			this.CurrentStance = "akuma";
			this.RandomSelect = this.RandomSelect || 1;
			break;
		}
		case CHARACTERS.DAN: {
			break;
		}
	}
	;

	this.setPositions();

	spriteLookup_.set(this.NameElement.Element, "images/misc/misc/name-" + this.CurrentStance + ".png");
	spriteLookup_.set(this.PortriatElement.Element, "images/misc/misc/p2-select-" + this.CurrentStance + ".png");
	spriteLookup_.set(this.ShadowElement.Element, "images/misc/misc/" + this.CurrentStance + "-shadow.png");

	if (!this.IsCharSelected && !!this.RandomSelect) {
		spriteLookup_.set(this.RandomCharFace.Element, "images/misc/misc/char-" + this.CurrentStance + "-r.png");
	}

};

//Simply returns the count of all of the frames
User.prototype.getNextFrameID = function () {
	return this.NbFrames;
};

//returns the player instance from this user
User.prototype.getPlayer = function() {
	var retVal = null;

	switch (this.Selected) {
		case CHARACTERS.RYU: {
			retVal = createRyu(this);
			break;
		}
		case CHARACTERS.KEN: {
			retVal = createKen(this);
			break;
		}
		case CHARACTERS.SAGAT: {
			retVal = createSagat(this);
			break;
		}
		case CHARACTERS.AKUMA: {
			retVal = createAkuma(this);
			break;
		}
		case CHARACTERS.MBISON: {
			retVal = createMBison(this);
			break;
		}
		/*
		case CHARACTERS.CHUNLI: { retVal = Player.prototype.createChunLi(this); break; }
		case CHARACTERS.CHARLIE: { retVal = Player.prototype.createCharlie(this); break; }
		case CHARACTERS.GUY: { retVal = Player.prototype.createGuy(this); break; }
		case CHARACTERS.BIRDIE: { retVal = Player.prototype.createBirdie(this); break; }
		case CHARACTERS.SODOM: { retVal = Player.prototype.createSodom(this); break; }
		case CHARACTERS.ADON: { retVal = Player.prototype.createAdon(this); break; }
		case CHARACTERS.RANDOM1: { break; }
		case CHARACTERS.ROSE: { retVal = Player.prototype.createRose(this); break; }
		case CHARACTERS.SAGAT: { retVal = Player.prototype.createSagat(this); break; }
		case CHARACTERS.RANDOM2: { break; }
		case CHARACTERS.AKUMA: { retVal = Player.prototype.createAkuma(this); break; }
		case CHARACTERS.DAN: { retVal = Player.prototype.createDan(this); break; }
		*/
	}

	return retVal;
};

User.prototype.setPositionValues = function (shadowX, shadowY, nameX, nameY, stanceX, stanceY) {
	this.show();
	this.ShadowElement.X = shadowX;
	this.ShadowElement.Y = shadowY;
	this.NameElement.X = nameX;
	this.NameElement.Y = nameY;
	this.SelectedCharStance.X = stanceX;
	this.SelectedCharStance.Y = stanceY;
};

//this is just used to hide elements for players that arent implemented
User.prototype.setDisplay = function (show) {
	this.Element.Element.style.display = !!show ? "" : "none";
};

User.prototype.hide = function() {
	this.setDisplay(false);
};

User.prototype.show = function() {
	this.setDisplay(true);
};

//selecting a character
User.prototype.frameMove = function (frame) {};

//renders the users selected items
User.prototype.render = function (frame) {
	if (!this.IsCharSelected && !!this.RandomSelect && (frame % 5 === 0)) {
		this.CurrentStance = CHAR_NAMES[this.RandomSelect - 1];
		this.showCharacter();
		if (++this.RandomSelect > CHAR_NAMES.length)
			this.RandomSelect = 1;
	}

	if (this.PlayerNdx === 1) {
		this.ShadowElement.Element.style.left = this.ShadowElement.X;
		this.ShadowElement.Element.style.bottom = this.ShadowElement.Y;
		this.NameElement.Element.style.left = this.NameElement.X;
		this.NameElement.Element.style.bottom = this.NameElement.Y;
	} else {
		this.ShadowElement.Element.style.right = this.ShadowElement.X;
		this.ShadowElement.Element.style.bottom = this.ShadowElement.Y;
		this.NameElement.Element.style.right = this.NameElement.X;
		this.NameElement.Element.style.bottom = this.NameElement.Y;
	}

	if (!this.IsCharSelected || !!this.ShowSelectIcon) {
		this.Animations["select_icon"].tryRender(frame, this.SelectIcon);
		this.ShowSelectIcon = false;
	}

	if (!!this.Animations[this.CurrentStance]) {
		this.setPositions();
		this.Animations[this.CurrentStance].tryRender(frame, this.SelectedCharStance, this.Direction);
	}
};

User.prototype.addStanceAnimations = function() {
	if (!this.IsInitialized) {
		this.Animations["ryu"] = new BasicAnimation("ryu_stance", [], true);
		this.Animations["ryu"].addFrame(this, "images/misc/misc/ryu-r-stance-0.png", 5);
		this.Animations["ryu"].addFrame(this, "images/misc/misc/ryu-r-stance-1.png", 5);
		this.Animations["ryu"].addFrame(this, "images/misc/misc/ryu-r-stance-2.png", 5);
		this.Animations["ryu"].addFrame(this, "images/misc/misc/ryu-r-stance-3.png", 5);
		this.Animations["ryu"].addFrame(this, "images/misc/misc/ryu-r-stance-2.png", 5);
		this.Animations["ryu"].addFrame(this, "images/misc/misc/ryu-r-stance-1.png", 5);
		this.Animations["ryu_selected"] = new BasicAnimation("ryu_selected", [], true);
		this.Animations["ryu_selected"].addFrame(this, "images/misc/misc/ryu-r-win-2-0.png", 5);
		this.Animations["ryu_selected"].addFrame(this, "images/misc/misc/ryu-r-win-2-1.png", 5);
		this.Animations["ryu_selected"].addFrame(this, "images/misc/misc/ryu-r-win-2-2.png", CONSTANTS.MAX_FRAME);

		this.Animations["ken"] = new BasicAnimation("ken_stance", [], true);
		this.Animations["ken"].addFrame(this, "images/misc/misc/ken-r-stance-0.png", 5);
		this.Animations["ken"].addFrame(this, "images/misc/misc/ken-r-stance-1.png", 5);
		this.Animations["ken"].addFrame(this, "images/misc/misc/ken-r-stance-2.png", 5);
		this.Animations["ken"].addFrame(this, "images/misc/misc/ken-r-stance-3.png", 5);
		this.Animations["ken"].addFrame(this, "images/misc/misc/ken-r-stance-2.png", 5);
		this.Animations["ken"].addFrame(this, "images/misc/misc/ken-r-stance-1.png", 5);
		this.Animations["ken_selected"] = new BasicAnimation("ken_selected", [], true);
		this.Animations["ken_selected"].addFrame(this, "images/misc/misc/ken-r-win-2-0.png", 5);
		this.Animations["ken_selected"].addFrame(this, "images/misc/misc/ken-r-win-2-1.png", 5);
		this.Animations["ken_selected"].addFrame(this, "images/misc/misc/ken-r-win-2-2.png", CONSTANTS.MAX_FRAME);

		this.Animations["akuma"] = new BasicAnimation("akuma_stance", [], true);
		this.Animations["akuma"].addFrame(this, "images/misc/misc/akuma-r-stance-0.png", 5);
		this.Animations["akuma"].addFrame(this, "images/misc/misc/akuma-r-stance-1.png", 5);
		this.Animations["akuma"].addFrame(this, "images/misc/misc/akuma-r-stance-2.png", 5);
		this.Animations["akuma"].addFrame(this, "images/misc/misc/akuma-r-stance-3.png", 5);
		this.Animations["akuma"].addFrame(this, "images/misc/misc/akuma-r-stance-2.png", 5);
		this.Animations["akuma"].addFrame(this, "images/misc/misc/akuma-r-stance-1.png", 5);
		this.Animations["akuma_selected"] = new BasicAnimation("akuma_selected", [], true);
		this.Animations["akuma_selected"].addFrame(this, "images/misc/misc/akuma-selected-0.png", 8).flip();
		this.Animations["akuma_selected"].addFrame(this, "images/misc/misc/akuma-selected-1.png", 8).flip();
		this.Animations["akuma_selected"].addFrame(this, "images/misc/misc/akuma-selected-2.png", 6);
		this.Animations["akuma_selected"].addFrame(this, "images/misc/misc/akuma-selected-3.png", 4);
		this.Animations["akuma_selected"].addFrame(this, "images/misc/misc/akuma-selected-4.png", 4);
		this.Animations["akuma_selected"].addFrame(this, "images/misc/misc/akuma-selected-5.png", 4);
		this.Animations["akuma_selected"].addFrame(this, "images/misc/misc/akuma-selected-6.png", 4);
		this.Animations["akuma_selected"].addFrame(this, "images/misc/misc/akuma-selected-7.png", 4);
		this.Animations["akuma_selected"].addFrame(this, "images/misc/misc/akuma-selected-8.png", 4);
		this.Animations["akuma_selected"].addFrame(this, "images/misc/misc/akuma-selected-9.png", CONSTANTS.MAX_FRAME);

		this.Animations["mbison"] = new BasicAnimation("ken_stance", [], true);
		this.Animations["mbison"].addFrame(this, "images/misc/misc/mbison-r-stance-0.png", 5);
		this.Animations["mbison"].addFrame(this, "images/misc/misc/mbison-r-stance-1.png", 5);
		this.Animations["mbison"].addFrame(this, "images/misc/misc/mbison-r-stance-2.png", 5);
		this.Animations["mbison"].addFrame(this, "images/misc/misc/mbison-r-stance-3.png", 5);
		this.Animations["mbison"].addFrame(this, "images/misc/misc/mbison-r-stance-2.png", 5);
		this.Animations["mbison"].addFrame(this, "images/misc/misc/mbison-r-stance-1.png", 5);
		this.Animations["mbison_selected"] = new BasicAnimation("mbison_selected", [], true);
		this.Animations["mbison_selected"].addFrame(this, "images/misc/misc/mbison-r-win-0-0.png", 5);
		this.Animations["mbison_selected"].addFrame(this, "images/misc/misc/mbison-r-win-0-1.png", 5);
		this.Animations["mbison_selected"].addFrame(this, "images/misc/misc/mbison-r-win-0-2.png", 5);
		this.Animations["mbison_selected"].addFrame(this, "images/misc/misc/mbison-r-win-0-3.png", 5);
		this.Animations["mbison_selected"].addFrame(this, "images/misc/misc/mbison-r-win-0-4.png", 5);
		this.Animations["mbison_selected"].addFrame(this, "images/misc/misc/mbison-r-win-0-5.png", 5);
		this.Animations["mbison_selected"].addFrame(this, "images/misc/misc/mbison-r-win-0-6.png", CONSTANTS.MAX_FRAME);

		this.Animations["sagat"] = new BasicAnimation("sagat_stance", [], true);
		this.Animations["sagat"].addFrame(this, "images/misc/misc/sagat-r-stance-0.png", 5);
		this.Animations["sagat"].addFrame(this, "images/misc/misc/sagat-r-stance-3.png", 5);
		this.Animations["sagat"].addFrame(this, "images/misc/misc/sagat-r-stance-2.png", 5);
		this.Animations["sagat"].addFrame(this, "images/misc/misc/sagat-r-stance-1.png", 5);
		this.Animations["sagat"].addFrame(this, "images/misc/misc/sagat-r-stance-2.png", 5);
		this.Animations["sagat"].addFrame(this, "images/misc/misc/sagat-r-stance-3.png", 5);
		this.Animations["sagat_selected"] = new BasicAnimation("sagat_selected", [], true);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-0.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-1.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-2.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-3.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-4.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-5.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-6.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-7.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-8.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-9.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-10.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-11.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-12.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-13.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-14.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-15.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-16.png", 5);
		this.Animations["sagat_selected"].addFrame(this, "images/misc/misc/sagat-selected-17.png", CONSTANTS.MAX_FRAME);

		this.Animations["guy"] = new BasicAnimation("guy_stance", [], true);
		this.Animations["guy"].addFrame(this, "images/misc/misc/guy-r-stance-0.png", 26);
		this.Animations["guy"].addFrame(this, "images/misc/misc/guy-r-stance-3.png", 15);
		this.Animations["guy"].addFrame(this, "images/misc/misc/guy-r-stance-2.png", 15);
		this.Animations["guy"].addFrame(this, "images/misc/misc/guy-r-stance-1.png", 26);
		this.Animations["guy"].addFrame(this, "images/misc/misc/guy-r-stance-2.png", 15);
		this.Animations["guy"].addFrame(this, "images/misc/misc/guy-r-stance-3.png", 15);

		this.Animations["birdie"] = new BasicAnimation("birdie_stance", [], true);
		this.Animations["birdie"].addFrame(this, "images/misc/misc/birdie-r-stance-0.png", 15);
		this.Animations["birdie"].addFrame(this, "images/misc/misc/birdie-r-stance-1.png", 15);
		this.Animations["birdie"].addFrame(this, "images/misc/misc/birdie-r-stance-2.png", 15);
		this.Animations["birdie"].addFrame(this, "images/misc/misc/birdie-r-stance-3.png", 15);

		this.Animations["chunli"] = new BasicAnimation("chunli_stance", [], true);
		this.Animations["chunli"].addFrame(this, "images/misc/misc/chunli-r-stance-0.png", 10);
		this.Animations["chunli"].addFrame(this, "images/misc/misc/chunli-r-stance-1.png", 10);
		this.Animations["chunli"].addFrame(this, "images/misc/misc/chunli-r-stance-2.png", 10);
		this.Animations["chunli"].addFrame(this, "images/misc/misc/chunli-r-stance-3.png", 10);

		this.Animations["charlie"] = new BasicAnimation("charlie_stance", [], true);
		this.Animations["charlie"].addFrame(this, "images/misc/misc/charlie-r-stance-0.png", 5);
		this.Animations["charlie"].addFrame(this, "images/misc/misc/charlie-r-stance-1.png", 5);
		this.Animations["charlie"].addFrame(this, "images/misc/misc/charlie-r-stance-2.png", 5);
		this.Animations["charlie"].addFrame(this, "images/misc/misc/charlie-r-stance-3.png", 5);
		this.Animations["charlie"].addFrame(this, "images/misc/misc/charlie-r-stance-2.png", 5);
		this.Animations["charlie"].addFrame(this, "images/misc/misc/charlie-r-stance-1.png", 5);

		this.Animations["sodom"] = new BasicAnimation("sodom_stance", [], true);
		this.Animations["sodom"].addFrame(this, "images/misc/misc/sodom-r-stance-0.png", 5);
		this.Animations["sodom"].addFrame(this, "images/misc/misc/sodom-r-stance-1.png", 5);
		this.Animations["sodom"].addFrame(this, "images/misc/misc/sodom-r-stance-2.png", 5);
		this.Animations["sodom"].addFrame(this, "images/misc/misc/sodom-r-stance-3.png", 5);
		this.Animations["sodom"].addFrame(this, "images/misc/misc/sodom-r-stance-4.png", 5);
		this.Animations["sodom"].addFrame(this, "images/misc/misc/sodom-r-stance-5.png", 5);


		this.Animations["adon"] = new BasicAnimation("adon_stance", [], true);
		this.Animations["adon"].addFrame(this, "images/misc/misc/adon-r-stance-0.png", 5);
		this.Animations["adon"].addFrame(this, "images/misc/misc/adon-r-stance-1.png", 5);
		this.Animations["adon"].addFrame(this, "images/misc/misc/adon-r-stance-2.png", 5);
		this.Animations["adon"].addFrame(this, "images/misc/misc/adon-r-stance-3.png", 5);
		this.Animations["adon"].addFrame(this, "images/misc/misc/adon-r-stance-4.png", 5);


		this.Animations["rose"] = new BasicAnimation("rose_stance", [], true);
		this.Animations["rose"].addFrame(this, "images/misc/misc/rose-r-c-stance-0.png", 5);
		this.Animations["rose"].addFrame(this, "images/misc/misc/rose-r-c-stance-1.png", 5);
		this.Animations["rose"].addFrame(this, "images/misc/misc/rose-r-c-stance-2.png", 5);
		this.Animations["rose"].addFrame(this, "images/misc/misc/rose-r-c-stance-3.png", 5);
		this.Animations["rose"].addFrame(this, "images/misc/misc/rose-r-c-stance-4.png", 5);
		this.Animations["rose"].addFrame(this, "images/misc/misc/rose-r-c-stance-5.png", 5);


		this.Animations["random"] = new BasicAnimation("random", [], true);
		this.Animations["random"].addFrame(this, "images/misc/misc/rose-r-c-stance-0.png", 5);
		this.Animations["random"].addFrame(this, "images/misc/misc/adon-r-stance-0.png", 5);
		this.Animations["random"].addFrame(this, "images/misc/misc/sodom-r-stance-0.png", 5);
		this.Animations["random"].addFrame(this, "images/misc/misc/charlie-r-stance-0.png", 5);
		this.Animations["random"].addFrame(this, "images/misc/misc/chunli-r-stance-0.png", 5);
		this.Animations["random"].addFrame(this, "images/misc/misc/birdie-r-stance-0.png", 5);
		this.Animations["random"].addFrame(this, "images/misc/misc/guy-r-stance-0.png", 5);
		this.Animations["random"].addFrame(this, "images/misc/misc/sagat-r-stance-0.png", 5);
		this.Animations["random"].addFrame(this, "images/misc/misc/ken-r-stance-0.png", 5);
		this.Animations["random"].addFrame(this, "images/misc/misc/ryu-r-stance-0.png", 5);
	}

	this.IsInitialized = true;
};


/**
 * Uses the keyboard
 */
User.prototype.useKeyboard = function () {
	this.GamepadIndex = null;
	this.Right = this.initialKeys.right;
	this.Up = this.initialKeys.up;
	this.Left = this.initialKeys.left;
	this.Down = this.initialKeys.down;
	this.P1 = this.initialKeys.p1;
	this.P2 = this.initialKeys.p2;
	this.P3 = this.initialKeys.p3;
	this.K1 = this.initialKeys.k1;
	this.K2 = this.initialKeys.k2;
	this.K3 = this.initialKeys.k3;
	this.Turn = this.initialKeys.turn;
	this.Coin = this.initialKeys.coin;
	this.Start = this.initialKeys.start;

	if (this.Player) {
		this.Player.setButtons(this);
	}
};


/**
 * Uses the gamepad plugged into the first slot
 */
User.prototype.useGamePad = function () {
	this.GamepadIndex = 0;
	this.Right = GAMEPAD.RIGHT;
	this.Up = GAMEPAD.UP;
	this.Left = GAMEPAD.LEFT;
	this.Down = GAMEPAD.DOWN;
	this.P1 = GAMEPAD.LS0;
	this.P2 = GAMEPAD.B3;
	this.P3 = GAMEPAD.B2;
	this.K1 = GAMEPAD.RS0;
	this.K2 = GAMEPAD.B1;
	this.K3 = GAMEPAD.B0;
	this.Turn = GAMEPAD.RS1;
	this.Coin = GAMEPAD.SELECT;
	this.Start = GAMEPAD.START;

	if (this.Player) {
		this.Player.setButtons(this);
	}
};
