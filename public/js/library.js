$(document).ready(function () {
  console.log('this works!');
  $(window).on('load', function () {
    console.log('window is loaded!');
    $.ajax({
      type: 'GET',
      url: '/api/library'
    }).then((result) => {
      console.log('result', result);
      console.log('result.length', result.length);
    });
  });
});
