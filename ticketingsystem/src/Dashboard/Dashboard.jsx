import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Footer from "../Headers, Footer/Footer";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="page-wrapper">
      <div className="dashboard">
        <div className="content">
          <div 
            className="cardC" 
            onClick={() => handleCardClick('/create-ticket')}
            role="button"
            tabIndex={0}
          >
            <h2>Creating Ticket</h2>
            <p>Just Click, Create a ticket for yourselves</p>
          </div>
          <div 
            className="cardD"
            onClick={() => handleCardClick('/display-ticket')}
            role="button"
            tabIndex={0}
          >
            <h2>Ticket Details Page</h2>
            <p>Just Click, See ticketing details you got</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Dashboard;