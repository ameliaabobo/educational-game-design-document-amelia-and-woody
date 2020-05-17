import ExampleObject from '../objects/exampleObject';

export default class MainScene extends Phaser.Scene {
  private exampleObject: ExampleObject;
  private background: any;
  private ship1: any;
  private ship2: any;
  private ship3: any;

  constructor() {
    super({ key: 'MainScene' });
    //super("playGame");
  }

  create() {
    this.background = this.add.image(500, 500, "background");
    //this.background.setOrigin(0,0);

    this.ship1 = this.add.image(150, 200, "ship");
    this.ship2 = this.add.image(200, 200, "ship2");
    this.ship3 = this.add.image(250, 200, "ship3");


    this.add.text(20, 20, "Playing game", {
      font: "25px Arial", fill: "yellow"
    });

    //this.exampleObject = new ExampleObject(this, 0, 0);
  }

  update() {
  }
}
