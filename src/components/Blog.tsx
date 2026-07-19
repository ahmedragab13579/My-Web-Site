import { type JSX } from "react";
import { useArticles } from "../BackEndIntegration/Hooks/Queries/useArticlesQueries";
import { Eye, Heart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export default function Blog(): JSX.Element {
  const { data: pagedResult, isLoading } = useArticles(1, 3);
  const articles = pagedResult?.items || [];

  if (isLoading) {
    return (
      <section id="blog" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title">Technical Blog</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse card-luxury flex flex-col h-96 !p-0">
                <div className="bg-brand-teal/10 w-full h-48 mb-6"></div>
                <div className="px-6 pb-6 space-y-4">
                  <div className="h-6 bg-brand-teal/20 rounded w-2/3"></div>
                  <div className="h-4 bg-brand-teal/10 rounded w-full"></div>
                  <div className="h-4 bg-brand-teal/10 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">Technical Blog</h2>

        <p className=" text-brand-cream/80 mx-auto mb-12 max-w-2xl text-center text-lg">
          Insights, deep-dives, and tutorials on software architecture and full-stack development.
        </p>

        <div className=" grid gap-8 md:grid-cols-3">
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
                        {article.viewsCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart size={14} className="text-brand-teal" />
                        {article.likesCount}
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

        <div className="text-center mt-12">
          <Link to="/blog" className="target inline-flex">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
