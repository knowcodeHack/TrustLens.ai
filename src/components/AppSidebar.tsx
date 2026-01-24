"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Logs, 
  ShieldAlert, 
  Bell, 
  CheckCircle2, 
  BarChart, 
  Users, 
  Settings, 
  CreditCard,
  Plug,
  Shield,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/app/dashboard" },
  { icon: Plug, label: "Integrations", href: "/app/integrations" },
  { icon: Logs, label: "Logs Explorer", href: "/app/logs" },
  { icon: ShieldAlert, label: "Anomalies", href: "/app/anomalies" },
  { icon: Bell, label: "Alerts", href: "/app/alerts" },
  { icon: CheckCircle2, label: "Compliance", href: "/app/compliance" },
  { icon: BarChart, label: "Reports", href: "/app/reports" },
  { icon: Users, label: "User Behavior", href: "/app/users" },
];

const secondaryItems = [
  { icon: Settings, label: "Settings", href: "/app/settings" },
  { icon: CreditCard, label: "Billing", href: "/app/billing" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-white/10 bg-zinc-950 flex flex-col h-screen fixed left-0 top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold tracking-tight text-white">TrustLens</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 mb-2">Main Menu</p>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href 
                ? "bg-blue-600/10 text-blue-500" 
                : "text-zinc-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}

        <div className="pt-8">
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 mb-2">System</p>
          {secondaryItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href 
                  ? "bg-blue-600/10 text-blue-500" 
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-white/10">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-zinc-400 hover:text-white hover:bg-red-500/10 hover:text-red-500"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}
