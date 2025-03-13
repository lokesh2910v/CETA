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
      <div className="px-6 md:px-12 lg:px-24 py-8">
        {/* Category Selection */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {members.map((member) => (
              <div
                key={member.id}
                className="relative flex flex-col items-center bg-white rounded-xl shadow-lg p-6 w-80 h-96 group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-l-4 border-blue-600"
              >
                {/* Circular Profile Image */}
                <div className="w-52 h-52 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg transition-all duration-300 group-hover:scale-110">
                  <img
                    src={member.image_url}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name (Always Visible) */}
                <h3 className="text-2xl font-semibold text-gray-900 mt-4">{member.name}</h3>

                {/* Role (Below Name) */}
                <p className="text-gray-600 text-lg">{member.role}</p>

                {/* Hidden LinkedIn Button (Appear on Hover) */}
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
