var game;

window.onload =function(){
  game = new GameManager();
  renderTiles();
};

function resetTiles () {
  var tilesContainer = document.getElementById("tile-container");
  var tiles          = tilesContainer.getElementsByClassName("tile");

  Array.prototype.slice.call(tiles).forEach(function (tile) {
    tilesContainer.removeChild(tile);
  });
}

function renderTiles () {
  game.matrix.forEach(function(row, rowIndex){
    row.forEach(function (cell, cellIndex) {
      if (cell !== null) {
        var tileContainer = document.getElementById("tile-container");
        var newTile       = document.createElement("div");

        newTile.classList  = "tile val-" + cell;
        newTile.classList += " tile-position-" + rowIndex + "-" + cellIndex;
        newTile.innerHTML  = (cell);

        tileContainer.appendChild(newTile);
      }
    });
  });
}

function updateScore () {
  var score          = game.score;
  var scoreContainer = document.getElementById("score").getElementsByTagName("span")[0];

  scoreContainer.innerHTML = score;
}

function moveListeners (event) {
  var keys = [37, 38, 39, 40];

  if (keys.indexOf(event.keyCode) < 0)
    return;

  switch (event.keyCode) {
    case 37: game.move("left");  break;
    case 38: game.move("up");    break;
    case 39: game.move("right"); break;
    case 40: game.move("down");  break;
  }

  resetTiles();
  renderTiles();
  updateScore();
}

document.addEventListener("keydown", moveListeners);
