"use client";

const StepFour = ({ onNext}) => {

  return (
    <div className="h-screen flex flex-col items-center justify-center px-8 py-12" 
         style={{background: 'linear-gradient(135deg, #FF8A00 0%, #FFD700 100%)'}}>
      <div className="w-full max-w-7xl bg-white/90 rounded-2xl p-12 backdrop-blur-sm shadow-xl">
      
        <div className="text-center mb-12">
          <h1 className="text-softBlack font-bold text-3xl mb-3">Sign Up Complete</h1>
          <p className="text-gray-600 text-xl"> Hi there!</p>
          <p className="text-softBlack text-xl mt-2">We're thrilled you've joined our platform!</p>
        </div>

      
        <div className="w-full mb-12">
          <p className="text-softBlack text-center font-medium text-xl mb-8">
            Getting Started is Simple:
          </p>
          <div className="flex justify-between gap-6">
          
            <div className="bg-white p-8 rounded-xl w-1/3 shadow-lg text-center transition-all duration-300 hover:border-2 hover:border-logoOrange">
              <div className="flex items-center justify-center w-10 h-10 bg-logoOrange text-white rounded-full mx-auto mb-4 text-xl">
                1
              </div>
              <p className="text-softBlack font-semibold text-lg">
                Set Up Your Platform Manager Account
              </p>
            </div>

           
            <div className="bg-white p-8 rounded-xl w-1/3 shadow-lg text-center transition-all duration-300 hover:border-2 hover:border-logoOrange">
              <div className="flex items-center justify-center w-10 h-10 bg-logoOrange text-white rounded-full mx-auto mb-4 text-xl">
                2
              </div>
              <p className="text-softBlack font-semibold text-lg">
                Build Your Team
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl w-1/3 shadow-lg text-center transition-all duration-300 hover:border-2 hover:border-logoOrange">
              <div className="flex items-center justify-center w-10 h-10 bg-logoOrange text-white rounded-full mx-auto mb-4 text-xl">
                3
              </div>
              <p className="text-softBlack font-semibold text-lg">
                Launch and Unleash Your Potential
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={onNext}
            className="bg-logoOrange text-white px-8 py-3 rounded-lg shadow-lg hover:bg-logoYellow transition-colors duration-300 flex items-center gap-2 text-lg"
          >
            Next
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepFour;