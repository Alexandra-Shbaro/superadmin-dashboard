'use client';

import { Search, Bell, Mail, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname(); // Gets the current route
    const [headerText, setHeaderText] = useState('Default Page');

    useEffect(() => {
        const pathToTextMap = {
            '/workspace': 'Workspace Management',
            '/dash': 'Dashboard',
            '/analytics': 'Analytics',
            '/campaigns': 'Campaigns',
            '/reports': 'Reports',
        };

        setHeaderText(pathToTextMap[pathname] || 'Default Page');
    }, [pathname]);

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
                    <button className="rounded-full p-2 text-gray-700 hover:bg-gray-200/50">
                        <Bell className="h-5 w-5" />
                    </button>
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
