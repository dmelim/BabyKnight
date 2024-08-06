export default class Level3Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'Level3Scene' });
  }

  preload() {
    console.log('Level3Scene: preload');
    this.load.image('knight', 'assets/images/knight.png'); // Add more assets as needed
  }

  create() {
    console.log('Level3Scene: create');
    this.add.image(400, 300, 'knight');
    this.add.text(100, 100, 'Level 3: The Final Challenge', { font: '40px Arial', fill: '#ffffff' });

    // Add game elements, enemies, obstacles, etc.

    // Transition to EndScene upon completion
    this.input.on('pointerdown', () => {
      this.scene.start('EndScene');
    });
  }
}
