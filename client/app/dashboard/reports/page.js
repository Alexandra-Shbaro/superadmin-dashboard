'use client'

import { useState, useRef } from 'react'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { Download } from 'lucide-react'
import { downloadChartAsPDF } from './utils/downloadChart'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
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
  ArcElement,
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

const projectionData = {
  labels: ['May', 'Jun', 'Jul', 'Aug'],
  datasets: [
    {
      label: 'Projected',
      data: [1200, 1500, 1800, 2000],
      borderColor: '#FF8A00',
      backgroundColor: '#FF8A00',
      borderDash: [5, 5],
      tension: 0.4,
    },
    {
      label: 'Actual',
      data: [1150, 1400, 1700],
      borderColor: '#FFD700',
      backgroundColor: '#FFD700',
      tension: 0.4,
    },
  ],
}

const usageData = {
  labels: ['Active Users', 'Occasional Users', 'Inactive Users'],
  datasets: [{
    data: [45, 25, 30],
    backgroundColor: ['#FF8A00', '#FFD700', '#5C5C5C'],
  }],
}

const churnRiskData = [
  { name: 'Client A', lastActive: '2 weeks ago', riskLevel: 85 },
  { name: 'Client B', lastActive: '1 week ago', riskLevel: 65 },
  { name: 'Client C', lastActive: '2 days ago', riskLevel: 45 },
  { name: 'Client D', lastActive: 'today', riskLevel: 25 },
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

const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  
  const activityChartRef = useRef(null)
  const retentionChartRef = useRef(null)
  const comparisonChartRef = useRef(null)
  const trendsChartRef = useRef(null)
  const projectionsChartRef = useRef(null)
  const usageChartRef = useRef(null)


  const renderOverviewContent = () => (
    <div className="space-y-6">
      <div className="bg-[#FAFAFA] rounded-lg border border-[#E7E7E7] shadow-sm">
        <div className="p-4 flex items-center justify-between border-b border-[#E7E7E7]">
          <h2 className="text-lg font-semibold text-[#2C3333]">Client Activity Overview</h2>
          <button
            onClick={() => handleDownload('activity', activityChartRef, 'Client Activity Overview')}
            className="p-2 text-[#5C5C5C] hover:text-[#2C3333] rounded-md hover:bg-[#E7E7E7]"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="h-[300px]" ref={activityChartRef}>
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
            onClick={() => handleDownload('retention', retentionChartRef, 'Client Retention Rates')}
            className="p-2 text-[#5C5C5C] hover:text-[#2C3333] rounded-md hover:bg-[#E7E7E7]"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="h-[300px]" ref={retentionChartRef}>
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
            onClick={() => handleDownload('comparisons', comparisonChartRef, 'Client Comparisons')}
            className="p-2 text-[#5C5C5C] hover:text-[#2C3333] rounded-md hover:bg-[#E7E7E7]"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="h-[300px]" ref={comparisonChartRef}>
            <Bar options={chartOptions} data={comparisonData} />
          </div>
        </div>
      </div>

      <div className="bg-[#FAFAFA] rounded-lg border border-[#E7E7E7] shadow-sm">
        <div className="p-4 flex items-center justify-between border-b border-[#E7E7E7]">
          <h2 className="text-lg font-semibold text-[#2C3333]">Engagement Trends</h2>
          <button
            onClick={() => handleDownload('trends', trendsChartRef, 'Engagement Trends')}
            className="p-2 text-[#5C5C5C] hover:text-[#2C3333] rounded-md hover:bg-[#E7E7E7]"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="h-[300px]" ref={trendsChartRef}>
            <Line options={chartOptions} data={engagementTrendsData} />
          </div>
        </div>
      </div>
    </div>
  )

  const renderInsightContent = () => (
    <div className="space-y-6">
      <div className="bg-[#FAFAFA] rounded-lg border border-[#E7E7E7] shadow-sm">
        <div className="p-4 flex items-center justify-between border-b border-[#E7E7E7]">
          <h2 className="text-lg font-semibold text-[#2C3333]">Future Projections</h2>
          <button
            onClick={() => handleDownload('projections', projectionsChartRef, 'Future Projections')}
            className="p-2 text-[#5C5C5C] hover:text-[#2C3333] rounded-md hover:bg-[#E7E7E7]"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="h-[300px]" ref={projectionsChartRef}>
            <Line options={chartOptions} data={projectionData} />
          </div>
        </div>
      </div>

      <div className="bg-[#FAFAFA] rounded-lg border border-[#E7E7E7] shadow-sm">
        <div className="p-4 flex items-center justify-between border-b border-[#E7E7E7]">
          <h2 className="text-lg font-semibold text-[#2C3333]">Usage Distribution</h2>
          <button
            onClick={() => handleDownload('usage', usageChartRef, 'Usage Distribution')}
            className="p-2 text-[#5C5C5C] hover:text-[#2C3333] rounded-md hover:bg-[#E7E7E7]"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="h-[300px]" ref={usageChartRef}>
            <Doughnut options={pieChartOptions} data={usageData} />
          </div>
        </div>
      </div>

      <div className="bg-[#FAFAFA] rounded-lg border border-[#E7E7E7] shadow-sm">
        <div className="p-4 flex items-center justify-between border-b border-[#E7E7E7]">
          <h2 className="text-lg font-semibold text-[#2C3333]">Churn Risk Analysis</h2>
          <button
            onClick={() => handleDownload('churn')}
            className="p-2 text-[#5C5C5C] hover:text-[#2C3333] rounded-md hover:bg-[#E7E7E7]"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {churnRiskData.map((client) => (
              <div
                key={client.name}
                className="flex items-center justify-between p-4 rounded-lg border border-[#E7E7E7]"
              >
                <div className="space-y-1">
                  <h3 className="font-medium text-[#2C3333]">{client.name}</h3>
                  <p className="text-sm text-[#5C5C5C]">Last active: {client.lastActive}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-[#E7E7E7] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#FF8A00] rounded-full"
                      style={{ width: `${client.riskLevel}%` }}
                    />
                  </div>
                  <span className="text-sm text-[#5C5C5C]">{client.riskLevel}% risk</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const handleDownload = async (section, ref, title) => {
    if(ref){
      await downloadChartAsPDF(ref, title)
    } else {
      console.log(`Downloading ${section} data...`)
    }
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
        {activeTab === 'insight' && renderInsightContent()}
      </div>
    </div>
  )
}

