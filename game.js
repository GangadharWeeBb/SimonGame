const buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to hold game patterns
let gamePattern = [];
let userClickedPattern = [];

// Game variables
let started = false;
let level = 0;

// Function to handle keypress event
document.addEventListener("keypress", function(event) {
  if (!started) {
    document.getElementById("level-title").textContent = "Level " + level;
    nextSequence();
    started = true;
  }
});

// Function to handle button clicks
const buttons = document.querySelectorAll(".btn");
buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });
});

// Function to check user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 800);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    document.getElementById("level-title").textContent = "Game Over, Press Any Key to Restart";

    setTimeout(function() {
      document.body.classList.remove("game-over");
    }, 400);

    startOver();
  }
}

// Function to generate next sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  document.getElementById("level-title").textContent = "Level " + level;
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  const btn = document.getElementById(randomChosenColour);
  btn.classList.add("fade");
  setTimeout(function() {
    btn.classList.remove("fade");
  }, 500);
  playSound(randomChosenColour);
}

// Function to animate button press
function animatePress(currentColor) {
  const btn = document.getElementById(currentColor);
  btn.classList.add("pressed");
  setTimeout(function() {
    btn.classList.remove("pressed");
  }, 200);
}

// Function to play sound
function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to reset game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
