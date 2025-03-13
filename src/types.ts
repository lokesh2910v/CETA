export interface Event {
  id: string;
  title: string;
  description: string;
  image_url: string;
  form_link: string;
  whatsapp_link: string;
  date: string;
  time: string;
  venue: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image_url: string;
  category: 'faculty' | 'head_coordinator' | 'member';
  description: string;
  linkedin_url?: string;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  description: string;
  event_name: string;
  created_at: string;
}