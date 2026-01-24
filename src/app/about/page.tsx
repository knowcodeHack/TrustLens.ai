import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Target, Users, Lightbulb, Globe, Lock } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We believe security should be proactive, not reactive. Every decision we make prioritizes protecting our customers."
    },
    {
      icon: Target,
      title: "Customer Obsessed",
      description: "Our success is measured by our customers' success. We're building the tools we wish we had when we were in their shoes."
    },
    {
      icon: Lightbulb,
      title: "Innovation Driven",
      description: "We leverage cutting-edge AI to solve complex security challenges that traditional tools can't address."
    },
    {
      icon: Users,
      title: "Team Empowerment",
      description: "Great products come from great teams. We invest in our people and create an environment where everyone can thrive."
    }
  ];

  const team = [
    {
      name: "Viraj Walavalkar",
      role: "CEO & Co-Founder",
      bio: "Visionary leader with expertise in AI and security systems.",
      image: "/team/viraj.jpg"
    },
    {
      name: "Rahul Vishwakarma",
      role: "CTO & Co-Founder",
      bio: "Full-stack expert building scalable security infrastructure.",
      image: "/team/rahul.jpg"
    },
    {
      name: "Ansley Rebello",
      role: "VP of Engineering",
      bio: "Expert in distributed systems and cloud architecture.",
      image: "/team/ansley.jpg"
    },
    {
      name: "Swapnil Singh",
      role: "Head of AI/ML",
      bio: "Machine learning specialist with focus on anomaly detection.",
      image: "/team/swapnil.jpg"
    }
  ];

  const investors = [
    "Sequoia", "a16z", "Y Combinator", "Greylock", "Accel", "Lightspeed", "Tiger Global", "Insight Partners"
  ];

  const stats = [
    { value: "500+", label: "Companies Protected" },
    { value: "10M+", label: "Threats Detected" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "24/7", label: "Expert Support" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-24">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Building the future of <br />
              <span className="text-blue-500">AI-powered security</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              TrustLens.ai was founded with a simple mission: make enterprise-grade security accessible to every startup. 
              We're combining cutting-edge AI with intuitive design to protect the next generation of SaaS companies.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-4xl font-bold text-blue-500 mb-2">{stat.value}</div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Story Section */}
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-zinc-400 leading-relaxed">
                  <p>
                    In 2023, our founders were running a fast-growing SaaS startup when they faced a nightmare scenario: 
                    a sophisticated attack that their security tools failed to detect. The aftermath cost them months of work 
                    and shattered customer trust.
                  </p>
                  <p>
                    They realized that traditional security tools were built for enterprises with massive budgets and dedicated 
                    security teams. Startups were left with either expensive solutions they couldn't afford or basic tools 
                    that couldn't keep up with modern threats.
                  </p>
                  <p>
                    That's when TrustLens.ai was born. We built the security platform we wished we had—one that uses AI to 
                    detect anomalies in real-time, adapts to your unique patterns, and helps you stay compliant without 
                    hiring a full security team.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Shield className="w-24 h-24 text-blue-500 mx-auto mb-4" />
                    <p className="text-xl font-semibold text-white">Founded in 2023</p>
                    <p className="text-zinc-400">Mumbai, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-zinc-400">The principles that guide everything we do</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, i) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-zinc-400">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
              <p className="text-zinc-400">The people behind TrustLens.ai</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <Card key={i} className="bg-white/5 border-white/10 overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                    <Users className="w-16 h-16 text-zinc-600" />
                  </div>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-blue-500 mb-2">{member.role}</p>
                    <p className="text-sm text-zinc-400">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Investors Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Backed by the Best</h2>
            <p className="text-zinc-400 mb-12">We're backed by leading investors who share our vision</p>
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
              <div className="flex animate-marquee whitespace-nowrap">
                {[...investors, ...investors].map((investor, i) => (
                  <div key={i} className="mx-12 text-2xl font-bold text-zinc-400 opacity-50">
                    {investor}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
