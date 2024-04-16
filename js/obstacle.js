class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = 950;
    this.top = 270;
    // Math.floor(Math.random() * 100 + 100);
    // random goes from 0-1 not including 1.
    // we generate here a number from 0 to -10
    // getting number between 19 - 100
    this.width = 120;
    this.height = 180;
    this.speed = 5;
    this.element = document.createElement("img");
    const randomImgObst = [
      "./images/obst_01.png",
      "./images/obst_02.png",
      "./images/obst_03.png",
      "./images/obst_04.png",
      "./images/obst_05.png",
      "./images/obst_06.png",
      "./images/obst_07.png",
    ];
    const randomIndexObst = Math.floor(Math.random() * randomImgObst.length);
    this.element.src = randomImgObst[randomIndexObst];
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    // Update the obstacle's position based on the properties left and top
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move(speed) {
    // Move the obstacle left by 4px
    this.left += -this.speed;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}
