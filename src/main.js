import BootScene from "./BootScene.js";
import IntroScene from "./IntroScene.js";
import Level1Scene from "./Level1Scene.js";
import Level2Scene from "./Level2Scene.js";
import Level3Scene from "./Level3Scene.js";
import EndScene from "./EndScene.js";
import FinalConversation from "./FinalConversation.js";

var bootScene = new BootScene();
var introScene = new IntroScene();
var level1Scene = new Level1Scene();
var level2Scene = new Level2Scene();
var level3Scene = new Level3Scene();
var endScene = new EndScene();
var finalConv = new FinalConversation();

var config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  audio: {
    disableWebAudio: false,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

var game = new Phaser.Game(config);

game.scene.add("BootScene", bootScene);
game.scene.add("IntroScene", introScene);
game.scene.add("Level1Scene", level1Scene);
game.scene.add("Level2Scene", level2Scene);
game.scene.add("Level3Scene", level3Scene);
game.scene.add("EndScene", endScene);
game.scene.add("FinalConversation", finalConv);

game.scene.start("Level1Scene");
