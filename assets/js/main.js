const playerShip = document.querySelector('.player-shooter');
const playArea = document.querySelector('#main-player-area');

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
    
}

window.addEventListener('keydown', toMove);