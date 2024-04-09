$(document).ready(() => {
  var p = document.createElement("p");
  p.textContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet fringilla tortor, in sagittis purus faucibus nec. Vivamus sagittis dolor in consequat pulvinar. Maecenas rutrum scelerisque nulla vel ultrices. Vestibulum sagittis consectetur arcu, tempor euismod lectus elementum sed. Etiam in lacinia ante. Sed ac condimentum urna. Praesent viverra ornare congue. Aenean ac purus erat. Suspendisse potenti.";

  p.style.display = "none";
  document.body.appendChild(p);

  var b = document.createElement("button");
  b.innerHTML = "Press me!";
  document.body.append(b);
  $("button").click(function () {
    if ($("p").css("display") === "none") {
      $("p").css("display", "block");
    } else {
      $("p").css("display", "none");
    }
  });
});
