import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { setSharedToken, registerTokenRefreshListener } from "../BackEndIntegration/API/Shared";
import { authService } from "../BackEndIntegration/API/authService";

export interface DecodedUser {
  userId: number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: DecodedUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Safely base64url-decodes a JWT payload in the browser
function decodeToken<T = any>(token: string): T | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
}

// Maps deserialized JWT claim names to custom DecodedUser format
function getDecodedUser(token: string): DecodedUser | null {
  const payload = decodeToken<any>(token);
  if (!payload) return null;

  // Extract from standard claims or short JWT claims
  const userIdStr = payload.nameid || payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  const email = payload.email || payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || "";
  const name = payload.unique_name || payload.name || payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] || "";
  
  // 1. تحسين الأمان: تغيير القيمة الافتراضية للصلاحية لـ "User" بدلاً من "Admin"
  const role = payload.role || payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role"] || "User";

  const userId = userIdStr ? parseInt(userIdStr, 10) : 0;

  if (!userId) return null;

  return { userId, email, name, role };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    // 2. تحسين الميموري: استقبال دالة الـ unsubscribe لتنظيف الـ Listener
    const unsubscribe = registerTokenRefreshListener((token) => {
      if (token) {
        const decoded = getDecodedUser(token);
        setUser(decoded);
      } else {
        setUser(null);
      }
    });

    // Refresh token on mount to restore user session if a refresh token cookie exists
    const initializeAuth = async () => {
      try {
        const data = await authService.refresh();
        if (data?.accessToken) {
          setSharedToken(data.accessToken);
          const decoded = getDecodedUser(data.accessToken);
          setUser(decoded);
        } else {
          setSharedToken(null);
          setUser(null);
        }
      } catch (error) {
        setSharedToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // دالة التنظيف عند عمل Unmount للمكون
    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, []);

  // 3. تحسين الأداء: تغليف الدوال بـ useCallback لمنع الـ Re-renders غير الضرورية
  const login = useCallback((token: string) => {
    setSharedToken(token);
    const decoded = getDecodedUser(token);
    setUser(decoded);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout API failed", err);
    } finally {
      setSharedToken(null);
      setUser(null);
      // 4. خصوصية البيانات: مسح كل كاش React Query عند تسجيل الخروج
      queryClient.clear();
    }
  }, [queryClient]);

  // تحسين الأداء: عمل Memoize لقيمة الـ Context
  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  }), [user, isLoading, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}