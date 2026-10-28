var Player = function (name, width, height, user, nameImageSrc, portriatImageSrc, slideFactor) {
	user.Player = this;
	this.User = user;

	this.StandingClip = {Top: 0, Bottom: 0, Front: 0, Back: 0};
	this.ShadowX = "";
	this.LastShadowX = "";
	this.ShadowY = "";
	this.LastShadowY = "";
	this.DefaultShadowOffset = 0;
	this.Mass = 1;
	this.JumpSpeed = 1;
	this.DefaultJumpSpeed = 1;
	this.NbHits = 0;
	this.TmpState = {Y: 0, V: 0};
	this.Name = name;
	this.Character = user.Selected;
	this.Folder = user.getFolder();
	this.IsAlternate = user.IsAlternateChar;
	this.NameImageSrc = nameImageSrc || "images/misc/misc/" + this.Name.toLowerCase() + "-name-1.png";
	this.PortriatImageSrc = portriatImageSrc || "images/misc/misc/" + this.Folder.toLowerCase() + "-r-portriat-1.png";

	//these 2 are used so we can easily swap left and right when the player changes directions
	this.LeftKey = user.Left;
	this.RightKey = user.Right;
	//store all of the key mappings

	this.setButtons(user);

	this.ForceNoAdjustShadowPosition = false;

	this.Moves = [];
	this.Throws = [];

	this.OtherAnimations = {};
	this.OtherAnimations.Dirt = [];
	this.OtherAnimations.BigDirt = [];
	this.OtherAnimations.Dizzy = [];
	this.OtherAnimations.BlueFire = [];
	this.OtherAnimations.RedFire = [];
	this.FrontHitReport = [];
	this.RearHitReport = [];
	this.DirtIndices = [];
	this.BigDirtIndices = [];

	this.FrontHitReportImages = [];
	this.RearHitReportImages = [];

	this.CurrentAnimation = null;
	this.CurrentFrame = null;


	this.Element = null;
	this.DizzyElement = null;
	this.FireElement = null;
	this.Image = null;
	this.SpriteElement = null;
	this.ShadowContainer = null;
	this.Shadow = null;

	this.moveStageXFn = null;
	this.moveOtherPlayersToBackFn = null;
	this.moveOtherPlayersToFrontFn = null;
	this.moveXFn = null;
	this.moveYFn = null;
	this.takeDamageFn = null;
	this.changeEnergyFn = null;
	this.attackFn = null;
	this.projectileAttackFn = null;
	this.getHealthFn = null;
	this.getEnergyFn = null;
	this.onStartAttackFn = null;
	this.onEndAttackFn = null;
	this.onStartAirAttackFn = null;
	this.onEndAirAttackFn = null;
	this.onEnemyProjectileMovedFn = null;
	this.onProjectileGoneFn = null;
	this.onIncComboFn = null;
	this.onIncComboRefCountFn = null;
	this.onDecComboRefCountFn = null;
	this.getCurrentComboCountFn = null;

	this._showCurrentFrameImageHelperParams = {
		ImageOffsetX: 0
		, ImageOffsetY: 0
		, HasOffsetX: false
		, HasOffsetY: false
	};

	this.NbFrames = 0;
	this.Projectiles = [];
	this.Height = height;
	this.Width = width;
	this.PendingWidth = 0;
	this.HalfWidth = width / 2;
	//this.Circle = new Circle(this.HalfWidth,this.HalfWidth,this.HalfWidth);
	this.Circle = new Circle(this.HalfWidth, this.HalfWidth, this.HalfWidth);
	this.HeadOffsetX = 40;
	this.HeadOffsetY = 10;
	this.ImgBBox = {};

	this.Ai = new CreateAIProxy();
	if (!!user.IsAI)
		this.enableAI();

	this.HasPendingGrapple = false;
	this.LandedOnFrame = 0;
	this.GotUpOnFrame = 0;

	this.SlideFactor = slideFactor || 30;
	this.Index = 0;
	this.Id = "";
	this.Team = 0;
	this.DefaultShadowImageSrc = "images/misc/misc/shadow.png";
	this.WinAnimationNames = [];

	window["Create" + user.getFolder() + "SpriteData"]();
	this.OffsetWidth = 0;
	this.OffsetHeight = 0;
	this.IgnoreOverrides = false;
	this.ComboCount = 0;
	this.Combo = {};
	this.MoveNdx = {
		HitReact: {}
	};

	//this.loadAssets();
	this.createElement();
	this.reset();
	this.addGenericAnimations();
	this.setImgRect();

	this.peakY = STAGE.FLOORY;
	this.CanEndRound = false;
};

Player.prototype.loadAssets = function (name, folder, loadProjectiles) {
	stuffLoader_.queue((this.Name || name).toLowerCase() + ".js", RESOURCE_TYPES.BASE64AUDIO);
	//stuffLoader_.queue("script/" + (this.Name || name).toLowerCase() + "-ai.js",RESOURCE_TYPES.SCRIPT);
	stuffLoader_.queue("images/misc/" + (this.Folder || folder).toLowerCase() + "/sprites.png", RESOURCE_TYPES.IMAGE);
	stuffLoader_.queue("images/misc/" + (this.Folder || folder).toLowerCase() + "/misc-sprites.png", RESOURCE_TYPES.IMAGE);
	stuffLoader_.queue("images/misc/" + (this.Folder || folder).toLowerCase() + "/trail-sprites.png", RESOURCE_TYPES.IMAGE);
	if (!!loadProjectiles || this.Projectiles.length > 0)
		stuffLoader_.queue("images/misc/" + (this.Folder || folder).toLowerCase() + "/projectiles.png", RESOURCE_TYPES.IMAGE);

};

