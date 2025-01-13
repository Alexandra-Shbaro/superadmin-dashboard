"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, ArrowUpDown } from 'lucide-react'
import Requests from "../components/Requests"
const Button = ({ children, className, ...props }) => (
    <button
        className={`px-4 py-2 rounded-md text-sm font-medium ${className}`}
        {...props}
    >
        {children}
    </button>
)

const Card = ({ children, className, ...props }) => (
    <div className={`bg-white rounded-lg shadow-md ${className}`} {...props}>
        {children}
    </div>
)

const SortableHeader = ({ children }) => (
    <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
        {children}
        <ArrowUpDown className="w-4 h-4" />
    </div>
)

const initialCampaigns = [
    { id: 1, name: "Summer Sale", manager: "John Doe", status: "Active", stage: "Planning" },
    { id: 2, name: "Holiday Promotion", manager: "Jane Smith", status: "Inactive", stage: "Design" },
    { id: 3, name: "Product Launch", manager: "Mike Johnson", status: "Active", stage: "Execution" },
];

const initialRequests = [
    { id: "001", requester: "Alice Brown", requestedCampaign: "Back to School", requestDate: "2024-07-15" },
    { id: "002", requester: "Bob Wilson", requestedCampaign: "Black Friday", requestDate: "2024-09-01" },
];

export default function CampaignManagement() {
    const [campaigns, setCampaigns] = useState(initialCampaigns);
    const [requests, setRequests] = useState(initialRequests);
    const [currentPage, setCurrentPage] = useState(1);
    const campaignsPerPage = 10;
    const indexOfLastCampaign = currentPage * campaignsPerPage;
    const indexOfFirstCampaign = indexOfLastCampaign - campaignsPerPage;
    const currentCampaigns = campaigns.slice(indexOfFirstCampaign, indexOfLastCampaign);

    const handleApproveRequest = (request) => {
        // Logic to approve the request
        setRequests(requests.filter(r => r.id !== request.id));
    };

    const handleRejectRequest = (request, reason) => {
        // Logic to reject the request
        console.log(`Request ${request.id} rejected. Reason: ${reason}`);
        setRequests(requests.filter(r => r.id !== request.id));
    };

    const totalPages = Math.ceil(campaigns.length / campaignsPerPage);

    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-softBlack">Campaign Management</h1>
                <Button 
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
                                    <SortableHeader>Campaign Manager</SortableHeader>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    <SortableHeader>Stage</SortableHeader>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentCampaigns.map((campaign) => (
                                <tr 
                                    key={campaign.id} 
                                    className="hover:bg-gray-50 cursor-pointer"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {campaign.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.manager}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {campaign.stage}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span 
                                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                campaign.status === 'Active' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {campaign.status}
                                        </span>
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
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <Requests
                    requests={requests}
                    type="campaign"
                    onApprove={handleApproveRequest}
                    onReject={handleRejectRequest}
                />
            </Card>
        </div>
    );
}

