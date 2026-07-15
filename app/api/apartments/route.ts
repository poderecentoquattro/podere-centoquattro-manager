import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// =========================
// GET
// Elenco appartamenti
// =========================
export async function GET() {
  const { data, error } = await supabase
    .from("apartments")
    .select("*")
    .eq("active", true)
    .order("id");

  if (error) {
    return NextResponse.json(
      {
        success: false,
        error,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data,
  });
}