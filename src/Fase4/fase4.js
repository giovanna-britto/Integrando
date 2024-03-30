const largura = 896;
const altura = 576;

class Pergunta extends Phaser.Scene {
    // Classe Pergunta para a seleção das perguntas corretas para a criação do formulário
    constructor(key, numero, fundo, pergunta, alternativaA, alternativaB, alternativaC, alternativaD, feedbackAcerto, feedbackErro, alternativaCorreta, proximaFase) {
        super({ key: key });
        this.numero = numero;
        this.fundo = fundo;
        this.pergunta = pergunta;
        this.alternativaA = alternativaA;
        this.alternativaB = alternativaB;
        this.alternativaC = alternativaC;
        this.alternativaD = alternativaD;
        this.feedbackAcerto = feedbackAcerto;
        this.feedbackErro = feedbackErro;
        this.alternativaCorreta = alternativaCorreta;
        this.proximaFase = proximaFase;
    }

    preload() {
        //O método preloado carrega as imagens que são passadas pelos objetos da classe
        this.load.image('background' + this.numero, this.fundo); 
        this.load.image('pergunta' + this.numero, this.pergunta); 
        this.load.image('alternativaA' + this.numero, this.alternativaA); 
        this.load.image('alternativaB' + this.numero, this.alternativaB); 
        this.load.image('alternativaC'+ this.numero, this.alternativaC);
        this.load.image('alternativaD' + this.numero, this.alternativaD);
        this.load.image('feedbackAcerto' + this.numero, this.feedbackAcerto);
        this.load.image('feedbackErro' + this.numero, this.feedbackErro);
    }

    create() {
    let self = this;

        // Adição de todas as imagens carregadas na tela, definindo-as como interativas 
        this.fundo = this.add.image(largura / 2, altura / 2, 'background'+this.numero);
        this.pergunta = this.add.image(largura / 2, altura / 1.8, 'pergunta'+this.numero);
        this.alternativaA = this.add.image(largura / 2, altura / 2.2, 'alternativaA'+this.numero).setInteractive();
        this.alternativaB = this.add.image(largura / 2, altura / 1.8, 'alternativaB'+this.numero).setInteractive();
        this.alternativaC = this.add.image(largura / 2, altura / 1.52, 'alternativaC'+this.numero).setInteractive();
        this.alternativaD = this.add.image(largura / 2, altura / 1.32, 'alternativaD'+this.numero).setInteractive();
        
        this.feedbackAcerto = this.add.image(largura / 2, altura / 2, 'feedbackAcerto'+this.numero).setInteractive().setVisible(false);
        this.feedbackErro = this.add.image(largura / 2, altura / 2, 'feedbackErro'+this.numero).setInteractive().setVisible(false);

        //Define uma ação (método verificarResposta()) quando uma alternativa é selecionada(a)
        this.alternativaA.on('pointerdown', function (pointer) {
            self.verificarResposta('A');
        });

        this.alternativaB.on('pointerdown', function (pointer) {
            self.verificarResposta('B');
        });

        this.alternativaC.on('pointerdown', function (pointer) {
            self.verificarResposta('C');
        });

        this.alternativaD.on('pointerdown', function (pointer) {
            self.verificarResposta('D');
        });

        //Caso o jogador clique no feedback de erro o jogador deve refazer a fase
        this.feedbackErro.on('pointerdown', function (pointer) {
            self.refazerFase();
        });

        //Caso o jogador clique no feedback de erro o jogador deve refazer a fase
        this.feedbackAcerto.on('pointerdown', function (pointer) {
            self.avancarParaProximaFase();
        });
    }

    //Método para verificar se o jogador escolher a alternativa correta e define a visibilidade do feedback de erro ou acerto
    verificarResposta(respostaSelecionada) {
        if (respostaSelecionada === this.alternativaCorreta) {
            this.feedbackAcerto.setVisible(true);
            this.feedbackErro.setVisible(false);
        } else {
            this.feedbackErro.setVisible(true);
            this.feedbackAcerto.setVisible(false);
        }
    }

    // Define qual objeto será a próxima fase
    definirProximaFase() {
        this.proximaFase = this.proximaFase;
    }

    //Método para que o jogador refaça a fase quando clicar no feedback de Erro
    refazerFase() {
        this.scene.restart();
    }

    //Método para que o jogador vá para a próxima fase ao clicar no feedback de acerto
    avancarParaProximaFase() {
        if (this.proximaFase) {
            console.log("Próxima fase:", this.proximaFase);
            this.scene.start(this.proximaFase);
        } else {
            console.error("Próxima fase não definida!");
        }
    }

    
}

export class Formulario extends Phaser.Scene{
    constructor(){
        super({key: 'carregarFormulario'})
    }

    preload(){
        this.load.image('formulario', 'Fase4/assets/formularioFinal.png');
        this.load.image('verRespostas', 'Fase4/assets/enviarFormulario.png');
    }

