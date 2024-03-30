import Player from "../classes/Player.mjs";

// Classe representando a cena Buffet4
export default class Buffet4 extends Phaser.Scene {
  constructor() {
    super({ key: "Buffet4" });
  }
  
  preload() {
    // Pré-carrega os recursos necessários para a cena
    this.load.image("interior", "../../assets/Buffet4/buffet4.png");
    this.load.tilemapTiledJSON( "mapa_buffet4","../../assets/Buffet4/buffet4Bom4.json" );
    this.load.spritesheet("player", '../../assets/jose_sprite-sheet.png',{ frameWidth: 34,frameHeight: 64, });
  }

  create(){
    const faseAtual = this.registry.get("Fase");
    if (faseAtual === 3) {
      const buffetsVisitados = this.registry.get("BuffetsVisitados");
      buffetsVisitados.buffet4 = true;
      this.registry.set("BuffetsVisitados", buffetsVisitados);
    }
    console.log("Fase", this.registry.get("Fase"));
    console.log("buffetsVisitados: ", this.registry.get("BuffetsVisitados"));

    this.player = new Player(this, 450, 130, "player");
    this.criarMapa();
    
    //Configura câmera
    this.configurarCamera();
  }

  criarMapa() {
    // Cria o mapa utilizando os dados carregados
    this.map = this.make.tilemap({ key: "mapa_buffet4"});

    this.tilesInterior = this.map.addTilesetImage("buffet4", "interior");
  
    this.chao = this.map.createLayer("chao", this.tilesInterior, 0, 0);
    this.colisao = this.map.createLayer("colisao", this.tilesInterior, 0, 0);
    this.portalS4 = this.map.createLayer("portalS4", this.tilesInterior, 0, 0);

    this.colisao.setCollisionByProperty({ collider: true });
    this.portalS4.setCollisionByProperty({ collider: true });
    
    this.physics.add.collider(this.player, this.colisao);
    this.physics.add.collider(
      this.player,
      this.portalS4,
      () => {
        this.scene.start("Cidade", { posX: 2325, posY: 1300 });
      },
      null,
      this
    );
  }

  
  configurarCamera() {
    // Configura a câmera para seguir o jogador e limita seus movimentos ao tamanho do mapa
    this.camera = this.cameras.main;
    this.camera.startFollow( this.player );
    this.camera.setBounds( 0, 0, this.map.widthInPixels, this.map.heightInPixels );
    this.camera.setZoom( 1.7,1.7 );
  }

  update() {
    this.player.move();
  }
}