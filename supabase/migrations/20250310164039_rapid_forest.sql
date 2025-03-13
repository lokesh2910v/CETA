/*
  # Create events table

  1. New Tables
    - `events`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `form_link` (text)
      - `whatsapp_link` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `events` table
    - Add policies for public read access
    - Add policies for authenticated users to manage events
*/

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  form_link text NOT NULL,
  whatsapp_link text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON events
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage events
CREATE POLICY "Allow authenticated users to manage events"
  ON events
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);