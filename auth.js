const jwtSecret = 'your_jwt_secret'; // THIS SHOULD BE IN YOUR CONFIG FILE
const jwt = require('jsonwebtoken'), // THIS WILL BE USED TO ENCODE AND DECODE JWT TOKENS
    passport = require('passport'); // THIS WILL BE USED FOR AUTHENTICATION

require('./passport'); // LOCAL STRATEGY


let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username, // THIS IS THE USERNAME FIELD IN THE USER MODEL
        expiresIn: '7d', // THIS EXPIRES IN 7 DAYS
        algorithm: 'HS256' // THIS IS REQUIRED! 
    });
}


/* POST LOGIN. */
module.exports = (router) => {
    // LOGIN ROUTE
    router.post('/login',
        (req, res) => {
            passport.authenticate('local', { session: false }, (error, user, info) => {
                if (error || !user) {
                    return res.status(400).json({
                        message: 'Something is not right',
                        user: user
                    });
                }
                req.login(user, { session: false }, (error) => {
                    if (error) {
                        res.send(error);
                    }
                    let token = generateJWTToken(user.toJSON());
                    return res.json({ user, token });
                });
            })(req, res);
        });
}