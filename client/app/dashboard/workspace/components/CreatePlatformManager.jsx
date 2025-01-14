'use client'

import { useState } from 'react'
import { X, Calendar } from 'lucide-react'

export default function CreatePlatformManager({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    // Personal Information
    name: '',
    dateOfBirth: '',
    emergencyContact: '',
    lastName: '',
    area: '',
    relationship: '',
    personalEmail: '',
    street: '',
    emergencyContactEmail: '',
    phoneNumber: '',
    building: '',
    emergencyContactNumber: '',
    // Professional Information
    department: '',
    employmentType: '',
    startDate: '',
    workHours: '',
    // Account Details
    username: '',
    email: '',
    temporaryPassword: '',
    confirmPassword: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Check if passwords match
    if (formData.temporaryPassword !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    onSubmit(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-softBlack">Create Platform Manager</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <input
                    type="date"
                    name="dateOfBirth"
                    placeholder="Date of Birth"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                  <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <input
                    type="text"
                    name="emergencyContact"
                    placeholder="Emergency Contact"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="area"
                    placeholder="Area"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <select
                    name="relationship"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  >
                    <option value="">Relationship</option>
                    <option value="parent">Parent</option>
                    <option value="spouse">Spouse</option>
                    <option value="sibling">Sibling</option>
                  </select>
                </div>
                <div>
                  <input
                    type="email"
                    name="personalEmail"
                    placeholder="Personal Email"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="street"
                    placeholder="Street"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="emergencyContactEmail"
                    placeholder="Emergency Contact Email"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="building"
                    placeholder="Building"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="emergencyContactNumber"
                    placeholder="Emergency Contact Number"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Professional Information</h3>
                <div className="space-y-4">
                  <select
                    name="department"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                    <option value="engineering">Engineering</option>
                    <option value="humanResources">Human Resources</option>
                    <option value="finance">Finance</option>
                  </select>
                  <select
                    name="employmentType"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  >
                    <option value="">Employment Type</option>
                    <option value="fullTime">Full Time</option>
                    <option value="partTime">Part Time</option>
                    <option value="contract">Contract</option>
                  </select>
                  <div className="relative">
                    <input
                      type="date"
                      name="startDate"
                      placeholder="Start Date"
                      className="w-full p-2 border rounded-md"
                      onChange={handleChange}
                    />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="workHours"
                    placeholder="Work Hours"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Account Details */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Account Details</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="temporaryPassword"
                    placeholder="Temporary Password"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="w-full p-2 border rounded-md"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-logoOrange hover:bg-logoOrange/90 text-white rounded-md text-sm font-medium"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

