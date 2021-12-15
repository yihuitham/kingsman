const checkIsLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/sessions/login');
    return;
  }
  next();
};

module.exports = checkIsLoggedIn;
