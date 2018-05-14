import React from 'react';
import '../css/navigation.css'; 

function Navigation(props) {
    return (
        <nav className="main-nav">
          <span onClick={ () => props.handlePageChange('home') } className="nav-link">New User</span>
          <span onClick={ () => props.handlePageChange('userstats') } className="nav-link">Users and Stats</span>
          <span onClick={ props.newGame } className="nav-link">New Game</span>
        </nav>
    );
}

export default Navigation;