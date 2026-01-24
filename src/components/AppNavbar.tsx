"use client";

import { useSession } from "next-auth/react";
import { Search, Bell, HelpCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function AppNavbar() {
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b border-white/10 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input 
            placeholder="Search logs, anomalies, or users..." 
            className="pl-10 bg-white/5 border-white/10 focus-visible:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
          <HelpCircle className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="relative text-zinc-400 hover:text-white">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-zinc-950" />
        </Button>
        <div className="h-8 w-[1px] bg-white/10 mx-2" />
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{session?.user?.name}</p>
            <p className="text-xs text-zinc-500">{session?.user?.email}</p>
          </div>
          <Avatar className="h-8 w-8 border border-white/10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-blue-600 text-white">
              {session?.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
