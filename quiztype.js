"use strict";
// SIDE 2 IMAGE SLIDEs

const slides = document.querySelectorAll(".slides img");
const menuToggle = document.querySelector("#menuToggle");
let slideIndex = 0; // slide of current index
let intervalId = null; // Id to work with

// Function to initialize our slider
document.addEventListener("DOMContentLoaded", initializeSlider); //display image after all DOM content loads
function initializeSlider() {
  if (slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(nextSlide, 3000); //the 3000 here indicates 3 seconds
  }
} // it shows the first image too

// Function to show slide and the index there is of the next slide we'll like to go to
function showSlide(index) {
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  slides.forEach((slide) => {
    slide.classList.remove("displaySlide");
  });
  slides[slideIndex].classList.add("displaySlide");
}

// Function for previous slide
function prevSlide() {
  slideIndex--;
  showSlide(slideIndex);
}

// Function for next slide
function nextSlide() {
  slideIndex++;
  showSlide(slideIndex);
}

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
