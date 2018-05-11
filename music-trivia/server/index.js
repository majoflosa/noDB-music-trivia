const express = require( 'express' ),
      { json } = require( 'body-parser' ),
      cors = require( 'cors' ),
      port = 3001,
      app = express(),
      songs = require( './controllers/songs');

app.use( json() );
app.use( cors() );

// const rootUrl = ''
app.get( '/api/songs/:songName', songs.getSong );

app.listen( port, console.log( `Server running. Listening on port ${port}.`) );