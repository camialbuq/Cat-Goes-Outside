class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end-lose");
    this.gameWonScreen = document.getElementById("game-end-win");
    this.playerScore = document.getElementById("player-score");
    //player constructor: constructor(
    // gameScreen,
    // left,
    // top,
    // width,
    // height,
    // jumpHeight,
    // jumpSpeed,
    // imgSrc
    this.player = new Player(
      this.gameScreen,
      190, //left
      320, //top - if changing here remember to change minY in player move()
      60, //width
      60, //height
      225, //jumpHeight
      9, //jumpSpeed
      "./images/CatCharacter.png"
    );
    this.height = 400;
    this.width = 900;
    this.obstacles = [];
    this.lastObstacleCreationTime = 0;
    this.foodies = [];
    this.lastFoodCreationTime = 0;
    this.score = 0;
    this.lives = 7;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
  }

  start() {
    // Set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    // Hide the start screen
    this.startScreen.style.display = "none";
    this.playerScore.style.display = "block";
    this.playerScore.classList.remove("hide");
    // Show the game screen
    this.gameScreen.style.display = "block";

    // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency); //60fps
    document.getElementById("food-collected").innerHTML = `${this.score}`;
  }

  gameLoop() {
    // If "gameIsOver" is set to "true" clear the interval to stop the loop
    this.update();
    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId); //clear the current game ID
    }
  }

  update() {
    this.player.move();

    //HITTING OBSTACLES
    // Check for collision and if an obstacle is still on the screen
    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];

      //speed of obstacles based on level "food"
      if (this.score >= 5 && this.score <= 10) {
        obstacle.move(6); //this inserts a number for the move function to get faster
      }
      if (this.score > 10 && this.score <= 15) {
        obstacle.move(7);
      }
      if (this.score > 15) {
        obstacle.move(8);
      }

      obstacle.move();

      // If the player collides with an obstacle
      if (this.player.didCollide(obstacle)) {
        // Remove the obstacle element from the DOM
        obstacle.element.remove();
        // Remove obstacle object from the array
        this.obstacles.splice(i, 1);
        // Reduce player's lives by 1
        this.lives--;
        // Update the counter variable to account for the removed obstacle
        i--;
        document.getElementById("lives").innerHTML = `${this.lives}`;
      }
    }

    // Create a new obstacle based on a random probability
    // when there is no other obstacles on the screen
    if (Math.random() > 0.98 && this.obstacles.length < 100) {
      //this is a high likelihood condition
      const currentTime = Date.now(); //current time in miliseconds
      const creationDelay = Math.floor(
        Math.random() * (2500 - 1200 + 1) + 1200
      ); //(numbers are max time you wait in between generation - minimum time ) + minimum time
      //generates a random delay between 1200ms and 2500ms for the creation of the next obstacle.

      if (currentTime - this.lastObstacleCreationTime > creationDelay) {
        //checks if enough time has passed since the last obstacle creation
        this.obstacles.push(new Obstacle(this.gameScreen));
        //if enough time has passed then a new obstacle added
        this.lastObstacleCreationTime = currentTime; // Update the last creation time
        // console.log("obstacle created");
      }
    }

    //COLLECTING FOOD
    // Check for collision and if a FOOD obstacle is still on the screen
    for (let i = 0; i < this.foodies.length; i++) {
      const food = this.foodies[i];
      food.appear();

      if (this.player.didCollide(food)) {
        // Remove the obstacle element from the DOM
        food.element.remove();
        // Remove obstacle object from the array
        this.foodies.splice(i, 1);
        // increase player's score +1 - food score
        this.score++;
        // Update the counter variable to account for the removed obstacle
        i--;
        document.getElementById("food-collected").innerHTML = `${this.score}`;

        // //ECEM AUDIO
        // const soundCatch = new Audio ('audiofile.mp3');
        // soundCatch.play();
      }
    }

    // Create a new obstacle based on a random probability
    // when there is no other obstacles on the screen
    if (Math.random() > 0.98 && this.foodies.length < 100) {
      const currentTime = Date.now();
      //(numbers are max time you wait in between generation - minimum time ) + minimum time
      const creationDelay = Math.floor(
        Math.random() * (2500 - 1500 + 1) + 1500
      );
      if (currentTime - this.lastFoodCreationTime > creationDelay) {
        this.foodies.push(new Food(this.gameScreen));
        this.lastFoodCreationTime = currentTime; // Update the last creation time
        // console.log("obstacle created");
      }
    }

    //changing background screen at a specific score
    if (this.score === 0) {
      this.gameScreen.style.backgroundImage =
        "url('./images/gamebackground01.png')";
    }

    if (this.score === 8) {
      this.gameScreen.style.backgroundImage =
        "url('./images/gamebackground02.png')";
    }
    if (this.score === 14) {
      this.gameScreen.style.backgroundImage =
        "url('./images/gamebackground03.png')";
    }

    //winning game
    if (this.score === 20) {
      this.winGame();
    }

    //losing game
    if (this.lives === 0) {
      this.endGame();
    }
  }

  // Create a new method responsible for ending the game
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
    this.foodies.forEach((food) => food.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    this.playerScore.classList.add("hide");
    // Show end game screen
    this.gameEndScreen.classList.remove("hide");
    this.gameEndScreen.style.display = "flex";
  }
  //here we will still add the winGame option
  winGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
    this.foodies.forEach((food) => food.element.remove());
    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    this.playerScore.classList.add("hide");
    // Show end game WIN screen
    this.gameWonScreen.classList.remove("hide");
    this.gameWonScreen.style.display = "flex";
  }
}
