"use client"

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Sample notifications data
const initialNotifications = [
    {
        id: 1,
        type: 'campaign',
        action: 'Create New Campaign',
        requester: 'John Doe',
        timestamp: '2024/12/19 04:28 PM',
        status: 'pending',
        details: {
            name: 'Summer Campaign 2024',
            description: 'Promotional campaign for summer season',
            startDate: '2024-06-01',
            endDate: '2024-08-31',
            budget: 50000,
            objectives: ['Increase sales by 20%', 'Boost brand awareness'],
            targetAudience: 'Young adults, 18-35',
            channels: ['Social Media', 'Email', 'Display Ads']
        }
    },
    {
        id: 2,
        type: 'team',
        action: 'Create New Team',
        requester: 'Jane Doe',
        timestamp: '2024/12/19 04:28 PM',
        status: 'pending',
        details: {
            name: 'Digital Marketing Team',
            description: 'Team focused on digital marketing initiatives',
            department: 'Marketing',
            manager: 'Jane Doe',
            members: [
                { name: 'John Smith', role: 'Social Media Specialist' },
                { name: 'Sarah Johnson', role: 'Content Writer' }
            ]
        }
    },
    {
        id: 3,
        type: 'employee',
        action: 'New Employee Creation',
        requester: 'Ali Hamade',
        timestamp: '2024/12/19 04:28 PM',
        status: 'pending',
        details: {
            name: 'Mike Wilson',
            position: 'Senior Developer',
            department: 'Engineering',
            startDate: '2024-01-15',
            salary: 85000,
            manager: 'Ali Hamade'
        }
    }
]

export default function AlertsPage() {
    const [notifications, setNotifications] = useState(initialNotifications)
    const router = useRouter()

    const handleNotificationClick = (notification) => {
        router.push(`/dashboard/dash/alerts/${notification.id}`)
    }

    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Alerts</h1>
            </div>

            <div className="bg-white rounded-lg shadow">
                {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        No new notifications
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                onClick={() => handleNotificationClick(notification)}
                                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 flex items-center justify-between"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {notification.action}
                                        </h3>
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                                            {notification.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Requested by {notification.requester}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {notification.timestamp}
                                    </p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

