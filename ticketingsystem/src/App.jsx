/*import { useState } from 'react'
import reactLogo from './assets/react.svg'*/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import General from './LandingPage/General/general.jsx'
import KeyFeatures from './LandingPage/Feature/keyFeatures.jsx'
import WhyToChoose from './LandingPage/whyToChoose/toChoose.jsx'
import HowItWorks from './LandingPage/Works/howItWorks.jsx'
import Header from './Headers, Footer/Header.jsx'
import Footer from './Headers, Footer/Footer.jsx'
import Login from './Login/login.jsx'
import CreateTicketForm from './CreateTickets/formTicket.jsx'
import DisplayTicket from './DisplayTicket/DisplayTicket.jsx'  // Changed from './displayTicket/displayTicket.jsx'
import Register from './SignUp/SignUp.jsx' // Assuming you have a Register component
import Dashboard from './Dashboard/Dashboard';
import LogView from './LogView/LogView.jsx' // Assuming you have a LogView component

import './App.css'
import './LandingPage/Feature/keyFeature.css'
import './LandingPage/whyToChoose/toChoose.css'
import './LandingPage/Works/howItWorks.css'
import './LandingPage/General/general.css'
import './Headers, Footer/Header.css'
import './Headers, Footer/Footer.css'

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <General />
              <KeyFeatures />
              <WhyToChoose />
              <HowItWorks />
              <Footer />
            </>
          } />
          <Route path="/login" element={<Login />} />

          <Route path="/login" element={<Login />} />
          <Route path="/create-ticket" element={<CreateTicketForm />} />
          <Route path="/display-ticket" element={<DisplayTicket />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} /> {/* You'll need to create this component */}
          <Route path="/ticket-logs" element={<LogView />} />
          <Route path="/display-ticket/:id" element={<DisplayTicket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
