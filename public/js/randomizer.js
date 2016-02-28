function chooseOne(numOfValues) {
  //numOfValues = numOfValues - 1;
  var One = Math.floor(Math.random() * numOfValues-1) + 1;
  console.log("random number is: "+ One);
  return One;
  //console.log("random number is: "+ One);
}

function setChoice() {
  var inputs=[document.getElementById("choice0").value,document.getElementById("choice1").value,document.getElementById("choice2").value,
  document.getElementById("choice3").value,document.getElementById("choice4").value,document.getElementById("choice5").value];
  var choices = [];
  for(i = 0; i < inputs.length; i++){
  if(inputs[i]){
  	choices.push(inputs[i]); 
  }
  }
   console.log("choices are : "+ choices +" and it's length is: "+choices.length);
  var One = chooseOne(choices.length);
  var Choice = choices[One];
  //var Change = document.getElementById("randomized").value;
  //Change = Choice;
  console.log("random value is: "+ Choice);
  if(choices.length === 0){
  	document.getElementById("randomized").value = "No inputs! Please make some choices!";
  }
  else{
  document.getElementById("randomized").value = Choice;
  }
}
