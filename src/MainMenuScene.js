export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super('MainMenuScene');
  }

  create() {
    console.log('MainMenuScene: create');
    this.add.text(100, 100, 'Knight\'s Baby Quest', { font: '40px Arial', fill: '#ffffff' });

    this.input.on('pointerdown', () => {
      this.scene.start('IntroScene');
    });
  }
}
