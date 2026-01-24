"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Copy, 
  RefreshCw, 
  CheckCircle2, 
  XCircle, 
  ExternalLink,
  Code
} from "lucide-react";
import { toast } from "sonner";

export default function IntegrationsPage() {
  const [apiKey, setApiKey] = useState("tl_4f9a2b8c7d1e6f5g4h3i2j1k0l9m8n7o");
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Integrations</h1>
          <p className="text-zinc-500">Connect your applications and infrastructure.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Integration
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 bg-zinc-900 border-white/10">
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>Use these credentials to send logs from your application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Project ID</label>
              <div className="flex items-center gap-2 p-3 bg-black rounded-lg border border-white/5">
                <code className="text-sm text-blue-400 flex-1">proj_da89af61</code>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard("proj_da89af61")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">API Key</label>
              <div className="flex items-center gap-2 p-3 bg-black rounded-lg border border-white/5">
                <code className="text-sm text-blue-400 flex-1">{apiKey}</code>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard(apiKey)}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Ingest Endpoint</label>
              <div className="flex items-center gap-2 p-3 bg-black rounded-lg border border-white/5">
                <code className="text-sm text-blue-400 flex-1">https://api.trustlens.ai/v1/ingest/logs</code>
                <Button variant="ghost" size="icon" onClick={() => copyToClipboard("https://api.trustlens.ai/v1/ingest/logs")}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-white/10">
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Integration Status</span>
              <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Last Event</span>
              <span className="text-sm text-white">2 mins ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Total Events (24h)</span>
              <span className="text-sm text-white">142,492</span>
            </div>
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 mt-4">
              Test Integration
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { name: "Node.js SDK", status: "Active", icon: Code, docs: "/docs#node" },
          { name: "Python SDK", status: "Active", icon: Code, docs: "/docs#python" },
          { name: "AWS CloudWatch", status: "Inactive", icon: ExternalLink, docs: "#" },
          { name: "Google Cloud Logging", status: "Inactive", icon: ExternalLink, docs: "#" },
        ].map((item, i) => (
          <Card key={i} className="bg-zinc-900 border-white/10 hover:border-blue-500/50 transition-colors cursor-pointer group">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-zinc-950 border border-white/5 group-hover:text-blue-500 transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Active' ? 'bg-green-500' : 'bg-zinc-600'}`} />
                    <span className="text-xs text-zinc-500">{item.status}</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-zinc-500 group-hover:text-white">
                View Docs
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
