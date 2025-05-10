window.addEventListener("DOMContentLoaded", () => {
  // console.log(sessionStorage.getItem("myData")); // For debugging
  displayResult(); // Call the function to populate data
});

function displayResult() {
  let score = sessionStorage.getItem("score");
  let result = sessionStorage.getItem("result");
  const data = sessionStorage.getItem("myData");

  if (data && score && result) {
    const parsedData = JSON.parse(data); // Parse the stored JSON data

    // Populate the table with the quiz data
    document.getElementById("quizId").innerText = parsedData[0].id;
    document.getElementById("quizTitle").innerText = parsedData[0].title;
    document.getElementById("quizTopic").innerText = parsedData[0].category;
    document.getElementById("score").innerText = score;
    if (result == "Fail") {
      const resultTag = document.getElementById("result");
      resultTag.className = "m-4 text-danger fw-bold";
      resultTag.innerText = result;
    } else {
      const resultTag = document.getElementById("result");
      resultTag.className = "m-4  text-success fw-bold";
      resultTag.innerText = result;
    }
  } else {
    console.warn("No quiz data found in sessionStorage.");
  }
}
