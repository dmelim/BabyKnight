const BOUNCE_VELOCITY = -300;
const KILL_THRESHOLD = 5; // Adjust this threshold if needed
const RANDOM = false;

export default class Level1Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level1Scene" });
    this.jumpCount = 0;
    this.gameOver = false;
    this.keyCollected = false;
    this.platforms = null; // Ensure platforms is initialized
    this.monsters = null;
  }

  preload() {
    this.load.image("chest", "assets/chest.png");
    this.load.image("key", "assets/key.png");

    this.load.image("platform", "assets/Test.png");

    this.load.image("background", "assets/bgCastle1.webp");

    this.load.spritesheet("player", "assets/knight.png", {
      frameWidth: 100,
      frameHeight: 100,
    });
    this.load.spritesheet("monster", "assets/slime_green.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
  }

  create() {
    // Create platforms
    this.add
      .image(960, 540, "background")
      .setOrigin(0.5, 0.5)
      .setScale(1.2)
      .setTint(0x303030);

    this.platforms = this.physics.add.staticGroup();
    this.createPlatform(this.platforms, 110, 1000, 1.6);
    this.createPlatform(this.platforms, 300, 700, 2);
    this.createPlatform(this.platforms, 650, 500);
    this.createPlatform(this.platforms, 1100, 800, 1.8);
    this.createPlatform(this.platforms, 1500, 500);
    this.createPlatform(this.platforms, 1700, 1000);

    // Create the red circle sprite with physics
    this.redCircle = this.physics.add.sprite(110, 300, "player");
    this.redCircle.setBounce(0.2).setScale(3);
    this.redCircle.setCollideWorldBounds(true);
    this.redCircle.body
      .setGravityY(300)
      .setSize(this.redCircle.width * 0.1, this.redCircle.height * 0.1);
    // Add collider between red circle and platforms
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
    this.key = this.physics.add.staticSprite(900, 200, "key");
    this.tweens.add({
      targets: this.key,
      y: this.key.y - 10,
      yoyo: true,
      repeat: -1,
      duration: 500,
      ease: "Sine.easeInOut",
    });
    this.key.setScale(0.2);
    this.key.body.setSize(this.key.width * 0.1, this.key.height * 0.1);
    this.key.body.setOffset(this.key.width * 0.4, this.key.height * 0.4);

    // Add overlap detection between red circle and blue ball
    this.physics.add.overlap(
      this.redCircle,
      this.key,
      this.collectKey,
      null,
      this
    );

    // Create the brown square sprite as a static object
    this.chest = this.physics.add.staticSprite(1700, 940, "chest");
    this.chest.setScale(0.2);
    this.chest.body.setSize(this.chest.width * 0.1, this.chest.height * 0.1);
    this.chest.body.setOffset(this.chest.width * 0.4, this.chest.height * 0.4);

    // Add overlap detection between red circle and brown square
    this.physics.add.overlap(
      this.redCircle,
      this.chest,
      this.collectChest,
      null,
      this
    );

    // Create animationsF
    this.anims.create({
      key: "monster_walk",
      frames: this.anims.generateFrameNumbers("monster", { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    // Create monsters group as a static group
    this.monsters = this.physics.add.group();
    this.createMonster(this.monsters, 300, 300);
    this.createMonster(this.monsters, 700, 700);

    // Set initial velocity for monsters
    this.monsters.children.iterate((monster) => {
      monster.body.setAllowGravity(false); // Disable gravity for monsters
      monster.setVelocityX(200); // Move to the right with velocity 50
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

  createMonster(group, x, y, minSpeed) {
    const monster = group.create(x, y, "monster");

    // Adjust the physics body to fit the non-transparent area
    monster.body.setSize(monster.width * 0.6, monster.height * 0.6); // Example scaling
    monster.body.setOffset(monster.width * 0.2, monster.height * 0.5); // Example offset

    // Other settings (e.g., gravity, velocity)
    monster.body.setAllowGravity(false);
    monster.setVelocityX(200);
    monster.setCollideWorldBounds(true);
    monster.body.setBounce(1, 0);
    monster.setScale(4);
    monster.anims.play("monster_walk");
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

  triggerGameOver() {
    console.log("Game Over Triggered");
    this.gameOver = true;
    this.redCircle.setTint(0xff0000);
    this.redCircle.setVelocity(0, 0);
    this.gameOverText.setVisible(true);

    this.input.once("pointerdown", () => {
      this.gameOver = false;
      this.scene.start("MainMenuScene");
    });
  }

  createPlatform(group, x, y, scale = 1.5) {
    const platform = group.create(x, y, "platform");
    platform.setScale(scale);
    platform.refreshBody();
  }

  collectKey(player, key) {
    key.destroy();
    this.keyCollected = true;
    console.log("Blue ball collected:", this.keyCollected);
  }

  collectChest(player, chest) {
    if (this.keyCollected) {
      chest.destroy();
      this.keyCollected = false;
      this.clearScene();
      this.scene.start("Level2Scene");
    }
  }
}
