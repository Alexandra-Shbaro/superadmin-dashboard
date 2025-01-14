'use client'

import { useState } from 'react'
import { Plus, Eye, Pencil, Trash } from 'lucide-react'

// Sample data - this would typically come from an API
const initialManagers = [
  { id: 1, name: 'Example Manager 1', email: 'example@gmail.com' },
  { id: 2, name: 'Example Manager 2', email: 'example@gmail.com' },
  { id: 3, name: 'Example Manager 3', email: 'example@gmail.com' },
  { id: 4, name: 'Example Manager 4', email: 'example@gmail.com' },
  { id: 5, name: 'Example Manager 5', email: 'example@gmail.com' },
  { id: 6, name: 'Example Manager 6', email: 'example@gmail.com' },
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
        <h1 className="text-2xl font-semibold text-softBlack">Platform Managers</h1>
        <button className="px-4 py-2 bg-mediumGrey hover:bg-mediumGrey/90 text-white rounded-md flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add
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
                    <button className="p-2 bg-lightGrey hover:bg-gray-200 rounded-md">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </button>
                    <button className="p-2 bg-lightGrey hover:bg-gray-200 rounded-md">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </button>
                    <button className="p-2 bg-lightGrey hover:bg-gray-200 rounded-md">
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 bg-lightGrey hover:bg-gray-200 rounded-md disabled:opacity-50"
        >
          ←
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`p-2 rounded-md ${
              currentPage === i + 1
                ? "bg-mediumGrey hover:bg-mediumGrey/90 text-white"
                : "bg-lightGrey hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 bg-lightGrey hover:bg-gray-200 rounded-md disabled:opacity-50"
        >
          →
        </button>
      </div>
    </div>
  )
}

