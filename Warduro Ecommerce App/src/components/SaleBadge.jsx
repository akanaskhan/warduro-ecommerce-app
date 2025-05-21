import React from 'react';

function SaleBadge() {
  return (
    <>
      <style>
        {`
          .sale-badge {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            z-index: 20;
            background-color: black;
            color: white;
            font-size: 0.75rem; /* Base font size */
            text-align: center;
            border-radius: 50%; /* Makes it circular */
            width: 12vw; /* Responsive width */
            height: 12vw; /* Responsive height */
            display: flex;
            justify-content: center;
            align-items: center;
            animation: pulse 1.5s infinite, bounce 1.5s infinite;
            min-width: 50px; /* Minimum size for smaller screens */
            min-height: 50px; /* Minimum size for smaller screens */
            max-width: 60px; /* Maximum size for larger screens */
            max-height: 60px; /* Maximum size for larger screens */
          }

          /* Pulse Animation */
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.9;
            }
          }

          /* Bounce Animation */
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          /* Responsive Font Size */
          @media (max-width: 768px) {
            .sale-badge {
              font-size: 0.75rem; /* Smaller font size for tablets */
              line-height: normal;
            }
          }

          @media (max-width: 480px) {
            .sale-badge {
              font-size: 0.8rem; /* Smaller font size for phones */
                line-height: normal;

            }
          }
        `}
      </style>

      <div className="sale-badge">
        <p>
          {/* Upto <br /> */}
          40% <br />
          OFF
        </p>
      </div>
    </>
  );
}

export default SaleBadge;
