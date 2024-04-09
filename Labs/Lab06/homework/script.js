jQuery(function () {
  $("body").css("overflow-x", "hidden");
  $(".divcontainer").css({ width: "400%", height: "100vh", display: "flex" });
  $(".desktop").css({
    flex: "1",
    display: "inline-block",
    height: "100%",
    transition: "transform 2s ease-out",
  });
  $("#desktop1").css("background-color", "aqua");
  $("#desktop2").css("background-color", "blueviolet");
  $("#desktop3").css("background-color", "darkcyan");
  $("#desktop4").css("background-color", "darkolivegreen");

  var currentDesktop = 1;
  var direction = 1;
  $(".desktop").on("click", function () {
    if (currentDesktop === 1) {
      direction = 1;
      currentDesktop = 2;
    } else if (currentDesktop < 4) {
      currentDesktop += direction;
    } else if (currentDesktop === 4) {
      direction = -1;
      currentDesktop = 3;
    }
    $(".desktop").css({
      transform: "translateX(" + (currentDesktop - 1) * -100 + "%)",
    });
    console.log((currentDesktop - 1) * -direction * 100);
  });
});
