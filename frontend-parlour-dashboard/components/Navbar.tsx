"use client";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useContext, useEffect } from "react";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { logoutHandler } from "@/lib/auth";
import { getUser } from "@/lib/auth";

const Navbar = () => {
    const appContext = useContext(AppContext);
    if (!appContext) {
        throw new Error("AppContext must be used within an AppProvider");
    }
    const { isAuthenticated, setIsAuthenticated, setUser } = appContext;

    const router = useRouter();

    const onLoginPage = () => {
        router.push('/login');
    }
    const onDashboard = () => {
        router.push('/dashboard');
    }
    const onLogout = async () => {
        const response = await logoutHandler();
        if (response !== '') {
            setIsAuthenticated(false);
            alert(response);
            router.push('/');
        }
    }

    // Check authentication status on initial render
    useEffect(() => {
        const checkAuthStatus = async () => {
            const user = await getUser();
            if (user) {
                setIsAuthenticated(true);
                setUser(user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        }

        checkAuthStatus();
    }, []);

    return (
        <nav className="bg-indigo-700 px-2 border-b shadow-sm">
            <div className="container mx-auto flex justify-between items-center py-4">
                <Link href="/" className="flex items-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-white">Parlour Dashboard</h1>
                </Link>

                <div className="flex items-center space-x-4">
                    {
                        isAuthenticated ? (<>
                            <Button onClick={onDashboard} variant="outline" className="border-white text-white text-xl">
                                Dashboard
                            </Button>
                            <Button onClick={onLogout} variant="outline" className="border-white text-white text-xl">
                                Logout
                            </Button>
                        </>) : (<Button onClick={onLoginPage} variant="outline" className="border-white text-white text-xl">
                            Login
                        </Button>)
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;