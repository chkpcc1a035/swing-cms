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
        setIsLoading(true);

        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log(
          "[AuthContext] Initial session:",
          session ? "Active" : "No session"
        );
        setIsAuthenticated(!!session);

        // Force navigation based on auth state
        if (!session && pathname !== "/login") {
          console.log("[AuthContext] No session, forcing navigation to login");
          window.location.href = `${window.location.origin}/login`;
          return;
        }

        if (session && pathname === "/login") {
          console.log(
            "[AuthContext] Session exists, forcing navigation to inventory"
          );
          window.location.href = `${window.location.origin}/inventory`;
          return;
        }
      } catch (error) {
        console.error("[AuthContext] Auth initialization error:", error);
      } finally {
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

      setIsAuthenticated(!!session);

      // Force page reload on auth state change
      if (!session && pathname !== "/login") {
        window.location.href = "/login";
      } else if (session && pathname === "/login") {
        window.location.href = "/inventory";
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname]);

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
