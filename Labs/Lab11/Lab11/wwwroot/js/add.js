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
            $.post(
                "Add/Add",
                {
                    Name: name,
                    Username: username,
                    Password: password,
                    Role: role,
                    Email: email,
                    Age: age,
                    Webpage: webpage,
                },
                function (data, status) {
                    console.log("success");
                    var url = 'Main/Index';
                    window.location.href = url;
                }
            );
        }
    });
});
