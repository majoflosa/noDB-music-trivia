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

    // displayUpdatedStats() {
    //     let userList = this.props.updatedStats.map( (user, index) => {
    //         let totalScore = user.games.reduce( (total, game) => {
    //             return (total + game)
    //         }, 0);
    //         // 35.259259, 3 games, 5 4 5

    //         let history = user.games.map( (game, gameInd) => {
    //             return <span className="history-game">{game}/5</span>;
    //         });

    //         return (
    //             <div key={index} className="user-stats">
    //                 <h3>{user.username}</h3>
    //                 <p>Games played: {user.games.length}</p>
    //                 <p>Total Score: {totalScore}</p>
    //                 <p>Past Scores:<br />
    //                     {history}
    //                 </p>
                    
    //                 {/* <p>Average: {(average * 100) + '%'}</p> */}
    //             </div>
    //         );
    //     });

    //     this.setState({ usersDisplaying: userList });
    //     return this.state.usersDisplaying;
    // }

    
    componentDidMount() {
        axios.get( '/api/user/' )
            .then( response => {
                // console.log( response.data );

                let userList = response.data.map( (user, index) => {
                    let totalScore = user.games.reduce( (total, game) => {
                        return (total + game)
                    }, 0);
                    // 35.259259, 3 games, 5 4 5

                    let history = user.games.map( (game, gameInd) => {
                        return <span className="history-game">{game}/5</span>;
                    });

                    return (
                        <div key={index} className="user-stats">
                            <h3>{user.username}</h3>
                            <p>Games played: {user.games.length}</p>
                            <p>Total Score: {totalScore}</p>
                            <p>Past Scores:<br />
                                {history}
                            </p>
                            
                            {/* <p>Average: {(average * 100) + '%'}</p> */}
                        </div>
                    );
                });

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