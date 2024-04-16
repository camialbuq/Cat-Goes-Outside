window.onload = function () {
  const startButton = document.getElementById("start-button");
  const restartButton = document.getElementById("restart-button");
  const restartButtonWon = document.getElementById("restart-button-won");
  //console.log(restartButton); working correctly
  const soundButton = document.getElementById("sound-button");
  //const difficultyButton = document.getElementById("difficulty-button");
  // const backToMenuLostButton = document.getElementById(
  //   "back-to-menu-button-lost"
  // );
  // const backToMenuWonButton = document.getElementById(
  //   "back-to-menu-button-victory"
  // );
  const gameEndScreen = document.getElementById("game-end-lose");
  const gameWonScreen = document.getElementById("game-end-win");
  const bgMusic = document.getElementById("bgMusic");
  let soundStatus = "On";
  //let difficultyStatus = "Medium";

  //handling buttons

  startButton.addEventListener("click", function () {
    startGame();
    bgMusic.src =
      "./music/michael-bublé-feeling-good-(karaoke-version)-made-with-Voicemod.mp3";
    bgMusic.play();
  });

  //starting game

  function startGame() {
    game = new Game();
    game.start();
  }

  soundButton.addEventListener("click", function () {
    changeSoundOption();
  });

  function changeSoundOption() {
    if (soundStatus === "On") {
      soundStatus = "Off";
      document.getElementById("sound-status").innerHTML = "Off";
      bgMusic.muted = true;
    } else if (soundStatus === "Off") {
      soundStatus = "On";
      document.getElementById("sound-status").innerHTML = "On";
      bgMusic.muted = false;
    }
  }

  // difficultyButton.addEventListener("click", function () {
  //   changeDifficulty();
  // });

  // function changeDifficulty() {
  //   if (difficultyStatus === "Medium") {
  //     difficultyStatus = "Hard";
  //     document.getElementById("difficulty-status").innerHTML = "Hard";
  //     document.getElementById("difficulty-in-game").innerHTML = "Hard";
  //   } else if (difficultyStatus === "Hard") {
  //     difficultyStatus = "Easy";
  //     document.getElementById("difficulty-status").innerHTML = "Easy";
  //     document.getElementById("difficulty-in-game").innerHTML = "Easy";
  //   } else if (difficultyStatus === "Easy") {
  //     difficultyStatus = "Medium";
  //     document.getElementById("difficulty-status").innerHTML = "Medium";
  //     document.getElementById("difficulty-in-game").innerHTML = "Medium";
  //   }
  // }

  //handling key input
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];
    if (possibleKeystrokes.includes(key)) {
      event.preventDefault();
      // Handle other directional movements based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -5; //speed on which goes right / left
          game.player.element.style.transform = "scaleX(-1)";
          break;
        case "ArrowRight":
          //game.player.jump();
          game.player.directionX = 4;
          game.player.element.style.transform = "scaleX(1)";
          break;
        case "ArrowUp":
          game.player.jump(); // Trigger player's jump when "ArrowUp" key is pressed
          break;
        case "ArrowDown":
        // game.player.fall(); //this is breaking, makes the cat jump with crazy gravity
        //even if not pressing the arrowDown
        // break;
        //this is where we could add more ifs if the difficulty implemented
      }
    }
  }

  restartButton.addEventListener("click", function () {
    //console.log("restarting");
    restartGame();
  });

  restartButtonWon.addEventListener("click", function () {
    //console.log("restarting");
    restartGame();
  });

  function restartGame() {
    //location.reload;
    game = new Game();
    game.start();
    gameEndScreen.classList.add("hide");
    gameWonScreen.classList.add("hide");
  }

  // Add the handleKeydown function as an event listener for the keydown event
  window.addEventListener("keydown", handleKeydown);
}; //end of window load function
