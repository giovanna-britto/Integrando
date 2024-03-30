import Player from "../classes/Player.mjs";

// Classe representando a cena Buffet3
export default class Buffet3 extends Phaser.Scene {
  constructor() {
    super({ key: "Buffet3" });
  }
  
  preload() {
    // Pré-carrega os recursos necessários para a cena
    this.load.image("interior3", "../../assets/Buffet3/buffet3.png");
    this.load.tilemapTiledJSON( "mapa_buffet3", "../../assets/Buffet3/buffet3Bom5.json" );
    this.load.spritesheet( "player", '../../assets/jose_sprite-sheet.png',{ frameWidth: 34, frameHeight: 64, } );
  }

  create() {
    const faseAtual = this.registry.get("Fase");
    if (faseAtual === 3) {
      const buffetsVisitados = this.registry.get("BuffetsVisitados");
      buffetsVisitados.buffet3 = true;
      this.registry.set("BuffetsVisitados", buffetsVisitados);
    }
    console.log("Fase", this.registry.get("Fase"));
    console.log("buffetsVisitados: ", this.registry.get("BuffetsVisitados"));

    this.player = new Player(this, 450, 100, "player");
    this.criarMapa();

    //Configura câmera
    this.configurarCamera();
  }

  // Cria o mapa utilizando os dados carregados
  criarMapa() {
    this.map = this.make.tilemap({ key: "mapa_buffet3"});
    this.tilesInterior = this.map.addTilesetImage("buffet3", "interior3");

    this.chao = this.map.createLayer("chao", this.tilesInterior, 0, 0);
    this.colisao = this.map.createLayer("colisao", this.tilesInterior, 0, 0);
    this.portalS3 = this.map.createLayer("portalS3", this.tilesInterior, 0,0);

    // Define colisões para as camadas necessárias
    this.colisao.setCollisionByProperty({ collider: true });
    this.portalS3.setCollisionByProperty({ collider: true });
        
    this.physics.add.collider(this.player, this.colisao);
    this.physics.add.collider(

      // Inicia a cena da cidade com uma posição específica
      this.player, this.portalS3,
      () => this.scene.start( "Cidade", { posX: 3470, posY: 1290 } ),
      null, this
    );
  }

  configurarCamera() {
    // Configura a câmera para seguir o jogador e limita seus movimentos ao tamanho do mapa
    this.camera = this.cameras.main;
    this.camera.startFollow(this.player);
    this.camera.setBounds( 0, 0, this.map.widthInPixels, this.map.heightInPixels );
    this.camera.setZoom( 1.7, 1.7 );
  }

  update() {
    this.player.move();
  }
}