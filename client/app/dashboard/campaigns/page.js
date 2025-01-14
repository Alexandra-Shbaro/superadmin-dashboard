'use client'

import { useState } from 'react'
import { StatsCard } from './components/StatsCard'
import { CampaignCard } from './components/CampaignCard'

const stats = [
  { title: "Total Campaigns", value: "6" },
  { title: "Active Campaigns", value: "2" },
  { title: "Total Reach", value: "50K" },
  { title: "Total Engagement", value: "65K" },
]

const allCampaigns = [
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
      end: "2025/11/19",
    },
    progress: 100,
  },
  {
    title: "Social Media Boost",
    description: "Increasing engagement across all social media platforms",
    status: "Active",
    reach: "500K",
    timeline: {
      start: "2024/10/1",
      end: "2025/03/31",
    },
    progress: 30,
  },
]

const ITEMS_PER_PAGE = 4

export default function CampaignsPage() {
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
              ? "bg-logoOrange text-softBlack"
              : "text-softBlack hover:bg-softBlack hover:text-offWhite"
          }`}
        >
          {i}
        </button>
      )
    }
    return buttons
  }

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <div className="min-h-screen bg-lightGrey flex flex-col">
      <div className="flex-grow p-8 overflow-y-auto">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6" style={{ gridTemplateRows: 'repeat(2, minmax(0, 1fr))' }}>
            {[...Array(ITEMS_PER_PAGE)].map((_, index) => (
              <div key={index} className="min-h-[280px]">
                {currentCampaigns[index] && (
                  <CampaignCard campaign={currentCampaigns[index]} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-lightGrey border-t border-mediumGrey p-4 flex justify-center items-center gap-2">
        <button
          onClick={prevPage}
          className="rounded-md px-3 py-1 text-sm font-medium text-softBlack hover:bg-softBlack hover:text-offWhite disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
        >
          <svg className="h-5 w-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        {generatePageButtons()}
        <button
          onClick={nextPage}
          className="rounded-md px-3 py-1 text-sm font-medium text-softBlack hover:bg-softBlack hover:text-offWhite disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}