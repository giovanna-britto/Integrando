export default class Fase9tela1 extends Phaser.Scene {
    constructor() {
        super({ key: "Fase9tela1" });
    }

    // Carregando as assets
    preload() {
        this.load.image('botao_1', '../../assets/fase9/botao1.png');
        this.load.image('botao_4', '../../assets/fase9/botao4.png');
        this.load.image('tela_1', '../../assets/fase9/1.png');
        
        // Carrega a fonte pixelada
        this.load.bitmapFont('pixelFont', 'path/to/font.png', 'path/to/font.xml');
    }

    // Dentro do método create() da classe Fase9
    create() {
        // Adiciona a imagem da tela_1
        this.add.image(window.innerWidth / 2, window.innerHeight / 2 + 45, 'tela_1');

        // Adiciona as imagens dos botões
        this.add.image(1130, 520, 'botao_1').setScale(2.6);
        this.add.image(1000, 690, 'botao_1').setScale(2.6);
        this.add.image(1000, 870, 'botao_1').setScale(2.6);
        const botao4 = this.add.image(1680, 800, 'botao_4').setScale(2.5);

        // Adiciona um evento de clique ao botao_4
        botao4.setInteractive({ useHandCursor: true });
        botao4.on('pointerdown', () => {
            // Verifica os valores das caixas de texto
            const valor1 = document.querySelector('input[name="inputElement1"]').value;
            const valor2 = document.querySelector('input[name="inputElement2"]').value;
            const valor3 = document.querySelector('input[name="inputElement3"]').value;

            // Verifica se os valores são os esperados
            if (valor1 === '4321' && valor2 === '20042021' && valor3 === '1750') {
                this.cameras.main.fadeOut(500); // Adiciona uma transição fadeout de 500ms
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    this.scene.start('Fase9tela2'); // Inicia a Fase9tela2 após a transição completar
                });
            } else {
                this.cameras.main.fadeOut(500); // Adiciona uma transição fadeout de 500ms
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                    this.scene.start('Fase9tela3'); // Inicia a Fase9tela3 após a transição completar
                });
            }
        });

        // Adiciona as caixas de texto
        this.addInputText('inputElement1', '37%', '48%');
        this.addInputText('inputElement2', '30%', '67%');
        this.addInputText('inputElement3', '30%', '87%');

        // Destruir as caixas de diálogo ao sair da cena
        this.events.once('shutdown', () => {
            document.querySelector('input[name="inputElement1"]').remove();
            document.querySelector('input[name="inputElement2"]').remove();
            document.querySelector('input[name="inputElement3"]').remove();
        });
    }

    // Método para adicionar uma caixa de texto
    addInputText(name, left, top) {
        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.name = name;
        inputElement.placeholder = "Digite aqui";
        inputElement.style.position = "absolute";
        inputElement.style.left = left; // Posição X relativa à tela
        inputElement.style.top = top; // Posição Y relativa à tela
        inputElement.style.width = "42%"; // Largura da caixa de texto
        inputElement.style.height = "5%"; // Altura da caixa de texto
        inputElement.style.backgroundColor = "transparent"; // Torna o fundo transparente
        inputElement.style.border = "none"; // Remove a borda
        // Remove a borda quando a caixa de texto está em foco
        inputElement.style.outline = "none";
        // Define a fonte pixelada
        inputElement.style.fontFamily = "pixelFont";
        // Aumenta o tamanho da letra do texto dentro da caixa de texto
        inputElement.style.fontSize = "40px"; // Defina o tamanho desejado em pixels
        document.body.appendChild(inputElement);
    }
}

//Tela 2
export class Fase9tela2 extends Phaser.Scene {
    constructor() {
        super({ key: "Fase9tela2" });
    }
  
    // Carregando as assets
    preload() {
        this.load.image('botao_2', '../../assets/fase9/botao2.png');;
        this.load.image('tela_2', '../../assets/fase9/2.png');
        this.load.image('tela_3', '../../assets/fase9/3.png');
    }
  
    // Dentro do método create() da classe Fase9
    create() {
        // Adiciona a imagem da tela_2
        const tela = this.add.image(window.innerWidth / 2 , window.innerHeight / 2, 'tela_2');
        
        // Adiciona as imagens dos botões
        const botao2 = this.add.image(920, 835, 'botao_2').setScale(0.6);

        // Adiciona um evento de clique ao botao_2
        botao2.setInteractive({useHandCursor: true});
        botao2.on('pointerdown', () => {
            // Finaliza a fase
            this.registry.set("Fase", { fase: 10 });
            this.scene.start("Fase10");
        });
    }
}

//Tela 3
export class Fase9tela3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Fase9tela3' });
    }
  
    // Carregando as assets
    preload() {
        this.load.image('botao_3', '../../assets/fase9/botao3.png');
        this.load.image('tela_3', '../../assets/fase9/3.png');
    }
  
    // Dentro do método create()
    create() {
        // Adiciona a imagem da tela_3
        this.add.image(window.innerWidth / 2 - 1, window.innerHeight / 2 + 45, 'tela_3');
        
        // Adiciona as imagens dos botões
        const botao3 = this.add.image(922, 800, 'botao_3').setScale(0.7);
        
        // Adiciona um evento de clique ao botao_3
        botao3.setInteractive({useHandCursor: true});
        botao3.on('pointerdown', () => {
            // Inicia a fase9tela1
            this.scene.start('Fase9tela1');
        });
    }
}
