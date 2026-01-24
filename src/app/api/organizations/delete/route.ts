import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Missing email" },
        { status: 400 }
      );
    }

    // 1. Get user's org_id
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("org_id")
      .eq("email", email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const orgId = user.org_id;

    // 2. Delete all related data (logs, anomalies, alerts)
    // Delete in order due to foreign key constraints
    await supabase.from("logs").delete().eq("org_id", orgId);
    await supabase.from("anomalies").delete().eq("org_id", orgId);
    await supabase.from("alerts").delete().eq("org_id", orgId);

    // 3. Delete all users in the organization
    await supabase.from("users").delete().eq("org_id", orgId);

    // 4. Delete the organization
    const { error } = await supabase
      .from("organizations")
      .delete()
      .eq("id", orgId);

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { message: "Failed to delete organization" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Organization deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete organization error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
