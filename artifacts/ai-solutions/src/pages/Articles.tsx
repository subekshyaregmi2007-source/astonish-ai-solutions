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
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <PageTransition>
        <div className="pt-36 pb-32 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="editorial-line mb-12" />
          <div className="mb-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8B5CF6] mb-6">Insights & News</p>
            <h1 className="text-[48px] md:text-[72px] font-extralight tracking-[-0.03em] text-[#e5e2e1] leading-none mb-8">
              Insights & News
            </h1>
            <p className="text-[#cbc3d7] text-lg max-w-2xl leading-relaxed">
              The latest on AI, digital employee experience, and the future of work.
            </p>
          </div>

          {isLoading ? (
            <div className="border-t border-[#262626] space-y-0">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32 bg-[#131313] border-b border-[#262626] w-full" />
              ))}
            </div>
          ) : (
            <div className="border-t border-[#262626]">
              {articles?.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={`/articles/${article.id}`}
                    className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-12 border-b border-[#262626] py-10 hover:bg-[#0a0a0a] transition-colors"
                    data-testid={`card-article-${article.id}`}
                  >
                    <div className="md:w-[160px] shrink-0">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B5CF6] mb-2">{article.category}</div>
                      <div className="text-xs text-[#cbc3d7]">{format(new Date(article.publishedAt), 'MMM dd, yyyy')}</div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-[#e5e2e1] mb-2 group-hover:text-[#8B5CF6] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-[#cbc3d7] text-[15px] line-clamp-2 leading-relaxed">{article.summary}</p>
                    </div>

                    <div className="shrink-0">
                      <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] group-hover:text-[#8B5CF6] transition-colors">
                        Read <ArrowRight className="w-3.5 h-3.5" />
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
