import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListSolutions, useListTestimonials, useListEvents, useListArticles } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import * as Icons from "lucide-react";
import { Star, ArrowRight, MapPin } from "lucide-react";
import { format } from "date-fns";

export default function Home() {
  const { data: solutions, isLoading: solutionsLoading } = useListSolutions();
  const { data: testimonials, isLoading: testimonialsLoading } = useListTestimonials();
  const { data: events, isLoading: eventsLoading } = useListEvents();
  const { data: articles, isLoading: articlesLoading } = useListArticles();

  const previewSolutions = solutions?.slice(0, 3);
  const previewTestimonials = testimonials?.slice(0, 3);
  const previewEvents = events?.filter(e => e.isUpcoming).slice(0, 2);
  const previewArticles = articles?.slice(0, 2);

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans">
      <Navbar />
      <PageTransition>
        {/* HERO SECTION */}
        <section className="relative bg-white pt-24 pb-32 px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-[64px] md:text-[80px] font-bold leading-[1.05] text-[#111827] tracking-tight mb-8">
                The Intelligence Behind Better Work.
              </h1>
              <p className="text-lg md:text-xl text-[#6B7280] mb-12 max-w-2xl leading-relaxed">
                We deliver proactive software that anticipates issues before they happen, empowering your team with a considered digital employee experience.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/solutions"
                  className="w-full sm:w-auto px-6 py-3 bg-[#111827] text-white font-medium rounded-lg hover:bg-[#1f2937] transition-colors text-center"
                  data-testid="button-explore-solutions"
                >
                  Explore Solutions
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3 border border-[#E5E7EB] bg-white text-[#374151] font-medium rounded-lg hover:bg-gray-50 transition-colors text-center"
                  data-testid="button-contact-hero"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="bg-[#F9FAFB] py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              <div className="flex flex-col gap-2">
                <span className="text-[48px] font-bold text-[#111827] leading-none">99.9%</span>
                <span className="text-sm font-medium text-[#6B7280]">System Uptime</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[48px] font-bold text-[#111827] leading-none">50+</span>
                <span className="text-sm font-medium text-[#6B7280]">Enterprise Partners</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[48px] font-bold text-[#111827] leading-none">24/7</span>
                <span className="text-sm font-medium text-[#6B7280]">Proactive Support</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[48px] font-bold text-[#111827] leading-none">10x</span>
                <span className="text-sm font-medium text-[#6B7280]">Faster Resolution</span>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTIONS PREVIEW */}
        <section className="bg-white py-32">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <h2 className="text-[40px] md:text-[48px] font-bold text-[#111827] tracking-tight">Our Solutions</h2>
              <Link href="/solutions" className="inline-flex items-center gap-2 text-[#4F46E5] font-medium hover:text-[#4338CA] transition-colors">
                View all solutions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {solutionsLoading ? (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[1,2,3].map(i => <Skeleton key={i} className="h-64 rounded-xl bg-gray-100" />)}
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {previewSolutions?.map((solution, i) => {
                  const Icon = (Icons as any)[solution.icon] || Icons.Box;
                  return (
                    <motion.div 
                      key={solution.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="bg-white border border-[#E5E7EB] p-8 rounded-xl shadow-sm hover:shadow-md hover:border-[#D1D5DB] transition-all"
                    >
                      <div className="mb-6">
                        <Icon className="w-8 h-8 text-[#4F46E5]" />
                      </div>
                      <h3 className="text-xl font-bold text-[#111827] mb-3">{solution.title}</h3>
                      <p className="text-[#6B7280] text-[15px] mb-6 leading-relaxed line-clamp-3">{solution.description}</p>
                      <Link href="/solutions" className="text-[#4F46E5] font-medium text-sm flex items-center gap-1.5 hover:text-[#4338CA]">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* TESTIMONIALS PREVIEW */}
        <section className="bg-[#F9FAFB] py-32">
          <div className="container mx-auto px-6 max-w-6xl">
            <h2 className="text-[40px] md:text-[48px] font-bold text-[#111827] tracking-tight mb-16">Trusted by leaders</h2>
            
            {testimonialsLoading ? (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[1,2,3].map(i => <Skeleton key={i} className="h-48 rounded-xl bg-gray-200" />)}
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {previewTestimonials?.map((testimonial, i) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-sm flex flex-col"
                  >
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star 
                          key={starIndex} 
                          className={`w-4 h-4 ${starIndex < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-[#374151] text-[15px] leading-relaxed mb-8 flex-grow">"{testimonial.message}"</p>
                    <div className="mt-auto">
                      <div className="font-semibold text-[#111827] text-sm">{testimonial.clientName}</div>
                      <div className="text-xs text-[#6B7280]">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* EVENTS & ARTICLES COMPOSITE */}
        <section className="bg-white py-32">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* EVENTS */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-[#111827]">Upcoming Events</h2>
                  <Link href="/events" className="text-[#4F46E5] font-medium text-sm hover:text-[#4338CA]">View All</Link>
                </div>
                
                {eventsLoading ? (
                  <div className="space-y-4">
                    {[1,2].map(i => <Skeleton key={i} className="h-24 rounded-xl bg-gray-100" />)}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {previewEvents?.map((event) => (
                      <div key={event.id} className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex items-center gap-6 shadow-sm hover:shadow-md transition-all">
                        <div className="w-16 h-16 shrink-0 bg-[#4F46E5] rounded-lg flex flex-col items-center justify-center text-white">
                          <span className="text-[10px] font-bold uppercase">{format(new Date(event.date), 'MMM')}</span>
                          <span className="text-xl font-bold leading-none">{format(new Date(event.date), 'dd')}</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[#111827] mb-1">{event.title}</h3>
                          <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ARTICLES */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-[#111827]">Latest Writing</h2>
                  <Link href="/articles" className="text-[#4F46E5] font-medium text-sm hover:text-[#4338CA]">View All</Link>
                </div>

                {articlesLoading ? (
                  <div className="space-y-4">
                    {[1,2].map(i => <Skeleton key={i} className="h-24 rounded-xl bg-gray-100" />)}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {previewArticles?.map((article) => (
                      <Link key={article.id} href={`/articles/${article.id}`} className="block bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                        <h3 className="text-lg font-bold text-[#111827] mb-2">{article.title}</h3>
                        <p className="text-[#6B7280] text-sm line-clamp-2">{article.summary}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#111827] text-white py-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-4 h-4 bg-[#4F46E5] rounded-sm"></div>
                  <span className="font-bold text-white text-lg">AI-Solutions</span>
                </div>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">
                  Building the intelligence behind better work.
                </p>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-6">Solutions</h4>
                <ul className="space-y-4">
                  <li><Link href="/solutions" className="text-[#9CA3AF] hover:text-white text-sm transition-colors">Platform</Link></li>
                  <li><Link href="/industries" className="text-[#9CA3AF] hover:text-white text-sm transition-colors">Industries</Link></li>
                  <li><Link href="/testimonials" className="text-[#9CA3AF] hover:text-white text-sm transition-colors">Case Studies</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-6">Company</h4>
                <ul className="space-y-4">
                  <li><Link href="/articles" className="text-[#9CA3AF] hover:text-white text-sm transition-colors">Blog</Link></li>
                  <li><Link href="/events" className="text-[#9CA3AF] hover:text-white text-sm transition-colors">Events</Link></li>
                  <li><Link href="/contact" className="text-[#9CA3AF] hover:text-white text-sm transition-colors">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-6">Contact</h4>
                <ul className="space-y-4 text-[#9CA3AF] text-sm">
                  <li>Sunderland, UK</li>
                  <li>hello@ai-solutions.com</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-[#374151] text-sm text-[#9CA3AF] flex flex-col md:flex-row justify-between items-center gap-4">
              <div>© {new Date().getFullYear()} AI-Solutions. All rights reserved.</div>
            </div>
          </div>
        </footer>
      </PageTransition>
    </div>
  );
}