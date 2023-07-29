const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');



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
    }

];
//Making Variables
let currentQuestionIndex = 0;

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
    }
    // console.log(questionDetails);
};
showQuestions();
nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quiz.length) {
        currentQuestionIndex++;
        showQuestions();
    }
});

