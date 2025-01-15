'use client';

import { useState, useCallback } from 'react';
import { Search, Bell, Mail, X } from 'lucide-react';
import Link from 'next/link';

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

const searchableItems = [
    { title: 'Workspace Management', path: '/dashboard/workspace' },
    { title: 'Dashboard', path: '/dashboard/dash' },
    { title: 'Analytics', path: '/dashboard/analytics' },
    { title: 'Campaigns', path: '/dashboard/campaigns' },
    { title: 'Reports', path: '/dashboard/reports' },
];

const Header = () => {
    const [headerText, setHeaderText] = useState('Default Page');
    const [notifications, setNotifications] = useState(dummyNotifications);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const unreadCount = notifications.filter(n => n.status === 'unread').length;

    const handleNotificationClick = (id) => {
        setNotifications(notifications.map(n => 
            n.id === id ? { ...n, status: 'read' } : n
        ));
    };

    const performSearch = useCallback((query) => {
        const results = searchableItems.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query) {
            performSearch(query);
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchResultClick = (path) => {
        // Instead of using router.push, we'll use window.location
        window.location.href = path;
        setSearchQuery('');
        setSearchResults([]);
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
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="w-full rounded-md border border-softBlack bg-mediumGrey py-1.5 pl-10 pr-4 text-sm text-offWhite placeholder:text-offWhite focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-offWhite"
                        />
                        {searchResults.length > 0 && (
                            <div className="absolute mt-1 w-full bg-offWhite rounded-md shadow-lg overflow-hidden z-20">
                                {searchResults.map((result, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 hover:bg-lightGrey cursor-pointer"
                                        onClick={() => handleSearchResultClick(result.path)}
                                    >
                                        <p className="text-sm text-softBlack">{result.title}</p>
                                    </div>
                                ))}
                            </div>
                        )}
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
                            <div className="absolute right-0 mt-2 w-80 bg-offWhite rounded-md shadow-lg overflow-hidden z-20">
                                <div>
                                    <div className="flex justify-between items-center px-4 py-2 bg-softBlack">
                                        <h3 className="text-sm font-semibold text-offWhite">Notifications</h3>
                                        <button onClick={() => setShowNotifications(false)}>
                                            <X className="h-4 w-4 text-mediumGrey" />
                                        </button>
                                    </div>
                                    {notifications.length === 0 ? (
                                        <p className="px-4 py-2 text-sm text-mediumGrey">No new notifications</p>
                                    ) : (
                                        <div className="max-h-64 overflow-y-auto">
                                            {notifications.map((notification) => (
                                                <Link
                                                    key={notification.id}
                                                    href={`/alerts/${notification.id}`}
                                                    className={`block px-4 py-2 hover:bg-lightGrey ${
                                                        notification.status === 'unread' ? 'bg-logoYellow/20' : ''
                                                    }`}
                                                    onClick={() => handleNotificationClick(notification.id)}
                                                >
                                                    <p className="text-sm font-medium text-softBlack">{notification.action}</p>
                                                    <p className="text-xs text-mediumGrey">
                                                        {notification.requester} - {notification.timestamp}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center px-4 py-2 bg-offWhite">
                                        <Link href="/alerts" className="text-sm text-logoOrange hover:text-orange-500 transition-colors duration-200">
                                            View all notifications
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* <button className="rounded-full p-2 text-gray-700 hover:bg-gray-200/50">
                        <Mail className="h-5 w-5" />
                    </button> */}
                    <button className="rounded-full p-2 text-gray-700 hover:bg-gray-200/50">
                        <img src="/lumiIcon.png" alt="Settings" className="h-10 w-15" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;

