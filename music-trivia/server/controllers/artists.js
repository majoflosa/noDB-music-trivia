const axios = require( 'axios' );
let artists = [];

let resData;

module.exports = {
    getArtist: ( req, res ) => {
        axios.get( `https://itunes.apple.com/search?term=${req.params.artistName}&country=us&entity=musicArtist&limit=1` )
            .then( data => {
                resData = data;
                console.log( 'Artists was retrieved successfully.', resData.data.results[0] );
                return res.status(200).json(resData.data.results[0]);
            })
            .catch( () => {
                console.log( 'Artists name could not be retrieved.' );
                console.log( `https://itunes.apple.com/search?term=${req.params.artistName}&country=us&entity=musicArtist&limit=1` );
            })
    },
    getArtistSongs: ( req, res ) => {
        axios.get( `https://itunes.apple.com/search?term=${req.params.artistName}&country=us&entity=musicArtist&limit=1` )
            .then( data => {
                resData = data;
                console.log( 'Artists was retrieved successfully.', resData.data.results[0] );
                return res.status(200).json(resData.data.results[0]);
            })
            .catch( () => {
                console.log( 'Artists name could not be retrieved.' );
                console.log( `https://itunes.apple.com/search?term=${req.params.artistName}&country=us&entity=musicArtist&limit=1` );
            })
    }
}
