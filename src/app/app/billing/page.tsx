"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Check, 
  Zap, 
  Shield, 
  History,
  Download
} from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Billing & Subscription</h1>
        <p className="text-zinc-500">Manage your plan, payment methods, and view usage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Badge className="bg-blue-600 text-white border-none">Current Plan</Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-xl">Premium Plan</CardTitle>
            <CardDescription>$99 / month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {[
                "Unlimited log ingestion",
                "30 days data retention",
                "Advanced AI anomalies",
                "SOC2 readiness dashboard",
                "Priority support"
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-blue-500" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="border-t border-white/5 pt-6">
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Change Plan</Button>
          </CardFooter>
        </Card>

        <Card className="bg-zinc-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-xl text-white">Usage this month</CardTitle>
            <CardDescription>Billing cycle: Mar 1 - Mar 31</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Logs Ingested</span>
                <span className="text-white">1.2M / 10M</span>
              </div>
              <Progress value={12} className="h-2 bg-zinc-800" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">AI Tokens</span>
                <span className="text-white">45k / 100k</span>
              </div>
              <Progress value={45} className="h-2 bg-zinc-800" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Reports Generated</span>
                <span className="text-white">4 / 10</span>
              </div>
              <Progress value={40} className="h-2 bg-zinc-800" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-white/10">
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { date: "Mar 01, 2024", amount: "$99.00", status: "Paid" },
                { date: "Feb 01, 2024", amount: "$99.00", status: "Paid" },
                { date: "Jan 01, 2024", amount: "$99.00", status: "Paid" },
              ].map((inv, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 text-sm text-white">{inv.date}</td>
                  <td className="py-4 px-6 text-sm text-zinc-400">{inv.amount}</td>
                  <td className="py-4 px-6">
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20">{inv.status}</Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button variant="ghost" size="sm" className="text-blue-500">
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
