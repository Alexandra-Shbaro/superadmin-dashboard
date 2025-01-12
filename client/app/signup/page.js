// /signup/page.js

"use client";  // For client-side rendering if needed

import { useState } from 'react';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';

export default function SignupPage() {
  // Track the current step
  const [currentStep, setCurrentStep] = useState(1);

  // Function to handle moving to the next step
  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <div>
      {/* Conditionally render steps based on currentStep */}
      {currentStep === 1 && <StepOne onNext={nextStep} />}
      {currentStep === 2 && <StepTwo onNext={nextStep} />}
      {currentStep === 3 && <StepThree />}
    </div>
  );
}
