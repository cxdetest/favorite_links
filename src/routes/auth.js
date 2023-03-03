const router = require('express').Router();
const {
  signupView,
  signup,
  profile,
  signinView,
  signin,
  logout,
} = require('../controllers/auth.controllers');
const { isLoggedIn, isNotLoggedIn } = require('../lib/helpers');

router.get('/signup', isNotLoggedIn, signupView);
router.post('/signup', isNotLoggedIn, signup);

router.get('/profile', isLoggedIn, profile);

router.get('/signin', isNotLoggedIn, signinView);
router.post('/signin', isNotLoggedIn, signin);

router.get('/logout', logout);

module.exports = router;
