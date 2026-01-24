"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Copy, 
  RefreshCw, 
  Check,
  ExternalLink,
  Code,
  Cloud,
  Database,
  MessageSquare,
  GitBranch,
  Shield,
  Server,
  Activity,
  Bell
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function IntegrationsPage() {
  const [apiKey, setApiKey] = useState("tl_4f9a2b8c7d1e6f5g4h3i2j1k0l9m8n7o");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [testingIntegration, setTestingIntegration] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);
  
  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedField(null), 2000);
  };

  const regenerateApiKey = () => {
    setIsRegenerating(true);
    setTimeout(() => {
      const newKey = "tl_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setApiKey(newKey);
      setIsRegenerating(false);
      toast.success("API Key regenerated successfully");
    }, 1000);
  };

  const testIntegration = () => {
    setTestingIntegration(true);
    setTestResult(null);
    setTimeout(() => {
      setTestingIntegration(false);
      setTestResult("success");
      toast.success("Integration test successful! Connection is active.");
    }, 2000);
  };

  const sdkIntegrations = [
    { 
      name: "Node.js SDK", 
      status: "Active", 
      icon: Code, 
      docs: "https://www.npmjs.com/",
      description: "Official Node.js library for TrustLens",
      installCmd: "npm install @trustlens/node"
    },
    { 
      name: "Python SDK", 
      status: "Active", 
      icon: Code, 
      docs: "https://pypi.org/",
      description: "Official Python library for TrustLens",
      installCmd: "pip install trustlens-python"
    },
  ];

  const cloudIntegrations = [
    { 
      name: "AWS CloudWatch", 
      status: "Available", 
      icon: Cloud, 
      docs: "https://aws.amazon.com/cloudwatch/",
      description: "Stream logs from AWS CloudWatch to TrustLens"
    },
    { 
      name: "Google Cloud Logging", 
      status: "Available", 
      icon: Cloud, 
      docs: "https://cloud.google.com/logging",
      description: "Integrate with Google Cloud Logging"
    },
    { 
      name: "Azure Monitor", 
      status: "Available", 
      icon: Cloud, 
      docs: "https://azure.microsoft.com/en-us/products/monitor",
      description: "Connect Azure Monitor logs"
    },
    { 
      name: "Datadog", 
      status: "Available", 
      icon: Activity, 
      docs: "https://www.datadoghq.com/",
      description: "Forward logs from Datadog"
    },
  ];

  const alertIntegrations = [
    { 
      name: "Slack", 
      status: "Connected", 
      icon: MessageSquare, 
      docs: "https://slack.com/",
      description: "Send alerts to Slack channels"
    },
    { 
      name: "PagerDuty", 
      status: "Available", 
      icon: Bell, 
      docs: "https://www.pagerduty.com/",
      description: "Trigger PagerDuty incidents"
    },
    { 
      name: "Microsoft Teams", 
      status: "Available", 
      icon: MessageSquare, 
      docs: "https://www.microsoft.com/en-us/microsoft-teams",
      description: "Send notifications to Teams"
    },
    { 
      name: "Opsgenie", 
      status: "Available", 
      icon: Bell, 
      docs: "https://www.atlassian.com/software/opsgenie",
      description: "Integrate with Opsgenie alerts"
    },
  ];

  const devIntegrations = [
    { 
      name: "GitHub", 
      status: "Connected", 
      icon: GitBranch, 
      docs: "https://github.com/",
      description: "Track deployments and commits"
    },
    { 
      name: "GitLab", 
      status: "Available", 
      icon: GitBranch, 
      docs: "https://gitlab.com/",
      description: "Connect GitLab CI/CD pipelines"
    },
    { 
      name: "Jira", 
      status: "Available", 
      icon: Database, 
      docs: "https://www.atlassian.com/software/jira",
      description: "Create Jira tickets from alerts"
    },
    { 
      name: "Terraform", 
      status: "Available", 
      icon: Server, 
      docs: "https://www.terraform.io/",
      description: "Infrastructure as Code integration"
    },
  ];

  type IntegrationItem = {
    name: string;
    status: string;
    icon: React.ComponentType<{ className?: string }>;
    docs: string;
    description: string;
    installCmd?: string;
  };

  const renderIntegrationCard = (item: IntegrationItem) => (
    <Card key={item.name} className="bg-zinc-900 border-white/10 hover:border-blue-500/50 transition-colors group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-zinc-950 border border-white/5 group-hover:border-blue-500/30 transition-colors">
              <item.icon className="w-6 h-6 text-zinc-400 group-hover:text-blue-500 transition-colors" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{item.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  item.status === 'Active' || item.status === 'Connected' 
                    ? 'bg-green-500' 
                    : 'bg-zinc-600'
                }`} />
                <span className="text-xs text-zinc-500">{item.status}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-zinc-400 mb-4">{item.description}</p>
        {item.installCmd && (
          <div className="flex items-center gap-2 p-2 bg-black rounded-lg border border-white/5 mb-4">
            <code className="text-xs text-blue-400 flex-1">{item.installCmd}</code>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => copyToClipboard(item.installCmd!, item.name)}
            >
              {copiedField === item.name ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </Button>
          </div>
        )}
        <div className="flex gap-2">
          <Link href={item.docs} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" size="sm" className="w-full border-white/10 hover:bg-white/5">
              <ExternalLink className="w-3 h-3 mr-2" />
              View Docs
            </Button>
          </Link>
          {item.status !== 'Active' && item.status !== 'Connected' && (
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => toast.success(`${item.name} integration coming soon!`)}
            >
              Connect
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Integrations</h1>
          <p className="text-zinc-500">Connect your applications and infrastructure.</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => toast.info("Browse integrations below to connect new services")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {/* API Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-zinc-900 border-white/10">
          <CardHeader>
            <CardTitle>API Configuration</CardTitle>
            <CardDescription>Use these credentials to send logs from your application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Project ID</label>
              <div className="flex items-center gap-2 p-3 bg-black rounded-lg border border-white/5">
                <code className="text-sm text-blue-400 flex-1 font-mono">proj_da89af61</code>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => copyToClipboard("proj_da89af61", "projectId")}
                  className="hover:bg-white/10"
                >
                  {copiedField === "projectId" ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">API Key</label>
              <div className="flex items-center gap-2 p-3 bg-black rounded-lg border border-white/5">
                <code className="text-sm text-blue-400 flex-1 font-mono">{apiKey}</code>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => copyToClipboard(apiKey, "apiKey")}
                  className="hover:bg-white/10"
                >
                  {copiedField === "apiKey" ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={regenerateApiKey}
                  disabled={isRegenerating}
                  className="hover:bg-white/10"
                >
                  <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              <p className="text-xs text-zinc-500">Keep this key secret. Regenerating will invalidate the old key.</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500 uppercase">Ingest Endpoint</label>
              <div className="flex items-center gap-2 p-3 bg-black rounded-lg border border-white/5">
                <code className="text-sm text-blue-400 flex-1 font-mono">https://api.trustlens.ai/v1/ingest/logs</code>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => copyToClipboard("https://api.trustlens.ai/v1/ingest/logs", "endpoint")}
                  className="hover:bg-white/10"
                >
                  {copiedField === "endpoint" ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <Link href="/docs" className="text-sm text-blue-500 hover:text-blue-400 flex items-center gap-1">
                View full API documentation
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-white/10">
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
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
              <span className="text-sm text-zinc-500">Events (24h)</span>
              <span className="text-sm text-white">142,492</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Success Rate</span>
              <span className="text-sm text-green-500">99.8%</span>
            </div>
            <Button 
              variant="outline" 
              className="w-full border-white/10 hover:bg-white/5 mt-4"
              onClick={testIntegration}
              disabled={testingIntegration}
            >
              {testingIntegration ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : testResult === "success" ? (
                <>
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  Test Passed
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4 mr-2" />
                  Test Integration
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* SDK Integrations */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Code className="w-5 h-5 text-blue-500" />
          SDKs & Libraries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sdkIntegrations.map(renderIntegrationCard)}
        </div>
      </div>

      {/* Cloud Integrations */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Cloud className="w-5 h-5 text-blue-500" />
          Cloud Providers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cloudIntegrations.map(renderIntegrationCard)}
        </div>
      </div>

      {/* Alert Integrations */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-500" />
          Alerting & Notifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {alertIntegrations.map(renderIntegrationCard)}
        </div>
      </div>

      {/* Dev Tools Integrations */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-blue-500" />
          Developer Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {devIntegrations.map(renderIntegrationCard)}
        </div>
      </div>

      {/* Request Integration */}
      <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/10">
        <CardContent className="p-8 text-center">
          <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Need a different integration?</h3>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            We're constantly adding new integrations. Let us know what you need and we'll prioritize it.
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              window.open("mailto:support@trustlens.ai?subject=Integration Request", "_blank");
            }}
          >
            Request Integration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
