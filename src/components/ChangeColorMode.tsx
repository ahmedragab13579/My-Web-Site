import { type JSX } from "react";
import { Sun, Moon } from "lucide-react";

interface ChangeColorModeProps {
  isDark: boolean;
  toggleColorMode: () => void;
}

export default function ChangeColorMode({ isDark, toggleColorMode }: ChangeColorModeProps): JSX.Element {
  return (
    <button
      onClick={toggleColorMode}
      className="p-2 border border-brand-teal/30 bg-brand-blue/10 hover:border-brand-teal hover:bg-brand-blue/20 text-brand-teal rounded-lg transition-all duration-300 cursor-pointer flex items-center justify-center"
      aria-label="Toggle Color Theme"
    >
      {isDark ? (
        <Sun size={18} className="text-yellow-400" />
      ) : (
        <Moon size={18} className="text-slate-400" />
      )}
    </button>
  );
}

