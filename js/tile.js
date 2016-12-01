function Tile (value, positionX, positionY) {
  this.value = value;
  this.position = {
    x: positionX,
    y: positionY
  };
}

Tile.prototype.updatePosition = function (x,y) {
  this.position.x = x;
  this.position.y = y;
};
