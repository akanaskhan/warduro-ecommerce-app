import React, { useState } from 'react';

function ThemeButton({ text }) {
  const [ripples, setRipples] = useState([]);

  const handleRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(button.offsetWidth, button.offsetHeight);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    // Add the new ripple
    const newRipple = { id: Date.now(), x, y, size };
    setRipples((prev) => [...prev, newRipple]);

    // Clean up after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 500); // Match with CSS animation duration
  };

  return (
    <>
      <style>
        {`
          .learn-btn {
            color: white;
            font: inherit;
            background-color: var(--bs-black);
            // padding: 20px 30px;
            outline: 0;
            overflow: hidden;
            display: inline-block;
            position: relative;
            user-select: none;
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5);
            transition: box-shadow 150ms ease-out, transform 0.2s ease-out;
            cursor: pointer;
          border-radius: 8px;
          }

          

          .learn-btn:active {
            transform: scale(0.98); /* Slight press-in effect */
          }

          /* Ripple Effect */
          .learn-btn .ripple {
            position: absolute;
            width: 0;
            height: 0;
            border-radius: 50%; /* Ensures the ripple is circular */
            background-color: rgba(255, 255, 255, 0.6); /* White with transparency */
            transform: translate(-50%, -50%);
            animation: rippleEffect 0.8s ease-out;
            pointer-events: none; /* Disable interaction with the ripple */
          }

          /* Keyframes for Ripple Animation */
          @keyframes rippleEffect {
            0% {
              width: 0;
              height: 0;
              opacity: 0.6;
            }
            100% {
              width: 300px; /* Controls the size of the ripple */
              height: 300px;
              opacity: 0; /* Fades out at the end */
            }
          }
        `}
      </style>

      <button className="learn-btn  " onClick={handleRipple}>
        {text}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple"
            style={{
              width: ripple.size,
              height: ripple.size,
              left: ripple.x,
              top: ripple.y,
            }}
          />
        ))}
      </button>
    </>
  );
}

export default ThemeButton;
