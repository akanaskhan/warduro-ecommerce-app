import { useEffect, useState } from "react";
import Loader from "../loader";

export default function NotFound() {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // Trigger fade-out for the loader
      setTimeout(() => {
        setIsLoading(false); // Hide loader after fade-out
        setFadeIn(true); // Trigger fade-in for the content
      }, 500); // Wait for fade-out animation to complete
    }, 1000); // Loader duration

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <>
      <style>
        {`
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.2s forwards;
        }

        .fade-out {
          opacity: 1;
          animation: fadeOut 0.5s forwards;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          to {
            opacity: 0;
          }
        }
        `}
      </style>
      <div>
        {isLoading ? (
          <div className={`fade-out`}>
            <Loader />
          </div>
        ) : (
          <div className={`fade-in flex flex-col h-screen justify-center items-center`}>
            <h1 className="fade-in  text-4xl font-extrabold mb-2">404 - Page Not Found</h1>
            {/* <iframe
              src="https://lottie.host/embed/f5e8fb6d-f6dc-46b1-be53-2f89c6de0a7e/aE9M0XCctH.json"
              className="fade-in  w-3/4 h-1/3 lg:w-9/12 lg:h-2/4"
            ></iframe> */}
            <p>The page you're looking for doesn't exist.</p>
          </div>
        )}
      </div>
    </>
  );
}
