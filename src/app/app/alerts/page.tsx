"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  MessageSquare,
  UserPlus,
  Clock,
  MoreVertical,
  Mail,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useSession } from "next-auth/react";

type AlertStatus = "open" | "resolved" | "archived";

type Alert = {
  id: number;
  title: string;
  status: AlertStatus;
  assigned: string;
  time: string;
  comments: number;
};

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000";

export default function AlertsPage() {
  const { data: session } = useSession();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const orgId = (session?.user as any)?.org_id;

  useEffect(() => {
    if (!orgId) return;

    const fetchAlerts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${BACKEND_URL}/api/alerts?orgId=${encodeURIComponent(orgId)}`
        );
        if (!res.ok) {
          console.error("Failed to load alerts", await res.text());
          return;
        }
        const data = await res.json();

        const mapped: Alert[] = data.map((item: any) => ({
          id: item.id,
          title: item.explanation ?? "Security anomaly detected",
          status: item.status === "safe" ? "resolved" : "open",
          assigned: "Unassigned",
          time: new Date(item.created_at).toLocaleString(),
          comments: 0,
        }));

        setAlerts(mapped);
      } catch (error) {
        console.error("Error fetching alerts", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, [orgId]);

  const handleResolve = async (id: number) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/alerts/${id}/resolve`, {
        method: "PATCH",
      });
      if (!res.ok) {
        console.error("Failed to resolve alert", await res.text());
        return;
      }

      setAlerts((prev) =>
        prev.map((alert) =>
          alert.id === id ? { ...alert, status: "resolved" } : alert
        )
      );
    } catch (error) {
      console.error("Error resolving alert", error);
    }
  };

  const openAlerts = alerts.filter((a) => a.status === "open");
  const resolvedAlerts = alerts.filter((a) => a.status === "resolved");
  const archivedAlerts = alerts.filter((a) => a.status === "archived");

  const renderAlertList = (list: Alert[]) => (
    <div className="space-y-4">
      {list.map((alert) => (
        <Card
          key={alert.id}
          className="bg-zinc-900 border-white/10 hover:border-blue-500/50 transition-colors"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 rounded-lg bg-red-500/10 text-red-500 border border-red-500/20">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {alert.title}
                  </h3>
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
                {alert.status === "open" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/10 hover:bg-white/5"
                    onClick={() => handleResolve(alert.id)}
                  >
                    Resolve
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-500 hover:text-white"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {list.length === 0 && !isLoading && (
        <p className="text-sm text-zinc-500">No alerts in this view.</p>
      )}
    </div>
  );

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
          <TabsTrigger value="open">
            Open Alerts ({openAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resolved ({resolvedAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="archived">
            Archived ({archivedAlerts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="open" className="mt-6">
          {renderAlertList(openAlerts)}
        </TabsContent>
        <TabsContent value="resolved" className="mt-6">
          {renderAlertList(resolvedAlerts)}
        </TabsContent>
        <TabsContent value="archived" className="mt-6">
          {renderAlertList(archivedAlerts)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
