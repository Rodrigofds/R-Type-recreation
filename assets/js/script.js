const playerShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const enemiesImg = ['assets/img/monster-1.png', 'assets/img/monster-2.png', 'assets/img/monster-3.png' ];
const instructionsText = document.querySelector('.game-instructions');
const startButton = document.querySelector('.start-button');
let enemyInterval;

// Controla o movimento e ação de tiro da nave.
function toMove(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    } else if(event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
    } else if(event.key === " ") {
        event.preventDefault();
        toShoot();
    }
}

//função de subir
function moveUp() {
    let topPosition = getComputedStyle(playerShip).getPropertyValue('top');
    if(topPosition === "0px") {
        return
    } else {
        let position = parseInt(topPosition);
        position -= 50;
        playerShip.style.top = `${position}px`;
    }
}

// Mover para cima
function moveDown() {
    let topPosition = getComputedStyle(playerShip).getPropertyValue('top');
    if(topPosition === "510px"){
        return
    } else {
        let position = parseInt(topPosition);
        position += 50;
        playerShip.style.top = `${position}px`;
    }
}

// Mover para baixo
function toShoot() {
    let shoot = createshootElement();
    playArea.appendChild(shoot);
    moveshoot(shoot);
}

function createshootElement() {
    let xPosition = parseInt(window.getComputedStyle(playerShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(playerShip).getPropertyValue('top'));
    let newShoot = document.createElement('img');
    newShoot.src = 'assets/img/shoot1.png';
    newShoot.classList.add('shoot');
    newShoot.style.left = `${xPosition}px`;
    newShoot.style.top = `${yPosition - 10}px`;
    return newShoot;
}

function moveShoot(shoot) {
    let shootInterval = setInterval(() => {
        let xPosition = parseInt(shoot.style.left);
        let enemies = document.querySelectorAll('.enemy');

        enemies.forEach((enemy) => {
            if(checkshootCollision(shoot, enemy)) {
                enemy.src = 'img/explosion.png';
                enemy.classList.remove('enemy');
                enemy.classList.add('dead-enemy');
            }
        })

        if(xPosition === 340) {
            shoot.remove();
        } else {
            shoot.style.left = `${xPosition + 8}px`;
        }
    }, 10);
}

// Cria inimigos aleatórios
function createEnemies() {
    let newEnemy = document.createElement('img');
    let enemySprite = enemiesImg[Math.floor(Math.random() * enemiesImg.length)];
    newEnemy.src = enemySprite;
    newEnemy.classList.add('enemy');
    newEnemy.classList.add('enemy-transition');
    newEnemy.style.left = '370px';
    newEnemy.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newEnemy);
    moveenemy(newEnemy);
}

// Movimento dos inimigos
function moveEnemy(enemy) {
    let moveEnemyInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue('left'));
        if(xPosition <= 50) {
            if(Array.from(enemy.classList).includes('dead-enemy')) {
                enemy.remove();
            } else {
                gameOver();
            }
        } else {
            enemy.style.left = `${xPosition - 4}px`;
        }
    }, 30);
}

// Colisão do tiro
function checkshootCollision(shoot, enemy) {
    let shootTop = parseInt(shoot.style.top);
    let shootLeft = parseInt(shoot.style.left);
    let shootBottom = shootTop - 20;
    let enemyTop = parseInt(enemy.style.top);
    let enemyLeft = parseInt(enemy.style.left);
    let enemyBottom = enemyTop - 30;
    if(shootLeft != 340 && shootLeft + 40 >= enemyLeft) {
        if(shootTop <= enemyTop && shootTop >= enemyBottom) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}


startButton.addEventListener('click', (event) => {
    startGame();
})

// Inicia o jogo
function startGame() {
    startButton.style.display = 'none';
    instructionsText.style.display = 'none';
    window.addEventListener('keydown', toMove);
    enemyInterval = setInterval(() => {
        createEnemies();
    }, 2000);
}

// Fim do Jogo
function gameOver() {
    window.removeEventListener('keydown', toMove);
    clearInterval(enemyInterval);
    let enemies = document.querySelectorAll('.enemy');
    enemies.forEach((enemy) => enemy.remove());
    let shoots = document.querySelectorAll('.shoot');
    shoots.forEach((shoot) => shoot.remove());
    setTimeout(() => {
        alert('game over!');
        playerShip.style.top = "250px";
        startButton.style.display = "block";
        instructionsText.style.display = "block";
    });
}