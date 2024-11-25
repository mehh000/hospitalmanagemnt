"use client";
import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash, FaSearch, FaPlus } from "react-icons/fa";

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Sample patients data - would come from API/database in real app
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "James Wilson",
      email: "james.w@email.com",
      phone: "+1 234-567-8910",
      address: "789 Pine St, City, State 12345",
      condition: "Cardiac Arrhythmia",
      appointedDoctor: "Dr. John Smith",
      roomNumber: "301",
      billAmount: 1500,
      billStatus: "pending",
      admissionDate: "2023-11-01"
    },
    {
      id: 2,
      name: "Emma Davis",
      email: "emma.d@email.com",
      phone: "+1 234-567-8911",
      address: "321 Elm St, City, State 12345",
      condition: "Migraine",
      appointedDoctor: "Dr. Sarah Johnson",
      roomNumber: "205",
      billAmount: 800,
      billStatus: "paid",
      admissionDate: "2023-11-03"
    }
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.appointedDoctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (patient) => {
    setSelectedPatient(patient);
    setIsEditing(false);
    setIsAdding(false);
    setShowModal(true);
  };

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setIsEditing(true);
    setIsAdding(false);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedPatient({
      id: patients.length + 1,
      name: "",
      email: "",
      phone: "",
      address: "",
      condition: "",
      appointedDoctor: "",
      roomNumber: "",
      billAmount: 0,
      billStatus: "pending",
      admissionDate: new Date().toISOString().split('T')[0]
    });
    setIsAdding(true);
    setIsEditing(false);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patients Management</h1>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaPlus className="mr-2" /> Add Patient
        </button>
      </div>

      <div className="mb-6 flex items-center bg-white rounded-lg shadow px-4 py-2">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full outline-none"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>{patient.email}</div>
                  <div className="text-sm text-gray-500">{patient.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.condition}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.appointedDoctor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{patient.roomNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    patient.billStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {patient.billStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button onClick={() => handleView(patient)} className="text-blue-600 hover:text-blue-900">
                      <FaEye />
                    </button>
                    <button onClick={() => handleEdit(patient)} className="text-yellow-600 hover:text-yellow-900">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {isAdding ? "Add Patient" : isEditing ? "Edit Patient" : "Patient Details"}
              </h3>
              {(isEditing || isAdding) ? (
                <form className="space-y-4">
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={selectedPatient.name}
                      onChange={(e) => setSelectedPatient({...selectedPatient, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      value={selectedPatient.email}
                      onChange={(e) => setSelectedPatient({...selectedPatient, email: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      value={selectedPatient.phone}
                      onChange={(e) => setSelectedPatient({...selectedPatient, phone: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Phone"
                    />
                    <input
                      type="text"
                      value={selectedPatient.address}
                      onChange={(e) => setSelectedPatient({...selectedPatient, address: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Address"
                    />
                    <input
                      type="text"
                      value={selectedPatient.condition}
                      onChange={(e) => setSelectedPatient({...selectedPatient, condition: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Medical Condition"
                    />
                    <input
                      type="text"
                      value={selectedPatient.appointedDoctor}
                      onChange={(e) => setSelectedPatient({...selectedPatient, appointedDoctor: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Appointed Doctor"
                    />
                    <input
                      type="text"
                      value={selectedPatient.roomNumber}
                      onChange={(e) => setSelectedPatient({...selectedPatient, roomNumber: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Room Number"
                    />
                    <input
                      type="number"
                      value={selectedPatient.billAmount}
                      onChange={(e) => setSelectedPatient({...selectedPatient, billAmount: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Bill Amount"
                    />
                    <select
                      value={selectedPatient.billStatus}
                      onChange={(e) => setSelectedPatient({...selectedPatient, billStatus: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
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
                  <p><span className="font-semibold">Name:</span> {selectedPatient.name}</p>
                  <p><span className="font-semibold">Email:</span> {selectedPatient.email}</p>
                  <p><span className="font-semibold">Phone:</span> {selectedPatient.phone}</p>
                  <p><span className="font-semibold">Address:</span> {selectedPatient.address}</p>
                  <p><span className="font-semibold">Condition:</span> {selectedPatient.condition}</p>
                  <p><span className="font-semibold">Doctor:</span> {selectedPatient.appointedDoctor}</p>
                  <p><span className="font-semibold">Room:</span> {selectedPatient.roomNumber}</p>
                  <p><span className="font-semibold">Bill Amount:</span> ${selectedPatient.billAmount}</p>
                  <p><span className="font-semibold">Bill Status:</span> {selectedPatient.billStatus}</p>
                  <p><span className="font-semibold">Admission Date:</span> {selectedPatient.admissionDate}</p>
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

export default PatientsPage;
