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
    this.enemyMinSpeed = 2;
    this.enemyMaxSpeed = 4.5;

    this.enemyMinY = 80;
    this.enemyMaxY = 280;
}

// Preload
gameScene.preload = function() {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/dragon.png');
    this.load.image('goal', 'assets/treasure.png');
};
// Create
gameScene.create = function() {
    
    this.bg = this.add.sprite(0, 0, 'background').setPosition(this.gameW/2, this.gameH/2);

    this.player = this.add.sprite(70, this.gameH/2, 'player').setScale(0.5);

    this.enemy = this.add.sprite(150, this.gameH/2, 'enemy').setScale(0.6);
    this.enemy.flipX = true;

    let dir = Math.random() < 0.5 ? 1 : -1;
    let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
    this.enemy.speed = dir * speed;

    this.goal = this.add.sprite(this.gameW - 80, this.gameH/2, 'goal').setScale(0.7);
};

// Update
gameScene.update = function() {
    // Player movement
    if(this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed;
    }

    // Player and goal intersection
    let playerRect = this.player.getBounds();
    let goalRect = this.goal.getBounds();

    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
        this.scene.restart();

        return;
    }

    // Enemy movement
    this.enemy.y += this.enemy.speed;

    let enemyUp = this.enemy.speed < 0 && this.enemy.y <= this.enemyMinY;
    let enemyDown = this.enemy.speed > 0 && this.enemy.y >= this.enemyMaxY;

    if(enemyUp || enemyDown) {
        this.enemy.speed *= -1;
    }

}