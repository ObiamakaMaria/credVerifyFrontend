import React, { useRef } from 'react';
import HeroSection from './HeroSection';
import WhySection from './WhySection';
import HowItWorks from './HowItWorks';
import Features from './Features';
import Community from './Community';
import IconsBar from './IconsBar';
const LandingPage = () => { // Renamed from Index
  const howItWorksRef = useRef(null);

  const handleExploreClick = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <HeroSection onExploreClick={handleExploreClick} />
      <IconsBar />
      <WhySection />
      <HowItWorks ref={howItWorksRef} />
      <Features />
      <Community />
    </div>
  );
};

export default LandingPage; // Renamed from Index 