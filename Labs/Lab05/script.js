var mainDropDownButton = document.createElement("button");
mainDropDownButton.textContent = "Drop Down Menu";
mainDropDownButton.style.width = "100px";
mainDropDownButton.style.height = "40px";
mainDropDownButton.style.backgroundColor = "red";
document.body.appendChild(mainDropDownButton);

var subButtons = [
  document.createElement("button"),
  document.createElement("button"),
  document.createElement("button"),
  document.createElement("button"),
  document.createElement("button"),
];

for (let i = 0; i < subButtons.length; i++) {
  //setup the subbuttons;
  subButtons[i].style.width = "100px";
  subButtons[i].style.height = "40px";
  subButtons[i].style.backgroundColor = "blue";
  subButtons[i].style.display = "none";
  subButtons[i].textContent = "Sub Drop Down Menu";
  document.body.appendChild(subButtons[i]);
}

//setup the div and subsubbuttons

var divs = [
  document.createElement("div"),
  document.createElement("div"),
  document.createElement("div"),
  document.createElement("div"),
  document.createElement("div"),
];
//set divs positions
for (let i = 0; i < divs.length; ++i) {
  divs[i].style.position = "absolute";
  divs[i].style.top = (i + 1) * 42 + "px";
  divs[i].style.left = "110px";
  divs[i].style.display = "none";

  var subSubButtons = [
    document.createElement("button"),
    document.createElement("button"),
    document.createElement("button"),
  ];

  for (var subSubButton of subSubButtons) {
    subSubButton.textContent = "Sub-Sub-Button";
    subSubButton.style.width = "100px";
    subSubButton.style.backgroundColor = "yellow";
    subSubButton.style.height = "40px";
    subSubButton.style.display = "block";
  }

  divs[i].appendChild(subSubButtons[0]);
  divs[i].appendChild(subSubButtons[1]);
  divs[i].appendChild(subSubButtons[2]);

  document.body.appendChild(divs[i]);
}

mainDropDownButton.addEventListener("click", function () {
  if (subButtons[0].style.display === "none") {
    //if the first one is not displayed then none of them
    for (let i = 0; i < subButtons.length; ++i) {
      subButtons[i].style.display = "block";
    }
  } else {
    for (let i = 0; i < subButtons.length; ++i) {
      subButtons[i].style.display = "none";
      divs[i].style.display = "none";
    }
  }
});

for (let i = 0; i < subButtons.length; ++i) {
  subButtons[i].addEventListener("click", function () {
    for (let j = 0; j < divs.length; ++j) {
      divs[j].style.display = "none";
    }
    divs[i].style.display = "block";
  });
}
