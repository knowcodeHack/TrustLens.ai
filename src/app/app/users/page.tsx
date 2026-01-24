"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { MapPin, Globe, Shield, Clock } from "lucide-react";

const userData = [
  { id: 1, name: "John Doe", email: "john@acme.com", risk: 82, events: 124, lastIp: "103.22.45.11", location: "Russia", chart: [10, 20, 15, 40, 30, 80, 82] },
  { id: 2, name: "Sarah Smith", email: "sarah@acme.com", risk: 24, events: 452, lastIp: "192.168.1.5", location: "UK", chart: [20, 22, 25, 24, 23, 24, 24] },
  { id: 3, name: "Mike Johnson", email: "mike@acme.com", risk: 45, events: 89, lastIp: "45.11.22.33", location: "Singapore", chart: [30, 35, 40, 42, 45, 44, 45] },
];

export default function UsersBehaviorPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">User Behavior Profiles</h1>
        <p className="text-zinc-500">Monitor individual user risk scores and activity patterns.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {userData.map((user) => (
          <Card key={user.id} className="bg-zinc-900 border-white/10 overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="p-6 md:w-80 border-b md:border-b-0 md:border-r border-white/5">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12 border border-white/10">
                      <AvatarFallback className="bg-blue-600">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white">{user.name}</h3>
                      <p className="text-xs text-zinc-500">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500 uppercase font-bold">Risk Score</span>
                      <Badge className={user.risk > 70 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}>
                        {user.risk}/100
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-500 uppercase font-bold">Activity</span>
                      <span className="text-sm text-white">{user.events} events</span>
                    </div>
                    <div className="pt-4 border-t border-white/5 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <Globe className="w-3 h-3" />
                        <span>{user.lastIp}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <MapPin className="w-3 h-3" />
                        <span>{user.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-zinc-400">
                        <Clock className="w-3 h-3" />
                        <span>Normal: 9 AM - 6 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 p-6 bg-black/20">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">7-Day Risk Trend</h4>
                    <span className="text-[10px] text-zinc-600">Calculated by TrustLens AI</span>
                  </div>
                  <div className="h-32 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={user.chart.map((val, i) => ({ val, i }))}>
                        <Line 
                          type="monotone" 
                          dataKey="val" 
                          stroke={user.risk > 70 ? "#ef4444" : "#3b82f6"} 
                          strokeWidth={2} 
                          dot={false} 
                        />
                        <YAxis hide domain={[0, 100]} />
                        <Tooltip 
                          content={() => null} 
                          cursor={{ stroke: '#ffffff10' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-[10px] text-zinc-500 uppercase">Suspicious</p>
                      <p className="text-sm font-semibold text-white">{user.risk > 70 ? '4' : '0'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-zinc-500 uppercase">Locations</p>
                      <p className="text-sm font-semibold text-white">2</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-zinc-500 uppercase">Devices</p>
                      <p className="text-sm font-semibold text-white">3</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
