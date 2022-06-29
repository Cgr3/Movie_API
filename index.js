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
    email: 'carlreynolds61@yahoo.com',
    birthday: '05/26/1999',
  },
  {
    userid: '2',
    username: 'Riah121',
    password: 'password123',
    email: 'mariah.joslyn121@gmail.com',
    birthday: '01/21/2000',
  },
  {
    userid: '3',
    username: '',
    password: '',
    email: '',
    birthday: '',
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
  res.json(topMovies);
});

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.get('/movies/:name', (req, res) => {
    res.json(movies.find((movie) =>
  { return movie.title === req.params.name }));
});

app.get('/movies/genre/:genre', (req, res) => {
  res.json(movies.find((movie) =>
{ return movie.genre === req.params.genre }));
});

app.get('/movies/director/:director', (req, res) => {
  res.json(movies.find((movie) =>
{ return movie.director === req.params.director }));
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.get('/users/:name', (req, res) => {
  res.send('Updated information');
});

app.get('/users/users/:id', (req, res) => {
  res.send('Un-registered user!');
});

app.get('/users_movies', (req, res) => {
  res.json(users_movies);
});

app.get('/movies/users_movies/:movie', (req, res) => {
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
