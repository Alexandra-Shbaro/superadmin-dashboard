'use client';

import { useState } from 'react';

const StepThree = ({ onNext }) => {
    const [companyAbout, setCompanyAbout] = useState('')
    const [companyVision, setCompanyVision] = useState('')
    const [companyMission, setCompanyMission] = useState('')

    const isFormValid = companyAbout && companyVision && companyMission;  

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-offWhite">
            <div className="text-center p-3">
                <img
                    src="/lumilogo.svg" 
                    alt="Lumi Logo"
                    className="mx-auto w-42 h-20 mb-5" 
                />
                <p className="text-mediumGrey mb-5">Finish setting up your profile</p>
            </div>
            <div className="flex items-center space-x-4 mb-8">
                <div className="w-6 h-6 rounded-full bg-mediumGrey text-offWhite flex items-center justify-center">1</div>
                <div className="w-16 h-0.5 bg-lightGrey"></div>
                <div className="w-6 h-6 rounded-full bg-mediumGrey text-offWhite flex items-center justify-center">2</div>
                <div className="w-16 h-0.5 bg-lightGrey"></div>
                <div className="w-6 h-6 rounded-full bg-logoOrange text-offWhite flex items-center justify-center">3</div>
            </div>

            <h1 className="font-bold text-lg mb-5">Company Overview</h1>

            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl mx-auto mb-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="mt-6">
                    <button
                        onClick={onNext}
                        className={`w-full py-3 ${isFormValid ? 'bg-logoOrange' : 'bg-gray-400 cursor-not-allowed'} text-offWhite rounded-md hover:bg-logoYellow transition-all`}
                        disabled={!isFormValid}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StepThree;
