"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Calendar, 
  Plus, 
  History,
  FileDown,
  CheckCircle2
} from "lucide-react";

const reports = [
  { id: 1, name: "SOC2 Compliance Report - Q1 2024", type: "Full Audit", date: "Mar 15, 2024", status: "Ready" },
  { id: 2, name: "Monthly Security Summary - Feb 2024", type: "Security", date: "Mar 01, 2024", status: "Ready" },
  { id: 3, name: "Anomaly Detection Analysis", type: "AI Insights", date: "Feb 15, 2024", status: "Ready" },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-zinc-500">Generate and download compliance and security reports.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-zinc-900 border-white/10 p-6 flex flex-col items-center text-center">
          <div className="p-4 rounded-full bg-blue-500/10 text-blue-500 mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white">Full Compliance Report</h3>
          <p className="text-sm text-zinc-500 mt-2 mb-6">Complete SOC2 readiness report with all control evidence.</p>
          <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Generate PDF</Button>
        </Card>

        <Card className="bg-zinc-900 border-white/10 p-6 flex flex-col items-center text-center">
          <div className="p-4 rounded-full bg-orange-500/10 text-orange-500 mb-4">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white">Security Incident Log</h3>
          <p className="text-sm text-zinc-500 mt-2 mb-6">Detailed log of all anomalies and alerts for audit purposes.</p>
          <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Generate CSV</Button>
        </Card>

        <Card className="bg-zinc-900 border-white/10 p-6 flex flex-col items-center text-center">
          <div className="p-4 rounded-full bg-green-500/10 text-green-500 mb-4">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-white">Scheduled Reports</h3>
          <p className="text-sm text-zinc-500 mt-2 mb-6">Manage automated weekly and monthly report delivery.</p>
          <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Configure</Button>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Report History</h3>
        <Card className="bg-zinc-900 border-white/10">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    <th className="py-4 px-6">Report Name</th>
                    <th className="py-4 px-6">Type</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <FileDown className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-white">{report.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-zinc-400">{report.type}</td>
                      <td className="py-4 px-6 text-sm text-zinc-400">{report.date}</td>
                      <td className="py-4 px-6 text-right">
                        <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-400">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
