import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("daily_prices")
    .select("*");

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ data });
}

export async function POST(req: Request) {
  const body = await req.json();

  const { apartment_id, dates, platform_price, website_price } = body;

  const rows = dates.map((date: string) => ({
    apartment_id,
    date,
    platform_price,
    website_price,
  }));

  const { error } = await supabase
    .from("daily_prices")
    .upsert(rows, {
      onConflict: "apartment_id,date",
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}