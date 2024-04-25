function getUserTable(nameFiltered, roleSelected) {
  $.get(
    "index.php",
    { name: nameFiltered, role: roleSelected },
    function (data, status) {
      $("#userTableContainer").html(data);
      addListenerToRows(nameFiltered, roleSelected);
    }
  );
}

function addListenerToRows(nameFiltered, roleSelected) {
  const rows = document.querySelectorAll("#userTable tr");
  for (let i = 1; i < rows.length; ++i) {
    let id = rows[i].querySelector("td");

    id = id.textContent; //got the id of the entity
    console.log(id);
    rows[i].addEventListener("click", function () {
      for (let j = 1; j < rows.length; ++j) {
        rows[j].style.backgroundColor = "white";
      }
      $("#userTable tr#" + id).css({ "background-color": "grey" }); //set this one clicked
      addListenerToButtons(id, nameFiltered, roleSelected);
    });
  }
}

function addListenerToButtons(entityId, nameFiltered, roleSelected) {
  $("#updateButton").on("click", function () {
    const url = "update/updateuser.html?id=" + entityId;
    window.location.href = url;
  });

  $("#removeButton").on("click", function () {
    $.get("removeuser.php", { id: entityId }, function (data, status) {
      console.log("Deletion succesful");
      getUserTable(nameFiltered, roleSelected);
    });
  });
}

$(function () {
  //initial get
  var roleSelected = "";
  var nameFiltered = "";

  getUserTable(nameFiltered, roleSelected);

  var roleArray = ["Manager", "Employee", "Boss", "CEO"];
  var roleSelect = document.getElementById("roleSelect");
  roleArray.forEach((role) => {
    var option = document.createElement("option");
    option.text = role;
    option.value = role;
    roleSelect.add(option);
  });

  roleSelect.addEventListener("change", function () {
    roleSelected = roleSelect.value;
    getUserTable(nameFiltered, roleSelected);
  });

  var nameFilter = document.getElementById("nameFilter");
  nameFilter.addEventListener("change", function () {
    nameFiltered = nameFilter.value;
    getUserTable(nameFiltered, roleSelected);
  });

  $("#addButton").on("click", function () {
    const url = "add/adduser.html";
    window.location.href = url;
  });
});
