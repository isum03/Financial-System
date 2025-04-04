import React from 'react';

function HowItWorks() {
    return (
      <section className="how-it-works-section" id='howitwork'> {/* Add className for styling */}
        <div className="how-it-works-content"> {/* Use CSS Grid or Flexbox */}
          <div className="how-it-works-text">
            <h2>How It Works</h2>
            <div>
              <h3>Admin Registration</h3>
              <p>Admin creates user accounts for Financial Planners and Mortgage Brokers.</p>
            </div>
            <div>
              <h3>Ticket Creation</h3>
              <p>Financial Planners and Mortgage Brokers create client-related tickets.</p>
            </div>
            <div>
              <h3>Ticket Submission & Tracking</h3>
              <p>Tickets are assigned to the relevant user for processing.</p>
            </div>
            <button className="get-started-button">Get Started</button>
          </div>
          <div className="how-it-works-image">
            {/* Replace with your actual image path */}
            <img src="/path/to/your/workflow-image.png" alt="Workflow illustration" />
            {/* Or use a placeholder if you don't have the image yet */}
            {/* <div style={{ width: '100%', height: '300px', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Image Placeholder</div> */}
          </div>
        </div>
      </section>
    );
}
export default HowItWorks;