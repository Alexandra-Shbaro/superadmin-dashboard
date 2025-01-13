"use client"

import { useState } from 'react'
import { X, Calendar } from 'lucide-react'

export default function CreateClientForm({ onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        // Client Basic Information
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        clientWebsite: '',
        clientAddress: '',
        industry: '',

        // Client Representative Information
        repName: '',
        repPhone: '',
        repEmail: '',
        repPosition: '',

        // Authentication Details
        username: '',
        email: '',
        password: '',
        confirmPassword: '',

        // Administrative Fields
        dateCreated: new Date().toISOString().split('T')[0],
        subscriptionPlan: 'basic'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        onSuccess(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Create New Client</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Client Basic Information */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-4">Client Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    name="clientName"
                                    placeholder="Client Name"
                                    required
                                    value={formData.clientName}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <input
                                    type="tel"
                                    name="clientPhone"
                                    placeholder="Client Phone Number"
                                    required
                                    value={formData.clientPhone}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <input
                                    type="email"
                                    name="clientEmail"
                                    placeholder="Client Email"
                                    required
                                    value={formData.clientEmail}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <input
                                    type="url"
                                    name="clientWebsite"
                                    placeholder="Client Website URL"
                                    value={formData.clientWebsite}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <input
                                    type="text"
                                    name="clientAddress"
                                    placeholder="Client Address"
                                    required
                                    value={formData.clientAddress}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <input
                                    type="text"
                                    name="industry"
                                    placeholder="Industry"
                                    required
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>

                        {/* Client Representative Information */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-700 mb-4">Client Representative Basic Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="repName"
                                    placeholder="Client Representative Name"
                                    required
                                    value={formData.repName}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <input
                                    type="tel"
                                    name="repPhone"
                                    placeholder="Client Representative Phone Number"
                                    required
                                    value={formData.repPhone}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <input
                                    type="email"
                                    name="repEmail"
                                    placeholder="Client Representative Email"
                                    required
                                    value={formData.repEmail}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <input
                                    type="text"
                                    name="repPosition"
                                    placeholder="Client Representative Position"
                                    required
                                    value={formData.repPosition}
                                    onChange={handleChange}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Authentication Details */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-700 mb-4">Authentication Details</h3>
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Temporary Password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>

                            {/* Administrative Fields */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-700 mb-4">Administrative Fields</h3>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="dateCreated"
                                            placeholder='Date Created'
                                            required
                                            value={formData.dateCreated}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                        <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>
            
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-logoOrange text-white rounded-md text-sm font-medium hover:bg-orange-600"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

