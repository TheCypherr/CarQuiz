"use strict";
// Array of questions
const questions = [
  {
    question: "What is the name of BMW's first production car?",
    answers: [
      { text: "Dixi", correct: true },
      { text: "i3", correct: false },
      { text: "M Motorsport", correct: false },
      { text: "E-Class Coupe", correct: false },
    ],
  },
  {
    question: "Which BMW model is known for its iconic kidney grilles?",
    answers: [
      { text: "3.0 CSL", correct: false },
      { text: "328", correct: true },
      { text: "7 Series", correct: false },
      { text: "300SL Gullwing", correct: false },
    ],
  },
  {
    question: "What is the name of BMW's flagship luxury sedan?",
    answers: [
      { text: "190E 2.3-16", correct: false },
      { text: "7 Series", correct: true },
      { text: "SLS Electric Drive", correct: false },
      { text: "M3", correct: false },
    ],
  },
  {
    question: "Which BMW model features a high-performance inline-6 engine?",
    answers: [
      { text: "260D", correct: false },
      { text: "7 Series (E23)", correct: false },
      { text: "M3", correct: true },
      { text: "300SL Gullwing", correct: false },
    ],
  },
  {
    question: "Which BMW model features a panoramic sunroof?",
    answers: [
      { text: "4 Series Gran Coupe", correct: true },
      { text: "1 Series", correct: false },
      { text: "2002 Turbo", correct: false },
      { text: "X5 xDrive45e", correct: false },
    ],
  },
  {
    question: "What is the name of BMW's entry-level compact car?",
    answers: [
      { text: "X1", correct: false },
      { text: "M Motorsport", correct: false },
      { text: "1 Series", correct: true },
      { text: "400 CF", correct: false },
    ],
  },
  {
    question: "Which BMW model won the 24 Hours of Daytona in 1976?",
    answers: [
      { text: "Type 57G Tank", correct: false },
      { text: "3.0 CSL", correct: true },
      { text: "M4 GTS", correct: false },
      { text: "260D", correct: false },
    ],
  },
  {
    question: "What is the name of BMW's high-performance electric car?",
    answers: [
      { text: "i3", correct: true },
      { text: "M4 GTS", correct: false },
      { text: "GT 63 S Turbo+", correct: false },
      { text: "M8 Competition", correct: false },
    ],
  },
  {
    question: "Which BMW model features a panoramic sunroof?",
    answers: [
      { text: "BMW Motorwagen", correct: false },
      { text: "2002 Turbo", correct: false },
      { text: "4 Series Gran Coupe", correct: true },
      { text: "X5 xDrive45e", correct: false },
    ],
  },
  {
    question: "What is the name of BMW's limited-edition performance car?",
    answers: [
      { text: "Dixi", correct: false },
      { text: "3.0 CSL", correct: false },
      { text: "300SL Gullwing", correct: false },
      { text: "M4 GTS", correct: true },
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
    return window.location.assign("endbmw.html");
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
