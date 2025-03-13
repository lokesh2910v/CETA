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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={event.image_url} 
        alt={event.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <div className="flex items-center gap-4 text-gray-600 mb-4">
  <div className="flex items-center gap-2">
    <Calendar size={16} />
    <span>{new Date(event.date).toLocaleDateString()}</span>
  </div>
  <div className="flex items-center gap-2">
    <Clock size={16} />
    <span>{event.time}</span>
  </div>
  <div className="flex items-center gap-2">
    <MapPin size={16} />
    <span>{event.venue}</span>
  </div>
</div>

        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="flex gap-4">
          <a
            href={event.form_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Register <ExternalLink size={16} />
          </a>
          <a
            href={event.whatsapp_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Join Group <WhatsappIcon size={16} />
          </a>
          {showDelete && (
            <button
              onClick={() => onDelete?.(event.id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors ml-auto"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}