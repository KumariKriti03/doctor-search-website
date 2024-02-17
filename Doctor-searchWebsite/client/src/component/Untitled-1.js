// Homepage.js

import React, { useState } from 'react';
import doctorImage from '../images/doctor.jpg';
import { useNavigate } from 'react-router-dom';


const Homepage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    date: '',
    time: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save form data to localStorage
    localStorage.setItem('appointmentDetails', JSON.stringify(formData));

    setFormData({
      name: '',
      email: '',
      contact: '',
      date: '',
      time: '',
    });
    navigate('/doctor');
  };
  return (
    <div>
      <div style={styles.container}>
        
        
      </div>
    </div>
  );
};



{/* <div style={styles.rightForm}>

<form onSubmit={handleSubmit} style={styles.formBox}>
  <h4>Add your Details For Appointment</h4>
  <label htmlFor="name" style={styles.label}>Your Name:</label>
  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required style={styles.input} />

  <label htmlFor="email" style={styles.label}>Your Email:</label>
  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required style={styles.input} />

  <label htmlFor="contact" style={styles.label}>Your Contact:</label>
  <input type="tel" id="contact" name="contact" value={formData.contact} onChange={handleChange} required style={styles.input} />

  <label htmlFor="date" style={styles.label}>Date of Appointment:</label>
  <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required style={styles.input} />

  <label htmlFor="time" style={styles.label}>Time of Appointment:</label>
  <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required style={styles.input} />



  <button type="submit" style={styles.button}>Submit</button>
</form>
</div> */}
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    background: `url(${doctorImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    padding: "3%",
  },
  leftContent: {
    flex: 1,
    padding: '50px',
    color: '#fff',
    textAlign: 'left',
    backgroundColor: "rgba(52, 152, 219, 0.9)",
  },
  rightForm: {
    flex: 1,
    padding: '50px',
  },
  formBox: {
    background: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    maxWidth: '400px', // Set a max width for the form box
    margin: 'auto', // Center the form box
    padding: '20px',
  },
  heading: {
    fontSize: '2em',
  },
  paragraph: {
    fontSize: '1.2em',
  },
  label: {
    display: 'block',
    margin: '5px 0',
    color: '#3498db',
    fontSize: '1.2em',
  },
  input: {
    width: '100%',
    padding: '5px',
    margin: '5px 0 5px',
    boxSizing: 'border-box',
    border: '1px solid #3498db',
    borderRadius: '5px',
    fontSize: '1em',
    outline: 'none',
  },
  button: {
    background: '#3498db',
    color: '#fff',
    padding: '10px 20px',
    fontSize: '1.2em',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Homepage;
