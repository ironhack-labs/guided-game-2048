![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)

# Guided Game | Game logic

## Learning Goals

After this lesson, you will be able to:

- Play the 2048 game
- Understand how does it works and which are the most important sections of it
- Discern what is game logic and what is game layout
- Separate different features in functions
- Create the whole logic of the game to play on the Browser console

## Introduction

In the next four learning units, we are going to create the [2048 game](https://ironhack.github.io/guided-game-2048/). Before start coding, we have to understand which is the goal of the game, and how to play.

### 2048: The game

The goal of the game is to get the number 2048 using additions of the **number 2 and its multiples**. The user starts with a 4x4 grid, that initially contains two tiles that could have just two different values: 2 or 4.

![](https://i.imgur.com/kgre6NM.png =300x300)

The user moves the tiles in any direction with the objective of joining two numbers with the same value. In the image above, moving the tiles to the left will cause the two 8 on the bottom left corner to be merged into a 16.

After each player move, the game will generate a new tile with value 2 or 4, and will allocate it in a random position in the board. By merging tiles into higher numbers, the user will get closer to the 2048.

The game is over when there aren't valid moves available. This is you have the board full of tiles and none of them can be merged.

![A game over](https://i.imgur.com/jIavI0p.png =300x300)

## Private/Public methods convention

While we create the game logic, we will have some methods that will be available outside the logic application, and other methods that will be used just internally. The nomenclature for those methods is the following:

- When a method is public, we have to name it as usual.
- When a method is just for internal use, its name has to start by underscore.

```javascript
function Class () {
}

Class.prototype._privateMethod = function () {
};

Class.prototype.publicMethod = function () {
};
```

**We recommend you to follow this convention :)**

Let's start to create the game logic. We will distinguish between structures and methods.

## Structures

Which structures do we need to implement the logic? We have to save the current score of the game, so we need somewhere to store this value, and somewhere to store the game board too. This will be an array of arrays, also known as matrix (or [bidimensional array](https://en.wikipedia.org/wiki/Array_data_structure#Multidimensional_arrays)).

```javascript
function Game2048() {
  this.board = [];
  this.score  = 0;
}
```

Those are the variable declarations to play the game. The board is empty, so we should initialize it creating a 4x4 matrix, full of `null` values:

```javascript
function Game2048 () {
  this.board = [
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null]
  ];
	
  this.score  = 0;
}
```

To finish up with the necessary structures to play the game, we will need to have two variables to indicate if the game is over or if the user has won. They both will help us to control the status of the game:

```javascript
function Game2048 () {
  this.board = [
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null],
    [null,null,null,null]
  ];
	
  this.score = 0;
  this.won   = false;
  this.lost  = false;
}
```

Of course, by default they will have to be setted up to false. During the game, we will have to set them up to true depending on the board we have in each moment.

That's all what we need to start the game. Easy, right? Let's see which methods we need to start our game!

## Methods

### Game tiles

Right now we have just an empty matrix, that will be our game board. So the first thing we need to do, is to create two tiles and add them randomly to the board. The value of the tiles can be 2 or 4. The probability of having a value 2 is much higher than to have a value 4.

This will be a private method, that we will call `_generateTile` and it will insert the tile in a random position inside the matrix:

```javascript
Game2048.prototype._generateTile = function () {
  var initialValue = (Math.random() < 0.8) ? 2 : 4;
};
```

Which is a good position to insert the tile? An empty position in the board. Which empty positions do we have in the board? We don't know it yet.

We need another private method to get an available position for the new tile. This method will iterate over the board, get the available positions, and return a random available position:

```javascript
Game2048.prototype._getAvailablePosition = function () {
  var emptyTiles = [];

  this.board.forEach(function(row, rowIndex){
    row.forEach(function(elem, colIndex){
      if (!elem) emptyTiles.push({ x: rowIndex, y: colIndex });
    });
  });

  if (emptyTiles.length === 0)
    return false;

  var randomPosition = Math.floor(Math.random() * emptyTiles.length);
  return emptyTiles[randomPosition];
};
```

We iterate over all the positions in the array, inserting in the `emptyTiles` array the empty positions. Once we have all the empty positions, we return one of them randomly. If there are no empty positions, we return false.

Now, we can call this function from the `_generateTile` method to get an available position and put it inside the matrix:

```javascript=
Game2048.prototype._generateTile = function () {
  var initialValue = (Math.random() < 0.8) ? 2 : 4;
  var emptyTile = this._getAvailablePosition();

  if (emptyTile) {
    this.board[emptyTile.x][emptyTile.y] = initialValue;
  }
};
```

Pay special attention to the line 2. We use a random value (that generate a number between 0 and 1) to decide the value we will give to the tile. This value has an 80% of possibilities to be 2, and just a 20% of being a 4.

Also note that we are assigning directly the value to the position in the board, just if the `_getAvailablePosition` method returns a position.

Now we can generate two random tiles in the class initialization. We will do this by doing the following:

```javascript
function Game2048 () {
  // ...
  
  this._generateTile();
  this._generateTile();
}
```

Now we need a method to check out if the tiles are correctly generated and inserted in the board. We will do this by rendering the board.

### Render the board

We are going to create the method to print the game board, to be able to see how the game is going. This method will be private too. We just have to iterate over the board rows and print the full array that we have in each row:

```javascript
Game2048.prototype._renderBoard = function () {
  this.board.forEach(function(row){ console.log(row); });
};
```

At this point, we have the board with two tiles on it. The following step should be to create a method to move these tiles. We will create a game at the bottom of our file, and render the board to see it in the browser console:

```javascript
var game = new Game2048();
game._renderBoard();
```

The result should be something like this:

![](https://i.imgur.com/DV5i3PB.png)

### Moving tiles

When we move tiles in the board, we have to do at the same time two different actions: move and merge (if necessary). We will start with the `moveLeft` function, that will move, as its own name indicates, all the tiles to the left.

#### Move left

The best way to implement this move, is to create a new board where we are going to insert the tiles already merged if it's necessary. We will use both the new and the old board to figure out if the tiles have to be merged or stay with the same value.

```javascript=
Game2048.prototype.moveLeft = function () {
  var newBoard = [];
  var that = this;
  var boardChanged = false;

  this.board.forEach (function (row) {
    var newRow = row.filter(function (i) {
      return i !== null;
    });

    for(i = 0; i < newRow.length - 1; i++) {
      if (newRow[i+1] === newRow[i]) {
        newRow[i]   = newRow[i] * 2;
        newRow[i+1] = null;
      }
    }

    var merged = newRow.filter(function (i) {
      return i !== null;
    });
		
    while(merged.length < 4) {
      merged.push(null);
    }
    
    if (newRow.length !== row.length)
      boardChanged = true;

    newBoard.push(merged);
  });

  this.board = newBoard;
  return boardChanged;
};
```

In the code above there are a few things we should pay attention to:

- In the line 7 we create a new row without the `null` values. We are going to ignore the `null` values to merge the tiles.
- We iterate over the row values from left to right, to merge the tiles on this direction. This will generate for the tiles "2, 2, 2" the result "4, 2" instead of "2, 4".
- Once we have finished the iteration, we add (line 22) `null` values until the row has a length of 4. This is to avoid having rows with different sizes on the board.
- Finally, we assign to the matrix the new board, so we have the matrix updated with the result of the move.

#### Move right

Could you imagine which differences are between moving left and moving right? Yes, the direction! So the method will be exactly the same as the `moveLeft`, but changing the direction of the iterations:

```javascript=11
for (i=newRow.length - 1; i>0; i--) {
  if (newRow[i-1] === newRow[i]) {
    newRow[i]   = newRow[i] * 2;
    newRow[i-1] = null;
    that._updateScore(newRow[i]);
  }
      
  if (newRow.length !== row.length) boardChanged = true;
}

var merged = newRow.filter(function (i) {
  return i !== null;
});

while(merged.length < 4) {
  merged.unshift(null);
}

newBoard.push(merged);
```

There are two main differences between the `moveLeft` and the `moveRight` events. The first one is that we are iterating from right to left to merge the tiles. The other one is that we add `null` values to the left throught the [`unshift`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) method.

Now let's analyze the other two methods, to move up and down the tiles.

#### Move up

Let's think how we could reuse the previous functions to generate the `moveUp` functionality. If you want to move tiles up, you just have to rotate the board game 90 degree and move them to the left!

To do that, we are going to need a function called `_transposeMatrix`. As its name indicate, it will [transpose](https://en.wikipedia.org/wiki/Transpose) the bidimensional array. Once it's transposed, we will have to move tiles to the left and transpose it again, to generate the "move up" functionality:

```javascript=
Game2048.prototype._transposeMatrix = function () {
  for (var row = 0; row < this.board.length; row++) {
    for (var column = row+1; column < this.board.length; column++) {
      var temp = this.board[row][column];
      this.board[row][column] = this.board[column][row];
      this.board[column][row] = temp;
    }
  }
};
```

In the line 4 we use a temporal variable to change the current row by the new one. As JavaScript use pointers to the memory to save the array values, we can't interchange two values without using a temporal variable.

Now, we have all the necessary to generate the `moveUp` function:

```javascript
Game2048.prototype.moveUp = function () {
  this._transposeMatrix();
  var boardChanged = this._moveLeft();
  this._transposeMatrix();
  return boardChanged;
};
```

#### Move down

The move down function will have exactly the same code than the `moveUp` function, but we will have to move the tiles to the right instead of moving them to the left:

```javascript
Game2048.prototype.moveDown = function () {
  this._transposeMatrix();
  var boardChanged = this._moveRight();
  this._transposeMatrix();
  return boardChanged;
};
```

This diserves a gif celebration, for the win:

![Celebration](http://i.giphy.com/hEIuLmpW9DmGA.gif)

#### Move

After each movement, we should re-render the board to let the player know which was the result of the move. We also have to generate a new tile to keep playing.

It has a lot of sense to create a `move` function, that will receive as a parameter the move direction, and after it we will do both things:

```javascript
Game2048.prototype.move = function (direction) {
  if (!this._gameFinished()) {
    switch (direction) {
      case "up":    boardChanged = this._moveUp();    break;
      case "down":  boardChanged = this._moveDown();  break;
      case "left":  boardChanged = this._moveLeft();  break;
      case "right": boardChanged = this._moveRight(); break;
    }

    if (boardChanged) {
      this._generateTile();
    }
  }
};
```

As you can see, we have renamed the previous functions to make them private. Once we have the `move` function, the `moveUp`, `moveDown`, `moveLeft`, and `moveRight` functions don't have to be public anymore.

We are also using the `boardChanged` variable to check out if the current movement has created some difference between the original board and the new one. If the board has been affected by this, we generate a new tile.

### Score

The score of the game is very easy to understand and implement. When two tiles are merged into one, the value of the new tile is added to the current score. We are going to create a separate method to implement this:

```javascript
Game2048.prototype._updateScore = function (value) {
  this.score += value;
};
```

Now, we just have to call the method from two different places: `_moveLeft` and `_moveRight`, where we merge two tiles into one:

```javascript=11
for(i = 0; i < newRow.length - 1; i++) {
  if (newRow[i+1] === newRow[i]) {
    newRow[i]   = newRow[i] * 2;
    newRow[i+1] = null;

    that._updateScore(newRow[i]);
  }
}
```

Now, we can show the score when rendering the board. So we have to add the following line into the `_renderBoard` function:

```javascript
Game2048.prototype._renderBoard = function () {
  this.board.forEach(function(row){ console.log(row); });
  console.log('Score: ' + this.score);
};
```

We can play with our game from the browser! Try to open the console and play with the methods we created. You should have something like this:

![](https://i.imgur.com/ZV7bZ7T.png)

Let's add some other functionalities that we will need and we will be done.

### Win

When we update the score is the best moment to update the `won` variable we created in the constructor. If the value received as a parameter is 2048, we have to set it up into true:

```javascript
Game2048.prototype._updateScore = function(value) {
  this.score += value;
  
  if (value === 2048) {
    this.won = true;
  }
};
```

We will need a function to check out if the player has won the game. This function will just return the value of this variable:

```javascript
Game2048.prototype.win = function () {
  return this.won;
};
```

### Lose

Last, but not least, we need to be able to check out if the game is finished. The game will be over if all the positions are filled with a tile, and no movements can be done. So after each move, if the move has changed the board, we will have to check if the game is lost. We will do that after adding the new tile to the board.

```javascript
Game2048.prototype.move = function (direction) {
  if (!this._gameFinished()) {
    switch (direction) {
      case "up":    boardChanged = this._moveUp();    break;
      case "down":  boardChanged = this._moveDown();  break;
      case "left":  boardChanged = this._moveLeft();  break;
      case "right": boardChanged = this._moveRight(); break;
    }

    if (boardChanged) {
      this._generateTile();
      this._isGameLost();
    }
  }
};
```

What is going to do this `_isGameLost` function? We are going to check out if there are any available position in the array, and if there are no empty positions, we are going to iterate over all the positions and check out for next movements. If there are no movements left, the game is over:

```javascript
Game2048.prototype._isGameLost = function () {
  if (this._getAvailablePosition())
    return;

  var that   = this;
  var isLost = true;

  this.board.forEach(function (row, rowIndex) {
    row.forEach(function (cell, cellIndex) {
      var current = that.board[rowIndex][cellIndex];
      var top, bottom, left, right;

      if (that.board[rowIndex][cellIndex - 1]) {
        left  = that.board[rowIndex][cellIndex - 1];
      }
      if (that.board[rowIndex][cellIndex + 1]) {
        right = that.board[rowIndex][cellIndex + 1];
      }
      if (that.board[rowIndex - 1]) {
        top    = that.board[rowIndex - 1][cellIndex];
      }
      if (that.board[rowIndex + 1]) {
        bottom = that.board[rowIndex + 1][cellIndex];
      }

      if (current === top || current === bottom || current === left || current === right)
        isLost = false;
    });
  });

  this.lost = isLost;
};
```

And this is the last thing we need to create the whole functionality of the game. We have all the logic done!

## Summary

We have learnt how we should confront a big game development by splitting up all the parts into small problems. We have also learned which is the main difference between public and private methods, and how we should call them in our code.

Finally, we have done the whole logic of the game step by step, explaining the most important parts of each function.

## Extra Resources

- [2048](https://ironhack.github.io/guided-game-2048/)
