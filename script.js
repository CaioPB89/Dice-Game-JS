"use strict";

// Projeto 3
/*
Rode um dado que adiciona o seu valor a sua pontuação. 
Caso sai um 1, toda a pontuação que não foi adicionada a score do jogador é zerada e a rodada do jogador acaba.
*/

// Dado roda -> variavel recebe o valor -> current é atualizado com valor -> ao se apertar segurar, posição da array = variavel ->
// pontuação superior = valor do array.

// Selecionando elementos
const player0El = document.querySelector(".player--0"); // Classe HTML do jogador ( Parte da tela do jogador )
const player1El = document.querySelector(".player--1"); // Classe HTML do jogador

const score0El = document.querySelector("#score--0"); // # para IDs  ( Pontuação atual, superior)
const score1El = document.getElementById("score--1"); // getElementById não necessita de #

const diceEl = document.querySelector(".dice"); // Elemento dado

const current0El = document.getElementById("current--0"); // Valor Pontos do jogador ( Pontuação momentanea, inferior)
const current1El = document.getElementById("current--1"); // Valor Pontos do jogador

// Criando as variaveis globais
let scores, currentScore, activePlayer, playing; // As variaveis devem ser globais, a função deve apenas modifica-las.

// Os 3 botões
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Função com os valores inicializadores
function init() {
  // Zerar valores e esconder dado

  // Se as variaveis fossem criadas aqui, elas não funcionariam no codigo. Então, se declara elas fora e adiciona um valor aqui.
  scores = [0, 0]; // Pontuações zeradas
  currentScore = 0; // Isso é a pontuação que terá o valor do dado adicionado
  activePlayer = 0; // Qual o jogador? Começa no player 0
  playing = true;

  document.querySelector(`.player--0`).classList.remove("player--winner"); // Remove o CSS dos jogadores
  document.querySelector(`.player--1`).classList.remove("player--winner");
  document.querySelector(`.player--0`).classList.add("player--active"); // Inicia no jogador 0
  document.querySelector(`.player--1`).classList.remove("player--active");

  score0El.textContent = 0; // Zera pontuação superior
  score1El.textContent = 0;
  current0El.textContent = 0; // Zera pontuação inferior
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
}

// Função de troca de jogador
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // Altera a pontuação na tela para 0
  activePlayer = activePlayer === 0 ? 1 : 0; // Se for player 0, altera para 1 e vice-versa
  currentScore = 0; // Altera a variavel para 0

  player0El.classList.toggle("player--active"); // toggle adiciona a classe se não existir, se já existir, ele remove
  player1El.classList.toggle("player--active");
}
init();

// Rodando o dado
btnRoll.addEventListener("click", function () {
  // Se estiver jogando, o botão faz algo. Se não estiver jogando, ele não faz nada
  if (playing) {
    // Deve gerar um int entre 1 e 6 e fazer o display da imagem do dado.
    // Checar se saiu um 1 e se for true, o jogador perde a vez
    const dice = Math.trunc(Math.random() * 6) + 1; // Gerando numero. Deve ser entre 1 e 6, então remover decimal e adicionar 1.
    diceEl.classList.remove("hidden"); // Removendo o esconder do dado
    diceEl.src = `dice-${dice}.png`; // .src para mudar o elemento fonte de uma imagem. Uso de template literal para dinamicamente mudar a imagem
    if (dice !== 1) {
      // Adicionar o dado a pontuação
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // Dinamicamente atribui ao elemento do jogador atual
    } else {
      // Trocando de jogador
      document.querySelector(".gota1").play();
      switchPlayer();
    }
  }
});

// Botão guardar
btnHold.addEventListener("click", function () {
  // Se estiver jogando, o botão faz algo. Se não estiver jogando, ele não faz nada
  if (playing) {
    // colocar valor na pontuação do jogador ativo.
    // Checar de pontuação é >= 100. Se sim, fim do jogo. Senão, passa para outro player.
    scores[activePlayer] += currentScore; // Na array, player 0 = posição 0 e player 1 = posição 1
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; // Pontuação de player x = pontuação da array na posição x

    // Checando pontuação
    if (scores[activePlayer] >= 50) {
      document.querySelector(".victory").play();
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active"); // Remove o elemento de jogador ativo
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner"); // Adiciona o elemento de jogador vencedor
    } else {
      // Trocando de jogador, mudando a score para 0, mudando a variavel JS de pontuação para 0 e dando toggle no elemento CSS
      switchPlayer();
    }
  }
});

// Botão Novo Jogo
btnNew.addEventListener("click", init);
// Chama a função inicial para alterar os valores para o inicial.
