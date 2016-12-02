var moveTilesLeft = function (gameManager) {
  var rowSize = gameManager.board.matrix.length;
  var colSize = gameManager.board.matrix[0].length;
  var matrix  = gameManager.board.matrix;

  for (var row = 0; row < rowSize; row++) {
    // The cell loop starts in 1 to avoid unnecessary checking of the first cell
    for (var cell = 1; cell < colSize; cell++) {
      if (!matrix[row][cell])
        continue;

      var newPositionY =  _furtherLeft(matrix[row], cell);

      if (newPositionY === cell)
        continue;

      matrix[row][newPositionY] = matrix[row][cell];
      matrix[row][cell] = null;
      matrix[row][newPositionY].updatePosition(row, newPositionY);
    }
  }
};

var moveTilesRight = function (gameManager) {
  var rowSize = gameManager.board.matrix.length;
  var colSize = gameManager.board.matrix[0].length;
  var matrix  = gameManager.board.matrix;

  for (var row = 0; row < rowSize; row++) {
    // The cell loop begins before last one to avoid unnecessary checking of the last cell
    for (var cell = colSize - 2; cell >= 0; cell--) {
      if (!matrix[row][cell])
        continue;

      var newPositionY =  _furtherRight(matrix[row], cell);

      if (newPositionY === cell)
        continue;

      matrix[row][newPositionY] = matrix[row][cell];
      matrix[row][cell] = null;
      matrix[row][newPositionY].updatePosition(row, newPositionY);
    }
  }
};

var _furtherLeft = function (row, tileCurrentY) {
  for (var i = tileCurrentY - 1; i >= 0; i--) {
    if (row[i] !== null)
      return i + 1;
  }

  return 0;
};

var _furtherRight = function (row, tileCurrentY) {
  for (var i = tileCurrentY + 1; i < row.length; i++) {
    if (row[i] !== null) {
      return i - 1;
    }
  }

  return row.length - 1;
};

var moveTilesUp = function (gameManager) {
  var col = [
    gameManager.board.matrix[0][0],
    gameManager.board.matrix[1][0],
    gameManager.board.matrix[2][0],
    gameManager.board.matrix[3][0],
  ];

  for (var i = 0; i < col.length; i++) {
    var newPositionX =  _furtherUp(col, i);
    if (newPositionX === i) {
      continue;
    }

    col[newPositionX] = col[i];
    col[i] = null;

    if (col[newPositionX] && col[newPositionX] !== null) {
      col[newPositionX].updatePosition(newPositionX, 0);
    }
  }
};

var _furtherUp = function (col, tileCurrentX) {
  if (tileCurrentX === 0) {
    return 0;
  }

  for (var i = tileCurrentX - 1; i >= 0; i--) {
    if (col[i] !== null)
      return i + 1;
  }

  return 0;
};

var moveTilesDown = function (gameManager) {
  var col = [
    gameManager.board.matrix[0][0],
    gameManager.board.matrix[1][0],
    gameManager.board.matrix[2][0],
    gameManager.board.matrix[3][0],
  ];

  for (var j = col.length - 1; j >= 0; j--) {
    var newPositionY =  _furtherDown(col, j);

    if (j === newPositionY) {
      continue;
    }

    if (col[j] !== null) {
      col[newPositionY] = col[j];
      col[j] = null;

      if (col[newPositionY] !== null) {
        console.log("New pos Y", newPositionY);
        col[newPositionY].updatePosition(newPositionY, 0);
      }
    }
  }
};
// Fix thiiiiiis
var _furtherDown = function (col, tileCurrentY) {
  if (tileCurrentY === col.length - 1) {
    return tileCurrentY;
  }

  for (var i = tileCurrentY + 1; i < col.length - 1; i++) {
    if (col[i] !== null)
      return i - 1;
  }

  return col.length - 1;
};
