import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useListEvents } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { MapPin, Calendar } from "lucide-react";

export default function Events() {
  const { data: events, isLoading } = useListEvents();

  const upcomingEvents = events?.filter(e => e.isUpcoming) || [];
  const pastEvents = events?.filter(e => !e.isUpcoming) || [];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />
      <PageTransition className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
            Global Events
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect with us at industry summits, webinars, and product launches worldwide.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-12">
            <Skeleton className="h-[400px] rounded-2xl bg-muted/20 w-full" />
            <Skeleton className="h-[400px] rounded-2xl bg-muted/20 w-full" />
          </div>
        ) : (
          <div className="space-y-24">
            {upcomingEvents.length > 0 && (
              <section>
                <h2 className="text-3xl font-display font-bold mb-10 flex items-center gap-4">
                  Upcoming <span className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full">Register Now</span>
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {upcomingEvents.map(event => (
                    <motion.div 
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-card border border-primary/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,212,255,0.1)] group"
                      data-testid={`card-event-${event.id}`}
                    >
                      <div className="h-64 relative overflow-hidden">
                        {event.coverImageUrl ? (
                          <img src={event.coverImageUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-background" />
                        )}
                        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider">
                          {event.type}
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="text-3xl font-display font-bold mb-4">{event.title}</h3>
                        <p className="text-muted-foreground mb-8">{event.description}</p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-sm font-medium mb-8">
                          <div className="flex items-center gap-2 text-foreground/80">
                            <Calendar className="w-5 h-5 text-primary" />
                            {format(new Date(event.date), 'MMMM dd, yyyy')}
                          </div>
                          <div className="flex items-center gap-2 text-foreground/80">
                            <MapPin className="w-5 h-5 text-primary" />
                            {event.location}
                          </div>
                        </div>

                        <button className="w-full py-4 bg-primary text-background font-bold uppercase tracking-wider rounded hover:bg-primary/90 transition-colors">
                          Reserve Seat
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {pastEvents.length > 0 && (
              <section>
                <h2 className="text-3xl font-display font-bold mb-10">Past Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.map(event => (
                    <motion.div 
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="bg-card border border-white/5 rounded-2xl overflow-hidden"
                      data-testid={`card-event-past-${event.id}`}
                    >
                      <div className="h-48 relative">
                        {event.coverImageUrl ? (
                          <img src={event.coverImageUrl} alt={event.title} className="w-full h-full object-cover opacity-80" />
                        ) : (
                          <div className="w-full h-full bg-muted" />
                        )}
                      </div>
                      <div className="p-6">
                        <div className="text-xs text-primary font-bold uppercase tracking-wider mb-2">
                          {format(new Date(event.date), 'MMM yyyy')} • {event.location}
                        </div>
                        <h3 className="text-xl font-display font-bold mb-4">{event.title}</h3>
                        
                        {event.photos && event.photos.length > 0 && (
                          <div className="mt-6 flex items-center gap-2">
                            {event.photos.slice(0, 3).map((photo, i) => (
                              <div key={i} className="w-12 h-12 rounded-lg overflow-hidden border border-white/10">
                                <img src={photo} alt="Gallery thumb" className="w-full h-full object-cover" />
                              </div>
                            ))}
                            {event.photos.length > 3 && (
                              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-xs font-bold border border-white/10">
                                +{event.photos.length - 3}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </PageTransition>
    </div>
  );
}