Player.prototype.sortAnimations = function() {
	//block must have a higher priority than other moves with the same number of button presses!
	for (var i = 0; i < this.Moves.length; ++i) {
		if (this.Moves[i].BaseAnimation.Name === "block") {
			this.Moves[i].ButtonCount = 1.1;
		} else if (this.Moves[i].BaseAnimation.Name === "crouch block") {
			this.Moves[i].ButtonCount = 1.1;
		}
	}

	this.Throws.sort(function (a, b) {
		return b.ButtonCount - a.ButtonCount;
	});

	this.Moves.sort(function (a, b) {
		return b.ButtonCount - a.ButtonCount;
	});


	for (var i = 0; i < this.Moves.length; ++i) {
		if (this.Moves[i].BaseAnimation.Name === "block") {
			this.MoveNdx.HighBlock = i;
		} else if (this.Moves[i].BaseAnimation.Name === "crouch block") {
			this.MoveNdx.LowBlock = i;
		} else if (this.Moves[i].BaseAnimation.Name === "hr dead") {
			this.MoveNdx.Dead = i;
		} else if (this.Moves[i].BaseAnimation.Name === "down") {
			this.MoveNdx.Down = i;
		} else if (this.Moves[i].BaseAnimation.Name === "dead bounce") {
			this.MoveNdx.DeadBounce = i;
		} else if (this.Moves[i].BaseAnimation.Name === "stance") {
			this.MoveNdx.Stance = i;
		} else if (this.Moves[i].BaseAnimation.Name === "turn") {
			this.MoveNdx.Turn = i;
		} else if (this.Moves[i].BaseAnimation.Name === "crouch turn") {
			this.MoveNdx.CrouchTurn = i;
		} else if (this.Moves[i].BaseAnimation.Name === "quick turn") {
			this.MoveNdx.QuickTurn = i;
		} else if (this.Moves[i].BaseAnimation.Name === "dizzy") {
			this.MoveNdx.Dizzy = i;
		} else if (this.Moves[i].BaseAnimation.Name === "getup") {
			this.MoveNdx.Getup = i;
		} else if (this.Moves[i].BaseAnimation.Name === "tripped") {
			this.MoveNdx.Tripped = i;
		} else if (this.Moves[i].BaseAnimation.Name === "knock down") {
			this.MoveNdx.KnockDown = i;
		} else if (this.Moves[i].BaseAnimation.Name === "blue fire") {
			this.MoveNdx.BlueFire = i;
		} else if (this.Moves[i].BaseAnimation.Name === "red fire") {
			this.MoveNdx.RedFire = i;
		} else if (this.Moves[i].BaseAnimation.Name === "eject") {
			this.MoveNdx.Eject = i;
		} else if (this.Moves[i].BaseAnimation.Name === "hit in air") {
			this.MoveNdx.Air = i;
		} else if (this.Moves[i].BaseAnimation.Name === "shoulder throw") {
			this.MoveNdx.ShoulderThrow = i;
		} else if (this.Moves[i].BaseAnimation.Name === "bison shoulder throw") {
			this.MoveNdx.BisonShoulderThrow = i;
		} else if (this.Moves[i].BaseAnimation.Name === "fk throw") {
			this.MoveNdx.FkThrow = i;
		} else if (this.Moves[i].BaseAnimation.Name === "roll throw") {
			this.MoveNdx.RollThrow = i;
		} else if (this.Moves[i].BaseAnimation.Name === "hr crouch light") {
			this.MoveNdx.CLH = i;
		} else if (this.Moves[i].BaseAnimation.Name === "hr crouch medium") {
			this.MoveNdx.CMH = i;
		} else if (this.Moves[i].BaseAnimation.Name === "hr crouch hard") {
			this.MoveNdx.CHH = i;
		} else if (this.Moves[i].BaseAnimation.Name === "hr_sLL") {
			this.MoveNdx.SLL = i;
		} else if (this.Moves[i].BaseAnimation.Name === "hr_sLH") {
			this.MoveNdx.SLH = i;
		} else if (this.Moves[i].BaseAnimation.Name === "hr_sML") {
			this.MoveNdx.SML = i;
		} else if (this.Moves[i].BaseAnimation.Name === "hr_sMH") {
			this.MoveNdx.SMH = i;
		} else if (this.Moves[i].BaseAnimation.Name === "hr_sHL") {
			this.MoveNdx.SHL = i;
		} else if (this.Moves[i].BaseAnimation.Name === "hr_sHH") {
			this.MoveNdx.SHH = i;
		}
	}
};

Player.prototype.ndx = function (key) {
	return this.MoveNdx[key] || -1;
};

Player.prototype.getMatch = function () {
	return game_.getMatch();
};

Player.prototype.getCDHelper = function () {
	return this.getMatch().getCDHelper();
};

Player.prototype.getStage = function () {
	return this.getMatch().getStage();
};

Player.prototype.getGame = function () {
	return game_;
};

Player.prototype.getHealth = function () {
	return !!this.getHealthFn ? this.getHealthFn() : -1;
};

Player.prototype.getEnergy = function () {
	return this.getEnergyFn();
};

Player.prototype.setIndex = function (index) {
	this.Index = index;
};

Player.prototype.getIndex = function () {
	return this.Index;
};

