'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function CreateUserForm({ onClose, onSuccess }) {
  console.log("CreateUserForm rendered");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastName: "",
    personalEmail: "",
    phoneNumber: "",
    dateOfBirth: "",
    area: "",
    street: "",
    building: "",
    emergencyContact: "",
    relationship: "",
    emergencyEmail: "",
    emergencyNumber: "",
    department: "",
    role: "",
    employmentType: "",
    startDate: "",
    workHours: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    status: "",
  });

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Log form data for debugging
    console.log("Form Data:", formData);

    // Call onSuccess with the form data
    onSuccess(formData);
    
    // Show success popup
    setShowSuccessPopup(true);
  };

  const handleSuccessClose = () => {
    console.log("Success popup closed");
    setShowSuccessPopup(false);
    onClose();
  };

  const renderField = (name, label, type = "text", options = null) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {options ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          required
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          placeholder={label}
          required
        />
      )}
    </div>
  );

  const renderSection = (title, fields) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold italic">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fields.map(field => (
          <div key={field[0]}>{renderField(...field)}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Create User</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {renderSection("Personal Information", [
              ["name", "Name"],
              ["lastName", "Last Name"],
              ["dateOfBirth", "Date of Birth", "date"],
              ["personalEmail", "Personal Email", "email"],
              ["phoneNumber", "Phone Number", "tel"],
              ["area", "Area"],
              ["street", "Street"],
              ["building", "Building"],
            ])}

            {renderSection("Emergency Contact Information", [
              ["emergencyContact", "Emergency Contact"],
              ["relationship", "Relationship", "select", [
                { value: "parent", label: "Parent" },
                { value: "spouse", label: "Spouse" },
                { value: "sibling", label: "Sibling" },
                { value: "friend", label: "Friend" },
                { value: "other", label: "Other" },
              ]],
              ["emergencyEmail", "Emergency Contact Email", "email"],
              ["emergencyNumber", "Emergency Contact Number", "tel"],
            ])}

            {renderSection("Professional Information", [
              ["department", "Department", "select", [
                { value: "engineering", label: "Engineering" },
                { value: "design", label: "Design" },
                { value: "marketing", label: "Marketing" },
                { value: "sales", label: "Sales" },
                { value: "hr", label: "HR" },
              ]],
              ["role", "Role/Position", "select", [
                { value: "developer", label: "Developer" },
                { value: "designer", label: "Designer" },
                { value: "manager", label: "Manager" },
                { value: "director", label: "Director" },
              ]],
              ["employmentType", "Employment Type", "select", [
                { value: "full-time", label: "Full Time" },
                { value: "part-time", label: "Part Time" },
                { value: "contract", label: "Contract" },
                { value: "intern", label: "Intern" },
              ]],
              ["startDate", "Start Date", "date"],
              ["workHours", "Work Hours"],
            ])}

            {renderSection("Account Details", [
              ["username", "Username"],
              ["email", "Email", "email"],
              ["password", "Temporary Password", "password"],
              ["confirmPassword", "Confirm Password", "password"],
            ])}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-logoOrange text-white rounded-md text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Success!</h3>
            <p className="mb-4">User has been added successfully.</p>
            <button
              onClick={handleSuccessClose}
              className="px-4 py-2 bg-logoOrange text-white rounded-md text-sm font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

