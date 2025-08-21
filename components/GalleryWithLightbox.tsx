'use client';

import React from "react";
import Lightbox from "@/components/Lightbox";

interface GalleryWithLightboxProps {
  images: string[];
}

const GalleryWithLightbox: React.FC<GalleryWithLightboxProps> = ({ images }) => {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="mb-2 container mx-auto px-2">
      <div className="font-semibold mb-1">Gallery</div>
      <div className="flex gap-1 overflow-x-auto">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Gallery ${idx + 1}`}
            className="w-48 h-32 object-cover rounded border border-gray-200 cursor-pointer hover:opacity-80 transition"
            onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { setLightboxIndex(idx); setLightboxOpen(true); } }}
            aria-label={`Open image ${idx + 1} in lightbox`}
          />
        ))}
      </div>
      {lightboxOpen && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
};

export default GalleryWithLightbox;
