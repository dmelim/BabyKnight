export default class IntroScene extends Phaser.Scene {
  constructor() {
    super('IntroScene');
  }

  preload() {
    console.log('IntroScene: preload');
  }

  create() {
    console.log('IntroScene: create');
    this.add.text(100, 100, 'The kingdom is in distress...', { font: '40px Arial', fill: '#ffffff' });
    this.add.text(100, 200, 'The knight must collect the ancient artifacts...', { font: '20px Arial', fill: '#ffffff' });

    this.time.delayedCall(1000, () => {
      this.scene.start('Level1Scene');
    }, [], this);
  }
}
