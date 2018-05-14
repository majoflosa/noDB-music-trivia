import React, { Component } from 'react';
import PlayerStats from './PlayerStats';

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
                <button onClick={ this.props.newGame } className="btn start-game">New Game</button>

                <PlayerStats 
                    deleteUser={this.props.deleteUser} 
                    updatedStats={this.props.updatedStats} 
                    currentUser={this.props.currentUser}
                    switchUser={this.props.switchUser}
                />
            </div>
        );
    }
}

export default Results;