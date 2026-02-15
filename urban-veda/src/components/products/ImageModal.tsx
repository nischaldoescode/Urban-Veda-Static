"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, RotateCcw } from "lucide-react";

interface ImageModalProps {
  src: string;
  alt: string;
  stickerSrc?: string;
}

export default function ImageModal({ src, alt, stickerSrc }: ImageModalProps) {
  const [open, setOpen] = useState(false);

  // 3D rotation state
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // pointer tracking — works for both mouse AND touch
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  // accumulate rotation so it doesn't reset between drags
  const accumulated = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  // velocity for momentum
  const velocity = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const resetRotation = useCallback(() => {
    accumulated.current = { x: 0, y: 0 };
    setRotX(0);
    setRotY(0);
  }, []);

  // stop momentum on new drag
  const stopMomentum = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // momentum decay after release
  const runMomentum = useCallback(() => {
    const decay = 0.92;
    velocity.current.x *= decay;
    velocity.current.y *= decay;

    const speed = Math.abs(velocity.current.x) + Math.abs(velocity.current.y);
    if (speed < 0.05) {
      rafRef.current = null;
      return;
    }

    accumulated.current.x += velocity.current.y * 0.4;
    accumulated.current.y += velocity.current.x * 0.4;

    setRotX(accumulated.current.x);
    setRotY(accumulated.current.y);

    rafRef.current = requestAnimationFrame(runMomentum);
  }, []);

  // ── POINTER EVENTS (unified mouse + touch) ──────────────────────────────

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      stopMomentum();
      setIsDragging(true);
      lastPos.current = { x: e.clientX, y: e.clientY };
      velocity.current = { x: 0, y: 0 };
      // capture so we keep getting events even if pointer leaves element
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [stopMomentum],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !lastPos.current) return;
      e.preventDefault();

      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;

      // sensitivity — higher = spins faster
      const sensitivity = 0.45;
      const dRotY = dx * sensitivity;
      const dRotX = -dy * sensitivity;

      accumulated.current.x += dRotX;
      accumulated.current.y += dRotY;

      // track velocity for momentum
      velocity.current.x = dx;
      velocity.current.y = dy;

      setRotX(accumulated.current.x);
      setRotY(accumulated.current.y);

      lastPos.current = { x: e.clientX, y: e.clientY };
    },
    [isDragging],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      setIsDragging(false);
      lastPos.current = null;
      // kick off momentum
      rafRef.current = requestAnimationFrame(runMomentum);
    },
    [runMomentum],
  );

  // cleanup on unmount or close
  useEffect(() => {
    if (!open) {
      stopMomentum();
      resetRotation();
    }
    return () => stopMomentum();
  }, [open, stopMomentum, resetRotation]);

  return (
    <>
      {/* zoom trigger overlay on product card */}
      <button
        onClick={() => setOpen(true)}
        className="absolute inset-0 z-20 flex items-end justify-end p-4 group/zoom"
        aria-label="view full image"
      >
        <span
          className="bg-white/90 backdrop-blur-sm text-gray-700 rounded-xl p-2 shadow-lg
          opacity-100 sm:opacity-0 sm:group-hover/zoom:opacity-100 transition-opacity"
        >
          <ZoomIn size={16} />
        </span>
      </button>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/92 backdrop-blur-xl z-[9999]"
            />

            {/* centering wrapper — pointer-events-none so backdrop click works */}
            <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 sm:p-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 12 }}
                transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="pointer-events-auto relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
              >
                {/* close + reset row */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <button
                    onClick={resetRotation}
                    className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                  >
                    <RotateCcw size={12} />
                    reset
                  </button>

                  <span className="text-white/30 text-xs hidden sm:block select-none">
                    drag to rotate · pinch to zoom
                  </span>
                  <span className="text-white/30 text-xs sm:hidden select-none">
                    drag to spin
                  </span>

                  <button
                    onClick={() => setOpen(false)}
                    className="bg-white/10 hover:bg-white/25 text-white rounded-full p-2 transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* ── 3D CARD ── */}
                <div
                  style={{
                    perspective: "900px",
                    perspectiveOrigin: "center center",
                  }}
                >
                  <div
                    ref={cardRef}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                    style={{
                      transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                      transformStyle: "preserve-3d",
                      // smooth only when NOT dragging (momentum looks better without transition during drag)
                      transition: isDragging
                        ? "none"
                        : "transform 0.05s linear",
                      cursor: isDragging ? "grabbing" : "grab",
                      // prevent iOS text selection / scroll interference
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      touchAction: "none",
                    }}
                    className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl will-change-transform"
                  >
                    {/* front face — the actual image */}
                    <div style={{ backfaceVisibility: "hidden" }}>
                      <img
                        src={src}
                        alt={alt}
                        draggable={false}
                        className="w-full h-auto max-h-[65vh] sm:max-h-[70vh] object-contain block bg-black/20 select-none"
                        style={{ pointerEvents: "none" }}
                      />
                    </div>

                    {/* back face — shows when fully flipped */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background:
                          "linear-gradient(135deg, #1a2410 0%, #2d3e2d 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "12px",
                        padding: "24px",
                      }}
                    >
                      {/* logo leaf icon on back */}
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          background: "rgba(85,107,47,0.3)",
                          borderRadius: 16,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.4L12 22l5.5-1.6C20.2 18.6 22 15.5 22 12c0-5.5-4.5-10-10-10z"
                            fill="#556b2f"
                            opacity="0.7"
                          />
                          <path
                            d="M12 7c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5z"
                            fill="#8fbc8f"
                            opacity="0.5"
                          />
                        </svg>
                      </div>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.5)",
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                        }}
                      >
                        urban veda
                      </p>
                      <p
                        style={{
                          color: "rgba(255,255,255,0.25)",
                          fontSize: 10,
                          textAlign: "center",
                          lineHeight: 1.6,
                        }}
                      >
                        100% organic · no preservatives
                      </p>
                    </div>

                    {/* sticker — positioned on the 3D card so it rotates with it */}
                    {stickerSrc && (
                      <div
                        style={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          width: 72,
                          height: 72,
                          filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.4))",
                          transform: "translateZ(20px) rotate(8deg)",
                          pointerEvents: "none",
                        }}
                      >
                        <img
                          src={stickerSrc}
                          alt="sticker"
                          draggable={false}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    )}

                    {/* edge glow — gives depth */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background: `radial-gradient(ellipse at ${50 + rotY * 0.3}% ${50 - rotX * 0.3}%, rgba(255,255,255,0.06) 0%, transparent 70%)`,
                        borderRadius: "inherit",
                        transition: isDragging ? "none" : "background 0.1s",
                      }}
                    />
                  </div>
                </div>

                {/* label */}
                <p className="text-center text-white/30 text-[11px] mt-4 select-none">
                  {alt}
                </p>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
