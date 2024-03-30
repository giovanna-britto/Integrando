import Player from "../classes/Player.mjs";

export default class Cidade extends Phaser.Scene {
    localRenascer;

    constructor() {
        super({ key: "Cidade" });
    }

    // Método init para inicializar a cena com dados
    init(dados) {
        this.localRenascer = dados;
    }

    preload() {
        // Carrega o cenário do mapa
        this.load.image("cidade", "../../assets/Modern_Exteriors_Complete_Tileset_32x32.png");
        this.load.tilemapTiledJSON("mapa_cidade", "../../assets/mapaRealOficial23.json");
        this.load.image("city", "../../assets/mapaRealOficial.png");
        this.load.tilemapTiledJSON("mapa_cidade", "../../assets/mapaRealOficial.json");
        // this.load.audio('musica', '../../assets/MusicasESons/cidade.mp3');
    }
    // Método create para criar elementos visuais e configurar a cena
    create() {
      const faseAtual = this.registry.get("Fase");
      if (faseAtual === 3) {
        let buffetsVisitados = this.registry.get("BuffetsVisitados");
        let todosBuffetsVisitados = true;
        Object.entries(buffetsVisitados).forEach(([key, value]) => {
          if (!value) {
            todosBuffetsVisitados = false;
          }
        });
        if (todosBuffetsVisitados) {
          this.scene.start("Fase3");
        }
      }

      this.criarMapa();
      this.createPlayer();
      this.adicionarCamadas();
      this.adicionarColisoes();
      // this.tocarMusica();
      this.configurarCamera();
    }

    // Método para criar o jogador
    createPlayer() {

        // Encontra o ponto de spawn do jogador no mapa
        this.spawningPoint = this.map.findObject(
            "player",
            (objects) => objects.name === "spawning point"
        );

        // Define as coordenadas de spawn com base nos dados recebidos ou no ponto de spawn do mapa
        var spawn = Object.keys(this.localRenascer).length > 0 ?
            [this.localRenascer.posX, this.localRenascer.posY] :
            [this.spawningPoint.x, this.spawningPoint.y];


        // Cria uma nova instância da classe Player com as coordenadas de spawn e a chave do sprite
        this.player = new Player(this, spawn[0], spawn[1], "player");
    }

    // Método para criar o mapa
    criarMapa() {
        this.map = this.make.tilemap({ key: "mapa_cidade" });
        this.assets_combinado = this.map.addTilesetImage("Modern_Exteriors_Complete_Tileset_32x32", "cidade");
    }
  // Método para tocar a música de fundo
  // tocarMusica() {
  //     const backgroundMusic = this.sound.add('musica');
  //     backgroundMusic.play({ loop: true });
  //   }

