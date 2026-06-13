import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useListEvents } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { MapPin } from "lucide-react";

export default function Events() {
  const { data: events, isLoading } = useListEvents();

  const upcomingEvents = events?.filter(e => e.isUpcoming) || [];
  const pastEvents = events?.filter(e => !e.isUpcoming) || [];

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <PageTransition>
        <div className="pt-36 pb-32 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="editorial-line mb-12" />
          <div className="mb-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8B5CF6] mb-6">Global Events</p>
            <h1 className="text-[48px] md:text-[72px] font-extralight tracking-[-0.03em] text-[#e5e2e1] leading-none mb-8">
              Global Events
            </h1>
            <p className="text-[#cbc3d7] text-lg max-w-2xl leading-relaxed">
              Connect with us at industry summits, webinars, and product launches worldwide.
            </p>
          </div>

          {isLoading ? (
            <div className="border-t border-[#262626] space-y-0">
              {[1,2,3].map(i => <Skeleton key={i} className="h-32 bg-[#131313] border-b border-[#262626] w-full" />)}
            </div>
          ) : (
            <div className="space-y-24">
              {upcomingEvents.length > 0 && (
                <section>
                  <div className="flex items-center gap-6 mb-12">
                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e5e2e1]">Upcoming Events</h2>
                    <div className="flex-grow editorial-line" />
                  </div>
                  <div className="border-t border-[#262626]">
                    {upcomingEvents.map((event, i) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        className="border-b border-[#262626] py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 group hover:bg-[#0a0a0a] transition-colors"
                        data-testid={`card-event-${event.id}`}
                      >
                        <div className="md:col-span-1 shrink-0 text-center md:text-left">
                          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7]">{format(new Date(event.date), 'MMM')}</span>
                          <span className="block text-4xl font-thin text-[#8B5CF6] leading-none mt-1">{format(new Date(event.date), 'dd')}</span>
                        </div>

                        <div className="md:col-span-8 flex flex-col gap-4">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B5CF6] border border-[#8B5CF6]/30 px-3 py-1 w-fit">
                            {event.type}
                          </div>
                          <h3 className="text-2xl font-semibold text-[#e5e2e1]">{event.title}</h3>
                          <p className="text-[#cbc3d7] text-[15px] leading-relaxed">{event.description}</p>
                          <div className="flex items-center gap-1.5 text-sm text-[#cbc3d7]">
                            <MapPin className="w-3.5 h-3.5" /> {event.location}
                          </div>
                        </div>

                        <div className="md:col-span-3 flex items-start md:justify-end">
                          <button className="px-8 py-3 border border-[#8B5CF6] text-[#8B5CF6] text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#8B5CF6] hover:text-white transition-colors">
                            Register
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {pastEvents.length > 0 && (
                <section>
                  <div className="flex items-center gap-6 mb-12">
                    <h2 className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#cbc3d7]">Past Events</h2>
                    <div className="flex-grow editorial-line" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-[#262626]">
                    {pastEvents.map((event, i) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.5 }}
                        className="border-r border-b border-[#262626] p-8 hover:bg-[#0a0a0a] transition-colors"
                        data-testid={`card-event-past-${event.id}`}
                      >
                        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] mb-4">
                          {format(new Date(event.date), 'MMM yyyy')} · {event.location}
                        </div>
                        <h3 className="text-lg font-semibold text-[#e5e2e1] mb-3">{event.title}</h3>
                        <p className="text-[#cbc3d7] text-sm line-clamp-2 leading-relaxed">{event.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </PageTransition>
    </div>
  );
}
