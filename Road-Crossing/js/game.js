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

//Load assets
gameScene.preload = function() {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
};
gameScene.create = function() {
    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;
    this.add.sprite(0, 0, 'background').setPosition(gameW/2, gameH/2);
};