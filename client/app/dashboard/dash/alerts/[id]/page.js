"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Check, X } from 'lucide-react'

// This would typically come from an API or database
const getNotificationById = (id) => {
    return initialNotifications.find(n => n.id === parseInt(id))
}

export default function RequestDetails({ params }) {
    const router = useRouter()
    const [showRejectModal, setShowRejectModal] = useState(false)
    const [rejectionReason, setRejectionReason] = useState('')
    const notification = getNotificationById(params.id)

    if (!notification) {
        return <div>Request not found</div>
    }

    const handleApprove = () => {
        // Here you would typically make an API call to approve the request
        // and create the team/campaign/employee
        console.log('Approved:', notification)
        router.push('/dashboard/dash/alerts')
    }

    const handleReject = () => {
        if (!rejectionReason.trim()) {
            alert('Please provide a reason for rejection')
            return
        }
        // Here you would typically make an API call to reject the request
        console.log('Rejected:', notification, 'Reason:', rejectionReason)
        router.push('/dashboard/dash/alerts')
    }

    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Alerts
            </button>

            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            {notification.action}
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Requested by {notification.requester} on {notification.timestamp}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowRejectModal(true)}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Reject
                        </button>
                        <button
                            onClick={handleApprove}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                        >
                            <Check className="w-4 h-4 mr-2" />
                            Approve
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Request Details */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Request Details</h2>
                        {Object.entries(notification.details).map(([key, value]) => (
                            <div key={key} className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                                {Array.isArray(value) ? (
                                    <div className="space-y-2">
                                        {value.map((item, index) => (
                                            <div key={index} className="text-sm text-gray-900">
                                                {typeof item === 'object' 
                                                    ? `${item.name} - ${item.role}`
                                                    : item
                                                }
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-sm text-gray-900">
                                        {typeof value === 'object' 
                                            ? JSON.stringify(value, null, 2)
                                            : value
                                        }
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reject Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">
                            Reject Request
                        </h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Reason for Rejection
                            </label>
                            <textarea
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={4}
                                placeholder="Please provide a reason for rejection..."
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReject}
                                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                            >
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

