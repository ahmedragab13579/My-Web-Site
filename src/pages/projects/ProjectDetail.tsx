import { useEffect, useState, type JSX } from "react";
import { useParams, Link } from "react-router-dom";
import { useProjectBySlug } from "../../BackEndIntegration/Hooks/Queries/useProjectsQueries";
import { useLikeProject, useViewProject } from "../../BackEndIntegration/Hooks/Mutations/useProjectsMutations";
import { Eye, Heart, Calendar, ExternalLink, GitBranch, ArrowLeft, Layers } from "lucide-react";
import { toast } from "react-toastify";

export default function ProjectDetail(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();

  // Fetch project details by slug
  const { data: project, isLoading, error } = useProjectBySlug(slug || "");

  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const incrementView = useViewProject();
  const likeProject = useLikeProject();

  // Synchronize dynamic likesCount when project is loaded
  useEffect(() => {
    if (project) {
      setLikesCount(project.likesCount);
    }
  }, [project]);

  // Increment views once on mount when project is successfully loaded
  useEffect(() => {
    if (project?.id) {
      incrementView.mutate(project.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.id]);

  const handleLike = () => {
    if (project?.id && !hasLiked) {
      setHasLiked(true);
      setLikesCount((prev) => prev + 1);
      
      likeProject.mutate(project.id, {
        onSuccess: () => {
          toast.success("Thank you for liking this project!");
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
        <div className="animate-pulse flex flex-col items-center w-full max-w-3xl">
          <div className="h-10 bg-brand-teal/20 rounded w-1/2 mb-6"></div>
          <div className="h-6 bg-brand-teal/10 rounded w-1/4 mb-12"></div>
          <div className="h-64 bg-brand-blue/30 rounded w-full mb-8"></div>
          <div className="h-4 bg-brand-teal/10 rounded w-full mb-4"></div>
          <div className="h-4 bg-brand-teal/10 rounded w-5/6 mb-4"></div>
          <div className="h-4 bg-brand-teal/10 rounded w-4/5 mb-4"></div>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col items-center justify-center transition-colors duration-300">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Project Not Found</h2>
        <Link to="/projects" className="target inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    );
  }

  const year = project.createdAt ? new Date(project.createdAt).getFullYear() : "";

  return (
    <div className="min-h-screen py-32 px-4 sm:px-6 lg:px-8 bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
      <div className="mx-auto max-w-4xl">
        {/* Back Link */}
        <Link to="/projects" className="inline-flex items-center gap-2 text-brand-teal hover:underline mb-8 font-semibold">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>

        {/* Header */}
        <div className="border-b border-brand-teal/20 pb-8 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-cream font-sans">
              {project.title}
            </h1>
            <div className="flex items-center gap-2">
              <span className="border-brand-teal/30 bg-brand-teal/15 text-brand-teal rounded-full border px-3.5 py-1 text-sm font-semibold">
                {project.type}
              </span>
              {year && (
                <span className="border-brand-teal/30 bg-brand-blue/30 text-brand-cream rounded-full border px-3.5 py-1 text-sm font-semibold">
                  {year}
                </span>
              )}
            </div>
          </div>

          {/* Project Stats */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-brand-cream/60">
            <span className="flex items-center gap-1.5">
              <Eye size={16} className="text-brand-teal" />
              {project.viewsCount} Views
            </span>
            <span className="flex items-center gap-1.5">
              <Heart size={16} className="text-brand-teal" />
              {likesCount} Likes
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={16} className="text-brand-teal" />
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Gallery / Thumbnail */}
        <div className="card-luxury overflow-hidden !p-0 mb-12 border border-brand-teal/20">
          <div className="relative aspect-video w-full overflow-hidden bg-brand-blue/20">
            {project.thumbnailUrl ? (
              <img
                src={project.thumbnailUrl}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-brand-teal/30">
                <Layers size={64} />
              </div>
            )}
          </div>
        </div>

        {/* Layout details */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-brand-teal mb-4">Project Overview</h2>
              <p className="text-brand-cream/90 text-lg leading-relaxed mb-6 font-medium">
                {project.shortDescription}
              </p>
              <div 
                className="text-brand-cream/80 leading-relaxed text-base whitespace-pre-wrap bg-brand-blue/5 border border-brand-teal/10 rounded-xl p-6 font-sans"
              >
                {project.fullDescription}
              </div>
            </div>
          </div>

          {/* Meta Specifications */}
          <div className="space-y-8">
            {/* Tech Stack */}
            {project.skills && project.skills.length > 0 && (
              <div className="border border-brand-teal/20 bg-brand-blue/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-brand-teal mb-4 border-b border-brand-teal/10 pb-2">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="border border-brand-teal/20 bg-[var(--card-bg)]/50 text-brand-cream/90 rounded px-2.5 py-1 text-xs font-semibold"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Project Access */}
            <div className="border border-brand-teal/20 bg-brand-blue/10 rounded-xl p-6 flex flex-col gap-4">
              <h3 className="text-lg font-bold text-brand-teal border-b border-brand-teal/10 pb-2">
                Links & Code
              </h3>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-teal text-brand-dark hover:bg-brand-cream flex items-center justify-center gap-2 rounded-lg py-3 font-semibold transition-colors cursor-pointer"
                >
                  <GitBranch size={18} />
                  GitHub Repository
                </a>
              )}
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-brand-dark flex items-center justify-center gap-2 rounded-lg border-2 py-3 font-semibold transition-colors cursor-pointer"
                >
                  <ExternalLink size={18} />
                  Live Demo Link
                </a>
              )}
              <button
                onClick={handleLike}
                disabled={likeProject.isPending || hasLiked}
                className="border border-red-500/35 hover:border-red-500 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center gap-2 rounded-lg py-3 font-semibold transition-all disabled:opacity-50 cursor-pointer"
              >
                <Heart size={18} />
                {hasLiked ? "Liked" : likeProject.isPending ? "Liking..." : "Like Project"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
