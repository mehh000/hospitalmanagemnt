"use client";
import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash, FaSearch, FaPlus } from "react-icons/fa";

const StaffPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Sample staff data - would come from API/database in real app
  const [staffMembers, setStaffMembers] = useState([
    {
      id: 1,
      name: "Jane Cooper",
      email: "jane.cooper@hospital.com",
      phone: "+1 234-567-8902",
      address: "123 Main St, City, State 12345",
      role: "Administrative Assistant",
      department: "Administration",
      monthlyPay: 4500,
      status: "on duty"
    },
    {
      id: 2,
      name: "Robert Wilson",
      email: "robert.w@hospital.com", 
      phone: "+1 234-567-8903",
      address: "456 Oak Ave, City, State 12345",
      role: "IT Specialist",
      department: "Information Technology",
      monthlyPay: 6000,
      status: "on leave"
    },
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStaff = staffMembers.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (staff) => {
    setSelectedStaff(staff);
    setIsEditing(false);
    setIsAdding(false);
    setShowModal(true);
  };

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setIsEditing(true);
    setIsAdding(false);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedStaff({
      id: staffMembers.length + 1,
      name: "",
      email: "",
      phone: "",
      address: "",
      role: "",
      department: "",
      monthlyPay: "",
      status: "on duty"
    });
    setIsAdding(true);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      setStaffMembers(staffMembers.filter(staff => staff.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdding) {
      setStaffMembers([...staffMembers, selectedStaff]);
    } else if (isEditing) {
      setStaffMembers(staffMembers.map(staff => 
        staff.id === selectedStaff.id ? selectedStaff : staff
      ));
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Staff Management</h1>
        <button 
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add Staff
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="flex items-center bg-white p-4 rounded-lg shadow-md">
        <FaSearch className="text-gray-400 mr-3" />
        <input
          type="text"
          placeholder="Search staff by name, email, role or department..."
          className="flex-1 outline-none"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Staff List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStaff.map((staff) => (
              <tr key={staff.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{staff.name}</div>
                      <div className="text-sm text-gray-500">{staff.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{staff.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{staff.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    staff.status === "on duty" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {staff.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={() => handleView(staff)} className="text-blue-600 hover:text-blue-900 mr-3">
                    <FaEye />
                  </button>
                  <button onClick={() => handleEdit(staff)} className="text-green-600 hover:text-green-900 mr-3">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(staff.id)} className="text-red-600 hover:text-red-900">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {isAdding ? "Add Staff Member" : isEditing ? "Edit Staff Member" : "Staff Details"}
              </h3>
              {(isEditing || isAdding) ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={selectedStaff.name}
                      onChange={(e) => setSelectedStaff({...selectedStaff, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      value={selectedStaff.email}
                      onChange={(e) => setSelectedStaff({...selectedStaff, email: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      value={selectedStaff.phone}
                      onChange={(e) => setSelectedStaff({...selectedStaff, phone: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Phone"
                    />
                    <input
                      type="text"
                      value={selectedStaff.address}
                      onChange={(e) => setSelectedStaff({...selectedStaff, address: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Address"
                    />
                    <input
                      type="text"
                      value={selectedStaff.role}
                      onChange={(e) => setSelectedStaff({...selectedStaff, role: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Role"
                    />
                    <input
                      type="text"
                      value={selectedStaff.department}
                      onChange={(e) => setSelectedStaff({...selectedStaff, department: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Department"
                    />
                    <input
                      type="number"
                      value={selectedStaff.monthlyPay}
                      onChange={(e) => setSelectedStaff({...selectedStaff, monthlyPay: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Monthly Pay"
                    />
                    <select
                      value={selectedStaff.status}
                      onChange={(e) => setSelectedStaff({...selectedStaff, status: e.target.value})}
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
                  <p><span className="font-semibold">Name:</span> {selectedStaff.name}</p>
                  <p><span className="font-semibold">Email:</span> {selectedStaff.email}</p>
                  <p><span className="font-semibold">Phone:</span> {selectedStaff.phone}</p>
                  <p><span className="font-semibold">Address:</span> {selectedStaff.address}</p>
                  <p><span className="font-semibold">Role:</span> {selectedStaff.role}</p>
                  <p><span className="font-semibold">Department:</span> {selectedStaff.department}</p>
                  <p><span className="font-semibold">Monthly Pay:</span> ${selectedStaff.monthlyPay}</p>
                  <p><span className="font-semibold">Status:</span> {selectedStaff.status}</p>
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

export default StaffPage;
