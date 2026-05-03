import { type JSX } from "react";
import { BookOpen, Code, Shield } from "lucide-react";

export default function About(): JSX.Element {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      {/* شلنا bg-luxury-light لأننا بنعتمد على خلفية الموقع الأساسية */}
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title">About Me</h2>

        <div className="animate-slide-up grid items-center gap-12 md:grid-cols-2">
          {/* Content */}
          <div>
            <p className="text-brand-cream/80 mb-6 text-lg leading-relaxed">
              I'm Ahmed Ragab, a 21-year-old Navigation Science student from
              Sohag, Egypt, with a profound passion for Software Engineering and
              Cybersecurity. My journey blends academic rigor with practical
              expertise, fostering a unique perspective on building secure,
              scalable digital solutions.
            </p>

            <p className="text-brand-cream/80 mb-6 text-lg leading-relaxed">
              Through intensive training at ITI (Information Technology
              Institute), I've mastered Backend .NET Development, specializing
              in backend architecture, database design, and microservices
              patterns using Redis and RabbitMQ. I'm also a dedicated member of
              IEEE, contributing to projects that emphasize teamwork, quality
              assurance, and innovative problem-solving.
            </p>

            <p className="text-brand-cream/80 mb-8 text-lg leading-relaxed">
              My expertise in the Google Cybersecurity Professional Certificate
              equips me with profound knowledge of security protocols, risk
              management, and digital asset protection. I'm driven by the
              mission to create software that not only performs exceptionally
              but also stands resilient against evolving threats.
            </p>

            {/* Skills Highlight */}
            <div className="grid grid-cols-3 gap-4">
              <div className="border-brand-teal/30 bg-brand-blue/30 hover:border-brand-teal/60 rounded-lg border p-6 transition-all duration-300">
                <Code className="text-brand-teal mb-3" size={32} />
                <p className="text-brand-cream mb-1 font-semibold">
                  Development
                </p>
                <p className="text-brand-cream/70 text-sm">.NET</p>
              </div>
              <div className="border-brand-teal/30 bg-brand-blue/30 hover:border-brand-teal/60 rounded-lg border p-6 transition-all duration-300">
                <Shield className="text-brand-teal mb-3" size={32} />
                <p className="text-brand-cream mb-1 font-semibold">Security</p>
                <p className="text-brand-cream/70 text-sm">
                  Cybersecurity Expert
                </p>
              </div>
              <div className="border-brand-teal/30 bg-brand-blue/30 hover:border-brand-teal/60 rounded-lg border p-6 transition-all duration-300">
                <BookOpen className="text-brand-teal mb-3" size={32} />
                <p className="text-brand-cream mb-1 font-semibold">Education</p>
                <p className="text-brand-cream/70 text-sm">
                  Navigation Science
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar with Key Information */}
          <div className="space-y-8">
            {/* Language */}
            <div className="card-luxury border-l-brand-teal border-l-4 p-8">
              <h3 className="text-brand-teal mb-3 text-xl font-bold">
                Language
              </h3>
              <p className="text-brand-cream/90 mb-2">English (B1 Level)</p>
              <p className="text-brand-cream/70 text-sm">
                Professional communication skills with a focus on technical
                documentation and collaborative teamwork.
              </p>
            </div>

            {/* Education */}
            <div className="card-luxury border-l-brand-teal border-l-4 p-8">
              <h3 className="text-brand-teal mb-3 text-xl font-bold">
                Education
              </h3>
              <p className="text-brand-cream/90 mb-1 font-semibold">
                Navigation Science Student
              </p>
              <p className="text-brand-cream/70 mb-4 text-sm">
                Sohag University, Egypt
              </p>
              <p className="text-brand-cream/90 mb-1 font-semibold">
                Backend .NET Development
              </p>
              <p className="text-brand-cream/70 text-sm">
                ITI Training Institute
              </p>
            </div>

            {/* Certifications Preview */}
            <div className="card-luxury border-l-brand-teal border-l-4 p-8">
              <h3 className="text-brand-teal mb-3 text-xl font-bold">
                Achievements
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-brand-teal mr-3 font-bold">✓</span>
                  <span className="text-brand-cream/90">
                    Google Cybersecurity Professional
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-teal mr-3 font-bold">✓</span>
                  <span className="text-brand-cream/90">
                    IEEE Member & Contributor
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-teal mr-3 font-bold">✓</span>
                  <span className="text-brand-cream/90">
                    ITI Full Stack Graduate
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
