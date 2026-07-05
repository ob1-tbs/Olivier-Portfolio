'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollLight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const glowIntensity = useTransform(smoothProgress, [0, 0.8, 1], [0, 0.7, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 120;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; life: number }[] = [];

    const animate = () => {
      if (!isVisible) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Main glow
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.5, 100, 0,
        canvas.width * 0.5, 100, canvas.width * 0.4
      );
      gradient.addColorStop(0, 'rgba(120, 90, 220, 0.15)');
      gradient.addColorStop(0.3, 'rgba(60, 140, 180, 0.08)');
      gradient.addColorStop(0.7, 'rgba(20, 60, 80, 0.03)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, 120);

      // Pulsing core
      const pulse = Math.sin(time * 2) * 0.3 + 0.7;
      const coreGradient = ctx.createRadialGradient(
        canvas.width * 0.5, 110, 0,
        canvas.width * 0.5, 110, 80 * pulse
      );
      coreGradient.addColorStop(0, `rgba(180, 140, 255, ${0.1 * pulse})`);
      coreGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = coreGradient;
      ctx.fillRect(0, 0, canvas.width, 120);

      // Spawn particles
      if (Math.random() < 0.3) {
        particles.push({
          x: canvas.width * (0.3 + Math.random() * 0.4),
          y: 100 + Math.random() * 20,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -0.3 - Math.random() * 0.7,
          size: 1 + Math.random() * 2,
          alpha: 0.4 + Math.random() * 0.4,
          life: 1,
        });
      }

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.008;
        p.alpha *= 0.995;

        if (p.life <= 0 || p.y < -10) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160, 130, 240, ${p.alpha * p.life})`;
        ctx.fill();
      }

      // Limit particles
      while (particles.length > 60) particles.shift();

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  return (
    <div ref={containerRef} className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <canvas ref={canvasRef} className="w-full" style={{ height: '120px' }} />
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ opacity: glowIntensity }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />
      </motion.div>
    </div>
  );
}