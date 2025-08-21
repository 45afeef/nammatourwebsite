'use client';

import React, { useState, useRef, useEffect } from "react";

import { ReactNode } from "react";
interface LightboxProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
  cta?: ReactNode;
}


const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex = 0, onClose, cta }) => {
  const [current, setCurrent] = useState(initialIndex);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [closing, setClosing] = useState(false);
  const touchStart = useRef<number | null>(null);
  const touchCurrent = useRef<number | null>(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation: fade in on image load
  useEffect(() => {
    setImgLoaded(false);
  }, [current]);

  // Animation: curved dissolve on close
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 400); // match animation duration
  };

  // Swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
    touchCurrent.current = e.touches[0].clientX;
    setIsDragging(true);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart.current !== null) {
      const currentX = e.touches[0].clientX;
      touchCurrent.current = currentX;
      setDragX(currentX - touchStart.current);
    }
  };
  const handleTouchEnd = () => {
    setIsDragging(false);
    if (touchStart.current !== null && touchCurrent.current !== null) {
      const diff = touchCurrent.current - touchStart.current;
      if (Math.abs(diff) > 50) {
        if (diff < 0) nextImage(); // swipe left
        else prevImage(); // swipe right
      }
    }
    setDragX(0);
    touchStart.current = null;
    touchCurrent.current = null;
  };

  const prevImage = () => setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () => setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 transition-all duration-400 ${closing ? 'animate-lightbox-dissolve' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        className="absolute top-4 right-4 text-white text-3xl font-bold focus:outline-none"
        onClick={handleClose}
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
        className={`z-10 max-w-full max-h-[80vh] rounded shadow-lg transition-all duration-300 ${imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onLoad={() => setImgLoaded(true)}
        style={{
          transition: isDragging ? 'none' : 'opacity 0.3s, transform 0.3s',
          transform: `translateX(${dragX}px) scale(${imgLoaded ? 1 : 0.95})`,
          opacity: imgLoaded ? 1 : 0
        }}
        draggable={false}
      />
      <button
        className="absolute right-4 text-white text-3xl font-bold focus:outline-none"
        onClick={nextImage}
        aria-label="Next image"
      >
        &#8594;
      </button>
      <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center gap-2">
        <div className="flex justify-center gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border-2 ${idx === current ? 'bg-white border-white' : 'bg-gray-400 border-gray-300'}`}
              onClick={() => setCurrent(idx)}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
        {cta && <div className="mt-3">{cta}</div>}
      </div>
      <style jsx global>{`
        @keyframes lightbox-dissolve {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.95);}
        }
        .animate-lightbox-dissolve {
          animation: lightbox-dissolve 0.4s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Lightbox;
