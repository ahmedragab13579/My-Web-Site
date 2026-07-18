import { useState, type JSX } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";
import ChangeColorMode from "../components/ChangeColorMode";
import { useColorMode } from "../hooks/useColorMode";

export default function AdminLayout(): JSX.Element {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { isDark, toggleColorMode } = useColorMode();
  

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex transition-colors duration-300">
      {/* Sidebar Panel */}
      <aside className="w-64 bg-[var(--card-bg)] border-r border-brand-teal/20 p-6 flex flex-col gap-6 transition-colors duration-300">
        <div className="font-bold text-xl text-brand-teal">CMS Control Panel</div>
        <nav className="flex flex-col gap-2">
          <Link to="/admin/dashboard" className="text-brand-cream/80 hover:text-brand-teal py-2 px-3 rounded hover:bg-brand-teal/10 transition-colors">Dashboard</Link>
          <Link to="/admin/projects" className="text-brand-cream/80 hover:text-brand-teal py-2 px-3 rounded hover:bg-brand-teal/10 transition-colors">Projects</Link>
          <Link to="/admin/articles" className="text-brand-cream/80 hover:text-brand-teal py-2 px-3 rounded hover:bg-brand-teal/10 transition-colors">Articles</Link>
          <Link to="/admin/skills" className="text-brand-cream/80 hover:text-brand-teal py-2 px-3 rounded hover:bg-brand-teal/10 transition-colors">Skills</Link>
          <Link to="/admin/experiences" className="text-brand-cream/80 hover:text-brand-teal py-2 px-3 rounded hover:bg-brand-teal/10 transition-colors">Experiences</Link>
          <Link to="/admin/messages" className="text-brand-cream/80 hover:text-brand-teal py-2 px-3 rounded hover:bg-brand-teal/10 transition-colors">Messages</Link>
          <Link to="/admin/profile" className="text-brand-cream/80 hover:text-brand-teal py-2 px-3 rounded hover:bg-brand-teal/10 transition-colors">Profile</Link>
        </nav>
      </aside>

      {/* Content Pane */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-brand-teal/20 flex items-center justify-between px-8 bg-[var(--card-bg)]/60 backdrop-blur-md transition-colors duration-300">
          <div className="text-brand-cream/70 font-medium">Welcome, Administrator</div>
          <ChangeColorMode  isDark={isDark} toggleColorMode={toggleColorMode} />
          
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-4 py-2 bg-red-600/20 text-red-400 hover:bg-red-600/30 rounded border border-red-500/30 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Logging out...</span>
              </>
            ) : (
              "Logout"
            )}
          </button>
        </header>
        <main className="p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

