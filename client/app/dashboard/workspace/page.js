'use client'

import { useState } from 'react'
import { Plus, Eye, Pencil, Trash, ChevronLeft, ChevronRight } from 'lucide-react'

// Sample data - this would typically come from an API
const initialManagers = [
  { id: 1, name: 'John Smith', email: 'john.smith@example.com' },
  { id: 2, name: 'Emma Johnson', email: 'emma.johnson@example.com' },
  { id: 3, name: 'Michael Brown', email: 'michael.brown@example.com' },
  { id: 4, name: 'Olivia Davis', email: 'olivia.davis@example.com' },
  { id: 5, name: 'William Wilson', email: 'william.wilson@example.com' },
  { id: 6, name: 'Sophia Taylor', email: 'sophia.taylor@example.com' },
]

export default function WorkspacePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [managers] = useState(initialManagers)
  const itemsPerPage = 6
  const totalPages = Math.ceil(managers.length / itemsPerPage)

  const getCurrentPageData = () => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return managers.slice(start, end)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-softBlack">Platform Managers</h1>
        <button className="px-4 py-2 bg-logoOrange hover:bg-logoOrange/90 text-white rounded-md flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add Platform Manager 
        </button>
      </div>

      <div className="rounded-lg border bg-lightGrey overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-softBlack uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-softBlack uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-softBlack uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {getCurrentPageData().map((manager) => (
              <tr key={manager.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{manager.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{manager.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-200 rounded-md">
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span className="sr-only">View</span>
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-md">
                      <Pencil className="h-4 w-4 text-gray-500" />
                      <span className="sr-only">Edit</span>
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-md">
                      <Trash className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  currentPage === page
                    ? "bg-logoOrange text-white"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

