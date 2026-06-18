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
        <div className="pt-24 md:pt-28 pb-16 md:pb-24 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="editorial-line mb-8" />
          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8B5CF6] mb-4">Insights & News</p>
            <h1 className="text-[40px] md:text-[60px] font-extralight tracking-[-0.03em] text-[#e5e2e1] leading-none mb-5">
              Insights & News
            </h1>
            <p className="text-[#cbc3d7] text-base max-w-xl leading-relaxed">
              The latest on AI, digital employee experience, and the future of work.
            </p>
          </div>

          {isLoading ? (
            <div className="border-t border-[#262626]">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border-b border-[#262626] py-8 flex gap-6">
                  <Skeleton className="hidden md:block h-[90px] w-[140px] bg-[#131313] shrink-0" />
                  <Skeleton className="h-5 flex-grow bg-[#131313]" />
                </div>
              ))}
            </div>
          ) : (
            <div className="border-t border-[#262626]">
              {articles?.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/articles/${article.id}`}
                    className="group flex flex-col md:flex-row md:items-center gap-5 md:gap-8 border-b border-[#262626] py-7 hover:bg-[#0a0a0a] transition-colors px-1"
                    data-testid={`card-article-${article.id}`}
                  >
                    {article.imageUrl && (
                      <div className="hidden md:block w-[140px] h-[90px] shrink-0 overflow-hidden relative">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 border border-[#262626]" />
                      </div>
                    )}
                    <div className="md:w-[120px] shrink-0">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B5CF6] mb-1.5">{article.category}</div>
                      <div className="text-xs text-[#cbc3d7]">{format(new Date(article.publishedAt), "MMM dd, yyyy")}</div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <h3 className="text-lg font-semibold text-[#e5e2e1] mb-1.5 group-hover:text-[#8B5CF6] transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-[#cbc3d7] text-sm line-clamp-2 leading-relaxed">{article.summary}</p>
                    </div>
                    <div className="shrink-0">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] group-hover:text-[#8B5CF6] transition-colors">
                        Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
