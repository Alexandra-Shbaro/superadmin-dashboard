"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, ArrowUpDown, Eye, Edit, X, Trash2 } from 'lucide-react'
import Requests from '../../components/Requests'
import CreateTeamForm from './CreateTeamForm'

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

const initialTeams = [
    { id: 1, name: "Team One", manager: "John Doe", status: "Active", description: "Core development team", department: "Engineering" },
    { id: 2, name: "Team Two", manager: "Jane Doe", status: "Inactive", description: "UI/UX design team", department: "Design" },
    { id: 3, name: "Team Three", manager: "Jackson Doe", status: "Active", description: "Marketing and PR team", department: "Marketing" },
    { id: 4, name: "Team Four", manager: "Jamie Doe", status: "Active", description: "Customer support team", department: "Support" },
    { id: 5, name: "Team Five", manager: "Sally Salloum", status: "Inactive", description: "Data analysis team", department: "Analytics" },
];

const initialRequests = [
    { id: "001", requester: "Charlie Davis", requestedTeam: "Mobile Development", requestDate: "2024-03-08" },
    { id: "002", requester: "Grace Lee", requestedTeam: "Data Science", requestDate: "2024-03-15" },
];

export default function TeamsListView({ onBack }) {
    const [teams, setTeams] = useState(initialTeams);
    const [requests, setRequests] = useState(initialRequests);
    const [currentPage, setCurrentPage] = useState(1);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [showViewTeamPopup, setShowViewTeamPopup] = useState(false);
    const teamsPerPage = 10;
    const indexOfLastTeam = currentPage * teamsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
    const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

    const handleApproveRequest = (request) => {
        const newTeam = {
            id: teams.length + 1,
            name: request.requestedTeam,
            manager: request.requester,
            status: "Active",
            department: "Pending Assignment"
        };
        setTeams([...teams, newTeam]);
        setRequests(requests.filter(r => r.id !== request.id));
    };

    const handleRejectRequest = (request, reason) => {
        console.log(`Request ${request.id} rejected. Reason: ${reason}`);
        setRequests(requests.filter(r => r.id !== request.id));
    };

    const handleViewTeam = (team) => {
        setSelectedTeam(team);
        setShowViewTeamPopup(true);
    };

    const handleEditTeam = (team) => {
        setSelectedTeam(team);
        setShowCreateForm(true);
    };

    const handleDeleteTeam = (teamId) => {
        setTeams(teams.filter(team => team.id !== teamId));
    };

    const totalPages = Math.ceil(teams.length / teamsPerPage);

    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-softBlack">Team Management</h1>
                <Button 
                    onClick={() => setShowCreateForm(true)}
                    className="p-2 text-white text-sm bg-logoOrange rounded-lg hover:bg-orange-500 transition duration-300 flex items-center"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Team
                </Button>
            </div>

            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Current Teams</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    <SortableHeader>Team Name</SortableHeader>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    <SortableHeader>Team Manager</SortableHeader>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    <SortableHeader>Department</SortableHeader>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentTeams.map((team) => (
                                <tr 
                                    key={team.id} 
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {team.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {team.manager}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {team.department}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span 
                                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                team.status === 'Active' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {team.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            <button onClick={() => handleViewTeam(team)}>
                                                <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                            </button>
                                            <button onClick={() => handleEditTeam(team)}>
                                                <Edit className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                                            </button>
                                            <button onClick={() => handleDeleteTeam(team.id)}>
                                                <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700" />
                                            </button>
                                        </div>
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
                    type="team"
                    onApprove={handleApproveRequest}
                    onReject={handleRejectRequest}
                />
            </Card>
            {showCreateForm && (
                <CreateTeamForm
                    team={selectedTeam}
                    isEditing={!!selectedTeam}
                    onClose={() => {
                        setShowCreateForm(false);
                        setSelectedTeam(null);
                    }}
                    onSuccess={(updatedTeam) => {
                        if (selectedTeam) {
                            setTeams(teams.map(team => team.id === updatedTeam.id ? updatedTeam : team));
                        } else {
                            setTeams([...teams, updatedTeam]);
                        }
                        setShowCreateForm(false);
                        setSelectedTeam(null);
                    }}
                />
            )}
            {showViewTeamPopup && selectedTeam && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-[600px] max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">View Team Details</h2>
                            <button onClick={() => setShowViewTeamPopup(false)} className="text-gray-500 hover:text-gray-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                                <p className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50">{selectedTeam.name}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Team Description</label>
                                <p className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50">{selectedTeam.description}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Department / Phase</label>
                                <p className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50">{selectedTeam.department}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Team Manager</label>
                                <p className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50">{selectedTeam.manager}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <p className="mt-1 p-2 block w-full rounded-md border border-gray-300 bg-gray-50">{selectedTeam.status}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

