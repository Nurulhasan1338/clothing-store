import React from 'react';
import ProfileCard from "./ProfileCard"
import { Link } from 'react-router-dom';



const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row p-3 text-center">
          {/* First Column */}
          <div className="col-md-3 col-sm-4">
     
            <ul className="list-unstyled">
              <li><Link to="/">Interior</Link></li>
              <li><Link to="/">  Construction</Link></li>
              <li><Link to="/">  Properties</Link></li>
              <li><Link to="/">Interior</Link></li>
              <li><Link to="/">  Construction</Link></li>
              <li><Link to="/">  Properties</Link></li>
            </ul>
          </div>

          {/* Second Column */}


          <div className="col-md-3 col-sm-4">
          
            <ul className="list-unstyled">
              <li><Link to="/"> About us</Link></li>
              <li><Link to="/sell">Sell</Link></li>
              <li><Link to="/"> About us</Link></li>
              <li><Link to="/sell">Sell</Link></li>

            </ul>
          </div>


          {/* Fourth Column - Wider */}
          <div className="col-md-3">
            <h5>Contact Information</h5>
            <p>
              Address: 123 Main St, Cityville<br />
              Phone: (555) 123-4567<br />
              Email: info@example.com
            </p>
          </div>

          <div className="col-md-3 ">
            <ProfileCard></ProfileCard>
          </div>
          <div className="col-md-12 ">
            <p className='text-secondary'>Copyright © 2024 CityDealer Kota</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
