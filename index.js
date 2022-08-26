const express = require('express')
bodyParser = require('body-parser'),
    uuid = require('uuid');

const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const Models = require('./models/models');

const passport = require('passport');
require('./passport')


const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect('mongodb://localhost:27017/myMovies').catch(error => handleError(error) && console.log(error));



app.use(bodyParser.json());

//log request to server
app.use(morgan('common'))

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

let auth = require('./auth')(app);


// default text response
app.get("/", (req, res) => {
    res.send("Welcome to myMovies!")
})




app.get('/movies', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Movies.find().then((movies) => {
            res.status(201).json(movies);
        }).catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
    });


    
// Users

// Get all users
app.get('/users', (req, res) => {
    Users.find()
        .then((allUsers) => {
            res.status(201).json(allUsers);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error: ' + err);
        });
});
// CREATE: add User to the database
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username }).then((user) => {
        if (user) {
            return res.status(400).send(req.body.Username + 'already exists!');
        } else {
            Users.create({
                Username: req.body.Username,
                Password: req.body.Passsword,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            }).then((user) => { res.status(201).json(user) }).catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
            })
        }
    }).catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error)
    });
});


// Get one user by username

app.delete('/users/:Username', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username }).then((user) => {
        if (!user) {
            res.status(400).send(req.params.Username + ' was not found!');
        } else {
            res.status(200).send(req.params.Username + ' was deleted');
        }
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});


// GET based on username
app.get('/users/:Username', (req, res) => {
    Users.findOne({ Username: req.params.Username }).then((user) => {
        res.json(user);
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// UPDATE: change user's username
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username },
        {
            $set: {
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
                res.status(500).send('Error: ' + err);
            } else {
                res.json(updateUser); // Return the updated document

            }
        })
});


// Movies

// UPDATE: add favorite movies to users
app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username },
        { $push: { FavoriteMovies: req.params.MovieID } },
        { new: true }, // This line ensures that the updated document is returned
        (err, updatedUser) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error:' + err)
            } else {
                res.json(updatedUser)
            }
        });
});

// DELETE: remove favorite movie from users
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
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


// Get Movies
app.get('/movies', (req, res) => {
    Movies.find().then((movie) => {
        res.status(201).json(movie);
    }).catch((err) => {
        console.error(err);
        res.status(500).send("Error", + err)
    })
});

app.get('/movies/:Title', (req, res) => {
    Movies.findOne({ Title: req.params.Title }).then((movie) => {
        res.json(movie);
    }).catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Directors

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

    /
    // Genre

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



app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8081, () => {
    console.log('Port 8081 is up succesfully')
})