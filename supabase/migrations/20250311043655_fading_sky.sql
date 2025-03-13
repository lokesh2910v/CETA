/*
  # Create storage bucket for event images

  1. New Storage Bucket
    - Create a new storage bucket named 'event-images' for storing event images
  2. Security
    - Enable public access to the bucket
    - Add policy for authenticated users to upload images
    - Add policy for public to view images
*/

-- Create a new storage bucket for event images
INSERT INTO storage.buckets (id, name, public)
VALUES ('event-images', 'event-images', true);

-- Allow public access to view images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'event-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'event-images');

-- Allow authenticated users to delete their images
CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'event-images');