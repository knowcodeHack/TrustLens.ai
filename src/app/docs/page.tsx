import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Terminal, BookOpen, Key } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-zinc-500 text-lg">Learn how to integrate TrustLens into your application.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <nav className="space-y-2 sticky top-24">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-4">Getting Started</h3>
                <a href="#quickstart" className="block text-sm text-blue-500 font-medium">Quickstart</a>
                <a href="#authentication" className="block text-sm text-zinc-400 hover:text-white transition-colors">Authentication</a>
                <a href="#sdk" className="block text-sm text-zinc-400 hover:text-white transition-colors">SDK Usage</a>
                <a href="#api" className="block text-sm text-zinc-400 hover:text-white transition-colors">REST API</a>
              </nav>
            </div>

            <div className="md:col-span-3 space-y-16">
              <section id="quickstart">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-bold">Quickstart</h2>
                </div>
                <p className="text-zinc-400 mb-6 leading-relaxed">
                  The fastest way to get started is by using our official SDKs. You'll need an API Key from your dashboard to begin ingesting logs.
                </p>
                <div className="bg-zinc-900 rounded-xl p-6 border border-white/10">
                  <ol className="space-y-4 list-decimal list-inside text-zinc-300">
                    <li>Create an account at TrustLens.ai</li>
                    <li>Go to Integrations and generate a new API Key</li>
                    <li>Install the SDK in your project</li>
                    <li>Initialize and start sending logs</li>
                  </ol>
                </div>
              </section>

              <section id="sdk">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Code className="w-5 h-5 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-bold">SDK Usage</h2>
                </div>
                <Tabs defaultValue="node" className="w-full">
                  <TabsList className="bg-white/5 border-white/10">
                    <TabsTrigger value="node">Node.js</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                  </TabsList>
                  <TabsContent value="node">
                    <div className="bg-zinc-900 rounded-xl p-6 border border-white/10 overflow-x-auto">
                      <pre className="text-sm text-blue-400">
{`// Install: npm install @trustlens/node
import { TrustLens } from '@trustlens/node';

const tl = new TrustLens({
  apiKey: 'YOUR_API_KEY'
});

await tl.ingest({
  eventType: 'USER_LOGIN',
  userId: 'user_123',
  ip: '192.168.1.1',
  metadata: {
    browser: 'Chrome',
    os: 'macOS'
  }
});`}
                      </pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="python">
                    <div className="bg-zinc-900 rounded-xl p-6 border border-white/10 overflow-x-auto">
                      <pre className="text-sm text-blue-400">
{`# Install: pip install trustlens-python
from trustlens import TrustLens

tl = TrustLens(api_key="YOUR_API_KEY")

tl.ingest({
    "eventType": "USER_LOGIN",
    "userId": "user_123",
    "ip": "192.168.1.1",
    "metadata": {
        "browser": "Chrome",
        "os": "macOS"
    }
})`}
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </section>

              <section id="api">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-bold">REST API</h2>
                </div>
                <p className="text-zinc-400 mb-6">
                  If we don't have an SDK for your language yet, you can use our REST API directly.
                </p>
                <div className="bg-zinc-900 rounded-xl p-6 border border-white/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded">POST</span>
                    <code className="text-sm text-zinc-300">https://api.trustlens.ai/v1/ingest/logs</code>
                  </div>
                  <pre className="text-sm text-zinc-500">
{`curl -X POST https://api.trustlens.ai/v1/ingest/logs \\
  -H "x-api-key: YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "eventType": "LOGIN_SUCCESS",
    "userId": "user_123",
    "ip": "1.2.3.4",
    "timestamp": "2024-03-20T10:00:00Z"
  }'`}
                  </pre>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
