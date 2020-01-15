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

const storageRef = firebase.storage().ref();
// Create a reference under which you want to list
const listRef = storageRef.child('images/uid');

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
  const fileName = $('#filename').val();
  console.log('fileName', fileName);
  if (fileName) {
    html2canvas(document.getElementById('capture'), { scrollX: 0, scrollY: -window.scrollY, allowTaint: true }).then(canvas => {
      $('body').append(canvas);
      canvas.toBlob(function (blob) {
        console.log('blob', blob);
        const uploadTask = storageRef.child('memes/' + fileName + '.png').put(blob);
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function (snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function (error) {
          console.log('error', error);
        }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL);
            const newMeme = {
              'fileName': fileName,
              'downloadURL': downloadURL
            };
            $.ajax({
              type: 'POST',
              url: '/api/creator',
              data: newMeme
            }).then((result) => {
              console.log(result);
            });
          });
        });
      });
    });
  }
});

// $(this).prop("disabled", true);
// $(this).css('display', 'none');
