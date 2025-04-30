import React, { useRef } from 'react';
import HowItWorks from '../components/landingpage/HowItWorks';
import Navbar from '../components/Navbar';
import Footer from '../components/layout/Footer';

const HowItWorksPage = () => {
  const howItWorksRef = useRef(null);
  return (
    <div className="min-h-screen bg-[#12081f] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="max-w-3xl w-full">
          <HowItWorks ref={howItWorksRef} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage; 