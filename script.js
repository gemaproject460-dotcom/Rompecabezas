/* ===== IMAGENES ===== */

const images = {

    fire:"bomberos.png",

    police:"policia.png", 

    ambulance:"ambulancia.png"

};

const titles = {

    fire: '<i class="fas fa-fire-extinguisher"></i> ROMPECABEZAS DE BOMBEROS',

    police: '<i class="fas fa-shield-halved"></i> ROMPECABEZAS DE POLICÍAS',

    ambulance: '<i class="fas fa-truck-medical"></i> ROMPECABEZAS DE AMBULANCIAS'

};

let currentImage = "";

const rows = 3;
const cols = 3;

const board =
document.getElementById("board");

const piecesContainer =
document.getElementById("piecesContainer");

const message =
document.getElementById("message");

let draggedPiece = null;
let correctPlaced = 0;

/* ===== INICIAR ===== */

function startGame(type){

    currentImage = images[type];

    document.getElementById("homeScreen").style.display = "none";

    document.getElementById("gameScreen").style.display = "block";

    document.getElementById("gameTitle").innerHTML = titles[type];

    createBoard();

    startTimer();

}

/* ===== VOLVER ===== */

function goHome(){

    document.getElementById(
    "homeScreen").style.display = "flex";

    document.getElementById(
    "gameScreen").style.display = "none";

    clearInterval(timer);

}

/* ===== TABLERO ===== */

function createBoard(){

    board.innerHTML = "";
    piecesContainer.innerHTML = "";
    message.innerHTML = "";
    correctPlaced = 0;

    let pieces = [];

    for(let r=0;r<rows;r++){

        for(let c=0;c<cols;c++){

            // PIEZA
            const piece =
            document.createElement("div");

            piece.classList.add("piece");

            piece.draggable = true;

            piece.dataset.correct =
            `${r}-${c}`;

            piece.style.backgroundImage =
            `url('${currentImage}')`;

            piece.style.backgroundSize =
            `${cols*100}% ${rows*100}%`;

            piece.style.backgroundPosition =
            `${(c/(cols-1))*100}% ${(r/(rows-1))*100}%`;

            piece.addEventListener(
            "dragstart", ()=>{

                draggedPiece = piece;

            });

            pieces.push(piece);

            // CELDA
            const cell =
            document.createElement("div");

            cell.classList.add("cell");

            cell.dataset.position =
            `${r}-${c}`;

            cell.addEventListener(
            "dragover",(e)=>{

                e.preventDefault();

            });

            // SOLTAR
            cell.addEventListener(
            "drop",()=>{

                if(cell.children.length===0){

                    cell.appendChild(
                    draggedPiece);

                    // CORRECTA
                    if(
                    draggedPiece.dataset.correct
                    === cell.dataset.position
                    ){

                        cell.classList.add(
                        "correct");

                        message.innerHTML =
                        '<i class="fas fa-circle-check"> </i> ¡Muy bien!';

                        message.style.color =
                        "#00a000";

                        correctPlaced++;

                        // GANAR
                        if(correctPlaced === rows*cols){

                            clearInterval(timer);

                            message.innerHTML =
                           '<i class="fas fa-trophy"></i>¡MISIÓN COMPLETADA! <i class="fas fa-trophy"></i>';

                            message.style.color =
                            "#ff7b00";

                        }

                    }

                    // INCORRECTA
                    else{

                        cell.style.border =
                        "5px solid red";

                        message.innerHTML =
                        '<i class="fas fa-circle-xmark"></i> Esa pieza no va ahí';

                        message.style.color =
                        "red";

                        setTimeout(()=>{

                            piecesContainer
                            .appendChild(
                            draggedPiece);

                            cell.style.border =
                            "none";

                        },700);

                    }

                }

            });

            board.appendChild(cell);

        }

    }

    // MEZCLAR
    pieces.sort(()=>
    Math.random()-0.5);

    pieces.forEach(piece=>{

        piecesContainer
        .appendChild(piece);

    });

}

/* ===== TEMPORIZADOR ===== */

let timeLeft = 60;
let timer;

function startTimer(){

    clearInterval(timer);

    timeLeft = 60;

    updateTime();

    timer = setInterval(()=>{

        timeLeft--;

        updateTime();

        if(timeLeft <= 0){

            clearInterval(timer);

            message.innerHTML =
            '<i class="fas fa-circle-xmark"></i> ¡SE ACABÓ EL TIEMPO!';

            message.style.color =
            "red";

        }

    },1000);

}

function updateTime(){

    let minutes =
    String(Math.floor(
    timeLeft/60))
    .padStart(2,"0");

    let seconds =
    String(timeLeft%60)
    .padStart(2,"0");

    document.getElementById(
    "time").textContent =
    `${minutes}:${seconds}`;

}

/* ===== REINICIAR ===== */

function restartGame(){

    createBoard();

    startTimer();

}