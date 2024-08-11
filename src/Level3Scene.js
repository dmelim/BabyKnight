const BOUNCE_VELOCITY = -300;
const KILL_THRESHOLD = 5; // Adjust this threshold if needed

export default class Level3Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level3Scene" });
    this.jumpCount = 0;
    this.gameOver = false;
    this.blueBallCollected = false;
    this.platforms = null;
  }

  preload() {
    // Create a red circle texture
    const graphics = this.make.graphics({ x: 0, y: 0, add: false });
    graphics.fillStyle(0xff0000, 1);
    graphics.fillCircle(20, 20, 20);
    graphics.generateTexture("redCircle", 40, 40);

    // Create a blue ball texture
    graphics.clear();
    graphics.fillStyle(0x0000ff, 1);
    graphics.fillCircle(10, 10, 10);
    graphics.generateTexture("blueBall", 20, 20);

    // Create a brown square texture
    graphics.fillStyle(0x8b4513, 1); // Brown color
    graphics.fillRect(0, 0, 20, 20);
    graphics.generateTexture("brownSquare", 20, 20);
  }

  create() {
    // Create this.platforms
    this.platforms = this.physics.add.staticGroup();
    this.createPlatform(this.platforms, 111, 200, 50);
    this.createPlatform(this.platforms, 201, 700, 100);
    this.createPlatform(this.platforms, 651, 500, 50);
    this.createPlatform(this.platforms, 1101, 800, 30);
    this.createPlatform(this.platforms, 1501, 500, 30);
    this.createPlatform(this.platforms, 1701, 1000, 50);

    // Create the red circle sprite with physics
    this.redCircle = this.physics.add.sprite(110, 50, "redCircle");
    this.redCircle.setBounce(0.2);
    this.redCircle.setCollideWorldBounds(true);
    this.redCircle.body.setGravityY(300);

    // Add collider between red circle and this.platforms
    this.physics.add.collider(
      this.redCircle,
      this.platforms,
      this.resetJumpCount,
      null,
      this
    );

    // Create an invisible boundary below the screen
    const boundary = this.add.rectangle(960, 1050, 1920, 10, 0xff0000, 0);
    this.physics.add.existing(boundary, true); // true means it's a static body
    this.physics.add.collider(
      this.redCircle,
      boundary,
      this.triggerGameOver,
      null,
      this
    );

    // Create the blue ball sprite as a static object
    this.blueBall = this.physics.add.staticSprite(900, 200, "blueBall");

    // Add overlap detection between red circle and blue ball
    this.physics.add.overlap(
      this.redCircle,
      this.blueBall,
      this.collectBlueBall,
      null,
      this
    );

    // Create the brown square sprite as a static object
    this.brownSquare = this.physics.add.staticSprite(1700, 950, "brownSquare");

    // Add overlap detection between red circle and brown square
    this.physics.add.overlap(
      this.redCircle,
      this.brownSquare,
      this.collectBrownSquare,
      null,
      this
    );

    // Create monsters group as a static group
    this.monsters = this.physics.add.group();
    this.createMonster(this.monsters, 1000, 100);
    this.createMonster(this.monsters, 100, 300);
    this.createMonster(this.monsters, 700, 600);
    this.createMonster(this.monsters, 200, 900);

    // Set initial velocity for monsters
    this.monsters.children.iterate((monster) => {
      const speed = Phaser.Math.Between(200, 200 + 300);
      monster.body.setAllowGravity(false); // Disable gravity for monsters
      monster.setVelocityX(speed); // Move to the right with velocity 50
      monster.body.setCollideWorldBounds(true);
      monster.body.setBounce(1, 0); // Bounce back when hitting the bounds
    });

    // Add collider between player and monsters
    this.physics.add.collider(
      this.redCircle,
      this.monsters,
      this.hitMonster,
      null,
      this
    );
    // Add controls
    this.cursors = this.input.keyboard.createCursorKeys();

    // Add Game Over text (hidden initially)
    this.gameOverText = this.add.text(400, 300, "Game Over", {
      fontSize: "64px",
      fill: "#ff0000",
    });
    this.gameOverText.setOrigin(0.5);
    this.gameOverText.setVisible(false);
  }
  clearScene() {
    if (this.platforms) {
      this.platforms.clear(true, true);
    }
  }
  update() {
    if (this.gameOver) {
      console.log("Game over");
      return;
    }

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
    console.log("Game Over Triggered");
    this.gameOver = true;
    this.redCircle.setTint(0xff0000);
    this.redCircle.setVelocity(0, 0);
    this.gameOverText.setVisible(true);

    // Add click event listener to go to main menu
    this.input.once("pointerdown", () => {
      this.gameOver = false;
      this.scene.start("MainMenuScene");
    });
  }
  createMonster(group, x, y) {
    const monsterGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    monsterGraphics.fillStyle(0x800080, 1); // Purple color
    monsterGraphics.fillRect(0, 0, 50, 50);
    monsterGraphics.generateTexture(`purpleMonster_${x}_${y}`, 50, 50);

    group.create(x, y, `purpleMonster_${x}_${y}`).refreshBody();
  }

  hitMonster(player, monster) {
    if (
      player.body.velocity.y > 0 &&
      player.body.touching.down &&
      monster.body.touching.up
    ) {
      console.log("Player killed the monster!");
      monster.destroy(); // Destroy the monster
      player.setVelocityY(BOUNCE_VELOCITY); // Bounce the player
    } else {
      console.log("Player hit by monster! Game over.");
      this.triggerGameOver();
    }
  }
  createPlatform(group, x, y, width) {
    const platformGraphics = this.make.graphics({ x: 0, y: 0, add: false });
    platformGraphics.fillStyle(0x00ff00, 1);
    platformGraphics.fillRect(0, 0, width, 50);
    platformGraphics.generateTexture(`greenPlatform_${x}_${y}`, width, 50);

    group.create(x, y, `greenPlatform_${x}_${y}`).refreshBody();
  }

  collectBlueBall(player, blueBall) {
    blueBall.destroy();
    this.blueBallCollected = true;
    console.log("Blue ball collected:", this.blueBallCollected);
  }

  collectBrownSquare(player, brownSquare) {
    if (this.blueBallCollected) {
      brownSquare.destroy();
      this.clearScene();
      console.log("Brown square collected, moving to next scene");
      this.scene.start("EndScene");
    }
  }
}
