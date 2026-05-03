import { type JSX } from "react";
import { GitBranchIcon } from "lucide-react";
export default function Blog(): JSX.Element {
  const highlightRepos = [
    {
      name: "E-Commerce FullStack (.NET&React)",
      description:
        "Scalable RESTful API with authentication, role-based access, and SQL Server.",
      tech: [
        ".NET",
        "C#",
        "SQL Server",
        "JWT",
        "EFCore",
        "Clean Architecture",
        "DDD",
      ],
      url: "https://github.com/ahmedragab13579/E-Commerce",
    },
    {
      name: "Security Labs & Playgrounds",
      description:
        "Hands-on security exercises inspired by Google Cybersecurity specialization.",
      tech: [
        "Linux",
        "Security",
        "SIEM ",
        "Python Scripting",
        "Network Analysis",
      ],
      url: "https://github.com/ahmedragab13579",
    },
    {
      name: "Algorithms & Data Structures",
      description:
        "Collection of problem-solving exercises in C# and Python from courses and practice.",
      tech: ["C#", "Python", "DSA", "C++", "Data Structure", "Algorithms"],
      url: "https://github.com/ahmedragab13579",
    },
  ];

  return (
    <section id="blog" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">GitHub & Open Source</h2>

        <p className="animate-slide-up text-brand-cream/80 mx-auto mb-12 max-w-2xl text-center text-lg">
          Instead of placeholder blog posts, here’s a snapshot of my real
          projects and GitHub activity.
        </p>

        <div className="animate-slide-up grid gap-8 md:grid-cols-3">
          {highlightRepos.map((repo) => (
            <article
              key={repo.name}
              className="card-luxury group flex flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 pt-6">
                <h3 className="text-brand-cream group-hover:text-brand-teal mb-3 text-xl font-bold transition-colors">
                  {repo.name}
                </h3>
                <GitBranchIcon className="text-brand-teal" size={20} />
              </div>

              <div className="flex-1 px-6 pb-4">
                <p className="text-brand-cream/80 mb-4 leading-relaxed">
                  {repo.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {repo.tech.map((tag) => (
                    <span
                      key={tag}
                      className="border-brand-teal/20 bg-brand-dark/50 text-brand-cream/90 rounded-full border px-3 py-1 text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto px-6 pb-6">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-teal hover:text-brand-cream inline-flex w-full items-center justify-center gap-2 font-semibold transition-colors"
                >
                  View on GitHub
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="animate-fade-in border-brand-teal/30 from-brand-blue to-brand-dark text-brand-cream mt-12 rounded-lg border bg-linear-to-r p-8 text-center">
          <h3 className="mb-3 text-2xl font-bold">See More on GitHub</h3>
          <p className="text-brand-cream/80 mb-6">
            Explore repositories, contributions, and ongoing experiments on my
            GitHub profile.
          </p>
          <a
            href="https://github.com/ahmedragab13579"
            target="_blank"
            rel="noopener noreferrer"
            className="target"
          >
            <GitBranchIcon size={20} />
            Visit GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}
