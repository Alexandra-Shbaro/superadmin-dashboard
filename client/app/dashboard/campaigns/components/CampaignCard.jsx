'use client'

import { useState } from 'react'
import { CampaignDetails } from './CampaignDetails'

export function CampaignCard({ campaign }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-[#FF8A00]'
      case 'Planning':
        return 'bg-[#FFD700]'
      case 'Closed':
        return 'bg-lightGrey'
      default:
        return 'bg-[#E7E7E7]'
    }
  }

  return (
    <>
      <div className="h-full rounded-lg bg-offWhite p-6 border border-[#FAFAFA] flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-softBlack">{campaign.title}</h3>
            <p className="mt-1 text-sm text-softBlack">{campaign.description}</p>
          </div>
          <span className={`rounded-full px-2 py-1 text-xs font-medium text-softBlack ${getStatusColor(campaign.status)}`}>
            {campaign.status}
          </span>
        </div>
        
        <div className="flex-grow space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-softBlack">Reach</span>
            <span className="text-softBlack">{campaign.reach}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-softBlack">Timeline</span>
            <span className="text-softBlack">
              {campaign.timeline.start} - {campaign.timeline.end}
            </span>
          </div>
          
          <div>
            <div className="flex justify-between text-sm">
              <span className="text-softBlack">Progress</span>
              <span className="text-softBlack">{campaign.progress}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-[#5C5C5C]">
              <div 
                className="h-2 rounded-full bg-[#FF8A00]" 
                style={{ width: `${campaign.progress}%` }}
              />
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-4 flex items-center text-sm text-[#FF8A00] hover:text-[#FFD700]"
        >
          View Details
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <CampaignDetails
        campaign={campaign}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}

