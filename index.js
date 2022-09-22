const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid'),
    mongoose = require('mongoose'),
    Models = require('./models/models'),
    { check, validationResult } = require('express-validator');

const app = express();

// SCHEMAS 
const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

// mongoose.connect('mongodb://localhost:27017/myMovies', { useNewUrlParser: true, useUnifiedTopology: true }); // DATABASE Option 1: Local DB
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, dbName: "myMoviesDB", useUnifiedTopology: true }); // REMOTE DATABASE Option 2: Remote DB


// MIDDLEWARE
app.use(bodyParser.json());

// LOGGING MIDDLEWARE
const cors = require('cors');
// ALL ORIGINS ARE ALLOWED TO ACCESS THE API ENDPOINTS
app.use(cors());

// CETAIN ORIGINS ARE ALLOWED TO ACCESS THE API ENDPOINTS:
// let allowedOrigins = ['http://localhost:8080', 'http://testsite.com']
// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true); // i don't understand this line
//     if (allowedOrigins.indexOf(origin) === -1){ // specific origin not in allowedOrigins list
//       let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
//       return callback(new Error(message), false);
//     }
//     return callback(null, true);
//   }
// }));

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// INPUT VALIDATION
const userValidation = [
    check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
];

// INPUT VALIDATION FOR MOVIES
const movieValidation = [
    check('Title', 'Title is required').not().isEmpty(),
    check('Description', 'Description is required').not().isEmpty(),
    check('Genre', 'Genre is required').not().isEmpty(),
    check('Director', 'Director is required').not().isEmpty(),
    check('Actors', 'Actors is required').not().isEmpty(),
    check('ImageURL', 'ImageURL is required').not().isEmpty(),
    check('Featured', 'Featured is required').not().isEmpty()
];


//AUTHENTICATION
require('./auth')(app);
const passport = require('passport');
const { Passport } = require('passport');
require('./passport');

// LOGS REQUESTS TO THE CONSOLE
app.use(morgan('common'));
app.use(express.static('public'));


//ROUTING / HOME
app.get("/", (req, res) => {
    res.send('Hello there! Welcome to myMovies');
})

// LIST OF ALL MOVIES
app.get('/users', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.find()
        .then((allUsers) => {
            res.status(201).json(allUsers);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send(`Error: ${err}`);
        });
});

// ADD User
app.post('/users', userValidation, (req, res) => {
    //check for validation errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
        .then((user) => {
            if (user) {
                return res.status(400).send(`Username ${req.body.Username} already taken.`);
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday
                    })
                    .then((new_user) => { res.status(201).json(new_user) })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).send(`Error: ${error}`);
                    })
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send(`Error: ${error}`);
        });
});

// REMOVE USER
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    // ONLY ALLOWS USERS TO DELETE THEIR OWN ACCOUNT
    if (req.user.Username !== req.params.Username) {
        res.status(403).json('You are not authorized to delete this user.');
    }
    else {
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
    }
});


// GET USER INFO BY USERNAME
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), (req, res) => {
    Users.findOne({ Username: req.params.Username }).then((user) => {
        res.json(user);
    }).catch((err) => {
        console.error(err);
        res.status(500).send(`Error: ${err}`);
    });
});

// UPDATE USER INFO
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), userValidation, (req, res) => {

    const errors = validationResult(req);
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


// MOVIES Endpoint
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

// ADD MOVIE TO FAVORITES LIST OF USER
app.post('/users/:Username/movies/:MovieID',
    passport.authenticate({ session: false }),
    (req, res) => {
        if (req.user.Username !== req.params.Username) {
            res.status(403).json('Not allowed to add movie to another user\'s favorites list');
        }
        else {
            Users.findOneAndUpdate(
                { Username: req.params.Username },
                // { $addToSet: { FavoriteMovies: req.params.MovieID } },
                { $push: { FavoriteMovies: req.params.MovieID } },
                { new: true }, // This line ensures that the updated document is returned
                (err, updated_User) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send(`Error:${err}`)
                    } else {
                        res.json(updated_User)
                    }
                });
        }
    });

// REMOVE MOVIE FROM FAVORITES
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), (req, res) => {
    // ONLY ALLOQWS USERS TO REMOVE MOVIES FROM THEIR OWN FAVORITES
    if (req.user.Username != req.params.Username) {
        res.status(403).json('Not allowed to remove movie from another user\'s favorites list');
    } else {
        Users.findOneAndUpdate({ Username: req.params.Username }, {
            $pull: { FavoriteMovies: req.params.MovieID }
        },
            { new: true }) // THIS LINE ENSURES THAT THE UPDATED DOCUMENT IS RETURNED
            .then((updatedUser) => {
                res.status(200).send(`Favorite movie removed from ${updatedUser.Username}`);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send(`Error: ${err}`);
            });
    }
});


// DIRECTORS

// RETURN A LIST OF ALL DIRECTORS BY NAME (BIO, BIRTHYEAR)
app.get('/directors/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
    Directors.findOne({ Name: req.params.Name }).then((director) => {
        res.json(director);
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err); // 500: INTERNAL SERVER ERROR
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

// RETURNS GENRE BY NAME
app.get('/genres/:Name', (req, res) => {
    Genres.findOne({ Name: req.params.Name }).then((genreName) => {
        res.status(201).json(genreName)
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    })
})

// DOCUMENTATION ROUTE
app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html');
});


// SERVER & HEROKU
const port = process.env.PORT || 8081;
app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on Port ${port}`);
});