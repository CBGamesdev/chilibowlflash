var CreateAkumaAI = function (player) {
	var FLAGS = {
		DONE: 1 << 1
		, MOVE_TO_ENEMY: 1 << 2
		, MOBILE_ME: 1 << 3
		, GROUNDED_ENEMY: 1 << 4
		, CLEAR_INPUT: 1 << 5
		, CLEAR_OTHER_INPUT: 1 << 6
		, RESET: 1 << 7
		, JUMP_IN: 1 << 8
		, CANCEL_IF_ANIMATION_CHANGED: 1 << 9
		, ROLL_TO_ENEMY: 1 << 10
	};

	var teleportCloseBackInput_ = [{IsDown: true, Button: BUTTONS.BACK}, {IsDown: false, Button: BUTTONS.BACK}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.BACK}, {IsDown: true, Button: BUTTONS.LIGHT_PUNCH}, {IsDown: true, Button: BUTTONS.MEDIUM_PUNCH}, {IsDown: true, Button: BUTTONS.HARD_PUNCH}];
	var teleportFarBackInput_ = [{IsDown: true, Button: BUTTONS.BACK}, {IsDown: false, Button: BUTTONS.BACK}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.BACK}, {IsDown: true, Button: BUTTONS.LIGHT_KICK}, {IsDown: true, Button: BUTTONS.MEDIUM_KICK}, {IsDown: true, Button: BUTTONS.HARD_KICK}];
	var teleportCloseFowardInput_ = [{IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.LIGHT_PUNCH}, {IsDown: true, Button: BUTTONS.MEDIUM_PUNCH}, {IsDown: true, Button: BUTTONS.HARD_PUNCH}];
	var teleportFarForwardInput_ = [{IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.LIGHT_KICK}, {IsDown: true, Button: BUTTONS.MEDIUM_KICK}, {IsDown: true, Button: BUTTONS.HARD_KICK}];

	var lightSuperUppercutInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: false, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: 16}];
	var mediumSuperUppercutInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: false, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: 32}];
	var hardSuperUppercutInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: false, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: 64}];

	var lightSuperFireballInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: false, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.LIGHT_KICK}];
	var mediumSuperFireballInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: false, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.MEDIUM_KICK}];
	var hardSuperFireballInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: false, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.HARD_KICK}];

	var lightAirSuperFireballInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: false, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.LIGHT_PUNCH}];
	var mediumAirSuperFireballInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: false, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.MEDIUM_PUNCH}];
	var hardAirSuperFireballInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: false, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.HARD_PUNCH}];

	var lightFireballInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: 16}];
	var mediumFireballInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: 32}];
	var hardFireballInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: 64}];

	var lightRedFireballInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.LIGHT_KICK}];
	var mediumRedFireballInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.MEDIUM_KICK}];
	var hardRedFireballInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.HARD_KICK}];

	var lightJumpRollInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.JUMP}, {IsDown: true, Button: BUTTONS.LIGHT_PUNCH}];
	var mediumJumpRollInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.JUMP}, {IsDown: true, Button: BUTTONS.MEDIUM_PUNCH}];
	var hardJumpRollInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.JUMP}, {IsDown: true, Button: BUTTONS.HARD_PUNCH}];

	var lightSKickInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.BACK}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.LIGHT_KICK}];
	var mediumSKickInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.BACK}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.MEDIUM_KICK}];
	var hardSKickInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.BACK}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.HARD_KICK}];

	var hardRollInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.BACK}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.HARD_PUNCH}];
	var mediumRollInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.BACK}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.MEDIUM_PUNCH}];
	var lightRollInput_ = [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.BACK}, {IsDown: false, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.LIGHT_PUNCH}];

	var lightUppercutInput_ = [{IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: true, Button: 16}];
	var mediumUppercutInput_ = [{IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: true, Button: 32}];
	var hardUppercutInput_ = [{IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: true, Button: 64}];

	var kicks_ = [[{IsDown: true, Button: BUTTONS.LIGHT_KICK}], [{IsDown: true, Button: BUTTONS.MEDIUM_KICK}], [{IsDown: true, Button: BUTTONS.HARD_KICK}], [{IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.MEDIUM_KICK}]];
	var punches_ = [[{IsDown: true, Button: BUTTONS.LIGHT_PUNCH}], [{IsDown: true, Button: BUTTONS.MEDIUM_PUNCH}], [{IsDown: true, Button: BUTTONS.HARD_PUNCH}], [{IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.MEDIUM_PUNCH}]];
	var lowKicks_ = [[{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.LIGHT_KICK}], [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.MEDIUM_KICK}], [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.HARD_KICK}]];
	var lowPunches_ = [[{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.LIGHT_PUNCH}], [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.MEDIUM_PUNCH}], [{IsDown: true, Button: BUTTONS.CROUCH}, {IsDown: true, Button: BUTTONS.HARD_PUNCH}]];
	var jump_ = [{IsDown: true, Button: BUTTONS.JUMP}];
	var jumpInInput_ = [{IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.JUMP}];
	var jumpOutInput_ = [{IsDown: true, Button: BUTTONS.BACK}, {IsDown: true, Button: BUTTONS.JUMP}];
	var crouch_ = [{IsDown: true, Button: BUTTONS.CROUCH}];

	var blockInput_ = [{IsDown: true, Button: BUTTONS.BACK}];
	var stopBlockInput_ = [{IsDown: false, Button: BUTTONS.BACK}];

	var fwd_ = [{IsDown: true, Button: BUTTONS.FORWARD}];
	var bk_ = [{IsDown: true, Button: BUTTONS.BACK}];

	var throwInput1_ = [{IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.HARD_PUNCH}];
	var throwInput2_ = [{IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.HARD_KICK}];

	var AkumaAI = function() {
		this.AI = CreateGenericAI(player);
		this.initCombos();
	};

	AkumaAI.prototype.initCombos = function() {
		this.AI.SingleMoves = {
			"f": [{B: "f"}]
			, "b": [{B: "b"}]
			, "u1": [{B: "u1"}]
			, "u2": [{B: "u2"}]
			, "u3": [{B: "u3"}]
			, "lp3": [{B: "lp3"}]
			, "lk3": [{B: "lk3"}]
			, "p1": [{B: "p1"}]
			, "p2": [{B: "p2"}]
			, "fp2": [{B: "fp2"}]
			, "p3": [{B: "p3"}]
			, "k1": [{B: "k1"}]
			, "k2": [{B: "k2"}]
			, "fk2": [{B: "fk2"}]
			, "k3": [{B: "k3"}]
			, "tff": [{B: "tff"}]
			, "tfb": [{B: "tfb"}]
			, "tcf": [{B: "tcf"}]
			, "tcb": [{B: "tcb"}]
			, "fb1": [{B: "fb1"}]
			, "fb2": [{B: "fb2"}]
			, "fb3": [{B: "fb3"}]
			, "rfb1": [{B: "rfb1"}]
			, "rfb2": [{B: "rfb2"}]
			, "rfb3": [{B: "rfb3"}]
			, "sfb1": [{B: "sfb1"}]
			, "sfb2": [{B: "sfb2"}]
			, "sfb3": [{B: "sfb3"}]
			, "su1": [{B: "su1"}]
			, "su2": [{B: "su2"}]
			, "su3": [{B: "su3"}]
			, "j": [{B: "j"}]
			, "fj": [{B: "fj"}]
		};

		this.AI.CounterCloseAttackCombos = [
			[{B: "tcf"}]
			, [{B: "tcf"}]
		];

		this.AI.CloseCounterAirborneCombo = [
			[{B: "u3"}]
			, [{B: "u2"}]
			, [{B: "u1"}]
			, [{B: "tcf"}]
			, [{B: "tcf"}]
		];

		this.AI.CloseCounterAirborneVulnerableCombo = [
			[{B: "u3"}]
			, [{B: "su3"}]
			, [{B: "sfb3"}]
		];

		this.AI.CounterMedAirborneAttackCombo = [
			[{B: "u3"}]
			, [{B: "u2"}]
			, [{B: "u3"}]
		];

		this.AI.CounterFloatCombo = [
			[{B: "u3"}]
			, [{B: "u2"}]
			, [{B: "u3"}]
		];

		this.AI.CounterCloseFloatCombo = [
			[{B: "hk1"}]
			, [{B: "u2"}]
			, [{B: "u3"}]
			, [{B: "hk1"}, {A: 10, H: true}, {A: 25, B: "u3"}]
			, [{B: "hk1"}, {A: 10, H: true}, {A: 25, B: "u3"}]
		];

		this.AI.PunishFloatCombo = [
			[{B: "su3"}]
		];

		this.AI.CounterFarFloatCombo = [
			[{B: "fb1"}]
			, [{B: "fb2"}]
			, [{B: "fb3"}]
			, [{B: "sfb1"}]
			, [{B: "sfb2"}]
			, [{B: "sfb3"}]
		];

		this.AI.CounterHighFloatCombo = [
			[{B: "rfb1"}]
			, [{B: "rfb2"}]
			, [{B: "rfb3"}]
			, [{B: "sfb1"}]
			, [{B: "sfb2"}]
			, [{B: "sfb3"}]
		];

		this.AI.CounterHighFarPendingFloat = [
			[{B: "rfb3"}]
			, [{B: "rfb3"}]
		];

		this.AI.CounterHighPendingFloat = [
			[{B: "fb3"}]
			, [{B: "fb3"}]
		];

		this.AI.VeryCloseCombo = [
			[{B: "tcf"}]
			/*,[{B:"tcb"}]*/
			, [{B: "get_close", AC: true}, {B: "lk1"}, {B: "lp1"}, {B: "lp2"}, {B: "p1"}, {B: "p3"}, {B: "lk3"}, {B: "sfb1"}]
			, [{B: "get_close", AC: true}, {B: "lk1"}, {B: "lp1"}, {B: "lp2"}, {B: "p1"}, {B: "p3"}, {B: "lk3"}, {B: "sfb1"}]
			, [{B: "get_close", AC: true}, {B: "lk1"}, {B: "lp3"}, {B: "lp2"}, {B: "p3"}, {B: "fb3"}]
			, [{B: "get_close", AC: true}, {B: "lk1"}, {B: "lk3"}, {B: "hk2"}]
			, [{B: "get_close", AC: true}, {B: "k1"}, {B: "lk1"}, {B: "lk2"}, {B: "lk3"}]
			, [{B: "get_close", AC: true}, {B: "k1"}, {B: "lk1"}, {B: "lk2"}, {B: "lp2"}, {B: "lk2"}, {B: "hk3"}]
			, [{B: "get_close", AC: true}, {B: "k1"}, {B: "k2"}, {B: "lk3"}, {B: "tcb"}]
			, [{B: "get_close", AC: true}, {B: "p1"}, {B: "p2"}, {B: "u3"}]
			, [{B: "get_close", AC: true}, {B: "k1"}, {B: "k3"}, {B: "u3"}]
			, [{B: "get_close", AC: true}, {B: "k1"}, {B: "k3"}, {B: "lk3"}, {B: "rfb3"}]
			, [{B: "get_close", AC: true}, {B: "k1"}, {B: "k3"}, {B: "lk3"}, {B: "hk3"}]
			, [{B: "get_close", AC: true}, {B: "k1"}, {B: "k3"}, {B: "lk3"}, {B: "hk1"}, {B: "tcb"}]
			, [{B: "get_close", AC: true}, {B: "lk1"}, {B: "lp2"}, {B: "lp3"}, {B: "fb3"}]
			, [{B: "get_close", AC: true}, {B: "lk1"}, {B: "lp2"}, {B: "lp3"}, {B: "su3"}]
			, [{B: "get_close", AC: true}, {B: "k1"}, {B: "lk2"}, {B: "p2"}, {B: "su3"}]
			, [{B: "get_close", AC: true}, {B: "k1"}, {B: "lk2"}, {B: "p2"}, {B: "p3"}, {B: "hk1"}]
			, [{B: "get_close", AC: true}, {B: "lk1"}, {B: "lk2"}, {B: "lp2"}, {B: "lk2"}, {B: "lk3"}, {B: "sfb3"}]
			, [{B: "get_close", AC: true}, {B: "lp3"}, {B: "p2"}, {B: "u3"}]
			, [{B: "get_close", AC: true}, {B: "p3"}, {B: "p1"}, {B: "p2"}, {B: "k1"}, {B: "lk2"}, {B: "sfb1"}]
			, [{B: "get_close", AC: true}, {B: "lp1"}, {B: "p1"}, {B: "p2"}, {B: "p3"}, {B: "p1"}, {B: "lk2"}, {B: "su3"}]
			, [{B: "get_close", AC: true}, {B: "p1"}, {B: "k1"}, {B: "p1"}, {B: "p2"}, {B: "lp2"}, {B: "lk3"}, {B: "hk1"}, {B: "su1"}]
			, [{B: "get_close", AC: true}, {B: "k1"}, {B: "p2"}, {B: "lp2"}, {B: "p2"}, {B: "p3"}, {B: "hk1"}]
			, [{B: "get_close", AC: true}, {B: "lp1"}, {B: "lp2"}, {B: "lp3"}, {B: "u1"}]
			, [{B: "get_close", AC: true}, {B: "lk1"}, {B: "lk2"}, {B: "lk3"}, {B: "u1"}]
		];

		this.AI.CloseCombos = [
			[{B: "get_close", C: 100, AC: true}, {B: "k1"}, {B: "su1"}]
			, [{B: "get_close", C: 100, AC: true}, {B: "k1"}, {B: "hk3"}]
			, [{B: "get_close", C: 100, AC: true}, {B: "lk2"}, {B: "su3"}]
			, [{B: "get_close", C: 100, AC: true}, {B: "lk2"}, {B: "hk3"}]
			, [{B: "get_close", C: 50, AC: true}, {B: "p1"}, {B: "p3"}, {B: "su3"}]
			, [{B: "get_close", C: 50, AC: true}, {B: "lk3"}, {B: "hk1"}, {B: "u1"}]
			, [{B: "get_close", C: 50, AC: true}, {B: "lk2"}, {B: "lk3"}, {B: "hk1"}, {B: "u1"}]
			, [{B: "get_close", C: 50, AC: true}, {B: "lk2"}, {B: "lk3"}, {B: "hk1"}, {B: "u3"}]
			, [{B: "get_close", C: 45, AC: true}, {B: "k3"}, {B: "k1"}, {B: "sfb1"}]
			, [{B: "get_close", C: 45, AC: true}, {B: "p1"}, {B: "k1"}, {B: "lk3"}, {B: "hk3"}]
			, [{B: "get_close", C: 35, AC: true}, {B: "p2"}, {B: "lp2"}, {B: "lk3"}, {B: "hk1"}, {B: "su1"}]
			, [{B: "get_close", C: 100, AC: true}, {B: "lk3"}, {B: "su1"}]
			, [{B: "get_close", C: 100, AC: true}, {B: "lk2"}, {B: "su1"}]
			, [{B: "get_close", C: 10, AC: true}, {B: "p1"}, {B: "p2"}, {B: "lp2"}, {B: "lk2"}, {B: "sfb1"}]
			, [{B: "get_close", C: 10, AC: true}, {B: "k1"}, {B: "lp2"}, {B: "lk1"}, {B: "lk2"}, {B: "sfb1"}]
			, [{B: "get_close", C: 10, AC: true}, {B: "k1"}, {B: "lp2"}, {B: "lk1"}, {B: "lk3"}, {B: "hk1"}, {B: "u3"}]
			, [{B: "get_close", C: 10, AC: true}, {B: "lp2"}, {B: "lp1"}, {B: "lk1"}, {B: "lk2"}, {B: "fb1"}]
			, [{B: "get_close", C: 10, MH: true}, {A: 0, B: "p1", H: true}, {A: 7, B: "p2", H: true}, {A: 10, B: "lk1", H: true}, {A: 14, B: "lk3", H: true}, {A: 14, B: "jr3"}, {A: 25, B: "su1"}]
			, [{B: "get_close", C: 10, MH: true}, {A: 0, B: "k1", H: true}, {A: 7, B: "lk1", H: true}, {A: 12, B: "lk2", H: true}, {A: 13, B: "lk3", H: true}, {A: 15, B: "jr1"}, {A: 24, B: "su1"}]
			, [{B: "get_close", C: 100, AC: true}, {B: "lk2"}, {B: "jr3"}, {AC: false, A: 22, B: "lk2"}, {A: 18, B: "f"}, {A: 2, B: "fk2"}, {AC: true, A: 25, B: "lp1"}, {B: "p1"}, {B: "lp1"}, {B: "lk3"}, {B: "hk1"}, {B: "su1"}]
			, [{B: "get_close", C: 100, AC: true}, {B: "lk2"}, {B: "jr3"}, {AC: false, A: 22, B: "lk2"}, {A: 18, B: "f"}, {A: 2, B: "fk2"}, {AC: true, A: 25, B: "lp1"}, {B: "p1"}, {B: "lp1"}, {B: "lk2"}, {B: "lk3"}, {B: "rfb1"}]
			, [{B: "get_close", C: 100, AC: true}, {B: "lk2"}, {B: "jr3"}, {AC: false, A: 22, B: "lk2"}, {A: 18, B: "f"}, {A: 2, B: "fk2"}, {AC: true, A: 25, B: "lp1"}, {B: "p1"}, {B: "lp1"}, {B: "lk2"}, {B: "lk3"}, {B: "jr1"}, {AC: false, A: 25, B: "su1"}]
			, [{B: "get_close", C: 100, AC: true}, {B: "lk2"}, {B: "jr3"}, {AC: false, A: 21, B: "lk2"}, {A: 18, B: "f"}, {A: 2, B: "fp2"}, {AC: true, A: 29, B: "lp1"}, {B: "lp2"}, {B: "lk3"}, {B: "rfb1"}]
			, [{B: "get_close", C: 100, AC: true}, {B: "lk2"}, {B: "jr3"}, {AC: false, A: 21, B: "lk2"}, {A: 18, B: "f"}, {A: 2, B: "fp2"}, {A: 30, B: "k2"}, {AC: true, A: 30, B: "fb3"}]
		];

		this.AI.BehindCombos = [
			[{B: "lk3", AC: true}, {B: "hk3"}]
			, [{B: "lk3", AC: true}, {B: "rfb3"}]
			, [{B: "p3", AC: true}, {B: "lk3"}, {B: "u3"}]
			, [{B: "lp2", AC: true}, {B: "lk2"}, {B: "lk3"}, {B: "su1"}]
			, [{B: "lp2", AC: true}, {B: "lk2"}, {B: "lk3"}, {B: "sfb1"}]
			, [{B: "k2", AC: true}, {B: "lk2"}, {B: "su1"}]
			, [{B: "k1", AC: true}, {B: "k2"}, {B: "fb3"}]
			, [{B: "p3", AC: true}, {B: "k1"}, {B: "hk1"}]
			, [{B: "k2", AC: true}, {B: "k1"}, {B: "fb3"}]
			, [{B: "f", AC: true}, {B: "fp2"}, {B: "lk3"}, {B: "rfb3"}]
			, [{B: "f", AC: true}, {B: "fp2"}, {B: "lk2"}, {B: "su1"}]
		];

		this.AI.Airfireballs = [
			[{B: "fb1"}]
			, [{B: "fb2"}]
			, [{B: "fb3"}]
		];

		this.AI.CounterClosePendingProjectile = [
			[{B: "u1"}]
			, [{B: "u2"}]
			, [{B: "u3"}]
			, [{B: "tcf"}]
			, [{B: "lk1", AC: true}, {B: "lk3"}, {B: "hk3"}]
			, [{B: "lk1", AC: true}, {B: "lk3"}, {B: "su1"}]
			, [{B: "lk1", AC: true}, {B: "lk3"}, {B: "sfb1"}]
			, [{B: "lp1", AC: true}, {B: "lk3"}, {B: "sfb1"}]
		];

		this.AI.CounterPendingProjectile = [
			[{B: "fj"}, {A: 27, B: "su1"}]
			, [{B: "tcf"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "f"}, {A: 2, B: "fp2"}, {A: 31, B: "lk2"}, {A: 15, B: "lk3"}, {A: 15, B: "hk1"}, {A: 55, B: "su1"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "f"}, {A: 2, B: "fp2"}, {A: 31, B: "lk2"}, {A: 15, B: "lk3"}, {A: 15, B: "hk1"}, {A: 55, B: "u3"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "f"}, {A: 2, B: "fp2"}, {A: 31, B: "lk2"}, {A: 15, B: "lk3"}, {A: 15, B: "hk3"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "f"}, {A: 2, B: "fk2"}, {A: 34, B: "lk1"}, {A: 10, B: "lk2"}, {A: 9, B: "lp2"}, {A: 16, B: "p1"}, {A: 15, B: "p3"}, {A: 15, B: "lk3"}, {A: 15, B: "sfb1"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "f"}, {A: 2, B: "fk2"}, {A: 34, B: "lk3"}, {A: 15, B: "hk1"}, {A: 47, B: "u3"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "f"}, {A: 2, B: "fk2"}, {A: 34, B: "lk3"}, {A: 15, B: "u1"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "f"}, {A: 2, B: "fk2"}, {A: 34, B: "k3"}, {A: 15, B: "p3"}, {A: 15, B: "lk3"}, {A: 15, B: "u1"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "k2"}, {A: 27, B: "su1"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "k1", H: true}, {A: 7, B: "lk1", H: true}, {A: 14, B: "k1", H: true}, {A: 16, B: "k2", H: true}, {A: 17, B: "lk3", H: true}, {A: 18, B: "sfb1"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "lk1", H: true}, {A: 7, B: "k2", H: true}, {A: 12, B: "p1", H: true}, {A: 14, B: "p3", H: true}, {A: 18, B: "lk2", H: true}, {A: 18, B: "sfb1"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "k1", H: true}, {A: 7, B: "lk1", H: true}, {A: 14, B: "k1", H: true}, {A: 16, B: "k2", H: true}, {A: 17, B: "lk3", H: true}, {A: 18, B: "su1"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "lk1", H: true}, {A: 7, B: "k2", H: true}, {A: 12, B: "p1", H: true}, {A: 14, B: "p3", H: true}, {A: 18, B: "lk2", H: true}, {A: 18, B: "su1"}]

			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "f"}, {A: 2, B: "fk2"}, {AC: true, B: "lp2"}, {B: "jr3"}, {B: "fb1"}, {B: "lk2"}, {B: "lk3"}, {B: "tfb"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "f"}, {A: 2, B: "fk2"}, {AC: true, B: "lp2"}, {B: "jr3"}, {B: "fb1"}, {B: "lk3"}, {B: "tfb"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "f"}, {A: 2, B: "fk2"}, {AC: true, B: "lp2"}, {B: "jr3"}, {B: "fb1"}, {B: "k1"}, {B: "k2"}, {B: "fb3"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "f"}, {A: 2, B: "fk2"}, {AC: true, B: "lp2"}, {B: "jr3"}, {B: "fb1"}, {B: "lk3"}, {B: "hk1"}, {B: "u3"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "f"}, {A: 2, B: "fk2"}, {AC: true, B: "lp2"}, {B: "jr3"}, {B: "fb1"}, {B: "lk3"}, {B: "sfb1"}]
			, [{B: "fj", C: 200, D: -40, MH: true}, {A: 28, B: "fb1"}, {A: 24, B: "f"}, {A: 2, B: "fk2"}, {AC: true, B: "lk2"}, {B: "jr3"}, {B: "fb1"}, {B: "lk3"}, {AC: false, A: 2, B: "jr3"}, {A: 30, B: "su1"}]
		];

		this.AI.CounterProjectileMoved = [
			[{B: "j"}]
			, [{B: "tcf"}]
			, [{B: "tcf"}]
		];

		this.AI.JumpThrustKickCombos = [
			[{B: "jdk", C: 200, D: -999, MH: true}, {A: 21, B: "lk1", H: true}, {A: 7, B: "lk2"}, {A: 11, B: "lk3", H: true}, {A: 16, B: "rfb3"}]
			, [{B: "jdk", C: 200, D: -999, MH: true}, {A: 21, B: "lk1", H: true}, {A: 7, B: "lk2"}, {A: 11, B: "lk3", H: true}, {A: 16, B: "sfb3"}]
			, [{B: "jdk", C: 200, D: -999, MH: true}, {A: 21, B: "lk1", H: true}, {A: 7, B: "lk2"}, {A: 11, B: "lk3", H: true}, {A: 17, B: "hk1"}, {A: 55, B: "u3"}]
			, [{B: "jdk", C: 200, D: -999, MH: true}, {A: 21, B: "p2", H: true}, {A: 13, B: "u3"}]
			, [{B: "jdk", C: 200, D: -999, MH: true}, {A: 21, B: "p2", H: true}, {A: 13, B: "su3"}]
			, [{B: "jdk", C: 200, D: -999, MH: true}, {A: 21, B: "p2", H: true}, {A: 5, B: "lk3", H: true}, {A: 18, B: "sfb3"}]
			, [{B: "jdk", C: 200, D: -999, MH: true}, {A: 21, B: "lp3", H: true}, {A: 7, B: "u3"}]
			, [{B: "jdk", C: 200, D: -999, MH: true}, {A: 21, B: "lp3", H: true}, {A: 7, B: "su3"}]
			, [{B: "jdk", C: 200, D: -999, MH: true}, {A: 21, B: "lp3", H: true}, {A: 7, B: "sfb3"}]
			, [{B: "jdk", C: 200, D: -999, MH: true}, {A: 21, B: "lp1"}, {A: 7, B: "lp2"}, {A: 15, B: "lk2", H: true}, {A: 18, B: "su1"}]
			, [{B: "jdk", C: 200, D: -999, MH: true}, {A: 21, B: "p1", H: true}, {A: 9, B: "k1"}, {A: 13, B: "lk2"}, {A: 11, B: "lk3", H: true}, {A: 18, B: "sfb3"}]
			, [{B: "jdk", C: 200, D: -999, MH: true}, {A: 21, B: "p3"}, {A: 7, B: "p1"}, {A: 18, B: "p3"}, {A: 15, B: "lk3", H: true}, {A: 18, B: "hk3"}]
			, [{B: "jdk", C: 200, D: -999, MH: true}, {A: 21, B: "p1"}, {A: 5, B: "p2"}, {A: 11, B: "p3"}, {A: 17, B: "lk3"}, {A: 18, B: "hk1"}, {A: 55, B: "su1"}]
			, [{B: "get_close", C: 70, AC: true}, {B: "jhdk"}, {B: "lk1"}, {B: "k1"}, {B: "lk1"}, {B: "k1"}, {B: "lk1"}, {B: "k1"}, {B: "lk2"}, {B: "sfb1"}]
		];

		//incomplete jhdk combos
		//[{A:0, B:"jhdk", C:50}, {MH:true, A:36, B:"f"}, {A:2, B:"fk2"}, {A:26, B:"f"}, {AC:true, A:2, B:"fk2"}, {B:"p2"}, {B:"lp2"}, {B:"u3"}]

		// :-)
		this.AI.JumpRollCombos = [];

		this.AI.CounterPendingProjectileFar = [
			[{B: "get_close", C: 400, MH: true}, {A: 0, B: "jr3"}, {A: 24, B: "fb1"}, {A: 34, B: "f"}, {A: 2, B: "fk2"}, {AC: true, B: "lp2"}, {B: "jr3"}, {B: "fb1"}, {B: "lk2"}, {B: "lk3"}, {B: "hk1"}, {B: "su1"}]
		];
	};

	AkumaAI.prototype.doCounterMedAirborneAttackCombo = function (which) {
		this.execute(this.AI.CounterMedAirborneAttackCombo[which || getRand(this.AI.CounterMedAirborneAttackCombo.length)]);
	};

	AkumaAI.prototype.doCloseCounterAirborneVulnerableCombo = function (which) {
		this.execute(this.AI.CloseCounterAirborneVulnerableCombo[which || getRand(this.AI.CloseCounterAirborneVulnerableCombo.length)]);
	};

	AkumaAI.prototype.doCounterCloseAttackCombos = function (which) {
		this.execute(this.AI.CounterCloseAttackCombos[which || getRand(this.AI.CounterCloseAttackCombos.length)]);
	};

	AkumaAI.prototype.doCloseCounterAirborneCombo = function (which) {
		this.execute(this.AI.CloseCounterAirborneCombo[which || getRand(this.AI.CloseCounterAirborneCombo.length)]);
	};

	AkumaAI.prototype.doJumpThrustKickComboCombo = function (which) {
		this.execute(this.AI.JumpThrustKickCombos[which || getRand(this.AI.JumpThrustKickCombos.length)]);
	};

	AkumaAI.prototype.doVeryCloseCombo = function (which) {
		this.execute(this.AI.VeryCloseCombo[which || getRand(this.AI.VeryCloseCombo.length)]);
	};

	AkumaAI.prototype.doBehindCombo = function (which) {
		this.execute(this.AI.BehindCombos[which || getRand(this.AI.BehindCombos.length)]);
	};

	AkumaAI.prototype.doCloseCombo = function (which) {
		this.execute(this.AI.CloseCombos[which || getRand(this.AI.CloseCombos.length)]);
	};

	AkumaAI.prototype.doCounterFloat = function (which) {
		this.execute(this.AI.CounterFloatCombo[which || getRand(this.AI.CounterFloatCombo.length)]);
	};

	AkumaAI.prototype.doCounterFarFloat = function (which) {
		this.execute(this.AI.CounterFarFloatCombo[which || getRand(this.AI.CounterFarFloatCombo.length)]);
	};

	AkumaAI.prototype.doCounterHighFloat = function (which) {
		this.execute(this.AI.CounterHighFloatCombo[which || getRand(this.AI.CounterHighFloatCombo.length)]);
	};

	AkumaAI.prototype.doCounterCloseFloat = function (which) {
		this.execute(this.AI.CounterCloseFloatCombo[which || getRand(this.AI.CounterCloseFloatCombo.length)]);
	};

	AkumaAI.prototype.doCounterHighFarPendingFloat = function (which) {
		this.execute(this.AI.CounterHighFarPendingFloat[which || getRand(this.AI.CounterHighFarPendingFloat.length)]);
	};

	AkumaAI.prototype.doCounterHighPendingFloat = function (which) {
		this.execute(this.AI.CounterHighPendingFloat[which || getRand(this.AI.CounterHighPendingFloat.length)]);
	};

	AkumaAI.prototype.doAirFireball = function (which) {
		this.execute(this.AI.Airfireballs[which || getRand(this.AI.Airfireballs.length)]);
	};

	AkumaAI.prototype.doCounterProjectileMoved = function (which) {
		this.execute(this.AI.CounterProjectileMoved[which || getRand(this.AI.CounterProjectileMoved.length)]);
	};

	AkumaAI.prototype.doCounterPendingProjectile = function (which) {
		this.execute(this.AI.CounterPendingProjectile[which || getRand(this.AI.CounterPendingProjectile.length)]);
	};

	AkumaAI.prototype.doCounterPendingProjectileFar = function (which) {
		this.execute(this.AI.CounterPendingProjectileFar[which || getRand(this.AI.CounterPendingProjectileFar.length)]);
	};

	AkumaAI.prototype.doCounterClosePendingProjectile = function (which) {
		this.execute(this.AI.CounterClosePendingProjectile[which || getRand(this.AI.CounterClosePendingProjectile.length)]);
	};

	AkumaAI.prototype.doJumpThrustKickCombo = function (which) {
		this.execute(this.AI.JumpThrustKickCombos[which || getRand(this.AI.JumpThrustKickCombos.length)]);
	};

	AkumaAI.prototype.doPunishFloat = function (which) {
		if (getRand() > 50)
			return this.throwSuperFireball(true);
		else
			return this.doSuperUppercut(true);
	};

	AkumaAI.prototype.getForwardKey = function () {
		this.AI.Player.MustChangeDirection ? BUTTONS.BACK : BUTTONS.FORWARD;
	};

	AkumaAI.prototype.wanderForward = function (nbFrames) {
		this.AI.Actions.push(this.AI.createAction(0, null, fwd_));
		this.AI.Actions.push(this.AI.createAction(nbFrames, FLAGS.CLEAR_INPUT));
	};

	AkumaAI.prototype.wanderBackward = function (nbFrames) {
		this.AI.Actions.push(this.AI.createAction(0, null, bk_));
		this.AI.Actions.push(this.AI.createAction(nbFrames, FLAGS.CLEAR_INPUT));
	};

	AkumaAI.prototype.throwSuperFireball = function (forced) {
		var energyLevel = this.AI.Player.getEnergyLevel();
		if (energyLevel > 0) {
			if ((getRand() > 50) || !!forced) {
				var which = Math.floor(Math.random() * energyLevel) + 1;
				switch (which) {
					case ENERGYBAR.LEVELMAXED:
						this.reset();
						this.doMove("sfb3");
						break;
					case ENERGYBAR.LEVEL2:
						this.reset();
						this.doMove("sfb2");
						break;
					case ENERGYBAR.LEVEL1:
						this.reset();
						this.doMove("sfb1");
						break;
					default:
						return false;
				}

				this.AI.sendInput(FLAGS.CLEAR_INPUT, 10);
				return true;
			}
		}
		return false;
	};

	AkumaAI.prototype.doSuperUppercut = function (forced) {
		var energyLevel = this.AI.Player.getEnergyLevel();
		if (energyLevel > 0) {
			if ((getRand() > 50) || !!forced) {
				var which = Math.floor(Math.random() * energyLevel) + 1;
				switch (which) {
					case ENERGYBAR.LEVELMAXED:
						this.reset();
						this.doMove("su3");
						break;
					case ENERGYBAR.LEVEL2:
						this.reset();
						this.doMove("su2");
						break;
					case ENERGYBAR.LEVEL1:
						this.reset();
						this.doMove("su1");
						break;
					default:
						return false;
				}

				this.AI.sendInput(FLAGS.CLEAR_INPUT, 10);
				return true;
			}
		}
		return false;
	};

	AkumaAI.prototype.doJumpThrustKick = function (flags, dist) {
		this.AI.Actions.push(this.AI.createAction(0, FLAGS.JUMP_IN | flags, [{IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.BACK}], "", dist));
		this.AI.Actions.push(this.AI.createAction(2, FLAGS.NONE, [{IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.JUMP}], "", dist));
		this.AI.Actions.push(this.AI.createAction(4, FLAGS.CLEAR_INPUT));
		this.AI.Actions.push(this.AI.createAction(15, FLAGS.NONE, lowKicks_[1]));
		this.AI.Actions.push(this.AI.createAction(2, FLAGS.CLEAR_INPUT));
	};

	AkumaAI.prototype.doJumpThrustHardKick = function (flags, dist) {
		this.AI.Actions.push(this.AI.createAction(0, FLAGS.JUMP_IN | flags, [{IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: false, Button: BUTTONS.BACK}], "", dist));
		this.AI.Actions.push(this.AI.createAction(2, FLAGS.NONE, [{IsDown: true, Button: BUTTONS.FORWARD}, {IsDown: true, Button: BUTTONS.JUMP}], "", dist));
		this.AI.Actions.push(this.AI.createAction(4, FLAGS.CLEAR_INPUT));
		this.AI.Actions.push(this.AI.createAction(15, FLAGS.NONE, lowKicks_[2]));
		this.AI.Actions.push(this.AI.createAction(2, FLAGS.CLEAR_INPUT));
	};

	AkumaAI.prototype.getForwardKey = function () {
		return this.AI.Player.MustChangeDirection ? BUTTONS.BACK : BUTTONS.FORWARD;
	};

	AkumaAI.prototype.wanderForward = function (nbFrames) {
		this.AI.Actions.push(this.AI.createAction(0, null, fwd_));
		this.AI.Actions.push(this.AI.createAction(nbFrames, FLAGS.CLEAR_INPUT));
	};

	AkumaAI.prototype.wanderBackward = function (nbFrames) {
		this.AI.Actions.push(this.AI.createAction(0, null, bk_));
		this.AI.Actions.push(this.AI.createAction(nbFrames, FLAGS.CLEAR_INPUT));
	};

	AkumaAI.prototype.executeThrow = function (which, igoreMoveToEnemy) {
		if (!igoreMoveToEnemy)
			this.AI.moveToEnemy();
		this.AI.Actions.push(this.AI.createAction(0, null, fwd_));
		if (!which)
			this.AI.Actions.push(this.AI.createAction(0, null, punches_[1]));
		else
			this.AI.Actions.push(this.AI.createAction(0, null, kicks_[1]));
		this.AI.Actions.push(this.AI.createAction(CONSTANTS.ATTACKBUTTON_FRAMES, FLAGS.CLEAR_INPUT));
	};

	AkumaAI.prototype.executeFireball = function (rnd) {
		rnd = rnd || getRand();
		if (!this.AI.Player.isMobile())
			return false;
		if (rnd > 66) {
			this.AI.Actions.push(this.AI.createAction(0, FLAGS.CLEAR_INPUT, lightFireballInput_));
			this.AI.Actions.push(this.AI.createAction(1, FLAGS.CLEAR_INPUT));
			return true;
		} else {
			this.AI.Actions.push(this.AI.createAction(0, FLAGS.CLEAR_INPUT, hardFireballInput_));
			this.AI.Actions.push(this.AI.createAction(1, FLAGS.CLEAR_INPUT));
			return true;
		}
	};

	AkumaAI.prototype.parseAndSendInput = function () {
		return this.AI.parseAndSendInput();
	};

	AkumaAI.prototype.onNewRound = function() {
		this.AI.reset();
	};

	AkumaAI.prototype.reset = function() {
		this.AI.reset();
	};

	AkumaAI.prototype.test = function() {};

	AkumaAI.prototype.clearInput = function() {
		this.AI.clearInput();
	};

	AkumaAI.prototype.onStartNonAttack = function (frame, attacker) {
		this.AI.onStartNonAttack(frame, attacker);
	};
	//fired when the player gets hit
	AkumaAI.prototype.onTakeHit = function (frame, attacker) {
		this.AI.onTakeHit(frame, attacker);
	};
	//fired when the player gets hit
	AkumaAI.prototype.onBlocked = function (frame, attacker) {
		this.AI.onBlocked(frame, attacker);
	};
	//fired when any enemy attack ends in the air
	AkumaAI.prototype.onEnemyFloating = function (frame, attacker, x, y) {
		this.reactFloat(frame, attacker, x, y)
	};
	//fired when any enemy attack ends
	AkumaAI.prototype.onEnemyEndAttack = function (frame, attacker) {
		this.reactAirborne(frame, attacker);
		this.AI.clearInput();
	};
	//fired when any enemy attack ends
	AkumaAI.prototype.onEnemyVulnerable = function (frame, attacker, x, y) {
		this.AI.clearInput();
		this.react(frame, attacker, true, x, y)
	};
	//fired every frame an enemy attack is pending
	AkumaAI.prototype.onEnemyAttackPending = function (frame, x, y, player, isSuperMove) {
		//just before the projectile is actually thrown, the attacker will be used instead of the projectile
		//if the player is facing the projectile, then counter it
		var nbFrames = frame - player.CurrentAnimation.StartFrame;
		if (!this.AI.isAttackReactBusy()
			&& !this.AI.Player.isAirborne()
			/*&& !this.AI.Player.isBlocking() */
			&& !!this.AI.Player.isMobile()
			&& !isSuperMove
			&& this.AI.Player.isFacingPlayer(player, true)) {
			//stop blocking and counter the move
			if (this.AI.Player.isBlocking()) {
				this.reset();
				return;
			}

			var dist = this.AI.Player.getDistanceFrom(x, y);
			var rnd = getRand();

			if (player.isAirborne() && !this.AI.isAirborneReactBusy()) {
				if (dist.Dsq < 70000 && y > 300) {
					this.reset();
					this.doCounterMedAirborneAttackCombo();
					this.AI.setAirborneReactBusy();
				}
			} else if (!player.isAirborne()) {
				if (dist.Dsq < 80000) {
					this.reset();
					this.doCounterCloseAttackCombos();
					this.AI.setAttackReactBusy();
				}
			}
		}
	};
	//fired every frame an enemy projectile is pending
	AkumaAI.prototype.onEnemyProjectilePending = function (frame, x, y, player, isSuperMove) {
		var nbFrame = frame - player.CurrentAnimation.StartFrame;
		if (!this.AI.isProjectileReactBusy()
			&& !this.AI.Player.isAirborne()
			&& !this.AI.Player.isBlocking()
			&& !!this.AI.Player.isMobile()
			&& !isSuperMove
			&& this.AI.Player.isFacingPlayer(player, true)
			&& nbFrame < 2) {
			var rnd = getRand();

			var dist = this.AI.Player.getDistanceFromSq(x, y);
			if (dist < 42000) {
				this.reset();
				this.doCounterClosePendingProjectile();
				this.AI.setProjectileReactBusy();
			} else if (dist > 42000 && dist < 70000) {
				this.reset();
				this.doJumpThrustKickComboCombo();
				this.AI.setProjectileReactBusy();
			} else if (dist > 70000 && dist < 120000) {
				this.reset();
				this.doCounterPendingProjectile();
				this.AI.setProjectileReactBusy();
			}
		}
	};
	//fired every frame an enemy projectile is active
	AkumaAI.prototype.onEnemyProjectileMoved = function (frame, id, x, y, projectile, isSuperMove) {
		if (!!this.AI.isProjectileReactBusy() || !this.AI.Player.isFacingProjectile(projectile))
			return true;

		if (!this.AI.Player.isAirborne()
			&& this.AI.Actions.length == 0
			&& !this.AI.Player.isBlocking()
			&& !!this.AI.Player.isMobile()
			&& !isSuperMove
			&& this.AI.Player.isFacingProjectile(projectile)) {
			var dist = this.AI.Player.getDistanceFromSq(x, y);
			if (dist > 85000 && getRand() > 95) {
				this.reset();
				var rnd = getRand();
				if (rnd > 70) {
					this.executeFireball();
				} else {
					this.doCounterProjectileMoved();
				}
				this.AI.setProjectileReactBusy();
				return true;
			} else if (y < 200) {
				//jump straight up, over the projectile
				this.AI.IgnoreProjectileGone = true;
				switch (projectile.XSpeed) {
					case 10: {
						if (dist < 67000 && dist > 56000) {
							this.reset();
							this.doCounterProjectileMoved();
							this.AI.setProjectileReactBusy();
							return;
						}
						break;
					}
					case 11: {
						if (dist < 82000 && dist > 64000) {
							this.reset();
							this.doCounterProjectileMoved();
							this.AI.setProjectileReactBusy();
							return;
						}
						break;
					}
					case 12: {
						if (dist < 92000 && dist > 64000) {
							this.reset();
							this.doCounterProjectileMoved();
							this.AI.setProjectileReactBusy();
							return;
						}
						break;
					}
				}

				//block close projectiles
				if (dist < 64001)
					this.AI.onEnemyProjectileMoved(frame, x, y, projectile, isSuperMove);
				return true;
			}
		}
		return this.AI.onEnemyProjectileMoved(frame, x, y, projectile, isSuperMove);
	};
	//fired when a projectile is off screen
	AkumaAI.prototype.onEnemyProjectileGone = function (frame, id) {
		this.AI.onEnemyProjectileGone();
	};
	//fired when an enemy has been hit
	AkumaAI.prototype.onAttackStateChanged = function (who, state) {
		this.AI.onAttackStateChanged(who, state);
	};
	//fired every attack frame
	AkumaAI.prototype.onEnemyContinueAttack = function (frame, attacker, hitPoints) {
		//projectile pending will handle this.
		if (!!attacker.CurrentAnimation.Animation.IsProjectile)
			return;

		//if the player is currently blocking, then hold the block
		//onPendingAttack will try and remove the block and counter an attack!
		if (this.AI.Player.isBlocking())
			return this.AI.onEnemyContinueAttack(frame, attacker, hitPoints);

		var retVal = true;
		if (attacker.isAirborne())
			retVal = this.reactAirborne(frame, attacker, false, attacker.getMidX(), attacker.getMidY());
		else
			retVal = this.reactNotAirborne(frame, attacker, false, attacker.getMidX(), attacker.getMidY());

		if (!retVal)
			this.AI.onEnemyContinueAttack(frame, attacker, hitPoints);
	};
	//fired at the start of any enemy attack
	AkumaAI.prototype.onEnemyStartAttack = function (frame, attacker) {
		this.AI.onEnemyStartAttack(frame, attacker);
	};
	//fired at the start of any enemy attack
	AkumaAI.prototype.onStartAttack = function () {
		this.AI.onStartAttack();
	};
	//fired at the end of any attack
	AkumaAI.prototype.onEndAnimation = function (name) {
		this.AI.onEndAnimation();
	};
	//fired at the start of any attack
	AkumaAI.prototype.onStartAnimation = function (name) {
		this.AI.onStartAnimation(name);
	};

	AkumaAI.prototype.reactFloat = function (frame, attacker, x, y) {
		if (!this.AI.Player.isMobile()
			|| this.AI.isAttackReactBusy())
			return false;
		if (this.AI.Player.isFacingPlayer(attacker, true)) {
			retVal = true;

			if (this.AI.Player.isBlocking()) {
				this.reset();
				return retVal;
			}

			var dist = this.AI.Player.getDistanceFrom(x, y);
			var attackBottom = attacker.getY();

			if (dist.Dsq < 100000 && dist.Dx < 150) {
				this.reset();
				var retVal = false;
				if (dist.Dsq < 50000 && y < 300)
					retVal = this.doPunishFloat();
				else
					retVal = this.doCounterFloat();
				if (!retVal)
					this.doCounterCloseFloat();
				this.AI.setAttackReactBusy();
				return retVal;
			} else if (dist.Dsq < 160000 && y > 450) {
				this.reset();
				this.doCounterHighFloat();
				this.AI.setAttackReactBusy();
				return retVal;
			} else if (dist.Dsq < 160000 && y > 400) {
				this.reset();
				this.doCounterFarFloat();
				this.AI.setAttackReactBusy();
				return retVal;
			} else if (dist.Dsq < 80000 && y < 300 && dist.Dx < 220) {
				this.reset();
				this.doCounterCloseFloat();
				this.AI.setAttackReactBusy();
				return retVal;
			}
		}
	};

	AkumaAI.prototype.reactAirborne = function (frame, attacker, isEnemyVulernerable, x, y) {
		var retVal = false;
		if (!attacker.isAirborne()) {
			return retVal;
		}

		if (!this.AI.Player.isBlocking()) {
			if (!!this.AI.isAirborneReactBusy() && !!this.AI.Player.isCurrentMoveAttack())
				return true;
		}

		//don't try to counter a shoryuken
		if (attacker.CurrentAnimation.Animation.OverrideFlags.hasOverrideFlag(OVERRIDE_FLAGS.ALL))
			return true;

		//react to a vulnerable enemy
		if (this.AI.Player.isFacingPlayer(attacker, true)) {
			//stop blocking and counter the move
			if (this.AI.Player.isBlocking()) {
				this.reset();
				return true;
			}

			var dist = this.AI.Player.getDistanceFrom(x, y);

			if (y > 300) {
				if (!!isEnemyVulernerable) {
					if (dist.Dsq < 120000) {
						this.reset();
						this.doCloseCounterAirborneVulnerableCombo();
						this.AI.setAirborneReactBusy();
						retVal = true;
					}
				} else {
					if (dist.Dsq < 90000) {
						this.reset();
						this.doCloseCounterAirborneCombo();
						this.AI.setAirborneReactBusy();
						retVal = true;
					}
				}
			}
		}
		return retVal;
	};

	AkumaAI.prototype.reactNotAirborne = function (frame, attacker, isEnemyVulernerable, x, y) {
		var retVal = false;
		if (!this.AI.Player.isMobile())
			return retVal;

		//don't try to counter a shoryuken
		if (attacker.CurrentAnimation.Animation.OverrideFlags.hasOverrideFlag(OVERRIDE_FLAGS.ALL))
			return false;


		var rnd = getRand();
		if (rnd > 50) {
		} else {
		}

		return retVal;
	};

	AkumaAI.prototype.doMove = function (key) {
		this.execute(this.AI.SingleMoves[key]);
	};

	AkumaAI.prototype.execute = function (sequence) {
		var input = null;
		var mustHit = false;
		var autoContinue = false;
		var forceBusy = false;
		for (var i = 0; i < sequence.length; ++i) {
			var requiredState = 0;
			forceBusy = false;
			//mustHit is applied after the array element at which it was found
			if (!!mustHit)
				sequence[i].H = true;
			if (!!autoContinue && sequence[i].AC === undefined)
				sequence[i].AC = true;

			if (!!sequence[i].MH)
				mustHit = true;
			if (!!sequence[i].AC)
				autoContinue = true;
			if (!!sequence[i].SB)
				forceBusy = true;

			requiredState = this.AI.getRequiredState(sequence[i].B);
			/*
            if(sequence[i].B == "lp1" || sequence[i].B == "lp2" || sequence[i].B == "lp3" || sequence[i].B == "lk1" || sequence[i].B == "lk2" || sequence[i].B == "lk3") { requiredState = POSE_FLAGS.CROUCHING|POSE_FLAGS.STANDING|POSE_FLAGS.ALLOW_INTERUPT_1; }
            else if(sequence[i].B == "p1" || sequence[i].B == "p3" || sequence[i].B == "k1" || sequence[i].B == "k3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
            else if(sequence[i].B == "u1" || sequence[i].B == "u2" || sequence[i].B == "u3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
            else if(sequence[i].B == "hk1" || sequence[i].B == "hk2" || sequence[i].B == "hk3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
            else if(sequence[i].B == "jr1" || sequence[i].B == "jr2" || sequence[i].B == "jr3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1|POSE_FLAGS.PENDING_JUMP; }
            else if(sequence[i].B == "fb1" || sequence[i].B == "fb2" || sequence[i].B == "fb3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1|POSE_FLAGS.ALLOW_INTERUPT_3; }
            else if(sequence[i].B == "rfb1" || sequence[i].B == "rfb2" || sequence[i].B == "rfb3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
            else if(sequence[i].B == "sfb1" || sequence[i].B == "sfb2" || sequence[i].B == "sfb3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
            else if(sequence[i].B == "su1" || sequence[i].B == "su2" || sequence[i].B == "su3") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_FORWARD|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1|POSE_FLAGS.ALLOW_INTERUPT_3; }
            else if(sequence[i].B == "p2" || sequence[i].B == "k2") { requiredState = POSE_FLAGS.STANDING|POSE_FLAGS.CROUCHING|POSE_FLAGS.WALKING_BACKWARD|POSE_FLAGS.ALLOW_INTERUPT_1; }
            */

			input = null;
			switch (sequence[i].B) {
				case "f" : {
					input = fwd_;
					break;
				}
				case "b" : {
					input = bk_;
					break;
				}
				case "get_close" : {
					this.AI.moveToEnemy(0, sequence[i].C);
					break;
				}
				case "jump_in" : {
					if (this.AI.getClosestEnemy().X < (sequence[i].D || this.AI.TOO_CLOSE)) {
						return;
					}
					this.AI.jumpInToEnemy(0, sequence[i].C);
					continue;
				}
				case "j" : {
					this.AI.jumpUp(undefined, undefined, sequence[i].A);
					continue;
				}
				case "fj" : {
					this.AI.jumpTowardEnemy(undefined, undefined, sequence[i].A);
					continue;
				}
				case "bj" : {
					this.AI.jumpAwayFromEnemy(undefined, undefined, sequence[i].A);
					continue;
				}
				case "lp1" : {
					input = lowPunches_[0];
					break;
				}
				case "lp2" : {
					input = lowPunches_[1];
					break;
				}
				case "lp3" : {
					input = lowPunches_[2];
					break;
				}
				case "p1" : {
					input = punches_[0];
					break;
				}
				case "p2" : {
					input = punches_[1];
					break;
				}
				case "fp2" : {
					input = punches_[3];
					break;
				}
				case "p3" : {
					input = punches_[2];
					break;
				}
				case "k1" : {
					input = kicks_[0];
					break;
				}
				case "k2" : {
					input = kicks_[1];
					break;
				}
				case "fk2" : {
					input = kicks_[3];
					break;
				}
				case "k3" : {
					input = kicks_[2];
					break;
				}
				case "lk1" : {
					input = lowKicks_[0];
					break;
				}
				case "lk2" : {
					input = lowKicks_[1];
					break;
				}
				case "lk3" : {
					input = lowKicks_[2];
					break;
				}
				case "jr1" : {
					input = lightJumpRollInput_;
					break;
				}
				case "jr2" : {
					input = mediumJumpRollInput_;
					break;
				}
				case "jr3" : {
					input = hardJumpRollInput_;
					break;
				}
				case "fb1" : {
					input = lightFireballInput_;
					break;
				}
				case "fb2" : {
					input = mediumFireballInput_;
					break;
				}
				case "fb3" : {
					input = hardFireballInput_;
					break;
				}
				case "rfb1" : {
					input = lightRedFireballInput_;
					break;
				}
				case "rfb2" : {
					input = mediumRedFireballInput_;
					break;
				}
				case "rfb3" : {
					input = hardRedFireballInput_;
					break;
				}
				case "sfb1" : {
					input = lightSuperFireballInput_;
					break;
				}
				case "sfb2" : {
					input = mediumSuperFireballInput_;
					break;
				}
				case "sfb3" : {
					input = hardSuperFireballInput_;
					break;
				}
				case "su1" : {
					input = lightSuperUppercutInput_;
					break;
				}
				case "su2" : {
					input = mediumSuperUppercutInput_;
					break;
				}
				case "su3" : {
					input = hardSuperUppercutInput_;
					break;
				}
				case "hk1" : {
					input = lightSKickInput_;
					break;
				}
				case "hk2" : {
					input = mediumSKickInput_;
					break;
				}
				case "hk3" : {
					input = hardSKickInput_;
					break;
				}
				case "u1" : {
					input = lightUppercutInput_;
					break;
				}
				case "u2" : {
					input = mediumUppercutInput_;
					break;
				}
				case "u3" : {
					input = hardUppercutInput_;
					break;
				}
				case "t1" : {
					this.executeThrow(0, true);
					break;
				}
				case "t2" : {
					this.executeThrow(1, true);
					break;
				}
				case "tff" : {
					input = teleportFarForwardInput_;
					break;
				}
				case "tfb" : {
					input = teleportFarBackInput_;
					break;
				}
				case "tcf" : {
					input = teleportCloseFowardInput_;
					break;
				}
				case "tcb" : {
					input = teleportCloseBackInput_;
					break;
				}
				case "jdk" : {
					if (this.AI.getClosestEnemy().X < (sequence[i].D || this.AI.TOO_CLOSE)) {
						return;
					}
					this.doJumpThrustKick(0, sequence[i].C);
					continue;
				}
				case "jhdk" : {
					if (this.AI.getClosestEnemy().X < (sequence[i].D || this.AI.TOO_CLOSE)) {
						return;
					}
					this.doJumpThrustHardKick(0, sequence[i].C);
					continue;
				}
				default: {
					this.AI.sendInput(FLAGS.CLEAR_INPUT, sequence[i].A || 0);
					break;
				}
			}
			//this.AI.sendInput(FLAGS.CLEAR_INPUT,sequence[i].A || 0,input,sequence[i].H, undefined, sequence[i].AC, requiredState);
			this.AI.sendInputWithParams({
				flags: FLAGS.CLEAR_INPUT
				, frame: sequence[i].A || 0
				, input: input
				, mustHit: sequence[i].H
				, autoCombo: sequence[i].AC
				, requiredState: requiredState
				, forceBusy: forceBusy
			});
		}
		this.AI.sendInput(FLAGS.CLEAR_INPUT, 2);
	};

	AkumaAI.prototype.onEnemyDizzy = function (frame, attacker) {
		var dist = this.AI.Player.getDistanceFromPlayer(attacker);
		if (dist.Dx > 400) {
			this.AI.reset();
			if (!this.throwSuperFireball(true))
				this.doMove("rfb3");
			this.AI.setBusy();
		} else if (dist.Dx < 100) {
			if (getRand() > 50)
				this.executeThrow(1, true);
			else
				this.executeThrow(2, true);
		} else {
			this.doJumpThrustKickComboCombo();
		}
	};

	AkumaAI.prototype.react = function (frame, attacker, isEnemyVulernerable, x, y) {
		if (!this.AI.isAttackReactBusy()) {
			if (!this.AI.Player.isMobile())
				return;
			if (!!this.reactAirborne(frame, attacker, isEnemyVulernerable, x, y)) {
			} else if (!!this.reactNotAirborne(frame, attacker, isEnemyVulernerable, x, y)) {
			}
		}
	};

	AkumaAI.prototype.proact = function (frame) {
		if (!this.AI.Player.isMobile() || this.AI.Player.isBlocking())
			return;

		if (!!this.AI.isAttackReactBusy())
			return;

		var item = this.AI.getClosestEnemy();

		var isUnhittable = item.Player.isUnhittable();

		var rnd = getRand();
		var ignoreSetBusy = false;

		if (this.AI.Actions.length !== 0)
			return;

		var dist = this.AI.Player.getDistanceFromPlayer(item.Player);

		if (item.Player.isAirborne()) {

		} else if (!item.Player.isMobile() && this.AI.Player.isBehindPlayer(item.Player) && item.Player.isAttacking() && dist.Dsq < 60000) {
			//am I behind my immobile target?
			this.AI.reset();
			this.AI.setAttackReactBusy();
			this.AI.setAirborneReactBusy();
			this.AI.IgnoreProjectileGone = true;
			this.doBehindCombo();
		} else if (item.X < (CONSTANTS.GRAPPLE_DISTANCE - 25)) {
			if (item.Player.isInThrowableState()) {
				this.AI.reset();
				if (rnd > 50)
					this.executeThrow(0, true);
				else
					this.executeThrow(1, true);
			} else {
				this.AI.reset();
				this.doVeryCloseCombo();
			}
		} else {
			if (rnd > 98 && !this.AI.isWanderBusy()) {
				this.AI.reset();
				this.wanderBackward(10 + getRand(30));
			} else if (rnd > 96 && !this.AI.isWanderBusy()) {
				this.AI.reset();
				this.wanderBackward(10 + getRand(30));
			} else if (rnd > 50 && !this.AI.isProactBusy()) {
				this.AI.reset();
				this.doCloseCombo();
			}
		}
	};
	// noinspection DuplicatedCode
	AkumaAI.prototype.process = function (frame) {
		if (!this.AI.AllowOverrideBlock && !this.AI.Player.canBlock())
			this.AI.AllowOverrideBlock = true;

		if (!!this.AI.AllowOverrideBlock) {
			if (!this.AI.Player.isMobile()) {
				if (!!this.AI.JustAttacked)
					this.AI.JustBecameMobile = 3;
				return;
			}

			var rnd = getRand();
			this.proact(frame);

			this.AI.JustAttacked = false;
			this.AI.JustBecameMobile = (this.AI.JustBecameMobile > 0) ? this.AI.JustBecameMobile - 1 : 0;
		}
	};

	AkumaAI.prototype.frameMove = function (frame) {
		this.handleCombo(frame);
		this.process(frame);
	};

	AkumaAI.prototype.handleCombo = function (frame) {
		if (this.AI.Actions.length > 0) {
			if ((this.AI.Actions[0].Frame === 0)) {
				var retVal = this.parseAndSendInput();
				switch (retVal) {
					case 1: {
						this.handleCombo(frame);
						break;
					}
					default:
						break;
				}
			} else {
				this.AI.Actions[0].Frame = Math.max(this.AI.Actions[0].Frame - 1, 0);
			}
		}
	};

	return new AkumaAI();
};
