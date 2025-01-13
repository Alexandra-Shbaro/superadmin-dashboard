"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, ArrowUpDown, Eye, Edit, Trash2 } from 'lucide-react'
import CreateClientForm from './components/create-client-form'
import ViewClient from './components/ViewClient'
import EditClientModal from './components/edit-client-modal'
import DeleteClientModal from './components/delete-client-modal'

const Button = ({ children, className, ...props }) => (
    <button
        className={`px-4 py-2 rounded-md text-sm font-medium ${className}`}
        {...props}
    >
        {children}
    </button>
)

const Card = ({ children, className, ...props }) => (
    <div className={`bg-white rounded-lg shadow-md ${className}`} {...props}>
        {children}
    </div>
)

const SortableHeader = ({ children }) => (
    <div className="flex items-center gap-2 cursor-pointer hover:text-gray-900">
        {children}
        <ArrowUpDown className="w-4 h-4" />
    </div>
)

const initialClients = [
    { id: 1, name: "Pepsi", representative: "John Doe", status: "Active" },
    { id: 2, name: "7up", representative: "Jane Doe", status: "Inactive" },
    { id: 3, name: "Lipton", representative: "Jackson Doe", status: "Active" },
    { id: 4, name: "Rim", representative: "Jamie Doe", status: "Active" },
    { id: 5, name: "Lays", representative: "Sally Salloum", status: "Inactive" },
    { id: 6, name: "Master", representative: "Dana Harb", status: "Active" },
    { id: 7, name: "Snips", representative: "Alexander Wang", status: "Active" },
    { id: 8, name: "KFC", representative: "Carlie Bakhazi", status: "Inactive" },
    { id: 9, name: "NYX", representative: "Elias Bakhazie", status: "Active" },
    { id: 10, name: "Moon's", representative: "Karen Wazen", status: "Active" },
    { id: 11, name: "Moon Dev", representative: "Selena Itani", status: "Inactive" },
    { id: 12, name: "Kinder", representative: "Alex Doe", status: "Active" },
    { id: 13, name: "Twix", representative: "Adam Salloum", status: "Inactive" },
    { id: 14, name: "Mars", representative: "Fouad Daoud", status: "Active" },
];

export default function ClientManagement() {
    const [clients, setClients] = useState(initialClients);
    const [currentPage, setCurrentPage] = useState(1);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [viewClient, setViewClient] = useState(null);
    const [editClient, setEditClient] = useState(null);
    const [deleteClient, setDeleteClient] = useState(null);

    const clientsPerPage = 10;
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;

    // Sort clients
    const sortedClients = [...clients].sort((a, b) => {
        if (!sortField) return 0;
        
        const aValue = a[sortField].toLowerCase();
        const bValue = b[sortField].toLowerCase();
        
        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const currentClients = sortedClients.slice(indexOfFirstClient, indexOfLastClient);
    const totalPages = Math.ceil(clients.length / clientsPerPage);

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleStatusChange = (clientId) => {
        setClients(clients.map(client => {
            if (client.id === clientId) {
                return {
                    ...client,
                    status: client.status === 'Active' ? 'Inactive' : 'Active'
                };
            }
            return client;
        }));
    };

    const handleCreateSuccess = (newClient) => {
        setClients([...clients, { ...newClient, id: clients.length + 1 }]);
        setShowCreateForm(false);
    };

    const handleView = (client) => {
    setViewClient(client);
};

const handleEdit = (client) => {
    setEditClient(client);
};

const handleDelete = (client) => {
    setDeleteClient(client);
};

    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-softBlack">Client Management</h1>
                <Button 
                    onClick={() => setShowCreateForm(true)}
                    className="p-2 text-white text-sm bg-logoOrange rounded-lg hover:bg-orange-500 transition duration-300 flex items-center"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    New Client
                </Button>
            </div>

            <Card className="p-6">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
                                        onClick={() => handleSort('name')}
                                    >
                                        Client
                                        <ArrowUpDown className="w-4 h-4" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer hover:text-gray-900"
                                        onClick={() => handleSort('representative')}
                                    >
                                        Client Representative
                                        <ArrowUpDown className="w-4 h-4" />
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentClients.map((client) => (
                                <tr key={client.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {client.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {client.representative}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => handleStatusChange(client.id)}
                                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                client.status === 'Active'
                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                            }`}
                                        >
                                            {client.status}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleView(client)}
                                                className="p-1 hover:bg-gray-100 rounded-full"
                                            >
                                                <Eye className="w-4 h-4 text-gray-500" />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(client)}
                                                className="p-1 hover:bg-gray-100 rounded-full"
                                            >
                                                <Edit className="w-4 h-4 text-gray-500" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(client.id)}
                                                className="p-1 hover:bg-gray-100 rounded-full text-red-500"
                                            >
                                                <Trash2 className="w-4 h-4" />
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
            </Card>

            {showCreateForm && (
                <CreateClientForm
                    onClose={() => setShowCreateForm(false)}
                    onSuccess={handleCreateSuccess}
                />
            )}
            {viewClient && (
                <ViewClientModal
                    client={viewClient}
                    onClose={() => setViewClient(null)}
                />
            )}
            {editClient && (
                <EditClientModal
                    client={editClient}
                    onClose={() => setEditClient(null)}
                    onSuccess={(updatedClient) => {
                        setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
                        setEditClient(null);
                    }}
                />
            )}
            {deleteClient && (
                <DeleteClientModal
                    client={deleteClient}
                    onClose={() => setDeleteClient(null)}
                    onConfirm={() => {
                        setClients(clients.filter(c => c.id !== deleteClient.id));
                        setDeleteClient(null);
                    }}
                />
            )}
        </div>
    );
}

