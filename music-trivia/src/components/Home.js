import React, { Component } from 'react';
import '../css/home.css';

class Home extends Component {
    constructor( props ) {
        super( props );
        
        this.state = {
            username: this.props.username,
        }

        // this.updateUserName = this.updateUserName.bind( this );
    }

    // updateUserName(e) {
    //     this.setState({ userName: e.target.value });
    // }
    
    render() {
        return (
            <div className="wrapper home">
                <header>
                    <h3>Welcome to</h3>
                    <h1 className="app-title">So You Think You Know Your Classic Rock?</h1>
                </header>
                <main>
                    <div className="inner">
                        <h3>Enter your name.</h3>
                        <input id="username" onChange={ (e) => this.props.updateUserName(e) } type="text"/>
                        {/* <p>Username: {this.props.username}</p> */}

                        <button onClick={ () => this.props.saveUser(this.props.username) } className="btn">Continue</button>
                    </div>
                </main>
            </div>
        );
    }
}

export default Home;