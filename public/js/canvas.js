function loadAndDrawImage(src) {
  // Create an image object. (Not part of the dom)
  const image = new Image();
  // After the image has loaded, draw it to the canvas
  image.onload = () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    ctx.font = "40px Impact";
    ctx.fillText("Nothing has to be true.", 0, 100);
    console.log("width", ctx.measureText("Nothing has to be true.").width);
  };
  image.src = src;
  console.log("image object", image);
}

function addLink() {
  let link = $("<a>");
  link.html("Download!");
  $(link).on("click", function(event) {
    event.stopPropagation();
    link.attr("href", canvas.toDataURL());
    link.attr("download", "test-download.png");
  });
  $("body").append("<br>", link);
}

loadAndDrawImage("/images/img-1.jpg");
addLink();

$("input[type='file']").on("change", function() {
  console.log($(this).get(0).files[0]);
  // const canvas = document.getElementById("canvas");
  // const ctx = canvas.getContext("2d");
  // ctx.clearRect(0, 0, 640, 426);
  const src = URL.createObjectURL($(this).get(0).files[0]);
  console.log(src);
  loadAndDrawImage(src);
});
