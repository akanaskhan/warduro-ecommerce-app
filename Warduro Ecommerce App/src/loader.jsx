import React from 'react';
import loaderlogo from '../src/assets/images/loaderlogo.svg';

export default function Loader({className}) {
  return (
    <div style={containerStyle}>
      <div style={loaderStyle}>
        <img src={loaderlogo} alt="Logo" style={logoStyle} className={className} />
      </div>
      <style>
        {`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
            }
            70% {
              box-shadow: 0 0 0 30px rgba(0, 0, 0, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
            }
          }
        `}
      </style>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const loaderStyle = {
  width: `10vw`, // Dynamic based on viewport width
  height: '10vw', // Keeps the loader square
  maxWidth: '100px', // Prevents it from growing too large
  maxHeight: '100px', // Prevents it from growing too large
  minWidth: '60px', // Ensures visibility on smaller devices
  minHeight: '60px', // Ensures visibility on smaller devices
  borderRadius: '50%',
  background: 'black',
  boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: 'pulse 1.2s infinite',
};

const logoStyle = {
  width: '70%',
  height: '70%',
  objectFit: 'contain',
};
