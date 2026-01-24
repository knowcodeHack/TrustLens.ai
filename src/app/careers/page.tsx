import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Briefcase, Heart, Plane, GraduationCap, Coffee, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CareersPage() {
  const openings = [
    {
      title: "Senior Backend Engineer",
      department: "Engineering",
      location: "Mumbai / Remote",
      type: "Full-time",
      salary: "₹25L - ₹45L",
      description: "Build scalable infrastructure to process millions of security events in real-time."
    },
    {
      title: "Machine Learning Engineer",
      department: "AI/ML",
      location: "Mumbai / Remote",
      type: "Full-time",
      salary: "₹30L - ₹50L",
      description: "Develop and improve our anomaly detection models using cutting-edge ML techniques."
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Mumbai / Remote",
      type: "Full-time",
      salary: "₹18L - ₹30L",
      description: "Create intuitive experiences that make complex security concepts accessible."
    },
    {
      title: "Security Researcher",
      department: "Security",
      location: "Mumbai / Remote",
      type: "Full-time",
      salary: "₹20L - ₹35L",
      description: "Research emerging threats and help improve our detection capabilities."
    },
    {
      title: "Solutions Engineer",
      department: "Sales",
      location: "Mumbai / Remote",
      type: "Full-time",
      salary: "₹15L - ₹25L + Commission",
      description: "Help customers integrate TrustLens and maximize their security posture."
    },
    {
      title: "Developer Advocate",
      department: "Developer Relations",
      location: "Mumbai / Remote",
      type: "Full-time",
      salary: "₹12L - ₹22L",
      description: "Build community, create content, and help developers succeed with TrustLens."
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Top-tier salary, ESOPs, and annual bonuses"
    },
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance for you and your family"
    },
    {
      icon: Plane,
      title: "Flexible PTO",
      description: "Take the time you need to recharge and be your best"
    },
    {
      icon: GraduationCap,
      title: "Learning Budget",
      description: "₹2,00,000 annual budget for courses, conferences, and books"
    },
    {
      icon: Coffee,
      title: "Remote-First",
      description: "Work from anywhere with optional Mumbai office access"
    },
    {
      icon: Briefcase,
      title: "Equipment Budget",
      description: "₹1,50,000 to set up your ideal home office"
    }
  ];

  const values = [
    {
      title: "Move Fast, Stay Secure",
      description: "We ship quickly but never compromise on security. Speed and safety aren't mutually exclusive."
    },
    {
      title: "Customer Obsession",
      description: "Every decision starts with the customer. We're building tools that we wish we had."
    },
    {
      title: "Radical Transparency",
      description: "Open communication, honest feedback, and no politics. We share context freely."
    },
    {
      title: "Continuous Learning",
      description: "The security landscape evolves daily. We invest heavily in keeping our skills sharp."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-24">
            <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 mb-6">
              We're Hiring
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join us in building the <br />
              <span className="text-blue-500">future of security</span>
            </h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
              We're a team of security experts, engineers, and builders on a mission to make 
              enterprise-grade security accessible to every startup.
            </p>
            <Link href="#openings">
              <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8">
                View Open Positions
              </Button>
            </Link>
          </div>

          {/* Values */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-4">How We Work</h2>
            <p className="text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
              Our culture is built on a foundation of shared values that guide how we build, collaborate, and grow.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-zinc-400">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-center mb-4">Benefits & Perks</h2>
            <p className="text-zinc-400 text-center mb-12">
              We take care of our team so they can focus on doing their best work.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, i) => (
                <Card key={i} className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-zinc-400">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Open Positions */}
          <div id="openings" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-center mb-4">Open Positions</h2>
            <p className="text-zinc-400 text-center mb-12">
              Find your next opportunity. We're looking for talented people to join our team.
            </p>
            <div className="space-y-4">
              {openings.map((job, i) => (
                <Card key={i} className="bg-white/5 border-white/10 hover:border-blue-500/50 transition-colors cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
                            {job.title}
                          </h3>
                          <Badge variant="outline" className="border-white/20 text-zinc-400">
                            {job.department}
                          </Badge>
                        </div>
                        <p className="text-sm text-zinc-400 mb-3">{job.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>{job.salary}</span>
                          </div>
                        </div>
                      </div>
                      <Button className="bg-white text-black hover:bg-zinc-200 shrink-0">
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-24 text-center">
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/10">
              <CardContent className="p-12">
                <h3 className="text-2xl font-bold mb-4">Don't see the right role?</h3>
                <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
                  We're always looking for exceptional talent. Send us your resume and let us know how you'd like to contribute.
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Send General Application
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
