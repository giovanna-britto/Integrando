import Player from "../classes/Player.mjs";

// Classe Buffet1 representando uma cena no jogo
export default class Buffet1 extends Phaser.Scene {
  constructor() {
    super({ key: "Buffet1" }); // Inicializa a cena com a chave "Buffet1"
  }

  preload() {
    //Carrega as imagens que vamos utilizar
    this.load.image("interior", "../../assets/Buffet1/buffet1.png");
    this.load.tilemapTiledJSON( "mapa_buffet1", "../../assets/Buffet1/buffet1Bom1.json" );
    this.load.spritesheet( "player", '../../assets/jose_sprite-sheet.png',{ frameWidth: 34, frameHeight: 64, } );
  }

  create() {
    const faseAtual = this.registry.get("Fase");
    if (faseAtual === 3) {
      const buffetsVisitados = this.registry.get("BuffetsVisitados");
      buffetsVisitados.buffet1 = true;
      this.registry.set("BuffetsVisitados", buffetsVisitados);
    }
    console.log("Fase", this.registry.get("Fase"));
    console.log("buffetsVisitados: ", this.registry.get("BuffetsVisitados"));

    this.player = new Player(this, 450, 100, "player");
    this.criarMapa();

    // Configura a câmera
    this.configurarCamera();
  }

  criarMapa() {
    this.map = this.make.tilemap({ key: "mapa_buffet1"});

    this.tilesInterior = this.map.addTilesetImage("buffet1", "interior");
    
    this.chao = this.map.createLayer("chao", this.tilesInterior, 0, 0);
    this.colisao = this.map.createLayer("colisao", this.tilesInterior, 0, 0);
    this.portalS1 = this.map.createLayer("portalS1", this.tilesInterior, 0, 0);

    this.colisao.setCollisionByProperty({ collider: true });
    this.portalS1.setCollisionByProperty({ collider: true });

    this.physics.add.collider(this.player, this.colisao);
    this.physics.add.collider(
      this.player, this.portalS1,
      () => this.scene.start( "Cidade", { posX: 450, posY: 770 } ),
      null, this
    );
  }


   // Método para configurar a câmera para seguir o jogador e limitar seus movimentos ao tamanho do mapa
  configurarCamera() {
    this.camera = this.cameras.main;
    this.camera.startFollow( this.player );
    this.camera.setBounds( 0, 0, this.map.widthInPixels, this.map.heightInPixels );
    this.camera.setZoom( 1.7, 1.7 );
  }

  update() {
    this.player.move();
  }
}