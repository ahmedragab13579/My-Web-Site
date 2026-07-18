import { useEffect, useState, type JSX } from "react";
import { useParams, Link } from "react-router-dom";
import { useArticleBySlug } from "../../BackEndIntegration/Hooks/Queries/useArticlesQueries";
import { useLikeArticle } from "../../BackEndIntegration/Hooks/Mutations/useArticlesMutations";
import { Eye, Heart, Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react";
import { toast } from "react-toastify";

export default function ArticleDetail(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();

  // Fetch article details
  const { data: article, isLoading, error } = useArticleBySlug(slug || "");

  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const likeArticle = useLikeArticle();

  // Synchronize dynamic likesCount when article is loaded
  useEffect(() => {
    if (article) {
      setLikesCount(article.likesCount);
    }
  }, [article]);

  const handleLike = () => {
    if (article?.id && !hasLiked) {
      setHasLiked(true);
      setLikesCount((prev) => prev + 1);

      likeArticle.mutate(article.id, {
        onSuccess: () => {
          toast.success("Thank you for liking this article!");
        },
        onError: () => {
          setHasLiked(false);
          setLikesCount((prev) => prev - 1);
          toast.error("Failed to register like. Please try again.");
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-main)] text-[var(--text-main)] flex items-center justify-center transition-colors duration-300">
        <div className="animate-pulse flex flex-col items-center w-full max-w-2xl">
          <div className="h-10 bg-brand-teal/20 rounded w-2/3 mb-6"></div>
          <div className="h-6 bg-brand-teal/10 rounded w-1/3 mb-12"></div>
          <div className="h-[300px] bg-brand-blue/30 rounded w-full mb-8"></div>
          <div className="h-4 bg-brand-teal/10 rounded w-full mb-4"></div>
          <div className="h-4 bg-brand-teal/10 rounded w-5/6 mb-4"></div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col items-center justify-center transition-colors duration-300">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Article Not Found</h2>
        <Link to="/blog" className="target inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    );
  }

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
      <div className="mx-auto max-w-3xl">
        {/* Back Link */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-brand-teal hover:underline mb-8 font-semibold">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {/* Article Cover */}
        {article.coverImageUrl && (
          <div className="card-luxury overflow-hidden !p-0 mb-12 border border-brand-teal/20">
            <img
              src={article.coverImageUrl}
              alt={article.title}
              className="w-full max-h-96 object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-brand-cream leading-tight font-sans">
          {article.title}
        </h1>

        {/* Stats & Meta info */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-brand-cream/60 border-y border-brand-teal/10 py-4 mb-12">
          <span className="flex items-center gap-1.5">
            <Calendar size={16} className="text-brand-teal" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={16} className="text-brand-teal" />
            {article.readingTimeInMinutes} min read
          </span>
          <span className="flex items-center gap-1.5">
            <Eye size={16} className="text-brand-teal" />
            {article.viewsCount} views
          </span>
          <span className="flex items-center gap-1.5">
            <Heart size={16} className="text-brand-teal" />
            {likesCount} likes
          </span>
        </div>

        {/* Content Body */}
        <article className="prose prose-invert max-w-none text-brand-cream/90 text-lg leading-relaxed mb-16 whitespace-pre-wrap bg-brand-blue/5 border border-brand-teal/10 rounded-xl p-8 font-sans">
          {article.content}
        </article>

        {/* Bottom Interaction */}
        <div className="border-t border-brand-teal/15 pt-8 flex items-center justify-between">
          <button
            onClick={handleLike}
            disabled={likeArticle.isPending || hasLiked}
            className="border border-red-500/35 hover:border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all disabled:opacity-50 cursor-pointer"
          >
            <Heart size={18} />
            {hasLiked ? "Liked" : likeArticle.isPending ? "Liking..." : "Like Article"}
          </button>

          <span className="text-sm text-brand-cream/60 flex items-center gap-2">
            <BookOpen size={16} className="text-brand-teal" />
            Enjoyed the read? Leave a like!
          </span>
        </div>
      </div>
    </div>
  );
}
