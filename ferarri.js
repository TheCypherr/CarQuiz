// THE WHOLE CODE BELOW WORKS IF YOU DON'T WANT TO IMPLEMENT "NEXT BTN"
"use strict";
// Array of question objects
const questions = [
  {
    question: "What is the name of Ferrari's first production car?",
    answers: [
      { text: "125 S", correct: true },
      { text: "IS 250", correct: false },
      { text: "150 F", correct: false },
      { text: "200 S", correct: false },
    ],
  },
  {
    question: "Which Ferrari model was designed by Pininfarina?",
    answers: [
      { text: "125 ST California", correct: false },
      { text: "250 GT California", correct: true },
      { text: "150 FS Georgia", correct: false },
      { text: "200 TY Michigan", correct: false },
    ],
  },
  {
    question: "What is the name of Ferrari's entry-level sports car?",
    answers: [
      { text: "Portofino", correct: true },
      { text: "Alexanda", correct: false },
      { text: "Fernandes", correct: false },
      { text: "Trod", correct: false },
    ],
  },
  {
    question: "Which Ferrari model won the 24 Hours of Le Mans in 1960?",
    answers: [
      { text: "200 TR50/51", correct: false },
      { text: "120 GT10/21", correct: false },
      { text: "150 FT80/77", correct: false },
      { text: "250 TR59/60", correct: true },
    ],
  },
  {
    question: "What is the name of Ferrari's high-performance V12 engine?",
    answers: [
      { text: "C125", correct: false },
      { text: "S250", correct: false },
      { text: "F140", correct: true },
      { text: "C750", correct: false },
    ],
  },
  {
    question: "Which Ferrari model features a removable roof panel?",
    answers: [
      { text: "488 Spider", correct: true },
      { text: "F140", correct: false },
      { text: "150 FT80/77", correct: false },
      { text: "200 S", correct: false },
    ],
  },
  {
    question: "What is the name of Ferrari's racing division?",
    answers: [
      { text: "Ariana Clawson", correct: false },
      { text: "Corse Clienti", correct: true },
      { text: "Bobby Wills", correct: false },
      { text: "Clientili", correct: false },
    ],
  },
  {
    question: "What is the name of Ferrari's limited-edition hypercar?",
    answers: [
      { text: "F60 America", correct: true },
      { text: "Corse Clienti", correct: false },
      { text: "488 Spider", correct: false },
      { text: "120 GT10/21", correct: false },
    ],
  },
  {
    question: "What is the name of Ferrari's high-performance SUV?",
    answers: [
      { text: "488 Spider", correct: false },
      { text: "Purosangue", correct: true },
      { text: "150 F", correct: false },
      { text: "250 GT California", correct: false },
    ],
  },
  {
    question:
      "Which Ferrari model was the first to feature a hybrid powertrain?",
    answers: [
      { text: "488 Spider", correct: false },
      { text: "HY-KERS", correct: true },
      { text: "150 F", correct: false },
      { text: "250 GT", correct: false },
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
    return window.location.assign("end.html");
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

// THE WHOLE CODE BELOW WORKS IF YOU WANT TO IMPLEMENT "NEXT BTN"
/*
// Select DOM elements
const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

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
  nextButton.style.display = "none"; // Hide the next button
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
  nextButton.style.display = "block"; // Show the next button
}

// Function to show the final score (implementation needed)
function showScore() {
  // Implement your show score logic here
}

// Function to handle the next button click
function handleNextButton() {
  if (questionCounter < MAX_QUESTIONS) {
    // If there are more questions, get a new random question index
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    showQuestion(); // Display the next question
  } else {
    showScore(); // Show the final score if all questions are answered
  }
}

// Add click event listener to the next button
nextButton.addEventListener("click", handleNextButton);

// Start the game
startQuiz();
*/
