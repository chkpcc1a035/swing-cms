// src/contexts/AuthContext.tsx

"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const login = async (email: string, password: string) => {
    console.log("[AuthContext] Attempting login for:", email);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(
      "[AuthContext] Login result:",
      error ? `Error: ${error.message}` : "Success"
    );
    return !error;
  };

  const logout = async () => {
    console.log("[AuthContext] Logging out user");
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    console.log("[AuthContext] User logged out successfully");
    router.replace("/login");
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log("[AuthContext] Initializing auth state");
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log(
          "[AuthContext] Initial session:",
          session ? "Active" : "No session"
        );
        setIsAuthenticated(!!session);

        if (session) {
          console.log(
            "[AuthContext] Session exists, current pathname:",
            pathname
          );
          if (pathname === "/login") {
            console.log("[AuthContext] Redirecting from login to inventory");
            router.replace("/inventory");
          }
        } else {
          console.log("[AuthContext] No session, current pathname:", pathname);
          if (pathname !== "/login") {
            console.log("[AuthContext] Redirecting to login");
            router.replace("/login");
          }
        }
      } catch (error) {
        console.error("[AuthContext] Auth initialization error:", error);
      } finally {
        console.log("[AuthContext] Setting loading to false");
        setIsLoading(false);
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[AuthContext] Auth state changed:", {
        event,
        hasSession: !!session,
      });
      const isAuthed = !!session;
      setIsAuthenticated(isAuthed);

      if (!isAuthed && pathname !== "/login") {
        console.log(
          "[AuthContext] No session after state change, redirecting to login"
        );
        router.replace("/login");
      } else if (isAuthed && pathname === "/login") {
        console.log(
          "[AuthContext] Session exists after state change, redirecting to inventory"
        );
        router.replace("/inventory");
      }
    });

    return () => {
      console.log("[AuthContext] Cleaning up auth subscriptions");
      subscription.unsubscribe();
    };
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
