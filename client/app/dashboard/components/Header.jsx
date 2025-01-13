'use client';

import { Search, Bell, Mail, Settings, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// Dummy notifications data
const dummyNotifications = [
    {
        id: 1,
        type: 'campaign',
        action: 'Create New Campaign',
        requester: 'John Doe',
        timestamp: '2024/12/19 04:28 PM',
        status: 'unread',
    },
    {
        id: 2,
        type: 'team',
        action: 'Create New Team',
        requester: 'Jane Doe',
        timestamp: '2024/12/19 04:28 PM',
        status: 'unread',
    },
    {
        id: 3,
        type: 'employee',
        action: 'New Employee Creation',
        requester: 'Ali Hamade',
        timestamp: '2024/12/19 04:28 PM',
        status: 'read',
    },
];

const Header = () => {
    const pathname = usePathname();
    const [headerText, setHeaderText] = useState('Default Page');
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const pathToTextMap = {
            '/workspace': 'Workspace Management',
            '/dashboard': 'Dashboard',
            '/analytics': 'Analytics',
            '/campaigns': 'Campaigns',
            '/reports': 'Reports',
        };

        const matchingPath = Object.keys(pathToTextMap).find((key) => pathname.startsWith(key));
        setHeaderText(pathToTextMap[matchingPath] || 'Default Page');

        // Simulating fetching notifications
        setNotifications(dummyNotifications);
    }, [pathname]);

    const unreadCount = notifications.filter(n => n.status === 'unread').length;

    const handleNotificationClick = (id) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, status: 'read' } : n
        ));
    };

    return (
        <header className="flex h-16 items-center bg-gray-200 px-6 w-full">
            <div className="flex justify-start items-center">
                <h1 className="text-lg font-semibold text-gray-800 text-nowrap">
                    {headerText}
                </h1>
            </div>
            <div className="flex justify-end w-full">
                <div className="flex max-w-xl px-8">
                    <div className="content-center relative w-full">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-offWhite" />
                        <input
                            placeholder="Search..."
                            className="w-full rounded-md border border-softBlack bg-mediumGrey py-1.5 pl-10 pr-4 text-sm text-offWhite placeholder:text-offWhite focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-offWhite"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="relative">
                        <button 
                            className="rounded-full p-2 text-gray-700 hover:bg-gray-200/50"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <Bell className="h-5 w-5" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                                <div className="py-2">
                                    <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
                                        <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                                        <button onClick={() => setShowNotifications(false)}>
                                            <X className="h-4 w-4 text-gray-500" />
                                        </button>
                                    </div>
                                    {notifications.length === 0 ? (
                                        <p className="px-4 py-2 text-sm text-gray-500">No new notifications</p>
                                    ) : (
                                        <div className="max-h-64 overflow-y-auto">
                                            {notifications.map((notification) => (
                                                <Link
                                                    key={notification.id}
                                                    href={`/alerts/${notification.id}`}
                                                    className={`block px-4 py-2 hover:bg-gray-100 ${
                                                        notification.status === 'unread' ? 'bg-blue-50' : ''
                                                    }`}
                                                    onClick={() => handleNotificationClick(notification.id)}
                                                >
                                                    <p className="text-sm font-medium text-gray-900">{notification.action}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {notification.requester} - {notification.timestamp}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                    <div className="px-4 py-2 bg-gray-100">
                                        <Link href="/alerts" className="text-sm text-logoOrange hover:text-logoOrange/80">
                                            View all notifications
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <button className="rounded-full p-2 text-gray-700 hover:bg-gray-200/50">
                        <Mail className="h-5 w-5" />
                    </button>
                    <button className="rounded-full p-2 text-gray-700 hover:bg-gray-200/50">
                        <img src="/lumiIcon.png" alt="Settings" className="h-10 w-15" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

