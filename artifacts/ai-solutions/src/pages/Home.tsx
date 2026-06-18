import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { ParticleMesh } from "@/components/ParticleMesh";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Link } from "wouter";
import { useListSolutions, useListTestimonials, useListEvents, useListArticles } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import * as Icons from "lucide-react";
import { ArrowRight, MapPin } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";

/* ── Count-up ──────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1600) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration, bounce: 0 });
  const [display, setDisplay] = useState("0");
  useEffect(() => { if (inView) motionVal.set(target); }, [inView, target, motionVal]);
  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v).toString())), [spring]);
  return { ref, display };
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const num = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const { ref, display } = useCountUp(num);
  return (
    <div>
      <span ref={ref} className="block text-2xl font-thin text-[#2E8B57] mb-1">{display}{suffix}</span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52]">{label}</span>
    </div>
  );
}

/* ── Word-split headline ───────────────────────────────────── */
const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } } };
const wordV = { hidden: { y: "110%", opacity: 0 }, visible: { y: "0%", opacity: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

function SplitHeadline({ text }: { text: string }) {
  return (
    <motion.h1
      className="text-[44px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-extralight leading-[0.95] tracking-[-0.04em] text-[#1A3326] mb-8"
      variants={containerV} initial="hidden" animate="visible"
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="word-clip mr-[0.22em] last:mr-0">
          <motion.span variants={wordV}>{word}</motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

/* ── Scroll fade-in ────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
}

/* ── Cursor spotlight — DOM-direct, zero re-renders ────────── */
function CursorSpotlight() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bloopRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const bloop = bloopRef.current;
    const dot = dotRef.current;
    const hero = wrap?.parentElement;
    if (!wrap || !bloop || !dot || !hero) return;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      bloop.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
      dot.style.transform = `translate(${x - 60}px, ${y - 60}px)`;
      wrap.style.opacity = "1";
    };
    const onLeave = () => { wrap.style.opacity = "0"; };

    hero.addEventListener("mousemove", onMove, { passive: true });
    hero.addEventListener("mouseleave", onLeave, { passive: true });
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity: 0, transition: "opacity 0.4s" }}>
      <div ref={bloopRef} className="absolute rounded-full will-change-transform"
        style={{
          width: 600, height: 600, top: 0, left: 0,
          background: "radial-gradient(circle, rgba(46,139,87,0.13) 0%, rgba(46,139,87,0.04) 45%, transparent 70%)",
        }}
      />
      <div ref={dotRef} className="absolute rounded-full will-change-transform"
        style={{
          width: 120, height: 120, top: 0, left: 0,
          background: "radial-gradient(circle, rgba(91,168,122,0.2) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════════════════════════ */
export default function Home() {
  const { data: solutions } = useListSolutions();
  const { data: testimonials } = useListTestimonials();
  const { data: events } = useListEvents();
  const { data: articles } = useListArticles();

  const previewSolutions = solutions?.slice(0, 3);
  const featuredTestimonial = testimonials?.[0];
  const previewEvents = events?.filter((e) => e.isUpcoming).slice(0, 2);
  const previewArticles = articles?.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F4FBF6] text-[#1A3326]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <PageTransition>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative flex flex-col justify-center min-h-screen px-6 md:px-16 overflow-hidden grain-overlay">

          {/* WebGL-style particle mesh */}
          <ParticleMesh />

          {/* Cursor spotlight */}
          <CursorSpotlight />

          {/* Ambient orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="hero-orb-1 absolute w-[600px] h-[600px] rounded-full opacity-[0.06]"
              style={{ top: "-10%", left: "-8%", background: "radial-gradient(circle, #2E8B57 0%, transparent 70%)", filter: "blur(70px)" }} />
            <div className="hero-orb-2 absolute w-[500px] h-[500px] rounded-full opacity-[0.05]"
              style={{ bottom: "-8%", right: "-4%", background: "radial-gradient(circle, #1E7045 0%, transparent 70%)", filter: "blur(80px)" }} />
            <div className="hero-orb-3 absolute w-[300px] h-[300px] rounded-full opacity-[0.04]"
              style={{ top: "35%", right: "22%", background: "radial-gradient(circle, #5BA87A 0%, transparent 70%)", filter: "blur(80px)" }} />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-5xl w-full mx-auto pt-24 pb-24">
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6 border border-[#AECFBE] px-5 py-2"
            >
              <motion.span className="w-1.5 h-1.5 bg-[#2E8B57] rounded-full inline-block"
                animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#3D6B52]">
                Intelligent Workplace Solutions
              </span>
            </motion.div>

            <SplitHeadline text="The Intelligence Behind Better Work." />

            <motion.p
              className="text-base md:text-lg text-[#3D6B52] max-w-xl leading-relaxed mb-10"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              We deliver proactive software that anticipates issues before they happen,
              empowering your team with a considered digital employee experience.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}>
              <Link href="/solutions"
                className="px-10 py-3.5 bg-[#2E8B57] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#1E7045] transition-colors duration-200 relative overflow-hidden group"
                data-testid="button-explore-solutions">
                <span className="relative z-10">Explore Solutions</span>
              </Link>
              <Link href="/contact"
                className="px-10 py-3.5 border border-[#AECFBE] text-[#1A3326] text-[11px] font-semibold uppercase tracking-[0.2em] hover:border-[#2E8B57] hover:text-[#2E8B57] transition-colors duration-200"
                data-testid="button-contact-hero">
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div className="absolute bottom-0 left-0 right-0 border-t border-[#AECFBE]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.6 }}>
            <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-5 hidden lg:grid grid-cols-4 gap-6">
              <AnimatedStat value="99%" label="System Uptime" />
              <AnimatedStat value="50+" label="Enterprise Partners" />
              <AnimatedStat value="24+" label="Support Hours" />
              <AnimatedStat value="10x" label="Faster Resolution" />
            </div>
          </motion.div>
        </section>

        {/* ── TRUSTED BY ───────────────────────────────────── */}
        <div className="select-none" style={{ background: "#F4FBF6" }}>
          <div className="flex items-stretch">

            {/* Fixed left label */}
            <div className="shrink-0 flex items-center px-8 md:px-14 py-5 gap-3">
              <motion.span className="w-1.5 h-1.5 bg-[#2E8B57] rounded-full inline-block"
                animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2.4, repeat: Infinity }} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#3D6B52] whitespace-nowrap">
                Trusted by
              </span>
            </div>

            {/* Scrolling track */}
            <div className="flex-1 overflow-hidden relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to right, #F4FBF6 30%, transparent)" }} />
              <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to left, #F4FBF6 30%, transparent)" }} />

              <div className="flex items-center" style={{ animation: "trustedTicker 36s linear infinite" }}>
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1}>
                    {[
                      { name: "NorthEast NHS Trust",       initials: "NH" },
                      { name: "Meridian Financial Group",  initials: "MF" },
                      { name: "Dept. for Business & Trade",initials: "DB" },
                      { name: "EuroRetail Holdings",       initials: "ER" },
                      { name: "TransGlobe Logistics",      initials: "TG" },
                      { name: "Beacon Insurance Group",    initials: "BI" },
                      { name: "Newcastle City Council",    initials: "NC" },
                      { name: "Northern Health Alliance",  initials: "NH" },
                    ].map((client, i) => (
                      <div key={i} className="flex items-center shrink-0">
                        <div className="flex items-center gap-3 px-8 py-5">
                          <div className="w-7 h-7 rounded-full bg-[#D8EDE0] flex items-center justify-center shrink-0">
                            <span className="text-[9px] font-bold text-[#2E8B57] tracking-wide">
                              {client.initials}
                            </span>
                          </div>
                          <span className="text-[13px] font-medium text-[#1A3326] whitespace-nowrap tracking-tight">
                            {client.name}
                          </span>
                        </div>
                        <span className="w-[3px] h-[3px] rounded-full bg-[#AECFBE] shrink-0 mx-1" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes trustedTicker {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}</style>
        </div>

        {/* ── SOLUTIONS ────────────────────────────────────── */}
        <section className="pt-10 pb-16 md:pt-14 md:pb-24 px-6 md:px-16 max-w-[1440px] mx-auto">
          <FadeIn>
            <div className="editorial-line mb-8" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2E8B57] mb-3">Our Solutions</p>
                <h2 className="text-[28px] md:text-[36px] font-light tracking-[-0.02em] text-[#1A3326] max-w-lg leading-tight">
                  Specialized AI systems designed to modernize your enterprise workflow.
                </h2>
              </div>
              <Link href="/solutions" className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] hover:text-[#2E8B57] transition-colors shrink-0">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-[#AECFBE]">
            {previewSolutions ? previewSolutions.map((solution, i) => {
              const Icon = (Icons as any)[solution.icon] || Icons.Box;
              return (
                <motion.div key={solution.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="group border-r border-b border-[#AECFBE] p-8 flex flex-col">
                  <span className="text-[64px] font-thin text-[#AECFBE] leading-none mb-5 group-hover:text-[#2E8B57] transition-colors duration-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-[#2E8B57] mb-3">{solution.title}</h3>
                  <p className="text-[#3D6B52] text-sm leading-relaxed mb-6 flex-grow">{solution.description}</p>
                  <Link href="/solutions" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1A3326] group-hover:gap-4 transition-all duration-300">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              );
            }) : [1,2,3].map(i => (
              <div key={i} className="border-r border-b border-[#AECFBE] p-8">
                <Skeleton className="h-12 w-16 bg-[#D8EDE0] mb-5" />
                <Skeleton className="h-5 w-3/4 bg-[#D8EDE0] mb-3" />
                <Skeleton className="h-20 bg-[#D8EDE0]" />
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────── */}
        <section className="py-16 md:py-24 px-6 md:px-16 bg-[#EAF5EE] overflow-hidden">
          <div className="max-w-[1440px] mx-auto">
            <FadeIn>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2E8B57] mb-3">How It Works</p>
                  <h2 className="text-[28px] md:text-[36px] font-light tracking-[-0.02em] text-[#1A3326] max-w-lg leading-tight">
                    From first conversation to continuous improvement.
                  </h2>
                </div>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-[#AECFBE]">
              {[
                {
                  step: "01",
                  title: "Diagnose",
                  description: "We analyse your existing digital infrastructure, identify friction points, and map where AI can deliver the highest impact across your workforce.",
                  detail: "Discovery workshop · Gap analysis · Opportunity mapping",
                },
                {
                  step: "02",
                  title: "Deploy",
                  description: "Our engineers integrate purpose-built AI solutions into your environment — from virtual assistants to predictive IT — with zero disruption to live operations.",
                  detail: "Rapid integration · Change management · Staff enablement",
                },
                {
                  step: "03",
                  title: "Improve",
                  description: "Post-deployment, our platform monitors usage, learns from outcomes, and surfaces continuous optimisation recommendations to your team.",
                  detail: "Real-time analytics · Iterative learning · Quarterly reviews",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="border-r border-b border-[#AECFBE] p-8 md:p-10 flex flex-col group"
                >
                  <span className="text-[72px] font-thin text-[#AECFBE] leading-none mb-6 group-hover:text-[#7DC49A] transition-colors duration-700 select-none">
                    {item.step}
                  </span>
                  <h3 className="text-[22px] font-semibold text-[#1A3326] mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-[#3D6B52] text-sm leading-relaxed mb-8 flex-grow">{item.description}</p>
                  <div className="pt-6 border-t border-[#AECFBE]">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2E8B57]">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL ──────────────────────────────────── */}
        <section className="py-16 md:py-24 px-6 md:px-16 bg-[#EAF5EE] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] opacity-[0.04] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, #2E8B57 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="max-w-4xl mx-auto relative z-10">
            <FadeIn><div className="editorial-line mb-14 opacity-40" /></FadeIn>
            {featuredTestimonial ? (
              <motion.div
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                className="text-center">
                <blockquote className="text-[22px] md:text-[32px] lg:text-[40px] font-extralight leading-[1.2] tracking-tight text-[#1A3326] italic mb-10">
                  "{featuredTestimonial.message}"
                </blockquote>
                <div className="flex flex-col items-center gap-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2E8B57]">— {featuredTestimonial.clientName}</span>
                  <span className="text-[#3D6B52] text-sm">{featuredTestimonial.role}, {featuredTestimonial.company}</span>
                </div>
              </motion.div>
            ) : <Skeleton className="h-40 bg-[#D8EDE0]" />}
          </div>
        </section>

        {/* ── EVENTS & ARTICLES ────────────────────────────── */}
        <section className="py-16 md:py-24 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-16">
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="editorial-line mb-8" />
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-[24px] font-light tracking-tight text-[#1A3326] uppercase">Upcoming</h2>
                  <Link href="/events" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] hover:text-[#2E8B57] transition-colors flex items-center gap-1">
                    All events <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </FadeIn>
              {previewEvents ? (
                <div className="border-t border-[#AECFBE]">
                  {previewEvents.map((event, i) => (
                    <motion.div key={event.id}
                      initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b border-[#AECFBE] py-6 flex items-start gap-6 group hover:bg-[#EAF5EE] transition-colors">
                      <div className="w-12 shrink-0 text-center">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52]">{format(new Date(event.date), "MMM")}</span>
                        <span className="block text-2xl font-thin text-[#2E8B57] leading-none mt-0.5">{format(new Date(event.date), "dd")}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1A3326] text-sm mb-1 group-hover:text-[#2E8B57] transition-colors">{event.title}</h3>
                        <div className="flex items-center gap-1 text-xs text-[#3D6B52]"><MapPin className="w-3 h-3" /> {event.location}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : <div className="space-y-3">{[1,2].map(i => <Skeleton key={i} className="h-20 bg-[#D8EDE0]" />)}</div>}
            </div>

            <div className="lg:col-span-7">
              <FadeIn delay={0.1}>
                <div className="editorial-line mb-8" />
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-[24px] font-light tracking-tight text-[#1A3326] uppercase">Latest Writing</h2>
                  <Link href="/articles" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] hover:text-[#2E8B57] transition-colors flex items-center gap-1">
                    All articles <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </FadeIn>
              {previewArticles ? (
                <div className="border-t border-[#AECFBE]">
                  {previewArticles.map((article, i) => (
                    <motion.div key={article.id}
                      initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                      <Link href={`/articles/${article.id}`}
                        className="group block border-b border-[#AECFBE] py-6 hover:bg-[#EAF5EE] transition-colors px-2">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <div className="md:w-1/4 shrink-0">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2E8B57]">{article.category}</span>
                          </div>
                          <div className="md:w-3/4">
                            <h3 className="text-base font-semibold text-[#1A3326] mb-1 group-hover:text-[#2E8B57] transition-colors">{article.title}</h3>
                            <p className="text-[#3D6B52] text-sm line-clamp-2">{article.summary}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#3D6B52] shrink-0 group-hover:text-[#2E8B57] group-hover:translate-x-1 transition-all hidden md:block" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : <div className="space-y-3">{[1,2].map(i => <Skeleton key={i} className="h-20 bg-[#D8EDE0]" />)}</div>}
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ────────────────────────────────────── */}
        <motion.section className="py-14 md:py-20 px-6 md:px-16 border-t border-b border-[#AECFBE] relative overflow-hidden"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(46,139,87,0.05) 0%, transparent 70%)" }} />
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <h2 className="text-[28px] md:text-[36px] font-extralight tracking-[-0.02em] text-[#1A3326]">
              Ready to transform your digital employee experience?
            </h2>
            <Link href="/contact"
              className="shrink-0 px-10 py-3.5 bg-[#2E8B57] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#1E7045] transition-colors duration-200">
              Let's Talk
            </Link>
          </div>
        </motion.section>

        {/* ── FOOTER ───────────────────────────────────────── */}
        <footer className="py-14 md:py-16 px-6 md:px-16">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
              <div className="col-span-2 md:col-span-1">
                <div className="font-bold text-[#1A3326] text-lg uppercase tracking-tight mb-5">AI-Solutions</div>
                <p className="text-[#3D6B52] text-sm leading-relaxed">Building the intelligence behind better work. Sunderland, UK.</p>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] mb-5">Solutions</h4>
                <ul className="space-y-3 text-sm text-[#3D6B52]">
                  <li><Link href="/solutions" className="hover:text-[#2E8B57] transition-colors">Platform</Link></li>
                  <li><Link href="/industries" className="hover:text-[#2E8B57] transition-colors">Industries</Link></li>
                  <li><Link href="/testimonials" className="hover:text-[#2E8B57] transition-colors">Case Studies</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] mb-5">Company</h4>
                <ul className="space-y-3 text-sm text-[#3D6B52]">
                  <li><Link href="/articles" className="hover:text-[#2E8B57] transition-colors">Articles</Link></li>
                  <li><Link href="/events" className="hover:text-[#2E8B57] transition-colors">Events</Link></li>
                  <li><Link href="/contact" className="hover:text-[#2E8B57] transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] mb-5">Contact</h4>
                <ul className="space-y-3 text-sm text-[#3D6B52]">
                  <li>Sunderland, UK</li>
                  <li>hello@ai-solutions.com</li>
                </ul>
              </div>
            </div>
            <div className="pt-6 border-t border-[#AECFBE]">
              <div className="text-[11px] text-[#3D6B52] uppercase tracking-[0.1em]">© {new Date().getFullYear()} AI-Solutions. All rights reserved.</div>
            </div>
          </div>
        </footer>

      </PageTransition>
    </div>
  );
}
