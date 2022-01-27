const playerShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-play-area');

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

window.addEventListener('keydown', toMove);