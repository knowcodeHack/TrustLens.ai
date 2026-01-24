"use client";

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
  Clock
} from "lucide-react";

const complianceItems = [
  { id: 1, name: "MFA Enforcement", status: "pass", details: "All administrative accounts have MFA enabled." },
  { id: 2, name: "Audit Logging", status: "pass", details: "CloudTrail and application logs are being ingested correctly." },
  { id: 3, name: "Data Encryption", status: "pass", details: "All S3 buckets and RDS instances are encrypted at rest." },
  { id: 4, name: "Access Reviews", status: "warning", details: "Quarterly access review for 'Engineering' group is 12 days overdue." },
  { id: 5, name: "Vulnerability Scanning", status: "pass", details: "No critical vulnerabilities found in latest scan." },
  { id: 6, name: "Unusual Data Export Alerting", status: "pass", details: "Alert rule for data exports > 1GB is active." },
  { id: 7, name: "Incident Response Plan", status: "fail", details: "Incident response plan hasn't been tested in the last 12 months." },
];

export default function CompliancePage() {
  const passCount = complianceItems.filter(i => i.status === 'pass').length;
  const score = Math.round((passCount / complianceItems.length) * 100);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Compliance</h1>
          <p className="text-zinc-500">SOC2 & HIPAA Readiness Dashboard.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Zap className="w-4 h-4 mr-2" />
          Run Compliance Scan
        </Button>
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
                  strokeDashoffset={440 - (440 * score) / 100}
                  className="text-blue-500 transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="absolute text-4xl font-bold">{score}%</span>
            </div>
            <p className="text-sm text-zinc-500 mt-6 text-center">
              You are <span className="text-white font-medium">{passCount} of {complianceItems.length}</span> controls compliant.
            </p>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider mb-4">Compliance Controls</h3>
          {complianceItems.map((item) => (
            <Card key={item.id} className="bg-zinc-900 border-white/10">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {item.status === 'pass' ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : item.status === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                    <p className="text-xs text-zinc-500">{item.details}</p>
                  </div>
                </div>
                <Badge className={
                  item.status === 'pass' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                  item.status === 'warning' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                  'bg-red-500/10 text-red-500 border-red-500/20'
                }>
                  {item.status === 'pass' ? 'Compliant' : item.status === 'warning' ? 'Overdue' : 'Non-Compliant'}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
