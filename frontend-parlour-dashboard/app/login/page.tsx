"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginHandler } from "@/lib/auth"
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("Admin");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const router = useRouter();

    const context = useContext(AppContext);
    if (!context) {
        throw new Error("AppContext must be used within an AppProvider");
    }
    const { isAuthenticated, setIsAuthenticated, setUser } = context;

    useEffect(() => {
        // Redirect to dashboard if already authenticated
        if (isAuthenticated) {
            // window.location.href = '/dashboard';
            router.push('/dashboard');
        }
    }, [isAuthenticated]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setSubmitting(true);

        const response = await loginHandler(email, password);
        if (response.error) {
            setError(response.error);
        }
        else {
            setIsAuthenticated(true);
            setUser(response.data);
            alert("Login successful!");
        }

        setSubmitting(false);
    };

    return (
        <form className="flex flex-col gap-4 max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Label htmlFor="password">Password</Label>
            <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Label className="flex items-center gap-2">User Type</Label>

            <div className="flex gap-8 mb-4 ml-4">
                <Label htmlFor="userTypeAdmin" className="flex items-center gap-2 text-gray-700">
                    <span>Admin</span>
                    <Input
                        type="radio"
                        name="userType"
                        value="Admin"
                        checked={userType === "Admin"}
                        onChange={() => setUserType("Admin")}
                        className="border border-gray-300 rounded-md p-2 h-4 w-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </Label>

                <Label htmlFor="userTypeSuperAdmin" className="flex items-center gap-2 text-gray-700">
                    <span>Super Admin</span>
                    <Input
                        type="radio"
                        name="userType"
                        value="SuperAdmin"
                        checked={userType === "SuperAdmin"}
                        onChange={() => setUserType("SuperAdmin")}
                        className="border border-gray-300 rounded-md p-2 h-4 w-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </Label>
            </div>


            <Button
                type="submit"
                disabled={submitting}
                className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Login
            </Button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
    )
}

export default LoginForm;