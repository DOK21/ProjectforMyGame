window.addEventListener("load", (event) => {
  const question = document.getElementById("question");
  const choices = Array.from(document.getElementsByClassName("choice-text"));
  const questionCounterText = document.getElementById("questionCounter");
  const scoreText = document.getElementById("score");
  console.log(choices);
  // get
  // element (piece of information) - (element, is an html element / tag)
  // by id ()
  // it looks for the first html element that has the id "question"

  const progressText = document.getElementById("progressText");
  const scoreText = document.getElementById("score");
  const progressBarFull = document.getElementById("progressBarFull");
  let currentQuestion = {};
  let acceptingAnswers = false;
  let score = 0;
  let questionCounter = 0;
  let availableQuestions = [];

  let questions = [
    {
      question: "Guess the smelliest cheese? ",
      choice1: "<Camembert>",
      choice2: "<Munster>",
      choice3: "<Epoisse>",
      choice4: "<Rocquefort>",
      answer: 3,
    },
    {
      question: "Where does Halloumi cheese come from?",
      choice1: "<Greece>",
      choice2: "<Italy>",
      choice3: "<Lebanon>",
      choice4: "<Portugal>",
      answer: 1,
    },
    {
      question: "Which cheese is made from sheep milk ? ",
      choice1: "<Ossau Iraty>",
      choice2: "<Comté>",
      choice3: "<Mozarella>",
      choice4: "<Parmesan>",
      answer: 1,
    },
    {
      question: "Which cheese has the lowest lactose percentage? ",
      choice1: "<parmesan>",
      choice2: "<Feta>",
      choice3: "<cottage cheese>",
      choice4: "<munster>",
      answer: 1,
    },
  ];
  //const h1 = document.querySelector("h1");
  //h1.innerText = "";

  //CONSTANTS

  const CORRECT_BONUS = 10;
  let MAX_QUESTIONS = 3;

  startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
  };
  startGame();

  getNewQuestion = () => {
    questionCounter++;
    questionCounterText.innerText = "${questionCounter}/{MAX_QUESTIONS}";
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    //getNewQuestion();
    choices.forEach((choice) => {
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
    });
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
  };
  let selectedAnswer = null;
  let selectedChoice = null;
  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      if (!acceptingAnswers) return;
      acceptingAnswers = false;
      console.log(e.target);
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset["number"];

      const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
      selectedChoice.parentElement.classList.add(classToApply);
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
      }, 1000);
    });
  });
  startGame();
  //reached till here on July 14th
  //if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
  //localStorage.setItem("mostRecentScore", score);
  //go to the end page
  //  return window.location.assign("/end.html");
  //need help for this part.

  //questionCounter++;
  //progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  //console.log((questionCounter / MAX_QUESTIONS) * 100);
  //progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  //const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  //currentQuestion = availableQuestions[questionIndex];
  //question.innerText = currentQuestion.question;
  //choices.forEach((choice) => {
  //const number = choice.dataset["number"];
  //choice.innerText = currentQuestion["choice" + number];
  incrementScore = (num) => {
    score += num;
    scoreText.innerText = score;
  };

  const classToApply =
    selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
  if (classToApply === "correct") {
    incrementScore(CORRECT_BONUS);
  }
  console.log(classToApply);
  //selectedChoice.parentElement.classList.add(classToApply);
  setTimeout(() => {
    // selectedChoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
  }, 1000);
});
