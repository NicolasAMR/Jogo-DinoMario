const mario = document.getElementById('mario');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const scoreDisplay = document.getElementById('score');
const gameOverMessage = document.getElementById('gameOverMessage');
const introCard = document.getElementById('introCard');

let isPlaying = false;
let score = 0;
let gameInterval;
let obstacleInterval;
let obstacle;
let specialEffectApplied = false;
let obstacle2;
let obstacle2Interval;


function startGame() {
    introCard.style.display = 'none';  // Esconde o card explicativo
    isPlaying = true;
    score = 0;
    scoreDisplay.textContent = score;
    startBtn.style.display = 'none';
    restartBtn.style.display = 'none';
  
    spawnObstacle(); // Primeiro obstáculo
  
    document.addEventListener('DOMContentLoaded', () => {
      displayHighScore(); // Mostra o recorde ao carregar a página
  });

    gameInterval = setInterval(updateGame, 20);
  }

  function restartGame() {
    const gameOverMessage = document.getElementById('gameOverMessage');
    gameOverMessage.style.display = 'none'; // Oculta a mensagem
    location.reload(); // Reinicia a página para começar novamente
  }  

  function spawnObstacle() {
    obstacle = document.createElement('div');
    obstacle.classList.add('obstaculo');
    document.querySelector('.game-container').appendChild(obstacle);
  
    let obstaclePosition = 2000; // Inicia o obstáculo a partir de um ponto fixo à direita da tela
    obstacle.style.left = `${obstaclePosition}px`;
  
    let speed = 40; // Velocidade inicial
  
    obstacleInterval = setInterval(() => {
      if (obstaclePosition < -30) {
        obstaclePosition = 1800; // Reseta a posição do obstáculo
        score += 5;
        scoreDisplay.textContent = score;
  
        // Ativa o efeito especial a cada 30 pontos
        if (score % 30 === 0) {
          activateSpecialEffect();
        }

        // Aumenta a velocidade a cada 100 pontos
        if (score % 100 === 0) {
          speed += 2; // Aumenta a velocidade a cada 100 pontos
          activateSpecialEffectRed();
        }
      }
      obstaclePosition -= speed; // Usa a variável de velocidade
      obstacle.style.left = `${obstaclePosition}px`;
      checkCollision();
    }, 20);
}



  function activateSpecialEffect() {
    // Garante que o efeito só seja aplicado uma vez para cada múltiplo de 20
    if (specialEffectApplied) return;
    specialEffectApplied = true;
  
    // Trocar o fundo para um efeito visual (exemplo)
    const gameContainer = document.querySelector('.game-container');
  
    // Adicionar um som especial
    const specialSound = new Audio('special.mp3');
    specialSound.play();
  
    // Adiciona a classe especial e remove a padrão
  gameContainer.classList.remove('default');
  gameContainer.classList.add('special');

  // Retorna ao estado padrão após 1 segundo
  setTimeout(() => {
    gameContainer.classList.remove('special');
    gameContainer.classList.add('default');
    specialEffectApplied = false;
  }, 800);

    mario.style.animation = 'flash 1s infinite';
    setTimeout(() => {
    mario.style.animation = ''; // Remove a animação após o efeito
    }, 500);
  }


  function activateSpecialEffectRed() {
    // Garante que o efeito só seja aplicado uma vez para cada múltiplo de 100
    if (specialEffectApplied) return;
    specialEffectApplied = true;
  
    // Trocar o fundo para o efeito visual vermelho
    const gameContainer = document.querySelector('.game-container');
  
    // Adicionar um som especial
    const specialSound = new Audio('special.mp3');
    specialSound.play();
  
    // Adiciona a classe especial vermelha
    gameContainer.classList.remove('default');
    gameContainer.classList.add('special-red');

    // Retorna ao estado padrão após 1 segundo
    setTimeout(() => {
        gameContainer.classList.remove('special-red');
        gameContainer.classList.add('default');
        specialEffectApplied = false;
    }, 800);

    mario.style.animation = 'flash 1s infinite';
    setTimeout(() => {
        mario.style.animation = ''; // Remove a animação após o efeito
    }, 500);
}
  

function checkCollision() {
  const marioRect = mario.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();
  if (
    marioRect.left < obstacleRect.left + obstacleRect.width &&
    marioRect.left + marioRect.width > obstacleRect.left &&
    marioRect.top < obstacleRect.top + obstacleRect.height &&
    marioRect.height + marioRect.top > obstacleRect.top
  ) {
    gameOver();
  }
}
  

function jump() {
  if (!mario.classList.contains('jump')) {
    playJumpSound();
    mario.classList.add('jump');
    setTimeout(() => {
      mario.classList.remove('jump');
    }, 500);
  }
}

function updateGame() {
    if (!isPlaying) return;
  }
  

function gameOver() {
    playGameOverSound();
    isPlaying = false;
    clearInterval(gameInterval);
    clearInterval(obstacleInterval);
  
    // Exibir a mensagem de "Game Over"
    const gameOverMessage = document.getElementById('gameOverMessage');
    gameOverMessage.style.display = 'block'; // Mostra a mensagem na tela
  
    restartBtn.style.display = 'inline'; // Mostra o botão de reiniciar
    saveHighScore(); // Salva o recorde, se aplicável
    document.querySelector('.game-over').style.display = 'block';
  }  
  

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); 
        jump();
    }
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);

function saveHighScore() {
  const highScore = parseInt(localStorage.getItem('highScore')) || 0;

  // Verifica se a pontuação atual é maior que o recorde
  if (score > highScore) {
      localStorage.setItem('highScore', score); // Salva o novo recorde no localStorage
      displayHighScore(); // Atualiza a exibição do recorde
  }
}

function displayHighScore() {
  const highScore = localStorage.getItem('highScore') || 0;
  const highScoreDisplay = document.getElementById('highScore');
  highScoreDisplay.textContent = `Recorde: ${highScore}`; // Atualiza o texto exibido
}

  