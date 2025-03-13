/*
  # Create storage buckets for images

  1. New Storage Buckets
    - Create storage buckets for:
      - team-member-images
      - gallery-images
    
  2. Security
    - Enable public access to view images
    - Add policies for authenticated users to manage images
*/

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('team-member-images', 'team-member-images', true),
  ('gallery-images', 'gallery-images', true);

-- Allow public access to view images in team-member-images bucket
CREATE POLICY "Public Access - Team Member Images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'team-member-images');

-- Allow authenticated users to upload images to team-member-images bucket
CREATE POLICY "Authenticated users can upload team member images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'team-member-images');

-- Allow authenticated users to delete team member images
CREATE POLICY "Authenticated users can delete team member images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'team-member-images');

-- Allow public access to view images in gallery-images bucket
CREATE POLICY "Public Access - Gallery Images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'gallery-images');

-- Allow authenticated users to upload images to gallery-images bucket
CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery-images');

-- Allow authenticated users to delete gallery images
CREATE POLICY "Authenticated users can delete gallery images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'gallery-images');