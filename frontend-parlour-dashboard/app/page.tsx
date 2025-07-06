"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { AppContext } from '@/context/AppContext';
import { useContext, useEffect } from "react";

const HeroSection = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("AppContext must be used within an AppProvider");
  }
  const { isAuthenticated } = appContext;

  return (
    <section className="py-16">
      <div className="container mx-auto flex flex-col items-center justify-center">
        <Card className="w-full max-w-xl shadow-xl bg-white">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-indigo-700">Welcome to Admin Parlour</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="mb-6 text-center text-gray-600">
              Your one-stop solution for managing parlour operations.
            </p>

            <Link href={isAuthenticated ? "/dashboard" : "/login"} className="flex justify-center">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">Go To Admin Dashboard</Button>
            </Link>

            <Link href={"/attendance"} className="flex justify-center mt-2">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white">Employee Punch Page</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}


const Home = () => {

  return (
    <>
      <HeroSection />
    </>
  )
}

export default Home