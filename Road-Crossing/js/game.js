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

// Init
gameScene.init = function() {

    this.gameW = this.sys.game.config.width;
    this.gameH = this.sys.game.config.height;

    this.playerSpeed = 2;
}

// Preload
gameScene.preload = function() {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/dragon.png');
};
// Create
gameScene.create = function() {
    
    this.bg = this.add.sprite(0, 0, 'background').setPosition(this.gameW/2, this.gameH/2);

    this.player = this.add.sprite(70, this.gameH/2, 'player').setScale(0.5);

    this.enemy1 = this.add.sprite(250, 180, 'enemy');
};

// Update
gameScene.update = function() {

    if(this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed;
    }
    
}