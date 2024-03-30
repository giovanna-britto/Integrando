export default class Dialogo extends Phaser.GameObjects.Container { // define a classe chamada Dialogo que estende a classe Container
   // define o construtor da classe, aceitando os parâmetros scene, dialogue, spriteKey e charName
    constructor(scene, dialogue, spriteKey, charName) { 

        // Chama o construtor da classe pai com a cena fornecida
        super(scene);

        // Inicializa as variáveis da instância da classe
        this.dialogue = dialogue;
        this.spriteKey = spriteKey;
        this.charName = charName;

        // Define a largura e a altura da tela da câmera principal da cena
        this.width = this.scene.cameras.main.width;
        this.height = this.scene.cameras.main.height;
        this.i = 0; //Índice usado para acompanhar o progresso do diálogo
    }

   //Método para mostrar visualmente os elementos do diálogo 
    createDialogue(scene = this.scene) {

        //Divide o diálogo em substrings para o comprimento do diálogo não se extender muito
        this.substrings = this.splitDialogue();
        
        //Define o estilo do diálogo    
        this.dialogueStyle = {
            fontSize: "24px",
            color: "#0668E1"
        }
        
        //Cria um objeto do texto com a posição definida
        this.texto = scene.add.text(this.scene.cameras.main.width/2, this.scene.cameras.main.height - 100, this.substrings[0], this.dialogueStyle).setOrigin(0.5);
        //Cria uma caixa de diaálogo
        this.box = scene.add.image(this.width/2, this.height - 100, "dialogueBox").setScale(this.texto.width/1500, this.texto.height/200);
        this.box.depth = -2;//Defini a profundidade da caixa de diálogo

        const boxBounds = this.box.getBounds();//Obtém o limite da caixa de diálogo

        // Cria um sprite do personagem na posição específica em relação à caixa de diálogo
        this.imagem = scene.add.sprite(this.box.x - this.texto.width*.7, this.texto.y + 50, this.spriteKey);
        
        // Cria um texto com o nome do personagem acima da caixa de diálogo
        this.nome = scene.add.text(this.texto.x, this.texto.y - 40, this.charName, { fontSize: "20px", color: "#0668E1" }).setOrigin(0.5);
        
        // Define um listener de evento para a tecla de espaço, que avança para o próximo pedaço do diálogo
        this.scene.input.keyboard.on('keydown-SPACE', this.changeDialogueText, this);
    }

     // Método para avançar para o próximo pedaço do diálogo
    changeDialogueText(scene = this.scene){  
        if(this.i < this.substrings.length){
            this.i++;
            this.texto.setText(this.substrings[this.i]);
        }else{
            this.deleteDialogue();
            this.i = 0.;
        }
    }
    // Método para remover os elementos visuais do diálogo
    deleteDialogue(){
        this.box.destroy();
        this.texto.destroy();
        this.imagem.destroy();
        this.nome.destroy();
    }
    // Método para dividir o diálogo em substrings com um comprimento máximo
    splitDialogue() {
        const dialogue = this.dialogue;
        const maxLength = 40; // Comprimento máximo de cada linha do diálogo
        const words = dialogue.split(' ');
        let substrings = [];
        let currentString = '';
    
        for (let i = 0; i < words.length; i++) {
            if (currentString.length + words[i].length < maxLength) { // Verifica se a próxima palavra cabe na linha atual
                if (currentString.length > 0) {
                    currentString += ' ';
                }
                currentString += words[i]; // Adiciona a palavra à linha atual
            } else {
                substrings.push(currentString.trim()); // Adiciona a linha atual às substrings
                currentString = words[i]; // Inicia uma nova linha com a palavra atual
            }
        }
    
        if (currentString) {
            substrings.push(currentString.trim()); // Adiciona a última linha, se houver
        
        }
    
        return substrings; // Retorna as substrings do diálogo
    }


    
}