import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// Components
import Navigation from './components/Navigation';
import Home from './components/Home';
import Instructions from './components/Instructions';
import Question from './components/Question';
import Results from './components/Results';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 'home',
      questionCount: 0,
      questionSong: '',
      answers: [],
      correctAnswer: '',
      playerScored: null,
      score: 0
    }

    this.displayPage = this.displayPage.bind( this );
    this.changePage = this.changePage.bind( this );
    this.randomizeAnswers = this.randomizeAnswers.bind( this );
    this.evaluateAnswer = this.evaluateAnswer.bind( this );
  }

  changePage( pageName = 'home' ) {
    this.setState({ currentPage: pageName });
  }

  displayPage() {
    switch ( this.state.currentPage ) {
      case 'instructions':
        return <Instructions randomizeAnswers={() => this.randomizeAnswers(this.state.count, this.throwQuestion)} />;
        break;
      case 'question':
        return <Question 
          count={this.state.questionCount} 
          questionSong={this.state.questionSong}
          answers={this.state.answers}
          correctAnswer={this.state.correctAnswer}
          evaluateAnswer={this.evaluateAnswer}
          playerScored={this.state.playerScored}
          nextQuestion={this.randomizeAnswers}
          resetPage={this.displayPage}
          />;
        break;
      case 'results':
        return <Results finalScore={this.state.score}/>;
        break;
      case 'home':
      default:
        return <Home testing={'This is a test.'}/>;
        break;
    }
  }

  randomizeAnswers() {
    if ( this.state.questionCount >= 5 ) {
      this.setState({ currentPage: 'results' });
      return;
    }

    axios.get( '/api/question/' )
      .then( response => {
        console.log('randomizeAnswers: ', response );

        let randomNumber = Math.floor( Math.random() * (response.data.artistTracks.length) );
        
        console.log( 'response.data.correctAnswer: ', response.data.correctAnswer)
        console.log( 'response.data.artistTracks: ', response.data.artistTracks)
        console.log( 'randomNumber: ', randomNumber )
        
        this.setState({ 
          currentPage: 'question',
          questionCount: ++this.state.questionCount,
          questionSong: response.data.artistTracks[randomNumber],
          correctAnswer: response.data.correctAnswer, 
          answers: response.data.answers,
          playerScored: null
        });

        // this.displayPage();
      });
  }

  evaluateAnswer( selectedAnswer ) {
    if ( selectedAnswer === this.state.correctAnswer ) {
      this.setState({ playerScored: 'Correct!', score: ++this.state.score });
    } else {
      this.setState({ playerScored: 'Wrong!' });
    }
    this.displayPage();

    console.log( 'evaluateAnswer is passing correctly in App')
  }

  render() {
    return (
      <div className="App">
        <Navigation handlePageChange={this.changePage} />
        
        { this.displayPage() }
      </div>
    );
  }
}

export default App;
