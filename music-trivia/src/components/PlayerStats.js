import React, {Component} from 'react';
import axios from 'axios';
import '../css/playerstats.css';

class PlayerStats extends Component {
    constructor( props ) {
        super(props);
        this.state = {
            usersDisplaying: [],
            
        };

        // this.displayUpdatedStats = this.displayUpdatedStats.bind( this );
    }
    
    componentDidMount() {
        axios.get( '/api/user/' )
            .then( response => {
                console.log( 'response.data: ', response.data );

                let userList = response.data.map( (user, index) => {
                    let totalScore = user.games.reduce( (total, game) => {
                        return (total + game)
                    }, 0);
                    // 35.259259, 3 games, 5 4 5

                    let history = user.games.map( (game, gameInd) => {
                        return <span className="history-game">{game}/5</span>;
                    });

                    let deleteButton = <span onClick={(e) => this.props.deleteUser(e, user.id)} className="delete-user"><i className="fas fa-trash-alt"></i></span>

                    let switchUserButton = <button onClick={() => this.props.switchUser(user.id)} className="btn">Play New Game as {user.username}</button>

                    // let staticNewGameBtn = <button onClick={ this.props.newGame } className="btn start-game">New Game</button>
                    
                    return (
                        <div key={user.id} 
                            className={this.props.currentUser.id === user.id ? 'user-stats current-user' : 'user-stats'}>
                            { this.props.currentUser.id === user.id ? '' : deleteButton }
                            <h3>{user.username}</h3>
                            <p>Games played: {user.games.length}</p>
                            <p>Total Score: {totalScore}</p>
                            <p>Past Scores:<br />
                                {history}
                            </p>
                            { switchUserButton }
                        </div>
                    );
                });

                if ( userList.length === 0 ) {
                    console.log( 'userList: ', userList );
                    userList = <p className="no-users">There are currently no users.</p>;
                }

                this.setState({ usersDisplaying: userList });
            })
            .catch( () => console.log( 'Server Error: Could not get users.') );
    }

    render() {
        return (
            <div className="user-stats-wrap">
                {/* User stats are displayed here. */}
                { this.state.usersDisplaying }
                {/* { this.displayUpdatedStats() } */}
            </div>
        );
    }
}

export default PlayerStats;