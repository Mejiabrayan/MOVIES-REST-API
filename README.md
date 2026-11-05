# myMovies REST API

A Node.js and Express API for a movie catalog and user accounts, backed by MongoDB. It supports browsing movies, genres, and directors, plus account and favorites operations.

This API is the backend companion to the [myMovies client](https://github.com/Mejiabrayan/MyMovie-App).

## Stack

Node.js · Express · MongoDB · Mongoose · Passport · JWT

## Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/movies` | List movies |
| GET | `/movies/:title` | Get a movie by title |
| GET | `/movies/genres/:name` | Get a genre |
| GET | `/movies/directors/:name` | Get a director |
| GET | `/users` | List users |
| GET | `/users/:username` | Get a user |
| POST | `/users` | Register a user |
| PUT | `/users/:username` | Update a user |
| POST | `/users/:username/Movies/:movieId` | Add a movie to favorites |
| DELETE | `/users/:username/Movies/:movieId` | Remove a movie from favorites |
| DELETE | `/users/:username` | Delete a user |

Use the request and response formats implemented by the API routes. Do not use real personal information in test data.