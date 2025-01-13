"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, ArrowUpDown, Eye, Edit, Trash2, X, Calendar } from 'lucide-react'

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
    { id: 1, name: "Pepsi", representative: "John Doe", status: "Active", clientPhone: "123-456-7890", clientEmail: "pepsi@example.com", clientWebsite: "www.pepsi.com", clientAddress: "123 Pepsi St", industry: "Beverages", repName: "John Doe", repPhone: "987-654-3210", repEmail: "john@pepsi.com", repPosition: "Sales Manager", username: "pepsi_admin", email: "admin@pepsi.com", dateCreated: "2023-01-01", subscriptionPlan: "Premium" },
    { id: 2, name: "7up", representative: "Jane Doe", status: "Inactive", clientPhone: "234-567-8901", clientEmail: "7up@example.com", clientWebsite: "www.7up.com", clientAddress: "456 7up Ave", industry: "Beverages", repName: "Jane Doe", repPhone: "876-543-2109", repEmail: "jane@7up.com", repPosition: "Marketing Director", username: "7up_admin", email: "admin@7up.com", dateCreated: "2023-02-15", subscriptionPlan: "Basic" },
    { id: 3, name: "Lipton", representative: "Jackson Doe", status: "Active", clientPhone: "345-678-9012", clientEmail: "lipton@example.com", clientWebsite: "www.lipton.com", clientAddress: "789 Lipton Ln", industry: "Beverages", repName: "Jackson Doe", repPhone: "765-432-1098", repEmail: "jackson@lipton.com", repPosition: "Product Manager", username: "lipton_admin", email: "admin@lipton.com", dateCreated: "2023-03-20", subscriptionPlan: "Premium" },
    { id: 4, name: "Rim", representative: "Jamie Doe", status: "Active", clientPhone: "456-789-0123", clientEmail: "rim@example.com", clientWebsite: "www.rim.com", clientAddress: "101 Rim Rd", industry: "Cosmetics", repName: "Jamie Doe", repPhone: "654-321-0987", repEmail: "jamie@rim.com", repPosition: "Brand Manager", username: "rim_admin", email: "admin@rim.com", dateCreated: "2023-04-25", subscriptionPlan: "Basic" },
    { id: 5, name: "Lays", representative: "Sally Salloum", status: "Inactive", clientPhone: "567-890-1234", clientEmail: "lays@example.com", clientWebsite: "www.lays.com", clientAddress: "222 Lays Blvd", industry: "Snacks", repName: "Sally Salloum", repPhone: "543-210-9876", repEmail: "sally@lays.com", repPosition: "Marketing Manager", username: "lays_admin", email: "admin@lays.com", dateCreated: "2023-05-30", subscriptionPlan: "Premium" },
    { id: 6, name: "Master", representative: "Dana Harb", status: "Active", clientPhone: "678-901-2345", clientEmail: "master@example.com", clientWebsite: "www.master.com", clientAddress: "333 Master Dr", industry: "Cards", repName: "Dana Harb", repPhone: "432-109-8765", repEmail: "dana@master.com", repPosition: "Sales Representative", username: "master_admin", email: "admin@master.com", dateCreated: "2023-06-05", subscriptionPlan: "Basic" },
    { id: 7, name: "Snips", representative: "Alexander Wang", status: "Active", clientPhone: "789-012-3456", clientEmail: "snips@example.com", clientWebsite: "www.snips.com", clientAddress: "444 Snips Way", industry: "Technology", repName: "Alexander Wang", repPhone: "321-098-7654", repEmail: "alexander@snips.com", repPosition: "Software Engineer", username: "snips_admin", email: "admin@snips.com", dateCreated: "2023-07-10", subscriptionPlan: "Premium" },
    { id: 8, name: "KFC", representative: "Carlie Bakhazi", status: "Inactive", clientPhone: "890-123-4567", clientEmail: "kfc@example.com", clientWebsite: "www.kfc.com", clientAddress: "555 KFC Ave", industry: "Food", repName: "Carlie Bakhazi", repPhone: "210-987-6543", repEmail: "carlie@kfc.com", repPosition: "Restaurant Manager", username: "kfc_admin", email: "admin@kfc.com", dateCreated: "2023-08-15", subscriptionPlan: "Basic" },
    { id: 9, name: "NYX", representative: "Elias Bakhazie", status: "Active", clientPhone: "901-234-5678", clientEmail: "nyx@example.com", clientWebsite: "www.nyx.com", clientAddress: "666 NYX St", industry: "Cosmetics", repName: "Elias Bakhazie", repPhone: "109-876-5432", repEmail: "elias@nyx.com", repPosition: "Marketing Specialist", username: "nyx_admin", email: "admin@nyx.com", dateCreated: "2023-09-20", subscriptionPlan: "Premium" },
    { id: 10, name: "Moon's", representative: "Karen Wazen", status: "Active", clientPhone: "111-222-3333", clientEmail: "moons@example.com", clientWebsite: "www.moons.com", clientAddress: "777 Moon Ln", industry: "Fashion", repName: "Karen Wazen", repPhone: "987-654-3210", repEmail: "karen@moons.com", repPosition: "Fashion Designer", username: "moons_admin", email: "admin@moons.com", dateCreated: "2023-10-25", subscriptionPlan: "Basic" },
    { id: 11, name: "Moon Dev", representative: "Selena Itani", status: "Inactive", clientPhone: "222-333-4444", clientEmail: "moondevelop@example.com", clientWebsite: "www.moondevelop.com", clientAddress: "888 Moon Rd", industry: "Technology", repName: "Selena Itani", repPhone: "876-543-2109", repEmail: "selena@moondevelop.com", repPosition: "Web Developer", username: "moondevelop_admin", email: "admin@moondevelop.com", dateCreated: "2023-11-30", subscriptionPlan: "Premium" },
    { id: 12, name: "Kinder", representative: "Alex Doe", status: "Active", clientPhone: "333-444-5555", clientEmail: "kinder@example.com", clientWebsite: "www.kinder.com", clientAddress: "999 Kinder Ave", industry: "Food", repName: "Alex Doe", repPhone: "765-432-1098", repEmail: "alex@kinder.com", repPosition: "Product Manager", username: "kinder_admin", email: "admin@kinder.com", dateCreated: "2023-12-05", subscriptionPlan: "Basic" },
    { id: 13, name: "Twix", representative: "Adam Salloum", status: "Inactive", clientPhone: "444-555-6666", clientEmail: "twix@example.com", clientWebsite: "www.twix.com", clientAddress: "100 Twix St", industry: "Food", repName: "Adam Salloum", repPhone: "654-321-0987", repEmail: "adam@twix.com", repPosition: "Sales Manager", username: "twix_admin", email: "admin@twix.com", dateCreated: "2024-01-10", subscriptionPlan: "Premium" },
    { id: 14, name: "Mars", representative: "Fouad Daoud", status: "Active", clientPhone: "555-666-7777", clientEmail: "mars@example.com", clientWebsite: "www.mars.com", clientAddress: "200 Mars Blvd", industry: "Food", repName: "Fouad Daoud", repPhone: "543-210-9876", repEmail: "fouad@mars.com", repPosition: "Marketing Director", username: "mars_admin", email: "admin@mars.com", dateCreated: "2024-02-15", subscriptionPlan: "Basic" },
];

