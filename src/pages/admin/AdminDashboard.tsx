import { type JSX } from "react";
import { useDashboardSummary } from "../../BackEndIntegration/Hooks/Queries/useDashboardQueries";
import { Eye, Heart, MessageSquare, Briefcase, FileText, Award, Loader2 } from "lucide-react";

export default function AdminDashboard(): JSX.Element {
  const { data: summary, isLoading, error } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-brand-teal">
        <Loader2 className="animate-spin mr-2" size={24} />
        <span>Loading dashboard summary...</span>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="text-center py-10 bg-red-950/15 border border-red-900/30 rounded-xl">
        <p className="text-red-400 font-semibold">Failed to load dashboard data. Please try again later.</p>
      </div>
    );
  }

  // Define metrics cards configuration
  const statCards = [
    {
      title: "Project Views",
      value: summary.totalProjectViews,
      icon: <Eye className="text-blue-400" size={24} />,
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Article Views",
      value: summary.totalArticleViews,
      icon: <Eye className="text-teal-400" size={24} />,
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/20",
    },
    {
      title: "Total Likes",
      value: summary.totalLikes,
      icon: <Heart className="text-red-400" size={24} />,
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
    {
      title: "Unread Messages",
      value: summary.unreadMessagesCount,
      icon: <MessageSquare className="text-yellow-400" size={24} />,
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
    },
    {
      title: "Total Projects",
      value: summary.totalProjects,
      icon: <Briefcase className="text-purple-400" size={24} />,
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      title: "Published Articles",
      value: summary.totalPublishedArticles,
      icon: <FileText className="text-emerald-400" size={24} />,
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold text-brand-cream mb-2">Dashboard Overview</h1>
        <p className="text-brand-cream/60">Real-time statistics and analysis of your portfolio and CMS.</p>
      </div>

      {/* Grid of stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`border rounded-xl p-6 ${card.bgColor} ${card.borderColor} flex items-center justify-between shadow-sm`}
          >
            <div>
              <p className="text-brand-cream/60 text-sm font-semibold mb-1">{card.title}</p>
              <p className="text-3xl font-extrabold text-brand-cream">{card.value}</p>
            </div>
            <div className="p-3 bg-[var(--bg-main)]/40 rounded-xl border border-brand-teal/10">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboards */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Top Performing Project */}
        <div className="border border-brand-teal/20 bg-brand-blue/10 backdrop-blur-sm rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6 border-b border-brand-teal/15 pb-4">
            <Award className="text-brand-teal" size={24} />
            <h2 className="text-xl font-bold text-brand-cream">Top Performing Project</h2>
          </div>
          {summary.topPerformingProject ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-cream mb-2">
                {summary.topPerformingProject.title}
              </h3>
              <div className="flex items-center gap-6 text-sm text-brand-cream/70 bg-[var(--bg-main)]/40 p-4 rounded-xl border border-brand-teal/10">
                <span className="flex items-center gap-1.5">
                  <Eye size={16} className="text-brand-teal" />
                  {summary.topPerformingProject.viewsCount} Views
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart size={16} className="text-brand-teal" />
                  {summary.topPerformingProject.likesCount} Likes
                </span>
              </div>
            </div>
          ) : (
            <p className="text-brand-cream/50 text-sm">No project details available.</p>
          )}
        </div>

        {/* Top Performing Article */}
        <div className="border border-brand-teal/20 bg-brand-blue/10 backdrop-blur-sm rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6 border-b border-brand-teal/15 pb-4">
            <Award className="text-brand-teal" size={24} />
            <h2 className="text-xl font-bold text-brand-cream">Top Performing Article</h2>
          </div>
          {summary.topPerformingArticle ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-cream mb-2">
                {summary.topPerformingArticle.title}
              </h3>
              <div className="flex items-center gap-6 text-sm text-brand-cream/70 bg-[var(--bg-main)]/40 p-4 rounded-xl border border-brand-teal/10">
                <span className="flex items-center gap-1.5">
                  <Eye size={16} className="text-brand-teal" />
                  {summary.topPerformingArticle.viewsCount} Views
                </span>
                <span className="flex items-center gap-1.5">
                  <Heart size={16} className="text-brand-teal" />
                  {summary.topPerformingArticle.likesCount} Likes
                </span>
              </div>
            </div>
          ) : (
            <p className="text-brand-cream/50 text-sm">No article details available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
