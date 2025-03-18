import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { supabase } from '../lib/supabase';
import { Calendar, MapPin, User, ChevronDown ,Clock} from 'lucide-react';
import { format } from 'date-fns';
import { FaExternalLinkAlt, FaWhatsapp } from 'react-icons/fa';

type Event = {
  id: string;
  title: string;
  category: string;
  thumbnail_url: string;
  date_time: string;
  st_time:Date;
  end_time:Date;
  organiser:string;
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
  style={{ backgroundImage: "url('/images/eventpage.jpg')" }}>
  <div className="absolute inset-0 bg-black/70"></div> {/* Overlay */}
  <div className="flex relative flex-col items-center text-center text-white">
    <h1 className="text-4xl font-bold">Discover & Participate in Exciting Events</h1>
    <p className="mt-2 text-lg">Explore a variety of events and make the most of your experience!</p>
    <button
      onClick={() => document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' })}
      className="flex gap-2 items-center px-8 py-3 mt-6 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg transition-all duration-300 animate-bounce hover:shadow-2xl hover:scale-105"
    >
      Participate <ChevronDown className="w-5 h-5" />
    </button>
  </div>
</div>

<div id="events-section" className="px-6 py-8 md:px-12 lg:px-24">
  {/* Category Selection */}
  <div className="mb-8 text-center">
    <h2 className="mb-4 text-3xl font-extrabold text-gray-900 animate-fade-up">Events</h2>
    <div className="flex flex-wrap gap-4 justify-center">
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
  <div className="py-12 text-lg font-semibold text-center">Loading events...</div>
) : events.length === 0 ? (
  <div className="py-12 text-center text-gray-600">No events found.</div>
) : (
  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fade-up">
    {events.map((event) => (
      <div key={event.id} className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:scale-105 w-full min-h-[420px] border border-gray-200">
        
        {/* Image Box with White Border */}
        <div className="w-full h-[400px] bg-white border-4 border-gray-100 flex items-center justify-center overflow-hidden rounded-xl">
          <img src={event.thumbnail_url} alt={event.title} className="w-full h-full rounded-2xl object-fit" />
        </div>

        {/* Title */}
        <div className="py-2 text-xl font-bold text-center text-gray-900">
          {event.title}
        </div>

        {/* Details */}
        <div className="px-5 pb-4 text-gray-700">
          <div className="flex flex-wrap justify-between items-center mb-3 text-sm">
            
            {/* Date */}
            <div className="flex gap-1 items-center font-normal">
              <Calendar className="w-5 h-5 text-blue-600 animate-pulse" />
              {format(new Date(event.date_time), 'PP')}
            </div>
            
            {/* Venue */}
            <div className="flex gap-1 items-center font-normal">
              <MapPin className="w-5 h-5 text-blue-600 animate-pulse" />
              {event.venue}
            </div>
          </div>

          {/* Time & Organizer */}
          <div className="flex flex-wrap justify-between text-sm">
            <div className="flex gap-1 items-center font-normal">
              <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
              {event.st_time && event.end_time
                ? `${format(new Date(`1970-01-01T${event.st_time}`), 'hh:mm a')} - ${format(new Date(`1970-01-01T${event.end_time}`), 'hh:mm a')}`
                : 'Time Not Available'}
            </div>
            <div className="flex gap-1 items-center font-normal">
              <User className="w-5 h-5 text-blue-600 animate-pulse" />
              {event.organiser}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 justify-center px-5 pb-5 w-full">
          {event.registration_form_url && (
            <a
              href={event.registration_form_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 justify-center items-center px-4 py-2 w-full font-semibold text-center text-white bg-gradient-to-r from-violet-500 to-sky-300 rounded-lg shadow-md transition-all hover:from-blue-600 hover:to-blue-800"
            >
               Register <FaExternalLinkAlt className="w-4 h-4 animate-pulse" />
            </a>
          )}
          {event.whatsapp_group_url && (
            <a
              href={event.whatsapp_group_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 justify-center items-center px-4 py-2 w-full font-semibold text-center text-white bg-gradient-to-r from-lime-500 to-cyan-300 rounded-lg shadow-md transition-all hover:from-green-600 hover:to-green-800"
            >
               Join Group <FaWhatsapp className="w-5 h-5 animate-pulse" />
            </a>
          )}
        </div>
      </div>
    ))}
  </div>
)
}
</div>
    </Layout>
  );
}
