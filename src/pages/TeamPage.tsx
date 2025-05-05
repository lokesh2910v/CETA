import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { supabase } from '../lib/supabase';
import { Linkedin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  category: string;
  image_url: string;
  linkedin_url: string | null;
};

const CATEGORIES = ["Faculty", "Core Members", "Club Members"];

export function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Faculty");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, [selectedCategory]);

  async function fetchTeamMembers() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .eq('category', selectedCategory)
        .order('created_at', { ascending: true }); // Oldest first
  
      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <Layout>
      <Helmet>
        <title>CETA Team - Faculty & Student Leadership | MB University</title>
        <meta name="description" content="Meet CETA's leadership team at Mohan Babu University - Faculty advisors, core team members and club organizers driving technical education initiatives for engineering students." />
        
        {/* Open Graph */}
        <meta property="og:title" content="CETA Technical Association Team | MBU" />
        <meta property="og:description" content="Explore CETA's faculty and student leadership team organizing technical workshops and competitions at Mohan Babu University." />
        <meta property="og:image" content="/images/team-og.webp" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CETA Technical Team @ MBU" />
        <meta name="twitter:description" content="Faculty and student leaders managing technical education programs at Mohan Babu University's Computer Engineering Association." />
        
        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollegeOrUniversity",
            "name": "Mohan Babu University",
            "department": {
              "@type": "Organization",
              "name": "Computer Engineering Technical Association (CETA)",
              "description": "Student-led technical organization organizing workshops and competitions",
              "url": "https://ceta-mbu.com/team",
              "member": members.map(member => ({
                "@type": "Person",
                "name": member.name,
                "jobTitle": member.role,
                "memberOf": {
                  "@type": "Organization",
                  "name": member.category
                },
                "image": member.image_url?.replace(/\.(jpg|png)$/, '.webp') || '',
                "url": member.linkedin_url
              }))
            }
          })}
        </script>
      </Helmet>
      <div className="px-4 py-8 md:px-8 lg:px-24">
        {/* Category Selection */}
        <div className="mb-6 text-center">
          <h2 className="mb-4 text-2xl font-extrabold text-gray-900 md:text-3xl">
            Meet Our Team
          </h2>
          <div className="flex flex-wrap gap-3 justify-center md:gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 text-sm md:text-lg rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Team Members Grid */}
        {loading ? (
          <div className="py-12 text-center text-gray-700">Loading team members...</div>
        ) : (
          <div className="grid grid-cols-1 gap-8 p-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 animate-fade-up">
          {members.map((member) => (
            <div
              key={member.id}
              className="relative flex flex-col items-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-full max-w-xs mx-auto h-[23rem] group transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 border border-gray-200"
            >
              {/* Circular Profile Image with a Gradient Border */}
              <div className="p-1 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg transition-transform duration-300 sm:w-52 sm:h-52 group-hover:scale-105">
  <div className="overflow-hidden w-full h-full bg-white rounded-full border-4 border-gray-200">
    <img
      src={member.image_url}
      alt={member.name}
      className="object-cover w-full h-full"
    />
  </div>
</div>

              {/* Name */}
              <h3 className="mt-4 text-lg font-bold tracking-wide text-center text-gray-900 sm:text-xl">
                {member.name}
              </h3>
    
              {/* Role */}
              <p className="mb-6 text-sm text-center text-gray-600 transition-opacity duration-300 sm:text-base group-hover:opacity-0">
                {member.role}
              </p>
    
              {/* LinkedIn Button */}
              {member.linkedin_url && (
                <a
                  href={member.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex absolute bottom-6 gap-2 items-center px-4 py-2 text-white bg-blue-600 rounded-full shadow-md opacity-0 transition-all duration-500 group-hover:opacity-100 hover:bg-blue-700"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              )}
            </div>
      ))}
    </div>
        )}
      </div>
    </Layout>
  );
}
