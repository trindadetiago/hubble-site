import React from 'react';
import './BackgroundCircles.css'; // Make sure to create this CSS file in the same folder

const BackgroundCircles: React.FC = () => {
  return (
    <div className="background-circles">
      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>
    </div>
  );
};

export default BackgroundCircles;
