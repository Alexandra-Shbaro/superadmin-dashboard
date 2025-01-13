"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, ArrowLeft, Eye, Edit, Trash2 } from 'lucide-react'
import CreateTeamForm from './CreateTeamForm'

const Button = ({ children, className, ...props }) => (
    <button
        className={`px-4 py-2 rounded-md text-sm font-medium ${className}`}
        {...props}
    >
        {children}
    </button>
)

const initialTeams = [
    { id: 1, name: "Team One", manager: "John Doe", status: "Active" },
    { id: 2, name: "Team Two", manager: "Jane Doe", status: "Inactive" },
    { id: 3, name: "Team Three", manager: "Jackson Doe", status: "Active" },
    { id: 4, name: "Team Four", manager: "Jamie Doe", status: "Active" },
    { id: 5, name: "Team Five", manager: "Sally Salloum", status: "Inactive" },
    { id: 6, name: "Team Six", manager: "Dana Herb", status: "Active" },
    { id: 7, name: "Team Six", manager: "Alexander Wang", status: "Active" },
    { id: 8, name: "Team Seven", manager: "Carlie Bakhazi", status: "Inactive" },
    { id: 9, name: "Team Eight", manager: "Elias Bakhzie", status: "Active" },
    { id: 10, name: "Team Nine", manager: "Karen Wazen", status: "Active" },
    { id: 11, name: "Team Ten", manager: "Selena Itani", status: "Inactive" },
    { id: 12, name: "Team Eleven", manager: "Alex Doe", status: "Active" },
    { id: 13, name: "Team Twelve", manager: "Adam Salloum", status: "Inactive" },
    { id: 14, name: "Team Six", manager: "Fouad Daoud", status: "Active" },
];

export default function TeamsListView({ onBack }) {
    const [teams, setTeams] = useState(initialTeams);
    const [currentPage, setCurrentPage] = useState(1);
    const [teamStatuses, setTeamStatuses] = useState(
        teams.reduce((acc, team) => ({
            ...acc,
            [team.id]: team.status
        }), {})
    );
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const teamsPerPage = 10;
    const indexOfLastTeam = currentPage * teamsPerPage;
    const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
    const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

    const toggleStatus = (teamId) => {
        setTeamStatuses(prev => ({
            ...prev,
            [teamId]: prev[teamId] === "Active" ? "Inactive" : "Active"
        }));
    };

    const confirmDelete = (e, index) => {
        e.stopPropagation();
        setDeleteIndex(index);
    };

    const cancelDelete = () => {
        setDeleteIndex(null);
    };

    const deleteTeam = () => {
        if (deleteIndex !== null) {
            const newTeams = teams.filter((_, i) => i !== deleteIndex);
            setTeams(newTeams);
            setDeleteIndex(null);
        }
    };

    const handleCreateSuccess = (newTeam) => {
        setTeams([...teams, newTeam]);
        setShowCreateForm(false);
    };

    const totalPages = Math.ceil(teams.length / teamsPerPage);

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-xl font-semibold text-softBlack">Teams</h1>
                </div>
                <Button 
                    onClick={() => setShowCreateForm(true)}
                    className="p-2 text-white text-sm bg-logoOrange rounded-lg hover:bg-orange-500 transition duration-300 flex items-center"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Team
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Team Manager</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentTeams.map((team, index) => (
                            <tr key={team.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {team.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {team.manager}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span 
                                        onClick={() => toggleStatus(team.id)}
                                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                                            teamStatuses[team.id] === "Active"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {teamStatuses[team.id]}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                    <button
                                        onClick={() => {/* Add view function here */}}
                                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                                    >
                                        <Eye className="w-5 h-5 inline" />
                                    </button>
                                    <button
                                        onClick={() => {/* Add edit function here */}}
                                        className="text-blue-600 hover:text-blue-900 mr-2"
                                    >
                                        <Edit className="w-5 h-5 inline" />
                                    </button>
                                    <button
                                        onClick={(e) => confirmDelete(e, index)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <Trash2 className="w-5 h-5 inline" />
                                    </button>
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

            {/* Delete Confirmation Popup */}
            {deleteIndex !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                        <p className="mb-4">Are you sure you want to delete this team?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={deleteTeam}
                                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Team Form Popup */}
            {showCreateForm && (
                <CreateTeamForm
                    onClose={() => setShowCreateForm(false)}
                    onSuccess={handleCreateSuccess}
                />
            )}
        </div>
    );
}

