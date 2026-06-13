import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useListSolutions } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import * as Icons from "lucide-react";

export default function Solutions() {
  const { data: solutions, isLoading } = useListSolutions();

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans">
      <Navbar />
      <PageTransition>
        <div className="container mx-auto px-6 py-24 max-w-6xl">
          <div className="max-w-2xl mb-20">
            <h1 className="text-[48px] md:text-[64px] font-bold text-[#111827] tracking-tight mb-6 leading-tight">
              Software Solutions
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              Proactive digital employee experience software designed to anticipate and resolve issues before they impact your workforce.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-80 rounded-xl bg-gray-100" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions?.map((solution, i) => {
                const Icon = (Icons as any)[solution.icon] || Icons.Box;
                
                return (
                  <motion.div
                    key={solution.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-sm hover:shadow-md hover:border-[#D1D5DB] transition-all"
                    data-testid={`card-solution-${solution.id}`}
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <Icon className="w-8 h-8 text-[#4F46E5]" />
                      <span className="text-xs font-medium text-[#4F46E5] bg-[#4F46E5]/10 px-2.5 py-1 rounded-md">
                        {solution.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#111827] mb-3">{solution.title}</h3>
                    <p className="text-[#6B7280] text-[15px] mb-8 leading-relaxed">
                      {solution.description}
                    </p>
                    
                    <ul className="space-y-3">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#374151]">
                          <Icons.Check className="w-4 h-4 text-[#4F46E5] shrink-0 mt-0.5" />
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