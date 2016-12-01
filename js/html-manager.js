function HtmlManager () {

}

HtmlManager.prototype.renderTile = function (tile) {
  if (tile === null)
    return;

  var html       = document.createElement("div");
  var value      = document.createTextNode(tile.value);
  html.className = this._generateTileStyle(tile);
  html.appendChild(value);
  document.getElementById("tile-container").appendChild(html);
};

HtmlManager.prototype.resetRendering = function (matrix) {
  var tileContainer = document.getElementById('tile-container');
  var cells = tileContainer.getElementsByTagName('div');

  if (Array.prototype.slice.call(cells, 0).length === 0)
    return;

  Array.prototype.slice.call(cells, 0).forEach(function (elem){
    tileContainer.removeChild(elem);
  });
};

HtmlManager.prototype._generateTileStyle = function (tile) {
  var cssClasses = ["tile"];
  cssClasses.push(this._getTilePositionClass(tile.position));
  cssClasses.push(this._getTileValueClass(tile.value));
  return cssClasses.join(" ");
};

HtmlManager.prototype._getTilePositionClass = function (position) {
  return "tile-position-" + position.x + "-" + position.y;
};

HtmlManager.prototype._getTileValueClass = function (value) {
  return "val-" + value;
};
