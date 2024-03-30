export default class Fase2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Fase2' });
  }

  preload() {
    this.load.image( 'tela1', 'Fase2/assets/tela1.png' );
    this.load.image('contrato', 'Fase2/assets/contrato/contrato.png');
    this.load.image("botaoConfirmar", "Fase2/assets/botaoConfirmar.png");
    this.load.image("popupSucesso", "Fase2/assets/paginaSucesso.png");

    // Carregar imagens de possíveis respostas do contrato
    this.load.image("confidencialidade", "Fase2/assets/palavras/confidencialidade.png");
    this.load.image("divulgacao", "Fase2/assets/palavras/divulgacao.png");
    this.load.image("informacoes", "Fase2/assets/palavras/informacoes.png");
    this.load.image("meta", "Fase2/assets/palavras/meta.png");
    // this.load.image("jose", "Fase2/assets/palavras/jose.png");
  }

  create() {
    this.registry.set("Fase", 2);

    // Adiciona as imagens de fundo e contrato à cena
    this.tela1 = this.add.image( this.cameras.main.width / 2, this.cameras.main.height / 2, 'tela1' ).setScale(1.05);
    this.contrato = this.add.image(780, 350, 'contrato').setScale(0.6);

    // Define as posições iniciais dos retângulos que representam as áreas de drop
    var posPalavraX = 340;
    var posPalavraY = 200;

    // Define as posições válidas dos retângulos
    this.validPositions = [
      [540, 180, 115, 40],
      [500, 290, 250, 40],
      [840, 290, 180, 40],
      [650, 410, 230, 40],
      [920, 470, 130, 40], // x, y, width, height
    ];

    // Cria os retângulos na cena
    this.rectangleNome = this.createRectangle(this.validPositions[0][0], this.validPositions[0][1], this.validPositions[0][2], this.validPositions[0][3]);
    this.rectangleConfid = this.createRectangle(this.validPositions[1][0], this.validPositions[1][1], this.validPositions[1][2], this.validPositions[1][3]);
    this.rectangleDivulg = this.createRectangle(this.validPositions[2][0], this.validPositions[2][1], this.validPositions[2][2], this.validPositions[2][3]);
    this.rectangleInfo = this.createRectangle(this.validPositions[3][0], this.validPositions[3][1], this.validPositions[3][2], this.validPositions[3][3]);
    this.rectangleMeta = this.createRectangle(this.validPositions[4][0], this.validPositions[4][1], this.validPositions[4][2], this.validPositions[4][3]);

    // this.debugRect = this.add.rectangle(597, 200, 115, 40, 0xff0000); // x, y, width, height, color
     // Cria as áreas de drop na cena
    this.rangeNome = this.add.zone(597, 200, 115, 40).setRectangleDropZone(115, 40);
    this.rangeConfid = this.add.zone(625, 310, 250, 40).setRectangleDropZone(250, 40);
    this.rangeDivulg = this.add.zone(930, 310, 180, 40).setRectangleDropZone(180, 40);
    this.rangeInfo = this.add.zone(765, 430, 230, 40).setRectangleDropZone(230, 40);
    this.rangeMeta = this.add.zone(985, 490, 130, 40).setRectangleDropZone(130, 40);

     // Agrupa as áreas de drop em um array
    this.rectanglesZones = [this.rangeNome, this.rangeConfid, this.rangeDivulg, this.rangeInfo, this.rangeMeta];

    // Adiciona eventos de drop para as áreas de drop
    this.rectanglesZones.forEach(recZone => {
      recZone.on('drop', (pointer, gameObject, dropZone) => {
        this.checkDropZone(gameObject, dropZone);
      })
    });

    // Adiciona imagens interativas das palavras à cena e as torna arrastáveis
    this.confidencialidade = this.add.image(posPalavraX, posPalavraY, "confidencialidade").setScale(0.55);
    this.divulgacao = this.add.image(posPalavraX, posPalavraY + 70, "divulgacao").setScale(0.6);
    this.informacoes = this.add.image(posPalavraX, posPalavraY + 150, "informacoes").setScale(0.6);
    this.meta = this.add.image(posPalavraX, posPalavraY + 220, "meta").setScale(0.6);
    this.jose = this.add.image(posPalavraX, posPalavraY + 290, "player").setScale(0.6);

    // Agrupa as palavras em um array
    this.palavras = [this.jose, this.confidencialidade, this.divulgacao, this.informacoes, this.meta];

    // Define as palavras como interativas e arrastáveis
    this.palavras.forEach(palavra => { 
      palavra.setInteractive();
      this.input.setDraggable(palavra);
    });
    
    // Define as palavras como interativas e arrastáveis
    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    // Define o comportamento de soltar as palavras nas áreas de drop
    this.input.on('dragend', (pointer, gameObject, dropped) => {

      // Obtém o índice da palavra arrastada no array de palavras
      let index = this.palavras.indexOf(gameObject);

      // Obtém os limites da área de drop correspondente ao índice da palavra
      let rect = this.rectanglesZones[index].getBounds();

      // Verifica se a palavra foi solta e se está dentro da área de drop correspondente
      if (dropped && rect.contains(gameObject.x, gameObject.y)) {
          gameObject.x = rect.centerX;
          gameObject.y = rect.centerY;
          gameObject.disableInteractive();
      } 
      else {

        // Se a palavra não foi solta na área de drop correspondente, retorna à posição inicial
        gameObject.x = gameObject.input.dragStartX;
        gameObject.y = gameObject.input.dragStartY;
      }
    });

    // Adiciona uma imagem de sucesso e um botão de confirmação à cena
    this.paginaSucesso = this.add.image(innerWidth/2, innerHeight/2, "popupSucesso").setVisible(false);

    this.botao = this.add.image(innerWidth/2, innerHeight/2 + 90, "botaoConfirmar").setScale(0.4).setVisible(false);

    // Torna o botão de confirmação interativo e define o comportamento ao ser clicado
    this.botao.setInteractive();
    this.botao.on('pointerup', () => {
      this.registry.set("Fase", 3);

      // Inicia a cena "Escritorio" ao clicar no botão de confirmação
      this.scene.start("Escritorio");
    });
  }

  // Função para verificar se uma palavra foi solta em uma área de drop específica e desativar sua interatividade
  checkDropZone(gameObject, dropZone) {
    this.rectanglesZones.forEach(recZone => {
      if (dropZone === recZone) {
        gameObject.disableInteractive();
      }
    });
  }

  // Função para criar um retângulo na tela com as dimensões e a cor especificadas
  createRectangle(x, y, width, height, color=0x000000) {
    var rectangle = this.add.graphics();
    rectangle.fillStyle(color);
    rectangle.fillRect(x, y, width, height);
    return rectangle;
  }

  update() {
    
    // Verifica se todas as palavras foram desativadas (soltas nas áreas de drop)
    const allPalavrasDisabled = this.palavras.every(palavra => !palavra.input.enabled);
    if (allPalavrasDisabled) {

      // Se todas as palavras estiverem desativadas, mostra a imagem de sucesso e o botão de confirmação
      this.paginaSucesso.setVisible(true);
      this.botao.setVisible(true);
    }
  }
}
