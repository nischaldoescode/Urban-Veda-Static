'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, RotateCcw, ZoomIn } from 'lucide-react';

interface ImageModalProps {
  src: string;
  alt: string;
  stickerSrc?: string;
}

export default function ImageModal({ src, alt, stickerSrc }: ImageModalProps) {
  const [open, setOpen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    lastPos.current = { x: e.clientX, y: e.clientY };
    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x - dy * 0.4)),
      y: Math.max(-30, Math.min(30, prev.y + dx * 0.4)),
    }));
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    lastPos.current = { x: t.clientX, y: t.clientY };
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const t = e.touches[0];
    const dx = t.clientX - lastPos.current.x;
    const dy = t.clientY - lastPos.current.y;
    lastPos.current = { x: t.clientX, y: t.clientY };
    setRotation(prev => ({
      x: Math.max(-30, Math.min(30, prev.x - dy * 0.4)),
      y: Math.max(-30, Math.min(30, prev.y + dx * 0.4)),
    }));
  };

  const reset = () => setRotation({ x: 0, y: 0 });

  return (
    <>
      {/* clickable trigger — wraps the existing image */}
      <button
        onClick={() => setOpen(true)}
        className="absolute inset-0 w-full h-full z-10 cursor-zoom-in group/zoom"
        aria-label="click to view 3D"
      >
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold text-gray-700 opacity-0 group-hover/zoom:opacity-100 transition-opacity shadow-md">
          <ZoomIn size={13} />
          3D view
        </div>
      </button>

      {/* modal */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9990]"
            />

            {/* modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="fixed inset-0 z-[9991] flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-lg">
                {/* close */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute -top-3 -right-3 z-10 bg-white rounded-xl p-2 shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={18} />
                </button>

                {/* reset rotation */}
                <button
                  onClick={reset}
                  className="absolute -top-3 left-0 z-10 bg-white rounded-xl px-3 py-2 shadow-lg hover:bg-gray-100 transition-colors flex items-center gap-1.5 text-xs font-bold text-gray-600"
                >
                  <RotateCcw size={12} />
                  reset
                </button>

                {/* 3D image container */}
                <div
                  className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing select-none"
                  style={{
                    perspective: '800px',
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transition: isDragging ? 'none' : 'transform 0.5s ease',
                    transformStyle: 'preserve-3d',
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={() => setIsDragging(false)}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="500px"
                    draggable={false}
                  />

                  {/* sticker in modal too */}
                  {stickerSrc && (
                    <div
                      className="absolute top-5 right-5 w-20 h-20 pointer-events-none"
                      style={{
                        filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.3))',
                        transform: 'rotate(8deg)',
                      }}
                    >
                      <Image
                        src={stickerSrc}
                        alt="sticker"
                        fill
                        className="object-contain"
                        draggable={false}
                      />
                    </div>
                  )}

                  {/* 3D depth edge effect */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 60px rgba(0,0,0,0.15)',
                    }}
                  />
                </div>

                <p className="text-center text-white/60 text-xs mt-3 font-medium">
                  drag to rotate • touch supported
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}