![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)

# Guided Game | Make it fancy! Audio. Extra Libraries. Deploy

## Add Audio

### Ion.sound

![](https://i.imgur.com/c2kniRt.png)


[ion.Sound.js](http://ionden.com/a/plugins/ion.sound/en.html) is a JavaScript plugin for playing sounds. It even includes some sample audios that we will use to pimp our 2048!

To add it to our project:

1) let's create a `lib` path to put the unzipped file.

2) Download the [ion.Sound.js](http://ionden.com/a/plugins/ion.sound/en.html) file and save the unzipped file `ion.sound-3.0.7` under our `lib` folder.

3) Add the script to the `index.html` file:

```htmlmixed
<script type="text/javascript" src="lib/ion.sound-3.0.7/ion.sound.min.js"></script>
```

4) In the `application.js` file, let's create a function to load the sounds.

```javascript
function loadSounds () {
  ion.sound({
    sounds: [{name: "snap"}, {name: "tap"}],
  
    path: "../lib/ion.sound-3.0.7/sounds/",
    preload: true,
    volume: 1.0
  });
}
```

In the function above we are just preloading the *snap* and *tap* sounds. We specify the path were our sounds are served and the volume. Now, our sounds are ready to be played when desired.

5) Let's add a sound when we move the tiles. In the `game_manager.js` file, play the sound just at the beginning of the `move` method:

``` javascript
Game2048.prototype.move = function (direction) {
  ion.sound.play("snap");
	// ...
}
```

6) Let's add the `tap` sound when there's a tile merge. Right after the condition where we compare the tiles.

```javascript=
for(i = 0; i < newRow.length - 1; i++) {
  if (newRow[i+1] === newRow[i]) {
    ion.sound.play("tap");
    // more code
  }
}
```
:::warning
:bulb: This would be a good moment to commit our changes!
:::

### Simple HTTP Server

If you execute the code above, the Chrome console will display an error. 

To be able to serve the sound files in our localhost, we will simply install a Node package to emulate a server.

[Simple HTTP Server](https://www.npmjs.com/package/simplehttpserver) is a quick solution for serving the files in a directory via HTTP (we will be able to access them locally, via localhost). This package help us to fix the problem when a site is requesting from an URL in the web browser.

We have to install the package globally, using `npm`: 

```shell
$ npm install simplehttpserver -g
```

Now the package is installed globally in your computer.


### Running in localhost

To run your game in localhost, go to your project folder and turn on the server

```shell
$ cd project-folder/
$ simplehttpserver
Listening 0.0.0.0:8000 web root dir...
```

Now open your browser and go to `localhost:8000`. This is the port where the server will be listening to serve the application.

Voila! Your game is alive in your localhost!

![](https://media.giphy.com/media/ehc19YLR4Ptbq/giphy.gif =600x)

## Deploy your game

Let's deploy our game to see it online!

[GitHub Pages](https://pages.github.com/) allows us to deploy directly from our GitHub repository. To deploy our game:

#### Creating the docs folder

1) Let's create a new folder called `docs` under your project root path

```
$ mkdir docs/
```
2) Now, we should carefuly copy our project tree entirely into the `docs` folder. Every file in here will be used to deploy the app

```
$ cp index.html docs
$ cp css/ docs/
$ cp js/ docs/
$ cp lib/ docs/
$ cp img/ docs/
```
3) Let's make sure we have everything we need in our `docs` folder, commit and push our changes
```
$ git add .
$ git commit -m "Add files to docs"
$ git push origin master
```

#### Setting our account 

In our [GitHub](https://github.com) profile, let's open the application repository with the recent changes added.

Now, let's open the remote repository settings in the right panel and scroll down to the GitHub Pages section.

Now let's go to the Settings tab in our repository and scroll down to the GitHub Pages section.

![](https://i.imgur.com/sYKhqpd.png)

Let's publish the site by set it to build it from the `/docs` folder in the master branch. Our game will be deployed in:

```
https://[username].github.io/[repository-name]/
```

:::warning
:bulb: **Extra:** To publish an application really quickly in GitHub Pages, you can name your repository `username`.github.io. Being `username` your GitHub account username. 

The downside of this method is that you can only have one repository of your account deployed in GitHub pages.
:::

## Fix the source

As you might have noticed, we now have two different project trees. One of them, the main one, runs in our localhost. The other project tree (in `docs`) runs in the GitHub Pages server.

This means that the path to get the sounds in each of the `application.js` files will be different, since the method should look for the sound files in different places.

Let's open our `application.js` in the `docs` folder and edit the loading method to specify the right path:

```javascript=
function loadSounds () {
  ion.sound({
    sounds: [{name: "snap"}, {name: "tap"}],

    path: "/guided-game-2048/lib/ion.sound-3.0.7/sounds/",
    preload: true,
    volume: 1.0
  });
}
```

Now, let's open our game's URL in the browser and play!



## Extra Resources

- [Original Game Repository on Github](https://github.com/gabrielecirulli/2048)
