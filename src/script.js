import Cidade from "./scenes/CityScene.js";
import Escritorio from "./scenes/OfficeScene.js";
import Tribunal from "./scenes/CourtScene.js";
import Banco from "./scenes/BankScene.js";
import Buffet1 from "./scenes/Buffet1Scene.js";
import Buffet2 from "./scenes/Buffet2Scene.js";
import Buffet3 from "./scenes/Buffet3Scene.js";
import Buffet4 from "./scenes/Buffet4Scene.js";
import TelaInicial from "./scenes/IntroductionScene.js";
import Loading from "./scenes/LoadingScene.js";
import Carousel from "./components/carousel.js";
import Fase1, { Fase1Tela2 } from "./Fase1/fase1.js";
// import Tutorial from './components/Tutorial.js';
import Fase2 from "./Fase2/fase2.js";
import Fase8 from "./Fase8/fase8.js";
import Fase8TelaConceito from "./Fase8/fase8Conceito.js";
import Fase8TelaInformacoes from "./Fase8/fase8Informacoes.js";
import Festa from "./scenes/PartyScene.js";
import Fase3 from "./Fase3/Fase3.js";
import pergunta1, { pergunta2, pergunta3, pergunta4, pergunta5, Formulario, respostaGourmet, respostaMetaville, respostaSabor, verRespostas, EscolherBuffet } from "./Fase4/fase4.js";
import Fase5 from "./Fase5/fase5.js";
import Fase7 from "./Fase7/fase7.js";

var config = {
  pixelArt: true,
  type: Phaser.AUTO,  
  width: innerWidth,
  height: innerHeight,

  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  
  scene: [
    TelaInicial,
    Carousel,
    Loading,
    Cidade, Escritorio, Tribunal, Banco,
    Buffet1, Buffet2, Buffet3, Buffet4,
    Fase1, Fase1Tela2,
    Fase2,
    Fase3,
    pergunta1, pergunta2, pergunta3, pergunta4, pergunta5,
    respostaGourmet, respostaMetaville, respostaSabor,
    Formulario, verRespostas, EscolherBuffet,
    Fase5,
    Fase7,
    Fase8, Fase8TelaConceito, Fase8TelaInformacoes,
    Festa,
  ]
};
//Adicionamos aqui algumas variáveis que nos permitirá adicionar novos elementos ao jogo
//Incluindo também uma variável que guardará as configurações phaser

var game = new Phaser.Game(config);
