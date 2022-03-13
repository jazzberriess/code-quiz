//creating variables

let questions = document.querySelector(".questions");
let startButton = document.querySelector("#start-quiz");
let timerCount = document.querySelector(".timer-count");
let timerContainer = document.querySelector(".timer");
let seconds = document.querySelector("#seconds");
let viewScores = document.querySelector(".li-flex-1");
let questionContainer = document.querySelector(".question-container");

let score = 0;
let index = 0;
let i = 0;

let timeLeft = 60;
let deduction = 5;

// let userAnswer = "";

//recording player Name and Score 

// var playerName = localStorage.getItem("PlayerName");
// var playerScore = localStorage.getItem("PlayerScore");

let userDetails = [];

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

let quizQuestion = theQuestions[index].question;
let quizAnswers = theQuestions[index].answer;
let quizCorrectAnswer = theQuestions[index].correctAnswer;


//create a new h1 for the questions

// let quizQuestion = document.createElement("h1");

//text for the question

// quizQuestion.textContent = "Here's a quiz question!"

//create ordered list for quiz answers

// let answerList = document.createElement("ol");
// let answerLi1 = document.createElement("li");
// let answerLi2 = document.createElement("li");
// let answerLi3 = document.createElement("li");
// let answerLi4 = document.createElement("li");

//text for the quiz answers
// answerLi1.textContent = "Answer 1";
// answerLi2.textContent = "Answer 1";
// answerLi3.textContent = "Answer 1";
// answerLi4.textContent = "Answer 1";



//start button begins timer

function beginQuiz() {

    beginTimer();

    questions.innerHTML = "";
    console.log("clearing the text");

    askQuestions();

};

function beginTimer() {

    // function countdown() {

    //count how many seconds remain
    let timeInterval = setInterval(function () {

        //if time left is greater than 1, count down and display tramining time.

        if (timeLeft > 1) {
            timerCount.textContent = timeLeft--;

            //if time left is 1 second, change the word 'seconds' to 'second'
        }
        else if (timeLeft === 1) {
            timerCount.textContent = timeLeft--;
            seconds.textContent = "second";

            //if time left is zero, clear the counter
        } else if
            (index >= theQuestions.length) {
            clearInterval(timeInterval);
        }
        else {
            timerCount.textContent = "0";
            seconds.textContent = "seconds";
            clearInterval(timeInterval);

            //clear the question area and say 'Time Up!'
            questionContainer.innerHTML = "";
            let timeUp = document.createElement("h3");
            timeUp.textContent = "TIME UP!";
            questionContainer.append(timeUp);

            // give user a button to check their score
            let yourScore = document.createElement("button");
            yourScore.textContent = "Find out your score";
            questionContainer.append(yourScore);

            yourScore.addEventListener("click", checkScores);

        }
    }, 1000);
};

// startButton.addEventListener("click", function () {

//clear the main text to make room for questions


//     askQuestions();
// });

function askQuestions() {

    //clear text area and hide initial info box

    questionContainer.innerHTML = "";

    questions.style.display = "none";
    questionContainer.style.display = "block";

    //if there are no more questions to ask, show COMPLETE and stop the timer

    if (index >= theQuestions.length) {

        let complete = document.createElement("h2");
        complete.textContent = "COMPLETE!"
        questionContainer.appendChild(complete);
        timeLeft = 0;
        let goToScores = document.createElement("button");
        goToScores.textContent = "Show Score";
        questionContainer.appendChild(goToScores);

        goToScores.addEventListener("click", checkScores);

    }

    //show quiz questions in the text area

    let quizQuestion = theQuestions[index].question;
    let quizAnswers = theQuestions[index].answer;

    let viewQuestion = document.createElement("h2");
    viewQuestion.textContent = quizQuestion;

    questionContainer.appendChild(viewQuestion);


    console.log(quizQuestion);

    //show the quiz answer options as buttons

    for (let i = 0; i < quizAnswers.length; i++) {
        console.log(theQuestions[index]);

        //create buttons for the answer options
        let answerOptions = document.createElement("button");

        answerOptions.textContent = quizAnswers[i];
        questionContainer.appendChild(answerOptions);

        console.log(quizAnswers);

        //check if answer is true or false

        if (quizAnswers[i] === theQuestions[index].correctAnswer) {
            answerOptions.setAttribute("data-value", "true");
        } else {
            answerOptions.setAttribute("data-value", "false");
        }

        answerOptions.addEventListener("click", checkAnswers);

    }
}

//Check answer 

function checkAnswers(event) {

    let value = event.target.dataset.value;

    //if answer correct, state 'correct!' and move to next question

    if (value === "true") {
        console.log("You got it!");
        score++;
        nextQuestion();

        // if answer incorrect, state 'wrong', deduct 10 seconds from timer and move to next question
    } else if (value === "false") {
        console.log("boooo!");
        timeLeft = timeLeft - deduction;
        nextQuestion();
    }
}

//if the index of theQuestions is less than the length of the object, ask the next question
function nextQuestion() {

    if (index <= theQuestions.length) {
        index++;
        askQuestions();
    }
}

function checkScores() {

    //clear the text field
    questionContainer.innerHTML = "";

    timerContainer.style.display = "none";


    //Your initials header
    let yourInitials = document.createElement("h3");
    yourInitials.innerHTML = "Enter Your Initials";
    questionContainer.appendChild(yourInitials);

    //your initials input field

    let yourInitialsInput = document.createElement("input");
    yourInitialsInput.setAttribute("id", "inputFieldName");
    questionContainer.appendChild(yourInitialsInput);

    //display final score

    let yourScore = document.createElement("h3");
    yourScore.innerHTML = "Your Score: " + score;
    questionContainer.appendChild(yourScore);

    //save name and score details

    let submit = document.createElement("button");
    submit.textContent = "Submit";
    questionContainer.appendChild(submit);

    submit.addEventListener("click", function () {
        // event.preventDefault();
        console.log(yourInitialsInput);
        var userDetails = {
            playerName: document.getElementById("inputFieldName").value,
            playerScore: score,
        };

        userDetails = localStorage.setItem("userDetails", JSON.stringify(userDetails));
        // showHighScores();

        questionContainer.innerHTML = "";

        let listScores = document.createElement("li");

        userDetails = JSON.parse(localStorage.getItem("userDetails"));

        listScores.textContent = userDetails;
        questionContainer.appendChild(listScores);
        console.log(userDetails);
    })
}

// function showHighScores() {

//     questionContainer.innerHTML = "";

//     let listScores = document.createElement("li");

//     userDetails = JSON.parse(localStorage.getItem("userDetails"));

//     listScores.textContent = userDetails;
//     questionContainer.appendChild(listScores);
//     console.log(userDetails);
//     //get saved scores from local storage


// }

// function viewHighScores() {

//     viewScores.addEventListener("click"), function (event) {

//         event.currentTarget = viewScores;

//         viewScores = localStorage.getItem("userDetails");

//     }
// }

startButton.addEventListener("click", beginQuiz);




