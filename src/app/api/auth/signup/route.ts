import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { name, orgName, email, password } = await req.json();

    if (!name || !orgName || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    // 1. Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // 2. Create organization
    const apiKey = `tl_${crypto.randomBytes(24).toString("hex")}`;
    const { data: org, error: orgError } = await supabase
      .from("organizations")
      .insert({
        name: orgName,
        api_key: apiKey,
      })
      .select()
      .single();

    if (orgError) throw orgError;

    // 3. Create user
    const passwordHash = await bcrypt.hash(password, 10);
    const { error: userError } = await supabase.from("users").insert({
      email,
      password_hash: passwordHash,
      full_name: name,
      org_id: org.id,
      role: "admin",
    });

    if (userError) throw userError;

    return NextResponse.json({ message: "Account created successfully" }, { status: 201 });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 });
  }
}
