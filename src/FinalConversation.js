export default class FinalConversation extends Phaser.Scene {
  constructor() {
    super("FinalConversation");
    this.textIndex = 0; // To track the conversation progress
  }

  preload() {
    // Preload the images
    this.load.image("conversationBg", "src/assets/ConversationBG.jpg");
    this.load.image("conversationDiogo", "src/assets/ConversationDiogo.png");
    this.load.image("conversationKnight", "src/assets/ConversationKnight.png");
    this.load.image("blackScreen", "src/assets/blackbg.png");

    this.load.image("pacifier", "src/assets/pacifier.png");
    this.load.image("babyBottle", "src/assets/babyBottle.png");
    this.load.image("bearTree", "src/assets/bearTree.png");
  }

  create() {
    // Add the background image
    this.currentBG = this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "conversationBg"
      )
      .setOrigin(0.5);

    // Define conversation steps
    this.conversation = [
      {
        text: "Hello, friend! Thank you so much for coming by! What have you been up to lately?",
        image: "conversationDiogo",
      },
      {
        text: "Hello, old friend. The king tasked me with completing a quest to gather magical items to save the kingdom!",
        image: "conversationKnight",
      },
      {
        text: "Oh, wow! That sounds incredible! Can I see what you’ve collected?",
        image: "conversationDiogo",
      },
      {
        text: "You show your items to your friend.",
        image: "conversationKnight",
      },
      {
        text: "Let’s see… Analyzing…",
        image: "conversationDiogo",
      },
      {
        text: "Ohhh, I get it now. Well, it looks like these items were meant for me! I actually asked the king for them!",
        image: "conversationDiogo",
      },
      {
        text: "Wait… why would you need these items? They seem like magical junk.",
        image: "conversationKnight",
      },
      {
        text: "You can’t tell what they are? This here is a pacifier.",
        image: "conversationDiogo",
        referencedImage: "pacifier",
      },
      {
        text: "This one’s a baby bottle.",
        image: "conversationDiogo",
        referencedImage: "babyBottle",
      },
      {
        text: "And this is a plushie—a tree bear, which is quite famous around these parts!",
        image: "conversationDiogo",
        referencedImage: "bearTree",
      },
      {
        text: "But why would you need these items?",
        image: "conversationKnight",
      },
      {
        text: "Well, that’s the big news I wanted to share with you!",
        image: "conversationDiogo",
      },
      {
        text: "My girl and I are having a baby! And no, we’re not just talking about this game.",
        image: "conversationDiogo",
      },
      {
        text: "This is real life, my friend. It’s the reason I made this game—to tell you that I, the king of pepegas, will be the first in our group to have a baby!",
        image: "conversationDiogo",
      },
      {
        text: "And I have no doubt that with friends like you, my child will have the best uncles in the world. I expect your congratulations in real life too—thank you!",
        image: "conversationDiogo",
      },
    ];

    // Start the conversation automatically
    this.showConversationStep();

    // Set up a click event to progress the conversation
    this.input.on("pointerdown", () => {
      this.showConversationStep();
    });
  }

  showConversationStep() {
    // Destroy the current text and image if they exist
    if (this.currentText) {
      this.currentText.destroy();
    }

    if (this.currentImage) {
      this.currentImage.destroy();
    }
    if (this.referencedImage) {
      this.referencedImage.destroy();
      this.referencedImage = null;
    }

    // Show the new text and image
    if (this.textIndex < this.conversation.length) {
      const step = this.conversation[this.textIndex];

      // Add new image (character)
      this.currentImage = this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2 + 100,
          step.image
        )
        .setOrigin(0.5);

      // Add new text
      this.currentText = this.add
        .text(
          this.cameras.main.width / 2,
          this.cameras.main.height - 220,
          step.text,
          {
            font: "40px Arial",
            fill: "#ffffff",
            wordWrap: { width: 800, useAdvancedWrap: true },
            align: "left",
          }
        )
        .setOrigin(0.5);

      // If there's a referenced image, display it
      if (step.referencedImage) {
        this.referencedImage = this.add
          .image(
            this.cameras.main.width / 2 + 400,
            this.cameras.main.height / 2 + 300, // Position it below the character image
            step.referencedImage
          )
          .setOrigin(0.3)
          .setScale(0.1);
      }

      // Move to the next step in the conversation
      this.textIndex++;
    } else {
      this.input.off("pointerdown"); // Disable the click listener
      // Clear the screen: destroy current background, text, and image
      if (this.currentBG) {
        this.currentBG.destroy();
        this.currentBG = null;
      }

      // Add the black screen image to cover everything
      this.add
        .image(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2,
          "blackScreen"
        )
        .setOrigin(0.5);

      // Wait a moment, then display the final messages
      this.time.delayedCall(500, () => {
        // Define the final message lines
        const finalMessage = [
          "Thank you for playing Baby Knight.",
          "Now, please start working on some friends for my kid.",
          "Appreciated, future dad:",
          "Diogo Melim",
        ];

        // Display each line one at a time
        finalMessage.forEach((line, index) => {
          this.time.delayedCall(index * 2000, () => {
            const messageText = this.add
              .text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2 + index * 50, // Position each line slightly below the previous one
                line,
                {
                  font: "40px Arial",
                  fill: "#ffffff",
                  align: "center",
                }
              )
              .setOrigin(0.5) // Center the text
              .setAlpha(0); // Start with the text hidden

            // Fade in the text
            this.tweens.add({
              targets: messageText,
              alpha: 1,
              duration: 1000, // 1 second fade-in
            });
          });
        });
      });
    }
  }
}
