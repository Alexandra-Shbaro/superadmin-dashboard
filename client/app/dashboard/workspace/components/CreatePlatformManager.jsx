'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

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
    
    // Check if the form is valid (all required fields are filled)
    if (!e.target.checkValidity()) {
      e.target.reportValidity()
      return
    }
    
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
              <h3 className="text-base italic font-medium text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-3 gap-4 items-start">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    name="dateOfBirth"
                    placeholder="Date of Birth"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="personalEmail" className="block text-sm font-medium text-gray-700 mb-1">Personal Email</label>
                  <input
                    id="personalEmail"
                    type="email"
                    name="personalEmail"
                    placeholder="Personal Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                  <input
                    id="area"
                    type="text"
                    name="area"
                    placeholder="Area"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">Street</label>
                  <input
                    id="street"
                    type="text"
                    name="street"
                    placeholder="Street"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="building" className="block text-sm font-medium text-gray-700 mb-1">Building</label>
                  <input
                    id="building"
                    type="text"
                    name="building"
                    placeholder="Building"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                <h4 className="col-span-3 text-base italic font-medium text-gray-900 ">Emergency Contact Details</h4>
                <div>
                  <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                  <input
                    id="emergencyContact"
                    type="text"
                    name="emergencyContact"
                    placeholder="Emergency Contact"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="emergencyContactEmail" className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Email</label>
                  <input
                    id="emergencyContactEmail"
                    type="email"
                    name="emergencyContactEmail"
                    placeholder="Emergency Contact Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="emergencyContactNumber" className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact Number</label>
                  <input
                    id="emergencyContactNumber"
                    type="tel"
                    name="emergencyContactNumber"
                    placeholder="Emergency Contact Number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                  <select
                    id="relationship"
                    name="relationship"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Relationship</option>
                    <option value="parent">Parent</option>
                    <option value="spouse">Spouse</option>
                    <option value="sibling">Sibling</option>
                    <option value="relative">Relative</option>
                    <option value="friend">Friend</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-base italic font-medium text-gray-900 mb-4">Professional Information</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                      id="department"
                      name="department"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="marketing">Marketing</option>
                      <option value="sales">Sales</option>
                      <option value="engineering">Engineering</option>
                      <option value="humanResources">Human Resources</option>
                      <option value="finance">Finance</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                    <select
                      id="employmentType"
                      name="employmentType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Employment Type</option>
                      <option value="fullTime">Full Time</option>
                      <option value="partTime">Part Time</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>
                  <div className="relative">
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      id="startDate"
                      type="date"
                      name="startDate"
                      placeholder="Start Date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="workHours" className="block text-sm font-medium text-gray-700 mb-1">Work Hours</label>
                    <input
                      id="workHours"
                      type="text"
                      name="workHours"
                      placeholder="Work Hours"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-base italic font-medium text-gray-900 mb-4">Account Details</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Username"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="temporaryPassword" className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
                    <input
                      id="temporaryPassword"
                      type="password"
                      name="temporaryPassword"
                      placeholder="Temporary Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      onChange={handleChange}
                      required
                    />
                  </div>
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
                className="px-4 py-2 bg-logoOrange hover:bg-orange-600 text-white rounded-md text-sm font-medium"
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

