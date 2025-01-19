"use client";

import { useState } from 'react';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';


export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };


  return (
    <div>
      {currentStep === 1 && <StepOne onNext={nextStep} />}
      {currentStep === 2 && <StepTwo onNext={nextStep} />}
      {currentStep === 3 && <StepThree onNext={nextStep} />}
      {currentStep === 4 && <StepFour />}
    </div>
  );
}
