const countdownEl = document.getElementById(`countdown`)
//console.log(countdownEl);

const instructionsEl = document.getElementById(`instructions`)
//console.log(instructionsEl);

const numbersListEl = document.getElementById(`numbers-list`)
//console.log(numbersListEl);

const answersFormEl = document.getElementById(`answers-form`)
//console.log(answersFormEl);

const inputGroupEl = document.getElementById(`input-group`)
//console.log(inputGroupEl);

const inputElChildren = inputGroupEl.children
console.log(inputElChildren);

const buttonEl = document.querySelector(`.btn`)
//console.log(buttonEl);

const messageEl = document.getElementById(`message`)
//console.log(messageEl);

let seconds = 5; //5s for debugging, should be 30
const userNumbers = [];
const randomNumbers = [];
const correctNumbers = [];
//generate 5 numbers with math.random and show them in the ul

for (let i = 0; i < 5; i++) {
    randomNumbers[i] = Math.floor(Math.random() * 50)
    numbersListEl.insertAdjacentHTML('beforeend', `<li class="list-item" </li>${randomNumbers[i]}</li>\n`)
}
console.log(`these are the randomNumbers ${randomNumbers}`);

//30s countdown
const countdownTimer = setInterval(function () {
    seconds--;
    countdownEl.innerHTML = `${seconds} secondi rimanenti!`
    if (seconds == 1) {
        countdownEl.innerHTML = `${seconds} secondo rimanente!`
    } else if (seconds == 0) {
        //make numbers disappear
        hideOutput()
        //show the user numbers
        displayInputs()
        clearInterval(countdownTimer)
    }
}, 1000)
//get the inputs from the fields
buttonEl.addEventListener(`click`, getInputs)



//functions

//hide the randomnumbers
function hideOutput() {
    countdownEl.innerHTML = `${seconds} secondi rimanenti!`
    instructionsEl.innerText = "Ora indovina i numeri! Puoi scriverli in qualsiasi ordine!"
    numbersListEl.classList.add("d-none")
}

//show input fields

function displayInputs() {
    answersFormEl.classList.remove("d-none")
}

//get the inputs from the fields

function getInputs(e) {
    e.preventDefault()
    for (let i = 0; i < 5; i++) {
        if (isNaN(Number(inputElChildren[i].value)) != true) {
            userNumbers[i] = Number(inputElChildren[i].value)
        } else {
            alert(`input error in field ${i}, you must use numbers`)
        }

    }
    console.log(`these are the userNumbers   ${userNumbers}`);
    //check the values
    checkUserValues()
}
//check user inputs with original numbers

function checkUserValues() {

    for (let i = 0; i < 5; i++) {
        //console.log(`this is inside the loop but outside the if! i'm the index of the ${i} element! and this is the index! ${randomNumbers.indexOf(userNumbers[i])}`);
        if (randomNumbers.indexOf(userNumbers[i]) > -1) {
            //console.log(`i'm in the verified check loop! and this is the index of the current (${i}) cycle, this is the index of the number in the random generated array!${randomNumbers.indexOf(userNumbers[i])}`);
            randomNumbers[randomNumbers.indexOf(userNumbers[i])] = "-"

            correctNumbers.push(userNumbers[i])
            inputElChildren[i].classList.add("bg-success")
        } else {
            inputElChildren[i].classList.add("bg-danger")
        }
    }
    console.log(`these are the correctNumbers ${correctNumbers}`);
    displayOutput()
}

//tell users original numbers after input
function displayOutput() {
    buttonEl.disabled = true;
    numbersListEl.classList.remove("d-none")
    instructionsEl.innerText = "Grazie per aver giocato! torna presto!"
    console.log(instructionsEl);

    for (let i = 0; i < 5; i++) {
        inputElChildren[i].readOnly = true;
    }
    countdownEl.classList.add("text-center")
    if (correctNumbers.length == 0) {
        countdownEl.innerHTML = `Nemmeno uno? Sei un disastro!`
    } else if (correctNumbers.length == 1) {
        countdownEl.innerHTML = `puoi fare di meglio, credo in te!`
    } else if (correctNumbers.length == 2) {
        countdownEl.innerHTML = `bene, ma non benissimo, ritenta!`
    } else if (correctNumbers.length == 3) {
        countdownEl.innerHTML = `sei a metà! ce la puoi fare!`
    } else if (correctNumbers.length == 4) {
        countdownEl.innerHTML = `quasi! ti manca pochissimo!`
    } else if (correctNumbers.length == 5) {
        countdownEl.innerHTML = `Congratulazioni! li hai scritti tutti!`
    }
    //tell users number of correct guesses
    //tell users chosen numbers
    if (correctNumbers.length == 1) {
        messageEl.innerHTML = `hai indovinato ${correctNumbers.length} numero!\n`
    } else if (correctNumbers.length > 1 || correctNumbers.length == 0) {
        messageEl.innerHTML = `hai indovinato ${correctNumbers.length} numeri!\n`
    }

    if (correctNumbers.length == 1) {
        messageEl.innerHTML += `era: ${correctNumbers}`
    } else if (correctNumbers.length > 1) {
        messageEl.innerHTML += `erano: ${correctNumbers}`
    }

}




