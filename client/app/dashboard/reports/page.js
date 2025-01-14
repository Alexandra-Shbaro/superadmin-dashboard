'use client'

import { useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { Download } from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const months = ['Jan', 'Feb', 'Mar', 'Apr']

const activityData = {
  sessions: [400, 800, 1000, 1400],
  interactions: [200, 400, 600, 800]
}

const retentionData = {
  retention: [85, 87, 89, 88]
}

const topClients = [
  { name: 'Acme Corp', revenue: 150000, engagement: 95 },
  { name: 'TechStart', revenue: 120000, engagement: 88 },
  { name: 'Global Solutions', revenue: 98000, engagement: 85 }
]

const comparisonData = {
  labels: ['Spring Sale', 'Summer Promo', 'Fall Bundle', 'Holiday Special'],
  datasets: [
    {
      label: 'Engagement %',
      data: [85, 75, 90, 95],
      backgroundColor: '#FF8A00',
    },
    {
      label: 'Conversion %',
      data: [30, 25, 35, 40],
      backgroundColor: '#FFD700',
    },
    {
      label: 'ROI %',
      data: [5, 3, 4, 5],
      backgroundColor: '#5C5C5C',
    },
  ],
}

const engagementTrendsData = {
  labels: ['9AM', '12PM', '3PM', '6PM', '9PM'],
  datasets: [
    {
      label: 'Weekday',
      data: [65, 85, 75, 88, 55],
      borderColor: '#FF8A00',
      backgroundColor: '#FF8A00',
      tension: 0.4,
    },
    {
      label: 'Weekend',
      data: [55, 70, 65, 75, 60],
      borderColor: '#FFD700',
      backgroundColor: '#FFD700',
      tension: 0.4,
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#E7E7E7',
      },
    },
    x: {
      grid: {
        display: false,
      },
    },
  },
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderOverviewContent = () => (
    <div className="space-y-6">
      <div className="bg-[#FAFAFA] rounded-lg border border-[#E7E7E7] shadow-sm">
        <div className="p-4 flex items-center justify-between border-b border-[#E7E7E7]">
          <h2 className="text-lg font-semibold text-[#2C3333]">Client Activity Overview</h2>
          <button
            onClick={() => handleDownload('activity')}
            className="p-2 text-[#5C5C5C] hover:text-[#2C3333] rounded-md hover:bg-[#E7E7E7]"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="h-[300px]">
            <Line options={chartOptions} data={{
              labels: months,
              datasets: [
                {
                  label: 'Sessions',
                  data: activityData.sessions,
                  borderColor: '#FF8A00',
                  backgroundColor: '#FF8A00',
                  tension: 0.4,
                },
                {
                  label: 'Interactions',
                  data: activityData.interactions,
                  borderColor: '#FFD700',
                  backgroundColor: '#FFD700',
                  tension: 0.4,
                },
              ],
            }} />
          </div>
        </div>
      </div>

      <div className="bg-[#FAFAFA] rounded-lg border border-[#E7E7E7] shadow-sm">
        <div className="p-4 flex items-center justify-between border-b border-[#E7E7E7]">
          <h2 className="text-lg font-semibold text-[#2C3333]">Client Retention Rates</h2>
          <button
            onClick={() => handleDownload('retention')}
            className="p-2 text-[#5C5C5C] hover:text-[#2C3333] rounded-md hover:bg-[#E7E7E7]"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="h-[300px]">
            <Line options={chartOptions} data={{
              labels: months,
              datasets: [
                {
                  label: 'Retention',
                  data: retentionData.retention,
                  borderColor: '#FF8A00',
                  backgroundColor: '#FF8A00',
                  tension: 0.4,
                },
              ],
            }} />
          </div>
        </div>
      </div>

      <div className="bg-[#FAFAFA] rounded-lg border border-[#E7E7E7] shadow-sm">
        <div className="p-4 flex items-center justify-between border-b border-[#E7E7E7]">
          <h2 className="text-lg font-semibold text-[#2C3333]">Top Clients</h2>
          <button
            onClick={() => handleDownload('clients')}
            className="p-2 text-[#5C5C5C] hover:text-[#2C3333] rounded-md hover:bg-[#E7E7E7]"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {topClients.map((client) => (
              <div
                key={client.name}
                className="flex items-center justify-between p-4 rounded-lg border border-[#E7E7E7]"
              >
                <span className="font-medium text-[#2C3333]">{client.name}</span>
                <span className="text-[#5C5C5C]">
                  ${client.revenue.toLocaleString()} | {client.engagement}% engagement
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderEngagementContent = () => (
    <div className="space-y-6">
      <div className="bg-[#FAFAFA] rounded-lg border border-[#E7E7E7] shadow-sm">
        <div className="p-4 flex items-center justify-between border-b border-[#E7E7E7]">
          <h2 className="text-lg font-semibold text-[#2C3333]">Client Comparisons</h2>
          <button
            onClick={() => handleDownload('comparisons')}
            className="p-2 text-[#5C5C5C] hover:text-[#2C3333] rounded-md hover:bg-[#E7E7E7]"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="h-[300px]">
            <Bar options={chartOptions} data={comparisonData} />
          </div>
        </div>
      </div>

      <div className="bg-[#FAFAFA] rounded-lg border border-[#E7E7E7] shadow-sm">
        <div className="p-4 flex items-center justify-between border-b border-[#E7E7E7]">
          <h2 className="text-lg font-semibold text-[#2C3333]">Engagement Trends</h2>
          <button
            onClick={() => handleDownload('trends')}
            className="p-2 text-[#5C5C5C] hover:text-[#2C3333] rounded-md hover:bg-[#E7E7E7]"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="h-[300px]">
            <Line options={chartOptions} data={engagementTrendsData} />
          </div>
        </div>
      </div>
    </div>
  )

  const handleDownload = (section) => {
    // Implement download functionality
    console.log(`Downloading ${section} data...`)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#2C3333]">Client Engagement Reports</h1>
          <div className="flex gap-2">
            {['overview', 'engagement', 'insight'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${activeTab === tab 
                    ? 'bg-[#FF8A00] text-[#FAFAFA]' 
                    : 'bg-[#FAFAFA] text-[#5C5C5C] border border-[#E7E7E7] hover:bg-[#E7E7E7]'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'overview' && renderOverviewContent()}
        {activeTab === 'engagement' && renderEngagementContent()}
      </div>
    </div>
  )
}

