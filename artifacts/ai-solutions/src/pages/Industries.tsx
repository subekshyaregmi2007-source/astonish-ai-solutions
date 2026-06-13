import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useListIndustries } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export default function Industries() {
  const { data: industries, isLoading } = useListIndustries();

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
      </div>
      <Navbar />
      <PageTransition className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
            Transformed Industries
          </h1>
          <p className="text-xl text-muted-foreground">
            See how AI-Solutions is revolutionizing the digital employee experience across global sectors.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-12">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[400px] rounded-2xl bg-muted/20 w-full" />
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {industries?.map((industry, i) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-card/30 rounded-3xl border border-white/5 p-6 md:p-12"
                data-testid={`card-industry-${industry.id}`}
              >
                <div className={`order-2 ${i % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="text-sm font-bold uppercase tracking-wider text-primary mb-4 flex items-center gap-4">
                    {industry.sector}
                    <span className="w-12 h-[1px] bg-primary/50"></span>
                    <span className="text-muted-foreground">{industry.year}</span>
                  </div>
                  <h2 className="text-4xl font-display font-bold mb-6">{industry.name}</h2>
                  <p className="text-lg text-muted-foreground mb-8">{industry.description}</p>
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                    <h4 className="text-sm font-bold uppercase text-foreground mb-2">The Outcome</h4>
                    <p className="text-primary font-medium">{industry.outcome}</p>
                  </div>
                </div>
                
                <div className={`order-1 ${i % 2 === 0 ? "lg:order-2" : "lg:order-1"} relative h-[400px] rounded-2xl overflow-hidden`}>
                  {industry.imageUrl ? (
                    <img src={industry.imageUrl} alt={industry.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-muted to-background flex items-center justify-center border border-white/5">
                      <span className="text-muted-foreground font-display text-2xl opacity-50">{industry.name}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  {industry.logoUrl && (
                    <div className="absolute bottom-6 left-6 bg-background/80 backdrop-blur-md p-4 rounded-xl border border-white/10">
                      <img src={industry.logoUrl} alt="Logo" className="h-8 object-contain" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </PageTransition>
    </div>
  );
}
