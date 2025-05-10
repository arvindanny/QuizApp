window.addEventListener("DOMContentLoaded", () => {
  displayQuizTableMenu();
});

function displayQuiz() {
  var url = "http://localhost:8080/quiz/get/";
  var options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
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
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function displayQuizMenu() {
  var quizIDInput = document.getElementById("quizId");
  var quizID = quizIDInput.value;
  // console.log(quizID); // For debugging
  if (!quizID) {
    alert("Please enter a Quiz ID.");
    return;
  }
  if (quizID < 0) {
    alert("Please enter valid Quiz ID.");
    return;
  }

  const url = `http://localhost:8080/quiz/get/QuizMenu?id=${quizID}`;

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  if (sessionStorage.getItem("myData") !== null) {
    sessionStorage.removeItem("myData"); // Clear previous data
  }
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
      console.log(data);

      sessionStorage.setItem("myData", JSON.stringify(data));
      sessionStorage.setItem("quizId", quizID);
      sessionStorage.setItem("quizTitle", data[0].title);
      sessionStorage.setItem("quizTopic", data[0].category);
      console.log("Session : " + sessionStorage.getItem("myData"));
      window.location.href = "/QuizMenu.html";
    })
    .catch((error) => {
      alert("Quiz not found. Please check the quiz ID.");
      console.error("There was a problem with the fetch operation:", error);
    });
}

function displayQuizTableMenu() {
  const quizID = -1;
  const url = `http://localhost:8080/quiz/get/QuizMenu?id=${quizID}`;

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
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
      // console.log(data);
      const parsedData = data;
      const quizTableTag = document.getElementById("quizTable");
      for (var i = 0; i < parsedData.length; i++) {
        const tableRow = document.createElement("tr");
        tableRow.className = "bg-light";
        // console.log(parsedData[i].id);
        const tableDataID = document.createElement("td");
        tableDataID.id = "id";
        tableDataID.innerText = parsedData[i].id;

        const tabeDataTitle = document.createElement("td");
        tabeDataTitle.id = "title";
        tabeDataTitle.innerText = parsedData[i].title;

        const tableDataCategory = document.createElement("td");
        tableDataCategory.id = "category";
        tableDataCategory.innerText = parsedData[i].category;

        tableRow.appendChild(tableDataID);
        tableRow.appendChild(tabeDataTitle);
        tableRow.appendChild(tableDataCategory);
        quizTableTag.appendChild(tableRow);
      }
    });
}
