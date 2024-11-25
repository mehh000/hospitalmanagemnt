"use client";
import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash, FaSearch, FaPlus } from "react-icons/fa";

const NursesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedNurse, setSelectedNurse] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Sample nurses data - would come from API/database in real app
  const [nurses, setNurses] = useState([
    {
      id: 1,
      name: "Mary Johnson",
      email: "mary.j@hospital.com",
      phone: "+1 234-567-8904",
      qualification: "BSN, RN",
      department: "Emergency",
      shift: "Day",
      monthlyPay: 5000,
      status: "on duty"
    },
    {
      id: 2,
      name: "Patricia Brown",
      email: "patricia.b@hospital.com",
      phone: "+1 234-567-8905", 
      qualification: "MSN, RN",
      department: "ICU",
      shift: "Night",
      monthlyPay: 5500,
      status: "on leave"
    }
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNurses = nurses.filter(nurse =>
    nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nurse.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nurse.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (nurse) => {
    setSelectedNurse(nurse);
    setIsEditing(false);
    setIsAdding(false);
    setShowModal(true);
  };

  const handleEdit = (nurse) => {
    setSelectedNurse(nurse);
    setIsEditing(true);
    setIsAdding(false);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedNurse({
      id: nurses.length + 1,
      name: "",
      email: "",
      phone: "",
      qualification: "",
      department: "",
      shift: "Day",
      monthlyPay: "",
      status: "on duty"
    });
    setIsAdding(true);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (nurseId) => {
    setNurses(nurses.filter(nurse => nurse.id !== nurseId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdding) {
      setNurses([...nurses, selectedNurse]);
    } else {
      setNurses(nurses.map(nurse => 
        nurse.id === selectedNurse.id ? selectedNurse : nurse
      ));
    }
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Nurses Management</h1>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          Add Nurse
        </button>
      </div>

      <div className="mb-4 relative">
        <input
          type="text"
          placeholder="Search nurses..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded pl-10"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">Name</th>
              <th className="px-6 py-3 border-b text-left">Email</th>
              <th className="px-6 py-3 border-b text-left">Department</th>
              <th className="px-6 py-3 border-b text-left">Shift</th>
              <th className="px-6 py-3 border-b text-left">Status</th>
              <th className="px-6 py-3 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNurses.map((nurse) => (
              <tr key={nurse.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{nurse.name}</td>
                <td className="px-6 py-4 border-b">{nurse.email}</td>
                <td className="px-6 py-4 border-b">{nurse.department}</td>
                <td className="px-6 py-4 border-b">{nurse.shift}</td>
                <td className="px-6 py-4 border-b">{nurse.status}</td>
                <td className="px-6 py-4 border-b">
                  <div className="flex space-x-2">
                    <button onClick={() => handleView(nurse)} className="text-blue-600 hover:text-blue-800">
                      <FaEye />
                    </button>
                    <button onClick={() => handleEdit(nurse)} className="text-yellow-600 hover:text-yellow-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(nurse.id)} className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isAdding ? "Add Nurse" : isEditing ? "Edit Nurse" : "Nurse Details"}
            </h2>
            <div className="mt-4">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={selectedNurse.name}
                      onChange={(e) => setSelectedNurse({...selectedNurse, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      value={selectedNurse.email}
                      onChange={(e) => setSelectedNurse({...selectedNurse, email: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      value={selectedNurse.phone}
                      onChange={(e) => setSelectedNurse({...selectedNurse, phone: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Phone"
                    />
                    <input
                      type="text"
                      value={selectedNurse.qualification}
                      onChange={(e) => setSelectedNurse({...selectedNurse, qualification: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Qualification"
                    />
                    <input
                      type="text"
                      value={selectedNurse.department}
                      onChange={(e) => setSelectedNurse({...selectedNurse, department: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Department"
                    />
                    <select
                      value={selectedNurse.shift}
                      onChange={(e) => setSelectedNurse({...selectedNurse, shift: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="Day">Day</option>
                      <option value="Night">Night</option>
                    </select>
                    <input
                      type="number"
                      value={selectedNurse.monthlyPay}
                      onChange={(e) => setSelectedNurse({...selectedNurse, monthlyPay: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Monthly Pay"
                    />
                    <select
                      value={selectedNurse.status}
                      onChange={(e) => setSelectedNurse({...selectedNurse, status: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="on duty">On Duty</option>
                      <option value="on leave">On Leave</option>
                    </select>
                  </div>
                  <div className="mt-4 flex justify-end space-x-3">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                      {isAdding ? "Add" : "Save"}
                    </button>
                    <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <p><span className="font-semibold">Name:</span> {selectedNurse.name}</p>
                  <p><span className="font-semibold">Email:</span> {selectedNurse.email}</p>
                  <p><span className="font-semibold">Phone:</span> {selectedNurse.phone}</p>
                  <p><span className="font-semibold">Qualification:</span> {selectedNurse.qualification}</p>
                  <p><span className="font-semibold">Department:</span> {selectedNurse.department}</p>
                  <p><span className="font-semibold">Shift:</span> {selectedNurse.shift}</p>
                  <p><span className="font-semibold">Monthly Pay:</span> ${selectedNurse.monthlyPay}</p>
                  <p><span className="font-semibold">Status:</span> {selectedNurse.status}</p>
                  <div className="mt-4 flex justify-end">
                    <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NursesPage;
