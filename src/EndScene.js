export default class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: "EndScene" });
  }

  preload() {
    // Load the images
    this.load.image("pacifier1", "assets/pacifier.png");
    this.load.image("babyBottle2", "assets/babyBottle.png");
    this.load.image("bearTree3", "assets/bearTree.png");
  }

  create() {
    console.log("EndScene: create");

    // Display main congratulation text and align it to the center
    this.add
      .text(
        this.cameras.main.width / 2,
        350,
        "You finished your quest Knight!",
        {
          font: "40px Arial",
          fill: "#ffffff",
        }
      )
      .setOrigin(0.5); // Align to the center of the screen

    // Display subtext and align it to the center
    this.add
      .text(
        this.cameras.main.width / 2,
        450,
        "Congratulations, here are your magical items:",
        {
          font: "20px Arial",
          fill: "#ffffff",
        }
      )
      .setOrigin(0.5); // Align to the center

    // Display the images in the center
    const imageYPosition = 570; // Y position where the images should appear
    const spacing = 200; // Horizontal spacing between images
    const centerX = this.cameras.main.width / 2;

    const pacifier1 = this.add
      .image(centerX - spacing, imageYPosition, "pacifier1")
      .setAlpha(0)
      .setScale(0.15);
    const babyBottle2 = this.add
      .image(centerX, imageYPosition, "babyBottle2")
      .setAlpha(0)
      .setScale(0.15);
    const bearTree3 = this.add
      .image(centerX + spacing, imageYPosition, "bearTree3")
      .setAlpha(0)
      .setScale(0.15);

    // Tween for the first image
    this.tweens.add({
      targets: pacifier1,
      alpha: 1,
      duration: 1000,
      ease: "Power2",
      delay: 0, // Start immediately
    });

    // Tween for the second image
    this.tweens.add({
      targets: babyBottle2,
      alpha: 1,
      duration: 1000,
      ease: "Power2",
      delay: 1000, // Start after the first image is fully visible
    });

    // Tween for the third image
    this.tweens.add({
      targets: bearTree3,
      alpha: 1,
      duration: 1000,
      ease: "Power2",
      delay: 2000, // Start after the second image is fully visible
    });
    // Option to restart the game or go back to the main menu
    this.add
      .text(
        this.cameras.main.width / 2,
        imageYPosition + 150,
        "Click to Continue",
        {
          font: "20px Arial",
          fill: "#ffffff",
        }
      )
      .setOrigin(0.5); // Align to the center

    this.input.on("pointerdown", () => {
      this.scene.start("FinalConversation");
    });
  }
}
