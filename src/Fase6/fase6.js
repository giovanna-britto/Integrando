export default class Fase6 extends Phaser.Scene{

    constructor(){
        super({ key: "Fase6" });
    }

    preload(){
        //Carrega os assets
        this.load.image("fundo6", "../../assets/fase6/Tela.png");
        this.load.image("botaoX", "../../assets/fase6/x.png");
        this.load.image("heart", "../../assets/fase6/coraçãolike.png");
        this.load.image("metaville", "../../assets/fase6/1.png");
        this.load.image("saborville", "../../assets/fase6/4.png");
        this.load.image("seta", "../../assets/fase6/seta.png");
        this.load.image("erro", "../../assets/fase6/feedbackErro.png");
        this.load.image("tryagain", "../../assets/fase6/tryagain.png");
        this.load.image("acerto", "../../assets/fase6/feedbackAcerto.png");
        this.load.image("proximaFase", "../../assets/fase6/proximaFase.png");
    }

    create(){

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Adiciona a imagem de fundo
        this.fundo = this.add.image(width/2, height/2, "fundo6");
        let scaleX = width / this.fundo.width;
        let scaleY = height / this.fundo.height;
        let scale = Math.max( scaleX, scaleY );
        this.fundo.setScale(scale).setScrollFactor(0);

        // Adiciona os sprites dos buffets (opções) e define o selecionado como "metaville"
        this.metaville = this.add.image(width/2, height/2 + 50, "metaville").setScale(2);
        this.saborville = this.add.image(width/2, height/2 + 50, "saborville")
            .setScale(2)
            .setVisible(false);
        
        this.selected = this.metaville;

        //Adiciona os botões
        this.likeButton = this.add.image(width-600, height/2 + 50, "heart")
            .setScale(3)
            .setInteractive({ useHandCursor: true });
        
        this.botaoX = this.add.image(600, height/2 + 50, "botaoX")
            .setScale(3)
            .setInteractive({ useHandCursor: true });
             
        this.setaDireita = this.add.image(width/2 + 135, height - 130, "seta")
            .setScale(10)
            .setInteractive({ useHandCursor: true });
        
        this.setaEsquerda = this.add.image(width/2 - 135, height - 130, "seta")
            .setScale(10)
            .setFlipX(true)
            .setInteractive({ useHandCursor: true });
        
         // Define as ações a serem executadas quando os botões são clicados
        this.likeButton.on('pointerdown', () => {
            this.interactiveImages.forEach(obj => obj.disableInteractive());
            if(this.selected == this.metaville){

                // Mostra a mensagem de acerto e o botão para a próxima fase
                this.telaAcerto = this.add.image(width/2, height/2, "acerto");
                this.proximafase = this.add.image(width/2, height/2 + 250, "proximaFase")
                    .setScale(2)
                    .setInteractive({ useHandCursor: true });

                    // Define a ação para o botão da próxima fase
                this.proximafase.on('pointerdown', () => {

                    // Define a próxima fase no registro do jogo e inicia a cena correspondente
                    this.registry.set("Fase", { fase: 7});
                    this.scene.start("Tribunal")
                })
            }else{

                // Mostra a mensagem de erro e o botão para tentar novamente
                this.telaErro = this.add.image(width/2, height/2, "erro");
                this.tryagainButton = this.add.image(width/2, height/2 + 250, "tryagain")
                    .setScale(2)
                    .setInteractive({ useHandCursor: true });

                // Define a ação para o botão de tentar novamente
                this.tryagainButton.on('pointerdown', () => {

                    // Remove a mensagem de erro e reabilita a interação com os elementos interativos
                    this.telaErro.destroy();
                    this.tryagainButton.destroy();
                    this.interactiveImages.forEach(obj => obj.setInteractive());
                })
            }
        })

        this.botaoX.on('pointerdown', () =>{

            // Desabilita a interação com todos os elementos interativos
            this.interactiveImages.forEach(obj => obj.disableInteractive());

            // Verifica se o buffet selecionado é o correto
            if(this.selected == this.metaville){

                // Mostra a imagem de erro e o botão "Tentar Novamente"
                this.telaErro = this.add.image(width/2, height/2, "erro");
                this.tryagainButton = this.add.image(width/2, height/2 + 250, "tryagain")
                    .setScale(2)
                    .setInteractive({ useHandCursor: true });

                // Define a ação do botão "Tentar Novamente"
                this.tryagainButton.on('pointerdown', () => {

                    // Remove a tela de erro e o botão "Tentar Novamente"
                    this.telaErro.destroy();
                    this.tryagainButton.destroy();

                    // Reabilita a interação com os elementos
                    this.interactiveImages.forEach(obj => obj.setInteractive());
                })
            }else if(this.selected == this.saborville){

                // Mostra a imagem de acerto e o botão "Próxima Fase"
                this.telaAcerto = this.add.image(width/2, height/2, "acerto");
                this.proximafase = this.add.image(width/2, height/2 + 250, "proximaFase")
                    .setScale(2)
                    .setInteractive({ useHandCursor: true });

                // Define a ação do botão "Próxima Fase"
                this.proximafase.on('pointerdown', () => {

                    // Define a próxima fase e inicia a cena correspondente
                    this.registry.set("Fase", { fase: 7});
                    this.scene.start("Tribunal")
                })
            }
        })

        
        // Define a ação do botão para avançar para a próxima fase
        this.setaDireita.on('pointerdown', () => {

            // Alterna entre as imagens dos buffets
            if(this.selected == this.metaville){
                this.metaville.setVisible(false);
                this.saborville.setVisible(true);
                this.selected = this.saborville;
            }else{
                this.metaville.setVisible(true);
                this.saborville.setVisible(false);
                this.selected = this.metaville;
            }
        });

        // Define a ação do botão para voltar para a fase anterior 
        this.setaEsquerda.on('pointerdown', () => {

            // Alterna entre as imagens dos buffets 
            if(this.selected == this.metaville){
                this.metaville.setVisible(false);
                this.saborville.setVisible(true);
                this.selected = this.saborville;
            }else{
                this.metaville.setVisible(true);
                this.saborville.setVisible(false);
                this.selected = this.metaville;
            }
        });

        // Define os elementos interativos da cena
        this.interactiveImages = [this.likeButton, this.botaoX, this.setaDireita, this.setaEsquerda];
        
    }

    

}