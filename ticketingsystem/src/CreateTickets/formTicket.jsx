import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './formTicket.css';
import Footer from '../Headers, Footer/Footer';
import { ticketService } from '../services/ticketService';

function CreateTicketForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',        // Changed from client_name
    clientAddress: '',     // Changed from client_address
    email: '',            
    phoneNumber: '',       // Changed from phone_number
    amount: '',           
    assignedTo: ''   
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
    setError('');
    setLoading(true);

    // Basic validation before sending
    if (!formData.clientName?.trim()) {
        setError('Client name is required');
        setLoading(false);
        return;
    }

    if (!formData.clientAddress?.trim()) {
        setError('Client address is required');
        setLoading(false);
        return;
    }

    if (!formData.phoneNumber?.trim()) {
        setError('Phone number is required');
        setLoading(false);
        return;
    }

    if (!formData.amount || isNaN(parseFloat(formData.amount))) {
        setError('Valid amount is required');
        setLoading(false);
        return;
    }

    if (!formData.assignedTo || isNaN(parseInt(formData.assignedTo))) {
        setError('Valid broker ID is required');
        setLoading(false);
        return;
    }

    try {
        const data = await ticketService.createTicket(formData);
        console.log('Response:', data);
        alert('Ticket created successfully');
        
    } catch (err) {
        setError(err.message || 'Failed to create ticket');
    } finally {
        setLoading(false);
    }
};

const goBack = () => {
  navigate(-1); // This will go back to the previous page
};

  return (
    <div className="page-wrapper">
      <div className="create-ticket-container">
        <h1 className="form-title">Create Ticket</h1>
        <p className="form-subtitle">Enter ticket details</p>

        {error && <div className="error-message">{error}</div>}

        <form className="ticket-form" onSubmit={handleSubmit}>
      {/*}    <div className="form-group">
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
          </div>*/}

          <div className="form-group">
            <label htmlFor="client_name" className="form-label">Client Name:</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              className="form-input"
              value={formData.clientName}
              onChange={handleChange}
              required
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="client_address" className="form-label">Client Address:</label>
            <textarea
              id="clientAddress"
              name="clientAddress"
              className="form-input form-input-large"
              value={formData.clientAddress}
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
              id="phoneNumber"
              name="phoneNumber"
              className="form-input"
              value={formData.phoneNumber}
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
          <div className="form-group">
    <label htmlFor="assigned_to" className="form-label">Assign To (User ID):</label>
    <input
      type="text"
      id="assignedTo"
      name="assignedTo"      // Changed from assignedTo
      className="form-input"
      value={formData.assignedTo}
      onChange={handleChange}
      required
      placeholder="Enter Broker's ID"
      inputMode="numeric"
      pattern="\d+"
    />
  </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className="submit-button-form"
              disabled={loading}
              onClick={goBack}
            >
              {loading ? 'Creating...' : 'Create Ticket'}
            </button>
            <button 
              type="button" 
              className="cancel-button" 
              onClick={goBack}
            >
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