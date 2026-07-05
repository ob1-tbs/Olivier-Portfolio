'use client';

import dynamic from 'next/dynamic';
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import MagneticNav from '@/components/portfolio/MagneticNav';
import TiltCard from '@/components/portfolio/TiltCard';
import ScrollLight from '@/components/portfolio/ScrollLight';

// Dynamic import for shader to avoid SSR issues
const ShaderBackground = dynamic(
  () => import('@/components/portfolio/ShaderBackground'),
  { ssr: false }
);

/* ─────────── Data ─────────── */
const experiences = [
  {
    role: 'Program Director & Professor',
    org: 'TBS Education Barcelona',
    period: '2022 — Present',
    description:
      'Leading the MSc AI-Driven Digital Marketing & Analytics program. Shaping the next generation of marketing leaders by bridging data science, artificial intelligence, and creative strategy. Developed industry partnerships and real-world project frameworks with global brands.',
    tags: ['AI Strategy', 'Program Leadership', 'Academic Innovation'],
  },
  {
    role: 'Chief Marketing Officer',
    org: 'Growth-Stage Technology Company',
    period: '2019 — 2022',
    description:
      'Spearheaded a full-funnel digital transformation, integrating AI-powered analytics into campaign optimization. Oversaw P&L for marketing operations, managed cross-functional teams across 4 markets, and drove a 3x increase in qualified pipeline through data-driven attribution models.',
    tags: ['Digital Transformation', 'P&L Management', 'Growth Marketing'],
  },
  {
    role: 'VP of Marketing & Distribution',
    org: 'Multichannel Retail Group',
    period: '2015 — 2019',
    description:
      'Owned marketing strategy and multichannel distribution across online and offline channels. Implemented Lean Startup methodologies for rapid market testing, resulting in a 40% reduction in time-to-market for new campaigns. Built and mentored a team of 25+ marketing professionals.',
    tags: ['Multichannel', 'Lean Startup', 'Team Leadership'],
  },
  {
    role: 'Senior Strategy Consultant',
    org: 'Management Consulting Firm',
    period: '2011 — 2015',
    description:
      'Delivered strategic marketing and operational consulting for C-suite clients across retail, tech, and luxury sectors. Led due diligence, market entry analysis, and post-merger integration projects with a combined portfolio value exceeding 200M EUR.',
    tags: ['Strategy', 'M&A Advisory', 'Market Entry'],
  },
];

const projects = [
  {
    title: 'AI-Driven Campaign Engine',
    subtitle: 'Marketing Technology',
    description:
      'Built an end-to-end campaign optimization platform using machine learning models to predict customer lifetime value, automate bid management, and personalize creative assets in real time across Google, Meta, and programmatic channels.',
    tags: ['Machine Learning', 'Automation', 'Personalization'],
    gradient: 'bg-gradient-to-br from-violet-900/40 via-purple-900/20 to-transparent',
  },
  {
    title: 'MSc Program Redesign',
    subtitle: 'Academic Innovation',
    description:
      'Redesigned the TBS Education MSc curriculum to integrate AI, data analytics, and agile methodologies into traditional marketing pedagogy. Launched the first cohort with 95% placement rate and established corporate partnerships with 20+ international brands.',
    tags: ['Curriculum Design', 'AI Pedagogy', 'Industry Partnerships'],
    gradient: 'bg-gradient-to-br from-cyan-900/40 via-teal-900/20 to-transparent',
  },
  {
    title: 'Omnichannel Growth Framework',
    subtitle: 'Strategic Consulting',
    description:
      'Developed a proprietary framework for synchronizing online and offline customer journeys. Implemented for 3 enterprise clients, achieving an average 28% increase in customer retention and 35% uplift in cross-channel revenue within 12 months.',
    tags: ['Omnichannel', 'Customer Journey', 'Revenue Growth'],
    gradient: 'bg-gradient-to-br from-amber-900/40 via-orange-900/20 to-transparent',
  },
  {
    title: 'Predictive Analytics Dashboard',
    subtitle: 'Data Product',
    description:
      'Designed and deployed a real-time analytics dashboard for executive decision-making, featuring predictive models for demand forecasting, churn prediction, and marketing mix optimization. Reduced reporting cycle from 2 weeks to real-time.',
    tags: ['Predictive Analytics', 'BI', 'Executive Dashboards'],
    gradient: 'bg-gradient-to-br from-emerald-900/40 via-green-900/20 to-transparent',
  },
  {
    title: 'Startup Accelerator Program',
    subtitle: 'Entrepreneurship',
    description:
      'Founded and directed an accelerator program connecting early-stage marketing-tech startups with corporate partners. Mentored 30+ startups, facilitated 5M+ EUR in funding, and established a pipeline for innovation scouting.',
    tags: ['Startups', 'Mentoring', 'Venture Building'],
    gradient: 'bg-gradient-to-br from-rose-900/40 via-pink-900/20 to-transparent',
  },
  {
    title: 'Data-Driven Brand Strategy',
    subtitle: 'Brand Management',
    description:
      'Pioneered an AI-augmented brand positioning methodology combining sentiment analysis, competitive intelligence, and consumer behavior modeling. Deployed across 4 global brands, resulting in measurable improvements in brand equity and market share.',
    tags: ['Brand Strategy', 'Sentiment Analysis', 'AI'],
    gradient: 'bg-gradient-to-br from-indigo-900/40 via-blue-900/20 to-transparent',
  },
];

