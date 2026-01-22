const part = ["", "HOLD I", "HOLD II", "HOLD III", "HOLD IV", "PREPARE", "GO!"];

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

function clear(){
    columns.flat().forEach(l =>{l.classList.remove("red", "green");}); //da sve pogasim (da budu crni)
}

function stepClick() {
    clear(); //na pocetku sve gasim

    phaseTxt.textContent = part[step]; //ispisujem fazu na vrhu stranice

    if(step >= 1 && step <= 5){
        for(let i = 0; i < step; i++){
            columns[i][2].classList.add("red");
            columns[i][3].classList.add("red");
        }
    }

    if (step === 6) { //na 6. korak se pale gornja dva reda zeleno
        columns.forEach(col => {
          col[0].classList.add("green");
          col[1].classList.add("green");
        });
      }

}

function click(){
    step++;

    if(step > 6){
        step = 0;
    }

    stepClick();
}

let timer = null;
let mode = null;

function reset(){
    clearInterval(timer); //resetujem tajmer, da ne pamti prethodna izvrsavanja
    timer = null;
    mode = null;

    automaticBtn.textContent = "automatic stepping: off"; //stavljamo dugmice na off
    randomBtn.textContent = "random stepping: off";
}

document.getElementById("manualBtn").onclick = () => {
    reset();
    click();
}

function confirmDuration(){
    const dur = (document.getElementById("stepDuration")).value.trim(); //uzimam vrednost iz polja i uklanjam odmah razmake ako imaju ispred ili iza

    if(dur === "" || dur <= 0){
        alert("the step duration field must be filled with positive number!");
        return null;
    }

    return Number(dur); //pretvaram u broj

}

function auto(random = false){
    reset();

    const dur = confirmDuration();
    if(dur === null){
        return; //ako nema napisana vrednost izlazi iz funkcije
    }

    const duration = document.getElementById("stepDuration");
    if(random === true){
        mode = "random";
    }else {
        mode = "automatic";
    }

    //tekst na dugmicima
    if(automaticBtn.textContent = mode === "automatic"){
        automaticBtn.textContent = "automatic stepping: on";
    }else{
        automaticBtn.textContent = "automatic stepping: off";
    }

    if(randomBtn.textContent = mode === "random"){
        randomBtn.textContent = "random stepping: on";
    }else{
        randomBtn.textContent = "random stepping: off";
    }


    timer = setInterval(() => {
        if(mode === "random"){
            step = Math.floor(Math.random() * 7); //da uzme random broj od 0 do 6, 
        }else{
            click(); //ako nije u random fazi ide normalno od 0 do 6
        }

        stepClick(); //da bi se ispisalo

        if(step === 6){
            clearInterval(timer);
            setTimeout(() => {
                if(mode){
                    auto(mode === "random");
                }
            }, duration.value*2);
        }



    }, duration.value);
}

document.getElementById("automaticBtn").onclick = () => {
    if(mode === "automatic"){
        reset();
    }else{
        auto(false);
    }
}

document.getElementById("randomBtn").onclick = () => {
    if(mode === "random"){
        reset();
    }else{
        auto(true);
    }
}
