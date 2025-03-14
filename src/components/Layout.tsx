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
      <footer className="bg-gray-50 border-t border-gray-200">
  <div className="max-w-7xl mx-auto py-12 px-6 sm:px-8 lg:px-10">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-gray-700">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">CETA</h3>
        <p className="text-sm leading-relaxed">
          Inspiring innovation, collaboration, and leadership in the tech world.
        </p>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
        <ul className="space-y-3 text-sm">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link to={item.href} className="hover:text-blue-600 transition duration-300">
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/admin"
              className="hover:text-blue-600 transition duration-300 flex items-center"
            >
              <Settings className="h-5 w-5 mr-2" />
              Admin Panel
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Info</h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-gray-500" /> 123 University Ave, City
          </li>
          <li className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-gray-500" /> contact@techclub.com
          </li>
          <li className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-gray-500" /> (123) 456-7890
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h4>
        <div className="flex space-x-5">
          <a href="#" className="text-gray-500 hover:text-blue-600 transition duration-300">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600 transition duration-300">
            <Instagram className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600 transition duration-300">
            <Twitter className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
    <div className="mt-10 pt-6 border-t border-gray-300 text-center">
      <p className="text-sm text-gray-500">© 2025 CETA. All rights reserved.</p>
    </div>
  </div>
</footer>

    </div>
  );
}
