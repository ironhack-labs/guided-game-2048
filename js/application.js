var game;

window.onload =function(){
  game = new Game2048();
  renderTiles();
  loadSounds();
};

function loadSounds () {
  ion.sound({
    sounds: [{name: "snap"}, {name: "tap"}],

    path: "/guided-game-2048/lib/ion.sound-3.0.7/sounds/",
    preload: true,
    volume: 1.0
  });
}

function resetTiles () {
  var tilesContainer = document.getElementById("tile-container");
  var tiles          = tilesContainer.getElementsByClassName("tile");

  Array.prototype.slice.call(tiles).forEach(function (tile) {
    tilesContainer.removeChild(tile);
  });
}

function renderTiles () {
  game.board.forEach(function(row, rowIndex){
    row.forEach(function (cell, cellIndex) {
      if (cell) {
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
  var scoreContainer = document.getElementsByClassName("js-score");

  Array.prototype.slice.call(scoreContainer).forEach(function (span) {
    span.innerHTML = score;
  });
}

function gameStatus () {
  if (game.win()) {
    document.getElementById("game-over").classList = "show-won";
  } else if (game.lose()) {
    document.getElementById("game-over").classList = "show-lost";
  }
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
  gameStatus();
}

document.addEventListener("keydown", moveListeners);
