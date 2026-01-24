"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp,
  AlertTriangle,
  Users as UsersIcon,
  Logs
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const data = [
  { name: "Mon", threats: 4, logs: 2400 },
  { name: "Tue", threats: 3, logs: 1398 },
  { name: "Wed", threats: 2, logs: 9800 },
  { name: "Thu", threats: 6, logs: 3908 },
  { name: "Fri", threats: 8, logs: 4800 },
  { name: "Sat", threats: 1, logs: 3800 },
  { name: "Sun", threats: 2, logs: 4300 },
];

const stats = [
  { label: "Total Logs Ingested", value: "1.2M", icon: Logs, trend: "+12.5%", color: "text-blue-500" },
  { label: "Anomalies Today", value: "14", icon: ShieldAlert, trend: "-2.4%", color: "text-orange-500" },
  { label: "Compliance Score", value: "94%", icon: CheckCircle2, trend: "+1.2%", color: "text-green-500" },
  { label: "Risk Score", value: "24", icon: AlertTriangle, trend: "Stable", color: "text-yellow-500" },
];

const recentAlerts = [
  { id: 1, type: "Brute Force Attempt", severity: "High", time: "2 mins ago", user: "user_492" },
  { id: 2, type: "Unusual Data Export", severity: "Critical", time: "15 mins ago", user: "admin_01" },
  { id: 3, type: "New Location Login", severity: "Low", time: "1 hour ago", user: "user_882" },
  { id: 4, type: "API Token Leak", severity: "Critical", time: "3 hours ago", user: "system" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-zinc-500">Overview of your security and compliance status.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="bg-zinc-900 border-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-zinc-950 border border-white/5 ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-medium ${stat.trend.startsWith('+') ? 'text-green-500' : stat.trend.startsWith('-') ? 'text-red-500' : 'text-zinc-500'}`}>
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-sm text-zinc-500">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-zinc-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-400">Threat Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorThreat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                  <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "#18181b", border: "1px solid #27272a" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="threats" stroke="#3b82f6" fillOpacity={1} fill="url(#colorThreat)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-400">Live Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4">
                  <div className={`mt-1 w-2 h-2 rounded-full ${alert.severity === 'Critical' ? 'bg-red-500 animate-pulse' : alert.severity === 'High' ? 'bg-orange-500' : 'bg-blue-500'}`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-white">{alert.type}</p>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <span>{alert.user}</span>
                      <span>•</span>
                      <span>{alert.time}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                    alert.severity === 'Critical' ? 'border-red-500/50 text-red-500 bg-red-500/10' :
                    alert.severity === 'High' ? 'border-orange-500/50 text-orange-500 bg-orange-500/10' :
                    'border-blue-500/50 text-blue-500 bg-blue-500/10'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risky Users Table */}
      <Card className="bg-zinc-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-zinc-400">Top Risky Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="pb-4 text-xs font-semibold text-zinc-500">User</th>
                  <th className="pb-4 text-xs font-semibold text-zinc-500 text-center">Risk Score</th>
                  <th className="pb-4 text-xs font-semibold text-zinc-500 text-center">Suspicious Events</th>
                  <th className="pb-4 text-xs font-semibold text-zinc-500 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { user: "admin_01", score: 82, events: 12, status: "Under Review" },
                  { user: "user_492", score: 64, events: 8, status: "Monitored" },
                  { user: "user_882", score: 45, events: 5, status: "Safe" },
                  { user: "dev_33", score: 38, events: 3, status: "Safe" },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="py-4 text-sm font-medium text-white">{row.user}</td>
                    <td className="py-4 text-sm text-center">
                      <div className="inline-flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div className={`h-full ${row.score > 70 ? 'bg-red-500' : row.score > 40 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${row.score}%` }} />
                        </div>
                        <span>{row.score}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-center">{row.events}</td>
                    <td className="py-4 text-sm text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                        row.status === 'Under Review' ? 'border-red-500/50 text-red-500' :
                        row.status === 'Monitored' ? 'border-orange-500/50 text-orange-500' :
                        'border-green-500/50 text-green-500'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
