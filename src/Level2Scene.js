export default class Level2Scene extends Phaser.Scene {
  constructor() {
    super({ key: 'Level2Scene' });
  }

  preload() {
    console.log('Level2Scene: preload');
    this.load.image('knight', 'assets/images/knight.png'); // Add more assets as needed
  }

  create() {
    console.log('Level2Scene: create');
    this.add.image(400, 300, 'knight');
    this.add.text(100, 100, 'Level 2: The Journey Continues', { font: '40px Arial', fill: '#ffffff' });

    // Add game elements, enemies, obstacles, etc.

    // Transition to Level3Scene upon completion
    this.input.on('pointerdown', () => {
      this.scene.start('Level3Scene');
    });
  }
}
