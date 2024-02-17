import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/doctor.css';
import BookedAppointment from './Bookedappointment';
import { useNavigate } from 'react-router-dom';

const Doctor = () => {
 const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState([]);

  useEffect(() => {
    displayData();
  }, []);

  const displayData = async () => {
    try {
      const res = await axios.get('http://localhost:8080/doctor');
      setDoctorData(res.data);
    } catch (error) {
      console.log('Error fetching doctor data:', error);
      setDoctorData([]);
    }
  };

  const handleBookAppointment = (id) => {
    navigate(`/bookAppointment/${id}`);
  };


  return (
    <div className="doctor-container">
      {doctorData.length === 0 ? (
        <p>No data available</p>
      ) : (
        doctorData.map((doctor, index) => (
          <div key={index} className="doctor-card">
            <div className="doctor-details">
              <h2>{doctor.name}</h2>
              <p>{doctor.department}</p>
              <p>{doctor.location}</p>
              <p>Experience: {doctor.experience}</p>
              <p>Fee: ${doctor.fee}</p>
              <button className="apt-btn" onClick={() => handleBookAppointment(doctor._id)}>
                Book Appointment
              </button>
            </div>
            <div className="doctor-image">
              <img src={doctor.image} alt="" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Doctor;
