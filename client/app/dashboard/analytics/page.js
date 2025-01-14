'use client'

import { useState } from 'react'

const stats = [
  { title: "Total Projects", value: "24", progress: 100 },
  { title: "Completed Projects", value: "15", progress: 62.5 },
  { title: "Active Projects", value: "6", progress: 25 },
  { title: "Projects At Risk", value: "3", progress: 12.5 },
]

const allCampaigns = [
  {
    name: "Holiday Marketing Campaign",
    progress: 75,
    status: "On Track"
  },
  {
    name: "New Product Launch",
    progress: 45,
    status: "At Risk"
  },
  {
    name: "Customer Retention Strategy",
    progress: 30,
    status: "At Risk"
  },
  {
    name: "Amazing Campaign Launch",
    progress: 15,
    status: "Behind Schedule"
  },
  {
    name: "Email Marketing Campaign",
    progress: 60,
    status: "On Track"
  },
  {
    name: "Social Media Strategy",
    progress: 25,
    status: "Behind Schedule"
  },
  {
    name: "Brand Awareness Campaign",
    progress: 80,
    status: "On Track"
  },
  {
    name: "Lead Generation Program",
    progress: 40,
    status: "At Risk"
  },
  {
    name: "Content Marketing Initiative",
    progress: 55,
    status: "On Track"
  },
  {
    name: "Customer Feedback Campaign",
    progress: 90,
    status: "On Track"
  }
]

const ITEMS_PER_PAGE = 6

function StatsCard({ title, value, progress }) {
  return (
    <div className="bg-[#FAFAFA] rounded-lg p-4 border border-[#E7E7E7] shadow-sm">
      <h3 className="text-[#5C5C5C] text-sm">{title}</h3>
      <p className="text-[#2C3333] text-2xl font-bold mt-1">{value}</p>
      <div className="mt-2 h-1 bg-[#E7E7E7] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#FF8A00] rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

function CampaignProgress({ campaign }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track':
        return 'bg-[#FFD700] text-[#2C3333]'
      case 'At Risk':
        return 'bg-[#FF8A00] text-[#2C3333]'
      case 'Behind Schedule':
        return 'bg-[#5C5C5C] text-[#FAFAFA]'
      default:
        return 'bg-[#E7E7E7] text-[#2C3333]'
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-[#2C3333]">{campaign.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
            {campaign.status}
          </span>
        </div>
        <div className="h-2 bg-[#E7E7E7] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#FF8A00] rounded-full"
            style={{ width: `${campaign.progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  
  const totalPages = Math.ceil(allCampaigns.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentCampaigns = allCampaigns.slice(startIndex, endIndex)

  const generatePageButtons = () => {
    let buttons = []
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`rounded-md px-3 py-1 text-sm font-medium ${
            i === currentPage
              ? "bg-[#FF8A00] text-[#FAFAFA]"
              : "text-[#5C5C5C] hover:bg-[#E7E7E7]"
          }`}
        >
          {i}
        </button>
      )
    }
    return buttons
  }

  return (
    <div className="min-h-screen bg-lightGrey p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#2C3333] mb-8">Campaign Analytics</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="bg-[#FAFAFA] rounded-lg border border-[#E7E7E7] p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#2C3333] mb-6">Campaign Progress Breakdown</h2>
          <div className="space-y-6 min-h-[400px]">
            {currentCampaigns.map((campaign) => (
              <CampaignProgress key={campaign.name} campaign={campaign} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className="rounded-md px-3 py-1 text-sm font-medium text-[#5C5C5C] hover:bg-[#E7E7E7] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            <svg className="h-5 w-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {generatePageButtons()}
          <button
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            className="rounded-md px-3 py-1 text-sm font-medium text-[#5C5C5C] hover:bg-[#E7E7E7] disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

