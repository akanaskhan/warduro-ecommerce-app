import loaderlogo from '../assets/images/loaderlogo.svg';
import logoblack from '../assets/images/logoblack.svg';

function UnderDevelopment() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-[--bs-themeColor] text-black p-4">
      
      {/* Background Pattern */}
      <div 
        className="absolute top-0 left-0 w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4 rotate-[-45deg] opacity-10 bg-repeat"
        style={{
          backgroundImage: `url(${logoblack})`,
          backgroundSize: '100px 100px',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        <img 
          src={loaderlogo} 
          alt="Warduro Logo" 
          className="w-36 mb-6 bg-black rounded-full p-3" 
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Coming Soon!</h1>
        <p className="text-lg md:text-xl text-center max-w-md mb-6">
          We're crafting something amazing. Stay tuned for an exciting launch!
        </p>
      </div>

    </div>
  );
}

export default UnderDevelopment;
