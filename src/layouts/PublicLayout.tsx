import { useEffect, type JSX } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { useStealthTrigger } from "../hooks/useStealthTrigger";

export default function PublicLayout(): JSX.Element {
  const location = useLocation();
  useStealthTrigger("/portal-access-sec-2026");

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // Wait briefly for the home page content to mount
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="bg-[var(--bg-main)] text-[var(--text-main)] w-full overflow-x-hidden transition-colors duration-300">
      <ScrollToTop />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
