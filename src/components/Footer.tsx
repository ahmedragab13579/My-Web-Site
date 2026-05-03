import { type JSX } from "react";
import { GitBranchIcon, Link2Icon, Mail, ArrowUp } from "lucide-react";

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <GitBranchIcon size={20} />,
      href: "https://github.com/ahmedragab13579",
      label: "GitHub",
    },
    {
      icon: <Link2Icon size={20} />,
      href: "https://linkedin.com/in/ahmedragab",
      label: "LinkedIn",
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:ahmedharidy2019@gmail.com",
      label: "Email",
    },
  ];

  const links = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Certifications", href: "#certifications" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-brand-teal/20 bg-brand-dark text-brand-cream border-t px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Main Footer Content */}
        <div className="mb-12 grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="gradient-text mb-3 text-2xl font-bold">Ahmed Ragab</p>
            <p className="text-brand-cream/70">
              Full Stack .NET Developer & Cybersecurity Enthusiast building
              secure, scalable digital solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-brand-teal mb-4 text-lg font-bold">
              Navigation
            </h4>
            <ul className="space-y-2">
              {links.slice(0, 3).map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-brand-cream/70 hover:text-brand-teal transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="text-brand-teal mb-4 text-lg font-bold">Services</h4>
            <ul className="space-y-2">
              {links.slice(3).map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-brand-cream/70 hover:text-brand-teal transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-brand-teal mb-4 text-lg font-bold">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  className="border-brand-teal/30 bg-brand-blue/30 text-brand-cream/80 hover:border-brand-teal hover:bg-brand-teal hover:text-brand-dark flex h-10 w-10 items-center justify-center rounded-lg border transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-brand-teal/20 mb-8 border-t"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Copyright */}
          <div className="text-brand-cream/60 text-center text-sm md:text-left">
            <p>
              © {currentYear} Ahmed Ragab. All rights reserved. | Built with
              React & Tailwind CSS
            </p>
            <p className="mt-2 text-xs">
              🚀 Deployed on Vercel | Crafted with ❤️ from Sohag, Egypt
            </p>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="border-brand-teal/30 bg-brand-blue/30 text-brand-cream/80 hover:border-brand-teal hover:bg-brand-teal hover:text-brand-dark flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-300"
          >
            Back to Top
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="border-brand-teal/20 mt-12 border-t pt-8">
        <p className="text-brand-cream/50 text-center text-xs">
          <span className="w-72">
            "Excellence is not a skill, it's a habit." -
            <span className="text-sm md:text-base"> Aristotle</span>
          </span>
        </p>
      </div>
    </footer>
  );
}
