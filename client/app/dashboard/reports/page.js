'use client'

import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Download } from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
  const [timeframe, setTimeframe] = useState('overview')

  const activityChartData = {
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
  }

  const retentionChartData = {
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
  }

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
            {['overview', 'monthly', 'weekly'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${timeframe === period 
                    ? 'bg-[#FF8A00] text-[#FAFAFA]' 
                    : 'bg-[#FAFAFA] text-[#5C5C5C] border border-[#E7E7E7] hover:bg-[#E7E7E7]'
                  }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>

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
                <Line options={chartOptions} data={activityChartData} />
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
                <Line options={chartOptions} data={retentionChartData} />
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
      </div>
    </div>
  )
}

