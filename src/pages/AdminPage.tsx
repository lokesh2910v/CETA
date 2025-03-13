import React, { useState, useEffect } from 'react';
import { PlusCircle, LogOut, Upload, Users, Calendar, Image as ImageIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Event, TeamMember, GalleryImage } from '../types';
import { EventCard } from '../components/EventCard';

export function AdminPage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'events' | 'team' | 'gallery'>('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  
  // Event Form State
  const [eventImageFile, setEventImageFile] = useState<File | null>(null);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    form_link: '',
    whatsapp_link: '',
    date: '',
    time: '',
    venue: '',
  });

  // Team Member Form State
  const [teamMemberImageFile, setTeamMemberImageFile] = useState<File | null>(null);
  const [teamMemberFormData, setTeamMemberFormData] = useState({
    name: '',
    role: '',
    image_url: '',
    category: 'member',
    description: '',
    linkedin_url: '',
  });

  // Gallery Form State
  const [galleryImageFile, setGalleryImageFile] = useState<File | null>(null);
  const [galleryFormData, setGalleryFormData] = useState({
    title: '',
    image_url: '',
    description: '',
    event_name: '',
  });

  useEffect(() => {
    if (activeTab === 'events') fetchEvents();
    if (activeTab === 'team') fetchTeamMembers();
    if (activeTab === 'gallery') fetchGalleryImages();
  }, [activeTab]);

  const fetchEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setEvents(data);
  };

  const fetchTeamMembers = async () => {
    const { data } = await supabase
      .from('team_members')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setTeamMembers(data);
  };

  const fetchGalleryImages = async () => {
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setGalleryImages(data);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      toast.error('Failed to sign out');
      console.error('Error:', error);
    }
  };

  const uploadImage = async (file: File, bucket: string) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = eventFormData.image_url;

      if (eventImageFile) {
        imageUrl = await uploadImage(eventImageFile, 'event-images');
      }

      const { error } = await supabase
        .from('events')
        .insert([{ ...eventFormData, image_url: imageUrl }]);

      if (error) throw error;

      toast.success('Event added successfully!');
      setEventFormData({
        title: '',
        description: '',
        image_url: '',
        form_link: '',
        whatsapp_link: '',
        date: '',
        time: '',
        venue: '',
      });
      setEventImageFile(null);
      fetchEvents();
    } catch (error) {
      toast.error('Failed to add event');
      console.error('Error:', error);
    }
  };

  const handleTeamMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let imageUrl = teamMemberFormData.image_url;

      if (teamMemberImageFile) {
        imageUrl = await uploadImage(teamMemberImageFile, 'team-member-images');
      }

      const { error } = await supabase
        .from('team_members')
        .insert([{ ...teamMemberFormData, image_url: imageUrl }]);

      if (error) throw error;

      toast.success('Team member added successfully!');
      setTeamMemberFormData({
        name: '',
        role: '',
        image_url: '',
        category: 'member',
        description: '',
        linkedin_url: '',
      });
      setTeamMemberImageFile(null);
      fetchTeamMembers();
    } catch (error) {
      toast.error('Failed to add team member');
      console.error('Error:', error);
    }
  };

  const handleGallerySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!galleryImageFile) {
        throw new Error('Please select an image');
      }

      const imageUrl = await uploadImage(galleryImageFile, 'gallery-images');

      const { error } = await supabase
        .from('gallery')
        .insert([{ ...galleryFormData, image_url: imageUrl }]);

      if (error) throw error;

      toast.success('Gallery image added successfully!');
      setGalleryFormData({
        title: '',
        image_url: '',
        description: '',
        event_name: '',
      });
      setGalleryImageFile(null);
      fetchGalleryImages();
    } catch (error) {
      toast.error('Failed to add gallery image');
      console.error('Error:', error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      const { data: event } = await supabase
        .from('events')
        .select('image_url')
        .eq('id', id)
        .single();

      if (event?.image_url) {
        const fileName = event.image_url.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('event-images')
            .remove([fileName]);
        }
      }

      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      toast.error('Failed to delete event');
      console.error('Error:', error);
    }
  };

  const handleDeleteTeamMember = async (id: string) => {
    try {
      const { data: member } = await supabase
        .from('team_members')
        .select('image_url')
        .eq('id', id)
        .single();

      if (member?.image_url) {
        const fileName = member.image_url.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('team-member-images')
            .remove([fileName]);
        }
      }

      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Team member deleted successfully!');
      fetchTeamMembers();
    } catch (error) {
      toast.error('Failed to delete team member');
      console.error('Error:', error);
    }
  };

  const handleDeleteGalleryImage = async (id: string) => {
    try {
      const { data: image } = await supabase
        .from('gallery')
        .select('image_url')
        .eq('id', id)
        .single();

      if (image?.image_url) {
        const fileName = image.image_url.split('/').pop();
        if (fileName) {
          await supabase.storage
            .from('gallery-images')
            .remove([fileName]);
        }
      }

      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Gallery image deleted successfully!');
      fetchGalleryImages();
    } catch (error) {
      toast.error('Failed to delete gallery image');
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('events')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === 'events'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Calendar size={20} />
            Events
          </button>
          <button
            onClick={() => setActiveTab('team')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === 'team'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users size={20} />
            Team
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === 'gallery'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ImageIcon size={20} />
            Gallery
          </button>
        </div>

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <form onSubmit={handleEventSubmit} className="bg-white shadow-md rounded-lg p-8 mb-8">
              <h2 className="text-xl font-semibold mb-6">Add New Event</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    required
                    value={eventFormData.title}
                    onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Event Image</label>
                  <div className="mt-1 flex items-center">
                    <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      <Upload className="h-5 w-5 mr-2" />
                      {eventImageFile ? eventImageFile.name : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        required
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files) setEventImageFile(e.target.files[0]);
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    required
                    value={eventFormData.date}
                    onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Time</label>
                  <input
                    type="time"
                    required
                    value={eventFormData.time}
                    onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Venue</label>
                  <input
                    type="text"
                    required
                    value={eventFormData.venue}
                    onChange={(e) => setEventFormData({ ...eventFormData, venue: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Google Form Link</label>
                  <input
                    type="url"
                    required
                    value={eventFormData.form_link}
                    onChange={(e) => setEventFormData({ ...eventFormData, form_link: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">WhatsApp Group Link</label>
                  <input
                    type="url"
                    required
                    value={eventFormData.whatsapp_link}
                    onChange={(e) => setEventFormData({ ...eventFormData, whatsapp_link: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    value={eventFormData.description}
                    onChange={(e) => setEventFormData({ ...eventFormData, description: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Event
              </button>
            </form>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Existing Events</h2>
              {events.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onDelete={handleDeleteEvent}
                  showDelete
                />
              ))}
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div>
            <form onSubmit={handleTeamMemberSubmit} className="bg-white shadow-md rounded-lg p-8 mb-8">
              <h2 className="text-xl font-semibold mb-6">Add New Team Member</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={teamMemberFormData.name}
                    onChange={(e) => setTeamMemberFormData({ ...teamMemberFormData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    required
                    value={teamMemberFormData.role}
                    onChange={(e) => setTeamMemberFormData({ ...teamMemberFormData, role: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    required
                    value={teamMemberFormData.category}
                    onChange={(e) => setTeamMemberFormData({ ...teamMemberFormData, category: e.target.value as 'faculty' | 'head_coordinator' | 'member' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="faculty">Faculty</option>
                    <option value="head_coordinator">Head Coordinator</option>
                    <option value="member">Member</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                  <div className="mt-1 flex items-center">
                    <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      <Upload className="h-5 w-5 mr-2" />
                      {teamMemberImageFile ? teamMemberImageFile.name : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        required
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files) setTeamMemberImageFile(e.target.files[0]);
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                  <input
                    type="url"
                    value={teamMemberFormData.linkedin_url}
                    onChange={(e) => setTeamMemberFormData({ ...teamMemberFormData, linkedin_url: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    value={teamMemberFormData.description}
                    onChange={(e) => setTeamMemberFormData({ ...teamMemberFormData, description: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Team Member
              </button>
            </form>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Team Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img 
                      src={member.image_url} 
                      alt={member.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-gray-600 mb-2">{member.role}</p>
                      <p className="text-sm text-gray-500 mb-4">{member.category}</p>
                      <button
                        onClick={() => handleDeleteTeamMember(member.id)}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div>
            <form onSubmit={handleGallerySubmit} className="bg-white shadow-md rounded-lg p-8 mb-8">
              <h2 className="text-xl font-semibold mb-6">Add New Gallery Image</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    required
                    value={galleryFormData.title}
                    onChange={(e) => setGalleryFormData({ ...galleryFormData, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Event Name</label>
                  <input
                    type="text"
                    required
                    value={galleryFormData.event_name}
                    onChange={(e) => setGalleryFormData({ ...galleryFormData, event_name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Image</label>
                  <div className="mt-1 flex items-center">
                    <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                      <Upload className="h-5 w-5 mr-2" />
                      {galleryImageFile ? galleryImageFile.name : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        required
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files) setGalleryImageFile(e.target.files[0]);
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    value={galleryFormData.description}
                    onChange={(e) => setGalleryFormData({ ...galleryFormData, description: e.target.value })}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Gallery Image
              </button>
            </form>

            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Gallery Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image) => (
                  <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <img 
                      src={image.image_url} 
                      alt={image.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{image.title}</h3>
                      <p className="text-gray-600 mb-2">{image.event_name}</p>
                      <button
                        onClick={() => handleDeleteGalleryImage(image.id)}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}