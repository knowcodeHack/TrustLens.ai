import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Lock, BarChart3, Cloud, Code, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent -z-10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-400 mb-8">
              <Zap className="w-3 h-3" />
              <span>v1.0 is now live</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              Real-time AI Security & <br /> Compliance for SaaS
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
              Detect anomalies, automate SOC2 readiness, and model threat behaviors with a single API call. Built for modern engineering teams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8">
                  Get Started for Free
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline" className="border-white/10 hover:bg-white/5 h-12 px-8">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Powerful Security Features</h2>
              <p className="text-zinc-500">Everything you need to secure your SaaS platform.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Real-time Anomaly Detection",
                  desc: "Our AI engine identifies suspicious patterns and unusual user behaviors as they happen.",
                  icon: Zap,
                },
                {
                  title: "Automated Compliance",
                  desc: "Continuous monitoring for SOC2, HIPAA, and GDPR with automated gap analysis.",
                  icon: Lock,
                },
                {
                  title: "Behavioral Modeling",
                  desc: "Understand normal user behavior and detect insider threats before they cause damage.",
                  icon: BarChart3,
                },
                {
                  title: "Low-code Integration",
                  desc: "Connect your entire stack with our easy-to-use SDKs and REST endpoints.",
                  icon: Code,
                },
                {
                  title: "Cloud Native",
                  desc: "Seamlessly integrates with AWS CloudWatch, CloudTrail, and native application logs.",
                  icon: Cloud,
                },
                {
                  title: "Actionable Insights",
                  desc: "Don't just see threats—get clear explanations and guided resolution steps.",
                  icon: Shield,
                }
              ].map((f, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-blue-500/50 transition-colors group">
                  <CardContent className="pt-6">
                    <f.icon className="w-10 h-10 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 border-t border-white/5 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to secure your startup?</h2>
            <p className="text-zinc-400 mb-10">
              Join 100+ startups already using TrustLens to protect their infrastructure.
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-black hover:bg-zinc-200 group">
                Start your 14-day free trial
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
