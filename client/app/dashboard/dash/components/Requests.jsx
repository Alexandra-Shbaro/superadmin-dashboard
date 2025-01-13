"use client"

import { useState } from 'react'
import { X, Check, XCircle } from 'lucide-react'

export default function Requests({ requests, type, onApprove, onReject }) {
    const [selectedRequest, setSelectedRequest] = useState(null)
    const [showRejectionBox, setShowRejectionBox] = useState(false)
    const [rejectionReason, setRejectionReason] = useState('')

    const handleApprove = () => {
        onApprove(selectedRequest)
        setSelectedRequest(null)
    }

    const handleReject = () => {
        if (showRejectionBox) {
            onReject(selectedRequest, rejectionReason)
            setSelectedRequest(null)
            setShowRejectionBox(false)
            setRejectionReason('')
        } else {
            setShowRejectionBox(true)
        }
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Requested {type === 'team' ? 'Teams' : 'Campaigns'}</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {type === 'team' ? 'Requested Team' : 'Requested Campaign'}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {requests.map((request) => (
                            <tr 
                                key={request.id} 
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => setSelectedRequest(request)}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.requester}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {type === 'team' ? request.requestedTeam : request.requestedCampaign}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.requestDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Request Details</h3>
                            <button onClick={() => setSelectedRequest(null)} className="text-gray-400 hover:text-gray-500">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <p><strong>Request ID:</strong> {selectedRequest.id}</p>
                            <p><strong>Requester:</strong> {selectedRequest.requester}</p>
                            <p><strong>{type === 'team' ? 'Requested Team' : 'Requested Campaign'}:</strong> {type === 'team' ? selectedRequest.requestedTeam : selectedRequest.requestedCampaign}</p>
                            <p><strong>Request Date:</strong> {selectedRequest.requestDate}</p>
                            {showRejectionBox ? (
                                <div className="space-y-2">
                                    <label htmlFor="rejectionReason" className="block text-sm font-medium text-gray-700">
                                        Rejection Reason
                                    </label>
                                    <textarea
                                        id="rejectionReason"
                                        rows="3"
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                    ></textarea>
                                </div>
                            ) : null}
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={handleReject}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                                >
                                    {showRejectionBox ? 'Confirm Reject' : 'Reject'}
                                    <XCircle className="ml-2 -mr-1 h-5 w-5" />
                                </button>
                                {!showRejectionBox && (
                                    <button
                                        onClick={handleApprove}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                                    >
                                        Approve
                                        <Check className="ml-2 -mr-1 h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
