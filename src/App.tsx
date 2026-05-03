import { lazy, Suspense, useEffect, type JSX } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Blog from "./components/Blog";

const Experience = lazy(() => import("./components/Experience"));
const Contact = lazy(() => import("./components/Contact"));

export default function App(): JSX.Element {
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
    <div className="bg-brand-dark text-brand-cream w-full overflow-x-hidden">
      <Header />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="experience">
          <Suspense
            fallback={
              <div className="py-20 text-center">Loading projects...</div>
            }
          >
            <Experience />
          </Suspense>
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="certifications">
          <Certifications />
        </section>
        <section id="blog">
          <Blog />
        </section>
        <section id="contact">
          <Suspense
            fallback={
              <div className="py-20 text-center">Loading contact...</div>
            }
          >
            <Contact />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  );
}
