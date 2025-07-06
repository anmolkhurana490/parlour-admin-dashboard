"use client";
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface ContextType {
    user: any;
    setUser: Dispatch<SetStateAction<any>>;
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<ContextType | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    return (
        <AppContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AppContext.Provider>
    );
};
