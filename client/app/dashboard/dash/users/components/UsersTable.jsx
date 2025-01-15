"use client";

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, ArrowLeft, Trash2, X, Edit, Eye } from 'lucide-react';
import CreateUserForm from './CreateUserForm';

export default function UsersTable({ onBack, onCreateUser }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: "Jane Doe", role: "UX/UI Designer", status: "Inactive" },
    { id: 2, name: "Jackson Doe", role: "Project Manager", status: "Active" },
    { id: 3, name: "James Doe", role: "Graphic Designer", status: "Active" },
    { id: 4, name: "Jennifer Doe", role: "Information Architect", status: "Inactive" },
    { id: 5, name: "Alex Wang", role: "Content Strategist", status: "Active" },
    { id: 6, name: "Tracy Harmouth", role: "Technical Strategist", status: "Active" },
    { id: 7, name: "Karen Wilson", role: "UX/UI Designer", status: "Active" },
    { id: 8, name: "Carlie Rakhazi", role: "Project Manager", status: "Active" },
    { id: 9, name: "George Bakhtri", role: "Graphic Designer", status: "Active" },
    { id: 10, name: "Dana Herb", role: "Information Architect", status: "Inactive" },
    { id: 11, name: "Bushra Itani", role: "Graphic Designer", status: "Active" },
    { id: 12, name: "Johnny Haidar", role: "Information Architect", status: "Inactive" },
  ]);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleStatus = (e, index) => {
    e.stopPropagation();
    const newUsers = [...users];
    newUsers[index].status = newUsers[index].status === "Active" ? "Inactive" : "Active";
    setUsers(newUsers);
  };

  const confirmDelete = (e, index) => {
    e.stopPropagation();
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

  const handleUserSelect = (user, mode) => {
    setSelectedUser(user);
    setIsEditMode(mode === 'edit');
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUsers = users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setSelectedUser(null);
    setIsEditMode(false);
  };

  const usersPerPage = 10;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={(e) => toggleStatus(e, startIndex + index)}
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                  >
                    {user.status}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <button
                    onClick={() => handleUserSelect(user, 'view')}
                    className="text-gray-500 hover:text-gray-700 mr-2"
                  >
                    <Eye className="w-5 h-5 inline" />
                  </button>
                  <button
                    onClick={() => handleUserSelect(user, 'edit')}
                    className="text-gray-500 hover:text-gray-700 mr-2"
                  >
                    <Edit className="w-5 h-5 inline" />
                  </button>
                  <button
                    onClick={(e) => confirmDelete(e, startIndex + index)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="rounded-md px-3 py-1 text-sm font-medium text-[#5C5C5C] hover:bg-[#E7E7E7] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`rounded-md px-3 py-1 text-sm font-medium ${
              i + 1 === currentPage
                ? "bg-[#FF8A00] text-[#FAFAFA]"
                : "text-[#5C5C5C] hover:bg-[#E7E7E7]"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="rounded-md px-3 py-1 text-sm font-medium text-[#5C5C5C] hover:bg-[#E7E7E7] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Delete Confirmation Popup */}
      {deleteIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
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
                className="px-4 py-2 bg-logoOrange text-white rounded-md text-sm font-medium hover:bg-red-700"
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
          onClose={() => {
            setSelectedUser(null);
            setIsEditMode(false);
          }}
          onSuccess={handleUpdateUser}
        />
      )}
    </div>
  );
}

