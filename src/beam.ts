class Beam extends Phaser.GameObjects.Sprite{
    constructor(scene){
        var x = scene.player.x;
        var y = scene.player.y;
        //var velocityY = -250

        super(scene, x, y, "beam");
        scene.add.existing(this);

        this.play("beam_anim");
        scene.physics.world.enableBody(this);
        //this.body.setVelocityY(-250);
        //this.body.velocity.y = - 250;

        scene.projectiles.add(this);
    }

    update(){
        if(this.y < 32){
            this.destroy();
        }
    }
}