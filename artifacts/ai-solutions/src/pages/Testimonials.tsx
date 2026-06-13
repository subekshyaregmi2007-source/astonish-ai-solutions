import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useListTestimonials } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useListTestimonials();

  const featured = testimonials?.[0];
  const rest = testimonials?.slice(1);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <PageTransition>
        <div className="pt-24 md:pt-28 pb-16 md:pb-24 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="editorial-line mb-8" />
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8B5CF6] mb-4">Client Stories</p>
            <h1 className="text-[40px] md:text-[60px] font-extralight tracking-[-0.03em] text-[#e5e2e1] leading-none">
              Trusted by Leaders
            </h1>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-40 bg-[#131313]" />)}
            </div>
          ) : (
            <>
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#0a0a0a] border border-[#262626] p-10 md:p-14 mb-4"
                  data-testid={`card-testimonial-${featured.id}`}
                >
                  <blockquote className="text-[20px] md:text-[28px] lg:text-[34px] font-extralight leading-[1.25] tracking-tight text-[#e5e2e1] italic mb-8">
                    "{featured.message}"
                  </blockquote>
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8B5CF6]">— {featured.clientName}</span>
                    <span className="text-[#cbc3d7] text-sm">{featured.role}, {featured.company}</span>
                  </div>
                </motion.div>
              )}

              <div className="border-t border-[#262626]">
                {rest?.map((testimonial, i) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-[#262626] py-8 grid grid-cols-1 md:grid-cols-12 gap-5 hover:bg-[#0a0a0a] transition-colors"
                    data-testid={`card-testimonial-${testimonial.id}`}
                  >
                    <div className="md:col-span-3">
                      <div className="font-semibold text-[#e5e2e1] text-sm mb-1">{testimonial.clientName}</div>
                      <div className="text-[11px] text-[#8B5CF6] uppercase tracking-[0.15em]">{testimonial.company}</div>
                      <div className="text-xs text-[#cbc3d7] mt-0.5">{testimonial.role}</div>
                    </div>
                    <div className="md:col-span-9">
                      <p className="text-[#cbc3d7] text-[15px] leading-relaxed italic">"{testimonial.message}"</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </PageTransition>
    </div>
  );
}
