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
                    cta={
                        <button
                            className="bg-green-600 text-white font-semibold py-2 px-6 rounded hover:bg-green-700 transition"
                            onClick={() => {
                                window.location.href = "https://wa.me/917907575484?text=Hi%2C%20I%20want%20to%20plan%20a%20trip%20with%20raqlin.com%20and%20would%20like%20to%20book%20a%20package.%20Please%20share%20the%20details.";
                            }}
                        >
                            Book Raqlin
                        </button>
                    }
                />
            )}
        </div>
    );
};

export default GalleryWithLightbox;
