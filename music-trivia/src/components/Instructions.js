import React, { Component } from 'react';
import '../css/instructions.css';

import Question from './Question';

class Instructions extends Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div className="wrapper instructions">
                    <h1>How to play:</h1>
                    <p>Once the game starts, you will be given ## questions testing your knowledge of singers/bands and their songs. An song title will be displayed, and with 4 band name as choices for your answer. Click on the singer/band who authored the song to accumulate points.</p>

                    <button onClick={ this.props.newGame } className="btn start-game">Start Game</button>
            </div>
        );
    }
}

export default Instructions;