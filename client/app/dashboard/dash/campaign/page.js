"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, ArrowUpDown } from 'lucide-react'
import CreateCampaignForm from './components/create-campaign-form'

// Custom Button component
const Button = ({ children, className, ...props }) => (
    <button
        className={`px-4 py-2 rounded-md text-sm font-medium ${className}`}
        {...props}
    >
        {children}
    </button>
)

// Custom Card component
const Card = ({ children, className, ...props }) => (
    <div className={`bg-white rounded-lg shadow-md ${className}`} {...props}>
        {children}
    </div>
)

// Sample data
const currentCampaigns = [
    {
        name: "Campaign One",
        stage: "Analysis",
        team: "Team One",
        projectManager: "John Doe",
        latestContribution: "Tue 7 January 2025, 11:00 AM"
    },
    {
        name: "Campaign Two",
        stage: "Design",
        team: "Team Two",
        projectManager: "John Snow",
        latestContribution: "Tue 7 January 2025, 11:00 AM"
    },
    {
        name: "Campaign Three",
        stage: "Prototype",
        team: "Team Three",
        projectManager: "John Smith",
        latestContribution: "Tue 7 January 2025, 11:00 AM"
    }
]

const requestedCampaigns = [
    {
        requestId: "001",
        projectManager: "John Doe",
        teamLead: "Mary Beth",
        requestedCampaign: "Pepsi",
        requestDate: "Tue 7 January 2025, 11:00 AM"
    },
    {
        requestId: "002",
        projectManager: "Jane Doe",
        teamLead: "Tony Beth",
        requestedCampaign: "7up",
        requestDate: "Tue 7 January 2025, 11:00 AM"
    }
]

// SortableHeader component
const SortableHeader = ({ children }) => (
    <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
        {children}
        <ArrowUpDown className="w-4 h-4" />
    </div>
)

export default function CampaignManagement() {
    const [currentPage, setCurrentPage] = useState(1)
    const [showCreateForm, setShowCreateForm] = useState(false)

    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-softBlack">Campaign Management</h1>
                <Button 
                    onClick={() => setShowCreateForm(true)}
                    className="p-2 text-white text-sm bg-logoOrange rounded-lg hover:bg-orange-500 transition duration-300 flex items-center"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Campaign
                </Button>
            </div>

            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Current Campaigns</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    <SortableHeader>Campaign Name</SortableHeader>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    <SortableHeader>Stage</SortableHeader>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    <SortableHeader>Team</SortableHeader>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    <SortableHeader>Project Manager</SortableHeader>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Latest Contribution
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentCampaigns.map((campaign, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {campaign.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.stage}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.team}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.projectManager}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.latestContribution}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-center mt-4">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex items-center space-x-1">
                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                                        currentPage === page
                                            ? "bg-logoOrange text-white"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            disabled={currentPage === 3}
                            className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Requested Campaigns</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Manager</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team Lead</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requested Campaign</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {requestedCampaigns.map((campaign, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {campaign.requestId}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.projectManager}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.teamLead}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.requestedCampaign}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.requestDate}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            {showCreateForm && (
                <CreateCampaignForm
                    onClose={() => setShowCreateForm(false)}
                    onSuccess={() => {
                        setShowCreateForm(false)
                        // Optionally refresh campaigns data here
                    }}
                />
            )}
        </div>
    )
}

