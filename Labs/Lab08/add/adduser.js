$(function () {
  var roleArray = ["Manager", "Employee", "Boss", "CEO"];
  var roleSelect = document.getElementById("roleSelect");
  roleArray.forEach((role) => {
    var option = document.createElement("option");
    option.text = role;
    option.value = role;
    roleSelect.add(option);
  });

  $("#addButton").on("click", function () {
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
        "adduser.php",
        {
          name: name,
          username: username,
          password: password,
          role: role,
          email: email,
          age: age,
          webpage: webpage,
        },
        function (data, status) {
          window.location.href = "../index.html";
        }
      );
    }
  });
});
