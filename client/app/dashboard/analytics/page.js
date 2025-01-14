'use client'

import { useState } from 'react'

const stats = [
  { title: "Total Projects", value: "24", progress: 100 },
  { title: "Completed Projects", value: "15", progress: 62.5 },
  { title: "Active Projects", value: "6", progress: 25 },
  { title: "Projects At Risk", value: "3", progress: 12.5 },
]

const campaigns = [
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
]

function StatsCard({ title, value, progress }) {
  return (
    <div className="bg-[#2C3333] rounded-lg p-4 border border-[#FAFAFA]">
      <h3 className="text-[#E7E7E7] text-sm">{title}</h3>
      <p className="text-[#FAFAFA] text-2xl font-bold mt-1">{value}</p>
      <div className="mt-2 h-1 bg-[#5C5C5C] rounded-full overflow-hidden">
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
          <h3 className="text-[#FAFAFA]">{campaign.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
            {campaign.status}
          </span>
        </div>
        <div className="h-2 bg-[#5C5C5C] rounded-full overflow-hidden">
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
  const totalPages = 3

  const generatePageButtons = () => {
    let buttons = []
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`rounded-md px-3 py-1 text-sm font-medium ${
            i === currentPage
              ? "bg-[#FF8A00] text-[#2C3333]"
              : "text-[#E7E7E7] hover:bg-[#2C3333]/20"
          }`}
        >
          {i}
        </button>
      )
    }
    return buttons
  }

  return (
    <div className="min-h-screen bg-[#2C3333] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-[#FAFAFA] mb-8">Campaign Analytics</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        <div className="bg-[#2C3333] rounded-lg border border-[#FAFAFA] p-6">
          <h2 className="text-xl font-semibold text-[#FAFAFA] mb-6">Campaign Progress Breakdown</h2>
          <div className="space-y-6">
            {campaigns.map((campaign) => (
              <CampaignProgress key={campaign.name} campaign={campaign} />
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            className="rounded-md px-3 py-1 text-sm font-medium text-[#E7E7E7] hover:bg-[#2C3333]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            <svg className="h-5 w-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {generatePageButtons()}
          <button
            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
            className="rounded-md px-3 py-1 text-sm font-medium text-[#E7E7E7] hover:bg-[#2C3333]/20 disabled:opacity-50 disabled:cursor-not-allowed"
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

