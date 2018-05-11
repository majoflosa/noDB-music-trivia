const axios = require( 'axios' );
let songs = [];

let resData;

module.exports = {
    getSong: ( req, res ) => {
        axios.get( `https://itunes.apple.com/search?term=${req.params.songName}&country=us&entity=musicTrack&limit=1` )
            .then( data => {
                resData = data;
                console.log( 'Song was retrieved successfully.', resData.data.results[0].artistName );
                return res.status(200).json(resData.data.results[0].artistName);
            })
            .catch( () => console.log( 'Song name could not be retrieved.' ) );
    }
}
