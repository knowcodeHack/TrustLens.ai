import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Help &amp; Support</h1>
          <p className="text-sm text-zinc-500">
            Learn how to use TrustLens and troubleshoot common issues.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 bg-zinc-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="what-is">
                <AccordionTrigger>What is TrustLens?</AccordionTrigger>
                <AccordionContent>
                  TrustLens helps you collect security logs, detect anomalies using AI, and stay on top of
                  compliance for your startup.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="alerts">
                <AccordionTrigger>How do alerts work?</AccordionTrigger>
                <AccordionContent>
                  Logs are scored by the AI service. When the anomaly score is high, we create an anomaly,
                  surface it as an alert, and route it into your alerts and notifications views.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="integrations">
                <AccordionTrigger>How do I send logs from my app?</AccordionTrigger>
                <AccordionContent>
                  Go to the Integrations page to copy your API key, then follow the examples in the
                  Documentation section to call the <code className="text-xs">/api/v1/ingest/logs</code>{" "}
                  endpoint from your backend.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-sm">Need more help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-zinc-400">
            <p>
              • Visit the <a href="/docs" className="text-blue-400 hover:underline">Documentation</a> for full API
              and integration guides.
            </p>
            <p>
              • Check the <a href="/app/alerts" className="text-blue-400 hover:underline">Alerts</a> page for
              real-time security issues.
            </p>
            <p>
              • Review your <a href="/app/settings" className="text-blue-400 hover:underline">Settings</a> to
              configure notifications and access.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