export default function ClientManagement() {
    const [clients, setClients] = useState(initialClients);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // 'create', 'edit', 'view', 'delete'
    const [sortField, setSortField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedClient, setSelectedClient] = useState(null);
    const [formData, setFormData] = useState({
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        clientWebsite: '',
        clientAddress: '',
        industry: '',
        repName: '',
        repPhone: '',
        repEmail: '',
        repPosition: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateCreated: new Date().toISOString().split('T')[0],
        subscriptionPlan: 'basic'
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (modalMode === 'create') {
            const newClient = {
                id: clients.length + 1,
                name: formData.clientName,
                representative: formData.repName,
                status: 'Active',
                ...formData
            };
            setClients([...clients, newClient]);
        } else if (modalMode === 'edit') {
            setClients(clients.map(client => 
                client.id === selectedClient.id ? { ...client, ...formData } : client
            ));
        }
        setShowModal(false);
        setSelectedClient(null);
        setFormData({
            clientName: '',
            clientPhone: '',
            clientEmail: '',
            clientWebsite: '',
            clientAddress: '',
            industry: '',
            repName: '',
            repPhone: '',
            repEmail: '',
            repPosition: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            dateCreated: new Date().toISOString().split('T')[0],
            subscriptionPlan: 'basic'
        });
    };

    const handleView = (client) => {
        setSelectedClient(client);
        setFormData(client);
        setModalMode('view');
        setShowModal(true);
    };

    const handleEdit = (client) => {
        setSelectedClient(client);
        setFormData(client);
        setModalMode('edit');
        setShowModal(true);
    };

    const handleDelete = (client) => {
        setSelectedClient(client);
        setModalMode('delete');
        setShowModal(true);
    };

    const confirmDelete = () => {
        setClients(clients.filter(c => c.id !== selectedClient.id));
        setShowModal(false);
        setSelectedClient(null);
    };

    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold text-softBlack">Client Management</h1>
                <Button 
                    onClick={() => {
                        setModalMode('create');
                        setShowModal(true);
                    }}
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
                                                onClick={() => handleDelete(client)}
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

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold">
                                    {modalMode === 'create' && 'Create New Client'}
                                    {modalMode === 'edit' && 'Edit Client'}
                                    {modalMode === 'view' && 'View Client'}
                                    {modalMode === 'delete' && 'Delete Client'}
                                </h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {modalMode === 'delete' ? (
                                <div>
                                    <p className="mb-4">Are you sure you want to delete the client "{selectedClient.name}"? This action cannot be undone.</p>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={confirmDelete}
                                            className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Client Basic Information */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-gray-700 mb-4">Client Basic Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                                                {modalMode === 'view' ? (
                                                    <p>{formData.clientName}</p>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        name="clientName"
                                                        value={formData.clientName}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                        required
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Phone Number</label>
                                                {modalMode === 'view' ? (
                                                    <p>{formData.clientPhone}</p>
                                                ) : (
                                                    <input
                                                        type="tel"
                                                        name="clientPhone"
                                                        value={formData.clientPhone}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                        required
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Email</label>
                                                {modalMode === 'view' ? (
                                                    <p>{formData.clientEmail}</p>
                                                ) : (
                                                    <input
                                                        type="email"
                                                        name="clientEmail"
                                                        value={formData.clientEmail}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                        required
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Website URL</label>
                                                {modalMode === 'view' ? (
                                                    <p>{formData.clientWebsite}</p>
                                                ) : (
                                                    <input
                                                        type="url"
                                                        name="clientWebsite"
                                                        value={formData.clientWebsite}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Address</label>
                                                {modalMode === 'view' ? (
                                                    <p>{formData.clientAddress}</p>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        name="clientAddress"
                                                        value={formData.clientAddress}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                        required
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                                                {modalMode === 'view' ? (
                                                    <p>{formData.industry}</p>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        name="industry"
                                                        value={formData.industry}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                        required
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Client Representative Information */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h3 className="text-sm font-medium text-gray-700 mb-4">Client Representative Basic Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Representative Name</label>
                                                {modalMode === 'view' ? (
                                                    <p>{formData.repName}</p>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        name="repName"
                                                        value={formData.repName}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                        required
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Representative Phone Number</label>
                                                {modalMode === 'view' ? (
                                                    <p>{formData.repPhone}</p>
                                                ) : (
                                                    <input
                                                        type="tel"
                                                        name="repPhone"
                                                        value={formData.repPhone}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                        required
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Representative Email</label>
                                                {modalMode === 'view' ? (
                                                    <p>{formData.repEmail}</p>
                                                ) : (
                                                    <input
                                                        type="email"
                                                        name="repEmail"
                                                        value={formData.repEmail}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                        required
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Representative Position</label>
                                                {modalMode === 'view' ? (
                                                    <p>{formData.repPosition}</p>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        name="repPosition"
                                                        value={formData.repPosition}
                                                        onChange={handleChange}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                        required
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Authentication Details */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="text-sm font-medium text-gray-700 mb-4">Authentication Details</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                                    {modalMode === 'view' ? (
                                                        <p>{formData.username}</p>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            value={formData.username}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                            required
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                    {modalMode === 'view' ? (
                                                        <p>{formData.email}</p>
                                                    ) : (
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                            required
                                                        />
                                                    )}
                                                </div>
                                                {modalMode !== 'view' && (
                                                    <>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Temporary Password</label>
                                                            <input
                                                                type="password"
                                                                name="password"
                                                                value={formData.password}
                                                                onChange={handleChange}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                                required={modalMode === 'create'}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                                            <input
                                                                type="password"
                                                                name="confirmPassword"
                                                                value={formData.confirmPassword}
                                                                onChange={handleChange}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                                required={modalMode === 'create'}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Administrative Fields */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="text-sm font-medium text-gray-700 mb-4">Administrative Fields</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Created</label>
                                                    {modalMode === 'view' ? (
                                                        <p>{formData.dateCreated}</p>
                                                    ) : (
                                                        <div className="relative">
                                                            <input
                                                                type="date"
                                                                name="dateCreated"
                                                                value={formData.dateCreated}
                                                                onChange={handleChange}
                                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                                required
                                                            />
                                                            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subscription Plan</label>
                                                    {modalMode === 'view' ? (
                                                        <p>{formData.subscriptionPlan}</p>
                                                    ) : (
                                                        <select
                                                            name="subscriptionPlan"
                                                            value={formData.subscriptionPlan}
                                                            onChange={handleChange}
                                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                                        >
                                                            <option value="basic">Basic Plan</option>
                                                            <option value="premium">Premium Plan</option>
                                                            <option value="enterprise">Enterprise Plan</option>
                                                        </select>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {modalMode !== 'view' && (
                                        <div className="flex justify-end gap-3 pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-logoOrange text-white rounded-md text-sm font-medium hover:bg-orange-600"
                                            >
                                                {modalMode === 'create' ? 'Create' : 'Save Changes'}
                                            </button>
                                        </div>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

