"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TestPage() {
  const { data: session } = useSession();
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      // Test 1: Check if table exists
      const { data, error } = await supabase.from("logs").select("*").limit(5);
      
      console.log("Query result:", { data, error });
      setTestResult({
        success: !error,
        data: data,
        error: error?.message,
        rowCount: data?.length || 0,
        sessionInfo: {
          authenticated: !!session,
          orgId: (session?.user as any)?.org_id,
          email: session?.user?.email
        }
      });
    } catch (err) {
      console.error("Connection test error:", err);
      setTestResult({
        success: false,
        error: err instanceof Error ? err.message : String(err)
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="p-8 space-y-4">
      <Card className="bg-zinc-900 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Database Connection Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testConnection} disabled={loading}>
            {loading ? "Testing..." : "Test Connection"}
          </Button>

          {testResult && (
            <div className="p-4 rounded-lg bg-black border border-white/10">
              <p className="text-sm text-zinc-400 mb-2">
                <strong>Status:</strong> {testResult.success ? "✓ Connected" : "✗ Error"}
              </p>
              
              <p className="text-sm text-zinc-400 mb-2">
                <strong>Authenticated:</strong> {testResult.sessionInfo?.authenticated ? "Yes" : "No"}
              </p>
              
              <p className="text-sm text-zinc-400 mb-2">
                <strong>Org ID:</strong> {testResult.sessionInfo?.orgId || "Not set"}
              </p>
              
              <p className="text-sm text-zinc-400 mb-2">
                <strong>Email:</strong> {testResult.sessionInfo?.email || "Not logged in"}
              </p>

              <p className="text-sm text-zinc-400 mb-2">
                <strong>Rows Found:</strong> {testResult.rowCount || 0}
              </p>

              {testResult.error && (
                <p className="text-sm text-red-400 mt-4">
                  <strong>Error:</strong> {testResult.error}
                </p>
              )}

              {testResult.data && testResult.data.length > 0 && (
                <div className="mt-4 p-2 bg-zinc-800 rounded text-xs font-mono overflow-auto max-h-64">
                  <pre className="text-blue-400">
                    {JSON.stringify(testResult.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
