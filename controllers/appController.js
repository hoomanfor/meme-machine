module.exports = function (db) {
  return {
    createMeme: function (request, response) {
      db.Meme.create({
        userId: request.session.passport.user.id,
        fileName: request.body.fileName,
        downloadURL: request.body.downloadURL
      }).then((data) => {
        response.status(201).end();
      });
    },
    getMemes: function (request, response) {
      db.Meme.findAll({ where: { userId: request.session.passport.user.id } }).then(function (data) {
        response.json(data);
      });
    }
  };
};
