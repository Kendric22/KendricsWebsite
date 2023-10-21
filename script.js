const header = document.querySelector(".navbar");

window.onscroll = function () {
  var top = window.scrollY;
  if (top >= 100) {
    header.classList.add("navbarDark");
  } else {
    header.classList.remove("navbarDark");
  }
};
const body = document.querySelector("body");
const modeToggle = document.getElementById("mode-toggle");
const modeStatus = document.querySelector(".mode-status");

function toggleMode() {
  body.classList.toggle("dark-mode");

  const modeMessage = body.classList.contains("dark-mode")
    ? "Dark Mode"
    : "Light Mode";

  modeStatus.innerText = "Currently in " + modeMessage;
}
modeToggle.addEventListener("click", toggleMode);
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded successfully!");
});

function validateName() {
  var name = document.getElementById("contact-name").value;

  if (name.length == 0) {
    producePrompt("Name is required", "name-error", "red");
    return false;
  }

  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    producePrompt("First and last name, please.", "name-error", "red");
    return false;
  }

  producePrompt("Valid", "name-error", "green");
  return true;
}

function validatePhone() {
  var phone = document.getElementById("contact-phone").value;

  if (phone.length == 0) {
    producePrompt("Phone number is required.", "phone-error", "red");
    return false;
  }

  if (phone.length != 10) {
    producePrompt("Include area code.", "phone-error", "red");
    return false;
  }

  if (!phone.match(/^[0-9]{10}$/)) {
    producePrompt("Only digits, please.", "phone-error", "red");
    return false;
  }

  producePrompt("Valid", "phone-error", "green");
  return true;
}

function validateEmail() {
  var email = document.getElementById("contact-email").value;

  if (email.length == 0) {
    producePrompt("Email Invalid", "email-error", "red");
    return false;
  }

  if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
    producePrompt("Email Invalid", "email-error", "red");
    return false;
  }

  producePrompt("Valid", "email-error", "green");
  return true;
}

function validateMessage() {
  var message = document.getElementById("contact-message").value;
  var required = 30;
  var left = required - message.length;

  if (left > 0) {
    producePrompt(left + " more characters required", "message-error", "red");
    return false;
  }

  producePrompt("Valid", "message-error", "green");
  return true;
}
function validateForm() {
  if (
    !validateName() ||
    !validatePhone() ||
    !validateEmail() ||
    !validateMessage()
  ) {
    jsShow("submit-error");
    producePrompt("Please fix errors to submit.", "submit-error", "red");
    setTimeout(function () {
      jsHide("submit-error");
    }, 2000);
  } else {
  }
}
function jsShow(id) {
  document.getElementById(id).style.display = "block";
}

function jsHide(id) {
  document.getElementById(id).style.display = "none";
}

function producePrompt(message, promptLocation, color) {
  document.getElementById(promptLocation).innerHTML = message;
  document.getElementById(promptLocation).style.color = color;
}

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.currentQuestionIndex = 0;
}

Quiz.prototype.guess = function (answer) {
  if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.currentQuestionIndex++;
};
Quiz.prototype.getCurrentQuestion = function () {
  return this.questions[this.currentQuestionIndex];
};
Quiz.prototype.hasEnded = function () {
  return this.currentQuestionIndex >= this.questions.length;
};
function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}
Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};
var QuizUI = {
  displayNext: function () {
    if (quiz.hasEnded()) {
      this.displayScore();
    } else {
      this.displayQuestion();
      this.displayChoices();
      this.displayProgress();
    }
  },
  displayQuestion: function () {
    this.populateIdWithHTML("question", quiz.getCurrentQuestion().text);
  },
  displayChoices: function () {
    var choices = quiz.getCurrentQuestion().choices;
    for (var i = 0; i < choices.lenght; i++) {
      this.populateIdWithHTML("choice" + i, choices[i]);
      this.guessHandler("guess" + i, choices[i]);
    }
  },
  displayScore: function () {
    var gameOverHTML = "<h1>Game Over</h1>";
    gameOverHTML += "<h2> Your score is:" + quiz.score + " / 5 </h2>";
    this.populateIdWithHTML("quiz", gameOverHTML);
  },
  populateIdWithHTML: function (id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },
  guessHandler: function (id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
      quiz.guess;
      QuizUI.displayNext();
    };
  },
  displayProgress: function () {
    var currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.populateIdWithHTML(
      "progress",
      "Question" + currentQuestionNumber + "of" + quiz.questions.length
    );
  }
};
var questions = [
  new Question(
    "Which planet has the most moons?",
    ["Jupiter", "Uranus", "Saturn", "Mars"],
    "Saturn"
  ),
  new Question(
    "What country has won the most world cups?",
    ["Brazil", "Argentina", "England", "France"],
    "Brazil"
  ),
  new Question(
    "How many bones are in the human ear?",
    ["8", "14", "5", "3"],
    "3"
  ),
  new Question(
    "Which Netflix show had the most streaming views of 2021?",
    ["The Witcher", "Arcane: League of Legends", "Squid Game", "Midnight Mass"],
    "Squid Game"
  ),
  new Question(
    "What is the biggest state in the US?",
    ["Michigan", "Florida", "Texas", "Alaska"],
    "Alaska"
  )
];
var quiz = new Quiz(questions);

QuizUI.displayNext();
