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
let currentText = $('#meme-text').html();

$('.hamburger').on('click', function (event) {
  event.preventDefault();
  if ($('.nav-links').css('display') === 'none') {
    $('.nav-links').css('display', 'block');
  } else {
    $('.nav-links').css('display', 'none');
  }
});

$('#meme-text').blur(function () {
  const newText = $(this).html();
  if (currentText !== newText) {
    currentText = newText;
    $('#save-meme').removeAttr('disabled');
    $('#save-meme').html('Save');
    $('#download-button').prop('disabled', true);
    $('#download-meme').prop('disabled', true);
  } else {
    console.log('Current Meme Text is the same as New Meme Text');
  }
});

$(':file').on('change', function (event) {
  $('#save-meme').removeAttr('disabled');
  $('#save-meme').html('Save');
  $('#download-button').prop('disabled', true);
  $('#download-meme').prop('disabled', true);
  const bgImage = $(this).get(0).files[0];
  const src = URL.createObjectURL(bgImage);
  $('#capture').css('background-image', 'url(' + src + ')');
  $('.upload-instruction').html('');
});

$('input[type="file"]').on('mouseover', function (event) {
  $('#capture').css('background-color', 'rgba(128, 157, 255, .8)');
  $('.upload-instruction').css('color', '#262324');
});

$('input[type="file"]').on('mouseout', function (event) {
  $('#capture').css('background-color', '#262324');
  $('.upload-instruction').css('color', '#BBBFBA');
});

$('#save-meme').on('click', function (event) {
  $('#save-meme').html('<i class="fas fa-spinner spin"></i>');
  const fileName = $('#filename').val();
  if (fileName) {
    $('#create-err-msg').addClass('hide');
    html2canvas(document.getElementById('capture'), { scrollX: 0, scrollY: -window.scrollY, allowTaint: true }).then(canvas => {
      canvas.toBlob(function (blob) {
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
              $('#filename').val('');
              $('#save-meme').html('Saved');
              $('#save-meme').prop('disabled', true);
              $('#download-button').removeAttr('disabled');
              $('#download-button').attr('href', canvas.toDataURL());
              $('#download-button').attr('download', fileName + '.png');
              $('#download-meme').removeAttr('disabled');
            });
          });
        });
      });
    });
  } else {
    $('#create-err-msg').removeClass('hide');
    $('#create-err-msg').text('Please name your meme.');
  }
});
