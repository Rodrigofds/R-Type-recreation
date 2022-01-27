const playerShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');
const enemiesImg = ['./img/monster-1.png', './img/monster-2.png', './img/monster-3.png' ];

// Controla o movimento e ação de tiro da nave.
function toMove(event){
    
    if(event.key === 'ArrowUp'){
        event.preventDefault();
        moveUp();
    }else if(event.key === 'ArrowDown'){
        event.preventDefault();
        moveDown();
    }else if(event.key === " "){
        event.preventDefault();
        toShoot();
    }
}

// Mover para cima
function moveUp(){
    let topPosition = getComputedStyle(playerShip).getPropertyValue('top');
    
    if(topPosition === "0px"){
        return;
    }else{
        let position = parseInt(topPosition);
        position -= 20;
        playerShip.style.top = `${position}px`;
    }
}

// Mover para baixo
function moveDown(){
    let topPosition = getComputedStyle(playerShip).getPropertyValue('top');
    
    if(topPosition === "557px"){
        return;
    }else{
        let position = parseInt(topPosition);
        position += 20;
        playerShip.style.top = `${position}px`;
    }
}

function toShoot(){
    let shoot = createrShootElement();
    
    playArea.appendChild(shoot);
    moveShoot(shoot);    
}

function createrShootElement(){
    let xPosition = parseInt(window.getComputedStyle(playerShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(playerShip).getPropertyValue('top'));
    let newShoot = document.createElement('img');
    
    newShoot.src = 'assets/img/shoot1.png';
    newShoot.classList.add('shoot');
    newShoot.style.left = `${xPosition}px`;
    newShoot.style.top = `${yPosition - 3}px`;

    return newShoot;
}

function moveShoot(shoot){
    let shootInterval = setInterval(() => {
        let xPosition = parseInt(shoot.style.left);

        if(xPosition === 380){
            shoot.remove();
        } else {
            shoot.style.left = `${xPosition + 8}px`;
        }
            
    }, 15);
}

function createEnemies(){
    let newEnemy = document.createElement('img');
    let enemySprite = enemiesImg[Math.floor(Math.random() * enemiesImg.length)];
    newEnemy.src = enemySprite;
    newEnemy.classList.add('enemy');
    newEnemy.classList.add('enemy-transition');
    newEnemy.style.left = '370px';
    newEnemy.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
    playArea.appendChild(newEnemy);
    moveEnemy(newEnemy);
}

window.addEventListener('keydown', toMove);