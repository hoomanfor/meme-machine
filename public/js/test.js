$(function() {
  html2canvas(document.querySelector("#npm-test")).then(canvas => {
    document.body.appendChild(canvas);
    let link = $("<a>");
    link.html("Download!");
    link.attr("href", canvas.toDataURL());
    link.attr("download", "test-download.png");
    $("body").append(link);
  });
});
