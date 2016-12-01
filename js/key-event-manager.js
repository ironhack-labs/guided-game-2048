function KeyEventManager () {

}

KeyEventManager.prototype.listen = function () {
  console.log("We are playing!!!");
  document.body.onkeydown = function(evt) {
    if (evt.keyCode === 38)      { console.log('up');    }
    else if(evt.keyCode === 40 ) { console.log('down');  }
    else if(evt.keyCode === 37 ) { console.log('left');  }
    else if(evt.keyCode === 39 ) { console.log('right'); }
  };
};
