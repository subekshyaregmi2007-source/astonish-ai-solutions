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
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar />
      <PageTransition className="container mx-auto px-6 py-20 relative z-10">
        <Link href="/articles" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-12 uppercase tracking-wider text-sm font-bold" data-testid="link-back-articles">
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </Link>
        
        {isLoading || !article ? (
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-8 w-32 mb-6 bg-muted/20" />
            <Skeleton className="h-16 w-full mb-6 bg-muted/20" />
            <Skeleton className="h-[400px] w-full rounded-2xl mb-12 bg-muted/20" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full bg-muted/20" />
              <Skeleton className="h-6 w-full bg-muted/20" />
              <Skeleton className="h-6 w-3/4 bg-muted/20" />
            </div>
          </div>
        ) : (
          <article className="max-w-4xl mx-auto" data-testid="article-detail">
            <div className="flex items-center gap-4 text-sm text-primary font-bold uppercase tracking-wider mb-6">
              <span>{article.category}</span>
              <span className="w-1 h-1 rounded-full bg-primary/50"></span>
              <span className="text-muted-foreground">{format(new Date(article.publishedAt), 'MMMM dd, yyyy')}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                {article.author.charAt(0)}
              </div>
              <div>
                <div className="font-bold">{article.author}</div>
                <div className="text-sm text-muted-foreground">AI-Solutions Team</div>
              </div>
            </div>

            {article.imageUrl && (
              <div className="w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden mb-16 border border-white/5">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="prose prose-invert prose-lg prose-p:text-muted-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-primary max-w-none">
              <p className="text-2xl text-foreground mb-8 font-medium leading-relaxed">{article.summary}</p>
              
              {/* Very simple content rendering since it's just a string in this mockup API */}
              <div className="whitespace-pre-line leading-loose">
                {article.content}
              </div>
            </div>
          </article>
        )}
      </PageTransition>
    </div>
  );
}
