import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import './fontawesome-svg/js/fontawesome-all';
import './fontawesome-svg/css/fa-svg-with-js.css';

// Components
import Navigation from './components/Navigation';
import Home from './components/Home';
import Instructions from './components/Instructions';
import Question from './components/Question';
import Results from './components/Results';
import PlayerStats from './components/PlayerStats';
import CurrentPlayer from './components/CurrentPlayer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      username: '',         // value typed into input field
      currentUser: null,    // keeps track of which user is currently playing
      updatedStats: null,   // ?
      hasAnswered: false,   // keeps track of whether or not user selected an answer after new question was rendered
      currentPage: 'home',  // keeps track of which page (component) to render
      questionCount: 0,     // keeps track of how many questions have been answered
      questionSong: '',     // song title to display as question
      answers: [],          // ?
      correctAnswer: '',    // keeps track of correct band for current question song
      playerScored: null,   // feedback for answer chosen by user
      score: 0              // keeps track of user's score on current game 
    }

    this.displayPage = this.displayPage.bind( this );
    this.changePage = this.changePage.bind( this );
    this.updateUserName = this.updateUserName.bind( this );
    this.displayUserUpdatedStats = this.displayUserUpdatedStats.bind( this );
    this.saveUser = this.saveUser.bind( this );
    this.deleteUser = this.deleteUser.bind( this );
    this.switchUser = this.switchUser.bind( this );
    this.newGame = this.newGame.bind( this );
    this.randomizeAnswers = this.randomizeAnswers.bind( this );
    this.evaluateAnswer = this.evaluateAnswer.bind( this );
  }



  /**
   * Changes current page to display on state. Fired by clicking on nav items.
   * 
   * @param {string} pageName 
   */
  changePage( pageName = 'home' ) {
    this.setState({ currentPage: pageName });
  }



  /**
   * Tests currentPage to decide which component to return. Fired on render() method on this component.
   */
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
          deleteUser={this.deleteUser}
          currentUser={this.state.currentUser}
          switchUser={this.switchUser}
          />;
          break;
      case 'userstats':
        return <PlayerStats 
          deleteUser={this.deleteUser}
          currentUser={this.state.currentUser}
          switchUser={this.switchUser}
          />
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



  /**
   * Fired by typing on input field on Home component.
   */ 
  updateUserName(e) {
    this.setState({ username: e.target.value });
  }



  /**
   * Creates a new user using post endpoint on local server. The created user is then set as currentUser.
   * Fired by 'Continue' button on Home.
   * @param {string} name 
   */
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
        console.log( 'response.data after create user: ', response.data );
        console.log( 'currentUser: ', this.state.currentUser );
        this.displayPage();
      })
      .catch(() => console.log( 'Server Error: User could not be created.'));
  }



  /**
   * Deletes user object from users array in local server using delete endpoint on local server.
   * Fired by clicking on red trash icon on PlayerStats component.
   * @param {event object} e used to find the DOM element to remove
   * @param {number} id id of user to delete
   */
  deleteUser( e, id ) {
    let deletedWrapper = e.target.parentElement.parentElement.parentElement;
    // console.log( 'event target: ', e.target.parentElement );

    axios.delete( `/api/user/${id}`)
      .then( response => {
        deletedWrapper.remove();
        console.log( 'User deleted successfully. ', response.data );
      } )
      .catch( () => console.log('User could not be deleted.') );
  }



  /**
   * Changes currentUser, in order to start playing under a different name. 
   * Downloads full info of selected user using the get endpoint on local server for single users. 
   * Invokes new game.
   * Fired by clicking any 'Play New Game as {user}' buttons on PlayerStats.
   * 
   * @param {number} id id of user to switch to
   */
  switchUser( id ) {
    if ( id === this.state.currentUser ) {
      this.newGame();
      return;
    }
    axios.get( `/api/user/${id}`)
    .then( response => {
      console.log( response.data );
      
      this.setState({ currentUser: response.data })
      console.log( 'currentUser: ', this.state.currentUser );
      this.newGame();
    })
  }



  /**
   * Resets stats, questionCount, and answer feedback.
   * 
   */
  newGame() {
      this.setState({ 
        score: 0, 
        questionCount: 0, 
        playerScored: null,
      });

      this.randomizeAnswers();
      console.log( 'newGame has started ' );
  }



  /**
   * randomizeAnswers()
   * Generates questions for the quiz. Checks if user should go to new game when invoked to reset stats and
   * question count.
   * 
   * Endpoint called retrieves 4 random bands from predifined array,
   * seletcs 1 as correct answer, uses correct answer as parameter fro iTunes GET endpoint, retrieves
   * list of songs by selected band.
   * 
   * @param {} newGame boolean, controls whether or not to start the game from 0
   */
  randomizeAnswers() {
    if ( this.state.hasAnswered || this.state.currentPage === 'instructions' || this.state.currentPage === 'userstats' ) {
      this.setState({ hasAnswered: false });
    } else {
      this.setState({ playerScored: 'Oh, just choose one!' });
      return false;
    }

    // check of amount of questions taken are within game limit, if so, send to results page and update user on DB
    if ( this.state.questionCount >= 5 ) {
      // player has gone through 5 questions, show results
      this.setState({ currentPage: 'results', hasAnswered: true });
      
      this.state.currentUser.games.push( this.state.score );
      
      // prepare request body for update
      let reqBody = {
        id: this.state.currentUser.id,
        username: this.state.currentUser.username,
        games: this.state.currentUser.games
      }
      console.log( 'reqBody: ', reqBody );
      
      // updates user.games property to include a new record
      axios.put( `/api/user/${this.state.currentUser.id}`, reqBody )
        .then( response => {
          this.setState({ questionCount: 0, updatedStats: response.data });
        })
        .catch( () => console.log( 'Server Error: score could not be updated on user' ) );
      
      // do nothing else if we're in results page
      return;
    }
    
    // reset score if this function is invoked from a button within the Instructions or Results component
    if ( this.state.currentPage === 'instructions' || this.state.currentPage === 'results' ) {
      this.setState({ score: 0 });
    }

    // hits external api to retrieve four random bands from predefined array, one of them as the correct answer,
    // and several songs by that band. On Promise success, choose a random song from list to use as question.
    axios.get( '/api/question/' )
      .then( response => {
        console.log('randomizeAnswers: ', response );

        // use random number to select question song. Some query results return band names as songs names,
        // make sure not to pick one of those.
        let randomNumber = Math.floor( Math.random() * (response.data.artistTracks.length) );
        while ( response.data.artistTracks[randomNumber] == response.data.correctAnswer) {
          randomNumber = Math.floor( Math.random() * (response.data.artistTracks.length) );
        }
        
        console.log( 'response.data.correctAnswer: ', response.data.correctAnswer);
        console.log( 'response.data.artistTracks: ', response.data.artistTracks);
        console.log( 'randomNumber: ', randomNumber );
        
        this.setState({ 
          currentPage: 'question',
          questionCount: ++this.state.questionCount,
          questionSong: response.data.artistTracks[randomNumber],
          correctAnswer: response.data.correctAnswer, 
          answers: response.data.answers,
          playerScored: null
        });

      }); // end .then callback
  }



  /**
   * Is this function still used?
   * @param {array} users Array of all users stored in local server
   */
  displayUserUpdatedStats( users ) {
    let currentUpdatedUser = users.filter( user => user.username === this.state.username );

    return currentUpdatedUser;
  }

  // checks if answer selected by user is correct. updates score and answer feedback accordingly.
  evaluateAnswer( selectedAnswer ) {
    if ( selectedAnswer === this.state.correctAnswer ) {
      this.setState({ 
        playerScored: <h2 className="correct"><i className="fas fa-check-circle"></i> Correct!</h2>, 
        score: ++this.state.score, hasAnswered: true
      });
    } else {
      this.setState({ 
        playerScored: <h2><strong className="wrong"><i className="fas fa-times-circle"></i> Wrong! </strong>{this.state.correctAnswer} is the correct answer.</h2>, 
        hasAnswered: true 
      });
    }

    // Re-render for updated answer feedback message
    this.displayPage();

    console.log( 'evaluateAnswer is passing correctly in App')
  }



  /**
   * Renders the app
   */
  render() {
    return (
      <div className="App">
        <Navigation handlePageChange={this.changePage} newGame={this.newGame} />
        <CurrentPlayer currentUser={this.state.currentUser}/>
        { this.displayPage() }
      </div>
    );
  }
}

export default App;
