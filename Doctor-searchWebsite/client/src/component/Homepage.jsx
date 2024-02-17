import React, { useState, useEffect } from 'react';
import doctorImage from '../images/doctor.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/authContext';

const Homepage = () => {
  const navigate = useNavigate();
  const [selectedDoctorType, setSelectedDoctorType] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [doctorList, setDoctorList] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const { loggedIn } = useAuth();

  useEffect(() => {
    fetchDoctorList();
  }, []);

  const fetchDoctorList = async () => {
    try {
      const res = await axios.get('http://localhost:8080/doctor');
      setDoctorList(res.data);
    } catch (error) {
      console.log('Error fetching doctor list:', error);
    }
  };

  const handleGoButtonClick = () => {
    if (!loggedIn) {
      return alert("You are not logged in!");
    }

    if (selectedDoctor) {
      // Extract the id of the selected doctor
      const selectedDoctorId = doctorList.find(doctor => doctor.name === selectedDoctor)._id;
      // Navigate to the bookAppointment route with the selectedDoctorId
      navigate(`/bookAppointment/${selectedDoctorId}`);
    } else {
      // Handle the case when no doctor is selected
      console.error('No doctor selected');
    }
  };

  const handleDepartmentChange = (department) => {
    setSelectedDoctorType(department);
    setFilteredDoctors(doctorList.filter((doctor) => doctor.department === department));
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchContainer}>
        <h3 style={styles.headerTitle}>A Destination for Superior Care</h3>
        <div style={styles.actionContainer}>
          <div style={styles.selectContainer}>
            <select
              style={styles.select}
              value={selectedDoctorType}
              onChange={(e) => handleDepartmentChange(e.target.value)}
            >
              <option value="" disabled>Select Doctor Type</option>
              <option value="Cardiology">Cardiologist</option>
              <option value="Dermatology">Dermatologist</option>
              <option value="Physician">Physician</option>
              <option value="Neurology">Neurology</option>
              <option value="Gynecology">Gynecology</option>
              <option value="ENT">ENT</option>
              <option value="Psychiatry">Psychiatry</option>

            </select>
          </div>
          {selectedDoctorType && (
            <div style={styles.selectContainer}>
              <select
                style={styles.select}
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
              >
                <option value="" disabled>Select Doctor</option>
                {filteredDoctors.map((doctor, index) => (
                  <option key={index} value={doctor.name}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button style={styles.goButton} onClick={handleGoButtonClick} disabled={!selectedDoctor}>
            GO
          </button>
        </div>
      </div>
    </div>
  );
};





const styles = {
  container: {
    height: '100vh',
    background: `url(${doctorImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    paddingTop: '15%'
  },
  searchContainer: {
    background: 'rgba(142,153,156,0.7)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '1px',
    padding: '0.5em 2em 1.5em 2em',
    width: '50%',
    margin: 'auto',
    textAlign: 'center',
  },

  actionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: "1em",

  },

  headerTitle: {
    color: '#fff',
    letterspacing: '2px',
    fontfamily: 'Roboto',
    fontfamily: 'ProximaNovaFont',
    fontweight: 'normal',
  },

  selectContainer: {
    width: "35%",
  },

  select: {
    width: '100%',
    backgroundColor: '#fff',
    padding: '12px 8px',
    fontSize: '1em',
    border: 'none',
    color: 'crimson',
    outline: 'none',
  },
  goButton: {
    padding: '12px',
    backgroundColor: '#990000',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
  },
};

export default Homepage;
