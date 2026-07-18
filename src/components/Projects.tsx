import { type JSX } from "react";
import { useProjects } from "../BackEndIntegration/Hooks/Queries/useProjectsQueries";
import { GitBranchIconIcon, ExternalLinkIcon } from "./Icons";
import { Eye, Heart } from "lucide-react";

export default function Projects(): JSX.Element {
  const { data: pagedResult, isLoading } = useProjects(1, 3, true);
  const projects = pagedResult?.items || [];

  if (isLoading) {
    return (
      <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title">Featured Projects</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse card-luxury flex flex-col p-8 h-96">
                <div className="h-6 bg-brand-teal/20 rounded w-2/3 mb-4"></div>
                <div className="h-4 bg-brand-teal/10 rounded w-1/2 mb-6"></div>
                <div className="h-20 bg-brand-teal/5 rounded w-full mb-6"></div>
                <div className="h-8 bg-brand-teal/10 rounded w-full mt-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">Featured Projects</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project) => {
            const year = project.createdAt ? new Date(project.createdAt).getFullYear() : "";
            
            return (
              <article
                key={project.id}
                className="card-luxury flex flex-col p-8"
              >
                {/* Header */}
                <div className="border-brand-teal/30 mb-6 border-b pb-6">
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="text-brand-cream mb-1 text-2xl font-bold">
                        {project.title}
                      </h3>
                      <p className="text-brand-cream/70 mb-2 text-sm">
                        {project.type} Project
                      </p>
                    </div>
                    {year && (
                      <span className="border-brand-teal/30 bg-brand-teal/20 text-brand-teal rounded-full border px-3 py-1 text-xs font-semibold">
                        {year}
                      </span>
                    )}
                  </div>
                  
                  {/* View and Like Stats */}
                  <div className="flex items-center gap-4 text-xs text-brand-cream/60">
                    <span className="flex items-center gap-1">
                      <Eye size={14} className="text-brand-teal/80" />
                      {project.viewsCount} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={14} className="text-brand-teal/80" />
                      {project.likesCount} likes
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-brand-cream/80 mb-6 leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Technologies */}
                {project.skills && project.skills.length > 0 && (
                  <div className="mb-6">
                    <p className="text-brand-teal mb-3 text-sm font-semibold">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span
                          key={skill.id}
                          className="border-brand-teal/30 bg-[var(--card-bg)]/60 text-brand-cream/90 rounded-full border px-3 py-1 text-xs font-medium"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="border-brand-teal/30 mt-auto flex gap-3 border-t pt-6">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-brand-teal text-brand-cream hover:bg-brand-teal/80 flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-3 font-semibold transition-all duration-300"
                    >
                      <GitBranchIconIcon size={16} />
                      View Code
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-brand-cream flex flex-1 items-center justify-center gap-2 rounded-md border-2 px-4 py-3 font-semibold transition-all duration-300"
                    >
                      <ExternalLinkIcon size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
