function Board () {
  this.matrix = [];
  this._initialize();
}

Board.prototype._initialize = function () {
  for (var i = 0; i < 4; i++) {
    this.matrix.push([]);

    for (var j = 0; j < 4; j++) {
      this.matrix[i].push(null);
    }
  }
};

Board.prototype.getTileInitialValue = function () {
  var initialValues = ["2", "4"];
  var random        = Math.random();

  return random < 0.8 ? initialValues[0] : initialValues[1];
};

Board.prototype.addTile = function (tile) {
  var x = tile.position.x;
  var y = tile.position.y;

  this.matrix[x][y] = tile;
};

Board.prototype.getAvailablePosition = function () {
  var availablePositions = [];

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (this.matrix[i][j] === null) {
        availablePositions.push({ x: i, y: j });
      }
    }
  }

  if (this._gameOver(availablePositions)) {
      return "TODO: Implement Game over";
  }

  var randomPosition = Math.floor(Math.random() * availablePositions.length);
  return availablePositions[randomPosition];
};

Board.prototype._gameOver = function (availablePositions) {
  return availablePositions.length === 0;
};

Board.prototype.moveTilesLeft = function () {
  var row0 = this.board.matrix[0];

  for (var i = 0; i < row0.length; i++) {
    this._furtherLeft(row0, row0[i], i);
  }

  // Rendering the board game
  // Move this shit to the GameManager
};

Board.prototype._furtherLeft = function (row, tile, index) {
  var lastNullPosition = index;

  for (var i = index - 1; i >= 0; i--) {
    if (row[i] !== null)
      return lastNullPosition;

    lastNullPosition = i;
  }
};