Player.prototype.playerCount = 0;

Player.prototype.changeEnergy = function (amount) {
	if (!!amount) this.changeEnergyFn(amount);
};

Player.prototype.getIsExecutingSuperMove = function () {
	return this.IsExecutingSuperMove;
};

Player.prototype.setExecutingSuperMove = function (value) {
	this.IsExecutingSuperMove = value;
};

Player.prototype.isBeingGrappled = function () {
	return this.IsBeingThrown;
};

Player.prototype.setBeingGrappled = function (value) {
	this.IsBeingThrown = value;
};

Player.prototype.getNameImageSrc = function () {
	return this.NameImageSrc;
};

Player.prototype.getPortriatImageSrc = function () {
	return this.PortriatImageSrc;
};

Player.prototype.getName = function () {
	return this.Name;
};

Player.prototype.takeDamage = function (amount, attackDirection, ignoreNoDamage) {
	if (!!amount && !this.isDead() && (!__noDamage || !!ignoreNoDamage)) {
		this.takeDamageFn(amount);
	}
};

Player.prototype.enableAI = function (createAiFn) {
	this.IsAI = true;
	this.Ai.enableAI(this, createAiFn || (window["Create" + this.Name[0].toUpperCase() + this.Name.substring(1) + "AI"]));
	if (!!this.getMatch())
		this.getMatch().checkAIMatch();
};

Player.prototype.getTeam = function() {
	return (this.Team === 1)
		? game_.getMatch().getTeamA()
		: game_.getMatch().getTeamB()
};

Player.prototype.getTarget = function() {
	if (this.Team === 1) {
		return game_.getMatch().getTeamB().getPlayer(0);
	} else {
		return game_.getMatch().getTeamA().getPlayer(0);
	}
};

Player.prototype.getEnergyLevel = function() {
	var value = this.getEnergy();
	if (value >= ENERGYBAR.MAX_LEVEL2)
		return ENERGYBAR.LEVELMAXED;
	else if (value >= ENERGYBAR.MAX_LEVEL1)
		return ENERGYBAR.LEVEL2;
	else if (value >= ENERGYBAR.MAX_LEVEL0)
		return ENERGYBAR.LEVEL1;
	else
		return ENERGYBAR.LEVEL0;

};

Player.prototype.getName = function () {
	return this.Name;
};

Player.prototype.isDead = function () {
	return !this.getHealth();
};

Player.prototype.getHasPendingGrapple = function () {
	return this.HasPendingGrapple;
};

Player.prototype.setPendingGrapple = function (value) {
	this.HasPendingGrapple = value;
};

Player.prototype.setPaused = function (paused) {
	this.IsPaused = paused;
};

Player.prototype.getAdjustShadowPosition = function () {
	return this.AdjustShadowPosition;
};

Player.prototype.setAdjustShadowPosition = function (value) {
	this.AdjustShadowPosition = value;
};

Player.prototype.setFlags = function (value) {
	this.Flags = value;
};

Player.prototype.getFlags = function () {
	return this.Flags;
};

Player.prototype.getFrame = function () {
	return this.getGame().getCurrentFrame();
};

Player.prototype.resetCombo = function () {
	if (!!this.onDecComboRefCountFn)
		this.onDecComboRefCountFn();
	this.ComboCount = 0;

	this.Hits = {};
};

Player.prototype.incCombo = function (attackId) {
	if (!this.getCurrentComboCountFn())
		this.onIncComboRefCountFn();
	this.onIncComboFn();
	++this.ComboCount;

	if (!!attackId) {
		this.Hits[attackId] = this.Hits[attackId] || {Nb: 0};
		++this.Hits[attackId].Nb;
	}
};

Player.prototype.reset = function (ignoreDirection) {
	this.ShakeUntilFrame = 0;
	this.LandedOnFrame = 0;
	this.GotUpOnFrame = 0;
	this.TeleportX = 0;
	this.TeleportFramesLeft = 0;
	this.IgnoreHoldFrame = false;
	this.MustChangeDirectionQuick = false;

	this.DizzyIndex = 0;
	this.DizzyValue = 0;
	this.MaxDizzyValue = CONSTANTS.MAX_DIZZY_VALUE;
	this.setPendingGrapple(false);
	this.IsExecutingSuperMove = false;
	this.IsLosing = false;
	this.CanHoldAirborne = true;
	this.ShowSlideDirt = true;
	this.IsPaused = false;

	//this.CanInterrupt = false;
	this.IgnoreCollisionsWith = "";
	this.IgnoreCollisionsWithOtherTeam = false;
	this.ForceImmobile = false;
	this.IgnoreHoldFrame = false;
	this.MustClearAllowBlock = false;
	this.MustClearAllowAirBlock = false;
	//this is the combo against THIS player! Not against other players
	this.resetCombo();
	this.InteruptAnimation = null;
	this.CurrentAnimation = null;
	this.CurrentFrame = null;
	this.onAnimationCompleteFn = null;
	this.IsFacingRight = true;
	if (!ignoreDirection)
		this.Direction = 1;
	this.Health = 100;
	this.Flags = new PlayerFlags(this);
	this.IsInAttackFrame = false;

	this.LastKeyStates = [];
	this.ClearKeyStateCount = 0;
	this.AdjustShadowPosition = true;
	this.MustChangeDirection = 0;
	this.BlockedAttacks = [];
	this.BlockedAirAttacks = [];

	this.giveHitFn = null;
	this.IsBeingThrown = false;
	this.GrappledPlayer = null;
	this.X = 0;
	this.Y = STAGE.FLOORY;
	this.LastY = STAGE.FLOORY;
	this.LastX = 0;
	this.LastFrameY = 0;
	this.ConstY = 0;
	this.Hits = {};
	this.LastHitJuggleGroup = {};

	this.ClipMoveBottom = 0;
	this.ClipMoveTop = 0;
	this.ClipMoveFront = 0;
	this.ClipMoveBack = 0;

	this.ClipHitBottom = 0;
	this.ClipHitTop = 0;
	this.ClipHitFront = 0;
	this.ClipHitBack = 0;


	this.LeftOffset = 0;
	this.RightOffset = 0;
	this.TopOffset = 0;
	this.BottomOffset = 0;
	this.LeftNoOffset = 0;
	this.RightNoOffset = 0;

	this.Fx = 0;
	this.Fy = 0;
	this.LastFx = 0;
	this.LastFy = 0;
	//jump velocity
	this.JumpVelocityX = 0;
	this.JumpVelocityY = 0;
	this.ZOrder = null;
	//
	this.T = 0;
	this.FrameFreeze = 0;
	this.IsSliding = false;
	this.SlideCount = 0;
	this.MoveCount = 0;
	this.RegisteredHit = new RegisteredHit();
	this.LastHitFrame = {};
	this.WinAnimationFrame = CONSTANTS.NO_FRAME;
	this.Target = 0;
	if (this.Ai.isRunning())
		this.Ai.reset();
	this.clearProjectiles();
	this.clearDizzy();
	this.CanEndRound = false;
	this.OtherTeamDead = false;
	this.HandledDead = false;

	this.DeadContext = {};
};

