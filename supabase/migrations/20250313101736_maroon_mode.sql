/*
  # Initial Schema Setup

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (text)
      - `thumbnail_url` (text)
      - `date_time` (timestamptz)
      - `venue` (text)
      - `registration_form_url` (text, nullable)
      - `whatsapp_group_url` (text, nullable)
      - `created_at` (timestamptz)

    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `category` (text)
      - `image_url` (text)
      - `linkedin_url` (text, nullable)
      - `created_at` (timestamptz)

    - `gallery_images`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text, nullable)
      - `category` (text)
      - `image_url` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for authenticated users to manage content
*/

-- Events table
CREATE TABLE IF NOT EXISTS events (
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

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on events"
  ON events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated admin write access on events"
  ON events
  USING (role() = 'authenticated')
  WITH CHECK (role() = 'authenticated');

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  category text NOT NULL,
  image_url text NOT NULL,
  linkedin_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on team_members"
  ON team_members
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated admin write access on team_members"
  ON team_members
  USING (role() = 'authenticated')
  WITH CHECK (role() = 'authenticated');

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on gallery_images"
  ON gallery_images
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated admin write access on gallery_images"
  ON gallery_images
  USING (role() = 'authenticated')
  WITH CHECK (role() = 'authenticated');