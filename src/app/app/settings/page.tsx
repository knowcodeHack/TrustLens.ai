"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  Key,
  Save
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-zinc-500">Manage your account and organization settings.</p>
      </div>

      <div className="space-y-6">
        <Card className="bg-zinc-900 border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-500" />
              <CardTitle>Organization</CardTitle>
            </div>
            <CardDescription>Update your company details and workspace name.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" placeholder="Acme Inc" className="bg-black border-white/5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-url">Website URL</Label>
                <Input id="org-url" placeholder="https://acme.com" className="bg-black border-white/5" />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-white/10">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-500" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>Choose how you want to be alerted about security events.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Critical Anomaly Alerts</Label>
                <p className="text-sm text-zinc-500">Get immediate email and Slack notifications for critical threats.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Compliance Summary</Label>
                <p className="text-sm text-zinc-500">Receive a PDF summary of your compliance status every Monday.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Audit Log Exports</Label>
                <p className="text-sm text-zinc-500">Notification when a full audit log export is completed.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-white/10 border-red-500/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              <CardTitle className="text-red-500">Danger Zone</CardTitle>
            </div>
            <CardDescription>Irreversible actions for your organization.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-white">Delete Organization</Label>
              <p className="text-sm text-zinc-500">This will permanently delete all your data and logs.</p>
            </div>
            <Button variant="destructive">Delete Everything</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
