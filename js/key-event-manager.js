function KeyEventManager (gameManager) {
  this.gameManager = gameManager;
  console.log(this.gameManager);
}

KeyEventManager.prototype.listen = function () {
  console.log("Manager", this.gameManager);
  document.body.onkeydown = function(evt) {
    if (evt.keyCode === 38)      { console.log('up');    }
    else if(evt.keyCode === 40 ) { console.log('down');  }
    else if(evt.keyCode === 37 ) { this.gameManager.moveTilesLeft();  }
    else if(evt.keyCode === 39 ) { console.log('right'); }
  };
};
