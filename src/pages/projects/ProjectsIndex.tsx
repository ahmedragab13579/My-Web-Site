import { useState, type JSX } from "react";
import { useProjects } from "../../BackEndIntegration/Hooks/Queries/useProjectsQueries";
import { useSkills } from "../../BackEndIntegration/Hooks/Queries/useSkillsQueries";
import type { ProjectType } from "../../BackEndIntegration/Types/Enums";
import { Eye, Heart, BookOpen, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { GitBranchIconIcon } from "../../components/Icons";

export default function ProjectsIndex(): JSX.Element {
  const [page, setPage] = useState(1);
  const [selectedType, setSelectedType] = useState<ProjectType | "">("");
  const [selectedSkill, setSelectedSkill] = useState<number | "">("");

  // Fetch projects list dynamically based on selected filters and page
  const { data: pagedResult, isLoading } = useProjects(
    page,
    6, // Page size
    undefined, // isFeatured (undefined gets all)
    selectedSkill ? Number(selectedSkill) : undefined,
    selectedType || undefined
  );

  // Fetch skills to populate the tech stack filter dropdown
  const { data: skills = [] } = useSkills();

  const projects = pagedResult?.items || [];
  const totalPages = pagedResult?.totalPages || 1;

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value as ProjectType | "");
    setPage(1); // Reset to page 1 on filter change
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSkill(e.target.value ? Number(e.target.value) : "");
    setPage(1); // Reset to page 1 on filter change
  };

  const projectTypes: ProjectType[] = ["Personal", "Freelance", "Enterprise", "OpenSource"];

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold md:text-5xl mb-4 gradient-text">
            My Portfolio Projects
          </h1>
          <p className="text-brand-cream/80 max-w-2xl mx-auto text-lg">
            A showcase of my engineering work, backend services, and full-stack solutions.
          </p>
        </div>

        {/* Filters Panel */}
        <div className="border-brand-teal/20 bg-brand-blue/10 border rounded-2xl p-6 mb-12 backdrop-blur-sm flex flex-col md:flex-row gap-4 items-center justify-between shadow-brand-sm">
          <div className="flex items-center gap-2 text-brand-teal font-semibold text-lg">
            <Search size={20} />
            Filter Projects
          </div>
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            {/* Filter by Type */}
            <div className="flex-1 md:flex-initial">
              <select
                value={selectedType}
                onChange={handleTypeChange}
                className="w-full border-brand-teal/30 bg-[var(--card-bg)] text-brand-cream rounded-lg border px-4 py-2.5 focus:border-brand-teal focus:outline-none transition-colors"
              >
                <option value="">All Project Types</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Tech Stack */}
            <div className="flex-1 md:flex-initial">
              <select
                value={selectedSkill}
                onChange={handleSkillChange}
                className="w-full border-brand-teal/30 bg-[var(--card-bg)] text-brand-cream rounded-lg border px-4 py-2.5 focus:border-brand-teal focus:outline-none transition-colors"
              >
                <option value="">All Technologies</option>
                {skills.map((skill) => (
                  <option key={skill.id} value={skill.id}>
                    {skill.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse card-luxury flex flex-col h-[400px] !p-0">
                <div className="bg-brand-teal/10 w-full h-48 mb-6"></div>
                <div className="px-6 pb-6 space-y-4 flex-1">
                  <div className="h-6 bg-brand-teal/20 rounded w-2/3"></div>
                  <div className="h-4 bg-brand-teal/10 rounded w-full"></div>
                  <div className="h-4 bg-brand-teal/10 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-brand-teal/20 rounded-2xl bg-brand-blue/5">
            <p className="text-brand-cream/60 text-lg">No projects match the selected criteria.</p>
            <button
              onClick={() => {
                setSelectedType("");
                setSelectedSkill("");
                setPage(1);
              }}
              className="mt-4 px-6 py-2.5 bg-brand-teal text-brand-dark font-semibold rounded-lg hover:bg-brand-cream transition-all duration-300"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => {
                const year = project.createdAt
                  ? new Date(project.createdAt).getFullYear()
                  : "";

                return (
                  <article
                    key={project.id}
                    className="card-luxury group flex flex-col overflow-hidden !p-0 relative"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-brand-blue/30">
                      {project.thumbnailUrl ? (
                        <img
                          src={project.thumbnailUrl}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-brand-teal/40">
                          <BookOpen size={48} />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <span className="border-brand-teal/30 bg-[var(--card-bg)]/80 text-brand-teal rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md">
                          {project.type}
                        </span>
                        {year && (
                          <span className="border-brand-teal/30 bg-[var(--card-bg)]/80 text-brand-cream rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md">
                            {year}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      {/* Views & Likes stats */}
                      <div className="mb-3 flex items-center gap-4 text-xs text-brand-cream/60">
                        <span className="flex items-center gap-1">
                          <Eye size={12} className="text-brand-teal" />
                          {project.viewsCount} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={12} className="text-brand-teal" />
                          {project.likesCount} likes
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-brand-cream group-hover:text-brand-teal mb-3 text-xl font-bold transition-colors">
                        <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                      </h3>

                      {/* Short description */}
                      <p className="text-brand-cream/80 mb-4 line-clamp-3 text-sm leading-relaxed">
                        {project.shortDescription}
                      </p>

                      {/* Tech stack tags */}
                      {project.skills && project.skills.length > 0 && (
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-1.5">
                            {project.skills.slice(0, 3).map((skill) => (
                              <span
                                key={skill.id}
                                className="border-brand-teal/20 bg-[var(--card-bg)]/50 text-brand-cream/90 rounded-full border px-2 py-0.5 text-2xs font-medium"
                              >
                                {skill.name}
                              </span>
                            ))}
                            {project.skills.length > 3 && (
                              <span className="text-brand-cream/60 text-2xs font-semibold self-center ml-1">
                                +{project.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Links */}
                      <div className="border-brand-teal/10 mt-auto flex gap-2 border-t pt-4">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-brand-teal/10 border border-brand-teal/30 text-brand-teal hover:bg-brand-teal hover:text-brand-dark flex flex-1 items-center justify-center gap-1 rounded-md py-2 text-xs font-semibold transition-all duration-300"
                          >
                            <GitBranchIconIcon size={12} />
                            Code
                          </a>
                        )}
                        <Link
                          to={`/projects/${project.slug}`}
                          className="bg-brand-teal text-brand-dark hover:bg-brand-cream flex flex-1 items-center justify-center rounded-md py-2 text-xs font-semibold transition-all duration-300"
                        >
                          Details
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
