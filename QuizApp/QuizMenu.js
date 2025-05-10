// This will run as soon as the DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  // console.log(sessionStorage.getItem("myData")); // For debugging
  getInnerMenuData(); // Call the function to populate data
});

function getInnerMenuData() {
  // Retrieve the data from sessionStorage
  const data = sessionStorage.getItem("myData");
  // console.log(sessionStorage.getItem("myData")); // For debugging

  if (data) {
    const parsedData = JSON.parse(data)[0]; // Parse the stored JSON data

    // Populate the table with the quiz data
    document.getElementById("quizId").innerText = parsedData.id;
    document.getElementById("quizTitle").innerText = parsedData.title;
    document.getElementById("quizTopic").innerText = parsedData.category;
    document.getElementById("numQ").innerText = parsedData.questionCount;
  } else {
    console.warn("No quiz data found in sessionStorage.");
  }
}
