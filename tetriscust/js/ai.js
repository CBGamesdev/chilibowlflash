Game.AI = {}

Game.AI.findBestPosition = function(pit, piece) {
	pit = pit.clone();
	piece = piece.clone();
	piece.center();
	
	/* shift leftwards */
	var left = new XY(-1, 0);
	while (piece.fits(pit)) { piece.xy = piece.xy.plus(left); }
	piece.xy = piece.xy.minus(left);
	
	/* move rightwards, test scores */
	var bestScore = Infinity;
	var bestPositions = [];

	while (piece.fits(pit)) {
		var tmpPit = pit.clone();
		tmpPit.drop(piece.clone());
		var score = tmpPit.getScore();
		
		if (score < bestScore) { 
			bestScore = score;
			bestPositions = [];
		}
		
		if (score == bestScore) {
			bestPositions.push(piece.xy.x);
		}

		piece.xy = piece.xy.minus(left);
	}
	
	var x = bestPositions.random();
	
	return {
		score: bestScore,
		x: x
	}
}

Game.AI.findBestPositionRotation = function(pit, piece) {
	var bestScore = Infinity;
	var bestRotations = [];

	for (var i=0;i<4;i++) {
		var tmpPiece = piece.clone();
		for (var j=0;j<i;j++) { tmpPiece.rotate(1); }
		var current = this.findBestPosition(pit, tmpPiece);
		current.rotation = i;
		
		if (current.score < bestScore) {
			bestScore = current.score;
			bestRotations = [];
		}
		
		if (current.score == bestScore) {
			bestRotations.push(current);
		}
	}
	
	return bestRotations.random();
}

Game.AI.scoreTypes = function(pit, types) {
	var scores = {};
	types.forEach(function(type) {
		var piece = new Game.Piece(type);
		scores[type] = this.findBestPositionRotation(pit, piece).score;
	}, this);

	return scores;
}
