'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
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

/* ─────────── Company Logos ─────────── */
const LOGO_SON = 'https://sfile.chatglm.cn/images-ppt/3db696f6d290.jpg';
const LOGO_PHI = 'https://sfile.chatglm.cn/images-ppt/3e2de11ece39.jpg';
const LOGO_TBS = 'https://sfile.chatglm.cn/images-ppt/90786ea0778c.jpg';
const LOGO_CRI = 'https://sfile.chatglm.cn/images-ppt/cf6e98e41bcd.jpg';
const LOGO_ESC = 'https://sfile.chatglm.cn/images-ppt/0b13e2d978b5.jpg';
const LOGO_ULB = 'https://sfile.chatglm.cn/images-ppt/b1d0d58027fc.jpg';

/* ─────────── Data ─────────── */
const experiences = [
  {
    role: 'Chief Marketing Officer',
    org: 'Matelab',
    logo: null,
    period: '2023 — Present',
    description:
      'Leading marketing strategy for Matelab, a media company operating across six European countries. Overseeing brand positioning, growth marketing, and AI-driven campaign optimization across multiple markets and languages.',
    tags: ['Media', 'Growth Marketing', 'Multi-Market'],
  },
  {
    role: 'Program Director & Professor',
    org: 'TBS Education Barcelona',
    logo: LOGO_TBS,
    period: '2008 — Present',
    description:
      'Directing the MSc AI-Driven Digital Marketing & Analytics program and coordinating the Digital Marketing track for the Bachelor in Management. Teaching SEO, SEM, CRM, and data-driven marketing. Shaping the next generation of marketing leaders by bridging AI, data science, and creative strategy.',
    tags: ['AI Strategy', 'Program Leadership', 'Academic Innovation'],
  },
  {
    role: 'Digital Marketing & AI Consultant',
    org: 'Crisalix',
    logo: LOGO_CRI,
    period: '2018 — 2023',
    description:
      'Drove the digital marketing transformation for Crisalix, a B2B SaaS platform for plastic surgeons. Launched my.crisalix with a product-led growth (PLG) funnel, scaling user acquisition across international markets.',
    tags: ['SaaS', 'PLG', 'Digital Transformation'],
  },
  {
    role: 'Founder & CEO',
    org: 'Losali / Obinova',
    logo: null,
    period: '2012 — 2018',
    description:
      'Founded Losali, a telecommunications company solving premium-rate number accessibility from abroad. Created Obinova, building and managing product comparison websites across 3 verticals and 5 countries. Built both ventures from zero to profitability.',
    tags: ['Entrepreneurship', 'Web Products', 'Telecom'],
  },
  {
    role: 'Marketing Leader',
    org: 'Philips',
    logo: LOGO_PHI,
    period: '2002 — 2012',
    description:
      'Spent 10 years with growing responsibilities across marketing leadership roles at Philips. Managed multichannel distribution, P&L oversight, and marketing operations across consumer electronics divisions.',
    tags: ['Multichannel', 'P&L Management', 'Consumer Electronics'],
  },
  {
    role: 'Young Talent Program',
    org: 'Sony',
    logo: LOGO_SON,
    period: '2000 — 2002',
    description:
      'Entered the prestigious Sony young talent program after graduating. Two years of intensive exposure to multiple professional disciplines through trainings, rotations, and visits to Sony operations across Europe.',
    tags: ['Graduate Program', 'Rotational', 'Multinational'],
  },
];

const education = [
  {
    degree: 'MSc in Business Administration',
    school: 'ESCP Business School',
    logo: LOGO_ESC,
    detail: 'Specialization in Strategic Planning, Product Marketing & Digital Transformation. Campuses in Paris, Madrid, Oxford.',
  },
  {
    degree: "Bachelor's in Economics",
    school: 'Universit\u00e9 Libre de Bruxelles',
    logo: LOGO_ULB,
    detail: 'Economics degree from ULB in Brussels, providing the quantitative and analytical foundation for a career in marketing and management.',
  },
];

