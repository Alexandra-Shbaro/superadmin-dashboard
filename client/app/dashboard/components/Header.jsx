import { Search, Bell, Mail, Menu } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-[#E7E7E7] bg-[#FAFAFA] px-6">
      <div className="w-96">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-[#5C5C5C]" />
          <Input
            placeholder="Search..."
            className="pl-8"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Mail className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}

