$(function () {
  //get id to work with
  const urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("id");
  id = parseInt(id);

  var roleArray = ["Manager", "Employee", "Boss", "CEO"];
  var roleSelect = document.getElementById("roleSelect");
  roleArray.forEach((role) => {
    var option = document.createElement("option");
    option.text = role;
    option.value = role;
    roleSelect.add(option);
  });

  $.getJSON("getUserJson.php", { id: id }, function (data, status) {
    console.log(status);
    console.log(data);
    $("#name").val(data.name);
    $("#username").val(data.username);
    $("#password").val(data.password);
    $("#roleSelect").val(data.role);
    $("#email").val(data.email);
    $("#age").val(data.age);
    $("#webpage").val(data.webpage);
  });

  $("#updateButton").on("click", function () {
    var name = $("#name").val();
    var username = $("#username").val();
    var password = $("#password").val();
    var role = $("#roleSelect").val();
    var email = $("#email").val();
    var age = $("#age").val();
    var webpage = $("#webpage").val();
    if (name && username && role && email && age && webpage) {
      console.log("in");
      $.post(
        "updateuser.php",
        {
          id: id,
          name: name,
          username: username,
          password: password,
          role: role,
          email: email,
          age: age,
          webpage: webpage,
        },
        function (data, status) {
          console.log(data);
          console.log(status);
          window.location.href = "../index.html";
        }
      );
    }
  });
});
