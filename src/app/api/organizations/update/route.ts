import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { email, name, website_url } = await req.json();

    if (!email || !name || !website_url) {
      return NextResponse.json(
        { message: "Missing required fields" },
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

    // 2. Update organization
    const { data, error } = await supabase
      .from("organizations")
      .update({
        name,
        website_url,
      })
      .eq("id", user.org_id)
      .select();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { message: "Failed to update organization" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Organization updated successfully", data: data[0] },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Update organization error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
