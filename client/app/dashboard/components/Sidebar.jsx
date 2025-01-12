import Link from "next/link";
import { BarChart2, Grid, Users, PieChart, FileText } from "lucide-react"; 

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-[#2C3333] text-white">
      <div className="flex h-16 items-center px-6">
        <div className="h-8 w-8 rounded-full bg-[#5C5C5C]" />
        <span className="ml-3 text-sm font-semibold">Company Name</span>
      </div>
      <div className="mt-2 px-4">
        <nav className="mt-4 space-y-1">
          <Link
            href="#"
            className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-[#E7E7E7] hover:bg-[#5C5C5C] "
          >
            <BarChart2 className="mr-3 h-5 w-5" />
            Workspace Management
          </Link>
          <Link
            href="#"
            className="flex items-center rounded-lg rounded-lg bg-[#5C5C5C] px-4 py-2 text-sm font-medium"
          >
            <Grid className="mr-3 h-5 w-5" /> 
            Dashboard
          </Link>
          <Link
            href="#"
            className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-[#E7E7E7] hover:bg-[#5C5C5C]"
          >
            <Users className="mr-3 h-5 w-5" />
            Campaigns
          </Link>
          <Link
            href="#"
            className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-[#E7E7E7] hover:bg-[#5C5C5C]"
          >
            <PieChart className="mr-3 h-5 w-5" />
            Analytics
          </Link>
          <Link
            href="#"
            className="flex items-center rounded-lg px-4 py-2 text-sm font-medium text-[#E7E7E7] hover:bg-[#5C5C5C]"
          >
            <FileText className="mr-3 h-5 w-5" />
            Reports
          </Link>
        </nav>
      </div>
    </div>
  );
}
