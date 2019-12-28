function loadAndDrawImage(src) {
  // Create an image object. (Not part of the dom)
  const image = new Image();
  // After the image has loaded, draw it to the canvas
  image.onload = () => { 
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    ctx.font = "40px Georgia";
    ctx.fillText("Nothing has to be true.", 0, 100);
  };
  image.src = src;
  console.log("image object", image);
}

loadAndDrawImage("/images/img-1.jpg");