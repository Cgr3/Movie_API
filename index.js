const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });

const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path'),
  bodyParser = require('body-parser');
  uuid = require('uuid');

const app = express();
app.use(morgan('common'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const cors = require('cors');
app.use(cors());

let auth = require('./auth')(app);

const passport = require('passport');
require('./passport');

const { check, validationResult } = require('express-validator');

let movies = [
  {
    'Title': 'Eight Crazy Nights',
    'Description': 'An Adam Sandler animated chanukah musical',
    'Director': {
      'Name': 'Seth Kearlsy',
      'Bio:': 'An American director and producer known for The Secret of Pets (2016) and The Looney Tunes Show(2011)',
      'Birth': 1971
    },
    'Genre': {
      'Name': 'Comedy',
      'Description': 'A movie to make you laugh!'
    },
    'Imgurl': 'eightcrazynights.png',
    'Featured': true
  },
  {
    'Title': 'Thor',
    'Description': 'The powerful god Thor is stripped of his title and powers and sent to Earth',
    'Director': {
      'Name': 'Kenneth Branagh',
      'Bio': 'A British actor, director and producer most known for his film adaptations of William Shakespeare',
      'Birth': 1960
    },
    'Genre': {
      'Name': 'Action',
      'Description': 'An action packed adventure you need!'
    },
    'Imgurl': 'thor.png',
    'Featured': true
  },
  {
    'Title': 'Spider Man',
    'Description': 'A high school nerd gains spider-like abilities and must use those powers to fight evil after a tragedy befalls his family',
    'Director': {
      'Name': 'Sam Raimi',
      'Bio': 'An american director, producer, writer and actor who is most known for directing the Spider-Man trilogy as well as the Evil Dead franchise',
      'Birth': 1959
   },
    'Genre': {
      'Name': 'Action',
      'Description': 'An action packed adventure you need!'
    },
    'Imgurl': 'spiderman.png',
    'Featured': true
  },
  {
    'Title': 'Iron Man',
    'Description': 'After being held captive in an Afghan cave, billionare engineer Tony Stark creates a weaponized super suit to fight evil',
    'Director': {
      'Name': 'Jon Favreau',
      'Bio': 'An American writer, producer and actor who is most known for creating The Mandalorian as well as The Book of Boba Fett',
      'Birth': 1966
    },
    'Genre': {
      'Name': 'Action',
      'Description': 'An action packed adventure you need!'
    },
    'Imgurl': 'ironman.png',
    'Featured': true
  },
  {
    'Title': 'Captain America: The First Avenger',
    'Description': 'Steve Rogers receives the super-soldier serum and becomes America\'s first ever Avenger',
    'Director': {
      'Name': 'Joe Johnston',
      'Description': 'An American director most known for Jumanji, Honey, I Shrunk the Kids and Captain America: The First Avenger',
      'Birth': 1950
    },
    'Genre': {
      'Name' :'Action',
      'Description': 'An action packed adventure you need!'
    },
    'Imgurl': 'captainamerica.png',
    'Featured': true
  },
  {
    'Title': 'Harry Potter And The Goblet Of Fire',
    'Description': 'Harry Potter finds himself competing against rival wizarding schools in one of the most dangerous competitions',
    'Genre': {
      'Name': 'Fantasy',
      'Description': 'A sequence of improbable things!'
    },
    'Director': {
      'Name': 'Mike Newell',
      'Bio': 'An English film/tv director and producer who won the BAFTA for Best Direction for Four Weddings and a Funeral in 1994',
      'Birth': 1942
    },
    'Imgurl': 'harrypottergobletoffire.png',
    'Featured': true
  },
  {
    'Title': 'Harry Potter And The Deathly Hollows Part 1',
    'Description': 'As Harry, Ron and Hermione raze against time and evil to destroy the Horcruxes, they uncover the existence of the Deathly Hollows',
    'Director': {
      'Name': 'David Yates',
      'Bio': 'An English director, producer and writer most known for directing the later four Harry Potter movies as well as the first three Fantastic Beasts',
      'Birth': 1963
    },
    'Genre': {
      'Name': 'Adventure',
      'Description': 'A journey awaits all who seek it!'
    },
    'Imgurl': 'harrypotterdeathlyhollowspart1',
    'Featured': false
  },
  {
    'Title': 'Harry Potter And The Deathly Hollows Part 2',
    'Description': 'Harry, Ron and Hermione search for the remaining Horcruxes in their effort to destroy the Dark Lord in their final battle at Hogwarts',
    'Director': {
      'Name': 'David Yates',
      'Bio': 'An English director, producer and writer most known for directing the later four Harry Potter movies as well as the first three Fantastic Beasts',
      'Birth': 1963
    },
    'Genre': {
      'Name': 'Drama',
      'Description': 'An exciting, emotional or unexpected series of events!'
    },
    'Imgurl': 'harrypotterdeathlyhollowspart2',
    'Featured': true
  },
  {
    'Title': 'The Maze Runner',
    'Dscription': 'Thomas awakens in a community of boys who have all lost their memories, they soon learn they are trapped in a maze with only one goal. Escape.',
    'Director': {
      'Name': 'Wes Ball',
      'Bio': 'An American film director, visual effects artist and graphic artist most known for directing The Maze Runner',
      'Birth': 1980
    },
    'Genre': {
      'Name': 'Sci-Fi',
      'Description': 'A movie for those seeking the world past the horizon!'
    },
    'Imgurl': 'mazerunner.png',
    'Featured': true
  },
  {
    'Title': 'Maze Runner: The Death Cure',
    'Description': 'Thomas embarks on a mission to find a cure for the deadly disease The Flare',
    'Director': {
      'Name': 'Wes Ball',
      'Bio': 'An American film director, visual effects artist and graphic artist most known for directing The Maze Runner',
      'Birth': 1980
    },
    'Genre': {
      'Name': 'Sci-Fi',
      'Description': 'A movie for those seeking the world past the horizon!'
    },
    'Imgurl': 'mazerunnerdeathcure.png',
    'Featured': false
  },
];

let users = [
  {
    Userid: '1',
    Username: 'CGR',
    Password: 'test123',
    Email: '123email@email.com',
    Birthday: '01/04/2001',
    FavoriteMovies: ['Thor', 'Iron Man', 'The Maze Runner'],
  },
  {
    Userid: '2',
    Username: 'Riah121',
    Password: 'password123',
    Email: 'exampleemail@email.com',
    Birthday: '01/17/2000',
    FavoriteMovies: ['The Maze Runner', 'Thor', 'Harry Potter and the Goblet of Fire'],
  },
  {
    Userid: '3',
    Username: 'jaz',
    Password: '123pass',
    Email: 'emailexample@email.com',
    Birthday: '06/05/2005',
    FavoriteMovies: ['Iron Man', 'Harry Potter and the Deathly Hollows Part 2', 'Spider Man'],
  },
];

//Pull list of all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
  Movies.find()
  .then((movies) => {
    res.status(201).json(movies);
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
    res.status(201).json(genre);
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
    res.status(201).json(director);
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
    res.status(201).json(users);
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
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
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
app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
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

app.listen(8080, () => {
  console.log('My first Node test server is running on Port 8080.');
});
