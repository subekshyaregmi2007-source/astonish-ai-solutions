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
    <div className="min-h-screen bg-white text-[#111827] font-sans">
      <Navbar />
      <PageTransition>
        <div className="container mx-auto px-6 py-24 max-w-5xl">
          <div className="max-w-2xl mb-20">
            <h1 className="text-[48px] md:text-[64px] font-bold text-[#111827] tracking-tight mb-6 leading-tight">
              Global Events
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              Connect with us at industry summits, webinars, and product launches worldwide.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-8">
              <Skeleton className="h-48 rounded-xl bg-gray-100 w-full" />
              <Skeleton className="h-48 rounded-xl bg-gray-100 w-full" />
            </div>
          ) : (
            <div className="space-y-24">
              {upcomingEvents.length > 0 && (
                <section>
                  <h2 className="text-3xl font-bold mb-10 text-[#111827]">Upcoming Events</h2>
                  <div className="space-y-6">
                    {upcomingEvents.map((event, i) => (
                      <motion.div 
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="bg-white border border-[#E5E7EB] border-l-4 border-l-[#4F46E5] rounded-xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center"
                        data-testid={`card-event-${event.id}`}
                      >
                        <div className="w-24 h-24 shrink-0 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl flex flex-col items-center justify-center text-[#111827]">
                          <span className="text-xs font-bold uppercase text-[#6B7280]">{format(new Date(event.date), 'MMM')}</span>
                          <span className="text-3xl font-bold leading-none">{format(new Date(event.date), 'dd')}</span>
                        </div>
                        
                        <div className="flex-grow">
                          <div className="text-xs font-semibold text-[#4F46E5] bg-[#4F46E5]/10 px-2.5 py-1 rounded-md inline-block mb-3">
                            {event.type}
                          </div>
                          <h3 className="text-2xl font-bold text-[#111827] mb-2">{event.title}</h3>
                          <p className="text-[#6B7280] text-[15px] mb-4">{event.description}</p>
                          <div className="flex items-center gap-6 text-sm text-[#374151] font-medium">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-[#6B7280]" />
                              {event.location}
                            </div>
                          </div>
                        </div>

                        <div className="shrink-0 w-full md:w-auto">
                          <button className="w-full md:w-auto px-6 py-3 bg-[#111827] text-white font-medium rounded-lg hover:bg-[#1f2937] transition-colors">
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
                  <h2 className="text-3xl font-bold mb-10 text-[#111827]">Past Events</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pastEvents.map((event, i) => (
                      <motion.div 
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-sm"
                        data-testid={`card-event-past-${event.id}`}
                      >
                        <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">
                          {format(new Date(event.date), 'MMM yyyy')} • {event.location}
                        </div>
                        <h3 className="text-xl font-bold text-[#111827] mb-3">{event.title}</h3>
                        <p className="text-[#6B7280] text-sm line-clamp-2">{event.description}</p>
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