# myMovies Movie App 🍿

## Overview

The "myMovies" application is a full-stack JavaScript project built as part of CareerFoundry's Full-Stack Web Development Course. It is designed to demonstrate the mastery of MERN stack development.

The server-side component of the application includes a REST API and a MongoDB database, built using Node.js, Express, and JavaScript. The REST API can be accessed using common HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on the database.

The client-side component of the application is built using React, providing users with access to information about movies, directors, and genres. More detailed information about the features provided by the application can be found in the "Features" section of this README.

# Server-side

## Features

- Allows users to see a list of all movies in the database
- Allows users to get detailed information about a single movie by movie title
- Allows users to get detailed information about a genre by genre name
- Allows users to get detailed information about a director by name
- Allows new users to create an user account
- Allows existing users to update their user info or to delete their account
- Allows existing users to add or remove movies to/from their list of favorites

# Dependencies

- bcrypt
- body-parser
- cors
- express
- express-validator
- jsonwebtoken
- mongoose
- morgan
- passport
- passport-jwt
- passport-local
- uuid

# Endpoints

## Get a list of all movies

Endpoint: /movies

HTTP Method: GET

Request body data format: None

Response body data format: JSON Object holding data about all movies
Get data about a single movie by title

Endpoint: /movies/[Title]

Query Parameters: [Title] of movie

HTTP Method: GET

Request body data format: None

Response body data format: JSON object holding data about a single movie, containing title, description, genre, director, imageURL, featured or not.

Response Example:

```
{
    "id": "5dbc2d5e1c8922ba13eb0367",
    "Title": "The Batman",
    "Description": "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city''s hidden corruption and question his family's involvement.",
    "Genre": {
        "Name": "Action",
        "Description": "An action story is similar to adventure, and the protagonist usually takes a risky turn, which leads to desperate situations (including explosions, fight scenes, daring escapes, etc.). Action and adventure are usually categorized together (sometimes even as "action-adventure") because they have much in common, and many stories fall under both genres simultaneously (for instance, the James Bond series can be classified as both)."
    },
    "Director": {
        "Name": "Matt Reeves",
        "Bio": "Matthew George "Matt" Reeves was born April 27, 1966 in Rockville Center, New York, USA and is a writer, director and producer. Reeves began making movies at age eight, directing friends and using a wind-up camera. He befriended filmmaker J.J. Abrams when both were 13 years old and a public-access television cable channel, Z Channel, aired their short films.",
        "Birth": "1966"
    },
    "Actors": [],
    "ImageURL": "https://m.media-amazon.com/images/M/MV5BZTE2YTY3YTMtM2FlMS00YmI3LTgyMWUtM2FhMWIyZWRmMDk5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
    "Featured": true
}
}
```

## Get data about a genre by name

Endpoint: /movies/genres/[Name]

Query Parameters: [Name] of genre

HTTP Method: Get

Request body data format: None

Responsive body data format: A JSON object holding data about a movie genre

Response Example:

```
{
   "Name": "Action",
   "Description": "An action story is similar to adventure, and the protagonist usually takes a risky turn, which leads to desperate situations (including explosions, fight scenes, daring escapes, etc.). Action and adventure are usually categorized together (sometimes even as "action-adventure") because they have much in common, and many stories fall under both genres simultaneously (for instance, the James Bond series can be classified as both)"

}
```

# Get data about director by name

Endpoint: /movies/directors/[Name]
Query Parameters: [Name] of director

HTTP Method: GET

Request body data format: None

Response body data format: JSON object holding data a director containing name,bio and date of birth.

Response Example:

```
{
   "Name": "Matt Reeves",
    "Bio": "Matthew George "Matt" Reeves was born April 27, 1966 in Rockville Center, New York, USA and is a writer, director and producer. Reeves began making movies at age eight, directing friends and using a wind-up camera. He befriended filmmaker J.J. Abrams when both were 13 years old and a public-access television cable channel, Z Channel, aired their short films",
     "Birth": "1966"
}

```

## Get list of all users

**Endpoint**: /users

**HTTP Method**: GET

**Request body data format**: None

**Response body data format**: JSON object holding data about all users.
Get a user by username

**Endpoint**: /users/[Username]

**Query Parameters**: [Username] of user

**HTTP Method**: GET

**Request body data format**: None

**Response body data format**: JSON object holding data about a single user.

**Response Example**:

