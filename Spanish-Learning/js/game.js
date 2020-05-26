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

    this.items = this.add.group([
        { key: 'building', setXY: { x: 100, y: 240 } },
        { key: 'house', setXY: { x: 240, y: 280 }, setScale: { x: 0.8, y: 0.8 } },
        { key: 'car', setXY: { x: 400, y: 300 }, setScale: { x: 0.8, y: 0.8 } },
        { key: 'tree', setXY: { x: 550, y: 250 } }
    ]);

    this.items.setDepth(1);

    Phaser.Actions.Call(this.items.getChildren(), function(item) {
        item.setInteractive();

        item.resizeTween = gameScene.tweens.add({
            targets: item,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 300,
            paused: true,
            yoyo: true,
            ease: 'Quad.easeInOut'
        });

        item.alphaTween = gameScene.tweens.add({
            targets: item,
            alpha: 0.7,
            duration: 200,
            paused: true
        });

        item.on('pointerdown', function(pointer) {
            item.resizeTween.play();
        }, this);

        item.on('pointerover', function(pointer) {
            item.alphaTween.play();
        }, this);

        item.on('pointerout', function(pointer) {
            item.alphaTween.stop();
            item.alpha = 1;
        }, this);

    })
}