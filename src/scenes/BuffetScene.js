// class Buffet extends Phaser.Scene {
//     constructor() {
//       super({ key: "Buffet" });
//     }

//     dadosBuffet;

//     // como receberia os dados de outra cena
//     // dados = { mapa: "mapa_buffet1", nomeInterior: "interiorBuffet1", posX: 100, posY: 100};
  
//     init(dados) {
//       this.dadosBuffet = dados;
//     }

//     preload() {
   
//         this.load.image("interior", "../../assets/Buffet1/buffet1.png");
        
//         this.load.tilemapTiledJSON(
//             "mapa_buffet1",
//             "../../assets/Buffet1/buffet1Bom1.json"
//         );  

//         this.load.spritesheet("player", '../../assets/jose_sprite-sheet.png',{

//             frameWidth: 34,
//             frameHeight: 64,
//         });


//     }

//     create(){

//         this.map = this.make.tilemap({ key: this.dadosBuffet.mapa });
//         this.cursors = this.input.keyboard.createCursorKeys();

//         this.tilesInterior = this.map.addTilesetImage("buffet1", this.dadosBuffet.nomeInterior);
    
          
//           this.chao = this.map.createLayer("chao", this.tilesInterior, 0, 0);
//           this.colisao = this.map.createLayer("colisao", this.tilesInterior, 0, 0);
//           // jeito antigo
//           // this.portalS1 = this.map.createLayer("portalS1", this.tilesInterior, 0, 0);

//           // para deixar genérico, é só botar o mesmo nome da camada para todos no Tiled, assim:
//           this.portalS = this.map.createLayer("portalS", this.tilesInterior, 0, 0);

//           this.colisao.setCollisionByProperty({ collider: true });
//           // this.portalS1.setCollisionByProperty({ collider: true });
//           this.portalS.setCollisionByProperty({ collider: true });


//           this.player = this.physics.add.sprite(450, 100, "player").setScale(1);

//           this.physics.add.collider(this.player, this.colisao);


//           this.physics.add.collider(
//             this.player,
//             // this.portalS1,
//             this.portalS,
//             () => {
//               this.scene.start("Cidade", { posX: this.dadosBuffet.posX, posY: this.dadosBuffet.posY });
//             },
//             null,
//             this
//           );
          

//           this.camera = this.cameras.main;
//           this.camera.startFollow(this.player);
//           this.camera.setBounds(
//             0,
//             0,
//             this.map.widthInPixels,
//             this.map.heightInPixels
//           );
//           this.camera.setZoom(1.7, 1.7);
        
//           }

//           update() {
//             if (this.cursors.left.isDown) {
//               this.player.setVelocityX(-250);
//               this.player.anims.play("andando_esquerda", true);
//             } else if (this.cursors.right.isDown) {
//               this.player.setVelocityX(250);
//               this.player.anims.play("andando_direita", true);
//             } else if (this.cursors.down.isDown) {
//               this.player.setVelocityY(250);
//               this.player.anims.play("andando_baixo", true);
//             } else if (this.cursors.up.isDown) {
//               this.player.setVelocityY(-250);
//               this.player.anims.play("andando_cima", true);
//             } else {
//               this.player.setVelocityX(0);
//               this.player.setVelocityY(0);
//               this.player.anims.stop();
//             }
//           }
//         }
        

    