Player.prototype.createElement = function (x, y, parentElement) {
	parentElement = (parentElement || window.document.getElementById("pnlStage"));
	this.Element = window.document.createElement("div");
	this.Element.className = "player";

	var self = this;

	var createElement = function (tagName, className, attrib, value, parent) {
		var i = window.document.createElement(tagName);
		i.className = className;
		if (!!attrib)
			i.style[attrib] = value;
		(parent || self.Element).appendChild(i);
		return i;
	};

	this.DizzyElement = window.document.createElement("div");
	this.DizzyElement.className = "player-dizzy";
	this.DizzyElement.style.display = "none";


	this.FireElement = window.document.createElement("div");
	this.FireElement.className = "player-fire";
	this.FireElement.style.display = "none";

	this.SpriteElement = window.document.createElement("div");
	this.SpriteElement.className = "player-sprite";
	this.Element.appendChild(this.SpriteElement);

	for (var i = 0; i < CONSTANTS.MAX_EXTRA_IMAGES; ++i)
		this.FrontHitReportImages[this.FrontHitReportImages.length] = createElement.call(this, "div", "front-hit-report", "display", "none", parentElement);
	for (var i = 0; i < CONSTANTS.MAX_EXTRA_IMAGES; ++i)
		this.RearHitReportImages[this.RearHitReportImages.length] = createElement.call(this, "div", "rear-hit-report", "display", "none", parentElement);


	this.ShadowContainer = window.document.createElement("div");
	this.ShadowContainer.className = "shadow";
	this.Shadow = createElement.call(this, "div", "shadow", "", "", this.ShadowContainer);

	parentElement.appendChild(this.ShadowContainer);
	parentElement.appendChild(this.Element);
	parentElement.appendChild(this.DizzyElement);
	parentElement.appendChild(this.FireElement);

	this.createDebugElements();
};

Player.prototype.setZOrder = function (value) {
	this.ZOrder = value;
};

Player.prototype.checkZOrder = function () {
	if (this.ZOrder != null) {
		this.Element.style.zIndex = this.ZOrder;
		this.ZOrder = null;
	}
};

Player.prototype.moveToBack = function (dontMoveOtherPlayers) {
	this.setZOrder(1);
	if (!dontMoveOtherPlayers)
		this.moveOtherPlayersToFrontFn();
};

