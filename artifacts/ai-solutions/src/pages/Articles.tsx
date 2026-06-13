import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useListArticles } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { format } from "date-fns";

export default function Articles() {
  const { data: articles, isLoading } = useListArticles();

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />
      <PageTransition className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-3xl mb-16">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
            Insights & News
          </h1>
          <p className="text-xl text-muted-foreground">
            The latest on AI, digital employee experience, and the future of work.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[500px] rounded-2xl bg-muted/20" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles?.map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
                data-testid={`card-article-${article.id}`}
              >
                <Link href={`/articles/${article.id}`} className="block">
                  <div className="h-[300px] rounded-2xl overflow-hidden mb-6 relative bg-muted">
                    {article.imageUrl && (
                      <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    )}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary">
                      {article.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span>{format(new Date(article.publishedAt), 'MMM dd, yyyy')}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>{article.author}</span>
                  </div>
                  <h3 className="text-3xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-lg line-clamp-3">
                    {article.summary}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </PageTransition>
    </div>
  );
}
