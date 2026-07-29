import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// =========================
// GET
// Componenti viaggio di un ospite
// =========================
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const guestId = searchParams.get("guestId");

  if (!guestId) {
    return NextResponse.json(
      {
        success: false,
        error: "guestId mancante",
      },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("componenti_viaggio")
    .select("*")
    .eq("guest_id", guestId)
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