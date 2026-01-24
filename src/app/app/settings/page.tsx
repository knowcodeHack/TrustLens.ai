"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  User, 
  Building, 
  Bell, 
  Shield, 
  Key,
  Save
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [orgName, setOrgName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Load organization data on mount
  useEffect(() => {
    const loadOrgData = async () => {
      if (!session?.user?.email) return;

      try {
        setLoading(true);
        // Get user's org_id
        const { data: user } = await supabase
          .from("users")
          .select("org_id")
          .eq("email", session.user.email)
          .single();

        if (user?.org_id) {
          // Get organization details
          const { data: org } = await supabase
            .from("organizations")
            .select("name, website_url")
            .eq("id", user.org_id)
            .single();

          if (org) {
            setOrgName(org.name || "");
            setWebsiteUrl(org.website_url || "");
          }
        }
      } catch (error) {
        console.error("Failed to load organization data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrgData();
  }, [session]);

  const handleSaveChanges = async () => {
    if (!session?.user?.email || !orgName || !websiteUrl) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch("/api/organizations/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          name: orgName,
          website_url: websiteUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update organization");
      }

      toast.success("Changes saved");
    } catch (error) {
      console.error("Error saving changes:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteOrganization = async () => {
    if (!session?.user?.email) {
      toast.error("User not found");
      return;
    }

    try {
      setIsDeleting(true);
      const response = await fetch("/api/organizations/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete organization");
      }

      toast.success("Organization deleted successfully");
      // Sign out and redirect to home
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Error deleting organization:", error);
      toast.error("Failed to delete organization");
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

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
                <Input 
                  id="org-name" 
                  placeholder="Acme Inc" 
                  className="bg-black border-white/5"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-url">Website URL</Label>
                <Input 
                  id="org-url" 
                  placeholder="https://acme.com" 
                  className="bg-black border-white/5"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSaveChanges}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
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
            <Button 
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
            >
              Delete Everything
            </Button>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Organization</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your organization and all associated data including logs, alerts, and compliance records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteOrganization}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
