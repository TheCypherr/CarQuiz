"use strict";
// Array of questions
const questions = [
  {
    question: "What is the name of Mercedes-Benz's first production car?",
    answers: [
      { text: "Benz Patent-Motorwagen", correct: true },
      { text: "S-Class", correct: false },
      { text: "SLS AMG Electric Drive", correct: false },
      { text: "E-Class Coupe", correct: false },
    ],
  },
  {
    question:
      "Which Mercedes-Benz model is known for its iconic finned rear fenders?",
    answers: [
      { text: "E-Class Coupe", correct: false },
      { text: "GLA", correct: false },
      { text: "7 Series", correct: false },
      { text: "300SL Gullwing", correct: true },
    ],
  },
  {
    question:
      "Which Mercedes-Benz model features a high-performance V8 engine?",
    answers: [
      { text: "190E 2.3-16", correct: false },
      { text: "C63 AMG", correct: true },
      { text: "SLS AMG Electric Drive", correct: false },
      { text: "E-Class Coupe", correct: false },
    ],
  },
  {
    question: "What is the name of Mercedes-Benz's flagship luxury sedan?",
    answers: [
      { text: "260D", correct: false },
      { text: "SLS AMG Electric Drive", correct: false },
      { text: "S-Class", correct: true },
      { text: "300SL Gullwing", correct: false },
    ],
  },
  {
    question:
      "Which Mercedes-Benz model won the 24 Hours of Nurburgring in 2013?",
    answers: [
      { text: "SLS AMG GT3", correct: true },
      { text: "A-Class", correct: false },
      { text: "AMG", correct: false },
      { text: "C63 AMG", correct: false },
    ],
  },
  {
    question: "Which Mercedes-Benz model features a panoramic sunroof?",
    answers: [
      { text: "E350 HYBRID", correct: false },
      { text: "S-Class", correct: false },
      { text: "E-Class Coupe", correct: true },
      { text: "C400", correct: false },
    ],
  },
  {
    question: "What is the name of Mercedes-Benz's entry-level compact car?",
    answers: [
      { text: "Type 57G Tank", correct: false },
      { text: "A-Class", correct: true },
      { text: "SLS AMG Electric Drive", correct: false },
      { text: "260D", correct: false },
    ],
  },
  {
    question: "What is the name of Mercedes-Benz's racing division?",
    answers: [
      { text: "AMG", correct: true },
      { text: "E-Class", correct: false },
      { text: "GT 63 S 4Matic+", correct: false },
      { text: "E-Class Coupe", correct: false },
    ],
  },
  {
    question: "Which Mercedes-Benz model features a hybrid powertrain?",
    answers: [
      { text: "Benz Motorwagen", correct: false },
      { text: "C-Class", correct: false },
      { text: "E350 Hybrid", correct: true },
      { text: "AMG Coupe", correct: false },
    ],
  },
  {
    question: "What is the name of Mercedes-Benz's high-performance coupé?",
    answers: [
      { text: "SLS AMG GT3", correct: false },
      { text: "C63 AMG", correct: false },
      { text: "300SL Gullwing", correct: false },
      { text: "GT 63 S 4Matic+", correct: true },
    ],
  },
];

// Select DOM elements
const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const menuToggle = document.querySelector("#menuToggle");

let currentQuestionIndex = 0; // Initialize index for current question
let score = 0; // Initialize score to 0
let questionCounter = 0; // Initialize question counter to 0

const SCORE_POINTS = 10; // Points for a correct answer
const MAX_QUESTIONS = 10; // Maximum number of questions in the quiz

// Function to start the quiz
function startQuiz() {
  questionCounter = 0; // Reset question counter
  score = 0; // Reset score
  currentQuestionIndex = Math.floor(Math.random() * questions.length); // Get a random initial question index
  showQuestion(); // Display the first question
}

// Function to display the current question
function showQuestion() {
  resetState(); // Reset the state for the new question

  let currentQuestion = questions[currentQuestionIndex]; // Get the current question object
  let questionNo = questionCounter + 1; // Increment question number for display

  // Display the question text
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // Display the answer options
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct; // Mark the correct answer
    }
    button.addEventListener("click", selectAnswer); // Add click event to the button
  });

  questionCounter++; // Increase the question counter
  // Update progress text
  progressText.innerHTML = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  // Update progress bar width
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
}

// Function to increment the score
const incrementScore = (num) => {
  score += num; // Add points to the score
  scoreText.innerHTML = score; // Update the score display
};

// Function to reset the state for a new question
function resetState() {
  // Remove all child elements (answer buttons) from the answerButtons container
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Function to handle answer selection
function selectAnswer(e) {
  const selectedBtn = e.target; // Get the selected button
  const isCorrect = selectedBtn.dataset.correct === "true"; // Check if the answer is correct
  if (isCorrect) {
    selectedBtn.classList.add("correct"); // Add correct class
    incrementScore(SCORE_POINTS); // Increment score if correct
  } else {
    selectedBtn.classList.add("incorrect"); // Add incorrect class
  }
  // Show correct answers and disable all buttons
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true; // Disable all answer buttons
  });

  setTimeout(handleNextButton, 1000); // Automatically move to the next question after 1 sec delay
}

// Function to show the final score
function showScore() {
  if (questions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("endbenz.html");
  }
}

// Function to handle showing the next question
function handleNextButton() {
  if (questionCounter < MAX_QUESTIONS) {
    // If there are more questions, get a new random question index
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    showQuestion(); // Display the next question
  } else {
    showScore(); // Show the final score if all questions are answered
  }
}

// Start the game
startQuiz();

// Function to toggleMenu
function toggleMenu() {
  if (menuToggle.classList.contains("active")) {
    openMenu();
  } else {
    closeMenu();
  }
}

// Function to openMenu
const openMenu = function () {
  menuToggle.classList.remove("active");
};

// Function to closeMenu
const closeMenu = function () {
  menuToggle.classList.add("active");
};

// Function to close menu-items on click
function exitMenu() {
  mainMenu.classList.add("active");
}
