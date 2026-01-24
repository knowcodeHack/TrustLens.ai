"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { useState } from "react";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const allPosts = [
    {
      title: "The Future of AI-Powered Security: What SaaS Startups Need to Know in 2026",
      excerpt: "As cyber threats become more sophisticated, traditional security measures are no longer enough. Learn how AI is revolutionizing threat detection and what it means for your startup.",
      author: "Viraj Walavalkar",
      date: "Jan 20, 2026",
      readTime: "8 min read",
      category: "AI & Security",
      featured: true
    },
    {
      title: "Machine Learning Models for Anomaly Detection: A Deep Dive",
      excerpt: "Understanding the algorithms behind modern security systems and how they identify threats in real-time.",
      author: "Swapnil Singh",
      date: "Jan 18, 2026",
      readTime: "10 min read",
      category: "AI & Security",
      featured: false
    },
    {
      title: "SOC 2 Compliance: A Complete Guide for Startups",
      excerpt: "Everything you need to know about achieving SOC 2 compliance without breaking the bank or slowing down your development.",
      author: "Rahul Vishwakarma",
      date: "Jan 15, 2026",
      readTime: "12 min read",
      category: "Compliance",
      featured: false
    },
    {
      title: "HIPAA Compliance for Health Tech Startups",
      excerpt: "A practical guide to achieving HIPAA compliance when building healthcare applications, with actionable steps and common pitfalls.",
      author: "Ansley Rebello",
      date: "Jan 12, 2026",
      readTime: "10 min read",
      category: "Compliance",
      featured: false
    },
    {
      title: "Detecting Insider Threats with Behavioral Analysis",
      excerpt: "How modern AI systems can identify unusual patterns in user behavior to catch potential insider threats before they cause damage.",
      author: "Swapnil Singh",
      date: "Jan 10, 2026",
      readTime: "6 min read",
      category: "Threat Detection",
      featured: false
    },
    {
      title: "Real-time Threat Intelligence: Building Your Security Radar",
      excerpt: "How to leverage threat intelligence feeds to stay ahead of emerging attacks targeting your industry.",
      author: "Viraj Walavalkar",
      date: "Jan 8, 2026",
      readTime: "8 min read",
      category: "Threat Detection",
      featured: false
    },
    {
      title: "Building a Security-First Culture at Your Startup",
      excerpt: "Security isn't just about tools—it's about people. Learn how to foster a security-conscious culture from day one.",
      author: "Ansley Rebello",
      date: "Jan 5, 2026",
      readTime: "5 min read",
      category: "Culture",
      featured: false
    },
    {
      title: "Security Training That Actually Works",
      excerpt: "Moving beyond boring compliance training to engage your team in meaningful security education.",
      author: "Viraj Walavalkar",
      date: "Jan 3, 2026",
      readTime: "6 min read",
      category: "Culture",
      featured: false
    },
    {
      title: "Real-time Log Analysis: Best Practices for Scale",
      excerpt: "Processing millions of logs per day without missing a threat. Our engineering team shares their insights.",
      author: "Rahul Vishwakarma",
      date: "Dec 28, 2025",
      readTime: "7 min read",
      category: "Engineering",
      featured: false
    },
    {
      title: "Zero Trust Architecture: Implementation Guide",
      excerpt: "Moving beyond perimeter security to a zero-trust model. A step-by-step guide for modern SaaS applications.",
      author: "Swapnil Singh",
      date: "Dec 20, 2025",
      readTime: "9 min read",
      category: "Engineering",
      featured: false
    },
    {
      title: "Secure by Design: Building Security into Your CI/CD Pipeline",
      excerpt: "Integrating security checks into your development workflow without slowing down releases.",
      author: "Rahul Vishwakarma",
      date: "Dec 15, 2025",
      readTime: "8 min read",
      category: "Engineering",
      featured: false
    }
  ];

  const categories = ["All", "AI & Security", "Compliance", "Threat Detection", "Engineering", "Culture"];

  const featuredPost = allPosts.find(post => post.featured);
  
  const filteredPosts = activeCategory === "All" 
    ? allPosts.filter(post => !post.featured)
    : allPosts.filter(post => post.category === activeCategory && !post.featured);

  const showFeatured = activeCategory === "All" || (featuredPost && featuredPost.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Blog</h1>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Insights on AI security, compliance, and building secure SaaS applications
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {showFeatured && featuredPost && (
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-white/10 mb-12 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 mb-4">
                  Featured
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 hover:text-blue-400 transition-colors cursor-pointer">
                  {featuredPost.title}
                </h2>
                <p className="text-zinc-400 mb-6 max-w-3xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Badge variant="outline" className="border-white/20 text-zinc-400">
                    {featuredPost.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Category Description */}
          {activeCategory !== "All" && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">{activeCategory}</h2>
              <p className="text-zinc-400">
                {activeCategory === "AI & Security" && "Explore how artificial intelligence is transforming cybersecurity."}
                {activeCategory === "Compliance" && "Navigate SOC 2, HIPAA, GDPR, and other regulatory frameworks."}
                {activeCategory === "Threat Detection" && "Learn about detecting and preventing security threats."}
                {activeCategory === "Engineering" && "Technical deep dives into building secure, scalable systems."}
                {activeCategory === "Culture" && "Building a security-conscious organization starts with culture."}
              </p>
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, i) => (
              <Card key={i} className="bg-white/5 border-white/10 hover:border-white/20 transition-colors group cursor-pointer">
                <CardContent className="p-6">
                  <Badge variant="outline" className="border-white/20 text-zinc-400 mb-4">
                    {post.category}
                  </Badge>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-zinc-500">
                    <div className="flex items-center gap-4">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-500" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Posts Message */}
          {filteredPosts.length === 0 && !showFeatured && (
            <div className="text-center py-12">
              <p className="text-zinc-400">No posts found in this category yet.</p>
            </div>
          )}

          {/* Newsletter Signup */}
          <div className="mt-24 text-center">
            <Card className="bg-white/5 border-white/10 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                <p className="text-zinc-400 mb-6">
                  Get the latest security insights and product updates delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
                    Subscribe
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
