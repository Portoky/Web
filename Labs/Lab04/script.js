var inputCounter = 0;
var inputList = [];
var chosenlist = "";
document.getElementById("listtags").addEventListener("click", function (event) {
  if (event.target.value === "ul") {
    chosenlist = "ul";
    var newInput = document.createElement("input");
    newInput.type = "text";
    newInput.id = "inputU" + inputCounter;
    document.body.appendChild(newInput);
    newInput.addEventListener("input", function (event) {
      inputCounter += 1;
      inputList.push(event.target.value);
      var newerInput = document.createElement("input");
      newerInput.type = "text";
      newerInput.id = "inputU" + inputCounter;
      document.body.appendChild(newInput);
    });
  } else if (event.target.value === "ol") {
    chosenlist = "ul";
    var newInput = document.createElement("input");
    newInput.type = "text";
    newInput.id = "inputO" + inputCounter;
    document.body.appendChild(newInput);
  } else {
    return;
  }
});

document.getElementById("generate").addEventListener("click", function (event) {
  if (chosenlist.length === 0) {
    return;
  }
  var listelement;
  if (chosenlist === "ul") {
    listelement = document.createElement("ul");
  } else if (chosenlist === "ol") {
    listelement = document.createElement("ol");
  }
  for (input in inputList) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(input));
    listelement.appendChild(li);
  }
});
