import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit, Plus, LogOut } from 'lucide-react';

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

type TeamMember = {
  id: string;
  name: string;
  role: string;
  category: string;
  image_url: string;
  linkedin_url: string | null;
};

type GalleryImage = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
};

type Section = 'events' | 'team' | 'gallery';

export function AdminPage() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section>('events');
  const [events, setEvents] = useState<Event[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchData();
  }, [activeSection]);

  async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin');
    }
  }

  async function fetchData() {
    try {
      setLoading(true);
      let data;
      
      switch (activeSection) {
        case 'events':
          const { data: eventsData } = await supabase
            .from('events')
            .select('*')
            .order('date_time', { ascending: false });
          setEvents(eventsData || []);
          break;
          
        case 'team':
          const { data: teamData } = await supabase
            .from('team_members')
            .select('*')
            .order('name');
          setTeamMembers(teamData || []);
          break;
          
        case 'gallery':
          const { data: galleryData } = await supabase
            .from('gallery_images')
            .select('*')
            .order('created_at', { ascending: false });
          setGalleryImages(galleryData || []);
          break;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const table = activeSection === 'team' ? 'team_members' : 
                    activeSection === 'gallery' ? 'gallery_images' : 'events';
      
      if (isEditing && editingId) {
        await supabase
          .from(table)
          .update(formData)
          .eq('id', editingId);
      } else {
        await supabase
          .from(table)
          .insert([formData]);
      }
      
      setFormData({});
      setIsEditing(false);
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const table = activeSection === 'team' ? 'team_members' : 
                    activeSection === 'gallery' ? 'gallery_images' : 'events';
      
      await supabase
        .from(table)
        .delete()
        .eq('id', id);
      
      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  function handleEdit(item: any) {
    setFormData(item);
    setIsEditing(true);
    setEditingId(item.id);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveSection('events')}
            className={`px-4 py-2 rounded-lg ${
              activeSection === 'events' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveSection('team')}
            className={`px-4 py-2 rounded-lg ${
              activeSection === 'team' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Team
          </button>
          <button
            onClick={() => setActiveSection('gallery')}
            className={`px-4 py-2 rounded-lg ${
              activeSection === 'gallery' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            Gallery
          </button>
        </div>

        {/* Add/Edit Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeSection === 'events' && (
              <>
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  required
                />
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="TECHNOVA">TECHNOVA</option>
                  <option value="PIXEL FUSION">PIXEL FUSION</option>
                  <option value="BRAIN MASTERS">BRAIN MASTERS</option>
                  <option value="SPORTS AND CULTURALS">SPORTS AND CULTURALS</option>
                </select>
                <input
                  type="text"
                  placeholder="Thumbnail URL"
                  value={formData.thumbnail_url || ''}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="datetime-local"
                  value={formData.date_time?.slice(0, 16) || ''}
                  onChange={(e) => setFormData({ ...formData, date_time: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Venue"
                  value={formData.venue || ''}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="url"
                  placeholder="Registration Form URL"
                  value={formData.registration_form_url || ''}
                  onChange={(e) => setFormData({ ...formData, registration_form_url: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                />
                <input
                  type="url"
                  placeholder="WhatsApp Group URL"
                  value={formData.whatsapp_group_url || ''}
                  onChange={(e) => setFormData({ ...formData, whatsapp_group_url: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                />
              </>
            )}

            {activeSection === 'team' && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={formData.role || ''}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  required
                />
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Faculty Advisors">Faculty Advisors</option>
                  <option value="Core Coordinators">Core Coordinators</option>
                  <option value="Club Members">Club Members</option>
                </select>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={formData.image_url || ''}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="url"
                  placeholder="LinkedIn URL"
                  value={formData.linkedin_url || ''}
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                />
              </>
            )}

            {activeSection === 'gallery' && (
              <>
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  required
                />
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="TECHNOVA">TECHNOVA</option>
                  <option value="PIXEL FUSION">PIXEL FUSION</option>
                  <option value="BRAIN MASTERS">BRAIN MASTERS</option>
                  <option value="SPORTS AND CULTURALS">SPORTS AND CULTURALS</option>
                </select>
                <input
                  type="text"
                  placeholder="Image URL"
                  value={formData.image_url || ''}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                  rows={3}
                />
              </>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              {isEditing ? 'Update' : 'Add'} {activeSection.slice(0, -1)}
            </button>
          </div>
        </form>

        {/* List View */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {activeSection === 'events' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Venue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </>
                  )}
                  {activeSection === 'team' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </>
                  )}
                  {activeSection === 'gallery' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activeSection === 'events' && events.map((event) => (
                  <tr key={event.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{event.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{event.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(event.date_time).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{event.venue}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(event)}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {activeSection === 'team' && teamMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{member.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{member.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(member)}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {activeSection === 'gallery' && galleryImages.map((image) => (
                  <tr key={image.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{image.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{image.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{image.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(image)}
                        className="text-blue-600 hover:text-blue-800 mr-4"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}