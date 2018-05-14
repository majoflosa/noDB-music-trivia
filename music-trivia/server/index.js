const express = require( 'express' ),
      { json } = require( 'body-parser' ),
      cors = require( 'cors' ),
      port = 3001,
      app = express(),
      // songs = require( './controllers/songs' ),
      // artists = require( './controllers/artists' );
      questions = require( './controllers/questions' );
      users = require( './controllers/users')

app.use( json() );
app.use( cors() );

// selects 4 random bands from artist collection, selects 1 as correct answer
// hits iTunes endpoint using correct answer to get list of songs
// returns object with all answers, correct answer, and list of songs as possible questions
app.get( '/api/question/', questions.getArtistSongs );

// Get all users
app.get( '/api/user/', users.getUsers );

// Create a new user
app.post( '/api/user', users.createUser );

// Update user
app.put( '/api/user/:id', users.updateUser );

app.listen( port, console.log( `Server running. Listening on port ${port}.`) );