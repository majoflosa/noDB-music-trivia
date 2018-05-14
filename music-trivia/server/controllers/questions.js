const axios = require( 'axios' );

// predefining band names from which app can choose to fetch songs
let artistsCollection = [
    'Led Zeppelin', 'The Rolling Stones', 'The Beatles', 'The Doors', 'Aerosmith',
    'Deep Purple', 'Jimi Hendrix', 'The Who', 'Black Sabbath', 'Creedence Clearwater Revival',
    'Cream', 'Pink Floyd', 'Queen', 'The Guess Who', 'Rush',
    'Grand Funk Railroad', 'Grateful Dead', 'Steppenwolf', 'Eagles', 'Lynyrd Skynyrd'
];

let artistTracks = [];  // fetched songs will be stored here
let term;               // search term to use in iTunes get endpoint query string
        
module.exports = {
    getArtistSongs: ( req, res ) => {
        let rndBands = [];  // 4 random bands from artistsCollection will be chosen as possible answers
        while ( rndBands.length < 4 ) {
            let randomNumber = Math.floor( Math.random() * artistsCollection.length );

            // only store a band if it hasn't been chosen already, to avoid displaying duplicate answers
            if ( !rndBands.includes(artistsCollection[randomNumber]) ) {
                rndBands.push( artistsCollection[randomNumber]);
            } 
        }

        // choose a random band to use as correct answer, and as search term to fetch songs
        let randomBand = Math.floor( Math.random() * rndBands.length);
        term = rndBands[randomBand];

        // fetches 15 songs from selected band; a random one will be chosen on randomizeAnswers() on App.js
        // the more songs, more variety of questions across different game rounds
        axios.get( `https://itunes.apple.com/search?term=${term}&media=music&entity=musicTrack&limit=15` )
        .then( resData => {
            // preparing customized object to send as response
            let retObj = {
                artistTracks: resData.data.results.map( result => result.trackName ),
                correctAnswer: term,
                answers: rndBands
            }

            retObj.rndBands = rndBands;

            return res.status(200).json(retObj);
            
        })
        .catch( () => console.log( 'Songs could not be retrieved.' ) );
    },

}
