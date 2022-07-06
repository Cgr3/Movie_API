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

let topMovies = [
  {
    title: '8 Crazy Nights',
    year: '2002',
    genre: 'Comedy, Adult Animation, Musical, Animation',
    director: 'Seth Kearlsy',
  },
  {
    title: 'Thor',
    year: '2011',
    genre: 'Action, Superhero, Sci-Fi, Fantasy & Adventure',
    director: 'Kenneth Branagh',
  },
  {
    title: 'Spider Man',
    year: '2002',
    genre: 'Action, Adventure & Sci-Fi',
    director: 'Sam Raimi',
  },
  {
    title: 'Iron Man',
    year: '2008',
    genre: 'Action, Adventure & Sci-Fi',
    director: 'Jon Favreau'
  },
  {
    title: 'Captain America: The First Avenger',
    year: '2011',
    genre: 'Action, War, Adventure, Superhero, Sci-Fi & Thriller',
    director: 'Joe Johnston'
  },
  {
    title: 'Harry Potter And The Goblet Of Fire',
    year: '2005',
    genre: 'Fantasy, Adventure, Childrens Film, Thriller & Mystery',
    director: 'Mike Newell'
  },
  {
    title: 'Harry Potter And The Deathly Hollows Part 1',
    year: '2010',
    genre: 'Action, Fantasy, Adventure, Childrens Film, Mystery, Adaptation & Narrative',
    director: 'David Yates'
  },
  {
    title: 'Harry Potter And The Deathly Hollows Part 2',
    year: '2011',
    genre: 'Drama, Fantasy, Adventure, Mystery & Narrative',
    director: 'David Yates'
  },
  {
    title: 'The Maze Runner',
    year: '2014',
    genre: 'Sci-Fi & Action',
    director: 'Wes Ball'
  },
  {
    title: 'Maze Runner: The Death Cure',
    year: '2018',
    genre: 'Sci-Fi & Action',
    director: 'Wes Ball'
  },
];

let movies = [
  {
    movieid: '1',
    title: '8 Crazy Nights',
    description: 'An Adam Sandler animated chanukah musical',
    genre: 'Comedy',
    genreid: '1',
    director: 'Seth Kearlsy',
    directorid: '1',
    imgurl: '',
    featured: '',
  },
  {
    movieid: '2',
    title: 'Thor',
    description: '',
    genre: 'Action',
    genreid: '2',
    director: 'Kenneth Branagh',
    directorid: '2',
    imgurl: '',
    featured: '',
  },
  {
    movieid: '3',
    title: 'Spider Man',
    description: '',
    genre: 'Action',
    genreid: '2',
    director: 'Sam Raimi',
    directorid: '3',
    imgurl: '',
    featured: '',
  },
  {
    movieid: '4',
    title: 'Iron Man',
    description: '',
    genre: 'Action',
    genreid: '2',
    director: 'Jon Favreau',
    directorid: '4',
    imgurl: '',
    featured: '',
  },
  {
    id: '5',
    title: 'Captain America: The First Avenger',
    description: '',
    genre: 'Action',
    genreid: '2',
    director: 'Joe Johnston',
    directorid: '5',
    imgurl: '',
    featured: '',
  },
  {
    movieid: '6',
    title: 'Harry Potter And The Goblet Of Fire',
    description: '',
    genre: 'Fantasy',
    genreid: '6',
    director: 'Mike Newell',
    directorid: '6',
    imgurl: '',
    featured: '',
  },
  {
    movieid: '7',
    title: 'Harry Potter And The Deathly Hollows Part 1',
    description: '',
    genre: 'Adventure',
    genreid: '3',
    director: 'David Yates',
    directorid: '7',
    imgurl: '',
    featured: '',
  },
  {
    movieid: '8',
    title: 'Harry Potter And The Deathly Hollows Part 2',
    description: '',
    genre: 'Drama',
    genreid: '8',
    director: 'David Yates',
    directorid: '7',
    imgurl: '',
    featured: '',
  },
  {
    movieid: '9',
    title: 'The Maze Runner',
    description: '',
    genre: 'Sci-Fi',
    genreid: '4',
    director: 'Wes Ball',
    directorid: '8',
    imgurl: '',
    featured: '',
  },
  {
    movieid: '10',
    title: 'Maze Runner: The Death Cure',
    description: '',
    genre: 'Sci-Fi',
    genreid: '4',
    director: 'Wes Ball',
    directorid: '8',
    imgurl: '',
    featured: '',
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
    userid: '1',
    username: 'CGR',
    password: 'test123',
    email: '123email@email.com',
    birthday: '01/04/2001',
  },
  {
    userid: '2',
    username: 'Riah121',
    password: 'password123',
    email: 'exampleemail@email.com',
    birthday: '01/17/2000',
  },
  {
    userid: '3',
    username: 'jaz',
    password: '123pass',
    email: 'emailexample@email.com',
    birthday: '06/05/2005',
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

app.get('/movies/:name', (req, res) => {
    const { name } = req.params;
    const movie = movie.find(movie => movie.title === name);

    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(400).send('No movie found');
    }
});

app.get('/movies/genre/:genre', (req, res) => {
  const { name } = req.params.genre;
  const genre = movie.find(movie => genre.name === name);

  if (genre) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('No movie found');
  }
});

app.get('/movies/director/:director', (req, res) => {
  const { name } = req.params.director;
  const director = movie.find(movie => director.name === name);

  if (director) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('No movie found');
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
      .then((user) => {res.status(201).json(user) })
      .catch((err) => {
        console.log(err);
        res.status(500).send('Error: ' + err);
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
app.post('/users/:Username/movies/:MovieID', (req, res) => {
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
app.delete('/movies/:Username/:movies/:MovieID', (req, res) => {
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
