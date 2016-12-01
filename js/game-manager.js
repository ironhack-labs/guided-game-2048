function GameManager () {
  this.htmlManager = new HtmlManager();
  this._initialize();
}

GameManager.prototype._initialize = function () {
  this.board = new Board();
  this._initializeTiles();
  this._renderBoard();
};

GameManager.prototype._initializeTiles = function () {
  for (var i = 0; i < 2; i++) {
    var position = this.board.getAvailablePosition();
    var value    = this.board.getTileInitialValue();
    var tile     = new Tile(value, position.x, position.y);
    
    this.board.addTile(tile);
  }
};

GameManager.prototype._renderBoard = function () {
  for (var i = 0; i < this.board.matrix.length; i++) {
    for (var j = 0; j < this.board.matrix[i].length; j++) {
      var cell = this.board.matrix[i][j];
      this.htmlManager.renderTile(cell);
    }
  }
};
