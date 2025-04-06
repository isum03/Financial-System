import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ticketService } from '../services/ticketService';
import Footer from '../Headers, Footer/Footer';
import './LogView.css';

function LogView() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchTickets = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await ticketService.getBrokerTickets();
            
            if (data.success) {
                setTickets(data.tickets);
            } else {
                setError(data.message || 'Failed to fetch tickets');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching tickets');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleTicketClick = (serialNo) => {
        navigate(`/display-ticket/${serialNo}`);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString();
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return (
        <div className="page-wrapper">
            <div className="logs-container">
                <h2>My Assigned Tickets</h2>
                <button 
                    className="fetch-logs-btn"
                    onClick={fetchTickets}
                    disabled={loading}
                >
                    {loading ? 'Refreshing...' : 'Refresh Tickets'}
                </button>

                {error && <div className="error-message">{error}</div>}

                {tickets.length > 0 ? (
                    <table className="logs-table">
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Client Name</th>
                                <th>Client Address</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Last Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr 
                                    key={ticket.serial_no}
                                    onClick={() => handleTicketClick(ticket.serial_no)}
                                    className="log-row"
                                    role="button"
                                    tabIndex={0}
                                >
                                    <td>{ticket.serial_no}</td>
                                    <td>{ticket.client_name}</td>
                                    <td>{ticket.client_address}</td>
                                    <td>{ticket.email}</td>
                                    <td>{ticket.phone_number}</td>
                                    <td>{formatAmount(ticket.amount)}</td>
                                    <td>
                                        <span className={`status-badge status-${ticket.status}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td>{formatDate(ticket.created_at)}</td>
                                    <td>{formatDate(ticket.updated_at)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-tickets-message">
                        {loading ? 'Loading tickets...' : 'No tickets assigned to you.'}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default LogView;