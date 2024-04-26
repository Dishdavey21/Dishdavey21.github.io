const questions = [
    {
        question: "How do you feel right now?",
        options: [
            { text: "Happy", score: 3 },
            { text: "Neutral", score: 1 },
            { text: "Sad", score: -2 }
        ]
    },
    {
        question: "On a scale of 1 to 10, how would you rate your current level of happiness?",
        options: [
            { text: "1", score: -2 },
            { text: "2", score: -1 },
            { text: "3", score: 0 },
            { text: "4", score: 1 },
            { text: "5", score: 2 },
            { text: "6", score: 3 },
            { text: "7", score: 4 },
            { text: "8", score: 5 },
            { text: "9", score: 6 },
            { text: "10", score: 7 }
        ]
    },
    {
        question: "Did you get enough sleep last night?",
        options: [
            { text: "Yes", score: 2 },
            { text: "No", score: -1 }
        ]
    },
    {
        question: "Have you experienced any stress today?",
        options: [
            { text: "Yes", score: -1 },
            { text: "No", score: 2 }
        ]
    },
    {
        question: "How satisfied are you with your current work/school/life situation?",
        options: [
            { text: "Very dissatisfied", score: -2 },
            { text: "Dissatisfied", score: -1 },
            { text: "Neutral", score: 0 },
            { text: "Satisfied", score: 2 },
            { text: "Very satisfied", score: 3 }
        ]
    },
    {
        question: "Have you had any meaningful social interactions today?",
        options: [
            { text: "Yes, several", score: 3 },
            { text: "Yes, one or two", score: 2 },
            { text: "No", score: -1 }
        ]
    },
    {
        question: "How would you describe your energy levels at the moment?",
        options: [
            { text: "High", score: 3 },
            { text: "Medium", score: 1 },
            { text: "Low", score: -2 }
        ]
    },
    {
        question: "Are you feeling motivated to accomplish your tasks today?",
        options: [
            { text: "Very motivated", score: 3 },
            { text: "Motivated", score: 2 },
            { text: "Neutral", score: 0 },
            { text: "Demotivated", score: -1 },
            { text: "Very demotivated", score: -2 }
        ]
    },
    {
        question: "Have you engaged in any activities that you enjoy recently?",
        options: [
            { text: "Yes, several times", score: 3 },
            { text: "Yes, once or twice", score: 2 },
            { text: "No", score: -1 }
        ]
    },
    {
        question: "How would you rate your overall mood compared to yesterday?",
        options: [
            { text: "Better", score: 2 },
            { text: "Same", score: 0 },
            { text: "Worse", score: -2 }
        ]
    }
];

const activities = {
    "Happy": ["Go for a walk in nature", "Listen to your favorite music", "Hang out with friends"],
    "Neutral": ["Read a book", "Try a new hobby", "Take a relaxing bath"],
    "Sad": ["Watch a funny movie", "Write in a journal", "Practice deep breathing exercises"]
};

const quizForm = document.getElementById('quiz-form');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');

let userAnswers = [];

function renderQuestion(index) {
    questionContainer.innerHTML = '';
    const question = questions[index];
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `
        <h2>${question.question}</h2>
        <div>
            ${question.options.map(option => `
                <input type="radio" name="answer" value="${option.score}" required>
                <label>${option.text}</label>
            `).join('')}
        </div>
    `;
    questionContainer.appendChild(questionElement);
}

function showResult() {
    const totalScore = userAnswers.reduce((acc, score) => acc + parseInt(score), 0);
    let mood = '';
    if (totalScore >= 5) {
        mood = 'Happy';
    } else if (totalScore >= 0) {
        mood = 'Neutral';
    } else {
        mood = 'Sad';
    }
    const suggestion = activities[mood][Math.floor(Math.random() * activities[mood].length)];
    resultContainer.innerHTML = `
        <h2>Your mood is: ${mood}</h2>
        <p>We suggest: ${suggestion}</p>`;
}


quizForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers.push(selectedOption.value);
        if (userAnswers.length < questions.length) {
            renderQuestion(userAnswers.length);
        } else {
            showResult();
        }
    }
});

renderQuestion(0);
