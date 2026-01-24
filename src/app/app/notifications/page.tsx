import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bell, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Brute Force Attack Detected",
      description: "Multiple failed login attempts from unknown IP 203.0.113.10.",
      time: "2m ago",
      status: "unread",
    },
    {
      id: 2,
      type: "info",
      title: "Weekly security summary is ready",
      description: "View anomalies, access patterns and compliance drift for your workspace.",
      time: "1h ago",
      status: "unread",
    },
    {
      id: 3,
      type: "alert",
      title: "Unusual data export from Admin account",
      description: "Large export detected outside usual business hours.",
      time: "4h ago",
      status: "read",
    },
  ] as const;

  const unread = notifications.filter((n) => n.status === "unread");
  const alerts = notifications.filter((n) => n.type === "alert");

  const renderList = (items: typeof notifications) => (
    <div className="space-y-3">
      {items.map((n) => (
        <Card
          key={n.id}
          className="bg-zinc-900 border-white/10 hover:border-blue-500/50 transition-colors"
        >
          <CardContent className="p-4 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div
                className={`mt-1 p-2 rounded-lg border ${
                  n.type === "alert"
                    ? "bg-red-500/10 text-red-400 border-red-500/30"
                    : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                }`}
              >
                {n.type === "alert" ? (
                  <AlertTriangle className="w-4 h-4" />
                ) : (
                  <Bell className="w-4 h-4" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{n.title}</p>
                  {n.status === "unread" && (
                    <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      New
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-400 mt-1">{n.description}</p>
                <div className="flex items-center gap-1 mt-2 text-[11px] text-zinc-500">
                  <Clock className="w-3 h-3" />
                  <span>{n.time}</span>
                </div>
              </div>
            </div>
            {n.status === "read" && (
              <div className="flex items-center gap-1 text-xs text-zinc-500">
                <CheckCircle2 className="w-3 h-3" />
                <span>Viewed</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      {items.length === 0 && (
        <p className="text-sm text-zinc-500">No notifications in this view.</p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notifications</h1>
          <p className="text-zinc-500 text-sm">
            View security alerts, summaries, and important account updates.
          </p>
        </div>
      </div>

      <Tabs defaultValue="unread" className="w-full">
        <TabsList className="bg-zinc-900 border border-white/10">
          <TabsTrigger value="unread">
            Unread ({unread.length})
          </TabsTrigger>
          <TabsTrigger value="alerts">
            Alerts ({alerts.length})
          </TabsTrigger>
          <TabsTrigger value="all">
            All ({notifications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="unread" className="mt-4">
          {renderList(unread as any)}
        </TabsContent>
        <TabsContent value="alerts" className="mt-4">
          {renderList(alerts as any)}
        </TabsContent>
        <TabsContent value="all" className="mt-4">
          {renderList(notifications as any)}
        </TabsContent>
      </Tabs>
    </div>
  );
}

