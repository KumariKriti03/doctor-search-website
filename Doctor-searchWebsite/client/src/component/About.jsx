// About.js

import React from 'react';
import doctor from '../images/doctorD.png';
import '../styles/About.css'; // Import external CSS file

const About = () => {
  return (
    <div className="about-us-container">
      <div className="about-content-container">

        <div className="about-banner">
          <div className="left-content">
            <p className="about-paragraph">
              Welcome to the Doctor Search Website, where we believe in making healthcare accessible and personalized.
              Our mission is to simplify the process of finding the right healthcare professional for your needs.
            </p>
          </div>

          <div className="right-content">
            <img src={doctor} alt="image" className="right-content-image" />
          </div>
        </div>

        <div className="vision-container">
          <h3 className="vision-heading">Our Vision</h3>
          <p className="vision-paragraph">
            We envision a future where individuals can navigate their healthcare journey with ease,
            empowered by information and supported by a user-friendly platform.
          </p>
        </div>

        <div className="what-we-offer-container">
          <h3 className="what-we-offer-heading">What We Offer</h3>
          <ul className="what-we-offer-list">
            <li className="what-we-offer-list-item">Effortless Doctor Search: Find doctors based on your criteria, ensuring a tailored healthcare experience.</li>
            <li className="what-we-offer-list-item">Detailed Doctor Profiles: Access comprehensive information to make informed decisions.</li>
            <li className="what-we-offer-list-item">Seamless Appointment Booking: Schedule appointments with ease and convenience.</li>
            <li className="what-we-offer-list-item">User Reviews: Explore trusted feedback to enhance your confidence in choosing a healthcare professional.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default About;
