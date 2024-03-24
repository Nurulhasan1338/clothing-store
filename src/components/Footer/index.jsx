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
     
            <ul className="text-primary underline">
              <li><Link to="/TopWear">Top wear</Link></li>
              <li><Link to="/BottomWear">Bottom wear</Link></li>
              <li><Link to="/Kurtas">Kurtas</Link></li>
              <li><Link to="/Latest_designs">Latest designs</Link></li>
              <li><Link to="/Sports_wear">Sports wear</Link></li>
              <li><Link to="/Footwear">Footwear</Link></li>
            </ul>
          </div>

          {/* Second Column */}


          <div className="col-md-3 col-sm-4 text-primary underline my-2">
          
            <ul className="list-unstyled">
              <li><Link to="/"> About us</Link></li>
              <li><Link to="/sell">Contact us</Link></li>
              

            </ul>
          </div>


          {/* Fourth Column - Wider */}
          <div className="col-md-3 my-2">
            <h3 className='fs-3 pb-2'>Location</h3>
            <p>
             <strong> Address:</strong> Indra Market, Kota<br />
             <strong> Phone:</strong> (555) 123-4567<br />
             <strong> Email:</strong>BazigarCollection@gmail.com
            </p>
          </div>

          <div className="col-md-3 d-flex justify-content-center">
            <ProfileCard></ProfileCard>
          </div>
          <div className="col-md-12 text-center ">
            <p className='text-secondary'>Copyright © 2024 Bazigar Collection Kota</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
