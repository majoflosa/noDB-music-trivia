import React, {Component} from 'react';

class AnswerFeedback extends Component {
    constructor(props){
        super(props);
        this.state = {
            playerScored: props.playerScored
        }
    }

    render() {
        if ( this.state.playerScored === null ) {
            return (
                <div className="answer-feedback"></div>
            );
        } else if ( this.state.playerScored ) {
            return (
                <div className="answer-feedback">Correct!</div>
            );
        } else {
            return (
                <div className="answer-feedback">Correct!</div>
            );
        }
    }
    // }
}

export default AnswerFeedback;