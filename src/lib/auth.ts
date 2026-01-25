import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { supabase } from "./supabase";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error || !user) return null;

        const isPasswordCorrect = await bcrypt.compare(
          (credentials.password as string) || "",
          (user as any).password_hash || ""
        );

        if (!isPasswordCorrect) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.full_name,
          org_id: user.org_id,
          role: user.role,
          is_premium: user.is_premium,
          premium_since: user.premium_since,
          premium_until: user.premium_until,
        } as any;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // If signing in with Google, create/update user in Supabase
      if (account?.provider === "google" && user.email) {
        try {
          // Check if user exists
          const { data: existingUser, error: selectError } = await supabase
            .from("users")
            .select("id")
            .eq("email", user.email)
            .single();

          if (selectError && selectError.code !== "PGRST116") {
            console.error("Error checking user existence:", selectError);
          }

          if (!existingUser) {
            // Create new user
            const { error: insertError } = await supabase.from("users").insert([
              {
                email: user.email,
                full_name: user.name || "",
                role: "admin",
                org_id: null,
              },
            ]);

            if (insertError) {
              console.error("Error creating user:", insertError);
            } else {
              console.log("User created successfully:", user.email);
            }
          } else {
            console.log("User already exists:", user.email);
          }
        } catch (error) {
          console.error("Error syncing Google user to Supabase:", error);
          // Don't block sign-in on sync errors
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      // Keep user profile (including premium flags) in sync with Supabase
      if (token.email) {
        try {
          const { data: supabaseUser, error } = await supabase
            .from("users")
            .select("id, role, org_id, is_premium, premium_since, premium_until")
            .eq("email", token.email)
            .single();

          if (supabaseUser) {
            token.id = supabaseUser.id;
            token.org_id = supabaseUser.org_id;
            token.role = supabaseUser.role;
            (token as any).is_premium = supabaseUser.is_premium;
            (token as any).premium_since = supabaseUser.premium_since;
            (token as any).premium_until = supabaseUser.premium_until;
          } else if (error) {
            console.error("Error fetching user from Supabase:", error);
          }
        } catch (error) {
          console.error("Error fetching user from Supabase:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).org_id = token.org_id;
        (session.user as any).role = token.role;
        (session.user as any).is_premium = (token as any).is_premium;
        (session.user as any).premium_since = (token as any).premium_since;
        (session.user as any).premium_until = (token as any).premium_until;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
