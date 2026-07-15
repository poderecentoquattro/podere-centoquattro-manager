import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      apartments (
        id,
        name
      ),
      guests (
        id,
        nome,
        cognome
      )
    `);

  return NextResponse.json({ data, error });
}

export async function POST(request: Request) {
  const body = await request.json();

  const { error } = await supabase
    .from("bookings")
    .insert([
      {
        apartment_id: body.apartment_id,
        guest: body.guest,
        check_in: body.check_in,
        check_out: body.check_out,
        adults: body.adults,
        children: body.children,
        total: body.total === "" ? null : Number(body.total),
        paid: body.paid,
        source: body.source,
        notes: body.notes,
        status: "Confermata",
      },
    ]);

  if (error) {
    console.log(error);

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
  });
}
export async function PUT(request: Request) {
  const body = await request.json();

  const { error } = await supabase
    .from("bookings")
    .update({
      apartment_id: body.apartment_id,
      guest: body.guest,
      check_in: body.check_in,
      check_out: body.check_out,
      adults: body.adults,
      children: body.children,
      total: body.total === "" ? null : Number(body.total),
      paid: body.paid,
      source: body.source,
      notes: body.notes,
    })
    .eq("id", body.id);

  if (error) {
    console.log(error);

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
  });
}