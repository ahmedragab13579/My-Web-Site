import { type JSX } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col items-center justify-center px-6 relative overflow-hidden transition-colors duration-300">
      {/* Absolute floating background accents */}
      <div className="bg-brand-teal/5 absolute top-10 left-10 h-72 w-72 rounded-full blur-3xl"></div>
      <div className="bg-brand-purple/5 absolute bottom-10 right-10 h-72 w-72 rounded-full blur-3xl"></div>

      <div className="text-center max-w-md w-full relative z-10">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-red-950/20 border border-red-900/30 text-red-500 animate-bounce">
            <AlertTriangle size={48} />
          </div>
        </div>

        <h1 className="text-8xl font-black tracking-widest text-brand-cream/90 mb-4 select-none drop-shadow-[0_0_15px_rgba(0,173,181,0.3)]">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-brand-cream mb-3">
          Page Not Found
        </h2>
        
        <p className="text-brand-cream/60 text-sm leading-relaxed mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <Link
          to="/"
          className="bg-brand-teal text-brand-dark hover:bg-brand-cream inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3.5 font-bold transition-all duration-300 shadow-[0_0_15px_rgba(0,173,181,0.2)] cursor-pointer"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
