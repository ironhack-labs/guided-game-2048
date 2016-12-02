function Board () {
  this.matrix = [];

  for (var i = 0; i < 4; i++) {
    this.matrix.push([]);

    for (var j = 0; j < 4; j++) {
      this.matrix[i].push(null);
    }
  }

  for (i = 0; i < 2; i++) {
    var pos = this._getAvailablePosition();
    this.matrix[pos.x][pos.y] = this._getTileInitialValue();
  }
}

Board.prototype._renderBoard = function () {
  for (var i = 0; i < 4; i++) {
    console.log(this.matrix[i]);
  }
};

Board.prototype._getTileInitialValue = function () {
  var initialValues = ["2", "4"];
  var random        = Math.random();

  return random < 0.8 ? initialValues[0] : initialValues[1];
};

Board.prototype._getAvailablePosition = function () {
  var availablePositions = [];

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if (this.matrix[i][j] === null) {
        availablePositions.push({ x: i, y: j });
      }
    }
  }

  if (availablePositions.length === 0) {
    return false;
  } else {
    var randomPosition = Math.floor(Math.random() * availablePositions.length);
    return availablePositions[randomPosition];
  }
};

Board.prototype.moveLeft = function () {
  var newBoard = [];

  this.matrix.forEach (function (row) {
    var newRow = row.filter(function (i) { return i !== null; });

    for(i = 0; i < newRow.length - 1; i++) {
      if (newRow[i+1] === newRow[i]) {
        newRow[i+1] = newRow[i] * 2;
        newRow[i] = null;
      }
    }

    var merged = newRow.filter(
      function (i) { return i !== null;
    });

    while(merged.length < 4) {
      merged.push(null);
    }

    newBoard.push(merged);
  });

  this.matrix = newBoard;
  this._renderBoard();
};

Board.prototype.moveRight = function () {
  var newBoard = [];

  this.matrix.forEach (function (row) {
    var newRow = row.filter(function (i) { return i !== null; });

    for(i = newRow.length-1; i > 0; i--) {
      if (newRow[i-1] === newRow[i]) {
        newRow[i-1] = newRow[i] * 2;
        newRow[i] = null;
      }
    }

    var merged = newRow.filter(
      function (i) { return i !== null;
    });

    while(merged.length < 4) {
      merged.unshift(null);
    }

    newBoard.push(merged);
  });

  this.matrix = newBoard;
  this._renderBoard();
};

var board = new Board();
board._renderBoard();
// board.moveDown();
// board.moveLeft();
// board.moveRight();
// board.moveUp();
