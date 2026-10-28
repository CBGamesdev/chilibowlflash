var QuickMatchConfiguratorWindow = function (fn) {
	var team1Container = window.document.querySelector("#pnlTeam1PlayerSelectors");
	var team2Container = window.document.querySelector("#pnlTeam2PlayerSelectors");
	var stageSelectContainer = window.document.querySelector(".debug-qm-stage-selector");
	var cmdAddPlayerSelectorTeam1 = window.document.querySelector("#cmdAddPlayerSelectorTeam1");
	var cmdAddPlayerSelectorTeam2 = window.document.querySelector("#cmdAddPlayerSelectorTeam2");
	var cmdRemovePlayerSelectorTeam1 = window.document.querySelector("#cmdRemovePlayerSelectorTeam1");
	var cmdRemovePlayerSelectorTeam2 = window.document.querySelector("#cmdRemovePlayerSelectorTeam2");
	var team1Desc = window.document.querySelector("#team1Desc");
	var team2Desc = window.document.querySelector("#team2Desc");
	var stageDesc = window.document.querySelector("#stageDesc");
	var cmdStartQuickMatch = window.document.querySelector("#cmdStartQuickMatch");
	var cmdStartPracticeMatch = window.document.querySelector("#cmdStartPracticeMatch");
	var stageSelector;
	var closeModalFn = fn;

	// these 3 will be used to start the match
	var selectedTeam1 = [];
	var selectedTeam2 = [];
	var selectedStage = "guy";

	var playableChars = [
		CHARACTERS.RYU,
		CHARACTERS.KEN,
		CHARACTERS.SAGAT,
		CHARACTERS.MBISON,
		CHARACTERS.AKUMA
	];
	var stages = ["guy", "ken", "ryu", "sodom", "akuma", "sagat", "chunli", "dramatic_battle"];
	var getCharName = function (charId) {
		switch (+charId) {
			case CHARACTERS.AKUMA: return "AKUMA";
			case CHARACTERS.MBISON: return "MBISON";
			case CHARACTERS.SAGAT: return "SAGAT";
			case CHARACTERS.KEN: return "KEN";
			case CHARACTERS.RYU: return "RYU";
			default: return "--";
		}
	};

	/**
	 * Initializes the match configurator
	 */
	this.init = function () {
		var self = this;
		// add the stages
		stageSelector = window.document.createElement("select");
		for (var i = 0; i < stages.length; i += 1) {
			var option = window.document.createElement("option");
			option.text = stages[i];
			option.value = stages[i];
			stageSelector.add(option);
		}

		stageSelectContainer.appendChild(stageSelector);
		stageSelector.addEventListener("change", function () { self.handleQuickMatchChanged(); });

		// add the player selectors
		this.addPlayerSelect(team1Container, CHARACTERS.KEN);
		this.addPlayerSelect(team1Container, CHARACTERS.RYU);
		this.addPlayerSelect(team2Container, CHARACTERS.MBISON);
		stageSelector.selectedIndex = 7;

		// set the button click handlers
		cmdAddPlayerSelectorTeam1.addEventListener("click", function () { self.addPlayerSelect(team1Container, CHARACTERS.RYU); });
		cmdAddPlayerSelectorTeam2.addEventListener("click", function () { self.addPlayerSelect(team2Container, CHARACTERS.KEN); });

		cmdRemovePlayerSelectorTeam1.addEventListener("click", function () { self.removePlayerSelect(team1Container); });
		cmdRemovePlayerSelectorTeam2.addEventListener("click", function () { self.removePlayerSelect(team2Container); });

		cmdStartQuickMatch.addEventListener("click", function () { self.startQuickMatch(true); });
		cmdStartPracticeMatch.addEventListener("click", function () { self.startQuickMatch(false); });

		this.handleQuickMatchChanged();
	};

	/**
	 * Starts the match
	 */
	this.startQuickMatch = function (enableAI) {
		// the next line is just to ensure we have the latest values
		this.handleQuickMatchChanged(enableAI);

		// start the match
		debug_.practice(selectedTeam1, selectedTeam2, selectedStage);
		if (enableAI) {
			__noDamage = false;
		}

		closeModalFn();
	}

	/**
	 * Injects a player selector into the passed in target
	 * @param target - the container that will get the player selector injected
	 * @param selectedChar - the default selected character
	 */
	this.addPlayerSelect = function (target, selectedChar) {
		if (target.children.length > 2) {
			return;
		}

		var self = this;
		var playerSelect = window.document.createElement("select");
		playerSelect.className = "player-selector";
		var selectedIndex = null;
		for (var i = 0; i < playableChars.length; i += 1) {
			var option = window.document.createElement("option");
			option.text = getCharName(playableChars[i]);
			option.value = playableChars[i];
			playerSelect.add(option);
			if (playableChars[i] === selectedChar) {
				selectedIndex = i;
				option.selected = true;
			}

			var optionAlt = window.document.createElement("option");
			optionAlt.text = getCharName(playableChars[i]) + " (alt. color)";
			optionAlt.value = playableChars[i];
			optionAlt.setAttribute("data-alt", "1");
			playerSelect.add(optionAlt);
		}

		target.appendChild(playerSelect);

		if (selectedIndex !== null) {
			target.selectedIndex = selectedIndex;
		}

		playerSelect.addEventListener("change", function () { self.handleQuickMatchChanged() });

		this.handleQuickMatchChanged();
	};

	/**
	 * Adds a player select row
	 */
	this.addPlayerSelectRow = function () {
		this.addPlayerSelect(team1Container, -1);
		this.addPlayerSelect(team2Container, -1);
	};

	/**
	 * Removes a player selector
	 * @param target - the container with the player selector
	 */
	this.removePlayerSelect = function (target) {
		if (target.childNodes.length > 1) {
			target.removeChild(target.lastChild);
		}
		this.handleQuickMatchChanged();
	};

	/**
	 * Just a helper function to reduce duplicate code
	 * @param playerSelectContainer
	 * @param myTeam
	 * @param enableAI
	 */
	var getTeam = function (playerSelectContainer, myTeam, enableAI) {
		var teamDesc = "";
		var teamPlayers = [];
		var isAI = !myTeam;
		for (var i = 0; i < playerSelectContainer.children.length; i += 1) {
			var select = playerSelectContainer.children[i];
			var selectedOption = select.options[select.selectedIndex]
			var charId = +selectedOption.value;
			var color = +selectedOption.getAttribute("data-alt") || 0;
			teamPlayers.push({A: charId, B: color, C: isAI && enableAI});
			isAI = true;
			teamDesc += getCharName(charId) + ", ";
		}
		return {
			teamPlayers: teamPlayers,
			desc: teamDesc.length > 1 ? teamDesc.substr(0, teamDesc.length - 2) : "???"
		};
	}

	/**
	 * Any change will trigger this method. It will update the quick match params
	 * @param enableAI
	 */
	this.handleQuickMatchChanged = function (enableAI) {
		// get team 1
		var t1 = getTeam(team1Container, true, !!enableAI);
		team1Desc.innerText = t1.desc;
		selectedTeam1 = t1.teamPlayers;

			// get team 2
		var t2 = getTeam(team2Container, false, !!enableAI);
		team2Desc.innerText = t2.desc;
		selectedTeam2 = t2.teamPlayers;

		var selectedStageOption = stageSelector.options[stageSelector.selectedIndex];
		selectedStage = selectedStageOption ? selectedStageOption.value : "guy";
		stageDesc.innerText =  "(stage: " + selectedStage + ")";
	}

	this.init();
};

