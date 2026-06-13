import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useListSolutions } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import * as Icons from "lucide-react";

export default function Solutions() {
  const { data: solutions, isLoading } = useListSolutions();

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <PageTransition>
        <div className="pt-36 pb-32 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="editorial-line mb-12" />
          <div className="mb-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8B5CF6] mb-6">Software Solutions</p>
            <h1 className="text-[48px] md:text-[72px] font-extralight tracking-[-0.03em] text-[#e5e2e1] leading-none mb-8">
              Software Solutions
            </h1>
            <p className="text-[#cbc3d7] text-lg max-w-2xl leading-relaxed">
              Proactive digital employee experience software designed to anticipate and resolve issues before they impact your workforce.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-[#262626]">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-80 bg-[#131313] border-r border-b border-[#262626]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-[#262626]">
              {solutions?.map((solution, i) => {
                const Icon = (Icons as any)[solution.icon] || Icons.Box;
                return (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="group border-r border-b border-[#262626] p-10 flex flex-col hover:bg-[#0d0d0d] transition-colors"
                    data-testid={`card-solution-${solution.id}`}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[80px] font-thin text-[#262626] leading-none group-hover:text-[#8B5CF6] transition-colors duration-700">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B5CF6] border border-[#8B5CF6]/30 px-3 py-1">
                        {solution.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-[#e5e2e1] mb-4">{solution.title}</h3>
                    <p className="text-[#cbc3d7] text-[15px] mb-8 leading-relaxed flex-grow">{solution.description}</p>

                    <ul className="space-y-3 border-t border-[#262626] pt-6">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#cbc3d7]">
                          <span className="text-[#8B5CF6] mt-0.5 text-xs">—</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </PageTransition>
    </div>
  );
}
