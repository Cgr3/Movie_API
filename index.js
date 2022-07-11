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

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

let movies = [
  {
    MovieID: '1',
    Title: '8 Crazy Nights',
    Description: 'An Adam Sandler animated chanukah musical',
    Genre: 'Comedy',
    Genreid: '1',
    Director: 'Seth Kearlsy',
    Directorid: '1',
    Imgurl: '',
    Featured: '',
  },
  {
    MovieID: '2',
    Title: 'Thor',
    Description: '',
    Genre: 'Action',
    Genreid: '2',
    Director: 'Kenneth Branagh',
    Directorid: '2',
    Imgurl: '',
    Featured: '',
  },
  {
    MovieID: '3',
    Title: 'Spider Man',
    Description: '',
    Genre: 'Action',
    Genreid: '2',
    Director: 'Sam Raimi',
    Directorid: '3',
    Imgurl: '',
    Featured: '',
  },
  {
    MovieID: '4',
    Title: 'Iron Man',
    Description: '',
    Genre: 'Action',
    Genreid: '2',
    Director: 'Jon Favreau',
    Directorid: '4',
    Imgurl: '',
    Featured: '',
  },
  {
    MovieID: '5',
    Title: 'Captain America: The First Avenger',
    Description: '',
    Genre: 'Action',
    Genreid: '2',
    Director: 'Joe Johnston',
    Directorid: '5',
    Imgurl: '',
    Featured: '',
  },
  {
    MovieID: '6',
    Title: 'Harry Potter And The Goblet Of Fire',
    Description: '',
    Genre: 'Fantasy',
    Genreid: '6',
    Director: 'Mike Newell',
    Directorid: '6',
    Imgurl: '',
    Featured: '',
  },
  {
    MovieID: '7',
    Title: 'Harry Potter And The Deathly Hollows Part 1',
    Description: '',
    Genre: 'Adventure',
    Genreid: '3',
    Director: 'David Yates',
    Directorid: '7',
    Imgurl: '',
    Featured: '',
  },
  {
    MovieID: '8',
    Title: 'Harry Potter And The Deathly Hollows Part 2',
    Description: '',
    Genre: 'Drama',
    Genreid: '8',
    Director: 'David Yates',
    Directorid: '7',
    Imgurl: '',
    Featured: '',
  },
  {
    MovieID: '9',
    Title: 'The Maze Runner',
    Dscription: '',
    Genre: 'Sci-Fi',
    Genreid: '4',
    Director: 'Wes Ball',
    Directorid: '8',
    Imgurl: '',
    Featured: '',
  },
  {
    MovieID: '10',
    Title: 'Maze Runner: The Death Cure',
    Description: '',
    Genre: 'Sci-Fi',
    Genreid: '4',
    Director: 'Wes Ball',
    Directorid: '8',
    Imgurl: '',
    Featured: '',
  },
];

let director = [
  {
    directorid: '1',
    name:'Seth Kearlsy',
    bio: '',
    birthyear: '1971',
    deathyear: 'N/A',
  },
  {
    directorid: '2',
    name:'Kenneth Branagh',
    bio: '',
    birthyear: '1960',
    deathyear: 'N/A',
  },
  {
    directorid: '3',
    name:'Sam Raimi',
    bio: '',
    birthyear: '1959',
    deathyear: 'N/A',
  },
  {
    directorid: '4',
    name:'Jon Favreau',
    bio: '',
    birthyear: '1966',
    deathyear: 'N/A',
  },
  {
    directorid: '5',
    name:'Joe Johnston',
    bio: '',
    birthyear: '1950',
    deathyear: 'N/A',
  },
  {
    directorid: '6',
    name:'Mike Newell',
    bio: '',
    birthyear: '1942',
    deathyear: '',
  },
  {
    directorid: '7',
    name:'David Yates',
    bio: '',
    birthyear: '1963',
    deathyear: 'N/A',
  },
  {
    directorid: '8',
    name:'Wes Ball',
    bio: '',
    birthyear: '1980',
    deathyear: 'N/A',
  },
];

let genres = [
  {
    genreid: '1',
    name: 'Comedy',
    description: 'A movie to make you laugh!',
  },
  {
    genreid: '2',
    name: 'Action',
    description: 'An action packed adventure you need!',
  },
  {
    genreid: '3',
    name: 'Adventure',
    description: 'A journey awaits all who seek it!',
  },
  {
    genreid: '4',
    name: 'Sci-Fi',
    description: 'A movie for those seeking the world past the horizon!',
  },
  {
    genreid: '5',
    name: 'Drama',
    description: 'An exciting, emotional or unexpected series of events!',
  },
  {
    genreid: '6',
    name: 'Fantasy',
    description: 'A sequence of improbable things!',
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

let users_movies = [
  {
    usermovieid: '1',
    userid: '1',
    movieid: '1',
  },
  {
    usermovieid: '2',
    userid: '1',
    movieid: '2',
  },
  {
    usermovieid: '3',
    userid: '3',
    movieid: '2',
  },
];

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}));

app.get('/topmovies', (req, res) => {
  res.status(200).json(topMovies);
});

//Pull list of all movies
app.get('/movies', (req, res) => {
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
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
  .then((movie) => {
    res.json(movie);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('Error: ' + err);
  });
});

app.get('/genres/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = genres.find( genre => genre.name.toLowerCase() === genreName.toLowerCase()).description;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('No genre found')
  }
});

app.get('/director/:directorName', (req, res) => {
  const { directorName } = req.params;
  const directorData = director.find(director => director.name === directorName);

  if (directorData) {
    res.status(200).json(directorData);
  } else {
    res.status(400).send('No director found');
  }
});

//Get a list of users
app.get('/users', (req, res) => {
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
app.get('/users/:Username', (req, res) => {
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
app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + 'already exists');
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
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
app.put('/users/:Username', (req, res) => {
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
app.delete('/users/:Username', (req, res) => {
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

//Get list of favorited movies
app.get('/users_movies', (req, res) => {
  res.status(200).json(users_movies);
});

//Add a movie to user's list of favorites
app.post('/movies/:UserID/:MovieID', (req, res) => {
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
app.delete('/movies/:UserID/:MovieID', (req, res) => {
  Movies.findOneAndRemove({ Movies: req.params.movies })
    .then((movie) => {
      if(!movies) {
        res.status(400).send(req.params.Movie + ' was not found');
      } else {
        res.status(200).send(req.params.Movie + ' was deleted');
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error: ' + err);
    });
  });

//Default webpage
app.get('/', (req, res) => {
  res.status(200).send('Welcome To My MoviesFlix Page!');
});

//Open documentation page
app.get('/documentation', (req, res) => {
  res.status(200).sendFile('public/documentation.html', { root: __dirname });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('My first Node test server is running on Port 8080.');
});
