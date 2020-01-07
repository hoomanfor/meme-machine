console.log('evaluating example.js');

const invisible = function () {
  console.log('invisible');
};

exports.message = 'hi';

exports.say = function () {
  console.log(exports.message);
};