    create(){
        let self = this;

        let fundo = this.add.image(largura/2, altura/2, 'formulario');
        fundo.setVisible(true);

        let enviarFormulario = this.add.image(largura/2, altura/2, 'verRespostas').setInteractive().setVisible(false);

        setTimeout(function() {
            enviarFormulario.setVisible(true);
        }, 1000);

        enviarFormulario.on('pointerdown', function (pointer) {
            self.scene.start('verRespostas')
        });
    }

    update(){

    }

}

class Respostas extends Phaser.Scene{
    constructor(chave, numero, formsResposta){
        super({key: chave})
        this.numero = numero;
        this.formsResposta = formsResposta;
    }

    preload(){
        this.load.image('formulario'+this.numero, this.formsResposta);
    }

    create(){
        let formularioResposta = this.add.image(largura/2, altura/2, 'formulario'+this.numero).setInteractive().setOrigin(0.5, 0.25);

        let larguraImagem = formularioResposta.width;
        let alturaImagem = formularioResposta.height;
        let larguraTela = largura;
        let alturaTela = altura;

        // Calcula os limites de rolagem
        let limiteSuperior = alturaTela / 2;
        let limiteInferior = alturaTela / 2 - alturaImagem + alturaTela;

        this.input.keyboard.on('keydown-ESC', function (event) {
            this.scene.stop(); // Para a cena atual
            this.scene.start('verRespostas');
        }, this);

        this.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {
            // Verifica se a imagem está dentro dos limites de rolagem
            if ((formularioResposta.y + deltaY) <= limiteSuperior && (formularioResposta.y + deltaY) >= limiteInferior) {
                // Atualiza a posição vertical da imagem com base no movimento de roda
                formularioResposta.y += deltaY * 0.5; // Ajuste a velocidade da rolagem conforme necessário
            } else {
                // Se a imagem estiver fora dos limites, define sua posição para o limite mais próximo
                if (deltaY < 0 && formularioResposta.y > limiteSuperior) {
                    // Se o movimento for para cima e a imagem estiver além do limite superior, ajusta para o limite superior
                    formularioResposta.y = limiteSuperior;
                } else if (deltaY > 0 && formularioResposta.y < limiteInferior) {
                    // Se o movimento for para baixo e a imagem estiver além do limite inferior, ajusta para o limite inferior
                    formularioResposta.y = limiteInferior;
                }
            }
        });
    }
}


export class verRespostas extends Phaser.Scene{
    constructor(){
        super({key: 'verRespostas'})
    }

    preload(){
        this.load.image('fundoRespostas', 'Fase4/assets/respostasFormulario.png');
        this.load.image('formsAssets', 'Fase4/assets/formsImagem.png');
    }

    create(){
        let self = this;

        let fundo = this.add.image(largura/2, altura/2, 'fundoRespostas');
        fundo.setVisible(true);

        fundo = self.add.image(largura/2, altura/2, 'fundoRespostas').setVisible(true);
        let respostaBuffet1 = self.add.image(largura/5.5, altura/1.9, 'formsAssets').setInteractive();
        let respostaBuffet2 = self.add.image(largura/2, altura/1.9, 'formsAssets').setInteractive();
        let respostaBuffet3 = self.add.image(largura/1.23, altura/1.9, 'formsAssets').setInteractive();

        respostaBuffet1.on('pointerdown', function (pointer) {
            self.scene.start('resposta1');
        });

        respostaBuffet2.on('pointerdown', function (pointer) {
            self.scene.start('resposta2');
        });

        respostaBuffet3.on('pointerdown', function (pointer) {
            self.scene.start('resposta3');
        });

        this.input.keyboard.on('keydown-ENTER', function (event) {
            this.scene.stop(); 
            this.scene.start('escolherBuffet');
        }, this);
            
    }

    update(){

    }
  
}

export class EscolherBuffet extends Phaser.Scene{    
    constructor(){
        super({key: 'escolherBuffet'});
    }

    preload() {
        this.load.image('fundoEscolha', 'Fase4/assets/tela1.png');
        this.load.image('buffet1escolha', 'Fase4/assets/buffet1.png');
        this.load.image('buffet2escolha', 'Fase4/assets/buffet2.png');
        this.load.image('buffet3escolha', 'Fase4/assets/buffet4.png');
        this.load.image('botaoVerificar', 'Fase4/assets/botaoVerificar.png');
        this.load.image('feedbackAcerto', 'Fase4/assets/feedbackAcerto2.png');
        this.load.image('feedbackErro', 'Fase4/assets/feedbackErro2.png');
    }

    create() {
        let self = this;

        // Variáveis para armazenar as seleções dos buffets
        let selecionouBuffet1 = false;
        let selecionouBuffet2 = false;
        let selecionouBuffet3 = false;

        this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'fundoEscolha');

