$(function () {
  $("#column").hide();
  $("#row").hide();
  $("#generate").hide();
  $("select").on("change", () => {
    console.log($("select").val());
    if ($("select").val() === "table") {
      $("#column").show();
      $("#row").show();
      $("#generate").show();
    }
  });

  var inputList = [];

  $("column").on("click", () => {
    var input = document.createElement("input");
    if (inputList.length == 0) {
      inputList.push(input);
    }
  });
});
