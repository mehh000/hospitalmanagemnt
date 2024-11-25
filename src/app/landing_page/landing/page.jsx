"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="https://img.freepik.com/free-vector/hospital-logo-design-vector-medical-cross_53876-136743.jpg"
              alt="Hospital Logo"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-600 hover:text-blue-600">
              About Us
            </a>
            <a href="#services" className="text-gray-600 hover:text-blue-600">
              Services
            </a>
            <a href="#doctors" className="text-gray-600 hover:text-blue-600">
              Doctors
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600">
              Contact
            </a>
            <Link href={"/landing_page/appoinment"}>
              {" "}
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
                Book Appointment
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Caring for Your Health, Always
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Your trusted partner in healthcare, providing compassionate and
              quality medical services.
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700">
              Learn More
            </button>
          </div>
          <div className="md:w-1/2">
            <Image
              src="https://img.freepik.com/free-photo/medical-workers-covid-19-vaccination-concept-confident-professional-doctor-female-nurse-blue-scrubs-stethoscope-cross-arms-chest-ready-help-patients-guarantee-quality-service_1258-57360.jpg"
              alt="Healthcare Professional"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                We are committed to providing exceptional healthcare services
                with compassion and expertise. Our state-of-the-art facilities
                and dedicated team ensure the highest quality of patient care.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Our Values</h3>
              <ul className="list-disc list-inside text-gray-600">
                <li>Excellence in Healthcare</li>
                <li>Patient-Centered Approach</li>
                <li>Continuous Innovation</li>
                <li>Compassionate Care</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Emergency Care",
                description: "24/7 emergency medical services",
                icon: "🏥",
              },
              {
                title: "Surgery",
                description: "Advanced surgical procedures",
                icon: "⚕️",
              },
              {
                title: "Diagnostics",
                description: "Comprehensive medical testing",
                icon: "🔬",
              },
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Doctors</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                specialty: "Cardiology",
                image:
                  "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
              },
              {
                name: "Dr. Michael Chen",
                specialty: "Neurology",
                image:
                  "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg",
              },
              {
                name: "Dr. Emily Brown",
                specialty: "Pediatrics",
                image:
                  "https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827775.jpg",
              },
            ].map((doctor, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Patient Testimonials
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "John Smith",
                text: "Exceptional care and attention. The staff was incredibly professional and caring.",
              },
              {
                name: "Mary Wilson",
                text: "The facilities are modern and clean. I felt well taken care of throughout my stay.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    rows="4"
                  ></textarea>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
                  Send Message
                </button>
              </form>
            </div>
            <div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Address</h3>
                  <p className="text-gray-600">
                    123 Healthcare Ave, Medical City, MC 12345
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">info@hospital.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Hospital Name</h3>
              <p className="text-gray-400">
                Providing quality healthcare services since 1990
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a href="#doctors" className="text-gray-400 hover:text-white">
                    Doctors
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Hospital Name. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
