var moveTilesLeft = function (gameManager) {
  var rowSize = gameManager.board.matrix.length;
  var colSize = gameManager.board.matrix[0].length;
  var matrix  = gameManager.board.matrix;

  for (var i = 0; i < rowSize; i++) {
    for (var j = 0; j < colSize; j++) {
      var newPositionY =  _furtherLeft(matrix[i], j);

      if (newPositionY === j) {
        continue;
      }

      matrix[i][newPositionY] = matrix[i][j];
      matrix[i][j] = null;

      if (matrix[i][newPositionY] && matrix[i][newPositionY] !== null) {
        matrix[i][newPositionY].updatePosition(i, newPositionY);
      }
    }
  }

  gameManager._renderBoard();
};

var moveTilesRight = function (gameManager) {
  var rowSize = gameManager.board.matrix.length;
  var colSize = gameManager.board.matrix[0].length;
  var matrix  = gameManager.board.matrix;

  for (var i = 0; i < rowSize; i++) {
    for (var j = colSize - 1; j >= 0; j--) {
      var newPositionY =  _furtherRight(matrix[i], matrix[i][j], j);

      if (j === newPositionY) {
        continue;
      }

      if (matrix[i][j] !== null) {
        matrix[i][newPositionY] = matrix[i][j];
        matrix[i][j] = null;

        if (matrix[i][newPositionY] && matrix[i][newPositionY] !== null) {
          matrix[i][newPositionY].updatePosition(i, newPositionY);
        }
      }
    }
  }

  gameManager._renderBoard();
};

var _furtherLeft = function (row, tileCurrentY) {
  if (tileCurrentY === 0) {
    return 0;
  }

  for (var i = tileCurrentY - 1; i >= 0; i--) {
    if (row[i] !== null)
      return i + 1;
  }

  return 0;
};

var _furtherRight = function (row, tileCurrentY) {
  if (tileCurrentY === row.length - 1) {
    return tileCurrentY;
  }

  for (var i = tileCurrentY + 1; i < row.length - 1; i++) {
    if (row[i] !== null)
      return i + 1;
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
  gameManager._renderBoard();
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

  gameManager._renderBoard();
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
