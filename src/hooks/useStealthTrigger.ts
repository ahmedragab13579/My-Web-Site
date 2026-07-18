import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useStealthTrigger(secretRoute: string = "/portal-access-sec-2026") {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Trigger: Alt + Shift + K
      if (event.altKey && event.shiftKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        navigate(secretRoute);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, secretRoute]);
}
