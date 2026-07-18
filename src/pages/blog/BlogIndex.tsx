import { useState, type JSX } from "react";
import { useArticles } from "../../BackEndIntegration/Hooks/Queries/useArticlesQueries";
import { Eye, Heart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function BlogIndex(): JSX.Element {
  const [page, setPage] = useState(1);

  // Fetch articles dynamically
  const { data: pagedResult, isLoading } = useArticles(page, 6);
  const articles = pagedResult?.items || [];
  const totalPages = pagedResult?.totalPages || 1;

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold md:text-5xl mb-4 gradient-text">
            Technical Blog & Insights
          </h1>
          <p className="text-brand-cream/80 max-w-2xl mx-auto text-lg">
            Articles and write-ups on full-stack development, software patterns, and cybersecurity.
          </p>
        </div>

        {/* Loading / Cards Grid */}
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse card-luxury flex flex-col h-[420px] !p-0">
                <div className="bg-brand-teal/10 w-full h-48 mb-6"></div>
                <div className="px-6 pb-6 space-y-4 flex-1">
                  <div className="h-6 bg-brand-teal/20 rounded w-2/3"></div>
                  <div className="h-4 bg-brand-teal/10 rounded w-full"></div>
                  <div className="h-4 bg-brand-teal/10 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-brand-teal/20 rounded-2xl bg-brand-blue/5">
            <p className="text-brand-cream/60 text-lg">No articles have been published yet.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => {
                const formattedDate = article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "";

                return (
                  <article
                    key={article.id}
                    className="card-luxury group flex flex-col overflow-hidden !p-0"
                  >
                    {/* Cover Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-brand-blue/30">
                      {article.coverImageUrl ? (
                        <img
                          src={article.coverImageUrl}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-brand-teal/40">
                          <BookOpen size={48} />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      {/* Date & Reading Time */}
                      <div className="mb-3 flex items-center justify-between text-xs text-brand-cream/60">
                        <span>{formattedDate}</span>
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} className="text-brand-teal" />
                          {article.readingTimeInMinutes} min read
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-brand-cream group-hover:text-brand-teal mb-3 text-xl font-bold transition-colors">
                        <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                      </h3>

                      {/* Summary */}
                      <p className="text-brand-cream/80 mb-4 line-clamp-3 text-sm leading-relaxed">
                        {article.summary}
                      </p>

                      {/* Likes & Views */}
                      <div className="mt-auto pt-4 border-t border-brand-teal/10 flex items-center justify-between text-xs text-brand-cream/60">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye size={14} className="text-brand-teal" />
                            {article.viewsCount} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart size={14} className="text-brand-teal" />
                            {article.likesCount} likes
                          </span>
                        </div>
                        <Link
                          to={`/blog/${article.slug}`}
                          className="text-brand-teal font-semibold hover:underline"
                        >
                          Read Article
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-16">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className="px-4 py-2 border border-brand-teal/30 hover:border-brand-teal bg-brand-blue/20 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-brand-cream/80 text-sm">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className="px-4 py-2 border border-brand-teal/30 hover:border-brand-teal bg-brand-blue/20 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
