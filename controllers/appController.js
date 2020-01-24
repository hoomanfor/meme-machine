module.exports = function (db) {
  return {
    // Get all examples
    getExamples: function (req, res) {
      db.Example.findAll({}).then(function (dbExamples) {
        res.json(dbExamples);
      });
    },
    // Create a new example
    createExample: function (req, res) {
      db.Example.create(req.body).then(function (dbExample) {
        res.json(dbExample);
      });
    },
    // Delete an example by id
    deleteExample: function (req, res) {
      db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
        res.json(dbExample);
      });
    },
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
