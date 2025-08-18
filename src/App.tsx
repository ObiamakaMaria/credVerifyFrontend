import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import NotFound from './components/NotFound';
import { ContractProvider } from './utils/ContractContext';

// Page Components
import Dashboard from './pages/Dashboard';
import CreateCreditBuilderLoan from './pages/CreateCreditBuilderLoan';
import LandingPage from './pages/LandingPage';
import HowItWorksPage from './pages/HowItWorks';
import FeaturesPage from './pages/Features';
import LaunchPage from './pages/LaunchPage';

// Types
interface LoadingScreenProps {}

interface ErrorScreenProps {
  message: string;
}

// Loading and Error Components
const LoadingScreen: React.FC<LoadingScreenProps> = () => (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="text-white">Loading...</div>
  </div>
);

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message }) => (
  <div className="flex items-center justify-center h-screen bg-gray-900">
    <div className="text-red-500">{message}</div>
  </div>
);

// Layout component that includes the outlet for nested routes
const MainLayout: React.FC = () => (
  <div className="bg-gray-900 min-h-screen text-white">
    <Sidebar />
    <div className="ml-16 p-6">
      <Header username="koded" />
      <Outlet />
    </div>
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
        {/* All other routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create-credit-builder-loan" element={<CreateCreditBuilderLoan />} />
        </Route>  
        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ContractProvider>
  );
};

export default App;
