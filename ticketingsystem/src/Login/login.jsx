import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Footer from '../Headers, Footer/Footer';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switch(formData.role) {
      case 'planner':
        navigate('/create-ticket');
        break;
      case 'broker':
        navigate('/dashboard'); // Assuming you have a dashboard for brokers
        break;
      case 'admin':
        navigate('/register');
        break;
      default:
        alert('Please select a role');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="signin-page-container">
        <h1 className="signin-title">Welcome Back</h1>
        <p className="signin-subtitle">Login to your account</p>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="signin-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role" className="form-label">Role</label>
              <select
                id="role"
                name="role"
                className="form-input form-select"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Choose your role</option>
                <option value="admin">Admin</option>
                <option value="planner">Financial Planner</option>
                <option value="broker">Mortgage Broker</option>
              </select>
            </div>

            <button type="submit" className="signin-button">
              Sign In
            </button>

            <a href="#" className="forgot-link">Forgot password?</a>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;