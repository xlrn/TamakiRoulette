function chooseOne() {
  var One = Math.floor(Math.random() * 5) + 1;
  return One;
}

function setChoice() {
  var One = chooseOne();
  var Choice = document.getElementById("choice" + One).value;
  var Change = document.getElementById("randomized").value;
  Change = Choice;
}
