import { type JSX } from "react";
import { Briefcase, Layers, Zap, ExternalLink, Globe } from "lucide-react";

interface ServicePlatform {
  name: string;
  subtitle: string;
  description: string;
  url: string;
  icon: JSX.Element;
  tag: string;
  glowColor: string;
}

export default function Services(): JSX.Element {
  const platforms: ServicePlatform[] = [
    {
      name: "Mostaql | مستقل",
      subtitle: "Full-scale Software Solutions",
      description: "Hire me for complete web applications, database schema designs, custom .NET backend developments, and comprehensive security reviews.",
      url: "https://mostaql.com/u/ahmed_haridy135",
      icon: <Briefcase size={40} />,
      tag: "Project Contracts",
      glowColor: "from-blue-600 to-cyan-500",
    },
    {
      name: "Khamsat | خمسات",
      subtitle: "Microservices & Task Automation",
      description: "Quick API endpoints, performance tuning, database bug fixes, utility script creation, and individual component development.",
      url: "https://khamsat.com/user/ahmedragabharidy",
      icon: <Layers size={40} />,
      tag: "Micro Tasks",
      glowColor: "from-purple-600 to-indigo-500",
    },
    {
      name: "Wuzzuf",
      subtitle: "Full-time & Enterprise Opportunities",
      description: "View my certified professional corporate employment profile for long-term .NET Backend and Full-Stack Engineering positions in Egypt.",
      url: "https://wuzzuf.net/me/ahmed-ragab-7dca819b21",
      icon: <Globe size={40} />,
      tag: "Career Profile",
      glowColor: "from-sky-600 to-blue-500",
    },
    {
      name: "Bayt",
      subtitle: "Corporate & Regional Career Network",
      description: "Recruitment portal for MENA region contract and full-time senior development positions, fully verified and listing all validated milestones.",
      url: "https://people.bayt.com/ahmed-ragab-91188129",
      icon: <Zap size={40} />,
      tag: "Recruitment Hub",
      glowColor: "from-teal-600 to-emerald-500",
    },
    {
      name: "Forlanso",
      subtitle: "Specialized Consulting & Freelance Gigs",
      description: "Hire me for security advisory services, cybersecurity architecture designs, and high-performance development tasks.",
      url: "https://www.forlanso.com/ar/ahmd-ragab",
      icon: <ExternalLink size={40} />,
      tag: "Consulting",
      glowColor: "from-rose-600 to-orange-500",
    },
  ];

  return (
    <section id="services" className="overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title text-center">My Services & Freelance Hub</h2>
        <p className="text-brand-cream/80 mx-auto mb-16 max-w-2xl text-center text-lg">
          Need a robust .NET backend, a custom React interface, or cybersecurity consulting? Hire me directly on these platforms or view my validated career profiles.
        </p>

        {/* Horizontal Scroll Container (Carousel) */}
        <div className=" relative">
          <div className="from-[var(--bg-main)] pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-12 bg-linear-to-r to-transparent"></div>
          <div className="from-[var(--bg-main)] pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-12 bg-linear-to-l to-transparent"></div>

          <div
            className={`flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pt-4 pb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              platforms.length < 4 ? "lg:justify-center" : ""
            } ${platforms.length < 3 ? "md:justify-center" : ""} ${
              platforms.length === 1 ? "justify-center" : ""
            }`}
          >
            {platforms.map((platform, idx) => (
              <div
                key={idx}
                className="card-luxury flex w-[320px] shrink-0 snap-center flex-col overflow-hidden p-0 transition-transform hover:-translate-y-2 md:w-87.5"
              >
                {/* Banner / Icon Container matching certifications */}
                <div className="border-brand-teal/30 bg-[var(--card-bg)] relative flex h-48 w-full items-center justify-center border-b overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${platform.glowColor} opacity-20 blur-md`}></div>
                  <div className="relative z-10 bg-brand-teal/10 text-brand-teal rounded-2xl p-5 border border-brand-teal/20 transition-transform duration-300 group-hover:scale-110 shadow-[0_0_20px_rgba(0,245,212,0.15)]">
                    {platform.icon}
                  </div>
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider text-brand-teal border border-brand-teal/20 rounded-full px-2.5 py-0.5 backdrop-blur-md">
                    {platform.tag}
                  </span>
                </div>

                {/* Details Section */}
                <div className="flex flex-1 flex-col p-6 text-center">
                  <h3 className="text-brand-cream mb-1 line-clamp-1 text-lg font-bold">
                    {platform.name}
                  </h3>
                  <p className="text-brand-teal mb-4 text-xs font-semibold uppercase tracking-wider">
                    {platform.subtitle}
                  </p>

                  <p className="text-brand-cream/80 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                    {platform.description}
                  </p>

                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-dark border-brand-teal/30 text-brand-cream hover:bg-brand-teal mt-auto flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Hire / View Profile
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
