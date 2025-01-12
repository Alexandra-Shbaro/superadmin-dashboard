"use client";

const StepFour =({onNext})=>{
  return (
    <div className="bg-offWhite h-screen flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-softBlack font-bold text-2xl">Sign Up Complete</h1>
        <p className="text-mediumGrey mt-2">
          Hi there, <span className="italic text-softBlack">[Company's Name]</span>
        </p>
        <p className="text-softBlack mt-1">We're thrilled you've joined our platform!</p>
      </div>

      {/* Steps */}
      <div className="w-full max-w-3xl">
        <p className="text-softBlack text-center font-medium mb-6">Getting Started is Simple:</p>
        <div className="flex flex-wrap justify-center gap-6">
          {/* Step 1 */}
          <div className="bg-lightGrey p-6 rounded-lg w-60 shadow-md text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-mediumGrey text-offWhite rounded-full mx-auto mb-4">
              1
            </div>
            <p className="text-softBlack font-semibold">Set Up Your Platform Manager Account</p>
          </div>
          {/* Step 2 */}
          <div className="bg-lightGrey p-6 rounded-lg w-60 shadow-md text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-mediumGrey text-offWhite rounded-full mx-auto mb-4">
              2
            </div>
            <p className="text-softBlack font-semibold">Build Your Team</p>
          </div>
          {/* Step 3 */}
          <div className="bg-lightGrey p-6 rounded-lg w-60 shadow-md text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-mediumGrey text-offWhite rounded-full mx-auto mb-4">
              3
            </div>
            <p className="text-softBlack font-semibold">Launch and Unleash Your Potential</p>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="mt-12">
        <button className="bg-logoOrange text-offWhite px-6 py-2 rounded-lg shadow hover:bg-logoYellow">
          Next →
        </button>
      </div>
    </div>
  );
};

export default StepFour;

  