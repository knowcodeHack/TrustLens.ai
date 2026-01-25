"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check, Download } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

declare global {
  interface Window {
    Razorpay: any;
  }
}

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

export default function BillingPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
      ]
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
        "SOC2 readiness dashboard"
      ]
    }
  ];

  const isPremium = Boolean((session?.user as any)?.is_premium);
  const premiumSince = (session?.user as any)?.premium_since as string | undefined;
  const premiumUntil = (session?.user as any)?.premium_until as string | undefined;
  const currentPlan = isPremium ? "Premium" : "Free";
  const activePlan = useMemo(() => plans.find((p) => p.name === currentPlan) ?? plans[0], [plans, currentPlan]);

  const startCheckout = useCallback(async () => {
    if (status === "loading") return;
    if (!session?.user) {
      router.push("/login?callbackUrl=/app/billing");
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
            setIsProcessing(false);
            return;
          }

          toast.success("Upgraded to Premium", { duration: 4000 });
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
  }, [router, session, status, update]);

  const formatDate = (value?: string | null) => {
    if (!value) return "";
    const date = new Date(value);
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  };

  const handleDowngrade = useCallback(async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/billing/change-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "Free" }),
      });

      if (!res.ok) {
        toast.error("Could not downgrade right now. Please try again.");
        setIsProcessing(false);
        return;
      }

      toast.success("Downgraded to Free", { duration: 3000 });
      await update();
      setIsProcessing(false);
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Downgrade failed. Please try again.");
      setIsProcessing(false);
    }
  }, [router, update]);

  const handleDownloadInvoice = (invoice: { date: string; amount: string; status: string }) => {
    const invoiceContent = `
TrustLens.ai Invoice
====================

Date: ${invoice.date}
Amount: ${invoice.amount}
Status: ${invoice.status}

Thank you for your business!
    `.trim();

    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${invoice.date.replace(/\s/g, '')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Billing & Subscription</h1>
        <p className="text-zinc-500">Manage your plan, payment methods, and view usage.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Badge className="bg-blue-600 text-white border-none">Current Plan</Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-xl">{activePlan.name} Plan</CardTitle>
            <CardDescription>{activePlan.price} / month</CardDescription>
            {isPremium && (
              <div className="space-y-1 mt-2 text-xs text-zinc-400">
                <p>Renews {formatDate(premiumUntil) || "next cycle"}</p>
                {premiumSince && <p>Premium since {formatDate(premiumSince)}</p>}
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2">
              {activePlan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                  <Check className="w-4 h-4 text-blue-500" />
                  {f}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="border-t border-white/5 pt-6">
            <Button
              variant={isPremium ? "outline" : "default"}
              className={
                isPremium
                  ? "w-full border-white/15 text-white hover:bg-white/10 transition-colors"
                  : "w-full bg-blue-600 text-white hover:bg-blue-500 transition-colors"
              }
              onClick={() => setIsModalOpen(true)}
              disabled={isProcessing}
            >
              {isPremium ? "Manage Plan" : "Choose Plan"}
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-zinc-900 border-white/10">
          <CardHeader>
            <CardTitle className="text-xl text-white">Usage this month</CardTitle>
            <CardDescription>Billing cycle: Mar 1 - Mar 31</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Logs Ingested</span>
                <span className="text-white">1.2M / {isPremium ? "Unlimited" : "10M"}</span>
              </div>
              <Progress value={12} className="h-2 bg-zinc-800" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">AI Tokens</span>
                <span className="text-white">45k / 100k</span>
              </div>
              <Progress value={45} className="h-2 bg-zinc-800" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Reports Generated</span>
                <span className="text-white">4 / 10</span>
              </div>
              <Progress value={40} className="h-2 bg-zinc-800" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-white/10">
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { date: "Mar 01, 2024", amount: "$99.00", status: isPremium ? "Paid" : "N/A" },
                { date: "Feb 01, 2024", amount: "$99.00", status: isPremium ? "Paid" : "N/A" },
                { date: "Jan 01, 2024", amount: "$99.00", status: isPremium ? "Paid" : "N/A" },
              ].map((inv, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 text-sm text-white">{inv.date}</td>
                  <td className="py-4 px-6 text-sm text-zinc-400">{inv.amount}</td>
                  <td className="py-4 px-6">
                    <Badge className={inv.status === "Paid" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-zinc-800 text-zinc-400 border-white/5"}>
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-500"
                      onClick={() => handleDownloadInvoice(inv)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="max-w-4xl bg-black border-white/10" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-2xl">Choose Your Plan</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Select the plan that best fits your needs.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {plans.map((plan, idx) => (
            <Card key={idx} className={`bg-zinc-900 border-white/10 flex flex-col ${currentPlan === plan.name ? 'ring-2 ring-blue-500' : ''}`}>
              {currentPlan === plan.name && (
                <div className="absolute top-0 right-0 p-4">
                  <Badge className="bg-blue-600 text-white border-none">Current Plan</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.price} / month</CardDescription>
                <p className="text-sm text-zinc-400 mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-blue-500" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="border-t border-white/5 pt-6">
                {currentPlan !== plan.name && plan.name === "Premium" && (
                  <Button
                    variant="default"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                    onClick={() => {
                      setIsModalOpen(false);
                      startCheckout();
                    }}
                    disabled={isProcessing}
                  >
                    Upgrade to {plan.name}
                  </Button>
                )}
                {currentPlan === plan.name && (
                  <Button
                    variant="outline"
                    className="w-full border-white/15 text-white hover:bg-white/10 transition-colors"
                    disabled
                  >
                    Current Plan
                  </Button>
                )}
                {currentPlan !== plan.name && plan.name === "Free" && (
                  <Button
                    variant="outline"
                    className="w-full border-white/15 text-white hover:bg-white/10 transition-colors"
                    onClick={handleDowngrade}
                    disabled={isProcessing}
                  >
                    Downgrade to {plan.name}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
    </div>
  );
}
