const express = require('express');
const app = express(),
    bodyParser = require('body-parser'),
    uuid = require('uuid');


app.use(bodyParser.json());
app.use(express.static('public'));


let users = [{
    id: 1,
    Name: "Brayan Mejia",
    FavoriteMovies: ["The Batman"]
}, {
    id: 2,
    Name: "Dylan Weiss",
    FavoriteMovies: ["Elvis"]
}]
let movies = [{

    "Title": "The Batman",
    "Description": "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city\'s hidden corruption and question his family\'s involvement.",
    "Genre": {
        "Name":
            ["Action, Adventure, Crime"],
        "Description":
            "An action story is similar to adventure, and the protagonist usually takes a risky turn, which leads to desperate situations (including explosions, fight scenes, daring escapes, etc.). Action and adventure are usually categorized together (sometimes even as \"action-adventure\") because they have much in common, and many stories fall under both genres simultaneously (for instance, the James Bond series can be classified as both)."
    },
    "Director": {
        "Name":
            "Matt Reeves",
        "Bio":
            " Matthew George \"Matt\" Reeves was born April 27, 1966 in Rockville Center, New York, USA and is a writer, director and producer. Reeves began making movies at age eight, directing friends and using a wind-up camera. He befriended filmmaker J.J. Abrams when both were 13 years old and a public-access television cable channel, Z Channel, aired their short films. When Reeves and Abrams were 15 or 16 years old, Steven Spielberg hired them to transfer some of his own Super 8 films to videotape.",
        "Birth": "April 27, 1966"
    },
    "Actors": ["Robert Pattinson, Zoë Kravitz, Jeffrey Wright, Colin Farrell"],
    "ImageUrl": "https://images-na.ssl-images-amazon.com/images/I/51C49vnkOSL._SX300_SY300_QL70_FMwebp_.jpg",
    "Featured": false
},
{
    "Title": "Avatar: The Way of Water",
    "Description": "Jake Sully lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their planet.",
    "Genre": {
        "Name": ["Action, Adventure, Sci-Fi"],
        "Description": "Action and adventure are sometimes considered two distinct genres, however, the two go hand-in-hand: they involve exciting sequences and obstacles that must be overcome before reaching a goal. There are many different categories of action-adventure stories."
    },
    "Director": {
        "Name":
            "James Cameron",
        "Bio":
            "James Francis Cameron was born on August 16, 1954 in Kapuskasing, Ontario, Canada. He moved to the United States in 1971. The son of an engineer, he majored in physics at California State University before switching to English, and eventually dropping out. He then drove a truck to support his screenwriting ambition. He landed his first professional film job as art director, miniature-set builder, and process-projection supervisor on Roger Corman's Battle Beyond the Stars (1980) and had his first experience as a director with a two week stint on Piranha II: The Spawning (1981) before being fired.",
        "Birth": "August 16, 1954 "
    },
    "Actors": ["Michelle Yeoh, Sam Worthington, Jemaine Clement, Zoe Saldana"],
    "ImageUrl": "https://media.fstatic.com/o38F-z_Jzf-yFvIHJBream7FI7s=/290x478/smart/media/movies/covers/2020/05/BD549C02-FEBB-47E8-8511-AD33EB5552DC.jpeg",
    "Featured": false
}, {
    "Title": "Glass Onion: A Knives Out Mystery",
    "Description": "Plot unknown. Sequel to the 2019 film Knives Out.",
    "Genre": {
        "Name": "Crime, Drama, Thriller",
        "Description": "A crime story is often about a crime that is being committed or was committed, but can also be an account of a criminal's life. A mystery story follows an investigator as they attempt to solve a puzzle (often a crime). The details and clues are presented as the story continues and the protagonist discovers them and by the end of the story the mystery is solved. For example, in the case of a crime mystery, the perpetrator and motive behind the crime are revealed and the perpetrator is brought to justice. Mystery novels are often written in series, which facilitates a more in-depth development of the primary investigator"
    },
    "Director": {
        "Name":
            "Rian Johnson",
        "Bio": "Rian Johnson was born in Maryland and at a young age his family moved to San Clemente, California, where he was raised. After graduating from high school, he went on to attend the University of Southern California School of Cinematic Arts. His first feature film, Brick (2005), was released in 2005 and was the metaphorical building block that launched his career. He is a director, writer, and musician, among other areas of expertise.",
        "Birth": "December 17, 1973"
    },
    "Actors": ["Jessica Henwick, Ethan Hawke, Kathryn Hahn, Daniel Craig"],
    "ImageUrl": "https://assets.mycast.io/posters/glass-onion-a-knives-out-mystery-2012-fan-casting-poster-221254-large.jpg?1659155854",
    "Featured": false
}, {
    "Title": "Argylle ",
    "Description": "The world\'s greatest spy, \'Argylle,\' gets caught up in a globe-trotting adventure.",
    "Genre": {
        "Name": ["Action"],
        "Description": "An action story is similar to adventure, and the protagonist usually takes a risky turn, which leads to desperate situations (including explosions, fight scenes, daring escapes, etc.). Action and adventure are usually categorized together (sometimes even as \"action-adventure\") because they have much in common, and many stories fall under both genres simultaneously (for instance, the James Bond series can be classified as both)."
    },
    "Director": {
        "Name":
            "Matthew Vaughn",
        "Bio": "Matthew Vaughn is an English film producer and director. He is known for producing such films as Lock, Stock and Two Smoking Barrels (1998) and Snatch (2000) and for directing the crime thriller, Layer Cake (2004), the fantasy epic, Stardust (2007), the superhero comedy, Kick-Ass (2010), and the superhero film, X-Men: First Class (2011). Vaughn was educated at Stowe School in Buckingham, England. Taking a gap year between Stowe and university, he traveled the world on a Hard Rock Cafe tour and landed in Los Angeles, U.S. Here, he began working as an assistant to a director. He returned to London, attending University College London where he studied anthropology and ancient history. But the film bug had taken hold. He dropped out of university after a few weeks and returned to Los Angeles to start his career. He quickly realized, however, that everyone in town was trying to do the same thing, so he crossed back over the Atlantic to make a name for himself in England. ",
        "Birth": "March 7, 1971"
    },
    "Actors": ["Bryce Dallas Howard, Bryan Cranston, Henry Cavill, Sam Rockwell"],
    "ImageUrl": "https://m.media-amazon.com/images/M/MV5BMWM5YTRlNjYtNGRlMy00M2U5LTgyMTItMmFhODUzNDcxMWVhXkEyXkFqcGdeQXVyMjU5OTg0MTQ@._V1_UY1200_CR169,0,630,1200_AL_.jpg",
    "Featured": false
}, {
    "Title": "Asteroid City",
    "Description": "An astronomy convention takes place at a desert town in the 1950s, where several students and their parents meet and their knowledge, experiences and lives overlap in unexpected ways.",
    "Genre": {
        "Name": ["Comedy, Romance "],
        "Description": "Comedy is a story that tells about a series of funny, or comical events, intended to make the audience laugh. It is a very open genre, and thus crosses over with many other genres on a frequent basis. "
    },
    "Director": {
        "Name":
            "Wes Anderson",
        "Bio": "Wesley Wales Anderson was born in Houston, Texas. His mother, Texas Ann (Burroughs), is an archaeologist turned real estate agent, and his father, Melver Leonard Anderson, worked in advertising and PR. He has two brothers, Eric and Mel. Anderson's parents divorced when he was a young child, an event that he described as the most crucial event of his brothers and his growing up. During childhood, Anderson also began writing plays and making super-8 movies. He was educated at Westchester High School and then St. John's, a private prep school in Houston, Texas, which was later to prove an inspiration for the film Rushmore (1998).",
        "Birth": "May 1, 1969"
    },
    "Actors": [" Maya Hawke, Margot Robbie, Tom Hanks, Bryan Cranston"],
    "ImageUrl": "https://static2.abc.es/media/espana/2021/09/22/image00001-kZB--620x349@abc.jpeg",
    "Featured": false
}, {
    "Title": "Killers of the Flower Moon ",
    "Description": "Members of the Osage tribe in the United States are murdered under mysterious circumstances in the 1920s sparking a major F.B.I. investigation involving J. Edgar Hoover.",
    "Genre": {
        "Name": ["Crime, Drama, History"],
        "Description": "A crime story is often about a crime that is being committed or was committed, but can also be an account of a criminal's life. A mystery story follows an investigator as they attempt to solve a puzzle (often a crime). The details and clues are presented as the story continues and the protagonist discovers them and by the end of the story the mystery is solved. For example, in the case of a crime mystery, the perpetrator and motive behind the crime are revealed and the perpetrator is brought to justice. Mystery novels are often written in series, which facilitates a more in-depth development of the primary investigator."
    },
    "Director": {
        "Name": "Martin Scorsese",
        "Bio": "Martin Charles Scorsese was born on November 17, 1942 in Queens, New York City, to Catherine Scorsese (née Cappa) and Charles Scorsese, who both worked in Manhattan's garment district, and whose families both came from Palermo, Sicily. He was raised in the neighborhood of Little Italy, which later provided the inspiration for several of his films. Scorsese earned a B.S. degree in film communications in 1964, followed by an M.A. in the same field in 1966 at New York University's School of Film. During this time, he made numerous prize-winning short films including The Big Shave (1967), and directed his first feature film, Who's That Knocking at My Door (1967).",
        "Birth": "November 17, 1942"
    },
    "Actors": ["Leonardo DiCaprio, Robert De Niro, Lily Gladstone, Jesse Plemons"],
    "ImageUrl": "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9780857209030/killers-of-the-flower-moon-9780857209030_hr.jpg",
    "Featured": false
}, {
    "Title": "Spider-Man: Across the Spider-Verse",
    "Description": "Miles Morales returns for the next chapter of the Oscar®-winning Spider-Verse saga, an epic adventure that will transport Brooklyn\'s full-time, friendly neighborhood Spider-Man across the Multiverse to join forces with Gwen Stacy and a new team of Spider-People to face off with a villain more powerful than anything they have ever encountered.",
    "Genre": {
        "Name": ["Animation, Action, Adventure"],
        "Description": "An adventure story is about a protagonist who journeys to epic or distant places to accomplish something. It can have many other genre elements included within it, because it is a very open genre. The protagonist has a mission and faces obstacles to get to their destination. Also, adventure stories usually include unknown settings and characters with prized properties or features. "
    },
    "Director": {
        "Name": "Joaquim Dos Santos",
        "Bio": "Joaquim Dos Santos was born on June 22, 1977 in Lisbon, Portugal. He is known for The Legend of Korra (2012), Avatar: The Last Airbender (2005) and Voltron: Legendary Defender (2016).",
        "Birth": "June 22, 1977"
    },
    "Actors": ["Shameik Moore, Hailee Steinfeld, Oscar Isaac, Jake Johnson"],
    "ImageUrl": "https://image.tmdb.org/t/p/original/gwv98uK5J7xEOgJ1Mmij1O22eVR.jpg",
    "Featured": false
}, {
    "Title": "Elvis",
    "Description": "The life of American music icon Elvis Presley, from his childhood to becoming a rock and movie star in the 1950s while maintaining a complex relationship with his manager, Colonel Tom Parker.",
    "Genre": {
        "Name": ["Biography, Drama, Music"],
        "Description": "A story about a real person or event. There are also some fiction works that purport to be the \"memoirs\" of fictional characters as well, done in a similar style, however, these are in a separate genre. Often, they are written in a text book format, which may or may not focus on solely that. "
    },
    "Director": {
        "Name": "Baz Luhrmann",
        "Bio": "Baz Luhrmann is an Australian writer, director and producer with projects spanning film, television, opera, theater, music and recording industries. He is regarded by many as a contemporary example of an auteur for his distinctly recognizable style and deep involvement in the writing, directing, design and musical components of all his work. As a storyteller, \he'\s known as a pioneer of pop culture, fusing high and low culture with a unique sonic and cinematic language. He is the most commercially successful Australian director, with his films making up four of the top ten highest worldwide grossing Australian films ever.",
        "Birth": "September 17, 1962"
    },
    "Actors": ["Tom Hanks, Austin Butler, Olivia DeJonge, Helen Thomson"],
    "ImageUrl": "https://bingeddata.s3.amazonaws.com/uploads/2020/12/elvis.jpg",
    "Featured": false
}, {
    "Title": "Babylon",
    "Description": "Set in Hollywood during the transition from silent films to talkies, focusing on a mixture of historical & fictional characters.",
    "Genre": {
        "Name": ["Drama"],
        "Description": "Within film, television, and radio (but not theatre), drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone,[25] focusing on in-depth development of realistic characters who must deal with realistic emotional struggles. A drama is commonly considered the opposite of a comedy, but may also be considered separate from other works of some broad genre, such as a fantasy."
    },
    "Director": {
        "Name":
            "Damien Chazelle",
        "Bio": "Damien Sayre Chazelle is an American director and screenwriter. He was born in Providence, Rhode Island. His mother, Celia Sayre (Martin) Chazelle, is an American-Canadian writer and professor of history at The College of New Jersey. His father, Bernard Chazelle, is a French-American Eugene Higgins Professor of computer science at Princeton University, originally from Clamart, France. Chazelle has a sister, Anna, who is an actress and circus performer.",
        "Birth": " 	January 19, 1985 "
    },
    "Actors": ["Brad Pitt, Margot Robbie, Olivia Wilde, Samara Weaving"],
    "ImageUrl": "https://a.ltrbxd.com/resized/film-poster/5/4/2/7/7/3/542773-babylon-0-460-0-690-crop.jpg?k=ed65ef83e9",
    "Featured": false
}, {
    "Title": "Top Gun: Maverick",
    "Description": "After more than thirty years of service as one of the Navy\'s top aviators, Pete Mitchell is where he belongs, pushing the envelope as a courageous test pilot and dodging the advancement in rank that would ground him.",
    "Genre": {
        "Name": ["Action, Drama"],
        "Description": "An action story is similar to adventure, and the protagonist usually takes a risky turn, which leads to desperate situations (including explosions, fight scenes, daring escapes, etc.). Action and adventure are usually categorized together (sometimes even as \"action-adventure\") because they have much in common, and many stories fall under both genres simultaneously (for instance, the James Bond series can be classified as both). "
    },
    "Director": {
        "Name":
            "Joseph Kosinski",
        "Bio": "Joseph Kosinski is a director whose uncompromising style has quickly made a mark in the filmmaking zeitgeist. His feature film debut, \"Tron: Legacy\" for Walt Disney Studios, grossed over $400 million worldwide and was nominated for several awards, including an Academy Award for Sound Editing and a Grammy for the score by Daft Punk.",
        "Birth": "May 3, 1974 "

    },
    "Actors": ["Tom Cruise, Jennifer Connelly, Miles Teller, Val Kilmer"],
    "ImageUrl": "https://m.media-amazon.com/images/I/81FvY2O10ML._SL1500_.jpg",
    "Featured": false
}]


