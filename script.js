const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

//Make an Array of objects that stores question choices and answers
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Inside which element do you put Javascript?",
        choices: ["<var>", "<script>", "<section>", "<code>"],
        answer: "<script>"
    },
    {
        question: "Q. How many days makes a week ?",
        choices: ["10 days", "14 days", "5 days", "7 days"],
        answer: "7 days"
    },
    {
        question: "Q. Who was the first President of USA?",
        choices: ["Donald Trump", "Barack Obama", "Abraham Lincoln", "George Washington"],
        answer: "George Washington"
    },
    {
        question: "Q. JavaScript is an ____ language?",
        choices: ["Object Oriented", "Object-Based", "Procedural", "None of the above"],
        answer: "Object Oriented"
    },
    {
        question: "Q. Which of the following methods can be used to display data in some form using Javascript?",
        choices: ["document.write()", "console.log()", "window.alert()", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "Q. How can a datatype be declared to be a constant type?",
        choices: ["const", "let", "variable", "constant"],
        answer: "const"
    },
    {
        question: "Q. When a operator's value is NULL, the typeof returned by the unary operator is?",
        choices: ["Boolean", "Undefined", "Object", "Integer"],
        answer: "Object"
    },
    {
        question: "Q. What is the output of the followinh snippet?  print(NaN === NaN)",
        choices: ["true", "false", "undefined", "Error"],
        answer: "false"
    },
    {
        question: "Q. Which of the following is not a Javascript framework?",
        choices: ["Node", "Vue", "React", "Cassandra"],
        answer: "Cassandra"
    },

];
//Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerId = null;
//Arrow Function to show question
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }
    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }

};

//Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("wrong Answer");
        displayAlert(`wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft=15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        showScore();
        stopTimer();
        // quizOver = true;
       
    }

}

//Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!")
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}
// function to show alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = "none";
    }, 2000);

}
//Function to start timer
const startTimer = () => {
    clearInterval(timerId);   // Check if any timer exists
    timer.textContent = timeLeft;

    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if (timeLeft === 0) {
            const confirmUser = confirm("Time Up!! Do you want to play the Quiz Again");
            if(confirmUser){
                timeLeft=15;
                startQuiz();
            }
            else{
                startBtn.style.display="block";
                container.style.display="none";
                return;
            }
        }
    }
    timerId=setInterval(countDown, 1000);
}

//Function to stop timer
const stopTimer =()=>{
clearInterval(timerId);
}

//Function to start Quiz
const startQuiz = () => {
    timeLeft=15;
    timer.style.display="flex";
    shuffleQuestions();
}

//Function to shuffle question
const shuffleQuestions =()=>{
    for (let i = quiz.length-1; i>0;i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]]=[quiz[j], quiz[i]];
    }
    currentQuestionIndex=0;
    showQuestions();
}
//Adding add event listener to start the button
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});
// showQuestions();
nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent == "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});


