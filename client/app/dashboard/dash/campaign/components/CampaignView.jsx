"use client"

import { X } from 'lucide-react'

export default function CampaignView({ campaign, onClose, onStatusChange }) {
    // This would normally come from props, using sample data for demonstration
    const campaignData = {
        title: "Holiday Marketing Campaign",
        status: "Active",
        client: "TechGear Innovations",
        startDate: "November 15, 2024",
        endDate: "January 1, 2025",
        description: "This campaign is a digital marketing campaign targeting holiday shoppers for TechGear Innovation's latest product line. The campaign will utilize various brand awareness, social selling tools, and highly targeted ads through multi-channel marketing analytics.",
        phases: [
            { name: "Strategy", date: "Nov 15" },
            { name: "Design", date: "Dec 1" },
            { name: "Prototype", date: "Dec 15" },
            { name: "Analysis", date: "Dec 30" }
        ],
        teamComposition: {
            projectManager: { name: "Emily Rodriguez", email: "emily.rodriguez@company.com" },
            creativeManager: { name: "Ben Hernandez", email: "ben.h@company.com" },
            designTeamLead: { name: "Emily Doe", email: "emily.doe@company.com" }
        },
        teamMembers: [
            { role: "Graphic Designer", name: "Alexander Wang", email: "a.wang@company.com" },
            { role: "Client Relationship", name: "Alexandra Wang", email: "alex.w@company.com" },
            { role: "Content Strategist", name: "John Doe", email: "john.d@company.com" },
            { role: "UX/UI Designer", name: "Jane Doe", email: "jane.d@company.com" },
            { role: "Information Architect", name: "Alex Thompson", email: "alex.t@company.com" },
            { role: "Market Researcher", name: "Lauren Kim", email: "lauren.k@company.com" },
            { role: "Data Analyst", name: "David Martinez", email: "david.m@company.com" },
            { role: "Operations Manager", name: "Rachel Rose", email: "rachel.r@company.com" }
        ],
        budget: {
            total: 30000,
            advertising: 10000,
            analyticsTools: 2000
        }
    };

    const handleClose = () => {
        onStatusChange?.(campaign, 'Closed');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-semibold text-gray-800">{campaignData.title}</h2>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                {campaignData.status}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Campaign Overview */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-800">Campaign Overview</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Client</p>
                                <p className="font-medium">{campaignData.client}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Start Date</p>
                                <p className="font-medium">{campaignData.startDate}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">End Date</p>
                                <p className="font-medium">{campaignData.endDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Campaign Description */}
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium text-gray-800">Campaign Description</h3>
                        <p className="text-gray-600">{campaignData.description}</p>
                    </div>

                    {/* Project Phases Timeline */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-800">Project Phases Timeline</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {campaignData.phases.map((phase) => (
                                <div key={phase.name} className="p-3 bg-gray-50 rounded-lg">
                                    <p className="font-medium">{phase.name}</p>
                                    <p className="text-sm text-gray-600">{phase.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Composition */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-800">Team Composition</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {Object.entries(campaignData.teamComposition).map(([role, member]) => (
                                <div key={role} className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600 capitalize">{role.replace(/([A-Z])/g, ' $1').trim()}</p>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-sm text-gray-500">{member.email}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Team Members */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-800">Team Members</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {campaignData.teamMembers.map((member) => (
                                <div key={member.email} className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600">{member.role}</p>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-sm text-gray-500">{member.email}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Budget and Resources */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-800">Budget and Resources</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Total Budget</p>
                                <p className="font-medium">${campaignData.budget.total}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Advertising Spend</p>
                                <p className="font-medium">${campaignData.budget.advertising}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600">Analytics & Tools</p>
                                <p className="font-medium">${campaignData.budget.analyticsTools}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-6">
                        <button
                            onClick={() => {/* Handle edit */}}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Edit Campaign
                        </button>
                        <button
                            onClick={() => {/* Handle report generation */}}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Generate Report
                        </button>
                        <button
                            onClick={handleClose}
                            className="px-4 py-2 bg-logoOrange hover:bg-orange-600 text-white rounded-md text-sm font-medium"
                        >
                            Close Campaign
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

