let gameScene = new Phaser.Scene('Game');

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene,
    title: 'Spanish Learning Game',
    pixelArt: false
};

let game = new Phaser.Game(config);

gameScene.init = function() {

    this.gameW = this.sys.game.config.width;
    this.gameH = this.sys.game.config.height;

}

gameScene.preload = function() {
    
    this.load.image('background', 'assets/images/background-city.png');
    this.load.image('building', 'assets/images/building.png');
    this.load.image('car', 'assets/images/car.png');
    this.load.image('house', 'assets/images/house.png');
    this.load.image('tree', 'assets/images/tree.png');

    this.load.audio('tree-audio', 'assets/audio/arbol.mp3');
    this.load.audio('car-audio', 'assets/audio/auto.mp3');
    this.load.audio('house-audio', 'assets/audio/casa.mp3');
    this.load.audio('building-audio', 'assets/audio/edificio.mp3');
    this.load.audio('correct', 'assets/audio/correct.mp3');
    this.load.audio('wrong', 'assets/audio/wrong.mp3');
}

gameScene.create = function() {

    this.add.sprite(0, 0, 'background').setPosition(this.gameW/2, this.gameH/2);

    let soundCorrect = this.sound.add('correct');
    soundCorrect.play();
}