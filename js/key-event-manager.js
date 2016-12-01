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
