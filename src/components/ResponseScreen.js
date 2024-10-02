import React from 'react';

const ResponseScreen = ({ onSchedule }) => {
  return (
    <div 
      style={{ 
        textAlign: 'center', 
        marginTop: '20vh', 
        padding: '0 10px',
        background: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background
        borderRadius: '15px', // Rounded corners
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)' // Subtle shadow
      }}
    >
      <h1>I knew you would say yes! 😊</h1>
      <button 
        onClick={onSchedule} 
        style={{ 
          marginTop: '20px', 
          padding: '15px 25px', 
          fontSize: '18px' 
        }}
      >
        Schedule Our Date
      </button>
    </div>
  );
};

export default ResponseScreen;
