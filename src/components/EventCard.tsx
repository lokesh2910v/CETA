import React from 'react';
import { ExternalLink, MapIcon as WhatsappIcon, MapPin, Calendar, Clock } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onDelete?: (id: string) => void;
  showDelete?: boolean;
}

export function EventCard({ event, onDelete, showDelete }: EventCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-transform hover:scale-105">
    <img
      src={event.image_url}
      alt={event.title}
      className="w-full h-52 object-cover"
    />
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-3">{event.title}</h3>

      {/* Date, Time, Venue Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-100 p-3 rounded-lg text-gray-700 mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-blue-600" />
          <span className="font-medium">{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-purple-600" />
          <span className="font-medium">{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={18} className="text-red-600" />
          <span className="font-medium">{event.venue}</span>
        </div>
      </div>

      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{event.description}</p>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <a
          href={event.form_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          Register <ExternalLink size={18} />
        </a>
        <a
          href={event.whatsapp_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          Join Group <ExternalLink size={18} />
        </a>
        {showDelete && (
          <button
            onClick={() => onDelete?.(event.id)}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md ml-auto"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  </div>
  );
}