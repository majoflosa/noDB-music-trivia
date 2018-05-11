import React, { Component } from 'react';
import '../css/home.css';

class Home extends Component {
    constructor( props ) {
        super( props );
        
        this.state = {
            userName: '',
        }

        this.updateUserName = this.updateUserName.bind( this );
    }

    updateUserName(e) {
        this.setState({ userName: e.target.value });
    }
    
    render() {
        return (
            <div className="wrapper home">
                <header>
                    <h3>Welcome to</h3>
                    <h1 className="app-title">One of These Songs is Not Like the Other</h1>
                    <p className="tagline">Brevity is the soul of wit... just not of this app's name.</p>
                </header>
                <main>
                    <div className="inner">
                        <h3>Enter your name.</h3>
                        <input id="username" onChange={ this.updateUserName } type="text"/>
                        {/* <p>Username: {this.state.userName}</p> */}

                        <button className="btn">Continue</button>
                    </div>
                </main>
            </div>
        );
    }
}

export default Home;