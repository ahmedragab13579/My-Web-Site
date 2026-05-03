import { type JSX } from "react";
import {
  DatabaseIcon,
  MessageSquareIcon,
  UsersIcon,
  CheckCircleIcon,
  GitBranchIconIcon,
  ExternalLinkIcon,
} from "./Icons";

export default function Experience(): JSX.Element {
  const projects = [
    {
      title: "E-Commerce Platform",
      subtitle: "ITI Full Stack Training Project",
      role: "Backend Developer",
      description:
        "A comprehensive e-commerce solution built during ITI training, showcasing advanced backend architecture and microservices patterns.",
      highlights: [
        {
          Icon: DatabaseIcon,
          title: "Redis Caching",
          description:
            "Implemented intelligent caching layer for optimized performance and reduced database load.",
        },
        {
          Icon: MessageSquareIcon,
          title: "RabbitMQ Integration",
          description:
            "Built asynchronous message processing for order management and notification systems.",
        },
        {
          Icon: CheckCircleIcon,
          title: "API Architecture",
          description:
            "Designed RESTful APIs with proper error handling, validation, and scalability patterns.",
        },
      ],
      technologies: [
        "C#",
        "ASP.NET Core",
        "SQL Server",
        "Redis",
        "RabbitMQ",
        "Entity Framework",
      ],
      github: "https://github.com/ahmedragab13579/E-Commerce",
      year: "2025",
    },
    {
      title: "HR Management System",
      subtitle: "IEEE Beni Suef Project",
      role: "Backend Committee Member",
      description:
        "A robust HR system developed in collaboration with IEEE members, emphasizing quality testing and team collaboration.",
      highlights: [
        {
          Icon: UsersIcon,
          title: "Team Collaboration",
          description:
            "Worked in agile teams with clear communication, code reviews, and knowledge sharing sessions.",
        },
        {
          Icon: MessageSquareIcon,
          title: "Email Integration",
          description:
            "Implemented SMTP-based email notifications for HR events, approvals, and communications.",
        },
        {
          Icon: CheckCircleIcon,
          title: "Unit Testing",
          description:
            "Developed comprehensive test suites ensuring code reliability and system integrity.",
        },
      ],
      technologies: [
        "C#",
        "ASP.NET MVC",
        "SQL Server",
        "SMTP",
        "NUnit",
        "SOLID Principles",
      ],
      github: "https://github.com/IEEE-Beni-Suef/hr-system",
      year: "2026",
    },
    {
      title: "EcoBridge System",
      subtitle: "IEEE Beni Suef Project",
      role: "Backend Committee Team Leader",
      description:
        "The Project developed in collaboration with IEEE Tunisia FrontEnd Branch, emphasizing quality testing and team collaboration.",
      highlights: [
        {
          Icon: UsersIcon,
          title: "Leading The Team",
          description:
            "Worked in agile teams with clear communication, code reviews, and knowledge sharing sessions.",
        },
        {
          Icon: DatabaseIcon,
          title: "DataBase Integration",
          description: "Implemented DataBase Services With Migrations .",
        },
        {
          Icon: CheckCircleIcon,
          title: "Unit Testing",
          description:
            "Developed comprehensive test suites ensuring code reliability and system integrity.",
        },
      ],
      technologies: [
        "C#",
        "Clean Architecture",
        "Monster.Asp",
        "SQL Server",
        "NUnit",
        "SOLID Principles",
      ],
      github: "https://github.com/ahmedragab13579/EcoBridge_Project",
      year: "2026",
    },
  ];

  return (
    <section id="experience" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">Featured Projects</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
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
                      {project.subtitle}
                    </p>
                  </div>
                  <span className="border-brand-teal/30 bg-brand-teal/20 text-brand-teal rounded-full border px-3 py-1 text-xs font-semibold">
                    {project.year}
                  </span>
                </div>
                <p className="text-brand-cream/90 font-medium">
                  Role: {project.role}
                </p>
              </div>

              {/* Description */}
              <p className="text-brand-cream/80 mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Highlights */}
              <div className="mb-8 space-y-4">
                {project.highlights.map((highlight) => (
                  <div key={highlight.title} className="flex items-start gap-4">
                    <div className="mt-1 flex-shrink-0">
                      <highlight.Icon className="text-brand-teal" size={20} />
                    </div>
                    <div>
                      <p className="text-brand-cream mb-1 font-semibold">
                        {highlight.title}
                      </p>
                      <p className="text-brand-cream/70 text-sm">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <p className="text-brand-teal mb-3 text-sm font-semibold">
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="border-brand-teal/30 bg-brand-dark/50 text-brand-cream/90 rounded-full border px-3 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="border-brand-teal/30 mt-auto flex gap-3 border-t pt-6">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code on GitHub`}
                  className="bg-brand-teal text-brand-cream hover:bg-brand-teal/80 flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-3 font-semibold transition-all duration-300"
                >
                  <GitBranchIconIcon size={16} />
                  View Code
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-brand-cream flex flex-1 items-center justify-center gap-2 rounded-md border-2 px-4 py-3 font-semibold transition-all duration-300"
                >
                  <ExternalLinkIcon size={16} />
                  GitHub
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
