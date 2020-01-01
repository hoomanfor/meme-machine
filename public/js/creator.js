$(".hamburger").on("click", function(event) {
  event.preventDefault();
  if ($(".nav-links").css("display") === "none") {
    $(".nav-links").css("display", "block");
  } else {
    $(".nav-links").css("display", "none");
  }
});

$(":file").on("change", function(event) {
  console.log("This works!");
});
