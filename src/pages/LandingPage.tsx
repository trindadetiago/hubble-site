import React from 'react';

import HeroSection from '../components/LandingPage/HeroSection/HeroSection';

import BackgroundCircles from '../components/LandingPage/BackgroundCircles/BackgroundCircles'; 

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page" style={{ paddingLeft: '15%', paddingRight: '15%'}}>
      <BackgroundCircles />
      <main>
        <HeroSection />
      </main>
    </div>
  );
};

export default LandingPage;
