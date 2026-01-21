const phase = ["", "HOLD I", "HOLD II", "HOLD III", "HOLD IV", "PREPARE", "GO!"];

const phaseTxt = document.getElementById("stepText");
const lightsCont = document.getElementById("lights");

//kreiram svetla, semafore

const columns = [];
for(let i = 0; i < 5; i++){ //da se izvrti 5puta jer imamo 5 kolona
    const c = document.createElement("div");
    c.className = "column";

    const lights = []; //sad idu redovi
    for(let j = 0; j < 4; j++){
        const l = document.createElement("div");
        l.className = "light";

        c.appendChild(l);
        lights.push(l);

    }

    lightsCont.appendChild(c);
    columns.push(lights);
}

let step = 0;
let timer = null;
let mode = null;

function clear(){
    columns.flat().forEach(l =>{l.classList.remove("red", "green");}); //da sve pogasimo (da budu crni)
}

function stepClick() {
    clear();

    phaseTxt.textContent = phase[step];

    if(step >= 1 && step <= 5){
        for(let i = 0; i < step; i++){
            columns[i][2].classList.add("red");
            columns[i][3].classList.add("red");
        }
    }

    if (step === 6) {
        columns.forEach(col => {
          col[0].classList.add("green");
          col[1].classList.add("green");
        });
      }

}

function nextStep(){
    step++;

    if(step > 6){
        step = 0;
    }

    stepClick();
}

document.getElementById("manualBtn").onclick = () => {
    nextStep();
}