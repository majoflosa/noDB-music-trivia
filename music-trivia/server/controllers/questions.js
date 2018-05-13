const axios = require( 'axios' );

let artistsCollection = [
    'Led Zeppelin', 'The Rolling Stones', 'The Beatles', 'The Doors', 'Aerosmith',
    'Deep Purple', 'Jimi Hendrix', 'The Who', 'Black Sabbath', 'Creedence Clearwater Revival',
    'Cream', 'Pink Floyd', 'Queen', 'The Guess Who', 'Rush',
    'Grand Funk Railroad', 'Grateful Dead', 'Steppenwolf', 'Eagles', 'Lynyrd Skynyrd'
];

let artistTracks = [];
let term;
        
module.exports = {
    getArtistSongs: ( req, res ) => {
        let rndBands = [];
        while ( rndBands.length < 4 ) {
            let randomNumber = Math.floor( Math.random() * artistsCollection.length );

            if ( !rndBands.includes(artistsCollection[randomNumber]) ) {
                rndBands.push( artistsCollection[randomNumber]);
            } 
        }

        let randomBand = Math.floor( Math.random() * rndBands.length);
        term = rndBands[randomBand];

        axios.get( `https://itunes.apple.com/search?term=${term}&media=music&entity=musicTrack&limit=8` )
        .then( resData => {
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

    // getRandomArtists: (req, res) => {
    //     let rndBands = [];
    //     while ( rndBands.length < 4 ) {
    //         let randomNumber = Math.floor( Math.random() * artistsCollection.length );

    //         if ( !rndBands.includes(artistsCollection[randomNumber]) ) {
    //             rndBands.push( artistsCollection[randomNumber]);
    //         } 
    //     }
    //     return res.status(200).json(rndBands);
    // }
}


    
// let resolveGetArtistSongs = ( res ) => {
    //     return res.status(200).json(artistTracks);
    // }  