Player.prototype.moveToFront = function (dontMoveOtherPlayers) {
	if (this.getIsExecutingSuperMove())
		this.setZOrder(16);
	else
		this.setZOrder(14);

	if (!dontMoveOtherPlayers)
		this.moveOtherPlayersToBackFn();
};
//Simply returns the count of all of the frames
Player.prototype.getNextFrameID = function () {
	return this.NbFrames;
};
//If the move is a projectile, and a projectile is already active, then this returns true;
Player.prototype.isProjectileInUse = function (move) {
	if (hasFlag(move.Flags.Combat, COMBAT_FLAGS.MULTI_PROJECTILE) && move.ProjectileId !== null) {
		return this.Projectiles[move.ProjectileId].IsActive;
	} else {
		return !!this.HasActiveProjectiles && (hasFlag(move.Flags.Combat, COMBAT_FLAGS.PROJECTILE_ACTIVE));
	}
};
//Gets the direction of the attack relative to the current player
Player.prototype.getAttackDirection = function (attackDirection) {
	var direction = -this.Direction;
	if (this.Direction > 0 && attackDirection > 0)
		direction = -1;
	else if (this.Direction < 0 && attackDirection < 0)
		direction = 1;
	else if (this.Direction > 0 && attackDirection < 0)
		direction = 1;
	else if (this.Direction < 0 && attackDirection > 0)
		direction = -1;
	return direction;
};
//Gets the direction of the attack relative to the current player
Player.prototype.getRelativeDirection = function (attackDirection) {
	var direction = -this.Direction;
	if (this.Direction > 0 && attackDirection > 0)
		direction = -1;
	else if (this.Direction < 0 && attackDirection < 0)
		direction = -1;
	else if (this.Direction > 0 && attackDirection < 0)
		direction = 1;
	else if (this.Direction < 0 && attackDirection > 0)
		direction = 1;
	return direction;
};
//Gets the direction of the attack relative to the current player
Player.prototype.getProjectileDirection = function (attackDirection) {
	var direction = -this.Direction;
	if (this.Direction > 0 && attackDirection > 0)
		direction = -1;
	else if (this.Direction < 0 && attackDirection < 0)
		direction = -1;
	else if (this.Direction > 0 && attackDirection < 0)
		direction = 1;
	else if (this.Direction < 0 && attackDirection > 0)
		direction = -1;
	return direction;
};
//Holds the current frame
Player.prototype.setHoldFrame = function (nbFrames) {
	this.FrameFreeze = nbFrames;
};
//Handles other animations
Player.prototype.otherAnimationFrameMove = function (frame, stageX, stageY) {
	//front hit report images
	var fhrIndex = -1;
	while (++fhrIndex < this.FrontHitReport.length) {
		var item = this.FrontHitReport[fhrIndex];
		if (!item.Animation.tryRender(frame, item.StartFrame, item.Element, stageX, stageY, this.X, this.Y))
			this.FrontHitReport.splice(fhrIndex, 1);
	}
	//rear hit report images
	var rhrIndex = -1;
	while (++rhrIndex < this.RearHitReport.length) {
		var item = this.RearHitReport[rhrIndex];
		if (!item.Animation.tryRender(frame, item.StartFrame, item.Element, stageX, stageY, this.X, this.Y))
			this.RearHitReport.splice(rhrIndex, 1);
	}
	//dirt images
	var dirtIndex = -1;
	while (++dirtIndex < this.DirtIndices.length) {
		var item = this.OtherAnimations.Dirt[this.DirtIndices[dirtIndex]];
		if (!item.Animation.tryRender(frame, item.StartFrame, item.Element, stageX, stageY, this.X, this.Y))
			this.DirtIndices.splice(dirtIndex, 1);
	}
	//big dirt images
	var bigDirtIndex = -1;
	while (++bigDirtIndex < this.BigDirtIndices.length) {
		var item = this.OtherAnimations.BigDirt[this.BigDirtIndices[bigDirtIndex]];
		if (!item.Animation.tryRender(frame, item.StartFrame, item.Element, stageX, stageY, this.X, this.Y))
			this.BigDirtIndices.splice(bigDirtIndex, 1);
	}
	//dizzy
	if (this.isDizzy()) {
		var item = this.OtherAnimations.Dizzy[this.DizzyIndex];
		//if(item.Animation.tryRender(frame,item.StartFrame,item.Element,stageX,game_.getMatch().getStage().getGroundY(),this.X,this.Y,this.getBoxWidth()))
		if (item.Animation.renderWithPlayer(frame, item.StartFrame, item.Element, this.Direction, this.X, this.Y))
			item.StartFrame = frame;
	}
	//blue fire
	if (this.hasBlueFire()) {
		var item = this.OtherAnimations.BlueFire;
		item.Animation.Direction = this.Direction;
		if (item.Animation.tryRender(frame, item.StartFrame, item.Element, stageX, game_.getMatch().getStage().getGroundY(), this.X, this.Y, this.getBoxWidth(), true))
			item.StartFrame = frame;
	}
	//red fire
	if (this.hasRedFire()) {
		var item = this.OtherAnimations.RedFire;
		item.Animation.Direction = this.Direction;
		if (item.Animation.tryRender(frame, item.StartFrame, item.Element, stageX, game_.getMatch().getStage().getGroundY(), this.X, this.Y, this.getBoxWidth()))
			item.StartFrame = frame;
	}
};
//Moves the animation back one frame
Player.prototype.reverseFrame = function (frame) {
	if (!!this.CurrentFrame)
		this.CurrentAnimation.StartFrame += 2;
};
//Prevents the animation from continuing for one frame
Player.prototype.holdFrame = function (frame) {
	this.FrameFreeze = Math.max(this.FrameFreeze - 1, 0);
	if (!!this.CurrentFrame)
		++this.CurrentAnimation.StartFrame;
	if (this.isAirborne())
		this.getStage().holdFrame();
};
//Prevents the animation from continuing for one frame
Player.prototype.forceHoldFrame = function (frame) {
	if (!!this.CurrentFrame)
		++this.CurrentAnimation.StartFrame;
	if (this.isAirborne())
		this.getStage().holdFrame();
};
//Prevents the animation from continuing for one frame
Player.prototype.forceNextFrame = function (frame) {
	if (!!this.CurrentFrame)
		this.CurrentAnimation.StartFrame = frame - this.CurrentFrame.getEndFrameOffset();
};
//Can the current move be interrupted by a speial move?
Player.prototype.checkForInterupt = function (frame) {
	if (!!this.InteruptAnimation) {
		if ((--this.InteruptAnimation.Delay <= 0)) {
			var temp = this.InteruptAnimation;
			temp.StartFrame = frame;
			this.InteruptAnimation = null;
			this.setCurrentAnimation(temp);
		}
	} else if (!!this.CurrentAnimation && !!this.CurrentAnimation.Animation && !!this.CurrentAnimation.Animation.InteruptAnimation) {
		var poseFlags = this.CurrentAnimation.Animation.InteruptAnimationFlags.Pose;
		if (hasFlag(poseFlags, this.Flags.Pose.Value)) {

			var state = this.CurrentAnimation.Animation.InteruptAnimation.ButtonSequence[this.CurrentAnimation.Animation.InteruptAnimation.ButtonSequence.length - 1];
			//if the key is NOT pressed, then offset into the next frame in the current move
			if (!!this.hasButtonState(state)) {
				this.chainToAnimation(frame, this.CurrentAnimation.Animation.InteruptAnimation);
			}
		}
	}
};

