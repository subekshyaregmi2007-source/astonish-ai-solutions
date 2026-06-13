import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useListArticles } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

export default function Articles() {
  const { data: articles, isLoading } = useListArticles();

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] font-sans">
      <Navbar />
      <PageTransition>
        <div className="container mx-auto px-6 py-24 max-w-4xl">
          <div className="max-w-2xl mb-16">
            <h1 className="text-[48px] md:text-[64px] font-bold text-[#111827] tracking-tight mb-6 leading-tight">
              Insights & News
            </h1>
            <p className="text-lg text-[#6B7280] leading-relaxed">
              The latest on AI, digital employee experience, and the future of work.
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-xl bg-gray-200" />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {articles?.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link 
                    href={`/articles/${article.id}`} 
                    className="group block bg-white border border-[#E5E7EB] rounded-xl p-8 shadow-sm hover:shadow-md hover:border-[#D1D5DB] transition-all"
                    data-testid={`card-article-${article.id}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-8">
                      <div className="w-full md:w-1/4 shrink-0">
                        <div className="text-xs font-medium text-[#4F46E5] bg-[#4F46E5]/10 px-2.5 py-1 rounded-md inline-block mb-3">
                          {article.category}
                        </div>
                        <div className="text-sm text-[#6B7280] font-medium">
                          {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
                        </div>
                      </div>
                      
                      <div className="w-full md:w-3/4">
                        <h3 className="text-2xl font-bold text-[#111827] mb-3 group-hover:text-[#4F46E5] transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-[#6B7280] text-[15px] line-clamp-2 leading-relaxed mb-4">
                          {article.summary}
                        </p>
                        <div className="text-[#4F46E5] text-sm font-medium flex items-center gap-1.5">
                          Read article <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </PageTransition>
    </div>
  );
}