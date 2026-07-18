import { useState, type JSX } from "react";
import { useExperiences } from "../../BackEndIntegration/Hooks/Queries/useExperiencesQueries";
import { useCreateExperience, useUpdateExperience, useDeleteExperience } from "../../BackEndIntegration/Hooks/Mutations/useExperiencesMutations";
import { Plus, Edit, Trash2, X, Loader2, Calendar } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminExperience(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isCurrent, setIsCurrent] = useState(false);

  // Fetch experiences
  const { data: experiences = [], isLoading, refetch } = useExperiences();

  // Mutations
  const createExp = useCreateExperience();
  const updateExp = useUpdateExperience();
  const deleteExp = useDeleteExperience();

  const handleOpenAddModal = () => {
    setEditingExperience(null);
    setTitle("");
    setOrganization("");
    setLocation("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setIsCurrent(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (exp: any) => {
    setEditingExperience(exp);
    setTitle(exp.title || "");
    setOrganization(exp.organization || "");
    setLocation(exp.location || "");
    setDescription(exp.description || "");
    setStartDate(exp.startDate ? exp.startDate.split("T")[0] : "");
    setEndDate(exp.endDate ? exp.endDate.split("T")[0] : "");
    setIsCurrent(exp.isCurrent || false);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this experience milestone?")) {
      deleteExp.mutate(id, {
        onSuccess: () => {
          toast.success("Milestone deleted successfully!");
          refetch();
        },
        onError: () => {
          toast.error("Failed to delete milestone.");
        },
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const command = {
      title,
      organization,
      location: location || null,
      description,
      startDate: new Date(startDate).toISOString(),
      endDate: isCurrent ? null : new Date(endDate).toISOString(),
      isCurrent,
    };

    if (editingExperience) {
      updateExp.mutate(
        { id: editingExperience.id, command },
        {
          onSuccess: () => {
            toast.success("Milestone updated successfully!");
            setIsModalOpen(false);
            refetch();
          },
          onError: () => {
            toast.error("Failed to update milestone.");
          },
        }
      );
    } else {
      createExp.mutate(command, {
        onSuccess: () => {
          toast.success("Milestone created successfully!");
          setIsModalOpen(false);
          refetch();
        },
        onError: () => {
          toast.error("Failed to create milestone.");
        },
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-cream">Manage Career Timeline</h1>
          <p className="text-brand-cream/60">CRUD operations for your professional and educational milestones.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="btn-primary flex items-center gap-2 text-sm cursor-pointer shadow-[0_0_15px_rgba(0,173,181,0.2)]"
        >
          <Plus size={18} />
          Add Milestone
        </button>
      </div>

      {/* Timeline List */}
      {isLoading ? (
        <div className="flex h-40 items-center justify-center text-brand-teal">
          <Loader2 className="animate-spin mr-2" size={24} />
          <span>Loading career timeline...</span>
        </div>
      ) : experiences.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-brand-teal/20 rounded-2xl bg-brand-blue/5">
          <p className="text-brand-cream/60 text-lg">No milestones added to the timeline yet.</p>
        </div>
      ) : (
        <div className="space-y-6 max-w-3xl ">
          {experiences.map((exp) => {
            const startYear = exp.startDate ? new Date(exp.startDate).getFullYear() : "";
            const endYear = exp.isCurrent ? "Present" : exp.endDate ? new Date(exp.endDate).getFullYear() : "";

            return (
              <div
                key={exp.id}
                className="border border-brand-teal/20 bg-brand-blue/10 rounded-2xl p-6 backdrop-blur-sm shadow-brand-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-brand-teal/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-brand-teal font-semibold bg-brand-teal/10 px-2.5 py-1 rounded">
                      <Calendar size={12} />
                      {startYear} - {endYear}
                    </span>
                    {exp.location && (
                      <span className="text-xs text-brand-cream/50 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                        {exp.location}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-brand-cream">{exp.title}</h3>
                  <h4 className="text-sm font-semibold text-brand-cream/70">{exp.organization}</h4>
                  <p className="text-sm text-brand-cream/80 leading-relaxed max-w-xl">{exp.description}</p>
                </div>
                <div className="flex gap-2 self-end sm:self-start">
                  <button
                    onClick={() => handleOpenEditModal(exp)}
                    className="p-2 bg-brand-teal/10 hover:bg-brand-teal/20 text-brand-teal rounded border border-brand-teal/20 transition-colors cursor-pointer"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="p-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 rounded border border-red-500/20 transition-colors cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-brand-teal/20 rounded-2xl w-full max-w-lg p-8 shadow-brand relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-brand-cream/60 hover:text-brand-teal cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-brand-teal mb-6">
              {editingExperience ? "Edit Experience Milestone" : "Add Experience Milestone"}
            </h2>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Milestone / Role Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Senior Backend Engineer"
                  className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                />
              </div>

              {/* Organization */}
              <div>
                <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Organization / Company</label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  required
                  placeholder="e.g. IEEE / Freelance"
                  className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Location (Optional)</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Cairo, Egypt (Remote)"
                  className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Description / Highlights</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  placeholder="Summarize key tasks, metrics, or studies..."
                  className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Start Date */}
                <div>
                  <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                  />
                </div>

                {/* End Date */}
                {!isCurrent && (
                  <div>
                    <label className="block text-sm font-semibold text-brand-cream/80 mb-2">End Date</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required={!isCurrent}
                      className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Is Current Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isCurrent"
                  checked={isCurrent}
                  onChange={(e) => setIsCurrent(e.target.checked)}
                  className="rounded border-brand-teal/30 bg-[var(--card-bg)] text-brand-teal focus:ring-brand-teal h-4 w-4"
                />
                <label htmlFor="isCurrent" className="text-sm font-semibold text-brand-cream/80 select-none cursor-pointer">
                  I currently work or study here
                </label>
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
                  disabled={createExp.isPending || updateExp.isPending}
                  className="btn-primary text-sm font-bold cursor-pointer"
                >
                  {createExp.isPending || updateExp.isPending ? "Saving..." : "Save Milestone"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
