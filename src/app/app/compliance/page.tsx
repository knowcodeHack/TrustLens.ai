"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText,
  ShieldCheck,
  Zap,
  Clock,
  RefreshCw,
  Download
} from "lucide-react";
import { toast } from "sonner";

type ComplianceStatus = "pass" | "warning" | "fail" | "scanning";

interface ComplianceItem {
  id: number;
  name: string;
  status: ComplianceStatus;
  details: string;
  lastChecked?: string;
}

const initialComplianceItems: ComplianceItem[] = [
  { id: 1, name: "MFA Enforcement", status: "pass", details: "All administrative accounts have MFA enabled.", lastChecked: "2 hours ago" },
  { id: 2, name: "Audit Logging", status: "pass", details: "CloudTrail and application logs are being ingested correctly.", lastChecked: "2 hours ago" },
  { id: 3, name: "Data Encryption", status: "pass", details: "All S3 buckets and RDS instances are encrypted at rest.", lastChecked: "2 hours ago" },
  { id: 4, name: "Access Reviews", status: "warning", details: "Quarterly access review for 'Engineering' group is 12 days overdue.", lastChecked: "2 hours ago" },
  { id: 5, name: "Vulnerability Scanning", status: "pass", details: "No critical vulnerabilities found in latest scan.", lastChecked: "2 hours ago" },
  { id: 6, name: "Unusual Data Export Alerting", status: "pass", details: "Alert rule for data exports > 1GB is active.", lastChecked: "2 hours ago" },
  { id: 7, name: "Incident Response Plan", status: "fail", details: "Incident response plan hasn't been tested in the last 12 months.", lastChecked: "2 hours ago" },
  { id: 8, name: "Password Policy", status: "pass", details: "Strong password policy enforced (min 12 chars, special characters).", lastChecked: "2 hours ago" },
  { id: 9, name: "Backup & Recovery", status: "pass", details: "Daily backups configured with 30-day retention.", lastChecked: "2 hours ago" },
  { id: 10, name: "Network Security", status: "warning", details: "2 security groups have overly permissive rules.", lastChecked: "2 hours ago" },
];

