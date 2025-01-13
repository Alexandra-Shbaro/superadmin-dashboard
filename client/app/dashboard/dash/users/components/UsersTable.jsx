'use client'

import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react'

const USERS_PER_PAGE = 8

export function UsersTable({ initialUsers, totalPages, initialPage }) {
  const [users, setUsers] = useState(initialUsers)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [isPending, setIsPending] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE
    return users.slice(startIndex, startIndex + USERS_PER_PAGE)
  }, [users, currentPage])

  async function handleStatusUpdate(userId, newStatus) {
    setIsPending(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setUsers((users) =>
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    )
    setIsPending(false)
  }

  async function handleDeleteUser(userId) {
    setIsPending(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setUsers((users) => users.filter((user) => user.id !== userId))
    setIsPending(false)
    setUserToDelete(null)
  }

  function handlePageChange(newPage) {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 w-[200px] text-left">User</th>
              <th className="px-4 py-2 text-left">Role/Position</th>
              <th className="px-4 py-2 text-right">Status</th>
              <th className="px-4 py-2 w-[50px]"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-2 font-medium">{user.name}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 text-right">
                  <span className="mr-4 text-sm text-gray-500">
                    {user.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                  <button
                    className={`px-2 py-1 border rounded ${
                      user.status === 'active'
                        ? 'border-red-500 text-red-500'
                        : 'border-green-500 text-green-500'
                    }`}
                    disabled={isPending}
                    onClick={() =>
                      handleStatusUpdate(
                        user.id,
                        user.status === 'active' ? 'inactive' : 'active'
                      )
                    }
                  >
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
                <td className="px-4 py-2 text-right">
                  <button
                    className="text-red-500 hover:text-red-600"
                    disabled={isPending}
                    onClick={() => setUserToDelete(user.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-center space-x-2 py-4">
          <button
            className="px-2 py-1 border rounded"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-2 py-1 border rounded ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-black'
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="px-2 py-1 border rounded"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {userToDelete !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-[300px]">
            <h2 className="text-lg font-semibold">Are you sure?</h2>
            <p className="text-sm text-gray-600 mt-2">
              This action cannot be undone. This will permanently delete the
              user and remove their data from the system.
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="px-4 py-2 border rounded text-gray-500 hover:bg-gray-100"
                onClick={() => setUserToDelete(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => userToDelete && handleDeleteUser(userToDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
