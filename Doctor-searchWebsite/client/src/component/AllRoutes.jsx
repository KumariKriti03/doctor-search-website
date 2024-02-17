import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import About from "./About";
import Doctor from "./Doctor";
import BookAppointment from "./BookAppointment"; // Import the BookAppointment component
import { useAuth } from "../context/authContext";
import BookedAppointment from "./Bookedappointment";

export default function AllRoutes() {
  const { loggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={loggedIn ? <Homepage /> : <Homepage/>}
      />
      <Route path="/about" element={<About />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/bookAppointment/:id" element={<BookAppointment />} /> 
      <Route path="/bookedAppointment/:id" element={<BookedAppointment />} /> 
      
      <Route path="*" element={<Navigate to="/" />} /> 
    </Routes>
  );
}
