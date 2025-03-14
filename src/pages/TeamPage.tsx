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
        .order('name');

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-up">
            {members.map((member) => (
              <div
                key={member.id}
                className="relative flex flex-col items-center bg-white rounded-xl shadow-lg p-6 w-full max-w-xs mx-auto h-[21rem] group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-l-4 border-blue-600"
              >
                {/* Circular Profile Image */}
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg transition-all duration-300 group-hover:scale-110">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Name */}
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-4 text-center">
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-gray-600 text-sm sm:text-lg text-center mb-6">{member.role}</p>

                {/* LinkedIn Button (No Overlapping) */}
                {member.linkedin_url && (
                  <a
                    href={member.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-6 bg-blue-600 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-blue-700"
                  >
                    <Linkedin className="inline-block w-5 h-5 mr-2" />
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
