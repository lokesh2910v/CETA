import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { supabase } from '../lib/supabase';
import { Linkedin } from 'lucide-react';

type TeamMember = {
  id: string;
  name: string;
  role: string;
  category: string;
  image_url: string;
  linkedin_url: string | null;
};

const CATEGORIES = ["Faculty Advisors", "Core Coordinators", "Club Members"];

export function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Faculty Advisors");
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
        // .order('name');

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
<<<<<<< Updated upstream
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-6 animate-fade-up">
          {members.map((member) => (
            <div
              key={member.id}
              className="relative flex flex-col items-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-full max-w-xs mx-auto h-[21rem] group transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 border border-gray-200"
            >
              {/* Circular Profile Image with a Gradient Border */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-gray-200">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
=======
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 animate-fade-up">
            {members.map((member) => (
              <div
                key={member.id}
                className="relative flex flex-col items-center bg-white rounded-xl shadow-lg p-6 w-full max-w-xs mx-auto h-[21rem] group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-l-4 border-blue-600"
              >
                {/* Circular Profile Image */}
                <div className="overflow-hidden w-36 h-36 rounded-full border-4 border-gray-300 shadow-lg transition-all duration-300 sm:w-40 sm:h-40 group-hover:scale-110">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Name */}
                <h3 className="mt-4 text-xl font-semibold text-center text-gray-900 sm:text-2xl">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="mb-6 text-sm text-center text-gray-600 sm:text-lg">{member.role}</p>

                {/* LinkedIn Button (No Overlapping) */}
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-6 px-4 py-2 text-white bg-blue-600 rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100 hover:bg-blue-700"
                  >
                    <Linkedin className="inline-block mr-2 w-5 h-5" />
                    LinkedIn
                  </a>
                )}
>>>>>>> Stashed changes
              </div>
    
              {/* Name */}
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mt-4 text-center tracking-wide">
                {member.name}
              </h3>
    
              {/* Role */}
              <p className="text-gray-600 text-sm sm:text-base text-center mb-6">
                {member.role}
              </p>
    
              {/* LinkedIn Button */}
              {member.linkedin_url && (
                <a
                  href={member.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-6 bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-blue-700 shadow-md"
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
