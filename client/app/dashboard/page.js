import React from 'react';
import { UserStats } from './components/UserStats';
import { PhaseCard } from './components/PhaseCard';
import { Plus } from "lucide-react";

export default function DashboardPage() {
    const leftStats = [
        { title: "Total Users", count: 750 },
        { title: "Creative Strategist", count: 2 },
        { title: "Technology Strategist", count: 5 },
        { title: "Market Researcher", count: 8 },
        { title: "User Researcher Specialist", count: 6 },
        { title: "UX Designer", count: 8 },
        { title: "UI Designer", count: 6 },
        { title: "UI/UX Designer", count: 2 },
        { title: "Information Architect", count: 7 },
        { title: "Data Analyst", count: 7 },
    ];

    const rightStats = [
        { title: "Software Developers", count: 6 },
        { title: "Creative Designer", count: 5 },
        { title: "Data Scientist", count: 3 },
        { title: "CRO Specialist", count: 3 },
        { title: "Content Strategist", count: 8 },
        { title: "Project Manager", count: 5 },
        { title: "Research & Planning Manager", count: 6 },
        { title: "Creative Manager", count: 5 },
        { title: "Design Manager", count: 7 },
        { title: "Performance & Execution Manager", count: 2 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <nav className="flex space-x-1">
                    {["Users", "Team", "Campaign", "Client", "Alerts"].map((tab) => (
                        <button
                            key={tab}
                            variant={tab === "Users" ? "secondary" : "ghost"}
                            className="rounded-none border-b-2 border-transparent px-4 py-2 text-sm"
                            style={{
                                borderBottomColor: tab === "Users" ? "#FF8A00" : "transparent",
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="rounded-lg border border-[#E7E7E7] bg-[#FAFAFA] p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-[#2C3333]">Users</h2>
                    <button className="flex items-center gap-2 px-4 py-2 text-softBlack text-white rounded-lg hover:mediumGrey transition duration-300">
                        <Plus className="w-5 h-5" />
                        Add New User
                    </button>
                </div>

                <UserStats leftStats={leftStats} rightStats={rightStats} />

                <button
                    variant="outline"
                    className="text-xl font-semibold text-[#2C3333] mt-10 rounded-lg px-4 py-2 hover:bg-lightGrey hover:text-softBlack"
                >
                    View All Users
                </button>


                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <PhaseCard title="Strategy Phase Users" managers={5} members={50} />
                    <PhaseCard title="Design Phase Users" managers={5} members={50} />
                    <PhaseCard title="Prototype Phase Users" managers={5} members={50} />
                    <PhaseCard title="Analysis Phase Users" managers={5} members={50} />
                </div>
            </div>
        </div>
    );
}

