import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST() {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Razorpay keys not configured" }, { status: 500 });
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

  try {
    const shortUserId = String(userId).slice(0, 8);
    const order = await razorpay.orders.create({
      amount: 9900, // ₹99.00 in paise
      currency: "INR",
      receipt: `tl_${shortUserId}_${Date.now()}`.slice(0, 40),
      notes: {
        userId,
        plan: "Premium",
      },
    });

    return NextResponse.json({ order, keyId });
  } catch (error) {
    console.error("Razorpay order creation failed", error);
    return NextResponse.json({ error: "Unable to create order" }, { status: 500 });
  }
}
