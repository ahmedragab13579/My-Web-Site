import { type JSX } from "react";
import { useExperiences } from "../BackEndIntegration/Hooks/Queries/useExperiencesQueries";
import { Calendar, MapPin, Briefcase } from "lucide-react";

export default function Experience(): JSX.Element {
  const { data: experiences = [], isLoading } = useExperiences();

  // Sort experiences: current first, then by start date descending
  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.isCurrent && !b.isCurrent) return -1;
    if (!a.isCurrent && b.isCurrent) return 1;
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <section id="experience" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="section-title">Work & Education Journey</h2>
          <div className="space-y-8 mt-12">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse card-luxury flex flex-col p-8 gap-4">
                <div className="h-6 bg-brand-teal/20 rounded w-1/3"></div>
                <div className="h-4 bg-brand-teal/10 rounded w-1/4"></div>
                <div className="h-16 bg-brand-teal/5 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="section-title">Work & Education Journey</h2>

        {sortedExperiences.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-brand-teal/20 rounded-xl bg-brand-blue/5">
            <p className="text-brand-cream/60">No experiences listed yet.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-brand-teal/30 ml-4 md:ml-6 space-y-12 py-4">
            {sortedExperiences.map((exp) => {
              const startFormatted = formatDate(exp.startDate);
              const endFormatted = exp.isCurrent ? "Present" : exp.endDate ? formatDate(exp.endDate) : "";

              return (
                <div key={exp.id} className="relative pl-8 md:pl-10 group">
                  {/* Timeline bullet */}
                  <div className="absolute -left-[11px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand-teal bg-[var(--bg-main)] text-brand-teal transition-all duration-300 group-hover:bg-brand-teal group-hover:text-brand-dark shadow-[0_0_10px_rgba(0,245,212,0.2)]">
                    <Briefcase size={10} />
                  </div>

                  {/* Card Container */}
                  <div className="card-luxury p-6 md:p-8 hover:-translate-y-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4 border-b border-brand-teal/10 pb-4">
                      <div>
                        <h3 className="text-xl font-bold text-brand-cream group-hover:text-brand-teal transition-colors">
                          {exp.title}
                        </h3>
                        <p className="text-brand-teal font-semibold text-md">
                          {exp.organization}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-brand-cream/60">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-brand-teal" />
                          {startFormatted} – {endFormatted}
                        </span>
                        {exp.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={14} className="text-brand-teal" />
                            {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-brand-cream/80 text-sm leading-relaxed whitespace-pre-wrap">
                      {exp.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
