import React from 'react';
import '../css/navigation.css'; 

function Navigation(props) {
    return (
        <nav className="main-nav">
          <span onClick={ () => props.handlePageChange('home') } className="nav-link">Home</span>
          <span onClick={ () => props.handlePageChange('instructions') } className="nav-link">Instructions</span>
        </nav>
    );
}

export default Navigation;