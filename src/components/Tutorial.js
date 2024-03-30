import Player from "../classes/Player.mjs";

export default class Tutorial extends Phaser.Scene {
  constructor() {
    super({ key: "Tutorial" });
    this.sprites = [];
  }
  
  preload() {
    this.load.image('arrowLeft', '../../assets/keyboardArrows/leftarrow.png');
    this.load.image('arrowRight', '../../assets/keyboardArrows/rightarrow.png');
    this.load.image('arrowUp', '../../assets/keyboardArrows/uparrow.png');
    this.load.image('arrowDown', '../../assets/keyboardArrows/downarrow.png');
    this.load.image('space', '../../assets/keyboardArrows/spacebar.png');
    this.load.image('mKey', '../../assets/keyboardArrows/mkey.png');
    this.load.image('arrow', '../../assets/indicador/seta.png');
    this.load.image('bg', '../../assets/tutorialBG.png');
    this.load.spritesheet('jose', '../../assets/Personagens/jose.png', { frameWidth: 32, frameHeight: 64 });
  }
  
  create() {
    this.add.image(innerWidth/2, innerHeight/2, 'bg').setScale(1.3);
    this.player = new Player(this, 100, 100,);
    
    this.cameras.main.setBackgroundColor('#0175D8');
    
    var distanciaSeta = 20 * 2;
    
    this.leftArrow = this.add.image(innerWidth/1.5, innerHeight/1.3, 'arrowLeft').setScale(2);
    this.rightArrow = this.add.image(innerWidth/1.5 + distanciaSeta*2, innerHeight/1.3, 'arrowRight').setScale(2);
    this.upArrow = this.add.image(innerWidth/1.5 + distanciaSeta, innerHeight/1.3 - distanciaSeta, 'arrowUp').setScale(2);
    this.downArrow = this.add.image(innerWidth/1.5 + distanciaSeta, innerHeight/1.3, 'arrowDown').setScale(2);
    this.space = this.add.image(innerWidth/3, innerHeight/1.3, 'space').setScale(2);
    this.mKey = this.add.image(innerWidth/1.14, innerHeight/2.5, 'mKey').setScale(3);
    
    this.add.text(750, 500, "Teclas de movimento", { fontSize: '24px' });
    this.add.text(300, 500, "Tecla de interação", { fontSize: '24px' });
    this.add.text(980, 280, "       Abrir Minimapa\n(funciona apenas na cidade)");
    
    this.jose = this.physics.add.sprite(innerWidth / 2, innerHeight / 6 + 100, 'jose').setScale(5).setVisible(true);
    
    this.anims.create({
      key: `walk`,
      frames: this.anims.generateFrameNumbers('jose', { start: 0, end: 1 }),
      frameRate: 3,
      repeat: -1
    });
    this.jose.play(`walk`, true);
  }
}