module.exports = (db) => {
  db.User.create({
    firstName: 'Hooman',
    lastName: 'Foroudastan',
    email: 'hoomanfor@gmail.com',
    password: process.env.ADMIN_USER_PWD,
    isAdmin: true
  });
  db.User.create({
    firstName: 'Klara',
    lastName: 'Singer',
    email: 'klara@gmail.com',
    password: process.env.USER_PWD,
    isAdmin: false
  });
};
