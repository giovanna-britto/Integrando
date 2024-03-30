const largura = 896;
const altura = 576;



export default class Fase8TelaInformacoes extends Phaser.Scene {
    constructor() {
        super({ key: "Fase8TelaInformacoes" });
    }

    preload() {
        this.load.image("TelaInformacoes", "./Fase8/assets/TelaFase8Informacoes.png");
        this.load.image("BotaoVoltar2", "./Fase8/assets/botaoVoltar2.png");
        
    }

    create() {
        
        //Criação da tela de informações e do botão de voltar
         let telaInformacoes = this.add.image(600, altura/2, "TelaInformacoes").setOrigin(.50,.50).setScale(0.7); 
        let botaoVoltar2 = this.add.image(601, 465, "BotaoVoltar2").setScale(1.3).setInteractive();

        //Evento que retorna para a tela inicial da fase 8
        botaoVoltar2.on('pointerdown', ()=> {
            this.scene.start("Fase8");  
        })
    }

}

