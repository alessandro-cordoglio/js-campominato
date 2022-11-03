/* Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. */

"use strict"
/* VARIABLES */
/* variabili di supporto */
const board= document.querySelector("#board")
const start= document.getElementById("start")
let Arraybomb=[]
/* FUNCTIONS */
//funzione x creazione dei box
function createAndClickBox(cellnumber){
    let score= 0
    for (let i = 1; i <= cellnumber; i++) {
        const box= document.createElement("div")
        box.innerHTML= i
        box.classList.add("box")
        board.append(box)
        if (cellnumber===81) {
            box.classList.replace("box","box_normal");
        }else if (cellnumber===49) {
            box.classList.replace("box","box_hard");
        }
        box.addEventListener("click", function(){
            document.querySelector("#wlText").innerHTML=`Il tuo punteggio è <br>${score}`
            console.log(Arraybomb)
            if (Arraybomb.includes(i)) {
                box.style.backgroundColor="red"
                document.querySelector("#wlText").innerHTML=`HAI PERSO!<br> Il tuo punteggio è ${score}`
            }else{
                score ++
                box.classList.add("unclickable")
                box.style.backgroundColor="lightblue"
                console.log(i)
            }
        })
    }
}

//funzione creazione bombe
function randomBombGenerator(cellnumber) {
    let i = 0;
    while(Arraybomb.length<16){
       const random = (Math.floor(Math.random() * cellnumber )+1);   
        if (Arraybomb.includes(random)) {
            Arraybomb.splice(random)
        }else{
            Arraybomb.push(random);
            i++
        } 
      }
}

/* MAIN SCRIPT */
start.addEventListener("click", function(){
    const difficultyChoice= document.getElementById("difChoice").value
    document.querySelector("#start").disabled = true;
    //controllo della difficoltà
    if (difficultyChoice==="hard") {
        createAndClickBox(49)
        randomBombGenerator(49)
    }else if(difficultyChoice==="normal"){
        createAndClickBox(81)
        randomBombGenerator(81)
    }else if(difficultyChoice==="easy"){
        createAndClickBox(100)
        randomBombGenerator(100)
    }
});  