    adicionarCamadas() {
        // Cria as camadas do mapa
        this.estrada = this.map.createLayer("estrada", this.assets_combinado, 0, 0);
        this.terreno = this.map.createLayer("terreno", this.assets_combinado, 0, 0);
        this.paredePraca = this.map.createLayer("paredePraca", this.assets_combinado, 0, 0);
        this.arvore8 = this.map.createLayer("arvore8", this.assets_combinado, 0, 0);
        this.arvore7 = this.map.createLayer("arvore7", this.assets_combinado, 0, 0);
        this.arvore6 = this.map.createLayer("arvore6", this.assets_combinado, 0, 0);
        this.arvore5 = this.map.createLayer("arvore5", this.assets_combinado, 0, 0);
        this.arvore4 = this.map.createLayer("arvore4", this.assets_combinado, 0, 0);
        this.arvore3 = this.map.createLayer("arvore3", this.assets_combinado, 0, 0);
        this.arvore2 = this.map.createLayer("arvore2", this.assets_combinado, 0, 0);
        this.arvore1 = this.map.createLayer("arvore1", this.assets_combinado, 0, 0);
        this.casa2 = this.map.createLayer("casa2", this.assets_combinado, 0, 0);
        this.cerca = this.map.createLayer("cerca", this.assets_combinado, 0, 0);
        this.casa = this.map.createLayer("casa", this.assets_combinado, 0, 0);
        this.acima_poste = this.map.createLayer("acima_poste", this.assets_combinado, 0, 0);
        this.poste = this.map.createLayer("poste", this.assets_combinado, 0, 0);
        this.semaforo = this.map.createLayer("semaforo", this.assets_combinado, 0, 0);
        this.faixa = this.map.createLayer("faixa", this.assets_combinado, 0, 0);
        this.portalEscritorio = this.map.createLayer("portal", this.assets_combinado, 0, 0);
        this.portalTribunal = this.map.createLayer("portalT", this.assets_combinado, 0, 0);
        this.portalBanco = this.map.createLayer("portalB", this.assets_combinado, 0, 0);
        this.portalBuffet1 = this.map.createLayer("portalB1", this.assets_combinado, 0, 0);
        this.portalBuffet2 = this.map.createLayer("portalB2", this.assets_combinado, 0, 0);
        this.portalBuffet3 = this.map.createLayer("portalB3", this.assets_combinado, 0, 0);
        this.portalBuffet4 = this.map.createLayer("portalB4", this.assets_combinado, 0, 0);

        // Define as colisões para algumas camadas do mapa
        this.cerca.setCollisionByProperty({ collider: true });
        this.poste.setCollisionByProperty({ collider: true });
        this.acima_poste.setCollisionByProperty({ collider: true });
        this.casa.setCollisionByProperty({ collider: true });
        this.semaforo.setCollisionByProperty({ collider: true });
        this.casa2.setCollisionByProperty({ collider: true });
        this.arvore1.setCollisionByProperty({ collider: true });
        this.arvore2.setCollisionByProperty({ collider: true });
        this.arvore3.setCollisionByProperty({ collider: true });
        this.arvore4.setCollisionByProperty({ collider: true });
        this.arvore5.setCollisionByProperty({ collider: true });
        this.arvore6.setCollisionByProperty({ collider: true });
        this.arvore7.setCollisionByProperty({ collider: true });
        this.arvore8.setCollisionByProperty({ collider: true });
        this.paredePraca.setCollisionByProperty({ collider: true });
        this.faixa.setCollisionByProperty({ collider: true });
        this.portalEscritorio.setCollisionByProperty({ collider: true });
        this.portalTribunal.setCollisionByProperty({ collider: true });
        this.portalBanco.setCollisionByProperty({ collider: true });
        this.portalBuffet1.setCollisionByProperty({ collider: true });
        this.portalBuffet2.setCollisionByProperty({ collider: true });
        this.portalBuffet3.setCollisionByProperty({ collider: true });
        this.portalBuffet4.setCollisionByProperty({ collider: true });
    }

    adicionarColisoes() {
        // Definição as colisões do jogador com alguns objetos do mapa
        this.physics.add.collider(this.player, this.semaforo);
        this.semaforo.setDepth(10);
        this.physics.add.collider(this.player, this.poste);
        this.physics.add.collider(this.player, this.acima_poste);
        this.acima_poste.setDepth(50);
        this.physics.add.collider(this.player, this.casa);
        this.casa.setDepth(10);
        this.physics.add.collider(this.player, this.arvore8);
        this.physics.add.collider(this.player, this.arvore7);
        this.physics.add.collider(this.player, this.arvore6);
        this.physics.add.collider(this.player, this.arvore5);
        this.physics.add.collider(this.player, this.arvore4);
        this.physics.add.collider(this.player, this.arvore3);
        this.physics.add.collider(this.player, this.arvore2);
        this.arvore2.setDepth(10);
        this.physics.add.collider(this.player, this.arvore1);
        this.physics.add.collider(this.player, this.paredePraca);
        this.physics.add.collider(this.player, this.cerca);
        this.physics.add.collider(this.player, this.casa2);
        this.physics.add.collider(this.player, this.faixa);

        // Entra no escritório caso o personagem colida com a porta
        this.addCollider(this.player, this.portalEscritorio, 'Escritorio');
        this.addCollider(this.player, this.portalTribunal, 'Tribunal');
        this.addCollider(this.player, this.portalBanco, 'Banco');
        this.addCollider(this.player, this.portalBuffet1, 'Buffet1');
        this.addCollider(this.player, this.portalBuffet2, 'Buffet2');
        this.addCollider(this.player, this.portalBuffet3, 'Buffet3');
        this.addCollider(this.player, this.portalBuffet4, 'Buffet4');
    }

