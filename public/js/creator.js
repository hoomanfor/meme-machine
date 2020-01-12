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
const storageRef = firebase.storage().ref();
const klaraRef = storageRef.child('klara.txt');

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
  const bgImage = $(this).get(0).files[0];
  console.log('bgImage', bgImage);
  const src = URL.createObjectURL(bgImage);
  console.log('src', src);
  $('#capture').css('background-image', 'url(' + src + ')');
  // $('.filename').val(event.target.files[0].name);
  // console.log(event.target.files[0].name.length);
  // console.log(event.target.files[0].name.length);
  // const src = URL.createObjectURL(bgImage);
  // console.log(bgImage);
  // console.log(src);
  // $('#bg-image').attr('src', src);
  // $('#capture').css('background-image', 'url(' + src + ')');
});

$('#save-meme').on('click', function (event) {
  // html2canvas(document.querySelector('.artboard2')).then(canvas => {
  //   document.body.appendChild(canvas);
  //   const link = $('<a>');
  //   link.html('Download!');
  //   link.attr('href', canvas.toDataURL());
  //   link.attr('download', 'test-download.png');
  //   $('body').append(link);
  // });
  html2canvas(document.getElementById('capture'), { scrollX: 0, scrollY: -window.scrollY, allowTaint: true }).then(canvas => {
    $('body').append(canvas);
  });
  // html2canvas(document.getElementById('capture')).then(canvas => {
  //   $('body').append(canvas);
  // });
});


  // $(this).prop("disabled", true);
  // $(this).css('display', 'none');