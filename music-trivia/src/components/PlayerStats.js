import React, {Component} from 'react';
import axios from 'axios';
import '../css/playerstats.css';

class PlayerStats extends Component {
    constructor( props ) {
        super(props);
        this.state = {
            usersDisplaying: [],
        };
    }
    
    componentDidMount() {
        axios.get( '/api/user/' )
            .then( response => {
                console.log( 'response.data: ', response.data );

                // building list of user divs with stats
                let userList = response.data.map( (user, index) => {
                    // looping over all game scores to build a total
                    let totalScore = user.games.reduce( (total, game) => {
                        return (total + game)
                    }, 0);

                    // building list of user's past games
                    let history = user.games.map( (game, gameInd) => {
                        return <span className="history-game">{game}/5</span>;
                    });

                    // preparing delete button to render conditionally, depending on whether or not current user-stats div
                    // represents current user
                    let deleteButton = <span onClick={(e) => this.props.deleteUser(e, user.id)} className="delete-user"><i className="fas fa-trash-alt"></i></span>

                    // preparing button to switch users
                    let switchUserButton = <button onClick={() => this.props.switchUser(user.id)} className="btn">Play New Game as {user.username}</button>

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

                // building final list of user divs to display
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
                { this.state.usersDisplaying }
            </div>
        );
    }
}

export default PlayerStats;