var ProjectileEditorWindow = function () {
	var pnlProjectileData = window.document.querySelector("#pnlProjectileData");
	var cmdLoadProjectiles = window.document.querySelector("#cmdLoadProjectiles");
	var ddlProjectiles = window.document.querySelector("#ddlProjectiles");
	var txtProjectileName = window.document.querySelector("#txtProjectileName");
	var chkCanJuggle = window.document.querySelector("#chkCanJuggle");
	var txtProjectileMaxHits = window.document.querySelector("#txtProjectileMaxHits");
	var txtProjectileHitDelay = window.document.querySelector("#txtProjectileHitDelay");
	var txtProjectileComboFlags = window.document.querySelector("#txtProjectileComboFlags");
	var txtProjectileXSpeed = window.document.querySelector("#txtProjectileXSpeed");
	var txtProjectileYSpeed = window.document.querySelector("#txtProjectileYSpeed");
	var cmdSaveProjectileData = window.document.querySelector("#cmdSaveProjectileData");

	var chkProjectileFlag2 = window.document.querySelector("#chkProjectileFlag2");
	var chkProjectileFlag4 = window.document.querySelector("#chkProjectileFlag4");
	var chkProjectileFlag8 = window.document.querySelector("#chkProjectileFlag8");
	var chkProjectileFlag16 = window.document.querySelector("#chkProjectileFlag16");
	var chkProjectileFlag32 = window.document.querySelector("#chkProjectileFlag32");

	this.selectedProjectileIndex = null;
	this.charId = null;

	this.init = function () {
		var self = this;

		console.log(self.charId);

		cmdLoadProjectiles.addEventListener("click", function () {
			self.loadProjectiles();
		});
		cmdSaveProjectileData.addEventListener("click", function () {
			self.saveProjectileData();
		});
	};

	/**
	 * Loads projectiles for player 1 into the editor
	 */
	this.loadProjectiles = function () {
		var self = this;
		var p1 = debug_.p1();
		self.charId = p1.Name;

		if(!p1) {
			return;
		}

		// clear out what ever is there now
		while(!!ddlProjectiles.children[0]) {
			ddlProjectiles.removeChild(ddlProjectiles.children[0]);
		}

		// add a default option
		var defaultOption = window.document.createElement("option");
		defaultOption.value = 0;
		defaultOption.text = "-- Select One --";
		ddlProjectiles.appendChild(defaultOption);

		// add each projectile into the select
		for(var i = 0; i < p1.Projectiles.length; ++i) {
			var projectionOption = window.document.createElement("option");
			projectionOption.value = i;
			projectionOption.text = p1.Projectiles[i].Animation.BaseAnimation.Name;

			ddlProjectiles.appendChild(projectionOption);
		}

		ddlProjectiles.addEventListener("change", function () {
			self.selectedProjectileIndex = ddlProjectiles.selectedIndex;
			self.loadProjectileData();
		});

		// clear out the form
		this.reset();

		ddlProjectiles.style.display = "";
	};

	/**
	 * Loads the projectile data into the form
	 */
	this.loadProjectileData = function () {
		pnlProjectileData.style.display = "none";
		var projectileIndex = +ddlProjectiles.options[ddlProjectiles.selectedIndex].value;
		if (!isNaN(projectileIndex) && projectileIndex > -1) {
			var p1 = debug_.p1();
			txtProjectileName.innerHTML = p1.Projectiles[projectileIndex].Animation.BaseAnimation.Name;
			chkCanJuggle.checked = p1.Projectiles[projectileIndex].CanJuggle;
			txtProjectileMaxHits.value = p1.Projectiles[projectileIndex].MaxHits;
			txtProjectileHitDelay.value = p1.Projectiles[projectileIndex].DefaultLocalHitStop;
			txtProjectileComboFlags.value = p1.Projectiles[projectileIndex].Params.Combo || "";

			chkProjectileFlag2.checked = hasFlag(COMBO_FLAGS.BLUE_FIRE_ON_FIRST_HIT, +txtProjectileComboFlags.value);
			chkProjectileFlag4.checked = hasFlag(COMBO_FLAGS.RED_FIRE_ON_MAX_HIT, +txtProjectileComboFlags.value);
			chkProjectileFlag8.checked = hasFlag(COMBO_FLAGS.RED_FIRE_SOUND_ON_MAX_HIT, +txtProjectileComboFlags.value);
			chkProjectileFlag16.checked = hasFlag(COMBO_FLAGS.SHORT_DELAY_ON_FIRST_HIT, +txtProjectileComboFlags.value);
			chkProjectileFlag32.checked = hasFlag(COMBO_FLAGS.KNOCKDOWN_ON_MAX_HIT, +txtProjectileComboFlags.value);

			txtProjectileYSpeed.value = p1.Projectiles[projectileIndex].YSpeed;
			txtProjectileXSpeed.value = p1.Projectiles[projectileIndex].XSpeed;
			pnlProjectileData.style.display = "";
		}
	};

	/**
	 * Reloads the projectile editor.
	 */
	this.reload = function () {
		var p1 = debug_.p1();
		if (!p1 || (p1.Name !== this.charId)) {
			this.selectedProjectileIndex = null;
			this.reset();
		}

		if (this.selectedProjectileIndex !== null) {
			var index = this.selectedProjectileIndex;
			this.reset();
			this.loadProjectiles();
			ddlProjectiles.selectedIndex = index;
			this.loadProjectileData();
		}
	};

	/**
	 * Saves the projectile data. Changes persist until the next match.
	 */
	this.saveProjectileData = function () {
		// ensure there are projectiles
		var p1 = debug_.p1();
		if (!p1 || !p1.Projectiles || !p1.Projectiles.length) {
			return;
		}

		var self = this;

		var selectedIndex = +ddlProjectiles.selectedIndex;
		if (isNaN(selectedIndex) || selectedIndex < 0) {
			return;
		}

		var projectileIndex = ddlProjectiles.options[selectedIndex].value;
		// ensure the projectile exists
		if (!p1.Projectiles[projectileIndex]) {
			return;
		}

		//can juggle
		p1.Projectiles[projectileIndex].CanJuggle = chkCanJuggle.checked;
		//xSpeed
		var xSpeed = +txtProjectileXSpeed.value;
		if (!!+xSpeed || xSpeed === 0)
			p1.Projectiles[projectileIndex].XSpeed = xSpeed;
		//ySpeed
		var ySpeed = +txtProjectileYSpeed.value;
		if (!!+ySpeed || ySpeed === 0)
			p1.Projectiles[projectileIndex].YSpeed = ySpeed;
		//combo flags


		var combo = (chkProjectileFlag2.checked && COMBO_FLAGS.BLUE_FIRE_ON_FIRST_HIT)
			| (chkProjectileFlag4.checked && COMBO_FLAGS.RED_FIRE_ON_MAX_HIT)
			| (chkProjectileFlag8.checked && COMBO_FLAGS.RED_FIRE_SOUND_ON_MAX_HIT)
			| (chkProjectileFlag16.checked && COMBO_FLAGS.SHORT_DELAY_ON_FIRST_HIT)
			| (chkProjectileFlag32.checked && COMBO_FLAGS.KNOCKDOWN_ON_MAX_HIT)
		;

		txtProjectileComboFlags.value = combo || "";

		if (!!+combo || combo === 0)
			p1.Projectiles[projectileIndex].Params.Combo = combo;
		//maxhits
		var maxHits = +txtProjectileMaxHits.value;
		if (!!+maxHits || maxHits === 0)
			p1.Projectiles[projectileIndex].MaxHits = maxHits;
		//hit delay
		var hitDelay = +txtProjectileHitDelay.value;
		if (!!+hitDelay || hitDelay === 0) {
			for (var i in p1.Projectiles[projectileIndex].LocalHitStopData)
				p1.Projectiles[projectileIndex].LocalHitStopData[i] = hitDelay;
			p1.Projectiles[projectileIndex].DefaultLocalHitStop = hitDelay;
		}
	};

	/**
	 * Resets the form
	 */
	this.reset = function () {
		ddlProjectiles.style.display = "none";
		pnlProjectileData.style.display = "none";
		txtProjectileName.innerHTML = "";
		chkCanJuggle.checked = false;
		txtProjectileMaxHits.value = "";
		txtProjectileHitDelay.value = "";
		txtProjectileComboFlags.value = "";
		txtProjectileYSpeed.value = "";
		txtProjectileXSpeed.value = "";
		this.selectedProjectileIndex = null;
	};

	this.init();
}

