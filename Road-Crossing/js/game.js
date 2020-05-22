// Create a new scene
let gameScene = new Phaser.Scene('Game');

// Game config
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};

// Create a new game, pass the config
let game = new Phaser.Game(config);