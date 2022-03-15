//creating variables

let splashPage = document.querySelector(".splash-page");
let startButton = document.querySelector("#start-quiz");
let timerCount = document.querySelector(".timer-count");
let timerContainer = document.querySelector(".timer");
let seconds = document.querySelector("#seconds");
let viewScores = document.querySelector("#view-high-scores");
let questionContainer = document.querySelector(".question-container");
// let timerBg = document.querySelector("circle");
let scoreTracker = document.querySelector(".li-wrapper");
let enterDetails = document.querySelector(".enter-details");
let quizCompletedMessage = document.querySelector(".quiz-completed");

let highScoreDetails = document.querySelector(".high-score-details");

let correctMessage = document.querySelector(".correct");
let incorrectMessage = document.querySelector(".incorrect");


let score = 0;
let index = 0;
let i = 0;

let timeLeft = 60;
let deduction = 5;


//setting the questions

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

//styling for the score tracker and view high scores header items. DO NOT MOVE THESE. FOR SOME REASON MOVING THEM FURTHER UP IN THE DOCUMENT MAKES THEM DISAPPEAR.  

let visitHighScores = document.createElement("li");
let trackScore = document.createElement("li");

visitHighScores.innerHTML = "View  High Scores";
trackScore.textContent = "Score: " + score;

scoreTracker.appendChild(visitHighScores);
scoreTracker.appendChild(trackScore);

visitHighScores.setAttribute("style", "flex: 1 0 25%; text-align: left; margin: 0%; padding-left: 1rem; background-color: mistyrose; text-decoration: underline;");
trackScore.setAttribute("style", "flex: 1 0 25%; text-align: right; margin: 0%; padding-right: 1rem; background-color: mistyrose");




let feedbackCorrect = document.createElement("li");
feedbackCorrect.setAttribute("style", "text-align: center; width: 60%; list-style: none;")
feedbackCorrect.textContent = "Correct!";
correctMessage.appendChild(feedbackCorrect);

let feedbackIncorrect = document.createElement("li");
feedbackIncorrect.setAttribute("style", "text-align: center; width: 60%; list-style: none;")
feedbackIncorrect.textContent = "Incorrect!";
incorrectMessage.appendChild(feedbackIncorrect);

//hide the question container when viewing the game for the first time

questionContainer.style.display = "none";
quizCompletedMessage.style.display = "none";
enterDetails.style.display = "none";
// timerContainer.style.display = "none";
highScoreDetails.style.display = "none";
splashPage.style.display = "block";
correctMessage.style.display = "none";
incorrectMessage.style.display = "none";

//start button begins timer



// startButton.addEventListener("click", function () {

//clear the main text to make room for questions


//     askQuestions();
// });

