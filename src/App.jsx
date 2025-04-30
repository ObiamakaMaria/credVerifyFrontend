import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header'; // Make sure this exists
import NotFound from './components/NotFound';

// Page Components
import Dashboard from './pages/Dashboard';
import CreateCreditBuilderLoan from './pages/CreateCreditBuilderLoan';
import LandingPage from './pages/LandingPage';

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

// Layout component that includes the outlet for nested routes
const MainLayout = () => (
  <div className="bg-gray-900 min-h-screen text-white">
    <Sidebar />
    <div className="ml-16 p-6">
      <Header username="koded" />
      <Outlet />
    </div>
  </div>
);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (err) {
        setError('Failed to load application data');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen message={error} />;

  return (
    <Router>
      <Routes>
        {/* Landing page without layout */}
        <Route path="/" element={<LandingPage />} />
        
        {/* All other routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-credit-builder-loan" element={<CreateCreditBuilderLoan />} />
        </Route>  
        
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;