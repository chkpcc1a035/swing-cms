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
    console.log("[AuthContext] User logged out successfully");
    router.replace("/login");
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log(
          "[AuthContext] Session status:",
          session ? "Active" : "No session"
        );

        setIsAuthenticated(!!session);

        if (session && pathname === "/login") {
          router.replace("/");
        } else if (!session && pathname !== "/login") {
          router.replace("/login");
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
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const isAuthed = !!session;
      setIsAuthenticated(isAuthed);

      if (!isAuthed && pathname !== "/login") {
        router.replace("/login");
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
