class Player {
  constructor(
    gameScreen,
    left,
    top,
    width,
    height,
    jumpHeight,
    jumpSpeed,
    imgSrc
  ) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.jumpHeight = jumpHeight;
    this.jumpSpeed = jumpSpeed;
    this.directionX = 0;
    this.directionY = 0;
    this.isJumping = false;
    //adding image
    this.element = document.createElement("img");
    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    // Set up the default element's property values
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    //console.log("move called");
    this.left += this.directionX;
    this.top += this.directionY;

    const minX = 0.1 * this.gameScreen.offsetWidth; // 90% of screen width
    const minY = 480;
    //0.2 * this.gameScreen.offsetHeight; // 80% of screen height

    if (this.left < minX) {
      this.left = minX;
    }
    //this part breaks and makes the cat stay in the jump
    // if (this.top < minY) {
    //   this.top = minY;
    // }

    const maxX = this.gameScreen.offsetWidth - this.width - minX;
    const maxY = 320; //found by testing to match the floor same as player height given
    //this.gameScreen.offsetHeight - this.height - minY;

    if (this.left > maxX) {
      this.left = maxX;
    }

    if (this.top > maxY) {
      this.top = maxY;
    }

    this.updatePosition();
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      let initialTop = this.top;
      let jumpMotion = setInterval(() => {
        if (this.top - initialTop <= -this.jumpHeight) {
          clearInterval(jumpMotion);
          this.fall(initialTop);
        } else {
          this.top -= this.jumpSpeed;
          this.updatePosition();
        }
      }, 17);
    }
    //trying to move to the right
    // if (!this.isJumping && this.directionX === 1) {
    //   // Ensure the player jumps horizontally to the right
    //   this.isJumping = true;
    // }
  }

  fall(initialTop) {
    let fallMotion = setInterval(() => {
      if (this.top >= initialTop) {
        clearInterval(fallMotion);
        this.top = initialTop;
        this.updatePosition();
        this.isJumping = false; // Reset jump state
      } else {
        this.top += 6; // Adjust the fall speed as needed
        this.updatePosition();
      }
    }, 17);
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) {
    const playerRect = this.element.getBoundingClientRect();
    const obstacleRect = obstacle.element.getBoundingClientRect();

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) {
      return true;
    } else {
      return false;
    }
  }
}
