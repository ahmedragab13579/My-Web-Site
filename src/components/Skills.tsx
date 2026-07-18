import { type JSX } from "react";
import { useSkills } from "../BackEndIntegration/Hooks/Queries/useSkillsQueries";
import { ServerIcon, LockIcon, CodeIcon } from "./Icons";
import type { SkillCategory } from "../BackEndIntegration/Types/Enums";

const CATEGORY_METADATA: Record<SkillCategory, { name: string; Icon: any }> = {
  Backend: { name: "Backend Development", Icon: ServerIcon },
  Frontend: { name: "Frontend Development", Icon: CodeIcon },
  Database: { name: "Database & Storage", Icon: ServerIcon },
  Architecture: { name: "Architecture & Design", Icon: ServerIcon },
  DevOps: { name: "Security & DevOps", Icon: LockIcon },
  Tools: { name: "Tools & Utilities", Icon: CodeIcon },
  SoftSkills: { name: "Soft Skills", Icon: CodeIcon },
};

export default function Skills(): JSX.Element {
  const { data: skills = [], isLoading } = useSkills();

  // Group skills by category
  const groupedSkills = skills.reduce<Partial<Record<SkillCategory, typeof skills>>>((acc, skill) => {
    const cat = skill.category;
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat]!.push(skill);
    return acc;
  }, {});

  // Predefined category key order
  const categoryKeys: SkillCategory[] = [
    "Backend",
    "Frontend",
    "Database",
    "DevOps",
    "Architecture",
    "Tools",
    "SoftSkills",
  ];

  if (isLoading) {
    return (
      <section id="skills" className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="section-title text-center">Technical Skills</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse border-brand-teal/20 bg-brand-blue/10 rounded-2xl border p-8 h-64"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-brand-teal/10 rounded-xl p-3 w-12 h-12"></div>
                  <div className="h-6 w-32 bg-brand-teal/20 rounded"></div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="h-8 w-20 bg-brand-teal/10 rounded-lg"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title text-center">Technical Skills</h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categoryKeys.map((catKey) => {
            const catSkills = groupedSkills[catKey];
            if (!catSkills || catSkills.length === 0) return null;
            const metadata = CATEGORY_METADATA[catKey];

            return (
              <div
                key={catKey}
                className="group border-brand-teal/20 bg-brand-blue/10 hover:border-brand-teal/50 hover:bg-brand-blue/20 hover:shadow-brand relative overflow-hidden rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
              >
                {/* Glow Effect */}
                <div className="bg-brand-teal/10 group-hover:bg-brand-teal/20 absolute -top-6 -right-6 h-32 w-32 rounded-full blur-3xl transition-all duration-500"></div>

                <div className="relative z-10 mb-8 flex items-center gap-4">
                  <div className="bg-brand-teal/10 text-brand-teal group-hover:bg-brand-teal/20 rounded-xl p-3 transition-transform duration-300 group-hover:scale-110">
                    <metadata.Icon size={32} />
                  </div>
                  <h3 className="text-brand-cream text-2xl font-bold">
                    {metadata.name}
                  </h3>
                </div>

                <div className="relative z-10 flex flex-wrap gap-2.5">
                  {catSkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="bg-[var(--card-bg)]/50 text-brand-cream/80 hover:bg-brand-teal/20 hover:text-brand-cream flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors duration-300"
                    >
                      {skill.iconUrl && (
                        <img
                          src={skill.iconUrl}
                          alt={`${skill.name} logo`}
                          className="h-4 w-4 object-contain"
                          loading="lazy"
                        />
                      )}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
