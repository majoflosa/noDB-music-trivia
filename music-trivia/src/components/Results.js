import React, { Component } from 'react';
import PlayerStats from './PlayerStats';

class Results extends Component {
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
        let stars = [];
        for ( let i = 0; i < this.props.finalScore; i++ ) {
            stars.push( <i className="fas fa-star"></i> );
        }
        for ( let i = 0; i < (5 - this.props.finalScore); i++ ) {
            stars.push( <i className="fal fa-star"></i> );
        }

        let snark = '';

        switch (this.props.finalScore) {
            case 5:
                snark = 'You rock!';
                break;
            case 4:
                snark = 'You got potential, kid. Keep at it.';
                break;
            case 3:
                snark = 'Hmmm... you could use a little more rock n\' roll in your life.';
                break;
            case 2:
                snark = 'Bro, do you even rock?';
                break;
            case 1:
                snark = 'What did they teach at your school, man?';
                break;
            default:
                snark = '...You must be a big Nickelback fan.'
        }

        return(
            <div className="wrapper results">
                <h1>Your score:</h1>
                <div className="stars">{stars}</div>
                <p>You got {this.props.finalScore}/5 questions. {snark}</p>
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