"use server";

import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Create a secure server-side Supabase client with service role
const adminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function getSignedUrl(path: string) {
  try {
    console.log("Server Action - Getting signed URL for path:", path);

    const { data, error } = await adminClient.storage
      .from("products")
      .createSignedUrl(path, 3600);

    if (error) {
      console.error("Server Action - Error creating signed URL:", error);
      throw error;
    }

    return { url: data.signedUrl };
  } catch (error) {
    console.error("Server Action - Unexpected error:", error);
    throw new Error("Failed to generate signed URL");
  }
}
