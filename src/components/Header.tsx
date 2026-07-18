import { useState, type JSX } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ChangeColorMode from "./ChangeColorMode";
import { useColorMode } from "../hooks/useColorMode";

export default function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isDark, toggleColorMode } = useColorMode();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Skills", id: "skills" },
    { name: "Services", id: "services" },
    { name: "Certifications", id: "certifications" },
    { name: "Blog", id: "blog" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const NavItem = ({ name, id }: { name: string; id: string }) => (
    <button
      onClick={() => scrollToSection(id)}
      className="text-brand-cream hover:text-brand-teal font-medium transition-colors duration-300 cursor-pointer"
    >
      {name}
    </button>
  );

  return (
    <header className="bg-[var(--bg-main)]/90 shadow-brand-sm border-brand-teal/30 fixed top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={() => scrollToSection("hero")}
          className="gradient-text text-2xl font-bold transition-opacity duration-300 hover:opacity-80 cursor-pointer animate-fade-in"
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
          <ChangeColorMode isDark={isDark} toggleColorMode={toggleColorMode} />
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
          className="text-brand-cream md:hidden cursor-pointer"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-[var(--bg-main)] border-brand-teal/30 border-b md:hidden transition-colors duration-300">
          <div className="space-y-4 px-4 py-4 flex flex-col items-center">
            {navLinks.map((link) => (
              <NavItem key={link.name} name={link.name} id={link.id} />
            ))}
            <div className="flex items-center gap-4 w-full justify-center py-2 border-y border-brand-teal/10">
              <span className="text-sm text-brand-cream/60">Color Mode:</span>
              <ChangeColorMode isDark={isDark} toggleColorMode={toggleColorMode} />
            </div>
            <a
              href="https://github.com/ahmedragab13579"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary block text-center text-sm w-full font-bold"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
