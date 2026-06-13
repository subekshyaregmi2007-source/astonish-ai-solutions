import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Link } from "wouter";
import { useListSolutions, useListTestimonials, useListEvents, useListArticles } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import * as Icons from "lucide-react";
import { ArrowRight, MapPin } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";

/* ── Count-up hook ─────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration, bounce: 0 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, target, motionVal]);

  useEffect(
    () =>
      spring.on("change", (v) => {
        setDisplay(
          Number.isInteger(target)
            ? Math.round(v).toString()
            : v.toFixed(1)
        );
      }),
    [spring, target]
  );

  return { ref, display };
}

/* ── Animated stat ─────────────────────────────────────────── */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const num = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, "");
  const { ref, display } = useCountUp(num);
  return (
    <div className="text-left">
      <span ref={ref} className="block text-3xl font-thin text-[#8B5CF6] mb-1">
        {display}{suffix}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7]">{label}</span>
    </div>
  );
}

/* ── Word-split headline ───────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};
const wordVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

function SplitHeadline({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <motion.h1
      className="text-[64px] md:text-[100px] lg:text-[110px] font-extralight leading-[0.95] tracking-[-0.04em] text-[#e5e2e1] mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, i) => (
        <span key={i} className="word-clip mr-[0.25em] last:mr-0">
          <motion.span variants={wordVariants}>{word}</motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

/* ── Section fade-in wrapper ───────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger list ──────────────────────────────────────────── */
function StaggerList({
  children,
  className = "",
}: {
  children: React.ReactNode[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
    >
      {children.map((child, i) => (
        <motion.div
          key={i}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
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
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <PageTransition>

        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-16 pt-24 overflow-hidden grain-overlay scan-line">

          {/* Ambient orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="hero-orb-1 absolute w-[700px] h-[700px] rounded-full opacity-[0.07]"
              style={{
                top: "-15%", left: "-10%",
                background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
            <div
              className="hero-orb-2 absolute w-[600px] h-[600px] rounded-full opacity-[0.06]"
              style={{
                bottom: "-10%", right: "-5%",
                background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
                filter: "blur(80px)",
              }}
            />
            <div
              className="hero-orb-3 absolute w-[400px] h-[400px] rounded-full opacity-[0.04]"
              style={{
                top: "30%", right: "20%",
                background: "radial-gradient(circle, #a78bfa 0%, transparent 70%)",
                filter: "blur(100px)",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-8 border border-[#262626] px-6 py-2"
            >
              <motion.span
                className="w-1.5 h-1.5 bg-[#8B5CF6] rounded-full inline-block"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#cbc3d7]">
                Intelligent Workplace Solutions
              </span>
            </motion.div>

            <SplitHeadline text="The Intelligence Behind Better Work." />

            <motion.p
              className="text-lg text-[#cbc3d7] max-w-2xl mx-auto leading-relaxed mb-16"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
            >
              We deliver proactive software that anticipates issues before they happen,
              empowering your team with a considered digital employee experience.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Link
                href="/solutions"
                className="px-12 py-4 bg-[#8B5CF6] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#7C3AED] transition-colors duration-200 relative overflow-hidden group"
                data-testid="button-explore-solutions"
              >
                <span className="relative z-10">Explore Solutions</span>
                <motion.span
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </Link>
              <Link
                href="/contact"
                className="px-12 py-4 border border-[#262626] text-[#e5e2e1] text-[11px] font-semibold uppercase tracking-[0.2em] hover:border-[#8B5CF6] hover:text-[#8B5CF6] transition-colors duration-200"
                data-testid="button-contact-hero"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 border-t border-[#262626]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-8 hidden lg:grid grid-cols-4 gap-6">
              <AnimatedStat value="99.9%" label="System Uptime" />
              <AnimatedStat value="50+" label="Enterprise Partners" />
              <AnimatedStat value="24/7" label="Proactive Support" />
              <AnimatedStat value="10x" label="Faster Resolution" />
            </div>
          </motion.div>
        </section>

        {/* ── SOLUTIONS ────────────────────────────────────── */}
        <section className="py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
          <FadeIn>
            <div className="editorial-line mb-12" />
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8B5CF6] mb-4">Our Solutions</p>
                <h2 className="text-[32px] md:text-[40px] font-light tracking-[-0.02em] text-[#e5e2e1] max-w-lg leading-tight">
                  Specialized AI systems designed to modernize your enterprise workflow.
                </h2>
              </div>
              <Link href="/solutions" className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] hover:text-[#8B5CF6] transition-colors shrink-0">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-[#262626]">
            {previewSolutions ? previewSolutions.map((solution, i) => {
              const Icon = (Icons as any)[solution.icon] || Icons.Box;
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group border-r border-b border-[#262626] p-10 flex flex-col cursor-default"
                >
                  <motion.span
                    className="text-[80px] font-thin text-[#262626] leading-none mb-6 inline-block"
                    whileInView={{ color: undefined }}
                    animate={{}}
                  >
                    <span className="group-hover:text-[#8B5CF6] transition-colors duration-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </motion.span>
                  <h3 className="text-xl font-semibold text-[#8B5CF6] mb-4">{solution.title}</h3>
                  <p className="text-[#cbc3d7] text-[15px] leading-relaxed mb-8 flex-grow">{solution.description}</p>
                  <Link href="/solutions" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e5e2e1] group-hover:gap-4 transition-all duration-300">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              );
            }) : (
              [1, 2, 3].map((i) => (
                <div key={i} className="border-r border-b border-[#262626] p-10">
                  <Skeleton className="h-16 w-16 bg-[#131313] mb-6" />
                  <Skeleton className="h-6 w-3/4 bg-[#131313] mb-4" />
                  <Skeleton className="h-24 bg-[#131313]" />
                </div>
              ))
            )}
          </div>
        </section>

        {/* ── TESTIMONIAL ──────────────────────────────────── */}
        <section className="py-32 px-6 md:px-16 bg-[#0a0a0a] relative overflow-hidden">
          {/* Subtle orb behind quote */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.04] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, #8B5CF6 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div className="max-w-5xl mx-auto relative z-10">
            <FadeIn>
              <div className="editorial-line mb-20 opacity-40" />
            </FadeIn>
            {featuredTestimonial ? (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <blockquote className="text-[28px] md:text-[40px] lg:text-[52px] font-extralight leading-[1.15] tracking-tight text-[#e5e2e1] italic mb-12">
                  "{featuredTestimonial.message}"
                </blockquote>
                <motion.div
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8B5CF6]">
                    — {featuredTestimonial.clientName}
                  </span>
                  <span className="text-[#cbc3d7] text-sm">{featuredTestimonial.role}, {featuredTestimonial.company}</span>
                </motion.div>
              </motion.div>
            ) : (
              <Skeleton className="h-48 bg-[#131313]" />
            )}
          </div>
        </section>

        {/* ── EVENTS & ARTICLES ────────────────────────────── */}
        <section className="py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-24">

            {/* Events */}
            <div className="lg:col-span-5">
              <FadeIn>
                <div className="editorial-line mb-10" />
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-[28px] font-light tracking-tight text-[#e5e2e1] uppercase">Upcoming</h2>
                  <Link href="/events" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] hover:text-[#8B5CF6] transition-colors flex items-center gap-1">
                    All events <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </FadeIn>
              {previewEvents ? (
                <div className="border-t border-[#262626]">
                  {previewEvents.map((event, i) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="border-b border-[#262626] py-8 flex items-start gap-8 group hover:bg-[#0a0a0a] transition-colors"
                    >
                      <div className="w-14 shrink-0 text-center">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7]">{format(new Date(event.date), "MMM")}</span>
                        <span className="block text-3xl font-thin text-[#8B5CF6] leading-none mt-1">{format(new Date(event.date), "dd")}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#e5e2e1] mb-1 group-hover:text-[#8B5CF6] transition-colors">{event.title}</h3>
                        <div className="flex items-center gap-1 text-xs text-[#cbc3d7]">
                          <MapPin className="w-3 h-3" /> {event.location}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {[1, 2].map((i) => <Skeleton key={i} className="h-24 bg-[#131313]" />)}
                </div>
              )}
            </div>

            {/* Articles */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.1}>
                <div className="editorial-line mb-10" />
                <div className="flex justify-between items-center mb-12">
                  <h2 className="text-[28px] font-light tracking-tight text-[#e5e2e1] uppercase">Latest Writing</h2>
                  <Link href="/articles" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] hover:text-[#8B5CF6] transition-colors flex items-center gap-1">
                    All articles <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </FadeIn>
              {previewArticles ? (
                <div className="border-t border-[#262626]">
                  {previewArticles.map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={`/articles/${article.id}`}
                        className="group block border-b border-[#262626] py-8 hover:bg-[#0a0a0a] transition-colors px-2"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-6">
                          <div className="md:w-1/4 shrink-0">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B5CF6]">{article.category}</span>
                          </div>
                          <div className="md:w-3/4">
                            <h3 className="text-lg font-semibold text-[#e5e2e1] mb-2 group-hover:text-[#8B5CF6] transition-colors">{article.title}</h3>
                            <p className="text-[#cbc3d7] text-sm line-clamp-2">{article.summary}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#cbc3d7] shrink-0 group-hover:text-[#8B5CF6] group-hover:translate-x-1 transition-all hidden md:block" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {[1, 2].map((i) => <Skeleton key={i} className="h-24 bg-[#131313]" />)}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── CTA STRIP ────────────────────────────────────── */}
        <motion.section
          className="py-24 px-6 md:px-16 border-t border-b border-[#262626] relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 70%)",
            }}
          />
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <h2 className="text-[32px] md:text-[40px] font-extralight tracking-[-0.02em] text-[#e5e2e1]">
              Ready to transform your<br className="hidden md:block" /> digital employee experience?
            </h2>
            <Link
              href="/contact"
              className="shrink-0 px-12 py-4 bg-[#8B5CF6] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#7C3AED] transition-colors duration-200"
            >
              Let's Talk
            </Link>
          </div>
        </motion.section>

        {/* ── FOOTER ───────────────────────────────────────── */}
        <footer className="py-20 px-6 md:px-16">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-1">
                <div className="font-bold text-[#e5e2e1] text-xl uppercase tracking-tight mb-6">AI-Solutions</div>
                <p className="text-[#cbc3d7] text-sm leading-relaxed">Building the intelligence behind better work. Sunderland, UK.</p>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] mb-6">Solutions</h4>
                <ul className="space-y-4">
                  <li><Link href="/solutions" className="text-[#cbc3d7] hover:text-[#8B5CF6] text-sm transition-colors">Platform</Link></li>
                  <li><Link href="/industries" className="text-[#cbc3d7] hover:text-[#8B5CF6] text-sm transition-colors">Industries</Link></li>
                  <li><Link href="/testimonials" className="text-[#cbc3d7] hover:text-[#8B5CF6] text-sm transition-colors">Case Studies</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] mb-6">Company</h4>
                <ul className="space-y-4">
                  <li><Link href="/articles" className="text-[#cbc3d7] hover:text-[#8B5CF6] text-sm transition-colors">Articles</Link></li>
                  <li><Link href="/events" className="text-[#cbc3d7] hover:text-[#8B5CF6] text-sm transition-colors">Events</Link></li>
                  <li><Link href="/contact" className="text-[#cbc3d7] hover:text-[#8B5CF6] text-sm transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] mb-6">Contact</h4>
                <ul className="space-y-4 text-sm text-[#cbc3d7]">
                  <li>Sunderland, UK</li>
                  <li>hello@ai-solutions.com</li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-[#262626] flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-[11px] text-[#cbc3d7] uppercase tracking-[0.1em]">© {new Date().getFullYear()} AI-Solutions. All rights reserved.</div>
            </div>
          </div>
        </footer>

      </PageTransition>
    </div>
  );
}
