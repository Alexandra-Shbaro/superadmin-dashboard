'use client'

import { useState } from 'react'
import { Plus, Eye, Pencil, Trash, ChevronLeft, ChevronRight, X } from 'lucide-react'
import CreatePlatformManager from './components/CreatePlatformManager'
// Sample data - this would typically come from an API
const initialManagers = [
  { 
    id: 1, 
    name: 'John Smith', 
    lastName: 'Smith',
    email: 'john.smith@example.com', 
    department: 'Marketing', 
    startDate: '2023-01-15',
    dateOfBirth: '1985-05-20',
    area: 'Sales',
    personalEmail: 'john.smith@personal.com',
    phoneNumber: '123-456-7890',
    street: '123 Main St',
    building: 'Apt 4B',
    emergencyContact: 'Jane Smith',
    emergencyContactEmail: 'jane.smith@example.com',
    emergencyContactNumber: '987-654-3210',
    relationship: 'Spouse',
    employmentType: 'Full Time',
    workHours: '9 AM - 5 PM',
    username: 'jsmith'
  },
  { 
    id: 2, 
    name: 'Emma Johnson', 
    lastName: 'Johnson',
    email: 'emma.johnson@example.com', 
    department: 'Sales', 
    startDate: '2023-02-01',
    dateOfBirth: '1990-08-15',
    area: 'Northeast',
    personalEmail: 'emma.johnson@personal.com',
    phoneNumber: '234-567-8901',
    street: '456 Elm St',
    building: 'Suite 200',
    emergencyContact: 'Michael Johnson',
    emergencyContactEmail: 'michael.johnson@example.com',
    emergencyContactNumber: '876-543-2109',
    relationship: 'Sibling',
    employmentType: 'Part Time',
    workHours: '10 AM - 3 PM',
    username: 'ejohnson'
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    lastName: 'Brown',
    email: 'michael.brown@example.com', 
    department: 'Engineering', 
    startDate: '2023-03-10',
    dateOfBirth: '1988-11-30',
    area: 'Technology',
    personalEmail: 'michael.brown@personal.com',
    phoneNumber: '345-678-9012',
    street: '789 Oak St',
    building: 'Floor 3',
    emergencyContact: 'Sarah Brown',
    emergencyContactEmail: 'sarah.brown@example.com',
    emergencyContactNumber: '765-432-1098',
    relationship: 'Spouse',
    employmentType: 'Full Time',
    workHours: '8 AM - 4 PM',
    username: 'mbrown'
  },
  { 
    id: 4, 
    name: 'Olivia Davis', 
    lastName: 'Davis',
    email: 'olivia.davis@example.com', 
    department: 'Human Resources', 
    startDate: '2023-04-05',
    dateOfBirth: '1992-02-25',
    area: 'Recruitment',
    personalEmail: 'olivia.davis@personal.com',
    phoneNumber: '456-789-0123',
    street: '101 Pine St',
    building: 'Room 5C',
    emergencyContact: 'Daniel Davis',
    emergencyContactEmail: 'daniel.davis@example.com',
    emergencyContactNumber: '654-321-0987',
    relationship: 'Parent',
    employmentType: 'Full Time',
    workHours: '9 AM - 5 PM',
    username: 'odavis'
  },
  { 
    id: 5, 
    name: 'William Wilson', 
    lastName: 'Wilson',
    email: 'william.wilson@example.com', 
    department: 'Finance', 
    startDate: '2023-05-20',
    dateOfBirth: '1987-07-10',
    area: 'Accounting',
    personalEmail: 'william.wilson@personal.com',
    phoneNumber: '567-890-1234',
    street: '202 Maple St',
    building: 'Building B',
    emergencyContact: 'Emily Wilson',
    emergencyContactEmail: 'emily.wilson@example.com',
    emergencyContactNumber: '543-210-9876',
    relationship: 'Spouse',
    employmentType: 'Full Time',
    workHours: '8:30 AM - 4:30 PM',
    username: 'wwilson'
  },
  { 
    id: 6, 
    name: 'Sophia Taylor', 
    lastName: 'Taylor',
    email: 'sophia.taylor@example.com', 
    department: 'Marketing', 
    startDate: '2023-06-15',
    dateOfBirth: '1993-09-05',
    area: 'Digital Marketing',
    personalEmail: 'sophia.taylor@personal.com',
    phoneNumber: '678-901-2345',
    street: '303 Birch St',
    building: 'Unit 7D',
    emergencyContact: 'Robert Taylor',
    emergencyContactEmail: 'robert.taylor@example.com',
    emergencyContactNumber: '432-109-8765',
    relationship: 'Parent',
    employmentType: 'Contract',
    workHours: 'Flexible',
    username: 'staylor'
  },
]