```
{
 "FavoriteMovies": [],
    "_id": "5dcbfa7031b7860017f6ea43",
    "Username": "Tester",
    "Password": "$2b$10$Pewtk7wMnqGaKgiifUrBJ.IU/yUIIYZZTqpBFSWTluso7Oqp.eeU2",
    "Email": "test@test.com",
    "Birthday": "1977-08-08T00:00:00.000Z",
    "__v": 0
}

```

## Add a new User

**Response Example**:

```
{
    "FavoriteMovies": [],
    "_id": "5dcd116a4aeeaa001759c134",
    "Username": "mrRobot",
    "Password": "$2b$10$yLdpCBJOFrCgUsxe.b.BHO5XVpu3BaXwEDJKXKdZ3t0hU95Lg.AJ2",
    "Email": "elliotAlderson@protonmail.com",
    "Birthday": "1986-02-06T00:00:00.000Z",
    "__v": 0
}
```

# Update user info by username

**Endpoint**: /users/[Username]

**Query Parameter**: [Username] of user

**HTTP Method**: PUT

**Request body data format**: JSON object holding data to be updated, structured like:

**Request Example**:

```
{
    "FavoriteMovies": [
        "5dbc29331c8922ba13eb0361",
        "5dbc27dc1c8922ba13eb035f"
    ],
    "_id": "5dca6f0e309c02bd94b20429",
    "Username": "mrRobot-Updated",
    "Password": "password-updated,
    "Email": "mrrobot@protonmail.com",
    "Birthday": "1986-02-08T00:00:00.000Z"
}
```

## Add a movie to list of favorites by movie ID

**Endpoint**: /users/[Username]/Movies/[MovieID]

**Query Parameter**: [Username] of user and [MovieID]

**HTTP Method**: POST

**Request body data format**: None

**Response body data format**: A text message indicating the movie was added to the list of favorites and the updated list of favorites.

**Response Example**:

```
The movie with ID 5dbc2a891c8922ba13eb0363 was successfully added to list of favorites. Favorites of SuperMario123:
5dbc29331c8922ba13eb0361,5dbc27dc1c8922ba13eb035f,5dbc2a891c8922ba13eb0363
```

## Delete a movie from list of favorites by movie ID

**Endpoint**: /users/[Username]/Movies/[MovieID]

**Query Parameter**: [Username] of user and [MovieID]

**HTTP Method**: DELETE

**Request body data format**: None

**Response body data format**: A text message indicating whether the movie was successfully removed and the updated list of favorites.

**Response Example**:

```
The movie with ID 5dbc2a891c8922ba13eb0363 was successfully deleted from the list of favorites. Favorites of
mrRobot: 5dbc29331c8922ba13eb0361,5dbc27dc1c8922ba13eb035f
```

## Delete user by username

**Endpoint**: /users/[Username]

**Query Parameter**: [Username] of user

**HTTP Method**: DELETE

**Request body data format**: None

**Response body data format**: A text message indicating whether the user account was successfully deleted.

**Response Example**:

```
mrRobot was deleted
```

# Client-side

The UI of myFlix is built using the React library. The interface views will handle data requested by the user through the REST API endpoints defined above.

## Technical Details

The application...

- is a single-page application
- uses state routing to navigate between views and share URLs
- gives users option to filter movies
- gives users option to sort movies
- initially uses Parcel as its built tool
- is migrated to create-react-app
- is written using React library and ES2015+
- is written with React Redux
- uses Bootstrap as a UI library for styling and responsiveness
- contains a mix of class components and function components
- is hosted online: [myMovies] (https://mymoviesapi2023.herokuapp.com/)

# Essential Views and Features

## Main view

- returns a list of all movies to the user (each listed item with image, title, description)
- sorting and filtering
  ability to select a movie for more details
- provides links/buttons to see profile data and to log out

## Movie view

- returns data (description, genre, director, image) about a single movie to the user
  allows users to add a movie to their list of favorites

## Login view

- allows users to login with username and password
  provides a link for new users registration view

## Registration view

- allows new users to sign in (username, password, email, birthday)

## Genre view

- returns data about a genre (name, description)
  displays example movies

## Director view

- returns data about a director (name, bio, birth year, death year if existing)
  displays example movies

## Profile view

- allows users to see their profile data (username, email, birthday)

  - displays favorite movies

  - allows users to remove a movie from their list of favorites

- provides buttons to either update or delete existing account

## Update profile

- allows users to update their user info
