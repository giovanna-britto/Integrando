const largura = 896;
const altura = 576;

export default class Fase5 extends Phaser.Scene {
    constructor() {
        super({ key: 'Fase5' });
    }

    preload() {
        this.load.image('fundo5', './Fase5/assets/fundoCadastro.png');
        this.load.image('botaoCadastrar', './Fase5/assets/botaoCadastrar.png');
        this.load.image('feedbackAcerto1f5', './Fase5/assets/feedbackAcerto1.png');
        this.load.image('feedbackAcerto2f5', './Fase5/assets/feedbackAcerto2.png');
        this.load.image('feedbackErrof5', './Fase5/assets/feedbackErro.png');
    }

    create() {
        this.add.image(largura / 2, altura / 2, 'fundo5');

        // Objetos vazios para armazenar informações dos fornecedores
        let fornecedor1 = {};
        let fornecedor2 = {};

        // Adiciona campos de texto para entrada de informações
        this.nomeFornecedorInput = this.add.text(70, 200, '', { font: '24px Arial', fill: '#000000' });
        this.emailInput = this.add.text(70, 310, '', { font: '24px Arial', fill: '#000000' });
        this.contatoInput = this.add.text(70, 425, '', { font: '24px Arial', fill: '#000000' });

        // Adiciona o botão de cadastrar e define sua interatividade
        const botaoCadastrar = this.add.image(largura / 2, 500, 'botaoCadastrar').setInteractive({ useHandCursor: true });

        // Campo de entrada de texto ativo inicialmente
        this.activeInput = this.nomeFornecedorInput;


        // Define o comportamento ao clicar no botão de cadastrar
        botaoCadastrar.on('pointerdown', () => {
            if (this.nomeFornecedorInput.text !== '' && this.emailInput.text !== '' && this.contatoInput.text !== '') {
                if (!fornecedor1.nome) {

                     // Preenche os dados do fornecedor 1 e exibe feedback de acerto
                    fornecedor1.nome = this.nomeFornecedorInput.text;
                    fornecedor1.email = this.emailInput.text;
                    fornecedor1.contato = this.contatoInput.text;
                    let feedbackAcerto1 = this.add.image(largura/2, altura/2, 'feedbackAcerto1f5').setInteractive();
                    feedbackAcerto1.on('pointerdown', () => {
                        this.registry.set("Fase", 6);
                        console.log(this.registry.get("Fase"));
                        this.scene.start("Escritorio");
                        feedbackAcerto1.setVisible(false);
                    })
                    console.log("Fornecedor 1 cadastrado:", fornecedor1);
                    this.clearInputs();
                } else if (!fornecedor2.nome) {

                    // Preenche os dados do fornecedor 2 e exibe feedback de acerto
                    fornecedor2.nome = this.nomeFornecedorInput.text;
                    fornecedor2.email = this.emailInput.text;
                    fornecedor2.contato = this.contatoInput.text;
                    let feedbackAcerto2 = this.add.image(largura/2, altura/2, 'feedbackAcerto2f5').setInteractive()
                    feedbackAcerto2.on('pointerdown', ()=>{
                        this.registry.set("Fase", 6);
                        console.log(this.registry.get("Fase"));
                        this.scene.start("Escritorio");
                        feedbackAcerto2.setVisible(false);
                    })
                    console.log("Fornecedor 2 cadastrado:", fornecedor2);
                    this.clearInputs();
                }
                this.scene.start("Escritorio");
            } else {

                // Exibe feedback de erro se algum campo estiver vazio
                let feedbackErro = this.add.image(largura/2, altura/2, 'feedbackErrof5').setInteractive()
                feedbackErro.on('pointerdown', ()=>{
                    feedbackErro.setVisible(false);
                })
                console.log("Preencha todas as informações antes de cadastrar.");
            }
        });
        // Define o comportamento do teclado para navegação entre os campos de entrada e entrada de texto
        this.input.keyboard.on('keydown', event => {
            if (event.keyCode === 13) { 
                if (this.activeInput === this.nomeFornecedorInput) {
                    this.activeInput = this.emailInput;
                } else if (this.activeInput === this.emailInput) {
                    this.activeInput = this.contatoInput;
                } 
            } else if ((event.keyCode >= 48 && event.keyCode <= 90) || event.keyCode === 32) {
                this.activeInput.text += event.key;
            } else if (event.keyCode === 8 && this.activeInput.text.length > 0) { // Backspace key
                this.activeInput.text = this.activeInput.text.substr(0, this.activeInput.text.length - 1);
            }
        });
    }

     // Limpa os campos de entrada de texto e redefine o campo ativo
    clearInputs() {
        this.nomeFornecedorInput.text = '';
        this.emailInput.text = '';
        this.contatoInput.text = '';

        this.activeInput = this.nomeFornecedorInput;
    }
}