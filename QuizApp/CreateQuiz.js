function createQuiz() {
  var qTitle = document.getElementById("qTitle");
  var numQ = document.getElementById("numQ");
  var category = document.getElementById("category");

  console.log(qTitle.value);
  console.log(numQ.value);
  console.log(category.value);

  if (!qTitle.value || !numQ.value || !category) {
    alert("Please fill in all fields.");
    return;
  }

  const url = "http://localhost:8080/quiz/create";
  const headerParams = {
    title: qTitle.value,
    numQ: numQ.value,
    category: category,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify(headerParams),
  };

  fetch(url, options).then((response) => {
    if (response.ok) {
      return response.json();
      info("Quiz created successfully!");
    } else {
      throw new Error("Network response was not ok");
    }
  });
}
