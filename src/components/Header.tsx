import { useState, type JSX } from "react";
import { Menu, X } from "lucide-react";

export default function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Skills", id: "skills" },
    { name: "Certifications", id: "certifications" },
    { name: "Blog", id: "blog" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const NavItem = ({ name, id }: { name: string; id: string }) => (
    <button
      onClick={() => scrollToSection(id)}
      className="text-brand-cream hover:text-brand-teal font-medium transition-colors duration-300"
    >
      {name}
    </button>
  );

  return (
    <header className="bg-brand-dark/90 shadow-brand-sm border-brand-teal/30 fixed top-0 z-50 w-full border-b backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={() => scrollToSection("hero")}
          className="gradient-text text-2xl font-bold transition-opacity duration-300 hover:opacity-80"
        >
          <img
            src="/Images/Avatar/Fav2.png"
            alt="Ahmed Ragab"
            loading="eager"
            fetchPriority="high"
            width="100"
            height="100"
            className="mr-2 inline-block align-middle"
          />
        </button>
        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavItem key={link.name} name={link.name} id={link.id} />
          ))}
          <a
            href="https://github.com/ahmedragab13579"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            GitHub
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
          className="text-brand-cream md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-brand-dark border-brand-teal/30 border-b md:hidden">
          <div className="space-y-4 px-4 py-4">
            {navLinks.map((link) => (
              <NavItem key={link.name} name={link.name} id={link.id} />
            ))}
            <a
              href="https://github.com/ahmedragab13579"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary block text-center text-sm"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
