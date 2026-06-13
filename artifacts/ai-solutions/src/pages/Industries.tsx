import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useListIndustries } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Industries() {
  const { data: industries, isLoading } = useListIndustries();

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans">
      <Navbar />
      <PageTransition>
        <div className="container mx-auto px-6 py-24 max-w-5xl">
          <div className="max-w-2xl mb-20">
            <h1 className="text-[48px] md:text-[64px] font-bold text-[#111827] tracking-tight mb-6 leading-tight">
              Industries We Serve
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              See how AI-Solutions is revolutionizing the digital employee experience across global sectors.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-8">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-xl bg-gray-100 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-8">
              {industries?.map((industry, i) => (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-shadow"
                  data-testid={`card-industry-${industry.id}`}
                >
                  <div className="w-full md:w-1/3 shrink-0">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <span className="text-sm font-medium text-[#4F46E5] bg-[#4F46E5]/10 px-2.5 py-1 rounded-md">
                        {industry.sector}
                      </span>
                      <span className="text-sm text-[#6B7280] font-medium">{industry.year}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#111827]">{industry.name}</h2>
                  </div>
                  
                  <div className="w-full md:w-2/3 flex flex-col gap-6">
                    <p className="text-[17px] text-[#374151] leading-relaxed">
                      {industry.description}
                    </p>
                    <div className="pt-6 border-t border-[#F3F4F6]">
                      <div className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-2">The Outcome</div>
                      <div className="text-[#111827] font-medium text-lg">{industry.outcome}</div>
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