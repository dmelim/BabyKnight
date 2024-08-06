import BootScene from './BootScene.js';
import PreloadScene from './PreloadScene.js';
import MainMenuScene from './MainMenuScene.js';
import IntroScene from './IntroScene.js';
import Level1Scene from './Level1Scene.js';
import Level2Scene from './Level2Scene.js';
import Level3Scene from './Level3Scene.js';
import EndScene from './EndScene.js';

// Load our scenes
var bootScene = new BootScene();
var preloadScene = new PreloadScene();
var mainMenuScene = new MainMenuScene();
var introScene = new IntroScene();
var level1Scene = new Level1Scene();
var level2Scene = new Level2Scene();
var level3Scene = new Level3Scene();
var endScene = new EndScene();

// Game configuration
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
};

var game = new Phaser.Game(config);

// Add scenes
game.scene.add('BootScene', bootScene);
game.scene.add('PreloadScene', preloadScene);
game.scene.add('MainMenuScene', mainMenuScene);
game.scene.add('IntroScene', introScene);
game.scene.add('Level1Scene', level1Scene);
game.scene.add('Level2Scene', level2Scene);
game.scene.add('Level3Scene', level3Scene);
game.scene.add('EndScene', endScene);

// Start the BootScene
game.scene.start('BootScene');
