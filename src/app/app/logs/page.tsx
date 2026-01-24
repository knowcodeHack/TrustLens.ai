"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  ChevronRight,
  Calendar as CalendarIcon,
  Info
} from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const logs = [
  { id: "1", type: "LOGIN_SUCCESS", user: "user_123", ip: "1.2.3.4", location: "US", timestamp: "2024-03-20 10:00:00", severity: "info" },
  { id: "2", type: "DATA_EXPORT", user: "admin_01", ip: "5.6.7.8", location: "UK", timestamp: "2024-03-20 10:15:00", severity: "warn" },
  { id: "3", type: "PASSWORD_CHANGE", user: "user_456", ip: "9.10.11.12", location: "FR", timestamp: "2024-03-20 10:30:00", severity: "info" },
  { id: "4", type: "UNAUTHORIZED_ACCESS", user: "unknown", ip: "13.14.15.16", location: "CN", timestamp: "2024-03-20 10:45:00", severity: "error" },
  { id: "5", type: "API_KEY_CREATED", user: "admin_01", ip: "5.6.7.8", location: "UK", timestamp: "2024-03-20 11:00:00", severity: "info" },
];

export default function LogsExplorerPage() {
  const [selectedLog, setSelectedLog] = useState<any>(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Logs Explorer</h1>
          <p className="text-zinc-500">Search and analyze all ingested logs.</p>
        </div>
        <Button variant="outline" className="border-white/10 hover:bg-white/5">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <Card className="bg-zinc-900 border-white/10">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input placeholder="Filter by user, IP, or event type..." className="pl-10 bg-black border-white/5" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-white/5 bg-black hover:bg-white/5">
                <CalendarIcon className="w-4 h-4 mr-2 text-zinc-500" />
                Last 24 Hours
              </Button>
              <Button variant="outline" className="border-white/5 bg-black hover:bg-white/5">
                <Filter className="w-4 h-4 mr-2 text-zinc-500" />
                Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  <th className="pb-4 px-4">Timestamp</th>
                  <th className="pb-4 px-4">Event Type</th>
                  <th className="pb-4 px-4">User</th>
                  <th className="pb-4 px-4">IP Address</th>
                  <th className="pb-4 px-4 text-right">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {logs.map((log) => (
                  <Drawer key={log.id}>
                    <DrawerTrigger asChild>
                      <tr 
                        className="group hover:bg-white/[0.02] cursor-pointer transition-colors"
                        onClick={() => setSelectedLog(log)}
                      >
                        <td className="py-4 px-4 text-sm text-zinc-400 font-mono">{log.timestamp}</td>
                        <td className="py-4 px-4 text-sm font-medium text-white">{log.type}</td>
                        <td className="py-4 px-4 text-sm text-zinc-400">{log.user}</td>
                        <td className="py-4 px-4 text-sm text-zinc-400 font-mono">{log.ip} <span className="text-[10px] text-zinc-600 ml-1">({log.location})</span></td>
                        <td className="py-4 px-4 text-right">
                          <Badge className={
                            log.severity === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                            log.severity === 'warn' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                            'bg-blue-500/10 text-blue-500 border-blue-500/20'
                          }>
                            {log.severity}
                          </Badge>
                        </td>
                      </tr>
                    </DrawerTrigger>
                    <DrawerContent className="bg-zinc-950 border-white/10 text-white max-h-[85vh]">
                      <div className="mx-auto w-full max-w-2xl">
                        <DrawerHeader>
                          <DrawerTitle>Log Details</DrawerTitle>
                          <DrawerDescription className="text-zinc-500">Raw event data and metadata.</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-6 space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                              <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Event Type</p>
                              <p className="text-sm font-medium">{log.type}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-white/5 border border-white/5">
                              <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Severity</p>
                              <p className="text-sm font-medium capitalize">{log.severity}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs text-zinc-500 uppercase font-bold">Raw JSON</p>
                            <pre className="p-4 rounded-lg bg-black border border-white/5 text-xs text-blue-400 overflow-x-auto">
{JSON.stringify({
  id: log.id,
  eventType: log.type,
  userId: log.user,
  ip: log.ip,
  location: log.location,
  timestamp: log.timestamp,
  severity: log.severity,
  resource: "dashboard",
  metadata: {
    browser: "Chrome 122.0.0",
    os: "macOS Sonoma",
    device: "desktop"
  }
}, null, 2)}
                            </pre>
                          </div>
                        </div>
                        <DrawerFooter>
                          <DrawerClose asChild>
                            <Button variant="outline" className="border-white/10 hover:bg-white/5">Close</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
