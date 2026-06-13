import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListSolutions, useListTestimonials, useListEvents, useListArticles } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import * as Icons from "lucide-react";
import { Star, ArrowRight, Calendar, MapPin } from "lucide-react";
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
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <PageTransition>
        {/* HERO SECTION */}
        <div className="relative flex flex-col items-center justify-center min-h-[100vh] px-6 text-center pt-20">
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex justify-center items-center">
            <div className="absolute w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] opacity-60" />
            <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,transparent_0%,#050810_100%)]" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="z-10 max-w-5xl"
          >
            <div className="inline-block px-4 py-1.5 mb-8 border border-primary/30 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">
              Digital Employee Experience Reimagined
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-bold leading-[1.1] mb-8">
              The Future Arrives <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300">
                Today.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              AI-Solutions delivers proactive software that anticipates issues before they happen, empowered by our revolutionary virtual assistant.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/solutions"
                className="w-full sm:w-auto px-10 py-5 bg-primary text-background font-bold uppercase tracking-widest rounded shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:shadow-[0_0_50px_rgba(0,212,255,0.8)] hover:-translate-y-1 transition-all duration-300"
                data-testid="button-explore-solutions"
              >
                Explore Solutions
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-10 py-5 border border-primary/40 text-primary font-bold uppercase tracking-widest rounded hover:bg-primary/10 transition-all duration-300"
                data-testid="button-contact-hero"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>

        {/* STATS SECTION */}
        <section className="relative z-10 border-y border-white/5 bg-black/40 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
              <div>
                <div className="text-5xl font-display font-bold text-primary mb-2">99%</div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground">Uptime</div>
              </div>
              <div>
                <div className="text-5xl font-display font-bold text-primary mb-2">50+</div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground">Global Partners</div>
              </div>
              <div>
                <div className="text-5xl font-display font-bold text-primary mb-2">24/7</div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground">AI Support</div>
              </div>
              <div>
                <div className="text-5xl font-display font-bold text-primary mb-2">0</div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground">Compromises</div>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTIONS PREVIEW */}
        <section className="relative z-10 py-32 container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Intelligent Core</h2>
              <p className="text-xl text-muted-foreground">Purpose-built modules forming the ultimate digital employee experience platform.</p>
            </div>
            <Link href="/solutions" className="inline-flex items-center gap-2 text-primary uppercase font-bold tracking-widest hover:text-cyan-300 transition-colors" data-testid="link-all-solutions">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {solutionsLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[1,2,3].map(i => <Skeleton key={i} className="h-64 rounded-xl bg-muted/20" />)}
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {previewSolutions?.map((solution, i) => {
                const Icon = (Icons as any)[solution.icon] || Icons.Box;
                return (
                  <motion.div 
                    key={solution.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="bg-card/30 border border-white/5 hover:border-primary/30 p-8 rounded-2xl transition-all hover:-translate-y-2 group"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-3">{solution.title}</h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3">{solution.description}</p>
                    <Link href="/solutions" className="text-primary font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </section>

        {/* TESTIMONIALS PREVIEW */}
        <section className="relative z-10 py-32 bg-card/20 border-y border-white/5">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Global Impact</h2>
            
            {testimonialsLoading ? (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[1,2,3].map(i => <Skeleton key={i} className="h-48 rounded-xl bg-muted/20" />)}
               </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {previewTestimonials?.map((testimonial, i) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-background border border-white/5 rounded-2xl p-8 flex flex-col"
                  >
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(5)].map((_, starIndex) => (
                        <Star 
                          key={starIndex} 
                          className={`w-4 h-4 ${starIndex < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/10 fill-white/10"}`} 
                        />
                      ))}
                    </div>
                    <p className="text-lg mb-8 flex-grow">"{testimonial.message}"</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="font-bold">{testimonial.clientName}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            <div className="text-center mt-12">
              <Link href="/testimonials" className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest hover:text-cyan-300">
                Read All Stories <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* EVENTS & ARTICLES COMPOSITE */}
        <section className="relative z-10 py-32 container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* EVENTS */}
            <div>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-display font-bold">Upcoming Events</h2>
                <Link href="/events" className="text-primary font-bold uppercase tracking-wider text-sm">View All</Link>
              </div>
              
              {eventsLoading ? (
                <div className="space-y-6">
                  {[1,2].map(i => <Skeleton key={i} className="h-32 rounded-xl bg-muted/20" />)}
                </div>
              ) : (
                <div className="space-y-6">
                  {previewEvents?.map((event) => (
                    <div key={event.id} className="group bg-card/30 border border-white/5 rounded-2xl p-6 flex items-start gap-6 hover:border-primary/30 transition-colors">
                      <div className="w-20 h-20 shrink-0 bg-primary/10 rounded-xl flex flex-col items-center justify-center text-primary border border-primary/20">
                        <span className="text-xs font-bold uppercase">{format(new Date(event.date), 'MMM')}</span>
                        <span className="text-2xl font-display font-bold leading-none">{format(new Date(event.date), 'dd')}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
                          <span className="uppercase text-xs font-bold text-primary">{event.type}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ARTICLES */}
            <div>
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-display font-bold">Latest Intelligence</h2>
                <Link href="/articles" className="text-primary font-bold uppercase tracking-wider text-sm">View All</Link>
              </div>

              {articlesLoading ? (
                <div className="space-y-6">
                  {[1,2].map(i => <Skeleton key={i} className="h-32 rounded-xl bg-muted/20" />)}
                </div>
              ) : (
                <div className="space-y-6">
                  {previewArticles?.map((article) => (
                    <Link key={article.id} href={`/articles/${article.id}`} className="block group bg-card/30 border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-colors">
                      <div className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                        {article.category} • {format(new Date(article.publishedAt), 'MMM dd')}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{article.summary}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA FOOTER */}
        <footer className="relative z-10 py-24 bg-primary text-background text-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">Ready for the Future?</h2>
            <p className="text-2xl opacity-80 mb-12 max-w-2xl mx-auto">
              Join the companies already revolutionizing their digital employee experience.
            </p>
            <Link 
              href="/contact"
              className="inline-block px-12 py-6 bg-background text-primary font-bold uppercase tracking-widest text-lg rounded shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all duration-300"
            >
              Contact Us Today
            </Link>
          </div>
        </footer>
      </PageTransition>
    </div>
  );
}
