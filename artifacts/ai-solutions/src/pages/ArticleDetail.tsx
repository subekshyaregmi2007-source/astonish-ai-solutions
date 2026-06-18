import { PageTransition } from "@/components/layout/PageTransition";
import { Navbar } from "@/components/layout/Navbar";
import { useGetArticle, getGetArticleQueryKey, useListArticles } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

/* ── Reading progress bar — DOM-direct, zero re-renders ─────── */
function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      bar.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <div
        ref={barRef}
        className="h-full will-change-[width]"
        style={{
          width: "0%",
          background: "linear-gradient(90deg, #1E7045, #5BA87A, #2E8B57)",
          boxShadow: "0 0 8px rgba(46,139,87,0.7)",
          transition: "width 0.05s linear",
        }}
      />
    </div>
  );
}

function readingTime(text: string) {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 200));
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay }}
    >{children}</motion.div>
  );
}

export default function ArticleDetail() {
  const params = useParams();
  const id = Number(params.id);
  const { data: article, isLoading, isError } = useGetArticle(id, {
    query: { enabled: !!id, queryKey: getGetArticleQueryKey(id) },
  });
  const { data: allArticles } = useListArticles();
  const related = allArticles?.filter(a => a.id !== id).slice(0, 2);
  const mins = article ? readingTime(article.content) : 0;
  const paragraphs = article?.content.split(/\n\n+/).filter(Boolean) ?? [];

  return (
    <div className="min-h-screen bg-[#F4FBF6] text-[#1A3326]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />
      <PageTransition>

        {/* Loading */}
        {isLoading && (
          <div className="pt-28 pb-20 px-6 md:px-16 max-w-[860px] mx-auto">
            <Skeleton className="h-4 w-28 bg-[#D8EDE0] mb-8" />
            <Skeleton className="h-12 w-full bg-[#D8EDE0] mb-3" />
            <Skeleton className="h-12 w-2/3 bg-[#D8EDE0] mb-10" />
            <Skeleton className="h-4 w-40 bg-[#D8EDE0] mb-16" />
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-4 w-full bg-[#D8EDE0] mb-3" />)}
          </div>
        )}

        {isError && (
          <div className="pt-28 pb-20 px-6 md:px-16 text-center">
            <p className="text-[#3D6B52] mb-4">Article not found.</p>
            <Link href="/articles" className="text-[#2E8B57] text-sm hover:underline">← Back to Articles</Link>
          </div>
        )}

        {article && (
          <article data-testid="article-detail">
            <ReadingProgress />

            {/* ── HEADER ─────────────────────────────────── */}
            <div className="pt-24 md:pt-28 px-6 md:px-16 max-w-[1440px] mx-auto">
              <div className="editorial-line mb-8" />

              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="mb-8">
                <Link href="/articles" data-testid="link-back-articles"
                  className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] hover:text-[#2E8B57] transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> All Articles
                </Link>
              </motion.div>

              <div className="max-w-[800px]">
                <motion.div className="flex flex-wrap items-center gap-3 mb-5"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }}>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#2E8B57] border border-[#2E8B57]/30 px-3 py-1">
                    {article.category}
                  </span>
                  <span className="text-[#3D6B52] text-xs">{format(new Date(article.publishedAt), "MMMM d, yyyy")}</span>
                  <span className="flex items-center gap-1.5 text-[#3D6B52] text-xs">
                    <Clock className="w-3 h-3" /> {mins} min read
                  </span>
                </motion.div>

                <motion.h1
                  className="text-[34px] md:text-[52px] lg:text-[60px] font-extralight tracking-[-0.03em] text-[#1A3326] leading-[1.1] mb-8"
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  {article.title}
                </motion.h1>

                <motion.div className="flex items-center gap-4 pb-10 border-b border-[#AECFBE]"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35, duration: 0.5 }}>
                  <div className="w-10 h-10 bg-[#C4E0CC] border border-[#2E8B57]/30 flex items-center justify-center text-[#2E8B57] font-semibold text-sm shrink-0">
                    {article.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[#1A3326] font-semibold text-sm">{article.author}</div>
                    <div className="text-[#3D6B52] text-xs">AI-Solutions</div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ── HERO IMAGE ─────────────────────────────── */}
            {article.imageUrl && (
              <motion.div
                className="max-w-[1440px] mx-auto px-6 md:px-16 my-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="max-w-[800px] h-[260px] md:h-[380px] overflow-hidden relative">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F4FBF6]/60" />
                  <div className="absolute inset-0 border border-[#AECFBE]" />
                </div>
              </motion.div>
            )}

            {/* ── PULL QUOTE ─────────────────────────────── */}
            <FadeIn className="px-6 md:px-16 max-w-[1440px] mx-auto my-10 md:my-14" delay={0.05}>
              <div className="max-w-[800px] border-l-2 border-[#2E8B57] pl-7 py-2">
                <p className="text-[17px] md:text-[21px] font-extralight italic text-[#3D6B52] leading-relaxed">
                  "{article.summary}"
                </p>
              </div>
            </FadeIn>

            {/* ── BODY ───────────────────────────────────── */}
            <div className="px-6 md:px-16 max-w-[1440px] mx-auto">
              <div className="max-w-[660px] space-y-5">
                {paragraphs.map((para, i) => {
                  if (para.startsWith("## ") || para.startsWith("# ")) {
                    const text = para.replace(/^#{1,2} /, "");
                    return (
                      <FadeIn key={i} delay={0.03}>
                        <h2 className="text-[22px] md:text-[28px] font-light text-[#1A3326] tracking-tight mt-8 mb-1">{text}</h2>
                      </FadeIn>
                    );
                  }
                  if (i > 0 && i % 5 === 0) {
                    return (
                      <FadeIn key={i} delay={0.03} className="my-8">
                        <div className="bg-[#EAF5EE] border border-[#AECFBE] p-7 relative overflow-hidden">
                          <span className="absolute top-2 left-5 text-[72px] font-thin text-[#2E8B57]/15 leading-none select-none">"</span>
                          <p className="text-[15px] text-[#3D6B52] leading-relaxed italic pt-5 relative z-10">
                            {para.length > 220 ? para.slice(0, 220) + "…" : para}
                          </p>
                        </div>
                      </FadeIn>
                    );
                  }
                  return (
                    <FadeIn key={i} delay={0.02}>
                      <p className="text-[15px] md:text-[16px] text-[#3D6B52] leading-[1.9]">{para}</p>
                    </FadeIn>
                  );
                })}
              </div>
            </div>

            {/* ── AUTHOR FOOTER ──────────────────────────── */}
            <FadeIn className="px-6 md:px-16 max-w-[1440px] mx-auto mt-14" delay={0.05}>
              <div className="max-w-[660px] border-t border-[#AECFBE] pt-10">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[#C4E0CC] border border-[#2E8B57]/30 flex items-center justify-center text-[#2E8B57] font-semibold text-xl shrink-0">
                    {article.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] mb-1">Written by</div>
                    <div className="text-[#1A3326] font-semibold">{article.author}</div>
                    <div className="text-[#3D6B52] text-sm">AI-Solutions Editorial Team</div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ── RELATED ────────────────────────────────── */}
            {related && related.length > 0 && (
              <FadeIn className="px-6 md:px-16 max-w-[1440px] mx-auto mt-16 pb-16 md:pb-24" delay={0.05}>
                <div className="editorial-line mb-10" />
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-[20px] font-light uppercase tracking-tight text-[#1A3326]">More Reading</h2>
                  <Link href="/articles" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] hover:text-[#2E8B57] transition-colors flex items-center gap-1">
                    All articles <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 border-l border-t border-[#AECFBE]">
                  {related.map((rel) => (
                    <Link key={rel.id} href={`/articles/${rel.id}`}
                      className="group border-r border-b border-[#AECFBE] overflow-hidden hover:bg-[#EAF5EE] transition-colors block">
                      {rel.imageUrl && (
                        <div className="h-[140px] overflow-hidden relative">
                          <img
                            src={rel.imageUrl}
                            alt={rel.title}
                            className="w-full h-full object-cover grayscale opacity-50 group-hover:opacity-75 group-hover:grayscale-0 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#EAF5EE]" />
                        </div>
                      )}
                      <div className="p-8">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2E8B57] mb-3 block">{rel.category}</span>
                        <h3 className="text-base font-semibold text-[#1A3326] mb-2 group-hover:text-[#2E8B57] transition-colors leading-snug">{rel.title}</h3>
                        <p className="text-[#3D6B52] text-sm line-clamp-2 leading-relaxed mb-4">{rel.summary}</p>
                        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3D6B52] group-hover:text-[#2E8B57] group-hover:gap-3 transition-all">
                          Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </FadeIn>
            )}
          </article>
        )}

      </PageTransition>
    </div>
  );
}
