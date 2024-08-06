export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    console.log('PreloadScene: preload');
    this.load.image('knight', 'src/assets/knight.png');
  }

  create() {
    console.log('PreloadScene: create');
    this.scene.start('MainMenuScene');
  }
}
