import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  console.log("API Route - Received filename:", filename);

  if (!filename) {
    return new NextResponse("Missing filename parameter", { status: 400 });
  }

  try {
    // Use service role key for admin access
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, // Make sure this is set in your .env.local
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // First, verify the file exists
    const { data: fileCheck, error: fileError } = await supabase.storage
      .from("products")
      .list("products_image");

    console.log("Files in products_image:", fileCheck);

    if (fileError) {
      console.error("Error checking files:", fileError);
      throw fileError;
    }

    const path = `products_image/${filename}`;
    console.log("API Route - Using exact path:", path);

    const { data, error } = await supabase.storage
      .from("products")
      .createSignedUrl(path, 3600);

    if (error) {
      console.log("API Route - Error creating signed URL:", error);
      throw error;
    }

    console.log("API Route - Successfully generated signed URL");
    return NextResponse.json({ url: data.signedUrl });
  } catch (error) {
    console.error("API Route - Unexpected error:", error);
    return new NextResponse("Error fetching image", { status: 500 });
  }
}