// CREATE
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser) {
        newUser.id = uuid.v4(); // applies a unique ID to the new user
        users.push(newUser)
        res.status(200).json(newUser)
    } else {
        res.status(400).send('send users need names')
    }
})

// UPDATE 
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updateUser = req.body;
    let user = users.find(user => user.id == id);

    if (user) {
        user.Name = updateUser.Name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no new user found')
    }
})

// POST
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    let user = users.find(user => user.id == id)

    if (user) {
        user.FavoriteMovies.push(movieTitle);
        res.status(200).json(`${movieTitle} has been added to user: ${id}'s Movies List`);
    } else {
        res.status(400).send('no such user')
    }
})

// DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;
    let user = users.find(user => user.id == id)

    if (user) {
        user.FavoriteMovies = user.FavoriteMovies.filter(title => title !== movieTitle)
        res.status(200).json(`${movieTitle} has been removed from user: ${id}'s Movies list`);
    } else {
        res.status(400).send('no such user')
    }
})
// DELETE
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    let user = users.find(user => user.id == id)

    if (user) {
        users = users.filter(user => user.id != id)
        res.status(200).json(`User: ${id}'s has been deleted`);
    } else {
        res.status(400).send('no such user')
    }
})

// READ
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

app.get('/movies/:title', (req, res) => {
    const { title } = req.params; // object destructuring; creates a new var "Title" 
    const movie = movies.find(movie => movie.Title === title)

    if (movie) {
        res.status(200).json(movie)
    } else {
        res.status(400).send('no such movie')
    }
})

app.get('/movies/genre/:genreName', (req, res) => {
    const { genreName } = req.params;
    const genre = movies.find(movie => movie.Genre.Name[0] === genreName).Genre; // loops through the movies and find "Genre" Name

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre');
    }
})

// READ
app.get('/movies/directors/:directorName', (req, res) => {
    const { directorName } = req.params;
    const director = movies.find(movie => movie.Director.Name == directorName).Director;

    if (director) {
        res.status(200).json(director)
    } else {
        res.status(400).send('no such director')
    }
})

app.get('/movies/actors/:actorName', (req, res) => {
    const { actorName } = req.params;
    const actor = movies.find(movie => movie.Actors[0] === actorName).Actors;

    if (actor) {
        res.status(200).json(actor)
    } else {
        res.status(400).send('no such actor')
    }
})


// Returns a default textual response
app.get('/', (req, res) => {
    let responseText = '<h1> Here are my top 10 movies </h1>';
    res.send(responseText)
});


app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', { root: __dirname });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(8080, () => {
    console.log('Port 8080 is up succesfully')
})