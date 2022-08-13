const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

//Local database
//mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

//Global database
mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');
  uuid = require('uuid');

const app = express();
app.use(morgan('common'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const cors = require('cors');
app.use(cors());

require('./auth')(app);

const passport = require('passport');
require('./passport');

const { check, validationResult } = require('express-validator');

//Pull list of all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), function (req, res) {
  Movies.find()
  .then((movies) => {
    res.status(200).json(movies);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('Error: ' + err);
  });
});

//Find movie by name
app.get('/movies/:Title', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ Title: req.params.Title })
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('Error: ' + err);
  });
});

//Get Genre by name
app.get('/movies/genre/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find({ 'Genre.Name': req.params.Name })
  .then((genre) => {
    res.json(genre);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('Error: ' + err);
  });
});

//Get director by name
app.get('/movies/director/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.Name })
  .then((director) => {
    res.json(director);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('Error: ' + err);
  });
});

//Get a list of users
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.find()
  .then((users) => {
    res.json(users);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('Error: ' + err);
  });
});

//Get a user by username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOne({ Username: req.params.Username })
  .then((user) => {
    res.json(user);
  })
  .catch((err) => {
    res.status(500).send('Error: ' + err);
  });
});

//Add a user
/*Expect JSON in this format
{
ID: Integer,
Username: String,
Password: String,
Email: String,
Birthday: Date
} */
app.post('/users',
  //Validation logic first
  [
  //Check validation on Uesrname
  check('Username', 'Username is required').isLength({ min: 5 }),
  check('Username', 'Username contains non alphanumeric character - not allowed.').isAlphanumeric(),
  //Check validation on Password
  check('Password', 'Password is required').not().isEmpty(),
  //Check validation on Email
  check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {
  //Check validation object for errors
  let errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  //Hash passwords
  let hashedPassword = Users.hashPassword(req.body.Password);

  //Start of actual code
  Users.findOne({ Username: req.body.Username })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + 'already exists');
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then((user) => { res.status(201).json(user) })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
  .catch((error) => {
    console.log(error);
    res.status(500).send('Error: ' + error);
  });
});

//Update user info, by username
/*Expect JSON in this format
{
  Username: String,
  (required)
  Password: String,
  (required)
  Email: String,
  (required)
  Birthday: Date
}
*/
app.put('/users/:Username', passport.authenticate('jwt', { session: false }),
//Validation logic first
[
//Check validation on Uesrname
check('Username', 'Username is required').isLength({ min: 5 }),
check('Username', 'Username contains non alphanumeric character - not allowed.').isAlphanumeric(),
//Check validation on Password
check('Password', 'Password is required').not().isEmpty(),
//Check validation on Email
check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {
//Check validation object for errors
let errors = validationResult(req);

if(!errors.isEmpty()) {
  return res.status(422).json({ errors: errors.array() });
}

//Hash passwords
let hashedPassword = Users.hashPassword(req.body.Password);

  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, //Makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.log(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Delete a user
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then((user) => {
    if(!user) {
      res.status(400).send(req.params.Username + ' was not found');
    } else {
      res.status(200).send(req.params.Username + ' was deleted');
    }
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('Error: ' + err);
  });
});

//Add a movie to user's list of favorites
app.post('/movies/:UserID/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { FavoriteMovies: req.params.MovieID }
  },
  { new: true }, //Makes sure that the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.log(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Remove favorited movies
app.delete('/movies/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { FavoriteMovies: req.params.MovieID },
  },
    { new: true }, //Makes sure that the updated document is returned
    (err, updatedUser) => {
    if(err) {
      console.log(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

//Default webpage
app.get('/', (req, res) => {
  res.status(200).send('Welcome To My MoviesFlix Page!');
});

//Open documentation page
app.get('/documentation', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).sendFile('public/documentation.html', { root: __dirname });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
  console.log('Listening on Port ' + port);
});
