import React from 'react';
import Features from '../components/landingpage/Features';
import Navbar from '../components/Navbar';
import Footer from '../components/layout/Footer';

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-[#12081f] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full">
          <Features />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage; 