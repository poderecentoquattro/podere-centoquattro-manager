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

    const apartment_id = 1;

    // Cerco se esiste già un prezzo per quella data
    const { data: existing, error: searchError } = await supabase
      .from("daily_prices")
      .select("id")
      .eq("apartment_id", apartment_id)
      .eq("date", date)
      .maybeSingle();

    console.log("=== PRICE SAVE ===");
    console.log("Data ricevuta:", date);
    console.log("Prezzo:", price);
    console.log("Record trovato:", existing);

    if (searchError) {
      console.error(searchError);

      return NextResponse.json(
        { error: searchError.message },
        { status: 500 }
      );
    }

    // Aggiorna se esiste
    if (existing) {
      const { error } = await supabase
        .from("daily_prices")
        .update({
          price,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      if (error) {
        console.error(error);

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

    // Altrimenti crea un nuovo record
    const { error } = await supabase
      .from("daily_prices")
      .insert({
        apartment_id,
        date,
        price,
      });

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      action: "created",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}