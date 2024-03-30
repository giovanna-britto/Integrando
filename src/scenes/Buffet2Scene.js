import Player from "../classes/Player.mjs";

// Classe representando a cena Buffet2
export default class Buffet2 extends Phaser.Scene {
  constructor() {
    super({ key: "Buffet2" });
  }
  
  // Pré-carrega os recursos necessários para a cena
  preload() {
    this.load.image( "interior2", "../../assets/Buffet2/buffet2.png" );
    this.load.tilemapTiledJSON( "mapa_buffet2", "../../assets/Buffet2/buffet2Bom2.json" );
    this.load.spritesheet( "player", '../../assets/jose_sprite-sheet.png', { frameWidth: 34, frameHeight: 64, } );
  }

  create(){
    const faseAtual = this.registry.get("Fase");
    if (faseAtual === 3) {
      const buffetsVisitados = this.registry.get("BuffetsVisitados");
      buffetsVisitados.buffet2 = true;
      this.registry.set("BuffetsVisitados", buffetsVisitados);
    }
    console.log("Fase", this.registry.get("Fase"));
    console.log("buffetsVisitados: ", this.registry.get("BuffetsVisitados"));

    // Instancia o jogador na posição especificada
    this.player = new Player(this, 450, 100, "player");

    // Cria o mapa do buffet2
    this.criarMapa();

    // Configura a câmera
    this.configurarCamera();
  }

  criarMapa() {
    this.map = this.make.tilemap({ key: "mapa_buffet2"});

    this.tilesInterior = this.map.addTilesetImage("buffet2", "interior2");
    
    this.chao = this.map.createLayer("chao", this.tilesInterior, 0, 0);
    this.colisao = this.map.createLayer("colisao", this.tilesInterior, 0, 0);
    this.portalS2 = this.map.createLayer("portalS2", this.tilesInterior, 0, 0);
  
    this.colisao.setCollisionByProperty({ collider: true });
    this.portalS2.setCollisionByProperty({ collider: true });

    this.physics.add.collider(this.player, this.colisao);
    this.physics.add.collider(
      this.player, this.portalS2,
      () => this.scene.start( "Cidade", { posX:620, posY: 1299 } ),
      null, this
    );
  }


  // Configura a câmera para seguir o jogador e limita seus movimentos ao tamanho do mapa
  configurarCamera() {
    this.camera = this.cameras.main;
    this.camera.startFollow( this.player );
    this.camera.setBounds( 0, 0, this.map.widthInPixels, this.map.heightInPixels );
    this.camera.setZoom( 1.7, 1.7 );
  }

  update() {
    this.player.move();

    if(this.registry.get("Fase").fase === 7){
      this.scene.start("Fase7");
    }
  }
}