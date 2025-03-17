import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Calendar,
  Image as ImageIcon,
  Home,
  Settings,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Team", href: "/team", icon: Users },
  { name: "Gallery", href: "/gallery", icon: ImageIcon },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                CETA
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex flex-1 justify-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      location.pathname === item.href
                        ? "border-b-2 border-blue-500 text-gray-900"
                        : "text-gray-500 hover:border-b-2 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 focus:outline-none"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-5 w-5 inline mr-2" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
          <footer className="bg-gradient-to-r from-gray-100 to-gray-300 border-t border-gray-300 shadow-md">
      <div className="max-w-7xl mx-auto py-14 px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-gray-800">
          <div className="space-y-5">
            <h3 className="text-3xl font-bold text-gray-900">CETA – Innovate, Inspire, Lead!</h3>
            <p className="text-sm leading-relaxed text-gray-700">
            
            Empowering the next generation of tech enthusiasts through innovation, collaboration, and hands-on learning. Where passion meets technology, and ideas transform into reality!"
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-blue-600 transition duration-300 ease-in-out">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin"
                  className="hover:text-blue-600 transition duration-300 ease-in-out flex items-center"
                >
                  <Settings className="h-5 w-5 mr-2 text-gray-700" />
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-5">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-600" />Mohan Babu University,Tirupathi
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-600" /> ceta.universe9@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-600" /> +91 7330877839
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-gray-900 mb-5">Follow Us</h4>
            <div className="flex space-x-6">
              {/* <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">
                <Facebook className="h-7 w-7" />
              </a> */}
              <a href="https://www.instagram.com/ceta.cse.mbu?igsh=MXE5YmY5cnFieGVuMA==" className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">
                <Instagram className="h-7 w-7" />
              </a>
              {/* <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">
                <Twitter className="h-7 w-7" />
              </a> */}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-400 text-center">
          <p className="text-sm text-gray-600">© 2025 CETA. All rights reserved.</p>
        </div>
      </div>
    </footer>

    </div>
  );
}
