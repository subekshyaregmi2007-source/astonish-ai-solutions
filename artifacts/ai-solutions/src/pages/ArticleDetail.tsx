import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useGetArticle } from "@workspace/api-client-react";
import { getGetArticleQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";

export default function ArticleDetail() {
  const params = useParams();
  const id = Number(params.id);
  const { data: article, isLoading } = useGetArticle(id, { query: { enabled: !!id, queryKey: getGetArticleQueryKey(id) } });

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <PageTransition>
        <div className="pt-36 pb-32 px-6 md:px-16 max-w-3xl mx-auto">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#cbc3d7] hover:text-[#8B5CF6] transition-colors mb-16"
            data-testid="link-back-articles"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
          </Link>

          {isLoading || !article ? (
            <div>
              <Skeleton className="h-4 w-32 mb-8 bg-[#131313]" />
              <Skeleton className="h-20 w-full mb-8 bg-[#131313]" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full bg-[#131313]" />
                <Skeleton className="h-4 w-full bg-[#131313]" />
                <Skeleton className="h-4 w-3/4 bg-[#131313]" />
              </div>
            </div>
          ) : (
            <article data-testid="article-detail">
              <div className="editorial-line mb-10" />
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B5CF6] border border-[#8B5CF6]/30 px-3 py-1">
                  {article.category}
                </span>
              </div>

              <h1 className="text-[36px] md:text-[52px] font-extralight leading-[1.1] tracking-[-0.02em] text-[#e5e2e1] mb-10">
                {article.title}
              </h1>

              <div className="flex items-center gap-6 mb-16 pb-10 border-b border-[#262626]">
                <div>
                  <div className="font-semibold text-[#e5e2e1] text-sm">{article.author}</div>
                  <div className="text-xs text-[#cbc3d7] mt-0.5">{format(new Date(article.publishedAt), 'MMMM dd, yyyy')}</div>
                </div>
              </div>

              <div className="text-xl text-[#e5e2e1] font-light mb-10 leading-relaxed">
                {article.summary}
              </div>

              <div className="text-[#cbc3d7] text-[17px] leading-relaxed whitespace-pre-line">
                {article.content}
              </div>
            </article>
          )}
        </div>
      </PageTransition>
    </div>
  );
}
