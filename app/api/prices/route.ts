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
    const { date, price } = await request.json();

    const apartment_id = 1; // Per ora il Blu

    const { data: existing, error: searchError } = await supabase
  .from("daily_prices")
  .select("id, apartment_id, date")
  .eq("apartment_id", apartment_id)
  .eq("date", date)
  .limit(1)
  .maybeSingle();

  console.log("Data ricevuta:", date);
console.log("Record trovato:", existing);

console.log("Cerco:", {
  apartment_id,
  date,
});

console.log("Trovato:", existing);

    if (searchError) {
      return NextResponse.json(
        { error: searchError.message },
        { status: 500 }
      );
    }

    if (existing) {
      const { error } = await supabase
        .from("daily_prices")
        .update({
          price,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      if (error) {
        return NextResponse.json(
          { error: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        action: "updated",
      });
    }

    const { error } = await supabase
      .from("daily_prices")
      .insert({
        apartment_id,
        date,
        price,
      });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      action: "created",
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Richiesta non valida." },
      { status: 400 }
    );
  }
}