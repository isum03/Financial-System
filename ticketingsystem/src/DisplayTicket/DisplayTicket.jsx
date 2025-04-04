import React from 'react';
import './DisplayTicket.css';
import { useNavigate } from 'react-router-dom';

// In a real app, this data would likely come from props or state management
const ticketData = {
  serialNumber: 'T001',
  clientName: 'Ross Geller',
  clientAddress: 'City Road, Town',
  email: 'ross@gmail.com',
  phone: '1234567890',
  amount: '20,000', // Keep as string to include comma/currency
};

function DisplayTicket() {
  const navigate = useNavigate();
  const handleReject = () => {
    console.log('Ticket Rejected:', ticketData.serialNumber);
    alert(`Ticket ${ticketData.serialNumber} Rejected`);
    // Add actual rejection logic (e.g., API call)
    navigate('/dashboard');
  };

  const handleApprove = () => {
    console.log('Ticket Approved:', ticketData.serialNumber);
    alert(`Ticket ${ticketData.serialNumber} Approved`);
    // Add actual approval logic (e.g., API call)
    navigate('/dashboard');
  };

  return (
    <div className="display-ticket-container">
      <h1 className="display-title">Display Ticket</h1>

      <div className="ticket-details">
        {/* Basic Info */}
        <div className="ticket-detail-row">
          <span className="ticket-label">Serial Number:</span>
          <span className="ticket-value">{ticketData.serialNumber}</span>
        </div>
        <div className="ticket-detail-row">
          <span className="ticket-label">Client Name:</span>
          <span className="ticket-value">{ticketData.clientName}</span>
        </div>
        <div className="ticket-detail-row">
          <span className="ticket-label">Client Address:</span>
          <span className="ticket-value">{ticketData.clientAddress}</span>
        </div>

        {/* Contact Details */}
        <h2 className="contact-details-heading">Contact Details:</h2>
        <div className="ticket-detail-row">
          <span className="ticket-label">Email</span>
          <span className="ticket-value">{ticketData.email}</span>
        </div>
        <div className="ticket-detail-row">
          <span className="ticket-label">Phone Number</span>
          <span className="ticket-value">{ticketData.phone}</span>
        </div>
        <div className="ticket-detail-row">
          <span className="ticket-label">Amount</span>
          {/* Add currency symbol if desired */}
          <span className="ticket-value">${ticketData.amount}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="ticket-actions">
        <button type="button" className="reject-button" onClick={handleReject}>
          Reject
        </button>
        <button type="button" className="approve-button" onClick={handleApprove}>
          Approve
        </button>
      </div>
    </div>
  );
}

export default DisplayTicket;