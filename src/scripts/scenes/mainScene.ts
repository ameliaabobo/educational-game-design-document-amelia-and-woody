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
  private beam: any;
  private projectiles: any;

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

    //this.add.text(20, 20, "Playing game", {
    //  font: "25px Arial", fill: "yellow"
    //});

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    this.input.on('gameobjectdown', this.destroyShip, this);

    this.physics.world.setBoundsCollision();

    this.powerUps = this.physics.add.group();

    var maxObjects = 4;
    for(var i=0; i <= maxObjects; i++){
      var powerUp = this.physics.add.sprite(16, 16, "power-up");
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, 400, 400);

      if(Math.random() > 0.5){
        powerUp.play("red");
      } else{
        powerUp.play("gray");
      }

      powerUp.setVelocity(100, 100);
      powerUp.setCollideWorldBounds(true);
      powerUp.setBounce(1);
    }

    this.player = this.physics.add.sprite(192, 336, "player");
    this.player.play("thrust");
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.player.setCollideWorldBounds(true);

    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.projectiles = this.add.group();


    //this.add.text(20, 20, "Playing game", {
    //  font: "25px Arial",
    //  fill: "yellow"
    //});

    //this.exampleObject = new ExampleObject(this, 0, 0);
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
      var beam = this.projectiles.getChildren();
      beam.update();
    }

  }


}
