import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { TeamMember } from '../types';
import { supabase } from '../lib/supabase';
import { Linkedin } from 'lucide-react';

export function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('faculty');

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  async function fetchTeamMembers() {
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .order('category', { ascending: true })
      .order('created_at', { ascending: true });

    if (data) {
      setTeamMembers(data);
    }
  }

  const getCategoryData = () => {
    return teamMembers.filter(member => member.category === selectedCategory);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">Our Team</h1>

        {/* Category Selection Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {['faculty', 'head_coordinator', 'member'].map(category => (
            <button
              key={category}
              className={`px-4 py-2 text-base sm:text-lg font-semibold rounded w-full sm:w-auto text-center transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'faculty' ? 'Faculty Advisors' : category === 'head_coordinator' ? 'Head Coordinators' : 'Club Members'}
            </button>
          ))}
        </div>

        {/* Display Selected Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCategoryData().map(member => (
            <TeamMemberCard key={member.id} member={member} compact={selectedCategory === 'member'} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

function TeamMemberCard({ member, compact = false }: { member: TeamMember; compact?: boolean }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
      <img 
        src={member.image_url} 
        alt={member.name} 
        className="w-full object-cover" 
        style={{ height: compact ? '180px' : '250px' }} 
      />
      <div className="p-4 text-center sm:text-left">
        <h3 className="font-semibold text-lg">{member.name}</h3>
        <p className="text-gray-600">{member.role}</p>
        {!compact && <p className="text-gray-600 mt-2">{member.description}</p>}
        {member.linkedin_url && (
          <a
            href={member.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center sm:justify-start gap-2 text-blue-600 hover:text-blue-800 mt-2"
          >
            <Linkedin size={20} />
            Connect on LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}