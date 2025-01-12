"use client";
import { useState } from 'react';

const StepTwo = ({ onNext }) => {
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyNumber, setCompanyNumber] = useState('');
    const [businessWebsite, setBusinessWebsite] = useState('');

    const isFormValid = companyEmail && companyNumber && businessWebsite;  // Check if all fields are filled

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-offWhite">
            <div className="flex items-center space-x-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-mediumGrey text-offWhite flex items-center justify-center">1</div>
                <div className="w-16 h-0.5 bg-lightGrey"></div>
                <div className="w-6 h-6 rounded-full bg-logoOrange text-offWhite flex items-center justify-center">2</div>
                <div className="w-16 h-0.5 bg-lightGrey"></div>
                <div className="w-6 h-6 rounded-full bg-mediumGrey text-offWhite flex items-center justify-center">3</div>
            </div>
            <h1 className="font-bold text-lg">Company Contact Details</h1>
            <div className="bg-offWhite shadow-md rounded-lg p-8 w-[500px] mx-auto"> 
                <div className="mb-4">
                    <label className="block text-mediumGrey font-medium">Business Email</label>
                    <input
                        type="email"
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        className="mt-2 p-2 w-full border border-lightGrey rounded-md focus:outline-none focus:ring-2 focus:ring-logoOrange"
                        placeholder="Enter your business email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-mediumGrey font-medium">Phone Number</label>
                    <input
                        type="tel"
                        value={companyNumber} 
                        onChange={(e) => setCompanyNumber(e.target.value)} 
                        className="mt-2 p-2 w-full border border-lightGrey rounded-md focus:outline-none focus:ring-2 focus:ring-logoOrange"
                        placeholder="Enter your phone number"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-mediumGrey font-medium">Website URL</label>
                    <input
                        type="url"
                        value={businessWebsite} 
                        onChange={(e) => setBusinessWebsite(e.target.value)} 
                        className="mt-2 p-2 w-full border border-lightGrey rounded-md focus:outline-none focus:ring-2 focus:ring-logoOrange"
                        placeholder="Enter your business website"
                    />
                </div>
                <button 
                    onClick={onNext} 
                    className={`w-full py-3 ${isFormValid ? 'bg-logoOrange' : 'bg-gray-400 cursor-not-allowed'} text-offWhite rounded-md hover:bg-logoYellow transition-all`}
                    disabled={!isFormValid} 
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default StepTwo;
