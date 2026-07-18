import { type JSX, type ReactNode, useEffect } from "react";
import { useCurrentUser } from "../BackEndIntegration/Hooks/Queries/useAuthQueries";
import { useAuth } from "../context/AuthContext";
import { Loader2 } from "lucide-react";
import NotFoundPage from "../pages/NotFoundPage";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { isAuthenticated, isLoading: isContextLoading, logout } = useAuth();

  // Run backend validation query only if context has verified token
  const { data: apiUser, isLoading: isApiLoading, isError } = useCurrentUser(isAuthenticated);

  useEffect(() => {
    if (isError || (apiUser && !apiUser.isAuthenticated)) {
      logout();
    }
  }, [isError, apiUser, logout]);

  // If context is decoding token or backend is validating session, show spinner
  if (isContextLoading || (isAuthenticated && isApiLoading)) {
    return (
      <div className="min-h-screen bg-brand-dark text-brand-cream flex flex-col items-center justify-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="absolute h-16 w-16 rounded-full border-4 border-brand-teal/20 animate-pulse"></div>
          <Loader2 className="h-10 w-10 text-brand-teal animate-spin" />
        </div>
        <p className="text-sm font-semibold tracking-wide text-brand-cream/60 animate-pulse">
          Verifying secure session...
        </p>
      </div>
    );
  }

  // If no valid user in context or validation failed
  if (!isAuthenticated || isError || (apiUser && !apiUser.isAuthenticated)) {
    return <NotFoundPage />;
  }

  // Session is verified, render children layouts/components
  return <>{children}</>;
}
