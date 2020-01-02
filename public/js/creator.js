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
  const bgImage = $(this).get(0).files[0];
  const src = URL.createObjectURL(bgImage);
  console.log(bgImage);
  console.log(src);
  $("#bg-image").attr("src", src);
  $(".artboard").css("background-image", "url(" + src + ")");
});

// background-image: url('imagePath');
