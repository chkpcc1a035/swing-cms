import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { supabase } from "../lib/supabase";

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

  useEffect(() => {
    console.log(
      "[AuthContext] Initial mount, isLoading:",
      isLoading,
      "isAuthenticated:",
      isAuthenticated
    );

    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(
        "[AuthContext] Initial session check:",
        session ? "Session found" : "No session"
      );
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log(
        "[AuthContext] Auth state changed:",
        _event,
        "Session:",
        session ? "exists" : "none"
      );
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    console.log("[AuthContext] Login attempt for:", email);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("[AuthContext] Login error:", error.message);
      return false;
    }

    console.log("[AuthContext] Login successful, user:", data.user?.email);
    setIsAuthenticated(!!data.user);
    return !!data.user;
  };

  const logout = async () => {
    console.log("[AuthContext] Logout initiated");
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    console.log("[AuthContext] Logout completed");
  };

  console.log(
    "[AuthContext] Render - isLoading:",
    isLoading,
    "isAuthenticated:",
    isAuthenticated
  );

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
