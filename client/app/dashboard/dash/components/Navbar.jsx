"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const [activeTab, setActiveTab] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const tabs = ["Users", "Team", "Campaign", "Client", "Alerts"];

  const pathMap = {
    users: "Users",
    team: "Team",
    campaign: "Campaign",
    client: "Client",
    alerts: "Alerts",
  };

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1].toLowerCase();
    const matchedTab = pathMap[lastSegment] || "Users"; // Default to "Users" if no match
    setActiveTab(matchedTab);
  }, [pathname]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    const reversedPathMap = {
      Users: "/dashboard/dash/users",
      Team: "/dashboard/dash/team",
      Campaign: "/dashboard/dash/campaign",
      Client: "/dashboard/dash/client",
      Alerts: "/dashboard/dash/alerts",
    };

    if (reversedPathMap[tab]) {
      router.push(reversedPathMap[tab]);
    }
  };

  return (
    <div className="bg-gray-200 p-1 rounded-t-lg">
      <nav className="flex">
        {tabs.map((tab) => (
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

