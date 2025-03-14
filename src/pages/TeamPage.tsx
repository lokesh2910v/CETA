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
      <div className="px-4 md:px-8 lg:px-24 py-8">
        {/* Category Selection */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
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
          <div className="text-center py-12 text-gray-700">Loading team members...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-6 animate-fade-up">
          {members.map((member) => (
            <div
              key={member.id}
              className="relative flex flex-col items-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 w-full max-w-xs mx-auto h-[23rem] group transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 border border-gray-200"
            >
              {/* Circular Profile Image with a Gradient Border */}
              <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transition-transform duration-300 group-hover:scale-105">
  <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-gray-200">
    <img
      src={member.image_url}
      alt={member.name}
      className="w-full h-full object-cover"
    />
  </div>
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
