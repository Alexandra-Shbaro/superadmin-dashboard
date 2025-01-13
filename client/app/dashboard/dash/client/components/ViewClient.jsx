import { X } from 'lucide-react'

export default function ViewClient({ client, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Client Details</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="space-y-4">
                    <p><strong>Name:</strong> {client.name}</p>
                    <p><strong>Representative:</strong> {client.representative}</p>
                    <p><strong>Status:</strong> {client.status}</p>
                    {/* Add more client details here */}
                </div>
                <div className="mt-6">
                    <button
                        onClick={onClose}
                        className="w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}

