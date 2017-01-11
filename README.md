![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)

# Guided Game | Incremental Build

## Learning Goals

After this lesson, you will be able to:

- Understand how incremental build helps you develop big projects
- Join the game logic with the layout through JavaScript

## Introduction

Incremental build is a technique that allows us to face big projects on an easier way by splitting it up in different small tasks that we have to solve. This is the best way to confront a big project and solve them with a lot of troubles.

We have splited the game up in three different steps: Game logic, HTML and CSS, and JavaScript. First of all we created the game logic to play 2048 from the console. In the second step we have done the layout with HTML and CSS. The last step is to join this game logic with the layout, and we will do it by creating the functionality through JavaScript.

## Join the logic and the layout

### Before start...

Before start coding, we have to plan a little bit what we are going to need, and what we are going to do. We can use a list to have in mind all what we have to do. It's always very helpful:

- First of all we will have to generate a new game when the player opens the browser.
- Once we have the game created, we have to load the status of the current board.
- Once we have both things done, we have to capture the user keyboard and interact with the tiles, depending on the selected key.
- When the user decides which move executes, we have to render the new board and show the new tile positions.
- After each move, we have to check out which is the status of the game. It could has three different status: won, lost, on going. We also have to update the game score.
- If the game has finished, we have to show the corresponding message to the user, indicating in both cases the final score.

This is the list of elements we have to implement in our code. As you can see, these bullet points are describing all the functionality we have already done in the game logic. So we already have all what we need. Now we just have to create the different functions to implement all this changes in the layout.

### New game

The first thing we have to do is to create a new game when the page loads. We will create an `application.js` file, add it to the HTML and, finally, use the `window.onload` event to generate the new game. The game will be defined as a global variable, to access it from everywhere in the application file:

```javascript
var game;

window.onload = function () {
  game = new Game2048();
};
```

**This is all what we need to create a new game, cool right? We did a good job coding the game logic :)**

:::info
If you want to check out if the game is really working, you can open the browser console and type `game._renderBoard()` to get the current game board.
:::

### Load tiles

The next step is to render the tiles. We are going to create a function to do that, and we will call it inmediately after creating the game:

```javascript=3
window.onload = function () {
  game = new GameManager();
  renderTiles();
};

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
```

This is all what we need to initialize a game and show the current status of the board in the screen. Note how we are using the styles we created in the previous step to assign the correct color to the tiles.

![](https://i.imgur.com/vC44zpZ.png)

**If you open again the console and try to execute the `game._renderBoard()` command, you will see that we have the same board in the console than in the layout.**

### Keyboard input

The following step to let the user play with the game, is to allow him interact with the board. We will create an event listener that will be waiting a `keydown` event, and depending on the pressed key, it will generate one move or another one:

```javascript
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
}

document.addEventListener("keydown", moveListeners);
```

We create an [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) over the document that will capture **any** key pressed in the keyboard. The event will execute a callback function that receives an `event` parameter, which allow us to access the code of the pressed key.

The `event.keyCode` returns us the ASCII code of the pressed key, so we have to check out if the pressed key is one of the arrows. The value of the keyboard arrows are:

| ASCII Code | Arrow |
|------------|-------|
| 37 | Left |
| 38 | Up |
| 39 | Right |
| 40 | Down |

We execute one move or another depending on the pressed key. If we execute the code in the browser and try to interact with it, nothing happens. **We have to re-render the board to see what are we doing!**

### Re-render the board

We have already defined a method to render the board. We could execute this method again, but the behaviour would be an unexpected one, because we already have some tiles on the board. Before to render the status of the board, we have to reset it.

```javascript
function resetTiles () {
  var tilesContainer = document.getElementById("tile-container");
  var tiles          = tilesContainer.getElementsByClassName("tile");

  Array.prototype.slice.call(tiles).forEach(function (tile) {
    tilesContainer.removeChild(tile);
  });
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
}
```

Now we can see how the tiles are moving and merging in the board. We are almost done with our awesome game =)

![](https://i.imgur.com/IOr3WH9.png)

:::info
Note how we are converting the result of `getElementsByClassName` into an array. This method doesn't return an array, it returns a NodeCollection element. We use the method `Array.prototype.slice.call` to transform this NodeCollection into an Array, so we can use the `foreach` method to iterate over the elements.

This is a very useful hack of JavaScript you should know. You can learn more hacks in [this article](https://blog.jscrambler.com/12-extremely-useful-hacks-for-javascript/).
:::

### Update score

We need to update the score every time we merge two tiles. This is done in the game logic, so we just need to update the value in the screen after each move. We will do exactly the same that we did with the re-rendering, create a function and execute it after the move:

```javascript
function updateScore () {
  var score          = game.score;
  var scoreContainer = document.getElementsByClassName("js-score");

  Array.prototype.slice.call(scoreContainer).forEach(function (span) {
    span.innerHTML = score;
  });
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
```

The score is updating as expected now, so we just need to add one more thing to finish the game. Note how we are using as a selector the `js-score` CSS class. We are using this class because it's the same class that has the Game Over and the You Win score in the layout. We are updating at the same time two different scores.

![](https://i.imgur.com/06qRFGl.png)

### Game status

To finish up with this learning unit, we have to create a new function that will be called after each movement too, that will check out the game status. If the game has finished (with victory or defeat), we will have to show the user a message.

```javascript
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
```

![](https://i.imgur.com/VXm0Bd2.png)

This is the last element we need to finish the basic functionality of our game. We are ready to add some fancy stuff and deploy it to github pages to let everybody play with it!

## Summary

We have learnt how the incremental build turns a difficult project into an easy one. Splitting up the tasks, we can handle them better. It's much easier to face a project by doing this, than trying to solve all the things at the same time.

We have also seen how easy it is to join the game logic with the layout through JavaScript once we are sure that the logic is working well.

## Extra Resources

- [2048](https://ironhack.github.io/guided-game-2048/)
- [Extremely useful hacks in JavaScript](https://blog.jscrambler.com/12-extremely-useful-hacks-for-javascript/)
