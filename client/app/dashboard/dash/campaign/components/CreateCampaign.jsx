"use client"

import { useState } from 'react'
import { X, Plus, Calendar } from 'lucide-react'

export default function CreateCampaignForm({ onClose, onSuccess }) {
    const [teams, setTeams] = useState([{ id: 1 }]);

    const addTeam = () => {
        const newId = teams.length + 1;
        setTeams([...teams, { id: newId }]);
    };

    const removeTeam = (id) => {
        setTeams(teams.filter(team => team.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add form submission logic here
        onSuccess?.();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-semibold">Create New Campaign</h2>
                        <button
                            type="button"
                            className="p-2 hover:bg-gray-100 rounded-full"
                            onClick={onClose}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="grid gap-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                    Campaign Title
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                                    Client
                                </label>
                                <input
                                    id="client"
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Campaign Description
                                </label>
                                <input
                                    id="description"
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                                    Campaign Start Date
                                </label>
                                <div className="relative">
                                    <input
                                        id="startDate"
                                        type="date"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                                    Campaign End Date
                                </label>
                                <div className="relative">
                                    <input
                                        id="endDate"
                                        type="date"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                                </div>
                            </div>
                        </div>

                        {/* Phase Timelines */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {['Strategy', 'Design', 'Prototype', 'Analysis'].map((phase) => (
                                <div key={phase} className="space-y-4 p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-medium">{phase} Phase Timeline</h3>
                                    <div className="space-y-2">
                                        <label htmlFor={`${phase.toLowerCase()}Start`} className="block text-sm font-medium text-gray-700">
                                            Start Date
                                        </label>
                                        <div className="relative">
                                            <input
                                                id={`${phase.toLowerCase()}Start`}
                                                type="date"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor={`${phase.toLowerCase()}End`} className="block text-sm font-medium text-gray-700">
                                            End Date
                                        </label>
                                        <div className="relative">
                                            <input
                                                id={`${phase.toLowerCase()}End`}
                                                type="date"
                                                required
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Management Roles */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                'Project Manager',
                                'Research & Planning Manager',
                                'Performance & Execution Manager',
                                'Creative Manager',
                                'Design Manager'
                            ].map((role) => (
                                <div key={role} className="space-y-2">
                                    <label htmlFor={role.toLowerCase().replace(/ /g, '-')} className="block text-sm font-medium text-gray-700">
                                        {role}
                                    </label>
                                    <select
                                        id={role.toLowerCase().replace(/ /g, '-')}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        <option value="">Select Manager</option>
                                        <option value="john-doe">John Doe</option>
                                        <option value="jane-smith">Jane Smith</option>
                                        <option value="mike-johnson">Mike Johnson</option>
                                    </select>
                                </div>
                            ))}
                        </div>

                        {/* Teams */}
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">Teams</label>
                            <div className="space-y-3">
                                {teams.map((team) => (
                                    <div key={team.id} className="flex gap-2">
                                        <select
                                            required
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        >
                                            <option value="">Select Team</option>
                                            <option value="team-1">Team One</option>
                                            <option value="team-2">Team Two</option>
                                            <option value="team-3">Team Three</option>
                                        </select>
                                        {teams.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeTeam(team.id)}
                                                className="p-2 hover:bg-gray-100 rounded-full"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                {teams.length < 3 && (
                                    <button
                                        type="button"
                                        onClick={addTeam}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Team
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Budget Information */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="totalBudget" className="block text-sm font-medium text-gray-700">
                                    Total Budget
                                </label>
                                <input
                                    id="totalBudget"
                                    type="number"
                                    min="0"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="advertisingSpend" className="block text-sm font-medium text-gray-700">
                                    Advertising Spend
                                </label>
                                <input
                                    id="advertisingSpend"
                                    type="number"
                                    min="0"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="analyticsTools" className="block text-sm font-medium text-gray-700">
                                    Analytics & Tools
                                </label>
                                <input
                                    id="analyticsTools"
                                    type="number"
                                    min="0"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-logoOrange hover:bg-orange-600 text-white rounded-md text-sm font-medium"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