export default function CompliancePage() {
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>(initialComplianceItems);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentScanItem, setCurrentScanItem] = useState<string>("");
  const [lastScanTime, setLastScanTime] = useState<string>("2 hours ago");

  const passCount = complianceItems.filter(i => i.status === 'pass').length;
  const warningCount = complianceItems.filter(i => i.status === 'warning').length;
  const failCount = complianceItems.filter(i => i.status === 'fail').length;
  const score = Math.round((passCount / complianceItems.length) * 100);

  const runComplianceScan = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Set all items to scanning state
    setComplianceItems(prev => prev.map(item => ({ ...item, status: "scanning" as ComplianceStatus })));

    toast.info("Starting compliance scan...", { duration: 2000 });

    // Simulate scanning each item
    for (let i = 0; i < initialComplianceItems.length; i++) {
      const item = initialComplianceItems[i];
      setCurrentScanItem(item.name);
      setScanProgress(Math.round(((i + 1) / initialComplianceItems.length) * 100));
      
      // Wait for scan simulation
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
      
      // Randomly improve some statuses (simulate fixes being detected)
      let newStatus = item.status;
      const random = Math.random();
      
      // 20% chance to improve a warning/fail to pass
      if (item.status === "warning" && random > 0.7) {
        newStatus = "pass";
      } else if (item.status === "fail" && random > 0.8) {
        newStatus = "warning";
      }
      
      // Update the specific item
      setComplianceItems(prev => prev.map((prevItem, idx) => 
        idx === i 
          ? { ...prevItem, status: newStatus, lastChecked: "Just now" }
          : prevItem
      ));
    }

    setIsScanning(false);
    setScanProgress(100);
    setCurrentScanItem("");
    setLastScanTime("Just now");

    // Calculate new results
    const newPassCount = complianceItems.filter(i => i.status === 'pass').length;
    const newScore = Math.round((newPassCount / complianceItems.length) * 100);

    toast.success(
      `Compliance scan complete! Score: ${newScore}%`, 
      { 
        duration: 4000,
        description: `${passCount} passed, ${warningCount} warnings, ${failCount} failed`
      }
    );
  };

  const exportComplianceReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      score: score,
      summary: {
        total: complianceItems.length,
        passed: passCount,
        warnings: warningCount,
        failed: failCount
      },
      controls: complianceItems.map(item => ({
        name: item.name,
        status: item.status,
        details: item.details,
        lastChecked: item.lastChecked
      }))
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `compliance-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Compliance report exported successfully");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Compliance</h1>
          <p className="text-zinc-500">SOC2 & HIPAA Readiness Dashboard.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-white/10 hover:bg-white/5"
            onClick={exportComplianceReport}
            disabled={isScanning}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={runComplianceScan}
            disabled={isScanning}
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Scanning... {scanProgress}%
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 mr-2" />
                Run Compliance Scan
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Scan Progress */}
      {isScanning && (
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
                <span className="text-sm text-blue-400">Scanning: {currentScanItem}</span>
              </div>
              <span className="text-sm text-blue-400">{scanProgress}%</span>
            </div>
            <Progress value={scanProgress} className="h-2 bg-blue-500/20" />
          </CardContent>
        </Card>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-zinc-900 border-white/10">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 uppercase">Total Controls</p>
              <p className="text-2xl font-bold text-white">{complianceItems.length}</p>
            </div>
            <ShieldCheck className="w-8 h-8 text-zinc-600" />
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-white/10">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 uppercase">Passed</p>
              <p className="text-2xl font-bold text-green-500">{passCount}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500/30" />
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-white/10">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 uppercase">Warnings</p>
              <p className="text-2xl font-bold text-yellow-500">{warningCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500/30" />
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-white/10">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500 uppercase">Failed</p>
              <p className="text-2xl font-bold text-red-500">{failCount}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-500/30" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="bg-zinc-900 border-white/10 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-zinc-400 text-center">SOC2 Readiness Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pb-8">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-zinc-800"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={440}
                  strokeDashoffset={isScanning ? 440 : 440 - (440 * score) / 100}
                  className={`transition-all duration-1000 ease-out ${
                    isScanning ? 'text-blue-500 animate-pulse' : 
                    score >= 80 ? 'text-green-500' : 
                    score >= 60 ? 'text-yellow-500' : 'text-red-500'
                  }`}
                />
              </svg>
              <span className={`absolute text-4xl font-bold ${isScanning ? 'animate-pulse' : ''}`}>
                {isScanning ? '...' : `${score}%`}
              </span>
            </div>
            <p className="text-sm text-zinc-500 mt-6 text-center">
              {isScanning ? (
                <span className="text-blue-400">Scanning controls...</span>
              ) : (
                <>You are <span className="text-white font-medium">{passCount} of {complianceItems.length}</span> controls compliant.</>
              )}
            </p>
            <p className="text-xs text-zinc-600 mt-2">
              <Clock className="w-3 h-3 inline mr-1" />
              Last scan: {lastScanTime}
            </p>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Compliance Controls</h3>
            <span className="text-xs text-zinc-600">{complianceItems.length} controls</span>
          </div>
          {complianceItems.map((item) => (
            <Card 
              key={item.id} 
              className={`bg-zinc-900 border-white/10 transition-all duration-300 ${
                item.status === 'scanning' ? 'border-blue-500/50 bg-blue-500/5' : ''
              }`}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {item.status === 'scanning' ? (
                    <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />
                  ) : item.status === 'pass' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : item.status === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                    <p className="text-xs text-zinc-500">
                      {item.status === 'scanning' ? 'Checking...' : item.details}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {item.lastChecked && item.status !== 'scanning' && (
                    <span className="text-xs text-zinc-600 hidden md:block">
                      {item.lastChecked}
                    </span>
                  )}
                  <Badge className={
                    item.status === 'scanning' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                    item.status === 'pass' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    item.status === 'warning' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                    'bg-red-500/10 text-red-500 border-red-500/20'
                  }>
                    {item.status === 'scanning' ? 'Scanning' :
                     item.status === 'pass' ? 'Compliant' : 
                     item.status === 'warning' ? 'Warning' : 'Non-Compliant'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
