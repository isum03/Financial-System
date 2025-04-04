import React from 'react';
import { useNavigate } from 'react-router-dom';

function General() {
  const navigate = useNavigate();
  const handleNavClick = (event) => {
    event.preventDefault();
    const target = event.target.getAttribute('href');
    document.querySelector(target).scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

    return (
      <section className="hero-section"> {/* Add className for styling */}
        <h1>WELCOME TO F PLANNER</h1>
        <p>A simple and efficient way to manage client requests between Financial Planners and Mortgage Brokers.</p>
        {/* The Topic/Page columns seem like placeholder content in the image, often omitted in actual implementation unless specifically required */}
        <button className="login-button-hero" onClick={() => navigate('/login')}>Login</button>
      </section>
    );
}    
export default General;