function askQuestions() {

    //clear text area and hide initial info box
    questionContainer.innerHTML = "";


    splashPage.style.display = "none";
    questionContainer.style.display = "block";

    //if there are no more questions to ask, show COMPLETE and stop the timer

    while (index >= theQuestions.length) {

        quizCompletedMessage.style.display = "block";
        questionContainer.style.display = "none";


        let complete = document.createElement("h2");
        complete.textContent = "COMPLETE!"
        quizCompletedMessage.appendChild(complete);
        timeLeft = 0;
        index = 0;

        let goToScores = document.createElement("button");
        goToScores.textContent = "Show Score";
        quizCompletedMessage.appendChild(goToScores);

        //styling for the button
        goToScores.setAttribute("style", "background-color: pink; font-size: 1.5rem; font-family: inherit; border: 2px solid palevioletred; border-radius: 1.5rem; padding: 1rem");

        goToScores.addEventListener("click", checkScores);
    }

    //show quiz questions in the text area

    quizQuestion = theQuestions[index].question;
    quizAnswers = theQuestions[index].answer;
    quizCorrectAnswer = theQuestions[index].correctAnswer;


    viewQuestion = document.createElement("h2");
    viewQuestion.textContent = quizQuestion;

    questionContainer.appendChild(viewQuestion);


    console.log(quizQuestion);

    //show the quiz answer options as buttons

    for (let i = 0; i < quizAnswers.length; i++) {
        // console.log(theQuestions[index]);

        //create buttons for the answer options
        let answerOptions = document.createElement("button");

        answerOptions.textContent = quizAnswers[i];
        questionContainer.appendChild(answerOptions);

        answerOptions.setAttribute("style", "display: block; width: 100%; background-color: pink; font-size: 1.5rem; font-family: inherit; border: 2px solid palevioletred; border-radius: 1.5rem; padding: 1rem; margin-bottom: 0.5rem;");


        console.log(quizAnswers);

        //check if answer is true or false

        if (quizAnswers[i] === quizCorrectAnswer) {
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
        correctMessage.style.display = "block";
        incorrectMessage.style.display = "none";
        console.log("You got it!");
        score++;
        trackScore.innerHTML = "Score: " + score;



        nextQuestion();

        // if answer incorrect, state 'wrong', deduct 10 seconds from timer and move to next question
    } else if (value === "false") {
        console.log("boooo!");

        incorrectMessage.style.display = "block";
        correctMessage.style.display = "none";

        // let feedbackIncorrect = document.createElement("li");
        // feedbackIncorrect.textContent = "Incorrect!";
        // correctMessage.appendChild(feedbackIncorrect);
        // feedbackIncorrect.setAttribute("style", "display: inline-block; align-self: flex-end;");
        timeLeft = timeLeft - deduction;

        nextQuestion();
    }
}

//if the index of theQuestions is less than the length of the object, ask the next question
function nextQuestion() {

    // correctMessage.style.display = "none";
    // incorrectMessage.style.display = "none";

    if (index <= theQuestions.length) {
        index++;
        // correctMessage.innerHTML = "";
        askQuestions();
    } else {

        // reset index to zero after game
        // correctMessage.innerHTML = "";


        index = 0;

        console.log("COMPLETE");
    }
}

function checkScores() {

    //clear the text field
    // questionContainer.innerHTML = "";
    correctMessage.style.display = "none";
    incorrectMessage.style.display = "none";
    quizCompletedMessage.style.display = "none";
    questionContainer.style.display = "none";
    timerContainer.style.display = "none";
    enterDetails.style.display = "block";

    //Your initials header
    let yourInitials = document.createElement("h3");
    yourInitials.innerHTML = "Enter Your Initials";
    enterDetails.appendChild(yourInitials);

    //your initials input field

    let yourInitialsInput = document.createElement("input");
    yourInitialsInput.setAttribute("type", "input");
    yourInitialsInput.setAttribute("id", "inputFieldName");
    yourInitialsInput.textContent = "";
    enterDetails.appendChild(yourInitialsInput);

    //display final score

    let yourScore = document.createElement("h3");
    yourScore.innerHTML = "Your Score: " + score;
    enterDetails.appendChild(yourScore);

    //save name and score details

    let submit = document.createElement("button");
    submit.textContent = "Submit";
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit");
    enterDetails.appendChild(submit);

    //styling for the submit button

    submit.setAttribute("style", "background-color: pink; font-size: 1.5rem; font-family: inherit; border: 2px solid palevioletred; border-radius: 1.5rem; padding: 1rem");

    submit.addEventListener("click", function () {

        savePlayerName();
        showPlayerDetails();
        // questionContainer.style.display = "none";

    })
}

function savePlayerName() {

    var userDetails = {
        playerName: document.getElementById("inputFieldName").value.trim(),
        playerScore: score,
    };

    // let winners = JSON.parse(localStorage.getItem("Player Details"));
    // if (winners === null) {
    //     winners = [];
    // }

    // winners.push(userDetails)

    localStorage.setItem("Player Details", JSON.stringify(userDetails));
    // showHighScores();
}

function showPlayerDetails() {

    // questionContainer.innerHTML = "";
    enterDetails.style.display = "none";
    highScoreDetails.style.display = "block";

    let highScoresTitle = document.createElement("h3");
    highScoresTitle.textContent = "High Scores";
    highScoreDetails.appendChild(highScoresTitle);

    var playerData = JSON.parse(localStorage.getItem("Player Details"));

    var displayData = document.createElement("div");
    displayData.setAttribute("id", "display-data");
    displayData.textContent = "Name: " + playerData.playerName + " - Score: " + playerData.playerScore;
    highScoreDetails.appendChild(displayData);
    displayData.setAttribute("style", "background-color: mistyrose; margin-bottom: 2rem; margin-left: 0rem; margin-right: 0rem;")

    var goBackBtn = document.createElement("button");
    goBackBtn.textContent = "Go Back";
    highScoreDetails.appendChild(goBackBtn);

    //styling for the goBackBtn

    goBackBtn.setAttribute("style", "background-color: pink; font-size: 1.5rem; font-family: inherit; border: 2px solid palevioletred; border-radius: 1.5rem; padding: 1rem; mrgin-top: 1rem; margin-right: 1rem;");

    goBackBtn.addEventListener("click", function () {
        splashPage.style.display = "block";
        timerContainer.style.display = "block";
        questionContainer.style.display = "none";
        highScoreDetails.style.display = "none";

        //RESET SCORE AND INDEX TO ZERO
        // index = 0;
        // score = 0;

        // reset timer???

        gameReset();
    })

    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.textContent = "Clear Score";
    highScoreDetails.appendChild(clearScoresBtn);

    //styling for the clear scores btn

    clearScoresBtn.setAttribute("style", "background-color: pink; font-size: 1.5rem; font-family: inherit; border: 2px solid palevioletred; border-radius: 1.5rem; padding: 1rem;");

    clearScoresBtn.addEventListener("click", function () {
        localStorage.clear();
        displayData.textContent = "History cleared!";

    })
}

visitHighScores.addEventListener("click", function () {
    console.log("click");

    highScoreDetails.innerHTML = "";

    if (localStorage.getItem("Player Details") === null) {
        let noSavedData = document.createElement("h2");
        noSavedData.textContent = "No Saved Data";
        highScoreDetails.appendChild(noSavedData);
        highScoreDetails.style.display = "block";
        questionContainer.style.display = "none";
        timerContainer.style.display = "none";
        splashPage.style.display = "none";

        let returnBtn = document.createElement("button");
        returnBtn.textContent = "Return to Quiz";
        highScoreDetails.appendChild(returnBtn);

        // styling for the goBackBtn

        returnBtn.setAttribute("style", "background-color: pink; font-size: 1.5rem; font-family: inherit; border: 2px solid palevioletred; border-radius: 1.5rem; padding: 1rem; mrgin-top: 1rem;");

        returnBtn.addEventListener("click", function () {

            splashPage.style.display = "block";
            timerContainer.style.display = "block";
            highScoreDetails.style.display = "none";

        })

    } else {
        showPlayerDetails();
        splashPage.style.display = "none";
        questionContainer.style.display = "none";
        timerContainer.style.display = "none";
    }

})

// questionContainer.innerHTML = "";

// let listScores = document.createElement("li");

// listScores.textContent = userDetails;
// questionContainer.appendChild(listScores);
// console.log(userDetails);

// }
function beginTimer() {


    // function countdown() {
    let timer;
    //count how many seconds remain
    function countdownTimer() {

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
            clearInterval(timer);

        } else {
            timerCount.textContent = "0";
            seconds.textContent = "seconds";
            clearInterval(timer);

            //clear the question area and say 'Time Up!'
            questionContainer.innerHTML = "";
            let timeUp = document.createElement("h3");
            timeUp.textContent = "TIME UP!";
            questionContainer.append(timeUp);

            // give user a button to check their score
            let yourScore = document.createElement("button");
            yourScore.textContent = "Save Your Score";
            questionContainer.append(yourScore);

            //styling for find out score button
            yourScore.setAttribute("style", "background-color: pink; font-size: 1.5rem; font-family: inherit; border: 2px solid palevioletred; border-radius: 1.5rem; padding: 1rem");

            yourScore.addEventListener("click", checkScores);

        }
        return countdownTimer
    }
    timer = setInterval(countdownTimer(), 1000);
};

function beginQuiz() {
    // let scoreTrackerContents = document.createElement("h1");
    // scoreTrackerContents.textContent = "Score: " + currentScore;
    // scoreTracker.appendChild(scoreTrackerContents);
    // score = 0;
    // timeLeft = 60;

    beginTimer();

    // questions.innerHTML = "";
    // console.log("clearing the text");

    askQuestions();

};


// reset index to zero after game
// index = 0;


// visitHighScores.addEventListener("click", function (event) {

//     event.target = visitHighScores;
//     showPlayerDetails();


// })

function gameReset() {
    index = 0;
    timeLeft = 60;
    score = 0;
    enterDetails.innerHTML = "";
    quizCompletedMessage.innerHTML = "";
    highScoreDetails.innerHTML = "";
    //had to add this because the scoreTracker wouldn't reset otherwise???
    trackScore.innerHTML = "Score: " + score;
}




startButton.addEventListener("click", beginQuiz);