var MainEditorWindow = function (fn) {
	var closeModalFn = fn;
	var chkDamage = window.document.querySelector("#chkDamage")
	var chkUserController = window.document.querySelector("#chkUserController")
	var pnlKeyboardKeys = window.document.querySelector("#pnlKeyboardKeys")
	var pnlNoJoystick = window.document.querySelector("#pnlNoJoystick")
	var pnlJoystick = window.document.querySelector("#pnlJoystick")

	this.init = function () {
		var self = this;
		chkDamage.addEventListener("input", function () { __noDamage = !__noDamage });
		chkUserController.addEventListener("input", function () { self.useJoystick(!!chkUserController.checked) });
		window.addEventListener("gamepadconnected", function () {
			self.checkGamepads();
		});
		window.addEventListener("gamepaddisconnected", function () {
			self.checkGamepads();
		});
	};

	this.checkGamepads = function () {
		var gamepad = (navigator.getGamepads() || [])[0];
		if (!gamepad) {
			pnlJoystick.style.display = "none";
			pnlNoJoystick.style.display = "";
			this.useJoystick(false);
		} else {
			pnlNoJoystick.style.display = "none";
			pnlJoystick.style.display = "";
		}
	};

	this.useJoystick = function (value) {
		if (value) {
			user1_.useGamePad();
			pnlKeyboardKeys.className = "grayed-out";
		} else {
			user1_.useKeyboard();
			pnlKeyboardKeys.className = "";
		}
	};

	/**
	 * Reloads the main settings
	 */
	this.reload = function () {
		chkDamage.checked = !!__noDamage;
		chkUserController.checked = user1_.GamepadIndex === 0;
	};

	this.init();
};

