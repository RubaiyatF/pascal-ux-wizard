import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  userId: string | null; // Add for compatibility
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  isLoaded: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("demo-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoaded(true);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Demo sign in - just create a user
    const demoUser = {
      id: "demo-user-1",
      email,
      name: email.split("@")[0],
    };
    setUser(demoUser);
    localStorage.setItem("demo-user", JSON.stringify(demoUser));
  };

  const signUp = async (email: string, password: string, name: string) => {
    // Demo sign up
    const demoUser = {
      id: "demo-user-1",
      email,
      name,
    };
    setUser(demoUser);
    localStorage.setItem("demo-user", JSON.stringify(demoUser));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("demo-user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userId: user?.id || null,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        isLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
