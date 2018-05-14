import React from 'react';

function CurrentPlayer( props ) {
    if ( props.currentUser !== null ) {
        return (
            <p className="current-player">Currently playing as <strong>{props.currentUser.username}</strong></p>
        );
    } else {
        return (
            <p className="current-player">Create a user to start playing.</p>
        );
    }
}

export default CurrentPlayer;