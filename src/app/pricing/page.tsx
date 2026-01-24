import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Check, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for early-stage startups",
      features: [
        "Up to 10k logs/day",
        "7 days retention",
        "Basic anomaly detection",
        "Community support",
        "1 integration"
      ],
      buttonText: "Start for Free",
      buttonLink: "/signup",
      highlight: false
    },
    {
      name: "Premium",
      price: "$99",
      description: "For growing SaaS companies",
      features: [
        "Unlimited logs",
        "30 days retention",
        "Advanced behavioral modeling",
        "Priority 24/7 support",
        "Unlimited integrations",
        "SOC2 readiness dashboard",
        "Custom alerts & webhooks"
      ],
      buttonText: "Upgrade Now",
      buttonLink: "/signup",
      highlight: true
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Simple, transparent pricing</h1>
            <p className="text-zinc-500 text-lg">Choose the plan that's right for your business.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <Card key={i} className={`bg-white/5 border-white/10 flex flex-col ${plan.highlight ? 'ring-2 ring-blue-500 border-transparent' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-zinc-400">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-zinc-500">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-zinc-300">
                        <Check className="w-5 h-5 text-blue-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href={plan.buttonLink} className="w-full">
                    <Button className={`w-full h-12 ${plan.highlight ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white/10 hover:bg-white/20'}`}>
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-24 text-center">
            <h2 className="text-2xl font-bold mb-8">Compare Features</h2>
            <div className="max-w-4xl mx-auto overflow-hidden rounded-xl border border-white/10 bg-white/5">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-6 py-4 text-sm font-semibold">Feature</th>
                    <th className="px-6 py-4 text-sm font-semibold text-center">Free</th>
                    <th className="px-6 py-4 text-sm font-semibold text-center">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[
                    { name: "Real-time anomaly detection", free: true, pro: true },
                    { name: "Compliance gap analysis", free: false, pro: true },
                    { name: "Insider threat behavioral modeling", free: false, pro: true },
                    { name: "API Rate limits", free: "100/min", pro: "10k/min" },
                    { name: "Data retention", free: "7 days", pro: "30 days" },
                    { name: "Custom PDF reports", free: false, pro: true },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 text-sm text-zinc-400">{row.name}</td>
                      <td className="px-6 py-4 text-sm text-center">
                        {typeof row.free === 'boolean' ? (row.free ? <Check className="w-4 h-4 mx-auto text-blue-500" /> : "-") : row.free}
                      </td>
                      <td className="px-6 py-4 text-sm text-center font-medium">
                        {typeof row.pro === 'boolean' ? (row.pro ? <Check className="w-4 h-4 mx-auto text-blue-500" /> : "-") : row.pro}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
