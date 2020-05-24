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

    this.playerSpeed = 3.5;
    this.enemyMinSpeed = 2;
    this.enemyMaxSpeed = 4.5;

    this.enemyMinY = 80;
    this.enemyMaxY = 280;

    this.isFinishing = false;
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

    this.player = this.add.sprite(40, this.gameH/2, 'player').setScale(0.5);

    this.enemies = this.add.group({
        key: 'enemy',
        repeat: 4,
        setXY: {
            x: 120,
            y: 100,
            stepX: 90,
            stepY: 20
        }
    });

    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4);

    Phaser.Actions.Call(this.enemies.getChildren(), function(eachEnemy) {
        eachEnemy.flipX = true;

        let dir = Math.random() < 0.5 ? 1 : -1;
        let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
        eachEnemy.speed = dir * speed;
    }, this);


    this.goal = this.add.sprite(this.gameW - 80, this.gameH/2, 'goal').setScale(0.7);
};

// Update
gameScene.update = function() {

    if(this.isFinishing) return;
    // Player movement
    if(this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed;
    }

    // Player and goal intersection
    let playerRect = this.player.getBounds();
    let goalRect = this.goal.getBounds();

    if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
        return this.gameOver();
    }

    // Enemy movement
    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;

    for(let i = 0; i < numEnemies; i++) {
        enemies[i].y += enemies[i].speed;

        let enemyUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
        let enemyDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;

        if(enemyUp || enemyDown) {
            enemies[i].speed *= -1;
        }

        let enemyRect = enemies[i].getBounds();

        if(Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {

            return this.gameOver();
        }
    }
}

gameScene.gameOver = function() {

    this.isFinishing = true;

    this.cameras.main.shake(500);
    this.cameras.main.on('camerashakecomplete', function(camera, effect) {
        this.cameras.main.fade(500);
    }, this);

    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
        this.scene.restart();
    }, this);
    
}