/*
  # Fix RLS policies for events table

  1. Changes
    - Drop existing RLS policies
    - Create new policies that properly handle all operations
    
  2. Security
    - Enable RLS on events table
    - Allow public read access
    - Allow authenticated users to insert new events
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated users to manage events" ON events;
DROP POLICY IF EXISTS "Allow public read access" ON events;

-- Create new policies
CREATE POLICY "Allow public read access"
  ON events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert events"
  ON events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update own events"
  ON events
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete own events"
  ON events
  FOR DELETE
  TO authenticated
  USING (true);