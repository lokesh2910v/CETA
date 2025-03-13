/*
  # Create team members table

  1. New Tables
    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `image_url` (text)
      - `category` (text, enum: faculty, head_coordinator, member)
      - `description` (text)
      - `linkedin_url` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `team_members` table
    - Add policies for public read access
    - Add policies for authenticated users to manage team members
*/

CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL CHECK (category IN ('faculty', 'head_coordinator', 'member')),
  description text NOT NULL,
  linkedin_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON team_members
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage team members
CREATE POLICY "Allow authenticated users to insert team members"
  ON team_members
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update team members"
  ON team_members
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete team members"
  ON team_members
  FOR DELETE
  TO authenticated
  USING (true);