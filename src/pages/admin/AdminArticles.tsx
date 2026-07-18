import { useState, type JSX } from "react";
import { useAdminArticles } from "../../BackEndIntegration/Hooks/Queries/useArticlesQueries";
import { useSkills } from "../../BackEndIntegration/Hooks/Queries/useSkillsQueries";
import { useCreateArticle, useUpdateArticle, useChangeArticleStatus, useDeleteArticle } from "../../BackEndIntegration/Hooks/Mutations/useArticlesMutations";
import type { ArticleStatus } from "../../BackEndIntegration/Types/Enums";
import { Plus, Edit, Trash2, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminArticles(): JSX.Element {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<any>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [readingTime, setReadingTime] = useState(5);
  const [status, setStatus] = useState<ArticleStatus>("Draft");
  const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]);

  // Fetch articles and skills
  const { data: pagedResult, isLoading, refetch } = useAdminArticles(page, 10);
  const { data: skills = [] } = useSkills();

  const articles = pagedResult?.items || [];
  const totalPages = pagedResult?.totalPages || 1;

  // Mutations
  const createArticle = useCreateArticle();
  const updateArticle = useUpdateArticle();
  const changeStatus = useChangeArticleStatus();
  const deleteArticle = useDeleteArticle();

  const handleOpenAddModal = () => {
    setEditingArticle(null);
    setTitle("");
    setSlug("");
    setSummary("");
    setContent("");
    setCoverImageUrl("");
    setReadingTime(5);
    setStatus("Draft");
    setSelectedSkillIds([]);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (article: any) => {
    setEditingArticle(article);
    setTitle(article.title || "");
    setSlug(article.slug || "");
    setSummary(article.summary || "");
    setContent(article.content || "");
    setCoverImageUrl(article.coverImageUrl || "");
    setReadingTime(article.readingTimeInMinutes || 5);
    setStatus(article.status || "Draft");
    setSelectedSkillIds(article.skills ? article.skills.map((s: any) => s.id) : []);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      deleteArticle.mutate(id, {
        onSuccess: () => {
          toast.success("Article deleted successfully!");
          refetch();
        },
        onError: () => {
          toast.error("Failed to delete article.");
        },
      });
    }
  };

  const handleStatusChange = (id: number, newStatus: ArticleStatus) => {
    changeStatus.mutate(
      { id, request: { status: newStatus } },
      {
        onSuccess: () => {
          toast.success(`Status updated to ${newStatus}!`);
          refetch();
        },
        onError: () => {
          toast.error("Failed to change article status.");
        },
      }
    );
  };

  const handleSkillToggle = (skillId: number) => {
    setSelectedSkillIds((prev) =>
      prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const command = {
      title,
      slug,
      summary,
      content,
      coverImageUrl: coverImageUrl || null,
      readingTimeInMinutes: Number(readingTime),
      status,
      skillIds: selectedSkillIds,
    };

    if (editingArticle) {
      updateArticle.mutate(
        { id: editingArticle.id, command },
        {
          onSuccess: () => {
            toast.success("Article updated successfully!");
            setIsModalOpen(false);
            refetch();
          },
          onError: () => {
            toast.error("Failed to update article.");
          },
        }
      );
    } else {
      createArticle.mutate(command, {
        onSuccess: () => {
          toast.success("Article created successfully!");
          setIsModalOpen(false);
          refetch();
        },
        onError: () => {
          toast.error("Failed to create article.");
        },
      });
    }
  };

  const getStatusBadgeClass = (status: ArticleStatus) => {
    switch (status) {
      case "Published":
      case 1:
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/20";
      case "Archived":
      case 2:
        return "bg-red-500/20 text-red-400 border-red-500/20";
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-cream">Manage Articles</h1>
          <p className="text-brand-cream/60">CRUD operations and statuses for technical blog posts.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="btn-primary flex items-center gap-2 text-sm cursor-pointer shadow-[0_0_15px_rgba(0,173,181,0.2)]"
        >
          <Plus size={18} />
          Create New Article
        </button>
      </div>

      {/* Articles Table */}
      {isLoading ? (
        <div className="flex h-40 items-center justify-center text-brand-teal">
          <Loader2 className="animate-spin mr-2" size={24} />
          <span>Loading technical articles...</span>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-brand-teal/20 rounded-2xl bg-brand-blue/5">
          <p className="text-brand-cream/60 text-lg">No articles written yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-brand-teal/20 rounded-xl bg-brand-blue/5 backdrop-blur-sm shadow-brand-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-brand-teal/20 bg-slate-900/50 text-brand-teal font-semibold">
                <th className="p-4">Title</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Views</th>
                <th className="p-4 text-center">Likes</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-brand-teal/10 hover:bg-brand-blue/10 transition-colors">
                  <td className="p-4 font-bold text-brand-cream">{article.title}</td>
                  <td className="p-4">
                    <select
                      value={article.status}
                      onChange={(e) => handleStatusChange(article.id, e.target.value as ArticleStatus)}
                      className={`px-2 py-1 rounded-full text-xs font-semibold border focus:outline-none bg-[var(--card-bg)] transition-colors cursor-pointer ${getStatusBadgeClass(
                        article.status
                      )}`}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>
                  <td className="p-4 text-center text-brand-cream/60">{article.viewsCount}</td>
                  <td className="p-4 text-center text-brand-cream/60">{article.likesCount}</td>
                  <td className="p-4 text-right flex justify-end gap-2 items-center h-full">
                    <button
                      onClick={() => handleOpenEditModal(article)}
                      className="p-2 bg-brand-teal/10 hover:bg-brand-teal/20 text-brand-teal rounded border border-brand-teal/20 transition-colors cursor-pointer"
                      title="Edit Article"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="p-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded border border-red-500/20 transition-colors cursor-pointer"
                      title="Delete Article"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-brand-teal/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-brand relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-brand-cream/60 hover:text-brand-teal cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-brand-teal mb-6">
              {editingArticle ? "Edit Article" : "Write New Article"}
            </h2>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (!editingArticle) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                    }}
                    required
                    className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                    className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Short Summary</label>
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  required
                  rows={2}
                  className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                />
              </div>

              {/* Content Body */}
              <div>
                <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Content Body (Markdown)</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={6}
                  className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {/* Cover Image URL */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Cover Image URL</label>
                  <input
                    type="text"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    placeholder="https://example.com/cover.jpg"
                    className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                  />
                </div>

                {/* Reading Time */}
                <div>
                  <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Reading Time (Min)</label>
                  <input
                    type="number"
                    value={readingTime}
                    onChange={(e) => setReadingTime(Number(e.target.value))}
                    required
                    min={1}
                    className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Publishing Status */}
                <div>
                  <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ArticleStatus)}
                    className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              {/* Skill Tag Selection */}
              <div>
                <label className="block text-sm font-semibold text-brand-cream/80 mb-3">Technologies Tagged</label>
                <div className="flex flex-wrap gap-2.5 max-h-36 overflow-y-auto p-4 bg-[var(--bg-main)]/40 border border-brand-teal/10 rounded-xl">
                  {skills.map((skill) => {
                    const isChecked = selectedSkillIds.includes(skill.id);
                    return (
                      <button
                        type="button"
                        key={skill.id}
                        onClick={() => handleSkillToggle(skill.id)}
                        className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer font-semibold ${
                          isChecked
                            ? "bg-brand-teal border-brand-teal text-brand-dark"
                            : "border-brand-teal/20 bg-transparent text-brand-cream/60 hover:border-brand-teal/50 hover:text-brand-cream"
                        }`}
                      >
                        {skill.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer Save */}
              <div className="border-t border-brand-teal/10 pt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-brand-teal/30 rounded-lg text-sm text-brand-cream hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createArticle.isPending || updateArticle.isPending}
                  className="btn-primary text-sm font-bold cursor-pointer"
                >
                  {createArticle.isPending || updateArticle.isPending ? "Saving..." : "Save Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
