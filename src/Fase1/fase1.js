const largura = 896;
const altura = 576;

// Define um objeto para armazenar quais buffets foram selecionados
var buffetsSelecionados = {
  buffet1: false,
  buffet2: false,
  buffet3: false,
  buffet4: false,
  buffet5: false,
  buffet6: false,
  buffet7: false,
  buffet8: false,
};

var tela1;
var tela2;
var buffet1;
var buffet2;
var buffet3;
var buffet4;
var buffet5;
var buffet6;
var buffet7;
var buffet8;
var setaDireita;
var setaEsquerda;
var botaoVerificar;

// Exporta a classe Fase1 como padrão
export default class Fase1 extends Phaser.Scene {
  constructor() {
    super({ key: 'Fase1' });
  }

  preload() {
    // Carrega as imagens:
    this.load.image( 'tela1', '../../assets/fase1/tela1.png' );
    this.load.image( 'buffet1', '../../assets/fase1/buffet1.png' );
    this.load.image( 'buffet2', '../../assets/fase1/buffet2.png' );
    this.load.image( 'buffet3', '../../assets/fase1/buffet3.png' );
    this.load.image( 'buffet4', '../../assets/fase1/buffet4.png' );
    this.load.image( 'setaDireita', '../../assets/fase1/setadireita.png' );
  }

  create() {
    this.registry.set("Fase", 1);

    let self = this;
    tela1 = this.add.image( this.cameras.main.width / 2, this.cameras.main.height / 2, 'tela1' );

    // Adiciona buffets interativos à cena
    buffet1 = this.add.image( largura / 2.05, altura / 2.5, 'buffet1' ).setInteractive();
    buffet2 = this.add.image( largura / 1.1, altura / 2.5, 'buffet2' ).setInteractive();
    buffet3 = this.add.image( largura / 2.05, altura / 1.4, 'buffet3' ).setInteractive();
    buffet4 = this.add.image( largura / 1.1, altura / 1.4, 'buffet4' ).setInteractive();
    setaDireita = this.add.image( largura / 1.1, altura / 1.1, 'setaDireita' ).setInteractive();

    // Verifica se um buffet já estava selecionado anteriormente e o pinta novamente
    if  (buffetsSelecionados.buffet1 ) {
      buffet1.setTint(0x689efc);
    } else if  (buffetsSelecionados.buffet2 ) {
      buffet2.setTint(0x689efc);
    } else if ( buffetsSelecionados.buffet3 ) {
      buffet3.setTint(0x689efc);
    } else if ( buffetsSelecionados.buffet4 ) {
      buffet4.setTint(0x689efc);
    }


    // Adiciona eventos de clique aos buffets
    buffet1.on( 'pointerdown', function ( pointer ) {
      toggleTint(buffet1, 'buffet1' );
    });

    buffet2.on( 'pointerdown', function ( pointer ) {
      toggleTint( buffet2, 'buffet2' );
    });

    buffet3.on( 'pointerdown', function ( pointer ) {
      toggleTint( buffet3, 'buffet3' );
    });

    buffet4.on( 'pointerdown', function ( pointer ) {
      toggleTint( buffet4, 'buffet4' );
    });

    // Adiciona evento de clique para avançar para a próxima cena
    setaDireita.on( 'pointerdown', function ( pointer ) {
      self.scene.start( 'Fase1Tela2' );
    });

    // Função interna para alternar a cor dos buffets selecionados
    function toggleTint( obj, key ) {
      if ( obj.isTinted ) {
        obj.clearTint();
        buffetsSelecionados[key] = false;
      } else {
        obj.setTint( 0x689efc );
        buffetsSelecionados[key] = true;
      }
    }
  }
}

