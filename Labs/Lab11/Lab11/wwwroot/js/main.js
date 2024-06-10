function getUserTable(nameFilter, selectedRole) {
    console.log("hello " + nameFilter + "!");
    $.get(
        "/Main/getUserTableBasedOnFilters",
        { nameFilter: nameFilter, selectedRole: selectedRole },
        function (data, status) {
            $("#userTableContainer").html(data);
            addListenerToRows(nameFilter, selectedRole);
        }
    );
}
function addListenerToRows(nameFilter, selectedRole) {
    const rows = document.querySelectorAll("#userTable tr");
    for (let i = 1; i < rows.length; ++i) {
        let id = rows[i].querySelector("td");

        id = id.textContent; //got the id of the entity
        console.log(id);
        rows[i].addEventListener("click", function () {
            for (let j = 1; j < rows.length; ++j) {
                rows[j].style.backgroundColor = "white";
            }
            //$("#userTable tr#" + id).css({ "background-color": "grey" }); //set this one clicked
            rows[i].style.backgroundColor = "grey";
            addListenerToButtons(id, nameFilter, selectedRole);
        });
    }
}

function addListenerToButtons(entityId, nameFilter, selectedRole) {
    $("#updateButton").on("click", function () {
        const url = "Update/Index/" + entityId;
        window.location.href = url;
    });

    $("#removeButton").on("click", function () {
        console.log(entityId);

        var confirmDelete = confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            $.post("Delete/Delete", { id: entityId }, function (data, status) {
                console.log("Deletion succesful");
                getUserTable(nameFilter, selectedRole);
            });
        }
        else {
            console.log("Deletion cancelled");
        }
    });
}

$(function () {
    var searchedFilter = "";
    var prevSearchedFilter = "";
    //initial get
    var selectedRole = "";
    var nameFilter = "";

    getUserTable(nameFilter, selectedRole);

    var roleArray = ["Manager", "Employee", "Boss", "CEO"];
    var roleSelect = document.getElementById("roleSelect");
    roleArray.forEach((role) => {
        var option = document.createElement("option");
        option.text = role;
        option.value = role;
        roleSelect.add(option);
    });

    roleSelect.addEventListener("change", function () {
        selectedRole = roleSelect.value;
        getUserTable(nameFilter, selectedRole);
    });

    var nameFilterInput = document.getElementById("nameFilter");
    nameFilterInput.addEventListener("change", function () {
        prevSearchedFilter = searchedFilter;
        searchedFilter = nameFilterInput.value;
        $("#lastSearch").html(prevSearchedFilter);


        nameFilter = nameFilterInput.value; 
        getUserTable(nameFilter, selectedRole);
    });

    $("#addButton").on("click", function () {
        var url = 'Add/Index';
        window.location.href = url;
    });
});
