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
        <div className="pt-24 md:pt-28 pb-16 md:pb-24 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="editorial-line mb-8" />
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#6ee7b7] mb-4">Sectors</p>
            <h1 className="text-[40px] md:text-[60px] font-extralight tracking-[-0.03em] text-[#e5e2e1] leading-none mb-5">
              Industries We Serve
            </h1>
            <p className="text-[#a8c4b0] text-base max-w-xl leading-relaxed">
              See how AI-Solutions is revolutionizing the digital employee experience across global sectors.
            </p>
          </div>

          {isLoading ? (
            <div className="border-t border-[#262626]">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border-b border-[#262626] py-12 flex gap-10">
                  <Skeleton className="h-6 w-8 bg-[#131313] shrink-0" />
                  <div className="flex-grow">
                    <Skeleton className="h-5 w-48 bg-[#131313] mb-3" />
                    <Skeleton className="h-20 bg-[#131313]" />
                  </div>
                  <Skeleton className="hidden md:block h-[140px] w-[220px] bg-[#131313] shrink-0" />
                </div>
              ))}
            </div>
          ) : (
            <div className="border-t border-[#262626]">
              {industries?.map((industry, i) => (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-[#262626] py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 group hover:bg-[#0a0a0a] transition-colors"
                  data-testid={`card-industry-${industry.id}`}
                >
                  <div className="md:col-span-1 flex items-start pt-1">
                    <span className="text-4xl font-thin text-[#262626] group-hover:text-[#6ee7b7] transition-colors duration-700 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="md:col-span-3">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#6ee7b7] border border-[#6ee7b7]/30 px-2.5 py-1">
                        {industry.sector}
                      </span>
                      <span className="text-[10px] text-[#a8c4b0] uppercase tracking-wider">{industry.year}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-[#e5e2e1]">{industry.name}</h2>
                  </div>
                  <div className="md:col-span-5 flex flex-col gap-6">
                    <p className="text-[16px] text-[#a8c4b0] leading-relaxed">{industry.description}</p>
                    <div className="border-t border-[#262626] pt-5">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a8c4b0] mb-1.5">The Outcome</div>
                      <div className="text-[#e5e2e1] font-medium">{industry.outcome}</div>
                    </div>
                  </div>
                  {industry.imageUrl && (
                    <div className="md:col-span-3 overflow-hidden shrink-0 self-start">
                      <div className="h-[180px] overflow-hidden relative">
                        <img
                          src={industry.imageUrl}
                          alt={industry.name}
                          className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-75 group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 border border-[#262626]" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </div>
  );
}
