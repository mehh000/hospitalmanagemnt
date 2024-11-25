"use client";
import React, { useState } from "react";
import { FaEdit, FaEye, FaTrash, FaSearch, FaPlus, FaCheck } from "react-icons/fa";

const AppointmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Sample appointments data - would come from API/database in real app
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "John Doe",
      patientEmail: "john.doe@email.com",
      patientPhone: "+1 234-567-8900",
      requestedDoctor: "Dr. Sarah Johnson",
      department: "Cardiology",
      appointmentDate: "2024-01-15",
      appointmentTime: "10:00 AM",
      reason: "Regular checkup",
      status: "pending"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      patientEmail: "jane.smith@email.com", 
      patientPhone: "+1 234-567-8901",
      requestedDoctor: "Dr. John Smith",
      department: "Neurology",
      appointmentDate: "2024-01-16",
      appointmentTime: "2:30 PM",
      reason: "Follow-up",
      status: "accepted"
    }
  ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAppointments = appointments.filter(appointment => 
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.patientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.requestedDoctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditing(false);
    setIsAdding(false);
    setShowModal(true);
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditing(true);
    setIsAdding(false);
    setShowModal(true);
  };

  const handleAdd = () => {
    setSelectedAppointment({
      id: appointments.length + 1,
      patientName: "",
      patientEmail: "",
      patientPhone: "",
      requestedDoctor: "",
      department: "",
      appointmentDate: "",
      appointmentTime: "",
      reason: "",
      status: "pending"
    });
    setIsAdding(true);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleAccept = (appointment) => {
    const updatedAppointments = appointments.map(app => 
      app.id === appointment.id ? {...app, status: "accepted"} : app
    );
    setAppointments(updatedAppointments);
  };

  const handleDelete = (appointmentId) => {
    setAppointments(appointments.filter(app => app.id !== appointmentId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdding) {
      setAppointments([...appointments, selectedAppointment]);
    } else if (isEditing) {
      const updatedAppointments = appointments.map(app =>
        app.id === selectedAppointment.id ? selectedAppointment : app
      );
      setAppointments(updatedAppointments);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments Management</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaPlus /> Add Appointment
        </button>
      </div>

      <div className="flex items-center gap-2 mb-6">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left">Patient Name</th>
              <th className="px-6 py-3 border-b text-left">Doctor</th>
              <th className="px-6 py-3 border-b text-left">Department</th>
              <th className="px-6 py-3 border-b text-left">Date</th>
              <th className="px-6 py-3 border-b text-left">Time</th>
              <th className="px-6 py-3 border-b text-left">Status</th>
              <th className="px-6 py-3 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b">{appointment.patientName}</td>
                <td className="px-6 py-4 border-b">{appointment.requestedDoctor}</td>
                <td className="px-6 py-4 border-b">{appointment.department}</td>
                <td className="px-6 py-4 border-b">{appointment.appointmentDate}</td>
                <td className="px-6 py-4 border-b">{appointment.appointmentTime}</td>
                <td className="px-6 py-4 border-b">
                  <span className={`px-2 py-1 rounded ${
                    appointment.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-6 py-4 border-b">
                  <div className="flex gap-3">
                    <button onClick={() => handleView(appointment)} className="text-blue-600 hover:text-blue-800">
                      <FaEye />
                    </button>
                    <button onClick={() => handleEdit(appointment)} className="text-yellow-600 hover:text-yellow-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(appointment.id)} className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                    {appointment.status === 'pending' && (
                      <button onClick={() => handleAccept(appointment)} className="text-green-600 hover:text-green-800">
                        <FaCheck />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isAdding ? "Add Appointment" : isEditing ? "Edit Appointment" : "View Appointment"}
            </h2>
            <div className="mt-4">
              {(isEditing || isAdding) ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={selectedAppointment.patientName}
                      onChange={(e) => setSelectedAppointment({...selectedAppointment, patientName: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Patient Name"
                    />
                    <input
                      type="email"
                      value={selectedAppointment.patientEmail}
                      onChange={(e) => setSelectedAppointment({...selectedAppointment, patientEmail: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Patient Email"
                    />
                    <input
                      type="text"
                      value={selectedAppointment.patientPhone}
                      onChange={(e) => setSelectedAppointment({...selectedAppointment, patientPhone: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Patient Phone"
                    />
                    <input
                      type="text"
                      value={selectedAppointment.requestedDoctor}
                      onChange={(e) => setSelectedAppointment({...selectedAppointment, requestedDoctor: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Requested Doctor"
                    />
                    <input
                      type="text"
                      value={selectedAppointment.department}
                      onChange={(e) => setSelectedAppointment({...selectedAppointment, department: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Department"
                    />
                    <input
                      type="date"
                      value={selectedAppointment.appointmentDate}
                      onChange={(e) => setSelectedAppointment({...selectedAppointment, appointmentDate: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="time"
                      value={selectedAppointment.appointmentTime}
                      onChange={(e) => setSelectedAppointment({...selectedAppointment, appointmentTime: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <textarea
                      value={selectedAppointment.reason}
                      onChange={(e) => setSelectedAppointment({...selectedAppointment, reason: e.target.value})}
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Reason for Appointment"
                      rows="3"
                    />
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
                  <p><span className="font-semibold">Patient Name:</span> {selectedAppointment.patientName}</p>
                  <p><span className="font-semibold">Email:</span> {selectedAppointment.patientEmail}</p>
                  <p><span className="font-semibold">Phone:</span> {selectedAppointment.patientPhone}</p>
                  <p><span className="font-semibold">Doctor:</span> {selectedAppointment.requestedDoctor}</p>
                  <p><span className="font-semibold">Department:</span> {selectedAppointment.department}</p>
                  <p><span className="font-semibold">Date:</span> {selectedAppointment.appointmentDate}</p>
                  <p><span className="font-semibold">Time:</span> {selectedAppointment.appointmentTime}</p>
                  <p><span className="font-semibold">Reason:</span> {selectedAppointment.reason}</p>
                  <p><span className="font-semibold">Status:</span> {selectedAppointment.status}</p>
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

export default AppointmentsPage;
