export default class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndScene' });
  }

  create() {
    console.log('EndScene: create');
    this.add.text(100, 100, 'Congratulations!', { font: '40px Arial', fill: '#ffffff' });
    this.add.text(100, 200, 'You have completed the game!', { font: '20px Arial', fill: '#ffffff' });

    // Option to restart the game or go back to the main menu
    this.add.text(100, 300, 'Click to Restart', { font: '20px Arial', fill: '#ffffff' });

    this.input.on('pointerdown', () => {
      this.scene.start('MainMenuScene');
    });
  }
}