    // Método para adicionar colisões entre dois objetos e definir um evento para ocorrer quando há colisão
    addCollider(obj1, obj2, sceneName) {
        this.physics.add.collider(
            obj1, obj2,
            () => { this.scene.start(sceneName); },
            null,
            this
        );
    }
    // Método para configurar a câmera da cena e criar um minimapa
    configurarCamera() {
        this.camera = this.cameras.main;
        this.camera.startFollow(this.player);
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.camera.setZoom(1.1, 1.1);

        this.createMiniMap();
    }
    // Método para criar um minimapa na cena
    createMiniMap() {

      // Definições de tamanho e posição do minimapa
        const miniMapWidth = 300;
        const miniMapHeight = 300;
        const miniMapX = this.cameras.main.width - miniMapWidth - 100;
        const miniMapY = 55;
    

        // Adiciona um retângulo ao redor do minimapa para destacá-lo
        const borderGraphics = this.add.graphics();
        borderGraphics.lineStyle(6, 0xD2B48C);
        borderGraphics.strokeRect(miniMapX - 1, miniMapY - 1, miniMapWidth + 2, miniMapHeight + 2);
        borderGraphics.setScrollFactor(0);
        borderGraphics.setVisible(false); // Inicialmente invisível
    
        // Adiciona um fundo escuro para o minimapa
        const backgroundGraphics = this.add.graphics();
        backgroundGraphics.fillStyle(0x000000, 0.5);
        backgroundGraphics.fillRect(miniMapX, miniMapY, miniMapWidth, miniMapHeight);
        backgroundGraphics.setScrollFactor(0);
        backgroundGraphics.setVisible(false); // Inicialmente invisível
    
        // Adiciona uma imagem representando a cidade no minimapa
        const miniMapCityImage = this.add.image(miniMapX, miniMapY, 'city').setOrigin(0);
        miniMapCityImage.setScale(miniMapWidth / miniMapCityImage.width, miniMapHeight / miniMapCityImage.height);
        miniMapCityImage.setScrollFactor(0);
        miniMapCityImage.setVisible(false); // Inicialmente invisível
    
        // Função para alternar a visibilidade do minimapa quando a tecla 'M' é pressionada
        const toggleMiniMap = () => {
            const isVisible = backgroundGraphics.visible;
            backgroundGraphics.setVisible(!isVisible);
            miniMapCityImage.setVisible(!isVisible);
            this.playerMiniMapRect.setVisible(!isVisible);
            borderGraphics.setVisible(!isVisible);
        };
    
        // Define um evento para a tecla 'M' para chamar a função toggleMiniMap
        this.input.keyboard.on('keydown-M', toggleMiniMap);
    
        // Adiciona um retângulo representando a posição do jogador no minimapa
        this.playerMiniMapRect = this.add.graphics();
        this.playerMiniMapRect.fillStyle(0xff0000);
        this.playerMiniMapRect.fillRect(0, 0, 4, 4);
        this.playerMiniMapRect.setScrollFactor(0);
        this.playerMiniMapRect.setVisible(false); // Inicialmente invisível
    
        // Define a ordem de profundidade dos elementos do minimapa
        borderGraphics.setDepth(50);
        backgroundGraphics.setDepth(51);
        miniMapCityImage.setDepth(52);
        this.playerMiniMapRect.setDepth(53);
    
        // Adiciona um evento para atualizar a posição do retângulo do jogador no minimapa a cada quadro de atualização do jogo
        this.events.on('update', this.updatePlayerMiniMapPosition, this);
    }
        // Método para atualizar a posição do retângulo do jogador no minimapa
        updatePlayerMiniMapPosition() {

          // Verifica se o jogador existe e se o retângulo do minimapa está visível
            if (this.player && this.playerMiniMapRect.visible) {

              // Calcula a escala do minimapa com base nas dimensões do mapa
                const scale = 700 / this.map.widthInPixels;

                // Calcula a posição do jogador no minimapa com base na escala e na posição atual do jogador
                const miniMapX = (this.cameras.main.width - -1115) / 2;
                const miniMapY = (this.cameras.main.height - 860) / 2;
        
                // Calcula a posição do jogador no minimapa com base na escala e na posição atual do jogador
                const playerMiniMapX = miniMapX + (this.player.x * scale * 0.43);
                const playerMiniMapY = miniMapY + (this.player.y * scale * 0.7);
              
                // Define a posição do retângulo do jogador no minimapa
                this.playerMiniMapRect.setPosition(playerMiniMapX, playerMiniMapY);
        
                // Torna o retângulo do jogador visível
                this.playerMiniMapRect.setVisible(true);
            } else {
                // Torna o retângulo do jogador invisível se ele não existir ou se o minimapa estiver invisível
                this.playerMiniMapRect.setVisible(false);
            }
        
            this.events.on('update', this.updatePlayerMiniMapPosition, this);
        }

        updatePlayerMiniMapPosition() {
            if (this.player && this.playerMiniMapRect.visible) {
                const scale = 700 / this.map.widthInPixels;

          const miniMapX = (this.cameras.main.width - -1115) / 2;
          const miniMapY = (this.cameras.main.height - 860) / 2;

          const playerMiniMapX = miniMapX + (this.player.x * scale * 0.43);
          const playerMiniMapY = miniMapY + (this.player.y * scale * 0.7);

          this.playerMiniMapRect.setPosition(playerMiniMapX, playerMiniMapY);

          this.playerMiniMapRect.setVisible(true);
      } else {
          this.playerMiniMapRect.setVisible(false);
      }
  }

  update() {
      this.player.move();
  }
}

