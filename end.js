"use strict";
const totalScore = document.querySelector("#totalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const menuToggle = document.querySelector("#menuToggle");

totalScore.innerText = `You score ${mostRecentScore} / 100`;

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
