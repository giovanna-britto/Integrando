import Player from "../classes/Player.mjs";

// Classe representando a cena do Tribunal
export default class Tribunal extends Phaser.Scene {
  constructor() {
    super({ key: "Tribunal" });
  }

  preload() {
    this.load.image("interiorC", "../../assets/Tribunal/tribunal.png");
    this.load.tilemapTiledJSON(
      "mapa_tribunal",
      "../../assets/Tribunal/tribunalBom5.json"
    );
    this.load.spritesheet("player", "../../assets/jose_sprite-sheet.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  create() {
    this.player = new Player(this, 450, 450, "player");
    this.criarMapa();

    // Configura a câmera
    this.configurarCamera();
  }

  criarMapa() {
    // Cria o mapa utilizando os dados carregados
    this.map = this.make.tilemap({ key: "mapa_tribunal" });

    this.tilesInterior = this.map.addTilesetImage("tribunal", "interiorC");

    this.chao = this.map.createLayer("chao", this.tilesInterior, 0, 0);
    this.parede = this.map.createLayer("parede", this.tilesInterior, 0, 0);
    this.cadeira = this.map.createLayer("cadeira", this.tilesInterior, 0, 0);
    this.mesas = this.map.createLayer("mesas", this.tilesInterior, 0, 0);
    this.decoracao = this.map.createLayer("decoracao", this.tilesInterior, 0, 0);
    this.portalSC = this.map.createLayer("portalSC", this.tilesInterior, 0, 0);


    // Define colisões para as camadas necessárias
    this.parede.setCollisionByProperty({ collider: true });
    this.cadeira.setCollisionByProperty({ collider: true });
    this.mesas.setCollisionByProperty({ collider: true });
    this.decoracao.setCollisionByProperty({ collider: true });
    this.portalSC.setCollisionByProperty({ collider: true });
    
    this.physics.add.collider(this.player, this.parede);
    this.physics.add.collider(this.player, this.cadeira); // para fazer o personagem passar por tras da cadeira uma ideia é fazer um mapa que tenha apenas uma cadeira no fundo e exportar o mapa no tiled
    this.physics.add.collider(this.player, this.mesas);
    this.physics.add.collider(this.player, this.decoracao);
    this.physics.add.collider(
      this.player, this.portalSC,
      () => this.scene.start("Cidade",{ posX: 2895, posY: 547 }),
      null, this
    );
  }

  configurarCamera() {
    // Configura a câmera para seguir o jogador e limita seus movimentos ao tamanho do mapa
    this.camera = this.cameras.main;
    this.camera.startFollow( this.player );
    this.camera.setBounds( 0, 0, this.map.widthInPixels, this.map.heightInPixels );
    this.camera.setZoom( 1.7, 1.7 );
  }

  update() {
    this.player.move();

    if(this.registry.get("Fase").fase === 6){
      this.scene.start("Fase6")
    }
  }
}
