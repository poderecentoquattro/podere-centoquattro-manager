import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("daily_prices")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  try {
    const { startDate, endDate, price } = await request.json();

    const apartment_id = 1;

  function formatDate(date: Date) {
  return date.toLocaleDateString("en-CA");
}

const current = new Date(startDate + "T12:00:00");
const last = new Date(endDate + "T12:00:00");

while (current.getTime() <= last.getTime()) {
  const date = formatDate(current);

  const { data: existing } = await supabase
    .from("daily_prices")
    .select("id")
    .eq("apartment_id", apartment_id)
    .eq("date", date)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("daily_prices")
      .update({
        price,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
  } else {
    await supabase
      .from("daily_prices")
      .insert({
        apartment_id,
        date,
        price,
      });
  }

  current.setDate(current.getDate() + 1);
}

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}