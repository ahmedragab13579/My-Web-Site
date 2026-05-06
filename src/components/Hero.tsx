import { type JSX } from "react";
import { Download, ExternalLink } from "lucide-react";

export default function Hero(): JSX.Element {
  const handleDownloadCV = () => {
    const cvUrl = "/CV/lastone.pdf";
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "AhmedCv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="text-brand-cream relative flex min-h-screen items-center px-4 pt-32 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Content */}
          <div className="animate-slide-up">
            <p className="text-brand-teal mb-4 text-lg font-bold">
              Welcome to my portfolio
            </p>
            <h1 className="text-brand-cream mb-6 text-5xl leading-tight font-bold md:text-7xl">
              Ahmed Ragab.
            </h1>
            <h2 className="text-brand-cream/90 mb-8 text-2xl font-light md:text-3xl">
              FullStack (.NET & React) Developer
            </h2>
            <p className="text-brand-cream/70 mb-8 max-w-lg text-lg leading-relaxed">
              Full-Stack Developer | .NET & Next.js Specialist "21-year-old
              Navigation Science student from Sohag. I build robust, scalable
              backend systems using .NET. Additionally, I develop
              high-performance full-stack applications using Next.js and craft
              seamless UIs with React. My focus is on writing secure, clean code
              and delivering a superior user experience across different
              architectures."
            </p>

            {/* CTA Buttons */}
            <div className="mb-12 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={handleDownloadCV}
                className="bg-brand-teal text-brand-cream hover:bg-brand-teal/80 flex w-full items-center justify-center gap-2 rounded-md px-8 py-4 font-semibold transition-all duration-300 sm:w-auto"
              >
                <Download size={20} />
                Download CV
              </button>
              <a
                href="https://github.com/ahmedragab13579"
                target="_blank"
                rel="noopener noreferrer"
                className="border-brand-teal text-brand-teal hover:bg-brand-teal hover:text-brand-cream flex w-full items-center justify-center gap-2 rounded-md border-2 px-8 py-4 font-semibold transition-all duration-300 sm:w-auto"
              >
                <ExternalLink size={20} />
                View GitHub
              </a>
            </div>

            {/* Quick Stats */}
            <div className="grid max-w-md grid-cols-3 gap-4">
              <div className="border-brand-teal/30 bg-brand-blue/30 hover:border-brand-teal/60 rounded-lg border p-4 backdrop-blur-md transition-colors">
                <p className="text-brand-cream text-2xl font-bold">5+</p>
                <p className="text-brand-cream/70 text-sm">Projects</p>
              </div>
              <div className="border-brand-teal/30 bg-brand-blue/30 hover:border-brand-teal/60 rounded-lg border p-4 backdrop-blur-md transition-colors">
                <p className="text-brand-cream text-2xl font-bold">37+</p>
                <p className="text-brand-cream/70 text-sm">Certifications</p>
              </div>
              <div className="border-brand-teal/30 bg-brand-blue/30 hover:border-brand-teal/60 rounded-lg border p-4 backdrop-blur-md transition-colors">
                <p className="text-brand-cream text-2xl font-bold">7+</p>
                <p className="text-brand-cream/70 text-sm">Tech Skills</p>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="hidden items-center justify-center md:flex">
            <div className="relative flex h-96 w-full items-center justify-center">
              {/* Decorative circles using the new palette */}
              <div className="from-brand-teal to-brand-blue absolute h-96 w-96 rounded-full bg-linear-to-r opacity-20 blur-3xl"></div>
              <div className="from-brand-blue to-brand-dark absolute top-20 left-20 h-72 w-72 rounded-full bg-linear-to-r opacity-40 blur-3xl"></div>

              {/* Profile Card */}
              <div className="border-brand-teal/30 bg-brand-blue/20 relative z-10 w-full max-w-sm rounded-2xl border p-8 backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_1px_1px,rgba(255,244,183,0.1)_1px,transparent_0)]"></div>
                <div className="from-brand-blue to-brand-teal/50 relative mb-6 flex aspect-square w-full items-center justify-center overflow-hidden rounded-full bg-linear-to-br">
                  <img
                    src="/Images/Avatar/4.webp"
                    alt="Ahmed Ragab"
                    loading="eager"
                    fetchPriority="high"
                    width="384"
                    height="384"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-brand-cream text-lg font-semibold">
                  Ahmed Ragab
                </p>
                <p className="text-brand-teal text-sm">FullStack Developer</p>
                <div className="mt-6 space-y-2">
                  <p className="text-brand-cream/70 text-xs">📍 Sohag, Egypt</p>
                  <p className="text-brand-cream/70 text-xs">
                    🎓 Navigation Science Student
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
