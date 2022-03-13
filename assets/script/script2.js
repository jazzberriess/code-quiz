//creating variables

let questions = document.querySelector(".questions");
let startButton = document.querySelector("#start-quiz");
let timerCount = document.querySelector(".timer-count");
let seconds = document.querySelector("#seconds");
let viewScores = document.getElementsByClassName("li-wrapper");
let answerSection = document.querySelector(".answer-section");

let score = 0;
var index = 0;

// let i = 0;

let timeLeft = 10;

let userAnswer = "";
let yourScore = document.createElement("button");

//recording player Name and Score 

// var playerName = localStorage.getItem("PlayerName");
// var playerScore = localStorage.getItem("PlayerScore");

let theQuestions = [
    {
        question: "This is q 1",
        answer: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        correctAnswer: "Answer 2",
    },
    {
        question: "This is q 2",
        answer: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        correctAnswer: "Answer 4",
    },
    {
        question: "This is q 3",
        answer: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        correctAnswer: "Answer 1",
    },
    {
        question: "This is q 4",
        answer: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        correctAnswer: "Answer 3",
    },
    {
        question: "This is q 5",
        answer: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        correctAnswer: "Answer 3",
    },
];

//variables for quiz questions and answers

var quizQuestion = theQuestions[index].question;
var quizAnswers = theQuestions[index].answer;
var quizCorrectAnswer = theQuestions[index].correctAnswer;


var currentQuestion = theQuestions[index];

//start button begins timer

function beginQuiz() {

    beginTimer();

    questions.innerHTML = "";
    console.log("clearing the text");

    askQuestions();

};

function beginTimer() {

    //count how many seconds remain
    let timeInterval = setInterval(function () {

        //if time left is greater than 1, count down and display tramining time.

        if (timeLeft > 1) {
            timerCount.textContent = timeLeft--;

            //if time left is 1 second, change the word 'seconds' to 'second'
        } else if (timeLeft === 1) {
            timerCount.textContent = timeLeft--;
            seconds.textContent = "second";

            //if time left is zero, clear the counter
        } else {
            timerCount.textContent = "0";
            seconds.textContent = "seconds";
            clearInterval(timeInterval);

            //clear the question area and say 'Time Up!'
            questions.innerHTML = "";
            let timeUp = document.createElement("h3");
            timeUp.textContent = "TIME UP!";
            questions.append(timeUp);

            // give user a button to check their score

            scoreButton();

        }
    }, 1000);
}

// give user a button to check their score

function scoreButton() {

    yourScore.textContent = "Find out your score";
    questions.append(yourScore);

    yourScore.addEventListener("click", checkScores);
}

function askQuestions() {

    //show quiz question in the text area

    // if (index < theQuestions.length) {
    //     quizQuestion[i]++;

    // questions.innerHTML = "";

    // questions.innerHTML = "";
    // console.log("clearing the text");

    // for (let i = 0; i < theQuestions[index].length; i++) {


    // }
    var currentQuestion = theQuestions[index];

    console.log(currentQuestion);

    question.textContent = currentQuestion.question;

    console.log(currentQuestion);

    // console.log("hello bees");

    //show the quiz answers

    for (let i = 0; i < quizAnswers.length; i++) {
        console.log(theQuestions[index]);

        //create buttons for the answer options
        // for (let i = 0; i < quizAnswers.length; i++) {
        let answerOptions = document.createElement("button");

        answerOptions.textContent = quizAnswers[i];
        questions.appendChild(answerOptions);

        console.log(quizAnswers);

        //check if answer is true or fales

        if (quizAnswers[i] === quizCorrectAnswer) {
            answerOptions.setAttribute("data-value", "true");
        } else {
            answerOptions.setAttribute("data-value", "false")
        }

        answerOptions.addEventListener("click", checkAnswers);
    }
}

//if answer correct, state 'correct!' and move to next question

// if answer incorrect, state 'wrong', deduct 10 seconds from timer and move to next question

function checkAnswers(event) {

    let value = event.target.dataset.value;

    if (value === "true") {
        console.log("You got it!");
        score++;
        nextQuestion();
    } else {
        console.log("boooo!");
        nextQuestion();
    }

    if (index === theQuestions.length) {

        questions.innerHTML = "";
        let complete = document.createElement("h2");
        complete.innerHTML = "COMPLETE!"
        questions.appendChild(complete);
    }


    function nextQuestion() {
        index++;
    }
    //if the index of theQuestions is less than the length of the object, ask the next question

    // if (index < theQuestions[index]) {
    //     index++;

    // questions.innerHTML = "";

    // askQuestions();
    // } else if
    //     (index >= theQuestions[index]) {
    //     questions.innerHTML = "";
    //     let complete = document.createElement("h2");
    //     complete.innerHTML = "COMPLETE!"
    //     questions.appendChild(complete);
    //     // clearInterval(timeInterval);

    //     // give user a button to check their score
    //     scoreButton();

    //     if (index === theQuestions.length) {

    //         questions.innerHTML = "";
    //         let complete = document.createElement("h2");
    //         complete.innerHTML = "COMPLETE!"
    //         questions.appendChild(complete);
    //     }
    // }

    //     } else if (index === theQuestions.length) {
    //         questions.innerHTML = "";
    //         let complete = document.createElement("h2");
    //         complete.innerHTML = "COMPLETE!"
    //         questions.appendChild(complete);
    //         // clearInterval(timeInterval);

    //         // give user a button to check their score
    //         scoreButton();

    //     } else {

    //         questions.innerHTML = "";
    //         let complete = document.createElement("h2");
    //         complete.innerHTML = "COMPLETE!"
    //         questions.appendChild(complete);
    //         // clearInterval(timeInterval);

    //         // give user a button to check their score
    //         scoreButton();
    //     }
    // }
}


function checkScores() {

    //clear the text field
    questions.innerHTML = "";

    //Your initials header
    let yourInitials = document.createElement("h3");
    yourInitials.innerHTML = "Enter Your Initials";
    questions.appendChild(yourInitials);

    //your initials input field

    let yourInitialsInput = document.createElement("input");
    questions.appendChild(yourInitialsInput);

    //display final score

    let yourScore = document.createElement("h3");
    yourScore.innerHTML = "Your Score: " + score;
    questions.appendChild(yourScore);

    var playerName = yourInitialsInput.nodeValue;

    var playerScore = score;

    localStorage.setItem("playerName", playerName);

    localStorage.setItem("playerScore", playerScore);

    //save name and score details

    let submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    questions.appendChild(submitBtn);

    submitBtn.addEventListener("Click", function (event) {
        event.preventDefault();

        // var playerName = yourInitialsInput.value;

        // var playerScore = score;

        // localStorage.setItem("playerName", playerName);

        // localStorage.setItem("playerScore", JSON.stringify(playerScore));

        questions.innerHTML = "";

        // var displayScore = document.createElement("h4");
        // displayScore.tetContent = localStorage.getItem(playerName);
        // displayScore.tetContent = localStorage.getItem(playerScore);

        // questions.appendChild(displayScore);

    })
}

// function viewHighScores() {

//     questions.innerHTML = "";

//     viewScores = localStorage.getItem("userDetails", JSON.parse(userDetails));

//     let highScoreList = document.createElement("ul");
//     highScoreList.textContent = viewScores;
//     questions.appendChild(highScoreList);
// };

startButton.addEventListener("click", beginQuiz);
// viewScores.addEventListener("click", viewHighScores);