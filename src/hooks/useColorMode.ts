import { useState, useEffect } from "react";

export function useColorMode() {
  // Dark is the default. isDark=true means NO .light class on <html>.
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      return saved === "dark";
    }
    // Default to dark if no preference saved
    return !window.matchMedia("(prefers-color-scheme: light)").matches;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleColorMode = () => setIsDark((prev) => !prev);

  return { isDark, toggleColorMode };
}
