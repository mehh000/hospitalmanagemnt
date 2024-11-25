"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaHome,
  FaUserMd,
  FaFlask,
  FaChartBar,
  FaUsers,
  FaBed,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaBell,
  FaSignOutAlt,
  FaUserNurse,
} from "react-icons/fa";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Image
              src="https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg"
              alt="Hospital Logo"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </div>
        </div>
      </nav>

      {/* Sidebar and Main Content */}
      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md fixed h-full">
          <div className="py-4">
            <ul className="space-y-2">
              <SidebarItem
                icon={<FaHome />}
                text="Overview"
                href="/dashboard/home"
              />
              <SidebarItem
                icon={<FaUserMd />}
                text="Doctors"
                href="/dashboard/doctors"
              />
              <SidebarItem
                icon={<FaFlask />}
                text="Lab"
                href="/dashboard/lab"
              />
              <SidebarItem
                icon={<FaChartBar />}
                text="Analysis"
                href="/dashboard/analysis"
              />
              <SidebarItem
                icon={<FaUsers />}
                text="Staff"
                href="/dashboard/staff"
              />
              <SidebarItem
                icon={<FaBed />}
                text="Patients"
                href="/dashboard/patients"
              />
              <SidebarItem
                icon={<FaCalendarAlt />}
                text="Appointments"
                href="/dashboard/appointments"
              />
              <SidebarItem
                icon={<FaFileInvoiceDollar />}
                text="Billing"
                href="/dashboard/billing"
              />
              <SidebarItem
                icon={<FaBell />}
                text="Notifications"
                href="/dashboard/notifications"
              />
              <SidebarItem
                icon={<FaUserNurse />}
                text="Nurses"
                href="/dashboard/nurses"
              />
              <SidebarItem icon={<FaSignOutAlt />} text="Logout" href="/" />
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, text, href }) => {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
      >
        <span className="mr-3">{icon}</span>
        {text}
      </Link>
    </li>
  );
};

export default DashboardLayout;
