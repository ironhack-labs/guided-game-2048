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
