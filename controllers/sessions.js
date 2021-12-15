const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
  res.render('sessions/login.ejs');
});

router.post('/', async (req, res) => {
  console.log(req.body);
  const foundAgent = await User.findOne({ username: req.body.username });
  console.log(foundAgent);
  const isValid = await bcrypt.compare(req.body.password, foundAgent.password);
  console.log(isValid, req.body.password === foundAgent.password);
  if (isValid) {
    req.session.user = foundAgent;
    res.redirect('/');
  } else {
    res.redirect('/sessions/login');
  }
});

router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
