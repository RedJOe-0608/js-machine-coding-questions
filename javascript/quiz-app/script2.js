// Approach 2: Creating a global score element, and reload all questions into the DOM and just hide/show them instead of recreating them each time 

import { questions } from './questions.js';

const startBtn = document.querySelector('.start-btn');
const main = document.getElementById('container');

let totalScore = 0;
let currentQuestionNumber = 0;

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    totalScore = 0;
    currentQuestionNumber = 0;
    main.innerHTML = '';

       // Add shared score tracker
    const header = document.createElement('div');
    const scoreDisplay = document.createElement('span');
    scoreDisplay.id = 'score-display';
    scoreDisplay.textContent = `Score: ${totalScore}`;
    header.appendChild(scoreDisplay);
    main.appendChild(header);

    questions.forEach((currentQuestion, index) => {
        const quizContainer = document.createElement('div');
        quizContainer.className = 'quiz-container';
        if (index !== 0) quizContainer.classList.add('hidden');

        const question = document.createElement('h2');
        question.textContent = currentQuestion.question;

        const questionNumberAndScore = document.createElement('div');
        const questionNumber = document.createElement('span');
        questionNumber.textContent = `Question ${currentQuestion.questionNumber} of ${questions.length}`;

        questionNumberAndScore.appendChild(questionNumber);

        const options = document.createElement('div');
        options.className = 'options';

        for (let i = 0; i < 4; i++) {
            const option = document.createElement('div');
            option.className = 'option';
            let optionLetter = String.fromCharCode(97 + i);
            option.textContent = currentQuestion.options[optionLetter];

            option.addEventListener('click', () => {
                options.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                if (optionLetter === currentQuestion.correctAnswer) {
                    totalScore = totalScore +1;
                    scoreDisplay.textContent = `Score: ${totalScore}`;
                }

                setTimeout(() => {
                    const allQuestions = document.querySelectorAll('.quiz-container');
                    allQuestions[currentQuestionNumber].classList.add('hidden');
                    currentQuestionNumber++;

                    if (currentQuestionNumber < allQuestions.length) {
                        allQuestions[currentQuestionNumber].classList.remove('hidden');
                    } else {
                        main.innerHTML = `<h2>Quiz Over!</h2><p>Your score: ${totalScore}</p>`;
                    }
                }, 500);
            });

            options.appendChild(option);
        }

        quizContainer.append(question, questionNumberAndScore, options);
        main.appendChild(quizContainer);
    });
}
