const express = require('express'),
  morgan = require('morgan'),
  fs = require('fs'),
  path = require('path'),
  bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

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
    genre: 'Action, Fanstay, Adventure, Childrens Film, Mystery, Adaptation & Narrative',
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
    genre: 'Action, Fanstay, Adventure, Childrens Film, Mystery, Adaptation & Narrative',
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

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}));

app.get('/topmovies', (req, res) => {
  res.json(topMovies);
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:name', (req, res) => {
    res.json(movies.find((title) =>
  { return movie.name === req.params.name }));
});

app.get('/movies/:genre', (req, res) => {
  res.json(movies.find((genre) =>
{ return movie.genre === req.params.name }));
});

app.get('/movies/:director', (req, res) => {
  res.json(movies.find((director) =>
{ return movie.director === req.params.name }));
});

app.get('/users', (req, res) => {
  res.send('Welcome to the users page!');
});

app.get('/users/:name', (req, res) => {
  res.send('Updated information');
});

app.get('/users/:id', (req, res) => {
  res.send('Un-registered user!');
});

app.get('/movies/fav', (req, res) => {
  res.send('Favorite movies page!');
});

app.get('/movies/fav/:movie', (req, res) => {
  res.send('Un-favorited movie!');
});

app.get('/', (req, res) => {
  res.send('Welcome To My MoviesFlix Page!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('My first Node test server is running on Port 8080.');
});
