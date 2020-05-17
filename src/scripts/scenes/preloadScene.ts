export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
    //super("bootGame");
  }

  preload() {
    this.load.image("background", "assests/image/background.png");
    this.load.image("ship", "assets/images/ship.png");
    this.load.image("ship2", "assets/images/ship2.png");
    this.load.image("ship3", "assets/images/ship3.png");
  }

  create() {
    this.add.text(20, 20, "Loading game...");
    this.scene.start('MainScene');
  }
}
