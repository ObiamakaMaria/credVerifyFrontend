import React, { useRef } from 'react';
import HeroSection from '../components/landingpage/HeroSection';
import WhySection from '../components/landingpage/WhySection';
import HowItWorks from '../components/landingpage/HowItWorks';
import Features from '../components/landingpage/Features';
import Community from '../components/landingpage/Community';
import IconsBar from '../components/landingpage/IconsBar';
import Footer from '../components/layout/Footer';
import OnchainCreditSection from '../components/landingpage/OnchainCreditSection';

const LandingPage = () => { // Renamed from Index
  const howItWorksRef = useRef(null);

  const handleExploreClick = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <HeroSection onExploreClick={handleExploreClick} />
      <IconsBar/>
      {/* <WhySection /> */}
      {/* <HowItWorks ref={howItWorksRef} /> */}
      {/* <Features /> */}
      {/* <Community /> */}
      <OnchainCreditSection />
      <Footer />
    </div>
  );
};

export default LandingPage; // Renamed from Index 