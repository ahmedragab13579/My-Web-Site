import { useState, type JSX } from "react";
import { useSkills } from "../../BackEndIntegration/Hooks/Queries/useSkillsQueries";
import { useCreateSkill, useUpdateSkill, useDeleteSkill } from "../../BackEndIntegration/Hooks/Mutations/useSkillsMutations";
import type { SkillCategory } from "../../BackEndIntegration/Types/Enums";
import { Plus, Edit, Trash2, X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function AdminSkills(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<any>(null);

  // Form states
  const [name, setName] = useState("");
  const [category, setCategory] = useState<SkillCategory>("Backend");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [iconUrl, setIconUrl] = useState("");

  // Fetch skills
  const { data: skills = [], isLoading, refetch } = useSkills();

  // Mutations
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();

  const handleOpenAddModal = () => {
    setEditingSkill(null);
    setName("");
    setCategory("Backend");
    setDisplayOrder(1);
    setIconUrl("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (skill: any) => {
    setEditingSkill(skill);
    setName(skill.name || "");
    setCategory(skill.category || "Backend");
    setDisplayOrder(skill.displayOrder || 1);
    setIconUrl(skill.iconUrl || "");
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      deleteSkill.mutate(id, {
        onSuccess: () => {
          toast.success("Skill deleted successfully!");
          refetch();
        },
        onError: () => {
          toast.error("Failed to delete skill.");
        },
      });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const command = {
      name,
      category,
      displayOrder: Number(displayOrder),
      iconUrl: iconUrl || null,
    };

    if (editingSkill) {
      updateSkill.mutate(
        { id: editingSkill.id, command },
        {
          onSuccess: () => {
            toast.success("Skill updated successfully!");
            setIsModalOpen(false);
            refetch();
          },
          onError: () => {
            toast.error("Failed to update skill.");
          },
        }
      );
    } else {
      createSkill.mutate(command, {
        onSuccess: () => {
          toast.success("Skill created successfully!");
          setIsModalOpen(false);
          refetch();
        },
        onError: () => {
          toast.error("Failed to create skill.");
        },
      });
    }
  };

  // Group skills by category for better display in the admin view
  const groupedSkills = skills.reduce<Record<string, any[]>>((acc, skill) => {
    const cat = skill.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  const categories: SkillCategory[] = [
    "Backend",
    "Frontend",
    "Database",
    "DevOps",
    "Architecture",
    "Tools",
    "SoftSkills",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-brand-cream">Manage Skills</h1>
          <p className="text-brand-cream/60">CRUD operations and display ordering for tech skills.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="btn-primary flex items-center gap-2 text-sm cursor-pointer shadow-[0_0_15px_rgba(0,173,181,0.2)]"
        >
          <Plus size={18} />
          Add New Skill
        </button>
      </div>

      {/* Grid categories panel */}
      {isLoading ? (
        <div className="flex h-40 items-center justify-center text-brand-teal">
          <Loader2 className="animate-spin mr-2" size={24} />
          <span>Loading skills directory...</span>
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-brand-teal/20 rounded-2xl bg-brand-blue/5">
          <p className="text-brand-cream/60 text-lg">No skills added yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
          {categories.map((catKey) => {
            const catSkills = groupedSkills[catKey] || [];
            if (catSkills.length === 0) return null;

            return (
              <div
                key={catKey}
                className="border border-brand-teal/20 bg-brand-blue/10 rounded-2xl p-6 backdrop-blur-sm shadow-brand-sm"
              >
                <h3 className="text-brand-teal font-bold text-lg mb-4 pb-2 border-b border-brand-teal/10">
                  {catKey}
                </h3>
                <div className="space-y-3">
                  {catSkills
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between bg-[var(--bg-main)]/40 border border-brand-teal/5 p-3 rounded-lg hover:border-brand-teal/20 transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          {skill.iconUrl && (
                            <img
                              src={skill.iconUrl}
                              alt={skill.name}
                              className="w-5 h-5 object-contain"
                            />
                          )}
                          <span className="text-brand-cream font-medium text-sm">{skill.name}</span>
                          <span className="text-brand-cream/40 text-[10px]">({skill.displayOrder})</span>
                        </div>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(skill)}
                            className="p-1 text-brand-teal hover:bg-brand-teal/10 rounded"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(skill.id)}
                            className="p-1 text-red-400 hover:bg-red-500/10 rounded"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[var(--card-bg)] border border-brand-teal/20 rounded-2xl w-full max-w-md p-8 shadow-brand relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-brand-cream/60 hover:text-brand-teal cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-brand-teal mb-6">
              {editingSkill ? "Edit Skill" : "Add New Skill"}
            </h2>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Skill Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. C# / React"
                  className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SkillCategory)}
                  className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Display Order (Sorting)</label>
                <input
                  type="number"
                  value={displayOrder}
                  onChange={(e) => setDisplayOrder(Number(e.target.value))}
                  required
                  min={1}
                  className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                />
              </div>

              {/* Icon URL */}
              <div>
                <label className="block text-sm font-semibold text-brand-cream/80 mb-2">Icon Image URL</label>
                <input
                  type="text"
                  value={iconUrl}
                  onChange={(e) => setIconUrl(e.target.value)}
                  placeholder="https://cdn.jsdelivr.net/..."
                  className="w-full border border-brand-teal/30 bg-[var(--card-bg)] rounded-lg px-4 py-2.5 text-brand-cream focus:border-brand-teal focus:outline-none"
                />
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
                  disabled={createSkill.isPending || updateSkill.isPending}
                  className="btn-primary text-sm font-bold cursor-pointer"
                >
                  {createSkill.isPending || updateSkill.isPending ? "Saving..." : "Save Skill"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
