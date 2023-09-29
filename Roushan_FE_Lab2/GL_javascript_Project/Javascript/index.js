function Answer(answerText) {
  this.answerText = answerText;
}

function Question(questionNo, questionText, answerChoices, rightAnswer) {
  this.questionNo = questionNo;
  this.questionText = questionText;
  this.answerChoices = answerChoices;
  this.rightAnswer = rightAnswer;

  this.isUserAnswerCorrect = function (userSelectedAnswer) {
    if (rightAnswer.answerText == userSelectedAnswer) {
      console.log("Correct Answer");
      return true;
    } else {
      console.log("Wrong answer");
      return false;
    }
  };
}

var answerJunagarh = new Answer("Junagarh");
var answerDiphu = new Answer("Diphu");
var answerKohima = new Answer("Kohima");
var answerGangtok= new Answer("Gangtok");

var question1 = new Question(
  1,
  "Garampani sanctuary is located at",
  [answerJunagarh, answerDiphu, answerKohima, answerGangtok],
  answerDiphu
);

var answerHorseracing = new Answer("Horse racing");
var answerPolo = new Answer("Polo");
var answerShooting = new Answer("Shooting");
var answerSnooker = new Answer("Snooker");

var question2 = new Question(
  2,
  "Epsom (England) is the place associated with",
  [answerHorseracing, answerPolo, answerShooting, answerSnooker],
  answerHorseracing
);

var answerUSA = new Answer("USA");
var answerFiji = new Answer("Fiji");
var answerIndia = new Answer("India");
var answerUK = new Answer("UK");

var question3 = new Question(
  3,
  "Golf player Vijay Singh belongs to which country?",
  [answerUSA, answerFiji, answerIndia, answerUK],
  answerFiji
);

var answerNagaland = new Answer("Nagaland");
var answerArunachalPradesh = new Answer("Arunachal Pradesh");
var answerAssam = new Answer("Assam");
var answerAll = new Answer("All");

var question4 = new Question(
  4,
  "Guwahati High Court is the judicature of",
  [answerNagaland, answerArunachalPradesh, answerAssam, answerAll],
  answerAll
);


var answerPimpri = new Answer("Pimpri");
var answerRajkot = new Answer("Rajkot");
var answerPune = new Answer("Pune");
var answerPerambur = new Answer("Perambur");

var question5 = new Question(
  5,
  " Film and TV institute of India is located at ",
  [answerPimpri, answerRajkot,answerPune, answerPerambur],
  answerPune
);

function QuizResult(questionAnswersObj) {
  this.questionAnswersObj = questionAnswersObj;
  this.score = 0;

  this.getScore = function () {
    return this.score;
  };

  this.incrementScore = function () {
    console.log("Score is incremented...");
    this.score++;
  };

  this.calculatePercentage = function () {
    console.log("questionAnswersObj" + questionAnswersObj);
    console.log("questionAnswersObj" + this.questionAnswersObj.length);

    var percentage = (this.score / this.questionAnswersObj.length) * 100;
    console.log("Percentage " + percentage);
    return percentage;
  };
}

function QuizApplication(questionAnswersObj) {
  this.questionAnswersObj = questionAnswersObj;
  this.quizResult = new QuizResult(this.questionAnswersObj);
  this.pageIndex = 0;

  this.load = function () {
    this.attachListeners();
    this.displayQuizPage();
  };

  this.attachListeners = function () {
    var qaPairObj = this.questionAnswersObj[this.pageIndex];
    var answerChoices = qaPairObj.answerChoices;
    console.log("Number of answers is " + answerChoices.length);

    var currentQuizAppObj = this;

    for (var index = 0; index < answerChoices.length; index++) {
      var buttonId = "btn" + index;
      var answerChoiceButton = document.getElementById(buttonId);
      this.addEventListener(answerChoiceButton, currentQuizAppObj);
    }
  };

  this.addEventListener = function (answerChoiceButton, currentQuizAppObj) {
    answerChoiceButton.onclick = function (event) {
      var target = event.currentTarget;
      console.log("Button is clicked " + target);
      var userSelectedAnswer = target.children[0].innerHTML;
      console.log("User selected text " + userSelectedAnswer);
      var qaPairObj =
        currentQuizAppObj.questionAnswersObj[currentQuizAppObj.pageIndex];
      var outcome = qaPairObj.isUserAnswerCorrect(userSelectedAnswer);

      if (outcome) {
        currentQuizAppObj.quizResult.incrementScore();
      } else {
        // Do nothing
      }

      currentQuizAppObj.next();
    };
  };

  this.next = function () {
    if (this.isLastQuestionAnswerPair()) {
      this.displayResultPage();
    } else {
      this.displayNextQuizPage();
    }
  };

  this.displayNextQuizPage = function () {
    this.pageIndex++;
    this.attachListeners();
    this.displayQuizPage();
  };

  this.displayResultPage = function () {
    var quizElement = document.getElementById("quiz");
    var content =
      "<h1>Result </h1><h2 id='score'>Your score : " +
      this.quizResult.getScore() +
      ". Percentage is " +
      this.quizResult.calculatePercentage() +
      " </h2>";
    quizElement.innerHTML = content;
  };

  this.displayQuizPage = function () {
    this.displayQASection();
    this.displayProgressSection();
  };

  this.displayQASection = function () {
    var qaPairObj = this.questionAnswersObj[this.pageIndex];
    var questionElement = document.getElementById("question");
    questionElement.innerText = qaPairObj.questionText;
    var answerChoices = qaPairObj.answerChoices;
    console.log("Number of answers is " + answerChoices.length);

    for (var index = 0; index < answerChoices.length; index++) {
      var answerChoiceObj = answerChoices[index];
      var identifier = "choice" + index;
      var answerChoiceElement = document.getElementById(identifier);
      answerChoiceElement.innerText = answerChoiceObj.answerText;
    }
  };

  this.displayProgressSection = function () {
    var progressElement = document.getElementById("progress");
    var qaPairObj = this.questionAnswersObj[this.pageIndex];
    var progressText =
      "Question " + qaPairObj.questionNo + " of " + questionAnswersObj.length;
    progressElement.innerText = progressText;
  };

  this.isLastQuestionAnswerPair = function () {
    if (this.pageIndex == this.questionAnswersObj.length - 1) {
      return true;
    } else {
      return false;
    }
  };
}

var javascriptQuizApp = new QuizApplication([
  question1,
  question2,
  question3,
  question4,
  question5,
]);
javascriptQuizApp.load();
