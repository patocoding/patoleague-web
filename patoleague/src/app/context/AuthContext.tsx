"use client"

import { createContext, useState, useEffect, ReactNode, useContext } from "react"


interface AuthContextType {
    isAuthenticated: boolean
    login: (token: string) => void
    logout: ()=> void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem("access_token");
      setIsAuthenticated(!!token);
    }, []);
  
    const login = (token: string) => {
      localStorage.setItem("access_token", token);
      setIsAuthenticated(true);
    };
  
    const logout = () => {
      localStorage.removeItem("access_token");
      setIsAuthenticated(false);
    };
  
    return (
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  // Hook para acessar o contexto em qualquer componente
  export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
  }