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
                <article className="instructions-text">
                    <h3>How to play:</h3>
                    <p>Once the game starts, you will be given ## questions testing your knowledge of singers/bands and their songs. An song title will be displayed, and with 4 band name as choices for your answer. Click on the singer/band who authored the song to accumulate points.</p>

                </article>
                <article className="instructions-example">
                    <h3>Example</h3>
                    {/* Question component goes here */}
                    {/* <Question /> */}
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales commodo malesuada. Curabitur magna eros, placerat in pharetra quis, ornare id nulla. Nullam nec mauris turpis. Aliquam erat volutpat. Donec tristique mauris vitae magna hendrerit pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas consectetur volutpat ligula, at sagittis nisi mattis sit amet. Nullam consequat laoreet felis quis pretium.</p> */}
                </article>

                    <button onClick={ this.props.randomizeAnswers } className="btn start-game">Start Game</button>
            </div>
        );
    }
}

export default Instructions;