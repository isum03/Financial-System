import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css'; // Import component-specific styles

function Header() {
  const navigate = useNavigate();

  const handleNavClick = (event) => {
    event.preventDefault();
    const target = event.target.getAttribute('href');
    document.querySelector(target).scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <header className="app-header"> {/* Use classNames defined in Header.css */}
      <div className="header-logo">FPLANNER</div> {/* Renamed for specificity */}
      <nav className="header-nav">
        <ul>
        <li><a href="#keyfeature" onClick={handleNavClick}>Key-Features</a></li>
          <li><a href="#howitwork" onClick={handleNavClick}>How</a></li>
          <li><a href="#why" onClick={handleNavClick}>Why</a></li>
        </ul>
      </nav>
      <button className="header-login-button" onClick={() => navigate('/login')}>Login</button>
    </header>
  );
}

export default Header; // Export the component