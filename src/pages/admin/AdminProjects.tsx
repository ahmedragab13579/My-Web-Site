import { useState, type JSX } from "react";
import { useProjects } from "../../BackEndIntegration/Hooks/Queries/useProjectsQueries";
import { useSkills } from "../../BackEndIntegration/Hooks/Queries/useSkillsQueries";
import { useCreateProject, useUpdateProject, useDeleteProject } from "../../BackEndIntegration/Hooks/Mutations/useProjectsMutations";
import type { ProjectType } from "../../BackEndIntegration/Types/Enums";
import { Plus, Edit, Trash2, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminProjects(): JSX.Element {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [type, setType] = useState<ProjectType>("Personal");
  const [selectedSkillIds, setSelectedSkillIds] = useState<number[]>([]);

  // Fetch projects list
  const { data: pagedResult, isLoading, refetch } = useProjects(page, 10);
  const { data: skills = [] } = useSkills();

  const projects = pagedResult?.items || [];
  const totalPages = pagedResult?.totalPages || 1;

  // Mutations
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const handleOpenAddModal = () => {
    setEditingProject(null);
    setTitle("");
    setSlug("");
    setShortDesc("");
    setFullDesc("");
    setThumbnailUrl("");
    setLiveUrl("");
    setGithubUrl("");
    setIsFeatured(false);
    setType("Personal");
    setSelectedSkillIds([]);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: any) => {
    setEditingProject(project);
    setTitle(project.title || "");
    setSlug(project.slug || "");
    setShortDesc(project.shortDescription || "");
    setFullDesc(project.fullDescription || "");
    setThumbnailUrl(project.thumbnailUrl || "");
    setLiveUrl(project.liveDemoUrl || "");
    setGithubUrl(project.githubUrl || "");
    setIsFeatured(project.isFeatured || false);
    setType(project.type || "Personal");
    setSelectedSkillIds(project.skills ? project.skills.map((s: any) => s.id) : []);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject.mutate(id, {
        onSuccess: () => {
          toast.success("Project deleted successfully!");
          refetch();
        },
        onError: () => {
          toast.error("Failed to delete project.");
        },
      });
    }
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
      shortDescription: shortDesc,
      fullDescription: fullDesc,
      thumbnailUrl,
      liveDemoUrl: liveUrl || null,
      githubUrl: githubUrl || null,
      isFeatured,
      type,
      skillIds: selectedSkillIds,
    };

    if (editingProject) {
      updateProject.mutate(
        { id: editingProject.id, command },
        {
          onSuccess: () => {
            toast.success("Project updated successfully!");
            setIsModalOpen(false);
            refetch();
          },
          onError: () => {
            toast.error("Failed to update project.");
          },
        }
      );
    } else {
      createProject.mutate(command, {
        onSuccess: () => {
          toast.success("Project created successfully!");
          setIsModalOpen(false);
          refetch();
        },
        onError: () => {
          toast.error("Failed to create project.");
        },
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-cream">Manage Projects</h1>
          <p className="text-brand-cream/60">CRUD operations for portfolio catalog items.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="btn-primary flex items-center gap-2 text-sm cursor-pointer shadow-[0_0_15px_rgba(0,173,181,0.2)]"
        >
          <Plus size={18} />
          Add New Project
        </button>
      </div>

      {/* Projects Table */}
      {isLoading ? (
        <div className="flex h-40 items-center justify-center text-brand-teal">
          <Loader2 className="animate-spin mr-2" size={24} />
          <span>Loading projects catalog...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-brand-teal/20 rounded-2xl bg-brand-blue/5">
          <p className="text-brand-cream/60 text-lg">No projects added yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-brand-teal/20 rounded-xl bg-brand-blue/5 backdrop-blur-sm shadow-brand-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-brand-teal/20 bg-slate-900/50 text-brand-teal font-semibold">
                <th className="p-4">Title</th>
                <th className="p-4">Type</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-center">Views</th>
                <th className="p-4 text-center">Likes</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-brand-teal/10 hover:bg-brand-blue/10 transition-colors">
                  <td className="p-4 font-bold text-brand-cream">{project.title}</td>
                  <td className="p-4 text-brand-cream/70">{project.type}</td>
                  <td className="p-4">
                    {project.isFeatured ? (
                      <span className="px-2.5 py-0.5 rounded-full text-2xs bg-green-500/20 text-green-400 font-semibold border border-green-500/20">
                        Featured
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-2xs bg-slate-800 text-brand-cream/40 border border-slate-700">
                        No
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center text-brand-cream/60">{project.viewsCount}</td>
                  <td className="p-4 text-center text-brand-cream/60">{project.likesCount}</td>
                  <td className="p-4 text-right flex justify-end gap-2 items-center h-full">
                    <button
                      onClick={() => handleOpenEditModal(project)}
                      className="p-2 bg-brand-teal/10 hover:bg-brand-teal/20 text-brand-teal rounded border border-brand-teal/20 transition-colors cursor-pointer"
                      title="Edit Project"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded border border-red-500/20 transition-colors cursor-pointer"
                      title="Delete Project"
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
              {editingProject ? "Edit Project" : "Add New Project"}
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
                      if (!editingProject) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
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

              {/* Short Description */}
              <div>
                <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Short Description</label>
                <textarea
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  required
                  rows={2}
                  className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Full Description (Markdown)</label>
                <textarea
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
                  required
                  rows={5}
                  className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Thumbnail Url */}
                <div>
                  <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Thumbnail Image URL</label>
                  <input
                    type="text"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    required
                    placeholder="https://example.com/image.png"
                    className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                  />
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Project Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as ProjectType)}
                    className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                  >
                    <option value="Personal">Personal</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="OpenSource">OpenSource</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Live Demo URL */}
                <div>
                  <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Live Demo URL</label>
                  <input
                    type="text"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="https://example.com/demo"
                    className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                  />
                </div>

                {/* GitHub URL */}
                <div>
                  <label className="block text-sm font-semibold text-brand-cream/80 mb-2">GitHub URL</label>
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/..."
                    className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                  />
                </div>
              </div>

              {/* Is Featured Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="rounded border-brand-teal/30 bg-[var(--card-bg)] text-brand-teal focus:ring-brand-teal h-4 w-4"
                />
                <label htmlFor="isFeatured" className="text-sm font-semibold text-brand-cream/80 select-none cursor-pointer">
                  Feature this project on the homepage
                </label>
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
                  disabled={createProject.isPending || updateProject.isPending}
                  className="btn-primary text-sm font-bold cursor-pointer"
                >
                  {createProject.isPending || updateProject.isPending ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
