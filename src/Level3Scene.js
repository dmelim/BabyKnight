const BOUNCE_VELOCITY = -300;
const KILL_THRESHOLD = 5;

export default class Level3Scene extends Phaser.Scene {
  constructor() {
    super({ key: "Level3Scene" });
    this.jumpCount = 0;
    this.gameOver = false;
    this.keyCollected = false;
    this.platforms = null;
  }

  preload() {
    this.load.image("chest", "src/assets/chest.png");
    this.load.image("key", "src/assets/key.png");

    this.load.image("platform", "src/assets/Test.png");

    this.load.image("background2", "src/assets/bgCastle2.webp");

    this.load.image("item2", "src/assets/bearTree.png");

    this.load.spritesheet("player", "src/assets/knight.png", {
      frameWidth: 100,
      frameHeight: 100,
    });
    this.load.spritesheet("monster", "src/assets/slime_green.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
  }

  create() {
    this.cheatKey1 = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );
    this.cheatKey2 = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S
    );
    this.cheatKey3 = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.K
    );

    this.add
      .image(962, 540, "background2")
      .setOrigin(0.5, 0.5)
      .setScale(1.2)
      .setTint(0x303030);

    this.platforms = this.physics.add.staticGroup();
    this.createPlatform(this.platforms, 111, 200, 0.6);
    this.createPlatform(this.platforms, 201, 700, 1);
    this.createPlatform(this.platforms, 651, 500, 0.6);
    this.createPlatform(this.platforms, 1101, 800, 0.4);
    this.createPlatform(this.platforms, 1501, 500, 0.4);
    this.createPlatform(this.platforms, 1701, 1000, 0.6);

    this.player = this.physics.add.sprite(110, 50, "player");
    this.player.setBounce(0.2).setScale(3);
    this.player.setCollideWorldBounds(true);
    this.player.body
      .setGravityY(300)
      .setSize(this.player.width * 0.1, this.player.height * 0.1);

    this.physics.add.collider(
      this.player,
      this.platforms,
      this.resetJumpCount,
      null,
      this
    );

    const boundary = this.add.rectangle(960, 1050, 1920, 10, 0xff0000, 0);
    this.physics.add.existing(boundary, true);
    this.physics.add.collider(
      this.player,
      boundary,
      this.triggerGameOver,
      null,
      this
    );

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

    this.physics.add.overlap(
      this.player,
      this.key,
      this.collectKey,
      null,
      this
    );

    this.chest = this.physics.add.staticSprite(1700, 950, "chest");
    this.chest.setScale(0.2);
    this.chest.body.setSize(this.chest.width * 0.1, this.chest.height * 0.1);
    this.chest.body.setOffset(this.chest.width * 0.4, this.chest.height * 0.4);

    this.physics.add.overlap(
      this.player,
      this.chest,
      this.collectChest,
      null,
      this
    );
    this.anims.create({
      key: "monster_walk",
      frames: this.anims.generateFrameNumbers("monster", { start: 0, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });

    this.monsters = this.physics.add.group();
    this.createMonster(this.monsters, 1000, 80);
    this.createMonster(this.monsters, 100, 300);
    this.createMonster(this.monsters, 700, 600);
    this.createMonster(this.monsters, 200, 900);

    this.monsters.children.iterate((monster) => {
      const speed = Phaser.Math.Between(200, 200 + 300);
      monster.body.setAllowGravity(false);
      monster.setVelocityX(speed);
      monster.body.setCollideWorldBounds(true);
      monster.body.setBounce(1, 0);
    });

    this.physics.add.collider(
      this.player,
      this.monsters,
      this.hitMonster,
      null,
      this
    );

    this.cursors = this.input.keyboard.createCursorKeys();

    this.gameOverText = this.add.text(960, 540, "Game Over", {
      fontSize: "128px",
      fill: "#ff0000",
      fontStyle: "bold",
      stroke: "#000000",
      strokeThickness: 8,
    });
    this.gameOverText.setOrigin(0.5, 0.5);
    this.tweens.add({
      targets: this.gameOverText,
      x: 960,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      repeat: -1,
    });
    this.gameOverText.setVisible(false);
  }
  clearScene() {
    if (this.platforms) {
      this.platforms.clear(true, true);
    }
  }
  update() {
    if (this.gameOver) {
      return;
    }

    if (
      this.cheatKey1.isDown &&
      this.cheatKey2.isDown &&
      this.cheatKey3.isDown
    ) {
      console.log("Cheat activated! Skipping to next level...");
      this.scene.start("EndScene");
    }

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (this.player.body.touching.down || this.jumpCount < 2) {
        this.player.setVelocityY(-500);
        this.jumpCount++;
      }
    }
  }

  resetJumpCount() {
    if (this.player.body.touching.down) {
      this.jumpCount = 0;
    }
  }

  triggerGameOver() {
    this.gameOver = true;
    this.player.setTint(0xff0000);
    this.player.setVelocity(0, 0);
    this.gameOverText.setVisible(true);

    this.input.once("pointerdown", () => {
      this.gameOver = false;
      this.scene.start("Level3Scene");
    });
  }
  createMonster(group, x, y) {
    const monster = group.create(x, y, "monster");

    monster.body.setSize(monster.width * 0.6, monster.height * 0.6);
    monster.body.setOffset(monster.width * 0.2, monster.height * 0.5);

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
      monster.destroy();
      player.setVelocityY(BOUNCE_VELOCITY);
    } else {
      this.triggerGameOver();
    }
  }
  createPlatform(group, x, y, scale = 1.5) {
    const platform = group.create(x, y, "platform");
    platform.setScale(scale);
    platform.refreshBody();
  }

  collectKey(player, key) {
    key.destroy();
    this.keyCollected = true;
  }

  collectChest(player, chest) {
    if (this.keyCollected) {
      chest.destroy();
      this.keyCollected = false;

      const item = this.add.sprite(chest.x, chest.y, "item2");
      item.setScale(0.1);

      this.tweens.add({
        targets: item,
        y: item.y - 100,
        duration: 1000,
        ease: "Power2",
        onComplete: () => {
          this.tweens.add({
            targets: item,
            alpha: 0,
            duration: 1000,
            ease: "Power2",
            onComplete: () => {
              item.destroy();
              this.clearScene();
              this.scene.start("EndScene");
            },
          });
        },
      });
    }
  }
}
