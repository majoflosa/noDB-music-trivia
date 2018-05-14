import React, { Component } from 'react';
import AnswerFeedback from './AnswerFeedback';
import '../css/question.css';

class Question extends Component {
    constructor( props ) {
        super( props );

        this.state = {
            playerScored: this.props.playerScored,
            correctAnswer: this.props.correctAnswer,
            score: this.props.score
        }

    }

    render() {
        let buttonText = <span>Next Question <i className="fas fa-chevron-circle-right"></i></span>;
        if ( this.props.count === 5) {
            buttonText = <span>See Results <i className="fas fa-chevron-circle-right"></i></span>;
        }
        return (
            <div className="wrapper question">
                <header>
                    <h3>Question #{this.props.count}</h3>
                </header>
                <main>
                    <h1>{ this.props.questionSong }</h1>
                    <ul className="answers">
                        <li 
                            onClick={() => this.props.evaluateAnswer(this.props.answers[0])} 
                            className="answer">
                            {this.props.answers[0]}
                        </li>

                        <li 
                            onClick={() => this.props.evaluateAnswer(this.props.answers[1])} 
                            className="answer">
                            {this.props.answers[1]}
                        </li>

                        <li 
                            onClick={() => this.props.evaluateAnswer(this.props.answers[2])} 
                            className="answer">
                            {this.props.answers[2]}
                        </li>

                        <li 
                            onClick={() => this.props.evaluateAnswer(this.props.answers[3])} 
                            className="answer">
                            {this.props.answers[3]}
                        </li>

                    </ul>

                    {/* <AnswerFeedback playerScored={this.state.playerScored} /> */}
                    <div className="answer-feedback">{this.props.playerScored}</div>
                    
                    <button onClick={() => this.props.nextQuestion(false)} className="btn">{buttonText}</button>
                </main>
                
            </div>
        );
    }
}

export default Question;