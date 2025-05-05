import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Calendar,
  Image as ImageIcon,
  Home,
  Settings,
  Instagram,
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
      <nav className="bg-blue-600 shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-white">
                CETA - Computer Engineering Technical Association
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden flex-1 justify-center space-x-8 sm:flex">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                      location.pathname === item.href
                        ? "border-b-2 border-blue-500 text-white"
                        : "text-white hover:border-b-2 hover:border-white hover:text-white"
                    }`}
                  >
                    <Icon className="mr-2 w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none"
                aria-label="Mobile menu"
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="bg-white border-t border-gray-200 sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="inline mr-2 w-5 h-5" />
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
      <div className="px-6 py-14 mx-auto max-w-7xl sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 gap-12 text-gray-800 md:grid-cols-4">
          <div className="space-y-5">
            <h3 className="text-3xl font-bold text-gray-900">CETA – Innovate, Inspire, Lead!</h3>
            <p className="text-sm leading-relaxed text-gray-700">
            
            Empowering the next generation of tech enthusiasts through innovation, collaboration, and hands-on learning. Where passion meets technology, and ideas transform into reality!"
            </p>
          </div>
          <div>
            <h4 className="mb-5 text-xl font-semibold text-gray-900">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="transition duration-300 ease-in-out hover:text-blue-600">
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/admin"
                  className="flex items-center transition duration-300 ease-in-out hover:text-blue-600"
                >
                  <Settings className="mr-2 w-5 h-5 text-gray-700" />
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-xl font-semibold text-gray-900">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 items-center">
                <MapPin className="w-5 h-5 text-gray-600" />Mohan Babu University,Tirupathi
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-5 h-5 text-gray-600" /> ceta.universe9@gmail.com
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-5 h-5 text-gray-600" /> +91 7330877839
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-xl font-semibold text-gray-900">Follow Us</h4>
            <div className="flex space-x-6">
              {/* <a href="#" className="text-gray-600 transition duration-300 ease-in-out hover:text-blue-600">
                <Facebook className="w-7 h-7" />
              </a> */}
              <a href="https://www.instagram.com/ceta.cse.mbu?igsh=MXE5YmY5cnFieGVuMA==" className="text-gray-600 transition duration-300 ease-in-out hover:text-blue-600">
                <Instagram className="w-7 h-7" />
              </a>
              {/* <a href="#" className="text-gray-600 transition duration-300 ease-in-out hover:text-blue-600">
                <Twitter className="w-7 h-7" />
              </a> */}
            </div>
          </div>
        </div>
        <div className="pt-6 mt-12 text-center border-t border-gray-400">
          <p className="text-sm text-gray-600">© 2025 CETA. All rights reserved.</p>
        </div>
      </div>
    </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Organization", "LocalBusiness"],
          "description": "CETA - MBU's premier technical association fostering innovation through workshops, events, and hands-on learning in computer engineering",
          "keywords": "CETA MBU, Computer Engineering Association Tirupati, Technical Workshops Andhra Pradesh, Mohan Babu University Tech Events",
          "name": "CETA - Computer Engineering Technical Association",
          "url": "https://ceta-mbu.in/",
          "logo": "https://ceta-mbu.in/images/mainlogo.jpg",
          "sameAs": ["https://www.instagram.com/ceta.cse.mbu"],
          "priceRange": "Free",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Mohan Babu University",
            "addressLocality": "Tirupati",
            "addressRegion": "Andhra Pradesh",
            "postalCode": "517102",
            "addressCountry": "India"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 13.6288,
            "longitude": 79.4192
          },
          "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "17:00"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91 7330877839",
            "contactType": "Technical Support",
            "email": "ceta.universe9@gmail.com",
            "areaServed": "India",
            "availableLanguage": ["English", "Telugu"]
          }
        })
      }} />
    </div>
  );
}
