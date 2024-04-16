class Food {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = 950;
    this.top = Math.floor(Math.random() * 100 + 60);
    this.width = 30;
    this.height = 60;
    this.element = document.createElement("img");
    // const randomImgObst = [
    //   "./images/Obstacles.png",
    //   "./images/obst_01.png",
    //   "./images/obst_02.png",
    //   "./images/obst_03.png",
    //   "./images/obst_04.png",
    // ];
    // const randomIndexObst = Math.floor(Math.random() * randomImgObst.length);
    this.element.src = "./images/food.png";
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

  appear() {
    // Move the obstacle down by 3px
    this.left += -5;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}
