import React from 'react';

function ToChoose() {
    return (
      <section className="why-choose-us-section" id='why'> {/* Add className for styling */}
        <h2>Why You Choose Us</h2>
        <ul>
          {/* Use CSS to style the list items with diamond bullets */}
          <li>User-Friendly Interface – Simple and easy to navigate.</li>
          <li>Secure & Reliable – Ensuring data privacy and security.</li>
          <li>Time-Saving – Quick ticket creation and assignment.</li>
        </ul>
      </section>
    );
}
export default ToChoose;