import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private background: any;
  private ship1: any;
  private ship2: any;
  private ship3: any;
  private powerUps: any;
  private config: any;
  private player: any;
  private cursorKeys: any;
  private gameSettings: any;
  private spacebar: any;
  //private beam: any;
  private projectiles: any;
  private enemies: any;
  private scoreLabel: any;
  private score;
  private scoreFormated: any;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    //this.background = this.add.image(0, 0, "background").setOrigin(0,0);
    //this.background = this.add.tileSprite(0, 0, this.config.width, this.config.width, "background");
    this.background = this.add.tileSprite(0, 0, 400, 400, "background");
    this.background.setOrigin(0,0);
    

    //this.ship1 = this.add.image(150, 200, "ship");
    this.ship1 = this.add.sprite(150, 200, "ship");

    //this.ship2 = this.add.image(200, 200, "ship2");
    this.ship2 = this.add.sprite(200, 200, "ship2");

    //this.ship3 = this.add.image(250, 200, "ship3");
    this.ship3 = this.add.sprite(250, 200, "ship3");

    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.input.on('gameobjectdown', this.destroyShip, this);

    this.physics.world.setBoundsCollision();

    this.powerUps = this.physics.add.group();

    var maxObjects = 2;
    for(var i=0; i <= maxObjects; i++){
      var powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, 400, 400);

      if(Math.random() > 0.5){
        powerUp.play("red");
      } else{
        powerUp.play("gray");
      }

      powerUp.setVelocity(50, 50);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }

    this.player = this.physics.add.sprite(192, 336, "player");
    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    this.projectiles = this.add.group();

    this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp){
      projectile.destroy();
    });

    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);

    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);

    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

    var graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1);
    graphics.beginPath();
    graphics.moveTo(0,0);
    graphics.lineTo(400, 0);
    graphics.lineTo(400, 20);
    graphics.lineTo(0,20);
    graphics.lineTo(0,0);
    graphics.closePath();
    graphics.fillPath();

    this.score = 0;
    //this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", 16);
    var scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE", scoreFormated, 16);

    //this.add.text(20, 20, "Playing game", {
    //  font: "25px Arial",
    //  fill: "yellow"
    //});

    //this.exampleObject = new ExampleObject(this, 0, 0);
  }

  zeroPad(number, size){
    var stringNumber = String(number);
    while(stringNumber.length < (size || 2)){
      stringNumber = "0" + stringNumber;
    }
    return stringNumber;
  }

  hurtPlayer(player,enemy){
    this.resetShipPos(enemy);
    player.x = 192;
    player.y = 336;
  }

  hitEnemy(projectile, enemy){
    projectile.destroy();
    this.resetShipPos(enemy);
    this.score += 15;
    //this.scoreLabel.text = "SCORE" + this.score;
    this.scoreFormated = this.zeroPad(this.score, 6);
    this.scoreLabel.text = "SCORE" + this.scoreFormated;
  }

  pickPowerUp(player, powerUp){
    powerUp.disableBody(true, true);
  }

  moveShip(ship,speed){
    ship.y += speed;
    if (ship.y > 400){
      this.resetShipPos(ship);    
    }
  }

  resetShipPos(ship){
    ship.y = 0;
    var randomX = Phaser.Math.Between(0, 400);
    ship.x = randomX;

  }

  destroyShip(pointer, gameObject){
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

  movePlayerManager(){
    this.player.setVelocity(0);

    if(this.cursorKeys.left.isDown){
      this.player.setVelocityX(-200);
    }else if(this.cursorKeys.right.isDown){
      this.player.setVelocityX(200);
    }

    if(this.cursorKeys.up.isDown){
      this.player.setVelocityY(-200);
    }else if(this.cursorKeys.down.isDown){
      this.player.setVelocityY(200);
    }
  }

  shootBeam(){
    //var beam = this.physics.add.sprite(this.player.x, this.player.y, "beam");
    var beam = new Beam(this);
    //this.projectiles.add(beam);
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    this.background.titlePositionY -= 0.5;

    this.movePlayerManager();

    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
      //console.log("Fire!");
      this.shootBeam();
    }

    for(var i=0; i < this.projectiles.getChildren().length; i++){
      var beam = this.projectiles.getChildren()[i];
      beam.update();
    }

  }


}
