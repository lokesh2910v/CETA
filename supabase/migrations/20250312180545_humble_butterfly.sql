/*
  # Create gallery table

  1. New Tables
    - `gallery`
      - `id` (uuid, primary key)
      - `title` (text)
      - `image_url` (text)
      - `description` (text)
      - `event_name` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `gallery` table
    - Add policies for public read access
    - Add policies for authenticated users to manage gallery images
*/

CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  description text NOT NULL,
  event_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON gallery
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage gallery
CREATE POLICY "Allow authenticated users to insert gallery images"
  ON gallery
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update gallery images"
  ON gallery
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete gallery images"
  ON gallery
  FOR DELETE
  TO authenticated
  USING (true);