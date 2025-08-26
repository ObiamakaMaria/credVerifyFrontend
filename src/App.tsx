import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header'; // Make sure this exists
import NotFound from './components/NotFound';
import { ContractProvider } from './utils/ContractContext';

// Page Components
import Dashboard from './pages/Dashboard';
import CreateCreditBuilderLoan from './pages/CreateCreditBuilderLoan';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import LandingPage from './pages/LandingPage';
import HowItWorksPage from './pages/HowItWorks';
import FeaturesPage from './pages/Features';
import LaunchPage from './pages/LaunchPage';

// Loading and Error Components
const LoadingScreen: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="text-white">Loading...</div>
  </div>
);

interface ErrorScreenProps {
  message: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message }) => (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="text-red-500">{message}</div>
  </div>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
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
    <ContractProvider>
      <Router>
        <Routes>
        {/* Landing page without layout */}
        <Route path="/" element={<LandingPage />} />
        {/* How It Works page without layout */}
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        {/* Features page without layout */}
        <Route path="/features" element={<FeaturesPage />} />
        {/* Launch page without layout */}
        <Route path="/launch" element={<LaunchPage />} />
        {/* Dashboard routes with MainLayout */}
        <Route path="/dashboard" element={
          <div className="bg-gray-900 min-h-screen text-white">
            <Sidebar />
            <div className="ml-16 lg:ml-64 p-6">
              <Header />
              <Dashboard />
            </div>
          </div>
        } />
        <Route path="/create-credit-builder-loan" element={
          <div className="bg-gray-900 min-h-screen text-white">
            <Sidebar />
            <div className="ml-16 lg:ml-64 p-6">
              <Header />
              <CreateCreditBuilderLoan />
            </div>
          </div>
        } />
        <Route path="/documents" element={
          <div className="bg-gray-900 min-h-screen text-white">
            <Sidebar />
            <div className="ml-16 lg:ml-64 p-6">
              <Header />
              <Documents />
            </div>
          </div>
        } />
        <Route path="/reports" element={
          <div className="bg-gray-900 min-h-screen text-white">
            <Sidebar />
            <div className="ml-16 lg:ml-64 p-6">
              <Header />
              <Reports />
            </div>
          </div>
        } />  
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ContractProvider>
  );
};

export default App;