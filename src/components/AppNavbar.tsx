"use client";

import { useSession, signOut } from "next-auth/react";
import { Search, Bell, LogOut, CreditCard } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function AppNavbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const isPremium = Boolean((session?.user as any)?.is_premium);

  // Handle search
  const handleSearch = async (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      setIsSearching(true);
      if (!session?.user?.email) return;

      // Get user's org_id
      const { data: user } = await supabase
        .from("users")
        .select("org_id")
        .eq("email", session.user.email)
        .single();

      if (!user?.org_id) return;

      // Search logs
      const { data: logs } = await supabase
        .from("logs")
        .select("id, event_type, user_id, ip, timestamp")
        .eq("org_id", user.org_id)
        .or(`event_type.ilike.%${query}%,user_id.ilike.%${query}%,ip.ilike.%${query}%`)
        .limit(5);

      setSearchResults(logs || []);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search failed");
    } finally {
      setIsSearching(false);
    }
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleViewPlan = () => {
    router.push("/app/billing");
  };

  return (
    <header className="h-16 border-b border-white/10 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96" ref={searchRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search logs, anomalies, or users..."
            className="pl-10 bg-white/5 border-white/10 focus-visible:ring-blue-500"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {showSearchResults && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
              {isSearching ? (
                <div className="p-4 text-center text-zinc-500">Searching...</div>
              ) : searchResults.length === 0 ? (
                <div className="p-4 text-center text-zinc-500">No results found</div>
              ) : (
                <div className="divide-y divide-white/10">
                  {searchResults.map((result, idx) => (
                    <div
                      key={idx}
                      className="p-3 hover:bg-white/5 cursor-pointer transition-colors"
                      onClick={() => {
                        router.push(`/app/logs/${result.id}`);
                        setShowSearchResults(false);
                        setSearchQuery("");
                      }}
                    >
                      <p className="text-sm text-white font-medium">{result.event_type}</p>
                      <p className="text-xs text-zinc-500">{result.user_id} · {result.ip}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative text-zinc-400 hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-zinc-950" />
        </Button>
        <div className="h-8 w-[1px] bg-white/10 mx-2" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{session?.user?.name}</p>
            <p className="text-xs text-zinc-500">{session?.user?.email}</p>
            {isPremium && <p className="text-[10px] text-blue-400 font-semibold">Premium</p>}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 border border-white/10 cursor-pointer hover:border-blue-500/50 transition-colors">
                <AvatarImage src="" />
                <AvatarFallback className="bg-blue-600 text-white">
                  {session?.user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-white/10">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium text-white">{session?.user?.name}</p>
                <p className="text-xs text-zinc-500">{session?.user?.email}</p>
              </div>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={handleViewPlan}
                className="text-white cursor-pointer hover:bg-white/10 focus:bg-white/10"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                View Plan
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/10" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-500 cursor-pointer hover:bg-white/10 focus:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