Player.prototype.onRenderComplete = function (frame) {
	this.LastFrameY = this.ConstY;
	this.ConstY = this.Y;
};

Player.prototype.onPreFrameMove = function (frame) {
	this.MustForceRenderShadow = false;
};

Player.prototype.handleAI = function (frame) {
	if (this.Ai.isRunning() && !this.isDead())
		this.Ai.frameMove(frame);
};

Player.prototype.isVulnerable = function() {
	return !!(this.isCurrentMoveAttack()
		&& !this.hasInvulnerableFlag()
		&& !this.isCurrentMoveProjectile()
		&& !this.IsInAttackFrame
		&& !this.isBlocking()
		&& !this.isMobile());
};

Player.prototype.checkVulnerable = function (frame) {
	if (this.isVulnerable()) {
		this.onVulnerableFn(frame, this.getFrontX(), this.getMidY());
		return true;
	}

	return false;
};

Player.prototype.isFloater = function (frame) {
	return !!this.isAirborne()
		/*&& !this.isCurrentMoveAttack()*/
		&& !this.isCurrentMoveProjectile()
		&& !this.IsInAttackFrame
		&& !this.isBlocking()
		&& !this.isMobile()
		&& !hasFlag(this.Flags.Player.Value, PLAYER_FLAGS.IGNORE_ATTACKS)
		&& !hasFlag(this.Flags.Player.Value, PLAYER_FLAGS.IGNORE_COLLISIONS)
		&& !hasFlag(this.Flags.Player.Value, PLAYER_FLAGS.INVULNERABLE)
		&& !hasFlag(this.Flags.Player.Value, PLAYER_FLAGS.SUPER_INVULNERABLE);
};

Player.prototype.checkFloater = function (frame) {
	if (!!this.isFloater()) {
		this.onFloatingFn(frame, this.getFrontX(), this.getMidY());
		return true;
	}

	return false;
};

Player.prototype.onFrameMove = function (frame, stageX, stageY) {
	if (!this.IsPaused) {
		if (!this.isCurrentMoveAttack())
			this.onAttackStateChanged(null, ATTACK_STATE.NOT_AN_ATTACK);
		this.doAnimationAlerts();
		if (!!this.TeleportFramesLeft)
			this.advanceTeleportation(frame);
		this.decreaseDizziness(frame);
		this.sendAttackAlerts(frame);
		this.checkForInterupt(frame);
		this.checkGroundY();
		this.frameMove(frame, stageX, stageY);
		if (!!this.IsInAttackFrame)
			this.handleAttack(frame, this.CurrentFrame);
		else if (!this.checkFloater(frame))
			this.checkVulnerable(frame);
		if (!!this.GrappledPlayer)
			this.handleGrapple(this.CurrentAnimation.FrameIndex - 1, frame, stageX, stageY);
		if (!!this.CurrentAnimation.Animation && !!this.CurrentAnimation.Animation.Trail)
			this.frameMoveTrail(frame, this.getStage().DeltaX, stageY);
		if (!this.HandledDead && this.isDead())
			this.forceTeamLose(frame);
	} else {
		this.forceHoldFrame(frame);
	}
};

Player.prototype.frameMoveTrail = function (frame, stageX, stageY) {
	var index = this.CurrentAnimation.Animation.getFrameIndex(this.CurrentFrame.ID);
	this.CurrentAnimation.Animation.Trail.frameMove(frame, index, this.Direction, stageX, stageY);
};
//sets some data beforehand
Player.prototype.setPendingFrame = function (pendingFrame) {
	if (!!pendingFrame) {
		var data = spriteLookup_.get(pendingFrame.RightSrc);
		if (!!data) {
			this.PendingWidth = data.WidthInt;
		}
	}
};

