"use client"

import { useState } from 'react'
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import TeamsListView from './components/TeamsListview'
import CreateTeamForm from './components/CreateTeamForm'

// Custom Button component
const Button = ({ children, className, ...props }) => (
    <button
        className={`px-4 py-2 rounded-md text-sm font-medium ${className}`}
        {...props}
    >
        {children}
    </button>
)

// Custom Card component
const Card = ({ children, className, ...props }) => (
    <div className={`bg-white rounded-lg shadow-md ${className}`} {...props}>
        {children}
    </div>
)

// Custom Table components
const Table = ({ children, ...props }) => (
    <table className="w-full border-collapse" {...props}>
        {children}
    </table>
)

const TableHeader = ({ children, ...props }) => (
    <thead className="bg-gray-100" {...props}>
        {children}
    </thead>
)

const TableBody = ({ children, ...props }) => (
    <tbody {...props}>{children}</tbody>
)

const TableRow = ({ children, ...props }) => (
    <tr className="border-b border-gray-200" {...props}>
        {children}
    </tr>
)

const TableHead = ({ children, ...props }) => (
    <th className="px-4 py-2 text-left text-sm font-medium text-gray-600" {...props}>
        {children}
    </th>
)

const TableCell = ({ children, ...props }) => (
    <td className="px-4 py-2 text-sm" {...props}>
        {children}
    </td>
)

// Sample data
const currentTeams = [
    {
        teamName: "Team Alpha",
        teamLead: "John Doe",
        projectManager: "Alexander Wang",
        department: "Operations",
        creationDate: "Tue 7 January 2025, 11:00 AM"
    },
    {
        teamName: "Team Beta",
        teamLead: "Jane Doe",
        projectManager: "Adam Woo",
        department: "Design",
        creationDate: "Tue 7 January 2025, 11:00 AM"
    },
    {
        teamName: "Team Omega",
        teamLead: "Mary Martinez",
        projectManager: "Sally Sprouse",
        department: "Social Media",
        creationDate: "Tue 7 January 2025, 11:00 AM"
    },
    {
        teamName: "Team Delta",
        teamLead: "Alice Johnson",
        projectManager: "Bob Smith",
        department: "Marketing",
        creationDate: "Wed 8 January 2025, 10:00 AM"
    },
    {
        teamName: "Team Epsilon",
        teamLead: "Charlie Brown",
        projectManager: "Diana Prince",
        department: "IT",
        creationDate: "Thu 9 January 2025, 9:00 AM"
    }
]

const requestedTeams = [
    {
        requestId: "001",
        teamLead: "John Doe",
        projectManager: "Mary Beth",
        requestedTeam: "Team One",
        requestDate: "Tue 7 January 2025, 11:00 AM"
    },
    {
        requestId: "002",
        teamLead: "Jane Doe",
        projectManager: "Tony Beth",
        requestedTeam: "Team Two",
        requestDate: "Tue 7 January 2025, 11:00 AM"
    },
    {
        requestId: "003",
        teamLead: "Alice Johnson",
        projectManager: "Bob Smith",
        requestedTeam: "Team Three",
        requestDate: "Wed 8 January 2025, 10:00 AM"
    },
    {
        requestId: "004",
        teamLead: "Charlie Brown",
        projectManager: "Diana Prince",
        requestedTeam: "Team Four",
        requestDate: "Thu 9 January 2025, 9:00 AM"
    }
]

export default function TeamManagement() {
    const [currentPage, setCurrentPage] = useState(1)
    const [requestedPage, setRequestedPage] = useState(1)
    const [showTeamsList, setShowTeamsList] = useState(false)
    const [showCreateForm, setShowCreateForm] = useState(false)

    const CURRENT_TEAMS_PER_PAGE = 3
    const REQUESTED_TEAMS_PER_PAGE = 2

    const currentTeamsPages = Math.ceil(currentTeams.length / CURRENT_TEAMS_PER_PAGE)
    const currentTeamsStart = (currentPage - 1) * CURRENT_TEAMS_PER_PAGE
    const currentTeamsEnd = currentTeamsStart + CURRENT_TEAMS_PER_PAGE
    const currentTeamsToShow = currentTeams.slice(currentTeamsStart, currentTeamsEnd)

    const requestedTeamsPages = Math.ceil(requestedTeams.length / REQUESTED_TEAMS_PER_PAGE)
    const requestedTeamsStart = (requestedPage - 1) * REQUESTED_TEAMS_PER_PAGE
    const requestedTeamsEnd = requestedTeamsStart + REQUESTED_TEAMS_PER_PAGE
    const requestedTeamsToShow = requestedTeams.slice(requestedTeamsStart, requestedTeamsEnd)

    if (showTeamsList) {
        return <TeamsListView onBack={() => setShowTeamsList(false)} />
    }

    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-softBlack">Teams Management</h1>
                <Button 
                    onClick={() => setShowCreateForm(true)} 
                    className="p-2 text-white text-sm bg-logoOrange rounded-lg hover:bg-orange-500 transition duration-300 flex items-center"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Team
                </Button>
            </div>

            <Card className="p-6">
                <h2 
                    className="text-xl font-semibold mb-4 cursor-pointer hover:text-gray-600"
                    onClick={() => setShowTeamsList(true)}
                >
                    Current Teams
                </h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Team Name</TableHead>
                            <TableHead>Team Lead</TableHead>
                            <TableHead>Project Manager</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Team Creation Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentTeamsToShow.map((team, index) => (
                            <TableRow key={index}>
                                <TableCell>{team.teamName}</TableCell>
                                <TableCell>{team.teamLead}</TableCell>
                                <TableCell>{team.projectManager}</TableCell>
                                <TableCell>{team.department}</TableCell>
                                <TableCell>{team.creationDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

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
                            {[...Array(currentTeamsPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                                        currentPage === i + 1
                                            ? "bg-logoOrange text-white"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, currentTeamsPages))}
                            disabled={currentPage === currentTeamsPages}
                            className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Requested Teams</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Request ID</TableHead>
                            <TableHead>Team Lead</TableHead>
                            <TableHead>Project Manager</TableHead>
                            <TableHead>Requested Team</TableHead>
                            <TableHead>Request Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requestedTeamsToShow.map((team, index) => (
                            <TableRow key={index}>
                                <TableCell>{team.requestId}</TableCell>
                                <TableCell>{team.teamLead}</TableCell>
                                <TableCell>{team.projectManager}</TableCell>
                                <TableCell>{team.requestedTeam}</TableCell>
                                <TableCell>{team.requestDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex justify-center mt-4">
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setRequestedPage(prev => Math.max(prev - 1, 1))}
                            disabled={requestedPage === 1}
                            className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="flex items-center space-x-1">
                            {[...Array(requestedTeamsPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setRequestedPage(i + 1)}
                                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                                        requestedPage === i + 1
                                            ? "bg-logoOrange text-white"
                                            : "text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setRequestedPage(prev => Math.min(prev + 1, requestedTeamsPages))}
                            disabled={requestedPage === requestedTeamsPages}
                            className="inline-flex items-center px-2 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </Card>
            {showCreateForm && (
                <CreateTeamForm
                    onClose={() => setShowCreateForm(false)}
                    onSuccess={() => {
                        setShowCreateForm(false)
                        // Optionally refresh teams data here
                    }}
                />
            )}
        </div>
    )
}

