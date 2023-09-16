console.log("Script loaded!"); 
let questions = [
    {
        question: 'Which of the following is NOT a valid JavaScript data type?',
        answers: ['undefined','null','char','boolean'],
        correct: 2 //index of the correct answer
    },
    {
        question: 'Which method can be used to decode a URL in JavaScript?',
        answers: ['decodeURI()','decodeURIComponent','unescape()','Both A and B'],
        correct: 3 //index of the correct answer
    },
    {
        question: 'What will the following code output? console.log(typeof null);',
        answers: ['object','null','undefined','NaN'],
        correct: 0 //index of the correct answer
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: ['function = myFuction()','function:myFunction()function','myFunction()','myFunction function()'],
        correct: 2 //index of the correct answer
    },
    {
        question: 'Which of the following is NOT a reserved word in JavaScript?',
        answers: ['interface','throws','program','short'],
        correct: 2 //index of the correct answer
    },
    {
        question: 'Which built-in method returns the calling string value converted to upper case?',
        answers: ['toUpper()','toUpperCase()','changeCase(case)','None of the above'],
        correct: 1 //index of the correct answer
    },
    {
        question: 'What does the this keyword refer to inside a JavaScript function?',
        answers: ['The function itself','The object that invoked the function','The global object (usually window in browsers)','Depends on how the function was invoked'],
        correct: 3 //index of the correct answer
    },
    {
        question: 'Which event fires whenever a control loses focus?',
        answers: ['onblur','onfocus','onformchange','onforminput'],
        correct: 0 //index of the correct answer
    },
    {
        question: 'Which of the following correctly describes how to add a comment in JavaScript?',
        answers: ['<!--This is a comment-->','//This is a comment','--This is a comment--','**This is a comment**'],
        correct: 1 //index of the correct answer
    },
    {
        question: 'Which of the following methods can be used to check if an object is an array?',
        answers: ['typeof','isArray()','isObject()','instanceof'],
        correct: 3 //index of the correct answer
    },
];

let timer = 60;
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;

document.getElementById('start-btn').addEventListener('click', function() {
    this.style.display = 'none';
    document.querySelector('.start-container').style.display = 'none';
    document.getElementById('quiz-area').style.display = 'block';

    // Start the timer
    timerInterval = setInterval(function() {
        timer--;
        if (timer <= 0) {
            endGame();
            timer = 0;
        }
        document.getElementById('timer').innerText = 'Time Left: ' + timer;
    }, 1000);

    // Attach event listeners to answer buttons once
    document.querySelectorAll('.answer-btn').forEach((btn, index) => {
        btn.addEventListener('click', function() {
            checkAnswer(index);
        });
    });

    displayQuestion();
});

function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        let q = questions[currentQuestionIndex];
        document.getElementById('question').innerText = q.question;
        let btns = document.querySelectorAll('.answer-btn');
        for (let i = 0; i < btns.length; i++) {
            btns[i].innerHTML = `<span class="option-number">${i + 1}.</span> ${q.answers[i]}`;
        }

        document.getElementById('feedback').style.display = 'none';
    } else {
        endGame();
    }
}


function checkAnswer(index) {
    let q = questions[currentQuestionIndex];
    let feedbackEl = document.getElementById('feedback');
    if (index === q.correct) {
        score++;
        feedbackEl.innerText = 'Correct!';
    } else {
        timer = Math.max(timer - 10, 0); // Deducts 10 seconds for every wrong answer
        feedbackEl.innerText = 'Wrong!';
    }

    feedbackEl.style.display = 'block';

    setTimeout(function() {
        feedbackEl.style.display = 'none';
        currentQuestionIndex++;
        displayQuestion();
    }, 1000); // Display feedback for 1 second
}
function endGame() {
    clearInterval(timerInterval); // Stop the timer
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('end-area').style.display = 'block';
    document.getElementById('score').innerText = score;

    let saveButton = document.getElementById('save-btn');
    if (!saveButton.clicked) {
        saveButton.clicked = true;
        saveButton.addEventListener('click', function() {
            let initials = document.getElementById('initials').value;
            let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
            highScores.push({ initials: initials, score: score });
    
            highScores.sort((a, b) => b.score - a.score);
            if (highScores.length > 10) highScores.pop();
    
            localStorage.setItem('highScores', JSON.stringify(highScores));
        });
    }
}

function showHighScores() {
    console.log("Highscores button clicked!")
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    highScores.sort((a, b) => b.score - a.score);
    
    let top3 = highScores.slice(0, 3);
    
    let list = document.getElementById('highscores-list');
    list.innerHTML = '';
    
    top3.forEach(score => {
        let listItem = document.createElement('li');
        listItem.innerText = `${score.initials}: ${score.score}`;
        list.appendChild(listItem);
    });
    
    let container = document.getElementById('highscores-container');
    container.style.display = container.style.display === 'none' ? 'block' : 'none';
}

document.getElementById('highscores-btn').addEventListener('click', showHighScores);
