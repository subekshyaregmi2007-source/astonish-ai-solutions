import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useListTestimonials } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useListTestimonials();

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      <Navbar />
      <PageTransition className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
            Client Success
          </h1>
          <p className="text-xl text-muted-foreground">
            Hear from leaders who have transformed their digital employee experience.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-[300px] rounded-2xl bg-muted/20" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
            {testimonials?.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-white/5 rounded-2xl p-8 hover:border-primary/30 transition-colors flex flex-col"
                data-testid={`card-testimonial-${testimonial.id}`}
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star 
                      key={starIndex} 
                      className={`w-5 h-5 ${starIndex < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/10 fill-white/10"}`} 
                    />
                  ))}
                </div>
                <p className="text-lg leading-relaxed mb-8 flex-grow">
                  "{testimonial.message}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    {testimonial.avatarUrl ? (
                      <img src={testimonial.avatarUrl} alt={testimonial.clientName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                        {testimonial.clientName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.clientName}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </PageTransition>
    </div>
  );
}
