import React, { useState } from 'react';
import './signup.css';
import Footer from '../Headers, Footer/Footer';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    username: '',
    password: '',
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
    console.log('Sign Up Data:', formData);
    alert('Account creation submitted! Check console.');
    // Add API call logic here
  };

  return (
    <div className="page-wrapper">
      <div className="signup-container">
        <h1 className="signup-title">Sign Up</h1>
        <p className="signup-subtitle">Create your business account</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-input form-input-half"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="form-input form-input-half"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="email@domain.com"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
          />

          <select
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

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="form-input"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="submit-button">
            Create account
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SignUp;