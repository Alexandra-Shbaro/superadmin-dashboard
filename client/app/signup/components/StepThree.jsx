'use client';

import { useState } from 'react';

const StepThree = ({ onNext }) => {
    const [companyAbout, setCompanyAbout] = useState('')
    const [companyVision, setCompanyVision] = useState('')
    const [companyMission, setCompanyMission] = useState('')

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-offWhite">
            {/* Progress indicators */}
            <div className="flex items-center space-x-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-mediumGrey text-offWhite flex items-center justify-center">1</div>
                <div className="w-16 h-0.5 bg-lightGrey"></div>
                <div className="w-6 h-6 rounded-full bg-mediumGrey text-offWhite flex items-center justify-center">2</div>
                <div className="w-16 h-0.5 bg-lightGrey"></div>
                <div className="w-6 h-6 rounded-full bg-logoOrange text-offWhite flex items-center justify-center">3</div>
            </div>

            <h1 className="font-bold text-lg mb-6">Company Overview</h1>

            <div className="bg-offWhite shadow-md rounded-lg p-8 w-full max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left column */}
                    <div className="h-full">
                        <div className="space-y-2">
                            <label className="block text-mediumGrey font-medium">About The Company</label>
                            <textarea
                                value={companyAbout}
                                onChange={(e) => setCompanyAbout(e.target.value)}
                                className="mt-2 p-2 w-full min-h-[360px] bg-gray-50 resize-none border border-lightGrey rounded-md focus:ring-2 focus:ring-logoOrange focus:outline-none"
                                placeholder="About The Company"
                            />
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-mediumGrey font-medium">Vision</label>
                            <textarea
                                value={companyVision}
                                onChange={(e) => setCompanyVision(e.target.value)}
                                className="mt-2 p-2 w-full min-h-[150px] bg-gray-50 resize-none border border-lightGrey rounded-md focus:ring-2 focus:ring-logoOrange focus:outline-none"
                                placeholder="Vision"
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <label className="block text-mediumGrey font-medium">Mission</label>
                            <textarea
                                value={companyMission}
                                onChange={(e) => setCompanyMission(e.target.value)}
                                className="mt-2 p-2 w-full min-h-[150px] bg-gray-50 resize-none border border-lightGrey rounded-md focus:ring-2 focus:ring-logoOrange focus:outline-none"
                                placeholder="Mission"
                            />
                        </div>
                    </div>
                </div>

                {/* Next button */}
                <div className="mt-6">
                    <button 
                        onClick={onNext}
                        className="w-full py-3 bg-logoOrange text-offWhite rounded-md hover:bg-logoYellow transition-all"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StepThree;
