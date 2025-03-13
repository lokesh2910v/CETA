import React, { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { Event } from '../types';
import { EventCard } from '../components/EventCard';
import { supabase } from '../lib/supabase';

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (data) {
        setEvents(data);
      }
    }

    fetchEvents();
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-16">YuvaRang 2k25</h1>
        
        {events.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600">No events available</h2>
            <p className="mt-2 text-gray-500">Check back later for upcoming events!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}