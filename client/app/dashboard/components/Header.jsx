import { Search, Bell, Mail, Menu } from 'lucide-react'

export function Header() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-[#E7E7E7] bg-[#FAFAFA] px-6">
          <div className="w-96">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#5C5C5C]" />
              <input
                placeholder="Search..."
                className="pl-8 bg-[#FAFAFA] border-[#E7E7E7] text-[#2C3333]"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button variant="ghost" size="icon" className="text-[#5C5C5C] hover:bg-[#E7E7E7]">
              <Bell className="h-5 w-5" />
            </button>
            <button variant="ghost" size="icon" className="text-[#5C5C5C] hover:bg-[#E7E7E7]">
              <Mail className="h-5 w-5" />
            </button>
            <button variant="ghost" size="icon" className="text-[#5C5C5C] hover:bg-[#E7E7E7]">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </header>
      );
}