// Exporta a classe Fase1Tela2
export class Fase1Tela2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Fase1Tela2' });
  }

    preload() {
        this.load.image( 'tela2', '../../assets/fase1/tela2.png' );
        this.load.image( 'buffet5', '../../assets/fase1/buffet5.png' );
        this.load.image( 'buffet6', '../../assets/fase1/buffet6.png' );
        this.load.image( 'buffet7', '../../assets/fase1/buffet7.png' );
        this.load.image( 'buffet8', '../../assets/fase1/buffet8.png' );
        this.load.image( 'setaEsquerda', '../../assets/fase1/setaesquerda.png' );
        this.load.image( 'botaoVerificar', '../../assets/fase1/botaoVerificar.png' );
        this.load.image( 'feedbackAcerto', '../../assets/fase1/feedbackAcerto.png' );
        this.load.image( 'feedbackErro', '../../assets/fase1/feedbackErro.png' )
    }

    create() {
      let self = this;
      tela2 = this.add.image( this.cameras.main.width / 2, this.cameras.main.height / 2, 'tela2' );

      // Adiciona buffets interativos à cena
      buffet5 = this.add.image( largura / 2.05, altura / 2.5, 'buffet5' ).setInteractive();
      buffet6 = this.add.image( largura / 1.1, altura / 2.5, 'buffet6' ).setInteractive();
      buffet7 = this.add.image( largura / 2.05, altura / 1.4, 'buffet7' ).setInteractive();
      buffet8 = this.add.image( largura / 1.1, altura / 1.4, 'buffet8' ).setInteractive();
      setaEsquerda = this.add.image( largura / 3, altura / 1.1, 'setaEsquerda' ).setInteractive();

      // Verifica se um buffet já estava selecionado anteriormente e o pinta novamente
      if ( buffetsSelecionados.buffet5 ) {
        buffet5.setTint( 0x689efc );
      }
      if ( buffetsSelecionados.buffet6 ) {
        buffet6.setTint( 0x689efc );
      }
      if ( buffetsSelecionados.buffet7 ) {
        buffet7.setTint( 0x689efc );
      }
      if ( buffetsSelecionados.buffet8 ) {
        buffet8.setTint( 0x689efc );
      }

      //Adiciona o evento de clique para ir para a próxima fase
      setaEsquerda.on( 'pointerdown', function ( pointer ) {
        self.scene.start( 'Fase1' );
      });

      buffet5.on( 'pointerdown', function ( pointer ) {
        toggleTint( buffet5, 'buffet5' );
      });

      buffet6.on( 'pointerdown', function ( pointer ) {
        toggleTint( buffet6, 'buffet6' );
      });

      buffet7.on( 'pointerdown', function ( pointer ) {
        toggleTint( buffet7, 'buffet7' );
      });

      buffet8.on( 'pointerdown', function ( pointer ) {
        toggleTint( buffet8, 'buffet8' );
      });

      // Adiciona um botão interativo para verificar se os buffets selecionados estão corretos
      botaoVerificar = this.add.image( largura / 0.95, altura / 1.11, 'botaoVerificar' ).setInteractive();

      // Define o evento de clique para verificar a seleção dos buffets
      botaoVerificar.on( 'pointerdown', ( pointer ) => {
          if (( buffetsSelecionados.buffet1 ) && ( buffetsSelecionados.buffet4 ) && ( buffetsSelecionados.buffet5 ) && ( buffetsSelecionados.buffet7 )) {

            // Se os buffets estiverem corretos, exibe um feedback de acerto e avança para a próxima fase
            let feedback = this.add.image( largura/1.4, altura/2, 'feedbackAcerto' ).setInteractive();
            feedback.on( 'pointerdown', function ( pointer ) {
              if (this === feedback) {
                self.scene.start('Fase2');
              }
            });
          } else {
            let feedback = this.add.image( largura/1.4, altura/2, 'feedbackErro' ).setInteractive();

            // Se os buffets estiverem incorretos, exibe um feedback de erro e retorna para a mesma fase
            feedback.on( 'pointerdown', function ( pointer ) {
              if ( this === feedback ) {
                self.scene.start( 'Fase1' );
              }
            });
          }
      });
      
      
    // Função interna para alternar a cor dos buffets selecionados
    function toggleTint( obj, key ) {
      if (obj.isTinted) {
        obj.clearTint();
        buffetsSelecionados[key] = false;
      } else {
        obj.setTint( 0x689efc );
        buffetsSelecionados[key] = true;
      }
    }
  }
  
}