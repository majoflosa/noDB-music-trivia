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

        // this.evaluate = this.evaluate.bind( this );
    }

    // evaluate( selectedAnswer ) {
    //     if ( selectedAnswer === this.props.correctAnswer ) {
    //       this.setState({ playerScored: 'Correct!', score: this.props.score + 1 });
    //     } else {
    //       this.setState({ playerScored: 'Wrong!' });
    //     }

    //     this.props.resetPage();
    //     console.log( 'selectedAnswer: ', selectedAnswer );
    //     console.log( 'this.props.correctAnswer: ', this.props.correctAnswer );
    //   }

    render() {
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
                    
                    <button onClick={this.props.nextQuestion} className="btn">Next Question</button>
                </main>
                
            </div>
        );
    }
}

export default Question;