const projects = [
  {
    title: 'my.crisalix PLG Funnel',
    subtitle: 'Crisalix',
    description:
      'Launched my.crisalix with a product-led growth strategy, designing the full conversion funnel from free trial to paid subscription. Scaled user acquisition across international markets for a B2B SaaS platform serving plastic surgeons.',
    tags: ['PLG', 'SaaS', 'Conversion Optimization'],
    gradient: 'bg-gradient-to-br from-violet-900/40 via-purple-900/20 to-transparent',
  },
  {
    title: 'MSc AI-Driven Marketing Program',
    subtitle: 'TBS Education',
    description:
      'Designed and launched the MSc AI-Driven Digital Marketing & Analytics program. Integrated AI, data analytics, and agile methodologies into marketing pedagogy. First cohort achieved 95% placement rate with 20+ corporate partnerships.',
    tags: ['Curriculum Design', 'AI Pedagogy', 'Industry Partnerships'],
    gradient: 'bg-gradient-to-br from-cyan-900/40 via-teal-900/20 to-transparent',
  },
  {
    title: 'Comparison Website Network',
    subtitle: 'Obinova',
    description:
      'Created and managed product comparison websites spanning 3 verticals and 5 countries. Built the technical infrastructure, SEO strategy, and monetization model from the ground up.',
    tags: ['Web Products', 'SEO', 'Multi-Country'],
    gradient: 'bg-gradient-to-br from-amber-900/40 via-orange-900/20 to-transparent',
  },
  {
    title: 'Matelab Pan-European Growth',
    subtitle: 'Matelab',
    description:
      'Spearheading marketing across six European countries for a media company. Aligning brand strategy, local market execution, and cross-border growth initiatives.',
    tags: ['Multi-Market', 'Media', 'Brand Strategy'],
    gradient: 'bg-gradient-to-br from-emerald-900/40 via-green-900/20 to-transparent',
  },
  {
    title: 'Losali Telecom Venture',
    subtitle: 'Losali',
    description:
      'Founded a telecommunications company addressing the gap in premium-rate number accessibility from abroad. Identified the market need, built the product, and scaled to profitability.',
    tags: ['Telecom', 'Startup', 'Market Gap'],
    gradient: 'bg-gradient-to-br from-rose-900/40 via-pink-900/20 to-transparent',
  },
  {
    title: 'AI & SEO Masterclass Series',
    subtitle: 'TBS Education',
    description:
      'Delivering online masterclasses on AI applications in digital marketing. Topics include AI-powered SEO despite Google updates, data-driven decision making, and marketing automation for modern enterprises.',
    tags: ['AI', 'SEO', 'Executive Education'],
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
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative pl-8 md:pl-12 pb-14 last:pb-0 group"
    >
      {/* Timeline line */}
      <div className="absolute left-0 md:left-4 top-2 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent" />

      {/* Dot */}
      <div className="absolute left-0 md:left-4 top-2 w-px -translate-x-1/2">
        <div className="w-2 h-2 rounded-full bg-white/30 group-hover:bg-violet-400/80 transition-colors duration-500 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div>
        {/* Logo + Role + Period row */}
        <div className="flex items-start gap-4 mb-3">
          {item.logo && (
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/[0.06] border border-white/[0.08] overflow-hidden flex-shrink-0 mt-0.5">
              <Image
                src={item.logo}
                alt={item.org}
                fill
                className="object-contain p-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                unoptimized
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              <h3 className="text-base md:text-lg font-light text-white/90 tracking-tight">
                {item.role}
              </h3>
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/30 font-mono flex-shrink-0">
                {item.period}
              </span>
            </div>
            <p className="text-sm text-violet-300/60 mt-0.5 tracking-wide">
              {item.org}
            </p>
          </div>
        </div>

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

/* ─────────── Education Card ─────────── */
function EducationCard({
  edu,
  index,
}: {
  edu: (typeof education)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
    >
      <div className="flex items-start gap-4">
        {edu.logo && (
          <div className="relative w-12 h-12 rounded-lg bg-white/[0.06] border border-white/[0.08] overflow-hidden flex-shrink-0">
            <Image
              src={edu.logo}
              alt={edu.school}
              fill
              className="object-contain p-1.5 opacity-70"
              unoptimized
            />
          </div>
        )}
        <div>
          <h3 className="text-base font-light text-white/85 tracking-tight mb-1">
            {edu.degree}
          </h3>
          <p className="text-sm text-violet-300/60 mb-2">
            {edu.school}
          </p>
          <p className="text-xs text-white/35 leading-relaxed">
            {edu.detail}
          </p>
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
              CMO at Matelab &middot; Program Director at TBS Education
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
              <p className="text-sm text-white/35 leading-[1.8] max-w-2xl mb-6">
                I am an accomplished Executive with deep experience across operations, P&L oversight, multichannel distribution, and marketing &mdash; spanning start-up, growth, and mature organizations. After graduating from ULB in Brussels and ESCP Business School, I entered Sony&apos;s young talent program, then spent a decade at Philips in marketing leadership roles before founding my own companies.
              </p>
              <p className="text-sm text-white/35 leading-[1.8] max-w-2xl">
                My work sits at the intersection of data science, artificial intelligence, and creative strategy. Currently CMO at Matelab (media, 6 European countries) and Program Director of the MSc AI-Driven Digital Marketing & Analytics at TBS Education in Barcelona, where I have been teaching since 2008.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ───── EDUCATION ───── */}
      <Section className="relative z-10 px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 mb-12">
            <div className="md:col-span-4">
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/30">
                Education
              </p>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-3xl md:text-4xl font-extralight text-white/80 tracking-tight">
                Academic Background
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
            {education.map((edu, i) => (
              <EducationCard key={edu.school} edu={edu} index={i} />
            ))}
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
                Experience
              </h2>
            </div>
          </div>

          <div className="max-w-3xl">
            {experiences.map((item, i) => (
              <TimelineItem key={item.org + item.role} item={item} index={i} />
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
                  href="https://twitter.com/invisiblegp"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-[0.1em] uppercase text-white/80 border border-white/15 rounded-full hover:border-white/30 hover:bg-white/[0.04] transition-all duration-500"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X / Twitter
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