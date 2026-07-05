'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  gradient: string;
  index?: number;
}

export default function TiltCard({
  title,
  subtitle,
  description,
  tags,
  gradient,
  index = 0,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const shineOpacity = useMotionValue(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const percentX = (e.clientX - rect.left) / rect.width;
      const percentY = (e.clientY - rect.top) / rect.height;

      // Tilt - max 12 degrees
      rotateX.set((percentY - 0.5) * -24);
      rotateY.set((percentX - 0.5) * 24);

      // Shine position
      shineX.set(percentX * 100);
      shineY.set(percentY * 100);
      shineOpacity.set(1);
    },
    [rotateX, rotateY, shineX, shineY, shineOpacity]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    shineOpacity.set(0);
    setIsHovered(false);
  }, [rotateX, rotateY, shineOpacity]);

  const backgroundTransform = useTransform(
    [springRotateX, springRotateY],
    ([rx, ry]) => `translate(${ry * 0.5}px, ${rx * 0.5}px) scale(1.05)`
  );

  const shineBackground = useTransform(
    [shineX, shineY],
    ([sx, sy]) =>
      `radial-gradient(circle at ${sx}% ${sy}%, rgba(255,255,255,0.12) 0%, transparent 60%)`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative cursor-pointer rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm overflow-hidden"
      >
        {/* Gradient Background */}
        <motion.div
          style={{ transform: backgroundTransform }}
          className={`absolute inset-0 opacity-60 ${gradient} transition-opacity duration-500 group-hover:opacity-100`}
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            opacity: shineOpacity,
            background: shineBackground,
          }}
        />

        {/* Border glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl z-10 pointer-events-none"
          style={{
            boxShadow: isHovered
              ? 'inset 0 0 0 1px rgba(255,255,255,0.12), 0 8px 40px rgba(0,0,0,0.4)'
              : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
          }}
        />

        {/* Content */}
        <div className="relative z-20 p-6 md:p-8 flex flex-col gap-4 min-h-[280px]" style={{ transform: 'translateZ(30px)' }}>
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-2">
              {subtitle}
            </p>
            <h3 className="text-xl md:text-2xl font-light text-white/90 tracking-tight">
              {title}
            </h3>
          </div>

          <p className="text-sm text-white/40 leading-relaxed flex-grow">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border border-white/[0.08] text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}