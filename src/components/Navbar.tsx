"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold tracking-tight text-white">TrustLens<span className="text-blue-500">.ai</span></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="/pricing" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Docs</Link>
            {session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-zinc-400">
                  {session.user?.email}
                </span>
                <Button variant="ghost" className="text-zinc-400 hover:text-white" onClick={() => signOut()}>Logout</Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login">
                  <Button variant="ghost" className="text-zinc-400 hover:text-white">Login</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link href="/#features" className="block px-3 py-2 text-base font-medium text-zinc-400 hover:text-white" onClick={() => setIsOpen(false)}>Features</Link>
              <Link href="/pricing" className="block px-3 py-2 text-base font-medium text-zinc-400 hover:text-white" onClick={() => setIsOpen(false)}>Pricing</Link>
              <Link href="/docs" className="block px-3 py-2 text-base font-medium text-zinc-400 hover:text-white" onClick={() => setIsOpen(false)}>Docs</Link>
              <div className="pt-4 flex flex-col gap-2">
                {session ? (
                  <>
                    <span className="text-sm text-zinc-400 text-center py-2">{session.user?.email}</span>
                    <Button variant="outline" className="w-full justify-center" onClick={() => { signOut(); setIsOpen(false); }}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full justify-center">Login</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
