const largura = 896;
const altura = 576;


export default class Fase8 extends Phaser.Scene {
    constructor() {
        super({
            key: "Fase8"
        });
        this.botaoConceito = null;
        this.botaoInformacoes = null;
    }

    preload() {
        this.load.image("TelaInicialPC", "./Fase8/assets/TelaFase8Inicio.png");
        this.load.image("BotaoConceito", "./Fase8/assets/botaoConceito.png");
        this.load.image("BotaoInformacoes", "./Fase8/assets/botaoInformacoes.png");
        this.load.image("BotaoIrFesta", "./Fase8/assets/botaoIrFesta.png");
    }

    create() {
        var blackBackground = this.add.rectangle(0, 0, largura, altura, 0x000000);
        blackBackground.setOrigin(0, 0);

        this.add.image(600, altura / 2, "TelaInicialPC").setOrigin(.50, .50).setScale(0.7);

        const botaoConceitoX = 602;
        const botaoConceitoY = 314;
        const botaoInformacoesX = 602;
        const botaoInformacoesY = 387;
        const botaoIrFestaX = 602;
        const botaoIrFestaY = 465;
        const botaoConceitoWidth = 100;
        const botaoConceitoHeight = 50;

        //Definição da posição e tamanho dos botões
        this.botaoConceito = this.add.image(botaoConceitoX , botaoConceitoY,  "BotaoConceito").setScale(1).setInteractive();
        this.botaoInformacoes = this.add.image(botaoInformacoesX , botaoInformacoesY,  "BotaoInformacoes").setScale(1.1).setInteractive();
        this.botaoIrFesta = this.add.image(botaoIrFestaX , botaoIrFestaY,  "BotaoIrFesta").setScale(0.7).setInteractive();
       
        
        //Evento que redireciona para a tela do conceito de PO
        this.botaoConceito.on('pointerdown', (pointer, localX, localY, event) => {
            
            this.scene.start('Fase8TelaConceito');
           
        });
        
        //Evento que encaminha para a tela que mostra as informações que tem no PO
        this.botaoInformacoes.on('pointerdown', (pointer) => {
            
            this.scene.start("Fase8TelaInformacoes");
        });

        //Evento que redireciona a cena da festa
        this.botaoIrFesta.on('pointerdown', (pointer) => {
            
            this.scene.start("Festa");
        });
    
    }

    update() {
    
    }
}
