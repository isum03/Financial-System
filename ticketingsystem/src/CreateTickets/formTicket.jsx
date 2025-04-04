import React, { useState } from 'react';
import './formTicket.css';
import Footer from '../Headers, Footer/Footer';

function CreateTicketForm() {
  const [formData, setFormData] = useState({
    serial_no: '',
    client_name: '',
    client_address: '',
    email: '',
    phone_number: '',
    amount: '',
    // These fields will be handled by the backend
    // created_by: will come from authenticated user
    // status: will default to 'pending'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // For amount field, only allow numbers and decimal point
    if (name === 'amount') {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Submission failed');
      
      alert('Ticket created successfully');
      // Clear form after successful submission
      setFormData({
        serial_no: '',
        client_name: '',
        client_address: '',
        email: '',
        phone_number: '',
        amount: '',
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create ticket');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="create-ticket-container">
        <h1 className="form-title">Create Ticket</h1>
        <p className="form-subtitle">Enter ticket details</p>

        <form className="ticket-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="serial_no" className="form-label">Serial Number:</label>
            <input
              type="text"
              id="serial_no"
              name="serial_no"
              className="form-input"
              value={formData.serial_no}
              onChange={handleChange}
              required
              maxLength={20}
            />
          </div>

          <div className="form-group">
            <label htmlFor="client_name" className="form-label">Client Name:</label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              className="form-input"
              value={formData.client_name}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="client_address" className="form-label">Client Address:</label>
            <textarea
              id="client_address"
              name="client_address"
              className="form-input form-input-large"
              value={formData.client_address}
              onChange={handleChange}
              required
              rows={3}
            />
          </div>

          <h2 className="contact-details-heading">Contact Details:</h2>
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone_number" className="form-label">Phone Number:</label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              className="form-input"
              value={formData.phone_number}
              onChange={handleChange}
              required
              maxLength={20}
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount" className="form-label">Amount:</label>
            <input
              type="text"
              id="amount"
              name="amount"
              className="form-input"
              value={formData.amount}
              onChange={handleChange}
              required
              placeholder="0.00"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button-form">Create Ticket</button>
            <button type="button" className="cancel-button" onClick={() => window.history.back()}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CreateTicketForm;