Player.prototype.preRender = function (frame) {
};
//Show the image at the current frame in the current animation
Player.prototype.frameMove = function (frame, stageX, stageY) {
	this.LastY = this.Y;
	this.LastX = this.X;
	this.checkDirection();
	if (this.IsSliding)
		this.slide(frame);

	this.handleProjectiles(frame, stageX, stageY);
	this.otherAnimationFrameMove(frame, stageX, stageY);

	if (!!this.isBeingGrappled())
		return;

	if (!!this.FrameFreeze && !this.IgnoreHoldFrame) {
		this.applyShake(frame, stageX, stageY);
		this.holdFrame(frame);
	}

	if (!!this.ForceEndAnimation) {
		this.ForceEndAnimation = false;
		this.tryChainAnimation(frame);
		return;
	}

	if (!!this.CurrentAnimation && !!this.CurrentAnimation.Animation) {
		var delta = frame - this.CurrentAnimation.StartFrame;
		var currentFrame = this.CurrentAnimation.Animation.getFrame(delta);
		if (!!currentFrame || (!!this.CurrentFrame && (hasFlag(this.CurrentFrame.FlagsToSet.Player, PLAYER_FLAGS.HOLD_FRAME)))) {
			this.setPendingFrame(currentFrame);
			//check to see if the move allows you to change direction mid-move
			if (!!currentFrame && !!this.MustChangeDirection && hasFlag(currentFrame.FlagsToSet.Combat, COMBAT_FLAGS.TELEPORT)) {
				this.reverseSprite();
			} else if (!!this.MustChangeDirection && hasFlag(this.CurrentAnimation.Animation.Flags.Player, PLAYER_FLAGS.ALLOW_CHANGE_DIRECTION)) {
				this.changeDirection();
				return;
			}

			//check to see if the new frame needs to be airborne
			if (!!currentFrame) {
				if (currentFrame.isSettingAirborneFlag()) {
					if (!this.isAirborne() || hasFlag(currentFrame.FlagsToSet.Pose, POSE_FLAGS.FORCE_START_AIRBORNE) || !!currentFrame.Jump) {
						var direction = 1;
						if (hasFlag(currentFrame.FlagsToSet.Player, PLAYER_FLAGS.USE_ATTACK_DIRECTION))
							direction = this.CurrentAnimation.AttackDirection;

						var fx = !!currentFrame.Jump ? currentFrame.Jump.Fx : this.CurrentAnimation.Vx;
						var fy = !!currentFrame.Jump ? currentFrame.Jump.Fy : this.CurrentAnimation.Vy;

						this.performJump(direction * fx, fy, this.CurrentAnimation.Animation.getXModifier(), this.CurrentAnimation.Animation.getYModifier(), this.CurrentAnimation.Animation.NbFramesAirborneAdvance, this.CurrentAnimation.Animation.AirborneStartDeltaY, this.CurrentAnimation.Animation.UseJumpSpeed, this.CurrentAnimation.Animation.UseJumpT);
					} else {
						this.setVxFn(this.CurrentAnimation.Animation.getAirXModifier());
						this.setVyFn(this.CurrentAnimation.Animation.getAirYModifier());
					}

					if (hasFlag(currentFrame.FlagsToSet.Pose, POSE_FLAGS.AIR_COMBO_1)) {
						this.clearAirborneFlags();
						this.Flags.Pose.add(POSE_FLAGS.AIR_COMBO_1);
					} else if (hasFlag(currentFrame.FlagsToSet.Pose, POSE_FLAGS.AIR_COMBO_2)) {
						this.clearAirborneFlags();
						this.Flags.Pose.add(POSE_FLAGS.AIR_COMBO_2);
					}
				} else if (currentFrame.isClearingAirborne()) {
					if (hasFlag(currentFrame.FlagsToClear.Pose, POSE_FLAGS.AIR_BRAKES))
						this.stopJump(true);
					else
						this.stopJump();
				}
			}

			if (!this.FrameFreeze) {
				//if the player is still airborne then apply next step
				if (this.isAirborne()) {
					if (this.isBlocking()) {
						this.Flags.Player.remove(PLAYER_FLAGS.MOBILE);
						this.forceHoldFrame(frame);
					}
					if (!this.advanceJump() && !this.CurrentAnimation.Animation.IsThrow) {
						this.tryChainAnimation(frame);
						return;
					}
				}
			}
			//some moves (crouch) require frame to not change, this simulates that.
			if (!!this.CurrentFrame && hasFlag(this.CurrentFrame.FlagsToSet.Player, PLAYER_FLAGS.HOLD_FRAME) && !this.IgnoreHoldFrame) {
				//get the key that must be pressed
				//var key = this.CurrentAnimation.Animation.getKey(this.CurrentAnimation.Animation.getKeySequenceLength() - 1);
				var state = this.CurrentAnimation.Animation.ButtonSequence[this.CurrentAnimation.Animation.ButtonSequence.length - 1];
				//if the key is NOT pressed, then offset into the next frame in the current move
				if (!this.hasButtonState(state)) {
					this.forceNextFrame(frame);
					//must clear frame because the current frame has a HOLD_FRAME flag
					this.setCurrentFrame(null, frame);
					this.CurrentAnimation.StartFrame -= 1;
					return this.frameMove(frame, stageX, stageY);
				}
			}
			//Does the move require the key to be held?
			else if (!!currentFrame && hasFlag(currentFrame.FlagsToSet.Player, PLAYER_FLAGS.MUST_HOLD_KEY)) {
				//the last key in the keySequence must be the required key
				//var key = this.CurrentAnimation.Animation.getKey(this.CurrentAnimation.Animation.getKeySequenceLength() - 1);
				var state = this.CurrentAnimation.Animation.ButtonSequence[this.CurrentAnimation.Animation.ButtonSequence.length - 1];
				//... and was the key pressed?
				if (this.hasButtonState(state)) {
					this.setCurrentFrame(currentFrame, frame, stageX, stageY);
				} else {
					//the required key is not pressed, look for a new move
					this.tryChainAnimation(frame, stageX, stageY);
				}
			} else if (!currentFrame) {
				this.tryChainAnimation(frame, stageX, stageY);
			} else {
				if (!this.CurrentFrame || (currentFrame.ID !== this.CurrentFrame.ID)) {
					this.setCurrentFrame(currentFrame, frame, stageX, stageY);
				}
			}
		} else {
			//No more frames for the move.
			this.tryChainAnimation(frame);
		}
	} else {
		this.tryChainAnimation(frame);
	}

	//this.CheckedForAnimationFrame = false;
	this.cleanUpButtonStateChanges(frame);
	//this.debugShowKeys();
};
//Sets the team and initializes the energy bar and portriat
Player.prototype.setupInfo = function (value, side) {
	this.Team = value;
	this.User.setTeam(value);
	this.PortriatImageSrc = this.PortriatImageSrc.replace("x-", side + "-");

	this.createKeysElement();
};
//remove any DOM element that was added by this instance
Player.prototype.release = function() {
	this.pause();
	var parentElement = (parentElement || window.document.getElementById("pnlStage"));

	for (var i = 0; i < this.FrontHitReportImages.length; ++i)
		utils_.removeFromDOM(this.FrontHitReportImages[i]);
	for (var i = 0; i < this.RearHitReportImages.length; ++i)
		utils_.removeFromDOM(this.RearHitReportImages[i]);
	for (var i = 0; i < this.OtherAnimations.Dirt.length; ++i)
		utils_.removeFromDOM(this.OtherAnimations.Dirt[i].Element);
	for (var i = 0; i < this.OtherAnimations.BigDirt.length; ++i)
		utils_.removeFromDOM(this.OtherAnimations.BigDirt[i].Element);
	this.clearProjectiles();

	/*
	for(var i = 0; i < this.Projectiles.length; ++i)
		this.Projectiles[i].release();
	for(var i = 0; i < this.Throws.length; ++i)
		this.Throws[i].release();
	for(var i = 0; i < this.Moves.length; ++i)
		this.Moves[i].release();
	*/

	utils_.releaseArray(this.FrontHitReportImages);
	utils_.releaseArray(this.RearHitReportImages);
	utils_.releaseArray(this.OtherAnimations.Dirt);
	utils_.releaseArray(this.OtherAnimations.BigDirt);
	utils_.releaseArray(this.Projectiles);
	utils_.releaseArray(this.Throws);
	utils_.releaseArray(this.Moves);


	this.releaseDebugElements();

	utils_.removeFromDOM(this.ShadowContainer);
	utils_.removeFromDOM(this.Element);
	utils_.removeFromDOM(this.DizzyElement);
	utils_.removeFromDOM(this.FireElement);

	if (!!this.User) {
		this.User.Player = null;
		if (this.Ai.isRunning()) {
			this.User.reset(true);
		}
		this.User = null;
	}
	this.Flags.release();
	this.Ai.release();
};

