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
        <div className="pt-24 md:pt-28 pb-16 md:pb-24 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="editorial-line mb-8" />
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8B5CF6] mb-4">Software Solutions</p>
            <h1 className="text-[40px] md:text-[60px] font-extralight tracking-[-0.03em] text-[#e5e2e1] leading-none mb-5">
              Software Solutions
            </h1>
            <p className="text-[#cbc3d7] text-base max-w-xl leading-relaxed">
              Proactive digital employee experience software designed to anticipate and resolve issues before they impact your workforce.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-[#262626]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-r border-b border-[#262626]">
                  <Skeleton className="h-[160px] w-full bg-[#131313]" />
                  <div className="p-8">
                    <Skeleton className="h-5 w-3/4 bg-[#131313] mb-3" />
                    <Skeleton className="h-24 bg-[#131313]" />
                  </div>
                </div>
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
                    transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="group border-r border-b border-[#262626] flex flex-col hover:bg-[#0d0d0d] transition-colors overflow-hidden"
                    data-testid={`card-solution-${solution.id}`}
                  >
                    {solution.imageUrl && (
                      <div className="h-[160px] overflow-hidden shrink-0 relative">
                        <img
                          src={solution.imageUrl}
                          alt={solution.title}
                          className="w-full h-full object-cover opacity-50 grayscale group-hover:opacity-70 group-hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0d0d0d]" />
                      </div>
                    )}
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[60px] font-thin text-[#262626] leading-none group-hover:text-[#8B5CF6] transition-colors duration-700">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8B5CF6] border border-[#8B5CF6]/30 px-2.5 py-1 leading-none">
                          {solution.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#e5e2e1] mb-3">{solution.title}</h3>
                      <p className="text-[#cbc3d7] text-sm mb-6 leading-relaxed flex-grow">{solution.description}</p>
                      <ul className="space-y-2.5 border-t border-[#262626] pt-5">
                        {solution.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-sm text-[#cbc3d7]">
                            <span className="text-[#8B5CF6] shrink-0 text-xs mt-0.5">—</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
