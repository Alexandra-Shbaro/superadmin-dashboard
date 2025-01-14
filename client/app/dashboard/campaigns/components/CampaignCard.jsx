export function CampaignCard({ campaign }) {
    const getStatusColor = (status) => {
      switch (status) {
        case 'Active':
          return 'bg-logoOrange'
        case 'Planning':
          return 'bg-logoYellow'
        case 'Closed':
          return 'bg-mediumGrey'
        default:
          return 'bg-lightGrey'
      }
    }
  
    return (
      <div className="rounded-lg bg-[#2C3333] p-6 border border-[#FAFAFA]">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#FAFAFA]">{campaign.title}</h3>
            <p className="mt-1 text-sm text-[#E7E7E7]">{campaign.description}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-medium text-[#2C3333] ${getStatusColor(campaign.status)}`}>
            {campaign.status}
          </span>
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-[#E7E7E7]">Reach</span>
            <span className="text-[#FAFAFA]">{campaign.reach}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-[#E7E7E7]">Timeline</span>
            <span className="text-[#FAFAFA]">
              {campaign.timeline.start} - {campaign.timeline.end}
            </span>
          </div>
          
          <div>
            <div className="flex justify-between text-sm">
              <span className="text-[#E7E7E7]">Progress</span>
              <span className="text-[#FAFAFA]">{campaign.progress}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-[#5C5C5C]">
              <div 
                className="h-2 rounded-full bg-[#FF8A00]" 
                style={{ width: `${campaign.progress}%` }}
              />
            </div>
          </div>
        </div>
        
        <button className="mt-6 flex items-center text-sm text-[#FF8A00] hover:text-[#FFD700]">
          View Details
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    )
  }
  
  