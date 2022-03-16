//creating variables

let splashPage = document.querySelector(".splash-page");
let startButton = document.querySelector("#start-quiz");
let timerCount = document.querySelector(".timer-count");
let timerContainer = document.querySelector(".timer");
let seconds = document.querySelector("#seconds");
let viewScores = document.querySelector("#view-high-scores");
let questionContainer = document.querySelector(".question-container");
let scoreTracker = document.querySelector(".li-wrapper");
let enterDetails = document.querySelector(".enter-details");
let quizCompletedMessage = document.querySelector(".quiz-completed");

let highScoreDetails = document.querySelector(".high-score-details");

let feedbackContainer = document.querySelector(".feedback-container");
let correctMessage = document.querySelector(".correct");
let incorrectMessage = document.querySelector(".incorrect");


let score = 0;
let index = 0;
let i = 0;

let timeLeft = 60;
let deduction = 10;


//setting the questions

let theQuestions = [
    {
        question: "1. Which of the following is NOT a logical operator?",
        answer: ["&&", "!!", "&|", "||"],
        correctAnswer: "&|",
    },
    {
        question: "2. What primitive type is 'NaN'?",
        answer: ["String", "Number", "Object", "Undefined"],
        correctAnswer: "Number",
    },
    {
        question: "3. What is 'shadowing'?",
        answer: ["A variable that is used globally and locally", "A function that is called twice", "A value that returns as 'NaN'", "A function that is called before it is defined"],
        correctAnswer: "A variable that is used globally and locally",
    },
    {
        question: "4. What are the properties that make up an object?",
        answer: ["True/False Pair", "Variable/Function Pair", "Key/Value Pair", "Variable/Value Pair"],
        correctAnswer: "Key/Value Pair",
    },
    {
        question: "5. What do we use to dynamically manipulate the HTML elements on a page?",
        answer: ["The DIM", "The DEM", "The DOM", "The DMM"],
        correctAnswer: "The DOM",
    },
    {
        question: "6. What is API short for?",
        answer: ["Application Programming Interface", "Applied Program Interface", "Application Performance Index", "Applied Programming Interface"],
        correctAnswer: "Application Programming Interface",
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

visitHighScores.setAttribute("style", "flex: 1 0 25%; text-align: left; margin: 0%; padding-left: 1rem; background-color: mistyrose; text-decoration: underline; list-style: none;");
trackScore.setAttribute("style", "flex: 1 0 25%; text-align: right; margin: 0%; padding-right: 1rem; background-color: mistyrose; list-style: none;");


//creating feedback elements

let feedbackCorrect = document.createElement("li");
feedbackCorrect.setAttribute("style", "text-align: center; width: 100%; list-style: none; background-color: mistyrose; opacity: 75%;")
feedbackCorrect.textContent = "Correct!";
correctMessage.appendChild(feedbackCorrect);
feedbackContainer.appendChild(correctMessage);

let feedbackIncorrect = document.createElement("li");
feedbackIncorrect.setAttribute("style", "text-align: center; width: 100%; list-style: none; background-color: mistyrose; opacity: 75%;")
feedbackIncorrect.textContent = "Incorrect!";
incorrectMessage.appendChild(feedbackIncorrect);
feedbackContainer.appendChild(incorrectMessage);


//show these containers when the game first loads

splashPage.style.display = "block";
feedbackContainer.style.display = "block";


//hide these containers when viewing the game for the first time

questionContainer.style.display = "none";
quizCompletedMessage.style.display = "none";
enterDetails.style.display = "none";
highScoreDetails.style.display = "none";
correctMessage.style.display = "none";
incorrectMessage.style.display = "none";


// Ask the quiz questions

function askQuestions() {

    //clear text area, hide initial splash page and show the questions
    questionContainer.innerHTML = "";

    splashPage.style.display = "none";
    questionContainer.style.display = "block";

    //delay the dissappearance of the feedback message when it shows

    setTimeout(clearFeedback, 1550);

    function clearFeedback() {
        correctMessage.style.display = "none";
        incorrectMessage.style.display = "none"
    }


    //if there are no more questions to ask...

    while (index >= theQuestions.length) {

        //show the quiz complete message and hide the questions
        quizCompletedMessage.style.display = "block";
        questionContainer.style.display = "none";


        let complete = document.createElement("h2");
        complete.textContent = "COMPLETE!"
        quizCompletedMessage.appendChild(complete);

        //set timer to zero and reset question index to zero
        timeLeft = 0;
        index = 0;

        //create 'go to scores' button

        let goToScores = document.createElement("button");
        goToScores.textContent = "Show Score";
        quizCompletedMessage.appendChild(goToScores);

        //styling for the button
        goToScores.setAttribute("style", "background-color: pink; font-size: 1.5rem; font-family: inherit; border: 2px solid palevioletred; border-radius: 1.5rem; padding: 1rem");

        //click event to show the score page

        goToScores.addEventListener("click", checkScores);
    }

    //Ask the questions and show quiz questions in the text area

    quizQuestion = theQuestions[index].question;
    quizAnswers = theQuestions[index].answer;
    quizCorrectAnswer = theQuestions[index].correctAnswer;


    viewQuestion = document.createElement("h2");
    viewQuestion.textContent = quizQuestion;

    questionContainer.appendChild(viewQuestion);


    //For loop to create buttons for each of the possible answers to the questions. 

    for (let i = 0; i < quizAnswers.length; i++) {

        //create buttons for the answer options
        let answerOptions = document.createElement("button");

        answerOptions.textContent = quizAnswers[i];
        questionContainer.appendChild(answerOptions);

        //styling for the answer options

        answerOptions.setAttribute("style", "display: block; width: 100%; background-color: pink; font-size: 1.5rem; font-family: inherit; border: 2px solid palevioletred; border-radius: 1.5rem; padding: 1rem; margin-bottom: 0.5rem; margin-top: 1rem;");


        //check if answer is true or false

        if (quizAnswers[i] === quizCorrectAnswer) {
            answerOptions.setAttribute("data-value", "true");
        } else {
            answerOptions.setAttribute("data-value", "false");
        }

        answerOptions.addEventListener("click", checkAnswers);

    }
}

//Check answer function

function checkAnswers(event) {

    let value = event.target.dataset.value;

    //if answer correct, show the 'correct!' feedback message, add to the score and move to next question

    if (value === "true") {
        correctMessage.style.display = "block";
        incorrectMessage.style.display = "none";
        // console.log("You got it!");
        score++;
        trackScore.innerHTML = "Score: " + score;

        nextQuestion();

        // if answer incorrect, show the 'incorrect' feedback message, deduct 10 seconds from timer and move to next question

    } else if (value === "false") {
        // console.log("boooo!");

        incorrectMessage.style.display = "block";
        correctMessage.style.display = "none";

        timeLeft = timeLeft - deduction;

        nextQuestion();
    }
}

//if the index of theQuestions is less than the length of the object, ask the next question, otherwise, reset the index to zero. (Completion conditions are in the askQuestions function)

function nextQuestion() {

    if (index <= theQuestions.length) {
        index++;
        askQuestions();
    } else {
        // reset index to zero after game
        index = 0;
    }
}

//Display score 

function checkScores() {

    //show the enterDetails container and hide the others.

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

    //click to save the player details and show name

    submit.addEventListener("click", function () {

        savePlayerName();
        showPlayerDetails();

    })
}

//save player details

function savePlayerName() {

    var userDetails = {
        playerName: document.getElementById("inputFieldName").value.trim(),
        playerScore: score,
    };

    localStorage.setItem("Player Details", JSON.stringify(userDetails));

}

//show player details

function showPlayerDetails() {

    //hide the enterDetails page and show the high scores

    enterDetails.style.display = "none";
    highScoreDetails.style.display = "block";

    let highScoresTitle = document.createElement("h3");
    highScoresTitle.textContent = "High Scores";
    highScoreDetails.appendChild(highScoresTitle);

    //retrieve and display data that was saved in local storage

    var playerData = JSON.parse(localStorage.getItem("Player Details"));

    var displayData = document.createElement("div");
    displayData.setAttribute("id", "display-data");
    displayData.textContent = "Name: " + playerData.playerName + " - Score: " + playerData.playerScore;
    highScoreDetails.appendChild(displayData);

    //styling for the displayData div
    displayData.setAttribute("style", "background-color: mistyrose; margin-bottom: 2rem; margin-left: 0rem; margin-right: 0rem;")

    //create a go back button

    var goBackBtn = document.createElement("button");
    goBackBtn.textContent = "Go Back";
    highScoreDetails.appendChild(goBackBtn);

    //styling for the goBackBtn

    goBackBtn.setAttribute("style", "background-color: pink; font-size: 1.5rem; font-family: inherit; border: 2px solid palevioletred; border-radius: 1.5rem; padding: 1rem; mrgin-top: 1rem; margin-right: 1rem;");

    //click event for the goBackBtn

    goBackBtn.addEventListener("click", function () {

        //show splaysh page and timer, hide other containers
        splashPage.style.display = "block";
        timerContainer.style.display = "block";
        questionContainer.style.display = "none";
        highScoreDetails.style.display = "none";

        // Reset game

        gameReset();
    })

    //clear scores
    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.textContent = "Clear Score";
    highScoreDetails.appendChild(clearScoresBtn);

    //styling for the clear scores btn

    clearScoresBtn.setAttribute("style", "background-color: pink; font-size: 1.5rem; font-family: inherit; border: 2px solid palevioletred; border-radius: 1.5rem; padding: 1rem;");

    //click event for clearScoresBtn

    clearScoresBtn.addEventListener("click", function () {
        localStorage.clear();
        displayData.textContent = "History cleared!";

    })
}

//Event listener for visitHighScores

visitHighScores.addEventListener("click", function () {
    console.log("click");

    //clear the highScoreDetails div

    highScoreDetails.innerHTML = "";

    //retrieve local storage data for the high scores page

    if (localStorage.getItem("Player Details") === null) {
        let noSavedData = document.createElement("h2");
        noSavedData.textContent = "No Saved Data";
        highScoreDetails.appendChild(noSavedData);
        highScoreDetails.style.display = "block";
        questionContainer.style.display = "none";
        timerContainer.style.display = "none";
        splashPage.style.display = "none";

        //create a return to quiz button

        let returnBtn = document.createElement("button");
        returnBtn.textContent = "Return to Quiz";
        highScoreDetails.appendChild(returnBtn);

        // styling for the returnBrn

        returnBtn.setAttribute("style", "background-color: pink; font-size: 1.5rem; font-family: inherit; border: 2px solid palevioletred; border-radius: 1.5rem; padding: 1rem; mrgin-top: 1rem;");

        //click event for return button

        returnBtn.addEventListener("click", function () {

            //show splash page and timer, hide high score details

            splashPage.style.display = "block";
            timerContainer.style.display = "block";
            highScoreDetails.style.display = "none";
            gameReset();

        })


    } else {

        highScoreDetails.innerHTML = "";

        //show player details and hide all other containers
        showPlayerDetails();
        splashPage.style.display = "none";
        questionContainer.style.display = "none";
        timerContainer.style.display = "none";
    }

})

//begin timer!

function beginTimer() {

    let timer;

    //countdown from 60 how many seconds remain
    function countdownTimer() {

        //if time left is greater than 1, count down and display tramining time.

        if (timeLeft > 1) {
            timerCount.textContent = timeLeft--;

            //if time left is 1 second, change the word 'seconds' to 'second'
        }
        else if (timeLeft === 1) {
            timerCount.textContent = timeLeft--;
            seconds.textContent = "second";

        } else if
            (index >= theQuestions.length) {
            clearInterval(timer);

            //if time left is zero, clear the counter

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

            yourScore.setAttribute("style", "background-color: pink; font-size: 1.5rem; font-family: inherit; border: 2px solid palevioletred; border-radius: 1.5rem; padding: 1rem; margin-top: 1rem;");

            yourScore.addEventListener("click", checkScores);

        }
        return countdownTimer
    }
    timer = setInterval(countdownTimer(), 1000);
};

function beginQuiz() {

    beginTimer();

    askQuestions();

};

//reset the game

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

//click to start the quiz!

startButton.addEventListener("click", beginQuiz);
