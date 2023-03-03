const passport = require('passport');
const LocalStrategy = require('passport-local');
const pool = require('../db');
const { encryptPassword } = require('./helpers');
const helpers = require('./helpers');

passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const rows = await pool.query('SELECT * FROM users WHERE username = ?', [
        username,
      ]);

      if (rows[0].length > 0) {
        const user = rows[0][0];
        const validPassword = await helpers.comparePassport(
          password,
          user.password
        );
        if (validPassword) {
          done(null, user, req.flash('success', 'Welcome' + user.username));
        } else {
          done(
            null,
            false,
            req.flash('message', 'Incorrect Password or Username.')
          );
        }
      } else {
        return done(
          null,
          false,
          req.flash('message', 'Incorrect Password or Username.')
        );
      }
    }
  )
);

passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { fullname } = req.body;

      const newUser = {
        fullname,
        username,
        password,
      };
      newUser.password = await encryptPassword(password);
      const result = await pool.query('INSERT INTO users SET ?', [newUser]);
      newUser.id = result[0].insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id  = ?', [id]);
  done(null, rows[0]);
});
