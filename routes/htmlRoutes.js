const router = require('express').Router();

module.exports = (db) => {
  // Load register page
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      res.render('register');
    }
  });

  // Load profile page
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        const user = {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated()
        };
        // console.log(user);
        res.render('profile', user);
      });
    } else {
      res.redirect('/');
    }
  });

  // Load library page
  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      db.Meme.findAll({ where: { userId: req.session.passport.user.id } }).then(function (data) {
        const user = {
          user: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          memes: data
        };
        res.render('library', user);
      });
    } else {
      const isloggedin = {
        isloggedin: false
      };
      res.render('library', isloggedin);
    }
  });

  // Load library page
  router.get('/library', (req, res) => {
    if (req.isAuthenticated()) {
      db.Meme.findAll({ where: { userId: req.session.passport.user.id } }).then(function (data) {
        const user = {
          user: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          memes: data
        };
        res.render('library', user);
      });
    } else {
      const isloggedin = {
        isloggedin: false
      };
      res.render('library', isloggedin);
    }
  });

  // Load example index page
  router.get('/example', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findAll({}).then(function (dbExamples) {
        res.render('example', {
          msg: 'Welcome!',
          examples: dbExamples
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load example page and pass in an example by id
  router.get('/example/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
        res.render('example-detail', {
          example: dbExample
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load Meme Creator
  router.get('/creator', function (request, response) {
    if (request.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: request.session.passport.user.id
        }
      }).then(() => {
        const user = {
          isloggedin: request.isAuthenticated()
        };
        // console.log(user);
        response.render('creator', user);
        // response.json(request.session.passport.user);
      });
    } else {
      response.redirect('/');
    }
  });

  // Logout
  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/');
    });
  });

  // Render 404 page for any unmatched routes
  router.get('*', function (req, res) {
    res.render('404');
  });

  return router;
};
