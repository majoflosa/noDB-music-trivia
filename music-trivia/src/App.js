import React, { Component } from 'react';
import './App.css';

// Components
import Navigation from './components/Navigation';
import Home from './components/Home';
import Instructions from './components/Instructions';
import Question from './components/Question';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentPage: 'home',
      questionCount: 0
    }

    this.displayPage = this.displayPage.bind( this );
    this.changePage = this.changePage.bind( this );
    this.throwQuestion = this.throwQuestion.bind( this );
  }

  changePage( pageName = 'home' ) {
    this.setState({ currentPage: pageName });
  }

  displayPage() {
    switch ( this.state.currentPage ) {
      case 'instructions':
        return <Instructions throwQuestion={this.throwQuestion} />;
        break;
      case 'question':
        return <Question count={this.state.questionCount} />;
        break;
      case 'home':
      default:
        return <Home testing={'This is a test.'}/>;
        break;
    }
  }

  throwQuestion( count ) {
    this.setState({ 
      currentPage: 'question'
    });
    console.log( 'throwQuestion is working from Instructions' );
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
