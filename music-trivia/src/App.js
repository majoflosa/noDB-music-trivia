import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

// Components
import Navigation from './components/Navigation';
import Home from './components/Home';
import Instructions from './components/Instructions';
import Question from './components/Question';
import Results from './components/Results';
import PlayerStats from './components/PlayerStats';

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      currentUser: null,
      updatedStats: null,
      hasAnswered: false,
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
    this.updateUserName = this.updateUserName.bind( this );
    this.displayUserUpdatedStats = this.displayUserUpdatedStats.bind( this );
    this.saveUser = this.saveUser.bind( this );
    this.newGame = this.newGame.bind( this );
    this.randomizeAnswers = this.randomizeAnswers.bind( this );
    this.evaluateAnswer = this.evaluateAnswer.bind( this );
  }

  changePage( pageName = 'home' ) {
    this.setState({ currentPage: pageName });
  }

  displayPage() {
    switch ( this.state.currentPage ) {
      case 'instructions':
        return <Instructions 
          randomizeAnswers={() => this.randomizeAnswers(this.state.count, this.throwQuestion)} 
          newGame={ this.newGame }
          />;
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
        return <Results 
          finalScore={this.state.score}
          randomizeAnswers={this.randomizeAnswers}
          newGame={this.newGame}
          userUpdated={this.state.userUpdated}
          updatedStats={this.state.updatedStats}
          />;
        break;
      case 'userstats':
        return <PlayerStats />
        break;
      case 'home':
      default:
        return <Home 
          username={this.state.username}
          updateUserName={this.updateUserName}
          saveUser={this.saveUser}
          />;
        break;
    }
  }

  updateUserName(e) {
    this.setState({ username: e.target.value });
    // console.log( 'username in App.js: ', this.state.username );
    // console.log( 'event: ', e.target.value );
  }

  saveUser( name ) {
    if ( !name ) {
      console.log( 'A username is required.')
      return false;
    }

    let newUser = {
      username: name,
      games: []
    }

    axios.post( '/api/user/', newUser )
      .then( response => {
        this.setState({ 
          currentUser: response.data[response.data.length - 1],
          currentPage: 'instructions',
          score: 0,
          questionCount: 0,
        });
        console.log( response.data );
        this.displayPage();
      })
      .catch(() => console.log( 'Server Error: User could not be created.'));
  }

  newGame() {
      this.setState({ 
        score: 0, 
        questionCount: 0, 
        // currentPage: 'question',
        playerScored: null,
        // hasAnswered: false
      });
      this.randomizeAnswers();
      // this.displayPage();
      console.log( 'newGame has started ' );
  }

  /**
   * randomizeAnswers
   * Generates questions for the quiz. Checks if user should go to new game when invoked to reset stats and
   * question count.
   * 
   * Endpoint called retrieves 4 random bands from predifined array,
   * seletcs 1 as correct answer, uses correct answer as parameter fro iTunes GET endpoint, retrieves
   * list of songs by selected band.
   * 
   * @param {*} newGame boolean, controls whether or not to start the game from 0
   */
  randomizeAnswers() {
    if ( !this.state.hasAnswered && this.state.currentPage !== 'instructions' ) {
      // if ()
      return false;
    } else {
      this.setState({ hasAnswered: false });
    }
    // check of amount of questions taken are within game limit, if so, send to results page and update user on DB
    if ( this.state.questionCount >= 5 ) {
      this.setState({ currentPage: 'results', hasAnswered: true });
      
      // TO DO: games item may need to be updated to include denominator on score
      this.state.currentUser.games.push( this.state.score );
      
      let reqBody = {
        id: this.state.currentUser.id,
        username: this.state.username,
        games: this.state.currentUser.games
      }
      axios.put( `/api/user/${this.state.currentUser.id}`, reqBody )
        .then( response => {
          this.setState({ questionCount: 0, updatedStats: response.data });
          // this.displayUserUpdatedStats( response.data );
        })
        .catch( () => console.log( 'Server Error: score could not be updated on user' ) );

      return;
    }
    
    if ( this.state.currentPage === 'instructions' || this.state.currentPage === 'results' ) {
      this.setState({ score: 0 });
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

  displayUserUpdatedStats( users ) {
    let currentUpdatedUser = users.filter( user => user.username === this.state.username );

    return currentUpdatedUser;
  }

  evaluateAnswer( selectedAnswer ) {
    if ( selectedAnswer === this.state.correctAnswer ) {
      this.setState({ playerScored: 'Correct!', score: ++this.state.score, hasAnswered: true });
    } else {
      this.setState({ playerScored: 'Wrong!', hasAnswered: true });
    }

    this.displayPage();

    console.log( 'evaluateAnswer is passing correctly in App')
  }

  render() {
    return (
      <div className="App">
        <Navigation handlePageChange={this.changePage} newGame={this.newGame} />
        
        { this.displayPage() }
      </div>
    );
  }
}

export default App;
