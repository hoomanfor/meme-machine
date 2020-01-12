
const firebaseConfig = {
  apiKey: 'AIzaSyA2PDDd2nQlPQwRp4lVpX3BhF8HZs5RNXU',
  authDomain: 'meme-machine-b458b.firebaseapp.com',
  databaseURL: 'https://meme-machine-b458b.firebaseio.com',
  projectId: 'meme-machine-b458b',
  storageBucket: 'meme-machine-b458b.appspot.com',
  messagingSenderId: '898331779938',
  appId: '1:898331779938:web:e7d56ceece1c970999023b'
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
var storageRef = firebase.storage().ref();
var klaraRef = storageRef.child('klara.txt');

// var message = 'Klara' // use the Blob or File API
// klaraRef.putString(message).then(function(snapshot) {
//   console.log('Uploaded a blob or file!');
// });

$('.hamburger').on('click', function (event) {
  event.preventDefault();
  if ($('.nav-links').css('display') === 'none') {
    $('.nav-links').css('display', 'block');
  } else {
    $('.nav-links').css('display', 'none');
  }
});

$(':file').on('change', function (event) {
  console.log('This works!');
  $('.filename').val(event.target.files[0].name);
  console.log(event.target.files[0].name.length);
  const bgImage = $(this).get(0).files[0];
  const src = URL.createObjectURL(bgImage);
  console.log(bgImage);
  console.log(src);
  $('#bg-image').attr('src', src);
  $('.artboard').css('background-image', 'url(' + src + ')');
  // $(this).prop("disabled", true);
});

$('#save-meme').on('click', function (event) {
  html2canvas(document.querySelector(".custom-file-input")).then(canvas => {
    document.body.appendChild(canvas);
    let link = $("<a>");
    link.html("Download!");
    link.attr("href", canvas.toDataURL());
    link.attr("download", "test-download.png");
    $("body").append(link);
  });
});

