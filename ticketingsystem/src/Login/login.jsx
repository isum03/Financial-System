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
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store the token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Navigate based on user role
      switch(data.user.role) {
        case 'planner':
          navigate('/create-ticket');
          break;
        case 'broker':
          navigate('/dashboard');
          break;
        case 'admin':
          navigate('/register');
          break;
        default:
          setError('Invalid role');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="signin-page-container">
        <h1 className="signin-title">Welcome Back</h1>
        <p className="signin-subtitle">Login to your account</p>

        {error && <div className="error-message">{error}</div>}

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

            {/*<div className="form-group">
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
            </div>*/}

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