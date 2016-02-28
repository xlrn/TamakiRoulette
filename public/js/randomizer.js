document.getElementById(randomize).onclick = setChoice;

function chooseOne() {
  var One = Math.floor(Math.random() * 5) + 1;
  return One;
}

function setChoice() {

   var f = document.parm;

  var One = chooseOne();
  var Choice = document.getElementById("choice" + One).value;
  var Change = document.getElementById("randomized").value;
  Change = Choice;

  f.Change.readOnly = false;
  f.Change.value = Choice;
  f.Change.readOnly = true;
}
