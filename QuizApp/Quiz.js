const quizID = sessionStorage.getItem("quizId");
const quizTitle = sessionStorage.getItem("quizTitle");
const quizTopic = sessionStorage.getItem("quizTopic");

window.addEventListener("DOMContentLoaded", () => {
  showQuizQuestions();
});

function showQuizQuestions() {
  const url = "http://localhost:8080/quiz/get/" + quizID;

  document.getElementById("qTitle").innerHTML = quizTitle + " - " + quizTopic;

  options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(`HTTP ${response.status} - ${text}`);
        });
      }
      return response.json();
    })
    .then((data) => {
      //   console.log(data); // For debugging
      renderQuestions(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function renderQuestions(data) {
  const questionContainer = document.getElementById("questionContainer");
  var length = data.length;
  //   console.log(data);
  const container = document.getElementById("questionContainer");
  data.forEach((question, index) => {
    const divTag = document.createElement("div");
    divTag.className = "m-4 card";
    questionDiv = document.createElement("div");
    questionDiv.className = "m-4";
    questionDiv.id = question.id;
    questionDiv.textContent = question.question;
    divTag.appendChild(questionDiv);
    let options = [];
    options.push(question.option1);
    options.push(question.option2);
    options.push(question.option3);
    options.push(question.option4);
    addOptions(question, divTag, index, options);
    container.appendChild(divTag);
  });
}

function addOptions(question, divTag, index, options) {
  for (var i = 0; i < 4; i++) {
    const label = document.createElement("label");
    label.className = "container";
    const input = document.createElement("input");
    input.type = "radio";
    input.className = "m-2";
    input.value = options[i];
    input.name = `question_${index}`;
    input.id = question.id;
    label.appendChild(input);
    label.appendChild(document.createTextNode(options[i]));
    divTag.appendChild(label);
  }
}

function confirmCancelQuiz() {
  //get confirmation from user
  var result = confirm("Are you sure you want to cancel?");
  if (result) {
    //if user clicks ok, redirect to quiz menu page
    window.location.href = "QuizMenu.html";
  } else {
    //if user clicks cancel, do nothing
    return false;
  }
}

function submitQuiz() {
  //get confirmation from user
  var result = confirm("Are you sure you want to submit?");
  if (result) {
    const totalQuesCount = document.querySelectorAll(
      '[id^="questionContainer"] .card'
    ).length;

    var responseList = [];
    for (let i = 0; i < totalQuesCount; i++) {
      const selected = document.querySelector(
        `input[name="question_${i}"]:checked`
      );
      if (selected) {
        // console.log(`Question ${i} answer: ${selected.value}`);
        responseData = {
          id: document.querySelector(`input[name="question_${i}"]:checked`).id,
          response: selected.value,
        };
        responseList.push(responseData);
      } else {
        console.log(`Question ${i} not answered.`);
      }
    }
    console.log(responseList);

    const url = "http://localhost:8080/quiz/submit/" + quizID;
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json", // ✅ Required for JSON
      },
      body: JSON.stringify(responseList),
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(`HTTP ${response.status} - ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        /*
      response = 
      [
    "1",
    "Fail"
    ]
    */
        console.log(data);
        sessionStorage.setItem("score", data[0]);
        sessionStorage.setItem("result", data[1]);
        window.location.href = "Result.html";
      })
      .catch((exception) => {
        console.log(exception);
      });
  } else {
    //if user clicks cancel, do nothing
    return false;
  }
}
