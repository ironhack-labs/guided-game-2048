function GameManager () {
  this.htmlManager = new HtmlManager();
  this._initialize();
}

GameManager.prototype._initialize = function () {
  this.board = new Board();
  this._initializeTiles();
  this._renderBoard();
  this._listen();
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
  this.htmlManager.resetRendering(this.board.matrix);

  for (var i = 0; i < this.board.matrix.length; i++) {
    for (var j = 0; j < this.board.matrix[i].length; j++) {
      var cell = this.board.matrix[i][j];
      this.htmlManager.renderTile(cell);
    }
  }
};

GameManager.prototype._listen = function () {
  var that = this;

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 37)      { moveTilesLeft(that); }
    else if (event.keyCode === 39) { moveTilesRight(that); }
    // if (event.keyCode === 38)      { moveTilesLeft(that); }
    // else if(event.keyCode === 40 ) { console.log('down');  }
    // else if(event.keyCode === 37 ) { this.moveTilesLeft();  }
    // else if(event.keyCode === 39 ) { console.log('right'); }
  });
};
