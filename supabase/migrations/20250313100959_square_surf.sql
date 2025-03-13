/*
  # Initial Schema Setup for Event Management System

  1. New Tables
    - events
      - id (uuid, primary key)
      - title (text)
      - category (text)
      - thumbnail_url (text)
      - date_time (timestamptz)
      - venue (text)
      - registration_form_url (text)
      - whatsapp_group_url (text)
      - created_at (timestamptz)

    - team_members
      - id (uuid, primary key)
      - name (text)
      - role (text)
      - category (text)
      - image_url (text)
      - linkedin_url (text)
      - created_at (timestamptz)

    - gallery_images
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - category (text)
      - image_url (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated admin write access
*/

-- Create events table
CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  thumbnail_url text NOT NULL,
  date_time timestamptz NOT NULL,
  venue text NOT NULL,
  registration_form_url text,
  whatsapp_group_url text,
  created_at timestamptz DEFAULT now()
);

-- Create team_members table
CREATE TABLE team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  linkedin_url text,
  created_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on events" ON events
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on team_members" ON team_members
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on gallery_images" ON gallery_images
  FOR SELECT USING (true);

-- Create policies for authenticated admin write access
CREATE POLICY "Allow authenticated admin write access on events" ON events
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated admin write access on team_members" ON team_members
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated admin write access on gallery_images" ON gallery_images
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');