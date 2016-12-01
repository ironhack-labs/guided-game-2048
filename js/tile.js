function Tile (value, positionX, positionY) {
  this.value = value;
  this.position = {
    // JS hairdresser says this looks better
    x: positionX,
    y: positionY
  };
}
