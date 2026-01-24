"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Shield, ArrowRight } from "lucide-react";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await axios.post("/api/auth/signup", {
        name,
        orgName,
        email,
        password,
      });
      router.push("/login?message=Account created successfully");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-10 h-10 text-blue-500" />
            <span className="text-2xl font-bold tracking-tight text-white">TrustLens.ai</span>
          </Link>
        </div>
        
        <Card className="bg-zinc-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-xl">Create your account</CardTitle>
            <CardDescription className="text-zinc-500">
              Start your 14-day free trial today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Full Name</label>
                  <Input 
                    placeholder="John Doe" 
                    className="bg-black border-white/10"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Company Name</label>
                  <Input 
                    placeholder="Acme Inc" 
                    className="bg-black border-white/10"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Work Email</label>
                <Input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="bg-black border-white/10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Password</label>
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-black border-white/10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-xs text-red-500">{error}</p>}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-11" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t border-white/5 pt-6 text-center">
            <p className="text-sm text-zinc-500">
              Already have an account?{" "}
              <Link href="/login" className="text-white font-medium hover:underline">Sign in</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
