export default class Level1Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'Level1Scene' });
    this.jumpCount = 0;
    this.gameOver = false;
  }

  preload() {
    // Create a red circle texture
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xff0000, 1);
    graphics.fillCircle(20, 20, 20);
    graphics.generateTexture('redCircle', 40, 40);
  }

  create() {
    // Create a green platform texture
    const platformGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    platformGraphics.fillStyle(0x00ff00, 1);
    platformGraphics.fillRect(0, 0, 200, 50);
    platformGraphics.generateTexture('greenPlatform', 200, 50);

    // Add the platforms as static physics objects
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 575, 'greenPlatform').refreshBody();
    platforms.create(600, 400, 'greenPlatform').refreshBody();
    platforms.create(50, 250, 'greenPlatform').refreshBody();
    platforms.create(750, 220, 'greenPlatform').refreshBody();

    // Create the red circle sprite with physics
    this.redCircle = this.physics.add.sprite(400, 300, 'redCircle');
    this.redCircle.setBounce(0.2);
    this.redCircle.setCollideWorldBounds(true);
    this.redCircle.body.setGravityY(300);

    // Add collider between red circle and platforms
    this.physics.add.collider(this.redCircle, platforms, this.resetJumpCount, null, this);

    // Create an invisible boundary below the screen
    const boundary = this.add.rectangle(400, 580, 800, 10, 0xff0000, 0);
    this.physics.add.existing(boundary, true);  // true means it's a static body
    this.physics.add.collider(this.redCircle, boundary, this.triggerGameOver, null, this);

    // Add controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Add Game Over text (hidden initially)
    this.gameOverText = this.add.text(400, 300, 'Game Over', { fontSize: '64px', fill: '#ff0000' });
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.setVisible(false);
  }

  update() {
    if (this.gameOver) {
      console.log("Game over");
      return;
    }

    console.log(`Player position: (${this.redCircle.x}, ${this.redCircle.y})`);

    if (this.cursors.left.isDown) {
      this.redCircle.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.redCircle.setVelocityX(160);
    } else {
      this.redCircle.setVelocityX(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (this.redCircle.body.touching.down || this.jumpCount < 2) {
        this.redCircle.setVelocityY(-500);
        this.jumpCount++;
      }
    }
  }

  resetJumpCount() {
    if (this.redCircle.body.touching.down) {
      this.jumpCount = 0;
    }
  }

  triggerGameOver() {
    console.log('Game Over Triggered');
    this.gameOver = true;
    this.redCircle.setTint(0xff0000);
    this.redCircle.setVelocity(0, 0);
    this.gameOverText.setVisible(true);

    // Add click event listener to go to main menu
    this.input.once('pointerdown', () => {
      this.gameOver = false;
      this.scene.start('MainMenuScene');
    });
  }
}
