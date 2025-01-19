"use client";

import { useState, useEffect } from 'react';
import StepOne from './components/StepOne';
import StepTwo from './components/StepTwo';
import StepThree from './components/StepThree';
import StepFour from './components/StepFour';
import { useSearchParams } from 'next/navigation';
import cryptoJs from 'crypto-js';


export default function SignupPage() {

  const [currentStep, setCurrentStep] = useState(1);

  const searchParams = useSearchParams();
  const encryptedData = searchParams.get('data');
  const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '123456789';

  // Decrypt the data
  const decryptedData = encryptedData
    ? JSON.parse(
      cryptoJs.AES.decrypt(encryptedData, ENCRYPTION_KEY).toString(cryptoJs.enc.Utf8)
    )
    : null;

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const [step1, setStep1] = useState({})
  const [step2, setStep2] = useState({})
  const [step3, setStep3] = useState({})
  const [step4, setStep4] = useState({})

  const finalData = { ...step1, ...step2, ...step3, ...step4, ...decryptedData }


  useEffect(() => {
    console.log(finalData)
  }, [step1, step2, step3, step4])
  return (
    <div>
      {currentStep === 1 && <StepOne onNext={nextStep} setter={setStep1} />}
      {currentStep === 2 && <StepTwo onNext={nextStep} setter={setStep2} />}
      {currentStep === 3 && <StepThree onNext={nextStep} setter={setStep3} />}
      {currentStep === 4 && <StepFour onNext={nextStep} finalData={finalData} setter={setStep4} />}
    </div>
  );
}
