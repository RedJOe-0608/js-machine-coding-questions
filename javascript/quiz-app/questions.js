const rawQuestions = [
    {
        question: 'What is the capital of France?',
        options: {
            a: 'London',
            b: 'Berlin',
            c: 'Paris',
            d: 'Madrid'
        },
        correctAnswer: 'c'
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: {
            a: 'Venus',
            b: 'Mars',
            c: 'Jupiter',
            d: 'Saturn'
        },
        correctAnswer: 'b'
    },
    {
        question: 'Who wrote "Romeo and Juliet"?',
        options: {
            a: 'William Shakespeare',
            b: 'Charles Dickens',
            c: 'Mark Twain',
            d: 'Jane Austen'
        },
        correctAnswer: 'a'
    },
    {
        question: 'What is the largest mammal in the world?',
        options: {
            a: 'African Elephant',
            b: 'Blue Whale',
            c: 'Giraffe',
            d: 'Hippopotamus'
        },
        correctAnswer: 'b'
    },
    {
        question: 'Which gas do plants use for photosynthesis?',
        options: {
            a: 'Oxygen',
            b: 'Carbon Dioxide',
            c: 'Nitrogen',
            d: 'Hydrogen'
        },
        correctAnswer: 'b'
    },
    {
        question: 'Which continent is the Sahara Desert located on?',
        options: {
            a: 'Asia',
            b: 'Africa',
            c: 'Australia',
            d: 'South America'
        },
        correctAnswer: 'b'
    }
];


export const questions = rawQuestions.map((q,index)=> ({
    ...q,
    id: index+1,
    questionNumber: index+1
}))