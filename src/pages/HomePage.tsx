import React from 'react';
import { Layout } from '../components/Layout';
import { BookOpen, Users, Calendar, Image as ImageIcon, Trophy } from 'lucide-react';

import { useEffect, useRef } from "react";
import Typed from "typed.js";


export function HomePage() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["T.H.E ","Technova", "Pixel Fusion", "Sports and Culturals","Brain Masters"],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, []);

  return (
    <Layout>
      <>
        {/* Hero Section */}
        <div className="relative w-full h-screen bg-blue-600 text-white flex items-center justify-center">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="/images/90078629.jpg"
              alt="Club Background"
              className="w-full h-full object-cover opacity-50"
            />
          </div>

          {/* Content */}
          <div className="relative text-center px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to CETA</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Empowering students to innovate, create, and lead in the world of technology.
              Join us in our journey of learning and growth.
            </p>

            {/* Clubs Names Typing Effect */}
            <div className="mt-6 text-2xl md:text-3xl font-semibold">
              <span ref={typedRef}></span>
            </div>
          </div>
        </div>
      </>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-16">
            Grow, Learn & Connect with CETA
            </h2>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard1
              icon={<BookOpen className="h-8 w-8" />}
              title="Workshops"
              description="Regular technical workshops to enhance your skills"
            />
            <FeatureCard1
              icon={<Users className="h-8 w-8" />}
              title="Networking"
              description="Connect with like-minded tech enthusiasts"
            />
            <FeatureCard1
              icon={<Calendar className="h-8 w-8" />}
              title="Events"
              description="Exciting tech events and competitions"
            />
            <FeatureCard1
              icon={<Trophy className="h-8 w-8" />}
              title="Projects"
              description="Hands-on experience with real-world projects"
            />
          </div>

          </div>
          </div>
      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-16">
              CETA CLUBS
            </h2>
          </div>

         
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
       <FeatureCard 
        image="/images/90078629.jpg" 
        title="Technova" 
        description="A club focused on technology, innovation, and emerging trends." 
      />
      <FeatureCard 
        image="/images/90078629.jpg" 
        title="Brain Masters" 
        description="A club for logical reasoning, coding competitions, and problem-solving." 
      />
      <FeatureCard 
        image="/images/90078629.jpg" 
        title="Pixel Fusion" 
        description="A creative hub for graphic design, UI/UX, and visual storytelling." 
      />
      <FeatureCard 
        image="/images/90078629.jpg" 
        title="Sports & Culturals" 
        description="A vibrant club promoting sports, music, dance, and cultural activities." 
      />
    </div>

        </div>
      </div>

      {/* About Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About Our Club
              </h2>
              <div className="prose prose-lg">
                <p className="mb-4">
                  Tech Innovators Club is a student-led organization dedicated to fostering
                  innovation and technical excellence among students.
                </p>
                <p className="mb-4">
                  Founded in 2020, we've grown into a vibrant community of tech enthusiasts,
                  developers, and future leaders.
                </p>
                <p>
                  Our mission is to provide hands-on learning experiences, industry exposure,
                  and opportunities for personal growth in technology.
                </p>
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                alt="Team Collaboration"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {/* <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <StatCard number="500+" label="Active Members" />
            <StatCard number="50+" label="Events Organized" />
            <StatCard number="20+" label="Industry Partners" />
            <StatCard number="100%" label="Learning Experience" />
          </div>
        </div>
      </div> */}
    </Layout>
  );
}

function FeatureCard1({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function FeatureCard({ image, title, description }: { image: string; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden w-72">
    {/* Increased Image Size */}
    <img src={image} alt={title} className="w-full h-52 object-cover" />

    {/* Title & Description in a White Box */}
    <div className="p-5 text-center">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  </div>
  );
}




function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="p-6">
      <div className="text-4xl font-bold text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}