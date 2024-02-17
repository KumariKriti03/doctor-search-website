import React from 'react';

import AllRoutes from './component/AllRoutes';
import Navbar from './component/Navbar';
import './App.css';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <AllRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
