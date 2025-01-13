"use client";
import React, { useState } from 'react';

export function Navbar() {

    const [activeTab, setActiveTab] = useState("Users");
    const handleTabClick = (tab) => {
        setActiveTab(tab);
        // Add any additional logic for tab switching here
    };

    return(
    <div className="bg-gray-200 p-1 rounded-t-lg">
        <nav className="flex">
            {["Users", "Team", "Campaign", "Client", "Alerts"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`px-6 py-2 text-sm font-medium rounded-t-lg transition-colors
                                ${activeTab === tab
                            ? "bg-white text-gray-900"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                >
                    {tab}
                </button>
            ))}
        </nav>
    </div>
    )
}