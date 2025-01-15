"use client"

import { useState } from 'react'
import { X, Plus, Minus } from 'lucide-react'

export default function CreateTeamForm({ onClose, onSuccess }) {
  const [teamMembers, setTeamMembers] = useState([{ position: '', name: '' }]);
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [teamTitle, setTeamTitle] = useState('');
  const [teamManager, setTeamManager] = useState('');

  const addTeamMember = () => {
      setTeamMembers([...teamMembers, { position: '', name: '' }]);
  };

  const removeTeamMember = (index) => {
      const newMembers = teamMembers.filter((_, i) => i !== index);
      setTeamMembers(newMembers);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      const newTeam = {
          id: Date.now(),
          name: teamName,
          description: teamDescription,
          department,
          title: teamTitle,
          manager: teamManager,
          members: teamMembers,
          status: 'Active'
      };
      onSuccess(newTeam);
      onClose();
  };

  return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[600px] max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Create New Team</h2>
                  <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                      <X className="w-5 h-5" />
                  </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                              Team Name
                          </label>
                          <input
                              type="text"
                              required
                              value={teamName}
                              onChange={(e) => setTeamName(e.target.value)}
                              placeholder="Enter team name"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                              Team Description
                          </label>
                          <input
                              type="text"
                              required
                              value={teamDescription}
                              onChange={(e) => setTeamDescription(e.target.value)}
                              placeholder="Enter team description"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                              Department / Phase
                          </label>
                          <select
                              required
                              value={department}
                              onChange={(e) => setDepartment(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                              <option value="">Select Department / Phase</option>
                              <option value="design">Design</option>
                              <option value="development">Development</option>
                              <option value="marketing">Marketing</option>
                          </select>
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                              Team Title
                          </label>
                          <select
                              required
                              value={teamTitle}
                              onChange={(e) => setTeamTitle(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          >
                              <option value="">Select Team Title</option>
                              <option value="core">Core Team</option>
                              <option value="support">Support Team</option>
                              <option value="specialized">Specialized Team</option>
                          </select>
                      </div>
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                          Team Manager
                      </label>
                      <select
                          required
                          value={teamManager}
                          onChange={(e) => setTeamManager(e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                          <option value="">Select Team Manager</option>
                          <option value="john">John Doe</option>
                          <option value="jane">Jane Smith</option>
                          <option value="mike">Mike Johnson</option>
                      </select>
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                          Team Members
                      </label>
                      <div className="space-y-3">
                          {teamMembers.map((member, index) => (
                              <div key={index} className="flex gap-4 items-start">
                                  <div className="flex-1">
                                      <select
                                          required
                                          value={member.position}
                                          onChange={(e) => {
                                              const newMembers = [...teamMembers];
                                              newMembers[index].position = e.target.value;
                                              setTeamMembers(newMembers);
                                          }}
                                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                      >
                                          <option value="">Select Position</option>
                                          <option value="developer">Developer</option>
                                          <option value="designer">Designer</option>
                                          <option value="manager">Manager</option>
                                      </select>
                                  </div>
                                  <div className="flex-1">
                                      <select
                                          required
                                          value={member.name}
                                          onChange={(e) => {
                                              const newMembers = [...teamMembers];
                                              newMembers[index].name = e.target.value;
                                              setTeamMembers(newMembers);
                                          }}
                                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                      >
                                          <option value="">Select Member</option>
                                          <option value="john">John Doe</option>
                                          <option value="jane">Jane Smith</option>
                                          <option value="mike">Mike Johnson</option>
                                      </select>
                                  </div>
                                  <button
                                      type="button"
                                      onClick={() => removeTeamMember(index)}
                                      className="p-2 text-gray-500 hover:text-gray-700"
                                  >
                                      <Minus className="w-5 h-5" />
                                  </button>
                              </div>
                          ))}
                          <button
                              type="button"
                              onClick={addTeamMember}
                              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
                          >
                              <Plus className="w-4 h-4" />
                              Add Team Member
                          </button>
                      </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                      <button
                          type="button"
                          onClick={onClose}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                          Cancel
                      </button>
                      <button
                          type="submit"
                          className="px-4 py-2 bg-logoOrange text-white rounded-md text-sm font-medium hover:bg-orange-600"
                      >
                          Create
                      </button>
                  </div>
              </form>
          </div>
      </div>
  );
}

