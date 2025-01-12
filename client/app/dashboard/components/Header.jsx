import { Search, Bell, Mail, Settings } from 'lucide-react'

export function Header() {
    return (
        <header className="flex h-16 items-center bg-gray-200 px-6 w-full">
            <div className="flex justify-start items-center ">
                <h1 className="text-lg font-semibold text-gray-800 text-nowrap">Workspace Management</h1>
            </div>
            <div className="flex justify-end w-full">
                <div className="flex max-w-xl px-8">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <input
                            placeholder="Search..."
                            className="w-full rounded-md border border-gray-400 bg-gray-200/90 py-1.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-500 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
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
                        <Settings className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </header>
    )
}

