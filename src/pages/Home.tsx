import { useEffect, type JSX } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Services from "../components/Services";
import Certifications from "../components/Certifications";
import Blog from "../components/Blog";
import Experience from "../components/Experience";
import Contact from "../components/Contact";

export default function Home(): JSX.Element {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const toReveal: IntersectionObserverEntry[] = [];
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            toReveal.push(entry);
          }
        });

        if (toReveal.length > 0) {
          window.requestAnimationFrame(() => {
            toReveal.forEach((entry) => {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            });
          });
        }
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(
      ".animate-slide-up, .animate-fade-in",
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Services />
      <Skills />
      <Certifications />
      <Blog />
      <Contact />
    </>
  );
}
