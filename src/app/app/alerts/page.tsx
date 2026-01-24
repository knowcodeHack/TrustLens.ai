"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  MessageSquare, 
  UserPlus, 
  CheckCircle2, 
  Clock,
  MoreVertical,
  Mail
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const alerts = [
  { id: 1, title: "Brute Force Attack Detected", status: "open", assigned: "John Doe", time: "2m ago", comments: 3 },
  { id: 2, title: "Unusual Data Export from Admin account", status: "open", assigned: "Unassigned", time: "15m ago", comments: 0 },
  { id: 3, title: "New API Key created with high privileges", status: "resolved", assigned: "Sarah Smith", time: "2h ago", comments: 5 },
  { id: 4, title: "Login from blacklisted IP range", status: "open", assigned: "Unassigned", time: "4h ago", comments: 1 },
];

export default function AlertsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Alerts</h1>
          <p className="text-zinc-500">Manage and resolve security alerts.</p>
        </div>
        <div className="flex items-center gap-4 p-2 px-4 rounded-lg bg-zinc-900 border border-white/10">
          <Mail className="w-4 h-4 text-zinc-500" />
          <span className="text-sm text-zinc-300">Email Notifications</span>
          <Switch />
        </div>
      </div>

      <Tabs defaultValue="open" className="w-full">
        <TabsList className="bg-zinc-900 border-white/10">
          <TabsTrigger value="open">Open Alerts (3)</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="open" className="mt-6">
          <div className="space-y-4">
            {alerts.filter(a => a.status === 'open').map((alert) => (
              <Card key={alert.id} className="bg-zinc-900 border-white/10 hover:border-blue-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{alert.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <UserPlus className="w-4 h-4" />
                            <span>{alert.assigned}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{alert.comments} comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">Resolve</Button>
                      <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
