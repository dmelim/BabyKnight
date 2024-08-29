export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    this.load.image("backgroundImage", "assets/OpeningScreenBG.png");
    this.load.image("textImage", "assets/OpeningScreen.png");
    this.load.image("proceedButton", "assets/OpeningScreenButton.png");
    this.load.audio("backgroundMusic", "assets/op_music.mp3");
    this.load.audio("voice", "assets/voice.mp3");
  }

  create() {
    const background = this.add.image(960, 540, "backgroundImage");
    background.setAlpha(0);

    this.tweens.add({
      targets: background,
      alpha: 1,
      duration: 2000,
      ease: "Power2",
      onComplete: () => {
        const text = this.add.image(960, 540, "textImage");
        text.setAlpha(0);

        this.tweens.add({
          targets: text,
          alpha: 1,
          duration: 2000,
          ease: "Power2",
          onComplete: () => {
            const proceedButton = this.add.image(960, 800, "proceedButton");
            proceedButton.setAlpha(0);
            proceedButton.setInteractive();

            this.tweens.add({
              targets: proceedButton,
              alpha: 1,
              duration: 1000,
              ease: "Power2",
              onComplete: () => {
                this.tweens.add({
                  targets: proceedButton,
                  scale: { from: 1, to: 1.1 },
                  duration: 500,
                  yoyo: true,
                  repeat: -1,
                  ease: "Sine.easeInOut",
                });
              },
            });

            proceedButton.on("pointerdown", () => {
              this.sound.play("backgroundMusic", { loop: true });
              this.sound.play("voice", { loop: false });
              this.scene.start("IntroScene");
            });
          },
        });
      },
    });
  }
}
