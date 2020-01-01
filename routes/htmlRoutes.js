const db = require("../models");

module.exports = function(app) {
  // Mobile-first creator page
  app.get("/creator", function(request, response) {
    response.render("creator");
  });
  // dom-to-image NPM test
  app.get("/test", function(request, response) {
    response.render("test");
  });

  // Meme test page
  app.get("/canvas", function(request, response) {
    response.render("canvas");
  });

  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
