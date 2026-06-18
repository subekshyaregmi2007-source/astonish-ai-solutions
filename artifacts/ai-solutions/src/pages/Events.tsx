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
    <div className="min-h-screen bg-[#F4FBF6] text-[#1A3326]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <PageTransition>
        <div className="pt-24 md:pt-28 pb-16 md:pb-24 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="editorial-line mb-8" />
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#2E8B57] mb-4">Global Events</p>
            <h1 className="text-[40px] md:text-[60px] font-extralight tracking-[-0.03em] text-[#1A3326] leading-none mb-5">
              Global Events
            </h1>
            <p className="text-[#3D6B52] text-base max-w-xl leading-relaxed">
              Connect with us at industry summits, webinars, and product launches worldwide.
            </p>
          </div>

          {isLoading ? (
            <div className="border-t border-[#AECFBE]">
              {[1,2,3].map(i => <div key={i} className="border-b border-[#AECFBE] py-10"><Skeleton className="h-24 bg-[#D8EDE0]" /></div>)}
            </div>
          ) : (
            <div className="space-y-16">
              {upcomingEvents.length > 0 && (
                <section>
                  <div className="flex items-center gap-5 mb-8">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#1A3326] whitespace-nowrap">Upcoming Events</span>
                    <div className="flex-grow editorial-line" />
                  </div>
                  <div className="border-t border-[#AECFBE]">
                    {upcomingEvents.map((event, i) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="border-b border-[#AECFBE] py-0 overflow-hidden group hover:bg-[#EAF5EE] transition-colors"
                        data-testid={`card-event-${event.id}`}
                      >
                        {event.coverImageUrl && (
                          <div className="h-[200px] overflow-hidden relative">
                            <img
                              src={event.coverImageUrl}
                              alt={event.title}
                              className="w-full h-full object-cover opacity-40 grayscale group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F4FBF6]" />
                            <div className="absolute bottom-4 left-6">
                              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2E8B57] border border-[#2E8B57]/40 bg-[#F4FBF6]/60 px-2.5 py-1 w-fit backdrop-blur-sm">
                                {event.type}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 px-0">
                          <div className="md:col-span-1 shrink-0">
                            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52]">{format(new Date(event.date), "MMM")}</span>
                            <span className="block text-3xl font-thin text-[#2E8B57] leading-none mt-0.5">{format(new Date(event.date), "dd")}</span>
                          </div>
                          <div className="md:col-span-8 flex flex-col gap-3">
                            {!event.coverImageUrl && (
                              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2E8B57] border border-[#2E8B57]/30 px-2.5 py-1 w-fit">
                                {event.type}
                              </div>
                            )}
                            <h3 className="text-xl font-semibold text-[#1A3326]">{event.title}</h3>
                            <p className="text-[#3D6B52] text-sm leading-relaxed">{event.description}</p>
                            <div className="flex items-center gap-1.5 text-sm text-[#3D6B52]">
                              <MapPin className="w-3.5 h-3.5" /> {event.location}
                            </div>
                          </div>
                          <div className="md:col-span-3 flex items-start md:justify-end">
                            <button className="px-7 py-3 border border-[#2E8B57] text-[#2E8B57] text-[11px] font-semibold uppercase tracking-[0.2em] hover:bg-[#2E8B57] hover:text-white transition-colors">
                              Register
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {pastEvents.length > 0 && (
                <section>
                  <div className="flex items-center gap-5 mb-8">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#3D6B52] whitespace-nowrap">Past Events</span>
                    <div className="flex-grow editorial-line" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-[#AECFBE]">
                    {pastEvents.map((event, i) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-30px" }}
                        transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="group border-r border-b border-[#AECFBE] overflow-hidden hover:bg-[#EAF5EE] transition-colors"
                        data-testid={`card-event-past-${event.id}`}
                      >
                        {event.coverImageUrl && (
                          <div className="h-[150px] overflow-hidden relative">
                            <img
                              src={event.coverImageUrl}
                              alt={event.title}
                              className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-75 group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#EAF5EE]" />
                          </div>
                        )}
                        <div className="p-7">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] mb-3">
                            {format(new Date(event.date), "MMM yyyy")} · {event.location}
                          </div>
                          <h3 className="text-base font-semibold text-[#1A3326] mb-2.5">{event.title}</h3>
                          <p className="text-[#3D6B52] text-sm line-clamp-3 leading-relaxed">{event.description}</p>
                        </div>
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
