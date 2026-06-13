import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useListTestimonials } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useListTestimonials();

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans">
      <Navbar />
      <PageTransition>
        <div className="container mx-auto px-6 py-24 max-w-6xl">
          <div className="max-w-2xl mb-20">
            <h1 className="text-[48px] md:text-[64px] font-bold text-[#111827] tracking-tight mb-6 leading-tight">
              Client Stories
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              Hear from leaders who have transformed their digital employee experience with AI-Solutions.
            </p>
          </div>

          {isLoading ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-xl bg-gray-100 break-inside-avoid" />
              ))}
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
              {testimonials?.map((testimonial, i) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow break-inside-avoid"
                  data-testid={`card-testimonial-${testimonial.id}`}
                >
                  <Quote className="w-8 h-8 text-[#4F46E5] mb-6 opacity-80" />
                  
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star 
                        key={starIndex} 
                        className={`w-4 h-4 ${starIndex < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-[16px] text-[#374151] leading-relaxed mb-8">
                    "{testimonial.message}"
                  </p>
                  
                  <div>
                    <div className="font-semibold text-[#111827]">{testimonial.clientName}</div>
                    <div className="text-sm text-[#6B7280]">{testimonial.role}, {testimonial.company}</div>
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