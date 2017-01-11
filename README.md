![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)

# Guided Game | Layout

## Learning Goals

After this lesson, you will be able to:

- Create the layout of the game with HTML and CSS

## Introduction

In the first step of the guided game, we have created the game logic. We have all the needed functions to execute the game in the console, and now we have to create the layout that we will join later with this logic.

We are going to create the game board with all the different tiles we will need during the game. This will be one tile for each possible value we could get: 2, 4, 8, 16... 2048. Let's start by creating our board!

## Create the layout

Before start creating our layout in HTML and CSS, we have to take a look at our mockup that will guide us on this process. The layout we have to do is the following:

![](https://i.imgur.com/eNTvaDW.png)

We can always do the same thing in different ways using HTML and CSS. **There isn't just one solution, there are several.** The following one is how we decided to solve the problem.

We will create a basic container, where we will define the tile positions. Each one will be represented as an square, and we will set the background color as the empty position:

![](https://i.imgur.com/l7ef1Uy.png)

### Board

We need to create a matrix with dimensions 4x4 to allocate all the tiles of the game.

**HTML**

```htmlmixed
<div id="game-board">
  <div class="row">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>

  <div class="row">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>

  <div class="row">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>

  <div class="row">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </div>

  <div class="clearfix"></div>
</div>
```

You can imagine that we have to float the `div` to get the desired structure in our layout.

**CSS**

```css
#game-board {
  background: #3582b8;
  border-radius: 4px;
  padding: 10px;
}

.clearfix {
  clear: both;
}

.row {
  height: 100%;
  width: 100%;
}

.cell {
  background: rgba(225, 226, 241, 0.5);
  border-radius: 4px;
  box-sizing: border-box;
  height: 130px;
  float: left;
  margin: 10px;
  width: 130px;
}
```

We have added some `border-radius` to the board and the tiles so they look better than plain `div`. As you can see, we get the desired board:

![](https://i.imgur.com/2XJWT5r.png)

The next step is to create all the possible tiles for each value in the game.

### Tiles

To create the tiles we have to do two different things:

- Add the tiles in the different positions of the board
- Generate all the tile colors specified in the first step of the exercise

#### Tiles position

First of all we are going to add the tiles in the board. We have defined a board that has a `div` for each available tile position. If we want to put tils over the board, we will have to create another container with the same dimensions, and put it over the `#game-board` through the `position: absolute` property. All the tiles inside this container will seem to be over the board.

After that, we will add the tiles to this container, and specifying the different positions they could have.

**HTML**

```htmlmixed
<div id="tile-container">
  <div class="tile tile-position-0-0"></div>
  <div class="tile tile-position-0-1"></div>
  <div class="tile tile-position-0-2"></div>
  <div class="tile tile-position-0-3"></div>

  <div class="tile tile-position-1-0"></div>
  <div class="tile tile-position-1-1"></div>
  <div class="tile tile-position-1-2"></div>
  <div class="tile tile-position-1-3"></div>

  <div class="tile tile-position-2-0"></div>
  <div class="tile tile-position-2-1"></div>
  <div class="tile tile-position-2-2"></div>
  <div class="tile tile-position-2-3"></div>

  <div class="tile tile-position-3-0"></div>
  <div class="tile tile-position-3-1"></div>
  <div class="tile tile-position-3-2"></div>
  <div class="tile tile-position-3-3"></div>
</div>
```

**CSS**

```css
.cell,
.tile {
  background: rgba(225, 226, 241, 0.5);
  border-radius: 4px;
  box-sizing: border-box;
  height: 130px;
  float: left;
  margin: 10px;
  width: 130px;
}

.tile {
  background: rgba(225, 226, 241, 0.35);
  box-sizing: border-box;
  color: #fff;
  float: none;
  font-size: 55px;
  font-weight: bold;
  padding-top: 30px;
  position: absolute;
  text-align: center;
  text-shadow: 1px 1px 3px #000;
}
```

Note that we have reused the `.cell` styles for the tile. This helps us to avoid rewrite unnecessary styles on our CSS. We also have defined the value of the different positions in the board:

```css
.tile.tile-position-0-0 { transform: translate(0, 0); }
.tile.tile-position-0-1 { transform: translate(150px, 0); }
.tile.tile-position-0-2 { transform: translate(300px, 0); }
.tile.tile-position-0-3 { transform: translate(450px, 0); }
.tile.tile-position-1-0 { transform: translate(0, 150px); }
.tile.tile-position-1-1 { transform: translate(150px, 150px); }
.tile.tile-position-1-2 { transform: translate(300px, 150px); }
.tile.tile-position-1-3 { transform: translate(450px, 150px); }
.tile.tile-position-2-0 { transform: translate(0, 300px); }
.tile.tile-position-2-1 { transform: translate(150px, 300px); }
.tile.tile-position-2-2 { transform: translate(300px, 300px); }
.tile.tile-position-2-3 { transform: translate(450px, 300px); }
.tile.tile-position-3-0 { transform: translate(0, 450px); }
.tile.tile-position-3-1 { transform: translate(150px, 450px); }
.tile.tile-position-3-2 { transform: translate(300px, 450px); }
.tile.tile-position-3-3 { transform: translate(450px, 450px); }
```

We are changing the tile positions through the [transform](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) property.

Right now, we shouldn't be able to see anything different yet. We need to create the different styles for each tile to see how it differs from the previous step.

#### Tiles style

We can have 11 different type of tiles, based on the different values they could have. This values are: 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, and 2048.

We have defined a color palette where we specify which `background-color` will be applied to each tile. This colors are the following:

| Value | Color | Value | Color | Value | Color |
|-------|-------|-------|-------|-------|-------|
| 2 | #93d2ff | 4 | #4ab5ff | 8 | #289cef |
| 16 | #2a72a3 | 32 | #105a86 | 64 | #00548c |
| 128 | #004777 | 256 | #002c4a | 512 | #000F35 |
| 1024 | #000921 | 2048 | #009894 |

Let's add the pertinent class to each `div`, add the text of each value, and create and assign the different classes to them to see the result.

**HTML**

```htmlmixed
<div id="tile-container">
  <div class="tile tile-position-0-0 val-2">2</div>
  <div class="tile tile-position-0-1 val-4">4</div>
  <div class="tile tile-position-0-2 val-8">8</div>
  <div class="tile tile-position-0-3 val-16">16</div>

  <div class="tile tile-position-1-0 val-32">32</div>
  <div class="tile tile-position-1-1 val-64">64</div>
  <div class="tile tile-position-1-2 val-128">128</div>
  <div class="tile tile-position-1-3 val-256">256</div>

  <div class="tile tile-position-2-0 val-512">512</div>
  <div class="tile tile-position-2-1 val-1024">1024</div>
  <div class="tile tile-position-2-2 val-2048">2048</div>
  <div class="tile tile-position-2-3"></div>

  <div class="tile tile-position-3-0"></div>
  <div class="tile tile-position-3-1"></div>
  <div class="tile tile-position-3-2"></div>
  <div class="tile tile-position-3-3"></div>
</div>
```

**CSS**

```css
.tile.val-2    { background: #93d2ff; }
.tile.val-4    { background: #4ab5ff; }
.tile.val-8    { background: #289cef; }
.tile.val-16   { background: #2a72a3; }
.tile.val-32   { background: #105a86; }
.tile.val-64   { background: #00548c; }
.tile.val-128  { background: #004777; }
.tile.val-256  { background: #002c4a; }
.tile.val-512  { background: #000F35; }
.tile.val-1024 { background: #000921; font-size: 50px; padding-top: 35px; }
.tile.val-2048 { background: #009894; font-size: 50px; padding-top: 35px; }
```

We reduced the `font-size` of the elements with value 1024 and 2048, and added some extra padding at the top to center them like the other tiles. The result should be something very similar to this:

![](https://i.imgur.com/AhyWXda.png)

We are almost done with our layout. We just need to add the score, and we will be ready to integrate the layout with the logic.

### Score

The last thing we have to add to the layout is a container for the score of the game. We will going to put it over the board. In the next step of the exercise, we will do it fancy adding some cool styles. Right now it will be enough to add it as plain text.

**HTML**

```htmlmixed
<div id="score">
  Score: <span class="js-score">0</span>
</div>
```

We didn't add any specific style for the container, but it's been applied the default styles that we have in the `body`:

```css
body {
  color: #3c5566;
  font-family: "Helvetica Neue", Arial, sans-serif;
  font-size: 18px;
  margin: 0;
  padding: 0;
}
```

We have added a title at the top of the page. With this, the layout is already finished. Right now, we have the following:

![](https://i.imgur.com/pIbCtSd.png)

We have our layout ready to go! The next step will be to join both the layout and the logic through JavaScript, and we will be ready to start playing with our game.

## Summary

We have seen how easy it is to create the game layout with HTML and CSS. We have tried to figure out which was the best way to implement the grid and how to visualize all the possible tiles we will have during the game.

## Extra Resources

- [2048](https://ironhack.github.io/guided-game-2048/)