export default function WorkspacePage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [managers, setManagers] = useState(initialManagers)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedManager, setSelectedManager] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingManager, setEditingManager] = useState(null)
  const itemsPerPage = 6
  const totalPages = Math.ceil(managers.length / itemsPerPage)

  const getCurrentPageData = () => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return managers.slice(start, end)
  }

  const handleCreateManager = (formData) => {
    const newManager = { id: managers.length + 1, ...formData }
    setManagers([...managers, newManager])
    setIsCreateModalOpen(false)
  }

  const handleViewManager = (manager) => {
    setSelectedManager(manager)
    setIsViewModalOpen(true)
  }

  const handleEditManager = (manager) => {
    setEditingManager(manager)
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = (formData) => {
    setManagers(managers.map(manager => 
      manager.id === editingManager.id ? { ...manager, ...formData } : manager
    ))
    setIsEditModalOpen(false)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-softBlack">Platform Managers</h1>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-logoOrange hover:bg-logoOrange/90 text-white rounded-md flex items-center"
        >
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
              <th className="px-6 py-3 text-left text-xs font-medium text-softBlack uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-softBlack uppercase tracking-wider">Start Date</th>
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
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{manager.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{manager.startDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button 
                      className="p-2 hover:bg-gray-200 rounded-md"
                      onClick={() => handleViewManager(manager)}
                    >
                      <Eye className="h-4 w-4 text-gray-500" />
                      <span className="sr-only">View</span>
                    </button>
                    <button 
                      className="p-2 hover:bg-gray-200 rounded-md"
                      onClick={() => handleEditManager(manager)}
                    >
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

      <CreatePlatformManager 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateManager}
      />

      {isViewModalOpen && selectedManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-softBlack">Platform Manager Details</h2>
                <button onClick={() => setIsViewModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <p><span className="font-medium">Name:</span> {selectedManager.name}</p>
                    <p><span className="font-medium">Last Name:</span> {selectedManager.lastName}</p>
                    <p><span className="font-medium">Date of Birth:</span> {selectedManager.dateOfBirth}</p>
                    <p><span className="font-medium">Area:</span> {selectedManager.area}</p>
                    <p><span className="font-medium">Personal Email:</span> {selectedManager.personalEmail}</p>
                    <p><span className="font-medium">Phone Number:</span> {selectedManager.phoneNumber}</p>
                    <p><span className="font-medium">Street:</span> {selectedManager.street}</p>
                    <p><span className="font-medium">Building:</span> {selectedManager.building}</p>
                    <p><span className="font-medium">Emergency Contact:</span> {selectedManager.emergencyContact}</p>
                    <p><span className="font-medium">Emergency Contact Email:</span> {selectedManager.emergencyContactEmail}</p>
                    <p><span className="font-medium">Emergency Contact Number:</span> {selectedManager.emergencyContactNumber}</p>
                    <p><span className="font-medium">Relationship:</span> {selectedManager.relationship}</p>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Professional Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <p><span className="font-medium">Department:</span> {selectedManager.department}</p>
                    <p><span className="font-medium">Employment Type:</span> {selectedManager.employmentType}</p>
                    <p><span className="font-medium">Start Date:</span> {selectedManager.startDate}</p>
                    <p><span className="font-medium">Work Hours:</span> {selectedManager.workHours}</p>
                  </div>
                </div>

                {/* Account Details */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Account Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <p><span className="font-medium">Username:</span> {selectedManager.username}</p>
                    <p><span className="font-medium">Email:</span> {selectedManager.email}</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="px-4 py-2 bg-logoOrange hover:bg-orange-600 text-white rounded-md text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditModalOpen && editingManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-softBlack">Edit Platform Manager</h2>
                <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault()
                handleEditSubmit(Object.fromEntries(new FormData(e.target)))
              }}>
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        type="text"
                        name="name"
                        defaultValue={editingManager.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        defaultValue={editingManager.lastName}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <input
                        type="date"
                        name="dateOfBirth"
                        defaultValue={editingManager.dateOfBirth}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <input
                        type="text"
                        name="area"
                        defaultValue={editingManager.area}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <input
                        type="email"
                        name="personalEmail"
                        defaultValue={editingManager.personalEmail}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <input
                        type="tel"
                        name="phoneNumber"
                        defaultValue={editingManager.phoneNumber}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <input
                        type="text"
                        name="street"
                        defaultValue={editingManager.street}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <input
                        type="text"
                        name="building"
                        defaultValue={editingManager.building}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <input
                        type="text"
                        name="emergencyContact"
                        defaultValue={editingManager.emergencyContact}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <input
                        type="email"
                        name="emergencyContactEmail"
                        defaultValue={editingManager.emergencyContactEmail}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <input
                        type="tel"
                        name="emergencyContactNumber"
                        defaultValue={editingManager.emergencyContactNumber}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <select
                        name="relationship"
                        defaultValue={editingManager.relationship}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      >
                        <option value="parent">Parent</option>
                        <option value="spouse">Spouse</option>
                        <option value="sibling">Sibling</option>
                      </select>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Professional Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <select
                        name="department"
                        defaultValue={editingManager.department}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      >
                        <option value="marketing">Marketing</option>
                        <option value="sales">Sales</option>
                        <option value="engineering">Engineering</option>
                        <option value="humanResources">Human Resources</option>
                        <option value="finance">Finance</option>
                      </select>
                      <select
                        name="employmentType"
                        defaultValue={editingManager.employmentType}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      >
                        <option value="fullTime">Full Time</option>
                        <option value="partTime">Part Time</option>
                        <option value="contract">Contract</option>
                      </select>
                      <input
                        type="date"
                        name="startDate"
                        defaultValue={editingManager.startDate}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <input
                        type="text"
                        name="workHours"
                        defaultValue={editingManager.workHours}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Account Details */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Account Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="username"
                        defaultValue={editingManager.username}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        defaultValue={editingManager.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-logoOrange hover:bg-orange-600 text-white rounded-md text-sm font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

