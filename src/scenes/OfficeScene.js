// Importa a classe Player do arquivo Player.mjs localizado na pasta classes
import Player from "../classes/Player.mjs";

// Define a classe Escritorio que estende Phaser.Scene
export default class Escritorio extends Phaser.Scene {
  constructor() {
    super({ key: 'Escritorio' });  // Chama o construtor da classe pai com uma chave específica
  }
  

  preload() {
    //Carrega o mapa do escritório
    this.load.image("interiorE", "../../assets/EscritorioMeta/pasta_escritorio/escritorio (1).png");
    this.load.tilemapTiledJSON('mapa_escritorio', '../../assets/EscritorioMeta/pasta_escritorio/escritorioBom3.json');
    this.load.spritesheet("player", "../../assets/jose_sprite-sheet.png", {
      frameWidth: 32,
      frameHeight: 64, 
    });

    // this.load.audio('musica', '../../assets/MusicasESons/escritorio.mp3');
  }

  create() {
    this.player = new Player(this, 450, 100, "player");
    this.criarMapa();
    this.configurarCamera();
    // this.tocarMusica();
  }

  criarMapa() {
    //Cria o mapa do escritório na tela 
    this.map = this.make.tilemap({ key: "mapa_escritorio" });

    //Define as camadas do mapa
    this.tilesInterior = this.map.addTilesetImage( "escritorio (1)", "interiorE", );

    this.chao = this.map.createLayer("chao", this.tilesInterior, 0, 0);
    this.colisao = this.map.createLayer("colisao", this.tilesInterior, 0, 0);
    this.portalSE = this.map.createLayer("portalSE", this.tilesInterior, 0, 0);
    this.PcFase1 = this.map.createLayer("PcFase1", this.tilesInterior, 0, 0);

    // Adiciona a colisão em algumas camadas do mapa
    this.colisao.setCollisionByProperty({ collider: true });
    this.portalSE.setCollisionByProperty({ collider: true });
    this.PcFase1.setCollisionByProperty({ collider: true });
    
    this.physics.add.collider(this.player, this.colisao);
    this.physics.add.collider(
    this.player, this.portalSE,
      () => this.scene.start( "Cidade", { posX: 633, posY: 1957 } ),
      null, this
    );

    //Defini a condição para que inicie a fase 1 do jogo
    this.physics.add.collider(this.player, this.PcFase1, () => {
      const faseAtual = this.registry.get("Fase");
      console.log(faseAtual);
      if(faseAtual === 1){
        this.scene.start("Fase1");
      } else if (faseAtual === 4) {
        this.scene.start("pergunta2");
      } else if(faseAtual === 8){
        this.scene.start("Fase8");
      }
    }, null, this);
  }

  // Método para tocar a música de fundo
  // tocarMusica() {
  //   this.backgroundMusic = this.sound.add( 'musica' );
  //   this.backgroundMusic.play( { loop: true } );
  // }

  // Método para configurar a câmera
  configurarCamera() {
    this.camera = this.cameras.main;
    this.camera.startFollow( this.player );
    this.camera.setBounds( 0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.camera.setZoom( 1.7,1.7 );
  }

  update() {
    // Atualiza o movimento do jogador
    this.player.move();
  }
}