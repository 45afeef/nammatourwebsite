'use client';

import React, { useState } from "react";

interface LightboxProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex = 0, onClose }) => {
  const [current, setCurrent] = useState(initialIndex);

  const prevImage = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <button
        className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        &times;
      </button>
      <button
        className="absolute left-4 text-white text-3xl font-bold focus:outline-none"
        onClick={prevImage}
        aria-label="Previous image"
      >
        &#8592;
      </button>
      <img
        src={images[current]}
        alt={`Gallery ${current + 1}`}
        className="max-w-full max-h-[80vh] rounded shadow-lg"
      />
      <button
        className="absolute right-4 text-white text-3xl font-bold focus:outline-none"
        onClick={nextImage}
        aria-label="Next image"
      >
        &#8594;
      </button>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full border-2 ${idx === current ? 'bg-white border-white' : 'bg-gray-400 border-gray-300'}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Lightbox;
