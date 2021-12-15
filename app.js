// DEPENDENCIES
const express = require('express');
const app = express();
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');

// MIDDLEWARE
// body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
  })
);
// static files middleware
app.use(express.static('public'));

// CONTROLLERS
// fitting room three
const roomController = require('./controllers/room.js');
app.use('/room', roomController);
//users
const usersController = require('./controllers/users');
app.use('/users', usersController);
//sessions
const sessionController = require('./controllers/sessions');
app.use('/sessions', sessionController);

// GET INDEX
app.get('/', (req, res) => {
  let loggedIn = false;
  if (req.session.user) {
    loggedIn = true;
  }
  res.render('index.ejs', { loggedIn: loggedIn });
});

// SEED ROUTE
// NOTE: Do NOT run this route until AFTER you have a create user route up and running, as well as encryption working!
const seed = require('./models/seed.js');
const User = require('./models/user.js');

app.get('/seedAgents', async (req, res) => {
  // encrypts the given seed passwords
  seed.forEach(async (user) => {
    const password = await bcrypt.hash(user.password, 10);
    console.log(password);
    await User.create({
      username: user.username,
      password,
      messages: user.messages,
    });
    // await User.findOneAndUpdate(
    //   { username: user.username },
    //   {
    //     username: user.username,
    //     password,
    //     messages: user.messages,
    //   },
    //   { upsert: true }
    // );
  });
  // seeds the data
  //   await User.create(seed);
  //     , (err, createdUsers) => {
  //     // logs created users
  //     console.log(createdUsers);
  //     // redirects to index
  res.redirect('/');
  //   });
});

module.exports = app;