Player.prototype.pause = function() {
	if (this.isDizzy())
		soundManager_.pause("audio/misc/dizzy.zzz");
};

Player.prototype.resume = function() {
	if (this.isDizzy())
		soundManager_.resume("audio/misc/dizzy.zzz");
};

Player.prototype.justWon = function (frame) {
	//this.WinAnimationFrame = frame + CONSTANTS.ROUND_OVER_DELAY + (getRand(40) - 10);
};

Player.prototype.setButtons = function (user) {
	this.Buttons = {};
	this.Buttons[user.Left] = {Button: user.Left, Bit: 1};
	this.Buttons[user.Right] = {Button: user.Right, Bit: 2};
	this.Buttons[user.Up] = {Button: user.Up, Bit: 4};
	this.Buttons[user.Down] = {Button: user.Down, Bit: 8};
	this.Buttons[user.P1] = {Button: user.P1, Bit: 16};
	this.Buttons[user.P2] = {Button: user.P2, Bit: 32};
	this.Buttons[user.P3] = {Button: user.P3, Bit: 64};
	this.Buttons[user.K1] = {Button: user.K1, Bit: 128};
	this.Buttons[user.K2] = {Button: user.K2, Bit: 256};
	this.Buttons[user.K3] = {Button: user.K3, Bit: 512};
	this.Buttons[user.Turn] = {Button: user.Turn, Bit: 1024};

	this.ButtonStates = [];
	this.ButtonState = {};
	this.ButtonState[this.Buttons[user.Left].Bit] = {Value: BUTTON_STATE.NONE, Frame: 0};
	this.ButtonState[this.Buttons[user.Right].Bit] = {Value: BUTTON_STATE.NONE, Frame: 0};
	this.ButtonState[this.Buttons[user.Up].Bit] = {Value: BUTTON_STATE.NONE, Frame: 0};
	this.ButtonState[this.Buttons[user.Down].Bit] = {Value: BUTTON_STATE.NONE, Frame: 0};
	this.ButtonState[this.Buttons[user.P1].Bit] = {Value: BUTTON_STATE.NONE, Frame: 0};
	this.ButtonState[this.Buttons[user.P2].Bit] = {Value: BUTTON_STATE.NONE, Frame: 0};
	this.ButtonState[this.Buttons[user.P3].Bit] = {Value: BUTTON_STATE.NONE, Frame: 0};
	this.ButtonState[this.Buttons[user.K1].Bit] = {Value: BUTTON_STATE.NONE, Frame: 0};
	this.ButtonState[this.Buttons[user.K2].Bit] = {Value: BUTTON_STATE.NONE, Frame: 0};
	this.ButtonState[this.Buttons[user.K3].Bit] = {Value: BUTTON_STATE.NONE, Frame: 0};
	this.ButtonState[this.Buttons[user.Turn].Bit] = {Value: BUTTON_STATE.NONE, Frame: 0};

	this.LeftKey = user.Left;
	this.RightKey = user.Right;

	if (this.Direction === -1) {
		this.Buttons[this.LeftKey].Bit = 2;
		this.Buttons[this.RightKey].Bit = 1;
	} else {
		this.Buttons[this.LeftKey].Bit = 1;
		this.Buttons[this.RightKey].Bit = 2;
	}

}
