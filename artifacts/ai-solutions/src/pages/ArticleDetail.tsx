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
    <div className="min-h-screen bg-white text-[#111827] font-sans">
      <Navbar />
      <PageTransition>
        <div className="container mx-auto px-6 py-20 max-w-3xl">
          <Link href="/articles" className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#111827] transition-colors mb-12 text-sm font-medium" data-testid="link-back-articles">
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>
          
          {isLoading || !article ? (
            <div>
              <Skeleton className="h-6 w-32 mb-6 bg-gray-100 rounded-md" />
              <Skeleton className="h-16 w-full mb-8 bg-gray-100 rounded-md" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full bg-gray-100" />
                <Skeleton className="h-4 w-full bg-gray-100" />
                <Skeleton className="h-4 w-3/4 bg-gray-100" />
              </div>
            </div>
          ) : (
            <article data-testid="article-detail">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm font-medium text-[#4F46E5] bg-[#4F46E5]/10 px-2.5 py-1 rounded-md">
                  {article.category}
                </span>
              </div>
              
              <h1 className="text-[40px] md:text-[56px] font-bold mb-8 leading-[1.1] text-[#111827] tracking-tight">
                {article.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-16 pb-8 border-b border-[#F3F4F6]">
                <div>
                  <div className="font-semibold text-[#111827]">{article.author}</div>
                  <div className="text-sm text-[#6B7280]">{format(new Date(article.publishedAt), 'MMMM dd, yyyy')}</div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-[#374151] prose-headings:text-[#111827] prose-headings:font-bold prose-a:text-[#4F46E5] prose-p:leading-relaxed">
                <p className="text-xl text-[#111827] font-medium mb-8 leading-relaxed">
                  {article.summary}
                </p>
                
                <div className="whitespace-pre-line">
                  {article.content}
                </div>
              </div>
            </article>
          )}
        </div>
      </PageTransition>
    </div>
  );
}