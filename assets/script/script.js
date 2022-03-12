//creating variables

let questions = document.querySelector(".questions");
let startButton = document.querySelector("#start-quiz");
let timerCount = document.querySelector(".timer-count");
let seconds = document.querySelector("#seconds");


let score = 0;
var index = 0;

let i = 0;

let theQuestions = [
    {
        question: "This is q 1",
        answer: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
        correctAnswer: "Answer2",
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

startButton.addEventListener("click", function () {

    // function countdown() {

    let timeLeft = 60;
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
        }
    }, 1000);
});

startButton.addEventListener("click", function () {

    //clear the main text to make room for questions
    questions.innerHTML = "";
    console.log("clearing the text");

    //variables for quiz questions and answers

    var quizQuestion = theQuestions[index].question;
    var quizAnswers = theQuestions[index].answer;

    //show quiz question in the text area

    questions.append(quizQuestion);

    console.log("hello bees");

    //show the quiz answers

    for (let i = 0; i < quizAnswers.length; i++)
        console.log(theQuestions[i]);

    for (let i = 0; i < quizAnswers.length; i++) {
        let element = document.createElement("button");
        element.append(quizAnswers[i]);
        questions.appendChild(element);
    }

    console.log(quizAnswers);

});


//start buttons begins questions and countdown timer



//if answer correct, state 'correct!' and move to next question

// if answer incorrect, state 'wrong', deduct 10 seconds from timer and move to next question