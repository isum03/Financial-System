const API_URL = 'http://localhost:5000/api';

export const ticketService = {



  async createTicket(formData) {
    const token = localStorage.getItem('token');
    
    // Transform the data to match the required backend format
    const payload = {
        client_name: formData.clientName,         // Changed to snake_case
        client_address: formData.clientAddress,   // Changed to snake_case
        email: formData.email,                    // This can stay the same
        phone_number: formData.phoneNumber,       // Changed to snake_case
        amount: parseFloat(formData.amount),
        assigned_to: parseInt(formData.assignedTo) // Changed to snake_case
    };

    console.log('Sending payload:', payload);

    const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (!response.ok) {
        if (data.errors) {
            const errorMessage = data.errors
                .map(error => error.msg)
                .join('. ');
            throw new Error(errorMessage);
        }
        throw new Error(data.message || 'Failed to create ticket');
    }

    return data;
},
  
  async getBrokerTickets() {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/tickets/broker-tickets`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch broker tickets');
    }

    return data;
  }
};