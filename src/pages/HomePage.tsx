import React, { useEffect, useRef } from 'react';
import { Layout } from '../components/Layout';
import { BookOpen, Users, Calendar, Trophy } from 'lucide-react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';

export function HomePage() {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["T.H.E ", "Technova", "Pixel Fusion", "Sports and Culturals", "Brain Masters"],
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
        className="relative w-full h-screen bg-blue-600 text-white flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        
        {/* Logo Centered */}
        <motion.img
  src="/images/mainlogo.jpg"
  alt="Club Logo"
  className="w-48 h-48 mb-6 object-cover rounded-full shadow-lg"
  initial={{ scale: 0 }}
  animate={{ scale: 1.2 }}
  whileHover={{ scale: 1.3 }}
  transition={{ duration: 0.8 }}
/>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to CETA</h1>
        <p className="text-xl md:text-2xl max-w-3xl text-center mx-auto">
          Empowering students to innovate, create, and lead in the world of technology.
        </p>

        <div className="mt-6 text-3xl md:text-4xl font-semibold">
          <span ref={typedRef}></span>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
  className="py-24 bg-white"
  initial={{ scale: 0.5, opacity: 0 }}
  whileInView={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1, ease: "easeOut" }}>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <motion.div 
      className="text-center"
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}>
      <h2 className="text-3xl font-bold text-gray-900 mb-16">
        Grow, Learn & Connect with CETA
      </h2>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        { icon: <BookOpen className="h-8 w-8" />, title: "Workshops", description: "Technical workshops to enhance your skills." },
        { icon: <Users className="h-8 w-8" />, title: "Networking", description: "Connect with like-minded tech enthusiasts." },
        { icon: <Calendar className="h-8 w-8" />, title: "Events", description: "Exciting tech events and competitions." },
        { icon: <Trophy className="h-8 w-8" />, title: "Projects", description: "Hands-on experience with real-world projects." }
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
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <motion.div 
      className="text-center"
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}>
      <h2 className="text-3xl font-bold text-gray-900 mb-16">CETA CLUBS</h2>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 justify-center">
      {[  
        { image: "/images/technova.jpg", title: "Technova", description: "A club focused on technology and innovation." },  
        { image: "/images/brainmasters.jpg", title: "Brain Masters", description: "A club for logical reasoning and coding competitions." },  
        { image: "/images/pixelfusion.jpg", title: "Pixel Fusion", description: "A creative hub for graphic design and UI/UX." },  
        { image: "/images/sports.jpg", title: "Sports & Culturals", description: "A club promoting sports, music, and cultural activities." }  
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


<motion.div 
  className="py-24 bg-gray-50"
  initial={{ opacity: 0, scale: 0.85 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, ease: "anticipate" }}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
      
      {/* Text Section */}
      <motion.div 
        initial={{ opacity: 0, x: -60 }} 
        whileInView={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1.5, ease: "easeInOut" }}>
        <h2 className="text-4xl font-bold text-gray-900 mb-6">
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
          src="/images/mainlogo.jpg"
          alt="Team Collaboration"
          className="rounded-lg shadow-xl p-5"
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
    <motion.div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg"
      whileHover={{ scale: 1.05 }}>
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function FeatureCard({ image, title, description }: { image: string; title: string; description: string }) {
  return (
    <motion.div className="flex flex-col items-center bg-white shadow-lg rounded-lg overflow-hidden w-72"
      whileHover={{ scale: 1.05 }}>
      <img src={image} alt={title} className="w-50 h-60 object-cover" />
      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </motion.div>
  );
}