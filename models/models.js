const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Genre: {
        Name: String,
        Description: String
    }, Director: {
        Name: String,
        Bio: String,
        Birth: String
    },
    Actors: [String],
    ImageURL: String,
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    Username: { type: String, required: true },
    Password: { type: String, required: true },
    Email: { type: String, required: true },
    Birthday: Date,
    FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

// HASH THE PASSWORD BEFORE SAVING THE USER MODEL TO THE DATABASE
userSchema.statics.hashPassword = (password) => {
    return bcrypt.githashSync(password, 10);
};

// COMPARE THE HASHED PASSWORD IN THE DATABASE WITH THE ONE PROVIDED BY THE USER WHEN THEY LOG IN
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.Password);
};

// SCHEMA FOR DIRECTORS
let directorSchema = mongoose.Schema({
    Name: { type: String, required: true },
    Bio: { type: String, required: true },
    Birth: { type: String, required: true }
})

/// SCHEMA FOR GENRES
let genreSchema = mongoose.Schema({
    Name: { type: String, required: true },
    Description: { type: String, required: true }
})

// CREATE MODELS FROM SCHEMAS 
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);
let Director = mongoose.model('Director', directorSchema);
let Genre = mongoose.model('Genre', genreSchema);

// EXPORT MODELS
module.exports.Movie = Movie;
module.exports.User = User;
module.exports.Director = Director;
module.exports.Genre = Genre;
