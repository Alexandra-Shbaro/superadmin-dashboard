"use client";
import { useState } from 'react';

export default function Signup() {
    const [companyName, setCompanyName] = useState('');
    const [companyTagline, setCompanyTagline] = useState('');
    const [businessCategory, setBusinessCategory] = useState('');
    const [companySize, setCompanySize] = useState('');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-offWhite p-4">
            <div className="text-center mb-8">
                <img
                    src="/lumilogo.svg" // Replace this with the actual path to your logo
                    alt="Lumi Logo"
                    className="mx-auto w-42 h-20 mb-10" // Adjust width (w-32) and height (h-32) as per your requirements
                />

                <p className="text-mediumGrey">Finish setting up your profile</p>
            </div>

            {/* Progress Step */}
            <div className="flex items-center space-x-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-logoOrange text-offWhite flex items-center justify-center">1</div>
                <div className="w-16 h-0.5 bg-lightGrey"></div>
                <div className="w-6 h-6 rounded-full bg-mediumGrey text-offWhite flex items-center justify-center">2</div>
                <div className="w-16 h-0.5 bg-lightGrey"></div>
                <div className="w-6 h-6 rounded-full bg-mediumGrey text-offWhite flex items-center justify-center">3</div>
            </div>

            {/* Form Section */}
            <div className="bg-offWhite shadow-md rounded-lg p-8 w-full max-w-lg">
                <div className="mb-4">
                    <label className="block text-mediumGrey font-medium">Company Name</label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="mt-2 p-2 w-full border border-lightGrey rounded-md focus:outline-none focus:ring-2 focus:ring-logoOrange"
                        placeholder="Enter your company name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-mediumGrey font-medium">Company Tagline</label>
                    <input
                        type="text"
                        value={companyTagline}
                        onChange={(e) => setCompanyTagline(e.target.value)}
                        className="mt-2 p-2 w-full border border-lightGrey rounded-md focus:outline-none focus:ring-2 focus:ring-logoOrange"
                        placeholder="Enter your company tagline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-mediumGrey font-medium">Business Category</label>
                    <select
                        value={businessCategory}
                        onChange={(e) => setBusinessCategory(e.target.value)}
                        className="mt-2 p-2 w-full border border-lightGrey rounded-md focus:outline-none focus:ring-2 focus:ring-logoOrange"
                    >
                        <option value="">Select Category</option>
                        <option value="Technology">Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Retail">Retail</option>
                        <option value="Education">Education</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Energy">Energy</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Food and Beverages">Food and Beverages</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Construction">Construction</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Telecommunications">Telecommunications</option>
                        <option value="Logistics">Logistics</option>
                        <option value="Legal">Legal</option>
                        <option value="Insurance">Insurance</option>
                        <option value="Pharmaceutical">Pharmaceutical</option>
                        <option value="Non-Profit">Non-Profit</option>
                        <option value="Media">Media</option>
                        <option value="Arts">Arts</option>
                    </select>
                </div>
                <div className="mb-8">
                    <label className="block text-mediumGrey font-medium">Company Size</label>
                    <select
                        value={companySize}
                        onChange={(e) => setCompanySize(e.target.value)}
                        className="mt-2 p-2 w-full border border-lightGrey rounded-md focus:outline-none focus:ring-2 focus:ring-logoOrange"
                    >
                        <option value="">Select Size</option>
                        <option value="1-50">1-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="501-1000">501-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                    </select>
                </div>

                {/* Next Button */}
                <button className="w-full py-3 bg-logoOrange text-offWhite rounded-md hover:bg-logoYellow transition-all">
                    Next
                </button>
            </div>
        </div>
    );
}
