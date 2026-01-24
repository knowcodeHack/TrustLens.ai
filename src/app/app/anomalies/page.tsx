"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, AlertTriangle, Eye, CheckCircle2, XCircle, Info } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const anomalies = [
  { id: "1", score: 0.92, severity: "critical", type: "Multiple Failed Logins", user: "user_123", ip: "103.22.45.11", time: "5 mins ago", explanation: "15 failed login attempts followed by a successful login from a new IP in Russia." },
  { id: "2", score: 0.78, severity: "high", type: "Unusual Data Transfer", user: "admin_01", ip: "192.168.1.50", time: "20 mins ago", explanation: "User downloaded 5GB of encrypted data, which is 500% above their daily average." },
  { id: "3", score: 0.65, severity: "medium", type: "New Location Access", user: "user_882", ip: "45.11.22.33", time: "1 hour ago", explanation: "Login from Singapore detected. User normally logs in from London, UK." },
  { id: "4", score: 0.42, severity: "low", type: "Odd Working Hours", user: "dev_33", ip: "10.0.0.5", time: "3 hours ago", explanation: "Developer accessed production database at 3:00 AM local time." },
];

export default function AnomaliesPage() {
  const [selectedAnomaly, setSelectedAnomaly] = useState<any>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Anomalies</h1>
        <p className="text-zinc-500">AI-detected security threats and unusual patterns.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {anomalies.map((anomaly) => (
          <Sheet key={anomaly.id}>
            <SheetTrigger asChild>
              <Card 
                className="bg-zinc-900 border-white/10 hover:border-blue-500/50 transition-colors cursor-pointer group"
                onClick={() => setSelectedAnomaly(anomaly)}
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-black border border-white/5">
                      <span className={`text-xl font-bold ${anomaly.score > 0.8 ? 'text-red-500' : anomaly.score > 0.6 ? 'text-orange-500' : 'text-blue-500'}`}>
                        {Math.round(anomaly.score * 100)}
                      </span>
                      <span className="text-[10px] text-zinc-500 uppercase font-bold">Score</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{anomaly.type}</h3>
                      <div className="flex items-center gap-3 text-sm text-zinc-500">
                        <span>{anomaly.user}</span>
                        <span>•</span>
                        <span className="font-mono">{anomaly.ip}</span>
                        <span>•</span>
                        <span>{anomaly.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge className={
                      anomaly.severity === 'critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      anomaly.severity === 'high' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                      anomaly.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    }>
                      {anomaly.severity}
                    </Badge>
                    <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </SheetTrigger>
            <SheetContent className="bg-zinc-950 border-white/10 text-white sm:max-w-md">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">Anomaly Details</SheetTitle>
                <SheetDescription className="text-zinc-500">Deep dive into the detected threat.</SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-8">
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <h4 className="text-sm font-semibold text-zinc-400 mb-2 uppercase tracking-wider">AI Explanation</h4>
                    <p className="text-sm leading-relaxed text-zinc-200">{anomaly.explanation}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Related Context</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-black border border-white/5">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">Risk Level</p>
                      <p className="text-sm font-medium capitalize">{anomaly.severity}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-black border border-white/5">
                      <p className="text-[10px] text-zinc-500 uppercase font-bold">User History</p>
                      <p className="text-sm font-medium">3 Anomalies (30d)</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col gap-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700">Investigate Further</Button>
                  <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Mark as Safe</Button>
                  <Button variant="ghost" className="w-full text-zinc-500 hover:text-white">Create Custom Alert Rule</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
}

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
