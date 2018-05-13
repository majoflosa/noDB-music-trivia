const express = require( 'express' ),
      { json } = require( 'body-parser' ),
      cors = require( 'cors' ),
      port = 3001,
      app = express(),
      // songs = require( './controllers/songs' ),
      // artists = require( './controllers/artists' );
      questions = require( './controllers/questions' );

app.use( json() );
app.use( cors() );

// gets list of songs from specified artist; used to generate question
app.get( '/api/question/', questions.getArtistSongs );

// gets random list of four bands from artists collection
// app.get( '/api/answers/', questions.getRandomArtists );


app.listen( port, console.log( `Server running. Listening on port ${port}.`) );