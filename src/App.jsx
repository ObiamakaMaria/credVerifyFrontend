import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Page Components
import Dashboard from './pages/Dashboard';
import CreateCreditBuilderLoan from './pages/CreateCreditBuilderLoan';

// Loading and Error Components
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="text-white">Loading...</div>
  </div>
);

const ErrorScreen = ({ message }) => (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="text-red-500">{message}</div>
  </div>
);

const MainLayout = ({ children }) => (
  <div className="bg-gray-900 min-h-screen text-white">
    <Sidebar />
    <div className="ml-16 p-6">
      <Header username="koded" />
      {children}
    </div>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // Replace with actual API calls when ready
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (err) {
        setError('Failed to load application data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-credit-builder-loan" element={<CreateCreditBuilderLoan />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import NotFound from './components/NotFound';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;