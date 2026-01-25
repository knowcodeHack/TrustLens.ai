"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for early-stage startups",
    features: [
      "Up to 10k logs/day",
      "7 days retention",
      "Basic anomaly detection",
      "Community support",
      "1 integration",
    ],
    buttonText: "Start for Free",
    buttonLink: "/signup",
    highlight: false,
  },
  {
    name: "Premium",
    price: "₹99",
    description: "For growing SaaS companies",
    features: [
      "Unlimited logs",
      "30 days retention",
      "Advanced behavioral modeling",
      "Priority 24/7 support",
      "Unlimited integrations",
      "SOC2 readiness dashboard",
      "Custom alerts & webhooks",
    ],
    buttonText: "Upgrade Now",
    buttonLink: "/signup",
    highlight: true,
  },
];

const formatDate = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
};

const loadRazorpay = () =>
  new Promise<boolean>((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export default function PricingPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const isPremium = Boolean((session?.user as any)?.is_premium);
  const premiumUntil = (session?.user as any)?.premium_until as string | undefined;

  const startCheckout = async () => {
    if (status === "loading") return;
    if (!session?.user) {
      router.push("/login?callbackUrl=/pricing");
      return;
    }

    setIsProcessing(true);
    const scriptLoaded = await loadRazorpay();
    if (!scriptLoaded) {
      toast.error("Failed to load Razorpay. Check your network and try again.");
      setIsProcessing(false);
      return;
    }

    try {
      const res = await fetch("/api/razorpay/order", { method: "POST" });
      if (!res.ok) throw new Error("Unable to create order");
      const { order, keyId } = await res.json();

      const razorpay = new window.Razorpay({
        key: keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        name: "TrustLens.ai",
        description: "Premium subscription",
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        prefill: {
          email: session.user.email,
          name: session.user.name,
        },
        theme: {
          color: "#2563eb",
        },
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          if (!verifyRes.ok) {
            toast.error("Payment verification failed. Please contact support.");
            return;
          }

          toast.success("You are now on Premium!", { duration: 4000 });
          await update();
          setIsProcessing(false);
          router.refresh();
        },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
        notes: {
          plan: "Premium",
          userId: (session.user as any).id,
        },
      });

      razorpay.open();
    } catch (error) {
      console.error(error);
      toast.error("Checkout failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h1 className="text-4xl md:text-6xl font-bold">Simple, transparent pricing</h1>
            <p className="text-zinc-500 text-lg">Choose the plan that's right for your business.</p>
            {isPremium && (
              <div className="inline-flex items-center gap-3 rounded-full bg-white/5 border border-blue-500/30 px-4 py-2 text-sm text-blue-100">
                <Badge className="bg-blue-600 border-blue-400/40">Premium</Badge>
                <span>Active until {formatDate(premiumUntil) || "renewal"}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, i) => {
              const isCurrentPremiumCard = plan.name === "Premium" && isPremium;

              return (
                <Card
                  key={i}
                  className={`bg-white/5 border-white/10 flex flex-col ${plan.highlight ? "ring-2 ring-blue-500 border-transparent" : ""}`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <CardDescription className="text-zinc-400">{plan.description}</CardDescription>
                      </div>
                      {isCurrentPremiumCard && <Badge className="bg-blue-600 border-blue-400/40">Current</Badge>}
                    </div>
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
                    {plan.name === "Premium" ? (
                      <Button
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                        disabled={isPremium || isProcessing}
                        onClick={startCheckout}
                      >
                        {isPremium ? "Current Plan" : isProcessing ? "Initializing..." : "Upgrade Now"}
                      </Button>
                    ) : (
                      <Link href={plan.buttonLink} className="w-full">
                        <Button className="w-full h-12 bg-white/10 hover:bg-white/20">{plan.buttonText}</Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
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
                        {typeof row.free === "boolean" ? (
                          row.free ? (
                            <Check className="w-4 h-4 mx-auto text-blue-500" />
                          ) : (
                            "-"
                          )
                        ) : (
                          row.free
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-center font-medium">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? (
                            <Check className="w-4 h-4 mx-auto text-blue-500" />
                          ) : (
                            "-"
                          )
                        ) : (
                          row.pro
                        )}
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