var OtherWindow = function (fn) {
	var closeModalFn = fn;
	var cmdResetGame = window.document.querySelector("#cmdResetGame");

	this.init = function () {
		var self = this;
		cmdResetGame.addEventListener("click", function () {
			ResetGame();
			closeModalFn();
		});
	};

	this.init();
};

var DebugModal = function () {
	var pnlContainer = window.document.querySelector("#pnlDebugModal");
	var pnlMainContainer = window.document.querySelector("#pnlMainContainer");
	var pnlQuickMenuContainer = window.document.querySelector("#pnlQuickMenuContainer");
	var pnlPEContainer = window.document.querySelector("#pnlPEContainer");
	var pnlOtherContainer = window.document.querySelector("#pnlOtherContainer");
	var cmdClose = window.document.querySelector("#cmdCloseDebugModal");
	var cmdMain = window.document.querySelector("#cmdMain")
	var cmdQuickMatch = window.document.querySelector("#cmdQuickMatch")
	var cmdProjectileEditor = window.document.querySelector("#cmdProjectileEditor")
	var cmdOther = window.document.querySelector("#cmdOther");

	/**
	 * Closes the debug modal
	 */
	var close = function () {
		pnlContainer.style.display = "none";
		game_.resume();
	}

	var other = new OtherWindow(close);
	var mainEditor = new MainEditorWindow(close);
	var quickMatchConfigurator = new QuickMatchConfiguratorWindow(close);
	var projectileEditor = new ProjectileEditorWindow();

	/**
	 * Just a handler for menu clicks
	 * @param selection
	 */
	this.menuClick = function (selection) {
		cmdMain.parentElement.className = "subtitle tab ";
		cmdQuickMatch.parentElement.className = "subtitle tab ";
		cmdProjectileEditor.parentElement.className = "subtitle tab ";
		cmdOther.parentElement.className = "subtitle tab ";

		pnlMainContainer.style.display = "none";
		pnlQuickMenuContainer.style.display = "none";
		pnlPEContainer.style.display = "none";
		pnlOtherContainer.style.display = "none";

		switch (selection) {
			case 0:
				cmdMain.parentElement.className += "selected";
				pnlMainContainer.style.display = "";
				break;
			case 1:
				cmdQuickMatch.parentElement.className += "selected";
				pnlQuickMenuContainer.style.display = "";
				break;
			case 2:
				cmdProjectileEditor.parentElement.className += "selected";
				pnlPEContainer.style.display = "";
				break;
			case 3:
				cmdOther.parentElement.className += "selected";
				pnlOtherContainer.style.display = "";
				break;
		}
	};

	/**
	 * Initializes the debug modal
	 */
	this.init = function () {
		var self = this;
		cmdClose.addEventListener("click", function() { close(); });
		cmdMain.addEventListener("click", function() { self.menuClick(0); });
		cmdQuickMatch.addEventListener("click", function() { self.menuClick(1); });
		cmdProjectileEditor.addEventListener("click", function() { self.menuClick(2); });
		cmdOther.addEventListener("click", function() { self.menuClick(3); });
	};

	/**
	 * Opens the debug modal
	 */
	this.open = function () {
		chkDamage.checked = !!__noDamage;
		mainEditor.reload();
		projectileEditor.reload();

		game_.pause();
		pnlContainer.style.display = "";
	};

	this.init();
};

window.__debugModal = new DebugModal();
