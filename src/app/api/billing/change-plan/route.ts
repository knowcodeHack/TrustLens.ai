import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { plan } = await req.json();

  if (plan !== "Free") {
    return NextResponse.json({ error: "Only downgrade to Free is supported here" }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from("users")
    .update({
      is_premium: false,
      premium_since: null,
      premium_until: null,
    })
    .eq("id", userId);

  if (error) {
    console.error("Failed to downgrade user", error);
    return NextResponse.json({ error: "Failed to update plan" }, { status: 500 });
  }

  return NextResponse.json({ success: true, plan: "Free" });
}
