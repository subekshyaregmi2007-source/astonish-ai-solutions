import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useListSolutions } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import * as Icons from "lucide-react";

export default function Solutions() {
  const { data: solutions, isLoading } = useListSolutions();

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px]" />
      </div>
      <Navbar />
      <PageTransition className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
            Intelligent Solutions
          </h1>
          <p className="text-xl text-muted-foreground">
            Proactive digital employee experience software designed to anticipate and resolve issues before they impact your workforce.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] rounded-xl bg-muted/20" />
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
                  transition={{ delay: i * 0.1 }}
                  className="bg-card/50 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden hover:border-primary/30 transition-all group"
                  data-testid={`card-solution-${solution.id}`}
                >
                  <div className="h-48 bg-muted relative overflow-hidden">
                    {solution.imageUrl ? (
                      <img src={solution.imageUrl} alt={solution.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                    )}
                    <div className="absolute top-4 left-4 w-12 h-12 bg-background/80 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/10">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                      {solution.category}
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4">{solution.title}</h3>
                    <p className="text-muted-foreground mb-6 line-clamp-2">{solution.description}</p>
                    <ul className="space-y-3">
                      {solution.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <Icons.CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </PageTransition>
    </div>
  );
}
