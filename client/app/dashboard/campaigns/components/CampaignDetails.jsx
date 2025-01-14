'use client'

import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export function CampaignDetails({ campaign, isOpen, onClose }) {
  if (!isOpen) return null

  const reachData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Reach',
        data: [10000, 15000, 17000, 20000, 25000, 30000],
        borderColor: '#FF8A00',
        tension: 0.4,
      },
      {
        label: 'Engagement',
        data: [5000, 7000, 7500, 8000, 8200, 8500],
        borderColor: '#FFD700',
        tension: 0.4,
      },
    ],
  }

  const engagementData = {
    labels: ['Likes', 'Comments', 'Shares', 'Saves'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: ['#FF8A00', '#FFD700', '#5C5C5C', '#E7E7E7'],
        borderWidth: 0,
      },
    ],
  }

  const tableData = [
    { date: 'June 15, 2024', reach: '25.4K', impressions: '32.1K', likes: '1.2K', shares: '156', clicks: '2.1K' },
    { date: 'June 14, 2024', reach: '23.8K', impressions: '30.02K', likes: '1.1K', shares: '143', clicks: '2.0K' },
    { date: 'June 13, 2024', reach: '22.6K', impressions: '26.04K', likes: '1.1K', shares: '200', clicks: '2.2K' },
  ]

  return (
    <div className="fixed inset-0 bg-[#2C3333]/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#FAFAFA] rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#2C3333]">{campaign.title}</h2>
              <p className="text-[#5C5C5C] mt-1">{`${campaign.timeline.start} - ${campaign.timeline.end}`}</p>
            </div>
            <button
              onClick={onClose}
              className="text-[#5C5C5C] hover:text-[#2C3333]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-[#2C3333] p-4 rounded-lg">
              <p className="text-[#E7E7E7] text-sm">Total Reach</p>
              <p className="text-[#FAFAFA] text-2xl font-bold">150.5K</p>
            </div>
            <div className="bg-[#2C3333] p-4 rounded-lg">
              <p className="text-[#E7E7E7] text-sm">Engagement Rate</p>
              <p className="text-[#FAFAFA] text-2xl font-bold">4.8 %</p>
            </div>
            <div className="bg-[#2C3333] p-4 rounded-lg">
              <p className="text-[#E7E7E7] text-sm">Click Rate</p>
              <p className="text-[#FAFAFA] text-2xl font-bold">5.2 %</p>
            </div>
            <div className="bg-[#2C3333] p-4 rounded-lg">
              <p className="text-[#E7E7E7] text-sm">Progress</p>
              <p className="text-[#FAFAFA] text-2xl font-bold">100 %</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-[#FAFAFA] p-4 rounded-lg border border-[#E7E7E7]">
              <h3 className="text-[#2C3333] font-semibold mb-4">Reach & Engagement Over Time</h3>
              <Line
                data={reachData}
                options={{
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      grid: {
                        color: '#E7E7E7',
                      },
                    },
                    x: {
                      grid: {
                        color: '#E7E7E7',
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="bg-[#FAFAFA] p-4 rounded-lg border border-[#E7E7E7]">
              <h3 className="text-[#2C3333] font-semibold mb-4">Engagement Breakdown</h3>
              <Doughnut
                data={engagementData}
                options={{
                  responsive: true,
                  cutout: '70%',
                }}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E7E7E7]">
                  <th className="text-left p-4 text-[#2C3333]">Date</th>
                  <th className="text-left p-4 text-[#2C3333]">Reach</th>
                  <th className="text-left p-4 text-[#2C3333]">Impressions</th>
                  <th className="text-left p-4 text-[#2C3333]">Likes</th>
                  <th className="text-left p-4 text-[#2C3333]">Shares</th>
                  <th className="text-left p-4 text-[#2C3333]">Clicks</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index} className="border-b border-[#E7E7E7]">
                    <td className="p-4 text-[#5C5C5C]">{row.date}</td>
                    <td className="p-4 text-[#5C5C5C]">{row.reach}</td>
                    <td className="p-4 text-[#5C5C5C]">{row.impressions}</td>
                    <td className="p-4 text-[#5C5C5C]">{row.likes}</td>
                    <td className="p-4 text-[#5C5C5C]">{row.shares}</td>
                    <td className="p-4 text-[#5C5C5C]">{row.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

