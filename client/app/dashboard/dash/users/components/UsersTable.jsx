"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, ArrowLeft, Trash2, X } from 'lucide-react';
import CreateUserForm from './CreateUserForm';

export default function UsersTable({ onBack, onCreateUser }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [users, setUsers] = useState([
    { name: "Jane Doe", role: "UX/UI Designer", status: "Inactive" },
    { name: "Jackson Doe", role: "Project Manager", status: "Active" },
    { name: "James Doe", role: "Graphic Designer", status: "Active" },
    { name: "Jennifer Doe", role: "Information Architect", status: "Inactive" },
    { name: "Alex Wang", role: "Content Strategist", status: "Active" },
    { name: "Tracy Harmouth", role: "Technical Strategist", status: "Active" },
    { name: "Karen Wilson", role: "UX/UI Designer", status: "Active" },
    { name: "Carlie Rakhazi", role: "Project Manager", status: "Active" },
    { name: "George Bakhtri", role: "Graphic Designer", status: "Active" },
    { name: "Dana Herb", role: "Information Architect", status: "Inactive" },
  ]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleStatus = (index) => {
    const newUsers = [...users];
    newUsers[index].status = newUsers[index].status === "Active" ? "Inactive" : "Active";
    setUsers(newUsers);
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
  };

  const cancelDelete = () => {
    setDeleteIndex(null);
  };

  const deleteUser = () => {
    if (deleteIndex !== null) {
      const newUsers = users.filter((_, i) => i !== deleteIndex);
      setUsers(newUsers);
      setDeleteIndex(null);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsEditMode(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-semibold text-[#2C3333]">Users</h2>
        </div>
        <button 
          onClick={onCreateUser}
          className="flex items-center gap-2 px-4 py-2 text-white text-base bg-logoOrange rounded-lg hover:bg-orange-500 transition duration-300"
        >
          <Plus className="w-5 h-5" />
          New User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role/Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 cursor-pointer" 
                onClick={() => handleUserSelect(user)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleStatus(index)}
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === "Active" 
                          ? "bg-green-100 text-green-800 hover:bg-green-200" 
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }`}
                    >
                      {user.status}
                    </button>
                    <button
                      onClick={() => confirmDelete(index)}
                      className="text-red-600 hover:text-red-900 ml-2"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
            {[1, 2, 3].map((page) => (
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
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === 3}
            className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Popup */}
      {deleteIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedUser && (
        <CreateUserForm
          user={selectedUser}
          isReadOnly={!isEditMode}
          onClose={() => setSelectedUser(null)}
          onSuccess={() => {
            setSelectedUser(null);
            // Refresh user list here
          }}
        />
      )}

      {selectedUser && (
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-2"
          >
            {isEditMode ? 'View' : 'Edit'}
          </button>
        </div>
      )}
    </div>
  );
}

