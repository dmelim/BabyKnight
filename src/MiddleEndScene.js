export default class MiddleEndScene extends Phaser.Scene {
  constructor() {
    super({ key: "MiddleEndScene" });
  }

  preload() {
    // You can preload any assets here if needed
    this.load.image("blackScreen", "src/assets/blackbg.png");
  }

  create() {
    // Add a black screen background
    this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "blackScreen"
      )
      .setOrigin(0.5);

    // Define the paragraphs to be displayed
    const paragraph1 =
      "Now you need to complete your journey and talk with the king,";
    const paragraph2 =
      "but first you remember that you should talk with a friend that lives nearby…";

    // Display the first paragraph with initial alpha set to 0 (invisible)
    const text1 = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - 50,
        paragraph1,
        {
          font: "30px Arial",
          fill: "#ffffff",
          align: "center",
          wordWrap: { width: 800, useAdvancedWrap: true },
        }
      )
      .setOrigin(0.5)
      .setAlpha(0); // Start invisible

    // Display the second paragraph with initial alpha set to 0 (invisible)
    const text2 = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 10,
        paragraph2,
        {
          font: "30px Arial",
          fill: "#ffffff",
          align: "center",
          wordWrap: { width: 800, useAdvancedWrap: true },
        }
      )
      .setOrigin(0.5)
      .setAlpha(0); // Start invisible

    // Fade in the first paragraph
    this.tweens.add({
      targets: text1,
      alpha: 1,
      duration: 1000, // 1 second fade-in
      onComplete: () => {
        // Once the first paragraph is fully visible, fade in the second paragraph
        this.tweens.add({
          targets: text2,
          alpha: 1,
          duration: 1000, // 1 second fade-in
          onComplete: () => {
            // After both paragraphs are visible, show and animate the "Click to Continue" text
            this.showContinueText();
          },
        });
      },
    });
  }

  showContinueText() {
    // Add the "Click to Continue" instruction below the message with initial alpha set to 1
    const continueText = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 150,
        "Click to Continue",
        {
          font: "20px Arial",
          fill: "#ffffff",
        }
      )
      .setOrigin(0.5)
      .setAlpha(1); // Start visible

    // Add a tween to make the "Click to Continue" text slowly pulse
    this.tweens.add({
      targets: continueText,
      scale: 1.1, // Slightly increase the scale
      duration: 800,
      yoyo: true, // Make it reverse after scaling up
      repeat: -1, // Repeat indefinitely
      ease: "Sine.easeInOut", // Smooth easing
    });

    // Set up the click event to transition to the next scene
    this.input.on("pointerdown", () => {
      this.scene.start("FinalConversation");
    });
  }
}
