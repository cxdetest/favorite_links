const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

helpers.comparePassport = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (error) {
    console.error(error);
  }
};

helpers.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user[0];
    return next();
  }
  return res.redirect('/signin');
};

helpers.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.locals.user = req.user;
    return next();
  }
  return res.redirect('/profile');
};

module.exports = helpers;
