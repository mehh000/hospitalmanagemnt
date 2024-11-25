"use client";
import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash, FaSearch, FaPlus } from "react-icons/fa";

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Sample doctors data - would come from API/database in real app
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. John Smith",
      email: "john.smith@hospital.com", 
      phone: "+1 234-567-8900",
      qualification: "MD, Cardiology",
      specialty: "Cardiologist",
      monthlyPay: 15000,
      status: "on duty"
    },
    {
      id: 2, 
      name: "Dr. Sarah Johnson",
      email: "sarah.j@hospital.com",
      phone: "+1 234-567-8901",
      qualification: "MD, Neurology",
      specialty: "Neurologist", 
      monthlyPay: 16000,
      status: "on leave"
    },
    // Add more doctors as needed
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.phone.includes(searchTerm)
  );

  const handleView = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditing(false);
    setIsAdding(false);
    setShowModal(true);
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditing(true);
    setIsAdding(false);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedDoctor({
      id: doctors.length + 1,
      name: "",
      email: "",
      phone: "",
      qualification: "",
      specialty: "",
      monthlyPay: "",
      status: "on duty"
    });
    setIsEditing(true);
    setIsAdding(true);
    setShowModal(true);
  };

  const handleDelete = (doctorId) => {
    if(window.confirm("Are you sure you want to delete this doctor?")) {
      setDoctors(doctors.filter(doctor => doctor.id !== doctorId));
    }
  };

  const handleSave = (updatedDoctor) => {
    if (isAdding) {
      setDoctors([...doctors, updatedDoctor]);
    } else {
      setDoctors(doctors.map(doctor => 
        doctor.id === updatedDoctor.id ? updatedDoctor : doctor
      ));
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Doctors Management</h1>
        <button 
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaPlus className="mr-2" />
          Add Doctor
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search doctors..."
          className="w-full px-4 py-2 pl-10 pr-4 border rounded-lg focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={handleSearch}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      {/* Doctors Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{doctor.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-3">
                    <button onClick={() => handleView(doctor)} className="text-blue-600 hover:text-blue-800">
                      <FaEye />
                    </button>
                    <button onClick={() => handleEdit(doctor)} className="text-green-600 hover:text-green-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(doctor.id)} className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && selectedDoctor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isAdding ? "Add Doctor" : isEditing ? "Edit Doctor" : "Doctor Details"}
            </h2>
            
            <div className="space-y-4">
              {isEditing ? (
                // Edit Form
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleSave(selectedDoctor);
                }}>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={selectedDoctor.name}
                      onChange={(e) => setSelectedDoctor({...selectedDoctor, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Name"
                    />
                    <input
                      type="email"
                      value={selectedDoctor.email}
                      onChange={(e) => setSelectedDoctor({...selectedDoctor, email: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      value={selectedDoctor.phone}
                      onChange={(e) => setSelectedDoctor({...selectedDoctor, phone: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Phone"
                    />
                    <input
                      type="text"
                      value={selectedDoctor.qualification}
                      onChange={(e) => setSelectedDoctor({...selectedDoctor, qualification: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Qualification"
                    />
                    <input
                      type="text"
                      value={selectedDoctor.specialty}
                      onChange={(e) => setSelectedDoctor({...selectedDoctor, specialty: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Specialty"
                    />
                    <input
                      type="number"
                      value={selectedDoctor.monthlyPay}
                      onChange={(e) => setSelectedDoctor({...selectedDoctor, monthlyPay: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Monthly Pay"
                    />
                    <select
                      value={selectedDoctor.status}
                      onChange={(e) => setSelectedDoctor({...selectedDoctor, status: e.target.value})}
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
                // View Details
                <div className="space-y-3">
                  <p><span className="font-semibold">Name:</span> {selectedDoctor.name}</p>
                  <p><span className="font-semibold">Email:</span> {selectedDoctor.email}</p>
                  <p><span className="font-semibold">Phone:</span> {selectedDoctor.phone}</p>
                  <p><span className="font-semibold">Qualification:</span> {selectedDoctor.qualification}</p>
                  <p><span className="font-semibold">Specialty:</span> {selectedDoctor.specialty}</p>
                  <p><span className="font-semibold">Monthly Pay:</span> ${selectedDoctor.monthlyPay}</p>
                  <p><span className="font-semibold">Status:</span> {selectedDoctor.status}</p>
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

export default DoctorsPage;
