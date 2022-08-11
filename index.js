const express = require('express');
const res = require('express/lib/response'),
    path = require('path'),
    morgan = require('morgan');
const app = express();

app.use(express.static('public'));
app.use(morgan('common'));

let topMovies = [{

    Title: 'The Batman',
    Director: 'Matt Reeves',
    Stars: ['Robert Pattinson, Zoë Kravitz, Jeffrey Wright, Colin Farrell']
},
{
    Title: 'Avatar: The Way of Water',
    Director: 'James Cameron',
    Stars: ['Michelle Yeoh, Sam Worthington, Jemaine Clement, Zoe Saldana']
}, {
    Title: 'Glass Onion: A Knives Out Mystery',
    Director: 'Rian Johnson',
    Stars: [' Jessica Henwick, Ethan Hawke, Kathryn Hahn, Daniel Craig']
}, {
    Title: 'Argylle ',
    Director: 'Matthew Vaughn ',
    Stars: [' Bryce Dallas Howard, Bryan Cranston, Henry Cavill, Sam Rockwell']
}, {
    Title: 'Asteroid City ',
    Director: 'Wes Anderson ',
    Stars: [' Maya Hawke, Margot Robbie, Tom Hanks, Bryan Cranston']
}, {
    Title: 'Killers of the Flower Moon ',
    Director: 'Martin Scorsese',
    Stars: ['Leonardo DiCaprio, Robert De Niro, Lily Gladstone, Jesse Plemons']
}, {
    Title: 'Spider-Man: Across the Spider-Verse',
    Director: ['Joaquim Dos Santos, Kemp Powers, Justin K. Thompson '],
    Stars: ['Shameik Moore, Hailee Steinfeld, Oscar Isaac, Jake Johnson']
}, {
    Title: 'Elvis',
    Director: 'Baz Luhrmann',
    Stars: [' Tom Hanks, Austin Butler, Olivia DeJonge, Helen Thomson']
}, {
    Title: 'Babylon ',
    Director: 'Damien Chazelle ',
    Stars: ['Brad Pitt, Margot Robbie, Olivia Wilde, Samara Weaving']
}, {
    Title: 'Top Gun: Maverick',
    Director: 'Joseph Kosinski',
    Stars: [' Tom Cruise, Jennifer Connelly, Miles Teller, Val Kilmer']
}]


// Returns a json object about the top 10 movies
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

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