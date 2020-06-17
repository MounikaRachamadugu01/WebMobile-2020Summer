//declare user and computer variables

let userscore = 0;
let computerscore = 0;

// store the user and computer values corresponding to their ID attribute of user div and computer div
const userscore_span = document.getElementById("user-score");
const computerscore_span = document.getElementById("computer-score");
const result_p = document.querySelector(".result > p");
// store the values corresponding to their ID attribute of rock div, paper div and scissors div
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissor_div = document.getElementById("s");


//function for computer choices
function getcomputerchoice() {
    const options = ['r', 'p', 's'];
    const randomnumber = Math.floor(Math.random() * 3);
    return options[randomnumber]; // r = 0 , p =  1 ,
}

//function to convert letter to word
function convertword(letter) {
    if (letter === "r") return "rock";
    else if (letter === "p") return "paper";
    else return "scissors"
}

// win function
function win(userchoice, computerchoice) {
    userscore++;
    userscore_span.innerHTML = userscore;
    computerscore_span.innerHTML = computerscore;
    result_p.innerHTML = `${convertword(userchoice)}  beats  ${convertword(computerchoice)} . User win !!`; // `` are used so there is no need for "" and + function

}
// lose function
function lose(userchoice, computerchoice) {
    computerscore++;
    userscore_span.innerHTML = userscore;
    computerscore_span.innerHTML = computerscore;
    result_p.innerHTML = `${convertword(computerchoice)}  beats  ${convertword(userchoice)} . User lose !!`;  // $ is used for the converting function

}
//draw function
function draw(userchoice, computerchoice) {
    userscore_span.innerHTML = userscore;
    computerscore_span.innerHTML = computerscore;
    result_p.innerHTML = `${convertword(computerchoice)}  ties  ${convertword(userchoice)} . Its a draw!!`;

}

// function to find win or lose
function game(userchoice) {
    const computerchoice = getcomputerchoice();

    switch (userchoice + computerchoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userchoice, computerchoice);
            console.log("user wins");
            break;
        case "rp":
        case "ps":
        case "sr":
            lose(userchoice, computerchoice);
            console.log("user loses");
            break;
        case "rr":
        case "pp":
        case "ss":
            draw(userchoice, computerchoice);
            console.log("Draw");
            break;
    }
}
// main function
function main() {
    rock_div.addEventListener('click', function () {
        console.log("clicked on rock");
        game("r");
    })
    paper_div.addEventListener('click', function () {
        console.log("clicked on paper");
        game("p");
    })
    scissor_div.addEventListener('click', function () {
        console.log("clicked on scissors");
        game("s");
    })

}

main();