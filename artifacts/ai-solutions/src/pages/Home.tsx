import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListSolutions, useListTestimonials, useListEvents, useListArticles } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import * as Icons from "lucide-react";
import { ArrowRight, MapPin } from "lucide-react";
import { format } from "date-fns";

export default function Home() {
  const { data: solutions } = useListSolutions();
  const { data: testimonials } = useListTestimonials();
  const { data: events } = useListEvents();
  const { data: articles } = useListArticles();

  const previewSolutions = solutions?.slice(0, 3);
  const featuredTestimonial = testimonials?.[0];
  const previewEvents = events?.filter(e => e.isUpcoming).slice(0, 2);
  const previewArticles = articles?.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <PageTransition>

        {/* HERO */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-16 pt-24">
          <div className="relative z-10 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 mb-8 border border-[#262626] px-6 py-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#cbc3d7]">Intelligent Workplace Solutions</span>
              </div>
              <h1 className="text-[64px] md:text-[100px] lg:text-[110px] font-extralight leading-[0.95] tracking-[-0.04em] text-[#e5e2e1] mb-12">
                The Intelligence<br />Behind Better Work.
              </h1>
              <p className="text-lg text-[#cbc3d7] max-w-2xl mx-auto leading-relaxed mb-16">
                We deliver proactive software that anticipates issues before they happen, empowering your team with a considered digital employee experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/solutions"
                  className="px-12 py-4 bg-[#8B5CF6] text-white text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#7C3AED] transition-colors"
                  data-testid="button-explore-solutions"
                >
                  Explore Solutions
                </Link>
                <Link
                  href="/contact"
                  className="px-12 py-4 border border-[#262626] text-[#e5e2e1] text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-white/5 transition-colors"
                  data-testid="button-contact-hero"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-[#262626]">
            <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-8 hidden lg:grid grid-cols-4 gap-6">
              {[
                { val: "99.9%", label: "System Uptime" },
                { val: "50+", label: "Enterprise Partners" },
                { val: "24/7", label: "Proactive Support" },
                { val: "10x", label: "Faster Resolution" },
              ].map((stat) => (
                <div key={stat.label} className="text-left">
                  <span className="block text-3xl font-thin text-[#8B5CF6] mb-1">{stat.val}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7]">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOLUTIONS */}
        <section className="py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-[#262626]">
            {previewSolutions ? previewSolutions.map((solution, i) => {
              const Icon = (Icons as any)[solution.icon] || Icons.Box;
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group border-r border-b border-[#262626] p-10 flex flex-col"
                >
                  <span className="text-[80px] font-thin text-[#262626] leading-none mb-6 group-hover:text-[#8B5CF6] transition-colors duration-700">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-semibold text-[#8B5CF6] mb-4">{solution.title}</h3>
                  <p className="text-[#cbc3d7] text-[15px] leading-relaxed mb-8 flex-grow">{solution.description}</p>
                  <Link href="/solutions" className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e5e2e1] hover:gap-4 transition-all">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              );
            }) : (
              [1,2,3].map(i => <Skeleton key={i} className="h-80 bg-[#131313]" />)
            )}
          </div>
        </section>

        {/* FEATURED TESTIMONIAL */}
        <section className="py-32 px-6 md:px-16 bg-[#0a0a0a]">
          <div className="max-w-5xl mx-auto">
            <div className="editorial-line mb-20 opacity-40" />
            {featuredTestimonial ? (
              <div className="text-center">
                <blockquote className="text-[28px] md:text-[40px] lg:text-[52px] font-extralight leading-[1.15] tracking-tight text-[#e5e2e1] italic mb-12">
                  "{featuredTestimonial.message}"
                </blockquote>
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8B5CF6]">— {featuredTestimonial.clientName}</span>
                  <span className="text-[#cbc3d7] text-sm">{featuredTestimonial.role}, {featuredTestimonial.company}</span>
                </div>
              </div>
            ) : (
              <Skeleton className="h-48 bg-[#131313]" />
            )}
          </div>
        </section>

        {/* EVENTS & ARTICLES */}
        <section className="py-32 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-24">
            {/* Events */}
            <div className="lg:col-span-5">
              <div className="editorial-line mb-10" />
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-[28px] font-light tracking-tight text-[#e5e2e1] uppercase">Upcoming</h2>
                <Link href="/events" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] hover:text-[#8B5CF6] transition-colors flex items-center gap-1">
                  All events <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              {previewEvents ? (
                <div className="space-y-0 border-t border-[#262626]">
                  {previewEvents.map((event) => (
                    <div key={event.id} className="border-b border-[#262626] py-8 flex items-start gap-8">
                      <div className="w-14 shrink-0 text-center">
                        <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7]">{format(new Date(event.date), 'MMM')}</span>
                        <span className="block text-3xl font-thin text-[#8B5CF6] leading-none mt-1">{format(new Date(event.date), 'dd')}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#e5e2e1] mb-1">{event.title}</h3>
                        <div className="flex items-center gap-1 text-xs text-[#cbc3d7]">
                          <MapPin className="w-3 h-3" /> {event.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {[1,2].map(i => <Skeleton key={i} className="h-24 bg-[#131313]" />)}
                </div>
              )}
            </div>

            {/* Articles */}
            <div className="lg:col-span-7">
              <div className="editorial-line mb-10" />
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-[28px] font-light tracking-tight text-[#e5e2e1] uppercase">Latest Writing</h2>
                <Link href="/articles" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] hover:text-[#8B5CF6] transition-colors flex items-center gap-1">
                  All articles <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              {previewArticles ? (
                <div className="space-y-0 border-t border-[#262626]">
                  {previewArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.id}`}
                      className="group block border-b border-[#262626] py-8"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <div className="md:w-1/4 shrink-0">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B5CF6]">{article.category}</span>
                        </div>
                        <div className="md:w-3/4">
                          <h3 className="text-lg font-semibold text-[#e5e2e1] mb-2 group-hover:text-[#8B5CF6] transition-colors">{article.title}</h3>
                          <p className="text-[#cbc3d7] text-sm line-clamp-2">{article.summary}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#cbc3d7] shrink-0 group-hover:text-[#8B5CF6] transition-colors hidden md:block" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {[1,2].map(i => <Skeleton key={i} className="h-24 bg-[#131313]" />)}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-[#262626] py-20 px-6 md:px-16">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-1">
                <div className="font-bold text-[#e5e2e1] text-xl uppercase tracking-tight mb-6">AI-Solutions</div>
                <p className="text-[#cbc3d7] text-sm leading-relaxed">
                  Building the intelligence behind better work. Sunderland, UK.
                </p>
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