const skills = [
  { category: 'Strategy & Leadership', items: ['Strategic Planning', 'P&L Management', 'Executive Leadership', 'Change Management', 'Board Advisory'] },
  { category: 'Marketing & Growth', items: ['Digital Marketing', 'Growth Hacking', 'Brand Strategy', 'CRM & Loyalty', 'Marketing Automation'] },
  { category: 'Data & AI', items: ['Machine Learning', 'Predictive Analytics', 'Data-Driven Decision Making', 'AI Strategy', 'Marketing Mix Modeling'] },
  { category: 'Methods & Tools', items: ['Lean Startup', 'Agile', 'Design Thinking', 'A/B Testing', 'OKR Frameworks'] },
];

/* ─────────── Animated Section Wrapper ─────────── */
function Section({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────── Experience Timeline Item ─────────── */
function TimelineItem({
  item,
  index,
}: {
  item: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-8 md:pl-12 pb-12 last:pb-0 group"
    >
      {/* Timeline line */}
      <div className="absolute left-0 md:left-4 top-2 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent" />

      {/* Dot */}
      <div className="absolute left-0 md:left-4 top-2 w-px -translate-x-1/2">
        <div className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-violet-400/80 transition-colors duration-500 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-3">
          <h3 className="text-base md:text-lg font-light text-white/90 tracking-tight">
            {item.role}
          </h3>
          <span className="text-[11px] tracking-[0.2em] uppercase text-white/30 font-mono">
            {item.period}
          </span>
        </div>
        <p className="text-sm text-violet-300/60 mb-3 tracking-wide">
          {item.org}
        </p>
        <p className="text-sm text-white/40 leading-relaxed max-w-2xl mb-4">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full border border-white/[0.08] text-white/35"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────── Skill Bar ─────────── */
function SkillGroup({
  group,
  index,
}: {
  group: (typeof skills)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <h4 className="text-[11px] tracking-[0.25em] uppercase text-white/30 mb-3">
        {group.category}
      </h4>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item, i) => (
          <motion.span
            key={item}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1 + i * 0.05, duration: 0.4 }}
            className="text-xs text-white/50 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.15] hover:text-white/70 transition-all duration-300"
          >
            {item}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────── Main Page ─────────── */
export default function PortfolioPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <main className="relative min-h-screen">
      <ShaderBackground />
      <ScrollLight />
      <MagneticNav />

      {/* ───── HERO ───── */}
      <motion.div
        ref={heroRef}
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        className="relative z-10 min-h-screen flex items-center px-6 md:px-12 lg:px-24"
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] md:text-xs tracking-[0.35em] uppercase text-white/30 mb-4 md:mb-6">
              Barcelona, Spain
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extralight tracking-tight leading-[0.95] text-white/90"
          >
            Olivier
            <br />
            <span className="text-white/40">Buigues</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
          >
            <p className="text-sm md:text-base text-white/40 font-light tracking-wide">
              Digital Marketing &middot; Management &middot; AI
            </p>
            <div className="hidden sm:block w-px h-4 bg-white/20" />
            <p className="text-sm text-white/25 font-light">
              Program Director, TBS Education
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-12 md:mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
            >
              <div className="w-0.5 h-2 rounded-full bg-white/40" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ───── ABOUT ───── */}
      <Section id="about" className="relative z-10 px-6 md:px-12 lg:px-24 py-32 md:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/30">
                About
              </p>
            </div>
            <div className="md:col-span-8">
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-white/60 leading-relaxed tracking-tight mb-8">
                &ldquo;The good old days of Mad Men are over. It&apos;s not just the creative in marketing that comes up with an idea and pops up something that works really well &mdash; now it&apos;s data-driven, and that&apos;s really the skill that companies are looking for.&rdquo;
              </blockquote>
              <p className="text-sm text-white/35 leading-[1.8] max-w-2xl">
                I am an accomplished Executive with deep experience across operations, P&L oversight, multichannel distribution, and marketing &mdash; spanning start-up, growth, and mature organizations. My work sits at the intersection of data science, artificial intelligence, and creative strategy, helping organizations unlock measurable growth through evidence-based decision-making. Currently, I lead the MSc AI-Driven Digital Marketing & Analytics program at TBS Education in Barcelona, where I prepare the next generation of marketing leaders for an increasingly complex, technology-driven landscape.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ───── SKILLS ───── */}
      <Section className="relative z-10 px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 mb-12">
            <div className="md:col-span-4">
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/30">
                Expertise
              </p>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-3xl md:text-4xl font-extralight text-white/80 tracking-tight">
                Core Competencies
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {skills.map((group, i) => (
              <SkillGroup key={group.category} group={group} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ───── EXPERIENCE ───── */}
      <Section id="experience" className="relative z-10 px-6 md:px-12 lg:px-24 py-32 md:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 mb-16">
            <div className="md:col-span-4">
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/30">
                Career
              </p>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-3xl md:text-4xl font-extralight text-white/80 tracking-tight">
                Selected Experience
              </h2>
            </div>
          </div>

          <div className="max-w-3xl">
            {experiences.map((item, i) => (
              <TimelineItem key={item.role} item={item} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ───── PROJECTS ───── */}
      <Section id="projects" className="relative z-10 px-6 md:px-12 lg:px-24 py-32 md:py-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 mb-16">
            <div className="md:col-span-4">
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/30">
                Work
              </p>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-3xl md:text-4xl font-extralight text-white/80 tracking-tight">
                Featured Projects
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {projects.map((project, i) => (
              <TiltCard key={project.title} {...project} index={i} />
            ))}
          </div>
        </div>
      </Section>

      {/* ───── CONTACT ───── */}
      <Section id="contact" className="relative z-10 px-6 md:px-12 lg:px-24 py-32 md:py-40 pb-48">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/30">
                Connect
              </p>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white/80 tracking-tight mb-8">
                Let&apos;s build something
                <br />
                <span className="text-white/30">extraordinary.</span>
              </h2>
              <p className="text-sm text-white/35 leading-relaxed max-w-lg mb-10">
                Open to academic collaborations, advisory roles, speaking engagements, and strategic consulting opportunities at the intersection of marketing, AI, and business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="https://www.linkedin.com/in/olivierbuigues"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-[0.1em] uppercase text-white/80 border border-white/15 rounded-full hover:border-white/30 hover:bg-white/[0.04] transition-all duration-500"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </motion.a>
                <motion.a
                  href="mailto:olivier.buigues@tbs-education.com"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-[0.1em] uppercase text-white/80 border border-white/15 rounded-full hover:border-white/30 hover:bg-white/[0.04] transition-all duration-500"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Email
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ───── FOOTER ───── */}
      <footer className="relative z-10 px-6 md:px-12 lg:px-24 pb-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/20 tracking-wider uppercase">
          <span>&copy; {new Date().getFullYear()} Olivier Buigues</span>
          <span>Barcelona, Spain</span>
        </div>
      </footer>
    </main>
  );
}