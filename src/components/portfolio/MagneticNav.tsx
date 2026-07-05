'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticLinkProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
}

export function MagneticLink({
  children,
  href,
  onClick,
  className = '',
  strength = 0.4,
}: MagneticLinkProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      x.set(deltaX);
      y.set(deltaY);
    },
    [x, y, strength]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  const Component = href ? 'a' : 'button';

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        className={`relative block ${className}`}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
        <motion.span
          className="absolute bottom-0 left-0 h-[1px] bg-current origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </Component>
    </motion.div>
  );
}

export default function MagneticNav() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-6"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <MagneticLink href="#" strength={0.3} className="text-sm md:text-base font-medium tracking-widest uppercase text-white/90">
          OB
        </MagneticLink>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <MagneticLink
              key={item.label}
              href={item.href}
              className="text-xs tracking-[0.2em] uppercase text-white/60 hover:text-white/90 transition-colors duration-300"
              strength={0.35}
            >
              {item.label}
            </MagneticLink>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-px bg-white/80"
            animate={{
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 3 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-px bg-white/80"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-px bg-white/80"
            animate={{
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -3 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="md:hidden overflow-hidden"
      >
        <div className="flex flex-col gap-4 pt-6 pb-2">
          {navItems.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={handleNavClick}
              initial={{ x: -20, opacity: 0 }}
              animate={isOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              className="text-sm tracking-[0.2em] uppercase text-white/60 hover:text-white/90 transition-colors duration-300"
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}