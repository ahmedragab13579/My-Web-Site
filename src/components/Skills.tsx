import { type JSX } from "react";
import { ServerIcon, LockIcon, CodeIcon } from "./Icons";

export default function Skills(): JSX.Element {
  const skillCategories = [
    {
      name: "Backend Development",
      Icon: ServerIcon,
      skills: [
        {
          name: "C# & .NET Core",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
        },
        {
          name: "ASP.NET Web API",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg",
        },
        {
          name: "ASP.NET MVC",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg",
        },
        {
          name: "SQL Server",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
        },
        {
          name: "Entity Framework",
          icon: "https://cdn.simpleicons.org/dotnet/512BD4", // أيقونة .NET كبديل
        },
        {
          name: "Redis Caching",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
        },
        {
          name: "RabbitMQ",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg",
        },
        {
          name: "Docker",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        },
        {
          name: "Agile",
          // أيقونة Trello كبديل مناسب يعبر عن الأجايل وإدارة المهام
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/trello/trello-plain.svg",
        },
      ],
    },
    {
      name: "Security & DevOps",
      Icon: LockIcon,
      skills: [
        {
          name: "Cybersecurity",
          // أيقونة درع حماية عامة من مكتبة Bootstrap Icons
          icon: "https://cdn.simpleicons.org/cloudflare/F38020",
        },
        {
          name: "OWASP Principles",
          icon: "https://cdn.simpleicons.org/owasp/white",
        },
        {
          name: "Authentication",
          // أيقونة مفتاح أو قفل تعبر عن الـ Auth
          icon: "https://cdn.simpleicons.org/auth0/EB5424",
        },
        {
          name: "Data Encryption",
          // أيقونة تعبر عن التشفير (استخدمنا أيقونة Let's Encrypt كدلالة)
          icon: "https://cdn.simpleicons.org/letsencrypt/003A70",
        },
        {
          name: "Network Security",
          // أيقونة شبكة أو سيرفر محمي
          icon: "https://cdn.simpleicons.org/cisco/1BA0D7",
        },
        {
          name: "Security Testing",
          // أيقونة تعبر عن الفحص والاختبار
          icon: "https://cdn.simpleicons.org/sonarqube/4E9BCD",
        },
      ],
    },
    {
      name: "FrontEnd",
      Icon: CodeIcon,
      skills: [
        {
          name: "React",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        },
        {
          name: "Next.js",
          icon: "https://cdn.simpleicons.org/nextdotjs/white", // استخدمنا الأبيض عشان يظهر على الخلفية الغامقة
        },
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        },
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        },
        {
          name: "Tailwind CSS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        },
        {
          name: "Vite",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
        },
        {
          name: "React-Query",
          icon: "https://cdn.simpleicons.org/reactquery/FF4154",
        },
      ],
    },
  ];

  return (
    <section id="skills" className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title text-center">Technical Skills</h2>

        <div className="animate-slide-up mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="group border-brand-teal/20 bg-brand-blue/10 hover:border-brand-teal/50 hover:bg-brand-blue/20 hover:shadow-brand relative overflow-hidden rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            >
              {/* تأثير الإضاءة */}
              <div className="bg-brand-teal/10 group-hover:bg-brand-teal/20 absolute -top-6 -right-6 h-32 w-32 rounded-full blur-3xl transition-all duration-500"></div>

              <div className="relative z-10 mb-8 flex items-center gap-4">
                <div className="bg-brand-teal/10 text-brand-teal group-hover:bg-brand-teal/20 rounded-xl p-3 transition-transform duration-300 group-hover:scale-110">
                  <category.Icon size={32} />
                </div>
                <h3 className="text-brand-cream text-2xl font-bold">
                  {category.name}
                </h3>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2.5">
                {category.skills.map((skill) =>
                  skill.name ? (
                    <span
                      key={skill.name}
                      className="bg-brand-dark/40 text-brand-cream/80 hover:bg-brand-teal/20 hover:text-brand-cream flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors duration-300"
                    >
                      {/* لو في أيقونة، هيتم عرضها هنا جنب الاسم */}
                      {skill.icon && (
                        <img
                          src={skill.icon}
                          alt={`${skill.name} logo`}
                          className="h-4 w-4 object-contain"
                          loading="lazy"
                        />
                      )}
                      {skill.name}
                    </span>
                  ) : null,
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
