import React, { Component } from 'react';

class Results extends Component {
    // console.log( 'score: ', props.score );
    constructor(props) {
        super(props);
        this.state = {
            finalScore: this.props.finalScore
        };
    }

    componentDidMount() {
        this.setState({ finalScore: this.props.finalScore });
    }

    render() {
        return(
            <div className="wrapper results">
                <h1>Your score:</h1>
                <p>You got {this.props.finalScore}/5 questions.</p>
            </div>
        );
    }
}

export default Results;