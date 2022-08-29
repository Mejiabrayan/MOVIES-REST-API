const express = require('express')
bodyParser = require('body-parser'),
    uuid = require('uuid');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models/models');
const passport = require('passport');
require('./passport')
const { check, validationResult } = require('express-validator');

let allowedOrigins = ['http://localhost:8081', 'http://testsite.com'];
const cors = require('cors');
const { authenticate } = require('passport');
app.use(cors()); // CORS Option 1: Allow all domain
// app.use(cors({ // CORS Option 2: only allow specific domains
//     origin: (origin, callback) => {
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) {
//             let message = 'The CORS policy for this application \doesn\'t allow access from origin ' + origin;
//             return callback(new Error(message), false);
//         }
//         return callback(null, true);
//     }
// }));

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

const URI = process.env.CONNECTION_URI;
// const URI = 'mongodb://localhost:27017/movie-api'; // Database Option 1: Local DB
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

//log request to server
app.use(morgan('common'))

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});



//AUTHENTICATION
let auth = require('./auth')(app);

//ROUTING
//Home
app.get("/", (req, res) => {
    res.send('index.html', { root: __dirname });
})


// USERS

// GET: returns all users
app.get('/users', passport, authenticate('jwt', { session: false }), (req, res) => {
    Users.find()
        .then((allUsers) => {
            res.status(201).json(allUsers);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

// CREATE: add User to the database
app.post('/users',
    // Validation Logic
    [
        check('Username', 'Username is required').isLength({ min: 5 }), // sets minimum value of 5 characters
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(), // specifies tnat a field can only contain letters and numbers
        check('Password', ' Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmail(),
    ],
    (req, res) => {

        // check the validation object for errors
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let hashedPassword = Users.hashedPassword(req.body.Passsword);
        Users.findOne({ Username: req.body.Username }).then((user) => {    // Searches to see if user with the requested username alreadt exists
            if (user) {
                return res.status(400).send(`${req.body.Username} already exists!`); // if the user is found, send a response that it already exists
            } else {
                Users.create({
                    Username: req.body.Username,
                    Password: hashedPassword,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday
                }).then((user) => { res.status(201).json(user) }).catch((error) => {
                    console.error(error);
                    res.status(500).send(`Error: ${error}`);
                })
            }
        }).catch((error) => {
            console.error(error);
            res.status(500).send(`Error: ${error}`)
        });
    });


// DELETE: remove user

app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
        .then((user) => {
            if (!user) {
                res.status(400).send(`${req.params.Username} was not found!`);
            } else {
                res.status(200).send(`${req.params.Username} was deleted`);
            }
        }).catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});


// GET based on username
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ Username: req.params.Username }).then((user) => {
        res.json(user);
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// UPDATE: change user's username
app.put('/users/:Username',
    [
        check('Username', 'Username is required').isLength({ min: 5 }),
        check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
        check('Password', 'Password is required').not().isEmpty(),
        check('Email', 'Email does not appear to be valid').isEmpty(),
    ],
    passport.authenticate('jwt', { session: false }),

    (req, res) => {

        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        Users.findOneAndUpdate(
            { Username: req.params.Username },
            {
                $set:
                {
                    Username: req.body.Username,
                    Password: req.body.Password,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday

                }
            },
            { new: true }, // This line ensures that the updated document is returned
            (err, updateUser) => {
                if (err) {
                    console.error(err);
                    res.status(500).send(`Error: ${err}`);
                } else {
                    res.json(updateUser); // Return the updated document

                }
            })
    });


// MOVIES

// GET: fetches a list of all movies
app.get('/movies', passport.authenticate('jwt', { session: false }), (req, res) => {
    Movies.find()
        .then((movies) => {
            res.status(201).json(movies);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(`Error: ${error}`);
        });
});

// GET: fetches movies by title
app.get('/movies/:Title', passport.authenticate('jwt', { sesson: false }), (req, res) => {
    Movies.findOne({ Title: req.params.Title })
        .then((movie) => {
            res.json(movie);
        }).catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});

// UPDATE: add favorite movies to users
app.post('/users/:Username/movies/:MovieID',
    [
        check('Username', 'Username is required').isLength({ min: 5 }),
        check('Username', 'Username contains non alphanumeric characters - not allowed').isAlphanumeric(),
        check('MovieID', 'MovieID is required').not().isEmpty(),
        check('MovieID', 'MovieID does not appear to be valid').isMongoId(),
    ],
    passport.authenticate({ session: false }),
    (req, res) => {
        Users.findOneAndUpdate(
            { Username: req.params.Username },
            { $addToSet: { FavoriteMovies: req.params.MovieID } },
            { $push: { FavoriteMovies: req.params.MovieID } },
            { new: true }, // This line ensures that the updated document is returned
            (err, updatedUser) => {
                if (err) {
                    console.error(err);
                    res.status(500).send(`Error:${err}`)
                } else {
                    res.json(updatedUser)
                }
            });
    });

// DELETE: remove favorite movie from users
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt',
    { session: false }),
    (req, res) => {
        Users.findOneAndDelete({ FavoriteMovies: req.params.MovieID }).then((movie) => {
            if (!movie) {
                res.status(400).send(req.params.MovieID + ' movie was not found!');
            } else {
                res.status(201).send(req.params.MovieID + ' movie was successfully deleted!');
            }
        }).catch((err) => {
            console.error(err);
            res.status(500).send('Error:' + err)
        });
    });


// DIRECTORS

// GET: returns all directors
app.get('/directors', (req, res) => {
    Directors.find().then((director) => {
        res.status(201).json(director);
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error', + err);
    })
})


// GET: return director by name
app.get('/directors/:Name', (req, res) => {
    Directors.findOne({ Name: req.params.Name }).then((director) => {
        res.json(director);
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);  // 500 is server error
    })
})

// GENRES

// GET: returns all genres
app.get('/genres', (req, res) => {
    Genres.find().then((genre) => {
        res.status(201).json(genre);
    }).catch((err) => {
        console.error(err);
        res.status(400).send('Error: ' + err);
    })
})

// GET: returns Genre based on name
app.get('/genres/:Name', (req, res) => {
    Genres.findOne({ Name: req.params.Name }).then((genreName) => {
        res.status(201).json(genreName)
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
})



// app.get('/documentation', (req, res) => {
//     res.sendFile('public/documentation.html', { root: __dirname });
// });


// Server & Heroku 
const port = process.env.PORT || 8081;
app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on Port ${port}`);
});