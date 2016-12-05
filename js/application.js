var game;
window.onload =function(){
  game = new GameManager();
  renderTiles();
};

function renderTiles() {
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
