"use client";
import React from "react";
import { FaUserInjured, FaUserMd, FaUserNurse, FaBed, FaAmbulance, FaDollarSign, FaChartLine } from "react-icons/fa";

const HomePage = () => {
  // Sample data - In a real app, this would come from an API/database
  const stats = {
    totalPatients: 245,
    totalDoctors: 48,
    totalNurses: 120,
    activeDoctors: 15,
    activeNurses: 35,
    dailyAdmissions: 12,
    dailyDischarges: 8,
    emergencyVisits: 25,
    dailyRevenue: 85000,
    outstandingBills: 150000,
    pendingClaims: 75000,
    totalICU: 30,
    availableICU: 8,
    expenses: 45000
  };

  const topServices = [
    { name: "Emergency Care", count: 45 },
    { name: "Surgery", count: 12 },
    { name: "Diagnostics", count: 78 },
    { name: "ICU Care", count: 23 }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Hospital Overview</h1>
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<FaUserInjured />} title="Total Patients" value={stats.totalPatients} color="bg-blue-500" />
        <StatCard icon={<FaUserMd />} title="Total Doctors" value={stats.totalDoctors} color="bg-green-500" />
        <StatCard icon={<FaUserNurse />} title="Total Nurses" value={stats.totalNurses} color="bg-purple-500" />
        <StatCard icon={<FaUserMd />} title="Active Doctors" value={stats.activeDoctors} color="bg-indigo-500" />
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Daily Metrics</h3>
          <div className="space-y-3">
            <MetricItem label="New Admissions" value={stats.dailyAdmissions} />
            <MetricItem label="Discharges" value={stats.dailyDischarges} />
            <MetricItem label="Emergency Visits" value={stats.emergencyVisits} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
          <div className="space-y-3">
            <MetricItem label="Daily Revenue" value={`$${stats.dailyRevenue.toLocaleString()}`} />
            <MetricItem label="Outstanding Bills" value={`$${stats.outstandingBills.toLocaleString()}`} />
            <MetricItem label="Daily Expenses" value={`$${stats.expenses.toLocaleString()}`} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">ICU Status</h3>
          <div className="space-y-3">
            <MetricItem label="Total ICU Beds" value={stats.totalICU} />
            <MetricItem label="Available ICU Beds" value={stats.availableICU} />
            <MetricItem label="Occupancy Rate" value={`${Math.round(((stats.totalICU - stats.availableICU) / stats.totalICU) * 100)}%`} />
          </div>
        </div>
      </div>

      {/* Top Services */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Top Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {topServices.map((service, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-700">{service.name}</h4>
              <p className="text-2xl font-bold text-blue-600">{service.count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center space-x-4">
      <div className={`${color} p-3 rounded-full text-white`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-600">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

const MetricItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default HomePage;
