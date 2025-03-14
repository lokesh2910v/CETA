import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { supabase } from '../lib/supabase';
import { Calendar, MapPin, Users, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

type Event = {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string;
  date_time: string;
  venue: string;
  registration_form_url: string | null;
  whatsapp_group_url: string | null;
};

const CATEGORIES = ["All", "TECHNOVA", "PIXEL FUSION", "BRAIN MASTERS", "SPORTS AND CULTURALS"];

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory]);

  async function fetchEvents() {
    try {
      setLoading(true);
      console.log(`Fetching events for category: ${selectedCategory}`);

      let query = supabase.from('events').select('*').order('date_time', { ascending: true });

      if (selectedCategory !== "All") {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      console.log("Fetched events:", data);
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
    {/* Hero Section */}
<div className="relative w-full h-[600px] flex items-center justify-center bg-cover bg-center" 
  style={{ backgroundImage: "url('/path-to-your-background.jpg')" }}>
  <div className="absolute inset-0 bg-black/50"></div> {/* Overlay */}
  <div className="relative text-center text-white flex flex-col items-center">
    <h1 className="text-4xl font-bold">Discover & Participate in Exciting Events</h1>
    <p className="mt-2 text-lg">Explore a variety of events and make the most of your experience!</p>
    <button
      onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
      className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold rounded-full flex items-center gap-2 
      shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-bounce"
    >
      Participate <ChevronDown className="w-5 h-5" />
    </button>
  </div>
</div>


      <div id="events-section" className="px-6 md:px-12 lg:px-24 py-8">
        {/* Category Selection */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 animate-fade-up">Events</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 animate-fade-up ${
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
{/* Events Grid */}
{loading ? (
  <div className="text-center py-12 text-lg font-semibold">Loading events...</div>
) : events.length === 0 ? (
  <div className="text-center py-12 text-gray-600">No events found.</div>
) : (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-up">
    {events.map((event) => (
      <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 w-full min-h-[400px]">
        
        {/* Image Box with White Border */}
        <div className="w-full h-[400px] bg-white border-4 border-white flex items-center justify-center overflow-hidden rounded-md">
  <img src={event.thumbnail_url} alt={event.title} className="w-full h-full object-contain rounded-md" />
</div>

        {/* Title */}
        <div className="text-gray-900 text-center py-1 font-semibold text-lg">
          {event.title}
        </div>

        {/* Details */}
        <div className="pt-1 pl-4 pr-4">
          {/* Date & Venue Side by Side */}
          <div className="flex flex-wrap items-center justify-between text-gray-700 text-sm mb-2">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-1 text-blue-500" />
              {format(new Date(event.date_time), 'PPp')}
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-1 text-blue-500" />
              {event.venue}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 pb-5">
            {event.registration_form_url && (
              <a
                href={event.registration_form_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 text-white text-sm px-3 py-1 rounded-md text-center hover:bg-blue-700 transition"
              >
                Register
              </a>
            )}
            {event.whatsapp_group_url && (
              <a
                href={event.whatsapp_group_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 text-white text-sm px-3 py-1 rounded-md text-center hover:bg-green-700 transition"
              >
                <Users className="inline-block w-6 h-6 mr-1" />
                Join Group
              </a>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
)}
    
      </div>
    </Layout>
  );
}

