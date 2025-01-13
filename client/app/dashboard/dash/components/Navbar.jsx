"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 

export function Navbar() {
  const [activeTab, setActiveTab] = useState("Users");
  const router = useRouter(); 

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    const pathMap = {
      Users: "/dashboard/dash/users",
      Team: "/dashboard/dash/team",
      Campaign: "/dashboard/dash/campaign",
      Client: "/dashboard/dash/client",
      Alerts: "/dashboard/dash/alerts",
    };

    if (pathMap[tab]) {
      router.push(pathMap[tab]); 
    }
  };

  return (
    <div className="bg-gray-200 p-1 rounded-t-lg">
      <nav className="flex">
        {["Users", "Team", "Campaign", "Client", "Alerts"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-6 py-2 text-sm font-medium rounded-t-lg transition-colors ${
              activeTab === tab
                ? "bg-white text-gray-900"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}