        let posX = largura / 2.5;
        let buffet1 = this.add.image(posX, altura / 1.9, 'buffet1escolha').setInteractive();
        let buffet2 = this.add.image(posX + 250, altura / 1.9, 'buffet2escolha').setInteractive();
        let buffet3 = this.add.image(posX + 500, altura / 1.9, 'buffet3escolha').setInteractive();
        let botaoVerificar = this.add.image(largura + 50, altura / 1.2, 'botaoVerificar').setInteractive();

        buffet1.on('pointerdown', () =>{
            selecionouBuffet1 = !selecionouBuffet1; // Inverte o estado da seleção do buffet 1
            toggleTint(buffet1, selecionouBuffet1);
        });

        buffet2.on('pointerdown', () => {
            selecionouBuffet2 = !selecionouBuffet2; // Inverte o estado da seleção do buffet 2
            toggleTint(buffet2, selecionouBuffet2);
        });

        buffet3.on('pointerdown', () => {
            selecionouBuffet3 = !selecionouBuffet3; // Inverte o estado da seleção do buffet 3
            toggleTint(buffet3, selecionouBuffet3);
        });

        botaoVerificar.on('pointerdown', () => {        
            // Verifica se o buffet 1 e 2 foram selecionados e o buffet 3 não foi selecionado
            if (selecionouBuffet1 && selecionouBuffet2 && !selecionouBuffet3) {
                let feedbackAcerto = this.add.image(largura/2, altura/2, 'feedbackAcerto').setInteractive();
                feedbackAcerto.on('pointerdown', () => {
                    console.log('Feedback acerto clicado');
                    // Reinicia as seleções de buffet
                    selecionouBuffet1 = false;
                    selecionouBuffet2 = false;
                    selecionouBuffet3 = false;
                    // Reinicia a cena atual
                    this.registry.set("Fase", 5);
                    self.scene.start("Fase5");
                });
            } else {
                let feedbackErro = this.add.image(largura/2, altura/2, 'feedbackErro').setInteractive();
                feedbackErro.on('pointerdown', () => {
                    console.log('Feedback erro clicado');
                    // Reinicia as seleções de buffet
                    selecionouBuffet1 = false;
                    selecionouBuffet2 = false;
                    selecionouBuffet3 = false;
                    // Reinicia a cena atual
                    self.scene.restart();
                });
            }
        });

        function toggleTint(obj, selected) {
            if (selected) {
                obj.setTint(0x689efc); 
            } else {
                obj.clearTint();
            }
        }
    }
}

let pergunta1 = new Pergunta('pergunta1', 1, 'Fase4/assets/telaFundo.png', 'Fase4/assets/pergunta1.png', 'Fase4/assets/1.png', 'Fase4/assets/2.png', 'Fase4/assets/3.png', 'Fase4/assets/4.png', 'Fase4/assets/feedbackAcerto.png', 'Fase4/assets/feedbackErro.png', 'A', 'pergunta2');

export default pergunta1;

export let pergunta2 = new Pergunta('pergunta2', 2, 'Fase4/assets/telaFundo.png', 'Fase4/assets/pergunta2.png', 'Fase4/assets/5.png', 'Fase4/assets/6.png', 'Fase4/assets/7.png', 'Fase4/assets/8.png', 'Fase4/assets/feedbackAcerto.png', 'Fase4/assets/feedbackErro.png','B', 'pergunta3');

export let pergunta3 = new Pergunta('pergunta3', 3, 'Fase4/assets/telaFundo.png', 'Fase4/assets/pergunta3.png', 'Fase4/assets/9.png', 'Fase4/assets/10.png', 'Fase4/assets/11.png', 'Fase4/assets/12.png', 'Fase4/assets/feedbackAcerto.png', 'Fase4/assets/feedbackErro.png','D', 'pergunta4');
export let pergunta4 = new Pergunta('pergunta4', 4, 'Fase4/assets/telaFundo.png', 'Fase4/assets/pergunta4.png', 'Fase4/assets/13.png', 'Fase4/assets/14.png', 'Fase4/assets/15.png', 'Fase4/assets/16.png', 'Fase4/assets/feedbackAcerto.png', 'Fase4/assets/feedbackErro.png','C', 'pergunta5');
export let pergunta5 = new Pergunta('pergunta5', 5, 'Fase4/assets/telaFundo.png', 'Fase4/assets/pergunta5.png', 'Fase4/assets/17.png', 'Fase4/assets/18.png', 'Fase4/assets/19.png', 'Fase4/assets/20.png', 'Fase4/assets/feedbackAcerto.png', 'Fase4/assets/feedbackErro.png','B', 'carregarFormulario');

export let respostaGourmet = new Respostas('resposta1', 1, 'Fase4/assets/respostasFormulario2.png');
export let respostaMetaville = new Respostas('resposta2', 2, 'Fase4/assets/respostasFormulario1.png');
export let respostaSabor = new Respostas('resposta3', 3, 'Fase4/assets/respostasFormulario3.png');
