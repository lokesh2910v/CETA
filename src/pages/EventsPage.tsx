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
<div className="relative w-full h-screen flex items-center justify-center bg-cover bg-center" 
  style={{ backgroundImage: "url('/images/eventpage.jpg')" }}>
  <div className="absolute inset-0 bg-black/70"></div> {/* Overlay */}
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
                className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 animate-fade-up ${selectedCategory === category
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-up">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 border border-gray-200"
            >
              {/* Image Section */}
              <div className="w-full h-[320px] bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-xl">
                <img
                  src={event.thumbnail_url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
    
              {/* Content Section */}
              <div className="p-5">
                {/* Title */}
                <h3 className="text-gray-900 text-center font-bold text-lg mb-3">
                  {event.title}
                </h3>
    
                {/* Date & Venue */}
                <div className="bg-gray-50 p-3 rounded-lg shadow-inner mb-4 text-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium">
                      {format(new Date(event.date_time), "PP")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium">{event.venue}</span>
                  </div>
                </div>
    
                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  {event.registration_form_url && (
                    <a
                      href={event.registration_form_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                      Register <ExternalLink size={16} />
                    </a>
                  )}
                  {event.whatsapp_group_url && (
                    <a
                      href={event.whatsapp_group_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
                    >
                      Join Group <ExternalLink size={16} />
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
