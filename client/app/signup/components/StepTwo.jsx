"use client";
import { useState } from 'react';

const StepTwo = ({ onNext }) => {
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyNumber, setCompanyNumber] = useState('');
    const [businessWebsite, setBusinessWebsite] = useState('');

    const [errors, setErrors] = useState({
        email: '',
        phone: '',
        website: ''
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
            return false;
        }
        setErrors(prev => ({ ...prev, email: '' }));
        return true;
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\+\d{1,4}[\s\d-]{8,}$/;
        if (!phoneRegex.test(phone)) {
            setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number with country code' }));
            return false;
        }
        setErrors(prev => ({ ...prev, phone: '' }));
        return true;
    };

    const validateUrl = (url) => {
        try {
            new URL(url);
            setErrors(prev => ({ ...prev, website: '' }));
            return true;
        } catch {
            setErrors(prev => ({ ...prev, website: 'Please enter a valid URL (e.g., https://example.com)' }));
            return false;
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setCompanyEmail(value);
        if (value) validateEmail(value);
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        setCompanyNumber(value);
        if (value) validatePhone(value);
    };

    const handleWebsiteChange = (e) => {
        const value = e.target.value;
        setBusinessWebsite(value);
        if (value) validateUrl(value);
    };

    const isFormValid = companyEmail && companyNumber && businessWebsite;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-offWhite">
            <div className="text-center">
                <img
                    src="/lumilogo.svg"
                    alt="Lumi Logo"
                    className="mx-auto w-42 h-20 mb-10"
                />
                <p className="text-mediumGrey mb-5">Finish setting up your profile</p>
            </div>
            <div className="flex items-center space-x-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-mediumGrey text-offWhite flex items-center justify-center">1</div>
                <div className="w-16 h-0.5 bg-lightGrey"></div>
                <div className="w-6 h-6 rounded-full bg-logoOrange text-offWhite flex items-center justify-center">2</div>
                <div className="w-16 h-0.5 bg-lightGrey"></div>
                <div className="w-6 h-6 rounded-full bg-mediumGrey text-offWhite flex items-center justify-center">3</div>
            </div>
            <h1 className="font-bold text-lg mb-5">Company Contact Details</h1>
            <div className="bg-white shadow-md rounded-lg p-8 w-[500px] mx-auto mb-5">
                <div className="mb-4">
                    <label className="block text-mediumGrey font-medium">Business Email</label>
                    <input
                        type="email"
                        value={companyEmail}
                        onChange={handleEmailChange}
                        onBlur={() => validateEmail(companyEmail)}
                        className={`mt-2 p-2 w-full border ${errors.email ? 'border-red-500' : 'border-lightGrey'} rounded-md focus:outline-none focus:ring-2 focus:ring-logoOrange`}
                        placeholder="example@company.com"
                    />
                    {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-mediumGrey font-medium">Phone Number</label>
                    <input
                        type="tel"
                        value={companyNumber}
                        onChange={handlePhoneChange}
                        onBlur={() => validatePhone(companyNumber)}
                        className={`mt-2 p-2 w-full border ${errors.phone ? 'border-red-500' : 'border-lightGrey'} rounded-md focus:outline-none focus:ring-2 focus:ring-logoOrange`}
                        placeholder="+1 234 567 8900"
                    />
                    {errors.phone && <p className="mt-1 text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-mediumGrey font-medium">Website URL</label>
                    <input
                        type="url"
                        value={businessWebsite}
                        onChange={handleWebsiteChange}
                        onBlur={() => validateUrl(businessWebsite)}
                        className={`mt-2 p-2 w-full border ${errors.website ? 'border-red-500' : 'border-lightGrey'} rounded-md focus:outline-none focus:ring-2 focus:ring-logoOrange`}
                        placeholder="https://www.example.com"
                    />
                    {errors.website && <p className="mt-1 text-red-500 text-sm">{errors.website}</p>}
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
