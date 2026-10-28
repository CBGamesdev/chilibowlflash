var CreateInsertCoinScreen = function (u1, u2) {
	var hideInsertCoin_ = false;
	var mustUpdate_ = true;
	var user1_ = u1;
	var user2_ = u2;
	var isDone_ = false;
	var text1_ = null;
	var text1_ = null;
	var capElement_ = null;
	var insertCoinElement_ = null;
	var creditsElement_ = null;
	var creditsTextElement_ = null;
	var parent_ = window.document.getElementById("pnlStage");
	var nbCredits_ = 0;

	var InsertCoinScreen = function () {
	};

	InsertCoinScreen.prototype.resume = function() {};
	InsertCoinScreen.prototype.pause = function () {};
	InsertCoinScreen.prototype.resetKeys = function() {};
	InsertCoinScreen.prototype.init = function() {};

	InsertCoinScreen.prototype.isDone = function() {
		return isDone_;
	};

	InsertCoinScreen.prototype.start = function() {
		game_.showLoading(false);
		isDone_ = false;
		capElement_ = window.document.createElement("div");
		capElement_.className = "capcom";
		capElement_.id = "pnlCapcom";
		parent_.appendChild(capElement_);

		insertCoinElement_ = window.document.createElement("div");
		insertCoinElement_.className = "insert-coin";
		insertCoinElement_.id = "pnlInsertCoin";
		parent_.appendChild(insertCoinElement_);
		centerElement(insertCoinElement_);

		creditsElement_ = window.document.createElement("div");
		creditsElement_.className = "credits";
		creditsElement_.id = "pnlCredits";
		creditsElement_.style.display = "none";
		parent_.appendChild(creditsElement_);
		centerElement(creditsElement_);

		creditsTextElement_ = window.document.createElement("div");
		creditsTextElement_.className = "credits-text";
		creditsTextElement_.id = "pnlCredits";
		creditsTextElement_.style.display = "none";
		parent_.appendChild(creditsTextElement_);

		text1_ = fontSystem_.addText("pnlCredits", "", 432, 555, 0, "font1");
		//text1_.showNow(432);
		var pnlStage = window.document.getElementById("pnlStage");
		spriteLookup_.set(pnlStage, "images/misc/misc/insert-coin.png", true)

		/*
		imageLookup_.getBgB64(capElement_,"images/misc/cap.png");
		imageLookup_.getBgB64(insertCoinElement_,"images/misc/insert.png");
		imageLookup_.getBgB64(creditsTextElement_,"images/misc/credits.png");
		imageLookup_.getBgB64(window.document.getElementById("pnlStage"), "images/misc/insert-coin.png");
		*/
	};

	InsertCoinScreen.prototype.release = function() {
		this.IsDone = true;
		utils_.removeFromDOM(capElement_);
		utils_.removeFromDOM(insertCoinElement_);
		utils_.removeFromDOM(creditsTextElement_);
		utils_.removeFromDOM(creditsElement_);
		window.document.getElementById("pnlStage").style.backgroundImage = "";
	};

	InsertCoinScreen.prototype.kill = function () {
		this.release();
	};

	InsertCoinScreen.prototype.onAddCredit = function () {
		mustUpdate_ = true;
	};

	InsertCoinScreen.prototype.onKeyStateChanged = function (isDown, keyCode, frame) {
		if (!!user1_) {
			if (!!isDown && (keyCode === user1_.Coin))
				this.onAddCredit();
		}
		if (!!user2_) {
			if (!!isDown && (keyCode === user2_.Coin))
				this.onAddCredit();
		}
	};

	InsertCoinScreen.prototype.frameMove = function (frame) {
		if ((!!user1_ && user1_.IsRequestingCharSelect) || (!!user2_ && user2_.IsRequestingCharSelect)) {
			StartCharacterSelection();
			return;
		}

		if ((!!u1 && !user1_.hasCredits()) || (!!user2_ && !user2_.hasCredits())) {
			if (!__debugMode && (frame % 1000) === 0) {
				return game_.startRandomMatch();
			} else if ((frame % 80) === 0) {
				hideInsertCoin_ = false;
				mustUpdate_ = true;
			} else if ((frame % 40) === 0) {
				hideInsertCoin_ = true;
				mustUpdate_ = true;
			}
		}
	};

	InsertCoinScreen.prototype.render = function (frame) {
		if (!!mustUpdate_) {
			mustUpdate_ = false;
			if ((!!user1_ && user1_.hasCredits()) || (!!user2_ && user2_.hasCredits())) {
				capElement_.style.display = "none";
				insertCoinElement_.style.display = "none";
				creditsElement_.style.display = "";
				creditsTextElement_.style.display = "";
				nbCredits_ = Math.min(9, (!!user1_ ? user1_.getNbCredits() : 0) + (!!user2_ ? user2_.getNbCredits() : 0));
				text1_.change(nbCredits_);
			} else {
				if (!!hideInsertCoin_)
					insertCoinElement_.style.display = "none";
				else
					insertCoinElement_.style.display = "";
			}
		}
	};

	return new InsertCoinScreen();
};