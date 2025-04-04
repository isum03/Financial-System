import React from 'react';
import './keyFeature.css'; // Import your CSS file for styling

function KeyFeatures() {
    return (
      <section className="key-features-section" id='keyfeature'> {/* Add className for styling */}
        <h2>Key Features</h2>
        <div className="features-grid"> {/* Use CSS Grid or Flexbox */}
          <div className="feature-item">
            <h3>Secure User Access</h3>
            <p>Role-based login for Admins, Financial Planners, and Mortgage Brokers.</p>
          </div>
          <div className="feature-item">
            <h3>Seamless Ticket Management</h3>
            <p>Create, assign, and track tickets effortlessly.</p>
          </div>
          <div className="feature-item">
            <h3>Efficient Collaboration</h3>
            <p>Smooth workflow between Financial Planners and Mortgage Brokers.</p>
          </div>
        </div>
      </section>
    );
}
export default KeyFeatures;