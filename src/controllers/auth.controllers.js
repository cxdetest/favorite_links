const passport = require('passport');

const signupView = async (req, res) => {
  res.render('forms/signup');
};

const signup = passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true,
});

const profile = async (req, res) => {
  res.render('profile');
};

const signinView = async (req, res) => {
  res.render('forms/signin');
};

const signin = async (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true,
  })(req, res, next);
};

const logout = (req, res) => {
  req.logOut(() => {
    res.redirect('/');
  });
};

module.exports = { signupView, signup, profile, signinView, signin, logout };
