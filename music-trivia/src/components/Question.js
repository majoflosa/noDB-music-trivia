import React, { Component } from 'react';

class Question extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            questionNumber: this.props.count
        }
    }

    render() {
        return (
            <div className="wrapper question">
                <header>
                    <h1>Question #{this.state.questionNumber}</h1>
                </header>
                <main>
                    <h2>Artist Name</h2>
                    <ul className="answers">
                        <li className="answer">Song Name 1</li>
                        <li className="answer">Song Name 2</li>
                        <li className="answer">Song Name 3</li>
                        <li className="answer">Song Name 4</li>
                    </ul>
                    
                </main>
                
            </div>
        );
    }
}

export default Question;