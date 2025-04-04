import React from 'react';
import './Footer.css';
// Consider using an icon library like react-icons for social links
// import { FaFacebookF, FaLinkedinIn, FaYoutube, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">FPlanner</div>
          <div className="social-links">
             {/* Replace with actual icons */}
            <a href="#" aria-label="Facebook">FB</a>
            <a href="#" aria-label="LinkedIn">LI</a>
            <a href="#" aria-label="YouTube">YT</a>
            <a href="#" aria-label="Instagram">IG</a>
            {/* Example with react-icons: */}
            {/* <a href="#" aria-label="Facebook"><FaFacebookF /></a> */}
            {/* <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a> */}
            {/* <a href="#" aria-label="YouTube"><FaYoutube /></a> */}
            {/* <a href="#" aria-label="Instagram"><FaInstagram /></a> */}
          </div>
        </div>
        <div className="footer-right">
          <h4>Contact Us</h4>
          <p>Address: Flower Road, City</p>
          <p>Contact: 0123456789</p>
          <p>Email: sample@gmail.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Sample Solutions. All Rights Reserved</p>
      </div>
    </footer>
  );
}

export default Footer;