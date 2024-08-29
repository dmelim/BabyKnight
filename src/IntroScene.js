export default class IntroScene extends Phaser.Scene {
  constructor() {
    super("IntroScene");
  }

  preload() {
    console.log("IntroScene: preload");
  }

  create() {
    console.log("IntroScene: create");

    this.add.text(100, 100, "In a time of great turmoil...", {
      font: "40px Arial",
      fill: "#ffffff",
    });

    this.time.delayedCall(4500, () => {
      this.add.text(100, 200, "The kingdom struggles under a dark miasma...", {
        font: "30px Arial",
        fill: "#ffffff",
      });
    });

    this.time.delayedCall(8000, () => {
      this.add.text(
        100,
        300,
        "With the young generations at risk, hope fades...",
        { font: "30px Arial", fill: "#ffffff" }
      );
    });

    this.time.delayedCall(11500, () => {
      this.add.text(
        100,
        400,
        "But a valiant knight arises, tasked with a noble quest...",
        { font: "30px Arial", fill: "#ffffff" }
      );
    });

    this.time.delayedCall(16500, () => {
      this.add.text(
        100,
        500,
        "To gather the ancient artifacts that can restore life and combat the darkness...",
        { font: "30px Arial", fill: "#ffffff" }
      );
    });

    this.time.delayedCall(22000, () => {
      this.add.text(
        100,
        600,
        "The future of the kingdom rests on his shoulders...",
        { font: "30px Arial", fill: "#ffffff" }
      );
    });

    this.time.delayedCall(
      28000,
      () => {
        this.scene.start("Level1Scene");
      },
      [],
      this
    );
  }
}
