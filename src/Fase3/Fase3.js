const largura = 896;
const altura = 576;

let respostasBuffets = {
  buffet1: false,
  buffet2: false,
  buffet3: false,
  buffet4: false,
};

var tela1;
var tela2;
var buffet1;
var buffet2;
var buffet3;
var buffet4;
var botaoVerificar;

export default class Fase3 extends Phaser.Scene {
  constructor() {
    super({ key: 'Fase3' });
  }

  preload() {
    this.load.image( 'tela1', 'Fase2/assets/tela1.png' );
    this.load.image( 'buffet1card', 'Fase3/assets/buffet1.png' );
    this.load.image( 'buffet2card', 'Fase3/assets/buffet2.png' );
    this.load.image( 'buffet3card', 'Fase3/assets/buffet3.png' );
    this.load.image( 'buffet4card', 'Fase3/assets/buffet4.png' );
    this.load.image( 'botaoVerificar', 'Fase3/assets/botaoVerificar.png' );
    this.load.image( 'feedbackAcerto', 'Fase3/assets/feedbackAcerto.png' );
    this.load.image( 'feedbackErro', 'Fase3/assets/feedbackErro.png' );
  }

  create() {
    this.registry.set("Fase", 3);

    tela1 = this.add.image( this.cameras.main.width / 2, this.cameras.main.height / 2, 'tela1' );
    
    const posX = largura / 2.65;

    // Adiciona os sprites dos buffets e os torna interativos
    buffet1 = this.add.image( posX, altura / 1.9, 'buffet1card' ).setInteractive();
    buffet2 = this.add.image( posX + 200, altura / 1.9, 'buffet2card' ).setInteractive();
    buffet3 = this.add.image( posX + 400, altura / 1.9, 'buffet3card' ).setInteractive();
    buffet4 = this.add.image( posX + 600, altura / 1.9, 'buffet4card' ).setInteractive();

    // Adiciona o botão de verificar e o torna interativo
    botaoVerificar = this.add.image( largura / 1.1, altura / 1.1, 'botaoVerificar' ).setInteractive();

    // Array contendo os sprites dos buffets
    this.buffets = [buffet1, buffet2, buffet3, buffet4];

    // Define a funcionalidade dos sprites dos buffets ao serem clicados
    this.buffets.forEach((buffet, index) => {
      buffet.on('pointerdown', () => toggleTint(buffet, `buffet${index + 1}`));
    });

    botaoVerificar.on('pointerdown', (pointer) => {
      const respostaCorreta = (respostasBuffets.buffet1) && (respostasBuffets.buffet2) && (respostasBuffets.buffet4);
      if (respostaCorreta) {
        this.registry.set("Fase", 4);
      }
      
      // Exibe feedback de acerto ou erro e inicia a próxima cena correspondente
      let feedback = this.add.image(
        largura / 2, altura / 2,
        respostaCorreta ? 'feedbackAcerto' : 'feedbackErro'
      ).setInteractive();
      console.log(respostaCorreta ? "Cidade" : "Fase3");
      feedback.on('pointerdown', (pointer) => this.scene.start(respostaCorreta ? "Cidade" : "Fase3"));
    });
  

    // Função para alternar a cor dos buffets e atualizar as respostas
    function toggleTint( obj, key ) {
      if (obj.isTinted) {
        obj.clearTint();
        respostasBuffets[key] = false;
      } else {
        obj.setTint( 0x689efc );
        respostasBuffets[key] = true;
      }
    }
  }
}