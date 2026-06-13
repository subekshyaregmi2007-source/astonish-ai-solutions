import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useListIndustries } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Industries() {
  const { data: industries, isLoading } = useListIndustries();

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <PageTransition>
        <div className="pt-36 pb-32 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="editorial-line mb-12" />
          <div className="mb-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8B5CF6] mb-6">Sectors</p>
            <h1 className="text-[48px] md:text-[72px] font-extralight tracking-[-0.03em] text-[#e5e2e1] leading-none mb-8">
              Industries We Serve
            </h1>
            <p className="text-[#cbc3d7] text-lg max-w-2xl leading-relaxed">
              See how AI-Solutions is revolutionizing the digital employee experience across global sectors.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-0 border-t border-[#262626]">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-48 bg-[#131313] border-b border-[#262626] w-full" />
              ))}
            </div>
          ) : (
            <div className="border-t border-[#262626]">
              {industries?.map((industry, i) => (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="border-b border-[#262626] py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 group hover:bg-[#0a0a0a] transition-colors px-2"
                  data-testid={`card-industry-${industry.id}`}
                >
                  <div className="md:col-span-1 flex items-start">
                    <span className="text-5xl font-thin text-[#262626] group-hover:text-[#8B5CF6] transition-colors duration-700 leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="md:col-span-3">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B5CF6] border border-[#8B5CF6]/30 px-3 py-1">
                        {industry.sector}
                      </span>
                      <span className="text-[10px] text-[#cbc3d7] uppercase tracking-wider">{industry.year}</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-[#e5e2e1]">{industry.name}</h2>
                  </div>

                  <div className="md:col-span-8 flex flex-col gap-8">
                    <p className="text-[17px] text-[#cbc3d7] leading-relaxed">{industry.description}</p>
                    <div className="border-t border-[#262626] pt-6">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] mb-2">The Outcome</div>
                      <div className="text-[#e5e2e1] font-medium text-lg">{industry.outcome}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </div>
  );
}
