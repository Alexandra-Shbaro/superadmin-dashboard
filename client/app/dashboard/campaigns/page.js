import { StatsCard } from "./components/StatsCard"
import { CampaignCard } from "./components/CampaignCard"

const stats = [
  { title: "Total Campaigns", value: "6" },
  { title: "Active Campaigns", value: "2" },
  { title: "Total Reach", value: "50K" },
  { title: "Total Engagement", value: "65K" },
]

const campaigns = [
  {
    title: "Relaunch of Holiday Campaign",
    description: "Seasonal promotion focusing on holiday products and Christmas decorations",
    status: "Active",
    reach: "Null",
    timeline: {
      start: "2024/09/9",
      end: "2025/11/18",
    },
    progress: 65,
  },
  {
    title: "Pepsi Summer Campaign",
    description: "Summer marketing of Pepsi drink with promotion",
    status: "Planning",
    reach: "Null",
    timeline: {
      start: "2024/09/9",
      end: "2025/11/18",
    },
    progress: 0,
  },
  {
    title: "Product Launch",
    description: "Product launch of a new university platform targeting all universities in London",
    status: "Active",
    reach: "Null",
    timeline: {
      start: "2024/09/9",
      end: "2025/11/18",
    },
    progress: 50,
  },
  {
    title: "Rebranding of Alya's Patisserie",
    description: "Rebranding of Alya's Patisserie with redefining marketing strategy targeting other patisserie in London for collaboration",
    status: "Closed",
    reach: "150K",
    timeline: {
      start: "2024/09/18",
      end: "2025/11/18",
    },
    progress: 100,
  },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-[#2C3333] p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.title} campaign={campaign} />
          ))}
        </div>
        
        <div className="mt-8 flex justify-center gap-2">
          <button className="rounded-md bg-[#FF8A00] px-3 py-1 text-sm font-medium text-[#2C3333]">1</button>
          <button className="rounded-md px-3 py-1 text-sm font-medium text-[#E7E7E7] hover:bg-[#5C5C5C]">2</button>
          <button className="rounded-md px-3 py-1 text-sm font-medium text-[#E7E7E7] hover:bg-[#5C5C5C]">3</button>
          <button className="rounded-md px-3 py-1 text-sm font-medium text-[#E7E7E7] hover:bg-[#5C5C5C]">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

