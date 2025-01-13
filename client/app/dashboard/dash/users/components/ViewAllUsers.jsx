import { UsersTable } from "./UsersTable";
// This would typically come from your database
const MOCK_USERS = [
  { id: '1', name: 'John Doe', role: 'Technical Strategist', status: 'active' },
  { id: '2', name: 'Jane Doe', role: 'UX/UI Designer', status: 'inactive' },
  { id: '3', name: 'Jackson Doe', role: 'Project Manager', status: 'active' },
  { id: '4', name: 'James Doe', role: 'Graphic Designer', status: 'active' },
  { id: '5', name: 'Jennifer Doe', role: 'Information Architect', status: 'inactive' },
  { id: '6', name: 'Alex Wang', role: 'Content Strategist', status: 'active' },
  { id: '7', name: 'Tracy Harmough', role: 'Technical Strategist', status: 'active' },
  { id: '8', name: 'Karen Wazen', role: 'UX/UI Designer', status: 'inactive' },
]

export default async function UsersPage() {
  // In a real app, you would fetch this from your database
  const users = MOCK_USERS
  const totalPages = 3
  const currentPage = 1

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
        <button className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800">
          New User
        </button>
      </div>
      <UsersTable 
        initialUsers={users} 
        totalPages={totalPages} 
        initialPage={currentPage} 
      />
    </div>
  )
}

