const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  res.render('users/new.ejs');
});

router.post('/new', async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 10);
  await User.create({
    username: req.body.username,
    password: password,
    messages: req.body.messages,
  });
  res.redirect('/');
});

module.exports = router;
