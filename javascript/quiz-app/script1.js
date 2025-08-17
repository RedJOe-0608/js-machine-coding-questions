//Approach 1:

import {questions} from './questions.js'

const startBtn = document.querySelector('.start-btn');
startBtn.addEventListener('click', startQuiz);
const main = document.getElementById('container')

let totalScore = 0,currentQuestionNumber = 0;

function startQuiz(){
   renderQuestion()
}

function renderQuestion(){

    // If we've reached the end
    if (currentQuestionNumber >= questions.length) {
        main.innerHTML = `<h2>Quiz Over!</h2><p>Your score: ${totalScore}</p>`;
        return;
    }

    main.innerHTML = '' // clear the previous question

    const currentQuestion = questions[currentQuestionNumber]; // extract the current question.

    const quizContainer = document.createElement('div');
    quizContainer.className = 'quiz-container';

    const question = document.createElement('h2');
    question.textContent = currentQuestion.question;

    const questionNumberAndScore = document.createElement('div');

    const questionNumber = document.createElement('span');
    questionNumber.textContent = `Question ${currentQuestion.questionNumber} of ${questions.length}`
    const score = document.createElement('span');
    score.textContent = `Score: ${totalScore}`

    questionNumberAndScore.append(questionNumber,score);

    const options = document.createElement('div');
    options.className = 'options';
    
    //for options
    for(let i=0;i<4;i++){
        
        const option = document.createElement('div');
        option.className = 'option'
        let optionLetter = String.fromCharCode(97+i);
        option.textContent = currentQuestion.options[optionLetter];
        
        options.appendChild(option);
    }

    quizContainer.append(question,questionNumberAndScore,options)

    main.appendChild(quizContainer);

    options.addEventListener('click',function(e){
            if(!e.target.classList.contains('option')) return;

            const chosenOption = e.target.textContent

            if(chosenOption === currentQuestion.options[currentQuestion.correctAnswer]){
                totalScore = totalScore + 1;
                score.textContent = `Score: ${totalScore}`
                console.log(`Correct answer! Score updated to ${totalScore}`);
            }
            
        currentQuestionNumber++;
        renderQuestion()   
    })
}