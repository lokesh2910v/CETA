import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Layout } from '../components/Layout';

type GalleryImage = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
};

const CATEGORIES = ["TECHNOVA", "PIXEL FUSION", "BRAIN MASTERS", "SPORTS AND CULTURALS"];

export function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("TECHNOVA");
  const [loading, setLoading] = useState(true);
  const [enlargedImage, setEnlargedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchGalleryImages();
  }, [selectedCategory]);

  async function fetchGalleryImages() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('category', selectedCategory)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
     <div className="px-6 md:px-12 lg:px-24 py-8">
        {/* Category Selection */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4 animate-fade-up">Gallery</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 animate-fade-up ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>


        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-12">Loading gallery...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-white rounded-xl shadow-md overflow-hidden relative group cursor-pointer transform transition duration-300 hover:scale-105"
                onClick={() => setEnlargedImage(image)}
              >
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold text-white">{image.title}</h3>
                  {image.description && (
                    <p className="text-white text-sm mt-1">{image.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enlarged Image Modal */}
      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-6 z-50"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative max-w-3xl w-full">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setEnlargedImage(null)}
            >
              &times;
            </button>
            <img
              src={enlargedImage.image_url}
              alt={enlargedImage.title}
              className="w-full rounded-lg shadow-lg"
            />
            <div className="text-left text-white mt-4 p-4">
              <h3 className="text-2xl font-bold">{enlargedImage.title}</h3>
              {enlargedImage.description && <p className="mt-2">{enlargedImage.description}</p>}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}