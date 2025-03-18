import React, { useEffect, useRef } from 'react';
import { Layout } from '../components/Layout';
import { BookOpen, Users, Calendar, Trophy } from 'lucide-react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';

export function HomePage() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["T.H.E Club ", "Technova", "Pixel Fusion", "Sports and Culturals", "Brain Masters"],
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
      {/* Hero Section */}
      <motion.div 
  className="flex relative flex-col justify-center items-center w-full h-screen text-white"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  {/* Desktop Background */}
  <div className="absolute inset-0 hidden sm:block bg-[url('/images/cetahome.jpg')] bg-cover bg-center"></div>

  {/* Mobile Background */}
  <div className="absolute inset-0 sm:hidden bg-[url('/images/20250318_175220.png')] bg-cover bg-center"></div>

  {/* Overlay */}
  <div className="absolute inset-0 z-0 bg-black opacity-65"></div>

  {/* Logo Centered */}
  <motion.img
    src="https://ik.imagekit.io/pstron/CETA/MAIN%20LOGOS/mainlogo.jpg"
    alt="Club Logo"
    className="object-cover mb-6 w-48 h-48 rounded-full shadow-lg animate-pulse"
    initial={{ scale: 0 }}
    animate={{ scale: 1.2 }}
    whileHover={{ scale: 1.3 }}
    transition={{ duration: 0.8 }}
  />

  <h1 className="z-10 mb-6 text-4xl font-bold md:text-6xl">Welcome to CETA</h1>
  <p className="z-10 mx-auto max-w-3xl text-xl text-center md:text-2xl">
    Empowering students to innovate, create, and lead in the world of technology.
  </p>

  <div className="z-10 mt-6 text-3xl font-semibold md:text-4xl">
    <span ref={typedRef}></span>
  </div>
</motion.div>


      {/* Features Section */}
      <motion.div 
  className="py-24 bg-white"
  initial={{ scale: 0.5, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1, ease: "easeOut" }}>

  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    
    <motion.div 
      className="text-center"
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}>
      <h2 className="mb-16 text-3xl font-bold text-gray-900">
        Grow, Learn & Connect with CETA
      </h2>
    </motion.div>

    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {[
        { icon: <BookOpen className="w-8 h-8" />, title: "Workshops", description: "Technical workshops to enhance your skills." },
        { icon: <Users className="w-8 h-8" />, title: "Networking", description: "Connect with like-minded tech enthusiasts." },
        { icon: <Calendar className="w-8 h-8" />, title: "Events", description: "Exciting tech events and competitions." },
        { icon: <Trophy className="w-8 h-8" />, title: "Projects", description: "Hands-on experience with real-world projects." }
      ].map((item, index) => (
        <motion.div 
          key={index} 
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 * index, ease: "easeOut" }}>
          <FeatureCard1 icon={item.icon} title={item.title} description={item.description} />
        </motion.div>
      ))}
    </div>

  </div>
</motion.div>



      {/* Clubs Section */}
      <motion.div 
  className="py-24 bg-gray-50"
  initial={{ scale: 0.5, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1, ease: "easeOut" }}>
  
  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    
    <motion.div 
      className="text-center"
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}>
      <h2 className="mb-16 text-3xl font-bold text-gray-900">CETA CLUBS</h2>
    </motion.div>

    <div className="grid grid-cols-1 gap-6 justify-center px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[  
        { image: "https://ik.imagekit.io/pstron/CETA/MAIN%20LOGOS/technova.jpg", title: "Technova", description: "A club focused on technology and innovation." },  
        { image: "https://ik.imagekit.io/pstron/CETA/MAIN%20LOGOS/brainmasters.jpg", title: "Brain Masters", description: "A club for logical reasoning and coding competitions." },  
        { image: "https://ik.imagekit.io/pstron/CETA/MAIN%20LOGOS/pixelfusion.jpg", title: "Pixel Fusion", description: "A creative hub for graphic design and UI/UX." },  
        { image: "https://ik.imagekit.io/pstron/CETA/MAIN%20LOGOS/sports.jpg", title: "Sports & Culturals", description: "A club promoting sports, music, and cultural activities." }  
      ].map((club, index) => (  
        <motion.div 
          key={index} 
          className="flex justify-center"
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 * index, ease: "easeOut" }}>
          <FeatureCard image={club.image} title={club.title} description={club.description} />
        </motion.div>
      ))}  
    </div>

  </div>
</motion.div>


<div className="overflow-hidden p-5 mx-auto max-w-sm text-center bg-white rounded-2xl shadow-2xl transition duration-300 transform hover:scale-105 hover:shadow-xl">
<img className="object-cover w-full h-40 rounded-t-2xl" src="/images/cold, smooth & tasty..png" alt="Event Image">
  <h2 className="text-2xl font-bold text-gray-800">YUVARANG 2K25 <br/> Event Registration</h2>
  <a href="./pages/EventsPage" className="block px-4 py-2 mt-4 text-center text-white bg-blue-600 rounded-xl transition duration-300 hover:bg-blue-700">Register Now</a>
</div>


<motion.div 
  className="py-24 bg-gray-50"
  initial={{ opacity: 0, scale: 0.85 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, ease: "anticipate" }}>
  <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div className="items-center lg:grid lg:grid-cols-2 lg:gap-16">
      
      {/* Text Section */}
      <motion.div 
        initial={{ opacity: 0, x: -60 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1.5, ease: "easeInOut" }}>
        <h2 className="mb-6 text-4xl font-bold text-gray-900">
          About Our Club
        </h2>
        <div className="prose prose-lg">
          <p className="mb-4">
          The Computer Engineers Technical Association (CETA), established in 2000 at Sree Vidyanikethan Engineering College and later carried forward by Mohan Babu University’s CSE students.
          </p>
          <p className="mb-4">
          It is a dynamic hub for innovation, collaboration, and skill development. CETA empowers students by providing hands-on experience, industry exposure, and opportunities to lead and participate in hackathons, tech fests, coding challenges, and networking events.
          </p>
          <p>
          It fosters creativity and excellence through a mix of technical, non-technical, and extracurricular activities, shaping the next generation of tech leaders.
          </p>
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div 
        className="mt-12 lg:mt-0"
        initial={{ opacity: 0, x: 60, scale: 0.95 }} 
        whileInView={{ opacity: 1, x: 0, scale: 1 }} 
        transition={{ duration: 1.5, ease: "easeInOut" }}>
        <img
          src="https://ik.imagekit.io/pstron/CETA/MAIN%20LOGOS/mainlogo.jpg"
          alt="Team Collaboration"
          className="p-5 rounded-lg shadow-xl"
        />
      </motion.div>
    </div>
  </div>
</motion.div>

    </Layout>
  );
}

function FeatureCard1({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}>
      <div className="mb-4 text-blue-600">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function FeatureCard({ image, title, description }: { image: string; title: string; description: string }) {
  return (
    <motion.div className="flex overflow-hidden flex-col items-center w-72 bg-white rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}>
      <img src={image} alt={title} className="object-cover h-60 w-50" />
      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
}