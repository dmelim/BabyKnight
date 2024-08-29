export default class FinalConversation extends Phaser.Scene {
  constructor() {
    super("FinalConversation");
  }

  create() {
    // Create the text and center it on the screen
    const conversationText = this.add
      .text(
        this.cameras.main.width / 2,
        490,
        "Now you need to complete your journey and talk with the king, but first you remember that you should talk with a friend that lives nearby…",
        {
          font: "40px Arial",
          fill: "#ffffff",
          wordWrap: { width: 800, useAdvancedWrap: true },
          align: "center",
        }
      )
      .setOrigin(0.5); // Align to the center of the screen

    // After 3 seconds, fade out the text and show an image
    this.time.delayedCall(6000, () => {
      this.tweens.add({
        targets: conversationText,
        alpha: 0,
        duration: 1000, // 1 second fade out
        onComplete: () => {
          conversationText.destroy(); // Remove the text after fading out

          // Add the image after the text disappears
          this.add
            .image(
              this.cameras.main.width / 2,
              this.cameras.main.height / 2,
              "conversationBg"
            )
            .setOrigin(0.5); // Center the image
          this.time.delayedCall(2000, () => {
            this.add
              .image(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2 + 200,
                "conversationDiogo"
              )
              .setOrigin(0.5); // Center the second image below the first one
          });
        },
      });
    });
  }

  preload() {
    // Preload the image
    this.load.image("conversationBg", "assets/ConversationBG.jpg");
    this.load.image("conversationDiogo", "assets/ConversationDiogo.png");
  }
}
