import React from 'react';
import '../css/instructions.css';

function Instructions(props) {
    return (
        <div className="wrapper instructions">
                <h1>How to play:</h1>
                <p>Once the game starts, you will be given 5 questions testing your knowledge of classic rock bands/singers and their songs.</p><p>A song title will be displayed, and 4 bands/singers as choices for your answer. Click on the band/singer who authored the song to score points.</p>

                <button onClick={ props.newGame } className="btn start-game">Less Talkin', More Rockin'</button>
        </div>
    );
}

export default Instructions;